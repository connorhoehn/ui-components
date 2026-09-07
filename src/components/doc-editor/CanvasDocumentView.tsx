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

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { XmlFragment } from 'yjs';
import type * as Y from 'yjs';
import { cn } from '../../lib/cn';
import TiptapEditor from './TiptapEditor';
import { DocumentRuler } from './DocumentRuler';
import { DocumentOutline } from './DocumentOutline';
import { DocumentStatusBar } from './DocumentStatusBar';
import { useDocumentOutline, useDocumentWordCount } from './useDocumentOutline';
import DocumentToolbar from './DocumentToolbar';
import DocumentGutter, { type GutterItem } from './DocumentGutter';
import Banner from '../shared/Banner';
import EmptyState from '../shared/EmptyState';
import { Button } from '../ui/Button';
import Chip from '../shared/Chip';
import DocumentFindBar from './DocumentFindBar';

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
 */
const PAGE_HEIGHT = 1056;

/**
 * How many whole sheets a stack of `heightPx` occupies.
 *
 * Exported because it is the only arithmetic in the pagination path and a
 * component test cannot reach it — jsdom has no layout, so every measured
 * height there is zero.
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
export function canvasPaperStyle(zoom: number, minHeightPx: number | null): CSSProperties {
  return {
    ...(zoom === 1 ? {} : { zoom }),
    ...(minHeightPx === null ? {} : { minHeight: minHeightPx }),
  };
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
   * OFF by default. Zoomed, its inches stop being the DOCUMENT's inches: the
   * ruler scales with the sheet, so at 150% one marked inch is an inch and a
   * half of screen and the numbers no longer mean anything you could measure
   * a margin with. Left in place, off, until the measure it should show is
   * settled.
   */
  showRuler?: boolean;
  /**
   * Show the outline column beside the page.
   *
   * Off by default: it is the host's call whether a document is long enough to
   * need navigating, and an outline on a two-paragraph note is a column of
   * emptiness next to the thing you are reading.
   */
  showOutline?: boolean;
  /**
   * Draw page boundaries on the sheet: a seam every 1056px, the desk showing
   * through it, and a shadow off each sheet's edge. Also reports a page count
   * in the status bar and pads the last sheet out to a whole page.
   *
   * OFF by default, and the default is a recommendation rather than caution.
   * Read the header of the pagination block in styles.css before turning it
   * on; the short version:
   *
   *   - It is not free. Pagination and a baseline grid are ONE feature here,
   *     because a seam can only avoid cutting text if every line sits on a
   *     known row. So this also changes the document's typography — paragraph
   *     gaps go 14.4px -> 26.4px, headings and code blocks get re-spaced. The
   *     page gets airier. That is not a side effect to be tuned away, it is
   *     the mechanism.
   *   - It is not complete. Headings are larger than one grid row can contain,
   *     so ~4.6% of seams still clip one (measured over 1000 generated
   *     documents).
   *   - It does not survive pictures. An image or a table has an intrinsic
   *     height that no stylesheet can round to the grid, so it knocks
   *     everything BELOW it off that grid for the rest of the document. Same
   *     measurement: 4.6% -> 57.0% of seams bisected once images are in the
   *     mix. For a document people paste screenshots into, this is worse than
   *     no pagination.
   *
   * Which is why it is a prop and not a redesign: real pagination has to move
   * content, and moving content means measuring every block on every edit.
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
  toolbarActions,
  gutterItems,
  gutterLead,
  onFocusGutterItem,
  gutterVisible = true,
  showRuler = false,
  showOutline = false,
  paginate = false,
  onToggleGutter,
  onInsertImage,
  onEditorReady,
  'data-testid': testId = 'canvas-document',
}: CanvasDocumentViewProps) {
  // Display scale of the sheet. CSS `zoom` rather than a transform: it scales
  // the LAYOUT box, so the workspace scrolls the right distance and the sheet
  // reserves the space it visually occupies. A transform would paint a larger
  // page over an unchanged 816x1056 hole in the layout.
  const [zoom, setZoom] = useState(1);

  // The ruler measures the sheet by MEASURING it, not by predicting it.
  //
  // Computing `816 * zoom` was wrong the moment the sheet could not have that
  // width: the page is `w-full max-w-[816px]`, so a zoom that exceeds the
  // workspace clamps it to the container instead. Verified in the browser at
  // 150% — the sheet came out 1196px while a predicted ruler drew 1224, so
  // every measure on it was off by half an inch. Reading the real width keeps
  // the two in agreement whatever the layout does to the page.
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

  // How many sheets the content fills, so the last one can be padded out to a
  // whole page instead of ending wherever the text did.
  //
  // Measured on the BODY, not the paper, and that is what makes it safe: the
  // body is a plain block whose height comes from its own content, so setting
  // a min-height on its PARENT cannot change it. Measuring the paper instead
  // would be a loop — paper grows, so pages grows, so paper grows.
  //
  // Divided by `zoom` on purpose. `getBoundingClientRect` reports visual
  // pixels, so under CSS zoom it returns the scaled height; the page count has
  // to be computed in the sheet's own coordinates or it changes every time the
  // reader zooms. (The same trap the ruler's comment above documents from the
  // other direction — there the visual number is the one wanted.)
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [pageCount, setPageCount] = useState(1);
  const measurePages = useCallback(() => {
    const el = bodyRef.current;
    if (!el) return;
    setPageCount(canvasPageCount(el.getBoundingClientRect().height / zoom));
  }, [zoom]);
  useEffect(() => {
    if (!paginate) return;
    measurePages();
    const el = bodyRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measurePages);
    ro.observe(el);
    return () => ro.disconnect();
  }, [paginate, measurePages]);
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
  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const [workspaceHeight, setWorkspaceHeight] = useState<number | null>(null);
  useEffect(() => {
    const el = workspaceRef.current;
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
  }, [isCanvas, body]);

  // Cmd/Ctrl+F opens the document's own find, not the browser's.
  //
  // The browser's search cannot see a match below the fold in a virtualised or
  // scrolled sheet, cannot count matches for you, and cannot replace. A word
  // processor takes this shortcut over for exactly those reasons, and a person
  // who wanted the browser's can still have it with Escape then Cmd+F again.
  const [findOpen, setFindOpen] = useState(false);
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'f') {
        ev.preventDefault();
        setFindOpen(true);
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
  const wordCount = useDocumentWordCount(editor as Parameters<typeof useDocumentWordCount>[0]);

  const commentCount = gutterItems?.length ?? 0;
  // Two conditions, not one: there has to be something to show, AND the gutter
  // has to be switched on. Splitting them is what lets the toolbar keep
  // reporting the count while the column itself is gone.
  // A docked call keeps the gutter open on its own. Without this the call
  // would vanish the moment a document had no comments, which is most of them.
  const showGutter = (commentCount > 0 || !!gutterLead) && gutterVisible;

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

  return (
    <div data-testid={testId} className="flex flex-col gap-3">
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
          className="rounded-lg bg-workspace overflow-y-auto overflow-x-auto"
          style={workspaceHeight === null ? undefined : { height: workspaceHeight }}
        >
          {/* Chrome, not paper: the toolbar is themed and goes dark, while the
              sheet below it stays white. Sticky so it survives scrolling a
              long document, which is the only reason a document toolbar is
              useful at all. */}
          {editable && editor && findOpen && (
            <div className="sticky top-0 z-20">
              <DocumentFindBar
                editor={editor}
                canReplace={editable}
                onClose={() => { setFindOpen(false); editor.commands.focus(); }}
                data-testid={`${testId}-find`}
              />
            </div>
          )}
          {editable && editor && (
            <div
              data-testid={`${testId}-toolbar`}
              className="sticky top-0 z-10 border-b border-border bg-surface-panel"
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
              <div className="w-full px-3">
                <DocumentToolbar
                  editor={editor}
                  actions={toolbarActions}
                  // Passed even when the gutter is hidden — that is precisely
                  // when the count is the only remaining evidence that a
                  // discussion exists.
                  commentCount={commentCount}
                  gutterVisible={gutterVisible}
                  {...(onToggleGutter ? { onToggleGutter } : {})}
                  {...(onInsertImage ? { onInsertImage } : {})}
                />
              </div>
            </div>
          )}
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
          {showRuler && (
            <DocumentRuler
              // Measured, so a clamped page and its ruler agree. Margins still
              // scale with zoom: CSS `zoom` scales the sheet's padding too.
              {...(paperWidth ? { pageWidth: paperWidth } : {})}
              marginLeft={96 * zoom}
              marginRight={96 * zoom}
              // Same horizontal padding as the page row below, so the two
              // share a left edge once the workspace scrolls — without it the
              // ruler starts 24px left of the paper it is measuring.
              className="pt-3 px-2 sm:px-6"
              // Shifted by half the gutter column so the ruler stays centred
              // over the SHEET rather than over the row, which is wider than
              // the sheet whenever a thread is open beside it.
              // Centred over the SHEET, not the row: each open column shifts
              // the sheet, and a ruler that measured the row would be off by
              // half a column the moment either one appeared.
              style={{
                ...(showGutter ? { paddingRight: 280 + 24 } : {}),
                ...(showOutline ? { paddingLeft: 220 + 24 } : {}),
              }}
            />
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
            className={cn(
              'flex py-4 px-2 sm:py-8 sm:px-6',
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
              'doc-page @container min-h-[1056px] mx-auto bg-paper text-paper-ink shadow-[0_1px_3px_rgba(60,64,67,0.15),0_4px_12px_rgba(60,64,67,0.15)]',
              // Hand-authored in styles.css, NOT a utility class: it carries
              // the whole baseline grid, and the consuming app has no Tailwind
              // build to generate anything this package did not already ship.
              paginate && 'doc-page--paginated',
              // At 100% the sheet stays responsive: it gives way on a narrow
              // window rather than forcing a sideways scroll to read a
              // paragraph. Zoomed, it takes its true width and the workspace
              // scrolls — `w-full` is a share of the CONTAINER, so under zoom
              // it clamped the page to the space available and the text column
              // narrowed instead of the page growing. That is resizing a
              // window, not zooming a document.
              zoom === 1 ? 'w-full max-w-[816px]' : 'w-[816px] shrink-0',
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
              className="doc-page__body px-[11.76cqi] py-10 sm:py-16 lg:py-[96px]"
            >
            <TiptapEditor
              fragment={body}
              ydoc={ydoc}
              provider={provider}
              user={user}
              editable={editable}
              extensions={extensions}
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
          <DocumentStatusBar
            className="sticky bottom-0 z-10"
            wordCount={wordCount}
            zoom={zoom}
            onZoomChange={setZoom}
            data-testid={`${testId}-status-bar`}
          >
            {/* Only when the document actually HAS pages. Unpaginated, "1
                page" would be a claim about a sheet that has no page
                boundaries on it at all. */}
            {paginate && (
              <span data-testid={`${testId}-page-count`} className="tabular-nums">
                {pageCount === 1 ? '1 page' : `${pageCount} pages`}
              </span>
            )}
          </DocumentStatusBar>
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
                extensions={extensions}
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
}
