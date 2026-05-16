import { renderHook, act, waitFor } from '@testing-library/react';
import { useIdentityPools } from '../useIdentityPools';
import type { IdentityPool } from '../../types/identity';

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

const BASE = 'http://identity-api';

beforeEach(() => {
  vi.stubEnv('VITE_IDENTITY_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

const POOL: IdentityPool = {
  poolId: 'p1',
  poolName: 'Main Pool',
  clientId: 'client-1',
  customAttributes: {},
  settings: { mfaConfiguration: 'OFF' },
  createdAt: '2024-01-01T00:00:00.000Z',
};

function stubFetch(body: unknown, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    statusText: ok ? 'OK' : 'Internal Server Error',
    json: () => Promise.resolve(ok ? body : { message: 'Server Error' }),
  } as unknown as Response);
}

// ---------------------------------------------------------------------------
// Initial load
// ---------------------------------------------------------------------------

describe('initial load', () => {
  it('fetches pools from /api/pools', async () => {
    vi.stubGlobal('fetch', stubFetch([POOL]));
    const { result } = renderHook(() => useIdentityPools());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.pools).toHaveLength(1);
    expect(result.current.pools[0].poolId).toBe('p1');
    expect(result.current.error).toBeNull();
  });

  it('sets error on fetch failure', async () => {
    vi.stubGlobal('fetch', stubFetch(null, false));
    const { result } = renderHook(() => useIdentityPools());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeTruthy();
    expect(result.current.pools).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// createPool
// ---------------------------------------------------------------------------

describe('createPool', () => {
  it('POSTs and prepends the new pool', async () => {
    const fetchMock = stubFetch([]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityPools());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({
      ok: true, status: 200,
      json: () => Promise.resolve(POOL),
    } as unknown as Response);

    let created: IdentityPool | null = null;
    await act(async () => { created = await result.current.createPool({ poolName: 'Main Pool' }); });

    expect(created?.poolId).toBe('p1');
    expect(result.current.pools).toHaveLength(1);
    const postCall = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(postCall[0]).toContain('/api/pools');
    expect(postCall[1].method).toBe('POST');
    expect(JSON.parse(postCall[1].body as string)).toEqual({ poolName: 'Main Pool' });
  });

  it('returns null on failure', async () => {
    const fetchMock = stubFetch([]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityPools());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: false, status: 422, statusText: 'Unprocessable', json: () => Promise.resolve({ message: 'invalid' }) } as unknown as Response);

    let created: IdentityPool | null = null;
    await act(async () => { created = await result.current.createPool({ poolName: 'x' }); });

    expect(created).toBeNull();
    expect(result.current.error).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// updatePool
// ---------------------------------------------------------------------------

describe('updatePool', () => {
  it('PUTs the pool and updates state', async () => {
    const fetchMock = stubFetch([POOL]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityPools());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const updated = { ...POOL, poolName: 'Updated Pool' };
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(updated) } as unknown as Response);

    await act(async () => { await result.current.updatePool('p1', { poolName: 'Updated Pool' }); });

    expect(result.current.pools[0].poolName).toBe('Updated Pool');
  });
});

// ---------------------------------------------------------------------------
// deletePool
// ---------------------------------------------------------------------------

describe('deletePool', () => {
  it('DELETEs and removes pool from state', async () => {
    const fetchMock = stubFetch([POOL]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityPools());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);

    await act(async () => { await result.current.deletePool('p1'); });

    expect(result.current.pools).toHaveLength(0);
    const deleteCall = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(deleteCall[0]).toContain('/api/pools/p1');
    expect(deleteCall[1].method).toBe('DELETE');
  });
});

// ---------------------------------------------------------------------------
// getStats
// ---------------------------------------------------------------------------

describe('getStats', () => {
  it('fetches /api/pools/stats and returns the list', async () => {
    const fetchMock = stubFetch([]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityPools());
    await waitFor(() => expect(result.current.loading).toBe(false));

    const stats = [{ poolId: 'p1', poolName: 'Main Pool', userCount: 5 }];
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(stats) } as unknown as Response);

    let fetched: typeof stats = [];
    await act(async () => { fetched = await result.current.getStats() as typeof stats; });

    expect(fetched).toHaveLength(1);
    expect(fetched[0].userCount).toBe(5);
    const statsCall = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(statsCall[0]).toContain('/api/pools/stats');
  });

  it('returns [] when fetch fails', async () => {
    const fetchMock = stubFetch([]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityPools());
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockRejectedValueOnce(new Error('network error'));

    let fetched: unknown[] = [1];
    await act(async () => { fetched = await result.current.getStats(); });
    expect(fetched).toHaveLength(0);
  });
});
