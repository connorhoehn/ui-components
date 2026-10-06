import { type CSSProperties, type ReactNode } from 'react';
import type { XmlFragment } from 'yjs';
import type * as Y from 'yjs';
import TiptapEditor from './TiptapEditor';
import { ZOOM_FIT } from './DocumentStatusBar';
import DocumentToolbar from './DocumentToolbar';
import { type GutterItem } from './DocumentGutter';
/**
 * A form the ProseMirror schema could not express, surfaced rather than
 * dropped. Mirrors `UnsupportedForm` in realtime-modules structurally so this
 * package keeps zero runtime dependency on it.
 */
export interface CanvasUnsupportedForm {
    kind: string;
    reason?: string;
}
/**
 * What the page row spends on everything that is not the sheet.
 *
 * The gaps are counted separately from the rails and that is not a detail: the
 * row is three children whenever EITHER rail is open, because a lone rail is
 * balanced by a counterweight spacer, so it pays for two gaps either way. The
 * spacer's own width is not charged — at the fitted scale it has nothing left
 * to take and collapses to zero, which is what keeps this arithmetic and the
 * row's own layout agreeing. Charging one gap instead of two is what left the
 * "fitted" sheet 24px too wide, eating the row's right padding.
 */
export declare function canvasRowChrome(showGutter: boolean, showOutline: boolean, narrow: boolean): number;
/**
 * How many whole sheets a stack of `heightPx` occupies.
 *
 * Exported because it is the only arithmetic in the pagination path and a
 * component test cannot reach it — jsdom has no layout, so every measured
 * height there is zero.
 *
 * No longer on the live path — `flowCanvasPages` reports the count now,
 * because after the pushes the content height is something only IT knows. This
 * stays as the plain statement of the rounding rule, and as the thing the
 * stylesheet test checks the page height against.
 *
 * Rounds UP, and that rounding is the point. Without it the last page is
 * however tall the content happened to be — a 1972px document ends in a
 * 916px stub with a hard bottom edge, which reads as a rendering bug rather
 * than as the last page of a document. Google Docs pads the final sheet to
 * full height for the same reason.
 */
export declare function canvasPageCount(heightPx: number): number;
/**
 * The sheet's inline style: display scale, and the height it is padded out to.
 *
 * A named function rather than a second inline object on the element. Neither
 * value could have been a Tailwind class — `zoom` is a float off a select and
 * `minHeight` is a measurement — so this is not about satisfying
 * `check-static-styles` (that guard already flags this file for the ruler's
 * style block above, and did before pagination existed). It is about the
 * arithmetic being somewhere a test can reach it.
 *
 * Both values are in the sheet's OWN coordinates, which is why neither is
 * multiplied by zoom — CSS `zoom` scales the layout box, so a length written
 * here is scaled by the browser exactly once.
 */
/**
 * Where the reader's display scale is remembered. Namespaced to this package
 * so a host's own keys cannot collide with it.
 */
export declare const ZOOM_STORAGE_KEY = "uic:canvas-document:zoom";
/**
 * The remembered zoom, or 100%.
 *
 * Range-checked rather than trusted: localStorage is a string store that
 * anything on the origin can write, and a NaN or a 40x would go straight into
 * a CSS `zoom` and render a page nobody can read or recover from — the control
 * that would fix it is at the bottom of a workspace that no longer fits on the
 * screen. The bounds are wider than ZOOM_STEPS on purpose, so a host that
 * drives zoom past the presets still gets its value back.
 */
export declare function readStoredZoom(): number;
/**
 * The remembered zoom SETTING — a scale, or the fit-width rule.
 *
 * Fit width has to survive a reload like any other choice, and it cannot be
 * remembered as the percentage it produced: the window it fitted is not
 * necessarily the window it comes back to, and a "fit" that is really a frozen
 * 183% is worse than no fit at all. So the rule itself is what is stored.
 *
 * `readStoredZoom` stays as it was — a number, always — because callers outside
 * this file only ever wanted a scale.
 */
export declare function readStoredZoomSetting(): number | typeof ZOOM_FIT;
export declare function canvasPaperStyle(zoom: number, minHeightPx: number | null): CSSProperties;
/** The parts `renderFrame` receives. */
export interface CanvasDocumentFrame {
    /** Formatting toolbar plus the find/replace row when open; null when there is nothing to edit. */
    toolbar: ReactNode;
    /** The page ruler, aligned to the sheet; null when `showRuler` is off. */
    ruler: ReactNode;
    /** Header, banners and the canvas workspace. */
    surface: ReactNode;
}
export interface CanvasDocumentViewProps {
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
export default function CanvasDocumentView({ isCanvas, body, ydoc, provider, user, editable, extensions, onConvert, convertSlot, unsupported, schemaProbe, header, belowRuler, toolbarActions, gutterItems, gutterLead, onFocusGutterItem, onHoverGutterItem, gutterVisible, showRuler, toolbarDensity, showStatusBar, zoomMode, toolbarStyle, pageMargin, onDocumentStats, fitHeight, showOutline, paginate, onToggleGutter, renderFrame, onInsertImage, onEditorReady, 'data-testid': testId, }: CanvasDocumentViewProps): import("react").JSX.Element;
//# sourceMappingURL=CanvasDocumentView.d.ts.map