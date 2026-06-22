import { DocumentType } from '../types/documentType';
export declare const STORAGE_KEY = "ws_document_types_v1";
export declare function isValidDocumentType(x: unknown): x is DocumentType;
export declare function loadTypes(): DocumentType[];
export declare function persistTypes(types: DocumentType[]): void;
export type SyncOp = 'create' | 'update' | 'delete';
export interface SyncStatus {
    /** Operation that triggered the most recent sync. */
    op: SyncOp;
    /** Whether the server round-trip succeeded. */
    ok: boolean;
    /** Increases on every recorded sync so UI keys can react. */
    key: number;
    /** Optional error message for failed syncs. */
    error?: string;
}
export interface UseDocumentTypesOptions {
    /** Cognito ID token. When present, saves dual-write to the server. */
    idToken?: string | null;
}
export interface UseDocumentTypesReturn {
    types: DocumentType[];
    createType: (data: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>) => DocumentType;
    updateType: (id: string, patch: Partial<Omit<DocumentType, 'id' | 'createdAt'>>) => void;
    deleteType: (id: string) => void;
    getType: (id: string) => DocumentType | undefined;
    /** Most recent server-sync outcome. null until the first sync attempt. */
    lastSync: SyncStatus | null;
}
export declare function useDocumentTypes(options?: UseDocumentTypesOptions): UseDocumentTypesReturn;
//# sourceMappingURL=useDocumentTypes.d.ts.map