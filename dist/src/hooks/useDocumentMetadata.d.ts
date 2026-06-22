import { DocumentMeta } from '../types/document';
import * as Y from 'yjs';
export interface UseDocumentMetadataReturn {
    meta: DocumentMeta | null;
    updateMeta: (partial: Partial<DocumentMeta>) => void;
}
export declare function useDocumentMetadata(ydoc: Y.Doc | null): UseDocumentMetadataReturn;
//# sourceMappingURL=useDocumentMetadata.d.ts.map