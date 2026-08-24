// Regression tests for the social feed hooks that back the exported
// <PostFeed> and <CommentThread> composites.
//
// Every case here is a bug a coverage count could not see: the existing
// suites for these hooks all drive a single id, a single request and a
// single event, and each of these needs two of something — two rooms, two
// deliveries of one post, two overlapping requests — before it shows up.
//
// Written mount-count independent: the suite runs under StrictMode, so each
// effect fires twice and a URL is fetched twice per mount. Assertions select
// requests by URL and settle *every* pending request for a URL rather than
// indexing into `mock.calls`.

import { renderHook, act, waitFor } from '@testing-library/react';
import { usePosts } from '../usePosts';
import { useComments } from '../useComments';
import { useLikes } from '../useLikes';
import type { GatewayMessage } from '../../types/gateway';

const BASE = 'http://api';
const TOKEN = 'tok-1';

beforeEach(() => {
  vi.stubEnv('VITE_PLATFORM_API_URL', BASE);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const NOOP_ON_MESSAGE = () => () => {};

function makeOnMessage() {
  const handlers = new Set<(msg: GatewayMessage) => void>();
  return {
    onMessage: (handler: (msg: GatewayMessage) => void) => {
      handlers.add(handler);
      return () => { handlers.delete(handler); };
    },
    trigger: (msg: GatewayMessage) => { handlers.forEach((h) => h(msg)); },
  };
}

/** Fetch mock whose responses are settled by hand, keyed by URL. */
function deferredFetch() {
  const pending = new Map<string, ((body: unknown) => void)[]>();
  const mock = vi.fn(
    (url: string) =>
      new Promise<Response>((resolve) => {
        const queue = pending.get(url) ?? [];
        queue.push((body) =>
          resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(body),
          } as unknown as Response),
        );
        pending.set(url, queue);
      }),
  );
  vi.stubGlobal('fetch', mock);
  return {
    mock,
    /** Settles every request outstanding for `url` — StrictMode issues 2. */
    settle: (url: string, body: unknown) => {
      const queue = pending.get(url) ?? [];
      pending.set(url, []);
      queue.forEach((res) => res(body));
    },
  };
}

function mockFetchOnce(body: unknown, ok = true, status = ok ? 200 : 500) {
  const mock = vi.fn().mockResolvedValue({
    ok,
    status,
    json: () => Promise.resolve(body),
  } as unknown as Response);
  vi.stubGlobal('fetch', mock);
  return mock;
}

function post(over: Partial<Record<string, unknown>> = {}) {
  return {
    roomId: 'room-a',
    postId: 'p1',
    authorId: 'u1',
    content: 'Hello',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    ...over,
  };
}

const postsUrl = (roomId: string) => `${BASE}/api/rooms/${roomId}/posts`;

// ---------------------------------------------------------------------------
// usePosts — room switching
// ---------------------------------------------------------------------------

describe('usePosts — switching roomId', () => {
  it('ignores the previous room’s response when it lands last', async () => {
    const f = deferredFetch();

    const { result, rerender } = renderHook(
      ({ roomId }) => usePosts({ idToken: TOKEN, roomId, onMessage: NOOP_ON_MESSAGE }),
      { initialProps: { roomId: 'room-a' } },
    );

    rerender({ roomId: 'room-b' });

    // Room B answers first, then room A's slower request finally lands. This
    // is the wrong-room clobber a consumer used to have to defend against
    // with `key={roomId}`: A's posts repainted B's feed, and A's paging
    // cursor was left behind so "Load more" fetched more of room A.
    await act(async () => {
      f.settle(postsUrl('room-b'), { posts: [post({ postId: 'pb', roomId: 'room-b' })] });
    });
    await act(async () => {
      f.settle(postsUrl('room-a'), {
        posts: [post({ postId: 'pa' })],
        lastKey: 'room-a-cursor',
      });
    });

    expect(result.current.posts.map((p) => p.postId)).toEqual(['pb']);
    expect(result.current.hasMore).toBe(false);
  });

  it('drops the previous room’s posts when roomId goes null', async () => {
    mockFetchOnce({ posts: [post()] });

    const { result, rerender } = renderHook(
      ({ roomId }) => usePosts({ idToken: TOKEN, roomId, onMessage: NOOP_ON_MESSAGE }),
      { initialProps: { roomId: 'room-a' as string | null } },
    );

    await waitFor(() => expect(result.current.posts).toHaveLength(1));

    // Leaving the room used to bail out before the reset, so the old room's
    // posts stayed on screen under an empty header.
    rerender({ roomId: null });

    expect(result.current.posts).toEqual([]);
    expect(result.current.loading).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// usePosts — duplicate delivery
// ---------------------------------------------------------------------------

describe('usePosts — duplicate delivery', () => {
  it('does not re-add a post the socket echoes back', async () => {
    const bus = makeOnMessage();
    mockFetchOnce({ posts: [post()] });

    const { result } = renderHook(() =>
      usePosts({ idToken: TOKEN, roomId: 'room-a', onMessage: bus.onMessage }),
    );

    await waitFor(() => expect(result.current.posts).toHaveLength(1));

    // The gateway echoes a post back to its own author, so the same postId
    // arrived twice: once from the create/fetch, once over the socket. That
    // rendered two identical cards under one React key.
    act(() => {
      bus.trigger({ type: 'social:post', payload: post() } as unknown as GatewayMessage);
    });

    expect(result.current.posts.filter((p) => p.postId === 'p1')).toHaveLength(1);
  });

  it('does not append a row loadMore repeats from the previous page', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: true, status: 200,
        json: () => Promise.resolve({ posts: [post({ postId: 'p1' })], lastKey: 'k1' }),
      })
      .mockResolvedValueOnce({
        ok: true, status: 200,
        json: () => Promise.resolve({ posts: [post({ postId: 'p1' })], lastKey: 'k1' }),
      })
      .mockResolvedValue({
        ok: true, status: 200,
        // p1 repeats: a new post shifted the server's window.
        json: () => Promise.resolve({ posts: [post({ postId: 'p1' }), post({ postId: 'p2' })] }),
      });
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() =>
      usePosts({ idToken: TOKEN, roomId: 'room-a', onMessage: NOOP_ON_MESSAGE }),
    );

    await waitFor(() => expect(result.current.hasMore).toBe(true));

    await act(async () => { await result.current.loadMore(); });

    expect(result.current.posts.map((p) => p.postId)).toEqual(['p1', 'p2']);
  });
});

// ---------------------------------------------------------------------------
// usePosts — mutating flag
// ---------------------------------------------------------------------------

describe('usePosts — mutating', () => {
  it('reports an in-flight createPost without claiming the feed is loading', async () => {
    const f = deferredFetch();

    const { result } = renderHook(() =>
      usePosts({ idToken: TOKEN, roomId: 'room-a', onMessage: NOOP_ON_MESSAGE }),
    );

    await act(async () => { f.settle(postsUrl('room-a'), { posts: [] }); });

    act(() => { void result.current.createPost('hi'); });

    // `mutating` was computed and thrown away, so nothing could disable the
    // Post button while the write was in flight and a double-click posted
    // twice. It must not be folded into `loading`, which swaps the feed for
    // its skeleton.
    await waitFor(() => expect(result.current.mutating).toBe(true));
    expect(result.current.loading).toBe(false);

    await act(async () => { f.settle(postsUrl('room-a'), post({ postId: 'p9' })); });
    await waitFor(() => expect(result.current.mutating).toBe(false));
  });
});

// ---------------------------------------------------------------------------
// useComments
// ---------------------------------------------------------------------------

describe('useComments', () => {
  const commentsUrl = (postId: string) => `${BASE}/api/rooms/room-a/posts/${postId}/comments`;

  function comment(over: Partial<Record<string, unknown>> = {}) {
    return {
      postId: 'p1',
      commentId: 'c1',
      authorId: 'u1',
      content: 'nice',
      createdAt: '2024-01-01T00:00:00.000Z',
      ...over,
    };
  }

  it('keeps the thread visible while a new comment posts', async () => {
    const f = deferredFetch();

    const { result } = renderHook(() =>
      useComments({ idToken: TOKEN, roomId: 'room-a', postId: 'p1', onMessage: NOOP_ON_MESSAGE }),
    );

    await act(async () => { f.settle(commentsUrl('p1'), { comments: [comment()] }); });
    expect(result.current.comments).toHaveLength(1);

    act(() => { void result.current.createComment('reply'); });

    // `createComment` used to set `loading`, and CommentThread renders
    // "Loading comments…" *instead of* the list when `loading` is true — so
    // every existing comment vanished for the duration of posting a reply.
    await waitFor(() => expect(result.current.submitting).toBe(true));
    expect(result.current.loading).toBe(false);
    expect(result.current.comments).toHaveLength(1);
  });

  it('drops the previous post’s comments when postId changes', async () => {
    const f = deferredFetch();

    const { result, rerender } = renderHook(
      ({ postId }) =>
        useComments({ idToken: TOKEN, roomId: 'room-a', postId, onMessage: NOOP_ON_MESSAGE }),
      { initialProps: { postId: 'p1' } },
    );

    await act(async () => { f.settle(commentsUrl('p1'), { comments: [comment()] }); });
    expect(result.current.comments).toHaveLength(1);

    // Post A's thread must not linger under post B while B loads.
    rerender({ postId: 'p2' });
    expect(result.current.comments).toEqual([]);

    // ...and A's late response must not overwrite B's.
    await act(async () => {
      f.settle(commentsUrl('p2'), { comments: [comment({ commentId: 'c2', postId: 'p2' })] });
    });
    await act(async () => { f.settle(commentsUrl('p1'), { comments: [comment()] }); });

    expect(result.current.comments.map((c) => c.commentId)).toEqual(['c2']);
  });

  it('does not re-add a comment the socket echoes back', async () => {
    const bus = makeOnMessage();
    mockFetchOnce({ comments: [comment()] });

    const { result } = renderHook(() =>
      useComments({ idToken: TOKEN, roomId: 'room-a', postId: 'p1', onMessage: bus.onMessage }),
    );

    await waitFor(() => expect(result.current.comments).toHaveLength(1));

    act(() => {
      bus.trigger({ type: 'social:comment', payload: comment() } as unknown as GatewayMessage);
    });

    expect(result.current.comments.filter((c) => c.commentId === 'c1')).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// useLikes
// ---------------------------------------------------------------------------

describe('useLikes — optimistic rollback', () => {
  it('reverts the like when the request rejects, not just when it 4xxs', async () => {
    const likesUrl = `${BASE}/api/rooms/room-a/posts/p1/likes`;

    const fetchMock = vi.fn((_url: string, init?: RequestInit) => {
      if (init?.method === 'POST') return Promise.reject(new TypeError('Failed to fetch'));
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ count: 5, users: [] }),
      } as unknown as Response);
    });
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() =>
      useLikes({ idToken: TOKEN, roomId: 'room-a', postId: 'p1', onMessage: NOOP_ON_MESSAGE }),
    );

    await waitFor(() => expect(result.current.likeCount).toBe(5));

    await act(async () => { await result.current.toggle(); });

    // The rollback used to live inside the `!res.ok` branch, which a rejected
    // fetch never reaches. Offline, the heart stayed filled and the count
    // stayed at 6 for a like the server never saw.
    expect(fetchMock).toHaveBeenCalledWith(likesUrl, expect.objectContaining({ method: 'POST' }));
    expect(result.current.isLiked).toBe(false);
    expect(result.current.likeCount).toBe(5);
    expect(result.current.error).toBeTruthy();
  });
});
