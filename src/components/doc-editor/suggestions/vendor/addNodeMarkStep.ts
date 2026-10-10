// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 — see ./LICENSE
//
// Fork change: the modification mark carries our identity attrs alongside its
// own payload attrs.

import type { Mark, Node } from '@tiptap/pm/model';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import type { AddNodeMarkStep, Step } from '@tiptap/pm/transform';

import type { SuggestionIdentity } from './identity';
import { rebasePos } from './rebasePos';
import { getSuggestionMarks } from './utils';

/**
 * Transform an add node mark step into its equivalent tracked steps.
 *
 * The mark is applied normally and a modification mark recording the change is
 * added alongside it, so the change can be rolled back on reject.
 */
export function trackAddNodeMarkStep(
  trackedTransaction: Transaction,
  state: EditorState,
  _doc: Node,
  step: AddNodeMarkStep,
  prevSteps: readonly Step[],
  suggestionId: SuggestionIdentity,
): boolean {
  const { modification } = getSuggestionMarks(state.schema);
  const rebasedPos = rebasePos(step.pos, prevSteps, trackedTransaction.steps);
  const $pos = trackedTransaction.doc.resolve(rebasedPos);
  const node = $pos.nodeAfter;
  let marks: readonly Mark[] = node?.marks ?? [];

  const existingMods = marks.filter(
    (mark) =>
      mark.type === modification &&
      mark.attrs['type'] === 'mark' &&
      step.mark.type.excludes(state.schema.markFromJSON(mark.attrs['newValue']).type),
  );
  existingMods.forEach((mark) => {
    marks = mark.removeFromSet(marks);
  });

  let newMarks = step.mark.addToSet(marks);
  let previousValue: Mark | null = null;
  for (const mark of marks) {
    if (!newMarks.some((m) => m.eq(mark))) {
      previousValue = mark;
      break;
    }
  }
  newMarks = modification
    .create({
      ...suggestionId,
      type: 'mark',
      previousValue: previousValue?.toJSON() ?? null,
      newValue: step.mark.toJSON(),
    })
    .addToSet(newMarks);

  trackedTransaction.setNodeMarkup(rebasedPos, null, null, newMarks);
  return true;
}
