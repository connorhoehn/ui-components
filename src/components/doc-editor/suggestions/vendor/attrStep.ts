// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 — see ./LICENSE

import type { Mark, Node } from '@tiptap/pm/model';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import type { AttrStep, Step } from '@tiptap/pm/transform';

import type { SuggestionIdentity } from './identity';
import { rebasePos } from './rebasePos';
import { getSuggestionMarks } from './utils';

/**
 * Transform an attr step into its equivalent tracked steps.
 *
 * The attribute is set normally and a modification mark recording the previous
 * value is added, so reject can restore it.
 */
export function trackAttrStep(
  trackedTransaction: Transaction,
  state: EditorState,
  _doc: Node,
  step: AttrStep,
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
      mark.attrs['type'] === 'attr' &&
      mark.attrs['attrName'] === step.attr,
  );
  if (existingMod) {
    marks = existingMod.removeFromSet(marks);
  }
  marks = modification
    .create({
      ...suggestionId,
      type: 'attr',
      attrName: step.attr,
      previousValue: node?.attrs[step.attr] ?? null,
      newValue: step.value,
    })
    .addToSet(marks);

  trackedTransaction.setNodeMarkup(
    rebasedPos,
    null,
    { ...node?.attrs, [step.attr]: step.value },
    marks,
  );
  return true;
}
