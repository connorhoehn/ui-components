import { renderHook, act, waitFor } from '@testing-library/react';
import { useSyncConflicts } from '../useSyncConflicts';
import type { SyncConflict } from '../../types/ingest';

// ---------------------------------------------------------------------------
// Mock IdentityContext
// ---------------------------------------------------------------------------

vi.mock('../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({
    idToken: 'tok-1',
    userId: 'u1',
    displayName: 'Alice',
    userEmail: 'alice@test.com',
    onSignOut: vi.fn(),
  }),
}));

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const BASE = 'http://sync-api';

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

const CONFLICT: SyncConflict = {
  conflictId: 'cfl-1',
  sourceId: 'src-1',
  documentId: 'doc-1',
  documentTypeId: null,
  sourceRef: 's3://bucket/file.pdf',
  summary: 'Title changed remotely',
  fields: [],
  status: 'pending',
  platformUpdatedAt: '2024-01-01T00:00:00.000Z',
  sourceUpdatedAt: '2024-01-02T00:00:00.000Z',
  detectedAt: '2024-01-02T00:01:00.000Z',
};

function stubFetch(body: unknown, ok = true, status = ok ? 200 : 500) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body),
  } as unknown as Response);
}

/**
 * The suite runs under React StrictMode, so mount effects fire twice and the
 * mutation's fetch is no longer at a fixed index. Select the call we actually
 * mean by its method (and optionally a URL fragment) instead of by position.
 */
function callWith(
  fetchMock: { mock: { calls: unknown[][] } },
  method: string,
  urlPart?: string,
): [string, RequestInit] {
  const call = fetchMock.mock.calls.find(
    (c) =>
      (c[1] as RequestInit | undefined)?.method === method &&
      (urlPart === undefined || String(c[0]).includes(urlPart)),
  );
  if (!call) {
    throw new Error(
      `no fetch call with method ${method}` +
        (urlPart ? ` and url containing ${urlPart}` : ''),
    );
  }
  return call as [string, RequestInit];
}

// ---------------------------------------------------------------------------
// Initial load — real endpoint
// ---------------------------------------------------------------------------

describe('initial load', () => {
  it('fetches conflicts and sets usingMock:false on success', async () => {
    vi.stubGlobal('fetch', stubFetch({ conflicts: [CONFLICT] }));
    const { result } = renderHook(() => useSyncConflicts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.conflicts).toHaveLength(1);
    expect(result.current.conflicts[0].conflictId).toBe('cfl-1');
    expect(result.current.usingMock).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('falls back to mock conflicts on 404 (endpoint not yet implemented)', async () => {
    vi.stubGlobal('fetch', stubFetch({}, false, 404));
    const { result } = renderHook(() => useSyncConflicts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.usingMock).toBe(true);
    expect(result.current.conflicts.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  it('falls back to mock conflicts and sets error on network failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    const { result } = renderHook(() => useSyncConflicts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.usingMock).toBe(true);
    expect(result.current.conflicts.length).toBeGreaterThan(0);
    expect(result.current.error).toMatch(/network down/);
  });
});

// ---------------------------------------------------------------------------
// resolveConflict — real data path
// ---------------------------------------------------------------------------

describe('resolveConflict (real endpoint)', () => {
  it('POSTs resolution and updates the conflict in state', async () => {
    const fetchMock = stubFetch({ conflicts: [CONFLICT] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useSyncConflicts());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const resolved = { ...CONFLICT, status: 'resolved' as const, resolvedAt: '2024-01-03T00:00:00.000Z' };
    fetchMock.mockResolvedValueOnce({
      ok: true, status: 200,
      json: () => Promise.resolve({ conflict: resolved }),
    } as unknown as Response);

    let ok = false;
    await act(async () => { ok = await result.current.resolveConflict('cfl-1', { pick: 'source' }); });

    expect(ok).toBe(true);
    const resolveCall = callWith(fetchMock, 'POST', '/resolve');
    expect(resolveCall[0]).toContain('/api/sync/conflicts/cfl-1/resolve');
    expect(resolveCall[1].method).toBe('POST');
    expect(result.current.conflicts[0].status).toBe('resolved');
  });

  it('returns false and sets error on failure', async () => {
    const fetchMock = stubFetch({ conflicts: [CONFLICT] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useSyncConflicts());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: false, status: 422, json: () => Promise.resolve({}) } as unknown as Response);

    let ok = true;
    await act(async () => { ok = await result.current.resolveConflict('cfl-1', { pick: 'source' }); });

    expect(ok).toBe(false);
    expect(result.current.error).toMatch(/422/);
  });
});

// ---------------------------------------------------------------------------
// resolveConflict — mock data path
// ---------------------------------------------------------------------------

describe('resolveConflict (mock fallback)', () => {
  it('optimistically marks the conflict as resolved without fetching', async () => {
    vi.stubGlobal('fetch', stubFetch({}, false, 404));
    const { result } = renderHook(() => useSyncConflicts());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.usingMock).toBe(true);

    const mockId = result.current.conflicts[0].conflictId;

    await act(async () => { await result.current.resolveConflict(mockId, { pick: 'source' }); });

    const found = result.current.conflicts.find(c => c.conflictId === mockId);
    expect(found?.status).toBe('resolved');
  });
});

// ---------------------------------------------------------------------------
// discardConflict
// ---------------------------------------------------------------------------

describe('discardConflict (real endpoint)', () => {
  it('POSTs to discard endpoint and marks status as discarded', async () => {
    const fetchMock = stubFetch({ conflicts: [CONFLICT] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useSyncConflicts());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);

    let ok = false;
    await act(async () => { ok = await result.current.discardConflict('cfl-1'); });

    expect(ok).toBe(true);
    const discardCall = callWith(fetchMock, 'POST', '/discard');
    expect(discardCall[0]).toContain('/api/sync/conflicts/cfl-1/discard');
    expect(discardCall[1].method).toBe('POST');
    expect(result.current.conflicts[0].status).toBe('discarded');
  });
});

describe('discardConflict (mock fallback)', () => {
  it('optimistically marks the conflict as discarded', async () => {
    vi.stubGlobal('fetch', stubFetch({}, false, 404));
    const { result } = renderHook(() => useSyncConflicts());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.usingMock).toBe(true);

    const mockId = result.current.conflicts[0].conflictId;

    await act(async () => { await result.current.discardConflict(mockId); });

    const found = result.current.conflicts.find(c => c.conflictId === mockId);
    expect(found?.status).toBe('discarded');
  });
});

// ---------------------------------------------------------------------------
// Out-of-order responses
// ---------------------------------------------------------------------------

describe('superseded requests', () => {
  it('does not let a superseded request replace real conflicts with mock data', async () => {
    // Staleness used to be tracked by a single `cancelledRef` that the effect
    // reset to `false` on every run, resurrecting the cancellation of the
    // previous run. `refresh` is memoised on `idToken`, so the effect re-runs
    // on every token refresh or identity switch — and the request issued under
    // the OLD token then wrote anyway. That request typically 404s or fails,
    // and BOTH branches swap in `buildMockConflicts()` with `usingMock: true`,
    // so the page silently replaced real conflicts with fabricated rows and
    // the operator resolved/discarded against conflicts that do not exist.
    const resolvers: ((r: Response) => void)[] = [];
    const fetchMock = vi.fn(
      () => new Promise<Response>((resolve) => { resolvers.push(resolve); }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useSyncConflicts());
    await waitFor(() => { expect(resolvers.length).toBeGreaterThan(0); });
    const stale = resolvers.length - 1;

    // A newer request supersedes the in-flight one.
    act(() => { void result.current.refresh(); });
    await waitFor(() => { expect(resolvers.length).toBeGreaterThan(stale + 1); });

    // The current request answers with the real list.
    await act(async () => {
      resolvers[resolvers.length - 1]({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ conflicts: [CONFLICT] }),
      } as unknown as Response);
      await Promise.resolve();
      await Promise.resolve();
    });
    await waitFor(() => { expect(result.current.conflicts).toHaveLength(1); });
    expect(result.current.usingMock).toBe(false);

    // The superseded request 404s late — the mock-fallback branch must not run.
    await act(async () => {
      resolvers[stale]({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      } as unknown as Response);
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(result.current.usingMock).toBe(false);
    expect(result.current.conflicts.map((c) => c.conflictId)).toEqual([CONFLICT.conflictId]);
  });
});
