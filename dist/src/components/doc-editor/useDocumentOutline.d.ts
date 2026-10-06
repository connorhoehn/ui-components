import type { OutlineEntry } from './DocumentOutline';
/**
 * The slice of a Tiptap editor this needs.
 *
 * Structural on purpose: ui-components keeps the tiptap packages as optional
 * peers, and an outline is not a reason for a host to install them.
 */
export interface OutlineEditorLike {
    state: {
        doc: {
            descendants(fn: (node: OutlineNodeLike, pos: number) => void): void;
        };
    };
    view: {
        domAtPos(pos: number): {
            node: Node;
        };
    };
    on(event: 'update', cb: () => void): void;
    off(event: 'update', cb: () => void): void;
}
interface OutlineNodeLike {
    type: {
        name: string;
    };
    attrs?: Record<string, unknown>;
    textContent?: string;
}
/** Walk the document once and collect its headings, in order. */
export declare function readOutline(editor: OutlineEditorLike | null): OutlineEntry[];
/** The DOM element a heading position renders as, if it is on screen. */
export declare function elementForPosition(editor: OutlineEditorLike | null, id: string): Element | null;
export interface UseDocumentOutlineResult {
    entries: OutlineEntry[];
    activeId: string | null;
    /** Scroll the document to an entry and mark it current. */
    goTo: (id: string) => void;
}
export declare function useDocumentOutline(editor: OutlineEditorLike | null): UseDocumentOutlineResult;
/**
 * How long the document is.
 *
 * Counted from the document's own text rather than by adding Tiptap's
 * CharacterCount extension. That extension lives in `@tiptap/extensions`,
 * which is not in this package's optional-peer set — the packaging test
 * rejected it, correctly: a word count is not worth making every host that
 * imports the doc editor install another package.
 *
 * Whitespace-separated runs, which is what a word processor means by "words".
 * Null only when there is no document to count.
 */
export declare function readWordCount(editor: OutlineEditorLike | null): number | null;
/** Live word count, kept in step with the document. */
export declare function useDocumentWordCount(editor: OutlineEditorLike | null): number | null;
export {};
//# sourceMappingURL=useDocumentOutline.d.ts.map