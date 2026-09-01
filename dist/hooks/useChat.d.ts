import type { ConnectionState, GatewayMessage } from '../types/gateway';
import type { ChatAttachment } from '../components/social/ChatAttachment';
export type { ChatAttachment };
export interface ChatMessage {
    id?: string;
    clientId: string;
    content: string;
    timestamp: string;
    displayName?: string;
    avatarUrl?: string;
    /**
     * Files shared alongside (or instead of) the text.
     *
     * An attachment rides ON a message rather than being its own message kind
     * so that ordering is free: the file lands exactly where the sender put it
     * in the conversation, interleaved correctly with the text around it. A
     * separate "file event" stream would have to be merged back against the
     * message stream at render time, and the merge would be wrong at exactly
     * the moment it matters — when someone is typing while a file uploads.
     *
     * `content` may be empty when a message is nothing but attachments.
     */
    attachments?: ChatAttachment[];
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