// MockChatView.tsx — useChat wired to a mock provider with timer-injected messages.

import { useEffect, useRef, useCallback } from 'react';
import { ChatPanel } from '@/components/social/ChatPanel';
import type { ChatMessage as UIChatMessage } from '@/hooks/useChat';
import { MockGatewayProvider, type DispatchFrame } from './MockGatewayContext';
import { useChat } from '@connorhoehn/realtime-modules/client';

const MOCK_MESSAGES = [
  { author: 'alice-001', name: 'Alice', text: 'Hey everyone, the new ChatPanel is live!' },
  { author: 'bob-002', name: 'Bob', text: 'Looks great. Does it handle long messages OK?' },
  { author: 'carol-003', name: 'Carol', text: 'Tested with 200 chars — scrolls cleanly.' },
  { author: 'alice-001', name: 'Alice', text: 'And reactions land in useReactions(), not here.' },
  { author: 'bob-002', name: 'Bob', text: 'Nice separation of concerns.' },
];

// Adapt realtime-modules ChatMessage → ui-components ChatMessage
function adaptMessage(rm: {
  id: string;
  clientId: string;
  channel: string;
  message: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}): UIChatMessage {
  return {
    id: rm.id,
    clientId: rm.clientId,
    content: rm.message,
    timestamp: rm.timestamp,
    displayName: rm.metadata?.displayName as string | undefined,
  };
}

function ChatViewInner({ channel }: { channel: string }) {
  const { messages: rmMessages, sendMessage } = useChat(channel);
  const messages: UIChatMessage[] = rmMessages.map(adaptMessage);
  return <ChatPanel messages={messages} onSend={sendMessage} />;
}

interface MockChatViewProps {
  channel: string;
}

export function MockChatView({ channel }: MockChatViewProps) {
  const dispatchRef = useRef<DispatchFrame | null>(null);

  // Inject synthetic inbound messages on a timer
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= MOCK_MESSAGES.length) {
        clearInterval(interval);
        return;
      }
      const m = MOCK_MESSAGES[idx++];
      dispatchRef.current?.({
        type: 'chat:message',
        channel,
        id: `mock-${idx}`,
        clientId: m.author,
        message: m.text,
        metadata: { displayName: m.name },
        timestamp: new Date().toISOString(),
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [channel]);

  // Echo outbound sends back as inbound frames so useChat sees them
  const handleSend = useCallback(
    (msg: Record<string, unknown>) => {
      if (typeof msg.message === 'string') {
        dispatchRef.current?.({
          type: 'chat:message',
          channel,
          id: `sent-${Date.now()}`,
          clientId: 'demo-client-001',
          message: msg.message,
          metadata: { displayName: 'You' },
          timestamp: new Date().toISOString(),
        });
      }
    },
    [channel],
  );

  return (
    <MockGatewayProvider channel={channel} onSend={handleSend} dispatchRef={dispatchRef}>
      <ChatViewInner channel={channel} />
    </MockGatewayProvider>
  );
}
