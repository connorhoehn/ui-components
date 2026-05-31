// demo/src/demos/hook-fileupload-integration/index.tsx
//
// FileUploadDrop wired to useFileUpload() from @connorhoehn/realtime-modules.
// Mock mode: simulates the full presign → XHR → AV-scan lifecycle without a
// real gateway or storage backend.
// Live mode: set VITE_GATEWAY_URL.

import { useEffect, useRef, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { WrappedFileUploadDrop } from '@/integrations/realtime-modules/WrappedFileUploadDrop';
import { GatewaySocketProvider, useFileUpload, GatewayContext } from '@connorhoehn/realtime-modules/client';

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
// Inner view using useFileUpload
// ---------------------------------------------------------------------------

function FileUploadViewInner({ channel }: { channel: string }) {
  const fileUpload = useFileUpload(channel);
  return (
    <WrappedFileUploadDrop
      fileUpload={fileUpload}
      multiple
      accept="image/*,application/pdf,.txt,.csv"
      maxSize={10 * 1024 * 1024}
      label="Drop files here or click to browse (image, PDF, text)"
    />
  );
}

// ---------------------------------------------------------------------------
// Mock handler: simulates the gateway presign+scan lifecycle
// ---------------------------------------------------------------------------

function useMockUploadServer(dispatchRef: React.MutableRefObject<DispatchFrame | null>, channel: string) {
  const handleSend = useCallback(
    (msg: Record<string, unknown>) => {
      if (msg.action === 'request-upload') {
        const id = msg.id as string;
        // Issue a fake presigned URL pointing at a mock endpoint
        setTimeout(() => {
          dispatchRef.current?.({
            type: 'fileupload:url',
            channel,
            id,
            // Real XHR PUT will fail (no real endpoint), but the hook still
            // transitions to 'uploading'. We simulate success via frames below.
            uploadUrl: 'https://example.com/mock-upload/' + id,
          });
          // Simulate XHR progress + completion without a real network call by
          // pushing a completion frame after a short delay.
          const avScan = Math.random() > 0.5;
          setTimeout(() => {
            dispatchRef.current?.({
              type: avScan ? 'fileupload:scanning' : 'fileupload:complete',
              channel,
              id,
              downloadUrl: avScan ? undefined : 'https://example.com/files/' + id,
            });
          }, 800);
          if (avScan) {
            setTimeout(() => {
              dispatchRef.current?.({
                type: Math.random() > 0.15 ? 'fileupload:clean' : 'fileupload:infected',
                channel,
                id,
                downloadUrl: 'https://example.com/files/' + id,
              });
            }, 2400);
          }
        }, 350);
      }
    },
    [channel, dispatchRef],
  );
  return handleSend;
}

// ---------------------------------------------------------------------------
// Mock view
// ---------------------------------------------------------------------------

function MockFileUploadView({ channel }: { channel: string }) {
  const dispatchRef = useRef<DispatchFrame | null>(null);
  const handleSend = useMockUploadServer(dispatchRef, channel);

  return (
    <MockGatewayProvider channel={channel} dispatchRef={dispatchRef} onSend={handleSend}>
      <FileUploadViewInner channel={channel} />
      <div
        style={{
          marginTop: 12,
          padding: '10px 14px',
          background: '#f8fafc',
          borderRadius: 8,
          fontSize: 12,
          color: '#94a3b8',
          lineHeight: 1.6,
        }}
      >
        Note: In mock mode the XHR PUT is fired at a stub URL (will 404). The
        gateway lifecycle (presign ack, AV-scan transition) is simulated via
        injected frames. Status badges reflect the full flow.
      </div>
    </MockGatewayProvider>
  );
}

// ---------------------------------------------------------------------------
// Live view
// ---------------------------------------------------------------------------

function LiveFileUploadView({ url, channel }: { url: string; channel: string }) {
  return (
    <GatewaySocketProvider url={url} channel={channel}>
      <FileUploadViewInner channel={channel} />
    </GatewaySocketProvider>
  );
}

// ---------------------------------------------------------------------------
// Top-level demo
// ---------------------------------------------------------------------------

export default function HookFileUploadIntegrationDemo() {
  return (
    <div style={{ padding: 32, maxWidth: 640, margin: '0 auto' }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: '#0f172a' }}>
        FileUploadDrop + useFileUpload
      </h2>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 8, lineHeight: 1.6 }}>
        <code style={{ background: '#f1f5f9', borderRadius: 4, padding: '1px 6px', fontFamily: 'ui-monospace, monospace' }}>
          {'<FileUploadDrop>'}
        </code>{' '}
        wired to{' '}
        <code style={{ background: '#f1f5f9', borderRadius: 4, padding: '1px 6px', fontFamily: 'ui-monospace, monospace' }}>
          useFileUpload('demo:upload')
        </code>.
        Tracks presign, XHR progress, AV-scan, and clean/infected states.
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
        <MockFileUploadView channel="demo:upload" />
      ) : (
        <LiveFileUploadView url={GATEWAY_URL!} channel="demo:upload" />
      )}
    </div>
  );
}
