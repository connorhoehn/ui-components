// The layout pass, against a layout engine small enough to fit in a test.
//
// jsdom reports zero for every box, so the hook is given a stand-in: a handful
// of elements whose `getBoundingClientRect` is computed from a stacked-block
// model that honours margin collapsing and the inline `margin-top` the hook
// writes. That is exactly the contract the hook depends on and the only part
// of a browser it needs, so this catches the things a real browser would:
// pushes applied twice, natural geometry recovered wrong, a loop that never
// settles.

import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { createRef } from 'react';
import { DOC_CONTENT_TOP, DOC_LINE, DOC_PAGE_HEIGHT } from '../canvas/pageFlow';
import { useCanvasPageFlow } from '../canvas/useCanvasPageFlow';

const PAPER_TOP = 40; // an arbitrary viewport offset, so nothing can assume zero

interface Spec {
  tag: string;
  height: number;
  /** Natural gap above this block, i.e. after margin collapsing. */
  gap: number;
}

/**
 * Build the sheet, and give every element a rect derived from the live DOM.
 *
 * Recomputed on every read rather than cached: the hook writes a margin and
 * then, on its next pass, measures the consequence. A cached rect would hide
 * precisely the bug worth catching.
 */
function sheet(specs: Spec[], zoom = 1) {
  const paper = document.createElement('div');
  const body = document.createElement('div');
  const root = document.createElement('div');
  root.className = 'ProseMirror';
  body.appendChild(root);
  paper.appendChild(body);
  document.body.appendChild(paper);

  const els = specs.map((s) => {
    const el = document.createElement(s.tag);
    root.appendChild(el);
    return el;
  });

  const topOf = (index: number): number => {
    let y = DOC_CONTENT_TOP;
    for (let i = 0; i <= index; i += 1) {
      const written = Number.parseFloat(els[i]!.style.marginTop || '0') || 0;
      // Collapsing: the gap is the larger of what the stylesheet wanted and
      // what was written on top of it.
      y += i === 0 ? Math.max(specs[0]!.gap, written) : Math.max(specs[i]!.gap, written);
      if (i < index) y += specs[i]!.height;
    }
    return y;
  };

  paper.getBoundingClientRect = () => ({ top: PAPER_TOP, height: 0 }) as DOMRect;
  els.forEach((el, i) => {
    el.getBoundingClientRect = () => ({
      top: PAPER_TOP + topOf(i) * zoom,
      height: specs[i]!.height * zoom,
    }) as DOMRect;
  });

  return { paper, body, els, topOf };
}

/** One animation frame, flushed inside act so React state lands. */
async function frame() {
  await act(async () => {
    await new Promise<void>((r) => { requestAnimationFrame(() => r()); });
    await Promise.resolve();
  });
}

function mount(built: ReturnType<typeof sheet>, zoom = 1, enabled = true) {
  const paperRef = createRef<HTMLElement>() as React.RefObject<HTMLElement | null>;
  const bodyRef = createRef<HTMLElement>() as React.RefObject<HTMLElement | null>;
  paperRef.current = built.paper;
  bodyRef.current = built.body;
  return renderHook(() => useCanvasPageFlow(enabled, paperRef, bodyRef, zoom));
}

afterEach(() => { document.body.innerHTML = ''; });

describe('useCanvasPageFlow', () => {
  it('writes nothing on a document no seam touches', () => {
    const built = sheet([
      { tag: 'p', height: 10 * DOC_LINE, gap: 0 },
      { tag: 'p', height: 8 * DOC_LINE, gap: DOC_LINE },
    ]);
    const { result } = mount(built);
    act(() => { result.current.remeasure(); });
    expect(built.els.map((e) => e.style.marginTop)).toEqual(['', '']);
    expect(result.current.pageCount).toBe(1);
  });

  it('pushes a picture clear of the seam', () => {
    // An image straddling the first seam, which sits at 1056 on the paper.
    const built = sheet([
      { tag: 'p', height: 30 * DOC_LINE, gap: 0 },
      { tag: 'img', height: 300, gap: 14.4 },
    ]);
    const { result } = mount(built);
    act(() => { result.current.remeasure(); });
    expect(built.els[1]!.style.marginTop).not.toBe('');
    // Measured on the paper, where the seams are: the picture now starts below
    // the first one and ends above the second.
    expect(built.topOf(1)).toBeGreaterThan(DOC_PAGE_HEIGHT);
    expect(built.topOf(1) + 300).toBeLessThan(DOC_PAGE_HEIGHT * 2);
    expect(result.current.pageCount).toBe(2);
  });

  it('settles — a second pass over its own work changes nothing', () => {
    // The whole design rests on this. The hook never resets the DOM before
    // measuring; it subtracts the pushes it already applied. If that arithmetic
    // were off by anything at all, every pass would push the picture again and
    // the document would walk down the page for as long as anyone watched it.
    const built = sheet([
      { tag: 'p', height: 30 * DOC_LINE, gap: 0 },
      { tag: 'img', height: 300, gap: 14.4 },
      { tag: 'p', height: 20 * DOC_LINE, gap: 14.4 },
    ]);
    const { result } = mount(built);
    act(() => { result.current.remeasure(); });
    const first = built.els.map((e) => e.style.marginTop);
    for (let i = 0; i < 5; i += 1) act(() => { result.current.remeasure(); });
    expect(built.els.map((e) => e.style.marginTop)).toEqual(first);
  });

  it('puts the grid back under an intrinsic height', () => {
    const built = sheet([
      { tag: 'img', height: 217, gap: 14.4 },
      { tag: 'p', height: 6 * DOC_LINE, gap: 14.4 },
    ]);
    const { result } = mount(built);
    act(() => { result.current.remeasure(); });
    // The paragraph's top, measured from the content origin, is a whole number
    // of grid rows again — which is what stops the seams below it drifting.
    expect((built.topOf(1) - DOC_CONTENT_TOP) % DOC_LINE).toBeCloseTo(0, 6);
  });

  it('measures in the sheet’s own pixels under zoom', () => {
    // Every rect the browser reports is scaled; every length written back is
    // not, because CSS `zoom` scales it again. Getting this backwards puts the
    // pushes out by the zoom factor squared.
    const flat = sheet([
      { tag: 'p', height: 30 * DOC_LINE, gap: 0 },
      { tag: 'img', height: 300, gap: 14.4 },
    ]);
    const a = mount(flat, 1);
    act(() => { a.result.current.remeasure(); });
    const unzoomed = flat.els[1]!.style.marginTop;
    document.body.innerHTML = '';

    const scaled = sheet([
      { tag: 'p', height: 30 * DOC_LINE, gap: 0 },
      { tag: 'img', height: 300, gap: 14.4 },
    ], 1.5);
    const b = mount(scaled, 1.5);
    act(() => { b.result.current.remeasure(); });
    expect(scaled.els[1]!.style.marginTop).toBe(unzoomed);
    expect(b.result.current.pageCount).toBe(a.result.current.pageCount);
  });

  it('gives the document back when pagination is turned off', () => {
    const built = sheet([
      { tag: 'p', height: 30 * DOC_LINE, gap: 0 },
      { tag: 'img', height: 300, gap: 14.4 },
    ]);
    const paperRef = { current: built.paper as HTMLElement | null };
    const bodyRef = { current: built.body as HTMLElement | null };
    const view = renderHook(
      ({ on }: { on: boolean }) => useCanvasPageFlow(on, paperRef, bodyRef, 1),
      { initialProps: { on: true } },
    );
    act(() => { view.result.current.remeasure(); });
    expect(built.els[1]!.style.marginTop).not.toBe('');

    act(() => { view.rerender({ on: false }); });
    expect(built.els[1]!.style.marginTop).toBe('');
    expect(view.result.current.pageCount).toBe(1);
  });

  it('runs itself once on mount without being asked', async () => {
    const built = sheet([
      { tag: 'p', height: 30 * DOC_LINE, gap: 0 },
      { tag: 'img', height: 300, gap: 14.4 },
    ]);
    const view = mount(built);
    await frame();
    expect(built.els[1]!.style.marginTop).not.toBe('');
    expect(view.result.current.pageCount).toBe(2);
  });

  it('does nothing at all before the editor has mounted', () => {
    // No `.ProseMirror` yet: an empty page must not be reported as anything
    // other than one page, and nothing may be written to a DOM that is not
    // the document.
    const paper = document.createElement('div');
    const body = document.createElement('div');
    paper.appendChild(body);
    document.body.appendChild(paper);
    const view = renderHook(() => useCanvasPageFlow(true, { current: paper }, { current: body }, 1));
    act(() => { view.result.current.remeasure(); });
    expect(view.result.current.pageCount).toBe(1);
  });
});
