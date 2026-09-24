// CanvasZoomControls — the small "− 100% + ⛶" cluster that floats in a
// canvas corner. Standalone and controlled: it draws the current zoom and
// calls back; the canvas (xyflow, an SVG, a tldraw) owns the viewport. The
// Work activity canvas and TypedNodeCanvas both place one; a host with its
// own canvas can use it directly.

import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';

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

function FitGlyph() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M1.5 5 V1.5 H5 M9 1.5 H12.5 V5 M12.5 9 V12.5 H9 M5 12.5 H1.5 V9" />
    </svg>
  );
}

export function CanvasZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onFit,
  minZoom,
  maxZoom,
  className,
  'aria-label': ariaLabel = 'Zoom',
  'data-testid': testId = 'canvas-zoom-controls',
}: CanvasZoomControlsProps) {
  const EPS = 1e-3;
  const atMin = zoom !== undefined && minZoom !== undefined && zoom <= minZoom + EPS;
  const atMax = zoom !== undefined && maxZoom !== undefined && zoom >= maxZoom - EPS;
  const percent = zoom !== undefined && Number.isFinite(zoom) ? `${Math.round(zoom * 100)}%` : null;
  return (
    <div role="toolbar" aria-label={ariaLabel} className={cn('inline-flex items-center gap-1.5', className)} data-testid={testId}>
      <div className="inline-flex items-center rounded-md border border-border bg-surface">
        <IconButton size="md" aria-label="Zoom out" onClick={onZoomOut} disabled={atMin} className="rounded-r-none">
          <span aria-hidden="true" className="text-[15px] leading-none text-text-secondary">−</span>
        </IconButton>
        {percent && (
          <span
            className="min-w-[3.25rem] border-x border-border px-1 text-center text-[12px] tabular-nums text-text-secondary"
            aria-label={`Zoom ${percent}`}
            data-testid={`${testId}-percent`}
          >
            {percent}
          </span>
        )}
        <IconButton size="md" aria-label="Zoom in" onClick={onZoomIn} disabled={atMax} className="rounded-l-none">
          <span aria-hidden="true" className="text-[15px] leading-none text-text-secondary">+</span>
        </IconButton>
      </div>
      {onFit && (
        <IconButton size="md" variant="outline" aria-label="Fit to view" onClick={onFit}>
          <FitGlyph />
        </IconButton>
      )}
    </div>
  );
}

export default CanvasZoomControls;
