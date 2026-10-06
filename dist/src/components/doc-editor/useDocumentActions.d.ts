import type { UseWebSocketReturn } from '../../hooks/useWebSocket';
import type { XmlFragment } from 'yjs';
import type { CommentThread } from '../../types/document';
/**
 * The canvas body, as markdown.
 *
 * A page-shaped document keeps its content in ONE XmlFragment, not in
 * `sections` — so an export built from `data.sections` produced a file with a
 * title and nothing under it. Silently: you get a download, it opens, and your
 * document is not in it.
 *
 * Structure is read from the node names rather than stripped out, because
 * "Export Markdown" that flattens every heading and list into loose lines is
 * only half an answer.
 */
export declare function canvasFragmentToMarkdown(frag: {
    toString(): string;
} | null | undefined): string;
interface UseDocumentActionsArgs {
    documentId: string;
    userId: string;
    ws: UseWebSocketReturn;
    updateMeta: (meta: import('../../types/document').DocumentMeta) => void;
    addSection: (section: import('../../types/document').Section) => void;
    exportJSON: () => {
        meta: import('../../types/document').DocumentMeta;
        sections: import('../../types/document').Section[];
    } | null;
    getSectionFragment: (sectionId: string) => XmlFragment | null;
    /** The canvas body fragment, for page-shaped documents. Null on legacy ones. */
    getCanvasFragment?: () => XmlFragment | null;
    /**
     * Whether this document is page-shaped (`meta.schemaVersion >= 2`).
     *
     * Do NOT infer this as `sections.length === 0`. That inference is WRONG on
     * exactly the documents that matter most: converting a document does not
     * clear the legacy roots — realtime-modules says so in as many words,
     * "ydoc.getArray('sections') ← kept, frozen, never read at version >= 2" — so
     * every CONVERTED document still has a full section array. The inference says
     * "legacy", and Export writes out the pre-conversion content. You get a file,
     * it opens, and everything typed on the page since the conversion is missing
     * from it, with no error and no empty file to tip you off.
     *
     * The gate is the schema version and nothing else. `useIsCanvasDocument` in
     * `./canvas/documentShape` computes it.
     */
    isCanvas?: boolean;
    comments: Record<string, CommentThread[]>;
}
export declare function useDocumentActions({ documentId, userId, ws, updateMeta, addSection, exportJSON, getSectionFragment, getCanvasFragment, isCanvas, comments, }: UseDocumentActionsArgs): {
    demoLoaded: boolean;
    handleLoadDemo: () => void;
    handleClearDocument: () => void;
    handleExport: (format: 'markdown' | 'pdf' | 'json') => void;
};
export {};
//# sourceMappingURL=useDocumentActions.d.ts.map