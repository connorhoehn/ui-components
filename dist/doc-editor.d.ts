import { Awareness } from 'y-protocols/awareness';
import { ComponentType } from 'react';
import { Context } from 'react';
import { CSSProperties } from 'react';
import { default as default_2 } from 'react';
import { Doc } from 'yjs';
import { DragEvent as DragEvent_2 } from 'react';
import { Editor } from '@tiptap/react';
import { Extension } from '@tiptap/core';
import { ForwardRefExoticComponent } from 'react';
import { JSX } from 'react';
import { MutableRefObject } from 'react';
import { Node as Node_2 } from '@tiptap/core';
import { NodeViewProps } from '@tiptap/react';
import { ReactNode } from 'react';
import { Ref } from 'react';
import { RefAttributes } from 'react';
import { RefObject } from 'react';
import { useEditor } from '@tiptap/react';
import { XmlFragment } from 'yjs';
import * as Y from 'yjs';

export declare function acceptsDocumentImage(file: File): boolean;

/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor (`CanvasDocumentView`); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
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

/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor (`CanvasDocumentView`); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
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

/** Insert a fresh slide after `afterIndex` (-1 puts it first). */
export declare function addSlide(spec: DeckSpec, afterIndex: number, layout?: SlideLayout): DeckSpec;

export declare function AttachmentsPanel({ documentId, editable }: AttachmentsPanelProps): JSX.Element;

declare interface AttachmentsPanelProps {
    documentId: string;
    editable: boolean;
}

/** Shared node view extracted from the reference document editor. */
export declare function AuthenticatedDocumentImageView({ node, selected }: NodeViewProps): JSX.Element;

declare interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
}

export declare const BULLET_STYLES: readonly ["disc", "circle", "square"];

export declare type BulletStyle = (typeof BULLET_STYLES)[number];

/** True when nothing blocks a save. Kept separate so the host can ask too. */
export declare function canSaveDeck(spec: DeckSpec): boolean;

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

/** The parts `renderFrame` receives. */
export declare interface CanvasDocumentFrame {
    /** Formatting toolbar plus the find/replace row when open; null when there is nothing to edit. */
    toolbar: ReactNode;
    /** The page ruler, aligned to the sheet; null when `showRuler` is off. */
    ruler: ReactNode;
    /** Header, banners and the canvas workspace. */
    surface: ReactNode;
}

export declare function CanvasDocumentView({ isCanvas, body, ydoc, provider, user, editable, extensions, onConvert, convertSlot, unsupported, schemaProbe, header, belowRuler, toolbarActions, gutterItems, gutterLead, onFocusGutterItem, onHoverGutterItem, gutterVisible, showRuler, toolbarDensity, showStatusBar, zoomMode, toolbarStyle, pageMargin, onDocumentStats, fitHeight, showOutline, paginate, onToggleGutter, renderFrame, onInsertImage, onEditorReady, 'data-testid': testId, }: CanvasDocumentViewProps): JSX.Element;

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
     * Rendered between the ruler (or the toolbar, with the ruler off) and the
     * sheet, across the editor column's width — the in-call follow bar
     * ("Following Alice · Session flow", mockups 02/03b/04/06). STICKY
     * (2.395.1): it starts under the ruler and, as the page scrolls, pins just
     * under the toolbar — follow mode moves the viewport for you, and the bar
     * is the way out, so it never scrolls away. Since 2.395.0.
     */
    belowRuler?: ReactNode;
    /**
     * Rendered at the right end of the toolbar — presence avatars, share, and
     * anything belonging to the document rather than to formatting.
     */
    toolbarActions?: ReactNode;
    /**
     * Annotations for the margin — comment threads, proposed edits, or both.
     * Each carries the offset it wants and the gutter resolves collisions
     * between them.
     *
     * Label each one's `kind`. The card's content is an opaque node, so this
     * view cannot tell a thread from a suggestion by looking, and the toolbar's
     * toggle has to name what it is hiding.
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
    /** Pointer over (`id`) / off (`null`) a margin card — see DocumentGutter. */
    onHoverGutterItem?: (id: string | null) => void;
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
    /**
     * The word-count / zoom bar along the bottom. Off for an embedded pane, and
     * off on a page whose zoom lives in the toolbar's ⋯ overflow instead — with
     * the bar off and `zoomMode` `remembered`, the toolbar gets `zoomControl`.
     * Read the length through `onDocumentStats` then.
     */
    showStatusBar?: boolean;
    /**
     * Horizontal page margin. `normal` is 1in on a letter sheet; `narrow` is
     * 0.75in — the documents workspace, where a typical line of the seeded
     * plan fits the measure instead of wrapping its last two words. The ruler
     * follows the same figure, so it keeps measuring what the page does.
     */
    pageMargin?: 'normal' | 'narrow';
    /**
     * The document's length as the status bar would report it, for a host that
     * shows it elsewhere (an info panel). Called when a figure changes; `null`
     * while unknown. `pageCount` is null on an unpaginated page.
     */
    onDocumentStats?: (stats: {
        wordCount: number | null;
        pageCount: number | null;
    }) => void;
    /** `fit` pins the sheet to the pane's width and ignores the remembered zoom — for a document shown in a narrow host. */
    zoomMode?: 'remembered' | 'fit';
    /**
     * `card` (since 2.386.5) draws the toolbar as one white rounded card on the
     * workspace grey, as the word-processor row (`DocumentToolbar
     * extras="overflow"`): alignment, indent, rule, table, clear formatting and
     * zoom behind its ⋯. `bar` (default) is the full-width strip.
     */
    toolbarStyle?: 'bar' | 'card';
    /**
     * How tall the grey workspace is. `viewport` (default) measures the view's
     * own distance from the top of the window and takes the rest of it, which
     * is what a host with an unbounded page needs. `parent` fills the box the
     * host gives it instead (`h-full`, the workspace `flex-1`), for a host that
     * already bounds the height — `EditorShell`, whose scroller pads by the
     * floating composer's `--dock-height`. Measured to the window there, the
     * workspace ran under the dock and the composer covered the last lines of
     * the page and the status bar.
     */
    fitHeight?: 'viewport' | 'parent';
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
     * Split the view so the host can place the chrome. Given a function, the view
     * stops drawing its own toolbar (with the find row) and ruler inside the
     * workspace and hands them over instead: put `toolbar` in `EditorShell`'s
     * `toolbar` slot, `ruler` under it (or drop it), and `surface` — the header,
     * banners and the canvas — in the body. `toolbar` and `ruler` are null until
     * they apply (read-only, editor not ready, `showRuler` off). Omitted keeps the
     * default single-frame layout unchanged. Same shape as the presentation
     * editor's `renderFrame`.
     */
    renderFrame?: (frame: CanvasDocumentFrame) => ReactNode;
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

export declare const CanvasListStyle: Extension<any, any>;

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

export declare const COMMENT_MARGIN_STORAGE_KEY = "doc-editor:canvas:gutter-visible";

export declare const COMMENT_REPLY_COMMANDS: {
    readonly resolve: "/resolve";
    readonly agent: "/agent";
    readonly assign: "/assign";
};

/**
 * WHERE a root comment was made, shown as a quoted header above its body.
 *
 *   quote     the anchored text as it reads NOW (or its snapshot, while the
 *             editor is still syncing)
 *   removed   the anchored text was deleted — the snapshot, marked as gone
 *   document  a comment on the whole document, with no span
 */
export declare type CommentContext = {
    kind: 'quote';
    text: string;
} | {
    kind: 'removed';
    text: string;
} | {
    kind: 'document';
};

/** The muted, left-ruled quote a comment card leads with. */
export declare function CommentContextHeader({ context }: {
    context: CommentContext;
}): JSX.Element;

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

export declare function CommentHandoffBar({ author, quote, variant, resolveOnApply, onResolveOnApplyChange, onDismiss, className, 'data-testid': testId, }: CommentHandoffBarProps): JSX.Element;

export declare interface CommentHandoffBarProps {
    author: string;
    /** The anchored text, when the comment has one. */
    quote?: string;
    /** `agent` (default): answering through the agent. `reply`: the composer is posting a reply. */
    variant?: 'agent' | 'reply';
    /** Agent variant only. */
    resolveOnApply?: boolean;
    onResolveOnApplyChange?: (next: boolean) => void;
    onDismiss: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface CommentMarginPreference {
    visible: boolean;
    /** Flips the margin and remembers the choice. */
    toggle: () => void;
    /** Opens the margin (a thread was opened) and remembers it. */
    show: () => void;
}

export declare interface CommentMarginPreferenceOptions {
    /** Where the choice is remembered. */
    storageKey?: string;
    /** What a reader who never chose sees. Default false (closed). */
    defaultVisible?: boolean;
}

export declare const CommentReplyComposer: ForwardRefExoticComponent<CommentReplyComposerProps & RefAttributes<CommentReplyComposerHandle>>;

export declare interface CommentReplyComposerHandle {
    focus: () => void;
    /** Inserts words at the caret — where a dictated utterance goes. */
    insertText: (text: string) => void;
}

export declare interface CommentReplyComposerProps {
    mentionUsers: MentionUser[];
    /** A plain reply. Resolve `false` to keep the draft. */
    onReply: (text: string) => void | boolean | Promise<void | boolean>;
    /** `/resolve` — absent on a reply-to-a-reply or a resolved thread. */
    onResolve?: () => void;
    /** `/agent <instruction>`; absent when no agent can edit the page. */
    onAskAgent?: (instruction: string) => void;
    /** `/assign @person`; absent hides the command. */
    onAssign?: (user: MentionUser) => void;
    onCancel?: () => void;
    dictation?: CommentReplyDictation;
    placeholder?: string;
    /**
     * `card` (default): the 280px margin card's compact box. `dock`: the page's
     * docked composer in Reply mode — the dock's comfortable density and
     * `editor` strip, so switching Agent → Reply does not change the box's size.
     */
    variant?: 'card' | 'dock';
    /** Send's label. Default `Reply`. */
    submitLabel?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface CommentReplyDictation {
    /** Mirrors the dictation hook's state; `unsupported` hides nothing, it says why. */
    state: DictationButtonState;
    /** True only while a microphone track is live. */
    micActive: boolean;
    /** Why pressing will not record (signed out, no transcriber) — shown as the tooltip. */
    unavailableReason?: string;
    start: () => void;
    stop: () => void;
}

/** What a sent draft asks for. Pure, so the routing is testable without an editor. */
export declare type CommentReplyIntent = {
    kind: 'reply';
    text: string;
} | {
    kind: 'resolve';
    note: string;
} | {
    kind: 'agent';
    instruction: string;
} | {
    kind: 'assign';
    userId: string | null;
    name: string;
} | {
    kind: 'empty';
};

export declare function commentReplyIntent(message: Pick<ComposedMessage, 'text'> & {
    command?: ComposedMessage['command'];
}): CommentReplyIntent;

/** A comment with nested replies, assembled client-side. */
declare interface CommentThread extends CommentData {
    replies: CommentThread[];
}

export declare function CommentThreadNode({ comment, context, actions, onAskAgent, renderReply, onReplyRequest, replyingToId, depth, onReply, mentionUsers, onResolveThread, onUnresolveThread, }: CommentThreadNodeProps): JSX.Element;

export declare interface CommentThreadNodeProps {
    comment: CommentThread;
    /** Root only: where the comment was made. Omitted → no header. */
    context?: CommentContext;
    /**
     * Root only: extra actions after Reply / Resolve (WS-J lane B — Ask agent,
     * dictate…). The host owns what they do.
     */
    actions?: ReactNode;
    /**
     * Root, unresolved only: an "Ask agent" action beside Reply / Resolve (WS-J
     * lane B). The host hands the comment to its agent composer.
     */
    onAskAgent?: (commentId: string) => void;
    /**
     * Replaces the built-in reply textarea — a host passes a
     * `CommentReplyComposer` wired to dictation and its agent. `submit` posts a
     * reply to THIS comment; `close` hides the box.
     */
    renderReply?: (args: {
        commentId: string;
        depth: number;
        submit: (text: string) => void;
        close: () => void;
    }) => ReactNode;
    /**
     * Reply goes somewhere else: pressing it calls this instead of opening any
     * box in the card — the host moves the reply into its docked composer
     * (Reply mode). Reaches nested replies too.
     */
    onReplyRequest?: (args: {
        commentId: string;
        depth: number;
        author: string;
        text: string;
    }) => void;
    /** The comment whose reply is being written elsewhere: its Reply is drawn pressed (`aria-pressed`). */
    replyingToId?: string | null;
    depth: number;
    onReply: (parentId: string, text: string) => void;
    mentionUsers: MentionUser[];
    onResolveThread?: (commentId: string) => void;
    onUnresolveThread?: (commentId: string) => void;
}

/** What the composer hands back on send. */
declare interface ComposedMessage {
    /** Rich body. Empty when only files were attached. */
    html: string;
    /** Plain-text fallback, for clients and notifications that cannot render HTML. */
    text: string;
    /** Everyone the sender explicitly mentioned, de-duplicated, in document order. */
    mentions: MentionCandidate[];
    /** Files staged in the composer, sent WITH the message. */
    files: File[];
    /** Every document the sender referenced with `#`, de-duplicated, in document order. Absent when there are none. */
    documents?: Array<{
        id: string;
        label: string;
    }>;
    /**
     * Set when the draft starts with a known command trigger. `argument` is the
     * item picked from the argument menu, present only when the pick was made
     * in THIS draft and its label is still in the text — an edited-away label
     * means the person changed their mind, and the host should read `text`.
     */
    command?: {
        trigger: string;
        argument?: ComposerArgumentItem;
    };
    /**
     * Who can see this message. Mirrors the `privacy` prop at send time, so a
     * host with no opinion on the feature still gets `'visible'` rather than an
     * absent field.
     */
    privacy: 'visible' | 'hidden';
    /**
     * Which mode composed this. Present only while a host has wired
     * `onModeChange` — like `RichChatDraft.privacy`, a host that never adopts
     * the feature never sees the key. `'agent'` also rewrites `text` to
     * `/agent <what was typed>`, so the host's existing `/agent` command path
     * handles it with no second code path.
     */
    mode?: ComposerMode;
}

declare interface ComposerArgumentItem {
    /** Stable identity — this is what travels to the host, not the label. */
    id: string;
    label: string;
    /** Shown on the right of the row: where it lives, who owns it. */
    hint?: string;
    /** A glyph for the row, e.g. `📄`. */
    icon?: string;
}

/**
 * Where a dock sits. `overlay` (the default, outside a shell) floats over the
 * bottom of its positioned parent with a fade and writes `--dock-height` for
 * the content to pad by. `pinned` is a normal-flow last row: the content's
 * scroll box ENDS at the dock's top edge, so nothing in the content can scroll
 * under it or be drawn over it. `EditorShell` pins every dock it hosts
 * (2.365.0) — a host cannot opt a shell's composer back into overlapping.
 */
export declare type ComposerDockPlacement = 'overlay' | 'pinned';

export declare const ComposerDockPlacementContext: Context<ComposerDockPlacement>;

/** What the composer is for, right now. */
declare type ComposerMode = 'chat' | 'agent' | 'terminal';

/** Connection lifecycle states */
declare type ConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

export declare function countAllComments(threads: CommentThread[]): number;

/** Inject the caller's image extension to preserve one TipTap module graph. */
export declare function createAuthenticatedDocumentImage(image: Node_2): Node_2;

export declare const DECK_THEMES: readonly DeckTheme[];

export declare interface DeckChart {
    kind: 'bar' | 'line';
    labels: string[];
    series: Array<{
        name: string;
        values: number[];
    }>;
}

/**
 * An image slide carries only its alt text. Nothing is fetched at render time,
 * so the slide is a framed caption until a real asset pipeline puts bytes
 * behind it.
 */
export declare interface DeckImage {
    alt: string;
}

export declare interface DeckQuote {
    text: string;
    by: string;
}

export declare interface DeckSlide {
    id: string;
    layout: SlideLayout;
    title: string;
    eyebrow?: string;
    bullets?: string[];
    columns?: [string[], string[]];
    chart?: DeckChart;
    quote?: DeckQuote;
    image?: DeckImage;
    notes?: string;
    sources: DeckSource[];
}

/** A citation: the document the claim came from, and (optionally) where in it. */
export declare interface DeckSource {
    documentId: string;
    anchor?: string;
    title: string;
}

export declare interface DeckSpec {
    title: string;
    subtitle?: string;
    theme?: DeckTheme;
    slides: DeckSlide[];
}

export declare type DeckTheme = 'product' | 'engineering' | 'plain';

/** The handoff's four tabs, for a host that has all of them. */
export declare const DEFAULT_EDITOR_SHELL_TABS: readonly EditorShellTab[];

/** A press shorter than this is a click: it toggles instead of stopping on release. */
export declare const DICTATION_HOLD_MS = 250;

export declare function DictationButton({ state, micActive, unavailableReason, onStart, onStop, className, 'data-testid': testId, }: DictationButtonProps): JSX.Element;

export declare function dictationButtonLabel(state: DictationButtonState, micActive: boolean, unavailableReason?: string): string;

export declare interface DictationButtonProps {
    state: DictationButtonState;
    micActive: boolean;
    /** Why pressing will not record; the button stays visible and says so. */
    unavailableReason?: string;
    onStart: () => void;
    onStop: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare type DictationButtonState = 'unsupported' | 'idle' | 'starting' | 'listening' | 'transcribing' | 'error';

export declare function DiffViewer({ oldSections, newSections, onClose }: DiffViewerProps): JSX.Element;

declare interface DiffViewerProps {
    /** Sections from the historical (older) version. */
    oldSections: SnapshotSection[];
    /** Sections from the current (newer) version. */
    newSections: SnapshotSection[];
    /** Called when the user dismisses the diff view. */
    onClose: () => void;
}

/** The custom property the dock writes on its parent. */
export declare const DOCK_HEIGHT_VAR = "--dock-height";

/**
 * The pinned dock's horizontal gutter, read from any ancestor. Default `1rem`
 * — match it to whatever the host wraps its toolbar and status bar in, and
 * the dock's edges line up with theirs.
 */
export declare const DOCK_INSET_VAR = "--dock-inset";

/** The pill's words per mode, for a host or a menu that states the mode without the pill. Since 2.385.1. */
export declare const DOCUMENT_MODE_LABELS: Record<DocumentModePillMode, string>;

/**
 * Content-box widths (px) of the bar itself, not the window: the same toolbar
 * sits in a full-width page, beside a workbench, and inside a chat pane.
 *
 * - wide (≥ 1240): everything inline — this is the old bar.
 * - medium (≥ 840): the style selects, bold/italic/underline, bullet and
 *   numbered lists and link stay; strike, inline code, the task list, the
 *   colour palettes, alignment, spacing, inserts and clear-formatting move
 *   behind ⋯. The host's actions read `useDocumentToolbarSize()` and shrink
 *   too (the page's Comment button becomes an icon beside the presence
 *   avatars).
 * - narrow: the three style selects fold into one `Style ▾` panel.
 *
 * Measured, not guessed (every extension registered, the page's avatars and
 * Comment in `actions`): the wide bar's natural width is ~1200px, medium's
 * ~820px, narrow's ~520px. The page editor's bar is 892px wide at a 1640px
 * window and 532px at 1280px.
 */
export declare const DOCUMENT_TOOLBAR_BREAKPOINTS: {
    readonly narrow: 840;
    readonly wide: 1240;
};

export declare function DocumentEditorPage({ documentId, documentType, ws, userId, displayName, color, onMessage, activityPublish, onBack, isVideoDocked, onDockVideo, onUndockVideo, idToken, }: DocumentEditorPageProps): JSX.Element;

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
    /**
     * Bearer token for the editor's REST calls. Wins over this library's
     * `useIdentityContext().idToken` — see `useDocumentEditorState`'s
     * `idToken` prop, which this passes straight through.
     */
    idToken?: string | null;
}

/**
 * One file action in the ⋯ menu. A `disabledReason` shows the row greyed with
 * that reason as its tooltip (the viewer may not do it); leave the action out
 * entirely when it does not apply to this document at all. Since 2.390.3.
 */
export declare interface DocumentFileAction {
    onSelect: () => void;
    disabledReason?: string;
}

/**
 * The file menu of a document head (the Documents mockup's ⋯): five groups —
 * Rename / Move to / Make a copy · Copy link · Create from this › / Run
 * workflow / Save as template · Download as › / Print ⌘P · Move to trash.
 * Passing it switches the `menu` layout's ⋯ to this structure; the host's
 * `extraMenuItems`, history, lifecycle and toggles fold into those groups.
 * Since 2.390.3.
 */
export declare interface DocumentFileActions {
    rename?: DocumentFileAction;
    move?: DocumentFileAction;
    copy?: DocumentFileAction;
    copyLink?: DocumentFileAction;
    createFrom?: {
        presentation?: DocumentFileAction;
        summary?: DocumentFileAction;
        actionList?: DocumentFileAction;
        chooseTemplate?: DocumentFileAction;
        /** The flyout's footer. Default 'Creates a new document.' */
        caption?: string;
        /** When every entry is disabled for one reason, the parent row says it. */
        disabledReason?: string;
    };
    runWorkflow?: DocumentFileAction;
    saveAsTemplate?: DocumentFileAction;
    /** Each a real export ("Markdown (.md)"). Empty or absent: no Download row. */
    downloads?: ReadonlyArray<DocumentFileAction & {
        id: string;
        label: string;
    }>;
    print?: DocumentFileAction;
    trash?: DocumentFileAction;
}

/** Structural injection keeps the UI package independent of the runtime package. */
export declare type DocumentFileUploadHook = (channel: string, options: {
    displayName: string;
    previewMaxEdge: number;
    onComplete: (completion: DocumentUploadCompletion) => void;
}) => {
    upload: (file: File) => Promise<{
        status: string;
        error?: string;
        transferId?: string;
    }>;
};

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

export declare function DocumentGutter({ items, lead, gap, estimatedHeight, onFocusItem, onHoverItem, emptyLabel, 'data-testid': testId, }: DocumentGutterProps): JSX.Element;

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
    /**
     * The pointer entered (`id`) or left (`null`) a card — the host paints that
     * card's anchored range stronger, so reader sees WHERE it points before
     * clicking.
     */
    onHoverItem?: (id: string | null) => void;
    emptyLabel?: string;
    'data-testid'?: string;
}

export declare function DocumentHeader(props: DocumentHeaderProps): JSX.Element;

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

/**
 * The existing selectable-mode contract remains compatible. New document hosts
 * omit onModeChange: mode is a server-derived fact, and the shared workspace
 * composition owns lifecycle confirmation, ownership and contextual actions.
 */
export declare type DocumentHeaderProps = LegacyDocumentHeaderProps | (WorkspaceDocumentHeaderProps & {
    onModeChange?: never;
});

/** Fetch bytes using the current viewer's identity; credentials never enter the document. */
export declare type DocumentImageLoader = (src: string, signal: AbortSignal) => Promise<Blob>;

export declare function DocumentImageProvider({ children, ...value }: DocumentImageProviderProps): JSX.Element;

export declare interface DocumentImageProviderProps {
    loadImage: DocumentImageLoader;
    /** Only these URLs are passed to the authenticated loader. Defaults to gateway uploads. */
    requiresAuthentication?: (src: string) => boolean;
    children: ReactNode;
}

export declare interface DocumentImageUpload {
    uploadImage: (file: File) => Promise<string>;
    uploadFile: (file: File) => Promise<UploadedDocumentFile>;
    accepts: (file: File) => boolean;
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

/** The lifecycle status as the header prints it — "Draft", "In review" — for a host's own title row. */
/** `variant="tag"` (since 2.386.5): the soft label an editor head puts beside the title. */
export declare function DocumentLifecyclePill({ status, variant }: {
    status: DocumentLifecycleStatus;
    variant?: 'pill' | 'tag';
}): JSX.Element;

/** Presentation vocabulary of the document lifecycle API, not an authorization table. */
export declare type DocumentLifecycleStatus = 'draft' | 'in_review' | 'changes_requested' | 'approved' | 'finalized';

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

/** Where a host's extra ⋯ item lands when `fileActions` shapes the menu. */
export declare type DocumentMenuGroup = 'file' | 'share' | 'create' | 'view';

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

export declare function DocumentModePill({ mode, reason, className, 'data-testid': testId, }: DocumentModePillProps): JSX.Element;

export declare type DocumentModePillMode = 'editing' | 'suggesting' | 'review' | 'read';

export declare interface DocumentModePillProps {
    mode: DocumentModePillMode;
    /** Why this mode — shown as the tooltip. "Finalized: read only", say. */
    reason?: string;
    className?: string;
    'data-testid'?: string;
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

export declare interface DocumentReviewEntry {
    requestKey: string;
    reviewerId: string;
    reviewerName?: string;
    requestedBy: string;
    requestedByName?: string;
    state: 'pending' | 'approved' | 'changes_requested' | 'withdrawn';
    required: boolean;
    note?: string;
    comment?: string;
    dueDate?: string;
}

export declare function DocumentReviewPanel({ requests, reviewers, currentUserId, loading, error, onRefresh, onRequest, onDecide, onWithdraw }: DocumentReviewPanelProps): JSX.Element;

export declare interface DocumentReviewPanelProps {
    requests: DocumentReviewEntry[];
    /** Directory and permissions come from the host's authoritative service. */
    reviewers?: Array<{
        id: string;
        displayName: string;
    }>;
    currentUserId: string;
    loading?: boolean;
    error?: string | null;
    onRefresh: () => void;
    onRequest?: (input: {
        reviewerId: string;
        note: string;
        required: boolean;
    }) => Promise<void>;
    onDecide?: (requestKey: string, state: 'approved' | 'changes_requested', comment: string) => Promise<void>;
    onWithdraw?: (requestKey: string) => Promise<void>;
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

/** Only a durable backend receipt may select `saved`. Connection/sync is insufficient. */
export declare interface DocumentSaveState {
    status: 'pending' | 'saved' | 'error' | 'offline';
    detail?: string;
    onRetry?: () => void;
}

/** `className` (since 2.386.5) sizes the line for its host — an editor head reads it at 13px. */
export declare function DocumentSaveStatus({ state, className }: {
    state?: DocumentSaveState;
    className?: string;
}): JSX.Element | null;

/**
 * Which authoring surface a new document opens in.
 *
 * `page` becomes `meta.schemaVersion = 2` on the document's CRDT — the one
 * gate the editor branches on. Doing that translation is the host's job, not
 * this modal's; the modal only reports which shape the person chose.
 */
export declare type DocumentShape = 'page' | 'sections' | 'diagram' | 'presentation';

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

export declare function DocumentToolbar({ editor, actions, commentCount, suggestionCount, gutterVisible, onToggleGutter, onInsertImage, density, size: sizeProp, extras, zoomControl, 'data-testid': testId, }: DocumentToolbarProps): JSX.Element | null;

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
    /**
     * How many PROPOSED EDITS sit in the same margin, which is a different
     * thing and has to be counted separately.
     *
     * The gutter holds both, and the toggle used to be handed the total under
     * the name `commentCount` — so a document whose margin held one suggestion
     * and no discussion at all read "Comments 1", and the reader went looking
     * for a thread that did not exist. The count was never the wrong part; the
     * noun was. Splitting the two inputs is what lets the control pick a noun
     * that is true of what it is actually hiding.
     */
    suggestionCount?: number;
    /** Whether the gutter is currently showing. Drives `aria-pressed`. */
    gutterVisible?: boolean;
    /**
     * Toggles the gutter. Its absence — or an empty margin — means no control at
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
    /**
     * How much of the bar fits on ONE row. `auto` (the default) measures the
     * bar's own box and picks `wide` / `medium` / `narrow` — see
     * `DOCUMENT_TOOLBAR_BREAKPOINTS`. A fixed value is for tests and stories.
     *
     * The bar never wraps. It used to (`flex-wrap`), and at a 1280px window the
     * page editor's toolbar took THREE rows — B and I on the first, the rest on
     * the second, and the host's Comment button alone on a third — leaving
     * about 200px of paper. A toolbar is one line of controls in every word
     * processor; what does not fit goes behind ⋯, the way Docs and Word do it.
     */
    size?: DocumentToolbarSize | 'auto';
    /**
     * The page's zoom, passed when the page has no status bar to carry it
     * (`CanvasDocumentView showStatusBar={false}`). The ⋯ overflow offers it as
     * a Zoom group — 100%, the other `steps`, and Fit width when `onFitWidth`
     * is present. Absent, no zoom item renders.
     */
    zoomControl?: DocumentZoomControl;
    /**
     * Where the occasional controls live (since 2.386.5). `inline` (default) is
     * the classic bar: alignment, spacing, indent, rule, table and clear
     * formatting sit on the row until the width folds them. `overflow` is the
     * word-processor row a page editor draws — undo · styles · marks · link and
     * image · lists (with style menus) · colour · highlight · ⋯ — and those
     * occasional controls always live behind ⋯.
     */
    extras?: 'inline' | 'overflow';
    'data-testid'?: string;
}

/** One-row layouts, widest first. */
export declare type DocumentToolbarSize = 'wide' | 'medium' | 'narrow';

/** `null` — not measured yet — is wide: a first paint that hides controls and then shows them is worse than one frame of overflow. */
export declare function documentToolbarSize(width: number | null): DocumentToolbarSize;

export declare interface DocumentUploadCompletion {
    mine: boolean;
    transferId: string;
    downloadUrl?: string;
}

/**
 * The page's zoom, handed to whatever surface offers it when the status bar is
 * off — the toolbar's ⋯ overflow on the documents page. The page still OWNS
 * the value (remembered per reader, fit width resolved against the rails); a
 * control only reads it and asks for a change.
 */
export declare interface DocumentZoomControl {
    /** The scale in force, fit width included — 1 is 100%. */
    zoom: number;
    /** True while the sheet tracks the workspace width rather than a fixed scale. */
    fitActive: boolean;
    /** The presets worth offering — `ZOOM_STEPS`. */
    steps: readonly number[];
    onZoomChange: (zoom: number) => void;
    /** Absent when the host cannot fit — then offer no Fit option. */
    onFitWidth?: () => void;
}

/**
 * Copy a slide, sources included.
 *
 * The citations come along deliberately: a duplicate is nearly always the same
 * claim said differently, and a copy that arrived uncited would be a copy that
 * cannot be saved.
 */
export declare function duplicateSlide(spec: DeckSpec, id: string): DeckSpec;

export declare function EditorShell({ breadcrumbs, title, onTitleChange, titleLabel, kind, starred, onStarredChange, statusPill, path, crumbsTrailing, subtitle, metaBar, participants, onParticipantClick, onFollowParticipant, followingParticipantId, meta, saveState, headActions, tabs, activeTab, onTabChange, toolbar, children, footer, surface, explorer, workbench, label, variant, itemType, itemKey, titleSize, tabsTrailing, className, 'data-testid': testId, }: EditorShellProps): JSX.Element;

export declare interface EditorShellProps {
    /** The trail above the title — "Sprint planning / Sprint review". */
    breadcrumbs?: BreadcrumbItem[];
    title: string;
    /** Makes the title editable in place. Omit for a read-only title. */
    onTitleChange?: (title: string) => void;
    /** Accessible name of the title editor. Default "File name". */
    titleLabel?: string;
    /** Draws a `FileKindMark` before the title. */
    kind?: FileKind;
    /** Renders a star toggle when `onStarredChange` is passed. */
    starred?: boolean;
    onStarredChange?: (starred: boolean) => void;
    /** After the title — normally a `StatusPill` ("Draft", "v4"). */
    statusPill?: ReactNode;
    /**
     * Where the file lives, INLINE after the status pill on the title row
     * ("Release plan  Draft | Sprint planning / Release assets"), each segment
     * clickable. The alternative to `breadcrumbs` above the title for a header
     * that wants one row. With it, the title takes only the width it needs.
     * Since 2.385.0.
     */
    path?: BreadcrumbItem[];
    /**
     * Beside the crumb trail on its row — a type `Chip` and the document id in
     * mono ("› OpenTelemetry everywhere / Story wi-obs-e1-s4"). Since 2.385.0.
     */
    crumbsTrailing?: ReactNode;
    /** A line under the title — the document's description. Since 2.385.0. */
    subtitle?: ReactNode;
    /**
     * A row between the title block and the tabs — a `WorkItemMetaBar`
     * (status · points · owner · priority). Since 2.385.0.
     */
    metaBar?: ReactNode;
    /** Who is here. Rendered with `PresenceAvatars`. */
    participants?: PresenceUser[];
    /** Jump to where a participant is (their cursor, their slide). Since 2.367.0. */
    onParticipantClick?: (id: string) => void;
    /** Follow a participant's view; `followingParticipantId` marks who is followed. Since 2.367.0. */
    onFollowParticipant?: (id: string) => void;
    followingParticipantId?: string | null;
    /** Beside the collaborators — "Owned by Connor Hoehn". */
    meta?: ReactNode;
    saveState?: DocumentSaveState;
    /** Right of the title row — Share, the ⋯ menu, "Open presentation". */
    headActions?: ReactNode;
    /** Omit for no tab row. `DEFAULT_EDITOR_SHELL_TABS` is the handoff's set. */
    tabs?: readonly EditorShellTab[];
    activeTab?: string;
    onTabChange?: (id: string) => void;
    /** Under the tabs — `DocumentToolbar`, a slides toolbar. */
    toolbar?: ReactNode;
    /** The editing surface. */
    children: ReactNode;
    /**
     * The composer row — normally a `FloatingComposerDock`. Always the LAST row
     * of the editor column, flush with its bottom, never scrolling and never
     * overlaid: the surface's scroll box ends at its top edge (a
     * `FloatingComposerDock` inside the shell is pinned, not floated). Nothing
     * renders below it. Since 2.365.0.
     */
    footer?: ReactNode;
    /**
     * `workspace` (default) paints the surface the neutral grey a page or a
     * slide floats on; `plain` leaves it the panel colour, for a list or a
     * history tab.
     */
    surface?: 'workspace' | 'plain';
    /** Optional left column — the project explorer. */
    explorer?: ReactNode;
    /** Optional right column — normally a `Workbench`. */
    workbench?: ReactNode;
    /** Accessible name of the editor pane. Default "Editor". */
    label?: string;
    /**
     * `document` (default): a file's head — kind mark, title with its pill and
     * folder path, save line, and the head actions on the title row.
     * `work-item` (since 2.386.15): the Work mockup's head — a crumb line
     * ("› OpenTelemetry everywhere / Story wi-obs-e1-s4", from `breadcrumbs` +
     * `crumbsTrailing`) that carries `headActions` (normally just ⋯) at its
     * right, then a 22px title with no kind mark, then the subtitle. The crumb
     * line stays on a short window, since it holds the actions.
     */
    variant?: 'document' | 'work-item';
    /** work-item: the item's type as a soft chip on the crumb line ("Story"). Since 2.386.15. */
    itemType?: string;
    /** work-item: the item's key in mono after the chip ("wi-obs-e1-s4"). Since 2.386.15. */
    itemKey?: string;
    /**
     * The title's size. `md` (default) is today's 20px bold document title (22px
     * in `work-item`). `lg` is a record's headline — 26px semibold — for a page
     * where the title IS the page heading and nothing sits above it but a crumb
     * band. Hosts must not style the title themselves. Since 2.389.0.
     */
    titleSize?: 'md' | 'lg';
    /**
     * At the right end of the tab row, above the tabs' underline — "Sources 4",
     * "Open in Library ↗". Hangs from the same baseline as the tabs, so it
     * reads as belonging to the row, not the title. Since 2.389.0.
     */
    tabsTrailing?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare interface EditorShellTab {
    id: string;
    label: string;
    /** A count on the tab — open comments. Zero or absent shows none. */
    count?: number;
    disabled?: boolean;
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

declare type FileKind = 'page' | 'presentation' | 'recording' | 'transcript' | 'diagram' | 'folder' | 'agent' | 'experiment' | 'call' | 'conversation' | 'media' | 'workflow';

export declare function Filmstrip({ items, selectedId, onSelect, onMove, onDuplicate, onDelete, onAdd, canAdd, generatingSlideIds, generatedItems, slideViewers, readOnly, className, testIdPrefix, }: FilmstripProps): JSX.Element;

/** A slide the renderer appends to the deck (the Sources slide): shown, counted, not editable. */
export declare interface FilmstripGeneratedItem {
    id: string;
    title: string;
    thumbnailSvg?: string;
}

export declare interface FilmstripProps {
    items: readonly SlideListItem[];
    selectedId: string;
    onSelect: (id: string) => void;
    onMove: (from: number, to: number) => void;
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
    /** Renders the dashed "Add slide" card at the end. */
    onAdd?: () => void;
    /** False at the deck's slide cap: no add, no duplicate. */
    canAdd?: boolean;
    /**
     * Slides the agent is rewriting (`Generating…` on the thumb) or creating
     * (an id not in `items` becomes a placeholder card at the end).
     */
    generatingSlideIds?: readonly string[];
    /**
     * Slides the renderer appends after the deck's own (the Sources slide):
     * numbered on from `items`, selectable, locked. Since 2.384.1.
     */
    generatedItems?: readonly FilmstripGeneratedItem[];
    /** Slide id → the other people on that slide (live presence). Since 2.371.0. */
    slideViewers?: Readonly<Record<string, readonly PresenceUser[]>>;
    readOnly?: boolean;
    className?: string;
    /** Prefix for every row's test ids. Default `filmstrip`. */
    testIdPrefix?: string;
}

/** One slide in the strip. Takes `SlideRowProps` so both lists can render it. */
export declare function FilmstripThumb({ slide, index, total, thumbnailSvg, selected, uncited, changed, generating, viewers, readOnly, onSelect, onMove, onDuplicate, onDelete, canDuplicate, canDelete, dragHandle, rowRef, dragging, testIdPrefix, }: SlideRowProps): JSX.Element;

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

export declare function FloatingComposerDock({ composer, strip, above, maxWidth, label, className, 'data-testid': testId, }: FloatingComposerDockProps): JSX.Element;

export declare interface FloatingComposerDockProps {
    /** The composer — normally a `RichChatComposer` with `modeControl="compact"`. */
    composer: ReactNode;
    /** Above the composer — normally a `TaskStrip`. */
    strip?: ReactNode;
    /** Above the strip — a notice, a conversation preview. */
    above?: ReactNode;
    /**
     * Widest an OVERLAY dock grows. Default `3xl` (768px), the prototype's
     * measure. A pinned dock (inside `EditorShell`) ignores it and spans its
     * column's content width.
     */
    maxWidth?: FloatingComposerDockWidth;
    /** Accessible name of the region. Default "Composer". */
    label?: string;
    className?: string;
    'data-testid'?: string;
}

export declare type FloatingComposerDockWidth = 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export declare function FloatingDockBar({ docked, ghost, dockId, ghostLabel, label, bottomOffset, className, children, 'data-testid': testId, }: FloatingDockBarProps): JSX.Element | null;

export declare interface FloatingDockBarProps {
    /** True while the caller has portaled the live call into `children`. */
    docked: boolean;
    /**
     * True while the call is being DRAGGED somewhere. Not docked here, the bar
     * shows a ghost of itself — a dashed band along the bottom edge, named —
     * so the reader can see where the call would land and let go over it.
     * Nothing renders when neither `docked` nor `ghost`.
     */
    ghost?: boolean;
    /**
     * The dock id the widget's pointer-drag hit-tests for. Published on the
     * ghost as `data-call-dock-target`, which is what the widget reads on
     * release; the ghost lights up while the widget is over it.
     */
    dockId?: string;
    /** What the ghost says. */
    ghostLabel?: string;
    /** Names the region for screen readers. */
    label?: string;
    /** Distance from the bottom edge, in px. Default 16. */
    bottomOffset?: number;
    className?: string;
    children?: ReactNode;
    'data-testid'?: string;
}

export declare function FollowModeBar({ followingUserId, participants, onStopFollow, location, appearance, autoStop, autoStopScope, className, 'data-testid': testId, }: FollowModeBarProps): JSX.Element | null;

export declare interface FollowModeBarProps {
    followingUserId: string | null;
    participants: Participant[];
    onStopFollow: () => void;
    /** The followed person's section title — rendered as ` · <location>`. */
    location?: string;
    /**
     * `banner` (default): the centred strip. `bar`: the in-call follow bar
     * ("**Following Alice** · Session flow" … "Stop following"), see FollowBanner.
     */
    appearance?: 'banner' | 'bar';
    /** `false` turns the auto-unlock off (the host ends follow itself). Default true. 2.393.0. */
    autoStop?: boolean;
    /**
     * Listen on this element only (the editor), and only for scrolling or
     * typing — a click on the call dock, the toolbar or a side panel keeps
     * following. Unset: any mousedown/keydown/wheel in the window. 2.393.0.
     */
    autoStopScope?: RefObject<HTMLElement | null>;
    className?: string;
    /** Default `follow-bar`; the stop button is `<id>-stop`. */
    'data-testid'?: string;
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
    /**
     * Defaults to `'comment'` — every caller that predates this field was
     * passing comment threads, so the unlabelled case keeps saying exactly what
     * it says today rather than degrading a true noun into a hedge. The cost is
     * that a NEW producer which forgets to label itself is counted as
     * discussion; labelling every producer is therefore part of adding one.
     */
    kind?: GutterItemKind;
}

/**
 * What kind of annotation a card holds.
 *
 * This component does not read it — stacking is the same arithmetic whatever
 * the card contains. It exists because the CONTROL that hides this column has
 * to name what it is hiding, and only the host knows: `content` is an opaque
 * ReactNode, so counting cards is the most the library can do on its own, and
 * counting is how a margin holding one proposed edit and no discussion came to
 * announce itself as "Comments 1".
 */
export declare type GutterItemKind = 'comment' | 'suggestion';

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

/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor (`CanvasDocumentView`); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
export declare function KeyDecisionsCard({ sections }: {
    sections: Section[];
}): JSX.Element;

declare interface LegacyDocumentHeaderProps {
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
    saveState?: DocumentSaveState;
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

export declare interface LegacyFinalClaim {
    unreconciled: true;
    serverStatus: DocumentLifecycleStatus;
}

export declare type LifecycleAction = 'submit_for_review' | 'withdraw' | 'approve' | 'request_changes' | 'revise' | 'reopen' | 'finalize';

export declare interface LifecycleErrorView {
    kind: LifecycleFailureKind;
    message: string;
    /**
     * The bold lead, when the kind's default does not fit — a failed READ is
     * not "nothing was changed". Since 2.390.3.
     */
    lead?: string;
}

export declare type LifecycleFailureKind = 'forbidden' | 'invalid' | 'conflict' | 'network' | 'busy' | 'unknown';

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
 * `--doc-line` is defined on `.doc-page--paginated`; the `1.5em` fallback is
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

/** Menu words for each value. */
export declare const LIST_STYLE_LABELS: Record<ListStyle, string>;

export declare type ListStyle = BulletStyle | NumberStyle | MultilevelStyle;

/** Which list node a style belongs to. */
export declare function listTypeFor(style: ListStyle): 'bulletList' | 'orderedList';

/** A blank slide of a layout, with the sub-object that layout needs. */
export declare function makeSlide(id: string, layout?: SlideLayout): DeckSlide;

export declare const MAX_ATTACHMENT_BYTES: number;

export declare const MAX_BULLET_CHARS = 200;

export declare const MAX_BULLETS_PER_SLIDE = 8;

export declare const MAX_CHART_LABELS = 24;

export declare const MAX_CHART_SERIES = 6;

export declare const MAX_EYEBROW_CHARS = 60;

export declare const MAX_IMAGE_BYTES: number;

export declare const MAX_NOTES_CHARS = 2000;

export declare const MAX_QUOTE_CHARS = 400;

export declare const MAX_SLIDES = 40;

export declare const MAX_SOURCES_PER_SLIDE = 10;

export declare const MAX_SUBTITLE_CHARS = 200;

export declare const MAX_TITLE_CHARS = 120;

declare interface MentionCandidate {
    /** Stable identity — this is what travels in the message, not the label. */
    id: string;
    label: string;
    avatarUrl?: string;
    color?: string;
    /** Shown under the name, e.g. a role or team. */
    hint?: string;
    /**
     * False when the composer knows the chat's members and this person is not
     * one: the row lists under "Not in this chat" and picking it offers to add
     * them rather than mentioning someone who could not read the message.
     */
    member?: boolean;
}

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

/** Move the slide at `from` so it lands at `to`. Out-of-range moves are no-ops. */
export declare function moveSlide(spec: DeckSpec, from: number, to: number): DeckSpec;

/** Multilevel presets: the marker changes at each nesting level. */
export declare const MULTILEVEL_STYLES: readonly ["tiered-bullets", "outline"];

export declare type MultilevelStyle = (typeof MULTILEVEL_STYLES)[number];

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

export declare function NewDocumentModal({ open, onClose, onCreate, onCreateFromFixture, onSearchDocuments, recordings, initialShape, }: NewDocumentModalProps): JSX.Element | null;

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
    /**
     * Presentation only. Given this, "Create Document" hands over the deck's
     * starting point instead of calling `onCreate` — the host creates the row
     * AND asks the generator for a v1 in one step. Without it a presentation
     * falls back to an ordinary `onCreate` with `shape: 'presentation'`, which
     * makes an empty deck the person then fills by hand.
     */
    onCreateFromFixture?: (request: NewPresentationFixtureRequest) => void;
    /**
     * The Documents explorer's search, for "From a project document". The same
     * search the deck editor's source picker uses, so what is offered here is
     * what the generator can actually cite.
     */
    onSearchDocuments?: (query: string) => NewPresentationSource[] | Promise<NewPresentationSource[]>;
    /** Transcripts available to this person, for "From a transcript". */
    recordings?: readonly NewPresentationSource[];
    /** The blank picked when the modal opens (a "New ▾ → Diagram" menu). Default `page`. Since 2.389.7. */
    initialShape?: DocumentShape;
}

/**
 * What "New document → Presentation" asks the host for.
 *
 * `from` and `sourceId` are the generator's half of the contract: the host
 * posts them to `/api/deck/fixture`, which drafts a real `DeckSpec` from the
 * named transcript or document. `title` and `description` come along because
 * the host still has to create a document row, and asking for the title twice
 * — once here, once in a second dialog — is the flow this modal replaced.
 */
declare interface NewPresentationFixtureRequest {
    from: NewPresentationOrigin;
    /** The transcript or document it is derived from. Absent for `blank`. */
    sourceId?: string;
    title: string;
    description?: string;
}

declare type NewPresentationOrigin = 'blank' | 'transcript' | 'document';

/** A thing a presentation can be generated FROM. */
declare interface NewPresentationSource {
    id: string;
    title: string;
    kind?: 'document' | 'transcript';
    /** A date, a length — whatever tells two similar rows apart. */
    subtitle?: string;
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
 * The next revision's label, given the ones that exist.
 *
 * Reads the numbers off `v<n>` labels rather than counting rows, because a
 * revision list can be paged or filtered and "Save as v3" over four revisions
 * is a promise the server would have to break.
 */
export declare function nextRevisionLabel(revisions: readonly {
    label: string;
}[]): string;

/**
 * A slide id that is unique within the deck and passes `SLIDE_ID_PATTERN`.
 *
 * Counts up from the deck's size rather than hashing or using a UUID: the ids
 * end up in preview handles a person reads in a URL, and `s7` is a better
 * thing to read than a 36-character guid.
 */
export declare function nextSlideId(spec: DeckSpec, prefix?: string): string;

export declare const NUMBER_STYLES: readonly ["decimal", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman"];

export declare type NumberStyle = (typeof NUMBER_STYLES)[number];

/** The option value that stands for "the next older page", never a revision id. */
export declare const OLDER_REVISIONS_VALUE = "__older-revisions__";

/** A page of revisions is not the whole history: how many more exist, and how to ask for them. */
export declare interface OlderRevisions {
    /** Revisions older than the oldest one in hand. */
    count: number;
    /** The next page is on its way. */
    loading?: boolean;
    /** Ask the host for the next older page. */
    onLoad: () => void;
}

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

export declare function parseListStyle(value: unknown): ListStyle | null;

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

declare type PresenceMode = 'editor' | 'reviewer' | 'reader';

declare interface PresenceUser {
    /** Unique identifier for the user. Passed back to `onUserClick`. */
    id: string;
    name: string;
    /** Optional avatar image URL. Wins over `color` when present. */
    avatarUrl?: string;
    /** Online flag. Drives the status dot when `idle` is not set:
     *  `undefined`/`true` → green; `false` → gray. */
    online?: boolean;
    /** Override the auto-computed avatar background. Useful when the
     *  user identity needs to match a CRDT cursor color elsewhere. */
    color?: string;
    /** Present but away. Dims the avatar (alpha-blends `color` when
     *  provided, otherwise drops opacity) and flips the status dot to
     *  amber. Wins over `online` for the dot color. */
    idle?: boolean;
    /** Optional editing mode — renders a small mode badge on the
     *  upper-right of the avatar (pencil / check / eye). */
    mode?: PresenceMode;
    /** One status line for the hover card — "editing", "away · 3m". Free text
     *  because the library does not know the host's vocabulary. */
    detail?: string;
    /** Where in the surface the user is — a section title, a pane name.
     *  Rendered under the detail line on the hover card. */
    location?: string;
}

export declare function PresentationEditor({ spec, onChange, preview, onRequestPreview, onSaveRevision, revisions, activeRevisionId, onSelectRevision, olderRevisions, sources, onSearchSources, onDownload, onOpenPresentationView, readOnly, onInstruct, instructHints, onUndoInstruct, generatingSlideIds, slideViewers, selectSlideRequest, footer, renderFrame, onSelectedSlideChange, className, 'data-testid': testId, }: PresentationEditorProps): JSX.Element;

/** The parts `renderFrame` receives. */
export declare interface PresentationEditorFrame {
    /** `SlidesToolbar` — New slide, Layout, Insert, Theme, Undo/Redo, Present. */
    toolbar: ReactNode;
    /** Revision tabs, Save as vN (gated on citations), Download .pptx. */
    actions: ReactNode;
    /** Deck title line, warnings, filmstrip, 16:9 stage, speaker notes, sources. */
    surface: ReactNode;
    /** The host's `footer`, or the built-in agent box in a dock, or null. */
    footer: ReactNode;
}

export declare interface PresentationEditorProps {
    /** Controlled. The host owns the spec; this component never holds a copy. */
    spec: DeckSpec;
    onChange: (spec: DeckSpec) => void;
    preview: PresentationPreview;
    /** Called whenever the spec changes. DEBOUNCE THIS — it is a render per call. */
    onRequestPreview: (spec: DeckSpec) => void;
    /** Resolves when the revision exists; rejects with the message to show. */
    onSaveRevision: (spec: DeckSpec) => Promise<unknown>;
    revisions: readonly PresentationEditorRevision[];
    activeRevisionId: string;
    onSelectRevision: (revisionId: string) => void;
    /** The host holds a page of a long history: the picker ends with "Older versions (N)…". */
    olderRevisions?: OlderRevisions;
    /** The deck's own inputs, offered in the source picker before anything is typed. */
    sources: readonly PresentationSourceOption[];
    /** The Documents explorer's search, so a citation names a real document. */
    onSearchSources?: (query: string) => PresentationSourceOption[] | Promise<PresentationSourceOption[]>;
    /** The `.pptx`, through the host's authorized route. No handler, no button. */
    onDownload?: () => void;
    /**
     * Opens the same deck in the read-only presentation surface — the toolbar's
     * Present. Called with the slide on the stage so the view can start there.
     */
    onOpenPresentationView?: (at?: {
        slideId: string;
        slideIndex: number;
    }) => void;
    readOnly?: boolean;
    /**
     * Turns on the agent box under the stage (see the file header). Resolve with
     * the agent's one-line summary once the host has applied the edit through
     * `onChange`; reject with the message to show when it could not.
     */
    onInstruct?: (instruction: string, ctx: PresentationInstructContext) => Promise<PresentationInstructResult | void>;
    /** One-tap instructions shown as chips beside the scope toggle. */
    instructHints?: readonly string[];
    /**
     * Puts an Undo button on the agent's summary line. The host owns the
     * snapshot; pass this only while it holds one.
     */
    onUndoInstruct?: () => void;
    /**
     * Slides the agent is working on right now — `useDeckReviseStatus(documentId)
     * .generatingSlideIds`. Their thumbnails and the stage say `Generating…`; an
     * id not in the deck is a slide being created and shows as a placeholder at
     * the end of the filmstrip.
     */
    generatingSlideIds?: readonly string[];
    /**
     * Slide id → the other people whose selected slide it is (the host's live
     * presence). Shown as small avatars on the filmstrip thumbnails. Since 2.371.0.
     */
    slideViewers?: Readonly<Record<string, readonly PresenceUser[]>>;
    /**
     * Put this slide on the stage — jump to or follow someone. Acted on when
     * `key` changes (so jumping to the same slide twice works); an id not in the
     * deck is ignored. Since 2.371.0.
     */
    selectSlideRequest?: {
        slideId: string;
        key: string | number;
    } | null;
    /**
     * The foot of the editor — the host's composer dock, normally a
     * `FloatingComposerDock`. It is pinned as the editor column's last row
     * (normal flow, `ComposerDockPlacementContext` = `pinned`) while only the
     * content above it scrolls. Replaces the built-in
     * agent box (`onInstruct`) when given. A function receives the slide on the
     * stage and a way to mark the slides an edit changed.
     */
    footer?: ReactNode | ((ctx: PresentationFooterContext) => ReactNode);
    /**
     * Hand the editor's parts to a frame — normally `EditorShell` — instead of
     * stacking them: `toolbar` for its toolbar row, `actions` (revisions, Save,
     * Download) for its head, `surface` as its child, `footer` for its floating
     * dock slot. Without `footer`, the built-in agent box arrives in `footer`
     * already wrapped in a `FloatingComposerDock`.
     */
    renderFrame?: (frame: PresentationEditorFrame) => ReactNode;
    /** The slide on the stage changed (selection, delete, an agent edit landing). */
    onSelectedSlideChange?: (slideId: string, index: number) => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface PresentationEditorRevision {
    id: string;
    /** `v3`, as the generator labelled it. */
    label: string;
    /** Already formatted by the host — this component does no clock maths. */
    createdAt?: string;
}

/** What a `footer` render function is told. */
export declare interface PresentationFooterContext {
    /** The slide on the stage — one of the spec's. Undefined while a generated slide is on the stage. */
    selectedSlide: DeckSlide | undefined;
    /** The generated slide on the stage (the Sources slide), when that is what is selected. Since 2.384.1. */
    selectedGeneratedSlide?: PresentationGeneratedSlide;
    /** 0-based, over the whole deck: the spec's slides, then the generated ones. */
    selectedIndex: number;
    /** The whole deck — the spec's slides plus the generated ones — the number every other surface shows. */
    slideCount: number;
    selectSlide: (slideId: string) => void;
    /** Marks slides "Edited by agent" in the filmstrip until the next call. */
    markChanged: (slideIds: string[]) => void;
}

/** A `generated` preview slide, resolved: the renderer's title and image, in deck order after the spec's slides. */
export declare interface PresentationGeneratedSlide {
    id: string;
    title: string;
    svg?: string;
}

export declare interface PresentationInstructContext {
    /** Present when `scope` is 'slide': the slide on the stage. */
    slideId?: string;
    scope: PresentationInstructScope;
}

/** What the host's agent says it did. */
export declare interface PresentationInstructResult {
    /** One line, shown under the composer. */
    summary: string;
    /** Slides the edit touched; the rail marks them until the next instruction. */
    changedSlideIds?: string[];
}

export declare type PresentationInstructScope = 'slide' | 'deck';

/**
 * What the host knows about the preview right now.
 *
 * Three states rather than an optional object: "not rendered yet" and "the
 * render failed" are different things to say, and collapsing them produces a
 * stage that looks the same whether the server is slow or broken.
 */
export declare type PresentationPreview = {
    slides: readonly PresentationPreviewSlide[];
} | 'loading' | {
    error: string;
};

/** One rendered slide image, as `POST /api/deck/preview` returns it. */
export declare interface PresentationPreviewSlide {
    id: string;
    /** SVG source, rendered by the same layout engine that writes the .pptx. */
    svg: string;
    /** The slide's title as the renderer named it. Used for a `generated` slide, which has no spec entry. */
    title?: string;
    /**
     * A slide the renderer APPENDS to the deck — the Sources slide it builds
     * from every citation — rather than one the spec holds. Since 2.384.1 it is
     * a real slide of the deck: it is in the filmstrip (locked, numbered after
     * the deck's own), on the stage, in the pager's count and in Present, and it
     * is what the revision's `slideCount` and the `.pptx` already contained. The
     * editor cannot change it: it changes as the slides' citations do.
     */
    generated?: boolean;
}

export declare interface PresentationRevision {
    id: string;
    /** `v3`, as the generator labelled it. */
    label: string;
    /** Already formatted by the host — this component does no clock maths. */
    createdAt?: string;
    slides: PresentationSlide[];
}

/** One page of a revision. `preview` is host-resolved; absent means absent. */
export declare interface PresentationSlide {
    id: string;
    /** 1-based, as the deck numbers itself. */
    index: number;
    title: string;
    preview?: ReactNode;
}

/** One row the host's Documents search can return. */
export declare interface PresentationSourceOption {
    documentId: string;
    title: string;
    /** How the host would open it — a document page, or a recording transcript. */
    kind?: 'document' | 'transcript';
}

export declare function PresentationView({ title, subtitle, revisions, olderRevisions, revisionId, onRevisionChange, slideIndex, onSlideChange, onDownload, downloadLabel, onOpenPreview, pending, notice, state, errorMessage, ownerName, onRetry, maxSlideWidth, autoFocus, className, 'data-testid': testId, }: PresentationViewProps): JSX.Element;

export declare interface PresentationViewProps {
    title: string;
    /**
     * A line under the title — e.g. the deck's own heading where it differs from
     * the document's name ("Titled “Audit E2E”"). A subtitle, never a second name.
     */
    subtitle?: string;
    revisions: readonly PresentationRevision[];
    /**
     * The host holds a page of a long history (newest first from the platform):
     * the picker ends with "Older versions (N)…", which asks for the next page.
     */
    olderRevisions?: OlderRevisions;
    /** Which revision is shown. Controlled; the host owns the choice. */
    revisionId: string;
    onRevisionChange: (revisionId: string) => void;
    /** 1-based page number within the revision. Controlled. */
    slideIndex: number;
    onSlideChange: (slideIndex: number) => void;
    /**
     * The `.pptx` itself, through the host's own authorized route. Absent, no
     * button is drawn — an offer that 403s is worse than no offer.
     */
    onDownload?: () => void;
    downloadLabel?: string;
    /** Opens the current slide at full size, in whatever viewer the host has. */
    onOpenPreview?: (slideId: string) => void;
    /**
     * A generation still in flight, or the one that failed. Shown beside the
     * revision switch so "v3 generating" is visible while v2 is being read.
     */
    pending?: {
        label: string;
        status: 'generating' | 'failed';
        message?: string;
    };
    /** Honest state about what this view cannot show. */
    notice?: ReactNode;
    /** `no-access`: the reader may not open this deck — never an error or a status code. */
    state?: 'loading' | 'ready' | 'empty' | 'error' | 'no-access';
    errorMessage?: string;
    /** Who to ask for access, named in the `no-access` state. Omitted → "its owner". */
    ownerName?: string | null;
    onRetry?: () => void;
    /**
     * Widest the slide frame may grow, in pixels. Centred once it stops
     * growing.
     *
     * A slide is 16:9 and a pane is whatever the host made it. In a wide,
     * short container the frame stretched to the full width while the slide
     * inside it stayed its natural size, so the deck read as a small picture
     * marooned in a huge grey rectangle — measured at 1,100px of frame around a
     * ~600px slide on a pipeline run card. The default already caps the frame
     * at 16:9 of the available height, which is the right cap when the height
     * is known; pass this when it is not, or to hold the deck narrower still.
     */
    maxSlideWidth?: number;
    /**
     * Take keyboard focus when shown, so ← / → page at once. For a view the
     * person just asked for (the editor's Present); a view embedded in a page
     * leaves it off and is focused by clicking or tabbing. Without it, Present
     * opened a deck whose arrow keys did nothing until it was clicked.
     */
    autoFocus?: boolean;
    className?: string;
    'data-testid'?: string;
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

/** The stored choice, or `fallback` when there is none (or storage is unavailable). */
export declare function readCommentMarginPreference(storageKey?: string, fallback?: boolean): boolean;

/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor (`CanvasDocumentView`) in read-only mode; decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
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

/** Drop a slide. The last slide cannot be removed — a deck of none is not a deck. */
export declare function removeSlide(spec: DeckSpec, id: string): DeckSpec;

/** Replace one slide by id. Returns the same spec object when nothing matched. */
export declare function replaceSlide(spec: DeckSpec, slide: DeckSlide): DeckSpec;

/** "no replies" / "1 reply" / "4 replies" — the count is the thread's weight. */
export declare function replyLabel(count: number): string;

/**
 * The resolved thread's one-row header: check, "Resolved by <name>", time,
 * a quiet Reopen and a chevron. The whole row toggles the thread open — the
 * chevron says so, where the old inline "— click to expand" wrapped into a
 * jumble in a ~280px margin card.
 */
export declare function ResolvedBanner({ resolvedBy, resolvedAt, expanded, onToggle, onReopen }: ResolvedBannerProps): JSX.Element;

export declare interface ResolvedBannerProps {
    resolvedBy?: string;
    resolvedAt?: string;
    expanded: boolean;
    onToggle: () => void;
    /** Omitted → no Reopen button (a reader who may not reopen). */
    onReopen?: () => void;
}

/**
 * Who resolved a thread, for people. `resolvedBy` is whatever the host stored:
 * a person's display name, or an agent's id (`agent:haiku`) on rows written
 * before the server stored names — those read "Haiku agent", never the id.
 */
export declare function resolverLabel(resolvedBy: string | undefined): string;

export declare function ReviewableItem({ item, onAck, onReject }: ReviewableItemProps): JSX.Element;

declare interface ReviewableItemProps {
    item: TaskItem;
    onAck: (notes?: string) => void;
    onReject: (reason: string) => void;
}

/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor's suggestion review (`SuggestionReviewList`); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
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

export declare function revisionPickerOptions(revisions: readonly {
    id: string;
    label: string;
}[], older?: OlderRevisions): Array<{
    value: string;
    label: string;
    disabled?: boolean;
}>;

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

/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor (`CanvasDocumentView`); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
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

/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor's margin comments (`CanvasDocumentView` + `DocumentGutter`); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
export declare function SectionComments({ comments, onAddComment, participants, onResolveThread, onUnresolveThread, }: SectionCommentsProps): JSX.Element;

declare interface SectionCommentsProps {
    comments: CommentThread[];
    onAddComment: (text: string, parentCommentId?: string | null) => void;
    participants?: Participant[];
    onResolveThread?: (commentId: string) => void;
    onUnresolveThread?: (commentId: string) => void;
}

/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor (`CanvasDocumentView`); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
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

/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor (`CanvasDocumentView`); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
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

/** Slide ids stay filename- and handle-safe: they end up in preview handles. */
export declare const SLIDE_ID_PATTERN: RegExp;

/** The layouts the Insert menu offers, in the order a person reaches for them. */
export declare const SLIDE_INSERTS: readonly SlideLayout[];

/** What each layout is FOR, in the words a person picking one needs. */
export declare const SLIDE_LAYOUT_LABELS: Record<SlideLayout, string>;

export declare const SLIDE_LAYOUTS: readonly SlideLayout[];

export declare function SlideForm({ slide, onChange, sources, onSearchSources, readOnly, showSources, showNotes, testIdPrefix, }: SlideFormProps): JSX.Element;

export declare interface SlideFormProps {
    slide: DeckSlide;
    onChange: (slide: DeckSlide) => void;
    sources: readonly PresentationSourceOption[];
    onSearchSources?: (query: string) => PresentationSourceOption[] | Promise<PresentationSourceOption[]>;
    readOnly?: boolean;
    /**
     * Render the citation picker at the foot of the form. Default true. The
     * editor turns it off when the sources sit in their own compact row outside
     * a collapsed form — Save depends on them, so they cannot be folded away.
     */
    showSources?: boolean;
    /**
     * Render the speaker-notes field. Default true. The editor turns it off when
     * the notes have their own pane under the stage (`SpeakerNotes`), so the
     * same field is not editable in two places at once.
     */
    showNotes?: boolean;
    testIdPrefix: string;
}

export declare type SlideLayout = 'title' | 'section' | 'bullets' | 'two-column' | 'chart' | 'quote' | 'image';

export declare function SlideList({ items, selectedId, readOnly, onSelect, onMove, onDuplicate, onDelete, canDuplicate, rowComponent: Row, listClassName, testIdPrefix, }: SlideListProps): JSX.Element;

export declare interface SlideListItem {
    slide: DeckSlide;
    /** The generator's SVG for this slide, when one has been rendered. */
    thumbnailSvg?: string;
    uncited: boolean;
    /** The agent's last edit touched it. */
    changed?: boolean;
    /** An agent edit to it is in flight. */
    generating?: boolean;
    /** Other people on this slide (live presence). Since 2.371.0. */
    viewers?: SlideRowProps['viewers'];
}

export declare interface SlideListProps {
    items: readonly SlideListItem[];
    selectedId: string;
    readOnly?: boolean;
    onSelect: (id: string) => void;
    onMove: (from: number, to: number) => void;
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
    /** False at the deck's slide cap — duplicating would exceed it. */
    canDuplicate: boolean;
    /**
     * What each row looks like. Default `SlideRow` (the list rail);
     * `Filmstrip` passes its 16:9 thumbnail. Same props either way, so the drag
     * list and the plain fallback cannot drift apart.
     */
    rowComponent?: ComponentType<SlideRowProps>;
    /** Extra classes on the `<ol>`. */
    listClassName?: string;
    testIdPrefix: string;
}

export declare function SlideRow({ slide, index, total, thumbnailSvg, selected, uncited, changed, readOnly, onSelect, onMove, onDuplicate, onDelete, canDuplicate, canDelete, dragHandle, rowRef, dragging, testIdPrefix, }: SlideRowProps): JSX.Element;

export declare interface SlideRowProps {
    slide: DeckSlide;
    /** 0-based position in the deck; the row displays `index + 1`. */
    index: number;
    total: number;
    /** The generator's SVG for this slide, when a preview has been rendered. */
    thumbnailSvg?: string;
    selected: boolean;
    /** The slide cites nothing, so the deck cannot be saved while it is here. */
    uncited: boolean;
    /** The agent's last edit touched this slide — marked until the next one. */
    changed?: boolean;
    /** An agent edit to this slide is in flight. */
    generating?: boolean;
    /** Other people whose selected slide this is (live presence). Since 2.371.0. */
    viewers?: readonly PresenceUser[];
    readOnly?: boolean;
    onSelect: (id: string) => void;
    onMove: (from: number, to: number) => void;
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
    /** False at the deck's slide cap. */
    canDuplicate: boolean;
    /** False on the last remaining slide. */
    canDelete: boolean;
    /** Supplied by the sortable list; absent in the plain fallback. */
    dragHandle?: ReactNode;
    /** The sortable list's node ref. */
    rowRef?: Ref<HTMLLIElement>;
    dragging?: boolean;
    testIdPrefix: string;
}

/**
 * Content-box widths (px) of the bar itself, not the window.
 *
 * - wide (≥ 900): everything inline, the style note included.
 * - medium (≥ 600): Insert, Theme and the style note move behind ⋯; New
 *   slide, Layout, the chart switch, Undo/Redo, `end` and Present stay.
 * - narrow: Layout and the chart switch join them behind ⋯.
 *
 * Measured with every control on (a chart slide, undo/redo, Present): the
 * wide bar's natural width is ~850px, medium's ~560px, narrow's ~340px. The
 * deck editor's bar in the shell is ~870px at a 1280px window.
 */
export declare const SLIDES_TOOLBAR_BREAKPOINTS: {
    readonly narrow: 600;
    readonly wide: 900;
};

export declare function SlideSources({ sources, onChange, options, onSearchSources, readOnly, compact, testIdPrefix, }: SlideSourcesProps): JSX.Element;

export declare interface SlideSourcesProps {
    /** The citations already on the slide. */
    sources: readonly DeckSource[];
    onChange: (sources: DeckSource[]) => void;
    /**
     * What the deck already has to hand — the run's own inputs. Offered before
     * anything is typed, because the slide's source is nearly always one of
     * them.
     */
    options: readonly PresentationSourceOption[];
    /** The Documents explorer's search. Absent, only `options` can be picked. */
    onSearchSources?: (query: string) => PresentationSourceOption[] | Promise<PresentationSourceOption[]>;
    readOnly?: boolean;
    /**
     * One line: the chips and a small "Add source" button that opens the
     * search. For the editor's agent layout, where the slide's form is folded
     * away but its citations cannot be — Save depends on them. Default false.
     */
    compact?: boolean;
    testIdPrefix: string;
}

export declare function SlideStage({ children, generating, generatingLabel, label, maxWidth, className, 'data-testid': testId, }: SlideStageProps): JSX.Element;

export declare interface SlideStageProps {
    /** The slide picture or a state. Centred inside the 16:9 frame. */
    children: ReactNode;
    /** The agent is rewriting this slide: label over it, `aria-busy`. */
    generating?: boolean;
    /** Default "Generating…". */
    generatingLabel?: string;
    /** Accessible name of the frame — "Slide 2 of 5: Transcript". */
    label?: string;
    /** Widest the frame grows. Default `4xl`. */
    maxWidth?: SlideStageWidth;
    className?: string;
    'data-testid'?: string;
}

export declare type SlideStageWidth = '2xl' | '3xl' | '4xl' | '5xl';

export declare function SlidesToolbar({ slide, theme, onAddSlide, canAddSlide, onLayoutChange, onThemeChange, onChartKindChange, onUndo, onRedo, canUndo, canRedo, onPresent, end, disabled, className, testIdPrefix, size: sizeProp, }: SlidesToolbarProps): JSX.Element;

export declare interface SlidesToolbarProps {
    /** The slide on the stage. Layout and the chart switch act on it. */
    slide?: DeckSlide;
    theme: DeckTheme;
    /** Adds a slide after the current one. `layout` comes from Insert. */
    onAddSlide: (layout?: SlideLayout) => void;
    /** False at the deck's slide cap. */
    canAddSlide?: boolean;
    onLayoutChange: (layout: SlideLayout) => void;
    onThemeChange: (theme: DeckTheme) => void;
    onChartKindChange?: (kind: DeckChart['kind']) => void;
    onUndo?: () => void;
    onRedo?: () => void;
    canUndo?: boolean;
    canRedo?: boolean;
    /** Renders Present. */
    onPresent?: () => void;
    /** Before Present — revision tabs, Save, Download when the host has no header for them. */
    end?: ReactNode;
    disabled?: boolean;
    className?: string;
    /** Prefix for the controls' test ids. Default `slides-toolbar`. */
    testIdPrefix?: string;
    /**
     * How much of the bar fits on ONE row. `auto` (the default) measures the
     * bar's own box — see `SLIDES_TOOLBAR_BREAKPOINTS`. A fixed value is for
     * tests and stories.
     */
    size?: SlidesToolbarSize | 'auto';
}

/** One-row layouts, widest first. */
export declare type SlidesToolbarSize = 'wide' | 'medium' | 'narrow';

/** `null` — not measured yet — is wide: a first paint that hides controls and then shows them is worse than one frame of overflow. */
export declare function slidesToolbarSize(width: number | null): SlidesToolbarSize;

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

export declare function SpeakerNotes({ value, onChange, readOnly, maxLength, placeholder, className, 'data-testid': testId, }: SpeakerNotesProps): JSX.Element;

export declare interface SpeakerNotesProps {
    value: string | undefined;
    /** `undefined` when the box is emptied. */
    onChange: (notes: string | undefined) => void;
    readOnly?: boolean;
    /** Default `MAX_NOTES_CHARS` (2000), the generator's cap. */
    maxLength?: number;
    placeholder?: string;
    className?: string;
    /** Test id of the textarea. Default `speaker-notes`; the pane is `<id>-pane`. */
    'data-testid'?: string;
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

export declare function SuggestionCard({ kind, author, when, context, deletedText, insertedText, insertedBlocks, deletedBlocks, active, onFocus, onAccept, onReject, className, 'data-testid': testId, }: SuggestionCardProps): JSX.Element;

/** What kind of change is being proposed. */
export declare type SuggestionCardKind = 'insert' | 'delete' | 'replace' | 'modify';

export declare interface SuggestionCardProps {
    kind: SuggestionCardKind;
    /**
     * Display name of whoever proposed it. Never blank — see below.
     *
     * `"Eve (powered by Haiku)"` is understood as a person and the model that
     * drafted for them, and is laid out as two tiers: Eve owns the author row,
     * the model sits under it. Anything else is one name and renders as one.
     */
    author: string;
    /** When it was proposed, epoch ms. */
    when?: number | null;
    /** Where in the document, e.g. a section title. */
    context?: string;
    /** Text proposed for removal — the whole run, for hosts without block detail. */
    deletedText?: string;
    /** Text proposed for addition — the whole run. */
    insertedText?: string;
    /** The same, one entry per block. Preferred over `insertedText` when given. */
    insertedBlocks?: readonly string[];
    deletedBlocks?: readonly string[];
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

export declare function SuggestionReviewList({ count, children, onAcceptAll, onRejectAll, error, headerExtra, emptyTitle, emptyBody, title, variant, className, 'data-testid': testId, }: SuggestionReviewListProps): JSX.Element;

export declare interface SuggestionReviewListProps {
    /** How many are open — the count in the header. */
    count: number;
    /** The cards. */
    children?: ReactNode;
    /** Present, the header offers Accept all / Reject all. Absent for a reader who cannot resolve. */
    onAcceptAll?: () => void;
    onRejectAll?: () => void;
    /** Something a resolution just refused, above the list. */
    error?: string | null;
    /** Something else the header should carry — a mode switch, say. */
    headerExtra?: ReactNode;
    /** Copy for the empty list. */
    emptyTitle?: string;
    emptyBody?: string;
    title?: string;
    /**
     * `card` (default) is a bordered, titled card for a page margin. `pane` is
     * the same list hosted inside a tab or side column that already names it:
     * no card chrome, no title, a slim toolbar carrying the count and the
     * whole-document resolutions, and its own gutter.
     */
    variant?: 'card' | 'pane';
    className?: string;
    'data-testid'?: string;
}

/** `data:` URI for an `<img src>`, or `undefined` for an empty/absent source. */
export declare function svgDataUri(svg: string | undefined): string | undefined;

/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use `DocumentOutline` (the page outline); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
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

/**
 * Slides that cite nothing, in deck order.
 *
 * The editor's only hard validation. Empty array means the spec can be saved;
 * anything else is the list the warning names and the reason Save is off.
 */
export declare function uncitedSlideIds(spec: DeckSpec): string[];

export declare interface UploadedDocumentFile {
    url: string;
    name: string;
    size: number;
    type: string;
}

export declare function useCommentMarginPreference({ storageKey, defaultVisible, }?: CommentMarginPreferenceOptions): CommentMarginPreference;

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

/** Reference editor upload binding; waits for the server's stable asset URL, never a data URI. */
export declare function useDocumentImageUpload(documentId: string | null | undefined, displayName: string, useFileUpload: DocumentFileUploadHook, timeoutMs?: number): DocumentImageUpload;

export declare function useDocumentOutline(editor: OutlineEditorLike | null): UseDocumentOutlineResult;

declare interface UseDocumentOutlineResult {
    entries: OutlineEntry[];
    activeId: string | null;
    /** Scroll the document to an entry and mark it current. */
    goTo: (id: string) => void;
}

/**
 * The bar's current layout, for whatever a host renders into `actions`.
 *
 * The slot sits inside the bar, so the host's controls are on the same row
 * and subject to the same width — a labelled "Comment" button that stays
 * labelled at `medium` is the control that pushed the bar onto a third row.
 * Outside a `DocumentToolbar` this reads `wide`.
 */
export declare function useDocumentToolbarSize(): DocumentToolbarSize;

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

export declare function VersionHistoryPanel({ versions, loading, previewTimestamp, onFetch: _onFetch, onPreview, onClearPreview, onClose, onSaveVersion, onCompare, onClearCompare, compareSections, compareTimestamp, currentSections, onRestore, docked, }: VersionHistoryPanelProps): JSX.Element;

declare interface VersionHistoryPanelProps {
    versions: VersionEntry[];
    loading: boolean;
    previewTimestamp: number | null;
    onFetch: () => void;
    onPreview: (timestamp: number) => void;
    onClearPreview: () => void;
    onClose: () => void;
    /** Save a named version. */
    onSaveVersion?: (name: string) => void;
    /** Trigger comparison for a version timestamp. */
    onCompare?: (timestamp: number) => void;
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
    /**
     * Inline, filling the box it is placed in — a document editor's Versions tab
     * inside `EditorShell` — instead of sliding in over the page from the right
     * edge of the window.
     */
    docked?: boolean;
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

export declare function VideoDockSlot({ docked, canAccept, dockId, label, hint, undockLabel, onRequestUndock, compact, onDragOver, onDragLeave, onDrop, className, children, 'data-testid': testId, }: VideoDockSlotProps): JSX.Element | null;

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
    /**
     * A one-line drop prompt (label · hint in a 40px dashed strip) instead of
     * the 16:9 box — for a slot whose docked content is a shelf, not a stage:
     * the in-call shelf above a chat composer.
     */
    compact?: boolean;
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
 * Move a slide's layout, keeping everything the new layout can still use.
 *
 * Content is NOT discarded on a layout change: a bullets slide turned into a
 * chart keeps its bullets, so turning it back does not lose the words. The
 * generator ignores the fields a layout does not read, and the alternative —
 * deleting them — makes the layout picker a destructive control people learn
 * to avoid.
 */
export declare function withLayoutDefaults(slide: DeckSlide, layout: SlideLayout): DeckSlide;

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
 * The header's two banners — a refused lifecycle change, and a legacy "final"
 * claim the server never recorded. Exported on their own so a host that shows
 * the header as `variant="actions"` inside `EditorShell` (where the head
 * actions are one short row) can put them at the top of the surface instead,
 * full width, where a sentence fits.
 */
export declare function WorkspaceDocumentHeaderNotices({ lifecycleError, onDismissLifecycleError, lifecycleLegacyClaim, canClaimOwnership, }: WorkspaceDocumentHeaderNoticesProps): JSX.Element | null;

export declare interface WorkspaceDocumentHeaderNoticesProps {
    lifecycleError?: LifecycleErrorView | null;
    onDismissLifecycleError?: () => void;
    lifecycleLegacyClaim?: LegacyFinalClaim | null;
    /** Whether the header offers "Take ownership" — changes what the ownerless note says. */
    canClaimOwnership?: boolean;
}

export declare interface WorkspaceDocumentHeaderProps {
    /**
     * `bar` (default) is the whole two-row header: back link, title, status,
     * save state, then the mode pill and the actions. `actions` is only the
     * right-hand cluster — ownership, comment count, who is here, the mode pill,
     * the room pill, lifecycle actions and the ⋯ menu, with their dialogs — for
     * a host that puts the title, status and save state in `EditorShell`'s own
     * title row and hands this over as `headActions`. The two banners are not
     * part of it; render `WorkspaceDocumentHeaderNotices` where a sentence fits.
     */
    variant?: 'bar' | 'actions';
    /**
     * `variant="actions"` only. `cluster` (default) lays every control out in the
     * row. `menu` is the editor head of the Documents mockups ("Share · (i) · ⋯"):
     * the owner line, the mode ("Editing" and why), My Items and the lifecycle
     * actions move into the ⋯ menu as its first sections, and the row keeps only
     * the room / call pill, the share status and ⋯. The comment chip is dropped
     * (the shell's Comments tab carries the count). Since 2.385.1.
     */
    actionsLayout?: 'cluster' | 'menu';
    /**
     * The menu layout's ⋯ trigger: `boxed` (default) is the 40px bordered square
     * of a file's head; `ghost` is a borderless 28px glyph, for the work-item
     * head's crumb line. Since 2.386.15.
     */
    menuTrigger?: 'boxed' | 'ghost';
    /** Host-controlled durable persistence receipt; omitted means unknown. */
    saveState?: DocumentSaveState;
    /** Actions scoped to the current source, such as draft/review/publish. */
    workflowActions?: ReactNode;
    formatActions?: ReactNode;
    className?: string;
    titleEditable?: boolean;
    onPrint?: () => void;
    extraMenuItems?: ReadonlyArray<{
        id: string;
        label: string;
        onSelect: () => void;
        group?: DocumentMenuGroup;
    }>;
    /** The file menu (see DocumentFileActions). `actionsLayout="menu"` only. Since 2.390.3. */
    fileActions?: DocumentFileActions;
    meta: DocumentMeta;
    mode: ViewMode;
    suggesting?: boolean;
    modeReason?: string;
    participants: Participant[];
    onUpdateMeta?: (patch: Partial<DocumentMeta>) => void;
    onExport?: (format: 'markdown' | 'pdf' | 'json') => void;
    exportFormats?: readonly ('markdown' | 'pdf' | 'json')[];
    onToggleHistory?: () => void;
    onToggleVideoCall?: () => void;
    onToggleVideoHistory?: () => void;
    isCallActive?: boolean;
    callVariant?: 'idle' | 'available' | 'active';
    callLabel?: string;
    onClearDocument?: () => void;
    onJumpToUser?: (participant: Participant) => void;
    sections?: {
        id: string;
        title: string;
    }[];
    onToggleMyItems?: () => void;
    onToggleChat?: () => void;
    chatRoomName?: string | null;
    chatUnreadCount?: number;
    formatActionsRef?: (el: HTMLDivElement | null) => void;
    myItemCount?: number;
    commentCount?: number;
    onBack?: () => void;
    onFollowUser?: (participant: Participant) => void;
    followingUserId?: string | null;
    onFinalize?: () => void;
    onUnlock?: () => void;
    pastCallsCount?: number;
    lifecycleStatus?: DocumentLifecycleStatus;
    owner?: DocumentPerson | null;
    collaborators?: readonly DocumentPerson[];
    onShare?: () => void;
    lifecycleTerminal?: boolean;
    lifecycleLegacyClaim?: LegacyFinalClaim | null;
    lifecycleActions?: LifecycleAction[];
    lifecycleLoading?: boolean;
    /**
     * The document has no review status this caller can read (the platform
     * answered "not found" for its lifecycle). Not an error: no status pill, and
     * the review actions show as ONE disabled "Submit for review" row whose
     * tooltip is this text, so the reader learns why rather than finding the
     * Review group missing. Ignored while the server offers actions. Since 2.407.13.
     */
    lifecycleUnavailableReason?: string;
    lifecycleBusy?: boolean;
    lifecycleError?: LifecycleErrorView | null;
    onDismissLifecycleError?: () => void;
    onLifecycleAction?: (action: LifecycleAction, reason?: string) => void;
    onClaimOwnership?: () => void;
    onShareToRoom?: () => void;
    shareRoomName?: string | null;
    sharingToRoom?: boolean;
    shareStatus?: {
        tone: 'success' | 'error';
        text: string;
    } | null;
    onDismissShareStatus?: () => void;
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
        canvasListStyle: {
            /**
             * Make the caret's block a list of the style's kind (if it is not one
             * already) and set its marker.
             */
            setListStyle: (style: ListStyle) => ReturnType;
        };
    }
}


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
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
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
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}


declare global {
    interface Window {
        /** Dev-only imperative canvas bridge — see `DevEditorBridge` above. */
        __pipelineEditor?: unknown;
    }
}
