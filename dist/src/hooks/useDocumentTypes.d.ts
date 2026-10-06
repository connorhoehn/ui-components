import type { DocumentType } from '../types/documentType';
export declare const STORAGE_KEY = "ws_document_types_v1";
export declare function isValidDocumentType(x: unknown): x is DocumentType;
export declare function loadTypes(): DocumentType[];
export declare function persistTypes(types: DocumentType[]): void;
/** Test seam — the guard is session-scoped, so suites must clear it. */
export declare function _resetMigrationGuardForTests(): void;
export declare function refreshTypesFromServer(idToken?: string | null): Promise<{
    ok: true;
    types: DocumentType[];
} | {
    ok: false;
    error: string;
    cached: DocumentType[];
}>;
/** Where the currently rendered list came from. */
export type TypesSource = 'loading' | 'remote' | 'cache';
export type SaveOutcome = {
    status: 'synced';
    type: DocumentType;
}
/** Server unreachable / 5xx — saved to the local cache, NOT on the server. */
 | {
    status: 'offline';
    type: DocumentType;
    error: string;
}
/** Server rejected the payload (4xx) — NOTHING was saved. */
 | {
    status: 'rejected';
    error: string;
};
export type DeleteOutcome = {
    status: 'synced';
} | {
    status: 'offline';
    error: string;
} | {
    status: 'rejected';
    error: string;
};
export interface UseDocumentTypesOptions {
    /** Cognito ID token. Attached to every server call when present. */
    idToken?: string | null;
    /**
     * Origin for `/api/document-types`. Applied through
     * `setDocumentTypeApiBaseUrl`, and it has to be given here (or set at boot)
     * because the build-time `VITE_*` names this module falls back to are baked
     * into the LIBRARY's bundle and are always empty for a consumer.
     */
    baseUrl?: string;
}
export interface UseDocumentTypesReturn {
    types: DocumentType[];
    /** True while the initial server fetch (or a refresh) is in flight. */
    loading: boolean;
    /** 'remote' = list reflects the server; 'cache' = offline fallback. */
    source: TypesSource;
    /** Last fetch error (when source === 'cache'), else null. */
    error: string | null;
    /** Re-fetch from the server. */
    refresh: () => Promise<void>;
    createType: (data: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>) => Promise<SaveOutcome>;
    updateType: (id: string, patch: Partial<Omit<DocumentType, 'id' | 'createdAt'>>) => Promise<SaveOutcome>;
    deleteType: (id: string) => Promise<DeleteOutcome>;
    getType: (id: string) => DocumentType | undefined;
}
export declare function useDocumentTypes(options?: UseDocumentTypesOptions): UseDocumentTypesReturn;
//# sourceMappingURL=useDocumentTypes.d.ts.map