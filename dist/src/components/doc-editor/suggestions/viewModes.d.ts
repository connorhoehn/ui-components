import type { Node } from '@tiptap/pm/model';
import { EditorState } from '@tiptap/pm/state';
export type SuggestionViewMode = 
/** Word's "All Markup" — the live doc, every suggestion visible. */
'all-markup'
/** Word's "Simple Markup" — the accepted result, with change bars. */
 | 'simple-markup'
/** Word's "No Markup" — as the document would read if all were accepted. */
 | 'final'
/** Word's "Original" — as it read before any suggestion. */
 | 'original';
export declare const SUGGESTION_VIEW_MODES: {
    value: SuggestionViewMode;
    label: string;
}[];
/** The document as it would read with every suggestion accepted. */
export declare function finalDoc(doc: Node): Node;
/** The document as it read before any suggestion was made. */
export declare function originalDoc(doc: Node): Node;
/**
 * The doc to render for a given view mode.
 *
 * 'all-markup' and 'simple-markup' both render the live doc — they differ only
 * in CSS (simple markup hides the inline strike/underline and shows a change
 * bar in the margin), which is why they share a document here.
 */
export declare function docForViewMode(doc: Node, mode: SuggestionViewMode): Node;
/**
 * A throwaway, non-editable EditorState for previewing `mode`.
 *
 * Feed this to a read-only EditorView. It shares the schema with the live state
 * but nothing else — no plugins, no history, no y-sync — so nothing it does can
 * leak back into the collaborative document.
 */
export declare function previewStateForViewMode(state: EditorState, mode: SuggestionViewMode): EditorState;
/** CSS class the editor container carries for a given view mode. */
export declare function viewModeClassName(mode: SuggestionViewMode): string;
//# sourceMappingURL=viewModes.d.ts.map