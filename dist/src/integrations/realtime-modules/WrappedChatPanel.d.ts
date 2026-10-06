import type { ReactNode } from 'react';
import type { RMUseChatReturn, RMUsePresenceReturn, RMUseReactionsReturn, RMUseFileUploadReturn as RMUseFileUploadHookReturn } from './types';
import type { ChatPanelProps, LocalChatMessage } from '../../components/social/ChatPanel';
import type { ChatMessage } from '../../hooks/useChat';
import type { ChatAttachment, ChatTransfer } from '../../components/social/ChatAttachment';
import { type NetworkShimOptions } from './networkShim';
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
    upload: (file: File, opts?: {
        metadata?: Record<string, unknown>;
    }) => Promise<unknown>;
    cancelTransfer: (transferId: string) => void;
}
/** What `usePins(channel)` from realtime-modules returns, restated. */
export interface RMUsePinsReturn {
    /** Ids only — what a message list needs to mark a message as pinned. */
    pinnedIds: Set<string>;
    pin: (input: {
        messageId: string;
        text: string;
        author: string;
    }) => Promise<void>;
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
    composer?: ReactNode;
    /** Host-resolved references rendered after each adapted message. */
    renderMessageReferences?: ChatPanelProps['renderMessageReferences'];
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
}
export declare function WrappedChatPanel({ chat, localMessages, presence, upload, reactions, pins, currentActor, currentUserId, displayName, avatarUrl, sendMetadata, publishTyping, attachmentSrc, onOpenAttachment, acceptFiles, maxFileSize, onFileError, disabled, typingUsers: typingUsersOverride, tone, fill, showHeader, loadMoreHistory, joinHistoryLimit, historyPageSize, onLoadMore, hasMore, loadingMore, composer, renderMessageReferences, emojis, onReply, reply, onCancelReply, readReceipts, readReceiptsEnabled, unreadFrom, threaded, onJumpToMessage, highlightedMessageId, documentEditors, callParticipants, onJoinCall, onOpenDocument, wrapWithNetworkShim, }: WrappedChatPanelProps): import("react").JSX.Element;
//# sourceMappingURL=WrappedChatPanel.d.ts.map