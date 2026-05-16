import { renderHook, act, waitFor } from '@testing-library/react';
import { useIdentityUsers } from '../useIdentityUsers';
import type { IdentityUser } from '../../types/identity';

// ---------------------------------------------------------------------------
// Mock IdentityContext
// ---------------------------------------------------------------------------

vi.mock('../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({
    idToken: 'tok-1',
    userId: 'admin',
    displayName: 'Admin',
    userEmail: 'admin@test.com',
    onSignOut: vi.fn(),
  }),
}));

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const BASE = 'http://identity-api';
const POOL_ID = 'pool-1';

beforeEach(() => {
  vi.stubEnv('VITE_IDENTITY_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

const USER: IdentityUser = {
  userId: 'u1',
  poolId: POOL_ID,
  email: 'alice@test.com',
  status: 'CONFIRMED',
  mfaEnabled: false,
  groups: [],
  customAttributes: {},
  createdAt: '2024-01-01T00:00:00.000Z',
};

function stubFetch(body: unknown, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    statusText: ok ? 'OK' : 'Error',
    json: () => Promise.resolve(ok ? body : { message: 'Server Error' }),
  } as unknown as Response);
}

// ---------------------------------------------------------------------------
// Initial load
// ---------------------------------------------------------------------------

describe('initial load', () => {
  it('fetches users for the pool', async () => {
    vi.stubGlobal('fetch', stubFetch([USER]));
    const { result } = renderHook(() => useIdentityUsers(POOL_ID));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.users).toHaveLength(1);
    expect(result.current.users[0].email).toBe('alice@test.com');
    expect(result.current.error).toBeNull();
  });

  it('does not fetch when poolId is null', () => {
    const fetchMock = stubFetch([]);
    vi.stubGlobal('fetch', fetchMock);
    renderHook(() => useIdentityUsers(null));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sets error on fetch failure', async () => {
    vi.stubGlobal('fetch', stubFetch(null, false));
    const { result } = renderHook(() => useIdentityUsers(POOL_ID));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// createUser
// ---------------------------------------------------------------------------

describe('createUser', () => {
  it('POSTs to the pool users endpoint and appends the new user', async () => {
    const fetchMock = stubFetch([]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityUsers(POOL_ID));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(USER) } as unknown as Response);

    let created: IdentityUser | null = null;
    await act(async () => { created = await result.current.createUser({ email: 'alice@test.com' }); });

    expect(created?.email).toBe('alice@test.com');
    expect(result.current.users).toHaveLength(1);
    const postCall = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(postCall[0]).toContain(`/api/pools/${POOL_ID}/users`);
    expect(postCall[1].method).toBe('POST');
  });

  it('returns null on failure', async () => {
    const fetchMock = stubFetch([]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityUsers(POOL_ID));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: false, status: 409, statusText: 'Conflict', json: () => Promise.resolve({ message: 'email in use' }) } as unknown as Response);

    let created: IdentityUser | null = USER;
    await act(async () => { created = await result.current.createUser({ email: 'alice@test.com' }); });

    expect(created).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// updateUser
// ---------------------------------------------------------------------------

describe('updateUser', () => {
  it('PUTs and updates the user in state', async () => {
    const fetchMock = stubFetch([USER]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityUsers(POOL_ID));
    await waitFor(() => expect(result.current.loading).toBe(false));

    const updatedUser = { ...USER, givenName: 'Alice' };
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve(updatedUser) } as unknown as Response);

    await act(async () => { await result.current.updateUser('u1', { givenName: 'Alice' }); });

    expect(result.current.users[0].givenName).toBe('Alice');
    const putCall = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(putCall[0]).toContain(`/api/pools/${POOL_ID}/users/u1`);
    expect(putCall[1].method).toBe('PUT');
  });
});

// ---------------------------------------------------------------------------
// deleteUser
// ---------------------------------------------------------------------------

describe('deleteUser', () => {
  it('DELETEs and removes the user from state', async () => {
    const fetchMock = stubFetch([USER]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityUsers(POOL_ID));
    await waitFor(() => expect(result.current.loading).toBe(false));

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);

    await act(async () => { await result.current.deleteUser('u1'); });

    expect(result.current.users).toHaveLength(0);
    const deleteCall = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(deleteCall[0]).toContain(`/api/pools/${POOL_ID}/users/u1`);
    expect(deleteCall[1].method).toBe('DELETE');
  });
});
