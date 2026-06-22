import { GatewayMessage } from '../types/gateway';
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
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    loadMore: () => Promise<void>;
}
export declare function usePosts({ idToken, roomId, onMessage }: UsePostsOptions): UsePostsReturn;
//# sourceMappingURL=usePosts.d.ts.map