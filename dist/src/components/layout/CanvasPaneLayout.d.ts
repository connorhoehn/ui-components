import { type ReactNode } from 'react';
export type CanvasPanePlacement = 'none' | 'column' | 'overlay' | 'collapsed';
export interface CanvasPaneGeometryOptions {
    /** Narrowest the pane gets. Default 280. */
    paneMinPx?: number;
    /** Widest the pane gets. Default 380. */
    paneMaxPx?: number;
    /** The pane's share of the layout between those bounds. Default 0.3. */
    paneFraction?: number;
    /** The canvas keeps at least this beside a column pane; below it the pane overlays. Default 480. */
    canvasMinPx?: number;
}
export interface CanvasPaneGeometry {
    placement: Exclude<CanvasPanePlacement, 'none' | 'collapsed'>;
    paneWidth: number;
    /** Canvas width left visible beside (column) or beside-and-under (overlay) the pane. */
    canvasWidth: number;
}
/** Width of the folded rail. */
export declare const CANVAS_PANE_RAIL_PX = 36;
/** Pure: where the pane goes, and how wide, in a layout this wide. */
export declare function canvasPaneGeometry(width: number, options?: CanvasPaneGeometryOptions): CanvasPaneGeometry;
export interface CanvasPaneLayoutProps extends CanvasPaneGeometryOptions {
    /** The canvas. It gets the remaining width and never less than zero. */
    children: ReactNode;
    /** The details pane, or null/undefined when nothing is open. It fills its box (`h-full w-full`) and draws its own left edge and background. */
    pane?: ReactNode | null;
    /** Controlled fold state. Omit to let the layout keep its own. */
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    /** When this changes (a different item opened), a folded pane unfolds. */
    expandKey?: unknown;
    /** What the pane holds, for the fold/unfold buttons: "Hide details" / "Show details". Default "details". */
    paneLabel?: string;
    /** Fixed width for tests/stories (jsdom never measures). */
    width?: number;
    className?: string;
    'data-testid'?: string;
}
export declare function CanvasPaneLayout({ children, pane, collapsed: collapsedProp, onCollapsedChange, expandKey, paneLabel, width: fixedWidth, className, 'data-testid': testId, ...geometryOptions }: CanvasPaneLayoutProps): import("react").JSX.Element;
export default CanvasPaneLayout;
//# sourceMappingURL=CanvasPaneLayout.d.ts.map