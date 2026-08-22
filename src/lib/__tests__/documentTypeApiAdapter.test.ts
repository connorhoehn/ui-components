// documentTypeApiAdapter — the wizard→API translation and the best-effort
// create/update/delete sync with its local→server id memory. The interesting
// contracts: renderer-id fallback to text, the create-on-first-update path,
// and 404 → re-create.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  translateForApi,
  syncDocumentTypeCreate,
  syncDocumentTypeUpdate,
  syncDocumentTypeDelete,
  _resetLocalToServerIdForTests,
} from '../documentTypeApiAdapter';
import type { DocumentType, DocumentTypeField } from '../../types/documentType';

function field(partial: Partial<DocumentTypeField>): DocumentTypeField {
  return {
    id: 'f1', name: 'Field', sectionType: 'text', required: false,
    defaultCollapsed: false, placeholder: '', hiddenInModes: [], rendererOverrides: {},
    ...partial,
  };
}

function docType(fields: DocumentTypeField[]): DocumentType {
  return {
    id: 'local-1', name: 'RFC', description: 'd', icon: '📄', fields,
  } as DocumentType;
}

function mockFetch(responses: Array<{ ok: boolean; status?: number; json?: unknown }>) {
  const fn = vi.fn();
  for (const r of responses) {
    fn.mockResolvedValueOnce({
      ok: r.ok,
      status: r.status ?? (r.ok ? 200 : 500),
      json: async () => r.json ?? {},
    });
  }
  vi.stubGlobal('fetch', fn);
  return fn;
}

beforeEach(() => _resetLocalToServerIdForTests());
afterEach(() => vi.unstubAllGlobals());

describe('translateForApi', () => {
  it('maps known renderer ids to their field kinds', () => {
    const out = translateForApi(
      docType([
        field({ id: 'a', sectionType: 'rich-text' }),
        field({ id: 'b', sectionType: 'number' }),
        field({ id: 'c', sectionType: 'date' }),
        field({ id: 'd', sectionType: 'checkbox' }),
      ]),
    );
    expect(out.fields.map((f) => [f.fieldType, f.widget])).toEqual([
      ['long_text', 'textarea'],
      ['number', 'number_input'],
      ['date', 'date_picker'],
      ['boolean', 'checkbox'],
    ]);
  });

  it('falls back to text/text_field for unknown renderer ids', () => {
    const out = translateForApi(docType([field({ sectionType: 'diagram' })]));
    expect(out.fields[0]).toMatchObject({ fieldType: 'text', widget: 'text_field', cardinality: 1 });
  });

  it('carries placeholder as helpText', () => {
    const out = translateForApi(docType([field({ placeholder: 'e.g. K8S-1' })]));
    expect(out.fields[0].helpText).toBe('e.g. K8S-1');
  });
});

describe('sync lifecycle', () => {
  it('create POSTs and remembers the server id for later updates', async () => {
    const f = mockFetch([
      { ok: true, json: { typeId: 'srv-9' } },
      { ok: true, json: {} },
    ]);
    const local = docType([field({})]);
    const created = await syncDocumentTypeCreate(local, 'tok');
    expect(created).toEqual({ ok: true, serverTypeId: 'srv-9' });

    const updated = await syncDocumentTypeUpdate(local, 'tok');
    expect(updated.ok).toBe(true);
    const [url, init] = f.mock.calls[1];
    expect(String(url)).toContain('/api/document-types/srv-9');
    expect(init.method).toBe('PUT');
  });

  it('update of a never-synced type falls back to create', async () => {
    const f = mockFetch([{ ok: true, json: { typeId: 'srv-1' } }]);
    const out = await syncDocumentTypeUpdate(docType([field({})]), 'tok');
    expect(out).toEqual({ ok: true, serverTypeId: 'srv-1' });
    expect(f.mock.calls[0][1].method).toBe('POST');
  });

  it('update hitting a 404 re-creates the server row', async () => {
    const f = mockFetch([
      { ok: true, json: { typeId: 'srv-old' } },
      { ok: false, status: 404 },
      { ok: true, json: { typeId: 'srv-new' } },
    ]);
    const local = docType([field({})]);
    await syncDocumentTypeCreate(local, 'tok');
    const out = await syncDocumentTypeUpdate(local, 'tok');
    expect(out).toEqual({ ok: true, serverTypeId: 'srv-new' });
    expect(f.mock.calls[2][1].method).toBe('POST');
  });

  it('delete of a never-synced type is a clean no-op', async () => {
    const f = mockFetch([]);
    const out = await syncDocumentTypeDelete('local-x', 'tok');
    expect(out).toEqual({ ok: true });
    expect(f).not.toHaveBeenCalled();
  });

  it('network errors surface as {ok:false} instead of throwing', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const out = await syncDocumentTypeCreate(docType([field({})]), 'tok');
    expect(out).toEqual({ ok: false, error: 'offline' });
  });
});
