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
    const resolveCall = fetchMock.mock.calls[1] as [string, RequestInit];
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
    const discardCall = fetchMock.mock.calls[1] as [string, RequestInit];
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
