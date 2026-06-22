// LiveChatView.tsx — useChat wired to real GatewaySocketProvider.

import { ChatPanel } from '@/components/social/ChatPanel';
import type { ChatMessage as UIChatMessage } from '@/hooks/useChat';
import { GatewaySocketProvider, useChat } from '@connorhoehnslalom/realtime-modules/client';

function adaptMessage(rm: { id: string; clientId: string; channel: string; message: string; metadata?: Record<string, unknown>; timestamp: string }): UIChatMessage {
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

interface LiveChatViewProps {
  url: string;
  channel: string;
}

export function LiveChatView({ url, channel }: LiveChatViewProps) {
  return (
    <GatewaySocketProvider url={url} channel={channel} features={['chat']}>
      <ChatViewInner channel={channel} />
    </GatewaySocketProvider>
  );
}
