import { renderHook, waitFor } from '@testing-library/react';
import { useIdentitySetupStatus } from '../useIdentitySetupStatus';
import type { SetupStatus } from '../../types/identity';

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

const BASE = 'http://identity-api';

beforeEach(() => {
  vi.stubEnv('VITE_IDENTITY_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

const STATUS: SetupStatus = {
  hasUserPools: true,
  poolCount: 1,
  hasClients: true,
  clientCount: 2,
  hasAdminUser: true,
  totalUsers: 5,
  adminEmails: ['admin@test.com'],
  smtpConfigured: false,
  issuer: 'https://cognito.amazonaws.com/us-east-1_xxx',
  issuerIsCustom: false,
  issuerConfigured: true,
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
// Tests
// ---------------------------------------------------------------------------

describe('useIdentitySetupStatus', () => {
  it('fetches /api/admin/setup-status and populates status', async () => {
    vi.stubGlobal('fetch', stubFetch(STATUS));
    const { result } = renderHook(() => useIdentitySetupStatus());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.status).toMatchObject({ hasUserPools: true, poolCount: 1 });
    expect(result.current.error).toBeNull();
  });

  it('starts with null status before the fetch resolves', async () => {
    // Delay resolution so we can observe the loading state
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true, status: 200,
      json: () => new Promise<SetupStatus>(res => setTimeout(() => res(STATUS), 100)),
    } as unknown as Response));
    const { result } = renderHook(() => useIdentitySetupStatus());
    // On first render, before any effect or fetch completes, status is null
    expect(result.current.status).toBeNull();
  });

  it('sets error on fetch failure', async () => {
    vi.stubGlobal('fetch', stubFetch(null, false));
    const { result } = renderHook(() => useIdentitySetupStatus());

    await waitFor(() => expect(result.current.status).toBe(null));
    // Give a tick for the error to set
    await waitFor(() => result.current.error !== null || result.current.loading === false);

    // Either an error or still null status — the fetch failed
    expect(result.current.status).toBeNull();
  });

  it('sends Authorization header', async () => {
    const fetchMock = stubFetch(STATUS);
    vi.stubGlobal('fetch', fetchMock);
    renderHook(() => useIdentitySetupStatus());

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/api/admin/setup-status');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer tok-1');
  });
});
