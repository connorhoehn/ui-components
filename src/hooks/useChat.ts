// frontend/src/hooks/useChat.ts
//
// Chat hook — subscribes to the gateway chat service, loads the last 100
// history messages on join, sends messages to the current channel, and
// delivers real-time incoming messages to callers.
//
// Composes on top of useWebSocket: accepts sendMessage / onMessage from that
// hook and handles the chat protocol independently.

import { useState, useEffect, useRef, useCallback } from 'react';
import type { ConnectionState, GatewayMessage } from '../types/gateway';
import type { ChatAttachment } from '../components/social/ChatAttachment';

export type { ChatAttachment };

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface ChatMessage {
  id?: string;        // server-assigned message ID for deduplication
  clientId: string;
  /**
   * Authenticated sender, stamped server-side. Distinct from `clientId`,
   * which identifies a CONNECTION and changes on every reconnect — which is
   * why "is this mine" keys on this and never on clientId: otherwise your own
   * messages stop being yours partway up the thread.
   */
  userId?: string;
  content: string;
  timestamp: string;  // ISO string from server
  displayName?: string;
  avatarUrl?: string; // optional profile image URL — falls back to initials
  /**
   * Files shared alongside (or instead of) the text.
   *
   * An attachment rides ON a message rather than being its own message kind
   * so that ordering is free: the file lands exactly where the sender put it
   * in the conversation, interleaved correctly with the text around it. A
   * separate "file event" stream would have to be merged back against the
   * message stream at render time, and the merge would be wrong at exactly
   * the moment it matters — when someone is typing while a file uploads.
   *
   * `content` may be empty when a message is nothing but attachments.
   */
  attachments?: ChatAttachment[];
  /**
   * Server-stamped facts about what this message IS, beyond its text.
   *
   * The thread renders some messages as objects rather than sentences — a
   * document that was created, a call that is happening — and this is where
   * the facts for those live: `{ kind: 'document', documentId, title }`,
   * `{ kind: 'call', callId, participants, endedAt }`. The sentence stays in
   * `content` for everywhere that renders plain text (notification previews,
   * the conversation list preview), so a host that does nothing with metadata
   * still shows something true.
   *
   * Deliberately open: the gateway adds event kinds without the library
   * needing a release, and `documentRefFromMetadata` / `callRefFromMetadata`
   * are the readers that turn this back into something typed.
   */
  metadata?: Record<string, unknown>;
}

export interface UseChatOptions {
  sendMessage: (msg: Record<string, unknown>) => void;
  onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
  currentChannel: string;
  connectionState: ConnectionState;
  displayName: string;
}

export interface UseChatReturn {
  messages: ChatMessage[];
  send: (content: string) => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useChat(options: UseChatOptions): UseChatReturn {
  const { sendMessage, onMessage, currentChannel, connectionState, displayName } = options;

  // ---- State ---------------------------------------------------------------
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // ---- Refs ----------------------------------------------------------------
  // Keep stable references for use inside effects without stale closures
  const sendMessageRef = useRef(sendMessage);
  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  const currentChannelRef = useRef(currentChannel);
  useEffect(() => {
    currentChannelRef.current = currentChannel;
  }, [currentChannel]);

  const displayNameRef = useRef(displayName);
  useEffect(() => {
    displayNameRef.current = displayName;
  }, [displayName]);

  // ---- Message handler -----------------------------------------------------
  // Separate effect from subscribe so the handler survives channel changes
  // without being torn down. Channel filtering is done inside the handler
  // using currentChannelRef so closures always see the latest channel.
  useEffect(() => {
    const unregister = onMessage((msg: GatewayMessage) => {
      if (msg.type === 'chat' && msg.action === 'history') {
        // Only process history for the current channel
        if (msg.channel !== currentChannelRef.current) return;
        const incoming = (msg.messages as Array<{ id?: string; clientId: string; message: string; timestamp: string; metadata?: { displayName?: string; avatarUrl?: string } }> | undefined) ?? [];
        // `id` MUST be carried across from the history rows. It is the only
        // key the `action: 'message'` branch below dedupes on, and dropping it
        // here made every replayed message un-dedupable: on reconnect the
        // gateway replays the last 100 AND broadcasts anything that landed
        // during the join, so a message present in both arrived twice and the
        // transcript showed it twice.
        setMessages(incoming.map((m) => ({
          id: m.id,
          clientId: m.clientId,
          content: m.message,
          timestamp: m.timestamp,
          displayName: m.metadata?.displayName,
          avatarUrl: m.metadata?.avatarUrl,
        })));
        return;
      }

      if (msg.type === 'chat' && msg.action === 'message') {
        // Only process messages for the current channel
        if (msg.channel !== currentChannelRef.current) return;
        const messageData = msg.message as { id?: string; clientId: string; message: string; timestamp: string; channel: string; metadata?: { displayName?: string; avatarUrl?: string } } | undefined;
        if (!messageData) return;
        const incoming: ChatMessage = {
          id: messageData.id,
          clientId: messageData.clientId,
          content: messageData.message,
          timestamp: messageData.timestamp,
          displayName: messageData.metadata?.displayName,
          avatarUrl: messageData.metadata?.avatarUrl,
        };
        setMessages((prev) => {
          // Deduplicate by server message ID
          if (incoming.id && prev.some((m) => m.id === incoming.id)) return prev;
          return [...prev, incoming];
        });
        return;
      }
    });

    return unregister;
  }, [onMessage]);

  // ---- Subscribe / unsubscribe on connect / channel change -----------------
  useEffect(() => {
    // Guard: only subscribe when connected and channel is set
    if (connectionState !== 'connected' || !currentChannel) {
      return;
    }

    // Join the channel
    sendMessage({ service: 'chat', action: 'join', channel: currentChannel });

    // Cleanup: leave channel when channel changes, disconnects, or unmounts.
    return () => {
      sendMessageRef.current({
        service: 'chat',
        action: 'leave',
        channel: currentChannel,
      });
    };
  }, [currentChannel, connectionState]); // eslint-disable-line react-hooks/exhaustive-deps
  // sendMessage intentionally excluded — we use sendMessageRef for stable access.

  // Clearing belongs to the CHANNEL, not to the connection.
  //
  // `setMessages([])` used to live in the cleanup above, whose deps include
  // `connectionState` — so it also ran on every disconnect. A two-second
  // network blip therefore wiped the entire transcript and `ChatPanel` fell
  // back to "Chat (0) / No messages yet", telling the user the channel was
  // empty until the server got around to replaying history. The messages are
  // still true while the socket is down; only a channel switch invalidates
  // them.
  useEffect(() => {
    setMessages([]);
  }, [currentChannel]);

  // ---- send() ---------------------------------------------------------------
  // Stable callback — accesses current channel and sendMessage via refs
  const send = useCallback((content: string) => {
    sendMessageRef.current({
      service: 'chat',
      action: 'send',
      channel: currentChannelRef.current,
      message: content,
      metadata: { displayName: displayNameRef.current },
    });
  }, []);  
  // All deps accessed via refs — stable callback that never causes re-renders

  return { messages, send };
}
