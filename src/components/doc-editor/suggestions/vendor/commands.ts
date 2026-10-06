// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 — see ./LICENSE
//
// Fork changes:
//   * `suggestionId` is a SuggestionIdentity ({ user, username, date }) rather
//     than a number, and is compared with `sameSuggestion`.
//   * Mark lookups go through `findSuggestionMark` so overlapping suggestions
//     from two authors are each individually addressable.
//   * When a single suggestion is targeted, the specific Mark instance is
//     removed rather than every mark of that type — otherwise accepting one
//     author's edit silently deletes the other author's suggestion.
//   * A textblock the suggestion made WHOLE is removed with it (see
//     `removeWholeBlocks`), not emptied: rejecting an inserted paragraph, heading
//     or list removes the block, and accepting a deleted one does the same.
//
// Accept and reject are deliberately ORDINARY ProseMirror steps on `state.tr`.
// They are not custom transactions and carry no custom step types, so y-sync
// translates them into ordinary Yjs updates and they replicate to every peer.

import type { Mark, MarkType, Node } from '@tiptap/pm/model';
import { type Command, type EditorState, TextSelection } from '@tiptap/pm/state';
import { Transform } from '@tiptap/pm/transform';
import type { EditorView } from '@tiptap/pm/view';

import { findSuggestionMarkEnd } from './findSuggestionMarkEnd';
import { sameSuggestion, suggestionIdentityOf, type SuggestionIdentity } from './identity';
import { suggestChangesKey } from './plugin';
import { findSuggestionMark, getSuggestionMarks } from './utils';
import { ZERO_WIDTH_SPACE } from './zeroWidthSpace';

/**
 * Fork addition. Remove every textblock whose whole content carries `markType`
 * (for `suggestionId`, or any author when none is given), together with any
 * wrapper it was the only content of — a list item, then the list.
 *
 * Upstream marks a new block by anchoring its boundary in the block before it,
 * so a revert's range crosses the boundary and joins the block away. A block a
 * collaborator wrote straight into the Y.Doc — the document agent's proposed
 * heading, paragraph, list, table — has no such anchor: only its text is
 * marked. Deleting the text alone left the block behind: an empty heading, and
 * (before platform-api marked lists) every bullet of a rejected run. The server
 * resolves a review the same way (`resolveSuggestion` in documentAgentOps), so
 * both paths now leave the same page.
 *
 * Runs BEFORE the text pass: that pass maps its positions through these
 * deletions and skips what is gone, and its cross-block walk
 * (`findSuggestionMarkEnd`) no longer strays into a block that is going anyway.
 * A removal the schema would refuse (the document's only block) becomes the
 * parent's default block instead — an empty paragraph, what an empty page is.
 */
function removeWholeBlocks(tr: Transform, markType: MarkType, suggestionId?: SuggestionIdentity): void {
  const starts: number[] = [];
  tr.doc.descendants((node, pos) => {
    if (!node.isTextblock) return true;
    let whole = node.childCount > 0;
    node.forEach((child) => {
      if (!findSuggestionMark(child.marks, markType, suggestionId)) whole = false;
    });
    if (whole) starts.push(pos);
    return false;
  });
  // Back to front: a removal never moves a block before it.
  for (let i = starts.length - 1; i >= 0; i--) {
    const pos = starts[i] as number;
    const node = tr.doc.nodeAt(pos);
    if (!node) continue;
    const $pos = tr.doc.resolve(pos);
    let depth = $pos.depth;
    let from = pos;
    let to = pos + node.nodeSize;
    while (depth > 0 && $pos.node(depth).childCount === 1) {
      from = $pos.before(depth);
      to = $pos.after(depth);
      depth--;
    }
    const $from = tr.doc.resolve(from);
    const index = $from.index();
    if (!$from.parent.canReplace(index, index + 1)) {
      // The parent needs a block here — the document's last one. Put back the
      // block an empty parent starts with (a paragraph), so a rejected heading
      // or list on an empty page leaves the page as it was; a block already of
      // that type is simply emptied by the text pass.
      const fill = $from.parent.contentMatchAt(index).defaultType?.createAndFill();
      const current = tr.doc.nodeAt(from);
      if (fill && current && fill.type !== current.type && $from.parent.canReplaceWith(index, index + 1, fill.type)) {
        tr.replaceWith(from, to, fill);
      }
      continue;
    }
    tr.delete(from, to);
  }
}

/**
 * Given a node and a transform, add steps to the transform that apply all marks
 * of type markTypeToApply and revert all marks of type markTypeToRevert.
 *
 * If suggestionId is provided, only steps affecting that one suggestion are
 * added.
 */
function applySuggestionsToTransform(
  node: Node,
  tr: Transform,
  markTypeToApply: MarkType,
  markTypeToRevert: MarkType,
  suggestionId?: SuggestionIdentity,
  from?: number,
  to?: number,
) {
  const toApply = (marks: readonly Mark[]) =>
    findSuggestionMark(marks, markTypeToApply, suggestionId);
  const toRevert = (marks: readonly Mark[]) =>
    findSuggestionMark(marks, markTypeToRevert, suggestionId);
  // Targeting one suggestion means removing exactly that mark; targeting all of
  // them means removing the whole type in one step.
  const applyTarget = (mark: Mark) => (suggestionId ? mark : markTypeToApply);

  const rootApply = toApply(node.marks);
  if (rootApply) {
    if (node.isInline) {
      tr.removeMark(0, node.nodeSize, applyTarget(rootApply));
    } else {
      tr.removeNodeMark(0, applyTarget(rootApply));
    }
  }

  node.descendants((child, pos) => {
    if (from !== undefined && pos < from) {
      return true;
    }
    if (to !== undefined && pos > to) {
      return false;
    }
    const isToRevert = toRevert(child.marks);
    const isToApply = toApply(child.marks);
    if (!isToRevert && !isToApply) {
      return true;
    }

    if (isToRevert) {
      const { pos: deletionFrom, deleted } = tr.mapping.mapResult(pos);
      if (deleted) return false;
      const deletionTo = findSuggestionMarkEnd(
        tr.doc.resolve(deletionFrom + child.nodeSize),
        markTypeToRevert,
        suggestionId,
      );
      // If the character on both sides of the reverted range is a space, one of
      // them is now redundant — take it with the range.
      const prevChar = tr.doc.textBetween(deletionFrom - 1, deletionFrom, 'x', 'x');
      const nextChar =
        // textBetween tolerates negative positions but throws past doc end
        deletionTo <= tr.doc.content.size ? tr.doc.textBetween(deletionTo, deletionTo + 1, 'x', 'x') : '';
      const addedRange = prevChar === ' ' && nextChar === ' ' ? 1 : 0;
      tr.deleteRange(deletionFrom, deletionTo + addedRange);
      return false;
    }

    // isToApply is non-null here: we returned early when both were falsy and
    // the isToRevert branch returns.
    const applyMark = isToApply as Mark;
    const insertionFrom = tr.mapping.map(pos);
    const insertionTo = insertionFrom + child.nodeSize;
    if (child.isInline) {
      tr.removeMark(insertionFrom, insertionTo, applyTarget(applyMark));
      if (child.text === ZERO_WIDTH_SPACE) {
        tr.delete(insertionFrom, insertionTo);
      }
    } else {
      tr.removeNodeMark(insertionFrom, applyTarget(applyMark));
    }
    return true;
  });
}

function revertModifications(
  node: Node,
  pos: number,
  tr: Transform,
  suggestionId?: SuggestionIdentity,
) {
  const { modification } = getSuggestionMarks(node.type.schema);
  const existingMods = node.marks.filter(
    (mark) =>
      mark.type === modification &&
      (!suggestionId || sameSuggestion(suggestionIdentityOf(mark), suggestionId)),
  );
  for (const mod of existingMods) {
    if (mod.attrs['type'] === 'attr' && typeof mod.attrs['attrName'] === 'string') {
      tr.setNodeAttribute(pos, mod.attrs['attrName'], mod.attrs['previousValue']);
    } else if (mod.attrs['type'] === 'mark') {
      if (mod.attrs['previousValue']) {
        tr.addNodeMark(0, node.type.schema.markFromJSON(mod.attrs['previousValue']));
      } else {
        tr.removeNodeMark(pos, node.type.schema.markFromJSON(mod.attrs['previousValue']));
      }
    } else if (mod.attrs['type'] === 'nodeType') {
      const nodeType = node.type.schema.nodes[mod.attrs['previousValue'] as string];
      if (!nodeType) throw new Error(`Unknown node type ${String(mod.attrs['previousValue'])}`);
      tr.setNodeMarkup(pos, nodeType, null);
    } else {
      throw new Error('Unknown modification type');
    }
  }
}

function applyModificationsToTransform(
  node: Node,
  tr: Transform,
  dir: number,
  suggestionId?: SuggestionIdentity,
  from?: number,
  to?: number,
) {
  const { modification } = getSuggestionMarks(node.type.schema);
  const target = (mark: Mark) => (suggestionId ? mark : modification);

  const rootMod = findSuggestionMark(node.marks, modification, suggestionId);
  if (rootMod) {
    let prevLength: number;
    do {
      // https://github.com/ProseMirror/prosemirror/issues/1525
      prevLength = tr.steps.length;
      tr.removeNodeMark(0, target(rootMod));
    } while (tr.steps.length > prevLength);
    if (dir < 0) {
      revertModifications(node, 0, tr, suggestionId);
    }
  }

  node.descendants((child, pos) => {
    if (from !== undefined && pos < from) {
      return true;
    }
    if (to !== undefined && pos > to) {
      return false;
    }
    const mod = findSuggestionMark(child.marks, modification, suggestionId);
    if (!mod) {
      return true;
    }
    let prevLength: number;
    do {
      prevLength = tr.steps.length;
      tr.removeNodeMark(pos, target(mod));
    } while (tr.steps.length > prevLength);
    if (dir < 0) {
      revertModifications(child, pos, tr, suggestionId);
    }
    return true;
  });
}

/** The document as it would read with every suggestion accepted. */
export function applySuggestionsToNode(node: Node): Node {
  const { deletion, insertion } = getSuggestionMarks(node.type.schema);
  const transform = new Transform(node);
  removeWholeBlocks(transform, deletion);
  applySuggestionsToTransform(node, transform, insertion, deletion);
  applyModificationsToTransform(transform.doc, transform, 1);
  return transform.doc;
}

/** The document as it would read with every suggestion rejected. */
export function revertSuggestionsToNode(node: Node): Node {
  const { deletion, insertion } = getSuggestionMarks(node.type.schema);
  const transform = new Transform(node);
  removeWholeBlocks(transform, insertion);
  applySuggestionsToTransform(node, transform, deletion, insertion);
  applyModificationsToTransform(transform.doc, transform, -1);
  return transform.doc;
}

export function applySuggestionsToRange(doc: Node, from: number, to: number) {
  // blockRange only returns null when a predicate is provided
  const nodeRange = doc.resolve(from).blockRange(doc.resolve(to))!;
  const { deletion, insertion } = getSuggestionMarks(doc.type.schema);
  const transform = new Transform(doc);
  applySuggestionsToTransform(
    doc,
    transform,
    insertion,
    deletion,
    undefined,
    nodeRange.start,
    nodeRange.end,
  );
  applyModificationsToTransform(doc, transform, 1, undefined, nodeRange.start, nodeRange.end);
  return transform.doc.slice(transform.mapping.map(from), transform.mapping.map(to));
}

/**
 * Command that applies (accepts) all tracked changes in a document.
 *
 * Content inside deletion marks is deleted. Insertion and modification marks
 * are removed, leaving their content in place.
 */
export function applySuggestions(state: EditorState, dispatch?: EditorView['dispatch']): boolean {
  const { deletion, insertion } = getSuggestionMarks(state.schema);
  const tr = state.tr;
  removeWholeBlocks(tr, deletion);
  applySuggestionsToTransform(state.doc, tr, insertion, deletion);
  applyModificationsToTransform(tr.doc, tr, 1);
  tr.setMeta(suggestChangesKey, { skip: true });
  dispatch?.(tr);
  return true;
}

/** Command that applies all tracked changes in the given range. */
export function applySuggestionsInRange(from?: number, to?: number): Command {
  return (state, dispatch) => {
    const { deletion, insertion } = getSuggestionMarks(state.schema);
    const tr = state.tr;
    applySuggestionsToTransform(state.doc, tr, insertion, deletion, undefined, from, to);
    applyModificationsToTransform(tr.doc, tr, 1, undefined, from, to);
    tr.setMeta(suggestChangesKey, { skip: true });
    dispatch?.(tr);
    return true;
  };
}

/** Command that applies (accepts) one tracked change. */
export function applySuggestion(
  suggestionId: SuggestionIdentity,
  from?: number,
  to?: number,
): Command {
  return (state, dispatch) => {
    const { deletion, insertion } = getSuggestionMarks(state.schema);
    const tr = state.tr;
    if (from === undefined && to === undefined) removeWholeBlocks(tr, deletion, suggestionId);
    applySuggestionsToTransform(state.doc, tr, insertion, deletion, suggestionId, from, to);
    applyModificationsToTransform(tr.doc, tr, 1, suggestionId, from, to);
    if (!tr.steps.length) return false;
    tr.setMeta(suggestChangesKey, { skip: true });
    dispatch?.(tr);
    return true;
  };
}

/**
 * Command that reverts (rejects) all tracked changes in a document.
 *
 * Content inside insertion marks is deleted. Deletion marks are removed,
 * leaving their content in place. Modifications are rolled back.
 */
export function revertSuggestions(state: EditorState, dispatch?: EditorView['dispatch']): boolean {
  const { deletion, insertion } = getSuggestionMarks(state.schema);
  const tr = state.tr;
  removeWholeBlocks(tr, insertion);
  applySuggestionsToTransform(state.doc, tr, deletion, insertion);
  applyModificationsToTransform(tr.doc, tr, -1);
  tr.setMeta(suggestChangesKey, { skip: true });
  dispatch?.(tr);
  return true;
}

/** Command that reverts all tracked changes in the given range. */
export function revertSuggestionsInRange(from?: number, to?: number): Command {
  return (state, dispatch) => {
    const { deletion, insertion } = getSuggestionMarks(state.schema);
    const tr = state.tr;
    applySuggestionsToTransform(state.doc, tr, deletion, insertion, undefined, from, to);
    applyModificationsToTransform(tr.doc, tr, -1, undefined, from, to);
    tr.setMeta(suggestChangesKey, { skip: true });
    dispatch?.(tr);
    return true;
  };
}

/** Command that reverts (rejects) one tracked change. */
export function revertSuggestion(
  suggestionId: SuggestionIdentity,
  from?: number,
  to?: number,
): Command {
  return (state, dispatch) => {
    const { deletion, insertion } = getSuggestionMarks(state.schema);
    const tr = state.tr;
    if (from === undefined && to === undefined) removeWholeBlocks(tr, insertion, suggestionId);
    applySuggestionsToTransform(state.doc, tr, deletion, insertion, suggestionId, from, to);
    applyModificationsToTransform(tr.doc, tr, -1, suggestionId, from, to);
    if (!tr.steps.length) return false;
    tr.setMeta(suggestChangesKey, { skip: true });
    dispatch?.(tr);
    return true;
  };
}

/** Command that moves the selection to cover an existing change. */
export function selectSuggestion(suggestionId: SuggestionIdentity): Command {
  return (state, dispatch) => {
    const { deletion, insertion, modification } = getSuggestionMarks(state.schema);
    let changeStart: number | null = null;
    let changeEnd: number | null = null;
    state.doc.descendants((node, pos) => {
      const mark = node.marks.find(
        (m) =>
          (m.type === insertion || m.type === deletion || m.type === modification) &&
          sameSuggestion(suggestionIdentityOf(m), suggestionId),
      );
      if (!mark) return true;
      if (changeStart === null) {
        changeStart = pos;
      }
      changeEnd = pos + node.nodeSize;
      return false;
    });
    if (changeStart === null || changeEnd === null) {
      return false;
    }
    if (!dispatch) return true;
    dispatch(
      state.tr
        .setSelection(TextSelection.create(state.doc, changeStart, changeEnd))
        .scrollIntoView(),
    );
    return true;
  };
}

/** Command that enables suggestion mode. */
export function enableSuggestChanges(
  state: EditorState,
  dispatch?: EditorView['dispatch'],
): boolean {
  if (!suggestChangesKey.getState(state)) return false;
  if (!dispatch) return true;
  dispatch(state.tr.setMeta(suggestChangesKey, { skip: true, enabled: true }));
  return true;
}

/** Command that disables suggestion mode. */
export function disableSuggestChanges(
  state: EditorState,
  dispatch?: EditorView['dispatch'],
): boolean {
  if (!suggestChangesKey.getState(state)) return false;
  if (!dispatch) return true;
  dispatch(state.tr.setMeta(suggestChangesKey, { skip: true, enabled: false }));
  return true;
}

/** Command that toggles suggestion mode. */
export function toggleSuggestChanges(
  state: EditorState,
  dispatch?: EditorView['dispatch'],
): boolean {
  const pluginState = suggestChangesKey.getState(state);
  if (!pluginState) return false;
  if (!dispatch) return true;
  dispatch(state.tr.setMeta(suggestChangesKey, { skip: true, enabled: !pluginState.enabled }));
  return true;
}
