import type { ReactNode } from 'react';
/**
 * The scales worth offering. The useful ones are few and the one that matters
 * is named: 100% is the printed size.
 */
export declare const ZOOM_STEPS: readonly [0.5, 0.75, 0.9, 1, 1.25, 1.5, 2];
/**
 * The select value that means "keep the sheet as wide as the space allows".
 *
 * A sentinel string rather than a number because fit width is not a scale, it
 * is a RULE about one: the resulting percentage changes when the window does,
 * when a rail opens, when the sidebar collapses. Storing the number it happens
 * to produce would freeze the answer and quietly stop fitting.
 */
export declare const ZOOM_FIT = "fit";
/**
 * The page's zoom, handed to whatever surface offers it when the status bar is
 * off — the toolbar's ⋯ overflow on the documents page. The page still OWNS
 * the value (remembered per reader, fit width resolved against the rails); a
 * control only reads it and asks for a change.
 */
export interface DocumentZoomControl {
    /** The scale in force, fit width included — 1 is 100%. */
    zoom: number;
    /** True while the sheet tracks the workspace width rather than a fixed scale. */
    fitActive: boolean;
    /** The presets worth offering — `ZOOM_STEPS`. */
    steps: readonly number[];
    onZoomChange: (zoom: number) => void;
    /** Absent when the host cannot fit — then offer no Fit option. */
    onFitWidth?: () => void;
}
export interface DocumentStatusBarProps {
    /** Document length. Null when unknown — renders nothing rather than "0 words". */
    wordCount?: number | null;
    zoom?: number;
    onZoomChange?: (zoom: number) => void;
    /**
     * True while the sheet is tracking the workspace width. The control then
     * reads "Fit width" rather than the percentage that rule currently produces
     * — the percentage is an output, and showing it as the selection invites the
     * reader to think they chose it.
     */
    fitActive?: boolean;
    /**
     * Offered only when the host can actually do it — it needs to know how much
     * room the sheet has, which this bar does not. Absent, no Fit option renders.
     */
    onFitWidth?: () => void;
    /** Anything else the host wants along the bar (a save state, a page count). */
    children?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function DocumentStatusBar({ wordCount, zoom, onZoomChange, fitActive, onFitWidth, children, className, 'data-testid': testId, }: DocumentStatusBarProps): import("react").JSX.Element;
export default DocumentStatusBar;
//# sourceMappingURL=DocumentStatusBar.d.ts.map