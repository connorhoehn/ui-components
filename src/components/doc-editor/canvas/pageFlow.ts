// src/components/doc-editor/canvas/pageFlow.ts
//
// Where the page breaks go.
//
// ## Why this module exists
//
// Pagination on the canvas sheet used to be one idea: put the whole document
// on a baseline grid whose row is the body line advance, then paint a seam
// thinner than the clear leading between two lines. That works beautifully for
// prose — 94.8% of seams bisected drops to 4.6% — and collapses the moment a
// picture appears. An image is 217px tall because it is 217px tall; CSS cannot
// round it to a 26.4px row, so it does not merely risk being sliced, it knocks
// EVERY line below it off the grid for the rest of the document. Measured over
// 1000 generated documents, adding images to the mix took seam bisection from
// 4.6% to 57.0%. That is the number that kept `paginate` off by default.
//
// The header of the pagination block in styles.css names the fix and declines
// it: "Fixing it needs per-block measurement, i.e. real layout, i.e. not this."
// This module is that. The component measures every top-level block once per
// layout pass and hands the geometry here; this decides how far each block has
// to move down so that no seam crosses anything that must not be crossed.
//
// ## The two jobs, in the order they are done per block
//
//   1. RE-SNAP. A block that lays its own lines out on the baseline grid (a
//      paragraph, a heading, a list, a code block) is nudged down to the next
//      whole row whenever the block above it — an image, a table — left the
//      cursor off-grid. This is the whole fix for residual 2: an intrinsic
//      height now costs at most 26.4px of extra leading UNDER it instead of
//      corrupting the grid for everything that follows.
//
//   2. STAY OUT OF THE PAGE MARGIN. Every page has a top and a bottom margin,
//      and no block may put ink in one. A block that would reach into the
//      bottom margin is pushed to the top of the next page's text area.
//
// Job 2 used to be narrower — "do not let a HAIRLINE seam cut an image" — and
// the `pageMargin` option still expresses that older model at 0. What changed
// and why is under "## Why every page has margins" below.
//
// ## Why every page has margins
//
// The first version of this module protected a HAIRLINE. Pages were 1056px
// apart, a 6px band was painted on each boundary, and the job was to keep that
// band out of anything it must not cut. It succeeded — 0.0% of seams bisected —
// and still did not look like a page, because on an interior boundary the text
// ran straight down to the band from above and started again straight below it.
// Page one had a 1in margin at the top and page one alone; every other page
// had none, top or bottom. A sheet of paper with type hard against its edges is
// not a sheet of paper, and "Page 3 of 7" in the status bar was making a claim
// the page itself did not support.
//
// So the boundary is no longer a line, it is a BAND: `pageMargin` px of white
// on each side of it, matching the margin the first page already has. Nothing
// may put ink there. In content coordinates the band around boundary k is
// [k*pageHeight - contentTop - margin, k*pageHeight - contentTop + margin], and
// with the default margin (= `contentTop`, one inch) that is exactly
// [k*pageHeight - 2*contentTop, k*pageHeight] — so a pushed block lands on
// content coordinate k*pageHeight, which is 40k whole grid rows. The margins
// cost nothing in grid drift; a page holds 32 rows instead of 40.
//
// ### What it costs, stated plainly
//
// Two things, and the second is the one worth arguing about.
//
//   1. Sheets. 211.2px of every 1056 is now margin, so a document needs about
//      25% more pages, plus whatever the second cost adds.
//
//   2. RAGGED PAGE BOTTOMS. A paragraph may no longer flow through a boundary,
//      because the half above it would sit in the bottom margin. It is pushed
//      whole instead, so a page ends where its last complete paragraph ends
//      rather than on a fixed last line. Google Docs does not do this — it
//      breaks the paragraph and fills the page — and it cannot be imitated
//      here: a paragraph is one block box in a continuous flow, and there is no
//      CSS that inserts two inches of dead space into the middle of one. The
//      choice is a ragged bottom or ink in the margin, and a ragged bottom is
//      what a page looks like when the typesetter kept blocks together.
//
// A block TALLER than one page's text area is the exception: it cannot be
// pushed anywhere that helps, so it flows through the margin and the boundary
// cuts it. That is the honest degradation, and it is why `usable` is checked
// before every push rather than after.
//
// Kept free of the DOM on purpose. Everything here is arithmetic over measured
// numbers, which is the only way it can be tested — jsdom has no layout engine,
// so a component test can never observe a seam landing on a line of text. The
// simulation in `__tests__/CanvasDocumentView.seams.test.ts` feeds this the
// geometry a browser would have produced and scores the result.

/**
 * The body line advance: 16px x 1.5, from `.doc-page .ProseMirror`
 * (`--doc-line`). 26.4px (x 1.65) until 2.385.6.
 *
 * Used where the flow reasons in LINES — keep a heading with the first line
 * below it, count orphan and widow lines. It is no longer the snap unit; that
 * is `DOC_GRID`.
 */
export const DOC_LINE = 24;

/**
 * The grid row (`--doc-grid`): every block height and margin in the page
 * stylesheet is a whole multiple of it, and the flow re-snaps to it under a
 * block whose height is intrinsic (an image, a table).
 *
 * Until 2.385.6 the row WAS the body line, which forced every margin to a
 * whole 26.4px — a full line between paragraphs, two above a heading. That
 * made sense for a hairline seam text flowed through; with page margins every
 * block is pushed whole, so the grid only has to keep the rhythm consistent,
 * and 4px does that at the mockup's spacing (8px between paragraphs, 20px
 * above a section heading).
 */
export const DOC_GRID = 4;

/** One US-Letter page at 96dpi. 44 body lines, 264 grid rows. */
export const DOC_PAGE_HEIGHT = 1056;

/**
 * The sheet's vertical padding, 2 body lines (48px, half an inch).
 *
 * Load-bearing twice over: it is the offset from the top of the paper to the
 * first line's box, so it is what converts a seam's PAPER coordinate into the
 * CONTENT coordinate the measurements are in; and because it is a whole number
 * of rows, every seam lands on a row boundary rather than a fraction of one.
 */
export const DOC_CONTENT_TOP = DOC_LINE * 2;

/**
 * The painted gap between two sheets, `--doc-page-gap`. Must match the value in
 * styles.css — this one decides how far a push has to clear the boundary, that
 * one decides how wide the band is drawn.
 *
 * It was 6px, and 6px was a constraint rather than a design: text flowed
 * through the boundary, a body line leaves only 7.02px of clear leading, and a
 * band wider than that landed on the type (measured: 7px behaves like 6px, 8px
 * bisects 78% of boundaries, 24px bisects 94.8%). Now that every page has
 * margins, no ink comes within `pageMargin` of a boundary at all and the gap is
 * free to be what it represents: the desk between two sheets.
 */
export const DOC_PAGE_GAP = 24;

/** Below the smallest measurement worth acting on. Guards float noise, not layout. */
const EPS = 0.01;

/**
 * One top-level block, as the browser laid it out with no pushes applied.
 *
 * `top` and `height` are in CONTENT coordinates — document pixels measured
 * from the first line's box, i.e. divided back out of any CSS zoom. Mixing
 * visual pixels in here is the same trap the ruler documents from the other
 * side: an inch is not a screen pixel once the reader zooms.
 */
export interface CanvasBlock {
  /** Natural top of the border box, content coordinates. */
  top: number;
  /** Border-box height. Margins are NOT included — they are the gaps between. */
  height: number;
  /**
   * May a seam pass through this block?
   *
   * True for prose that wraps into lines the grid already protects. False for
   * anything whose ink is a single object: an image, a table, a rule, a
   * heading, a code block short enough to fit on one page.
   */
  splittable: boolean;
  /**
   * Does this block lay its own content out on the baseline grid?
   *
   * True for everything the paginated stylesheet sizes in whole rows. False
   * for intrinsic heights (images, tables, node views), which is precisely the
   * set that has to be re-snapped AFTER rather than aligned before.
   */
  onGrid: boolean;
  /**
   * Keep with the block below — headings.
   *
   * A heading alone at the foot of a page is the oldest typographic defect
   * there is, and it is not what `splittable: false` prevents: the heading
   * itself is not cut, it is simply orphaned from the text it introduces. The
   * flow treats such a block as if it extended one line into its successor.
   */
  keepWithNext?: boolean;
}

export interface CanvasFlowOptions {
  pageHeight?: number;
  contentTop?: number;
  /** The body line advance, for "one line of the next block" and line counts. */
  line?: number;
  /** The snap row. Defaults to `DOC_GRID`; pass `line` to reproduce the pre-2.385.6 grid. */
  grid?: number;
  /**
   * White space reserved at the top and bottom of EVERY page, in document
   * pixels. Defaults to `contentTop` — the one-inch margin the first page has
   * always had, now given to the other pages too.
   *
   * Two values are meaningful and everything between them behaves sensibly:
   *
   *   contentTop  every page is a page. What ships.
   *   0           the pre-margin model: the boundary is a hairline, blocks are
   *               only moved to stop that hairline CUTTING them, and a
   *               paragraph is allowed to flow straight through it with
   *               orphan/widow control. Kept because it is the thing the
   *               margins are an argument against, and an argument you cannot
   *               run is an assertion — `pageFlow.test.ts` runs both.
   *
   * Must be a whole number of grid rows, and `pageHeight - 2 * pageMargin`
   * must be too, or the grid drifts by the remainder on every page.
   */
  pageMargin?: number;
  /**
   * How far below a seam a pushed block starts, before the grid snap.
   *
   * Must exceed half the painted gap or the push lands the block's top edge
   * under the band that was drawn to avoid it.
   */
  seamClearance?: number;
  /**
   * How far a seam must stay OUTSIDE an unsplittable block's box.
   *
   * A block's ink is not always inside its border box. A 24px h2 in a
   * single-row line box paints 29.06px of ink, so it bleeds 1.33px above and
   * below — a seam sitting exactly on its top or bottom edge crosses no box at
   * all and still strikes the letters. Rather than measure ink (which needs
   * font metrics this package has no business knowing), unsplittable blocks
   * simply claim half the painted gap of clearance on each edge. The same
   * margin protects an image whose top pixel row would otherwise sit under the
   * band.
   */
  edgeClearance?: number;
  /** Lines that must not be left alone on either side of a break. */
  keepLines?: number;
}

export interface CanvasFlowResult {
  /**
   * Extra space to insert ABOVE block i, in document pixels. Dense, and
   * mostly zeros — a prose document gets an all-zero array, which is what
   * makes this free for the documents the baseline grid already handled.
   */
  pushes: number[];
  /** Whole sheets the adjusted document occupies. */
  pageCount: number;
  /** Content height after the pushes, excluding the sheet's own padding. */
  contentHeight: number;
}

/** Distance from `top` up to the next whole grid row. Zero when already on one. */
function gridSnap(top: number, line: number): number {
  const off = ((top % line) + line) % line;
  if (off <= EPS || line - off <= EPS) return 0;
  return line - off;
}

/**
 * Where every block ends up, given where it naturally fell.
 *
 * Single forward pass with a running `shift`: each block's push is added to
 * the offset carried by everything below it, exactly as inserting space in a
 * flow does. That is why one pass is enough and why the result is stable —
 * feed it the same natural geometry twice and it answers the same thing, which
 * is what lets the component re-derive natural tops from an already-adjusted
 * layout instead of resetting the DOM to measure it.
 */
export function flowCanvasPages(
  blocks: readonly CanvasBlock[],
  options: CanvasFlowOptions = {},
): CanvasFlowResult {
  const pageHeight = options.pageHeight ?? DOC_PAGE_HEIGHT;
  const contentTop = options.contentTop ?? DOC_CONTENT_TOP;
  const line = options.line ?? DOC_LINE;
  const grid = options.grid ?? DOC_GRID;
  const margin = Math.max(0, options.pageMargin ?? contentTop);
  const keep = options.keepLines ?? 2;
  // Both clearances exist to keep a block a hair clear of a HAIRLINE boundary.
  // A margin is already two orders of magnitude more clearance than either
  // asks for, so once there is one they contribute nothing and are clamped
  // away — leaving them in would push a block a few pixels PAST the top of the
  // text area and then the grid snap would spend a whole row correcting it.
  const edge = Math.max(0, (options.edgeClearance ?? DOC_PAGE_GAP / 2 + 0.5) - margin);
  const clearance = Math.max(0, (options.seamClearance ?? DOC_PAGE_GAP / 2 + 1) - margin);

  const pushes = new Array<number>(blocks.length).fill(0);
  if (!(pageHeight > 0) || !(line > 0) || !(grid > 0) || blocks.length === 0) {
    return { pushes, pageCount: 1, contentHeight: 0 };
  }

  // The first forbidden band that is not already entirely ABOVE content
  // coordinate `c`: [bottom margin of one page, top margin of the next].
  // Boundaries live in PAPER coordinates at whole multiples of the page height;
  // `contentTop` is the only thing standing between the two frames.
  //
  // Selected by the band's BOTTOM edge, not by the boundary itself, and that is
  // the whole subtlety. A block sitting 10px past a boundary has cleared the
  // boundary and is still in the top margin of the page below it — asking for
  // "the next boundary strictly below c" skips straight past the band the block
  // is standing in and reports the page as clean. That was a real bug: it left
  // ink in 9.5% of margins while every seam-bisection score read zero.
  //
  // At `margin` 0 the band collapses to a point and this reduces exactly to
  // "the next boundary strictly below c" — the hairline seam the pre-margin
  // model protected, with the overlap test below degenerating to "does the
  // boundary fall strictly inside the block".
  const bandAt = (c: number): [number, number] => {
    const k = Math.floor((c + contentTop - margin) / pageHeight) + 1;
    const s = k * pageHeight - contentTop;
    return [s - margin, s + margin];
  };

  // What one page's text area can actually hold. Using the full page here is
  // how a nearly-page-tall image gets pushed onto a fresh sheet only to run
  // into the NEXT boundary — one push per block, so the check has to be right
  // the first time.
  const usable = pageHeight - 2 * margin - clearance - edge;

  let shift = 0;
  let bottom = 0;
  for (let i = 0; i < blocks.length; i += 1) {
    const b = blocks[i]!;
    let top = b.top + shift;

    const move = (d: number) => {
      pushes[i] += d;
      shift += d;
      top += d;
    };

    // 1) Back onto the grid, if this block keeps one.
    if (b.onGrid) move(gridSnap(top, grid));

    // 2) The seam. `reach` is how far down the page this block needs to be
    //    unbroken for: its own box, extended through the first line of the
    //    next block when it is a heading.
    const next = blocks[i + 1];
    const reach = b.keepWithNext && next
      ? Math.max(b.height, next.top - b.top + line)
      : b.height;
    // Unsplittable blocks claim `edge` px outside their box on both sides; a
    // paragraph's line boxes already inset their own ink further than that, so
    // prose is judged on the box alone and nothing reflows for a boundary that
    // was always going to land in the leading. With margins `edge` is 0 and
    // the distinction stops mattering.
    const lo = b.splittable ? top : top - edge;
    const hi = b.splittable ? top + reach : top + reach + edge;
    const [bandLo, bandHi] = bandAt(lo);
    const crosses = bandLo < hi - EPS && bandHi > lo + EPS;

    if (crosses) {
      // Everything moves whole once there are margins, prose included: a
      // paragraph that flowed through the band would put its middle lines in
      // the margin, which is the defect the margins exist to remove. Without
      // margins only the blocks that must not be CUT are moved.
      const moveWhole = !b.splittable || margin > EPS;
      if (moveWhole) {
        // Only if a whole page can hold it. A picture — or a forty-line
        // paragraph — taller than the text area has to be cut by SOMETHING,
        // and cutting it at the boundary is better than an empty page followed
        // by the same cut.
        if (reach <= usable + EPS) {
          move(bandHi + clearance - top);
          if (b.onGrid) move(gridSnap(top, grid));
        }
      } else {
        // Orphans and widows, counted in whole lines. `height / line` is exact
        // for every block the paginated stylesheet sizes, which is every block
        // that reaches this branch. Reachable only at `pageMargin: 0`: with a
        // margin, a block that fits has been moved whole and a block that does
        // not fit has nowhere to put its stranded line either.
        const lines = Math.max(1, Math.round(b.height / line));
        const before = Math.max(0, Math.floor((bandLo - top) / line + EPS));
        const after = lines - before;
        if (before > 0 && before < keep && b.height <= usable + EPS) {
          // Too few lines before the break to be worth leaving there.
          move(bandHi + clearance - top);
          if (b.onGrid) move(gridSnap(top, grid));
        } else if (after > 0 && after < keep && before - (keep - after) >= keep) {
          // Enough lines above to afford sending another one over.
          move((keep - after) * line);
        }
      }
    }

    bottom = Math.max(bottom, top + b.height);
  }

  const paperHeight = contentTop * 2 + bottom;
  return {
    pushes,
    pageCount: Math.max(1, Math.ceil(paperHeight / pageHeight - EPS / pageHeight)),
    contentHeight: bottom,
  };
}

/**
 * Which page a point on the SHEET falls on, 1-based.
 *
 * PAPER coordinates — measured from the top edge of the paper, not from the
 * first line's box — because the caller's input is a scroll offset against the
 * sheet and the pages are whole multiples of the page height from that edge.
 * (`flowCanvasPages` works in content coordinates instead; `contentTop` is the
 * conversion, and mixing the two here would report the wrong page for the first
 * inch of every sheet.)
 *
 * Used for "Page 3 of 7": the reader's position is a scroll offset, not a
 * block, so this cannot come out of the flow result.
 */
export function canvasPageAt(
  paperY: number,
  pageCount: number,
  options: Pick<CanvasFlowOptions, 'pageHeight'> = {},
): number {
  const pageHeight = options.pageHeight ?? DOC_PAGE_HEIGHT;
  if (!(pageHeight > 0)) return 1;
  const page = Math.floor(paperY / pageHeight) + 1;
  return Math.min(Math.max(1, page), Math.max(1, pageCount));
}

/**
 * How a DOM block flows, from the element alone.
 *
 * Tag-driven rather than schema-driven because this package never sees the
 * ProseMirror schema — the host owns the extensions, so a macro node view can
 * be any element at all. Anything unrecognised is treated as intrinsic and
 * unsplittable, which is the safe answer: it gets moved whole rather than cut,
 * and the grid is re-snapped under it.
 */
export function classifyCanvasBlock(el: Element): Pick<CanvasBlock, 'splittable' | 'onGrid' | 'keepWithNext'> {
  const tag = el.tagName.toUpperCase();
  switch (tag) {
    case 'P':
    case 'UL':
    case 'OL':
    case 'BLOCKQUOTE':
      return { splittable: true, onGrid: true };
    case 'H1':
    case 'H2':
    case 'H3':
    case 'H4':
    case 'H5':
    case 'H6':
      return { splittable: false, onGrid: true, keepWithNext: true };
    case 'PRE':
      // Whole where it fits, cut on the grid where it does not — `flowCanvasPages`
      // refuses a push it cannot afford, so one flag covers both.
      return { splittable: false, onGrid: true };
    case 'HR':
      return { splittable: false, onGrid: true };
    default:
      // Images, `.tableWrapper`, figures, node views. Intrinsic height, so the
      // grid resumes UNDER them rather than being carried through them.
      return { splittable: false, onGrid: false };
  }
}
