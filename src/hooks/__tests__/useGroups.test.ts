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

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/api/groups');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body as string)).toEqual({
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
    const deleteCall = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(deleteCall[0]).toContain('/api/groups/g1');
    expect(deleteCall[1].method).toBe('DELETE');
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

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/api/groups/g1/join');
    expect(init.method).toBe('POST');
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

    const leaveCall = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(leaveCall[0]).toContain('/api/groups/g1/leave');
    expect(leaveCall[1].method).toBe('DELETE');
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

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/api/groups/g1/invite');
    expect(JSON.parse(init.body as string)).toEqual({ userId: 'u2' });
  });
});

describe('acceptInvite', () => {
  it('POSTs accept flag to /api/groups/:id/accept', async () => {
    const fetchMock = mockFetch({});
    const { result } = renderHook(() => useGroups({ idToken: TOKEN }));

    await act(async () => { await result.current.acceptInvite('g1', true); });

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/api/groups/g1/accept');
    expect(JSON.parse(init.body as string)).toEqual({ accept: true });
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
