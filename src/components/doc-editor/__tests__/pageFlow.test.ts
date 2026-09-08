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

describe('flowCanvasPages', () => {
  it('moves nothing when nothing meets a seam', () => {
    const flow = flowCanvasPages([text(0, 4), text(4 * DOC_LINE, 6)]);
    expect(flow.pushes).toEqual([0, 0]);
    expect(flow.pageCount).toBe(1);
  });

  it('pushes a picture off the seam instead of slicing it', () => {
    // 300px tall, starting 100px above the first seam: 200px of it would have
    // been on the next page, with the seam painted across the middle.
    const img = picture(SEAM - 100, 300);
    const flow = flowCanvasPages([text(0, 10), img]);
    const moved = img.top + flow.pushes[1]!;
    expect(moved).toBeGreaterThan(SEAM);
    expect(moved).toBeLessThan(SEAM + DOC_LINE);
    // And the whole picture now fits above the seam below it.
    expect(moved + img.height).toBeLessThan(SEAM + DOC_PAGE_HEIGHT);
  });

  it('puts the grid back under a picture rather than carrying it off', () => {
    // 217px is not a multiple of 26.4, so everything below the image used to
    // sit at a 13.6px offset for the rest of the document — the defect that
    // took seam bisection from 8% to 73%.
    const img = picture(0, 217);
    const para = text(217 + 14.4, 30);
    const flow = flowCanvasPages([img, para]);
    const top = para.top + flow.pushes[0]! + flow.pushes[1]!;
    expect(top % DOC_LINE).toBeCloseTo(0, 6);
    // At most one row of extra leading was spent doing it.
    expect(flow.pushes[1]).toBeLessThan(DOC_LINE);
  });

  it('leaves a picture too tall for any page where it is', () => {
    // Pushing it opens a blank page and then cuts it in the same place. The
    // seam has to win this one.
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

  it('does not strand one line of a paragraph before a break', () => {
    // One line above the seam and nine below: the orphan the flow moves whole.
    const p = text(SEAM - DOC_LINE, 10);
    const flow = flowCanvasPages([p]);
    expect(p.top + flow.pushes[0]!).toBeGreaterThan(SEAM);
  });

  it('does not strand one line of a paragraph after a break either', () => {
    // Nine lines above, one below. Moving the whole block would waste most of
    // a page, so only the extra line is sent over.
    const p = text(SEAM - 9 * DOC_LINE, 10);
    const flow = flowCanvasPages([p]);
    expect(flow.pushes[0]).toBe(DOC_LINE);
    expect(p.top + flow.pushes[0]! + p.height - SEAM).toBeCloseTo(2 * DOC_LINE, 6);
  });

  it('lets a long paragraph flow through a seam', () => {
    // Plenty of lines on both sides. The baseline grid already guarantees the
    // seam lands in the leading, and moving the block would only cost a page.
    const p = text(SEAM - 12 * DOC_LINE, 30);
    expect(flowCanvasPages([p]).pushes).toEqual([0]);
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
