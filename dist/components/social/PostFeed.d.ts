import type { GatewayMessage } from '../../types/gateway';
type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;
interface PostFeedProps {
    idToken: string | null;
    roomId: string | null;
    onMessage: OnMessageFn;
}
export declare function PostFeed({ idToken, roomId, onMessage }: PostFeedProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PostFeed.d.ts.map