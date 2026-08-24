// demo/src/demos/hook-videohangout-integration/index.tsx
//
// HangoutLayout + CallWidget wired to useVideoHangout() from realtime-modules.
// Mock mode: simulates session creation and participant join events.
// Live mode: set VITE_GATEWAY_URL. Real video media is NOT wired (no MediaStream).
// joinToken is displayed so the consumer can pass it to their media stack.

import { useEffect, useRef, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { WrappedHangoutLayout } from '@/integrations/realtime-modules/WrappedHangoutLayout';
import { GatewaySocketProvider, useVideoHangout, GatewayContext } from '@connorhoehn/realtime-modules/client';

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL as string | undefined;
const IS_MOCK = !GATEWAY_URL;

// ---------------------------------------------------------------------------
// Mock gateway provider
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
  onSend: (msg: Record<string, unknown>) => void;
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
      send: onSend,
      sendMessage: onSend,
      disconnect: () => {},
      reconnect: () => {},
      onMessage,
    }),
    [channel, onSend, onMessage],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <GatewayContext.Provider value={value as any}>{children}</GatewayContext.Provider>;
}

// ---------------------------------------------------------------------------
// Inner view using useVideoHangout
// ---------------------------------------------------------------------------

function HangoutViewInner({ channel, isMock }: { channel: string; isMock: boolean }) {
  const hangout = useVideoHangout(channel);
  const { session, participants, joinToken, start, leave, end, toggleVideo, toggleAudio } =
    hangout;

  return (
    <div>
      {/* State strip */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {!session ? (
          <button className="py-2 px-[18px] bg-primary text-surface border-0 rounded-lg text-[14px] font-semibold cursor-pointer"
            onClick={() => start({ type: 'hangout' })}
          >
            Start Hangout
          </button>
        ) : (
          <>
            <button className="py-[6px] px-[14px] bg-surface-hover text-text-primary border border-border rounded-lg text-[13px] cursor-pointer"
              onClick={toggleVideo}
            >
              Toggle Video
            </button>
            <button className="py-[6px] px-[14px] bg-surface-hover text-text-primary border border-border rounded-lg text-[13px] cursor-pointer"
              onClick={toggleAudio}
            >
              Toggle Audio
            </button>
            <button className="py-[6px] px-[14px] bg-surface text-danger-fg border border-danger-border rounded-lg text-[13px] cursor-pointer"
              onClick={leave}
            >
              Leave
            </button>
            <button className="py-[6px] px-[14px] bg-danger-bg text-danger-fg border border-danger-border rounded-lg text-[13px] cursor-pointer"
              onClick={end}
            >
              End for All
            </button>
          </>
        )}
      </div>

      {/* Session info */}
      {session && (
        <div className="mb-4 text-[13px] text-neutral">
          Session: <code className="font-mono">{session.id}</code>
          {' '}&middot; {participants.length} participant(s)
        </div>
      )}

      {/* Join token display */}
      {joinToken && (
        <div>
          <div className="text-[12px] font-semibold text-neutral mb-1">
            joinToken (pass to your media stack / Stage component):
          </div>
          <div className="mt-3 break-all rounded-lg bg-surface-hover px-3 py-2 font-mono text-[12px] text-text-secondary">
            {joinToken}
          </div>
        </div>
      )}

      {/* HangoutLayout */}
      {session && (
        <div className="mt-5 h-90 border border-border rounded-xl overflow-hidden">
          <WrappedHangoutLayout
            hangout={hangout}
            localClientId="demo-client-001"
            className="h-full"
          />
        </div>
      )}

      {!session && !isMock && (
        <p className="text-[13px] text-text-tertiary mt-2">
          Click "Start Hangout" to initiate a session.
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mock view: simulate session creation + participant join/leave
// ---------------------------------------------------------------------------

const MOCK_PARTICIPANTS = [
  { clientId: 'alice-001', displayName: 'Alice', role: 'host' as const, videoOn: true, audioOn: true, joinedAt: new Date().toISOString() },
  { clientId: 'bob-002', displayName: 'Bob', role: 'participant' as const, videoOn: false, audioOn: true, joinedAt: new Date().toISOString() },
  { clientId: 'carol-003', displayName: 'Carol', role: 'participant' as const, videoOn: true, audioOn: false, joinedAt: new Date().toISOString() },
];

function MockHangoutView({ channel }: { channel: string }) {
  const dispatchRef = useRef<DispatchFrame | null>(null);

  const handleSend = useCallback(
    (msg: Record<string, unknown>) => {
      if (msg.action === 'start') {
        const sessionId = `sess-${Date.now().toString(36)}`;
        setTimeout(() => {
          dispatchRef.current?.({
            type: 'videohangout:created',
            channel,
            session: { id: sessionId, type: 'hangout', createdAt: new Date().toISOString() },
            joinToken: `eyJhbGciOiJIUzI1NiJ9.DEMO.${sessionId}`,
          });
          // Simulate participants joining
          MOCK_PARTICIPANTS.forEach((p, i) => {
            setTimeout(() => {
              dispatchRef.current?.({
                type: 'videohangout:participant',
                channel,
                participant: p,
              });
            }, (i + 1) * 1000);
          });
        }, 600);
      }
      if (msg.action === 'leave' || msg.action === 'end') {
        dispatchRef.current?.({ type: 'videohangout:ended', channel });
      }
      if (msg.action === 'toggle-video' || msg.action === 'toggle-audio') {
        // Echo back as media toggle (would normally come from gateway)
        dispatchRef.current?.({
          type: 'videohangout:media',
          channel,
          clientId: 'demo-client-001',
          videoOn: msg.action === 'toggle-video' ? msg.videoOn : true,
          audioOn: msg.action === 'toggle-audio' ? msg.audioOn : true,
        });
      }
    },
    [channel],
  );

  return (
    <MockGatewayProvider channel={channel} dispatchRef={dispatchRef} onSend={handleSend}>
      <HangoutViewInner channel={channel} isMock />
    </MockGatewayProvider>
  );
}

// ---------------------------------------------------------------------------
// Live view
// ---------------------------------------------------------------------------

function LiveHangoutView({ url, channel }: { url: string; channel: string }) {
  return (
    <GatewaySocketProvider url={url} channel={channel}>
      <HangoutViewInner channel={channel} isMock={false} />
    </GatewaySocketProvider>
  );
}

// ---------------------------------------------------------------------------
// Top-level demo
// ---------------------------------------------------------------------------

export default function HookVideoHangoutIntegrationDemo() {
  return (
    <div className="p-8 max-w-180 mx-auto my-0">
      <h2 className="text-[20px] font-bold mb-1 text-text-primary">
        HangoutLayout + useVideoHangout
      </h2>
      <p className="text-[14px] text-neutral mb-2 leading-[1.6]">
        <code className="bg-surface-hover rounded py-[1px] px-[6px] font-mono">
          {'<HangoutLayout>'}
        </code>{' '}
        wired to{' '}
        <code className="bg-surface-hover rounded py-[1px] px-[6px] font-mono">
          useVideoHangout('demo:hangout')
        </code>.
        Click "Start Hangout" — session creates, 3 mock participants join with stagger.
        The <code className="bg-surface-hover rounded py-[1px] px-[6px] font-mono">joinToken</code> is
        displayed but real media is not wired (no MediaStream in mock mode).
      </p>
      <div className={`inline-block py-1 px-[10px] rounded-xl text-[12px] font-semibold mb-6 ${IS_MOCK ? 'bg-warning-bg text-warning-fg' : 'bg-success-bg text-success-fg'}`}
      >
        {IS_MOCK ? 'MOCK MODE — signaling only, no real media' : `LIVE — ${GATEWAY_URL}`}
      </div>

      {IS_MOCK ? (
        <MockHangoutView channel="demo:hangout" />
      ) : (
        <LiveHangoutView url={GATEWAY_URL!} channel="demo:hangout" />
      )}
    </div>
  );
}
