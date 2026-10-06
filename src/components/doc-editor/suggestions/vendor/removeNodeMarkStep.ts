// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 — see ./LICENSE

import type { Mark, Node } from '@tiptap/pm/model';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import type { RemoveNodeMarkStep, Step } from '@tiptap/pm/transform';

import type { SuggestionIdentity } from './identity';
import { rebasePos } from './rebasePos';
import { getSuggestionMarks } from './utils';

/**
 * Transform a remove node mark step into its equivalent tracked steps.
 *
 * If the mark being removed was itself a suggested addition, both it and its
 * modification mark are dropped. Otherwise a modification mark recording the
 * removal is added.
 */
export function suggestRemoveNodeMarkStep(
  trackedTransaction: Transaction,
  state: EditorState,
  _doc: Node,
  step: RemoveNodeMarkStep,
  prevSteps: readonly Step[],
  suggestionId: SuggestionIdentity,
): boolean {
  const { modification } = getSuggestionMarks(state.schema);
  const rebasedPos = rebasePos(step.pos, prevSteps, trackedTransaction.steps);
  const $pos = trackedTransaction.doc.resolve(rebasedPos);
  const node = $pos.nodeAfter;
  let marks: readonly Mark[] = node?.marks ?? [];

  const existingMod = marks.find(
    (mark) =>
      mark.type === modification &&
      mark.attrs['type'] === 'mark' &&
      mark.attrs['newValue'] &&
      step.mark.eq(state.schema.markFromJSON(mark.attrs['newValue'])),
  );
  if (existingMod) {
    trackedTransaction.removeNodeMark(rebasedPos, existingMod);
    trackedTransaction.removeNodeMark(
      rebasedPos,
      state.schema.markFromJSON(existingMod.attrs['newValue']),
    );
    return false;
  }

  marks = step.mark.removeFromSet(marks);
  marks = modification
    .create({
      ...suggestionId,
      type: 'mark',
      previousValue: step.mark.toJSON(),
      newValue: null,
    })
    .addToSet(marks);

  trackedTransaction.setNodeMarkup(rebasedPos, null, null, marks);
  return true;
}
