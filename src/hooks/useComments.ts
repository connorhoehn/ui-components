// frontend/src/hooks/useComments.ts
//
// Comments hook — fetches and manages comments for a post with real-time updates.
// Handles social:comment events by appending incoming comments with a fade-in flag.
// All requests use Authorization: Bearer idToken against VITE_PLATFORM_API_URL.

import { useState, useEffect, useRef, useCallback } from 'react';
import type { GatewayMessage } from '../types/gateway';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CommentItem {
  postId: string;
  commentId: string;
  authorId: string;
  content: string;
  parentCommentId?: string;
  createdAt: string;
  _fadeIn?: boolean;
}

export type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;

export interface UseCommentsOptions {
  idToken: string | null;
  roomId: string | null;
  postId: string | null;
  onMessage: OnMessageFn;
}

export interface UseCommentsReturn {
  comments: CommentItem[];
  createComment: (content: string, parentCommentId?: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  /** True only while the thread itself is being fetched. */
  loading: boolean;
  /**
   * True while `createComment` is posting. Separate from `loading` because
   * `CommentThread` swaps the whole list out for "Loading comments…" when
   * `loading` is true — so sharing one flag made every existing comment
   * disappear for the duration of posting a reply.
   */
  submitting: boolean;
  error: string | null;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useComments({ idToken, roomId, postId, onMessage }: UseCommentsOptions): UseCommentsReturn {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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

  // ---- On mount: fetch comments --------------------------------------------

  useEffect(() => {
    // Drop the previous post's thread before fetching the new one. Without
    // this, changing `postId` on a mounted <CommentThread> left post A's
    // comments rendered under post B until B's response arrived.
    setComments([]);
    setError(null);

    if (!idToken || !roomId || !postId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // Per-run cancellation flag — see the matching note in usePosts. Without
    // it a slow response for post A overwrites post B's thread whenever A
    // resolves last.
    let cancelled = false;

    fetch(`${baseUrl}/api/rooms/${roomId}/posts/${postId}/comments`, {
      headers: { Authorization: `Bearer ${idToken}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load comments (${res.status})`);
        return res.json() as Promise<{ comments: CommentItem[] }>;
      })
      .then((data) => {
        if (cancelled) return;
        setComments(data.comments ?? []);
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
  }, [idToken, roomId, postId, baseUrl]);

  // ---- WS handler: social:comment -----------------------------------------

  useEffect(() => {
    // One fade-off timer per inbound comment, created inside the message
    // handler. Unregistering stops new ones, but any already scheduled would
    // outlive the unmount, so they're tracked and cleared alongside it.
    const fadeTimers = new Set<ReturnType<typeof setTimeout>>();

    const unregister = onMessageRef.current((msg: GatewayMessage) => {
      if (msg.type === 'social:comment') {
        const payload = ((msg as Record<string, unknown>).payload ?? msg) as Record<string, unknown>;
        if (payload.postId !== postIdRef.current) return;
        const incoming = { ...(payload as unknown as CommentItem), _fadeIn: true };
        setComments((prev) => {
          // Same echo as `usePosts`: `createComment` appends the POST response,
          // then the gateway broadcasts the identical row back, so the author
          // saw their own comment twice under a duplicate-key warning.
          if (
            incoming.commentId &&
            prev.some((c) => c.commentId === incoming.commentId)
          ) {
            return prev;
          }
          return [...prev, incoming];
        });
        const handle = setTimeout(() => {
          fadeTimers.delete(handle);
          setComments((prev) =>
            prev.map((c) =>
              c.commentId === incoming.commentId ? { ...c, _fadeIn: false } : c
            )
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

  // ---- createComment -------------------------------------------------------

  const createComment = useCallback(async (
    content: string,
    parentCommentId?: string,
  ): Promise<void> => {
    if (!idToken || !roomId || !postId) return;
    setSubmitting(true);
    setError(null);
    try {
      const body: { content: string; parentCommentId?: string } = { content };
      if (parentCommentId) body.parentCommentId = parentCommentId;
      const res = await fetch(`${baseUrl}/api/rooms/${roomId}/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Failed to create comment (${res.status})`);
      const comment = await res.json() as CommentItem;
      setComments((prev) =>
        prev.some((c) => c.commentId === comment.commentId)
          ? prev.map((c) => (c.commentId === comment.commentId ? comment : c))
          : [...prev, comment],
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }, [idToken, roomId, postId, baseUrl]);

  // ---- deleteComment -------------------------------------------------------

  const deleteComment = useCallback(async (commentId: string): Promise<void> => {
    if (!idToken || !roomId || !postId) return;
    setError(null);
    try {
      const res = await fetch(
        `${baseUrl}/api/rooms/${roomId}/posts/${postId}/comments/${commentId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );
      if (!res.ok) throw new Error(`Failed to delete comment (${res.status})`);
      setComments((prev) => prev.filter((c) => c.commentId !== commentId));
    } catch (err) {
      setError((err as Error).message);
    }
  }, [idToken, roomId, postId, baseUrl]);

  return { comments, createComment, deleteComment, loading, submitting, error };
}
