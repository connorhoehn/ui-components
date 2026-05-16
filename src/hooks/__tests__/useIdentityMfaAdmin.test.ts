import { renderHook, act } from '@testing-library/react';
import { useIdentityMfaAdmin } from '../useIdentityMfaAdmin';
import type { MfaMetrics, IdentityUser, IdentityPool } from '../../types/identity';

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

const METRICS: MfaMetrics = { totalUsers: 10, mfaEnabled: 6, mfaDisabled: 4, adoptionRate: 0.6 };

const USER: IdentityUser = {
  userId: 'u1',
  poolId: 'p1',
  email: 'a@b.com',
  status: 'CONFIRMED',
  mfaEnabled: true,
  groups: [],
  customAttributes: {},
  createdAt: '2024-01-01T00:00:00.000Z',
};

const POOL: IdentityPool = {
  poolId: 'p1',
  poolName: 'Main',
  clientId: 'c1',
  customAttributes: {},
  settings: { mfaConfiguration: 'OPTIONAL' },
  createdAt: '2024-01-01T00:00:00.000Z',
};

// Responds to parallel Promise.all in order: metrics → users → pools.
function makeOrderedFetch(responses: unknown[]) {
  let call = 0;
  return vi.fn().mockImplementation(() => {
    const body = responses[call++];
    return Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve(body),
    } as unknown as Response);
  });
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

describe('initial state', () => {
  it('starts with null metrics, empty arrays, not loading', () => {
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})));
    const { result } = renderHook(() => useIdentityMfaAdmin());
    expect(result.current.metrics).toBeNull();
    expect(result.current.users).toEqual([]);
    expect(result.current.pools).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// refresh
// ---------------------------------------------------------------------------

describe('refresh', () => {
  it('fetches metrics, users, and pools in parallel', async () => {
    vi.stubGlobal('fetch', makeOrderedFetch([METRICS, [USER], [POOL]]));
    const { result } = renderHook(() => useIdentityMfaAdmin());

    await act(async () => { await result.current.refresh(); });

    expect(result.current.metrics).toEqual(METRICS);
    expect(result.current.users).toHaveLength(1);
    expect(result.current.users[0].userId).toBe('u1');
    expect(result.current.pools).toHaveLength(1);
    expect(result.current.pools[0].poolId).toBe('p1');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets error when a fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Server Error',
      json: () => Promise.resolve({ message: 'Server Error' }),
    } as unknown as Response));

    const { result } = renderHook(() => useIdentityMfaAdmin());

    await act(async () => { await result.current.refresh(); });

    expect(result.current.error).toBe('Server Error');
    expect(result.current.loading).toBe(false);
  });
});
