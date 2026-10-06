import type { Node } from '@tiptap/pm/model';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import { type AddMarkStep, type Step } from '@tiptap/pm/transform';
import type { SuggestionIdentity } from './identity';
/**
 * Transform an add mark step into its equivalent tracked steps.
 *
 * Mark steps are modelled as replace steps: the marked range is re-inserted
 * with the new formatting, so it shows up as a delete + insert suggestion.
 */
export declare function trackAddMarkStep(trackedTransaction: Transaction, state: EditorState, doc: Node, step: AddMarkStep, prevSteps: readonly Step[], suggestionId: SuggestionIdentity): boolean;
//# sourceMappingURL=addMarkStep.d.ts.map