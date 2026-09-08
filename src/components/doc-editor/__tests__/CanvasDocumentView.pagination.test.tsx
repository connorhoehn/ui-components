// Pagination on the canvas sheet.
//
// A separate file from CanvasDocumentView.test.tsx on purpose: this one owns
// the `paginate` prop and the baseline-grid arithmetic behind it, and keeping
// it apart means neither file has to be touched to change the other.
//
// The interesting tests here are the LAST block. jsdom has no layout engine,
// so it cannot tell you whether a seam lands on a line of text — every height
// it reports is zero. What it CAN do is check the arithmetic that makes the
// seam land correctly, by reading the numbers straight out of the stylesheet.
// That is the actual regression risk: not that someone deletes the feature,
// but that someone adjusts `--doc-line` or the page padding to taste and
// silently detaches the grid from the text sitting on it.

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useEffect } from 'react';
import * as Y from 'yjs';
import CanvasDocumentView, { canvasPageCount, canvasPaperStyle } from '../CanvasDocumentView';
import { DOC_CONTENT_TOP, DOC_LINE, DOC_PAGE_GAP, DOC_PAGE_HEIGHT } from '../canvas/pageFlow';

// Same stub as the sibling suite, and for the same reason: a real ProseMirror
// view is not what this file is testing. The empty dep array is load-bearing —
// CanvasDocumentView passes an inline arrow, so depending on `onEditorReady`
// re-fires forever.
vi.mock('../TiptapEditor', () => ({
  default: ({ onEditorReady }: { onEditorReady?: (e: unknown) => void }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { onEditorReady?.({ stub: true }); }, []);
    return <div data-testid="tiptap-stub" />;
  },
}));
vi.mock('../DocumentToolbar', () => ({ default: () => <div data-testid="toolbar-stub" /> }));

function renderView(overrides: Partial<React.ComponentProps<typeof CanvasDocumentView>> = {}) {
  const ydoc = new Y.Doc();
  return render(
    <CanvasDocumentView
      isCanvas
      body={ydoc.getXmlFragment('body')}
      ydoc={ydoc}
      provider={null}
      user={{ name: 'Ann', color: '#f00' }}
      extensions={[]}
      {...overrides}
    />,
  );
}

afterEach(cleanup);

describe('canvasPageCount', () => {
  // Rounding UP is the whole point — see the function's own comment. A short
  // document must still end on a full sheet, not on a stub.
  it('rounds a partial page up to a whole one', () => {
    expect(canvasPageCount(1)).toBe(1);
    expect(canvasPageCount(1056)).toBe(1);
    expect(canvasPageCount(1057)).toBe(2);
    // The height actually measured on a short real document today.
    expect(canvasPageCount(1972)).toBe(2);
    expect(canvasPageCount(2112)).toBe(2);
    expect(canvasPageCount(2113)).toBe(3);
  });

  // jsdom reports 0 for every height, and a zoom of 0 would divide to
  // Infinity. Both have to come back as one page rather than as 0 pages or a
  // crash, because this runs on every resize.
  it('answers one page for a height it cannot trust', () => {
    for (const bad of [0, -50, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(canvasPageCount(bad)).toBe(1);
    }
  });
});

describe('canvasPaperStyle', () => {
  it('writes nothing at 100% with pagination off', () => {
    // An unzoomed, unpaginated sheet must carry no inline geometry at all, or
    // it stops being free to end where its content does.
    expect(canvasPaperStyle(1, null)).toEqual({});
  });

  it('passes zoom and min-height through unscaled', () => {
    // Unscaled is the point: CSS `zoom` scales the layout box, so multiplying
    // a length here would apply the scale twice and the sheet would be padded
    // to the wrong number of pages at every zoom but 100%.
    expect(canvasPaperStyle(1.5, 2112)).toEqual({ zoom: 1.5, minHeight: 2112 });
    expect(canvasPaperStyle(1, 1056)).toEqual({ minHeight: 1056 });
    expect(canvasPaperStyle(0.5, null)).toEqual({ zoom: 0.5 });
  });
});

describe('CanvasDocumentView pagination', () => {
  // The default FLIPPED once `canvas/pageFlow.ts` stopped seams cutting
  // pictures. A host that says nothing now gets pages; see the prop's doc
  // comment for the measurement that decided it.
  it('is on unless refused', () => {
    renderView();
    const paper = screen.getByTestId('canvas-document-paper');
    expect(paper.className).toContain('doc-page--paginated');
    expect(paper).toHaveAttribute('data-page-count', '1');
    expect(screen.getByTestId('canvas-document-page-count')).toBeInTheDocument();
  });

  it('is off when refused', () => {
    renderView({ paginate: false });
    const paper = screen.getByTestId('canvas-document-paper');
    expect(paper.className).not.toContain('doc-page--paginated');
    expect(paper).not.toHaveAttribute('data-page-count');
    // No page count in the status bar: an unpaginated sheet has no pages to
    // count, and "1 page" would be a claim about boundaries that are not drawn.
    expect(screen.queryByTestId('canvas-document-page-count')).toBeNull();
  });

  it('leaves the sheet free to end where its content does when off', () => {
    renderView({ paginate: false });
    // The `min-h-[1056px]` class still applies; what must NOT appear is an
    // inline minHeight pinning the sheet to a whole number of pages.
    expect(screen.getByTestId('canvas-document-paper').style.minHeight).toBe('');
  });

  it('paints page boundaries and pads to a whole sheet when on', () => {
    renderView({ paginate: true });
    const paper = screen.getByTestId('canvas-document-paper');
    expect(paper.className).toContain('doc-page--paginated');
    expect(paper).toHaveAttribute('data-page-count', '1');
    expect(paper.style.minHeight).toBe('1056px');
    expect(screen.getByTestId('canvas-document-page-count')).toHaveTextContent('1 page');
  });

  // The hook the paginated padding override needs. Unconditional, so the DOM
  // is one shape whether or not the feature is on — a class that appears only
  // under a flag is a second layout to keep working.
  it('names the page body in both modes', () => {
    renderView();
    expect(screen.getByTestId('canvas-document-body').className).toContain('doc-page__body');
    cleanup();
    renderView({ paginate: true });
    expect(screen.getByTestId('canvas-document-body').className).toContain('doc-page__body');
  });
});

// ---------------------------------------------------------------------------
// The arithmetic, read from the stylesheet rather than restated here.
//
// Restating the numbers would make this a test of a copy. Reading them is what
// makes it a test of the thing that ships.
// ---------------------------------------------------------------------------
describe('the baseline grid the seam depends on', () => {
  // From the package root, not from `import.meta.url`: under the jsdom
  // environment that is not a file: URL and `readFileSync` refuses it.
  const css = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8');
  // Only the RULES, with every comment removed. Both markers sit inside
  // comments, so the slice has to start after the header's `*/` and stop at
  // the footer's `/*` — otherwise the header's own prose is scanned, and it
  // QUOTES the mistakes it exists to prevent (`calc(var(--doc-line) / 2)`
  // appears there as an example). Scanning the raw text finds the warning and
  // reports it as the bug.
  const begin = css.indexOf('BEGIN: canvas pagination');
  const end = css.indexOf('END: canvas pagination');
  expect(begin, 'the pagination section is missing from styles.css').toBeGreaterThan(-1);
  const section = css
    .slice(css.indexOf('*/', begin) + 2, css.lastIndexOf('/*', end))
    .replace(/\/\*[\s\S]*?\*\//g, '');

  const px = (decl: string): number => {
    const m = section.match(new RegExp(`${decl}\\s*:\\s*([0-9.]+)px`));
    if (!m) throw new Error(`could not read ${decl} from the pagination section`);
    return Number(m[1]);
  };
  const LINE = px('--doc-line');
  const PAGE = px('--doc-page-height');
  const GAP = px('--doc-page-gap');

  it('divides the page into whole grid rows', () => {
    // 1056 / 26.4 = 40. If this stops being an integer the seam drifts a
    // fraction of a line further into the text on every page, so the bottom of
    // a long document is cut worse than the top.
    expect(PAGE / LINE).toBe(Math.round(PAGE / LINE));
  });

  it('agrees with the page height the component uses', () => {
    // The component sizes the sheet, the stylesheet draws the seam. When these
    // disagree the last seam is not at the bottom of the page.
    expect(canvasPageCount(PAGE)).toBe(1);
    expect(canvasPageCount(PAGE + 1)).toBe(2);
  });

  it('snaps the page margin to whole grid rows', () => {
    // `padding-block: calc(var(--doc-line) * 4)`. The multiplier has to be a
    // whole number: the content origin sits at this offset, so a fractional
    // one puts every line in the document off the grid and every seam through
    // a line of text.
    const m = section.match(/\.doc-page--paginated \.doc-page__body\s*\{[^}]*padding-block:\s*calc\(var\(--doc-line\)\s*\*\s*([0-9.]+)\)/);
    expect(m).not.toBeNull();
    const rows = Number(m![1]);
    expect(rows).toBe(Math.round(rows));
    // And it is the exact offset `pageFlow.ts` converts paper coordinates by.
    // The flow measures block tops from the SHEET's top edge, so if this
    // padding and DOC_CONTENT_TOP ever part company every block is judged
    // against a seam that is somewhere else.
    expect(rows * LINE).toBe(DOC_CONTENT_TOP);
  });

  it('agrees with the constants the flow reasons from', () => {
    // Three numbers live in two places by necessity — CSS draws the seam, TS
    // decides what must not touch it. This is the only thing keeping them
    // one number each.
    expect(LINE).toBe(DOC_LINE);
    expect(PAGE).toBe(DOC_PAGE_HEIGHT);
    expect(GAP).toBe(DOC_PAGE_GAP);
  });

  it('keeps the gap inside the clear leading', () => {
    // The measured constraint, and the one worth guarding: a body line
    // advances LINE px and its glyphs occupy 1.211em of that (Inter's ascender
    // plus descender). What is left is the only space a seam may occupy.
    // Simulated: every gap up to the leading bisects 4.6% of seams, and the
    // very next pixel jumps to 78%.
    const clearLeading = LINE - 16 * 1.211;
    expect(GAP).toBeLessThanOrEqual(clearLeading);
  });

  it('gives every block a height and margin that is a whole number of rows', () => {
    // Any `calc(var(--doc-line) * N)` with a fractional N breaks the grid from
    // that block downward. `pre { padding-block: calc(var(--doc-line) / 2) }`
    // is the specific mistake this catches — it keeps the code block's outer
    // height on the grid while putting every line inside it on a half-row
    // offset, which measured at 93.1% of seams bisected.
    const multipliers = [...section.matchAll(/var\(--doc-line\)\s*\*\s*([0-9.]+)/g)].map((m) => Number(m[1]));
    expect(multipliers.length).toBeGreaterThan(0);
    for (const n of multipliers) expect(n).toBe(Math.round(n));
    // And no division of the row at all, which is the same error spelled the
    // other way round.
    expect(section).not.toMatch(/var\(--doc-line\)\s*\/\s*[0-9]/);
  });
});
