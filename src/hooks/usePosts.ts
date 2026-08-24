// frontend/src/hooks/usePosts.ts
//
// Posts hook — fetches and manages posts for a room with real-time WS updates.
// Handles social:post events by prepending incoming posts with a fade-in flag.
// All requests use Authorization: Bearer idToken against VITE_PLATFORM_API_URL.

import { useState, useEffect, useRef, useCallback } from 'react';
import type { GatewayMessage } from '../types/gateway';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PostItem {
  roomId: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  _fadeIn?: boolean;
}

export type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;

export interface UsePostsOptions {
  idToken: string | null;
  roomId: string | null;
  onMessage: OnMessageFn;
}

export interface UsePostsReturn {
  posts: PostItem[];
  createPost: (content: string) => Promise<void>;
  editPost: (postId: string, content: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  getUserPosts: (userId: string) => Promise<PostItem[]>;
  /** True while the initial fetch or `loadMore` is in flight. */
  loading: boolean;
  /**
   * True while `createPost` / `editPost` / `deletePost` is in flight.
   *
   * Kept separate from `loading` on purpose — a mutation must not put the
   * feed back into its "Loading…" skeleton — but it was previously computed
   * and then thrown away, so nothing could disable a submit button while a
   * post was being written and a double-click created the post twice.
   */
  mutating: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function usePosts({ idToken, roomId, onMessage }: UsePostsOptions): UsePostsReturn {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [lastKey, setLastKey] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);       // initial fetch / loadMore
  const [mutating, setMutating] = useState(false);     // createPost / editPost / deletePost
  const [error, setError] = useState<string | null>(null);

  const baseUrl = (import.meta.env as Record<string, string>).VITE_PLATFORM_API_URL ?? '';

  // ---- Stable refs for WS handler -----------------------------------------

  const onMessageRef = useRef(onMessage);
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  const roomIdRef = useRef(roomId);
  useEffect(() => {
    roomIdRef.current = roomId;
  }, [roomId]);

  // ---- On mount: fetch posts -----------------------------------------------

  useEffect(() => {
    // Clearing on the way out matters as much as on the way in: leaving a
    // room (roomId -> null) used to bail before the reset, so the previous
    // room's posts stayed on screen under an empty room header.
    setPosts([]);
    setLastKey(undefined);
    setError(null);

    if (!idToken || !roomId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // Per-run cancellation flag. `<PostFeed roomId={x} />` with no `key` is a
    // supported way to mount this: when `roomId` goes A -> B and A's response
    // is the slower one, it used to land last and repaint room B's feed with
    // room A's posts — and hand `loadMore` room A's cursor, so paging on
    // B fetched more of A. Declared INSIDE the effect body on purpose; a
    // shared ref reset at the top of each run would resurrect the previous
    // run's cancellation.
    let cancelled = false;

    fetch(`${baseUrl}/api/rooms/${roomId}/posts`, {
      headers: { Authorization: `Bearer ${idToken}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load posts (${res.status})`);
        return res.json() as Promise<{ posts: PostItem[]; lastKey?: string }>;
      })
      .then((data) => {
        if (cancelled) return;
        setPosts(data.posts ?? []);
        setLastKey(data.lastKey);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [idToken, roomId, baseUrl]);

  // ---- WS handler: social:post ---------------------------------------------

  useEffect(() => {
    // One fade-off timer per inbound post, created inside the message handler.
    // Unregistering stops new ones, but any already scheduled would outlive
    // the unmount, so they're tracked and cleared alongside it.
    const fadeTimers = new Set<ReturnType<typeof setTimeout>>();

    const unregister = onMessageRef.current((msg: GatewayMessage) => {
      if (msg.type === 'social:post') {
        const payload = (msg.payload ?? msg) as Record<string, unknown>;
        if (payload.roomId !== roomIdRef.current) return;
        const incoming = { ...(payload as unknown as PostItem), _fadeIn: true };
        // Dedupe by postId. The gateway echoes a post back to its own author,
        // so `createPost` prepending the POST response and this handler
        // prepending the echo produced the same post twice — two identical
        // cards and a React duplicate-key warning, every time you posted.
        // Reconnect replay lands here the same way.
        setPosts((prev) =>
          prev.some((p) => p.postId === incoming.postId) ? prev : [incoming, ...prev],
        );
        const handle = setTimeout(() => {
          fadeTimers.delete(handle);
          setPosts((prev) =>
            prev.map((p) => (p.postId === incoming.postId ? { ...p, _fadeIn: false } : p))
          );
        }, 300);
        fadeTimers.add(handle);
      }
    });

    return () => {
      unregister();
      fadeTimers.forEach((t) => clearTimeout(t));
      fadeTimers.clear();
    };
  }, []);

  // ---- loadMore ------------------------------------------------------------

  const loadMore = useCallback(async (): Promise<void> => {
    if (!idToken || !roomId || !lastKey) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${baseUrl}/api/rooms/${roomId}/posts?lastKey=${encodeURIComponent(lastKey)}`,
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      if (!res.ok) throw new Error(`Failed to load more posts (${res.status})`);
      const data = await res.json() as { posts: PostItem[]; lastKey?: string };
      // Drop anything already on screen. A post that arrived over the socket
      // (or was just created) shifts the server's window, so the next page
      // legitimately repeats a row it already sent — which rendered as a
      // duplicate card with a duplicate React key at every page boundary.
      setPosts((prev) => {
        const seen = new Set(prev.map((p) => p.postId));
        return [...prev, ...(data.posts ?? []).filter((p) => !seen.has(p.postId))];
      });
      setLastKey(data.lastKey);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken, roomId, lastKey, baseUrl]);

  // ---- createPost ----------------------------------------------------------

  const createPost = useCallback(async (content: string): Promise<void> => {
    if (!idToken || !roomId) return;
    setMutating(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/rooms/${roomId}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error(`Failed to create post (${res.status})`);
      const post = await res.json() as PostItem;
      // The socket echo may have beaten the POST response here; in that case
      // update in place rather than prepending a second copy.
      setPosts((prev) =>
        prev.some((p) => p.postId === post.postId)
          ? prev.map((p) => (p.postId === post.postId ? post : p))
          : [post, ...prev],
      );
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setMutating(false);
    }
  }, [idToken, roomId, baseUrl]);

  // ---- editPost ------------------------------------------------------------

  const editPost = useCallback(async (postId: string, content: string): Promise<void> => {
    if (!idToken || !roomId) return;
    setMutating(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/rooms/${roomId}/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error(`Failed to edit post (${res.status})`);
      const updated = await res.json() as PostItem;
      setPosts((prev) => prev.map((p) => (p.postId === postId ? updated : p)));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setMutating(false);
    }
  }, [idToken, roomId, baseUrl]);

  // ---- deletePost ----------------------------------------------------------

  const deletePost = useCallback(async (postId: string): Promise<void> => {
    if (!idToken || !roomId) return;
    setMutating(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/rooms/${roomId}/posts/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) throw new Error(`Failed to delete post (${res.status})`);
      setPosts((prev) => prev.filter((p) => p.postId !== postId));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setMutating(false);
    }
  }, [idToken, roomId, baseUrl]);

  // ---- getUserPosts (CONT-05) -----------------------------------------------

  const getUserPosts = useCallback(async (userId: string): Promise<PostItem[]> => {
    if (!idToken) return [];
    const res = await fetch(`${baseUrl}/api/posts/${userId}`, {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    if (!res.ok) throw new Error(`Failed to load user posts (${res.status})`);
    return ((await res.json()) as { posts: PostItem[] }).posts;
  }, [idToken, baseUrl]);

  return {
    posts,
    createPost,
    editPost,
    deletePost,
    getUserPosts,
    loading,
    mutating,
    error,
    hasMore: lastKey !== undefined,
    loadMore,
  };
}
