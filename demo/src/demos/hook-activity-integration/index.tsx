// demo/src/demos/hook-activity-integration/index.tsx
//
// ActivityFeed wired to useActivity() from @connorhoehn/realtime-modules.
// Mock mode: synthetic activity events injected on a timer.
// Live mode: set VITE_GATEWAY_URL.

import {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { WrappedActivityPanel } from '@/integrations/realtime-modules/WrappedActivityPanel';
import {
  GatewaySocketProvider,
  useActivity,
  GatewayContext,
} from '@connorhoehn/realtime-modules/client';

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL as string | undefined;
const IS_MOCK = !GATEWAY_URL;
const CHANNEL = 'demo:activity';

// ---------------------------------------------------------------------------
// Mock gateway context (mirrors hook-presence-integration pattern)
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
// Mock event script
// ---------------------------------------------------------------------------

const SCRIPT: Array<{
  delayMs: number;
  eventType: string;
  displayName: string;
  userId: string;
  detail?: Record<string, unknown>;
}> = [
  { delayMs:   400, eventType: 'document:opened',    displayName: 'Alice', userId: 'u-alice', detail: { docId: 'design-spec' } },
  { delayMs:  1600, eventType: 'comment:created',    displayName: 'Bob',   userId: 'u-bob',   detail: { thread: 'auth-flow' } },
  { delayMs:  2800, eventType: 'document:edited',    displayName: 'Alice', userId: 'u-alice', detail: { section: 'overview' } },
  { delayMs:  4000, eventType: 'reaction:added',     displayName: 'Carol', userId: 'u-carol', detail: { emoji: '🎉' } },
  { delayMs:  5200, eventType: 'task:completed',     displayName: 'Bob',   userId: 'u-bob',   detail: { task: 'wire-gateway' } },
  { delayMs:  6800, eventType: 'document:shared',    displayName: 'Alice', userId: 'u-alice', detail: { with: 'design-team' } },
  { delayMs:  8400, eventType: 'pipeline:succeeded', displayName: 'system', userId: 'u-system', detail: { name: 'deploy-staging' } },
  { delayMs: 10200, eventType: 'mention',            displayName: 'Carol', userId: 'u-carol', detail: { target: 'alice' } },
];

function makeActivityFrame(
  channel: string,
  e: typeof SCRIPT[number],
) {
  return {
    type: 'activity:event',
    channel,
    eventType: e.eventType,
    detail: e.detail ?? {},
    timestamp: new Date().toISOString(),
    userId: e.userId,
    displayName: e.displayName,
  };
}

// ---------------------------------------------------------------------------
// Views
// ---------------------------------------------------------------------------

function ActivityViewInner({ channel }: { channel: string }) {
  const activity = useActivity(channel);
  return <WrappedActivityPanel activity={activity} visibleCount={6} />;
}

function MockActivityView({ channel }: { channel: string }) {
  const dispatchRef = useRef<DispatchFrame | null>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    SCRIPT.forEach((e) => {
      const t = setTimeout(() => {
        dispatchRef.current?.(makeActivityFrame(channel, e));
      }, e.delayMs);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [channel]);

  return (
    <MockGatewayProvider channel={channel} dispatchRef={dispatchRef}>
      <ActivityViewInner channel={channel} />
    </MockGatewayProvider>
  );
}

function LiveActivityView({ url, channel }: { url: string; channel: string }) {
  return (
    <GatewaySocketProvider url={url} channel={channel} features={['activity']}>
      <ActivityViewInner channel={channel} />
    </GatewaySocketProvider>
  );
}

// ---------------------------------------------------------------------------
// Top-level demo
// ---------------------------------------------------------------------------

export default function HookActivityIntegrationDemo() {
  return (
    <div className="mx-auto max-w-[640px] p-8">
      <h2 className="mb-1 text-xl font-bold text-slate-900">
        ActivityFeed + useActivity
      </h2>
      <p className="mb-2 text-sm leading-relaxed text-slate-500">
        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[12px]">
          {'<ActivityFeed>'}
        </code>{' '}
        wired to{' '}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[12px]">
          useActivity('{CHANNEL}')
        </code>
        . Events stream in on a timer — open the page and watch the feed
        rotate.
      </p>
      <div
        className={
          'mb-6 inline-block rounded-xl px-2.5 py-1 text-[12px] font-semibold ' +
          (IS_MOCK
            ? 'bg-amber-100 text-amber-800'
            : 'bg-emerald-100 text-emerald-900')
        }
      >
        {IS_MOCK ? 'MOCK MODE' : `LIVE — ${GATEWAY_URL}`}
      </div>

      {IS_MOCK ? (
        <MockActivityView channel={CHANNEL} />
      ) : (
        <LiveActivityView url={GATEWAY_URL!} channel={CHANNEL} />
      )}
    </div>
  );
}
