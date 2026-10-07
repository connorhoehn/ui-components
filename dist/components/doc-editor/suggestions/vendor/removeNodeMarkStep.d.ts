import type { Node } from '@tiptap/pm/model';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import type { RemoveNodeMarkStep, Step } from '@tiptap/pm/transform';
import type { SuggestionIdentity } from './identity';
/**
 * Transform a remove node mark step into its equivalent tracked steps.
 *
 * If the mark being removed was itself a suggested addition, both it and its
 * modification mark are dropped. Otherwise a modification mark recording the
 * removal is added.
 */
export declare function suggestRemoveNodeMarkStep(trackedTransaction: Transaction, state: EditorState, _doc: Node, step: RemoveNodeMarkStep, prevSteps: readonly Step[], suggestionId: SuggestionIdentity): boolean;
//# sourceMappingURL=removeNodeMarkStep.d.ts.map