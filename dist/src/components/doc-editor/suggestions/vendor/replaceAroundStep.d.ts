import type { Node } from '@tiptap/pm/model';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import { type ReplaceAroundStep, type Step } from '@tiptap/pm/transform';
import type { SuggestionIdentity } from './identity';
/**
 * Transform a replace around step into its equivalent tracked steps, by
 * reducing it to a replace step.
 */
export declare function suggestReplaceAroundStep(trackedTransaction: Transaction, state: EditorState, doc: Node, step: ReplaceAroundStep, prevSteps: readonly Step[], suggestionId: SuggestionIdentity): boolean;
//# sourceMappingURL=replaceAroundStep.d.ts.map