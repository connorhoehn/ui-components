export interface CanvasZoomControlsProps {
    /** Current zoom, 1 = 100%. Omit to hide the readout. */
    zoom?: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
    /** Fit the whole drawing. Omit to hide the button. */
    onFit?: () => void;
    /** Disable "zoom out" at or below this zoom. */
    minZoom?: number;
    /** Disable "zoom in" at or above this zoom. */
    maxZoom?: number;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}
export declare function CanvasZoomControls({ zoom, onZoomIn, onZoomOut, onFit, minZoom, maxZoom, className, 'aria-label': ariaLabel, 'data-testid': testId, }: CanvasZoomControlsProps): import("react").JSX.Element;
export default CanvasZoomControls;
//# sourceMappingURL=CanvasZoomControls.d.ts.map