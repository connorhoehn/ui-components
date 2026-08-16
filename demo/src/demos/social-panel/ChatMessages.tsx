import { useState, useEffect, useRef } from 'react';
import { Avatar, TypingIndicator } from '@connorhoehnslalom/ui-components/shared';
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
    <div className="flex-[1] flex flex-col bg-surface border border-border rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="py-3 px-4 border-b border-border font-semibold text-[14px] text-[#1a1a2e]"
      >
        # general
      </div>

      {/* Messages */}
      <div className="flex-[1] overflow-y-auto p-4 flex flex-col gap-3"
        ref={scrollRef}
      >
        {messages.length === 0 && (
          <div className="text-text-tertiary text-[13px] text-center mt-10"
          >
            Messages will appear here as the simulation runs...
          </div>
        )}
        {messages.map((msg) => (
          <div className="flex gap-[10px]" key={msg.messageId}>
            {/* Avatar */}
            <Avatar
              name={msg.displayName}
              initials={getInitials(msg.displayName)}
              color={avatarColors[msg.userId] || '#6366f1'}
              size={32}
            />

            {/* Bubble */}
            <div className="flex-[1]">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-[13px] text-[#1a1a2e]">
                  {msg.displayName}
                </span>
                <span className="text-[11px] text-text-tertiary">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className="mt-1 py-2 px-3 bg-surface-hover rounded-tl rounded-tr-xl rounded-br-xl rounded-bl-xl text-[14px] text-[#334155] leading-[1.5] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              >
                {msg.text}
              </div>

              {/* Reactions */}
              {msg.reactions.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {msg.reactions.map((r, i) => (
                    <span className="py-[2px] px-[6px] bg-surface-hover rounded-[10px] text-[12px] border border-border"
                      key={i}
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
          <div className="py-1 px-0">
            <TypingIndicator names={[typingUser]} />
          </div>
        )}
      </div>
    </div>
  );
}
