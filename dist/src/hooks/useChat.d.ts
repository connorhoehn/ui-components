import { ConnectionState, GatewayMessage } from '../types/gateway';
export interface ChatMessage {
    id?: string;
    clientId: string;
    content: string;
    timestamp: string;
    displayName?: string;
    avatarUrl?: string;
}
export interface UseChatOptions {
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
    currentChannel: string;
    connectionState: ConnectionState;
    displayName: string;
}
export interface UseChatReturn {
    messages: ChatMessage[];
    send: (content: string) => void;
}
export declare function useChat(options: UseChatOptions): UseChatReturn;
//# sourceMappingURL=useChat.d.ts.map