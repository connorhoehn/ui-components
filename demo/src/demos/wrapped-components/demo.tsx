// demo/src/demos/wrapped-components/demo.tsx
//
// Side-by-side comparison: raw hook wiring vs WrappedChatPanel + WrappedPresencePanel.
//
// "Raw" column: the user writes inline adaptMessage, passes correct fields by hand.
// "Wrapped" column: drop WrappedChatPanel in — no adapter code needed.
//
// MOCK MODE (no VITE_GATEWAY_URL): synthetic messages and presence injected on timers.
// LIVE MODE: set VITE_GATEWAY_URL to ws://localhost:4000.

import { useCallback, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { GatewayContext, useChat, usePresence } from '@connorhoehn/realtime-modules/client';
import { ChatPanel } from '@connorhoehnslalom/ui-components/social';
import type { ChatMessage as UIChatMessage } from '@connorhoehnslalom/ui-components/hooks';
import {
  WrappedChatPanel,
  WrappedPresencePanel,
} from '../../src/integrations/realtime-modules';

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL as string | undefined;
const CHANNEL = 'demo:wrapped';

// ---------------------------------------------------------------------------
// Mock gateway provider (reused from other demos)
// ---------------------------------------------------------------------------

type DispatchFrame = (frame: Record<string, unknown>) => void;

interface MockCtxValue {
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
  dispatchRef,
}: {
  children: ReactNode;
  dispatchRef: React.MutableRefObject<DispatchFrame | null>;
}) {
  const subsRef = useRef<Set<(m: Record<string, unknown>) => void>>(new Set());

  const dispatch = useCallback<DispatchFrame>((frame) => {
    subsRef.current.forEach((h) => {
      try { h(frame); } catch { /**/ }
    });
  }, []);

  useEffect(() => { dispatchRef.current = dispatch; }, [dispatch, dispatchRef]);

  const onMessage = useCallback(
    (handler: (msg: Record<string, unknown>) => void): (() => void) => {
      subsRef.current.add(handler);
      return () => subsRef.current.delete(handler);
    },
    [],
  );

  const value: MockCtxValue = {
    connectionState: 'connected',
    lastError: null,
    sessionToken: 'demo-token',
    clientId: 'demo-client-001',
    currentChannel: CHANNEL,
    switchChannel: () => {},
    send: () => {},
    sendMessage: () => {},
    disconnect: () => {},
    reconnect: () => {},
    onMessage,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <GatewayContext.Provider value={value as any}>{children}</GatewayContext.Provider>;
}

// ---------------------------------------------------------------------------
// Mock data pump
// ---------------------------------------------------------------------------

const MOCK_AUTHORS = [
  { clientId: 'client-alice', displayName: 'Alice', status: 'online' },
  { clientId: 'client-bob', displayName: 'Bob', status: 'away' },
];

const MOCK_MESSAGES = [
  { clientId: 'client-alice', message: 'Hey, anyone here?', displayName: 'Alice' },
  { clientId: 'client-bob', message: 'Yes! What\'s up?', displayName: 'Bob' },
  { clientId: 'client-alice', message: 'Just testing the wrapped components', displayName: 'Alice' },
];

function useMockPump(dispatchRef: React.MutableRefObject<DispatchFrame | null>) {
  useEffect(() => {
    let i = 0;
    // Seed presence immediately
    const presenceTimer = setTimeout(() => {
      dispatchRef.current?.({
        type: 'presence:state',
        channel: CHANNEL,
        clients: MOCK_AUTHORS.map((a) => ({
          clientId: a.clientId,
          status: a.status,
          metadata: { displayName: a.displayName },
          channels: [CHANNEL],
          nodeId: 'mock-node',
          timestamp: new Date().toISOString(),
          lastSeen: new Date().toISOString(),
          lastHeartbeat: Date.now(),
        })),
      });
    }, 200);

    // Drip messages every 1.5s
    const interval = setInterval(() => {
      const src = MOCK_MESSAGES[i % MOCK_MESSAGES.length];
      const ts = new Date().toISOString();
      dispatchRef.current?.({
        type: 'chat:message',
        channel: CHANNEL,
        id: `mock-msg-${i}`,
        clientId: src.clientId,
        message: src.message,
        metadata: { displayName: src.displayName },
        timestamp: ts,
      });
      i++;
    }, 1500);

    return () => {
      clearTimeout(presenceTimer);
      clearInterval(interval);
    };
  }, [dispatchRef]);
}

// ---------------------------------------------------------------------------
// Raw column — manual adaptMessage
// ---------------------------------------------------------------------------

function RawColumn() {
  const chatHook = useChat(CHANNEL);
  const presenceHook = usePresence(CHANNEL);

  // Manual adapter (this is what apps currently write)
  const messages: UIChatMessage[] = chatHook.messages.map((m) => ({
    id: m.id,
    clientId: m.clientId,
    content: m.message,          // <- the rename you'd forget
    timestamp: m.timestamp,
    displayName: m.metadata?.displayName as string | undefined,
  }));

  const typingUsers = presenceHook.roster
    .filter((u) => u.metadata?.isTyping === true)
    .map((u) => (u.metadata?.displayName as string | undefined) ?? u.clientId.slice(0, 8));

  return (
    <div>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
        Raw (manual adapter)
      </h3>
      <code style={{ fontSize: 11, color: '#94a3b8', display: 'block', marginBottom: 12 }}>
        content: m.message  // rename in every component
      </code>
      <ChatPanel
        messages={messages}
        onSend={chatHook.sendMessage}
        typingUsers={typingUsers}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Wrapped column — WrappedChatPanel + WrappedPresencePanel
// ---------------------------------------------------------------------------

function WrappedColumn() {
  const chatHook = useChat(CHANNEL);
  const presenceHook = usePresence(CHANNEL);

  return (
    <div>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
        Wrapped (adapter built-in)
      </h3>
      <code style={{ fontSize: 11, color: '#94a3b8', display: 'block', marginBottom: 12 }}>
        {'<WrappedChatPanel chat={chatHook} presence={presenceHook} />'}
      </code>
      <WrappedPresencePanel presence={presenceHook} currentClientId="demo-client-001" />
      <WrappedChatPanel chat={chatHook} presence={presenceHook} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Demo shell
// ---------------------------------------------------------------------------

export default function WrappedComponentsDemo() {
  const dispatchRef = useRef<DispatchFrame | null>(null);

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: '0 auto' }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: '#0f172a' }}>
        Wrapped Components vs Raw Hook Wiring
      </h2>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24, lineHeight: 1.6 }}>
        Both columns receive the same mock data. The "Raw" column shows the manual adapter
        every app currently writes. The "Wrapped" column uses{' '}
        <code style={{ background: '#f1f5f9', borderRadius: 4, padding: '1px 6px' }}>
          WrappedChatPanel
        </code>{' '}
        /{' '}
        <code style={{ background: '#f1f5f9', borderRadius: 4, padding: '1px 6px' }}>
          WrappedPresencePanel
        </code>{' '}
        from{' '}
        <code style={{ background: '#f1f5f9', borderRadius: 4, padding: '1px 6px' }}>
          @connorhoehnslalom/ui-components/integrations/realtime-modules
        </code>.
      </p>

      <MockGatewayProvider dispatchRef={dispatchRef}>
        <MockDataPump dispatchRef={dispatchRef} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <RawColumn />
          <WrappedColumn />
        </div>
      </MockGatewayProvider>
    </div>
  );
}

function MockDataPump({
  dispatchRef,
}: {
  dispatchRef: React.MutableRefObject<DispatchFrame | null>;
}) {
  useMockPump(dispatchRef);
  return null;
}
