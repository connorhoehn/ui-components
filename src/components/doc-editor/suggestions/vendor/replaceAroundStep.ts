// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 — see ./LICENSE

import type { Node } from '@tiptap/pm/model';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import {
  AddNodeMarkStep,
  AttrStep,
  RemoveNodeMarkStep,
  type ReplaceAroundStep,
  type ReplaceStep,
  replaceStep,
  type Step,
} from '@tiptap/pm/transform';

import { trackAddNodeMarkStep } from './addNodeMarkStep';
import { trackAttrStep } from './attrStep';
import { applySuggestionsToRange } from './commands';
import type { SuggestionIdentity } from './identity';
import { rebasePos } from './rebasePos';
import { suggestRemoveNodeMarkStep } from './removeNodeMarkStep';
import { suggestReplaceStep } from './replaceStep';
import { getSuggestionMarks } from './utils';

/**
 * Detect and handle changes from `setNodeMarkup` so they are tracked as a
 * modification instead of a deletion + insertion.
 * https://github.com/handlewithcarecollective/prosemirror-suggest-changes/issues/7
 */
function suggestSetNodeMarkup(
  trackedTransaction: Transaction,
  state: EditorState,
  doc: Node,
  step: ReplaceAroundStep,
  prevSteps: readonly Step[],
  suggestionId: SuggestionIdentity,
): boolean {
  // `structure` is a real constructor argument of ReplaceAroundStep but is not
  // in prosemirror-transform's published type declarations.
  const structure = (step as ReplaceAroundStep & { structure?: boolean }).structure;
  if (
    step.insert === 1 &&
    step.slice.size === 2 &&
    step.gapTo === step.to - 1 &&
    step.gapFrom === step.from + 1 &&
    structure
  ) {
    const { modification } = getSuggestionMarks(state.schema);
    const newNode = step.slice.content.firstChild;
    let from = rebasePos(step.from, prevSteps, trackedTransaction.steps);
    let oldNode = trackedTransaction.doc.resolve(from).nodeAfter;
    if (!newNode || !oldNode) {
      throw new Error(
        'Failed to apply modifications to node: unexpected ReplaceAroundStep as oldNode / newNode is null',
      );
    }

    const addedMarks = newNode.marks.filter((m) => !oldNode?.marks.some((m2) => m2.eq(m)));
    addedMarks.forEach((mark) => {
      if (mark.type === modification) {
        return;
      }
      trackAddNodeMarkStep(
        trackedTransaction,
        state,
        doc,
        new AddNodeMarkStep(step.from, mark),
        prevSteps,
        suggestionId,
      );
    });

    from = rebasePos(step.from, prevSteps, trackedTransaction.steps);
    oldNode = trackedTransaction.doc.resolve(from).nodeAfter;
    if (!oldNode) {
      throw new Error(
        'Failed to apply modifications to node: unexpected ReplaceAroundStep as oldNode is null',
      );
    }

    const removedMarks = oldNode.marks.filter((m) => !newNode.marks.some((m2) => m2.eq(m)));
    removedMarks.forEach((mark) => {
      if (mark.type === modification) {
        return;
      }
      suggestRemoveNodeMarkStep(
        trackedTransaction,
        state,
        doc,
        new RemoveNodeMarkStep(step.from, mark),
        prevSteps,
        suggestionId,
      );
    });

    if (newNode.type.name !== oldNode.type.name) {
      const rebasedPos = rebasePos(step.from, prevSteps, trackedTransaction.steps);
      const $pos = trackedTransaction.doc.resolve(rebasedPos);
      const node = $pos.nodeAfter;
      if (!node) {
        throw new Error('Failed to apply modifications to node: no node found');
      }
      let marks = node.marks;
      const existingMod = marks.find(
        (mark) => mark.type === modification && mark.attrs['type'] === 'nodeType',
      );
      if (existingMod) {
        marks = existingMod.removeFromSet(marks);
      }
      marks = modification
        .create({
          ...suggestionId,
          type: 'nodeType',
          previousValue: node.type.name,
          newValue: newNode.type.name,
        })
        .addToSet(marks);
      trackedTransaction.setNodeMarkup(rebasedPos, newNode.type, null, marks);
    }

    const attrNames = new Set([...Object.keys(newNode.attrs), ...Object.keys(oldNode.attrs)]);
    for (const attr of attrNames) {
      if (newNode.attrs[attr] !== oldNode.attrs[attr]) {
        trackAttrStep(
          trackedTransaction,
          state,
          doc,
          new AttrStep(step.from, attr, newNode.attrs[attr]),
          prevSteps,
          suggestionId,
        );
      }
    }
    return true;
  }
  return false;
}

/**
 * Transform a replace around step into its equivalent tracked steps, by
 * reducing it to a replace step.
 */
export function suggestReplaceAroundStep(
  trackedTransaction: Transaction,
  state: EditorState,
  doc: Node,
  step: ReplaceAroundStep,
  prevSteps: readonly Step[],
  suggestionId: SuggestionIdentity,
): boolean {
  const handled = suggestSetNodeMarkup(
    trackedTransaction,
    state,
    doc,
    step,
    prevSteps,
    suggestionId,
  );
  if (handled) {
    return true;
  }
  const applied = step.apply(doc).doc;
  if (!applied) return false;
  const from = step.getMap().map(step.from, -1);
  const to = step.getMap().map(step.to, 1);
  const blockRange = applied.resolve(from).blockRange(applied.resolve(to));
  if (!blockRange) return false;
  const replace = replaceStep(
    doc,
    step.getMap().invert().map(blockRange.start),
    step.getMap().invert().map(blockRange.end),
    applySuggestionsToRange(applied, blockRange.start, blockRange.end),
  );
  if (!replace) return false;
  return suggestReplaceStep(
    trackedTransaction,
    state,
    doc,
    replace as ReplaceStep,
    prevSteps,
    suggestionId,
  );
}
