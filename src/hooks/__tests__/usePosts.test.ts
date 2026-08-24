import { renderHook, act } from '@testing-library/react';
import { usePosts } from '../usePosts';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const BASE = 'http://api';
const TOKEN = 'tok-1';
const ROOM = 'room-1';

const DEFAULT_OPTS = { idToken: TOKEN, roomId: ROOM };

const POST = {
  roomId: ROOM,
  postId: 'p1',
  authorId: 'u1',
  content: 'Hello',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
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
  it('fetches posts and populates state', async () => {
    mockFetch({ posts: [POST] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.posts).toHaveLength(1);
    expect(result.current.posts[0].content).toBe('Hello');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hasMore).toBe(false);
  });

  it('sets hasMore true when lastKey is returned', async () => {
    mockFetch({ posts: [POST], lastKey: 'cursor-abc' });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.hasMore).toBe(true);
  });

  it('does not fetch when idToken is null', () => {
    const fetchMock = mockFetch({ posts: [] });
    const { onMessage } = makeOnMessage();
    renderHook(() => usePosts({ ...DEFAULT_OPTS, idToken: null, onMessage }));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('does not fetch when roomId is null', () => {
    const fetchMock = mockFetch({ posts: [] });
    const { onMessage } = makeOnMessage();
    renderHook(() => usePosts({ ...DEFAULT_OPTS, roomId: null, onMessage }));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sets error on fetch failure', async () => {
    mockFetch({}, false, 503);
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));

    await act(async () => { await Promise.resolve(); });

    expect(result.current.error).toMatch(/503/);
    expect(result.current.loading).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// WS social:post events
// ---------------------------------------------------------------------------

describe('social:post WS event', () => {
  it('prepends incoming post with _fadeIn true', async () => {
    mockFetch({ posts: [] });
    const { onMessage, trigger } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    act(() => {
      trigger({ type: 'social:post', payload: POST } as unknown as GatewayMessage);
    });

    expect(result.current.posts).toHaveLength(1);
    expect(result.current.posts[0]._fadeIn).toBe(true);
  });

  it('clears _fadeIn after 300ms', async () => {
    mockFetch({ posts: [] });
    const { onMessage, trigger } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    act(() => {
      trigger({ type: 'social:post', payload: POST } as unknown as GatewayMessage);
    });

    act(() => { vi.advanceTimersByTime(301); });

    expect(result.current.posts[0]._fadeIn).toBe(false);
  });

  it('ignores social:post for a different roomId', async () => {
    mockFetch({ posts: [] });
    const { onMessage, trigger } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    act(() => {
      trigger({ type: 'social:post', payload: { ...POST, roomId: 'other-room' } } as unknown as GatewayMessage);
    });

    expect(result.current.posts).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// createPost
// ---------------------------------------------------------------------------

describe('createPost', () => {
  it('POSTs and prepends the returned post', async () => {
    mockFetch({ posts: [] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    const newPost = { ...POST, postId: 'p2', content: 'New' };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true, json: () => Promise.resolve(newPost),
    } as unknown as Response));

    await act(async () => { await result.current.createPost('New'); });

    expect(result.current.posts[0].content).toBe('New');
  });

  it('sets error and re-throws on failure', async () => {
    mockFetch({ posts: [] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false, status: 400, json: () => Promise.resolve({}),
    } as unknown as Response));

    await act(async () => {
      await expect(result.current.createPost('fail')).rejects.toThrow(/400/);
    });
    expect(result.current.error).toMatch(/400/);
  });
});

// ---------------------------------------------------------------------------
// editPost
// ---------------------------------------------------------------------------

describe('editPost', () => {
  it('PUTs and updates the post in-place', async () => {
    mockFetch({ posts: [POST] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    const updated = { ...POST, content: 'Edited' };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true, json: () => Promise.resolve(updated),
    } as unknown as Response));

    await act(async () => { await result.current.editPost('p1', 'Edited'); });

    expect(result.current.posts[0].content).toBe('Edited');
  });

  it('sets error on failure', async () => {
    mockFetch({ posts: [POST] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false, status: 403, json: () => Promise.resolve({}),
    } as unknown as Response));

    await act(async () => { await result.current.editPost('p1', 'x'); });

    expect(result.current.error).toMatch(/403/);
    expect(result.current.posts[0].content).toBe('Hello');
  });
});

// ---------------------------------------------------------------------------
// deletePost
// ---------------------------------------------------------------------------

describe('deletePost', () => {
  it('DELETEs and removes the post from state', async () => {
    mockFetch({ posts: [POST] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true, json: () => Promise.resolve({}),
    } as unknown as Response));

    await act(async () => { await result.current.deletePost('p1'); });

    expect(result.current.posts).toHaveLength(0);
  });

  it('sets error on failure', async () => {
    mockFetch({ posts: [POST] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false, status: 404, json: () => Promise.resolve({}),
    } as unknown as Response));

    await act(async () => { await result.current.deletePost('p1'); });

    expect(result.current.error).toMatch(/404/);
    expect(result.current.posts).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// loadMore
// ---------------------------------------------------------------------------

describe('loadMore', () => {
  it('appends next page and updates hasMore', async () => {
    mockFetch({ posts: [POST], lastKey: 'cursor-1' });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    const p2 = { ...POST, postId: 'p2', content: 'Page 2' };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true, json: () => Promise.resolve({ posts: [p2], lastKey: undefined }),
    } as unknown as Response));

    await act(async () => { await result.current.loadMore(); });

    expect(result.current.posts).toHaveLength(2);
    expect(result.current.hasMore).toBe(false);
  });

  it('is a no-op when hasMore is false', async () => {
    mockFetch({ posts: [POST] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    const loadMoreMock = vi.fn();
    vi.stubGlobal('fetch', loadMoreMock);

    await act(async () => { await result.current.loadMore(); });

    expect(loadMoreMock).not.toHaveBeenCalled();
    expect(result.current.posts).toHaveLength(1);
  });

  it('sets error on failure', async () => {
    mockFetch({ posts: [POST], lastKey: 'cursor-1' });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false, status: 502, json: () => Promise.resolve({}),
    } as unknown as Response));

    await act(async () => { await result.current.loadMore(); });

    expect(result.current.error).toMatch(/502/);
    expect(result.current.posts).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// getUserPosts
// ---------------------------------------------------------------------------

describe('getUserPosts', () => {
  it('fetches user posts by userId', async () => {
    mockFetch({ posts: [] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true, json: () => Promise.resolve({ posts: [POST] }),
    } as unknown as Response));

    let userPosts: typeof POST[] = [];
    await act(async () => { userPosts = await result.current.getUserPosts('u1'); });

    expect(userPosts).toHaveLength(1);
    expect(userPosts[0].postId).toBe('p1');
  });

  it('throws on fetch failure', async () => {
    mockFetch({ posts: [] });
    const { onMessage } = makeOnMessage();
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false, status: 401, json: () => Promise.resolve({}),
    } as unknown as Response));

    await act(async () => {
      await expect(result.current.getUserPosts('u1')).rejects.toThrow(/401/);
    });
  });
});

// ---------------------------------------------------------------------------
// In-flight mutation flag
// ---------------------------------------------------------------------------

describe('mutating', () => {
  // The flag was set around every mutation from the start but lived in an
  // unread `_mutating` state and was never returned, so the only busy signal
  // a composer could read was `loading` — which usePosts sets for the initial
  // fetch and loadMore only, and which is false forever after the first page
  // resolves. See PostFeed's submit button.
  it('is true while a createPost request is in flight and false after it settles', async () => {
    const { onMessage } = makeOnMessage();
    mockFetch({ posts: [] });
    const { result } = renderHook(() => usePosts({ ...DEFAULT_OPTS, onMessage }));
    await act(async () => { await Promise.resolve(); });
    expect(result.current.mutating).toBe(false);

    // Hold the POST open so the in-flight window is observable.
    let release: (() => void) | undefined;
    const pending = new Promise<Response>((resolve) => {
      release = () =>
        resolve({ ok: true, status: 200, json: () => Promise.resolve(POST) } as unknown as Response);
    });
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(pending));

    let created: Promise<void> | undefined;
    act(() => { created = result.current.createPost('hi'); });
    await act(async () => { await Promise.resolve(); });
    expect(result.current.mutating).toBe(true);

    await act(async () => {
      release?.();
      await created;
    });
    expect(result.current.mutating).toBe(false);
  });
});
