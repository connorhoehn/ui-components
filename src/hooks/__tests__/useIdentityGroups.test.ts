import { renderHook, act, waitFor } from '@testing-library/react';
import { useIdentityGroups } from '../useIdentityGroups';
import type { IdentityGroup } from '../../types/identity';

vi.mock('../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({
    idToken: 'tok-1',
    userId: 'u1',
    displayName: 'Alice',
    userEmail: 'alice@test.com',
    onSignOut: vi.fn(),
  }),
}));

const BASE = 'http://identity-api';
const POOL_ID = 'pool-1';

beforeEach(() => { vi.stubEnv('VITE_IDENTITY_API_URL', BASE); });
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

const GROUP: IdentityGroup = {
  groupId: 'g1',
  poolId: POOL_ID,
  groupName: 'Admins',
  permissions: ['read', 'write'],
  members: ['u1'],
};

function stubFetch(body: unknown, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    statusText: ok ? 'OK' : 'Error',
    json: () => Promise.resolve(ok ? body : { message: 'Error' }),
  } as unknown as Response);
}

// ---------------------------------------------------------------------------
// Initial load
// ---------------------------------------------------------------------------

describe('initial load', () => {
  it('fetches groups for the pool on mount', async () => {
    vi.stubGlobal('fetch', stubFetch([GROUP]));
    const { result } = renderHook(() => useIdentityGroups(POOL_ID));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.groups).toHaveLength(1);
    expect(result.current.groups[0].groupId).toBe('g1');
    expect(result.current.error).toBeNull();
  });

  it('does not fetch when poolId is null', () => {
    const fetchMock = stubFetch([]);
    vi.stubGlobal('fetch', fetchMock);
    renderHook(() => useIdentityGroups(null));
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// createGroup
// ---------------------------------------------------------------------------

describe('createGroup', () => {
  it('POSTs and appends the new group', async () => {
    const fetchMock = stubFetch([]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityGroups(POOL_ID));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(GROUP) } as unknown as Response);
    await act(async () => { await result.current.createGroup({ groupName: 'Admins' }); });

    expect(result.current.groups).toHaveLength(1);
    const [url, opts] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toContain(`/api/pools/${POOL_ID}/groups`);
    expect(opts.method).toBe('POST');
  });
});

// ---------------------------------------------------------------------------
// updateGroup
// ---------------------------------------------------------------------------

describe('updateGroup', () => {
  it('PUTs and updates the group in state', async () => {
    const fetchMock = stubFetch([GROUP]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityGroups(POOL_ID));
    await waitFor(() => expect(result.current.loading).toBe(false));

    const updated = { ...GROUP, groupName: 'Super Admins' };
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(updated) } as unknown as Response);
    await act(async () => { await result.current.updateGroup('g1', { groupName: 'Super Admins' }); });

    expect(result.current.groups[0].groupName).toBe('Super Admins');
    const [url, opts] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toContain(`/api/pools/${POOL_ID}/groups/g1`);
    expect(opts.method).toBe('PUT');
  });
});

// ---------------------------------------------------------------------------
// deleteGroup
// ---------------------------------------------------------------------------

describe('deleteGroup', () => {
  it('DELETEs and removes the group from state', async () => {
    const fetchMock = stubFetch([GROUP]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityGroups(POOL_ID));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);
    await act(async () => { await result.current.deleteGroup('g1'); });

    expect(result.current.groups).toHaveLength(0);
    const [url, opts] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toContain(`/api/pools/${POOL_ID}/groups/g1`);
    expect(opts.method).toBe('DELETE');
  });
});

// ---------------------------------------------------------------------------
// addMember / removeMember
// ---------------------------------------------------------------------------

describe('addMember', () => {
  it('POSTs to groups/:id/members and updates the members list', async () => {
    const groupWithoutU2 = { ...GROUP, members: ['u1'] };
    const fetchMock = stubFetch([groupWithoutU2]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityGroups(POOL_ID));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);
    await act(async () => { await result.current.addMember('g1', 'u2'); });

    expect(result.current.groups[0].members).toContain('u2');
    const [url, opts] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toContain(`/api/pools/${POOL_ID}/groups/g1/members`);
    expect(opts.method).toBe('POST');
  });
});

describe('removeMember', () => {
  it('DELETEs from groups/:id/members/:userId and filters from members', async () => {
    const fetchMock = stubFetch([GROUP]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityGroups(POOL_ID));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);
    await act(async () => { await result.current.removeMember('g1', 'u1'); });

    expect(result.current.groups[0].members).not.toContain('u1');
    const [url, opts] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toContain(`/api/pools/${POOL_ID}/groups/g1/members/u1`);
    expect(opts.method).toBe('DELETE');
  });
});
