// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 — see ./LICENSE
//
// Fork change: `markId` is a SuggestionIdentity spread into the mark's attrs
// instead of an opaque numeric `id` attr, and is compared with `sameSuggestion`.

import type { Node } from '@tiptap/pm/model';
import { type EditorState, TextSelection, type Transaction } from '@tiptap/pm/state';
import type { ReplaceStep, Step } from '@tiptap/pm/transform';

import { findSuggestionMarkEnd } from './findSuggestionMarkEnd';
import { sameSuggestion, suggestionIdentityOf, type SuggestionIdentity } from './identity';
import { rebasePos } from './rebasePos';
import { findSuggestionMark, getSuggestionMarks } from './utils';
import { ZERO_WIDTH_SPACE } from './zeroWidthSpace';

/**
 * Transform a replace step into its equivalent tracked steps.
 *
 * Deletions of slices that are NOT inside existing insertion marks become
 * deletion marks. Deletions of slices that ARE inside existing insertion marks
 * are really deleted. Inserted slices get insertion marks.
 *
 * Deletions that begin at the end of a textblock (or end at the beginning of
 * one) get a zero-width space to anchor the mark on. Marks that end up abutting
 * an existing suggestion are joined onto it and share its identity.
 */
export function suggestReplaceStep(
  trackedTransaction: Transaction,
  state: EditorState,
  doc: Node,
  step: ReplaceStep,
  prevSteps: readonly Step[],
  suggestionId: SuggestionIdentity,
): boolean {
  const { deletion, insertion } = getSuggestionMarks(state.schema);

  // Check for insertion and deletion marks directly adjacent to this step's
  // boundaries. If they exist we join onto them rather than starting a new
  // suggestion.
  const nodeBefore = doc.resolve(step.from).nodeBefore;
  const markBefore =
    findSuggestionMark(nodeBefore?.marks ?? [], deletion) ??
    findSuggestionMark(nodeBefore?.marks ?? [], insertion) ??
    null;
  const nodeAfter = doc.resolve(step.to).nodeAfter;
  const markAfter =
    findSuggestionMark(nodeAfter?.marks ?? [], deletion) ??
    findSuggestionMark(nodeAfter?.marks ?? [], insertion) ??
    null;
  const adjacentId = suggestionIdentityOf(markBefore) ?? suggestionIdentityOf(markAfter);
  // Only join onto an adjacent suggestion when it is OURS and in the same
  // ten-minute bucket. Joining onto another author's mark would relabel their
  // suggestion as ours.
  const markId =
    adjacentId && sameSuggestion(adjacentId, suggestionId) ? adjacentId : suggestionId;

  const insertedRanges: { from: number; to: number }[] = [];

  // Rebase this step's boundaries onto the newest doc
  let stepFrom = rebasePos(step.from, prevSteps, trackedTransaction.steps);
  let stepTo = rebasePos(step.to, prevSteps, trackedTransaction.steps);

  if (state.selection.empty && stepFrom !== stepTo) {
    trackedTransaction.setSelection(
      TextSelection.near(trackedTransaction.doc.resolve(stepFrom)),
    );
  }

  // Ranges the SAME AUTHOR previously suggested inserting are really deleted
  // rather than marked — you retract your own suggestion, you don't suggest
  // deleting it. Another author's suggested insertion gets a deletion mark, so
  // their proposal survives as something to accept or reject.
  const isOwnInsertion = (node: Node) =>
    node.marks.some(
      (m) => m.type === insertion && suggestionIdentityOf(m)?.user === suggestionId.user,
    );
  trackedTransaction.doc.nodesBetween(stepFrom, stepTo, (node, pos) => {
    if (isOwnInsertion(node)) {
      insertedRanges.push({
        from: Math.max(pos, stepFrom),
        to: Math.min(pos + node.nodeSize, step.to),
      });
      return false;
    }
    return true;
  });

  // Applying in reverse order saves rebasing — later deletions don't move
  // earlier ones.
  insertedRanges.reverse();
  for (const range of insertedRanges) {
    trackedTransaction.delete(range.from, range.to);
  }

  stepFrom = rebasePos(step.from, prevSteps, trackedTransaction.steps);
  stepTo = rebasePos(step.to, prevSteps, trackedTransaction.steps);

  if (stepFrom !== stepTo) {
    let $stepFrom = trackedTransaction.doc.resolve(stepFrom);
    let $stepTo = trackedTransaction.doc.resolve(stepTo);

    // When there are no characters to mark before the end of a block, insert a
    // zero-width anchor so the deletion has something to live on and can be
    // rendered with a widget.
    if (!$stepFrom.nodeAfter && !findSuggestionMark($stepFrom.nodeBefore?.marks ?? [], deletion)) {
      trackedTransaction.insertText(ZERO_WIDTH_SPACE, stepFrom);
      stepTo++;
      $stepTo = trackedTransaction.doc.resolve(stepTo);
    }
    if (!$stepTo.nodeBefore && !findSuggestionMark($stepTo.nodeAfter?.marks ?? [], deletion)) {
      trackedTransaction.insertText(ZERO_WIDTH_SPACE, stepTo);
      stepTo++;
      $stepTo = trackedTransaction.doc.resolve(stepTo);
    }

    // A new deletion abutting an existing anchored one doesn't need the anchor
    // any more; the joined marks let us find the deletion across the boundary.
    if (
      $stepFrom.nodeBefore?.text?.endsWith(ZERO_WIDTH_SPACE) &&
      !$stepTo.nodeAfter?.text?.startsWith(ZERO_WIDTH_SPACE)
    ) {
      trackedTransaction.delete(stepFrom - 1, stepFrom);
      stepFrom--;
      stepTo--;
      $stepFrom = trackedTransaction.doc.resolve(stepFrom);
      $stepTo = trackedTransaction.doc.resolve(stepTo);
    }
    if (
      $stepTo.nodeAfter?.text?.startsWith(ZERO_WIDTH_SPACE) &&
      !$stepFrom.nodeBefore?.text?.endsWith(ZERO_WIDTH_SPACE)
    ) {
      trackedTransaction.delete(stepTo, stepTo + 1);
    }

    // Deleting exactly a zero-width space would appear to do nothing (the user
    // can't see it), so shift back one and mark the real character instead.
    if (
      $stepFrom.nodeBefore &&
      stepTo - stepFrom === 1 &&
      trackedTransaction.doc.textBetween(stepFrom, stepTo) === ZERO_WIDTH_SPACE
    ) {
      trackedTransaction.delete(stepFrom, stepTo);
      stepFrom--;
      stepTo--;
      $stepFrom = trackedTransaction.doc.resolve(stepFrom);
      $stepTo = trackedTransaction.doc.resolve(stepTo);
      trackedTransaction.setSelection(TextSelection.near($stepFrom));
    }
  }

  // If the deleted range maps precisely to a block range, mark the nodes rather
  // than their inline content.
  const blockRange = trackedTransaction.doc
    .resolve(stepFrom)
    .blockRange(trackedTransaction.doc.resolve(stepTo));
  if (!blockRange || blockRange.start !== stepFrom || blockRange.end !== stepTo) {
    trackedTransaction.addMark(stepFrom, stepTo, deletion.create({ ...markId }));
  } else {
    trackedTransaction.doc.nodesBetween(blockRange.start, blockRange.end, (_, pos) => {
      if (pos < blockRange.start) return true;
      trackedTransaction.addNodeMark(pos, deletion.create({ ...markId }));
      return false;
    });
  }

  // Upstream relabels an abutting mark that carries a different numeric id so
  // the two render as one suggestion. We deliberately DON'T: identity is the
  // grouping here, so relabelling would drag an adjacent suggestion across a
  // ten-minute bucket boundary (or, worse, across authors) and silently merge
  // two distinct suggestions into one. Marks that genuinely belong together
  // already share an identity and ProseMirror joins them for free.

  // Handle insertions
  if (step.slice.content.size) {
    const $to = trackedTransaction.doc.resolve(stepTo);
    // Don't allow inserting inside an existing deletion mark; shift to the end
    // of the deletion instead.
    const insertFrom = findSuggestionMarkEnd($to, deletion);

    trackedTransaction.replace(insertFrom, insertFrom, step.slice);
    // We just created this step, so we can assert that it exists
    const insertStep = trackedTransaction.steps[trackedTransaction.steps.length - 1]!;
    let insertedTo = insertStep.getMap().map(insertFrom);

    trackedTransaction.doc.nodesBetween(insertFrom, insertedTo, (node, pos) => {
      const $pos = trackedTransaction.doc.resolve(pos);
      // Skip nodes whose ancestors are already marked as insertions
      for (let d = $pos.depth; d >= 0; d--) {
        if (findSuggestionMark($pos.node(d).marks, insertion, markId)) return;
      }
      // When an insertion is only part of a node, mark only the inserted part
      const shouldAddInlineMarks =
        pos < insertFrom || pos + node.nodeSize > insertedTo || node.isInline;
      if (shouldAddInlineMarks) {
        trackedTransaction.addMark(
          Math.max(pos, insertFrom),
          Math.min(pos + node.nodeSize, insertedTo),
          insertion.create({ ...markId }),
        );
        return;
      }
      trackedTransaction.addNodeMark(pos, insertion.create({ ...markId }));
    });

    const $insertFrom = trackedTransaction.doc.resolve(insertFrom);
    let $insertedTo = trackedTransaction.doc.resolve(insertedTo);

    // As with deletions, anchor an inserted node boundary with zero-width
    // spaces on either side.
    if (!$insertFrom.nodeAfter) {
      trackedTransaction.insertText(ZERO_WIDTH_SPACE, insertFrom);
      trackedTransaction.addMark(insertFrom, insertFrom + 1, insertion.create({ ...markId }));
      insertedTo++;
      $insertedTo = trackedTransaction.doc.resolve(insertedTo);
    }
    if (!$insertedTo.nodeBefore) {
      trackedTransaction.insertText(ZERO_WIDTH_SPACE, insertedTo);
      trackedTransaction.addMark(insertedTo, insertedTo + 1, insertion.create({ ...markId }));
      insertedTo++;
      $insertedTo = trackedTransaction.doc.resolve(insertedTo);
    }

    if (insertFrom !== $to.pos) {
      trackedTransaction.setSelection(
        TextSelection.near(trackedTransaction.doc.resolve(insertFrom + step.slice.size)),
      );
    }
  }

  return sameSuggestion(markId, suggestionId);
}
