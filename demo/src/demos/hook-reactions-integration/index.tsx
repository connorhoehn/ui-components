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
      <div className="mt-4 min-h-10">
        {rmReactions.length === 0 ? (
          <p className="text-text-tertiary text-[13px]">
            {isMock ? 'Auto-reactions firing shortly...' : 'Click a reaction to send'}
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {rmReactions.slice(-20).map((r: RMReaction) => (
              <span className="py-1 px-[10px] bg-surface-hover border border-border rounded-2xl text-[18px]"
                key={r.id}
              >
                {r.emoji}
              </span>
            ))}
          </div>
        )}
      </div>
      <p className="text-[12px] text-text-disabled mt-2">
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
    <div className="p-8 max-w-160 mx-auto my-0">
      <h2 className="text-[20px] font-bold mb-1 text-text-primary">
        ReactionButtons + ReactionsOverlay + useReactions
      </h2>
      <p className="text-[14px] text-neutral mb-2 leading-[1.6]">
        <code className="bg-surface-hover rounded py-[1px] px-[6px] font-mono">
          {'<ReactionButtons>'}
        </code>{' '}
        and{' '}
        <code className="bg-surface-hover rounded py-[1px] px-[6px] font-mono">
          {'<ReactionsOverlay>'}
        </code>{' '}
        wired to{' '}
        <code className="bg-surface-hover rounded py-[1px] px-[6px] font-mono">
          useReactions('demo:reactions')
        </code>.
        Click any emoji button or watch the auto-fired reactions below.
      </p>
      <div className={`inline-block py-1 px-[10px] rounded-xl text-[12px] font-semibold mb-6 ${IS_MOCK ? 'bg-warning-bg text-warning-fg' : 'bg-success-bg text-success-fg'}`}
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
