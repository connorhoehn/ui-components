// demo/src/demos/hook-fileupload-integration/index.tsx
//
// FileUploadDrop wired to useFileUpload() from @connorhoehn/realtime-modules.
// Mock mode: simulates the full presign → XHR → AV-scan lifecycle without a
// real gateway or storage backend.
// Live mode: set VITE_GATEWAY_URL.

import { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { FileUploadDrop } from '@/components/shared/FileUploadDrop';
import { GatewaySocketProvider, useFileUpload, GatewayContext } from '@connorhoehn/realtime-modules/client';
import type { FileUploadState } from '@connorhoehn/realtime-modules/client';

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
// Status badge
// ---------------------------------------------------------------------------

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  pending:   { bg: '#f1f5f9', color: '#64748b', label: 'Pending' },
  uploading: { bg: '#dbeafe', color: '#1d4ed8', label: 'Uploading' },
  completed: { bg: '#dcfce7', color: '#14532d', label: 'Done' },
  failed:    { bg: '#fee2e2', color: '#991b1b', label: 'Failed' },
  scanning:  { bg: '#fef9c3', color: '#854d0e', label: 'Scanning' },
  clean:     { bg: '#dcfce7', color: '#14532d', label: 'Clean' },
  infected:  { bg: '#fce7f3', color: '#9d174d', label: 'Infected' },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  return (
    <span
      style={{
        padding: '2px 8px',
        borderRadius: 10,
        fontSize: 11,
        fontWeight: 600,
        background: s.bg,
        color: s.color,
      }}
    >
      {s.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Upload list row
// ---------------------------------------------------------------------------

function UploadRow({ u, onCancel }: { u: FileUploadState; onCancel: (id: string) => void }) {
  const canCancel = u.status === 'pending' || u.status === 'uploading';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '8px 12px',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        fontSize: 13,
      }}
    >
      <span style={{ flex: 1, fontFamily: 'ui-monospace, monospace', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {u.filename}
      </span>
      <span style={{ color: '#94a3b8', flexShrink: 0 }}>
        {(u.size / 1024).toFixed(1)} KB
      </span>
      {u.progress !== undefined && u.status === 'uploading' && (
        <div style={{ width: 80, height: 4, background: '#e2e8f0', borderRadius: 2, flexShrink: 0 }}>
          <div
            style={{
              width: `${u.progress}%`,
              height: '100%',
              background: '#6366f1',
              borderRadius: 2,
              transition: 'width 0.2s',
            }}
          />
        </div>
      )}
      <StatusBadge status={u.status} />
      {canCancel && (
        <button
          onClick={() => onCancel(u.id)}
          style={{
            padding: '2px 8px',
            fontSize: 11,
            border: '1px solid #e2e8f0',
            borderRadius: 6,
            background: '#fff',
            color: '#64748b',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inner view using useFileUpload
// ---------------------------------------------------------------------------

function FileUploadViewInner({ channel }: { channel: string }) {
  const { uploads, upload, cancel, removeCompleted } = useFileUpload(channel);

  const handleFiles = useCallback(
    async (files: File[]) => {
      for (const f of files) {
        try {
          await upload(f);
        } catch {
          // Errors are reflected in the uploads array
        }
      }
    },
    [upload],
  );

  return (
    <div>
      <FileUploadDrop
        onFiles={handleFiles}
        multiple
        accept="image/*,application/pdf,.txt,.csv"
        maxSize={10 * 1024 * 1024}
        label="Drop files here or click to browse (image, PDF, text)"
      />

      {uploads.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>
              Uploads ({uploads.length})
            </span>
            <button
              onClick={removeCompleted}
              style={{
                fontSize: 12,
                color: '#6366f1',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Clear done
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {uploads.map((u) => (
              <UploadRow key={u.id} u={u} onCancel={cancel} />
            ))}
          </div>
        </div>
      )}
    </div>
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
