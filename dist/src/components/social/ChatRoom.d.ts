import { GatewayMessage } from '../../types/gateway';
type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;
interface ChatRoomProps {
    idToken: string | null;
    roomId: string;
    roomName: string;
    onMessage: OnMessageFn;
}
export declare function ChatRoom({ idToken, roomId, roomName, onMessage }: ChatRoomProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=ChatRoom.d.ts.map