// src/integrations/realtime-modules/WrappedChatPanel.tsx
//
// ChatPanel wired directly to a useChat() hook return from realtime-modules.
// Caller passes the `chat` object; this component handles field adaptation.
//
// It also binds useFileUpload when one is supplied, which is what turns the
// presentational attachment/transfer components into a working feature. The
// binding is the whole reason this integration layer exists: ChatPanel must
// not know about a gateway, and the hook must not know about a bubble.
//
// ## Why this file keeps growing
//
// This is one of TWO implementations of the same wiring. The app in
// realtime-examples hand-wires the same hooks to the same panel, and every
// prop it passes that this component cannot is a feature an embedder silently
// does not get — with nothing failing, nothing type-erroring, and no test
// going red, because the app's tests exercise the app's wiring. Reactions,
// pins, typing publication and "load earlier" were each in that state. When
// the app learns to pass something ChatPanel reads, it belongs here too.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type {
  RMUseChatReturn,
  RMUsePresenceReturn,
  RMUseReactionsReturn,
  RMUseFileUploadReturn as RMUseFileUploadHookReturn,
} from './types';
import { adaptChatMessages, adaptMessageReactions } from './adapters';
import { ChatPanel } from '../../components/social/ChatPanel';
import type { ChatPanelProps, LocalChatMessage } from '../../components/social/ChatPanel';
import type { ChatMessage } from '../../hooks/useChat';
import type { ChatAttachment, ChatTransfer } from '../../components/social/ChatAttachment';
import { applyNetworkShim, type NetworkShimOptions } from './networkShim';

/**
 * The shape of `useFileUpload(channel)` from realtime-modules, restated
 * structurally so this package keeps zero runtime dependency on it (the same
 * convention the other Wrapped* components follow).
 *
 * @deprecated Prefer `RMUseFileUploadReturn` from `./types`, which is the full
 * hook shape. This narrower alias existed under the SAME NAME as that one, in
 * the same folder, describing a different subset of the same hook — so which
 * fields a caller was expected to supply depended on which file they happened
 * to import from. Kept only so existing imports keep resolving.
 */
export interface RMUseFileUploadReturn {
  transfers: ChatTransfer[];
  upload: (file: File, opts?: { metadata?: Record<string, unknown> }) => Promise<unknown>;
  cancelTransfer: (transferId: string) => void;
}

/** What `usePins(channel)` from realtime-modules returns, restated. */
export interface RMUsePinsReturn {
  /** Ids only — what a message list needs to mark a message as pinned. */
  pinnedIds: Set<string>;
  pin: (input: { messageId: string; text: string; author: string }) => Promise<void>;
  unpin: (messageId: string) => Promise<void>;
}

/**
 * A view-only message. With `body` it renders as a private card (the node, or
 * what the function returns) with the "Only you can see this" note and its
 * `actions`, in timestamp order; `content` stays the plain-text summary.
 * Without `body` it is an ordinary transcript row. Since 2.413.0.
 */
export type WrappedLocalMessage = ChatMessage & {
  body?: ReactNode | (() => ReactNode);
  actions?: LocalChatMessage['actions'];
  note?: string;
};

export interface WrappedChatPanelProps {
  /** Return value of useChat(channel) from realtime-modules */
  chat: RMUseChatReturn;
  /** Optional presence hook return — used to derive typingUsers */
  presence?: RMUsePresenceReturn;
  /**
   * Messages that exist only in this view and are merged into the transcript
   * by timestamp: a "Huddle started" notice, an optimistic send, a local
   * agent reply. Not sent anywhere. One whose `id` the channel's own history
   * also holds is dropped, so an optimistic message gives way to its echo.
   */
  localMessages?: readonly WrappedLocalMessage[];
  /**
   * Return value of useFileUpload(channel). Supplying it enables drag-drop,
   * paste and the paperclip, and renders every in-flight transfer in the
   * channel — including other participants'. Omit it and the panel shows no
   * attachment affordances at all.
   */
  upload?: RMUseFileUploadReturn | RMUseFileUploadHookReturn;
  /**
   * Return value of useReactions(channel). Supplying it turns on reaction
   * chips: grouped, counted, and toggleable.
   *
   * Requires `currentUserId` to be meaningful — a chip is a toggle, and which
   * way it goes depends on whether YOU already placed that emoji. Without the
   * viewer's id the panel can render counts but cannot answer "did I react?",
   * so the controls stay off rather than lying.
   */
  reactions?: RMUseReactionsReturn;
  /**
   * Return value of usePins(channel). Supplying it renders the pinned state on
   * each message and offers the pin control. Omit it and pinning is absent
   * rather than broken — which is the right shape for a call scratchpad, where
   * there is no channel state for a pin to outlive.
   */
  pins?: RMUsePinsReturn;
  /** Identifies the viewer so their own transfers get a cancel button. */
  currentActor?: string;
  /**
   * The viewer's AUTHENTICATED user id — what makes their own messages theirs.
   *
   * Distinct from `currentActor`, which identifies a transfer's owner. This is
   * the id ChatPanel compares against each message's `userId` to decide "is
   * this mine", which drives own-message treatment. Without it every message
   * in an embedded transcript reads as somebody else's, including yours, and
   * no styling on the host's side can fix that — the panel simply has nothing
   * to compare.
   */
  currentUserId?: string;
  /**
   * Stamped onto every message this viewer sends.
   *
   * The gateway does not invent a display name, so a message sent without one
   * arrives at every recipient with no name and no face — and the sender
   * cannot see that, because their own row is the one place the panel does not
   * need it. `sendMetadata` merges on top for anything else the host wants to
   * carry (a reply quote, a client tag).
   */
  displayName?: string;
  avatarUrl?: string;
  /** Extra metadata merged into every outgoing message. */
  sendMetadata?: Record<string, unknown>;
  /**
   * Publish this viewer's typing state onto presence, so OTHER participants
   * see the banner this component already knows how to render for them.
   *
   * Default true when `presence` is supplied: reading the roster's `isTyping`
   * while never writing your own is the asymmetry that makes a typing
   * indicator look broken to exactly one person in the conversation — you.
   */
  publishTyping?: boolean;
  /**
   * Resolves an attachment to a renderable image src. The gateway's download
   * route is bearer-authenticated, so an `<img>` pointed at the raw URL 401s;
   * the host supplies an object URL (see useAttachmentSrc).
   */
  attachmentSrc?: (attachment: ChatAttachment) => string | null | undefined;
  onOpenAttachment?: (attachment: ChatAttachment) => void;
  acceptFiles?: string;
  maxFileSize?: number;
  onFileError?: (message: string) => void;
  /** Forwarded to ChatPanel */
  disabled?: boolean;
  /** Override typing banner (supersedes presence-derived list) */
  typingUsers?: string[];
  /** Forwarded to ChatPanel — 'dark' for call chrome surfaces. */
  tone?: 'light' | 'dark';
  /** Forwarded to ChatPanel — fill the parent's height. */
  fill?: boolean;
  /** Forwarded to ChatPanel — full-width custom composer in a filling pane. */
  flushComposer?: boolean;
  contentAlign?: 'start' | 'end';
  /** Forwarded to ChatPanel — suppress its own "Chat (n)" heading when the
   *  host already names the region. */
  showHeader?: boolean;
  /**
   * Turn on "Load earlier messages", backed by `chat.loadHistory`.
   *
   * Off by default, because the paging below only makes sense against a
   * gateway that HAS a history store, and a button that reloads the same
   * twenty messages forever is worse than no button. Where history exists it
   * is a straight drop of a feature the hook always had and this component
   * never called — an embedded transcript began at whatever the join replayed
   * and could not be scrolled back past it.
   *
   * `chat.loadHistory(limit)` REPLACES the window rather than prepending a
   * page, so paging means asking for a bigger window each time — the same
   * shape the app uses. A short answer means the start of the thread.
   */
  loadMoreHistory?: boolean;
  /** Messages the gateway pushes on join (its CHAT_JOIN_HISTORY_LIMIT). */
  joinHistoryLimit?: number;
  /** How many more to ask for on each press. */
  historyPageSize?: number;
  /** Override the paging above entirely. */
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;

  // ── Host-owned surfaces ─────────────────────────────────────────────────
  // ChatPanel reads these and nothing in the hook layer can supply them: they
  // need the host's router, its document store, its live call state. They are
  // forwarded rather than omitted so an embedder is not forced to abandon this
  // component the moment they want one of them.
  composer?: ReactNode;
  /** Host-resolved references rendered after each adapted message. */
  renderMessageReferences?: ChatPanelProps['renderMessageReferences'];
  /**
   * Last word on the thread's messages after they are adapted (2.477.0): a
   * host merges its own entries in, e.g. a meeting's announcements with
   * `useMeetingChat(...).withAnnouncements`. Must be stable or cheap.
   */
  transformMessages?: (messages: ChatMessage[]) => ChatMessage[];
  /** Pinned above the composer (ChatPanel `dock`), e.g. `useMeetingChat`'s dock. Since 2.477.0. */
  dock?: ChatPanelProps['dock'];
  emojis?: readonly string[];
  onReply?: (message: ChatMessage) => void;
  /**
   * The message currently being answered, shown as a dismissible quote above
   * the built-in input row (pair with `onReply`). The host also stamps
   * `replyTo` into `sendMetadata` so the sent message carries it. Ignored when
   * `composer` is supplied.
   */
  reply?: ChatPanelProps['reply'];
  onCancelReply?: () => void;
  /**
   * Who has read up to the newest message. Forwarded to ChatPanel, which draws
   * one "Seen by" line. Feed it from `useChatReadReceipts(channel, ...)`
   * (realtime-examples `DocumentChatPanel.tsx:416`, named at `:625`,
   * passed at `:855`).
   */
  readReceipts?: ChatPanelProps['readReceipts'];
  /** False when the server keeps no receipts here: renders nothing. Default true. */
  readReceiptsEnabled?: boolean;
  /** ISO timestamp of the viewer's own read cursor: draws the "new" line. */
  unreadFrom?: string;
  /** Nest replies under their root message (realtime-examples `DocumentChatPanel.tsx:856`). */
  threaded?: boolean;
  /** ChatPanel `postRhythm`: `chat` groups a person's consecutive posts in threaded mode (2.480.2). */
  postRhythm?: ChatPanelProps['postRhythm'];
  onJumpToMessage?: (messageId: string) => void;
  highlightedMessageId?: string | null;
  documentEditors?: ChatPanelProps['documentEditors'];
  callParticipants?: ChatPanelProps['callParticipants'];
  onJoinCall?: (callId: string) => void;
  onOpenDocument?: (documentId: string) => void;
  /**
   * Opt-in: wrap the rendered ChatPanel in a NetworkErrorBoundary +
   * ReconnectingShim using the supplied connection state and retry
   * callback. Omit for no wrapping (default).
   */
  wrapWithNetworkShim?: NetworkShimOptions;
  /**
   * Edit / delete through `chat.editMessage` / `chat.deleteMessage`. On by
   * default when the hook has them; `false` turns the controls off. Since
   * 2.424.0. The gateway stays the authority (its `authorize` and an
   * author-only check run on every edit/delete), so this only decides what the
   * UI OFFERS.
   */
  editable?: boolean;
  /** Who gets an Edit control. Default: the viewer's own messages. Replaces that default. */
  canEdit?: (message: ChatMessage) => boolean;
  /** Who gets a Delete control. Default: own messages; a moderator-grant host widens it. */
  canDelete?: (message: ChatMessage) => boolean;
  /** Forwarded to ChatPanel: the hover bar's Forward, with the trigger for a picker. */
  onForwardMessage?: ChatPanelProps['onForwardMessage'];
}

export function WrappedChatPanel({
  chat,
  localMessages,
  presence,
  upload,
  reactions,
  pins,
  currentActor,
  currentUserId,
  displayName,
  avatarUrl,
  sendMetadata,
  publishTyping,
  attachmentSrc,
  onOpenAttachment,
  acceptFiles,
  maxFileSize,
  onFileError,
  disabled,
  typingUsers: typingUsersOverride,
  tone,
  fill,
  flushComposer,
  contentAlign,
  showHeader,
  loadMoreHistory = false,
  joinHistoryLimit = 20,
  historyPageSize = 50,
  onLoadMore,
  hasMore,
  loadingMore,
  composer,
  renderMessageReferences,
  transformMessages,
  dock,
  emojis,
  onReply,
  reply,
  onCancelReply,
  readReceipts,
  readReceiptsEnabled,
  unreadFrom,
  threaded,
  postRhythm,
  onJumpToMessage,
  highlightedMessageId,
  documentEditors,
  callParticipants,
  onJoinCall,
  onOpenDocument,
  wrapWithNetworkShim,
  editable = true,
  canEdit,
  canDelete,
  onForwardMessage,
}: WrappedChatPanelProps) {
  const adaptedMessages = useMemo(() => adaptChatMessages(chat.messages), [chat.messages]);
  // Local messages with a `body` are private cards; ChatPanel orders them.
  const cardMessages = useMemo<LocalChatMessage[]>(() => {
    if (!localMessages?.length) return [];
    const held = new Set(adaptedMessages.flatMap((m) => (m.id ? [m.id] : [])));
    const seen = new Set<string>();
    const out: LocalChatMessage[] = [];
    for (const m of localMessages) {
      if (m.body === undefined) continue;
      if (m.id) {
        if (held.has(m.id) || seen.has(m.id)) continue;
        seen.add(m.id);
      }
      out.push({
        id: m.id ?? '',
        timestamp: m.timestamp,
        displayName: m.displayName ?? 'You',
        content: m.content,
        body: m.body,
        metadata: {},
        ...(m.actions ? { actions: m.actions } : {}),
        ...(m.note !== undefined ? { note: m.note } : {}),
      });
    }
    return out;
  }, [adaptedMessages, localMessages]);
  const messages = useMemo(() => {
    const adapted = adaptedMessages;
    if (!localMessages?.length) return adapted;
    const held = new Set(adapted.flatMap((m) => (m.id ? [m.id] : [])));
    const extra = localMessages.filter((m) => m.body === undefined && (!m.id || !held.has(m.id)));
    if (extra.length === 0) return adapted;
    // A stable merge: ties keep the channel's messages first.
    return [...adapted, ...extra]
      .map((m, i) => ({ m, i }))
      .sort((a, b) => (Date.parse(a.m.timestamp) - Date.parse(b.m.timestamp)) || a.i - b.i)
      .map(({ m }) => m);
  }, [adaptedMessages, localMessages]);

  // Derive typing users from presence roster when available. Exclude the
  // viewer: their own name in the banner reads as a bug, and it appears the
  // moment this component starts publishing typing state below.
  const typingUsers: string[] =
    typingUsersOverride ??
    (presence?.roster
      .filter((u) => {
        if (u.metadata?.isTyping !== true) return false;
        const uid = u.metadata?.userId;
        if (currentUserId && typeof uid === 'string') return uid !== currentUserId;
        return currentActor ? u.clientId !== currentActor : true;
      })
      .map(
        (u) =>
          (u.metadata?.displayName as string | undefined) ??
          u.clientId.slice(0, 8),
      ) ?? []);

  // ── Outbound: carry the sender's identity ────────────────────────────────
  const sendMessage = chat.sendMessage;
  const handleSend = useCallback(
    (content: string) => {
      const metadata: Record<string, unknown> = { ...(sendMetadata ?? {}) };
      if (displayName) metadata.displayName = displayName;
      if (avatarUrl) metadata.avatarUrl = avatarUrl;
      if (Object.keys(metadata).length > 0) sendMessage(content, metadata);
      else sendMessage(content);
    },
    [sendMessage, sendMetadata, displayName, avatarUrl],
  );

  // ── Typing: publish as well as read ──────────────────────────────────────
  const updateMetadata = presence?.updateMetadata;
  const shouldPublishTyping = (publishTyping ?? true) && !!updateMetadata;
  const handleTyping = useCallback(
    (isTyping: boolean) => updateMetadata?.({ isTyping }),
    [updateMetadata],
  );

  // ── History ──────────────────────────────────────────────────────────────
  // `loadHistory(limit)` replaces the window, so each press asks for a bigger
  // one. A full window back means there may be more behind it; a short one
  // means we have reached the start of the thread.
  const loadHistory = chat.loadHistory;
  const [requestedLimit, setRequestedLimit] = useState(joinHistoryLimit);
  const [autoLoadingMore, setAutoLoadingMore] = useState(false);
  const messageCount = chat.messages.length;
  const settledAt = useRef(messageCount);
  useEffect(() => {
    if (messageCount !== settledAt.current) {
      settledAt.current = messageCount;
      setAutoLoadingMore(false);
    }
  }, [messageCount]);

  // The limit also lives in a ref so the click handler can read it without a
  // stale closure and without doing the request INSIDE a state updater, which
  // React is free to invoke twice.
  const limitRef = useRef(requestedLimit);
  limitRef.current = requestedLimit;
  const handleLoadMore = useCallback(() => {
    const next = limitRef.current + historyPageSize;
    limitRef.current = next;
    setRequestedLimit(next);
    setAutoLoadingMore(true);
    loadHistory(next);
  }, [loadHistory, historyPageSize]);

  const loadMoreProps: Pick<ChatPanelProps, 'onLoadMore' | 'hasMore' | 'loadingMore'> =
    onLoadMore
      ? { onLoadMore, hasMore, loadingMore }
      : loadMoreHistory
        ? {
            onLoadMore: handleLoadMore,
            hasMore: hasMore ?? messageCount >= requestedLimit,
            loadingMore: loadingMore ?? autoLoadingMore,
          }
        : {};

  // ── Reactions ────────────────────────────────────────────────────────────
  // Chips need a viewer to be a toggle. `toggle` is optional on the hook
  // mirror (an older realtime-modules has react/unreact only), so fall back
  // rather than render a control that throws.
  const reactionsFor = useMemo(
    () =>
      reactions
        ? (messageId: string) => adaptMessageReactions(reactions, messageId)
        : undefined,
    [reactions],
  );
  const onToggleReaction = useMemo(() => {
    if (!reactions || !currentUserId) return undefined;
    const { toggle, react, unreact } = reactions;
    if (toggle) {
      return (messageId: string, emoji: string) =>
        toggle(emoji, { targetId: messageId, userId: currentUserId });
    }
    return (messageId: string, emoji: string) => {
      const mine = adaptMessageReactions(reactions, messageId).some(
        (r) => r.emoji === emoji && r.userId === currentUserId,
      );
      if (mine && unreact) unreact(emoji, { targetId: messageId });
      else react(emoji, { targetId: messageId });
    };
  }, [reactions, currentUserId]);

  // ── Pins ─────────────────────────────────────────────────────────────────
  const onTogglePin = useCallback(
    (m: ChatMessage) => {
      if (!pins) return;
      const messageId = m.id ?? '';
      if (!messageId) return;
      if (pins.pinnedIds.has(messageId)) void pins.unpin(messageId);
      else
        void pins.pin({
          messageId,
          text: m.content,
          author: m.displayName ?? 'Unknown',
        });
    },
    [pins],
  );

  // ── Edit / delete ────────────────────────────────────────────────────────
  const editMessage = chat.editMessage;
  const deleteMessage = chat.deleteMessage;
  const onEditMessage = useCallback(
    (m: ChatMessage, text: string) => {
      const next = text.trim();
      if (!m.id || !next) return;
      // The thread renders `metadata.html` over the plain text, so an edit that
      // changed only the words would keep showing the old ones. The inline
      // editor is plain text: send matching html (what realtime-examples does).
      const html = `<p>${next.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</p>`;
      editMessage?.(m.id, next, { html });
    },
    [editMessage],
  );
  const onDeleteMessage = useCallback(
    (m: ChatMessage) => {
      if (m.id) deleteMessage?.(m.id);
    },
    [deleteMessage],
  );

  const panel = (
    <ChatPanel
      messages={transformMessages ? transformMessages(messages) : messages}
      {...(cardMessages.length ? { localMessages: cardMessages } : {})}
      {...(dock !== undefined ? { dock } : {})}
      onSend={handleSend}
      disabled={disabled}
      typingUsers={typingUsers}
      tone={tone}
      fill={fill}
      flushComposer={flushComposer}
      contentAlign={contentAlign}
      showHeader={showHeader}
      composer={composer}
      emojis={emojis}
      {...loadMoreProps}
      {...(shouldPublishTyping ? { onTyping: handleTyping } : {})}
      {...(upload
        ? {
            onSendFiles: (files: File[]) => {
              // One transfer per file. They are independent — a 4 MB photo
              // must not wait behind a 20 MB one, and one failing must not
              // take the others down with it.
              for (const file of files) void upload.upload(file);
            },
            transfers: upload.transfers as ChatTransfer[] | undefined,
            onCancelTransfer: upload.cancelTransfer,
          }
        : {})}
      currentActor={currentActor}
      currentUserId={currentUserId}
      reactionsFor={reactionsFor}
      onToggleReaction={onToggleReaction}
      {...(pins
        ? { pinnedMessageIds: pins.pinnedIds, onTogglePin }
        : {})}
      {...(editable && editMessage ? { onEditMessage, ...(canEdit ? { canEditMessage: canEdit } : {}) } : {})}
      {...(editable && deleteMessage ? { onDeleteMessage, ...(canDelete ? { canDeleteMessage: canDelete } : {}) } : {})}
      onForwardMessage={onForwardMessage}
      onReply={onReply}
      reply={reply}
      onCancelReply={onCancelReply}
      readReceipts={readReceipts}
      readReceiptsEnabled={readReceiptsEnabled}
      unreadFrom={unreadFrom}
      threaded={threaded}
      {...(postRhythm ? { postRhythm } : {})}
      onJumpToMessage={onJumpToMessage}
      highlightedMessageId={highlightedMessageId}
      documentEditors={documentEditors}
      callParticipants={callParticipants}
      onJoinCall={onJoinCall}
      onOpenDocument={onOpenDocument}
      renderMessageReferences={renderMessageReferences}
      attachmentSrc={attachmentSrc}
      onOpenAttachment={onOpenAttachment}
      acceptFiles={acceptFiles}
      maxFileSize={maxFileSize}
      onFileError={onFileError}
    />
  );

  return <>{applyNetworkShim(panel, wrapWithNetworkShim)}</>;
}
