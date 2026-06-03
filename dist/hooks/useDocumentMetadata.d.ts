import * as Y from 'yjs';
import type { DocumentMeta } from '../types/document';
export interface UseDocumentMetadataReturn {
    meta: DocumentMeta | null;
    updateMeta: (partial: Partial<DocumentMeta>) => void;
}
export declare function useDocumentMetadata(ydoc: Y.Doc | null): UseDocumentMetadataReturn;
//# sourceMappingURL=useDocumentMetadata.d.ts.map