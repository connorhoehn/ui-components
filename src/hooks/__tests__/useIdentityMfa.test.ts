import { renderHook, act } from '@testing-library/react';
import { useIdentityMfa } from '../useIdentityMfa';
import type { MfaDevice, MfaSetupResult } from '../../types/identity';

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
const POOL_ID = 'p1';
const USER_ID = 'u1';

beforeEach(() => { vi.stubEnv('VITE_IDENTITY_API_URL', BASE); });
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

const DEVICE: MfaDevice = {
  deviceId: 'd1',
  deviceName: 'Phone',
  deviceType: 'totp',
  isVerified: true,
  createdAt: '2024-01-01T00:00:00.000Z',
};

const SETUP_RESULT: MfaSetupResult = {
  deviceId: 'd2',
  qrCode: 'data:image/png;base64,abc',
  secret: 'ABCDEF',
  backupCodes: ['111', '222'],
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
// Initial state
// ---------------------------------------------------------------------------

describe('initial state', () => {
  it('starts with empty devices list', () => {
    const { result } = renderHook(() => useIdentityMfa());
    expect(result.current.devices).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// refresh
// ---------------------------------------------------------------------------

describe('refresh', () => {
  it('GETs devices for a user and sets them', async () => {
    const fetchMock = stubFetch([DEVICE]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityMfa());

    await act(async () => { await result.current.refresh(POOL_ID, USER_ID); });

    expect(result.current.devices).toHaveLength(1);
    expect(result.current.devices[0].deviceId).toBe('d1');
    const [url, opts] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain(`/api/pools/${POOL_ID}/users/${USER_ID}/mfa/devices`);
    expect(opts.method).toBe('GET');
  });
});

// ---------------------------------------------------------------------------
// setupDevice
// ---------------------------------------------------------------------------

describe('setupDevice', () => {
  it('POSTs to mfa/setup and returns the setup result', async () => {
    const fetchMock = stubFetch(SETUP_RESULT);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityMfa());

    let setup: MfaSetupResult | null = null;
    await act(async () => { setup = await result.current.setupDevice(POOL_ID, USER_ID, 'Phone'); });

    expect(setup?.deviceId).toBe('d2');
    const [url, opts] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain(`/api/pools/${POOL_ID}/users/${USER_ID}/mfa/setup`);
    expect(opts.method).toBe('POST');
  });
});

// ---------------------------------------------------------------------------
// verifySetup
// ---------------------------------------------------------------------------

describe('verifySetup', () => {
  it('POSTs to mfa/verify and marks the device as verified', async () => {
    const fetchMock = stubFetch([{ ...DEVICE, isVerified: false }]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityMfa());
    await act(async () => { await result.current.refresh(POOL_ID, USER_ID); });

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);
    let verified = false;
    await act(async () => { verified = await result.current.verifySetup(POOL_ID, USER_ID, 'd1', '123456'); });

    expect(verified).toBe(true);
    expect(result.current.devices[0].isVerified).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// removeDevice
// ---------------------------------------------------------------------------

describe('removeDevice', () => {
  it('DELETEs the device and removes it from the list', async () => {
    const fetchMock = stubFetch([DEVICE]);
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useIdentityMfa());
    await act(async () => { await result.current.refresh(POOL_ID, USER_ID); });
    expect(result.current.devices).toHaveLength(1);

    fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);
    await act(async () => { await result.current.removeDevice(POOL_ID, USER_ID, 'd1'); });

    expect(result.current.devices).toHaveLength(0);
    const [url, opts] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toContain(`/api/pools/${POOL_ID}/users/${USER_ID}/mfa/devices/d1`);
    expect(opts.method).toBe('DELETE');
  });
});
