import { renderHook, act } from '@testing-library/react';
import { useFriends } from '../useFriends';
import type { PublicProfile } from '../useFriends';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const BASE = 'http://social-api';
const TOKEN = 'tok-1';

const ALICE: PublicProfile = { userId: 'u1', displayName: 'Alice', visibility: 'public' };
const BOB: PublicProfile = { userId: 'u2', displayName: 'Bob', visibility: 'public' };

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

/**
 * Mock the three initial parallel fetches (followers / following / friends).
 *
 * The suite runs under React StrictMode, so the mount effect fires twice and
 * these three GETs are issued 2x. Answering from the requested URL rather than
 * from call ordering keeps the second pass supplied — an ordering-based mock
 * under-supplies it and lets a real `fetch` escape.
 */
function mockInitialLoad(
  followers: PublicProfile[] = [],
  following: PublicProfile[] = [],
  friends: PublicProfile[] = [],
) {
  const ok = (body: unknown) =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(body) } as unknown as Response);
  const mock = vi.fn((url: string) => {
    if (url.endsWith('/api/social/followers')) return ok({ followers });
    if (url.endsWith('/api/social/following')) return ok({ following });
    if (url.endsWith('/api/social/friends')) return ok({ friends });
    return Promise.reject(new Error(`unexpected fetch: ${url}`));
  });
  vi.stubGlobal('fetch', mock);
  return mock;
}

/**
 * StrictMode also means the mutation's fetch is no longer at a fixed index.
 * Select the call we actually mean by its method.
 */
function callWith(
  fetchMock: { mock: { calls: unknown[][] } },
  method: string,
): [string, RequestInit] {
  const call = fetchMock.mock.calls.find(
    (c) => (c[1] as RequestInit | undefined)?.method === method,
  );
  if (!call) throw new Error(`no fetch call with method ${method}`);
  return call as [string, RequestInit];
}

// ---------------------------------------------------------------------------
// Initial load
// ---------------------------------------------------------------------------

describe('initial load', () => {
  it('fetches all three lists in parallel and populates state', async () => {
    mockInitialLoad([ALICE], [BOB], [ALICE, BOB]);
    const { result } = renderHook(() => useFriends({ idToken: TOKEN }));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.followers).toEqual([ALICE]);
    expect(result.current.following).toEqual([BOB]);
    expect(result.current.friends).toEqual([ALICE, BOB]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles empty lists gracefully', async () => {
    mockInitialLoad();
    const { result } = renderHook(() => useFriends({ idToken: TOKEN }));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.followers).toEqual([]);
    expect(result.current.following).toEqual([]);
    expect(result.current.friends).toEqual([]);
  });

  it('does not fetch when idToken is null', () => {
    const fetchMock = mockInitialLoad();
    renderHook(() => useFriends({ idToken: null }));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sets error when a fetch rejects', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    const { result } = renderHook(() => useFriends({ idToken: TOKEN }));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.error).toMatch(/network down/);
    expect(result.current.loading).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// follow
// ---------------------------------------------------------------------------

describe('follow', () => {
  it('POSTs to the correct URL and refreshes following', async () => {
    const fetchMock = mockInitialLoad([], [], []);
    const { result } = renderHook(() => useFriends({ idToken: TOKEN }));
    await act(async () => { await Promise.resolve(); });

    // follow POST + refreshFollowing GET
    fetchMock
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) } as unknown as Response)
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ following: [BOB] }) } as unknown as Response);

    await act(async () => { await result.current.follow('u2'); });

    const postCall = callWith(fetchMock, 'POST');
    expect(postCall[0]).toContain('/api/social/follow/u2');
    expect(postCall[1].method).toBe('POST');
    expect(result.current.following).toEqual([BOB]);
    expect(result.current.error).toBeNull();
  });

  it('sets error and re-throws on failure', async () => {
    const fetchMock = mockInitialLoad();
    const { result } = renderHook(() => useFriends({ idToken: TOKEN }));
    await act(async () => { await Promise.resolve(); });

    fetchMock.mockResolvedValueOnce({ ok: false, status: 409, json: () => Promise.resolve({}) } as unknown as Response);

    await act(async () => {
      await expect(result.current.follow('u2')).rejects.toThrow(/409/);
    });
    expect(result.current.error).toMatch(/409/);
  });

  it('is a no-op when idToken is null', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useFriends({ idToken: null }));

    await act(async () => { await result.current.follow('u2'); });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// unfollow
// ---------------------------------------------------------------------------

describe('unfollow', () => {
  it('DELETEs the correct URL and refreshes following', async () => {
    const fetchMock = mockInitialLoad([], [BOB], []);
    const { result } = renderHook(() => useFriends({ idToken: TOKEN }));
    await act(async () => { await Promise.resolve(); });

    // unfollow DELETE + refreshFollowing GET
    fetchMock
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) } as unknown as Response)
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ following: [] }) } as unknown as Response);

    await act(async () => { await result.current.unfollow('u2'); });

    const deleteCall = callWith(fetchMock, 'DELETE');
    expect(deleteCall[0]).toContain('/api/social/follow/u2');
    expect(deleteCall[1].method).toBe('DELETE');
    expect(result.current.following).toEqual([]);
  });

  it('sets error and re-throws on failure', async () => {
    const fetchMock = mockInitialLoad([], [BOB], []);
    const { result } = renderHook(() => useFriends({ idToken: TOKEN }));
    await act(async () => { await Promise.resolve(); });

    fetchMock.mockResolvedValueOnce({ ok: false, status: 404, json: () => Promise.resolve({}) } as unknown as Response);

    await act(async () => {
      await expect(result.current.unfollow('u2')).rejects.toThrow(/404/);
    });
    expect(result.current.error).toMatch(/404/);
  });
});
