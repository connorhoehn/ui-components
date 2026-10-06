import { vi } from 'vitest';
import type { DocumentType } from '../types/documentType';
export interface MockDocTypesServer {
    /** Live view of the server-side rows (editor shape). */
    store: Map<string, DocumentType>;
    /** Raw fetch mock, for call-shape assertions. */
    fetchMock: ReturnType<typeof vi.fn>;
}
/**
 * Stubs global fetch with a stateful fake of the document-types API.
 * GET list / POST / PUT /:id / DELETE /:id are supported; any non
 * document-types URL gets a 404 so unrelated requests fail fast and loudly.
 */
export declare function installMockDocumentTypesServer(initial?: DocumentType[]): MockDocTypesServer;
//# sourceMappingURL=mockDocumentTypesServer.d.ts.map