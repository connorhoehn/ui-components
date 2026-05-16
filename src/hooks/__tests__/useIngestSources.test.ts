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
    const postCall = fetchMock.mock.calls[1] as [string, RequestInit];
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
    expect(result.current.error).toMatch(/422/);
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
    const deleteCall = fetchMock.mock.calls[1] as [string, RequestInit];
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
    expect(result.current.error).toMatch(/404/);
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
    const syncCall = fetchMock.mock.calls[1] as [string, RequestInit];
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
    expect(result.current.error).toMatch(/503/);
  });
});
