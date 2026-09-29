// frontend/src/hooks/useDocumentComments.ts
//
// REST + WebSocket hook for document comments. Fetches initial state from
// social-api and applies real-time updates via the document-events WS service.
// Completely independent of Y.js.
//
// Transport seam: by default the hook calls `${SOCIAL_API_URL}/api/documents/:id/comments`
// with the user's `idToken` as a bearer. A host that fronts the document API with
// its own BFF (cookie session, server-held document grant) passes `fetcher` (and
// usually `commentsPath` / `baseUrl`); the hook then adds no Authorization header
// and does not require an `idToken`.

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { GatewayMessage } from '../types/gateway';
import type { CommentData, CommentThread, DocumentCommentAnchor } from '../types/document';
import { SOCIAL_API_URL } from '../utils/socialApi';

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

/** Performs one comments request. Must resolve to a fetch `Response`. */
export type DocumentCommentsFetcher = (input: string, init: RequestInit) => Promise<Response>;

/**
 * Builds the comments URL for a document. Called with no `commentId` for the
 * collection (GET list / POST create) and with a `commentId` for one comment
 * (PATCH resolve/unresolve), so a host whose route carries a query string can
 * put the sub-resource before it.
 */
export type DocumentCommentsPath = (documentId: string, commentId?: string) => string;

export interface UseDocumentCommentsOptions {
  documentId: string;
  /**
   * User bearer for the default transport. Without a `fetcher` the hook does
   * nothing while this is null; with a `fetcher` it is ignored for requests.
   */
  idToken: string | null;
  sendMessage: (msg: Record<string, unknown>) => void;
  onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
  connectionState: string;
  /**
   * Overrides the build-time `VITE_SOCIAL_API_URL` base. Prefixed to
   * `/api/documents/:id/comments`, or to `commentsPath(...)` when that is given.
   */
  baseUrl?: string;
  /**
   * Replaces the `/api/documents/:id/comments[/:commentId]` path. The result is
   * used as-is (prefixed only by an explicit `baseUrl`, never by the build-time base).
   */
  commentsPath?: DocumentCommentsPath;
  /**
   * Replaces global `fetch`. When supplied the host owns credentials: the hook
   * sends no Authorization header (only `Content-Type` on writes) and does not
   * need an `idToken`. Set `credentials: 'include'` etc. inside the fetcher.
   */
  fetcher?: DocumentCommentsFetcher;
}

export interface AddDocumentCommentOptions {
  /** Canvas anchor for the new root comment. */
  anchor?: DocumentCommentAnchor;
}

export interface UseDocumentCommentsReturn {
  /**
   * sectionId -> threads. Document-wide (`scope: 'document'`) threads are keyed
   * `'__document'`; replies with no sectionId inherit their parent's key.
   */
  comments: Record<string, CommentThread[]>;
  /** The document-wide threads (same array as `comments['__document']`, or empty). */
  documentComments: CommentThread[];
  /**
   * Create a comment or reply. Sends `sectionId` when it is a real section id.
   * Pass `''` (or `'__document'`) as `sectionId` to omit it: with neither a
   * parent nor an anchor that creates a document-wide comment (`scope:'document'`);
   * with a parent it is a reply positioned by its thread.
   */
  addComment: (
    sectionId: string,
    text: string,
    parentCommentId?: string | null,
    options?: AddDocumentCommentOptions,
  ) => Promise<void>;
  /** Sugar for `addComment('', text)`: an unanchored, document-wide comment. */
  addDocumentComment: (text: string) => Promise<void>;
  resolveThread: (sectionId: string, commentId: string) => Promise<void>;
  unresolveThread: (sectionId: string, commentId: string) => Promise<void>;
  loading: boolean;
}

/** Key in `comments` for document-wide threads. */
const DOCUMENT_SCOPE_KEY = '__document';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a nested CommentThread tree from a flat comment array. */
function buildCommentTree(flat: CommentData[]): CommentThread[] {
  const map = new Map<string, CommentThread>();
  const roots: CommentThread[] = [];

  // Create thread nodes
  for (const c of flat) {
    map.set(c.id, { ...c, replies: [] });
  }

  // Link children to parents
  for (const c of flat) {
    const node = map.get(c.id)!;
    if (c.parentCommentId && map.has(c.parentCommentId)) {
      map.get(c.parentCommentId)!.replies.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

/** Normalize API comment (which uses `commentId`) to frontend CommentData (which uses `id`). */
function normalizeComment(raw: Record<string, unknown>): CommentData & { sectionId?: string } {
  return {
    ...(raw as unknown as CommentData & { sectionId?: string }),
    id: (raw.id as string) ?? (raw.commentId as string) ?? '',
  };
}

/** Group flat comments by sectionId and build trees for each section. */
function groupBySectionAndBuildTrees(
  flatComments: CommentData[],
): Record<string, CommentThread[]> {
  const byId = new Map<string, CommentData>();
  for (const c of flatComments) byId.set(c.id, c);

  // A reply may carry no sectionId (it is positioned by its thread), so walk up
  // to the first ancestor that says where it lives. Bounded against cycles.
  const keyFor = (c: CommentData): string => {
    let cur: CommentData | undefined = c;
    for (let depth = 0; cur && depth < 64; depth++) {
      if (cur.sectionId) return cur.sectionId;
      if (cur.scope === 'document') return DOCUMENT_SCOPE_KEY;
      cur = cur.parentCommentId ? byId.get(cur.parentCommentId) : undefined;
    }
    return '__unknown';
  };

  const bySection = new Map<string, CommentData[]>();
  for (const c of flatComments) {
    const sid = keyFor(c);
    if (!bySection.has(sid)) bySection.set(sid, []);
    bySection.get(sid)!.push(c);
  }

  const result: Record<string, CommentThread[]> = {};
  for (const [sectionId, comments] of bySection) {
    result[sectionId] = buildCommentTree(comments);
  }
  return result;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useDocumentComments(
  options: UseDocumentCommentsOptions,
): UseDocumentCommentsReturn {
  const { documentId, idToken, sendMessage, onMessage, baseUrl, commentsPath, fetcher } = options;

  // ---- State ---------------------------------------------------------------
  // Store flat comments internally; derive trees via useMemo
  const [flatComments, setFlatComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(false);

  // ---- Stable refs ----------------------------------------------------------
  const sendMessageRef = useRef(sendMessage);
  useEffect(() => { sendMessageRef.current = sendMessage; }, [sendMessage]);

  const documentIdRef = useRef(documentId);
  useEffect(() => { documentIdRef.current = documentId; }, [documentId]);

  // Transport functions are commonly passed inline; hold them in refs so a new
  // identity each render does not refetch. The list URL (a string) is the dep.
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;
  const commentsPathRef = useRef(commentsPath);
  commentsPathRef.current = commentsPath;
  const baseUrlRef = useRef(baseUrl);
  baseUrlRef.current = baseUrl;
  const hasFetcher = fetcher !== undefined;

  /** Resolve the URL for the collection (no commentId) or one comment. */
  const urlFor = useCallback((docId: string, commentId?: string): string => {
    const path = commentsPathRef.current;
    if (path) return `${baseUrlRef.current ?? ''}${path(docId, commentId)}`;
    const base = baseUrlRef.current ?? SOCIAL_API_URL;
    return commentId === undefined
      ? `${base}/api/documents/${docId}/comments`
      : `${base}/api/documents/${docId}/comments/${commentId}`;
  }, []);

  /** Route through the host fetcher when given, else global fetch. */
  const send = useCallback(
    (url: string, init: RequestInit): Promise<Response> =>
      fetcherRef.current ? fetcherRef.current(url, init) : fetch(url, init),
    [],
  );

  // A request can go out when the host owns the transport or we hold a token.
  const canSend = hasFetcher || !!idToken;

  const authHeaders = useMemo((): Record<string, string> => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (idToken && !hasFetcher) headers.Authorization = `Bearer ${idToken}`;
    return headers;
  }, [idToken, hasFetcher]);

  const listUrl = documentId ? urlFor(documentId) : '';

  // ---- Fetch initial comments on mount / documentId change -----------------
  useEffect(() => {
    if (!documentId || !canSend) return;

    setLoading(true);
    send(
      listUrl,
      hasFetcher ? { method: 'GET' } : { headers: { Authorization: `Bearer ${idToken}` } },
    )
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load comments (${res.status})`);
        return res.json() as Promise<{ comments: CommentData[] }>;
      })
      .then((data) => {
        setFlatComments((data.comments ?? []).map((c) => normalizeComment(c as unknown as Record<string, unknown>)));
      })
      .catch((err: Error) => {
        console.warn('[useDocumentComments] fetch error:', err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [documentId, idToken, canSend, hasFetcher, listUrl, send]);

  // NOTE: document-events subscription is managed centrally by DocumentEditorPage,
  // not by individual hooks. This avoids one hook's cleanup unsubscribing all hooks.

  // ---- WebSocket message handler -------------------------------------------
  useEffect(() => {
    const unregister = onMessage((msg: GatewayMessage) => {
      // Comment events arrive as channel messages with type set to the event type
      // and payload containing the data.
      const eventType = msg.type;
      const payload = msg.payload as Record<string, unknown> | undefined;
      if (!payload) return;

      // Only handle events for our document
      const msgDocId = payload.documentId as string | undefined;
      if (msgDocId && msgDocId !== documentIdRef.current) return;

      if (eventType === 'doc:comment_added') {
        const raw = payload.comment as Record<string, unknown> | undefined;
        if (!raw) return;
        const comment = normalizeComment(raw);
        setFlatComments((prev) => {
          if (prev.some((c) => c.id === comment.id)) return prev;
          return [...prev, comment];
        });
        return;
      }

      if (eventType === 'doc:comment_resolved') {
        const commentId = payload.commentId as string | undefined;
        const resolved = payload.resolved as boolean;
        if (!commentId) return;
        setFlatComments((prev) =>
          prev.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  resolved,
                  ...(resolved
                    ? {
                        resolvedBy: payload.resolvedBy as string,
                        resolvedAt: payload.resolvedAt as string,
                      }
                    : { resolvedBy: undefined, resolvedAt: undefined }),
                }
              : c,
          ),
        );
        return;
      }

      if (eventType === 'doc:comment_deleted') {
        const commentId = payload.commentId as string | undefined;
        if (!commentId) return;
        setFlatComments((prev) => prev.filter((c) => c.id !== commentId));
        return;
      }
    });

    return unregister;
  }, [onMessage]);

  // ---- Derived: grouped + threaded comments --------------------------------
  const comments = useMemo(
    () => groupBySectionAndBuildTrees(flatComments),
    [flatComments],
  );
  const documentComments = useMemo(
    () => comments[DOCUMENT_SCOPE_KEY] ?? [],
    [comments],
  );

  // ---- addComment -----------------------------------------------------------
  const addComment = useCallback(
    async (
      sectionId: string,
      text: string,
      parentCommentId?: string | null,
      addOptions?: AddDocumentCommentOptions,
    ): Promise<void> => {
      if (!canSend) return;

      const anchor = addOptions?.anchor;
      const hasSection = sectionId !== '' && sectionId !== DOCUMENT_SCOPE_KEY;
      // Key order kept as { sectionId, text, parentCommentId } so existing
      // section comments send the exact same body as before.
      const body: Record<string, unknown> = hasSection ? { sectionId, text } : { text };
      if (parentCommentId) body.parentCommentId = parentCommentId;
      if (anchor) body.anchor = anchor;
      if (!hasSection && !parentCommentId && !anchor) body.scope = 'document';

      const res = await send(urlFor(documentIdRef.current), {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`Failed to add comment (${res.status})`);
      }

      // The broadcast will update other clients; optimistically add to local state
      const data = (await res.json()) as { comment: Record<string, unknown> };
      const normalized = normalizeComment(data.comment);
      setFlatComments((prev) => {
        if (prev.some((c) => c.id === normalized.id)) return prev;
        return [...prev, normalized];
      });
    },
    [canSend, authHeaders, send, urlFor],
  );

  const addDocumentComment = useCallback(
    (text: string): Promise<void> => addComment('', text),
    [addComment],
  );

  // ---- resolveThread --------------------------------------------------------
  const resolveThread = useCallback(
    async (_sectionId: string, commentId: string): Promise<void> => {
      if (!canSend) return;

      const res = await send(urlFor(documentIdRef.current, commentId), {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ resolved: true }),
      });

      if (!res.ok) {
        throw new Error(`Failed to resolve thread (${res.status})`);
      }

      // Optimistic update
      const data = (await res.json()) as { comment: { resolvedBy?: string; resolvedAt?: string } };
      setFlatComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? {
                ...c,
                resolved: true,
                resolvedBy: data.comment.resolvedBy,
                resolvedAt: data.comment.resolvedAt,
              }
            : c,
        ),
      );
    },
    [canSend, authHeaders, send, urlFor],
  );

  // ---- unresolveThread ------------------------------------------------------
  const unresolveThread = useCallback(
    async (_sectionId: string, commentId: string): Promise<void> => {
      if (!canSend) return;

      const res = await send(urlFor(documentIdRef.current, commentId), {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ resolved: false }),
      });

      if (!res.ok) {
        throw new Error(`Failed to unresolve thread (${res.status})`);
      }

      // Optimistic update
      setFlatComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? { ...c, resolved: false, resolvedBy: undefined, resolvedAt: undefined }
            : c,
        ),
      );
    },
    [canSend, authHeaders, send, urlFor],
  );

  return { comments, documentComments, addComment, addDocumentComment, resolveThread, unresolveThread, loading };
}
