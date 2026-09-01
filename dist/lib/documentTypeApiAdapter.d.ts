import type { DocumentType } from '../types/documentType';
import type { ApiFieldKind, ApiFieldWidget, ApiFieldCardinality } from '../hooks/useTypedDocuments';
export interface ApiDocumentTypeFieldCreatePayload {
    name: string;
    fieldType: ApiFieldKind;
    widget: ApiFieldWidget;
    cardinality: ApiFieldCardinality;
    required: boolean;
    helpText: string;
}
export interface ApiDocumentTypeCreatePayload {
    name: string;
    description: string;
    icon: string;
    fields: ApiDocumentTypeFieldCreatePayload[];
    /** Full local `DocumentType` — persisted verbatim so reads round-trip losslessly. */
    editorSchema: DocumentType;
}
/** Server-side list/item shape (subset the client reads). */
export interface ApiDocumentTypeItem {
    typeId: string;
    name: string;
    description: string;
    icon: string;
    fields: Array<{
        fieldId: string;
        name: string;
        fieldType: string;
        required?: boolean;
        helpText?: string;
    }>;
    editorSchema?: unknown;
    createdAt: string;
    updatedAt: string;
}
export declare function translateForApi(local: DocumentType): ApiDocumentTypeCreatePayload;
/**
 * Convert one server item into the editor's `DocumentType`.
 *
 * - `editorSchema` present and valid → use it verbatim (the id is the
 *   ORIGINAL local id, so documents referencing `documentTypeId` and e2e
 *   testids stay stable across the upload → re-download round-trip), with
 *   server-side name/description/icon winning (they may have been edited via
 *   the API after the schema was uploaded).
 * - otherwise → derive a section per server field; the server `typeId`
 *   becomes the editor id.
 *
 * Either way the (editor id → server typeId) mapping is registered so later
 * PUT/DELETE calls target the right server resource.
 */
export declare function hydrateServerDocumentType(item: ApiDocumentTypeItem): DocumentType;
export type FetchTypesResult = {
    ok: true;
    types: DocumentType[];
} | {
    ok: false;
    error: string;
};
/**
 * GET /api/document-types → editor-shaped `DocumentType[]`.
 * Never throws; a network/HTTP failure comes back as `{ ok: false }` so the
 * caller can fall back to its offline cache.
 */
export declare function fetchDocumentTypesFromServer(idToken?: string | null): Promise<FetchTypesResult>;
export declare function _resetLocalToServerIdForTests(): void;
export interface SyncResult {
    ok: boolean;
    serverTypeId?: string;
    /** HTTP status when the server answered; absent on network failure. */
    status?: number;
    error?: string;
}
/** True when the server itself REJECTED the write (4xx) — do not save locally. */
export declare function isRejection(r: SyncResult): boolean;
export declare function syncDocumentTypeCreate(local: DocumentType, idToken?: string | null): Promise<SyncResult>;
export declare function syncDocumentTypeUpdate(local: DocumentType, idToken?: string | null): Promise<SyncResult>;
export declare function syncDocumentTypeDelete(localId: string, idToken?: string | null, serverTypeIdHint?: string): Promise<SyncResult>;
//# sourceMappingURL=documentTypeApiAdapter.d.ts.map