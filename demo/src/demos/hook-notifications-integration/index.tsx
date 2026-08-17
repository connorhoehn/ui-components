// demo/src/demos/hook-notifications-integration/index.tsx
//
// WrappedNotificationCenter wired to useNotifications() from
// @connorhoehn/realtime-modules. Demonstrates two real-world wiring patterns:
//
//   1. Bare wrap — useNotifications() → WrappedNotificationCenter (always on)
//   2. Capability-gated — useCapability('notifications') decides whether to
//      render the inbox or a CapabilityDeniedFallback empty state.
//
// Mock mode injects synthetic notification:* frames on a timer.
// Set VITE_GATEWAY_URL for live mode.

import {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { WrappedNotificationCenter } from '@/integrations/realtime-modules/WrappedNotificationCenter';
import { CapabilityBoundary } from '@/integrations/realtime-modules/CapabilityBoundary';
import { CapabilityDeniedFallback } from '@/components/shared/CapabilityDeniedFallback';
import {
  GatewaySocketProvider,
  useNotifications,
  useCapability,
  GatewayContext,
} from '@connorhoehn/realtime-modules/client';

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL as string | undefined;
const IS_MOCK = !GATEWAY_URL;

// ---------------------------------------------------------------------------
// Mock gateway context
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
  dispatchRef,
}: {
  children: ReactNode;
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
      currentChannel: '',
      switchChannel: () => {},
      send: () => {},
      sendMessage: () => {},
      disconnect: () => {},
      reconnect: () => {},
      onMessage,
    }),
    [onMessage],
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <GatewayContext.Provider value={value as any}>
      {children}
    </GatewayContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Mock notification stream
// ---------------------------------------------------------------------------

const NOTIFICATIONS: Array<{
  delayMs: number;
  id: string;
  type: string;
  title: string;
  body: string;
  channel?: string;
}> = [
  {
    delayMs: 500,
    id: 'n1',
    type: 'mention',
    title: 'Alice mentioned you',
    body: 'in #design — "can you take a look?"',
    channel: 'design',
  },
  {
    delayMs: 1800,
    id: 'n2',
    type: 'approval-requested',
    title: 'Approval needed: deploy-prod',
    body: 'Bob requested your approval on the deploy-prod pipeline.',
  },
  {
    delayMs: 3400,
    id: 'n3',
    type: 'file-scan',
    title: 'File scan complete: roadmap.pdf',
    body: 'No threats detected.',
  },
  {
    delayMs: 5200,
    id: 'n4',
    type: 'reply',
    title: 'Carol replied to your thread',
    body: '"+1 — same here. Let\'s ship Monday."',
    channel: 'general',
  },
  {
    delayMs: 7400,
    id: 'n5',
    type: 'system',
    title: 'Maintenance window scheduled',
    body: 'Tonight 22:00–22:30 UTC. Expect a brief reconnect.',
  },
];

function makeNotificationFrame(n: typeof NOTIFICATIONS[number]) {
  return {
    type: 'notification:new',
    service: 'notification',
    payload: {
      id: n.id,
      type: n.type,
      title: n.title,
      body: n.body,
      timestamp: new Date().toISOString(),
      channel: n.channel,
    },
  };
}

// ---------------------------------------------------------------------------
// Mock useCapability — flips enabled true after a short load delay
// ---------------------------------------------------------------------------

function CapabilityToggleHint() {
  return (
    <p className="text-[11px] italic text-text-tertiary">
      Capability check resolves automatically in mock mode (always enabled
      after ~400 ms). In live mode the gateway's CRD list decides.
    </p>
  );
}

// ---------------------------------------------------------------------------
// Inner views
// ---------------------------------------------------------------------------

function BareInbox() {
  const notifications = useNotifications();
  return <WrappedNotificationCenter notifications={notifications} />;
}

function GatedInbox() {
  const capability = useCapability('notifications');
  const notifications = useNotifications();
  return (
    <CapabilityBoundary
      capability={capability}
      loading={
        <div className="rounded-md border border-border bg-surface-panel p-4 text-sm text-neutral">
          Loading capability…
        </div>
      }
      fallback={
        <CapabilityDeniedFallback
          capabilityName="Notifications"
          description="Notifications are not enabled for this workspace. Ask your admin to enable the 'notifications' CRD."
        />
      }
    >
      <WrappedNotificationCenter notifications={notifications} />
    </CapabilityBoundary>
  );
}

// ---------------------------------------------------------------------------
// Wrappers
// ---------------------------------------------------------------------------

function MockWiring({ children }: { children: ReactNode }) {
  const dispatchRef = useRef<DispatchFrame | null>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    NOTIFICATIONS.forEach((n) => {
      const t = setTimeout(() => {
        dispatchRef.current?.(makeNotificationFrame(n));
      }, n.delayMs);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <MockGatewayProvider dispatchRef={dispatchRef}>{children}</MockGatewayProvider>
  );
}

function LiveWiring({ url, children }: { url: string; children: ReactNode }) {
  return (
    <GatewaySocketProvider url={url}>{children}</GatewaySocketProvider>
  );
}

// ---------------------------------------------------------------------------
// Top-level demo
// ---------------------------------------------------------------------------

export default function HookNotificationsIntegrationDemo() {
  return (
    <div className="mx-auto max-w-[1080px] p-8">
      <h2 className="mb-1 text-xl font-bold text-text-primary">
        NotificationCenter + useNotifications
      </h2>
      <p className="mb-2 text-sm leading-relaxed text-neutral">
        <code className="rounded bg-surface-hover px-1.5 py-0.5 font-mono text-[12px]">
          {'<NotificationCenter>'}
        </code>{' '}
        wired to{' '}
        <code className="rounded bg-surface-hover px-1.5 py-0.5 font-mono text-[12px]">
          useNotifications()
        </code>
        . Side-by-side compares a plain wrap to a capability-gated wrap that
        falls back to{' '}
        <code className="rounded bg-surface-hover px-1.5 py-0.5 font-mono text-[12px]">
          {'<CapabilityDeniedFallback>'}
        </code>{' '}
        when the gateway reports the capability is off.
      </p>
      <div
        className={
          'mb-6 inline-block rounded-xl px-2.5 py-1 text-[12px] font-semibold ' +
          (IS_MOCK
            ? 'bg-warning-bg text-warning-fg'
            : 'bg-success-bg text-success-fg')
        }
      >
        {IS_MOCK ? 'MOCK MODE' : `LIVE — ${GATEWAY_URL}`}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section>
          <h3 className="mb-2 text-sm font-semibold text-text-primary">
            Bare wrap
          </h3>
          <p className="mb-3 text-[12px] leading-snug text-neutral">
            useNotifications() → WrappedNotificationCenter. Always renders.
          </p>
          {IS_MOCK ? (
            <MockWiring>
              <BareInbox />
            </MockWiring>
          ) : (
            <LiveWiring url={GATEWAY_URL!}>
              <BareInbox />
            </LiveWiring>
          )}
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold text-text-primary">
            Capability-gated
          </h3>
          <p className="mb-3 text-[12px] leading-snug text-neutral">
            Wraps the inbox in &lt;CapabilityBoundary capability=
            {`{useCapability('notifications')}`}&gt; with{' '}
            &lt;CapabilityDeniedFallback&gt; as the disabled slot.
          </p>
          {IS_MOCK ? (
            <MockWiring>
              <GatedInbox />
            </MockWiring>
          ) : (
            <LiveWiring url={GATEWAY_URL!}>
              <GatedInbox />
            </LiveWiring>
          )}
          <div className="mt-3">
            <CapabilityToggleHint />
          </div>
        </section>
      </div>
    </div>
  );
}
