import type { ConnectionPillProps } from '../../components/shared/ConnectionPill';
/**
 * Structural mirror of @connorhoehn/realtime-modules's `ConnectionState`.
 * Kept here (not imported) so the integration subpath compiles without a
 * runtime dep on realtime-modules.
 */
export type RMConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';
/** Minimum shape needed from useWebSocket() / useGateway(). */
export interface RMConnectionStateSource {
    connectionState: RMConnectionState;
}
export interface WrappedConnectionPillProps extends Omit<ConnectionPillProps, 'state'> {
    /**
     * Hook return that exposes `connectionState`. Typically
     * `useWebSocket(...)` or `useGateway()` from realtime-modules.
     */
    socket: RMConnectionStateSource;
}
export declare function WrappedConnectionPill({ socket, ...rest }: WrappedConnectionPillProps): import("react").JSX.Element;
//# sourceMappingURL=WrappedConnectionPill.d.ts.map