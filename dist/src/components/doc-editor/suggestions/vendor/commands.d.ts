import type { Node } from '@tiptap/pm/model';
import { type Command, type EditorState } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';
import { type SuggestionIdentity } from './identity';
/** The document as it would read with every suggestion accepted. */
export declare function applySuggestionsToNode(node: Node): Node;
/** The document as it would read with every suggestion rejected. */
export declare function revertSuggestionsToNode(node: Node): Node;
export declare function applySuggestionsToRange(doc: Node, from: number, to: number): import("prosemirror-model").Slice;
/**
 * Command that applies (accepts) all tracked changes in a document.
 *
 * Content inside deletion marks is deleted. Insertion and modification marks
 * are removed, leaving their content in place.
 */
export declare function applySuggestions(state: EditorState, dispatch?: EditorView['dispatch']): boolean;
/** Command that applies all tracked changes in the given range. */
export declare function applySuggestionsInRange(from?: number, to?: number): Command;
/** Command that applies (accepts) one tracked change. */
export declare function applySuggestion(suggestionId: SuggestionIdentity, from?: number, to?: number): Command;
/**
 * Command that reverts (rejects) all tracked changes in a document.
 *
 * Content inside insertion marks is deleted. Deletion marks are removed,
 * leaving their content in place. Modifications are rolled back.
 */
export declare function revertSuggestions(state: EditorState, dispatch?: EditorView['dispatch']): boolean;
/** Command that reverts all tracked changes in the given range. */
export declare function revertSuggestionsInRange(from?: number, to?: number): Command;
/** Command that reverts (rejects) one tracked change. */
export declare function revertSuggestion(suggestionId: SuggestionIdentity, from?: number, to?: number): Command;
/** Command that moves the selection to cover an existing change. */
export declare function selectSuggestion(suggestionId: SuggestionIdentity): Command;
/** Command that enables suggestion mode. */
export declare function enableSuggestChanges(state: EditorState, dispatch?: EditorView['dispatch']): boolean;
/** Command that disables suggestion mode. */
export declare function disableSuggestChanges(state: EditorState, dispatch?: EditorView['dispatch']): boolean;
/** Command that toggles suggestion mode. */
export declare function toggleSuggestChanges(state: EditorState, dispatch?: EditorView['dispatch']): boolean;
//# sourceMappingURL=commands.d.ts.map