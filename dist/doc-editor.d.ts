import { Awareness } from 'y-protocols/awareness';
import { default as default_2 } from 'react';
import { DragEvent as DragEvent_2 } from 'react';
import { Editor } from '@tiptap/react';
import { JSX } from 'react';
import { MutableRefObject } from 'react';
import { ReactNode } from 'react';
import { Ref } from 'react';
import { RefObject } from 'react';
import { useEditor } from '@tiptap/react';
import { XmlFragment } from 'yjs';
import * as Y from 'yjs';

export declare function AckMode({ sections, onAckItem, onRejectItem, participants, onSectionFocus, jumpToIndex, onJumpComplete, getSectionFragment, ydoc, provider, comments, onAddComment, onResolveThread, onUnresolveThread }: AckModeProps): JSX.Element;

declare interface AckModeProps {
    sections: Section[];
    onAckItem: (sectionId: string, itemId: string, notes?: string) => void;
    onRejectItem: (sectionId: string, itemId: string, reason: string) => void;
    participants: Participant[];
    onSectionFocus?: (sectionId: string) => void;
    /** Jump to a specific section page (set by handleJumpToUser) */
    jumpToIndex?: number | null;
    onJumpComplete?: () => void;
    getSectionFragment: (sectionId: string) => XmlFragment | null;
    ydoc: Y.Doc;
    provider: CollaborationProvider | null;
    comments?: Record<string, CommentThread[]>;
    onAddComment?: (sectionId: string, text: string, parentCommentId?: string | null) => void;
    onResolveThread?: (sectionId: string, commentId: string) => void;
    onUnresolveThread?: (sectionId: string, commentId: string) => void;
}

export declare function ActionItemsCard({ allItems }: {
    allItems: TaskItem[];
}): JSX.Element;

declare interface ActivityEvent {
    id: string;
    eventType: string;
    detail: Record<string, unknown>;
    timestamp: string;
    userId?: string;
    displayName?: string;
    color?: string;
    source: 'local' | 'remote';
}

export declare function ActivityFeed({ events, participants }: ActivityFeedProps): JSX.Element;

declare interface ActivityFeedProps {
    events: ActivityEvent[];
    participants: Participant[];
}

export declare function AttachmentsPanel({ documentId, editable }: AttachmentsPanelProps): JSX.Element;

declare interface AttachmentsPanelProps {
    documentId: string;
    editable: boolean;
}

export declare function CanvasDocumentView({ isCanvas, body, ydoc, provider, user, editable, extensions, onConvert, unsupported, schemaProbe, header, toolbarActions, gutterItems, onFocusGutterItem, gutterVisible, onToggleGutter, onEditorReady, 'data-testid': testId, }: CanvasDocumentViewProps): JSX.Element;

export declare interface CanvasDocumentViewProps {
    /** True when the document is already a canvas (`meta.schemaVersion >= 2`). */
    isCanvas: boolean;
    /** The page body. Required when `isCanvas`; ignored otherwise. */
    body: XmlFragment | null;
    ydoc: Y.Doc;
    provider: Parameters<typeof TiptapEditor>[0]['provider'];
    user: {
        name: string;
        color: string;
    };
    editable?: boolean;
    /**
     * Canvas extensions (macro node views, heading anchors). Without these the
     * schema has no `macro` node and macros degrade to plain text, so this is
     * required rather than optional — a caller that forgets loses data on the
     * next save.
     */
    extensions: readonly unknown[];
    /**
     * Converts a legacy sectioned document into a canvas. Resolves to the
     * refusal reason on failure, or null on success.
     */
    onConvert?: () => Promise<string | null>;
    /** Forms that could not be represented, from the last conversion. */
    unsupported?: readonly CanvasUnsupportedForm[];
    /**
     * The (still empty) canvas body, so the conversion has a live schema to run
     * against.
     *
     * ## Why this prop has to exist
     *
     * `onConvert` ultimately calls `materialize(schema, model)`, and that schema
     * must be the LIVE editor's — building a second one puts a second
     * prosemirror-model in the graph. But before conversion there IS no editor:
     * this component only mounted one inside the `isCanvas` branch, so
     * `onEditorReady` never fired, the host's schema stayed null, and
     * `WrappedCanvasDocument` refused every conversion with "the editor is still
     * loading — try again in a moment" — permanently, because it never would.
     *
     * Given the fragment, the convert prompt mounts a read-only, hidden editor
     * beside itself whose only job is to exist, so the schema is real and the
     * button works. Read-only is load-bearing: the fragment is the one
     * `materialize` writes into, and it REFUSES a non-empty body, so an editor a
     * user could type into would break conversion by being used.
     *
     * Omit it and the prompt behaves as before — the host is then responsible
     * for supplying `schema` some other way.
     */
    schemaProbe?: XmlFragment | null;
    /** Rendered above the page — title, participants, actions. */
    header?: ReactNode;
    /**
     * Rendered at the right end of the toolbar — presence avatars, share, and
     * anything belonging to the document rather than to formatting.
     */
    toolbarActions?: ReactNode;
    /**
     * Comment threads for the margin. Each carries the offset it wants and the
     * gutter resolves collisions between them.
     *
     * Omitted entirely when empty rather than rendered as a blank column, so a
     * document with no discussion keeps the full width for its text.
     */
    gutterItems?: readonly GutterItem[];
    onFocusGutterItem?: (id: string) => void;
    /**
     * Whether the margin gutter is showing. Defaults to true, so a caller that
     * knows nothing about this keeps today's behaviour.
     *
     * CONTROLLED on purpose. "Show comments" is a reading preference, and a
     * preference the component owns privately is one it forgets on every
     * navigation — open the document again and the margin is back. Only the host
     * can persist it (profile, localStorage, the document itself), so only the
     * host can own it.
     */
    gutterVisible?: boolean;
    /**
     * Flips `gutterVisible`. Its absence means no toggle is offered at all,
     * which is the right default for a read-only embed with no place to store
     * the answer.
     */
    onToggleGutter?: () => void;
    /**
     * Hands the live editor out once it exists (null while initialising).
     *
     * Not a convenience: `materialize()` needs the LIVE editor's ProseMirror
     * schema, and building a second one puts a second prosemirror-model in the
     * graph — the `instanceof` break the app's optimizeDeps.exclude entries
     * already exist to prevent. This is how a caller gets the real one.
     */
    onEditorReady?: (editor: Parameters<typeof DocumentToolbar>[0]['editor'] | null) => void;
    'data-testid'?: string;
}

/**
 * A form the ProseMirror schema could not express, surfaced rather than
 * dropped. Mirrors `UnsupportedForm` in realtime-modules structurally so this
 * package keeps zero runtime dependency on it.
 */
export declare interface CanvasUnsupportedForm {
    kind: string;
    reason?: string;
}

/** Who is asking for the change. */
declare interface ChangeAuthor {
    name: string;
    /**
     * `agent` renders the machine label. This is not decoration: an unreviewed
     * machine edit and a colleague's edit carry very different weight, and the
     * only thing separating them on screen is this.
     */
    kind?: 'human' | 'agent';
    avatarUrl?: string;
}

/**
 * How the review itself is going, independent of what it concluded.
 *
 * Separate from `ChangeReviewVerdict` because "we have not asked yet", "we are
 * asking" and "asking failed" are three different things to a reviewer, and
 * none of them is a verdict. Folding them into an optional verdict field would
 * make the absent case ambiguous.
 */
declare type ChangeReviewStatus = 'idle' | 'pending' | 'failed';

declare interface ChangeReviewVerdict {
    verdict: ChangeVerdict;
    /** One line, always shown beside the chip. */
    headline: string;
    /** Expandable detail. Absent when the model gave none — render nothing, not "no reasoning". */
    reasoning?: string;
    producedAt: string;
    /** The change revision this verdict was computed against. */
    forRevision: string;
}

/** An agent's judgement on a single proposed change. */
declare type ChangeVerdict = 'pass' | 'concern' | 'fail';

export declare function ChunkViewer({ section, onAckItem, onRejectItem, fragment, ydoc, provider, comments, onAddComment, onResolveThread, onUnresolveThread, participants }: ChunkViewerProps): JSX.Element;

declare interface ChunkViewerProps {
    section: Section;
    onAckItem: (itemId: string, notes?: string) => void;
    onRejectItem: (itemId: string, reason: string) => void;
    fragment: XmlFragment | null;
    ydoc: Y.Doc;
    provider: CollaborationProvider | null;
    comments?: CommentThread[];
    onAddComment?: (text: string, parentCommentId?: string | null) => void;
    onResolveThread?: (commentId: string) => void;
    onUnresolveThread?: (commentId: string) => void;
    participants?: Participant[];
}

/** Find the awareness clientID whose `user` payload matches. Null when absent. */
export declare function clientIdForUser(awareness: Awareness, match: (user: Record<string, unknown>) => boolean): number | null;

/** Minimal provider shape needed by awareness. */
declare interface CollaborationProvider {
    awareness: Awareness;
}

/** A flat comment as stored in Y.js. */
declare interface CommentData {
    id: string;
    text: string;
    userId: string;
    displayName: string;
    color: string;
    timestamp: string;
    parentCommentId: string | null;
    resolved?: boolean;
    resolvedBy?: string;
    resolvedAt?: string;
}

export declare function CommentGhostPopover({ threads, containerRef, hoverDelayMs, hoverEnabled, onOpenChange, onOpenThread, onResolve, ref, 'data-testid': testId, }: CommentGhostPopoverProps): JSX.Element;

/** Imperative surface, for wiring the extension's click callback. */
export declare interface CommentGhostPopoverHandle {
    /**
     * Opens the card for `id`. The anchor element is optional: without one the
     * mark is looked up inside the container, so a host-driven "jump to next
     * comment" needs only the id.
     */
    openComment: (id: string, anchor?: Element | null) => void;
    close: () => void;
}

export declare interface CommentGhostPopoverProps {
    /** Every thread that could be behind a mark. Unknown ids never open a card. */
    threads: readonly CommentGhostThread[];
    /**
     * The element the painted ranges live in — the `.doc-page` sheet. Hover and
     * click delegation binds here.
     *
     * Must already be attached when this mounts, which it is whenever both live
     * in the same tree: refs are assigned during commit, before effects run.
     */
    containerRef?: RefObject<HTMLElement | null>;
    /** Dwell before a hover opens a card, so a pointer crossing the line is ignored. */
    hoverDelayMs?: number;
    /**
     * Hover-to-open. Turn it off in an editing mode: opening the card takes
     * focus, and a card that opens because the pointer drifted over a word steals
     * the caret mid-sentence.
     */
    hoverEnabled?: boolean;
    /**
     * Fires as the open thread changes (null when it closes). The reason to wire
     * it: the host can flip that thread's `CommentHighlight` state to `active`,
     * so the mark under the card is the prominent one.
     */
    onOpenChange?: (id: string | null) => void;
    /** "Open thread" — show the full discussion (a panel, a drawer, the gutter). */
    onOpenThread?: (id: string) => void;
    /** Omitted when the reader may not resolve; never offered on a resolved thread. */
    onResolve?: (id: string) => void;
    ref?: Ref<CommentGhostPopoverHandle>;
    'data-testid'?: string;
}

/**
 * One thread, reduced to what a card can show before the reader commits to
 * opening the whole discussion.
 *
 * Structural, not imported: this package keeps zero runtime dependency on
 * realtime-modules, so the host maps its own comment rows onto this.
 */
export declare interface CommentGhostThread {
    /** Matches the `data-comment-id` on the painted range. */
    id: string;
    /** Display name of whoever opened the thread. */
    author: string;
    /** The first comment. Clamped in the card — this is a preview, not the thread. */
    text: string;
    /** Replies below the first comment. Absent and 0 both read as "no replies". */
    replyCount?: number;
    resolved?: boolean;
    /** ISO timestamp, rendered as relative time. */
    timestamp?: string;
    /** Author colour, so the ghost card and the gutter card agree. */
    color?: string;
    /**
     * The text the thread was anchored to. Worth showing because a ghost can be
     * opened from a mark the reader has not read yet.
     */
    quote?: string;
}

/** A comment with nested replies, assembled client-side. */
declare interface CommentThread extends CommentData {
    replies: CommentThread[];
}

export declare function CommentThreadNode({ comment, depth, onReply, mentionUsers, onResolveThread, onUnresolveThread, }: CommentThreadNodeProps): JSX.Element;

export declare interface CommentThreadNodeProps {
    comment: CommentThread;
    depth: number;
    onReply: (parentId: string, text: string) => void;
    mentionUsers: MentionUser[];
    onResolveThread?: (commentId: string) => void;
    onUnresolveThread?: (commentId: string) => void;
}

/** Connection lifecycle states */
declare type ConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

export declare function countAllComments(threads: CommentThread[]): number;

export declare function DiffViewer({ oldSections, newSections, onClose }: DiffViewerProps): JSX.Element;

declare interface DiffViewerProps {
    /** Sections from the historical (older) version. */
    oldSections: SnapshotSection[];
    /** Sections from the current (newer) version. */
    newSections: SnapshotSection[];
    /** Called when the user dismisses the diff view. */
    onClose: () => void;
}

export declare function DocumentEditorPage({ documentId, documentType, ws, userId, displayName, color, onMessage, activityPublish, onBack, isVideoDocked, onDockVideo, onUndockVideo, }: DocumentEditorPageProps): JSX.Element;

declare interface DocumentEditorPageProps {
    documentId: string;
    documentType?: string;
    ws: UseWebSocketReturn;
    userId: string;
    displayName: string;
    color?: string;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
    activityPublish: (eventType: string, detail: Record<string, unknown>) => void;
    activityEvents: ActivityEvent[];
    onBack?: () => void;
    /** Whether the video call is docked to the left sidebar (managed by AppLayout) */
    isVideoDocked?: boolean;
    /** Dock the video panel to the left sidebar */
    onDockVideo?: () => void;
    /** Undock the video panel from the left sidebar */
    onUndockVideo?: () => void;
}

export declare function DocumentGutter({ items, gap, estimatedHeight, onFocusItem, emptyLabel, 'data-testid': testId, }: DocumentGutterProps): JSX.Element;

export declare interface DocumentGutterProps {
    items: readonly GutterItem[];
    /** Minimum vertical gap between two cards. */
    gap?: number;
    /** Approximate rendered height of a card, used for collision spacing. */
    estimatedHeight?: number;
    onFocusItem?: (id: string) => void;
    emptyLabel?: string;
    'data-testid'?: string;
}

export declare function DocumentHeader({ meta, mode, onModeChange, participants, onUpdateMeta, onExport, onToggleHistory, onToggleVideoCall, onToggleVideoHistory, isCallActive, callVariant, callLabel, onClearDocument, onJumpToUser, sections, onToggleMyItems, myItemCount, commentCount, onBack, onFollowUser, followingUserId, onFinalize, onUnlock, pastCallsCount, }: DocumentHeaderProps): JSX.Element;

/**
 * How the call button presents itself.
 *
 * A boolean could only say "in a call" or "not", so the state that matters
 * most — a call is RUNNING in this document and you have not joined it — had
 * to render as a plain "Call", visually identical to no call existing at all.
 * Hosts worked around it by suppressing this button and rendering their own
 * beneath the header, which is a duplicated control waiting to drift.
 *
 * - `idle`      — nothing running; the button starts a call.
 * - `available` — a call is running that you are not in; the button joins it.
 * - `active`    — you are in the call; the button toggles its surface.
 */
export declare type DocumentHeaderCallVariant = 'idle' | 'available' | 'active';

declare interface DocumentHeaderProps {
    meta: DocumentMeta;
    mode: ViewMode;
    onModeChange: (mode: ViewMode) => void;
    participants: Participant[];
    onUpdateMeta: (patch: Partial<DocumentMeta>) => void;
    onExport: (format: 'markdown' | 'pdf' | 'json') => void;
    onToggleHistory: () => void;
    onToggleVideoCall?: () => void;
    onToggleVideoHistory?: () => void;
    isCallActive?: boolean;
    /**
     * Overrides the call button's presentation. Omit and it is derived from
     * `isCallActive`, so callers written before this prop existed are unchanged.
     */
    callVariant?: DocumentHeaderCallVariant;
    /**
     * Overrides the call button's text — the room name in "Join standup", say.
     * Omit for the variant's default wording.
     */
    callLabel?: string;
    onClearDocument: () => void;
    onJumpToUser?: (participant: Participant) => void;
    sections?: {
        id: string;
        title: string;
    }[];
    onToggleMyItems?: () => void;
    myItemCount?: number;
    commentCount?: number;
    onBack?: () => void;
    onFollowUser?: (participant: Participant) => void;
    followingUserId?: string | null;
    onFinalize?: () => void;
    onUnlock?: () => void;
    pastCallsCount?: number;
}

declare interface DocumentInfo {
    id: string;
    title: string;
    type: string;
    status: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    icon: string;
    description?: string;
    activeCallSessionId?: string;
}

export declare function DocumentListPage({ documents, presence, onOpenDocument, onCreateDocument, onDeleteDocument, onJumpToUser, hideHeader, }: DocumentListPageProps): JSX.Element;

declare interface DocumentListPageProps {
    documents: DocumentInfo[];
    presence: Record<string, PresenceInfo[]>;
    onOpenDocument: (documentId: string) => void;
    onCreateDocument: (meta: {
        title: string;
        type: string;
        description?: string;
    }) => void;
    onDeleteDocument: (documentId: string) => void;
    onJumpToUser: (documentId: string, userId: string) => void;
    hideHeader?: boolean;
}

declare interface DocumentMeta {
    id: string;
    title: string;
    sourceType: 'transcript' | 'meeting' | 'notes' | 'custom';
    sourceId: string;
    createdBy: string;
    createdByName?: string;
    createdAt: string;
    aiModel: string;
    status: 'draft' | 'review' | 'final';
    documentType?: string;
    updatedAt?: string;
    activeCallSessionId?: string;
}

/**
 * Which authoring surface a new document opens in.
 *
 * `page` becomes `meta.schemaVersion = 2` on the document's CRDT — the one
 * gate the editor branches on. Doing that translation is the host's job, not
 * this modal's; the modal only reports which shape the person chose.
 */
export declare type DocumentShape = 'page' | 'sections';

export declare function DocumentToolbar({ editor, actions, commentCount, gutterVisible, onToggleGutter, 'data-testid': testId, }: DocumentToolbarProps): JSX.Element | null;

export declare interface DocumentToolbarProps {
    editor: Editor | null;
    /** Rendered at the end of the bar — insert-macro menus, share, etc. */
    actions?: ReactNode;
    /**
     * How many comment threads the margin gutter holds.
     *
     * A first-class prop rather than something the page shoves into `actions`,
     * because `actions` is the HOST's slot: whatever the app passes (presence,
     * share) lands there, and merging a library-owned control into it means the
     * toolbar can no longer decide where its own control sits, nor keep a host
     * that fills the slot from displacing it.
     */
    commentCount?: number;
    /** Whether the gutter is currently showing. Drives `aria-pressed`. */
    gutterVisible?: boolean;
    /**
     * Toggles the gutter. Its absence — or a zero count — means no control at
     * all: a toggle for a gutter with nothing in it is a button that does
     * nothing visible, which reads as broken rather than as empty.
     */
    onToggleGutter?: () => void;
    'data-testid'?: string;
}

export declare function EditorToolbar({ editor }: EditorToolbarProps): JSX.Element | null;

declare interface EditorToolbarProps {
    editor: Editor | null;
}

export declare function ExecutiveSummaryCard({ bullets, contentText, fragment, ydoc, provider, }: {
    bullets: string[];
    contentText?: string;
    fragment?: XmlFragment | null;
    ydoc?: Y.Doc | null;
    provider?: CollaborationProvider | null;
}): JSX.Element;

export declare function FollowModeBar({ followingUserId, participants, onStopFollow, }: FollowModeBarProps): JSX.Element | null;

declare interface FollowModeBarProps {
    followingUserId: string | null;
    participants: Participant[];
    onStopFollow: () => void;
}

/** Error received from the gateway (matches server error-codes.js format) */
declare interface GatewayError {
    /** Standardized error code (e.g. AUTH_TOKEN_EXPIRED, AUTHZ_CHANNEL_DENIED) */
    code: string;
    /** Human-readable description for display */
    message: string;
    timestamp: string;
}

/** A raw message received over the WebSocket */
declare interface GatewayMessage {
    type: string;
    action?: string;
    channel?: string;
    error?: GatewayError;
    [key: string]: unknown;
}

export declare function generateSummaryBullets(allItems: TaskItem[], sections: Section[]): string[];

export declare function getInitials(name: string): string;

/** A thread plus where it wants to sit, in pixels from the page top. */
export declare interface GutterItem {
    id: string;
    /** Desired vertical offset. Ties and near-ties are resolved by stacking. */
    top: number;
    /** True when the anchor is inside the current selection or hovered. */
    active?: boolean;
    /** Rendered inside the card — usually a CommentThread. */
    content: ReactNode;
}

export declare function HeaderBanner({ meta, participantCount, }: {
    meta: DocumentMeta;
    participantCount: number;
}): JSX.Element;

export declare function KeyDecisionsCard({ sections }: {
    sections: Section[];
}): JSX.Element;

export declare const MentionDropdown: default_2.ForwardRefExoticComponent<MentionDropdownProps & default_2.RefAttributes<MentionDropdownHandle>>;

declare interface MentionDropdownHandle {
    /** Forward a keydown event from the parent input. Returns true if the dropdown consumed it. */
    handleKeyDown: (e: default_2.KeyboardEvent | KeyboardEvent) => boolean;
}

declare interface MentionDropdownProps {
    query: string;
    users: MentionUser[];
    position: {
        top: number;
        left: number;
    };
    onSelect: (user: MentionUser) => void;
    onDismiss: () => void;
}

declare interface MentionItem {
    kind: 'mention';
    sectionId: string;
    sectionTitle: string;
    commentId: string;
    authorName: string;
    authorColor: string;
    commentText: string;
    timestamp: string;
}

declare interface MentionUser {
    userId: string;
    displayName: string;
    color: string;
    online: boolean;
    mode?: string;
    type: 'user' | 'group';
    memberCount?: number;
}

declare type MyItem = MentionItem | TaskAssignment;

export declare function MyMentionsPanel({ items, onNavigateToSection, onClose, }: MyMentionsPanelProps): JSX.Element;

declare interface MyMentionsPanelProps {
    items: MyItem[];
    onNavigateToSection: (sectionId: string) => void;
    onClose: () => void;
}

export declare function NewDocumentModal({ open, onClose, onCreate }: NewDocumentModalProps): JSX.Element | null;

export declare interface NewDocumentModalProps {
    open: boolean;
    onClose: () => void;
    onCreate: (meta: {
        title: string;
        type: string;
        description?: string;
        icon: string;
        documentTypeId: string;
        shape: DocumentShape;
    }) => void;
}

declare interface Participant {
    clientId: string;
    userId: string;
    displayName: string;
    color: string;
    mode: 'editor' | 'reviewer' | 'reader';
    currentSectionId: string | null;
    lastSeen?: number;
    idle?: boolean;
}

export declare function ParticipantAvatars({ participants, sections, onJumpToUser, onFollowUser, followingUserId, }: ParticipantAvatarsProps): JSX.Element | null;

declare interface ParticipantAvatarsProps {
    participants: Participant[];
    sections?: {
        id: string;
        title: string;
    }[];
    onJumpToUser?: (participant: Participant) => void;
    onFollowUser?: (participant: Participant) => void;
    followingUserId?: string | null;
}

declare interface PresenceInfo {
    userId: string;
    displayName: string;
    color: string;
    mode?: string;
    idle?: boolean;
}

/** What the host reports back after trying to apply. */
export declare interface ProposalApplyOutcome {
    ok: boolean;
    /** Shown verbatim when `ok` is false. Say what happened, not "error". */
    message?: string;
    /** Set when the refusal was specifically a compare-and-set mismatch. */
    stale?: {
        expected: unknown;
        actual: unknown;
    };
}

/** Where the item currently sits relative to the document. */
export declare type ProposalAttachState = 'attached' | 'author_only' | 'inbox' | 'healed';

export declare function ProposalCard({ utterance, kind, status, confidence, attachState, targetLabel, targetReason, before, after, edits, rationale, draftError, author, category, path, locationHint, verdict, verdictStatus, verdictError, revision, onRereview, onAccept, onReject, onRedraft, onReattach, onConfirmAttachment, className, 'data-testid': testId, }: ProposalCardProps): JSX.Element;

export declare interface ProposalCardProps {
    /** Verbatim remark that raised this. Never paraphrase it. */
    utterance: string;
    /** `field` changes a title/scalar; `prose` stages suggestion marks. */
    kind: ProposalKind;
    status: ProposalCardStatus;
    confidence: ProposalConfidence;
    attachState?: ProposalAttachState;
    /** Human-readable target, e.g. "Document title" or "Overview". */
    targetLabel?: string;
    /** Why the capture path chose that target. Shown on the provenance line. */
    targetReason?: string;
    /** For `field`: the two values, so the change is legible without the doc. */
    before?: string;
    after?: string;
    /** For `prose`: one row per edit. */
    edits?: Array<{
        before: string;
        after: string;
    }>;
    /** The model's one-line justification. */
    rationale?: string;
    /** Set when drafting itself failed. Rendered instead of the diff. */
    draftError?: string;
    /**
     * Who ASKED for this change — the person whose remark raised it.
     *
     * Distinct from who drafted it: the draft is always the model's, which is
     * what the permanent "AI proposal" chip says. Omit when the requester is not
     * known. Never synthesise one; an invented author on a change nobody can
     * trace is worse than an honest blank.
     */
    author?: ChangeAuthor;
    /**
     * What kind of change this is, in the reviewer's words — "Document title",
     * "Body text". Defaults to a label derived from `kind`.
     */
    category?: string;
    /**
     * Where in the document this lands, outermost first. Rendered diff-hunk
     * style. Defaults to `targetLabel` when that is all the host knows.
     */
    path?: readonly string[];
    /** Position within the target, e.g. `paragraph 3`. */
    locationHint?: string;
    /** The agent's verdict on this change. */
    verdict?: ChangeReviewVerdict | undefined;
    /** How the review itself is going. */
    verdictStatus?: ChangeReviewStatus | undefined;
    /** Why the review failed, when `verdictStatus` is `failed`. */
    verdictError?: string | undefined;
    /**
     * The proposal's CURRENT revision. Pass it, or a verdict computed against an
     * earlier draft renders as though it still applies to this one.
     */
    revision?: string | undefined;
    /** Ask for a fresh verdict against the current revision. */
    onRereview?: () => void;
    /**
     * Apply the change. MUST perform the mutation and report what happened —
     * returning `{ ok: true }` without changing the document is the exact bug this
     * component is shaped to prevent.
     */
    onAccept: () => Promise<ProposalApplyOutcome> | ProposalApplyOutcome;
    onReject: (reason: string) => void;
    /** Ask for a fresh draft against the document's current values. */
    onRedraft?: () => void;
    /** Move the item to a different section. Omitted when there is nowhere to go. */
    onReattach?: () => void;
    /** Confirm an `author_only` attachment, publishing it to collaborators. */
    onConfirmAttachment?: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare type ProposalCardStatus = 'none' | 'drafting' | 'ready' | 'applied' | 'rejected' | 'failed';

/** How much the capture path trusted its own choice of target. */
export declare type ProposalConfidence = 'high' | 'medium' | 'low';

export declare type ProposalKind = 'field' | 'prose';

export declare function ReaderMode({ sections, participants, meta, commentCounts, sectionContentTexts, comments, getSectionFragment, ydoc, provider, }: ReaderModeProps): JSX.Element;

declare interface ReaderModeProps {
    sections: Section[];
    participants: Participant[];
    meta: DocumentMeta;
    commentCounts?: Record<string, number>;
    /** Plain-text content extracted from each section's Y.XmlFragment */
    sectionContentTexts?: Record<string, string>;
    /** Threaded comments per section */
    comments?: Record<string, CommentThread[]>;
    /** Y.js fragment getter for rich-text rendering */
    getSectionFragment?: (sectionId: string) => XmlFragment | null;
    /** Y.Doc instance for collaboration */
    ydoc?: Y.Doc | null;
    /** Collaboration provider for awareness */
    provider?: CollaborationProvider | null;
}

export declare function relativeTime(iso: string): string;

/** "no replies" / "1 reply" / "4 replies" — the count is the thread's weight. */
export declare function replyLabel(count: number): string;

export declare function ReviewableItem({ item, onAck, onReject }: ReviewableItemProps): JSX.Element;

declare interface ReviewableItemProps {
    item: TaskItem;
    onAck: (notes?: string) => void;
    onReject: (reason: string) => void;
}

export declare function ReviewMode({ sections, participants, userId, getSectionFragment, ydoc, provider, sectionReviews, reviewSection, comments, onAddComment, onResolveThread, onUnresolveThread, onSectionFocus, }: ReviewModeProps): JSX.Element;

declare interface ReviewModeProps {
    sections: Section[];
    participants: Participant[];
    userId: string;
    getSectionFragment: (sectionId: string) => XmlFragment | null;
    ydoc: Y.Doc;
    provider: CollaborationProvider | null;
    sectionReviews: Record<string, SectionReview[]>;
    reviewSection: (sectionId: string, status: SectionReview['status'], comment?: string) => void;
    comments?: Record<string, CommentThread[]>;
    onAddComment?: (sectionId: string, text: string, parentCommentId?: string | null) => void;
    onResolveThread?: (sectionId: string, commentId: string) => void;
    onUnresolveThread?: (sectionId: string, commentId: string) => void;
    onSectionFocus?: (sectionId: string) => void;
}

export declare function ReviewProgress({ current, total }: ReviewProgressProps): JSX.Element;

declare interface ReviewProgressProps {
    current: number;
    total: number;
}

declare interface Section {
    id: string;
    type: 'summary' | 'tasks' | 'decisions' | 'notes' | 'custom';
    title: string;
    collapsed: boolean;
    items: TaskItem[];
    sectionType?: string;
    metadata?: Record<string, unknown>;
    placeholder?: string;
}

declare interface Section_2 {
    id: string;
    title: string;
}

export declare function SectionBlock({ section, fragment, ydoc, provider, user, editable, onUpdateSection, onAddItem, onUpdateItem, onRemoveItem, participants, onFocus, isFocused, comments, onUpdateCursorInfo, commentCount, onOpenComments, commentPresence, }: SectionBlockProps): JSX.Element;

declare interface SectionBlockProps {
    section: Section;
    fragment: XmlFragment | null;
    ydoc: Y.Doc;
    provider: CollaborationProvider | null;
    user: {
        name: string;
        color: string;
    };
    editable: boolean;
    onUpdateSection: (patch: Partial<Section>) => void;
    onAddItem: (item: Omit<TaskItem, 'id'>) => void;
    onUpdateItem: (itemId: string, patch: Partial<TaskItem>) => void;
    onRemoveItem: (itemId: string) => void;
    participants?: Participant[];
    onFocus?: () => void;
    isFocused?: boolean;
    comments?: CommentThread[];
    onAddComment?: (text: string, parentCommentId?: string | null) => void;
    onResolveThread?: (commentId: string) => void;
    onUnresolveThread?: (commentId: string) => void;
    /** Merge-safe awareness updater for Tiptap cursor info. */
    onUpdateCursorInfo?: (name: string, color: string) => void;
    /** Number of comments for this section (used for badge on comment icon). */
    commentCount?: number;
    /** Called when the user clicks the comment icon to open the sidebar. */
    onOpenComments?: (sectionId: string) => void;
    /** Participants who currently have comments open for this section. */
    commentPresence?: Participant[];
}

export declare function SectionComments({ comments, onAddComment, participants, onResolveThread, onUnresolveThread, }: SectionCommentsProps): JSX.Element;

declare interface SectionCommentsProps {
    comments: CommentThread[];
    onAddComment: (text: string, parentCommentId?: string | null) => void;
    participants?: Participant[];
    onResolveThread?: (commentId: string) => void;
    onUnresolveThread?: (commentId: string) => void;
}

export declare function SectionList({ sections, getSectionFragment, ydoc, provider, user, editable, onUpdateSection, onAddItem, onUpdateItem, onRemoveItem, participants, onSectionFocus, focusedSectionId, comments, onAddComment, onResolveThread, onUnresolveThread, onUpdateCursorInfo, onOpenComments, }: SectionListProps): JSX.Element;

declare interface SectionListProps {
    sections: Section[];
    getSectionFragment: (sectionId: string) => XmlFragment | null;
    ydoc: Y.Doc;
    provider: CollaborationProvider | null;
    user: {
        name: string;
        color: string;
    };
    editable: boolean;
    onUpdateSection: (sectionId: string, patch: Partial<Section>) => void;
    onAddItem: (sectionId: string, item: Omit<TaskItem, 'id'>) => void;
    onUpdateItem: (sectionId: string, itemId: string, patch: Partial<TaskItem>) => void;
    onRemoveItem: (sectionId: string, itemId: string) => void;
    participants?: Participant[];
    onSectionFocus?: (sectionId: string) => void;
    focusedSectionId?: string | null;
    comments?: Record<string, CommentThread[]>;
    onAddComment?: (sectionId: string, text: string, parentCommentId?: string | null) => void;
    onResolveThread?: (sectionId: string, commentId: string) => void;
    onUnresolveThread?: (sectionId: string, commentId: string) => void;
    /** Merge-safe awareness updater for Tiptap cursor info. */
    onUpdateCursorInfo?: (name: string, color: string) => void;
    /** Called when user clicks a section's comment icon to open the sidebar. */
    onOpenComments?: (sectionId: string) => void;
}

/** Per-section review status (DocuSign-style acknowledgement). */
declare interface SectionReview {
    userId: string;
    displayName: string;
    status: 'reviewed' | 'approved' | 'changes_requested';
    timestamp: string;
    comment?: string;
}

export declare function SectionSummariesCard({ sections, commentCounts, sectionContentTexts, comments, getSectionFragment, ydoc, provider, }: {
    sections: Section[];
    commentCounts?: Record<string, number>;
    sectionContentTexts?: Record<string, string>;
    comments?: Record<string, CommentThread[]>;
    getSectionFragment?: (sectionId: string) => XmlFragment | null;
    ydoc?: Y.Doc | null;
    provider?: CollaborationProvider | null;
}): JSX.Element;

declare interface SharedProps {
    user: StandaloneTiptapUser;
    /** Y.XmlFragment name on the shared doc. Default: 'prosemirror'. */
    fragmentName?: string;
    editable?: boolean;
    placeholder?: string;
    className?: string;
    /**
     * Called once when the editor first connects to a non-null XmlFragment.
     * Useful for seeding initial content via consumer code.
     */
    onFragmentReady?: (fragment: Y.XmlFragment, ydoc: Y.Doc) => void;
    /** Slot shown while bootstrapping (Y.Doc not yet constructed). */
    loadingSlot?: React.ReactNode;
    /**
     * Wait for the provider's first sync before mounting the editor.
     *
     * Default `false`, which is the historical behaviour: the editor mounts on
     * the first commit, before any server snapshot has arrived. The user sees an
     * empty document with a placeholder and can start typing into it — and the
     * server's content then merges *around* what they wrote. Tiptap's
     * Collaboration extension also writes an empty paragraph into an empty
     * fragment, so a cold open can leave a stray block behind.
     *
     * Set `true` when the document is expected to have existing content and you
     * would rather show `loadingSlot` than risk that. It is opt-in rather than
     * the default because a gateway that sends no snapshot for a brand-new
     * document never fires `synced`, and gating on it there would hang the
     * editor forever.
     *
     * `onFragmentReady` respects this too: seeding content into an unsynced doc
     * is the same corruption by another route.
     */
    requireSync?: boolean;
}

declare type SidebarPanel = 'history' | 'myItems' | 'videoHistory';

/** Plain-object snapshot of a section for diffing (no Y.js references). */
declare interface SnapshotSection {
    id: string;
    type: string;
    title: string;
    /** Plain text extracted from the section's rich-text content. */
    textContent: string;
    items: Array<{
        id: string;
        text: string;
        status: string;
        assignee: string;
        priority: string;
    }>;
}

/**
 * Pushes overlapping cards down so each keeps `gap` clearance.
 *
 * Sorted first: input order is whatever the comment API returned, and
 * resolving collisions in that order would let an early thread anchored far
 * down the page push everything above it. Exported because the stacking rule
 * is the part worth testing directly.
 */
export declare function stackOffsets(items: readonly {
    id: string;
    top: number;
}[], 
/**
 * Per-card height. A flat number is a fallback for the first paint only —
 * real thread cards differ by hundreds of pixels once replies exist, and a
 * single estimate makes tall cards overlap the one below.
 */
height: number | ((id: string) => number), gap: number): Map<string, number>;

export declare function StandaloneTiptap(props: StandaloneTiptapProps): JSX.Element;

export declare interface StandaloneTiptapBootstrapProps extends SharedProps {
    /** WebSocket URL of the gateway, e.g. wss://gateway.example.com/ws */
    gatewayUrl: string;
    /** Document id; the component subscribes to `doc:${docId}`. */
    docId: string;
    /** Bearer-style token forwarded as Sec-WebSocket-Protocol. May be ''. */
    authToken: string;
    /** Optional channel override; default `doc:${docId}`. */
    channel?: string;
    ydoc?: undefined;
    provider?: undefined;
    fragment?: undefined;
}

export declare interface StandaloneTiptapEscapeHatchProps extends SharedProps {
    ydoc: Y.Doc;
    provider: CollaborationProvider | null;
    /** If omitted, falls back to ydoc.getXmlFragment(fragmentName ?? 'prosemirror'). */
    fragment?: Y.XmlFragment;
    gatewayUrl?: undefined;
    docId?: undefined;
    authToken?: undefined;
    channel?: undefined;
}

export declare type StandaloneTiptapProps = StandaloneTiptapBootstrapProps | StandaloneTiptapEscapeHatchProps;

export declare interface StandaloneTiptapUser {
    name: string;
    color: string;
}

export declare function TableOfContents({ sections, focusedSectionId }: TableOfContentsProps): JSX.Element | null;

declare interface TableOfContentsProps {
    sections: Section_2[];
    focusedSectionId: string | null;
}

declare interface TaskAssignment {
    kind: 'task';
    sectionId: string;
    sectionTitle: string;
    itemId: string;
    taskText: string;
    status: string;
    priority: string;
}

declare interface TaskItem {
    id: string;
    text: string;
    status: 'pending' | 'acked' | 'done' | 'rejected';
    assignee: string;
    ackedBy: string;
    ackedAt: string;
    priority: 'low' | 'medium' | 'high';
    notes: string;
    dueDate?: string;
    category?: string;
}

export declare function TaskItemRow({ item, editable, onUpdate, onRemove, autoFocusText, onDidAutoFocus }: TaskItemRowProps): JSX.Element;

declare interface TaskItemRowProps {
    item: TaskItem;
    editable: boolean;
    onUpdate: (patch: Partial<TaskItem>) => void;
    onRemove: () => void;
    /** When true, auto-focus the text input on mount. */
    autoFocusText?: boolean;
    /** Called after auto-focus completes so parent can reset the flag. */
    onDidAutoFocus?: () => void;
}

export declare function TaskList({ items, editable, onUpdateItem, onRemoveItem, focusLastItem }: TaskListProps): JSX.Element;

declare interface TaskListProps {
    items: TaskItem[];
    editable: boolean;
    onUpdateItem: (itemId: string, patch: Partial<TaskItem>) => void;
    onRemoveItem: (itemId: string) => void;
    /** When true, auto-focus the text input of the last item (reset after use). */
    focusLastItem?: MutableRefObject<boolean>;
}

export declare function TiptapEditor({ fragment, ydoc, provider, user, editable, placeholder: placeholderText, sectionId, onUpdateCursorInfo, extensions: extraExtensions, chrome, hideToolbar, onEditorReady, }: TiptapEditorProps): JSX.Element;

declare interface TiptapEditorProps {
    fragment: XmlFragment;
    ydoc: Y.Doc;
    provider: CollaborationProvider | null;
    user: {
        name: string;
        color: string;
    };
    editable?: boolean;
    placeholder?: string;
    /** Section ID — used to filter cursor overlay to only show cursors in this section */
    sectionId?: string;
    /** Merge-safe awareness updater for cursor display info (name + color).
     *  When provided, replaces the direct setLocalStateField write. */
    onUpdateCursorInfo?: (name: string, color: string) => void;
    /**
     * Extra Tiptap extensions appended to the built-in set.
     *
     * The canvas needs this: its macros (`action-item`, `decision`, `field`) are
     * real ProseMirror nodes with node views, so without registering them the
     * schema has no `macro` node and every macro in the document degrades to
     * plain text — silently, and on the next save that lossy text is what gets
     * written back. Appended rather than replacing, so a caller cannot
     * accidentally drop Collaboration and turn a shared document into a local
     * one.
     *
     * Pass a STABLE array (module const or useMemo). The editor is rebuilt when
     * this identity changes, and a fresh array literal every render remounts the
     * editor on every keystroke.
     */
    extensions?: readonly unknown[];
    /**
     * `'card'` (default) keeps the bordered widget with its own padding and
     * themed ink — every existing caller. `'none'` strips both so the editor
     * can sit directly on a document page the caller owns.
     */
    chrome?: 'card' | 'none';
    /** Suppresses the built-in toolbar, for a page that renders its own. */
    hideToolbar?: boolean;
    /**
     * Hands the live editor out so a caller can render toolbars or menus
     * OUTSIDE the editor's own box. Called with null while the editor is
     * initialising, so a consumer must handle that rather than assume.
     *
     * A document page needs this: its toolbar belongs in the chrome above the
     * sheet, not inside the page margins, and the editor instance is the only
     * way to drive it.
     */
    onEditorReady?: (editor: ReturnType<typeof useEditor>) => void;
}

export declare function useDocumentActions({ documentId, userId, ws, updateMeta, addSection, exportJSON, getSectionFragment, comments, }: UseDocumentActionsArgs): {
    demoLoaded: boolean;
    handleLoadDemo: () => void;
    handleClearDocument: () => void;
    handleExport: (format: "markdown" | "pdf" | "json") => void;
};

declare interface UseDocumentActionsArgs {
    documentId: string;
    userId: string;
    ws: UseWebSocketReturn;
    updateMeta: (meta: DocumentMeta) => void;
    addSection: (section: Section) => void;
    exportJSON: () => {
        meta: DocumentMeta;
        sections: Section[];
    } | null;
    getSectionFragment: (sectionId: string) => XmlFragment | null;
    comments: Record<string, CommentThread[]>;
}

export declare function useFollowCursor({ editor, provider, followClientId, onLost }: UseFollowCursorOptions): void;

export declare interface UseFollowCursorOptions {
    editor: Editor | null;
    /** Anything carrying the doc's awareness — the same shape TiptapEditor takes. */
    provider: {
        awareness: Awareness;
    } | null | undefined;
    /** Awareness clientID to track. Null disables — the hook is always mounted. */
    followClientId: number | null;
    /**
     * Fired when the followed client disappears from awareness (closed the tab,
     * lost the connection). The host should clear its follow state — a lock on
     * a ghost scrolls nowhere and the banner would name someone who left.
     */
    onLost?: () => void;
}

export declare function useSidebarPanels(options?: UseSidebarPanelsOptions): UseSidebarPanelsReturn;

declare interface UseSidebarPanelsOptions {
    initialPanel?: SidebarPanel | null;
}

declare interface UseSidebarPanelsReturn {
    activePanel: SidebarPanel | null;
    showHistory: boolean;
    showMyItems: boolean;
    showVideoHistory: boolean;
    toggleHistory: () => void;
    toggleMyItems: () => void;
    toggleVideoHistory: () => void;
    openPanel: (panel: SidebarPanel) => void;
    closePanel: () => void;
}

declare interface UseWebSocketReturn {
    connectionState: ConnectionState;
    lastError: GatewayError | null;
    sessionToken: string | null;
    clientId: string | null;
    currentChannel: string;
    switchChannel: (channel: string) => void;
    sendMessage: (msg: Record<string, unknown>) => void;
    disconnect: () => void;
    reconnect: () => void;
}

declare interface VersionEntry {
    timestamp: number;
    age: number;
    name?: string;
    author?: string;
    type?: 'manual' | 'auto' | 'pre-restore';
}

export declare function VersionHistoryPanel({ versions, loading, previewTimestamp, onFetch: _onFetch, onPreview, onClearPreview, onClose, onSaveVersion, onCompare, onClearCompare, compareSections, compareTimestamp, currentSections, onRestore, }: VersionHistoryPanelProps): JSX.Element;

declare interface VersionHistoryPanelProps {
    versions: VersionEntry[];
    loading: boolean;
    previewTimestamp: number | null;
    onFetch: () => void;
    onPreview: (timestamp: number) => void;
    onClearPreview: () => void;
    onClose: () => void;
    /** Save a named version. */
    onSaveVersion: (name: string) => void;
    /** Trigger comparison for a version timestamp. */
    onCompare: (timestamp: number) => void;
    /** Dismiss the diff view. */
    onClearCompare: () => void;
    /** Sections from the compared historical version (null when no compare active). */
    compareSections: SnapshotSection[] | null;
    /** Currently compared timestamp. */
    compareTimestamp: number | null;
    /** Current document sections for diff. */
    currentSections: SnapshotSection[];
    /** Restore to a historical version. */
    onRestore?: (timestamp: number) => void;
}

export declare function VideoCallPanel({ documentId, userId, idToken, meta, updateMeta, sendMessage, onClose, onDockToSidebar, isDocked, onUndock, onCallEnd, }: VideoCallPanelProps): JSX.Element;

declare interface VideoCallPanelProps {
    documentId: string;
    userId: string;
    idToken: string | null;
    meta: DocumentMeta | null;
    updateMeta: (partial: Partial<DocumentMeta>) => void;
    sendMessage: (msg: Record<string, unknown>) => void;
    onClose: () => void;
    onDockToSidebar?: () => void;
    isDocked?: boolean;
    onUndock?: () => void;
    onCallEnd?: () => void;
}

export declare function VideoDockSlot({ docked, canAccept, label, hint, undockLabel, onRequestUndock, onDragOver, onDragLeave, onDrop, className, children, 'data-testid': testId, }: VideoDockSlotProps): JSX.Element | null;

export declare interface VideoDockSlotProps {
    /** True when the caller has portaled the live widget into `children`. */
    docked: boolean;
    /**
     * True when a call exists and could be moved here. Gates BOTH the dashed
     * affordance and the drag-over feedback: a slot that cannot take the video
     * must not light up under a drag and promise otherwise.
     */
    canAccept: boolean;
    /** Names the region for screen readers and labels the dashed prompt. */
    label?: string;
    /** Prompt text inside the empty affordance. */
    hint?: string;
    /** Accessible name for the undock control. */
    undockLabel?: string;
    /** Fires when the undock / pop-out control is used. Omit to hide it. */
    onRequestUndock?: () => void;
    /** Called after the internal drag-over state updates, with the raw event. */
    onDragOver?: (e: DragEvent_2<HTMLDivElement>) => void;
    onDragLeave?: (e: DragEvent_2<HTMLDivElement>) => void;
    /** Called on drop. The payload is the caller's — this component reads none of it. */
    onDrop?: (e: DragEvent_2<HTMLDivElement>) => void;
    className?: string;
    children?: ReactNode;
    'data-testid'?: string;
}

export declare function VideoHistoryPanel({ sessions, loading, onFetch, onClose }: VideoHistoryPanelProps): JSX.Element;

declare interface VideoHistoryPanelProps {
    sessions: VideoSession[];
    loading: boolean;
    onFetch: () => void;
    onClose: () => void;
}

declare interface VideoSession {
    documentId: string;
    sessionId: string;
    vnlSessionId: string;
    status: 'active' | 'ended';
    startedAt: string;
    endedAt?: string;
    startedBy: string;
    participants: VideoSessionParticipant[];
    transcriptStatus?: 'pending' | 'processing' | 'available' | 'failed';
    transcript?: string;
    aiSummary?: string;
}

declare interface VideoSessionParticipant {
    userId: string;
    displayName: string;
    joinedAt: string;
}

declare type ViewMode = 'editor' | 'ack' | 'reader';

export declare interface WorkItemCandidate {
    sectionId: string;
    sectionTitle?: string;
    /** Ordering only. Never rendered as a number. */
    score: number;
    reason: string;
}

export declare function WorkItemInbox({ entries, sections, onAttach, onDismiss, className, 'data-testid': testId, }: WorkItemInboxProps): JSX.Element;

export declare interface WorkItemInboxEntry {
    itemId: string;
    /** Verbatim remark. */
    utterance: string;
    /** Why the capture path declined to place it. Shown so it is never a mystery. */
    reason?: string;
    /** True when the speaker's screen moved mid-utterance. */
    contextSplit?: boolean;
    capturedAt?: string;
    candidates?: WorkItemCandidate[];
}

export declare interface WorkItemInboxProps {
    entries: WorkItemInboxEntry[];
    /** All sections, so a user can file an item somewhere no candidate names. */
    sections: Array<{
        id: string;
        title: string;
    }>;
    onAttach: (itemId: string, sectionId: string) => void;
    onDismiss: (itemId: string) => void;
    className?: string;
    'data-testid'?: string;
}

export { }
