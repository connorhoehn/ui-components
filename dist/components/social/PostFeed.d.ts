import type { GatewayMessage } from '../../types/gateway';
type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;
interface PostFeedProps {
    idToken: string | null;
    /**
     * Room whose posts are shown. Changing this resets the feed: the previous
     * room's posts and paging cursor are dropped and its in-flight request is
     * ignored, so a caller does NOT need `key={roomId}` to avoid a wrong-room
     * render. (It used to: the slower of two overlapping requests won, so
     * switching rooms could repaint the new room with the old room's posts.)
     */
    roomId: string | null;
    onMessage: OnMessageFn;
}
export declare function PostFeed({ idToken, roomId, onMessage }: PostFeedProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=PostFeed.d.ts.map