import { ConnectionState, GatewayMessage } from '../types/gateway';
export interface EphemeralReaction {
    id: string;
    emoji: string;
    x: number;
    y: number;
    timestamp: string;
}
export interface UseReactionsOptions {
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
    currentChannel: string;
    connectionState: ConnectionState;
}
export interface UseReactionsReturn {
    activeReactions: EphemeralReaction[];
    react: (emoji: string) => void;
}
export declare function useReactions(options: UseReactionsOptions): UseReactionsReturn;
//# sourceMappingURL=useReactions.d.ts.map