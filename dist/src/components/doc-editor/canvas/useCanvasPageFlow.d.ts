import { type RefObject } from 'react';
/**
 * One layout pass: measure, decide, write. Returns the page count.
 *
 * Exported apart from the hook so it can be driven without React — a browser
 * harness measuring real seams against real fonts needs THIS function, not a
 * second copy of it written to be measurable. `applied` is the caller's record
 * of the pushes already in the layout; it is read to recover natural geometry
 * and updated in place.
 */
export declare function applyCanvasPageFlow(paper: HTMLElement, body: HTMLElement, zoom: number, applied: WeakMap<HTMLElement, number>): number;
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
export declare function useCanvasPageFlow(enabled: boolean, paperRef: RefObject<HTMLElement | null>, bodyRef: RefObject<HTMLElement | null>, zoom: number): CanvasPageFlow;
//# sourceMappingURL=useCanvasPageFlow.d.ts.map