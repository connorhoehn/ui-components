import type { GatewayMessage } from '../types/gateway';
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
export declare function useComments({ idToken, roomId, postId, onMessage }: UseCommentsOptions): UseCommentsReturn;
//# sourceMappingURL=useComments.d.ts.map