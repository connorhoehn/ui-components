// src/integrations/realtime-modules/WrappedChatPanel.tsx
//
// ChatPanel wired directly to a useChat() hook return from realtime-modules.
// Caller passes the `chat` object; this component handles field adaptation.

import type { RMUseChatReturn, RMUsePresenceReturn } from './types';
import { adaptChatMessages } from './adapters';
import { ChatPanel } from '../../components/social/ChatPanel';
import { applyNetworkShim, type NetworkShimOptions } from './networkShim';

export interface WrappedChatPanelProps {
  /** Return value of useChat(channel) from realtime-modules */
  chat: RMUseChatReturn;
  /** Optional presence hook return — used to derive typingUsers */
  presence?: RMUsePresenceReturn;
  /** Forwarded to ChatPanel */
  disabled?: boolean;
  /** Override typing banner (supersedes presence-derived list) */
  typingUsers?: string[];
  /** Forwarded to ChatPanel — 'dark' for call chrome surfaces. */
  tone?: 'light' | 'dark';
  /**
   * Opt-in: wrap the rendered ChatPanel in a NetworkErrorBoundary +
   * ReconnectingShim using the supplied connection state and retry
   * callback. Omit for no wrapping (default).
   */
  wrapWithNetworkShim?: NetworkShimOptions;
}

export function WrappedChatPanel({
  chat,
  presence,
  disabled,
  typingUsers: typingUsersOverride,
  tone,
  wrapWithNetworkShim,
}: WrappedChatPanelProps) {
  const messages = adaptChatMessages(chat.messages);

  // Derive typing users from presence roster when available
  const typingUsers: string[] =
    typingUsersOverride ??
    (presence?.roster
      .filter((u) => u.metadata?.isTyping === true)
      .map(
        (u) =>
          (u.metadata?.displayName as string | undefined) ??
          u.clientId.slice(0, 8),
      ) ?? []);

  const panel = (
    <ChatPanel
      messages={messages}
      onSend={chat.sendMessage}
      disabled={disabled}
      typingUsers={typingUsers}
      tone={tone}
    />
  );

  return <>{applyNetworkShim(panel, wrapWithNetworkShim)}</>;
}
