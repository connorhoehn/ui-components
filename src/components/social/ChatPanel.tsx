// frontend/src/components/ChatPanel.tsx
//
// Chat message panel — renders a scrollable list of attributed messages
// with an input field and Send button. Displays message author as
// displayName when available, falling back to the first 8 chars of clientId.

import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../../hooks/useChat';
import { MessageRow } from './MessageRow';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import { useDockedPanel } from '../shared/DockedPanelContext';
import { Button } from '../ui/Button';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ChatPanelProps {
  messages: ChatMessage[];
  onSend: (content: string) => void;
  disabled?: boolean;
  onTyping?: (isTyping: boolean) => void;
  typingUsers?: string[];
  /** Surface the panel renders on. 'light' (default) keeps the theme
   *  tokens; 'dark' swaps to white/alpha classes for dark call chrome
   *  (e.g. inside a FloatingPanel next to the call widget) — without it
   *  the message text renders dark-on-dark and disappears. Mirrors
   *  InviteCandidateList's tone seam. */
  tone?: 'light' | 'dark';
  /** Render the panel's own "Chat (n)" heading.
   *
   *  Default: TRUE standalone — every consumer in this repo (the DMs
   *  page's <SocialPanel>, <PanelsView>, <WrappedChatPanel>, the hook
   *  demos) drops the panel into a plain container and relies on it to
   *  name itself. Default FALSE inside a panel dock, which already names
   *  the region with its tab bar — that is where "Chat" appeared twice,
   *  ~40px apart. Pass it explicitly to override either way. */
  showHeader?: boolean;
  /** Fill the parent's height — the message list becomes the flexible
   *  region and the composer sits on the bottom edge — instead of sizing
   *  to a 200px-tall list inside a bordered card.
   *
   *  Default: FALSE standalone (the card is what the DMs page and the
   *  demos expect), TRUE inside a dock, whose column has a definite
   *  height that the body must match or leave a dead band behind. */
  fill?: boolean;
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

export function ChatPanel({
  messages,
  onSend,
  disabled = false,
  onTyping,
  typingUsers = [],
  tone = 'light',
  showHeader,
  fill,
}: ChatPanelProps) {
  const dark = tone === 'dark';
  // A surrounding dock already draws the header and hands down a definite
  // height; explicit props still win. See DockedPanelContext.
  const dock = useDockedPanel();
  const headerVisible = showHeader ?? !(dock?.hasHeader ?? false);
  const fills = fill ?? (dock?.fillsHeight ?? false);
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
    <div
      data-testid="chat-panel"
      className={cn(
        'font-mono',
        // Filling a dock: no card of its own (the dock IS the card) and no
        // top margin — that margin plus the card's padding was the empty
        // strip between the dock's tab bar and the first message.
        fills
          ? 'flex h-full min-h-0 flex-col px-3 pb-3 pt-2'
          : cn('border rounded p-3 mt-4', dark ? 'border-white/10 bg-white/5' : 'border-border'),
      )}
    >
      {/* Header */}
      {headerVisible && (
        <div className={cn('text-[0.8rem] font-bold mb-2 shrink-0', dark ? 'text-white/90' : 'text-text-primary')}>
          Chat ({messages.length})
        </div>
      )}

      {/* Typing banner */}
      {typingUsers.length > 0 && (
        <div className={cn('text-[0.7rem] italic mb-1 shrink-0', dark ? 'text-white/50' : 'text-text-tertiary')}>
          {formatTypingBanner(typingUsers)}
        </div>
      )}

      {/* Message list — the flexible region when filling, so the composer
          stays on the bottom edge and the slack goes to the messages. */}
      <div
        ref={listRef}
        data-testid="chat-panel-messages"
        className={cn('overflow-y-auto mb-2', fills ? 'min-h-0 flex-1' : 'max-h-[200px]')}
      >
        {messages.length === 0 ? (
          <div className={cn('text-xs', dark ? 'text-white/40' : 'text-text-tertiary')}>
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
                tone={tone}
              />
            );
          })
        )}
      </div>

      {/* Input row */}
      <div className="flex flex-row gap-2 shrink-0">
        <Input
          size="sm"
          mono
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? 'Not connected' : 'Type a message...'}
          className={cn(
            'flex-1 text-[0.8rem]',
            dark &&
              'border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20',
          )}
        />
        <Button
          variant="primary"
          size="sm"
          onClick={handleSend}
          disabled={disabled || !inputValue.trim()}
          className="text-[0.8rem] px-3 shrink-0"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
