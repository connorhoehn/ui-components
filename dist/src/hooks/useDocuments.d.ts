import { ConnectionState, GatewayMessage } from '../types/gateway';
export interface DocumentInfo {
    id: string;
    title: string;
    type: string;
    status: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    icon: string;
    description?: string;
    activeCallSessionId?: string;
}
export interface DocumentPresenceUser {
    userId: string;
    displayName: string;
    color: string;
    mode?: string;
    idle?: boolean;
}
export interface UseDocumentsOptions {
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
    connectionState: ConnectionState;
}
export interface UseDocumentsReturn {
    documents: DocumentInfo[];
    presence: Record<string, DocumentPresenceUser[]>;
    loading: boolean;
    createDocument: (meta: {
        title: string;
        type: string;
        description?: string;
    }) => void;
    deleteDocument: (documentId: string) => void;
    updateDocumentMeta: (documentId: string, meta: Partial<DocumentInfo>) => void;
    refreshDocuments: () => void;
    refreshPresence: () => void;
}
export declare function useDocuments(options: UseDocumentsOptions): UseDocumentsReturn;
//# sourceMappingURL=useDocuments.d.ts.map