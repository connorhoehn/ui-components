import type { Node } from '@tiptap/pm/model';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import { type RemoveMarkStep, type Step } from '@tiptap/pm/transform';
import type { SuggestionIdentity } from './identity';
/**
 * Transform a remove mark step into its equivalent tracked steps.
 *
 * As with add mark steps, mark removal is modelled as a replace step.
 */
export declare function suggestRemoveMarkStep(trackedTransaction: Transaction, state: EditorState, doc: Node, step: RemoveMarkStep, prevSteps: readonly Step[], suggestionId: SuggestionIdentity): boolean;
//# sourceMappingURL=removeMarkStep.d.ts.map