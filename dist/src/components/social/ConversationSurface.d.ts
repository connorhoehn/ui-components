import { type ReactNode } from 'react';
import { type ChannelDocumentItem, type ChannelFileItem, type ChannelMentionItem, type ChannelRecordingItem, type PinnedMessageItem } from './ChannelViews';
import type { ChatAttachment } from './ChatAttachment';
/** The views a conversation can offer. `chat` is the transcript itself. */
export type ConversationFeature = 'chat' | 'files' | 'documents' | 'pins' | 'members' | 'mentions' | 'calls';
export declare const ALL_CONVERSATION_FEATURES: readonly ConversationFeature[];
export interface ConversationSurfaceProps {
    /** Channel name, or the people in a DM. */
    name: string;
    /** Sub-line under the name. */
    description?: string;
    online?: boolean;
    avatarUrl?: string;
    /**
     * Which views this deployment offers. Defaults to all of them.
     *
     * Hand in the INTERSECTION of what the product declares and what the server
     * provisions — a view whose backend is not wired renders an empty tab, which
     * reads as a broken feature rather than an absent one.
     */
    features?: readonly ConversationFeature[];
    /** The transcript and its composer. Owned by the caller. */
    children?: ReactNode;
    /**
     * Something live to look at while you talk — the call happening in this
     * conversation, a stream. Sits above the transcript on the Chat view and
     * scrolls with nothing; the transcript keeps its own scroll below.
     */
    canvas?: ReactNode;
    /**
     * The Members view: the host's `MembersPanel`, wired to its membership
     * API. Absent, the tab shows nothing — pass it whenever 'members' is on.
     */
    members?: ReactNode;
    /** The Members tab's badge. */
    memberCount?: number;
    files?: readonly ChannelFileItem[];
    /** Resolves a displayable image source; the download route is authenticated. */
    thumbnailSrc?: (a: ChatAttachment) => string | null | undefined;
    documents?: readonly ChannelDocumentItem[];
    onOpenDocument?: (documentId: string) => void;
    /**
     * Rename this conversation from its own title — double-click it and the
     * heading becomes a field. Forwarded to ChannelHeader; see its prop docs.
     * Omit for a viewer who may not.
     */
    onRename?: (next: string) => void;
    /** Omit for a viewer who may not create documents here. */
    onCreateDocument?: () => void;
    /**
     * Start a whiteboard instead of a document. Same permission, different
     * shape: a document opens beside the conversation, a whiteboard takes the
     * whole window — you are not typing in chat while drawing with somebody.
     * Omit to offer documents only.
     */
    onCreateWhiteboard?: () => void;
    pins?: readonly PinnedMessageItem[];
    onUnpin?: (messageId: string) => void;
    mentions?: readonly ChannelMentionItem[];
    onOpenMention?: (channel: string, messageId: string) => void;
    recordings?: readonly ChannelRecordingItem[];
    onOpenRecording?: (recordingId: string) => void;
    /** Scrolls the transcript to a message. Used by pins, files and mentions. */
    onJumpToMessage?: (messageId: string) => void;
    /**
     * Start (or join) a call with the people in this conversation. Omit and no
     * call controls render — which is how a chat-only deployment looks.
     */
    onStartCall?: (audioOnly: boolean) => void;
    /**
     * Watch instead of joining.
     *
     * A conversation that many more people watch than speak in — an all-hands,
     * a demo — should not make every viewer open a peer connection. Joining is
     * realtime and costs one connection per head; watching is near-realtime HLS
     * and a CDN carries it to any audience. Offering both is the difference
     * between a room that seats twelve and one that seats a thousand.
     *
     * Omit when the conversation cannot be watched, rather than rendering a
     * disabled control.
     */
    onWatch?: () => void;
    /**
     * What the watch control SAYS. Default "Watch".
     *
     * It used to say nothing: a bare 👁 whose entire explanation lived in a
     * `title`. A tooltip is not a label — it never appears on a touch device,
     * plenty of screen readers do not announce it, and an eye glyph is ambiguous
     * even to someone who does hover it ("preview"? "visibility"? "seen by"?).
     * The word is now on the button; this prop is for a product that calls it
     * something else — "Watch live", "Join as audience", "View the stream".
     */
    watchLabel?: string;
    /**
     * The longer version, for the tooltip and the accessible description: what
     * is on the other side of the control. Defaults to the joining-vs-watching
     * distinction, which is the thing a first-time viewer cannot guess.
     */
    watchHint?: string;
    /**
     * How many people are already watching, when that is KNOWN.
     *
     * `null`/omitted and `0` are different claims and this keeps them apart:
     * omitted renders no number (nobody measured), a numeric 0 renders "0"
     * (somebody counted and the answer was nobody). Never pass 0 to stand in
     * for "not measured" — upstream `getViewerCount` returns `null` for that,
     * and a channel that has never been measured must not claim an audience.
     */
    watchViewerCount?: number | null;
    /** Someone here is already on a call, so the controls say Join. */
    callInProgress?: boolean;
    /**
     * This conversation's call mode is not the clicker's to choose.
     *
     * A room decides whether it is an audio room or a video room, and entering
     * one does not get to redefine it — so the host ignores the `audioOnly`
     * argument entirely. Two buttons then do exactly the same thing, and the
     * one labelled "Audio call" starts a video call: a control that lies about
     * what it does. Set this and a single control renders instead.
     */
    callModeFixed?: boolean;
    /** Extra header controls, to the right of the call buttons. */
    headerActions?: ReactNode;
    /** Controlled view. Omit to let the surface keep its own. */
    view?: ConversationFeature;
    onViewChange?: (view: ConversationFeature) => void;
    className?: string;
    'data-testid'?: string;
}
export declare function ConversationSurface({ name, description, online, avatarUrl, features, children, canvas, members, memberCount, files, thumbnailSrc, documents, onOpenDocument, onRename, onCreateDocument, onCreateWhiteboard, pins, onUnpin, mentions, onOpenMention, recordings, onOpenRecording, onJumpToMessage, onStartCall, callModeFixed, onWatch, watchLabel, watchHint, watchViewerCount, callInProgress, headerActions, view: controlledView, onViewChange, className, 'data-testid': testId, }: ConversationSurfaceProps): import("react").JSX.Element;
export default ConversationSurface;
//# sourceMappingURL=ConversationSurface.d.ts.map