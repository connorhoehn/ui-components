import type { Node } from '@tiptap/pm/model';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import type { AddNodeMarkStep, Step } from '@tiptap/pm/transform';
import type { SuggestionIdentity } from './identity';
/**
 * Transform an add node mark step into its equivalent tracked steps.
 *
 * The mark is applied normally and a modification mark recording the change is
 * added alongside it, so the change can be rolled back on reject.
 */
export declare function trackAddNodeMarkStep(trackedTransaction: Transaction, state: EditorState, _doc: Node, step: AddNodeMarkStep, prevSteps: readonly Step[], suggestionId: SuggestionIdentity): boolean;
//# sourceMappingURL=addNodeMarkStep.d.ts.map