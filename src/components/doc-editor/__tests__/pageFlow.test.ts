// The page-break decisions, one at a time.
//
// `CanvasDocumentView.seams.test.ts` is the statistical case — a thousand
// documents, scored. This file is the specific one: each rule stated as the
// smallest layout that exercises it, so a failure names the rule instead of
// moving a percentage.
//
// Coordinates throughout are CONTENT coordinates: 0 is the first line's box,
// and the first seam is therefore at 1056 - 105.6 = 950.4.

import { describe, expect, it } from 'vitest';
import {
  DOC_CONTENT_TOP,
  DOC_LINE,
  DOC_PAGE_HEIGHT,
  canvasPageAt,
  classifyCanvasBlock,
  flowCanvasPages,
  type CanvasBlock,
} from '../canvas/pageFlow';

/** The first seam, in content coordinates. */
const SEAM = DOC_PAGE_HEIGHT - DOC_CONTENT_TOP;

const text = (top: number, lines: number): CanvasBlock =>
  ({ top, height: lines * DOC_LINE, splittable: true, onGrid: true });
const picture = (top: number, height: number): CanvasBlock =>
  ({ top, height, splittable: false, onGrid: false });
const heading = (top: number): CanvasBlock =>
  ({ top, height: DOC_LINE, splittable: false, onGrid: true, keepWithNext: true });

/**
 * Distance to the nearest grid row, either way.
 *
 * `top % DOC_LINE` is not that: a value a hair BELOW a whole row answers
 * ~26.4 rather than ~0, so a float that is on the grid to within 2e-14 reads as
 * a full row off it.
 */
const offGrid = (top: number): number => {
  const off = ((top % DOC_LINE) + DOC_LINE) % DOC_LINE;
  return Math.min(off, DOC_LINE - off);
};

describe('flowCanvasPages', () => {
  it('moves nothing when nothing meets a seam', () => {
    const flow = flowCanvasPages([text(0, 4), text(4 * DOC_LINE, 6)]);
    expect(flow.pushes).toEqual([0, 0]);
    expect(flow.pageCount).toBe(1);
  });

  it('pushes a picture off the boundary instead of slicing it', () => {
    // 300px tall, starting 100px above the first boundary: 200px of it would
    // have been on the next page, with the boundary painted across the middle.
    const img = picture(SEAM - 100, 300);
    const flow = flowCanvasPages([text(0, 10), img]);
    const moved = img.top + flow.pushes[1]!;
    // The top of page two's TEXT AREA, an inch below the boundary — not a few
    // pixels below it, which is where the pre-margin flow left it.
    expect(moved).toBe(DOC_PAGE_HEIGHT);
    // And the whole picture now fits above the boundary below it.
    expect(moved + img.height).toBeLessThan(2 * DOC_PAGE_HEIGHT - 2 * DOC_CONTENT_TOP);
  });

  it('puts the grid back under a picture rather than carrying it off', () => {
    // 217px is not a multiple of 26.4, so everything below the image used to
    // sit at a 13.6px offset for the rest of the document — the defect that
    // took seam bisection from 8% to 73%. Both blocks are well clear of the
    // first boundary, so the re-snap is the ONLY thing being measured here.
    const img = picture(0, 217);
    const para = text(217 + 14.4, 10);
    const flow = flowCanvasPages([img, para]);
    const top = para.top + flow.pushes[0]! + flow.pushes[1]!;
    expect(top % DOC_LINE).toBeCloseTo(0, 6);
    // At most one row of extra leading was spent doing it.
    expect(flow.pushes[1]).toBeLessThan(DOC_LINE);
  });

  it('leaves a picture too tall for any page where it is', () => {
    // Pushing it opens a blank page and then cuts it in the same place. The
    // boundary has to win this one.
    const img = picture(SEAM - 50, DOC_PAGE_HEIGHT + 200);
    expect(flowCanvasPages([img]).pushes).toEqual([0]);
  });

  it('keeps a heading with the line it introduces', () => {
    // The heading itself clears the seam by 20px; its paragraph does not, so
    // the heading would have been left alone at the foot of the page.
    const h = heading(SEAM - DOC_LINE - 6);
    const body = text(SEAM - 6, 8);
    const flow = flowCanvasPages([h, body]);
    expect(flow.pushes[0]).toBeGreaterThan(0);
    expect(h.top + flow.pushes[0]!).toBeGreaterThan(SEAM);
  });

  it('moves a paragraph whole rather than letting its middle sit in the margin', () => {
    // The change margins made. Nine lines above the boundary and one below is
    // a break the pre-margin flow was happy with — the seam landed in the
    // leading. It is not a break a PAGE can have: those nine lines are inside
    // the bottom inch of the sheet.
    const p = text(SEAM - 9 * DOC_LINE, 10);
    const flow = flowCanvasPages([p]);
    expect(p.top + flow.pushes[0]!).toBe(DOC_PAGE_HEIGHT);
  });

  it('starts every page an inch below the boundary, on the grid', () => {
    // Both halves matter. An inch down is the margin; on the grid is what
    // stops the margin from costing an extra row of leading on every page,
    // and it comes free because a page is 40 whole rows and a margin is 4.
    const img = picture(SEAM + 10, 200);
    const para = text(SEAM + 240, 6);
    const flow = flowCanvasPages([img, para]);
    const imgTop = img.top + flow.pushes[0]!;
    expect(imgTop).toBe(DOC_PAGE_HEIGHT);
    expect(offGrid(imgTop)).toBeCloseTo(0, 6);
    // And the paragraph carried below it is re-snapped, not left on the
    // image's intrinsic 200px offset.
    expect(offGrid(para.top + flow.pushes[0]! + flow.pushes[1]!)).toBeCloseTo(0, 6);
  });

  it('lets a paragraph too tall for one page flow through the margin', () => {
    // 40 rows is a whole sheet and the text area is 32, so no push helps: the
    // boundary is going to cut it wherever it starts. Opening a blank page
    // first and then cutting it in the same place is strictly worse.
    const p = text(SEAM - 12 * DOC_LINE, 40);
    expect(flowCanvasPages([p]).pushes).toEqual([0]);
  });

  describe('pageMargin: 0 — the model the margins replaced', () => {
    // Kept runnable rather than described, because "margins cost a third more
    // pages" is only an argument if the thing being compared against still
    // works. These are the assertions this file shipped with.

    it('lets a long paragraph flow through a hairline seam', () => {
      const p = text(SEAM - 12 * DOC_LINE, 30);
      expect(flowCanvasPages([p], { pageMargin: 0 }).pushes).toEqual([0]);
    });

    it('does not strand one line of a paragraph before a break', () => {
      const p = text(SEAM - DOC_LINE, 10);
      const flow = flowCanvasPages([p], { pageMargin: 0 });
      expect(p.top + flow.pushes[0]!).toBeGreaterThan(SEAM);
    });

    it('does not strand one line of a paragraph after a break either', () => {
      // Nine lines above, one below. Moving the whole block would waste most
      // of a page, so only the extra line is sent over.
      const p = text(SEAM - 9 * DOC_LINE, 10);
      const flow = flowCanvasPages([p], { pageMargin: 0 });
      expect(flow.pushes[0]).toBe(DOC_LINE);
      expect(p.top + flow.pushes[0]! + p.height - SEAM).toBeCloseTo(2 * DOC_LINE, 6);
    });

    it('still moves a picture off the seam, by a hair rather than by an inch', () => {
      const img = picture(SEAM - 100, 300);
      const flow = flowCanvasPages([text(0, 10), img], { pageMargin: 0 });
      const moved = img.top + flow.pushes[1]!;
      expect(moved).toBeGreaterThan(SEAM);
      expect(moved).toBeLessThan(SEAM + DOC_LINE);
    });
  });

  it('counts the sheets the adjusted document fills', () => {
    // Content exactly one page tall, minus the two 105.6px margins.
    expect(flowCanvasPages([text(0, 1)]).pageCount).toBe(1);
    const full = flowCanvasPages([text(0, (DOC_PAGE_HEIGHT - 2 * DOC_CONTENT_TOP) / DOC_LINE)]);
    expect(full.pageCount).toBe(1);
  });

  it('answers one page for a document it cannot measure', () => {
    expect(flowCanvasPages([]).pageCount).toBe(1);
    expect(flowCanvasPages([text(0, 4)], { line: 0 }).pageCount).toBe(1);
  });

  it('is idempotent — the same natural geometry gives the same answer', () => {
    // The component relies on this: it never resets the DOM, it subtracts the
    // pushes it already applied and re-derives. A flow that answered
    // differently the second time would oscillate on screen forever.
    const blocks = [text(0, 12), picture(12 * DOC_LINE + 14.4, 190), text(600, 40)];
    const a = flowCanvasPages(blocks);
    const b = flowCanvasPages(blocks);
    expect(a.pushes).toEqual(b.pushes);
  });
});

describe('classifyCanvasBlock', () => {
  const tag = (name: string) => classifyCanvasBlock(document.createElement(name));

  it('lets prose flow and holds everything else whole', () => {
    for (const t of ['p', 'ul', 'ol', 'blockquote']) {
      expect(tag(t), t).toMatchObject({ splittable: true, onGrid: true });
    }
    for (const t of ['h1', 'h2', 'h3', 'pre', 'hr']) {
      expect(tag(t), t).toMatchObject({ splittable: false, onGrid: true });
    }
  });

  it('marks headings keep-with-next', () => {
    expect(tag('h2').keepWithNext).toBe(true);
    expect(tag('p').keepWithNext).toBeUndefined();
  });

  it('treats anything it does not recognise as an intrinsic object', () => {
    // A macro node view can be any element the host's extension renders. The
    // safe answer is "do not cut it, and re-snap the grid under it" — the same
    // treatment an image gets, which is what an unknown node most often is.
    for (const t of ['img', 'figure', 'div', 'canvas-macro']) {
      expect(tag(t), t).toMatchObject({ splittable: false, onGrid: false });
    }
  });
});

describe('canvasPageAt', () => {
  it('reports the page a scroll offset is looking at', () => {
    expect(canvasPageAt(0, 7)).toBe(1);
    expect(canvasPageAt(DOC_PAGE_HEIGHT - 1, 7)).toBe(1);
    expect(canvasPageAt(DOC_PAGE_HEIGHT, 7)).toBe(2);
    expect(canvasPageAt(DOC_PAGE_HEIGHT * 2.5, 7)).toBe(3);
  });

  it('clamps rather than reporting a page that does not exist', () => {
    // Above the sheet (the reader has not scrolled to it) and past the end
    // (rubber-band scrolling, a short last page) are both real.
    expect(canvasPageAt(-4000, 7)).toBe(1);
    expect(canvasPageAt(DOC_PAGE_HEIGHT * 40, 7)).toBe(7);
    expect(canvasPageAt(DOC_PAGE_HEIGHT * 40, 0)).toBe(1);
  });
});
