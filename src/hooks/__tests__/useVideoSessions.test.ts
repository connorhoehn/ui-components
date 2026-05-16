import { renderHook, act, waitFor } from '@testing-library/react';
import { useVideoSessions } from '../useVideoSessions';
import type { VideoSession } from '../useVideoSessions';

const BASE = 'http://social-api';

beforeEach(() => {
  vi.stubEnv('VITE_SOCIAL_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

const SESSION: VideoSession = {
  documentId: 'doc-1',
  sessionId: 'sess-1',
  vnlSessionId: 'vnl-1',
  status: 'ended',
  startedAt: '2024-01-01T10:00:00.000Z',
  endedAt: '2024-01-01T11:00:00.000Z',
  startedBy: 'u1',
  participants: [{ userId: 'u1', displayName: 'Alice', joinedAt: '2024-01-01T10:00:00.000Z' }],
};

function stubFetch(body: unknown, ok = true, status = ok ? 200 : 500) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body),
  } as unknown as Response);
}

describe('initial state', () => {
  it('starts with empty sessions and loading false', () => {
    vi.stubGlobal('fetch', stubFetch({ sessions: [] }));
    const { result } = renderHook(() => useVideoSessions('doc-1', null));
    expect(result.current.sessions).toHaveLength(0);
    expect(result.current.loading).toBe(false);
  });
});

describe('fetchSessions', () => {
  it('populates sessions on success', async () => {
    vi.stubGlobal('fetch', stubFetch({ sessions: [SESSION] }));
    const { result } = renderHook(() => useVideoSessions('doc-1', 'tok-1'));

    await act(async () => { await result.current.fetchSessions(); });

    expect(result.current.sessions).toHaveLength(1);
    expect(result.current.sessions[0].sessionId).toBe('sess-1');
    expect(result.current.loading).toBe(false);
  });

  it('sends Authorization header when idToken provided', async () => {
    const fetchMock = stubFetch({ sessions: [] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useVideoSessions('doc-1', 'tok-abc'));

    await act(async () => { await result.current.fetchSessions(); });

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/api/video/sessions/document/doc-1');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer tok-abc');
  });

  it('omits Authorization header when idToken is null', async () => {
    const fetchMock = stubFetch({ sessions: [] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useVideoSessions('doc-1', null));

    await act(async () => { await result.current.fetchSessions(); });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect((init.headers as Record<string, string>).Authorization).toBeUndefined();
  });

  it('silently ignores non-ok response and keeps existing sessions', async () => {
    const fetchMock = stubFetch({ sessions: [SESSION] });
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useVideoSessions('doc-1', null));
    await act(async () => { await result.current.fetchSessions(); });
    expect(result.current.sessions).toHaveLength(1);

    fetchMock.mockResolvedValueOnce({ ok: false, status: 503, json: () => Promise.resolve({}) } as unknown as Response);
    await act(async () => { await result.current.fetchSessions(); });

    expect(result.current.sessions).toHaveLength(1);
    expect(result.current.loading).toBe(false);
  });

  it('silently ignores network errors', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('Network error'));
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useVideoSessions('doc-1', null));

    await act(async () => { await result.current.fetchSessions(); });

    expect(result.current.sessions).toHaveLength(0);
    expect(result.current.loading).toBe(false);
  });
});
