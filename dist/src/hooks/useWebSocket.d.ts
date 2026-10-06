import type { ConnectionState, GatewayConfig, GatewayError, GatewayMessage } from '../types/gateway';
export interface UseWebSocketOptions {
    config: GatewayConfig;
    onMessage?: (msg: GatewayMessage) => void;
}
export interface UseWebSocketReturn {
    connectionState: ConnectionState;
    lastError: GatewayError | null;
    sessionToken: string | null;
    clientId: string | null;
    currentChannel: string;
    switchChannel: (channel: string) => void;
    sendMessage: (msg: Record<string, unknown>) => void;
    disconnect: () => void;
    reconnect: () => void;
}
export declare function useWebSocket(options: UseWebSocketOptions): UseWebSocketReturn;
//# sourceMappingURL=useWebSocket.d.ts.map