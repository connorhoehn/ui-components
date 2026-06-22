import { DocumentData } from '../types/document';
import * as Y from 'yjs';
export interface UseDocumentExportReturn {
    exportJSON: () => DocumentData | null;
}
export declare function useDocumentExport(ydoc: Y.Doc | null): UseDocumentExportReturn;
//# sourceMappingURL=useDocumentExport.d.ts.map