import type { GatewayMessage } from '../types/gateway';
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
    /** True during the initial fetch and `loadMore`. NOT set by mutations. */
    loading: boolean;
    /**
     * True while `createPost` / `editPost` / `deletePost` is in flight.
     *
     * Kept separate from `loading` on purpose — a mutation must not drop the
     * feed back into its "Loading…" skeleton. But the flag was computed into an
     * unread `_mutating` and never returned, so the composer's only busy signal
     * was `loading`, which goes false once the first page resolves and never
     * moves again. The submit button stayed enabled and labelled "Post" for the
     * whole request, and a second click created the post twice.
     */
    mutating: boolean;
    error: string | null;
    /**
     * Failure of the feed LOAD specifically (initial fetch + `loadMore`). Kept
     * separate from `error`, which is also set by `createPost`/`editPost`/
     * `deletePost`.
     *
     * Callers use it to tell "this room has no posts" from "we never managed to
     * read this room". Keying that off `error` made a rejected *send* in an
     * empty room replace the "No posts yet" empty state with "Couldn't load
     * posts" — blaming the read for a write that failed, next to a composer that
     * was already reporting the real reason.
     */
    loadError: string | null;
    hasMore: boolean;
    loadMore: () => Promise<void>;
}
export declare function usePosts({ idToken, roomId, onMessage }: UsePostsOptions): UsePostsReturn;
//# sourceMappingURL=usePosts.d.ts.map