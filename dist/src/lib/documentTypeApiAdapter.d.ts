import { DocumentType } from '../types/documentType';
import { ApiFieldKind, ApiFieldWidget, ApiFieldCardinality } from '../hooks/useTypedDocuments';
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
}
export declare function translateForApi(local: DocumentType): ApiDocumentTypeCreatePayload;
export declare function _resetLocalToServerIdForTests(): void;
export interface SyncResult {
    ok: boolean;
    serverTypeId?: string;
    error?: string;
}
export declare function syncDocumentTypeCreate(local: DocumentType, idToken: string): Promise<SyncResult>;
export declare function syncDocumentTypeUpdate(local: DocumentType, idToken: string): Promise<SyncResult>;
export declare function syncDocumentTypeDelete(localId: string, idToken: string): Promise<SyncResult>;
//# sourceMappingURL=documentTypeApiAdapter.d.ts.map