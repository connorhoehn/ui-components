import type { GatewayMessage } from '../types/gateway';
import type { CommentThread } from '../types/document';
export interface UseDocumentCommentsOptions {
    documentId: string;
    idToken: string | null;
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
    connectionState: string;
}
export interface UseDocumentCommentsReturn {
    comments: Record<string, CommentThread[]>;
    addComment: (sectionId: string, text: string, parentCommentId?: string | null) => Promise<void>;
    resolveThread: (sectionId: string, commentId: string) => Promise<void>;
    unresolveThread: (sectionId: string, commentId: string) => Promise<void>;
    loading: boolean;
}
export declare function useDocumentComments(options: UseDocumentCommentsOptions): UseDocumentCommentsReturn;
//# sourceMappingURL=useDocumentComments.d.ts.map