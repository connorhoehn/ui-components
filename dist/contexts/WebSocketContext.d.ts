import type { ReactNode } from 'react';
import type { ConnectionState, GatewayMessage } from '../types/gateway';
import type { UseWebSocketReturn } from '../hooks/useWebSocket';
type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;
export interface WebSocketContextValue {
    connectionState: ConnectionState;
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: OnMessageFn;
    ws: UseWebSocketReturn;
    clientId: string | null;
    sessionToken: string | null;
}
export declare function WebSocketProvider({ value, children, }: {
    value: WebSocketContextValue;
    children: ReactNode;
}): import("react").JSX.Element;
export declare function useWebSocketContext(): WebSocketContextValue;
export {};
//# sourceMappingURL=WebSocketContext.d.ts.map