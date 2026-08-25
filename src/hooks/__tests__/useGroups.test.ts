import { renderHook, act } from '@testing-library/react';
import { useGroups } from '../useGroups';
import type { GroupItem, MemberItem } from '../useGroups';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const BASE = 'http://social-api';
const TOKEN = 'tok-1';

const GROUP: GroupItem = {
  groupId: 'g1',
  name: 'Team Alpha',
  visibility: 'public',
  ownerId: 'u1',
  createdAt: '2024-01-01T00:00:00.000Z',
};

const MEMBER: MemberItem = {
  groupId: 'g1',
  userId: 'u2',
  role: 'member',
  joinedAt: '2024-01-02T00:00:00.000Z',
};

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

function mockFetch(body: unknown, ok = true, status = ok ? 200 : 500) {
  const mock = vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body),
  } as unknown as Response);
  vi.stubGlobal('fetch', mock);
  return mock;
}

type FetchCall = [string, RequestInit | undefined];

// The hook now issues a `GET /api/groups` hydrate on mount, and the suite runs
// under StrictMode, so how many calls precede the one under test is not fixed.
// Select calls by (url, method) instead of by index.
function callsMatching(
  mock: ReturnType<typeof mockFetch>,
  urlPart: string,
  method = 'GET',
): FetchCall[] {
  return (mock.mock.calls as FetchCall[]).filter(
    ([url, init]) => url.includes(urlPart) && (init?.method ?? 'GET') === method,
  );
}

function oneCall(
  mock: ReturnType<typeof mockFetch>,
  urlPart: string,
  method = 'GET',
): FetchCall {
  const matches = callsMatching(mock, urlPart, method);
  expect(matches.length).toBeGreaterThan(0);
  return matches[0];
}

// ---------------------------------------------------------------------------
// createGroup
// ---------------------------------------------------------------------------

describe('createGroup', () => {
  it('POSTs and prepends the new group', async () => {
    mockFetch(GROUP);
    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));

    await act(async () => {
      await result.current.createGroup('Team Alpha', 'Our team', 'public');
    });

    expect(result.current.groups).toHaveLength(1);
    expect(result.current.groups[0].name).toBe('Team Alpha');
    expect(result.current.error).toBeNull();
  });

  it('sends correct body to /api/groups', async () => {
    const fetchMock = mockFetch(GROUP);
    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));

    await act(async () => {
      await result.current.createGroup('Team Alpha', 'desc', 'private');
    });

    const [url, init] = oneCall(fetchMock, '/api/groups', 'POST');
    expect(url).toContain('/api/groups');
    expect(init!.method).toBe('POST');
    expect(JSON.parse(init!.body as string)).toEqual({
      name: 'Team Alpha',
      description: 'desc',
      visibility: 'private',
    });
  });

  it('sets error and re-throws on failure', async () => {
    mockFetch({}, false, 409);
    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));

    await act(async () => {
      await expect(result.current.createGroup('x')).rejects.toThrow(/409/);
    });
    expect(result.current.error).toMatch(/409/);
    expect(result.current.groups).toHaveLength(0);
  });

  it('is a no-op when idToken is null', async () => {
    const fetchMock = mockFetch(GROUP);
    const { result } = renderHook(() => useGroups({ idToken: null }));

    await act(async () => { await result.current.createGroup('x'); });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// deleteGroup
// ---------------------------------------------------------------------------

describe('deleteGroup', () => {
  it('DELETEs and removes group from list', async () => {
    // Seed one group via createGroup first, then delete it
    const fetchMock = mockFetch(GROUP);
    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));
    await act(async () => { await result.current.createGroup('Team Alpha'); });

    fetchMock.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) } as unknown as Response);
    await act(async () => { await result.current.deleteGroup('g1'); });

    expect(result.current.groups).toHaveLength(0);
    const deleteCall = oneCall(fetchMock, '/api/groups/g1', 'DELETE');
    expect(deleteCall[0]).toContain('/api/groups/g1');
    expect(deleteCall[1]!.method).toBe('DELETE');
  });

  it('sets error on failure (does not re-throw)', async () => {
    mockFetch({}, false, 403);
    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));

    await act(async () => { await result.current.deleteGroup('g1'); });
    expect(result.current.error).toMatch(/403/);
  });
});

// ---------------------------------------------------------------------------
// joinGroup / leaveGroup
// ---------------------------------------------------------------------------

describe('joinGroup', () => {
  it('POSTs to /api/groups/:id/join', async () => {
    const fetchMock = mockFetch({});
    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));

    await act(async () => { await result.current.joinGroup('g1'); });

    const [url, init] = oneCall(fetchMock, '/api/groups/g1/join', 'POST');
    expect(url).toContain('/api/groups/g1/join');
    expect(init!.method).toBe('POST');
    expect(result.current.error).toBeNull();
  });

  it('sets error on failure', async () => {
    mockFetch({}, false, 404);
    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));

    await act(async () => { await result.current.joinGroup('g1'); });
    expect(result.current.error).toMatch(/404/);
  });
});

describe('leaveGroup', () => {
  it('DELETEs /api/groups/:id/leave and removes group from list', async () => {
    const fetchMock = mockFetch(GROUP);
    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));
    await act(async () => { await result.current.createGroup('Team Alpha'); });

    fetchMock.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) } as unknown as Response);
    await act(async () => { await result.current.leaveGroup('g1'); });

    const leaveCall = oneCall(fetchMock, '/api/groups/g1/leave', 'DELETE');
    expect(leaveCall[0]).toContain('/api/groups/g1/leave');
    expect(leaveCall[1]!.method).toBe('DELETE');
    expect(result.current.groups).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// inviteUser / acceptInvite
// ---------------------------------------------------------------------------

describe('inviteUser', () => {
  it('POSTs userId to /api/groups/:id/invite', async () => {
    const fetchMock = mockFetch({});
    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));

    await act(async () => { await result.current.inviteUser('g1', 'u2'); });

    const [url, init] = oneCall(fetchMock, '/api/groups/g1/invite', 'POST');
    expect(url).toContain('/api/groups/g1/invite');
    expect(JSON.parse(init!.body as string)).toEqual({ userId: 'u2' });
  });
});

describe('acceptInvite', () => {
  it('POSTs accept flag to /api/groups/:id/accept', async () => {
    const fetchMock = mockFetch({});
    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));

    await act(async () => { await result.current.acceptInvite('g1', true); });

    const [url, init] = oneCall(fetchMock, '/api/groups/g1/accept', 'POST');
    expect(url).toContain('/api/groups/g1/accept');
    expect(JSON.parse(init!.body as string)).toEqual({ accept: true });
  });
});

// ---------------------------------------------------------------------------
// loadMembers
// ---------------------------------------------------------------------------

describe('loadMembers', () => {
  it('fetches and sets the members list', async () => {
    mockFetch({ members: [MEMBER] });
    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));

    await act(async () => { await result.current.loadMembers('g1'); });

    expect(result.current.members).toHaveLength(1);
    expect(result.current.members[0].userId).toBe('u2');
    expect(result.current.error).toBeNull();
  });

  it('sets error on failure', async () => {
    mockFetch({}, false, 500);
    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));

    await act(async () => { await result.current.loadMembers('g1'); });
    expect(result.current.error).toMatch(/500/);
    expect(result.current.members).toHaveLength(0);
  });

  it('is a no-op when idToken is null', async () => {
    const fetchMock = mockFetch({ members: [] });
    const { result } = renderHook(() => useGroups({ idToken: null }));

    await act(async () => { await result.current.loadMembers('g1'); });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Hydrate on mount
//
// REGRESSION: the hook exposed no list loader at all, so `groups` only ever
// held what the current session had created and no host could hydrate it.
// GroupPanel's "No groups yet" was therefore shown to every user who already
// had groups on the server.
// ---------------------------------------------------------------------------

describe('hydrate on mount', () => {
  it('GETs /api/groups on mount and populates the list', async () => {
    const fetchMock = mockFetch({ groups: [GROUP] });
    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));

    await act(async () => { await Promise.resolve(); });

    expect(callsMatching(fetchMock, '/api/groups', 'GET').length).toBeGreaterThan(0);
    const [url, init] = oneCall(fetchMock, '/api/groups', 'GET');
    expect(url).toBe(`${BASE}/api/groups`);
    expect((init?.headers as Record<string, string>).Authorization).toBe(`Bearer ${TOKEN}`);
    expect(result.current.groups).toHaveLength(1);
    expect(result.current.groups[0].groupId).toBe('g1');
    expect(result.current.loaded).toBe(true);
    expect(result.current.loadError).toBeNull();
  });

  it('does not hydrate without an idToken', async () => {
    const fetchMock = mockFetch({ groups: [GROUP] });
    const { result } = renderHook(() => useGroups({ idToken: null }));

    await act(async () => { await Promise.resolve(); });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.current.loaded).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  it('reports a failed hydrate through loadError, not just error', async () => {
    mockFetch({}, false, 500);
    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.loadError).toMatch(/500/);
    expect(result.current.groups).toHaveLength(0);
    expect(result.current.loaded).toBe(true);
  });

  it('refresh() re-issues the GET and replaces the list', async () => {
    const fetchMock = mockFetch({ groups: [] });
    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));
    await act(async () => { await Promise.resolve(); });
    expect(result.current.groups).toHaveLength(0);

    const before = callsMatching(fetchMock, '/api/groups', 'GET').length;
    fetchMock.mockResolvedValueOnce({
      ok: true, status: 200, json: () => Promise.resolve({ groups: [GROUP] }),
    } as unknown as Response);
    await act(async () => { await result.current.refresh(); });

    // Delta, not an absolute count — StrictMode double-mounts.
    expect(callsMatching(fetchMock, '/api/groups', 'GET').length).toBe(before + 1);
    expect(result.current.groups).toHaveLength(1);
  });

  it('a superseded hydrate can never overwrite a newer one', async () => {
    // Monotonic-request-id guard, NOT a shared boolean each effect run resets.
    // The stale response resolves LAST but was issued FIRST, so it must lose.
    let releaseStale: (() => void) | null = null;
    const stale = new Promise<void>((r) => { releaseStale = r; });

    const fetchMock = vi.fn()
      .mockImplementationOnce(async () => {
        await stale;
        return { ok: true, status: 200, json: () => Promise.resolve({ groups: [GROUP] }) } as unknown as Response;
      })
      .mockResolvedValue({
        ok: true, status: 200,
        json: () => Promise.resolve({ groups: [{ ...GROUP, groupId: 'g2', name: 'Fresh' }] }),
      } as unknown as Response);
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));
    // Let the second (StrictMode remount) hydrate land first.
    await act(async () => { await Promise.resolve(); });
    // Now let the first, superseded one resolve.
    await act(async () => { releaseStale?.(); await Promise.resolve(); });

    expect(result.current.groups.map((g) => g.groupId)).toEqual(['g2']);
  });
});
