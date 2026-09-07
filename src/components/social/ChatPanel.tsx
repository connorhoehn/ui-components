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
import { MessageBody } from './MessageBody';
import { DocumentActivityCard, type DocumentActivityEditor } from './DocumentActivityCard';
import { CallActivityCard, type CallActivityParticipant } from './CallActivityCard';
import { ReactionChips } from './ReactionChips';
import { MessageActionBar } from './MessageActionBar';
import { QuoteBlock } from './QuoteBlock';
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
  /**
   * The viewer, so their own reactions can be marked and their own messages
   * can offer edit/delete. Without it reactions render but cannot be toggled
   * meaningfully — "did I react?" is unanswerable.
   */
  currentUserId?: string;
  /** Reactions on one message. Omit to render no reaction UI at all. */
  reactionsFor?: (messageId: string) => readonly { emoji: string; userId: string; displayName?: string }[];
  /** Toggles the viewer's reaction. Presence of this enables the react controls. */
  onToggleReaction?: (messageId: string, emoji: string) => void;
  /** Starts a quote-reply. Presence of this enables the reply control. */
  onReply?: (message: ChatMessage) => void;
  /** Pin/unpin. Absent means this viewer may not pin — the control is hidden. */
  onTogglePin?: (message: ChatMessage) => void;
  /** Message ids currently pinned in this channel. */
  pinnedMessageIds?: ReadonlySet<string>;
  /**
   * Scrolls to a quoted original. Omit and quotes render as a record of what
   * was said rather than a control that goes nowhere — which is the honest
   * shape when the original is outside the loaded window.
   */
  onJumpToMessage?: (messageId: string) => void;
  /**
   * People currently editing a document, keyed by documentId. Feeds the
   * document cards in the thread, which is where the difference between "a
   * document exists" and "two people are in it right now" shows up.
   */
  documentEditors?: (documentId: string) => readonly DocumentActivityEditor[];
  /**
   * Who is in a call right now, keyed by callId. Overrides the participant
   * list frozen into the message metadata, which is only a snapshot of the
   * moment the event was written — people join a call after it starts, and a
   * card showing the founding members while three more are inside is why you
   * would not bother joining.
   */
  callParticipants?: (callId: string) => readonly CallActivityParticipant[];
  /**
   * Joins a live call from the thread. Omit when the viewer cannot join —
   * the card then renders as a record rather than a dead button.
   */
  onJoinCall?: (callId: string) => void;
  /** Opens a document announced in the thread. */
  onOpenDocument?: (documentId: string) => void;
  /**
   * The message a jump just landed on. Highlighted so arriving somewhere in
   * the middle of a transcript says WHICH message you were sent to — without
   * it a jump scrolls and leaves you to guess. The caller clears it; the
   * panel does not own a timer.
   */
  highlightedMessageId?: string | null;
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
  attachmentSrc?: (attachment: ChatAttachment) => string | null | undefined;
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

/**
 * A document referenced by a message, whichever way it got there.
 *
 * Two features put a document into a conversation and each invented its own
 * metadata: the gateway announces a document CREATED in the channel as
 * `{ kind: 'document', documentId }`, and Share-to-room posts
 * `{ share: { kind: 'document', id, url } }`. They are the same fact —
 * "there is a document in this thread" — so they get the same card. Reading
 * both here rather than teaching each producer the other's shape keeps the
 * older wire format working unchanged.
 *
 * Returns null for anything that is not a document reference, including a
 * reference that names no document: a card with no target is an Open button
 * to nowhere.
 */
export function documentRefFromMetadata(
  metadata: Record<string, unknown> | undefined,
): { documentId: string; title: string; icon?: string } | null {
  if (!metadata) return null;

  if (metadata.kind === 'document' && typeof metadata.documentId === 'string' && metadata.documentId) {
    return {
      documentId: metadata.documentId,
      title: typeof metadata.title === 'string' ? metadata.title : '',
      icon: typeof metadata.icon === 'string' ? metadata.icon : undefined,
    };
  }

  const share = metadata.share as Record<string, unknown> | undefined;
  if (share && share.kind === 'document' && typeof share.id === 'string' && share.id) {
    return {
      documentId: share.id,
      title: typeof share.title === 'string' ? share.title : '',
      icon: typeof share.icon === 'string' ? share.icon : undefined,
    };
  }

  return null;
}

/**
 * A call event, read off a message's metadata.
 *
 * The sibling of documentRefFromMetadata, and the same idea: the server
 * writes a sentence for anywhere that renders plain text, and the metadata
 * carries the facts the thread renders as a card.
 *
 * Liveness is POSITIVE evidence only. A stored message is replayed forever,
 * so inferring "still going" from a missing `endedAt` would put a Join button
 * on every call that ever happened, and after a reload the thread would
 * cheerfully advertise a call that ended three hours ago. The gateway posts
 * this event when a call ENDS — the durable fact a transcript wants is that a
 * call happened, who was in it and how long it took. A host that genuinely
 * knows a call is live right now says so through ChatPanel's
 * `callParticipants`; nothing here guesses.
 */
/** Internal metadata keys, in the words a reader would use for them. */
const DROPPED_KEY_LABELS: Record<string, string> = {
  attachments: 'files',
  html: 'formatting',
  mentions: 'mentions',
  replyTo: 'the quoted reply',
};

/**
 * What the server could not fit in this message, if anything.
 *
 * Chat metadata has a size budget, and attachments share it with the rich
 * body, the mentions and the reply. Past the cap the server sheds the largest
 * keys and stamps `_truncated` / `_droppedKeys` on what survives.
 *
 * Rendering it is the whole point. Before this, an oversized send looked
 * IDENTICAL to a successful one — the text appeared, the three files the
 * sender had just watched upload were simply not there, and no part of the
 * product ever said so. A message that lost something has to admit it, or the
 * transcript is quietly lying about what was said.
 */
export function truncationFromMetadata(
  metadata: Record<string, unknown> | undefined,
): { droppedKeys: string[]; labels: string[] } | null {
  if (!metadata || metadata._truncated !== true) return null;
  const raw = Array.isArray(metadata._droppedKeys) ? metadata._droppedKeys : [];
  const droppedKeys = raw.filter((k): k is string => typeof k === 'string');
  // An older server stamps `_truncated` with no key list. Still worth saying
  // something happened — "part of this message" beats silence.
  return {
    droppedKeys,
    labels: droppedKeys.map((k) => DROPPED_KEY_LABELS[k] ?? k),
  };
}

export function callRefFromMetadata(
  metadata: Record<string, unknown> | undefined,
): {
  callId: string;
  live: boolean;
  durationMs?: number;
  audioOnly?: boolean;
  participants: CallActivityParticipant[];
} | null {
  if (!metadata || metadata.kind !== 'call') return null;
  const callId = typeof metadata.callId === 'string' ? metadata.callId : '';
  // A card with no call cannot be joined and cannot be identified.
  if (!callId) return null;

  const raw = Array.isArray(metadata.participants) ? metadata.participants : [];
  const participants: CallActivityParticipant[] = raw
    .map((entry) => {
      const p = entry as Record<string, unknown>;
      const userId = typeof p?.userId === 'string' ? p.userId : '';
      return userId
        ? {
            userId,
            displayName: typeof p.displayName === 'string' ? p.displayName : undefined,
          }
        : null;
    })
    .filter(Boolean) as CallActivityParticipant[];

  return {
    callId,
    // Only an explicit flag, never the absence of one.
    live: metadata.live === true,
    durationMs: typeof metadata.durationMs === 'number' ? metadata.durationMs : undefined,
    // Tri-state: absent means the record does not say, and the card renders
    // an unqualified "Call" rather than guessing which kind it was.
    audioOnly: typeof metadata.audioOnly === 'boolean' ? metadata.audioOnly : undefined,
    participants,
  };
}

export function ChatPanel({
  messages,
  onSend,
  disabled = false,
  onTyping,
  typingUsers = [],
  composer,
  currentUserId,
  reactionsFor,
  onToggleReaction,
  onReply,
  onTogglePin,
  pinnedMessageIds,
  onJumpToMessage,
  highlightedMessageId,
  documentEditors,
  callParticipants,
  onJoinCall,
  onOpenDocument,
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
  /** True once the list has content scrolled above the top edge. */
  const [scrolledFromTop, setScrolledFromTop] = useState(false);
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
    // Only fade when there is something above to fade INTO. At the top of a
    // short thread the oldest message is fully visible and washing it out
    // would be a lie about there being more.
    setScrolledFromTop(el.scrollTop > 8);
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
      // Recomputed here as well as in onScroll: the jump to the bottom is
      // PROGRAMMATIC, and the first render of a long thread lands scrolled
      // without the user ever having scrolled — so the handler that would
      // have noticed never ran and the top edge stayed hard.
      setScrolledFromTop(el.scrollTop > 8);
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
          className={cn(
            'scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col',
            // A long thread runs off the top edge with a hard cut. The mask
            // softens the oldest visible messages so the list reads as
            // continuing rather than as starting there.
            //
            // A mask rather than an overlay gradient: an overlay has to be
            // painted in the pane's own background colour, which is wrong the
            // moment the surface is dark or tinted. A mask fades the content
            // itself and is correct on any background.
            scrolledFromTop && 'fade-top',
            fills ? 'min-h-0 flex-1' : 'max-h-[200px]',
          )}
        >
          {/* A short thread belongs at the BOTTOM of the pane, against the
              composer, not stranded at the top with four hundred pixels of
              empty white under it — which is what a channel with two messages
              in it looked like. `mt-auto` on a single wrapper does that and
              nothing else: with slack it pushes the content down, and once the
              thread overflows the auto margin resolves to zero and the list
              scrolls normally. (`justify-end` on the scroller itself would
              make the oldest messages unreachable.) */}
          <div className="mt-auto">
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
              // `metadata.html` is the composer's rich body. Rendering
              // `content` alone threw away every link, bold run and mention the
              // sender created — MessageBody restores them, from an allow-list,
              // because a message body is attacker-controlled text.
              const rich = message.metadata?.html;
              const richHtml = typeof rich === 'string' ? rich : undefined;
              const text = <MessageBody html={richHtml} text={message.content} />;

              // A document event is not a message with a document mentioned in
              // it — it IS the document, so the card replaces the text rather
              // than sitting under it. The sentence the server wrote stays in
              // the stored message for anywhere that renders plain text
              // (notification previews, the conversation list) but the thread
              // shows the thing itself.
              const docRef = documentRefFromMetadata(message.metadata);

              // Same rule for a call: the event IS the call, so the card
              // replaces the text. Unlike a document, a call CHANGES while
              // the thread is open — live it is an invitation, ended it is a
              // record — which is why one card renders both states in place
              // rather than the transcript swapping rows underneath a reader.
              const callRef = callRefFromMetadata(message.metadata);
              const truncation = truncationFromMetadata(message.metadata);

              const body = callRef ? (
                <CallActivityCard
                  callId={callRef.callId}
                  startedBy={
                    (typeof message.metadata?.displayName === 'string'
                      ? message.metadata.displayName
                      : undefined)
                    ?? message.displayName
                  }
                  participants={callParticipants?.(callRef.callId) ?? callRef.participants}
                  live={callRef.live}
                  durationMs={callRef.durationMs}
                  audioOnly={callRef.audioOnly}
                  onJoin={onJoinCall}
                />
              ) : docRef ? (
                <DocumentActivityCard
                  documentId={docRef.documentId}
                  title={docRef.title || message.content}
                  icon={docRef.icon}
                  createdBy={
                    (typeof message.metadata?.displayName === 'string'
                      ? message.metadata.displayName
                      : undefined)
                    ?? message.displayName
                  }
                  editors={documentEditors?.(docRef.documentId) ?? []}
                  onOpen={onOpenDocument}
                />
              ) : files.length === 0 ? (
                  text
                ) : (
                  <>
                    {(message.content || richHtml) && text}
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
              const messageId = message.id ?? '';
              const reactions = messageId && reactionsFor ? reactionsFor(messageId) : [];
              const quoted = message.metadata?.replyTo as
                | { messageId: string; author: string; text: string; timestamp?: string }
                | undefined;
              const isPinned = !!messageId && !!pinnedMessageIds?.has(messageId);
              // Matched on the AUTHENTICATED user id, never on clientId: a
              // clientId is per-connection and changes on every reconnect, so
              // keying on it would make your own messages stop being yours
              // halfway up the thread.
              const isMine =
                !!currentUserId && (message as { userId?: string }).userId === currentUserId;

              // The quote, the message, its reactions — one unit. Rendering
              // them as siblings of the row would let a reaction drift away
              // from the message it belongs to when the list reflows.
              const withInteractions = (
                <>
                  {quoted && (
                    <QuoteBlock
                      quote={quoted}
                      onJump={onJumpToMessage}
                      className="mb-1"
                    />
                  )}
                  {isPinned && (
                    <span className="mb-0.5 block text-[11px] text-text-tertiary" data-testid="pinned-marker">
                      📌 Pinned
                    </span>
                  )}
                  {body}
                  {truncation && (
                    <div
                      data-testid="message-truncated"
                      className="mt-1 text-[11px] text-warning-fg"
                    >
                      ⚠{' '}
                      {truncation.labels.length > 0
                        ? `Too large to send: ${truncation.labels.join(', ')}`
                        : 'Part of this message was too large to send'}
                    </div>
                  )}
                  {reactions.length > 0 && currentUserId && onToggleReaction && (
                    <ReactionChips
                      reactions={reactions}
                      currentUserId={currentUserId}
                      onToggle={(emoji) => onToggleReaction(messageId, emoji)}
                    />
                  )}
                </>
              );

              return (
                <div
                  key={message.id ?? index}
                  data-testid="chat-message"
                  data-message-id={messageId || undefined}
                  // `group` drives the hover reveal; `focus-within` is what
                  // keeps the bar reachable without a pointer.
                  className={cn(
                    'group relative rounded-md',
                    // `ring-inset`: an outset ring is drawn OUTSIDE the row's
                    // box, and the scroll container clips overflow — so the
                    // right edge of the highlight was cut off against the
                    // pane boundary. Inset draws it within the row's own
                    // bounds, which nothing can clip.
                    messageId && messageId === highlightedMessageId &&
                      'bg-surface-inset ring-1 ring-inset ring-primary transition-colors',
                  )}
                >
                  <MessageRow
                    author={author}
                    content={withInteractions}
                    timestamp={message.timestamp}
                    avatarUrl={message.avatarUrl}
                    tone={tone}
                    // Own messages flip side and take a tinted bubble. Matched
                    // on the AUTHENTICATED user id, never on clientId: a
                    // clientId is per-connection and changes on every
                    // reconnect, so keying on it would make your own messages
                    // stop being yours halfway up the thread.
                    mine={isMine}
                  />
                  {messageId && (onToggleReaction || onReply || onTogglePin) && (
                    <MessageActionBar
                      // Positioned against the MESSAGE COLUMN's left edge, not
                      // the row's right. Pinning it right put the controls for
                      // "asdasdf" three hundred pixels away from the word they
                      // act on, across empty space, with a different message's
                      // bar directly above them — so the bar you were aiming
                      // for was ambiguous at the moment you reached for it.
                      // `left-14` clears the avatar gutter; `-top-3` lifts it
                      // onto the row's top edge so it overlaps the gap rather
                      // than the text.
                      //
                      // `group-has-[:focus-visible]` rather than
                      // `group-focus-within`: focus-within is true after a
                      // MOUSE click too, so clicking a reaction left that row's
                      // bar stuck open after the pointer moved away — two bars
                      // on screen at once, one of them for a message you were
                      // no longer pointing at. focus-visible is keyboard-only,
                      // which is the case the reveal-on-focus exists for.
                      className={cn(
                        'absolute -top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100',
                        // Mirrors with the message. Own messages moved to the
                        // right side, and a bar hard-coded to the left put the
                        // controls for a message on one edge of the pane and
                        // the message it acts on at the other.
                        isMine ? 'right-14' : 'left-14',
                      )}
                      onReact={onToggleReaction ? (e) => onToggleReaction(messageId, e) : undefined}
                      onReply={onReply ? () => onReply(message) : undefined}
                      onTogglePin={onTogglePin ? () => onTogglePin(message) : undefined}
                      pinned={isPinned}
                    />
                  )}
                </div>
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
