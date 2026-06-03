import type { GatewayMessage } from '../types/gateway';
import type { PublicProfile } from './useFriends';
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
export declare function useLikes({ idToken, roomId, postId, commentId, onMessage }: UseLikesOptions): UseLikesReturn;
//# sourceMappingURL=useLikes.d.ts.map