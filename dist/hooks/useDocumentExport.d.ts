import * as Y from 'yjs';
import type { DocumentData } from '../types/document';
export interface UseDocumentExportReturn {
    exportJSON: () => DocumentData | null;
}
export declare function useDocumentExport(ydoc: Y.Doc | null): UseDocumentExportReturn;
//# sourceMappingURL=useDocumentExport.d.ts.map