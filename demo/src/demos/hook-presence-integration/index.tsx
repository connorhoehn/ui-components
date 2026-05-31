// demo/src/demos/hook-presence-integration/index.tsx
//
// PresencePanel wired to usePresence() from @connorhoehn/realtime-modules.
// Mock mode: synthetic join/leave events injected on a timer.
// Live mode: set VITE_GATEWAY_URL.

import { useEffect, useRef, useCallback, useMemo, type ReactNode } from 'react';
import { WrappedPresencePanel } from '@/integrations/realtime-modules/WrappedPresencePanel';
import {
  GatewaySocketProvider,
  usePresence,
  GatewayContext,
} from '@connorhoehn/realtime-modules/client';

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL as string | undefined;
const IS_MOCK = !GATEWAY_URL;

// ---------------------------------------------------------------------------
// Mock provider — same pattern as chat integration
// ---------------------------------------------------------------------------

type DispatchFrame = (frame: Record<string, unknown>) => void;

interface MockContextValue {
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

function MockGatewayProvider({
  children,
  channel,
  dispatchRef,
}: {
  children: ReactNode;
  channel: string;
  dispatchRef: React.MutableRefObject<DispatchFrame | null>;
}) {
  const subscribersRef = useRef<Set<(m: Record<string, unknown>) => void>>(new Set());

  const dispatch: DispatchFrame = useCallback((frame) => {
    subscribersRef.current.forEach((h) => {
      try { h(frame); } catch { /* swallow */ }
    });
  }, []);

  useEffect(() => {
    dispatchRef.current = dispatch;
  }, [dispatch, dispatchRef]);

  const onMessage = useCallback(
    (handler: (msg: Record<string, unknown>) => void) => {
      subscribersRef.current.add(handler);
      return () => subscribersRef.current.delete(handler);
    },
    [],
  );

  const value = useMemo<MockContextValue>(
    () => ({
      connectionState: 'connected',
      lastError: null,
      sessionToken: 'demo-token',
      clientId: 'demo-client-001',
      currentChannel: channel,
      switchChannel: () => {},
      send: () => {},
      sendMessage: () => {},
      disconnect: () => {},
      reconnect: () => {},
      onMessage,
    }),
    [channel, onMessage],
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <GatewayContext.Provider value={value as any}>
      {children}
    </GatewayContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_ROSTER: Array<{ clientId: string; displayName: string; email: string }> = [
  { clientId: 'alice-001', displayName: 'Alice', email: 'alice@example.com' },
  { clientId: 'bob-002', displayName: 'Bob', email: 'bob@example.com' },
  { clientId: 'carol-003', displayName: 'Carol', email: 'carol@example.com' },
];

function makePresenceFrame(
  type: string,
  channel: string,
  p: { clientId: string; displayName: string; email: string },
) {
  return {
    type,
    channel,
    client: {
      clientId: p.clientId,
      status: 'online',
      metadata: { displayName: p.displayName, email: p.email },
      channels: [channel],
      nodeId: 'node-1',
      timestamp: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
      lastHeartbeat: Date.now(),
    },
  };
}

// ---------------------------------------------------------------------------
// Inner view using usePresence
// ---------------------------------------------------------------------------

function PresenceViewInner({ channel }: { channel: string }) {
  const presence = usePresence(channel);
  return <WrappedPresencePanel presence={presence} currentClientId="demo-client-001" />;
}

// ---------------------------------------------------------------------------
// Mock view
// ---------------------------------------------------------------------------

function MockPresenceView({ channel }: { channel: string }) {
  const dispatchRef = useRef<DispatchFrame | null>(null);

  useEffect(() => {
    // Inject roster joined events with stagger
    const timers: ReturnType<typeof setTimeout>[] = [];
    MOCK_ROSTER.forEach((p, i) => {
      const t = setTimeout(() => {
        dispatchRef.current?.(makePresenceFrame('presence:joined', channel, p));
      }, i * 1200 + 400);
      timers.push(t);
    });

    // Simulate bob going away after 5s, then returning
    const awayTimer = setTimeout(() => {
      dispatchRef.current?.({
        type: 'presence:updated',
        channel,
        client: {
          clientId: 'bob-002',
          status: 'away',
          metadata: { displayName: 'Bob', email: 'bob@example.com' },
          channels: [channel],
          nodeId: 'node-1',
          timestamp: new Date().toISOString(),
          lastSeen: new Date().toISOString(),
          lastHeartbeat: Date.now(),
        },
      });
    }, 6000);

    const returnTimer = setTimeout(() => {
      dispatchRef.current?.(makePresenceFrame('presence:joined', channel, MOCK_ROSTER[1]));
    }, 9000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(awayTimer);
      clearTimeout(returnTimer);
    };
  }, [channel]);

  return (
    <MockGatewayProvider channel={channel} dispatchRef={dispatchRef}>
      <PresenceViewInner channel={channel} />
    </MockGatewayProvider>
  );
}

// ---------------------------------------------------------------------------
// Live view
// ---------------------------------------------------------------------------

function LivePresenceView({ url, channel }: { url: string; channel: string }) {
  return (
    <GatewaySocketProvider url={url} channel={channel} features={['presence']}>
      <PresenceViewInner channel={channel} />
    </GatewaySocketProvider>
  );
}

// ---------------------------------------------------------------------------
// Top-level demo
// ---------------------------------------------------------------------------

export default function HookPresenceIntegrationDemo() {
  return (
    <div style={{ padding: 32, maxWidth: 480, margin: '0 auto' }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: '#0f172a' }}>
        PresencePanel + usePresence
      </h2>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 8, lineHeight: 1.6 }}>
        <code style={{ background: '#f1f5f9', borderRadius: 4, padding: '1px 6px', fontFamily: 'ui-monospace, monospace' }}>
          {'<PresencePanel>'}
        </code>{' '}
        wired to{' '}
        <code style={{ background: '#f1f5f9', borderRadius: 4, padding: '1px 6px', fontFamily: 'ui-monospace, monospace' }}>
          usePresence('demo:presence')
        </code>.
        Users join with a stagger; Bob goes away at 6 s and returns at 9 s.
      </p>
      <div
        style={{
          display: 'inline-block',
          padding: '4px 10px',
          borderRadius: 12,
          background: IS_MOCK ? '#fef9c3' : '#dcfce7',
          color: IS_MOCK ? '#854d0e' : '#14532d',
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 24,
        }}
      >
        {IS_MOCK ? 'MOCK MODE' : `LIVE — ${GATEWAY_URL}`}
      </div>

      {IS_MOCK ? (
        <MockPresenceView channel="demo:presence" />
      ) : (
        <LivePresenceView url={GATEWAY_URL!} channel="demo:presence" />
      )}
    </div>
  );
}
