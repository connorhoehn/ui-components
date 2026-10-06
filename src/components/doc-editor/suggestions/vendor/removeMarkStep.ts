// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 — see ./LICENSE

import type { Node } from '@tiptap/pm/model';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import {
  type RemoveMarkStep,
  type ReplaceStep,
  replaceStep,
  type Step,
} from '@tiptap/pm/transform';

import { applySuggestionsToRange } from './commands';
import type { SuggestionIdentity } from './identity';
import { suggestReplaceStep } from './replaceStep';

/**
 * Transform a remove mark step into its equivalent tracked steps.
 *
 * As with add mark steps, mark removal is modelled as a replace step.
 */
export function suggestRemoveMarkStep(
  trackedTransaction: Transaction,
  state: EditorState,
  doc: Node,
  step: RemoveMarkStep,
  prevSteps: readonly Step[],
  suggestionId: SuggestionIdentity,
): boolean {
  const applied = step.apply(doc).doc;
  if (!applied) return false;
  const slice = applySuggestionsToRange(applied, step.from, step.to);
  const replace = replaceStep(doc, step.from, step.to, slice);
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
