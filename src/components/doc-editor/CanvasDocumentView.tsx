// src/components/doc-editor/CanvasDocumentView.tsx
//
// The page surface for a canvas document — the Confluence/Google-Docs style
// white page that replaces section-by-section form editing.
//
// Presentational on purpose. It knows nothing about Y.js roots, schema
// versions or migration; it renders the three states a canvas document can be
// in and calls back. `WrappedCanvasDocument` in integrations/realtime-modules
// binds it to `useCanvasDocument()`.
//
// The three states, and why each exists:
//
//   1. canvas          → render the body. The whole page is ONE editor, so a
//                        heading is just a heading and a selection can span
//                        what used to be two section cards.
//   2. not yet a canvas → offer the conversion. Never convert on mount: it
//                        rewrites the user's document, and doing that as a
//                        side effect of opening a page is how you get a
//                        surprise migration nobody asked for.
//   3. converting/failed → say so. `materialize` REFUSES on a non-empty body
//                        (that refusal is what stops a double-convert from
//                        duplicating content), and a refusal the user cannot
//                        see reads as a dead button.

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { XmlFragment } from 'yjs';
import type * as Y from 'yjs';
import { cn } from '../../lib/cn';
import TiptapEditor from './TiptapEditor';
import { DocumentRuler } from './DocumentRuler';
import { DocumentOutline } from './DocumentOutline';
import { DocumentStatusBar, ZOOM_FIT, ZOOM_STEPS, type DocumentZoomControl } from './DocumentStatusBar';
import { elementForPosition, useDocumentOutline, useDocumentWordCount } from './useDocumentOutline';
import DocumentToolbar from './DocumentToolbar';
import DocumentGutter, { type GutterItem } from './DocumentGutter';
import Banner from '../shared/Banner';
import EmptyState from '../shared/EmptyState';
import { Button } from '../ui/Button';
import Chip from '../shared/Chip';
import DocumentFindBar from './DocumentFindBar';
import { DOC_PAGE_HEIGHT, canvasPageAt } from './canvas/pageFlow';
import { useCanvasPageFlow } from './canvas/useCanvasPageFlow';
import { numberedOutline, readingContentsExtension } from './canvas/readingContents';

/**
 * A form the ProseMirror schema could not express, surfaced rather than
 * dropped. Mirrors `UnsupportedForm` in realtime-modules structurally so this
 * package keeps zero runtime dependency on it.
 */
export interface CanvasUnsupportedForm {
  kind: string;
  reason?: string;
}

/** Breathing room left below the workspace so the page does not run into the window edge. */
const GUTTER_BELOW_WORKSPACE = 16;

/**
 * One US-Letter page at 96dpi, and the period of the seam painted by
 * `.doc-page--paginated` in styles.css. The two MUST agree: this value decides
 * where the sheet's bottom edge falls, that one decides where the seam is
 * drawn, and a disagreement shows up as a page whose last seam is not at its
 * bottom.
 *
 * Now owned by `canvas/pageFlow.ts`, which needs the same number to decide
 * which blocks a seam would cut. Re-exported under the old name so nothing in
 * this file reads as if there were two page heights.
 */
const PAGE_HEIGHT = DOC_PAGE_HEIGHT;

/** The other half of the same sheet: 8.5in at 96dpi. */
const PAGE_WIDTH = 816;

/**
 * The page row's own horizontal padding, both sides, at each of its two widths
 * (`px-2` and `sm:px-6`). Fit width has to subtract exactly what the row will
 * spend, or the "fitted" sheet overflows by that much and the workspace grows a
 * horizontal scrollbar at the one setting whose whole promise is that it does
 * not need one.
 */
const ROW_PADDING_X = { base: 16, sm: 48 } as const;
/** Tailwind's `sm`. */
const SM_BREAKPOINT = 640;
/** The row's `gap-3 sm:gap-6`, which it only sets when a rail is present. */
const ROW_GAP = { base: 12, sm: 24 } as const;
/** Rail widths, mirroring the page row's own classes. */
const GUTTER_RAIL = 280;
const OUTLINE_RAIL = 220;

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
export function canvasRowChrome(
  showGutter: boolean,
  showOutline: boolean,
  narrow: boolean,
): number {
  const padding = narrow ? ROW_PADDING_X.base : ROW_PADDING_X.sm;
  const gap = narrow ? ROW_GAP.base : ROW_GAP.sm;
  const rails = (showGutter ? GUTTER_RAIL : 0) + (showOutline ? OUTLINE_RAIL : 0);
  const gaps = showGutter || showOutline ? gap * 2 : 0;
  return padding + rails + gaps;
}

/** The bounds a display scale may take, shared by the store reader and fit width. */
const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;
const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

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
export function canvasPageCount(heightPx: number): number {
  if (!Number.isFinite(heightPx) || heightPx <= 0) return 1;
  return Math.max(1, Math.ceil(heightPx / PAGE_HEIGHT));
}

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
export const ZOOM_STORAGE_KEY = 'uic:canvas-document:zoom';

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
export function readStoredZoom(): number {
  const setting = readStoredZoomSetting();
  return setting === ZOOM_FIT ? 1 : setting;
}

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
export function readStoredZoomSetting(): number | typeof ZOOM_FIT {
  if (typeof window === 'undefined') return 1;
  try {
    const raw = window.localStorage.getItem(ZOOM_STORAGE_KEY);
    if (raw === null) return 1;
    if (raw === ZOOM_FIT) return ZOOM_FIT;
    const n = Number(raw);
    return Number.isFinite(n) && n >= MIN_ZOOM && n <= MAX_ZOOM ? n : 1;
  } catch {
    return 1;
  }
}

export function canvasPaperStyle(zoom: number, minHeightPx: number | null): CSSProperties {
  return {
    ...(zoom === 1 ? {} : { zoom }),
    ...(minHeightPx === null ? {} : { minHeight: minHeightPx }),
  };
}

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
  user: { name: string; color: string };
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
  onDocumentStats?: (stats: { wordCount: number | null; pageCount: number | null }) => void;
  /** `fit` pins the sheet to the pane's width and ignores the remembered zoom — for a document shown in a narrow host. */
  zoomMode?: 'remembered' | 'fit';
  /** Optional starting scale for an embedded reader; later zoom choices still work. */
  initialZoom?: number;
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
  /** Read-only document layout. Pane keeps normal-size text and a continuous sheet. */
  readingPresentation?: 'page' | 'pane';
  /** Contents at the top and a persistent return-to-contents control. */
  readingNavigation?: boolean;
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

export default function CanvasDocumentView({
  isCanvas,
  body,
  ydoc,
  provider,
  user,
  editable = true,
  extensions,
  onConvert,
  convertSlot = null,
  unsupported = [],
  schemaProbe,
  header,
  belowRuler,
  toolbarActions,
  gutterItems,
  gutterLead,
  onFocusGutterItem,
  onHoverGutterItem,
  gutterVisible = true,
  showRuler: requestedRuler = true,
  toolbarDensity = 'full',
  showStatusBar = true,
  zoomMode = 'remembered',
  initialZoom,
  toolbarStyle = 'bar',
  pageMargin = 'normal',
  onDocumentStats,
  fitHeight = 'viewport',
  showOutline: requestedOutline = false,
  paginate: requestedPagination = true,
  readingPresentation = 'page',
  readingNavigation = false,
  onToggleGutter,
  renderFrame,
  onInsertImage,
  onEditorReady,
  'data-testid': testId = 'canvas-document',
}: CanvasDocumentViewProps) {
  const readingPane = !editable && readingPresentation === 'pane';
  const paginate = requestedPagination && !readingPane;
  const showOutline = requestedOutline && !readingPane;
  const showRuler = requestedRuler && !readingPane;
  // Display scale of the sheet. CSS `zoom` rather than a transform: it scales
  // the LAYOUT box, so the workspace scrolls the right distance and the sheet
  // reserves the space it visually occupies. A transform would paint a larger
  // page over an unchanged 816x1056 hole in the layout.
  //
  // Remembered, because zoom is a property of the READER, not of the document.
  // Someone who works at 125% because 100% is too small for their screen wants
  // 125% on the next document too, and on this one after a refresh; a scale
  // that resets to 100% on every navigation makes the control something you
  // re-set rather than something you set. Every word processor persists it for
  // that reason.
  //
  // ONE key, not one per document, for the same reason: the preference is
  // about eyesight and screen size, which do not change per document.
  // Tallied by kind rather than measured with `.length`, which is the bug this
  // split exists to fix: the gutter holds comment threads AND proposed edits,
  // the total was handed to the toolbar as its comment count, and a document
  // whose margin held one agent suggestion and no discussion at all announced
  // "Comments 1" over an empty comments table. Unlabelled items count as
  // comments — see `GutterItem['kind']` for why that is the right default.
  const gutterCounts = useMemo(() => {
    let comments = 0;
    let suggestions = 0;
    for (const item of gutterItems ?? []) {
      if (item.kind === 'suggestion') suggestions += 1;
      else comments += 1;
    }
    return { comments, suggestions, total: comments + suggestions };
  }, [gutterItems]);
  // Two conditions, not one: there has to be something to show, AND the gutter
  // has to be switched on. Splitting them is what lets the toolbar keep
  // reporting the count while the column itself is gone.
  // A docked call keeps the gutter open on its own. Without this the call
  // would vanish the moment a document had no comments, which is most of them.
  const showGutter = (gutterCounts.total > 0 || !!gutterLead) && gutterVisible;

  // Hoisted above the zoom block below, which has to charge fit width for the
  // rails before it can resolve a scale — and `zoom` is a dependency of nearly
  // everything after it. All three inputs are props, so nothing is lost by
  // deriving it here.

  const [storedZoomSetting, setZoomSetting] = useState<number | typeof ZOOM_FIT>(() => initialZoom == null ? readStoredZoomSetting() : clampZoom(initialZoom));
  const zoomSetting = zoomMode === 'fit' ? ZOOM_FIT : storedZoomSetting;
  // Storage throws outright in some privacy modes rather than returning
  // null, and a zoom control that takes the page down is worse than one that
  // forgets. Failing to remember is the correct degradation.
  const rememberZoom = useCallback((next: number | typeof ZOOM_FIT) => {
    try { window.localStorage.setItem(ZOOM_STORAGE_KEY, String(next)); } catch { /* not remembered */ }
  }, []);
  const setZoom = useCallback((next: number) => {
    setZoomSetting(next);
    rememberZoom(next);
  }, [rememberZoom]);
  const setFitWidth = useCallback(() => {
    setZoomSetting(ZOOM_FIT);
    rememberZoom(ZOOM_FIT);
  }, [rememberZoom]);

  // The workspace owns the scroll and therefore owns the width the sheet has to
  // fit INTO. Declared here rather than beside its height measurement further
  // down because fit width needs it before `zoom` is resolved, and `zoom` is a
  // dependency of nearly everything below.
  const workspaceRef = useRef<HTMLDivElement | null>(null);
  // The sticky toolbar's height, published on the workspace as
  // `--uic-canvas-toolbar-h` so the `belowRuler` slot can pin itself just
  // under it (2.395.1). A CSS variable rather than an inline `top`, because
  // the toolbar mounts late (it waits for the editor) and changes height with
  // its own wrapping.
  const toolbarRef = useRef<HTMLDivElement | null>(null);

  // Fit width: a rule, re-evaluated, not a number chosen once.
  //
  // Google Docs has this and it is the setting a laptop actually uses — an
  // 816px sheet in a 1300px workspace wastes a third of the screen at 100%, and
  // the fixed presets step straight past the one scale that would use it
  // (125% is too small, 150% overflows and starts a sideways scroll). What the
  // reader wants is "as big as it goes", which is a function of the window.
  //
  // Charging for the rails but not for the counterweight spacer is deliberate
  // and self-consistent: at the fitted scale the sheet takes every pixel the
  // row has left, so the `flex-1 max-w-[280px]` counterweight collapses to
  // nothing anyway — and if it were charged for, the sheet would be sized for a
  // column that then vanishes and the page would sit off-centre by half of it.
  const [fitZoom, setFitZoom] = useState(1);
  useEffect(() => {
    const el = workspaceRef.current;
    if (!el) return;
    const measure = () => {
      const narrow = window.innerWidth < SM_BREAKPOINT;
      const available = el.clientWidth - canvasRowChrome(showGutter, showOutline, narrow);
      // Floored to a whole percent, and floored rather than rounded. The raw
      // ratio changes on every scrollbar appearing and disappearing, and an
      // unrounded zoom re-lays-out the whole document for a third of a pixel;
      // a percent is below the threshold where anyone could see the difference
      // and above the one where it thrashes. Rounding UP could put the sheet a
      // pixel wider than the room it was measured for, which starts the
      // sideways scroll this setting exists to remove — so it never rounds up.
      setFitZoom(clampZoom(Math.floor((available / PAGE_WIDTH) * 100) / 100));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
    // `isCanvas`/`body` for the same reason the height measurement below takes
    // them: the workspace does not exist until the document is known to be a
    // canvas, so the first run of this effect finds a null ref. Without them
    // fit width sat at its 1.0 default forever on any document that arrived
    // after mount — which is every document, since the Y.Doc loads
    // asynchronously. Verified: reloading with the setting stored as `fit` gave
    // an 816px sheet in a 1576px workspace.
  }, [showGutter, showOutline, isCanvas, body]);

  const zoom = readingPane ? 1 : zoomSetting === ZOOM_FIT ? fitZoom : zoomSetting;
  const fitActive = zoomSetting === ZOOM_FIT;

  // The ruler measures the sheet by MEASURING it, not by predicting it.
  //
  // Computing `816 * zoom` was wrong the moment the sheet could not have that
  // width: the page is `w-full max-w-[816px]`, so a zoom that exceeds the
  // workspace clamps it to the container instead. Verified in the browser at
  // 150% — the sheet came out 1196px while a predicted ruler drew 1224, so
  // every measure on it was off by half an inch. Reading the real width keeps
  // the two in agreement whatever the layout does to the page.
  useEffect(() => {
    const ws = workspaceRef.current;
    if (!ws) return;
    const write = () => {
      const h = toolbarRef.current ? Math.round(toolbarRef.current.getBoundingClientRect().height) : 0;
      ws.style.setProperty('--uic-canvas-toolbar-h', `${h}px`);
    };
    write();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(write) : null;
    if (ro) {
      ro.observe(ws);
      if (toolbarRef.current) ro.observe(toolbarRef.current);
    }
    return () => ro?.disconnect();
  });
  const paperRef = useRef<HTMLDivElement | null>(null);
  const [paperWidth, setPaperWidth] = useState<number | null>(null);
  const measurePaper = useCallback(() => {
    const el = paperRef.current;
    if (el) setPaperWidth(el.getBoundingClientRect().width);
  }, []);
  useEffect(() => {
    measurePaper();
    const el = paperRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measurePaper);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measurePaper, zoom]);

  // Pagination proper: where every block has to move so that no seam cuts it,
  // and how many sheets the result fills.
  //
  // This used to be one `getBoundingClientRect` on the body divided by the
  // page height, because the seam was a repeating background and content
  // simply flowed through it. That is the version that sliced images in half.
  // The hook measures each top-level block instead and pushes the ones a seam
  // would cross onto the next page; see `canvas/pageFlow.ts` for why the
  // stylesheet alone could never do it.
  //
  // Measured against the BODY and the PAPER, not the paper alone, and that is
  // what makes it safe: the body is a plain block whose height comes from its
  // own content, so the min-height set on its PARENT below cannot feed back
  // into it. Measuring the paper for content height would be a loop — paper
  // grows, so pages grows, so paper grows.
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const { pageCount } = useCanvasPageFlow(paginate, paperRef, bodyRef, zoom);

  // The workspace has to OWN the scroll, or nothing in it can stick.
  //
  // It carried `overflow-y-auto` and a `sticky top-0` toolbar and a
  // `sticky bottom-0` status bar, and not one of those did anything: with no
  // height limit the workspace simply grew to the document's full length, so
  // the WINDOW scrolled and the workspace never had a scrollport of its own.
  // Measured on a one-paragraph page: document 1453px tall in a 950px window,
  // zero scrollable elements, and the zoom control the user asked to have at
  // the bottom sitting at y=1389 — four hundred pixels below the fold, only
  // reachable by scrolling the whole app away.
  //
  // Capping the height here (rather than in the host page) keeps this working
  // wherever the view is embedded: measure our own distance from the top of
  // the viewport and take the rest of it.
  const [workspaceHeight, setWorkspaceHeight] = useState<number | null>(null);
  useEffect(() => {
    const el = workspaceRef.current;
    if (fitHeight === 'parent') { setWorkspaceHeight(null); return; }
    if (!el || typeof window === 'undefined') return;
    const measure = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      // A floor, so a cramped viewport degrades to "short document" rather
      // than to a workspace with no room for a line of text in it.
      setWorkspaceHeight(Math.max(320, window.innerHeight - top - GUTTER_BELOW_WORKSPACE));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [isCanvas, body, fitHeight]);

  // Which page the reader is looking at, for "Page 3 of 7".
  //
  // Scroll-derived rather than caret-derived. The caret is the more precise
  // answer while typing and the wrong one the rest of the time: a reader
  // scrolling through a document they are not editing has no caret to report,
  // and a read-only embed has none at all. The page under the top edge of the
  // scrollport is what every word processor's status bar shows for that
  // reason.
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (!paginate) { setCurrentPage(1); return; }
    const ws = workspaceRef.current;
    if (!ws) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const paper = paperRef.current;
      if (!paper) return;
      // How far the sheet's top edge sits ABOVE the scrollport's, in the
      // sheet's own coordinates. Negative before the page has been reached,
      // which `canvasPageAt` clamps to page one.
      const offset = (ws.getBoundingClientRect().top - paper.getBoundingClientRect().top) / (zoom > 0 ? zoom : 1);
      setCurrentPage(canvasPageAt(offset, pageCount));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    ws.addEventListener('scroll', schedule, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      ws.removeEventListener('scroll', schedule);
    };
  }, [paginate, zoom, pageCount]);

  // Cmd/Ctrl+F opens the document's own find, not the browser's.
  //
  // The browser's search cannot see a match below the fold in a virtualised or
  // scrolled sheet, cannot count matches for you, and cannot replace. A word
  // processor takes this shortcut over for exactly those reasons, and a person
  // who wanted the browser's can still have it with Escape then Cmd+F again.
  const [findOpen, setFindOpen] = useState(false);
  // Bumped on every Cmd/Ctrl+F, not only the one that opens the bar. With the
  // bar already open `setFindOpen(true)` is a no-op and the shortcut read as
  // dead — the caret stayed in the document while the browser's own find had
  // been suppressed, which is the worst of both. See DocumentFindBar's
  // `focusNonce`.
  const [findFocusNonce, setFindFocusNonce] = useState(0);
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'f') {
        ev.preventDefault();
        setFindOpen(true);
        setFindFocusNonce((n) => n + 1);
      }
    };
    const el = workspaceRef.current;
    // Bound to the workspace, not the window: two editors on one page must not
    // both answer the same keystroke.
    el?.addEventListener('keydown', onKey);
    return () => el?.removeEventListener('keydown', onKey);
  }, [isCanvas, body]);

  const [converting, setConverting] = useState(false);
  const [convertError, setConvertError] = useState<string | null>(null);
  // Held so the toolbar can render in the chrome ABOVE the sheet rather than
  // inside the page margins. Null until the editor finishes initialising.
  const [editor, setEditor] = useState<Parameters<typeof DocumentToolbar>[0]['editor'] | null>(null);

  // Derived from the document, not the DOM: a canvas heading carries no id,
  // so there is nothing in the rendered page to address it by.
  const outline = useDocumentOutline(editor as Parameters<typeof useDocumentOutline>[0]);
  // The document title is already visible in the page and host header.
  const readingEntries = numberedOutline(outline.entries);
  const contentsContainer = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const container = document.createElement('div');
    container.dataset.readingContents = '';
    container.contentEditable = 'false';
    return container;
  }, []);
  const readerExtensions = useMemo(() => readingNavigation && !editable && contentsContainer
    ? [...extensions, readingContentsExtension(contentsContainer)] : extensions,
  [extensions, readingNavigation, editable, contentsContainer]);
  const [headingPages, setHeadingPages] = useState<Record<string, number>>({});
  useEffect(() => {
    if (!readingNavigation || !paginate || !editor) return;
    let frame = 0;
    const readPages = () => {
      frame = 0;
      const paper = paperRef.current;
      if (!paper) return;
      const top = paper.getBoundingClientRect().top;
      const pages: Record<string, number> = {};
      for (const entry of outline.entries) {
        const heading = elementForPosition(editor as Parameters<typeof useDocumentOutline>[0], entry.id);
        if (heading) pages[entry.id] = Math.max(1, Math.floor((heading.getBoundingClientRect().top - top) / zoom / PAGE_HEIGHT) + 1);
      }
      setHeadingPages(previous => JSON.stringify(previous) === JSON.stringify(pages) ? previous : pages);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(readPages); };
    schedule();
    const bodyElement = bodyRef.current;
    const mutation = typeof MutationObserver === 'undefined' ? null : new MutationObserver(schedule);
    const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    if (bodyElement) {
      mutation?.observe(bodyElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['style'] });
      resize?.observe(bodyElement);
    }
    return () => { if (frame) cancelAnimationFrame(frame); mutation?.disconnect(); resize?.disconnect(); };
  }, [readingNavigation, paginate, editor, outline.entries, pageCount, zoom]);
  const contentsRef = useRef<HTMLDivElement | null>(null);
  const [readingSection, setReadingSection] = useState<string | null>(null);
  const goToReadingSection = (id: string) => {
    const heading = elementForPosition(editor as Parameters<typeof useDocumentOutline>[0], id);
    const workspace = workspaceRef.current;
    if (!(heading instanceof HTMLElement) || !workspace) return;
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
    workspace.scrollTo({ top: workspace.scrollTop + heading.getBoundingClientRect().top - workspace.getBoundingClientRect().top - 16, behavior: 'smooth' });
    setReadingSection(id);
  };
  const returnToContents = () => {
    workspaceRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    contentsRef.current?.focus({ preventScroll: true });
    setReadingSection(null);
  };
  const wordCount = useDocumentWordCount(editor as Parameters<typeof useDocumentWordCount>[0]);

  // One inch or three quarters, in DOCUMENT pixels — the ruler scales it.
  const marginPx = pageMargin === 'narrow' ? 72 : 96;

  // Zoom for the toolbar's overflow when there is no status bar to hold it.
  // `fit` mode has no choice to offer, so nothing is passed there.
  const zoomControl = useMemo<DocumentZoomControl | null>(
    () =>
      showStatusBar || zoomMode === 'fit'
        ? null
        : { zoom, fitActive, steps: ZOOM_STEPS, onZoomChange: setZoom, onFitWidth: setFitWidth },
    [showStatusBar, zoomMode, zoom, fitActive, setZoom, setFitWidth],
  );

  // A ref, so a host passing an inline arrow does not re-fire this every render.
  const onDocumentStatsRef = useRef(onDocumentStats);
  onDocumentStatsRef.current = onDocumentStats;
  const statsPageCount = paginate ? pageCount : null;
  useEffect(() => {
    onDocumentStatsRef.current?.({ wordCount, pageCount: statsPageCount });
  }, [wordCount, statsPageCount]);

  // How much of that is SELECTED.
  //
  // The document total alone answers the wrong question most of the time.
  // Anyone writing to a length selects the section they are working on and
  // asks how long THAT is — an abstract, a summary, the part that has to fit
  // on one slide — which is why every word processor reports the selection
  // alongside the document and why Docs writes it as "12 of 350 words".
  //
  // Listens to `selectionUpdate` as well as `update`: a selection changes
  // without the document changing at all, so an `update`-only subscription
  // (which is all `useDocumentWordCount` needs) would report a count that only
  // refreshed when you typed.
  //
  // `textBetween` with a block separator, not `textContent`: without one, the
  // last word of a paragraph and the first of the next fuse into a single word
  // and every multi-paragraph selection reads one short per boundary.
  const [selectedWords, setSelectedWords] = useState(0);
  useEffect(() => {
    if (!editor) { setSelectedWords(0); return; }
    const refresh = () => {
      // Defensive for the same reason readOutline is: during initialisation
      // the host holds an editor that has no state yet, and a word count is
      // the last thing that should be able to take the page down.
      const sel = editor.state?.selection;
      if (!sel || sel.empty) { setSelectedWords(0); return; }
      const text = editor.state.doc.textBetween(sel.from, sel.to, ' ', ' ');
      setSelectedWords(text.trim().split(/\s+/).filter(Boolean).length);
    };
    refresh();
    if (typeof editor.on !== 'function' || typeof editor.off !== 'function') return;
    editor.on('selectionUpdate', refresh);
    editor.on('update', refresh);
    return () => {
      editor.off('selectionUpdate', refresh);
      editor.off('update', refresh);
    };
  }, [editor]);

  const handleConvert = async () => {
    if (!onConvert || converting) return; // a second click races the first
    setConverting(true);
    setConvertError(null);
    try {
      const reason = await onConvert();
      if (reason) setConvertError(reason);
    } catch (err) {
      setConvertError(err instanceof Error ? err.message : String(err));
    } finally {
      setConverting(false);
    }
  };

  // `renderFrame` mode: the host places the toolbar and ruler in its own
  // chrome (EditorShell's `toolbar` slot) and the canvas fills the body. The
  // default keeps both inside the workspace scroller, sticky.
  const framed = !!renderFrame;
  const toolbarNode: ReactNode = editable && editor ? (
            <div ref={framed ? undefined : toolbarRef} data-testid={`${testId}-toolbar`} className={framed ? 'min-w-0' : 'sticky top-0 z-20'}>
            <div
              // The card sits in the column's gutter, `--dock-inset` (1rem
              // unless the host says otherwise) — the same one the pinned
              // composer dock and EditorShell's bar use, so the toolbar card's
              // edges are the composer card's. A fixed px-3 left the composer
              // 3px inside the toolbar on each side (visual audit
              // dock-aligned-with-toolbar, page editor and Folders).
              className={framed
                ? undefined
                : toolbarStyle === 'card'
                ? 'bg-workspace px-[var(--dock-inset,1rem)] pb-2 pt-2'
                : 'border-b border-border bg-surface-panel'}
            >
              {/* Full workspace width, NOT the sheet's 816px.

                  Capping chrome at the PAPER width contradicts the comment
                  above it: the toolbar belongs to the app, not to the page. It
                  also broke as soon as the toolbar earned another control —
                  `Insert diagram` pushed it past 816px, `flex-wrap` folded it
                  onto a second row, and the result read as two unrelated
                  toolbars stacked on top of each other (measured: the inner bar
                  was 800px wide and 68px tall, i.e. two rows of controls, inside
                  a 1372px workspace with room to spare).

                  Word processors put the toolbar across the whole chrome for
                  this reason — the sheet is centred beneath it, the controls are
                  not. */}
              <div className={framed ? 'w-full' : toolbarStyle === 'card' ? 'w-full rounded-lg border border-border bg-surface shadow-sm' : 'w-full px-3'} data-toolbar-style={toolbarStyle}>
                <DocumentToolbar
                  density={toolbarDensity}
                  {...(toolbarStyle === 'card' ? { extras: 'overflow' as const } : {})}
                  editor={editor}
                  actions={toolbarActions}
                  // Passed even when the gutter is hidden — that is precisely
                  // when the count is the only remaining evidence that a
                  // discussion exists.
                  commentCount={gutterCounts.comments}
                  suggestionCount={gutterCounts.suggestions}
                  gutterVisible={gutterVisible}
                  {...(onToggleGutter ? { onToggleGutter } : {})}
                  {...(onInsertImage ? { onInsertImage } : {})}
                  {...(zoomControl ? { zoomControl } : {})}
                />
              </div>
            </div>
            {findOpen && (
              // `bg-workspace`, and opaque on purpose: this row is stuck to
              // the top of the scrollport, so the document passes UNDER it.
              // A transparent row would show text sliding through the gap
              // beside the card.
              <div
                data-testid={`${testId}-find-row`}
                className={framed ? 'flex justify-end pt-2' : 'flex justify-end bg-workspace px-[var(--dock-inset,1rem)] pb-2 pt-2'}
              >
                <DocumentFindBar
                  editor={editor}
                  canReplace={editable}
                  focusNonce={findFocusNonce}
                  onClose={() => { setFindOpen(false); editor.commands.focus(); }}
                  data-testid={`${testId}-find`}
                />
              </div>
            )}
            </div>
  ) : null;
  const rulerNode: ReactNode = showRuler ? (
            // A ROW WITH THE SAME SHAPE AS THE PAGE ROW, not a padded strip.
            //
            // The ruler used to centre itself over the workspace and subtract a
            // rail's width in padding to compensate — which is a PREDICTION of
            // where the sheet will land, and it is wrong exactly when the
            // window is small enough for the prediction to matter. The page
            // row's counterweight is `flex-1 max-w-[280px]`: it COLLAPSES when
            // the row cannot afford it, and the sheet slides over by half of
            // whatever it gave up, while the ruler's fixed padding did not
            // move. Measured on a 1728px window at 150% with the gutter open:
            // the sheet ran 152→1376 and the ruler track 140→1364, a 12px lie
            // on top of everything else the ruler was already saying.
            //
            // Mirroring the row instead means the two are laid out by the same
            // algorithm on the same free space, so they cannot disagree —
            // whatever the rails do, they do it to both.
            <div
              data-testid={`${testId}-ruler-row`}
              className={cn(
                // Under the card toolbar its own 8px of workspace is the gap
                // (2.386.11): the extra 12px pushed the sheet 15px below the
                // Folders mockup's.
                'flex px-2 sm:px-6',
                framed ? 'pt-1' : editable && editor && toolbarStyle === 'card' ? 'pt-0' : 'pt-3',
                (showGutter || showOutline) && 'gap-3 sm:gap-6',
              )}
            >
              {showGutter && !showOutline && (
                <div aria-hidden className="flex-1 max-w-[280px]" />
              )}
              {showOutline && <div aria-hidden className="w-[220px] shrink-0" />}
              <DocumentRuler
              // DOCUMENT pixels, all three of them, with `zoom` handed over
              // separately — the ruler owns the one conversion to screen px.
              //
              // `paperWidth` is a `getBoundingClientRect` width, so it is
              // already scaled; dividing by zoom puts it back on the page's
              // own grid. Exactly the round trip `measurePages` makes for the
              // page count, and for the same reason: a measurement is in
              // visual pixels, and an inch is not.
              //
              // Measuring rather than assuming 816 is still what makes a
              // CLAMPED page agree with its ruler — at 100% the sheet is
              // `w-full max-w-[816px]` and a narrow workspace makes it
              // narrower than a letter page.
              //
              // The margins are the plain one-inch figure now, NOT `96 * zoom`:
              // pre-scaling them here is what left the tick grid measuring in
              // screen pixels while the labels counted document inches, so a
              // 150% page grew eleven inch labels and put "1" two thirds of an
              // inch from the margin.
              {...(paperWidth ? { pageWidth: paperWidth / zoom } : {})}
              marginLeft={marginPx}
              marginRight={marginPx}
              zoom={zoom}
              // The sheet's own slot in the row: auto margins to centre it in
              // whatever the rails leave, a fixed width so it is the same box
              // the paper is. The width is the MEASURED paper width — already
              // in screen pixels — so the two match even when the sheet is
              // clamped narrower than a letter page.
              className="mx-auto shrink-0"
              style={paperWidth === null ? undefined : { width: paperWidth }}
            />
              {showGutter && <div aria-hidden className="w-[280px] shrink-0" />}
              {showOutline && !showGutter && (
                <div aria-hidden className="flex-1 max-w-[280px]" />
              )}
            </div>
  ) : null;

  const surface = (
    <div data-testid={testId} data-fit-height={fitHeight} className={cn('flex flex-col gap-3', fitHeight === 'parent' && 'h-full min-h-0')}>
      {header}

      {unsupported.length > 0 && (
        <Banner
          variant="warning"
          title="Some content could not be represented"
          data-testid={`${testId}-unsupported`}
        >
          <span className="flex flex-wrap items-center gap-1.5">
            {/* Named, not counted: "3 items" tells the user nothing about what
                to go look at. Each kind is preserved on the page as a code
                block, so this is a pointer, not an error. */}
            {unsupported.map((u, i) => (
              <Chip key={`${u.kind}-${i}`} tone="warning" size="xs">
                {u.kind}
              </Chip>
            ))}
            <span>— kept on the page as text so nothing was lost.</span>
          </span>
        </Banner>
      )}

      {convertError && (
        <Banner variant="error" title="Could not convert" data-testid={`${testId}-convert-error`}>
          {convertError}
        </Banner>
      )}

      {readingNavigation && !editable && contentsContainer && createPortal(
        <div ref={contentsRef} tabIndex={-1} data-testid={`${testId}-contents`} className="doc-reading-contents">
          <p className="doc-reading-contents-title">Contents</p>
          <nav aria-label="Document contents">
            {readingEntries.map(entry => <button key={entry.id} type="button" className="doc-reading-contents-entry"
              data-depth={entry.number.split('.').length} aria-current={readingSection === entry.id ? 'location' : undefined}
              onClick={() => goToReadingSection(entry.id)}>
              <span className="doc-reading-section-number">{entry.number}.</span>
              <span className="doc-reading-contents-label">{entry.text}</span>
              {paginate && <><span className="doc-reading-leader" aria-hidden="true" /><span className="doc-reading-page-number" aria-label={`Page ${headingPages[entry.id] ?? 1}`}>{headingPages[entry.id] ?? 1}</span></>}
            </button>)}
          </nav>
        </div>, contentsContainer)}

      {isCanvas && body ? (
        // The workspace: a recessed grey field the page floats on — `bg-workspace`,
        // NOT `bg-surface-inset`, whose 2% tint is invisible against white paper. This is
        // what reads as "a document" rather than "a text field" — without a
        // surrounding surface, a white box on a white app is just a widget.
        <div
          data-testid={`${testId}-workspace`}
          ref={workspaceRef}
          // `overflow-x-auto`: a page zoomed past the width of the workspace
          // has to be scrollable to, not squeezed into it.
          data-reading-presentation={readingPane ? 'pane' : 'page'}
          className={cn('@container rounded-lg bg-workspace overflow-y-auto overflow-x-auto', fitHeight === 'parent' && 'min-h-0 flex-1')}
          style={fitHeight === 'parent' || workspaceHeight === null ? undefined : { height: workspaceHeight }}
        >
          {/* Chrome, not paper: the toolbar is themed and goes dark, while the
              sheet below it stays white. Sticky so it survives scrolling a
              long document, which is the only reason a document toolbar is
              useful at all.

              Find lives INSIDE this same sticky block, under the toolbar,
              rather than in a sticky block of its own.

              It had one: `sticky top-0 z-20` over the toolbar's `sticky top-0
              z-10`. Two elements claiming the same offset in the same
              scrollport do not stack, they collide — measured in the browser
              at scrollTop 300, both occupied y=40..81 and the higher z-index
              won, so opening find DELETED the toolbar from the screen. That is
              backwards for the thing find is mostly used for: you search for a
              word in order to format it, and every formatting control had just
              gone.

              Stacked rather than floated, and the width is the reason. Docs
              floats find because its box is a narrow find-only field —
              replace is a separate dialog. This bar carries find AND replace
              inline and measures ~600px, so floating it over the sheet's
              top-right would sit across the first two lines of the page. The
              brief rules that out, and reserving a strip so it does not cover
              them is stacking with extra machinery. So it takes a row: the
              toolbar stays whole, nothing is covered, and the card treatment
              (right-aligned, bordered, shadowed, floating on the workspace
              grey rather than spanning the chrome) keeps it reading as a find
              box rather than as a second toolbar. The cost is one ~44px shift
              of the sheet on open, which does not recur while searching. */}
          {!framed && toolbarNode}

          {/* Status, not formatting: zoom and length describe the document and
              the view of it rather than acting on a selection, so they sit
              along the bottom edge like every word processor puts them,
              leaving the top bar to the controls that change your text. */}
          {/* Page and gutter share a row, so a thread sits BESIDE the text it
              refers to rather than under the document. With the gutter off the
              row collapses to the sheet alone: no reserved column, no gap, so
              the page recentres across the full workspace instead of sitting
              left of centre to leave margin space for threads that are not
              being rendered. */}
          {/* The ruler sits between the toolbar and the sheet, aligned to the
              sheet, because that is the only position where it measures
              anything. It is the one place the page's geometry is nameable:
              without it the margins are visible but not measurable, and you
              cannot find the same measure twice. */}
          {!framed && rulerNode}
          {belowRuler != null && belowRuler !== false && (
            <div
              data-testid={`${testId}-below-ruler`}
              // Opaque workspace behind the bar so the page scrolling under
              // it does not show through the padding while it is pinned.
              className="sticky top-[var(--uic-canvas-toolbar-h,0px)] z-10 bg-workspace px-2 pt-2 pb-1 sm:px-6"
            >
              {belowRuler}
            </div>
          )}
          <div
            data-testid={`${testId}-page-row`}
            data-gutter={showGutter ? 'visible' : 'hidden'}
            // Page padding shrinks first when the window does: the sheet is
            // the content, and giving a narrow window six paces of empty
            // workspace on each side while the text squeezes gets the priority
            // backwards.
            // Centring via the SHEET's auto margins rather than
            // `justify-center`: a flex item centred by justification cannot be
            // scrolled back to once it overflows — its leading edge is simply
            // unreachable. Auto margins centre the same way and collapse
            // correctly when there is no room to spare.
            // Less air above the sheet when the ruler is on, because the
            // ruler is PART OF THE PAGE's chrome, not part of the workspace.
            // With the row's own `sm:py-8` it sat 32px of grey away from the
            // thing it measures and read as an unrelated strip belonging to
            // the toolbar above it; every word processor draws it a few pixels
            // clear of the paper's top edge. Bottom padding is untouched — the
            // page still needs room to end in.
            className={cn(
              readingPane ? 'flex px-2 pb-4' : 'flex px-2 pb-4 sm:px-6 sm:pb-8',
              readingPane ? 'pt-3' : showRuler ? 'pt-2 sm:pt-3' : 'pt-4 sm:pt-8',
              (showGutter || showOutline) && 'gap-3 sm:gap-6',
            )}
          >
          {/* A rail needs a counterweight, or the page is not what gets centred.
              
              The sheet centres itself with auto margins, which split whatever
              the row has left AFTER the rails are laid out. With a rail on one
              side only, "centred in the leftover" is not centred in the
              workspace: measured at 1900px, the page sat at 520–1336 (centre
              928) inside a workspace centred on 1080, and its comments were
              stranded 212px to its right, against the far edge, rather than
              beside the text they annotate.

              An empty column of the same width on the opposite side makes the
              row symmetric, so the page lands on the workspace's centre line
              and the rail sits one gap from the paper. `flex-1 max-w` rather
              than a fixed width: on a window too narrow to afford it the
              spacer collapses instead of squeezing the page, which is the
              same priority the row's padding already follows. */}
          {showGutter && !showOutline && (
            <div aria-hidden data-testid={`${testId}-rail-spacer`} className="flex-1 max-w-[280px]" />
          )}

          {/* The outline is a COLUMN, not a floating pane: it takes its place
              in the row beside the sheet, the page moves over to make room,
              and closing it gives the width back. A pane that hovers over the
              document hides the thing it is meant to help you read. */}
          {showOutline && (
            <aside
              data-testid={`${testId}-outline`}
              className="w-[220px] shrink-0 self-start sticky top-4"
            >
              <DocumentOutline
                entries={outline.entries}
                activeId={outline.activeId}
                onSelect={outline.goTo}
              />
            </aside>
          )}
          <div
            // The sheet. 816px is 8.5in at 96dpi and 1056px is 11in, so the
            // page has the proportions of the thing it is imitating; 96px
            // padding is a 1in margin. min-h, not h: the page grows with the
            // content instead of clipping at one sheet.
            //
            // Invariant white with PAIRED invariant ink — a document body does
            // not follow the theme, only the chrome around it does.
            // `text-text-primary` here would render near-white prose on white
            // paper in dark mode, which still "renders" and so survives a
            // screenshot check; darkSurfaceTokens (d) fails the build for it.
            ref={paperRef}
            data-testid={`${testId}-paper`}
            // The margin is a proportion of the PAGE — `cqi`, not `%`.
            //
            // Percentage padding resolves against the CONTAINING BLOCK's
            // width, so on a squeezed page it kept billing for the row's full
            // width and barely moved the measure (249px → 260px). `cqi` is a
            // percent of this element's own inline size, which is the thing
            // the margin belongs to; `@container` is what makes the page
            // answer that question about itself. 11.76cqi is 96px on an 816px
            // sheet — the 1in margin the page is imitating — and it stays a
            // margin instead of becoming the page when the sheet is narrower.
            //
            // Breakpoints were the wrong axis. They answer how wide the
            // WINDOW is, while the sheet's width comes from its CONTAINER —
            // and those two part company the moment a rail opens beside it.
            // Measured with My Items open at a 1173px window: `lg:px-[96px]`
            // was in force, so a page squeezed to 441px spent 192px of it on
            // margins and left a 249px column, which wrapped
            // "Reviewers should be able to / comment on this sentence."
            // mid-clause. The same page now keeps a 337px measure.
            data-page-count={paginate ? String(pageCount) : undefined}
            // The min-height pads the last sheet out to a whole page, and is
            // passed only when paginating: an unpaginated page must still be
            // free to end where its content does. It overrides the
            // `min-h-[1056px]` class below rather than fighting it.
            //
            // The seam itself needs no zoom handling at all — the repeating
            // background is measured in the same scaled pixels as everything
            // else inside a `zoom`ed box.
            style={canvasPaperStyle(zoom, paginate ? pageCount * PAGE_HEIGHT : null)}
            className={cn(
              'doc-page @container mx-auto bg-paper text-paper-ink shadow-[0_1px_3px_rgba(60,64,67,0.15),0_4px_12px_rgba(60,64,67,0.15)]',
              // Hand-authored in styles.css, NOT a utility class: it carries
              // the whole baseline grid, and the consuming app has no Tailwind
              // build to generate anything this package did not already ship.
              paginate && 'doc-page--paginated',
              readingNavigation && !editable && 'doc-page--reading',
              !readingPane && 'min-h-[1056px]',
              // At 100% the sheet stays responsive: it gives way on a narrow
              // window rather than forcing a sideways scroll to read a
              // paragraph. Zoomed, it takes its true width and the workspace
              // scrolls — `w-full` is a share of the CONTAINER, so under zoom
              // it clamped the page to the space available and the text column
              // narrowed instead of the page growing. That is resizing a
              // window, not zooming a document.
              readingPane ? 'w-full min-w-0' : zoom === 1 ? 'w-full max-w-[816px]' : 'w-[816px] shrink-0',
            )}
          >
            {/* The margin lives one level IN, because `cqi` asks the nearest
                ancestor container — an element carrying `@container` is a
                container for its descendants, not for itself. On the page
                element it fell through to the viewport and billed 138px of
                margin to a 441px page, a worse answer than the breakpoint it
                replaced. */}
            {/* `doc-page__body` is unconditional and carries no styling of its
                own — it is the hook the paginated rules need in order to
                override the vertical padding with two classes instead of an
                `!important`. Naming it always, rather than only when
                paginating, keeps the DOM one shape. */}
            <div
              ref={bodyRef}
              data-testid={`${testId}-body`}
              role="document"
              aria-label="Document content"
              className={cn(
                'doc-page__body',
                readingPane ? 'px-5 py-6' : 'py-8 sm:py-10 lg:py-12',
                // 11.76cqi is 96px on an 816px sheet; 8.82cqi is 72px.
                !readingPane && (pageMargin === 'narrow' ? 'px-[8.82cqi]' : 'px-[11.76cqi]'),
              )}
            >
            <TiptapEditor
              fragment={body}
              ydoc={ydoc}
              provider={provider}
              user={user}
              editable={editable}
              extensions={readerExtensions}
              placeholder="Start writing…"
              // The page owns the surface: no widget border, no imposed ink.
              chrome="none"
              hideToolbar
              onEditorReady={(e) => { setEditor(e); onEditorReady?.(e); }}
            />
            </div>
            </div>
            {showGutter && (
              <DocumentGutter
                items={gutterItems ?? []}
                lead={gutterLead}
                onFocusItem={onFocusGutterItem}
                onHoverItem={onHoverGutterItem}
                data-testid={`${testId}-gutter`}
              />
            )}
            {/* The same counterweight, mirrored: an outline on the left with
                no gutter on the right pushes the page off-centre the other
                way. */}
            {showOutline && !showGutter && (
              <div aria-hidden data-testid={`${testId}-rail-spacer`} className="flex-1 max-w-[280px]" />
            )}
          </div>

          {/* Sticky along the bottom edge of the workspace: a status bar that
              scrolls away with the page stops being a status bar. */}
          {showStatusBar && (
          <DocumentStatusBar
            className="sticky bottom-0 z-10"
            wordCount={wordCount}
            zoom={zoom}
            onZoomChange={readingPane || zoomMode === 'fit' ? undefined : setZoom}
            fitActive={fitActive}
            onFitWidth={setFitWidth}
            data-testid={`${testId}-status-bar`}
          >
            {readingNavigation && !editable && readingEntries.length > 0 && (
              <Button size="sm" variant="ghost" onClick={returnToContents} data-testid={`${testId}-back-to-top`}>Back to contents ↑</Button>
            )}
            {/* Only while something IS selected. A standing "0 selected"
                would be a permanent line of chrome reporting the absence of a
                thing, next to a total that already covers that case. */}
            {selectedWords > 0 && (
              <span data-testid={`${testId}-selected-word-count`} className="tabular-nums">
                {selectedWords === 1 ? '1 selected' : `${selectedWords.toLocaleString()} selected`}
              </span>
            )}
            {/* Only when the document actually HAS pages. Unpaginated, "1
                page" would be a claim about a sheet that has no page
                boundaries on it at all.

                "Page 3 of 7" rather than "7 pages" as soon as there is more
                than one, because a total on its own answers the question
                nobody asks. What a reader wants from a page count is where
                they ARE — it is how you tell someone which paragraph you mean,
                and how you know whether the thing you are looking for is
                behind you. On a one-page document the two collapse, and "Page
                1 of 1" is a sentence about nothing, so that case keeps the
                plain length. */}
            {paginate && (
              <span
                data-testid={`${testId}-page-count`}
                className="tabular-nums"
                // Named as an ESTIMATE, in the one place a reader can ask.
                //
                // The screen and the printer do not paginate the same way and
                // cannot be made to: `pageFlow` pushes a whole block past a
                // seam rather than slicing an image or orphaning a line, while
                // a printer splits a paragraph wherever the sheet ends. On this
                // corpus the screen model runs about 1.3x the printed count,
                // and that gap is the price of not cutting a figure in half —
                // it is not a bug to fix by making the screen split paragraphs.
                //
                // What IS a bug is a bare number that reads as the printed
                // length. A tooltip, not a visible "~", because the count's
                // main job is navigation ("the table is on page 4"), for which
                // it is exact — the screen is the thing being navigated.
                title="Approximate. Pages are counted as this view lays them out, and a printed copy may run shorter — the screen never splits a paragraph or an image across a page break."
              >
                {pageCount === 1 ? '1 page' : `Page ${currentPage} of ${pageCount}`}
              </span>
            )}
          </DocumentStatusBar>
          )}
        </div>
      ) : (
        <>
          {onConvert && convertSlot
            ? createPortal(
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleConvert}
                  disabled={converting}
                  data-testid={`${testId}-convert`}
                  // The explanation the block prompt carried has to survive the
                  // move somewhere, or the control becomes a verb with no
                  // object: "convert to what, and what happens to my sections?"
                  title="Convert this sectioned document into a single page. Your sections become headings; nothing is deleted."
                >
                  {converting ? 'Converting…' : 'Convert to page'}
                </Button>,
                convertSlot,
              )
            : (
              <EmptyState
                testId={`${testId}-convert-prompt`}
                title="This document still uses sections"
                description="Convert it to a single page to edit it as one continuous document. Your existing sections become headings; nothing is deleted."
                action={
                  onConvert ? (
                    <Button onClick={handleConvert} disabled={converting} data-testid={`${testId}-convert`}>
                      {converting ? 'Converting…' : 'Convert to page'}
                    </Button>
                  ) : undefined
                }
              />
            )}
          {/* The schema probe — see `schemaProbe`. `hidden` rather than a
              utility class so it does not depend on the consuming app having
              this package's stylesheet; the UA rule alone takes it out of the
              layout, and ProseMirror builds its schema perfectly well in a
              display:none subtree.

              Deliberately NOT fed into this component's own `editor` state:
              that state exists for the toolbar, which the prompt has no use
              for, and holding it would leave a DESTROYED editor in state for
              one render after the conversion flips the branch. Only the host
              is told, and only so it can hand the schema back. */}
          {onConvert && schemaProbe && (
            <div hidden aria-hidden="true" data-testid={`${testId}-schema-probe`}>
              <TiptapEditor
                fragment={schemaProbe}
                ydoc={ydoc}
                // No provider: a probe must not publish presence or a caret
                // into a document nobody is looking at through it.
                provider={null}
                user={user}
                editable={false}
                extensions={readerExtensions}
                chrome="none"
                hideToolbar
                onEditorReady={(e) => onEditorReady?.(e)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
  return renderFrame ? <>{renderFrame({ toolbar: toolbarNode, ruler: rulerNode, surface })}</> : surface;
}
