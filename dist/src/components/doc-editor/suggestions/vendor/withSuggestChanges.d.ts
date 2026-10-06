import type { Node, Schema } from '@tiptap/pm/model';
import type { EditorState, Transaction } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';
import type { SuggestionIdentity } from './identity';
export type SuggestionIdentityFactory = (schema: Schema, doc?: Node) => SuggestionIdentity;
/**
 * Given a standard transaction from ProseMirror, produce a new transaction that
 * SUGGESTS the changes from the original rather than applying them.
 *
 * For each type of step there is custom behavior that prevents deletions from
 * being removed from the document — adding deletion marks instead — and ensures
 * all insertions carry insertion marks.
 */
export declare function transformToSuggestionTransaction(originalTransaction: Transaction, state: EditorState, generateId: SuggestionIdentityFactory): Transaction;
/** True when this transaction must be applied verbatim, never re-tracked. */
export declare function shouldSkipSuggestChanges(tr: Transaction): boolean;
/**
 * A `dispatchTransaction` decorator. Wrap an existing `dispatchTransaction`
 * function with `withSuggestChanges`, or pass no dispatch to use the default
 * implementation.
 *
 * The result intercepts and rewrites incoming transactions while suggestion
 * mode is enabled, so that they suggest changes instead of applying them.
 */
export declare function withSuggestChanges(dispatchTransaction: EditorView['dispatch'] | undefined, generateId: SuggestionIdentityFactory): EditorView['dispatch'];
//# sourceMappingURL=withSuggestChanges.d.ts.map