// demo/src/demos/hook-chat-integration/index.tsx
//
// ChatPanel wired to useChat() from @connorhoehn/realtime-modules.
//
// In MOCK mode (no VITE_GATEWAY_URL), synthetic messages are injected on a
// timer so the panel looks alive without a real WebSocket.
//
// In LIVE mode (VITE_GATEWAY_URL set), a real GatewaySocketProvider connects.

import { LiveChatView } from './LiveChatView';
import { MockChatView } from './MockChatView';

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL as string | undefined;
const IS_MOCK = !GATEWAY_URL;

// ---------------------------------------------------------------------------
// Top-level demo
// ---------------------------------------------------------------------------

export default function HookChatIntegrationDemo() {
  return (
    <div className="p-8 max-w-180 mx-auto my-0">
      <h2 className="text-[20px] font-bold mb-1 text-text-primary">
        ChatPanel + useChat
      </h2>
      <p className="text-[14px] text-neutral mb-2 leading-[1.6]">
        <code className="bg-surface-hover rounded py-[1px] px-[6px] font-mono"
        >
          {'<ChatPanel>'}
        </code>{' '}
        from <strong>ui-components</strong> wired to{' '}
        <code className="bg-surface-hover rounded py-[1px] px-[6px] font-mono"
        >
          useChat('demo:chat')
        </code>{' '}
        from <strong>realtime-modules</strong>.
      </p>
      <div className={`inline-block py-1 px-[10px] rounded-xl text-[12px] font-semibold mb-6 ${IS_MOCK ? 'bg-[#fef9c3] text-[#854d0e]' : 'bg-[#dcfce7] text-[#14532d]'}`}
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
        <div className="mt-6 py-3 px-4 bg-surface-panel border border-border rounded-lg text-[13px] text-text-secondary leading-[1.7]"
        >
          <strong>To connect a live gateway:</strong>
          <br />
          <code className="font-mono">
            VITE_GATEWAY_URL=ws://localhost:4000 npm run dev
          </code>
        </div>
      )}
    </div>
  );
}
