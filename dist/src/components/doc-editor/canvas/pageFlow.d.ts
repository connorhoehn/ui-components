/**
 * The body line advance: 16px x 1.5, from `.doc-page .ProseMirror`
 * (`--doc-line`). 26.4px (x 1.65) until 2.385.6.
 *
 * Used where the flow reasons in LINES — keep a heading with the first line
 * below it, count orphan and widow lines. It is no longer the snap unit; that
 * is `DOC_GRID`.
 */
export declare const DOC_LINE = 24;
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
export declare const DOC_GRID = 4;
/** One US-Letter page at 96dpi. 44 body lines, 264 grid rows. */
export declare const DOC_PAGE_HEIGHT = 1056;
/**
 * The sheet's vertical padding, 2 body lines (48px, half an inch).
 *
 * Load-bearing twice over: it is the offset from the top of the paper to the
 * first line's box, so it is what converts a seam's PAPER coordinate into the
 * CONTENT coordinate the measurements are in; and because it is a whole number
 * of rows, every seam lands on a row boundary rather than a fraction of one.
 */
export declare const DOC_CONTENT_TOP: number;
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
export declare const DOC_PAGE_GAP = 24;
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
export declare function flowCanvasPages(blocks: readonly CanvasBlock[], options?: CanvasFlowOptions): CanvasFlowResult;
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
export declare function canvasPageAt(paperY: number, pageCount: number, options?: Pick<CanvasFlowOptions, 'pageHeight'>): number;
/**
 * How a DOM block flows, from the element alone.
 *
 * Tag-driven rather than schema-driven because this package never sees the
 * ProseMirror schema — the host owns the extensions, so a macro node view can
 * be any element at all. Anything unrecognised is treated as intrinsic and
 * unsplittable, which is the safe answer: it gets moved whole rather than cut,
 * and the grid is re-snapped under it.
 */
export declare function classifyCanvasBlock(el: Element): Pick<CanvasBlock, 'splittable' | 'onGrid' | 'keepWithNext'>;
//# sourceMappingURL=pageFlow.d.ts.map