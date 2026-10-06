import type { Node } from '@tiptap/pm/model';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import type { AttrStep, Step } from '@tiptap/pm/transform';
import type { SuggestionIdentity } from './identity';
/**
 * Transform an attr step into its equivalent tracked steps.
 *
 * The attribute is set normally and a modification mark recording the previous
 * value is added, so reject can restore it.
 */
export declare function trackAttrStep(trackedTransaction: Transaction, state: EditorState, _doc: Node, step: AttrStep, prevSteps: readonly Step[], suggestionId: SuggestionIdentity): boolean;
//# sourceMappingURL=attrStep.d.ts.map