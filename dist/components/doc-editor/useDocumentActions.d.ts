import type { UseWebSocketReturn } from '../../hooks/useWebSocket';
import type { XmlFragment } from 'yjs';
import type { CommentThread } from '../../types/document';
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
    comments: Record<string, CommentThread[]>;
}
export declare function useDocumentActions({ documentId, userId, ws, updateMeta, addSection, exportJSON, getSectionFragment, comments, }: UseDocumentActionsArgs): {
    demoLoaded: boolean;
    handleLoadDemo: () => void;
    handleClearDocument: () => void;
    handleExport: (format: "markdown" | "pdf" | "json") => void;
};
export {};
//# sourceMappingURL=useDocumentActions.d.ts.map