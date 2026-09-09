// SplitPane — two regions side by side with a divider the person can drag.
//
// Why this exists: "open the document beside the chat" needs a primary pane
// (the conversation) and a secondary one (the page), and a fixed 50/50 is the
// wrong answer for both — a chat wants a column, a document wants width, and
// which matters more changes mid-conversation. The library had layouts for a
// rail (`RailLayout`, `ExplorerLayout`) and for video (`HangoutLayout`) but
// nothing where the person decides the split. So: a divider that drags, and
// that a keyboard can nudge.
//
// ## What it deliberately does not do
//
// It does not persist the size — `onSizeChange` hands the number to the host,
// which knows what key it belongs under (per conversation? per user?). And it
// does not collapse: pass `secondary={null}` and the primary takes the room;
// a collapse affordance is the host's, because the host knows what "close the
// document" means.
//
// ## Accessibility
//
// The divider is `role="separator"` with `aria-orientation="vertical"` and
// `aria-valuenow` as the primary pane's percentage; ArrowLeft/ArrowRight move
// it by 2%, Shift by 10%, Home/End to the limits. Pointer events (not mouse
// events) so a touch or pen drags too.

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface SplitPaneProps {
  primary: ReactNode;
  /** The second pane. `null` renders only the primary, no divider. */
  secondary: ReactNode | null;
  /** Primary pane width as a fraction of the whole, 0–1. Default 0.55. */
  defaultRatio?: number;
  /** Controlled ratio; when given, `onRatioChange` must move it. */
  ratio?: number;
  onRatioChange?: (ratio: number) => void;
  /** Smallest each pane may get, in px. Defaults 280 / 360. */
  minPrimaryPx?: number;
  minSecondaryPx?: number;
  /** Names the divider for assistive tech, e.g. "Resize conversation and document". */
  dividerLabel?: string;
  className?: string;
  'data-testid'?: string;
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export function SplitPane({
  primary,
  secondary,
  defaultRatio = 0.55,
  ratio: controlled,
  onRatioChange,
  minPrimaryPx = 280,
  minSecondaryPx = 360,
  dividerLabel = 'Resize panes',
  className,
  'data-testid': testId = 'split-pane',
}: SplitPaneProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [own, setOwn] = useState(defaultRatio);
  const ratio = controlled ?? own;
  const dragging = useRef(false);

  const setRatio = useCallback((next: number) => {
    const root = rootRef.current;
    const width = root?.getBoundingClientRect().width ?? 0;
    // Pixel floors win over the fraction: a pane you cannot use is not a pane.
    const lo = width > 0 ? minPrimaryPx / width : 0.15;
    const hi = width > 0 ? 1 - minSecondaryPx / width : 0.85;
    // Three decimals: enough for a pixel at any width, and no 0.42000000000000004
    // leaking into a host's persisted value or a test's expectation.
    const clamped = Math.round(clamp(next, Math.min(lo, hi), Math.max(lo, hi)) * 1000) / 1000;
    if (controlled === undefined) setOwn(clamped);
    onRatioChange?.(clamped);
  }, [controlled, minPrimaryPx, minSecondaryPx, onRatioChange]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setRatio((e.clientX - rect.left) / rect.width);
  };
  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* already released */ }
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 0.1 : 0.02;
    if (e.key === 'ArrowLeft') { e.preventDefault(); setRatio(ratio - step); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); setRatio(ratio + step); }
    else if (e.key === 'Home') { e.preventDefault(); setRatio(0); }
    else if (e.key === 'End') { e.preventDefault(); setRatio(1); }
  };

  // A window that shrinks under a fixed ratio can push a pane below its floor;
  // re-clamp on resize so the floors hold.
  useEffect(() => {
    const onResize = () => setRatio(ratio);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [ratio, setRatio]);

  if (secondary === null || secondary === undefined) {
    return (
      <div ref={rootRef} data-testid={testId} className={cn('flex h-full min-h-0 min-w-0', className)}>
        <div data-testid={`${testId}-primary`} className="flex min-h-0 min-w-0 flex-1 flex-col">{primary}</div>
      </div>
    );
  }

  const pct = Math.round(ratio * 1000) / 10;
  return (
    <div ref={rootRef} data-testid={testId} className={cn('flex h-full min-h-0 min-w-0', className)}>
      {/* Widths are the one thing here that has to be computed, so they are the
          one place a style attribute is right: there is no class for 55.0%. */}
      <div data-testid={`${testId}-primary`} className="flex min-h-0 min-w-0 flex-col" style={{ flexBasis: `${pct}%`, flexGrow: 0, flexShrink: 0 }}>
        {primary}
      </div>
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label={dividerLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        tabIndex={0}
        data-testid={`${testId}-divider`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        className="group relative w-2 shrink-0 cursor-col-resize select-none touch-none bg-transparent outline-none focus-visible:bg-primary/20"
      >
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border transition-colors group-hover:bg-primary group-focus-visible:bg-primary" />
      </div>
      <div data-testid={`${testId}-secondary`} className="flex min-h-0 min-w-0 flex-1 flex-col">
        {secondary}
      </div>
    </div>
  );
}

export default SplitPane;
