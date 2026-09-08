// src/components/doc-editor/canvas/useCanvasPageFlow.ts
//
// The layout pass that makes `flowCanvasPages` real.
//
// `pageFlow.ts` decides where blocks have to go; this measures where they
// actually are, hands over the geometry, and writes the answer back onto the
// page. It is the only part of pagination that touches the DOM, and it is a
// separate module for the reason the arithmetic is: jsdom has no layout, so
// every number here would be zero in a component test. Splitting them means
// the decisions can be tested even though the measuring cannot.
//
// ## How it avoids measuring its own work
//
// The naive shape is reset -> measure -> compute -> apply, and it thrashes:
// applying changes sizes, the ResizeObserver fires, and the next pass has to
// undo the styles before it can see anything. Instead this keeps every push it
// has applied in a WeakMap and SUBTRACTS them back out of what it measures, so
// the natural geometry is recovered arithmetically and the DOM is never reset.
//
// That is what makes the loop terminate. A pass over an already-correct page
// derives the same natural geometry, computes the same pushes, finds nothing to
// write, and mutates nothing — so the observer that woke it does not fire
// again. Nothing here polls, and nothing needs a "we are applying" flag.
//
// ## Which mutations are watched
//
// childList + characterData, deliberately NOT attributes: the only attribute
// this code changes is the `style` it writes itself, and observing that is the
// loop it just avoided. Image loads change a height without mutating anything
// at all, so they are caught with a capturing `load` listener instead.
//
// ## What it costs
//
// One pass per animation frame in which the document changed, and a pass is
// one `getBoundingClientRect` per TOP-LEVEL block plus one style write per
// block that moved. Typing therefore costs a rect read per block per frame —
// linear in the number of paragraphs, not in the number of characters, and the
// writes stop as soon as the layout is right. The alternative measured worse
// on every axis: a pass that RESETS the styles before measuring forces a
// second layout every frame and flashes the unpaginated document between them.

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import {
  DOC_CONTENT_TOP,
  classifyCanvasBlock,
  flowCanvasPages,
  type CanvasBlock,
} from './pageFlow';

/** Sub-hundredth-of-a-pixel differences are float noise, not layout. */
const round = (n: number) => Math.round(n * 100) / 100;

/**
 * The top-level blocks of the page, or none if the editor has not mounted.
 *
 * The editor root when it exists. Before it mounts there is nothing to
 * paginate, and falling back to the body's own children would measure the
 * placeholder wrapper as if it were a block.
 */
function blocksOf(body: HTMLElement): HTMLElement[] {
  const root = body.querySelector<HTMLElement>('.ProseMirror');
  return root ? Array.from(root.children).filter((n): n is HTMLElement => n instanceof HTMLElement) : [];
}

/**
 * One layout pass: measure, decide, write. Returns the page count.
 *
 * Exported apart from the hook so it can be driven without React — a browser
 * harness measuring real seams against real fonts needs THIS function, not a
 * second copy of it written to be measurable. `applied` is the caller's record
 * of the pushes already in the layout; it is read to recover natural geometry
 * and updated in place.
 */
export function applyCanvasPageFlow(
  paper: HTMLElement,
  body: HTMLElement,
  zoom: number,
  applied: WeakMap<HTMLElement, number>,
): number {
  const els = blocksOf(body);
  if (els.length === 0) return 1;

  const paperTop = paper.getBoundingClientRect().top;
  const scale = zoom > 0 ? zoom : 1;
  const blocks: CanvasBlock[] = [];
  // The pushes already in the layout, accumulated the same way the flow
  // accumulates the new ones — everything below a push is displaced by it.
  let carried = 0;
  for (const el of els) {
    const rect = el.getBoundingClientRect();
    carried += applied.get(el) ?? 0;
    blocks.push({
      top: (rect.top - paperTop) / scale - DOC_CONTENT_TOP - carried,
      height: rect.height / scale,
      ...classifyCanvasBlock(el),
    });
  }

  const flow = flowCanvasPages(blocks);

  for (let i = 0; i < els.length; i += 1) {
    const el = els[i]!;
    const want = round(flow.pushes[i] ?? 0);
    if (want === round(applied.get(el) ?? 0)) continue;
    if (want === 0) {
      el.style.marginTop = '';
      el.style.removeProperty('--doc-natural-gap');
      applied.delete(el);
      continue;
    }
    // The gap this block naturally sits below its predecessor, INCLUDING
    // whatever margin collapsing did to it. Writing `naturalGap + push`
    // rather than `ownMargin + push` is what makes the push additive: the
    // collapsed result is max(previous bottom margin, ours), and ours is now
    // the larger of the two by construction.
    const prev = blocks[i - 1];
    const gap = i === 0 ? blocks[0]!.top : blocks[i]!.top - (prev!.top + prev!.height);
    const natural = round(Math.max(0, gap));
    // Recorded beside the margin so PRINT can undo it. The app prints a CLONE
    // of this subtree, and `cloneNode` brings inline styles with it — so
    // without this, every push the screen applied lands on the paper as dead
    // space, on top of the printer's own pagination. That was survivable while
    // pushes were rare and small; with page margins nearly every boundary
    // pushes a block, by up to a whole text area. See the rule keyed on
    // `[style*="margin-top"]` in the print block of styles.css.
    el.style.setProperty('--doc-natural-gap', `${natural}px`);
    el.style.marginTop = `${round(natural + want)}px`;
    applied.set(el, want);
  }

  // From the flow, not from a fresh `getBoundingClientRect` on the body: the
  // hook calls this inside a ResizeObserver callback, and reading a box back
  // after writing to it there is how you get "ResizeObserver loop completed
  // with undelivered notifications". The flow already knows the adjusted height.
  return flow.pageCount;
}

export interface CanvasPageFlow {
  /** Whole sheets the document occupies once the pushes are in. */
  pageCount: number;
  /** Re-run the pass. For a host that changed something unobservable. */
  remeasure: () => void;
}

/**
 * Push every top-level block clear of the page seams, and report the count.
 *
 * @param enabled  Off means off: nothing is measured, nothing is observed, and
 *                 any push this hook previously applied is removed. A host that
 *                 turns pagination off gets its unstyled document back.
 * @param paperRef The sheet. Seams are drawn at whole multiples of the page
 *                 height from ITS top edge, so it is the only correct origin
 *                 to measure against — the body's padding box would be a
 *                 second copy of a number the stylesheet already owns.
 * @param bodyRef  The padded page body, whose subtree is watched.
 * @param zoom     CSS `zoom` scales `getBoundingClientRect`, so every measured
 *                 length is divided back out of it. Pushes are written in the
 *                 sheet's own coordinates for the same reason the min-height
 *                 is: inside a zoomed box the browser scales them exactly once.
 */
export function useCanvasPageFlow(
  enabled: boolean,
  paperRef: RefObject<HTMLElement | null>,
  bodyRef: RefObject<HTMLElement | null>,
  zoom: number,
): CanvasPageFlow {
  const [pageCount, setPageCount] = useState(1);
  // Per-element rather than per-index: ProseMirror rebuilds nodes freely, and a
  // rebuilt element arrives with no entry, which is exactly right — it also
  // arrives with no inline style, so the two stay in agreement without either
  // one being told.
  const appliedRef = useRef<WeakMap<HTMLElement, number> | null>(null);
  if (appliedRef.current === null) appliedRef.current = new WeakMap();

  const clear = useCallback(() => {
    const body = bodyRef.current;
    const applied = appliedRef.current!;
    if (!body) return;
    for (const el of blocksOf(body)) {
      if (applied.has(el)) {
        el.style.marginTop = '';
        el.style.removeProperty('--doc-natural-gap');
        applied.delete(el);
      }
    }
  }, [bodyRef]);

  const measure = useCallback(() => {
    const paper = paperRef.current;
    const body = bodyRef.current;
    if (!paper || !body || !enabled) return;
    setPageCount(applyCanvasPageFlow(paper, body, zoom, appliedRef.current!));
  }, [enabled, paperRef, bodyRef, zoom]);

  useEffect(() => {
    if (!enabled) {
      clear();
      setPageCount(1);
      return;
    }
    const body = bodyRef.current;
    if (!body) return;

    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; measure(); });
    };
    schedule();

    // Watching the BODY rather than the editor root: the root does not exist
    // until Tiptap mounts, and a subtree watcher on the body is what notices it
    // arriving. One observer, one lifetime, no re-subscription on editor ready.
    let mo: MutationObserver | null = null;
    if (typeof MutationObserver !== 'undefined') {
      mo = new MutationObserver(schedule);
      mo.observe(body, { childList: true, subtree: true, characterData: true });
    }
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(schedule);
      ro.observe(body);
    }
    // Capturing, because `load` does not bubble. An image that finishes
    // decoding changes its height without mutating a single node, so this is
    // the only signal that it happened.
    body.addEventListener('load', schedule, true);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      mo?.disconnect();
      ro?.disconnect();
      body.removeEventListener('load', schedule, true);
    };
  }, [enabled, measure, clear, bodyRef]);

  return { pageCount, remeasure: measure };
}
