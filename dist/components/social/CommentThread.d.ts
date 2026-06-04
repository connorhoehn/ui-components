import type { GatewayMessage } from '../../types/gateway';
type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;
interface CommentThreadProps {
    idToken: string | null;
    roomId: string | null;
    postId: string | null;
    onMessage: OnMessageFn;
}
export declare function CommentThread({ idToken, roomId, postId, onMessage }: CommentThreadProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CommentThread.d.ts.map