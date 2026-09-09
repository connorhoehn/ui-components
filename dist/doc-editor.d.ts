import { Awareness } from 'y-protocols/awareness';
import { CSSProperties } from 'react';
import { default as default_2 } from 'react';
import { Doc } from 'yjs';
import { DragEvent as DragEvent_2 } from 'react';
import { Editor } from '@tiptap/react';
import { Extension } from '@tiptap/core';
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

/** The Y root holding a canvas body. Mirrors realtime-modules' `CANVAS_BODY_KEY`. */
export declare const CANVAS_BODY_KEY = "body";

/** `meta.schemaVersion` at or above this means the document is a page. */
export declare const CANVAS_SCHEMA_VERSION = 2;

/**
 * The canvas body fragment, or null on a legacy document.
 *
 * Null rather than an empty fragment: `ydoc.getXmlFragment('body')` CREATES the
 * root as a side effect, so handing a legacy document an empty body would write
 * a canvas root onto it and make it look half-converted to the next reader.
 */
export declare function canvasBody(ydoc: Doc | null | undefined): XmlFragment | null;

export declare function CanvasDocumentView({ isCanvas, body, ydoc, provider, user, editable, extensions, onConvert, convertSlot, unsupported, schemaProbe, header, toolbarActions, gutterItems, gutterLead, onFocusGutterItem, gutterVisible, showRuler, toolbarDensity, showStatusBar, zoomMode, showOutline, paginate, onToggleGutter, onInsertImage, onEditorReady, 'data-testid': testId, }: CanvasDocumentViewProps): JSX.Element;

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
    /**
     * Where to render the convert control on a legacy document.
     *
     * Given an element, the button is portaled into it and the full-width
     * explanatory prompt is not rendered at all. That is the right shape once
     * the host has a toolbar: the prompt is a standing offer about the
     * document's FORMAT, not a piece of its content, and as a block it pushed
     * the actual document down the page every single visit — an advertisement
     * above the thing you came to read.
     *
     * Null or omitted keeps the block prompt, which is still correct for a host
     * with nowhere else to put it.
     */
    convertSlot?: HTMLElement | null;
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
    /**
     * Pinned to the top of the gutter — this is where a docked call goes.
     *
     * The margin beside the sheet is the right home for it: it scrolls with the
     * document, it is beside the text rather than over it, and it does not
     * reserve a band of empty page above the toolbar the way a floating dock
     * did. Its presence alone is enough to show the gutter — a call has to live
     * somewhere and "no comments yet" is not a reason to drop it.
     */
    gutterLead?: ReactNode;
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
     * Show the ruler above the sheet.
     *
     * ON by default, which is a reversal — so here is what changed.
     *
     * It was off because the ruler lied when zoomed. Its geometry scaled with
     * the sheet but its tick grid did not: `ticksFor` stepped and labelled with
     * a hard 96px inch while being handed screen pixels, so at 150% it drew a
     * label every two thirds of a document inch and called the first one "1".
     * That is worse than no ruler, and no default could fix it.
     *
     * It no longer does. The ruler now takes DOCUMENT pixels plus `zoom` and
     * makes the one conversion itself, so an inch mark sits at `96 * zoom`
     * screen px and is still labelled 1. The label sequence is a property of the
     * page, identical at every scale — verified in the browser at 50%, 100% and
     * 150%: same eight labels, margin markers within a pixel of the sheet's own
     * text edges at all three.
     *
     * Zoom persisting across reloads is what settles the default. A reader who
     * once picked 150% now stays there, so "the zoomed case" is not a transient
     * state to be tolerated — for that reader it is every session. A ruler that
     * is correct there is worth having on; one that was not had to be hidden.
     *
     * Hosts with no room for it — a read-only embed, a preview pane — can still
     * pass `false`.
     */
    showRuler?: boolean;
    /** Forwarded to the toolbar: `compact` for a document shown inside something else. */
    toolbarDensity?: 'full' | 'compact';
    /** The word-count / zoom bar along the bottom. Off for an embedded pane. */
    showStatusBar?: boolean;
    /** `fit` pins the sheet to the pane's width and ignores the remembered zoom — for a document shown in a narrow host. */
    zoomMode?: 'remembered' | 'fit';
    /**
     * Show the outline column beside the page.
     *
     * Off by default: it is the host's call whether a document is long enough to
     * need navigating, and an outline on a two-paragraph note is a column of
     * emptiness next to the thing you are reading.
     */
    showOutline?: boolean;
    /**
     * Draw page boundaries on the sheet: a 24px band of desk every 1056px with
     * a one-inch margin of white on each side of it, and a page count in the
     * status bar. Also pads the last sheet out to a whole page, and moves
     * content so that nothing lands on a boundary or in a margin.
     *
     * ON by default, which is a reversal — so here is what changed.
     *
     * It was off because a seam sliced pictures in half. Pagination was one
     * idea: a baseline grid whose row is the body line advance, plus a seam
     * thinner than the leading between two lines. Wonderful for prose, useless
     * the moment a screenshot appears — an image's intrinsic height cannot be
     * rounded to a 26.4px row, so it knocked every line below it off the grid
     * for the rest of the document. Measured over 1000 generated documents:
     * 8.4% of seams bisected on prose, 72.7% once images and tables were in the
     * mix. Shipping that was worse than one long sheet, so it stayed a prop.
     *
     * The grid is still there and still does the prose half of the job, but it
     * is no longer alone. `canvas/pageFlow.ts` now measures every top-level
     * block and moves the ones a seam would cut: an image, a table, a rule, a
     * code block or a heading is pushed to the next page rather than sliced, a
     * paragraph gets orphan/widow control instead, and the baseline grid is
     * re-snapped underneath anything whose height was intrinsic. Same corpus,
     * same 1000 documents: 0.0% of seams bisected, prose and pictures alike, for
     * about 6% more sheets.
     *
     * What has NOT changed is that pagination and the baseline grid are one
     * feature: the typography still moves when this is on. Paragraph gaps go
     * 14.4px -> 26.4px and headings and code blocks are re-spaced, so the page
     * gets airier. That is the mechanism, not a side effect.
     *
     * ## Every page has margins now, and it costs about a third more sheets
     *
     * This used to protect a hairline. Interior pages had no top or bottom
     * margin at all — page one had its inch and page one alone, and everywhere
     * else the text ran down to the boundary and started again straight below
     * it. The flow now reserves the same inch on both sides of every boundary
     * and moves anything that would reach into it, prose included: measured over
     * 1500 generated documents, 0 of 11,619 prose margins and 0 of 13,800 mixed
     * ones carry ink.
     *
     * Two consequences a host should know about before turning this on.
     *
     *   - SHEETS. 211.2px of every 1056 is margin, and a paragraph that can no
     *     longer flow through a boundary leaves a ragged page bottom on top of
     *     that. Same corpus: 1.30x the pages. `pageCount` and "Page 3 of 7"
     *     report the new number, which is the honest one — it is the number of
     *     sheets this document would occupy.
     *   - RAGGED BOTTOMS. Google Docs breaks a paragraph across a page and fills
     *     the sheet; this cannot, because a paragraph is one block box in a
     *     continuous flow and no CSS inserts two inches of dead space into the
     *     middle of one. A page therefore ends after its last whole paragraph.
     *
     * Both are in `canvas/pageFlow.ts` under "## Why every page has margins".
     *
     * Hosts that want the endless sheet — a preview pane, an embed with no room
     * for page furniture — can still pass `false`, and get back exactly the
     * document they had before any of this existed.
     */
    paginate?: boolean;
    /**
     * Flips `gutterVisible`. Its absence means no toggle is offered at all,
     * which is the right default for a read-only embed with no place to store
     * the answer.
     */
    onToggleGutter?: () => void;
    /**
     * Forwarded to the toolbar's image button. See DocumentToolbar's prop docs:
     * the host owns the picker and the upload, this view only decides that the
     * control belongs on the bar rather than in the host's `toolbarActions`
     * slot, where it would sit beside presence instead of beside the other
     * insert controls.
     */
    onInsertImage?: () => void;
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
 * The canvas body, as markdown.
 *
 * A page-shaped document keeps its content in ONE XmlFragment, not in
 * `sections` — so an export built from `data.sections` produced a file with a
 * title and nothing under it. Silently: you get a download, it opens, and your
 * document is not in it.
 *
 * Structure is read from the node names rather than stripped out, because
 * "Export Markdown" that flattens every heading and list into loose lines is
 * only half an answer.
 */
export declare function canvasFragmentToMarkdown(frag: {
    toString(): string;
} | null | undefined): string;

export declare const CanvasLineSpacing: Extension<CanvasLineSpacingOptions, any>;

export declare interface CanvasLineSpacingOptions {
    /**
     * Node names that gain the attribute.
     *
     * `paragraph` only, and headings are deliberately excluded. `styles.css`
     * sizes every heading in whole rows for a stated typographic reason — an h1
     * gets two rows "because 32px type cannot wrap on 26.4px leading without the
     * lines colliding" — so a spacing control that could write a heading's
     * leading would let Select-All + Single collapse 32px glyphs into a 26.4px
     * box. Heading leading is a constant of this paper, not a user setting.
     */
    types: string[];
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

export declare function DocumentFindBar({ editor, onClose, canReplace, focusNonce, className, 'data-testid': testId, }: DocumentFindBarProps): JSX.Element;

export declare interface DocumentFindBarProps {
    editor: Editor | null;
    /** Closes the bar — Escape, or the × . */
    onClose: () => void;
    /** Hidden when the document cannot be edited; find still works. */
    canReplace?: boolean;
    /**
     * Bump to pull focus back into the query field and select what is in it.
     *
     * This is what makes a SECOND Cmd/Ctrl+F do something. With the bar already
     * open the host's shortcut handler has nothing left to change — `findOpen`
     * is already true — so the keystroke read as dead while the caret stayed in
     * the document. A monotonic token is the smallest thing that can say "focus
     * again" without the parent holding a ref into this component; selecting the
     * existing text is the word-processor behaviour, so the next keystroke
     * starts a new search instead of appending to the last one.
     *
     * Mount focuses regardless — the effect runs on the initial value too.
     */
    focusNonce?: number;
    className?: string;
    'data-testid'?: string;
}

export declare function DocumentGutter({ items, lead, gap, estimatedHeight, onFocusItem, emptyLabel, 'data-testid': testId, }: DocumentGutterProps): JSX.Element;

export declare interface DocumentGutterProps {
    items: readonly GutterItem[];
    /**
     * Pinned to the TOP of the gutter, above the threads — a docked call, say.
     *
     * In normal flow rather than anchored, because it belongs to the document
     * as a whole and not to a line of it. That does push the thread cards down
     * by its height, which is the honest tradeoff: a call and a comment cannot
     * both own the same strip of margin, and Google Docs resolves it the same
     * way — and it does cost real precision now that the offsets ARE real
     * positions, because every card below the lead sits that much lower than the
     * line it annotates.
     */
    lead?: ReactNode;
    /** Minimum vertical gap between two cards. */
    gap?: number;
    /** Approximate rendered height of a card, used for collision spacing. */
    estimatedHeight?: number;
    onFocusItem?: (id: string) => void;
    emptyLabel?: string;
    'data-testid'?: string;
}

export declare function DocumentHeader({ meta, mode, onModeChange, participants, onUpdateMeta, onExport, onToggleHistory, onToggleVideoCall, onToggleVideoHistory, isCallActive, callVariant, callLabel, onClearDocument, onJumpToUser, sections, onToggleMyItems, myItemCount, commentCount, onBack, onFollowUser, followingUserId, onFinalize, onUnlock, pastCallsCount, extraMenuItems, }: DocumentHeaderProps): JSX.Element;

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
    /**
     * Extra rows for the ⋯ menu — actions that are real but not frequent enough
     * to earn a permanent button. The alternative is a toolbar that grows one
     * control per feature until none of them are findable.
     */
    extraMenuItems?: ReadonlyArray<{
        id: string;
        label: string;
        onSelect: () => void;
    }>;
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

export declare function DocumentOutline({ entries, activeId, onSelect, emptyLabel, className, 'data-testid': testId, }: DocumentOutlineProps): JSX.Element;

export declare interface DocumentOutlineProps {
    entries: readonly OutlineEntry[];
    /** The entry the reader is currently inside, if the host tracks it. */
    activeId?: string | null;
    onSelect?: (id: string) => void;
    /** Shown when the document has no headings yet. */
    emptyLabel?: string;
    className?: string;
    'data-testid'?: string;
}

export declare function DocumentOwnership({ owner, collaborators, maxAvatars, onShare, className, 'data-testid': testId, }: DocumentOwnershipProps): JSX.Element | null;

export declare interface DocumentOwnershipProps {
    /** The document's owner. Omit while it is still loading — renders nothing. */
    owner?: DocumentPerson | null;
    /**
     * Everyone else with access, owner excluded. Shown as stacked avatars, so
     * the answer to "who else is on this" costs no reading.
     */
    collaborators?: readonly DocumentPerson[];
    /** How many avatars before the rest become a +N. Default 3. */
    maxAvatars?: number;
    /** Opens the share surface. Omit and no Share control is offered. */
    onShare?: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface DocumentPerson {
    userId: string;
    displayName: string;
    avatarUrl?: string;
}

export declare function DocumentRuler({ pageWidth, marginLeft, marginRight, zoom, className, style, 'data-testid': testId, }: DocumentRulerProps): JSX.Element;

export declare interface DocumentRulerProps {
    /**
     * Page width in DOCUMENT px — 816 is US Letter at 96dpi, and stays 816 at
     * every zoom. Pass a measured width divided by `zoom`, never the measured
     * width itself.
     */
    pageWidth?: number;
    /** Left margin in DOCUMENT px. Default 96 — one inch. */
    marginLeft?: number;
    /** Right margin in DOCUMENT px. Default 96 — one inch. */
    marginRight?: number;
    /**
     * Scale the page is displayed at. 1 is 100%.
     *
     * The ruler multiplies every measure by it — geometry AND the inch grid —
     * rather than being told a second set of numbers that could disagree with
     * the first. This is what keeps a label honest when the page is zoomed: an
     * inch mark moves to `96 * zoom` screen px and is still labelled 1.
     */
    zoom?: number;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

/**
 * Which authoring surface a new document opens in.
 *
 * `page` becomes `meta.schemaVersion = 2` on the document's CRDT — the one
 * gate the editor branches on. Doing that translation is the host's job, not
 * this modal's; the modal only reports which shape the person chose.
 */
export declare type DocumentShape = 'page' | 'sections' | 'diagram';

export declare function DocumentShareDialog({ open, onClose, documentTitle, people, generalAccess, orgName, onChangeGeneralAccess, onChangeRole, onInvite, onCopyLink, notice, 'data-testid': testId, }: DocumentShareDialogProps): JSX.Element;

export declare interface DocumentShareDialogProps {
    open: boolean;
    onClose: () => void;
    documentTitle?: string;
    /** Everyone with explicit access, owner first. */
    people: readonly ShareEntry[];
    generalAccess?: GeneralAccess;
    /** Name of the org, for the general-access wording. */
    orgName?: string;
    onChangeGeneralAccess?: (next: GeneralAccess) => void;
    onChangeRole?: (userId: string, next: ShareRole) => void;
    /** Invite by email or name. The host resolves it to a person. */
    onInvite?: (query: string) => void;
    /** Copy a link to the document. */
    onCopyLink?: () => void;
    /**
     * One line explaining a limit the reader would otherwise discover by being
     * wrong — most usefully, that this host cannot yet SAVE what the dialog
     * shows.
     *
     * The header says this component renders an answer someone else computed
     * and lies if the host lies. That is the correct division of labour and it
     * leaves a gap: a host with no persistence can omit `onChangeRole` to make
     * the roles read-only, but then the reader sees a permissions dialog that
     * simply refuses to work and is told nothing. Withholding a control is
     * honest; withholding the reason is not.
     */
    notice?: string;
    'data-testid'?: string;
}

export declare function DocumentStatusBar({ wordCount, zoom, onZoomChange, fitActive, onFitWidth, children, className, 'data-testid': testId, }: DocumentStatusBarProps): JSX.Element;

export declare interface DocumentStatusBarProps {
    /** Document length. Null when unknown — renders nothing rather than "0 words". */
    wordCount?: number | null;
    zoom?: number;
    onZoomChange?: (zoom: number) => void;
    /**
     * True while the sheet is tracking the workspace width. The control then
     * reads "Fit width" rather than the percentage that rule currently produces
     * — the percentage is an output, and showing it as the selection invites the
     * reader to think they chose it.
     */
    fitActive?: boolean;
    /**
     * Offered only when the host can actually do it — it needs to know how much
     * room the sheet has, which this bar does not. Absent, no Fit option renders.
     */
    onFitWidth?: () => void;
    /** Anything else the host wants along the bar (a save state, a page count). */
    children?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare interface DocumentTarget {
    /** Legacy landmark: the section this item belongs to. Empty on a canvas. */
    sectionId?: string | null;
    /** Canvas landmark: the comment thread whose highlight sits in the page. */
    commentId?: string | null;
}

export declare function DocumentToolbar({ editor, actions, commentCount, gutterVisible, onToggleGutter, onInsertImage, density, 'data-testid': testId, }: DocumentToolbarProps): JSX.Element | null;

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
    /**
     * Asks the host to put a picture on the page.
     *
     * The toolbar deliberately does not own the file picker. Getting bytes into
     * a document means an upload, and where those bytes go — which channel,
     * which storage, which auth — is knowledge only the app has. What the
     * library owns is the button, its place in the bar (beside the other insert
     * controls, where a word processor puts it) and the fact that it appears at
     * all only when the schema can hold an image: `setImage` absent means the
     * editor was built without the extension, and a button that inserts a node
     * the schema will reject is worse than no button.
     */
    onInsertImage?: () => void;
    /**
     * `compact` is the toolbar for a document shown INSIDE something else — a
     * chat's side pane, a card. Undo/redo, the inline marks, lists and link;
     * no typefaces, colours, alignment, tables or images. Those still exist
     * (the full page has them), they are just not what a reading pane is for.
     */
    density?: 'full' | 'compact';
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

/**
 * The element a target points at, on whichever shape this document is.
 *
 * Section first: on a legacy document the section is the more specific answer,
 * and a legacy comment carries a section id anyway. A canvas comment carries an
 * empty section id by construction, so the fall-through is the canvas path —
 * and a CONVERTED document, whose old comments still carry section ids that no
 * longer render, falls through too rather than giving up at the first miss.
 */
export declare function findDocumentTarget(target: DocumentTarget, root?: ParentNode): HTMLElement | null;

/** A match, as a ProseMirror document range. */
export declare interface FindMatch {
    from: number;
    to: number;
}

/**
 * Every occurrence of `query`, in document order.
 *
 * Case-insensitive by default, the way a word processor's find is. An empty or
 * whitespace-only query matches nothing rather than everything — the natural
 * reading of "I have not typed anything yet", and it keeps the bar from
 * selecting the whole document the moment it opens.
 *
 * Matches never span text nodes. A run split by a mark boundary — half a word
 * in bold — is two nodes, and joining them would produce positions that do not
 * address contiguous text. Word processors have the same limitation; it is
 * invisible in practice and honest, which is better than a position that lies.
 */
export declare function findMatches(doc: TextWalkable | null | undefined, query: string, opts?: {
    caseSensitive?: boolean;
}): FindMatch[];

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

/** How the wider organisation sees this document. */
export declare type GeneralAccess = 'restricted' | 'org-view' | 'org-edit' | 'link-view';

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

/**
 * True when the document is page-shaped.
 *
 * Deliberately takes a Y.Doc rather than a meta object so there is no way to
 * call it with a stale snapshot of meta taken before a conversion.
 */
export declare function isCanvasDocument(ydoc: Doc | null | undefined): boolean;

export declare function isLineSpacing(value: unknown): value is LineSpacing;

export declare function KeyDecisionsCard({ sections }: {
    sections: Section[];
}): JSX.Element;

/** What each value is called in the menu — Google Docs' words, where it has them. */
export declare const LINE_SPACING_LABELS: Record<LineSpacing, string>;

/**
 * The spacings offered, as multiples of one grid row.
 *
 * `'1'` is the paper's own leading and is stored as ABSENCE — see
 * `setLineSpacing`. Strings rather than numbers so the stored value, the
 * `data-line-spacing` attribute and the menu's radio state are all one type and
 * `1.5` never arrives back as `1.4999999999999998`.
 */
export declare const LINE_SPACINGS: readonly ["1", "1.5", "2"];

export declare type LineSpacing = (typeof LINE_SPACINGS)[number];

/**
 * The rendered attributes for a spacing, or nothing when it is the default.
 *
 * `--doc-line` is defined on `.doc-page--paginated`; the `1.65em` fallback is
 * the same leading expressed against the element's own font size, so an
 * unpaginated page (or a section editor, which shares this schema) gets a
 * proportional result rather than an unresolved `calc`.
 *
 * `data-line-spacing` carries the value because it is what `parseHTML` reads
 * back: parsing our own computed `line-height` would mean parsing a `calc()`
 * string, and reading the element's RESOLVED style would drag whichever value
 * the browser happened to compute into the CRDT.
 */
export declare function lineSpacingAttributes(value: unknown): Record<string, string>;

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
    /**
     * Jump to the item in the document.
     *
     * `commentId` is not optional decoration — it is the ONLY landmark a canvas
     * has. A page-shaped document renders no `#section-<id>` elements and files
     * its comments under an EMPTY section id (they are anchored to a text range
     * instead), so passing the section id alone meant every row here was inert on
     * every page document: the row highlighted on hover and the click did
     * nothing, with no error. See `./canvas/scrollToDocumentTarget`, which
     * resolves whichever landmark the document in front of it actually has.
     */
    onNavigateToSection: (sectionId: string, commentId?: string) => void;
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
        /**
         * Absent for a diagram: a whiteboard has no document type, so there is no id
         * to send. Optional rather than a sentinel — a fake id would be looked up
         * somewhere eventually and found missing.
         */
        documentTypeId?: string;
        shape: DocumentShape;
    }) => void;
}

/**
 * The match a person means by "next" from where the cursor is.
 *
 * Wraps, and treats the match the cursor is already sitting on as the current
 * one rather than skipping past it — pressing Enter in a find bar should step
 * from where you are, not from wherever the last search left off.
 */
export declare function nextMatchIndex(matches: readonly FindMatch[], cursorPos: number, direction?: 1 | -1): number;

/**
 * The slice of a Tiptap editor this needs.
 *
 * Structural on purpose: ui-components keeps the tiptap packages as optional
 * peers, and an outline is not a reason for a host to install them.
 */
declare interface OutlineEditorLike {
    state: {
        doc: {
            descendants(fn: (node: OutlineNodeLike, pos: number) => void): void;
        };
    };
    view: {
        domAtPos(pos: number): {
            node: Node;
        };
    };
    on(event: 'update', cb: () => void): void;
    off(event: 'update', cb: () => void): void;
}

export declare interface OutlineEntry {
    /** Opaque to this component — an element id, a position, whatever the host resolves. */
    id: string;
    text: string;
    /** 1-6. Drives indentation only; the list is flat and in document order. */
    level: number;
}

declare interface OutlineNodeLike {
    type: {
        name: string;
    };
    attrs?: Record<string, unknown>;
    textContent?: string;
}

/**
 * The stored value for something read off the DOM, or `null` for anything else.
 *
 * Narrowed to the closed set at the boundary for the same reason `textAlign`
 * narrows there: pasted HTML carries `line-height: normal`, `120%`, `inherit`
 * and worse, and storing those verbatim would put values in the CRDT that no
 * command can produce and every future reader has to defend against.
 */
export declare function parseLineSpacing(value: unknown): LineSpacing | null;

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

/** CSS pixels per inch at the canvas's 96dpi page scale. */
export declare const PX_PER_INCH = 96;

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

/** Walk the document once and collect its headings, in order. */
export declare function readOutline(editor: OutlineEditorLike | null): OutlineEntry[];

/**
 * The raw schema version, or 0 when there is none.
 *
 * Zero rather than null: a legacy document has no version, and "no version" and
 * "version 0" mean the same thing to every caller.
 */
export declare function readSchemaVersion(ydoc: Doc | null | undefined): number;

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

/**
 * Scroll to the target and flash it.
 *
 * Returns whether anything was found, so a caller can tell "navigated" from
 * "there was nowhere to go" instead of assuming the former — which is how this
 * failed silently for the whole life of the canvas.
 */
export declare function scrollToDocumentTarget(target: DocumentTarget, root?: ParentNode): boolean;

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

export declare const SHARE_ROLES: readonly ShareRole[];

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

export declare interface ShareEntry extends DocumentPerson {
    role: ShareRole;
}

/** What a person may do with the document. */
export declare type ShareRole = 'owner' | 'editor' | 'commenter' | 'viewer';

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

export declare const SUGGESTION_AUTHORING_MODES: {
    value: SuggestionAuthoringMode;
    label: string;
    /** Shown as the control's title — the whole point is that people can tell them apart. */
    hint: string;
}[];

/** What the reader's typing currently does. */
export declare type SuggestionAuthoringMode = 'editing' | 'suggesting' | 'viewing';

export declare function SuggestionCard({ kind, author, when, deletedText, insertedText, active, onFocus, onAccept, onReject, className, 'data-testid': testId, }: SuggestionCardProps): JSX.Element;

/** What kind of change is being proposed. */
export declare type SuggestionCardKind = 'insert' | 'delete' | 'replace' | 'modify';

export declare interface SuggestionCardProps {
    kind: SuggestionCardKind;
    /** Display name of whoever proposed it. Never blank — see below. */
    author: string;
    /** When it was proposed, epoch ms. */
    when?: number | null;
    /** Text proposed for removal. */
    deletedText?: string;
    /** Text proposed for addition. */
    insertedText?: string;
    /** True for the suggestion the reader is currently sitting on. */
    active?: boolean;
    /** Scroll/select the change in the document. */
    onFocus?: () => void;
    /**
     * Accept/reject. BOTH optional and BOTH hidden when absent — a reader without
     * the authority to resolve a suggestion must not be shown buttons that do
     * nothing, which is the failure this whole surface exists to remove.
     */
    onAccept?: () => void;
    onReject?: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare function SuggestionModeControl({ mode, onModeChange, showViewing, openCount, disabled, className, 'data-testid': testId, }: SuggestionModeControlProps): JSX.Element;

export declare interface SuggestionModeControlProps {
    mode: SuggestionAuthoringMode;
    onModeChange: (mode: SuggestionAuthoringMode) => void;
    /**
     * Hide the Viewing segment.
     *
     * For a host that has no read-only surface to switch to. Offering a segment
     * that cannot be honoured is the exact failure this component exists to
     * avoid, so it is opt-out rather than silently no-op.
     */
    showViewing?: boolean;
    /**
     * Suggestions currently open, shown beside the pill.
     *
     * Null (the default) renders no count at all — which is NOT the same as zero.
     * A document whose suggestions have not been read yet must not claim there
     * are none.
     */
    openCount?: number | null;
    /** Read-only documents, finalized documents, a reader without permission. */
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
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

/** The subset of a ProseMirror node this needs. Keeps the module editor-free. */
declare interface TextWalkable {
    descendants(fn: (node: {
        isText?: boolean;
        text?: string | null;
    }, pos: number) => void): void;
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

export declare function useDocumentActions({ documentId, userId, ws, updateMeta, addSection, exportJSON, getSectionFragment, getCanvasFragment, isCanvas, comments, }: UseDocumentActionsArgs): {
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
    /** The canvas body fragment, for page-shaped documents. Null on legacy ones. */
    getCanvasFragment?: () => XmlFragment | null;
    /**
     * Whether this document is page-shaped (`meta.schemaVersion >= 2`).
     *
     * Do NOT infer this as `sections.length === 0`. That inference is WRONG on
     * exactly the documents that matter most: converting a document does not
     * clear the legacy roots — realtime-modules says so in as many words,
     * "ydoc.getArray('sections') ← kept, frozen, never read at version >= 2" — so
     * every CONVERTED document still has a full section array. The inference says
     * "legacy", and Export writes out the pre-conversion content. You get a file,
     * it opens, and everything typed on the page since the conversion is missing
     * from it, with no error and no empty file to tip you off.
     *
     * The gate is the schema version and nothing else. `useIsCanvasDocument` in
     * `./canvas/documentShape` computes it.
     */
    isCanvas?: boolean;
    comments: Record<string, CommentThread[]>;
}

export declare function useDocumentOutline(editor: OutlineEditorLike | null): UseDocumentOutlineResult;

declare interface UseDocumentOutlineResult {
    entries: OutlineEntry[];
    activeId: string | null;
    /** Scroll the document to an entry and mark it current. */
    goTo: (id: string) => void;
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

/**
 * The shape, kept live.
 *
 * `meta` is a CRDT map: a collaborator converting the document flips this under
 * us mid-session, and the editor has to swap paths when it does. Reading the
 * value during render instead would latch whatever was true at mount.
 */
export declare function useIsCanvasDocument(ydoc: Doc | null | undefined): boolean;

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

export declare function VideoDockSlot({ docked, canAccept, dockId, label, hint, undockLabel, onRequestUndock, onDragOver, onDragLeave, onDrop, className, children, 'data-testid': testId, }: VideoDockSlotProps): JSX.Element | null;

export declare interface VideoDockSlotProps {
    /** True when the caller has portaled the live widget into `children`. */
    docked: boolean;
    /**
     * True when a call exists and could be moved here. Gates BOTH the dashed
     * affordance and the drag-over feedback: a slot that cannot take the video
     * must not light up under a drag and promise otherwise.
     */
    canAccept: boolean;
    /**
     * Identifies this slot to a POINTER drag.
     *
     * HTML5 drag-and-drop is not the only way the widget arrives. While the
     * widget floats it is repositioned by a mousedown/mousemove drag, and that
     * gesture calls `preventDefault()` on mousedown — which is precisely what
     * stops a native `dragstart` firing on the same element. So a user dragging
     * the widget by its body generates no `drop` event here, ever, no matter how
     * accurately they land on this box.
     *
     * Publishing the id in the DOM lets the free-drag hit-test for slots on
     * mouseup and dock without a DataTransfer. Omit it and this slot is only
     * reachable by the HTML5 path.
     */
    dockId?: string;
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

/**
 * A ranked guess at where the remark belongs.
 *
 * Ordering only. `score` decides the order and is never rendered as a number —
 * no percentage, no bar, nothing that invites reading a ranking heuristic as a
 * probability.
 */
export declare interface WorkItemCandidate {
    sectionId: string;
    sectionTitle?: string;
    score: number;
    reason: string;
}

export declare function WorkItemRow({ itemId, utterance, unplaced, targetLabel, reason, contextSplit, drafting, draftError, candidates, sections, onPropose, onAttach, onDismiss, className, 'data-testid': testId, }: WorkItemRowProps): JSX.Element;

export declare interface WorkItemRowProps {
    /** Identifies the row and seeds its test ids. */
    itemId: string;
    /** The verbatim remark. */
    utterance: string;
    /**
     * True when the capture path could not place this remark. Changes the chip
     * and reveals the filing controls — it never withholds an action.
     */
    unplaced?: boolean;
    /**
     * Where it is filed, in words, when it IS placed. Ignored when `unplaced`.
     */
    targetLabel?: string;
    /** Why the capture path declined to place it. Shown so it is never a mystery. */
    reason?: string;
    /** True when the speaker's screen moved mid-utterance. */
    contextSplit?: boolean;
    /** A draft is in flight; the draft action reads as busy and is disabled. */
    drafting?: boolean;
    /** A drafting failure, shown verbatim rather than swallowed. */
    draftError?: string;
    /** Ranked guesses. Ordered here, never pre-selected. */
    candidates?: WorkItemCandidate[];
    /** All sections, so a user can file the remark somewhere no candidate names. */
    sections: Array<{
        id: string;
        title: string;
    }>;
    /** Turn the remark into a proposal. Offered on every remark, placed or not. */
    onPropose: () => void;
    /** File the remark under a section. */
    onAttach: (sectionId: string) => void;
    /** Discard the remark. */
    onDismiss: () => void;
    className?: string;
    'data-testid'?: string;
}

/**
 * The select value that means "keep the sheet as wide as the space allows".
 *
 * A sentinel string rather than a number because fit width is not a scale, it
 * is a RULE about one: the resulting percentage changes when the window does,
 * when a rail opens, when the sidebar collapses. Storing the number it happens
 * to produce would freeze the answer and quietly stop fitting.
 */
export declare const ZOOM_FIT = "fit";

/**
 * The scales worth offering. The useful ones are few and the one that matters
 * is named: 100% is the printed size.
 */
export declare const ZOOM_STEPS: readonly [0.5, 0.75, 0.9, 1, 1.25, 1.5, 2];

export { }


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasLineSpacing: {
            /**
             * Space the paragraphs in the selection.
             *
             * `'1'` UNSETS rather than storing `1`, so a paragraph returned to single
             * spacing carries no inline style at all and follows the paper — the same
             * rule the font picker's "Default" and the alignment's unset follow, and
             * the reason an untouched document stays untouched.
             */
            setLineSpacing: (spacing: LineSpacing) => ReturnType;
            /** Return the paragraphs in the selection to the paper's own leading. */
            unsetLineSpacing: () => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly {
                label?: string;
                url?: string;
            }[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        hitlMacro: {
            /** Inserts an agent -> human callout at the selection. */
            insertHitl: (draft: HitlDraft) => ReturnType;
            /**
             * Records an answer that was given SOMEWHERE ELSE — the mirror row,
             * answered from an inbox by somebody who never opened this page.
             *
             * The same one-range edit answering in the page makes, addressed by
             * the callout's `id` instead of by a node view. Returns false when
             * no callout carries that id, when the body is not one
             * `answerHitlEdit` will write to, and — deliberately — when the
             * body ALREADY carries an answer: see `HITL_CONVERGENCE`.
             */
            answerHitl: (params: {
                id: string;
                answer: string;
                answeredBy?: string;
                answeredAt?: string;
            }) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}
