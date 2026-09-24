// CanvasPaneLayout — a canvas (a graph, a map, a board) with a details pane
// on its right, that keeps the canvas usable at every width.
//
// The pane takes a column of its own only while the canvas keeps its floor
// beside it; below that it lies OVER the canvas's right edge. Either way it
// can be folded to a slim rail and unfolded again, so a reader on a laptop
// can look at the card they selected without closing what they opened.
//
// Before this, the Activity panel gave its node pane a fixed 340 px column
// down to a 580 px panel: at 1280×720 that left the canvas a 240 px sliver
// with the selected card hidden behind the pane (realtime-examples NFR #173).
// The widths are the layout's own geometry and live here, so a page never
// writes them as inline styles.

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon } from '../ui/Icons';
import { useMeasuredWidth } from '../doc-editor/useMeasuredWidth';
import { CanvasPaneInsetContext } from './canvasPaneInset';

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
export const CANVAS_PANE_RAIL_PX = 36;
/** An overlay always leaves at least this much canvas showing to its left. */
const OVERLAY_GUTTER_PX = 48;

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/** Pure: where the pane goes, and how wide, in a layout this wide. */
export function canvasPaneGeometry(width: number, options: CanvasPaneGeometryOptions = {}): CanvasPaneGeometry {
  const { paneMinPx = 280, paneMaxPx = 380, paneFraction = 0.3, canvasMinPx = 480 } = options;
  const paneWidth = Math.round(clamp(width * paneFraction, paneMinPx, Math.max(paneMinPx, paneMaxPx)));
  if (width - paneWidth >= canvasMinPx) return { placement: 'column', paneWidth, canvasWidth: width - paneWidth };
  const overlayWidth = Math.max(0, Math.min(paneWidth, width - OVERLAY_GUTTER_PX));
  return { placement: 'overlay', paneWidth: overlayWidth, canvasWidth: width - overlayWidth };
}

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

export function CanvasPaneLayout({
  children,
  pane,
  collapsed: collapsedProp,
  onCollapsedChange,
  expandKey,
  paneLabel = 'details',
  width: fixedWidth,
  className,
  'data-testid': testId = 'canvas-pane-layout',
  ...geometryOptions
}: CanvasPaneLayoutProps) {
  const measured = useMeasuredWidth<HTMLDivElement>();
  const width = fixedWidth ?? measured.width;
  const [ownCollapsed, setOwnCollapsed] = useState(false);
  const collapsed = collapsedProp ?? ownCollapsed;
  const setCollapsed = (next: boolean) => {
    if (collapsedProp === undefined) setOwnCollapsed(next);
    onCollapsedChange?.(next);
  };
  // A different item opened while folded: show it.
  const lastKey = useRef(expandKey);
  useEffect(() => {
    if (Object.is(lastKey.current, expandKey)) return;
    lastKey.current = expandKey;
    if (collapsed) setCollapsed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandKey]);

  const open = pane !== null && pane !== undefined && pane !== false;
  // Before the first measurement, treat the layout as wide: one frame of a
  // column is better than a pane that jumps from overlay to column.
  const geometry = canvasPaneGeometry(width ?? Number.POSITIVE_INFINITY, geometryOptions);
  const placement: CanvasPanePlacement = !open ? 'none' : collapsed ? 'collapsed' : geometry.placement;
  const paneWidth = Number.isFinite(geometry.paneWidth) ? geometry.paneWidth : geometryOptions.paneMaxPx ?? 380;
  // An overlay covers the canvas's right edge; tell the canvas how much, so
  // it pans a selected item into the part left showing.
  const insetRight = placement === 'overlay' ? paneWidth : 0;
  const inset = useMemo(() => ({ right: insetRight }), [insetRight]);
  const hide = `Hide ${paneLabel}`;
  const show = `Show ${paneLabel}`;

  return (
    <div
      ref={measured.ref}
      data-testid={testId}
      data-placement={placement}
      className={cn('relative flex min-h-0 min-w-0 flex-1', className)}
    >
      <div data-testid={`${testId}-canvas`} className="flex min-h-0 min-w-0 flex-1 flex-col">
        <CanvasPaneInsetContext.Provider value={inset}>{children}</CanvasPaneInsetContext.Provider>
      </div>
      {placement === 'collapsed' && (
        <div
          data-testid={`${testId}-rail`}
          className="flex shrink-0 flex-col items-center border-l border-border bg-surface-panel pt-2"
          style={{ width: CANVAS_PANE_RAIL_PX }}
        >
          <IconButton
            aria-label={show}
            title={show}
            variant="ghost"
            size="sm"
            icon={<ChevronIcon dir="left" size={14} />}
            onClick={() => setCollapsed(false)}
            data-testid={`${testId}-expand`}
          />
        </div>
      )}
      {(placement === 'column' || placement === 'overlay') && (
        <div
          data-testid={`${testId}-pane`}
          data-placement={placement}
          className={cn(
            // The pane brings its own edge and background; the layout adds
            // only what an overlay needs to read as lying on top.
            'flex min-h-0 flex-col',
            placement === 'column' ? 'relative shrink-0' : 'absolute inset-y-0 right-0 z-10 bg-surface shadow-lg',
          )}
          style={{ width: paneWidth }}
        >
          <IconButton
            aria-label={hide}
            title={hide}
            variant="outline"
            size="sm"
            icon={<ChevronIcon dir="right" size={12} />}
            onClick={() => setCollapsed(true)}
            className="absolute -left-3 top-1/2 z-20 h-6 w-6 -translate-y-1/2 rounded-full shadow-sm"
            data-testid={`${testId}-collapse`}
          />
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{pane}</div>
        </div>
      )}
    </div>
  );
}

export default CanvasPaneLayout;
