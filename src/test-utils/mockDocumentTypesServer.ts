// In-memory /api/document-types fake for unit tests.
//
// The remote-first useDocumentTypes hook fetches on mount, so any component
// test that renders it MUST stub fetch — otherwise the suite reads (and
// writes!) whatever real dev server VITE_PLATFORM_API_URL points at, which
// is exactly how a unit test once pulled 33 rows out of the shared dev
// table. Install this in beforeEach.

import { vi } from 'vitest';
import type { DocumentType } from '../types/documentType';

export interface MockDocTypesServer {
  /** Live view of the server-side rows (editor shape). */
  store: Map<string, DocumentType>;
  /** Raw fetch mock, for call-shape assertions. */
  fetchMock: ReturnType<typeof vi.fn>;
}

interface ServerRow {
  typeId: string;
  editorSchema: DocumentType;
}

/**
 * Stubs global fetch with a stateful fake of the document-types API.
 * GET list / POST / PUT /:id / DELETE /:id are supported; any non
 * document-types URL gets a 404 so unrelated requests fail fast and loudly.
 */
export function installMockDocumentTypesServer(initial: DocumentType[] = []): MockDocTypesServer {
  const rows = new Map<string, ServerRow>(
    initial.map((t) => [`srv-${t.id}`, { typeId: `srv-${t.id}`, editorSchema: t }]),
  );

  const toItem = (r: ServerRow) => ({
    typeId: r.typeId,
    name: r.editorSchema.name,
    description: r.editorSchema.description,
    icon: r.editorSchema.icon,
    fields: [],
    editorSchema: r.editorSchema,
    createdAt: r.editorSchema.createdAt,
    updatedAt: r.editorSchema.updatedAt,
  });

  const json = (status: number, body: unknown) => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  });

  const fetchMock = vi.fn(async (url: string | URL, init?: RequestInit) => {
    const u = String(url);
    const m = u.match(/\/api\/document-types(?:\/([^/?]+))?/);
    if (!m) return json(404, { error: `mock: unexpected URL ${u}` });
    const typeId = m[1];
    const method = init?.method ?? 'GET';

    if (method === 'GET' && !typeId) {
      return json(200, { items: [...rows.values()].map(toItem) });
    }
    if (method === 'POST') {
      const body = JSON.parse(init?.body as string) as { editorSchema?: DocumentType; name: string };
      const schema = body.editorSchema;
      const id = `srv-${schema?.id ?? Math.random().toString(36).slice(2)}`;
      if (schema) rows.set(id, { typeId: id, editorSchema: schema });
      return json(201, { typeId: id });
    }
    if (method === 'PUT' && typeId) {
      const row = rows.get(typeId);
      if (!row) return json(404, {});
      const body = JSON.parse(init?.body as string) as { editorSchema?: DocumentType };
      if (body.editorSchema) row.editorSchema = body.editorSchema;
      return json(200, toItem(row));
    }
    if (method === 'DELETE' && typeId) {
      rows.delete(typeId);
      return { ok: true, status: 204, json: async () => ({}) };
    }
    return json(404, { error: `mock: unhandled ${method} ${u}` });
  });

  vi.stubGlobal('fetch', fetchMock);

  return {
    fetchMock,
    get store() {
      return new Map([...rows.entries()].map(([k, v]) => [k, v.editorSchema]));
    },
  };
}
