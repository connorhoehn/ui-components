import { renderHook, act, waitFor } from '@testing-library/react';
import { useIngestSources } from '../useIngestSources';
import type { IngestSource } from '../../types/ingest';

// ---------------------------------------------------------------------------
// Mock IdentityContext
// ---------------------------------------------------------------------------

const TOKEN = 'tok-1';

vi.mock('../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({
    idToken: TOKEN,
    userId: 'u1',
    displayName: 'Alice',
    userEmail: 'alice@test.com',
    onSignOut: vi.fn(),
  }),
}));

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const BASE = 'http://ingest-api';

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

const SOURCE: IngestSource = {
  sourceId: 'src-1',
  name: 'S3 Bucket',
  type: 's3',
  config: { bucket: 'my-bucket' },
  syncSchedule: null,
  mappingRules: [],
  defaultPipelineId: null,
  status: 'active',
  lastSyncAt: null,
  lastSyncStats: null,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

function stubFetch(body: unknown, ok = true, status = ok ? 200 : 500) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body),
  } as unknown as Response);
}

// The suite runs under React StrictMode, so mount effects fire twice and the
// mutation is no longer at a fixed call index. Locate the call we mean by its
// HTTP method rather than by position.
function callWith(
  mock: { mock: { calls: unknown[][] } },
  method: string,
): [string, RequestInit] {
  const call = mock.mock.calls.find(
    (c) => (c[1] as RequestInit | undefined)?.method === method,
  );
  expect(call, `expected a ${method} fetch`).toBeDefined();
  return call as [string, RequestInit];
}

// ---------------------------------------------------------------------------
// Initial load
// ---------------------------------------------------------------------------

describe('initial load', () => {
  it('fetches sources on mount and populates state', async () => {
    vi.stubGlobal('fetch', stubFetch({ sources: [SOURCE] }));
    const { result } = renderHook(() => useIngestSources());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.sources).toHaveLength(1);
    expect(result.current.sources[0].name).toBe('S3 Bucket');
    expect(result.current.error).toBeNull();
  });

  it('sets error on fetch failure', async () => {
    vi.stubGlobal('fetch', stubFetch({}, false, 503));
    const { result } = renderHook(() => useIngestSources());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/503/);
    expect(result.current.sources).toHaveLength(0);
  });

  it('sends Authorization header', async () => {
    const fetchMock = stubFetch({ sources: [] });
    vi.stubGlobal('fetch', fetchMock);
    renderHook(() => useIngestSources());
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toBe(`Bearer ${TOKEN}`);
  });
});

// ---------------------------------------------------------------------------
// createSource
// ---------------------------------------------------------------------------

describe('createSource', () => {
  it('POSTs and appends the new source', async () => {
    const fetchMock = stubFetch({ sources: [] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIngestSources());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({
      ok: true, status: 200,
      json: () => Promise.resolve(SOURCE),
    } as unknown as Response);

    let created: IngestSource | null = null;
    await act(async () => { created = await result.current.createSource({ name: 'S3 Bucket', type: 's3', config: {}, syncSchedule: null, mappingRules: [], defaultPipelineId: null, status: 'active' }); });

    expect(created).not.toBeNull();
    expect(result.current.sources).toHaveLength(1);
    const postCall = callWith(fetchMock, 'POST');
    expect(postCall[1].method).toBe('POST');
  });

  it('returns null and sets error on failure', async () => {
    const fetchMock = stubFetch({ sources: [] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIngestSources());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: false, status: 422, json: () => Promise.resolve({}) } as unknown as Response);

    let created: IngestSource | null = null;
    await act(async () => { created = await result.current.createSource({ name: 'x', type: 's3', config: {}, syncSchedule: null, mappingRules: [], defaultPipelineId: null, status: 'active' }); });

    expect(created).toBeNull();
    // INVERTED: this used to assert the failure landed in `error`. That is
    // the bug — SourcesPage renders `error` as the hard-coded "Failed to load
    // sources.", blaming the wrong operation, and `refresh()` clears it
    // unconditionally so a failed sync vanished before it could be shown.
    expect(result.current.actionError).toMatch(/422/);
    expect(result.current.error).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// deleteSource
// ---------------------------------------------------------------------------

describe('deleteSource', () => {
  it('DELETEs and removes the source from state', async () => {
    const fetchMock = stubFetch({ sources: [SOURCE] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIngestSources());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);

    let ok = false;
    await act(async () => { ok = await result.current.deleteSource('src-1'); });

    expect(ok).toBe(true);
    expect(result.current.sources).toHaveLength(0);
    const deleteCall = callWith(fetchMock, 'DELETE');
    expect(deleteCall[0]).toContain('/api/ingest/sources/src-1');
    expect(deleteCall[1].method).toBe('DELETE');
  });

  it('returns false and sets error on failure', async () => {
    const fetchMock = stubFetch({ sources: [SOURCE] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIngestSources());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: false, status: 404, json: () => Promise.resolve({}) } as unknown as Response);

    let ok = true;
    await act(async () => { ok = await result.current.deleteSource('src-1'); });

    expect(ok).toBe(false);
    // INVERTED: this used to assert the failure landed in `error`. That is
    // the bug — SourcesPage renders `error` as the hard-coded "Failed to load
    // sources.", blaming the wrong operation, and `refresh()` clears it
    // unconditionally so a failed sync vanished before it could be shown.
    expect(result.current.actionError).toMatch(/404/);
    expect(result.current.error).toBeNull();
    expect(result.current.sources).toHaveLength(1); // not removed
  });
});

// ---------------------------------------------------------------------------
// triggerSync
// ---------------------------------------------------------------------------

describe('triggerSync', () => {
  it('POSTs to the sync endpoint and returns true on success', async () => {
    const fetchMock = stubFetch({ sources: [] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIngestSources());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 202, json: () => Promise.resolve({}) } as unknown as Response);

    let ok = false;
    await act(async () => { ok = await result.current.triggerSync('src-1'); });

    expect(ok).toBe(true);
    const syncCall = callWith(fetchMock, 'POST');
    expect(syncCall[0]).toContain('/api/ingest/sources/src-1/sync');
    expect(syncCall[1].method).toBe('POST');
  });

  it('returns false on failure', async () => {
    const fetchMock = stubFetch({ sources: [] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIngestSources());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: false, status: 503, json: () => Promise.resolve({}) } as unknown as Response);

    let ok = true;
    await act(async () => { ok = await result.current.triggerSync('src-1'); });

    expect(ok).toBe(false);
    // INVERTED: this used to assert the failure landed in `error`. That is
    // the bug — SourcesPage renders `error` as the hard-coded "Failed to load
    // sources.", blaming the wrong operation, and `refresh()` clears it
    // unconditionally so a failed sync vanished before it could be shown.
    expect(result.current.actionError).toMatch(/503/);
    expect(result.current.error).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Out-of-order responses
// ---------------------------------------------------------------------------

describe('superseded requests', () => {
  it('keeps the newest request list when an older one resolves last', async () => {
    // Staleness used to be tracked by a single `cancelledRef` that the effect
    // reset to `false` on every run — so a cancelled request had its own
    // cancellation resurrected and wrote anyway, and whichever request
    // happened to resolve LAST won regardless of which was issued last.
    // `refresh` is memoised on `idToken`, so in the app the superseded request
    // is the one fetched under the *old* token: after a silent token refresh
    // or an identity switch the sources list could be replaced by the previous
    // identity's (or a failing request's) result.
    const resolvers: ((r: Response) => void)[] = [];
    const fetchMock = vi.fn(
      () => new Promise<Response>((resolve) => { resolvers.push(resolve); }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useIngestSources());
    await waitFor(() => { expect(resolvers.length).toBeGreaterThan(0); });
    const stale = resolvers.length - 1;

    // A newer request supersedes the in-flight one.
    act(() => { void result.current.refresh(); });
    await waitFor(() => { expect(resolvers.length).toBeGreaterThan(stale + 1); });

    const json = (sources: IngestSource[]) =>
      ({ ok: true, status: 200, json: () => Promise.resolve({ sources }) }) as unknown as Response;

    const fresh: IngestSource = { ...SOURCE, sourceId: 'fresh', name: 'Fresh' };
    const older: IngestSource = { ...SOURCE, sourceId: 'old', name: 'Old' };

    await act(async () => {
      resolvers[resolvers.length - 1](json([fresh]));
      await Promise.resolve();
      await Promise.resolve();
    });
    await waitFor(() => { expect(result.current.sources).toHaveLength(1); });
    expect(result.current.sources[0].sourceId).toBe('fresh');

    // The superseded request answers late — it must not write.
    await act(async () => {
      resolvers[stale](json([older]));
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(result.current.sources.map((s) => s.sourceId)).toEqual(['fresh']);
  });
});
