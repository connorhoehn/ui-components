// frontend/src/components/ChatPanel.tsx
//
// Chat message panel — renders a scrollable list of attributed messages
// with an input field and Send button. Displays message author as
// displayName when available, falling back to the first 8 chars of clientId.

import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../../hooks/useChat';
import { MessageRow } from './MessageRow';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChatPanelProps {
  messages: ChatMessage[];
  onSend: (content: string) => void;
  disabled?: boolean;
  onTyping?: (isTyping: boolean) => void;
  typingUsers?: string[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Formats a list of typing user names for display. */
function formatTypingBanner(users: string[]): string {
  if (users.length === 0) return '';
  if (users.length === 1) return `${users[0]} is typing...`;
  if (users.length === 2) return `${users[0]} and ${users[1]} are typing...`;
  const others = users.length - 2;
  return `${users[0]}, ${users[1]} and ${others} other${others > 1 ? 's' : ''} are typing...`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ChatPanel({ messages, onSend, disabled = false, onTyping, typingUsers = [] }: ChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-scroll to bottom on new messages.
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages.length]);

  // Clear typing timer on unmount.
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  function handleSend() {
    const content = inputValue.trim();
    if (!content || disabled) return;
    // Clear typing on send.
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = null;
    onTyping?.(false);
    onSend(content);
    setInputValue('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!disabled) {
      // Broadcast typing; reset 2s idle timer.
      onTyping?.(true);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => onTyping?.(false), 2000);
    }
    if (e.key === 'Enter' && !disabled && inputValue.trim()) {
      handleSend();
    }
  }

  return (
    <div className="border border-border rounded p-3 mt-4 font-mono">
      {/* Header */}
      <div className="text-[0.8rem] font-bold mb-2 text-text-primary">
        Chat ({messages.length})
      </div>

      {/* Typing banner */}
      {typingUsers.length > 0 && (
        <div className="text-[0.7rem] text-text-tertiary italic mb-1">
          {formatTypingBanner(typingUsers)}
        </div>
      )}

      {/* Message list */}
      <div
        ref={listRef}
        className="max-h-[200px] overflow-y-auto mb-2"
      >
        {messages.length === 0 ? (
          <div className="text-text-tertiary text-xs">
            No messages yet
          </div>
        ) : (
          messages.map((message, index) => {
            const author = message.displayName ?? message.clientId.slice(0, 8);
            return (
              <MessageRow
                key={index}
                author={author}
                content={message.content}
                timestamp={message.timestamp}
                avatarUrl={message.avatarUrl}
              />
            );
          })
        )}
      </div>

      {/* Input row */}
      <div className="flex flex-row gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? 'Not connected' : 'Type a message...'}
          className={cn(
            'flex-1 text-[0.8rem] px-2 py-1 border border-border-field rounded font-mono text-text-primary',
            disabled ? 'bg-surface-inset' : 'bg-surface',
          )}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !inputValue.trim()}
          className={cn(
            'text-[0.8rem] px-3 py-1 border border-border-field rounded font-mono',
            disabled || !inputValue.trim()
              ? 'bg-surface-inset text-text-tertiary cursor-default'
              : 'bg-[#007bff] text-white cursor-pointer',
          )}
        >
          Send
        </button>
      </div>
    </div>
  );
}
