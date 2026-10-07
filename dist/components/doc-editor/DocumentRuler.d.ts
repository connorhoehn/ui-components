import type { CSSProperties } from 'react';
/** CSS pixels per inch at the canvas's 96dpi page scale. */
export declare const PX_PER_INCH = 96;
export interface DocumentRulerProps {
    /**
     * Page width in DOCUMENT px — 816 is US Letter at 96dpi, and stays 816 at
     * every zoom. Pass a measured width divided by `zoom`, never the measured
     * width itself.
     */
    pageWidth?: number;
    /** Left margin in DOCUMENT px. Default 96 — one inch. */
    marginLeft?: number;
    /** Right margin in DOCUMENT px. Default 96 — one inch. */
    marginRight?: number;
    /**
     * Scale the page is displayed at. 1 is 100%.
     *
     * The ruler multiplies every measure by it — geometry AND the inch grid —
     * rather than being told a second set of numbers that could disagree with
     * the first. This is what keeps a label honest when the page is zoomed: an
     * inch mark moves to `96 * zoom` screen px and is still labelled 1.
     */
    zoom?: number;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}
/**
 * Whole-inch labels, plus minor ticks at every eighth of an inch.
 *
 * Numbering restarts at the left margin and counts outward in both
 * directions, which is what every word processor does and why "1 inch" on the
 * ruler means "one inch of TEXT", not one inch of paper.
 *
 * Walks in DOCUMENT px — so the label sequence is a property of the page and
 * reads identically at 50%, 100% and 150% — and emits SCREEN px, so each mark
 * lands over the text it measures.
 */
export declare function ticksFor(pageWidth: number, marginLeft: number, zoom?: number): Array<{
    x: number;
    kind: 'inch' | 'half' | 'minor';
    label?: string;
}>;
export declare function DocumentRuler({ pageWidth, marginLeft, marginRight, zoom, className, style, 'data-testid': testId, }: DocumentRulerProps): import("react").JSX.Element;
export default DocumentRuler;
//# sourceMappingURL=DocumentRuler.d.ts.map