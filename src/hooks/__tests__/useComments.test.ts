import { renderHook, act, waitFor } from '@testing-library/react';
import { useComments } from '../useComments';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const BASE = 'http://api';
const TOKEN = 'tok-1';
const ROOM = 'room-1';
const POST = 'post-1';

const DEFAULT_OPTS = {
  idToken: TOKEN,
  roomId: ROOM,
  postId: POST,
};

const COMMENT = {
  postId: POST,
  commentId: 'c1',
  authorId: 'u1',
  content: 'Hello',
  createdAt: '2024-01-01T00:00:00.000Z',
};

beforeEach(() => {
  vi.stubEnv('VITE_PLATFORM_API_URL', BASE);
  vi.useFakeTimers();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

function mockFetch(body: unknown, ok = true) {
  const mock = vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    json: () => Promise.resolve(body),
  } as unknown as Response);
  vi.stubGlobal('fetch', mock);
  return mock;
}

function makeOnMessage() {
  let _handler: ((msg: GatewayMessage) => void) | null = null;
  return {
    onMessage: (handler: (msg: GatewayMessage) => void) => {
      _handler = handler;
      return () => { _handler = null; };
    },
    trigger: (msg: GatewayMessage) => { _handler?.(msg); },
  };
}

// ---------------------------------------------------------------------------
// Initial load
// ---------------------------------------------------------------------------

describe('initial load', () => {
  it('starts with empty comments and not loading before fetch resolves', () => {
    mockFetch({ comments: [COMMENT] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useComments({ ...DEFAULT_OPTS, onMessage }));
    expect(result.current.comments).toEqual([]);
    expect(result.current.loading).toBe(true);
  });

  it('populates comments after successful fetch', async () => {
    mockFetch({ comments: [COMMENT] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useComments({ ...DEFAULT_OPTS, onMessage }));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.comments).toHaveLength(1);
    expect(result.current.comments[0].content).toBe('Hello');
    expect(result.current.loading).toBe(false);
  });

  it('sets error on fetch failure', async () => {
    mockFetch({}, false);
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useComments({ ...DEFAULT_OPTS, onMessage }));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.error).toMatch(/500/);
    expect(result.current.loading).toBe(false);
  });

  it('does not fetch when idToken is null', () => {
    const fetchMock = mockFetch({ comments: [] });
    const { onMessage } = makeOnMessage();
    renderHook(() => useComments({ ...DEFAULT_OPTS, idToken: null, onMessage }));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('does not fetch when postId is null', () => {
    const fetchMock = mockFetch({ comments: [] });
    const { onMessage } = makeOnMessage();
    renderHook(() => useComments({ ...DEFAULT_OPTS, postId: null, onMessage }));
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Real-time WS events
// ---------------------------------------------------------------------------

describe('social:comment WS event', () => {
  it('appends an incoming comment with _fadeIn true', async () => {
    mockFetch({ comments: [] });
    const { onMessage, trigger } = makeOnMessage();
    const { result } = renderHook(() => useComments({ ...DEFAULT_OPTS, onMessage }));

    await act(async () => { await Promise.resolve(); });

    act(() => {
      trigger({
        type: 'social:comment',
        payload: COMMENT,
      } as unknown as GatewayMessage);
    });

    expect(result.current.comments).toHaveLength(1);
    expect(result.current.comments[0]._fadeIn).toBe(true);
  });

  it('clears _fadeIn after 300ms', async () => {
    mockFetch({ comments: [] });
    const { onMessage, trigger } = makeOnMessage();
    const { result } = renderHook(() => useComments({ ...DEFAULT_OPTS, onMessage }));

    await act(async () => { await Promise.resolve(); });

    act(() => {
      trigger({ type: 'social:comment', payload: COMMENT } as unknown as GatewayMessage);
    });

    act(() => { vi.advanceTimersByTime(301); });

    expect(result.current.comments[0]._fadeIn).toBe(false);
  });

  it('ignores social:comment for a different postId', async () => {
    mockFetch({ comments: [] });
    const { onMessage, trigger } = makeOnMessage();
    const { result } = renderHook(() => useComments({ ...DEFAULT_OPTS, onMessage }));

    await act(async () => { await Promise.resolve(); });

    act(() => {
      trigger({
        type: 'social:comment',
        payload: { ...COMMENT, postId: 'other-post' },
      } as unknown as GatewayMessage);
    });

    expect(result.current.comments).toHaveLength(0);
  });

  // Regression: `createComment` appends the POST response and the gateway then
  // broadcasts the same row back, so the author saw their own comment twice
  // under a duplicate-key warning. `useChat` deduped by server id already.
  it('does not duplicate a comment already present (own-comment WS echo)', async () => {
    mockFetch({ comments: [COMMENT] });
    const { onMessage, trigger } = makeOnMessage();
    const { result } = renderHook(() => useComments({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });
    expect(result.current.comments).toHaveLength(1);

    act(() => {
      trigger({ type: 'social:comment', payload: COMMENT } as unknown as GatewayMessage);
    });

    expect(result.current.comments).toHaveLength(1);
  });

  it('still accepts a genuinely new comment from another author', async () => {
    mockFetch({ comments: [COMMENT] });
    const { onMessage, trigger } = makeOnMessage();
    const { result } = renderHook(() => useComments({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    act(() => {
      trigger({
        type: 'social:comment',
        payload: { ...COMMENT, commentId: 'c2', content: 'Second' },
      } as unknown as GatewayMessage);
    });

    expect(result.current.comments).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// createComment
// ---------------------------------------------------------------------------

describe('createComment', () => {
  it('POSTs and appends the returned comment', async () => {
    mockFetch({ comments: [] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useComments({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    const newComment = { ...COMMENT, commentId: 'c2', content: 'New one' };
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(newComment) } as unknown as Response));

    await act(async () => { await result.current.createComment('New one'); });

    expect(result.current.comments).toHaveLength(1);
    expect(result.current.comments[0].content).toBe('New one');
    expect(result.current.loading).toBe(false);
  });

  it('sets error when createComment fails', async () => {
    mockFetch({ comments: [] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useComments({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 403, json: () => Promise.resolve({}) } as unknown as Response));

    await act(async () => { await result.current.createComment('fail'); });

    expect(result.current.error).toMatch(/403/);
  });

  it('is a no-op when idToken is null', async () => {
    const fetchMock = mockFetch({ comments: [] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() =>
      useComments({ ...DEFAULT_OPTS, idToken: null, onMessage }),
    );
    await act(async () => { await result.current.createComment('x'); });
    // Only called for the initial load (which also short-circuits), so 0 calls
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// deleteComment
// ---------------------------------------------------------------------------

describe('deleteComment', () => {
  it('removes the comment from state after successful DELETE', async () => {
    mockFetch({ comments: [COMMENT] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useComments({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) } as unknown as Response));

    await act(async () => { await result.current.deleteComment('c1'); });

    expect(result.current.comments).toHaveLength(0);
  });

  it('sets error when deleteComment fails', async () => {
    mockFetch({ comments: [COMMENT] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useComments({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 404, json: () => Promise.resolve({}) } as unknown as Response));

    await act(async () => { await result.current.deleteComment('c1'); });

    expect(result.current.error).toMatch(/404/);
    expect(result.current.comments).toHaveLength(1);
  });
});
