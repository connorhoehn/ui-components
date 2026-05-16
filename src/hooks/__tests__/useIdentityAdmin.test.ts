import { renderHook, act } from '@testing-library/react';
import { useIdentityAdmin } from '../useIdentityAdmin';

vi.mock('../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({
    idToken: 'tok-1',
    userId: 'admin',
    displayName: 'Admin',
    userEmail: 'admin@test.com',
    onSignOut: vi.fn(),
  }),
}));

const BASE = 'http://identity-api';

beforeEach(() => { vi.stubEnv('VITE_IDENTITY_API_URL', BASE); });
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

function stubFetch(body: unknown, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 401,
    statusText: ok ? 'OK' : 'Unauthorized',
    json: () => Promise.resolve(ok ? body : { message: 'Unauthorized' }),
  } as unknown as Response);
}

// ---------------------------------------------------------------------------
// checkSession
// ---------------------------------------------------------------------------

describe('checkSession', () => {
  it('sets authenticated true on success', async () => {
    vi.stubGlobal('fetch', stubFetch({ authenticated: true }));
    const { result } = renderHook(() => useIdentityAdmin());

    await act(async () => { await result.current.checkSession(); });

    expect(result.current.authenticated).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets authenticated false and error on failure', async () => {
    vi.stubGlobal('fetch', stubFetch(null, false));
    const { result } = renderHook(() => useIdentityAdmin());

    await act(async () => { await result.current.checkSession(); });

    expect(result.current.authenticated).toBe(false);
    expect(result.current.error).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// login
// ---------------------------------------------------------------------------

describe('login', () => {
  it('POSTs credentials and sets authenticated on success', async () => {
    const fetchMock = stubFetch({ token: 'jwt-abc' });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityAdmin());

    await act(async () => { await result.current.login('admin@test.com', 's3cret'); });

    expect(result.current.authenticated).toBe(true);
    expect(result.current.error).toBeNull();
    const [url, opts] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/api/admin/login');
    expect(opts.method).toBe('POST');
  });

  it('sets error and unauthenticated on login failure', async () => {
    vi.stubGlobal('fetch', stubFetch(null, false));
    const { result } = renderHook(() => useIdentityAdmin());

    await act(async () => { await result.current.login('admin@test.com', 'wrong'); });

    expect(result.current.authenticated).toBe(false);
    expect(result.current.error).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// logout
// ---------------------------------------------------------------------------

describe('logout', () => {
  it('POSTs to /api/admin/logout and clears authenticated', async () => {
    // First log in
    const fetchMock = stubFetch({ token: 'jwt-abc' });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityAdmin());
    await act(async () => { await result.current.login('admin@test.com', 's3cret'); });
    expect(result.current.authenticated).toBe(true);

    // Now log out
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);
    await act(async () => { await result.current.logout(); });

    expect(result.current.authenticated).toBe(false);
    const logoutCall = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(logoutCall[0]).toContain('/api/admin/logout');
    expect(logoutCall[1].method).toBe('POST');
  });
});
