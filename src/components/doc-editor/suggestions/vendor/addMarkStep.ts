// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 — see ./LICENSE

import type { Node } from '@tiptap/pm/model';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import {
  type AddMarkStep,
  type ReplaceStep,
  replaceStep,
  type Step,
} from '@tiptap/pm/transform';

import { applySuggestionsToRange } from './commands';
import type { SuggestionIdentity } from './identity';
import { suggestReplaceStep } from './replaceStep';

/**
 * Transform an add mark step into its equivalent tracked steps.
 *
 * Mark steps are modelled as replace steps: the marked range is re-inserted
 * with the new formatting, so it shows up as a delete + insert suggestion.
 */
export function trackAddMarkStep(
  trackedTransaction: Transaction,
  state: EditorState,
  doc: Node,
  step: AddMarkStep,
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
