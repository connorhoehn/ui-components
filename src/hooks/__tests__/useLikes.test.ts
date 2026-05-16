import { renderHook, act } from '@testing-library/react';
import { useLikes } from '../useLikes';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const BASE = 'http://api';
const TOKEN = 'tok-1';
const ROOM = 'room-1';
const POST = 'post-1';
const COMMENT = 'comment-1';

const DEFAULT_OPTS = {
  idToken: TOKEN,
  roomId: ROOM,
  postId: POST,
};

const PROFILE = { userId: 'u1', displayName: 'Alice', avatarUrl: null };

beforeEach(() => {
  vi.stubEnv('VITE_PLATFORM_API_URL', BASE);
  vi.useFakeTimers();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.useRealTimers();
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
  it('fetches like count for a post and populates state', async () => {
    mockFetch({ count: 3, users: [PROFILE] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useLikes({ ...DEFAULT_OPTS, onMessage }));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.likeCount).toBe(3);
    expect(result.current.whoLiked).toHaveLength(1);
    expect(result.current.isLiked).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('starts loading before fetch resolves', () => {
    mockFetch({ count: 0, users: [] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useLikes({ ...DEFAULT_OPTS, onMessage }));
    expect(result.current.loading).toBe(true);
  });

  it('skips GET for comment likes', () => {
    const fetchMock = mockFetch({ count: 0, users: [] });
    const { onMessage } = makeOnMessage();
    renderHook(() => useLikes({ ...DEFAULT_OPTS, commentId: COMMENT, onMessage }));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('does not fetch when idToken is null', () => {
    const fetchMock = mockFetch({ count: 0, users: [] });
    const { onMessage } = makeOnMessage();
    renderHook(() => useLikes({ ...DEFAULT_OPTS, idToken: null, onMessage }));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('does not fetch when roomId is null', () => {
    const fetchMock = mockFetch({ count: 0, users: [] });
    const { onMessage } = makeOnMessage();
    renderHook(() => useLikes({ ...DEFAULT_OPTS, roomId: null, onMessage }));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('does not fetch when postId is null', () => {
    const fetchMock = mockFetch({ count: 0, users: [] });
    const { onMessage } = makeOnMessage();
    renderHook(() => useLikes({ ...DEFAULT_OPTS, postId: null, onMessage }));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sets error on fetch failure', async () => {
    mockFetch({}, false, 503);
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useLikes({ ...DEFAULT_OPTS, onMessage }));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.error).toMatch(/503/);
    expect(result.current.loading).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// WS social:like events
// ---------------------------------------------------------------------------

describe('social:like WS event', () => {
  it('increments likeCount on liked action', async () => {
    mockFetch({ count: 2, users: [] });
    const { onMessage, trigger } = makeOnMessage();
    const { result } = renderHook(() => useLikes({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    act(() => {
      trigger({ type: 'social:like', payload: { postId: POST, action: 'liked' } } as unknown as GatewayMessage);
    });

    expect(result.current.likeCount).toBe(3);
  });

  it('decrements likeCount on unliked action', async () => {
    mockFetch({ count: 2, users: [] });
    const { onMessage, trigger } = makeOnMessage();
    const { result } = renderHook(() => useLikes({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    act(() => {
      trigger({ type: 'social:like', payload: { postId: POST, action: 'unliked' } } as unknown as GatewayMessage);
    });

    expect(result.current.likeCount).toBe(1);
  });

  it('floors likeCount at 0 on unliked when count is already 0', async () => {
    mockFetch({ count: 0, users: [] });
    const { onMessage, trigger } = makeOnMessage();
    const { result } = renderHook(() => useLikes({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    act(() => {
      trigger({ type: 'social:like', payload: { postId: POST, action: 'unliked' } } as unknown as GatewayMessage);
    });

    expect(result.current.likeCount).toBe(0);
  });

  it('ignores social:like for a different postId', async () => {
    mockFetch({ count: 2, users: [] });
    const { onMessage, trigger } = makeOnMessage();
    const { result } = renderHook(() => useLikes({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    act(() => {
      trigger({ type: 'social:like', payload: { postId: 'other-post', action: 'liked' } } as unknown as GatewayMessage);
    });

    expect(result.current.likeCount).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// toggle
// ---------------------------------------------------------------------------

describe('toggle', () => {
  it('optimistically likes and keeps state on success', async () => {
    mockFetch({ count: 1, users: [] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useLikes({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({}) } as unknown as Response));

    await act(async () => { await result.current.toggle(); });

    expect(result.current.isLiked).toBe(true);
    expect(result.current.likeCount).toBe(2);
    expect(result.current.error).toBeNull();
  });

  it('uses POST to like and DELETE to unlike', async () => {
    mockFetch({ count: 0, users: [] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useLikes({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    const toggleMock = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({}) } as unknown as Response);
    vi.stubGlobal('fetch', toggleMock);

    // First toggle: like (POST)
    await act(async () => { await result.current.toggle(); });
    expect(toggleMock.mock.calls[0][1]).toMatchObject({ method: 'POST' });

    // Second toggle: unlike (DELETE)
    await act(async () => { await result.current.toggle(); });
    expect(toggleMock.mock.calls[1][1]).toMatchObject({ method: 'DELETE' });
  });

  it('uses the comment URL when commentId is provided', async () => {
    mockFetch({ count: 0, users: [] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useLikes({ ...DEFAULT_OPTS, commentId: COMMENT, onMessage }));

    const toggleMock = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({}) } as unknown as Response);
    vi.stubGlobal('fetch', toggleMock);

    await act(async () => { await result.current.toggle(); });

    const url = toggleMock.mock.calls[0][0] as string;
    expect(url).toContain(`/comments/${COMMENT}/likes`);
  });

  it('reverts optimistic update on HTTP error', async () => {
    mockFetch({ count: 2, users: [] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useLikes({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 409, json: () => Promise.resolve({}) } as unknown as Response));

    await act(async () => { await result.current.toggle(); });

    expect(result.current.isLiked).toBe(false);
    expect(result.current.likeCount).toBe(2);
    expect(result.current.error).toMatch(/409/);
  });

  it('is a no-op when idToken is null', async () => {
    mockFetch({ count: 0, users: [] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useLikes({ ...DEFAULT_OPTS, idToken: null, onMessage }));

    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await act(async () => { await result.current.toggle(); });

    expect(fetchMock).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// reactWithEmoji
// ---------------------------------------------------------------------------

describe('reactWithEmoji', () => {
  it('POSTs emoji to the reactions endpoint', async () => {
    mockFetch({ count: 0, users: [] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useLikes({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    const emojiMock = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({}) } as unknown as Response);
    vi.stubGlobal('fetch', emojiMock);

    await act(async () => { await result.current.reactWithEmoji('👍'); });

    const [url, init] = emojiMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain(`/posts/${POST}/reactions`);
    expect(JSON.parse(init.body as string)).toEqual({ emoji: '👍' });
    expect(result.current.error).toBeNull();
  });

  it('sets error when reactWithEmoji fails', async () => {
    mockFetch({ count: 0, users: [] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => useLikes({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 422, json: () => Promise.resolve({}) } as unknown as Response));

    await act(async () => { await result.current.reactWithEmoji('👍'); });

    expect(result.current.error).toMatch(/422/);
  });
});
