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

const TOKEN_STYLE: React.CSSProperties = {
  marginTop: 12,
  padding: '8px 12px',
  background: '#f1f5f9',
  borderRadius: 8,
  fontFamily: 'ui-monospace, monospace',
  fontSize: 12,
  color: '#334155',
  wordBreak: 'break-all',
};

function HangoutViewInner({ channel, isMock }: { channel: string; isMock: boolean }) {
  const hangout = useVideoHangout(channel);
  const { session, participants, joinToken, start, leave, end, toggleVideo, toggleAudio } =
    hangout;

  return (
    <div>
      {/* State strip */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {!session ? (
          <button
            onClick={() => start({ type: 'hangout' })}
            style={{
              padding: '8px 18px',
              background: '#6366f1',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Start Hangout
          </button>
        ) : (
          <>
            <button
              onClick={toggleVideo}
              style={{
                padding: '6px 14px',
                background: '#f1f5f9',
                color: '#334155',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Toggle Video
            </button>
            <button
              onClick={toggleAudio}
              style={{
                padding: '6px 14px',
                background: '#f1f5f9',
                color: '#334155',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Toggle Audio
            </button>
            <button
              onClick={leave}
              style={{
                padding: '6px 14px',
                background: '#fff',
                color: '#ef4444',
                border: '1px solid #fca5a5',
                borderRadius: 8,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Leave
            </button>
            <button
              onClick={end}
              style={{
                padding: '6px 14px',
                background: '#fee2e2',
                color: '#991b1b',
                border: '1px solid #fca5a5',
                borderRadius: 8,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              End for All
            </button>
          </>
        )}
      </div>

      {/* Session info */}
      {session && (
        <div style={{ marginBottom: 16, fontSize: 13, color: '#64748b' }}>
          Session: <code style={{ fontFamily: 'ui-monospace, monospace' }}>{session.id}</code>
          {' '}&middot; {participants.length} participant(s)
        </div>
      )}

      {/* Join token display */}
      {joinToken && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 4 }}>
            joinToken (pass to your media stack / Stage component):
          </div>
          <div style={TOKEN_STYLE}>{joinToken}</div>
        </div>
      )}

      {/* HangoutLayout */}
      {session && (
        <div style={{ marginTop: 20, height: 360, border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
          <WrappedHangoutLayout
            hangout={hangout}
            localClientId="demo-client-001"
            className="h-full"
          />
        </div>
      )}

      {!session && !isMock && (
        <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 8 }}>
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
    <div style={{ padding: 32, maxWidth: 720, margin: '0 auto' }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: '#0f172a' }}>
        HangoutLayout + useVideoHangout
      </h2>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 8, lineHeight: 1.6 }}>
        <code style={{ background: '#f1f5f9', borderRadius: 4, padding: '1px 6px', fontFamily: 'ui-monospace, monospace' }}>
          {'<HangoutLayout>'}
        </code>{' '}
        wired to{' '}
        <code style={{ background: '#f1f5f9', borderRadius: 4, padding: '1px 6px', fontFamily: 'ui-monospace, monospace' }}>
          useVideoHangout('demo:hangout')
        </code>.
        Click "Start Hangout" — session creates, 3 mock participants join with stagger.
        The <code style={{ background: '#f1f5f9', borderRadius: 4, padding: '1px 6px', fontFamily: 'ui-monospace, monospace' }}>joinToken</code> is
        displayed but real media is not wired (no MediaStream in mock mode).
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
