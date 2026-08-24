// frontend/src/hooks/useLikes.ts
//
// Likes hook — like/unlike posts and comments with real-time like count updates.
// Handles social:like events by integer-swapping likeCount in-place (no animation).
// Also exposes reactWithEmoji() for emoji reactions on posts.
// All requests use Authorization: Bearer idToken against VITE_PLATFORM_API_URL.

import { useState, useEffect, useRef, useCallback } from 'react';
import type { GatewayMessage } from '../types/gateway';
import type { PublicProfile } from './useFriends';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;

export interface UseLikesOptions {
  idToken: string | null;
  roomId: string | null;
  postId: string | null;
  commentId?: string | null;
  onMessage: OnMessageFn;
}

export interface UseLikesReturn {
  isLiked: boolean;
  likeCount: number;
  whoLiked: PublicProfile[];
  toggle: () => Promise<void>;
  reactWithEmoji: (emoji: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useLikes({ idToken, roomId, postId, commentId, onMessage }: UseLikesOptions): UseLikesReturn {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [whoLiked, setWhoLiked] = useState<PublicProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = (import.meta.env as Record<string, string>).VITE_PLATFORM_API_URL ?? '';

  // ---- Stable refs for WS handler -----------------------------------------

  const onMessageRef = useRef(onMessage);
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  const postIdRef = useRef(postId);
  useEffect(() => {
    postIdRef.current = postId;
  }, [postId]);

  // ---- On mount: fetch like count (post likes only) -----------------------

  useEffect(() => {
    if (!idToken || !roomId || !postId) return;
    // Skip GET for comment likes — no who-liked endpoint for comments
    if (commentId) return;

    setLoading(true);
    setError(null);

    fetch(`${baseUrl}/api/rooms/${roomId}/posts/${postId}/likes`, {
      headers: { Authorization: `Bearer ${idToken}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load likes (${res.status})`);
        return res.json() as Promise<{ count: number; users: PublicProfile[] }>;
      })
      .then((data) => {
        setLikeCount(data.count ?? 0);
        setWhoLiked(data.users ?? []);
        setIsLiked(false); // server does not return current user's like status
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [idToken, roomId, postId, commentId, baseUrl]);

  // ---- WS handler: social:like --------------------------------------------

  useEffect(() => {
    const unregister = onMessageRef.current((msg: GatewayMessage) => {
      if (msg.type === 'social:like') {
        const payload = ((msg as Record<string, unknown>).payload ?? msg) as Record<string, unknown>;
        if (payload.postId !== postIdRef.current) return;
        setLikeCount((prev) => payload.action === 'unliked' ? Math.max(0, prev - 1) : prev + 1);
      }
    });

    return unregister;
  }, []);

  // ---- toggle --------------------------------------------------------------

  const toggle = useCallback(async (): Promise<void> => {
    if (!idToken || !roomId || !postId) return;
    setLoading(true);
    setError(null);

    // Optimistic update
    const wasLiked = isLiked;
    setIsLiked(!wasLiked);
    setLikeCount((prev) => (wasLiked ? prev - 1 : prev + 1));

    try {
      let likesUrl: string;
      if (commentId) {
        likesUrl = `${baseUrl}/api/rooms/${roomId}/posts/${postId}/comments/${commentId}/likes`;
      } else {
        likesUrl = `${baseUrl}/api/rooms/${roomId}/posts/${postId}/likes`;
      }

      const res = await fetch(likesUrl, {
        method: wasLiked ? 'DELETE' : 'POST',
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) throw new Error(`Failed to toggle like (${res.status})`);
    } catch (err) {
      // The rollback lives here, not in the `!res.ok` branch. It used to sit
      // inside that branch, which covered an HTTP error but NOT a fetch that
      // rejects — offline, DNS failure, CORS. In that case the heart stayed
      // filled and the count stayed incremented for a like the server never
      // recorded, until the user reloaded the page.
      setIsLiked(wasLiked);
      setLikeCount((prev) => (wasLiked ? prev + 1 : prev - 1));
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [idToken, roomId, postId, commentId, isLiked, baseUrl]);

  // ---- reactWithEmoji ------------------------------------------------------

  const reactWithEmoji = useCallback(async (emoji: string): Promise<void> => {
    if (!idToken || !roomId || !postId) return;
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/api/rooms/${roomId}/posts/${postId}/reactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ emoji }),
      });
      if (!res.ok) throw new Error(`Failed to react (${res.status})`);
    } catch (err) {
      setError((err as Error).message);
    }
  }, [idToken, roomId, postId, baseUrl]);

  return { isLiked, likeCount, whoLiked, toggle, reactWithEmoji, loading, error };
}
