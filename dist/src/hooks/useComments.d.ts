import { GatewayMessage } from '../types/gateway';
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
    loading: boolean;
    error: string | null;
}
export declare function useComments({ idToken, roomId, postId, onMessage }: UseCommentsOptions): UseCommentsReturn;
//# sourceMappingURL=useComments.d.ts.map