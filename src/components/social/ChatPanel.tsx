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
  /** Called when the reader asks for older messages. When present (and
   *  `hasMore` is not false) a "Load earlier messages" button renders
   *  above the first message. The panel preserves the reader's scroll
   *  position across the prepend — growing the list must not yank the
   *  viewport, which is the same bug class as the auto-scroll below. */
  onLoadMore?: () => void;
  /** Whether older messages exist. Defaults to true when `onLoadMore` is
   *  given; pass false once the whole history is loaded to retire the button. */
  hasMore?: boolean;
  /** Show the load-more button in a pending state. */
  loadingMore?: boolean;
}

/** How close to the bottom (px) still counts as "reading the live edge".
 *  Above this, incoming messages must not move the viewport. */
export const CHAT_AUTOSCROLL_THRESHOLD_PX = 64;

/** True when the scroller sits at (or within the threshold of) the bottom. */
export function isPinnedToBottom(
  el: { scrollHeight: number; scrollTop: number; clientHeight: number },
  threshold = CHAT_AUTOSCROLL_THRESHOLD_PX,
): boolean {
  return el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
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
  onLoadMore,
  hasMore,
  loadingMore = false,
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
  const canLoadMore = !!onLoadMore && hasMore !== false;

  // ── Scroll ownership ────────────────────────────────────────────────
  // The old effect slammed scrollTop to scrollHeight on EVERY length
  // change, so a message arriving while you read history threw you back
  // to the live edge mid-sentence. The viewport now belongs to the
  // reader unless they are already at the bottom.
  const [unreadBelow, setUnreadBelow] = useState(0);
  const pinnedRef = useRef(true);
  const prevCountRef = useRef(messages.length);
  // Set while a load-more prepend is in flight so the growth is restored
  // to the reader's position instead of being read as new traffic.
  const prependRef = useRef<{ scrollHeight: number; scrollTop: number } | null>(null);

  function scrollToBottom() {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    pinnedRef.current = true;
    setUnreadBelow(0);
  }

  function handleListScroll() {
    const el = listRef.current;
    if (!el) return;
    const pinned = isPinnedToBottom(el);
    pinnedRef.current = pinned;
    if (pinned) setUnreadBelow(0);
  }

  useEffect(() => {
    const el = listRef.current;
    const prev = prevCountRef.current;
    const grew = messages.length - prev;
    prevCountRef.current = messages.length;
    if (!el) return;

    // Older messages prepended — hold the reader's line steady.
    const anchor = prependRef.current;
    if (anchor && grew > 0) {
      prependRef.current = null;
      el.scrollTop = anchor.scrollTop + (el.scrollHeight - anchor.scrollHeight);
      return;
    }

    if (pinnedRef.current) {
      el.scrollTop = el.scrollHeight;
      setUnreadBelow(0);
    } else if (grew > 0) {
      setUnreadBelow((n) => n + grew);
    }
  }, [messages.length]);

  function handleLoadMore() {
    const el = listRef.current;
    if (el) prependRef.current = { scrollHeight: el.scrollHeight, scrollTop: el.scrollTop };
    onLoadMore?.();
  }

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
    // Sending is an explicit "take me to the live edge" gesture — your own
    // message must land in view even if you were reading history.
    pinnedRef.current = true;
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
        // Deliberately NOT font-mono: a conversation is prose, not a
        // terminal log. Everything in here inherits the app's UI font.
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
        <div className={cn('text-sm font-semibold mb-2 shrink-0', dark ? 'text-white/90' : 'text-text-primary')}>
          Chat ({messages.length})
        </div>
      )}

      {/* Typing banner */}
      {typingUsers.length > 0 && (
        <div className={cn('text-xs italic mb-1 shrink-0', dark ? 'text-white/50' : 'text-text-secondary')}>
          {formatTypingBanner(typingUsers)}
        </div>
      )}

      {/* Message list — the flexible region when filling, so the composer
          stays on the bottom edge and the slack goes to the messages.
          Wrapped so the "new messages" affordance can float over its
          bottom edge without joining the scroll content. */}
      <div className={cn('relative flex flex-col mb-2', fills ? 'min-h-0 flex-1' : '')}>
        <div
          ref={listRef}
          onScroll={handleListScroll}
          data-testid="chat-panel-messages"
          className={cn('overflow-y-auto overflow-x-hidden', fills ? 'min-h-0 flex-1' : 'max-h-[200px]')}
        >
          {canLoadMore && messages.length > 0 && (
            <div className="flex justify-center pb-1">
              <button
                type="button"
                data-testid="chat-panel-load-more"
                onClick={handleLoadMore}
                disabled={loadingMore}
                className={cn(
                  'rounded px-2 py-1 text-xs disabled:opacity-60',
                  dark
                    ? 'text-white/70 hover:bg-white/10'
                    : 'text-text-secondary hover:bg-surface-hover',
                )}
              >
                {loadingMore ? 'Loading…' : 'Load earlier messages'}
              </button>
            </div>
          )}
          {messages.length === 0 ? (
            <div className={cn('text-sm', dark ? 'text-white/40' : 'text-text-secondary')}>
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
        {unreadBelow > 0 && (
          <button
            type="button"
            data-testid="chat-panel-new-messages"
            onClick={scrollToBottom}
            className={cn(
              'absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md',
              dark ? 'bg-white/20 text-white' : 'bg-primary text-white',
            )}
          >
            {unreadBelow} new message{unreadBelow === 1 ? '' : 's'} ↓
          </button>
        )}
      </div>

      {/* Input row */}
      <div className="flex flex-row gap-2 shrink-0">
        <Input
          size="sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? 'Not connected' : 'Type a message...'}
          className={cn(
            'flex-1 text-sm',
            dark &&
              'border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20',
          )}
        />
        <Button
          variant="primary"
          size="sm"
          onClick={handleSend}
          disabled={disabled || !inputValue.trim()}
          className="text-sm px-3 shrink-0"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
