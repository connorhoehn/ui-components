import { GatewayProvider } from '../providers/GatewayProvider';
import { AwarenessUpdaters } from './useAwarenessState';
import { UseWebSocketReturn } from './useWebSocket';
import { DocumentMeta, Participant, Section, TaskItem, DocumentData, ViewMode, CommentThread, SectionReview } from '../types/document';
import { GatewayMessage } from '../types/gateway';
import * as Y from 'yjs';
export interface UseCollaborativeDocOptions {
    documentId: string;
    mode: ViewMode;
    ws: UseWebSocketReturn;
    userId: string;
    displayName: string;
    color: string;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
}
export interface UseCollaborativeDocReturn {
    meta: DocumentMeta | null;
    sections: Section[];
    synced: boolean;
    updateMeta: (partial: Partial<DocumentMeta>) => void;
    addSection: (section: Section) => void;
    updateSection: (sectionId: string, partial: Partial<Section>) => void;
    removeSection: (sectionId: string) => void;
    addItem: (sectionId: string, item: TaskItem) => void;
    updateItem: (sectionId: string, itemId: string, partial: Partial<TaskItem>) => void;
    ackItem: (sectionId: string, itemId: string, userId: string) => void;
    rejectItem: (sectionId: string, itemId: string, userId: string) => void;
    removeItem: (sectionId: string, itemId: string) => void;
    getSectionFragment: (sectionId: string) => Y.XmlFragment | null;
    ydoc: Y.Doc | null;
    provider: GatewayProvider | null;
    loadFromMarkdown: (markdown: string) => void;
    exportJSON: () => DocumentData | null;
    participants: Participant[];
    comments: Record<string, CommentThread[]>;
    addComment: (sectionId: string, opts: {
        text: string;
        userId: string;
        displayName: string;
        color: string;
        parentCommentId?: string | null;
    }) => void;
    resolveThread: (sectionId: string, commentId: string, resolverDisplayName: string) => void;
    unresolveThread: (sectionId: string, commentId: string) => void;
    sectionReviews: Record<string, SectionReview[]>;
    reviewSection: (sectionId: string, status: SectionReview['status'], comment?: string) => void;
    awareness: AwarenessUpdaters;
}
export declare function useCollaborativeDoc(options: UseCollaborativeDocOptions): UseCollaborativeDocReturn;
//# sourceMappingURL=useCollaborativeDoc.d.ts.map