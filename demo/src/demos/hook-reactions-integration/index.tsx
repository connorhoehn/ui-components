// demo/src/demos/hook-reactions-integration/index.tsx
//
// ReactionButtons + ReactionsOverlay wired to useReactions() from realtime-modules.
// Mock mode: auto-fires emoji reactions every ~2 s.
// Live mode: set VITE_GATEWAY_URL.

import { useEffect, useRef, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { ReactionButtons } from '@/components/collaboration/ReactionButtons';
import { WrappedReactionsOverlay } from '@/integrations/realtime-modules/WrappedReactionsOverlay';
import type { RMReaction } from '@/integrations/realtime-modules/types';
import { GatewaySocketProvider, useReactions, GatewayContext } from '@connorhoehn/realtime-modules/client';

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL as string | undefined;
const IS_MOCK = !GATEWAY_URL;

// ---------------------------------------------------------------------------
// Mock types
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
  channel,
  dispatchRef,
  onSend,
}: {
  children: ReactNode;
  channel: string;
  dispatchRef: React.MutableRefObject<DispatchFrame | null>;
  onSend?: (msg: Record<string, unknown>) => void;
}) {
  const subsRef = useRef<Set<(m: Record<string, unknown>) => void>>(new Set());

  const dispatch: DispatchFrame = useCallback((frame) => {
    subsRef.current.forEach((h) => { try { h(frame); } catch { /* swallow */ } });
  }, []);

  useEffect(() => { dispatchRef.current = dispatch; }, [dispatch, dispatchRef]);

  const onMessage = useCallback(
    (handler: (msg: Record<string, unknown>) => void) => {
      subsRef.current.add(handler);
      return () => subsRef.current.delete(handler);
    },
    [],
  );

  const value = useMemo<MockCtxValue>(
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
    [channel, onMessage, onSend],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <GatewayContext.Provider value={value as any}>{children}</GatewayContext.Provider>;
}

// ---------------------------------------------------------------------------
// Inner view
// ---------------------------------------------------------------------------

const AUTO_EMOJIS = ['❤️', '🎉', '🔥', '👍', '😂', '🚀', '💯', '⚡'];

function ReactionsViewInner({ channel, isMock }: { channel: string; isMock: boolean }) {
  const reactionsHook = useReactions(channel);
  const { reactions: rmReactions, react } = reactionsHook;

  return (
    <div>
      <ReactionButtons onReact={react} disabled={false} />
      <WrappedReactionsOverlay reactions={reactionsHook} />

      {/* Reaction history strip */}
      <div style={{ marginTop: 16, minHeight: 40 }}>
        {rmReactions.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: 13 }}>
            {isMock ? 'Auto-reactions firing shortly...' : 'Click a reaction to send'}
          </p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {rmReactions.slice(-20).map((r: RMReaction) => (
              <span
                key={r.id}
                style={{
                  padding: '4px 10px',
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  borderRadius: 16,
                  fontSize: 18,
                }}
              >
                {r.emoji}
              </span>
            ))}
          </div>
        )}
      </div>
      <p style={{ fontSize: 12, color: '#cbd5e1', marginTop: 8 }}>
        {rmReactions.length} reaction(s) in channel (capped at 50)
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mock view
// ---------------------------------------------------------------------------

let autoIdx = 0;

function MockReactionsView({ channel }: { channel: string }) {
  const dispatchRef = useRef<DispatchFrame | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const emoji = AUTO_EMOJIS[autoIdx++ % AUTO_EMOJIS.length];
      dispatchRef.current?.({
        type: 'reaction:new',
        channel,
        id: `mock-r-${Date.now()}`,
        clientId: 'bot-001',
        emoji,
        effect: '',
        position: null,
        metadata: {},
        timestamp: new Date().toISOString(),
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [channel]);

  const handleSend = useCallback(
    (msg: Record<string, unknown>) => {
      // Echo outbound react frames back as inbound so the panel shows them
      if (msg.action === 'react' && typeof msg.emoji === 'string') {
        dispatchRef.current?.({
          type: 'reaction:new',
          channel,
          id: `sent-r-${Date.now()}`,
          clientId: 'demo-client-001',
          emoji: msg.emoji,
          effect: '',
          position: null,
          metadata: {},
          timestamp: new Date().toISOString(),
        });
      }
    },
    [channel],
  );

  return (
    <MockGatewayProvider channel={channel} dispatchRef={dispatchRef} onSend={handleSend}>
      <ReactionsViewInner channel={channel} isMock />
    </MockGatewayProvider>
  );
}

// ---------------------------------------------------------------------------
// Live view
// ---------------------------------------------------------------------------

function LiveReactionsView({ url, channel }: { url: string; channel: string }) {
  return (
    <GatewaySocketProvider url={url} channel={channel} features={['reactions']}>
      <ReactionsViewInner channel={channel} isMock={false} />
    </GatewaySocketProvider>
  );
}

// ---------------------------------------------------------------------------
// Top-level demo
// ---------------------------------------------------------------------------

export default function HookReactionsIntegrationDemo() {
  return (
    <div style={{ padding: 32, maxWidth: 640, margin: '0 auto' }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: '#0f172a' }}>
        ReactionButtons + ReactionsOverlay + useReactions
      </h2>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 8, lineHeight: 1.6 }}>
        <code style={{ background: '#f1f5f9', borderRadius: 4, padding: '1px 6px', fontFamily: 'ui-monospace, monospace' }}>
          {'<ReactionButtons>'}
        </code>{' '}
        and{' '}
        <code style={{ background: '#f1f5f9', borderRadius: 4, padding: '1px 6px', fontFamily: 'ui-monospace, monospace' }}>
          {'<ReactionsOverlay>'}
        </code>{' '}
        wired to{' '}
        <code style={{ background: '#f1f5f9', borderRadius: 4, padding: '1px 6px', fontFamily: 'ui-monospace, monospace' }}>
          useReactions('demo:reactions')
        </code>.
        Click any emoji button or watch the auto-fired reactions below.
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
        <MockReactionsView channel="demo:reactions" />
      ) : (
        <LiveReactionsView url={GATEWAY_URL!} channel="demo:reactions" />
      )}
    </div>
  );
}
