// MockGatewayContext.tsx — minimal mock that satisfies GatewayContext so
// hook demos run without a real WebSocket.

import { createContext, useCallback, useRef, useMemo, useEffect, type ReactNode } from 'react';
import { GatewayContext } from '@connorhoehn/realtime-modules/client';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DispatchFrame = (frame: Record<string, unknown>) => void;

interface MockGatewayContextValue {
  connectionState: string;
  lastError: null;
  sessionToken: string | null;
  clientId: string | null;
  currentChannel: string;
  switchChannel: (ch: string) => void;
  send: (msg: Record<string, unknown>) => void;
  sendMessage: (msg: Record<string, unknown>) => void;
  disconnect: () => void;
  reconnect: () => void;
  onMessage: (handler: (msg: Record<string, unknown>) => void) => () => void;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface MockGatewayProviderProps {
  children: ReactNode;
  channel?: string;
  onSend?: (msg: Record<string, unknown>) => void;
  dispatchRef: React.MutableRefObject<DispatchFrame | null>;
}

export function MockGatewayProvider({
  children,
  channel = 'demo',
  onSend,
  dispatchRef,
}: MockGatewayProviderProps) {
  const subsRef = useRef<Set<(m: Record<string, unknown>) => void>>(new Set());

  const dispatch: DispatchFrame = useCallback((frame) => {
    subsRef.current.forEach((h) => {
      try { h(frame); } catch { /* swallow demo errors */ }
    });
  }, []);

  useEffect(() => {
    dispatchRef.current = dispatch;
  }, [dispatch, dispatchRef]);

  const onMessage = useCallback(
    (handler: (msg: Record<string, unknown>) => void): (() => void) => {
      subsRef.current.add(handler);
      return () => subsRef.current.delete(handler);
    },
    [],
  );

  const value = useMemo<MockGatewayContextValue>(
    () => ({
      connectionState: 'connected',
      lastError: null,
      sessionToken: 'demo-token',
      clientId: 'demo-client-001',
      currentChannel: channel,
      switchChannel: () => {},
      send: (msg) => onSend?.(msg),
      sendMessage: (msg) => onSend?.(msg),
      disconnect: () => {},
      reconnect: () => {},
      onMessage,
    }),
    [channel, onSend, onMessage],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <GatewayContext.Provider value={value as any}>{children}</GatewayContext.Provider>;
}
