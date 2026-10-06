import type { GatewayMessage } from '../../types/gateway';
type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;
interface CommentThreadProps {
    idToken: string | null;
    roomId: string | null;
    postId: string | null;
    onMessage: OnMessageFn;
}
/**
 * Inline comment thread for a single post.
 *
 * Safe to keep mounted across `postId` / `roomId` changes: the underlying
 * `useComments` clears the thread and cancels the in-flight request when
 * either id changes, so a caller does not need a `key` to avoid seeing the
 * previous post's comments.
 */
export declare function CommentThread({ idToken, roomId, postId, onMessage }: CommentThreadProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=CommentThread.d.ts.map