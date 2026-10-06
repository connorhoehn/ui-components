import type { Node } from '@tiptap/pm/model';
import { type EditorState, type Transaction } from '@tiptap/pm/state';
import type { ReplaceStep, Step } from '@tiptap/pm/transform';
import { type SuggestionIdentity } from './identity';
/**
 * Transform a replace step into its equivalent tracked steps.
 *
 * Deletions of slices that are NOT inside existing insertion marks become
 * deletion marks. Deletions of slices that ARE inside existing insertion marks
 * are really deleted. Inserted slices get insertion marks.
 *
 * Deletions that begin at the end of a textblock (or end at the beginning of
 * one) get a zero-width space to anchor the mark on. Marks that end up abutting
 * an existing suggestion are joined onto it and share its identity.
 */
export declare function suggestReplaceStep(trackedTransaction: Transaction, state: EditorState, doc: Node, step: ReplaceStep, prevSteps: readonly Step[], suggestionId: SuggestionIdentity): boolean;
//# sourceMappingURL=replaceStep.d.ts.map