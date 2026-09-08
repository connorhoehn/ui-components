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
//   2. AVOID THE SEAM. A block that must not be cut — an image, a table, a
//      rule, a heading, a code block that fits — is pushed to the next page
//      when a seam would fall inside it. Blocks that MAY be cut (paragraphs,
//      lists, quotes) are left to flow, and get orphan/widow control instead:
//      a single stranded first or last line is pushed over rather than left
//      alone on a page.
//
// Kept free of the DOM on purpose. Everything here is arithmetic over measured
// numbers, which is the only way it can be tested — jsdom has no layout engine,
// so a component test can never observe a seam landing on a line of text. The
// simulation in `__tests__/CanvasDocumentView.seams.test.ts` feeds this the
// geometry a browser would have produced and scores the result.

/**
 * The body line advance: 16px x 1.65, from `.doc-page .ProseMirror`.
 *
 * The grid row. Every block height and margin in the paginated stylesheet is a
 * whole multiple of it, and this module's job is to keep it that way across
 * blocks whose heights are not.
 */
export const DOC_LINE = 26.4;

/** One US-Letter page at 96dpi. Exactly 40 grid rows, which is why any of this closes. */
export const DOC_PAGE_HEIGHT = 1056;

/**
 * The sheet's vertical padding, 4 grid rows.
 *
 * Load-bearing twice over: it is the offset from the top of the paper to the
 * first line's box, so it is what converts a seam's PAPER coordinate into the
 * CONTENT coordinate the measurements are in; and because it is a whole number
 * of rows, every seam lands on a row boundary rather than a fraction of one.
 */
export const DOC_CONTENT_TOP = DOC_LINE * 4;

/** The painted gap, `--doc-page-gap`. A pushed block clears more than half of it. */
export const DOC_PAGE_GAP = 6;

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
  line?: number;
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
  const edge = options.edgeClearance ?? DOC_PAGE_GAP / 2 + 0.5;
  const clearance = options.seamClearance ?? DOC_PAGE_GAP / 2 + 1;
  const keep = options.keepLines ?? 2;

  const pushes = new Array<number>(blocks.length).fill(0);
  if (!(pageHeight > 0) || !(line > 0) || blocks.length === 0) {
    return { pushes, pageCount: 1, contentHeight: 0 };
  }

  // The first seam strictly below content coordinate `c`. Seams live in PAPER
  // coordinates at whole multiples of the page height; `contentTop` is the
  // only thing standing between the two frames.
  const nextSeam = (c: number): number => {
    const k = Math.floor((c + contentTop) / pageHeight) + 1;
    return k * pageHeight - contentTop;
  };

  // What one sheet can actually hold for a block that was pushed onto it: the
  // page, less the clearance the push spends below the seam above and the
  // clearance the block claims above the seam below. Using the full page here
  // is how a nearly-page-tall image gets pushed onto a fresh sheet only to
  // cross the NEXT seam — one push per block, so the check has to be right the
  // first time.
  const usable = pageHeight - clearance - edge;

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
    if (b.onGrid) move(gridSnap(top, line));

    // 2) The seam. `reach` is how far down the page this block needs to be
    //    unbroken for: its own box, extended through the first line of the
    //    next block when it is a heading.
    const next = blocks[i + 1];
    const reach = b.keepWithNext && next
      ? Math.max(b.height, next.top - b.top + line)
      : b.height;
    // Unsplittable blocks claim `edge` px outside their box on both sides; a
    // paragraph's line boxes already inset their own ink further than that, so
    // prose is judged on the box alone and nothing reflows for a seam that was
    // always going to land in the leading.
    const lo = b.splittable ? top : top - edge;
    const hi = b.splittable ? top + reach : top + reach + edge;
    const seam = nextSeam(lo);
    const crosses = seam > lo + EPS && seam < hi - EPS;

    if (crosses) {
      if (!b.splittable) {
        // Move it whole, but only if a whole sheet can hold it. A picture
        // taller than the page has to be cut by SOMETHING; cutting it at the
        // seam is better than an empty page followed by the same cut.
        if (reach <= usable + EPS) {
          move(seam + clearance - top);
          if (b.onGrid) move(gridSnap(top, line));
        }
      } else {
        // Orphans and widows, counted in whole lines. `height / line` is exact
        // for every block the paginated stylesheet sizes, which is every block
        // that reaches this branch.
        const lines = Math.max(1, Math.round(b.height / line));
        const before = Math.max(0, Math.floor((seam - top) / line + EPS));
        const after = lines - before;
        if (before > 0 && before < keep && b.height <= usable + EPS) {
          // Too few lines before the break to be worth leaving there.
          move(seam + clearance - top);
          if (b.onGrid) move(gridSnap(top, line));
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
 * Which page a point in content coordinates falls on, 1-based.
 *
 * Used for "Page 3 of 7": the reader's position is a scroll offset, not a
 * block, so this cannot come out of the flow result.
 */
export function canvasPageAt(
  contentY: number,
  pageCount: number,
  options: Pick<CanvasFlowOptions, 'pageHeight'> = {},
): number {
  const pageHeight = options.pageHeight ?? DOC_PAGE_HEIGHT;
  if (!(pageHeight > 0)) return 1;
  const page = Math.floor(contentY / pageHeight) + 1;
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
