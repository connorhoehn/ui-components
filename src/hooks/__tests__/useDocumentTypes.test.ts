// Coverage for the REMOTE-FIRST document types hook.
//
// The contract under test (the /documents "no templates" root fix):
//   - the server list is the source of truth; a successful fetch REPLACES
//     whatever localStorage held (and rewrites the cache);
//   - a fetch failure falls back to the cache and says so (source='cache');
//   - cache-only types are migrated (uploaded) on the first successful fetch
//     and remain visible immediately;
//   - writes are write-through: server-first, with 4xx = rejected (nothing
//     saved anywhere), network/5xx = offline local save, 2xx = synced.

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import {
  loadTypes,
  persistTypes,
  isValidDocumentType,
  useDocumentTypes,
  refreshTypesFromServer,
  STORAGE_KEY,
  _resetMigrationGuardForTests,
} from '../useDocumentTypes';
import { _resetLocalToServerIdForTests } from '../../lib/documentTypeApiAdapter';
import type { DocumentType } from '../../types/documentType';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeType(overrides: Partial<DocumentType> = {}): DocumentType {
  return {
    id: crypto.randomUUID(),
    name: `Test Type ${Math.random().toString(36).slice(2, 7)}`,
    description: 'A test type',
    icon: '📄',
    fields: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

function seedStorage(types: DocumentType[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(types));
}

/** Server GET /api/document-types answer carrying the given editor types. */
function listResponse(types: DocumentType[]) {
  return {
    ok: true,
    status: 200,
    json: async () => ({
      items: types.map((t) => ({
        typeId: `srv-${t.id}`,
        name: t.name,
        description: t.description,
        icon: t.icon,
        fields: [],
        editorSchema: t,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      })),
    }),
  };
}

const createdResponse = { ok: true, status: 201, json: async () => ({ typeId: 'srv-new' }) };

// ---------------------------------------------------------------------------
// Test lifecycle
// ---------------------------------------------------------------------------

beforeEach(() => {
  localStorage.clear();
  _resetLocalToServerIdForTests();
  _resetMigrationGuardForTests();
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// isValidDocumentType (unchanged contract)
// ---------------------------------------------------------------------------

describe('isValidDocumentType', () => {
  it('accepts a fully-formed DocumentType', () => {
    expect(isValidDocumentType(makeType())).toBe(true);
  });
  it('rejects null / strings / missing fields', () => {
    expect(isValidDocumentType(null)).toBe(false);
    expect(isValidDocumentType('hello')).toBe(false);
    const { fields: _dropped, ...noFields } = makeType();
    expect(isValidDocumentType(noFields)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Cache helpers
// ---------------------------------------------------------------------------

describe('loadTypes / persistTypes (offline cache)', () => {
  it('round-trips and silently drops corrupt entries', () => {
    const good = makeType();
    seedStorage([good, { junk: true } as unknown as DocumentType]);
    const loaded = loadTypes();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].id).toBe(good.id);
  });

  it('returns [] on unparseable storage', () => {
    localStorage.setItem(STORAGE_KEY, '{not json');
    expect(loadTypes()).toEqual([]);
  });

  it('persistTypes writes the cache key', () => {
    const t = makeType();
    persistTypes([t]);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// Remote-first read ordering
// ---------------------------------------------------------------------------

describe('remote-first read', () => {
  it('a successful fetch REPLACES the localStorage cache (server is truth)', async () => {
    const stale = makeType({ name: 'Stale Local Ghost' });
    seedStorage([stale]);
    const serverType = makeType({ name: 'Server Truth' });
    // The stale cache entry shares no id/name with the server, so the hook
    // will also try to migrate it — answer the POST too.
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) =>
      init?.method === 'POST' ? createdResponse : listResponse([serverType]),
    );
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useDocumentTypes());
    await waitFor(() => expect(result.current.source).toBe('remote'));

    expect(result.current.types.map((t) => t.name)).toContain('Server Truth');
    expect(result.current.error).toBeNull();
    // The cache was rewritten to the merged (server ∪ migrating) list.
    const cached = loadTypes().map((t) => t.name);
    expect(cached).toContain('Server Truth');
  });

  it('server [] with an empty cache → empty list, source=remote (NOT a fallback)', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => listResponse([])));
    const { result } = renderHook(() => useDocumentTypes());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.source).toBe('remote');
    expect(result.current.types).toEqual([]);
  });

  it('fetch failure falls back to the cache and surfaces the error', async () => {
    const cachedType = makeType({ name: 'Cached Survivor' });
    seedStorage([cachedType]);
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('ECONNREFUSED'); }));

    const { result } = renderHook(() => useDocumentTypes());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.source).toBe('cache');
    expect(result.current.error).toMatch(/ECONNREFUSED/);
    expect(result.current.types.map((t) => t.name)).toEqual(['Cached Survivor']);
  });

  it('migrates cache-only types: visible immediately AND uploaded via POST', async () => {
    const localOnly = makeType({ name: 'Pre-Remote Era Type' });
    const onServer = makeType({ name: 'Already Remote' });
    seedStorage([localOnly, onServer]);

    const posts: unknown[] = [];
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === 'POST') {
        posts.push(JSON.parse(init.body as string));
        return createdResponse;
      }
      return listResponse([onServer]);
    });
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useDocumentTypes());
    await waitFor(() => expect(result.current.source).toBe('remote'));

    // Both visible — the migrating type did not vanish while uploading.
    expect(result.current.types.map((t) => t.name).sort()).toEqual(
      ['Already Remote', 'Pre-Remote Era Type'].sort(),
    );
    // Exactly one upload, carrying the full local shape as editorSchema.
    await waitFor(() => expect(posts).toHaveLength(1));
    expect((posts[0] as { editorSchema: DocumentType }).editorSchema.id).toBe(localOnly.id);
  });

  it('NEVER resurrects a server-deleted type: marked cache entries absent from the server are dropped, not uploaded', async () => {
    // A cache entry carrying serverTypeId was hydrated from the server once;
    // if the server no longer lists it, it was deleted there. Regression for
    // the live incident where a polluted dev-tab cache kept re-seeding rows
    // the cleanup had just removed.
    const deletedRemotely = makeType({ name: 'Deleted On Server', serverTypeId: 'srv-gone' });
    seedStorage([deletedRemotely]);
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) =>
      init?.method === 'POST' ? createdResponse : listResponse([]),
    );
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useDocumentTypes());
    await waitFor(() => expect(result.current.source).toBe('remote'));

    expect(result.current.types).toHaveLength(0); // dropped from display
    expect(loadTypes()).toHaveLength(0);          // and from the cache
    const posts = fetchMock.mock.calls.filter(([, init]) => (init as RequestInit | undefined)?.method === 'POST');
    expect(posts).toHaveLength(0);                // and NOT re-uploaded
  });

  it('does NOT re-upload a type the server already has (idempotent by name)', async () => {
    const shared = makeType({ name: 'Same Name' });
    // Cache copy has a different id but the same name.
    seedStorage([makeType({ name: 'Same Name' })]);
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) =>
      init?.method === 'POST' ? createdResponse : listResponse([shared]),
    );
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useDocumentTypes());
    await waitFor(() => expect(result.current.source).toBe('remote'));

    expect(result.current.types).toHaveLength(1); // no dup
    expect(fetchMock.mock.calls.filter(([, init]) => (init as RequestInit | undefined)?.method === 'POST')).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Write-through outcomes
// ---------------------------------------------------------------------------

describe('write-through createType', () => {
  it('synced: POST first, then local commit', async () => {
    const order: string[] = [];
    vi.stubGlobal('fetch', vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === 'POST') { order.push('server-post'); return createdResponse; }
      return listResponse([]);
    }));

    const { result } = renderHook(() => useDocumentTypes());
    await waitFor(() => expect(result.current.loading).toBe(false));

    let outcome!: Awaited<ReturnType<typeof result.current.createType>>;
    await act(async () => {
      outcome = await result.current.createType({ name: 'New One', description: '', icon: '📄', fields: [] });
    });

    expect(outcome.status).toBe('synced');
    order.push('after-await'); // local commit happened before this line ran
    expect(order[0]).toBe('server-post');
    expect(result.current.types.map((t) => t.name)).toContain('New One');
    expect(loadTypes().map((t) => t.name)).toContain('New One');
  });

  it('rejected (4xx): NOTHING is saved — not in state, not in the cache', async () => {
    vi.stubGlobal('fetch', vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === 'POST') return { ok: false, status: 400, json: async () => ({}) };
      return listResponse([]);
    }));

    const { result } = renderHook(() => useDocumentTypes());
    await waitFor(() => expect(result.current.loading).toBe(false));

    let outcome!: Awaited<ReturnType<typeof result.current.createType>>;
    await act(async () => {
      outcome = await result.current.createType({ name: 'Doomed', description: '', icon: '📄', fields: [] });
    });

    expect(outcome.status).toBe('rejected');
    expect(result.current.types).toHaveLength(0);
    expect(loadTypes()).toHaveLength(0);
  });

  it('offline (network error): saved locally and reported as offline', async () => {
    vi.stubGlobal('fetch', vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === 'POST') throw new Error('network down');
      throw new Error('network down'); // list fetch also fails
    }));

    const { result } = renderHook(() => useDocumentTypes());
    await waitFor(() => expect(result.current.loading).toBe(false));

    let outcome!: Awaited<ReturnType<typeof result.current.createType>>;
    await act(async () => {
      outcome = await result.current.createType({ name: 'Offline Save', description: '', icon: '📄', fields: [] });
    });

    expect(outcome.status).toBe('offline');
    if (outcome.status === 'offline') expect(outcome.error).toMatch(/network down/);
    expect(result.current.types.map((t) => t.name)).toContain('Offline Save');
    expect(loadTypes().map((t) => t.name)).toContain('Offline Save');
  });
});

describe('write-through updateType / deleteType', () => {
  async function mountWithServerType(name = 'Editable') {
    const serverType = makeType({ name });
    vi.stubGlobal('fetch', vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === 'PUT') return { ok: true, status: 200, json: async () => ({}) };
      if (init?.method === 'DELETE') return { ok: true, status: 204 };
      return listResponse([serverType]);
    }));
    const rendered = renderHook(() => useDocumentTypes());
    await waitFor(() => expect(rendered.result.current.source).toBe('remote'));
    return { rendered, serverType };
  }

  it('update synced path PUTs the server row and updates state + cache', async () => {
    const { rendered, serverType } = await mountWithServerType();
    let outcome!: Awaited<ReturnType<typeof rendered.result.current.updateType>>;
    await act(async () => {
      outcome = await rendered.result.current.updateType(serverType.id, { name: 'Edited' });
    });
    expect(outcome.status).toBe('synced');
    expect(rendered.result.current.types[0].name).toBe('Edited');
    expect(loadTypes()[0].name).toBe('Edited');
  });

  it('update of an unknown id is rejected', async () => {
    const { rendered } = await mountWithServerType();
    let outcome!: Awaited<ReturnType<typeof rendered.result.current.updateType>>;
    await act(async () => {
      outcome = await rendered.result.current.updateType('nope', { name: 'x' });
    });
    expect(outcome.status).toBe('rejected');
  });

  it('delete synced path removes from state + cache', async () => {
    const { rendered, serverType } = await mountWithServerType();
    await act(async () => {
      await rendered.result.current.deleteType(serverType.id);
    });
    expect(rendered.result.current.types).toHaveLength(0);
    expect(loadTypes()).toHaveLength(0);
  });

  it('delete rejected (4xx other than 404) keeps the type', async () => {
    const serverType = makeType({ name: 'Sticky' });
    vi.stubGlobal('fetch', vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === 'DELETE') return { ok: false, status: 403 };
      return listResponse([serverType]);
    }));
    const { result } = renderHook(() => useDocumentTypes());
    await waitFor(() => expect(result.current.source).toBe('remote'));

    let outcome!: Awaited<ReturnType<typeof result.current.deleteType>>;
    await act(async () => {
      outcome = await result.current.deleteType(serverType.id);
    });
    expect(outcome.status).toBe('rejected');
    expect(result.current.types).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// refreshTypesFromServer (shared non-hook entry, used by DocumentEditorPage)
// ---------------------------------------------------------------------------

describe('refreshTypesFromServer', () => {
  it('returns the merged list and rewrites the cache on success', async () => {
    const serverType = makeType({ name: 'From Server' });
    vi.stubGlobal('fetch', vi.fn(async () => listResponse([serverType])));
    const res = await refreshTypesFromServer();
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.types.map((t) => t.name)).toEqual(['From Server']);
    expect(loadTypes().map((t) => t.name)).toEqual(['From Server']);
  });

  it('returns the untouched cache on failure', async () => {
    const cachedType = makeType({ name: 'Kept' });
    seedStorage([cachedType]);
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('down'); }));
    const res = await refreshTypesFromServer();
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.cached.map((t) => t.name)).toEqual(['Kept']);
  });
});
