import { useState, useEffect, useRef } from 'react';
import { TypingIndicator } from '@connorhoehn/ui-components/shared';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';

interface ChatMessage {
  messageId: string;
  userId: string;
  displayName: string;
  text: string;
  timestamp: number;
  reactions: { emoji: string; userId: string; displayName: string }[];
}

const avatarColors: Record<string, string> = {
  'user-alice': '#ec4899',
  'user-bob': '#10b981',
  'user-carol': '#f59e0b',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function ChatMessages() {
  const { onMessage } = useWebSocketContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      if (msg.type === 'chat' && msg.action === 'message') {
        const newMsg: ChatMessage = {
          messageId: msg.messageId as string,
          userId: msg.userId as string,
          displayName: msg.displayName as string,
          text: msg.text as string,
          timestamp: (msg.timestamp as number) || Date.now(),
          reactions: [],
        };
        setMessages((prev) => [...prev, newMsg]);
        setTypingUser(null);
      }

      if (msg.type === 'presence' && msg.action === 'typing.started') {
        setTypingUser(msg.displayName as string);
      }

      if (msg.type === 'presence' && msg.action === 'typing.stopped') {
        setTypingUser(null);
      }

      if (msg.type === 'reaction' && msg.action === 'added') {
        const messageId = msg.messageId as string;
        setMessages((prev) =>
          prev.map((m) =>
            m.messageId === messageId
              ? {
                  ...m,
                  reactions: [
                    ...m.reactions,
                    {
                      emoji: msg.emoji as string,
                      userId: msg.userId as string,
                      displayName: msg.displayName as string,
                    },
                  ],
                }
              : m
          )
        );
      }
    });

    return unsubscribe;
  }, [onMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typingUser]);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid #e2e8f0',
          fontWeight: 600,
          fontSize: 14,
          color: '#1a1a2e',
        }}
      >
        # general
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              color: '#94a3b8',
              fontSize: 13,
              textAlign: 'center',
              marginTop: 40,
            }}
          >
            Messages will appear here as the simulation runs...
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.messageId} style={{ display: 'flex', gap: 10 }}>
            {/* Avatar */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: avatarColors[msg.userId] || '#6366f1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {getInitials(msg.displayName)}
            </div>

            {/* Bubble */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: '#1a1a2e' }}>
                  {msg.displayName}
                </span>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div
                style={{
                  marginTop: 4,
                  padding: '8px 12px',
                  background: '#f1f5f9',
                  borderRadius: '4px 12px 12px 12px',
                  fontSize: 14,
                  color: '#334155',
                  lineHeight: 1.5,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                }}
              >
                {msg.text}
              </div>

              {/* Reactions */}
              {msg.reactions.length > 0 && (
                <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                  {msg.reactions.map((r, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '2px 6px',
                        background: '#f1f5f9',
                        borderRadius: 10,
                        fontSize: 12,
                        border: '1px solid #e2e8f0',
                      }}
                      title={`${r.displayName} reacted`}
                    >
                      {r.emoji}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typingUser && (
          <div style={{ padding: '4px 0' }}>
            <TypingIndicator names={[typingUser]} />
          </div>
        )}
      </div>
    </div>
  );
}
