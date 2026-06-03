import type { ConnectionState, GatewayMessage } from '../types/gateway';
export interface ActivityEvent {
    id: string;
    eventType: string;
    detail: Record<string, unknown>;
    timestamp: string;
    userId?: string;
    displayName?: string;
    color?: string;
    source: 'local' | 'remote';
}
export interface UseActivityBusOptions {
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
    connectionState: ConnectionState;
    userId: string;
    displayName: string;
    color?: string;
    maxItems?: number;
}
export interface UseActivityBusReturn {
    events: ActivityEvent[];
    publish: (eventType: string, detail: Record<string, unknown>) => void;
    isLive: boolean;
}
export declare function useActivityBus(options: UseActivityBusOptions): UseActivityBusReturn;
//# sourceMappingURL=useActivityBus.d.ts.map