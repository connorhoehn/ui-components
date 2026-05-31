// src/integrations/realtime-modules/WrappedConnectionPill.tsx
//
// ConnectionPill wired directly to a useWebSocket() / useGateway() hook return
// from realtime-modules. Caller passes any object with a `connectionState`
// field — structural typing means UseWebSocketHookReturn, GatewayContextValue,
// or a hand-rolled value all satisfy it.

import { ConnectionPill } from '../../components/shared/ConnectionPill';
import type { ConnectionPillProps } from '../../components/shared/ConnectionPill';
import type { ConnectionState } from '../../types/gateway';

/**
 * Structural mirror of @connorhoehn/realtime-modules's `ConnectionState`.
 * Kept here (not imported) so the integration subpath compiles without a
 * runtime dep on realtime-modules.
 */
export type RMConnectionState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'disconnected';

/** Minimum shape needed from useWebSocket() / useGateway(). */
export interface RMConnectionStateSource {
  connectionState: RMConnectionState;
}

export interface WrappedConnectionPillProps
  extends Omit<ConnectionPillProps, 'state'> {
  /**
   * Hook return that exposes `connectionState`. Typically
   * `useWebSocket(...)` or `useGateway()` from realtime-modules.
   */
  socket: RMConnectionStateSource;
}

export function WrappedConnectionPill({
  socket,
  ...rest
}: WrappedConnectionPillProps) {
  // The two enums are structurally identical; the cast is a no-op at runtime
  // and lets the integration subpath stay decoupled from gateway types.
  return <ConnectionPill state={socket.connectionState as ConnectionState} {...rest} />;
}
