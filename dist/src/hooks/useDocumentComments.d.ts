import type { GatewayMessage } from '../types/gateway';
import type { CommentThread, DocumentCommentAnchor } from '../types/document';
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
    addComment: (sectionId: string, text: string, parentCommentId?: string | null, options?: AddDocumentCommentOptions) => Promise<void>;
    /** Sugar for `addComment('', text)`: an unanchored, document-wide comment. */
    addDocumentComment: (text: string) => Promise<void>;
    resolveThread: (sectionId: string, commentId: string) => Promise<void>;
    unresolveThread: (sectionId: string, commentId: string) => Promise<void>;
    loading: boolean;
}
export declare function useDocumentComments(options: UseDocumentCommentsOptions): UseDocumentCommentsReturn;
//# sourceMappingURL=useDocumentComments.d.ts.map