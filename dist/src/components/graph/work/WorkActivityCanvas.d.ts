import type { WorkActivityPresentation, WorkGraphProps } from './types';
export type { WorkActivityCanvasBackground } from './types';
type ActivityProps = WorkGraphProps & {
    activity: WorkActivityPresentation;
    /**
     * Open the accessible list. The canvas offers it when a fitted graph lands
     * below the readable zoom — at that size the cards are a map, and the list
     * is the only way to actually read the work. Absent, the hint still says
     * what happened but has nothing to point at.
     */
    onViewAsList?: () => void;
    /**
     * How many effort graphs to draw at once. Defaults to
     * `WORK_ACTIVITY_DEFAULT_MAX_EFFORTS` (2) — the canvas fits everything it is
     * given into one pane, so nine lanes fit at a zoom nobody can read.
     *
     * `WORK_ACTIVITY_ALL_EFFORTS` (0) or a non-finite value lifts the cap. The
     * NEWEST efforts are kept, the effort holding the current selection is never
     * dropped, and nothing here changes what the host counts: the efforts it
     * passed are still the efforts it has.
     */
    maxEfforts?: number;
};
/**
 * The nearest card from `from` in the arrow's direction, as drawn: ahead
 * along the axis, penalised for drifting off it. `null` at the edge.
 */
export declare function nextWorkCardInDirection(from: DOMRect, cards: ReadonlyArray<{
    element: HTMLElement;
    rect: DOMRect;
}>, [dx, dy]: readonly [number, number]): HTMLElement | null;
/** One canvas; effort frames and visual instances never change canonical IDs. */
export declare function WorkActivityCanvas(props: ActivityProps): import("react").JSX.Element;
/**
 * What the card treatments mean. Docked in the activity footer, OUTSIDE the
 * drawing: floated over the canvas it covered a card at 1640×960 however it
 * was placed (Loop 34), and beside an open pane it had to be re-positioned
 * by hand. In a footer too narrow for it (a pane open at 1280×720) it is
 * hidden rather than wrapped — the cards still carry their own state labels.
 */
export declare function WorkActivityLegend({ live }: {
    live: boolean;
}): import("react").JSX.Element;
//# sourceMappingURL=WorkActivityCanvas.d.ts.map