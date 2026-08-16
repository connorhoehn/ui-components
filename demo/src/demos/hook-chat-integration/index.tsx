// demo/src/demos/hook-chat-integration/index.tsx
//
// ChatPanel wired to useChat() from @connorhoehn/realtime-modules.
//
// In MOCK mode (no VITE_GATEWAY_URL), synthetic messages are injected on a
// timer so the panel looks alive without a real WebSocket.
//
// In LIVE mode (VITE_GATEWAY_URL set), a real GatewaySocketProvider connects.

import { useEffect, useRef, useState } from 'react';
import { ChatPanel } from '@connorhoehnslalom/ui-components/social';
import { MockGatewayProvider, type DispatchFrame } from './MockGatewayContext';
import { LiveChatView } from './LiveChatView';
import { MockChatView } from './MockChatView';

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL as string | undefined;
const IS_MOCK = !GATEWAY_URL;

// ---------------------------------------------------------------------------
// Top-level demo
// ---------------------------------------------------------------------------

export default function HookChatIntegrationDemo() {
  return (
    <div style={{ padding: 32, maxWidth: 720, margin: '0 auto' }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: '#0f172a' }}>
        ChatPanel + useChat
      </h2>
      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 8, lineHeight: 1.6 }}>
        <code
          style={{
            background: '#f1f5f9',
            borderRadius: 4,
            padding: '1px 6px',
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          {'<ChatPanel>'}
        </code>{' '}
        from <strong>ui-components</strong> wired to{' '}
        <code
          style={{
            background: '#f1f5f9',
            borderRadius: 4,
            padding: '1px 6px',
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          useChat('demo:chat')
        </code>{' '}
        from <strong>realtime-modules</strong>.
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
        {IS_MOCK
          ? 'MOCK MODE — set VITE_GATEWAY_URL to connect live'
          : `LIVE MODE — ${GATEWAY_URL}`}
      </div>

      {IS_MOCK ? (
        <MockChatView channel="demo:chat" />
      ) : (
        <LiveChatView url={GATEWAY_URL!} channel="demo:chat" />
      )}

      {IS_MOCK && (
        <div
          style={{
            marginTop: 24,
            padding: '12px 16px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            fontSize: 13,
            color: '#475569',
            lineHeight: 1.7,
          }}
        >
          <strong>To connect a live gateway:</strong>
          <br />
          <code style={{ fontFamily: 'ui-monospace, monospace' }}>
            VITE_GATEWAY_URL=ws://localhost:4000 npm run dev
          </code>
        </div>
      )}
    </div>
  );
}
