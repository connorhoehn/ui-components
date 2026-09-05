// frontend/src/components/ChatPanel.tsx
//
// Chat message panel — renders a scrollable list of attributed messages
// with an input field and Send button. Displays message author as
// displayName when available, falling back to the first 8 chars of clientId.

import { useState, useRef, useEffect, type ClipboardEvent, type ReactNode } from 'react';
import type { ChatMessage } from '../../hooks/useChat';
import { MessageRow } from './MessageRow';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import { useDockedPanel } from '../shared/DockedPanelContext';
import { Button } from '../ui/Button';
import { AttachmentBubble, TransferBubble, type ChatAttachment, type ChatTransfer } from './ChatAttachment';
import { ChatDropZone } from './ChatDropZone';
import { ReactionPickerPopover, DEFAULT_PICKER_EMOJIS } from './ReactionPickerPopover';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ChatPanelProps {
  messages: ChatMessage[];
  onSend: (content: string) => void;
  /**
   * Replaces the built-in input row entirely.
   *
   * The default composer is a plain field, which is the right default: it costs
   * no rich-text dependency and suits a support widget or a log console. A host
   * that wants formatting, @mentions, `:` emoji and staged attachments passes
   * `RichChatComposer` here (from `ui-components/social/rich-composer`, which
   * carries the tiptap peers) rather than this panel growing a second mode.
   *
   * When set, `onSend`, `onSendFiles`, `emojis` and the other composer-shaped
   * props are NOT used for input — the slot owns sending. They still apply to
   * the message list.
   */
  composer?: ReactNode;
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

  // ── Attachments ───────────────────────────────────────────────────────
  /**
   * Receives files the user dropped on the thread, pasted into the composer,
   * or picked with the paperclip. When absent, every attachment affordance is
   * suppressed — a panel wired to a transport with no upload service must not
   * advertise one.
   */
  onSendFiles?: (files: File[]) => void;
  /**
   * Transfers currently in flight IN THIS CHANNEL — including other people's.
   *
   * This is the prop that makes the feature feel live rather than
   * transactional. Rendering only your own uploads here would leave every
   * other participant staring at an unchanged thread until a file appears
   * fully-formed out of nowhere.
   */
  transfers?: ChatTransfer[];
  /** Identifies the viewer so their own transfers get the cancel affordance. */
  currentActor?: string;
  onCancelTransfer?: (transferId: string) => void;
  /**
   * Resolves an attachment to a directly-renderable image source. The download
   * route is bearer-authenticated, so an `<img src>` pointed at the raw URL
   * 401s; the integration layer fetches with credentials and hands back an
   * object URL. Attachments with no resolved src fall back to their inline
   * preview.
   */
  attachmentSrc?: (attachment: ChatAttachment) => string | undefined;
  /** Invoked when the viewer opens/downloads an attachment. */
  onOpenAttachment?: (attachment: ChatAttachment) => void;
  /** MIME/extension filter for drops and the picker. Defaults to everything. */
  acceptFiles?: string;
  /** Per-file byte cap enforced before the transfer starts. */
  maxFileSize?: number;
  /** Reports a rejected drop/paste so the host can surface it. */
  onFileError?: (message: string) => void;
  /**
   * Emoji offered by the composer picker. Defaults to the library's full
   * searchable set — deliberately NOT a short service-side catalog. A fixed
   * server-blessed list is right for reactions that get aggregated and
   * persisted; it is wrong for typing, where an emoji is just a character and
   * an unavailable one reads as a missing feature.
   */
  emojis?: readonly string[];
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
  composer,
  tone = 'light',
  showHeader,
  fill,
  onLoadMore,
  hasMore,
  loadingMore = false,
  onSendFiles,
  transfers = [],
  currentActor,
  onCancelTransfer,
  attachmentSrc,
  onOpenAttachment,
  acceptFiles,
  maxFileSize,
  onFileError,
  emojis = DEFAULT_PICKER_EMOJIS,
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiTriggerRef = useRef<HTMLButtonElement>(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const attachmentsEnabled = !!onSendFiles && !disabled;

  // ── Scroll ownership ────────────────────────────────────────────────
  // The old effect slammed scrollTop to scrollHeight on EVERY length
  // change, so a message arriving while you read history threw you back
  // to the live edge mid-sentence. The viewport now belongs to the
  // reader unless they are already at the bottom.
  const [unreadBelow, setUnreadBelow] = useState(0);
  const pinnedRef = useRef(true);
  const prevCountRef = useRef(messages.length);
  // An arriving transfer grows the list exactly like an arriving message, so
  // it participates in the same scroll-ownership rule: follow the live edge
  // if the reader is already there, never yank them if they are not.
  const rowCount = messages.length + transfers.length;
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
    const grew = rowCount - prev;
    prevCountRef.current = rowCount;
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
    // A progress tick re-renders without changing rowCount, which is exactly
    // right: the bar animates in place and the reader is left alone.
  }, [rowCount]);

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

  function handleFiles(files: File[]) {
    if (!attachmentsEnabled || files.length === 0) return;
    // Sharing a file is, like sending, an explicit "take me to the live edge"
    // gesture — the sender must see their own transfer appear.
    pinnedRef.current = true;
    onSendFiles?.(files);
  }

  /** Pasting a screenshot is the fastest way to share one; don't make the
   *  user save it to disk first just so they can drag it back in. */
  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    if (!attachmentsEnabled) return;
    const items = Array.from(e.clipboardData?.items ?? []);
    const files = items
      .filter((i) => i.kind === 'file')
      .map((i) => i.getAsFile())
      .filter((f): f is File => f !== null);
    if (files.length === 0) return;
    e.preventDefault();
    handleFiles(files);
  }

  function insertEmoji(emoji: string) {
    setInputValue((v) => v + emoji);
    setEmojiOpen(false);
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

  const panel = (
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
              const files = message.attachments ?? [];
              // Attachments render INSIDE the row's content slot rather than as
              // sibling rows, so a caption and its image stay one message —
              // they share an author, a timestamp, and a position in the
              // ordering, and splitting them lets the two drift apart.
              const body =
                files.length === 0 ? (
                  message.content
                ) : (
                  <>
                    {message.content && <span>{message.content}</span>}
                    {files.map((file) => (
                      <AttachmentBubble
                        key={file.id}
                        attachment={file}
                        src={attachmentSrc?.(file)}
                        onOpen={onOpenAttachment}
                      />
                    ))}
                  </>
                );
              return (
                <MessageRow
                  key={message.id ?? index}
                  author={author}
                  content={body}
                  timestamp={message.timestamp}
                  avatarUrl={message.avatarUrl}
                  tone={tone}
                />
              );
            })
          )}

          {/* In-flight transfers sit at the live edge, below every settled
              message. They are not messages yet — the message is written when
              the bytes land — but they occupy the place the message will take,
              so the thread does not visibly reflow when it arrives. */}
          {transfers.map((transfer) => (
            <MessageRow
              key={transfer.transferId}
              author={transfer.actor}
              timestamp=""
              tone={tone}
              content={
                <TransferBubble
                  transfer={transfer}
                  mine={!!currentActor && transfer.actor === currentActor}
                  onCancel={onCancelTransfer}
                />
              }
            />
          ))}
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

      {/* Input row — or whatever the host put in its place. */}
      {composer ? (
        <div className="shrink-0" data-testid="chat-panel-composer-slot">{composer}</div>
      ) : (
      <div className="flex flex-row items-center gap-2 shrink-0">
        {onSendFiles && (
          <>
            <button
              type="button"
              data-testid="chat-panel-attach"
              aria-label="Attach a file"
              title="Attach a file"
              disabled={!attachmentsEnabled}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'shrink-0 rounded p-1.5 disabled:opacity-40',
                dark
                  ? 'text-white/60 hover:bg-white/10'
                  : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
              )}
            >
              <PaperclipGlyph />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={acceptFiles}
              aria-hidden="true"
              tabIndex={-1}
              className="hidden"
              onChange={(e) => {
                const picked = Array.from(e.target.files ?? []);
                const tooBig = maxFileSize ? picked.filter((f) => f.size > maxFileSize) : [];
                if (tooBig.length > 0) {
                  onFileError?.(`Skipped ${tooBig.length} file(s) over the size limit.`);
                }
                handleFiles(picked.filter((f) => !tooBig.includes(f)));
                // Reset so picking the same file twice still fires.
                e.target.value = '';
              }}
            />
          </>
        )}

        <button
          ref={emojiTriggerRef}
          type="button"
          data-testid="chat-panel-emoji"
          aria-label="Insert emoji"
          aria-expanded={emojiOpen}
          title="Insert emoji"
          disabled={disabled}
          onClick={() => setEmojiOpen((o) => !o)}
          className={cn(
            'shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40',
            dark ? 'hover:bg-white/10' : 'hover:bg-[var(--color-surface-hover)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
          )}
        >
          <span aria-hidden="true">🙂</span>
        </button>
        <ReactionPickerPopover
          open={emojiOpen}
          onSelect={insertEmoji}
          onClose={() => setEmojiOpen(false)}
          triggerRef={emojiTriggerRef}
          emojis={emojis}
        />

        <Input
          size="sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
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
      )}
    </div>
  );

  // A panel with no upload transport is not a drop target — advertising one
  // would promise a capability the host cannot deliver.
  if (!onSendFiles) return panel;

  return (
    <ChatDropZone
      onFiles={handleFiles}
      accept={acceptFiles}
      maxSize={maxFileSize}
      onError={onFileError}
      disabled={disabled}
      className={fills ? 'flex h-full min-h-0 flex-col' : undefined}
    >
      {panel}
    </ChatDropZone>
  );
}

function PaperclipGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
