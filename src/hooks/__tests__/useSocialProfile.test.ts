import { renderHook, act } from '@testing-library/react';
import { useSocialProfile } from '../useSocialProfile';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const BASE = 'http://social-api';
const USER_ID = 'user-123';

// Minimal fake JWT: header.<base64({"sub":"user-123"})>.sig
const TOKEN = `header.${btoa(JSON.stringify({ sub: USER_ID }))}.sig`;

const PROFILE = {
  userId: USER_ID,
  displayName: 'Test User',
  visibility: 'public' as const,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
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
// Initial load
// ---------------------------------------------------------------------------

describe('initial load', () => {
  it('decodes JWT sub and fetches own profile', async () => {
    const fetchMock = mockFetch(PROFILE);
    const { result } = renderHook(() => useSocialProfile({ idToken: TOKEN }));

    await act(async () => { await Promise.resolve(); });

    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).toContain(`/api/profiles/${USER_ID}`);
    expect(result.current.profile).toEqual(PROFILE);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('starts loading before fetch resolves', () => {
    mockFetch(PROFILE);
    const { result } = renderHook(() => useSocialProfile({ idToken: TOKEN }));
    expect(result.current.loading).toBe(true);
  });

  it('does not fetch when idToken is null', () => {
    const fetchMock = mockFetch(PROFILE);
    renderHook(() => useSocialProfile({ idToken: null }));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sets error on malformed JWT (non-base64 payload)', async () => {
    const badToken = 'not.a.jwt';
    mockFetch(PROFILE);
    const { result } = renderHook(() => useSocialProfile({ idToken: badToken }));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.error).toMatch(/Invalid token/);
    expect(result.current.profile).toBeNull();
  });

  it('sets error on fetch failure', async () => {
    mockFetch({}, false, 500);
    const { result } = renderHook(() => useSocialProfile({ idToken: TOKEN }));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.error).toMatch(/500/);
    expect(result.current.loading).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// updateProfile
// ---------------------------------------------------------------------------

describe('updateProfile', () => {
  it('PUTs updates and sets profile on success', async () => {
    mockFetch(PROFILE);
    const { result } = renderHook(() => useSocialProfile({ idToken: TOKEN }));
    await act(async () => { await Promise.resolve(); });

    const updatedProfile = { ...PROFILE, displayName: 'Updated' };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(updatedProfile),
    } as unknown as Response));

    await act(async () => { await result.current.updateProfile({ displayName: 'Updated' }); });

    expect(result.current.profile?.displayName).toBe('Updated');
    expect(result.current.error).toBeNull();
  });

  it('sends PUT to /api/profiles', async () => {
    mockFetch(PROFILE);
    const { result } = renderHook(() => useSocialProfile({ idToken: TOKEN }));
    await act(async () => { await Promise.resolve(); });

    const putMock = vi.fn().mockResolvedValue({
      ok: true, json: () => Promise.resolve(PROFILE),
    } as unknown as Response);
    vi.stubGlobal('fetch', putMock);

    await act(async () => { await result.current.updateProfile({ bio: 'hello' }); });

    const [url, init] = putMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/api/profiles');
    expect(init.method).toBe('PUT');
    expect(JSON.parse(init.body as string)).toEqual({ bio: 'hello' });
  });

  it('sets error on failure', async () => {
    mockFetch(PROFILE);
    const { result } = renderHook(() => useSocialProfile({ idToken: TOKEN }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false, status: 422, json: () => Promise.resolve({}),
    } as unknown as Response));

    // INVERTED (was: `await result.current.updateProfile(...)` with no rejection
    // expected). This mutation used to resolve on failure, which is exactly
    // what made a rejected write look like an accepted one to every caller.
    // It now rejects *and* sets `error`; both are asserted.
    await act(async () => {
      await expect(result.current.updateProfile({ displayName: 'x' })).rejects.toThrow(/422/);
    });

    expect(result.current.error).toMatch(/422/);
  });

  it('is a no-op when idToken is null', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useSocialProfile({ idToken: null }));

    await act(async () => { await result.current.updateProfile({ displayName: 'x' }); });

    expect(fetchMock).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// viewProfile
// ---------------------------------------------------------------------------

describe('viewProfile', () => {
  it('returns profile on success', async () => {
    mockFetch(PROFILE);
    const { result } = renderHook(() => useSocialProfile({ idToken: TOKEN }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true, status: 200, json: () => Promise.resolve(PROFILE),
    } as unknown as Response));

    let viewed: unknown = null;
    await act(async () => { viewed = await result.current.viewProfile('u2'); });

    expect(viewed).toEqual(PROFILE);
  });

  it('returns null on 403', async () => {
    mockFetch(PROFILE);
    const { result } = renderHook(() => useSocialProfile({ idToken: TOKEN }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false, status: 403, json: () => Promise.resolve({}),
    } as unknown as Response));

    let viewed: unknown = 'sentinel';
    await act(async () => { viewed = await result.current.viewProfile('u2'); });
    expect(viewed).toBeNull();
  });

  it('returns null on 404', async () => {
    mockFetch(PROFILE);
    const { result } = renderHook(() => useSocialProfile({ idToken: TOKEN }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false, status: 404, json: () => Promise.resolve({}),
    } as unknown as Response));

    let viewed: unknown = 'sentinel';
    await act(async () => { viewed = await result.current.viewProfile('u2'); });
    expect(viewed).toBeNull();
  });

  it('returns null on unexpected throw', async () => {
    mockFetch(PROFILE);
    const { result } = renderHook(() => useSocialProfile({ idToken: TOKEN }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network error')));

    let viewed: unknown = 'sentinel';
    await act(async () => { viewed = await result.current.viewProfile('u2'); });
    expect(viewed).toBeNull();
  });

  it('returns null when idToken is null', async () => {
    const { result } = renderHook(() => useSocialProfile({ idToken: null }));

    let viewed: unknown = 'sentinel';
    await act(async () => { viewed = await result.current.viewProfile('u2'); });
    expect(viewed).toBeNull();
  });
});
