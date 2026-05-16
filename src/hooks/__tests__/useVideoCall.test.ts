import { renderHook, act, waitFor } from '@testing-library/react';
import { useVideoCall } from '../useVideoCall';
import type { DocumentMeta } from '../../types/document';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const BASE = 'http://social-api';

beforeEach(() => { vi.stubEnv('VITE_SOCIAL_API_URL', BASE); });
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

function stubFetch(body: unknown, ok = true, status = ok ? 200 : 500) {
  return vi.fn().mockResolvedValue({
    ok, status, json: () => Promise.resolve(body),
  } as unknown as Response);
}

const BASE_META: DocumentMeta = {
  id: 'doc-1',
  title: 'Test Doc',
  sourceType: 'notes',
  sourceId: 'src-1',
  createdBy: 'u1',
  createdAt: '2024-01-01T00:00:00.000Z',
  aiModel: 'claude-3',
  status: 'draft',
  activeCallSessionId: '',
};

function makeOpts(overrides: Partial<Parameters<typeof useVideoCall>[0]> = {}) {
  return {
    documentId: 'doc-1',
    idToken: 'tok-1',
    meta: BASE_META,
    updateMeta: vi.fn(),
    sendMessage: vi.fn(),
    displayName: 'Alice',
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

describe('initial state', () => {
  it('starts idle with null fields', () => {
    vi.stubGlobal('fetch', stubFetch({}));
    const { result } = renderHook(() => useVideoCall(makeOpts()));
    expect(result.current.callState).toBe('idle');
    expect(result.current.sessionId).toBeNull();
    expect(result.current.stageToken).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.hasActiveCall).toBe(false);
  });

  it('hasActiveCall is true when meta has activeCallSessionId', () => {
    vi.stubGlobal('fetch', stubFetch({}));
    const { result } = renderHook(() =>
      useVideoCall(makeOpts({ meta: { ...BASE_META, activeCallSessionId: 'sess-99' } })));
    expect(result.current.hasActiveCall).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// startCall
// ---------------------------------------------------------------------------

describe('startCall', () => {
  it('creates session, joins, updates meta and sends WS message on success', async () => {
    const updateMeta = vi.fn();
    const sendMessage = vi.fn();
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ sessionId: 'sess-1' }) } as unknown as Response)
      .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ token: 'stage-tok', participantId: 'p-1', userId: 'u-1' }) } as unknown as Response);
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useVideoCall(makeOpts({ updateMeta, sendMessage })));

    await act(async () => { await result.current.startCall(); });

    expect(result.current.callState).toBe('active');
    expect(result.current.sessionId).toBe('sess-1');
    expect(result.current.stageToken).toBe('stage-tok');
    expect(result.current.participantId).toBe('p-1');
    expect(updateMeta).toHaveBeenCalledWith(expect.objectContaining({ activeCallSessionId: 'sess-1' }));
    expect(sendMessage).toHaveBeenCalledWith(expect.objectContaining({ action: 'updateDocumentMeta' }));
  });

  it('sets error state when session creation fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false, status: 503, json: () => Promise.resolve({ error: 'Service unavailable' }),
    } as unknown as Response));

    const { result } = renderHook(() => useVideoCall(makeOpts()));

    await act(async () => { await result.current.startCall(); });

    expect(result.current.callState).toBe('error');
    expect(result.current.error).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// joinCall
// ---------------------------------------------------------------------------

describe('joinCall', () => {
  it('sets callState=active and populates token fields on success', async () => {
    vi.stubGlobal('fetch', stubFetch({ token: 'stage-tok', participantId: 'p-2', userId: 'u-2' }));

    const { result } = renderHook(() => useVideoCall(makeOpts()));

    await act(async () => { await result.current.joinCall('sess-existing'); });

    expect(result.current.callState).toBe('active');
    expect(result.current.sessionId).toBe('sess-existing');
    expect(result.current.stageToken).toBe('stage-tok');
  });

  it('clears stale meta and throws on 404', async () => {
    const updateMeta = vi.fn();
    const sendMessage = vi.fn();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false, status: 404, json: () => Promise.resolve({ error: 'Not found' }),
    } as unknown as Response));

    const { result } = renderHook(() => useVideoCall(makeOpts({ updateMeta, sendMessage })));

    await act(async () => { await result.current.joinCall('sess-stale'); });

    expect(result.current.callState).toBe('error');
    expect(updateMeta).toHaveBeenCalledWith({ activeCallSessionId: '' });
    expect(sendMessage).toHaveBeenCalledWith(expect.objectContaining({ meta: { activeCallSessionId: '' } }));
  });

  it('sets error state on non-404 failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false, status: 500, json: () => Promise.resolve({ error: 'Server error' }),
    } as unknown as Response));

    const { result } = renderHook(() => useVideoCall(makeOpts()));

    await act(async () => { await result.current.joinCall('sess-1'); });

    expect(result.current.callState).toBe('error');
    expect(result.current.error).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// endCall
// ---------------------------------------------------------------------------

describe('endCall', () => {
  it('resets call state and clears meta after an active call', async () => {
    const updateMeta = vi.fn();
    const sendMessage = vi.fn();
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ token: 'tok', participantId: 'p-1', userId: 'u-1' }) } as unknown as Response)
      .mockResolvedValue({ ok: true, status: 200, json: () => Promise.resolve({}) } as unknown as Response);
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useVideoCall(makeOpts({ updateMeta, sendMessage })));
    await act(async () => { await result.current.joinCall('sess-1'); });
    expect(result.current.callState).toBe('active');

    sendMessage.mockClear();
    updateMeta.mockClear();

    act(() => { void result.current.endCall(); });

    expect(result.current.callState).toBe('idle');
    expect(result.current.sessionId).toBeNull();
    expect(result.current.stageToken).toBeNull();
    expect(updateMeta).toHaveBeenCalledWith({ activeCallSessionId: '' });
    expect(sendMessage).toHaveBeenCalledWith(expect.objectContaining({ meta: { activeCallSessionId: '' } }));
  });
});
