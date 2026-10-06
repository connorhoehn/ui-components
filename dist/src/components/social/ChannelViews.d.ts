import { type ChatAttachment } from './ChatAttachment';
export interface PinnedMessageItem {
    messageId: string;
    /** Who wrote the message. */
    author: string;
    /** Short excerpt of it — the panel never re-reads the transcript. */
    preview: string;
    /** ISO-8601: when it was PINNED. The byline's business, not the stamp's. */
    pinnedAt?: string;
    /**
     * ISO-8601: when the message was SENT.
     *
     * What the stamp shows, because a pinned entry is a handle on a message and
     * the reader's next move is to find it in the transcript — where it is
     * stamped with this. Showing the pin time instead made one message read as
     * two different messages depending on which panel you were in.
     *
     * Optional: pins written before the store denormalised it have none, and
     * those fall back to `pinnedAt` rather than losing their stamp.
     */
    sentAt?: string;
    /** Display name of whoever pinned it. */
    pinnedBy?: string;
}
export interface PinnedMessagesPanelProps {
    pins: readonly PinnedMessageItem[];
    onJump?: (messageId: string) => void;
    /** Omit to render a read-only panel — e.g. for someone who may not unpin. */
    onUnpin?: (messageId: string) => void;
    className?: string;
    'data-testid'?: string;
}
export declare function PinnedMessagesPanel({ pins, onJump, onUnpin, className, 'data-testid': testId, }: PinnedMessagesPanelProps): import("react").JSX.Element;
export interface ChannelFileItem {
    /** The message the file arrived on — what the row jumps back to. */
    messageId: string;
    attachment: ChatAttachment;
    author: string;
    /** ISO-8601 of the message. */
    sentAt?: string;
}
export interface ChannelFilesPanelProps {
    files: readonly ChannelFileItem[];
    /**
     * Resolves a displayable image source. The download route is authenticated,
     * so `attachment.url` in an <img> would 401 — the integration layer hands
     * back a resolved object URL. Falling back to the inline preview keeps the
     * thumbnail honest while the real bytes are still being fetched.
     */
    thumbnailSrc?: (a: ChatAttachment) => string | null | undefined;
    onJump?: (messageId: string) => void;
    className?: string;
    'data-testid'?: string;
}
export declare function ChannelFilesPanel({ files, thumbnailSrc, onJump, className, 'data-testid': testId, }: ChannelFilesPanelProps): import("react").JSX.Element;
/**
 * One time you were named, in a CHANNEL. Named `ChannelMention…` because the
 * library already has a `MentionItem` for the other kind — being named in a
 * document comment — and those two are not interchangeable: one points at a
 * message in a conversation, the other at a comment on a section.
 */
export interface ChannelMentionItem {
    messageId: string;
    /** Channel the mention happened in — the id used to navigate. */
    channel: string;
    /** Human-readable channel name. Falls back to the id when absent. */
    channelLabel?: string;
    author: string;
    /** The message text, trimmed by the caller if it is long. */
    excerpt: string;
    /** ISO-8601. */
    at?: string;
    /** Unread mentions are the ones that still need you. */
    unread?: boolean;
}
export interface ChannelMentionsPanelProps {
    mentions: readonly ChannelMentionItem[];
    /** Jump takes both, because a mention can be in a channel you are not in. */
    onJump?: (channel: string, messageId: string) => void;
    className?: string;
    'data-testid'?: string;
}
export declare function ChannelMentionsPanel({ mentions, onJump, className, 'data-testid': testId, }: ChannelMentionsPanelProps): import("react").JSX.Element;
export interface ChannelRecordingItem {
    recordingId: string;
    /** ISO-8601 of when the call started. */
    startedAt?: string;
    /** Length of the recorded media, in milliseconds. */
    durationMs?: number;
    /** Distinct PEOPLE on the call, not sessions — rejoins are not extra heads. */
    participantCount?: number;
    participants?: Array<{
        userId: string;
        displayName?: string;
    }>;
    thumbnailUrl?: string;
    /**
     * Whether the recording can actually be played. A row that opens a player
     * showing nothing is worse than a row that says the recording is still
     * being assembled.
     */
    playable?: boolean;
}
export interface ChannelRecordingsPanelProps {
    recordings: readonly ChannelRecordingItem[];
    onOpen?: (recordingId: string) => void;
    className?: string;
    'data-testid'?: string;
}
/** "12:04" / "1:02:11" — a duration people read, not a millisecond count. */
export declare function formatDuration(ms?: number): string;
export declare function ChannelRecordingsPanel({ recordings, onOpen, className, 'data-testid': testId, }: ChannelRecordingsPanelProps): import("react").JSX.Element;
export interface ChannelDocumentItem {
    documentId: string;
    title: string;
    /** Emoji or short glyph from the document's type. */
    icon?: string;
    /** Display name of whoever created it. */
    createdBy?: string;
    /** ISO-8601 of the last edit — what people scan this list by. */
    updatedAt?: string;
    /** People with the document open right now. */
    activeEditors?: number;
}
export interface ChannelDocumentsPanelProps {
    documents: readonly ChannelDocumentItem[];
    onOpen?: (documentId: string) => void;
    /** Omit for a viewer who may not create documents here. */
    onCreate?: () => void;
    /**
     * Start a WHITEBOARD here, beside the document.
     *
     * The two are different authoring surfaces, not one with a setting: a
     * document is a page you write down, a whiteboard is an infinite canvas you
     * draw on with other people. The product had both and a conversation could
     * only ever start the first, so the canvas was unreachable from the place
     * people actually decide to sketch something.
     *
     * Omit for a viewer who may not create one.
     */
    onCreateWhiteboard?: () => void;
    /**
     * The files shared in the conversation, listed WITH the documents.
     *
     * To the people in a conversation a PDF someone dropped in and a page the
     * agent wrote are the same thing — "what did we make or share here" — and
     * two tabs for them meant looking in the wrong one first. Given, the list
     * is one list: documents, whiteboards and files together, newest change
     * first (a document by its last edit, a file by when it was sent), each
     * with its kind's glyph. Omit and the panel lists documents only.
     */
    files?: readonly ChannelFileItem[];
    /** Resolves a file's image source (the download route is authenticated). */
    thumbnailSrc?: (a: ChatAttachment) => string | null | undefined;
    /** Where a file row goes: the message it arrived on. */
    onJumpToFile?: (messageId: string) => void;
    className?: string;
    'data-testid'?: string;
}
export declare function ChannelDocumentsPanel({ documents, onOpen, onCreate, onCreateWhiteboard, files, thumbnailSrc, onJumpToFile, className, 'data-testid': testId, }: ChannelDocumentsPanelProps): import("react").JSX.Element;
//# sourceMappingURL=ChannelViews.d.ts.map