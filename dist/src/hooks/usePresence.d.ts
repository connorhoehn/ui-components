import type { ConnectionState, GatewayMessage } from '../types/gateway';
export interface PresenceUser {
    clientId: string;
    status: string;
    metadata: Record<string, unknown>;
}
export interface UsePresenceReturn {
    users: PresenceUser[];
    setTyping: (isTyping: boolean) => void;
}
export interface UsePresenceOptions {
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
    currentChannel: string;
    connectionState: ConnectionState;
    displayName: string;
}
export declare function usePresence(options: UsePresenceOptions): UsePresenceReturn;
//# sourceMappingURL=usePresence.d.ts.map