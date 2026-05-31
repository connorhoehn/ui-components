// LiveChatView.tsx — useChat wired to real GatewaySocketProvider.

import { WrappedChatPanel } from '@/integrations/realtime-modules/WrappedChatPanel';
import { GatewaySocketProvider, useChat } from '@connorhoehn/realtime-modules/client';

function ChatViewInner({ channel }: { channel: string }) {
  const chat = useChat(channel);
  return <WrappedChatPanel chat={chat} />;
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
