export interface CanvasPaneInset {
    /** Pixels of the canvas's right edge that the pane lies over. */
    right: number;
}
export declare const CanvasPaneInsetContext: import("react").Context<CanvasPaneInset>;
/** The part of this canvas a surrounding pane covers; zero outside a CanvasPaneLayout. */
export declare function useCanvasPaneInset(): CanvasPaneInset;
//# sourceMappingURL=canvasPaneInset.d.ts.map