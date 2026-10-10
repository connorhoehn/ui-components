// CursorOverlay — remote pointers drawn over arbitrary content.
//
// Unlike CursorCanvas (a bounded demo surface that owns its own label and
// background), this wraps whatever the host already renders — a canvas, a
// document page, a board — and layers one labelled pointer per remote user on
// top. It optionally reports the local pointer so the host can publish it.
//
// Positions are runtime data, so left/top stay inline (allow-listed). Colours
// are user-distinguishing DATA (sent over the wire by the cursor service as
// `userColor`), so they are literal hexes by the repo's colour rules; with no
// colour supplied one is derived from the id with the same palette Avatar uses.

import type { PointerEvent, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { identityToColor, identityToInitials } from '../../utils/identity';

export type CursorCoordinates = 'pixels' | 'fraction';

export interface CursorOverlayEntry {
  clientId: string;
  /** Horizontal position in `coordinates` units. */
  x: number;
  y: number;
  /** Name shown beside the pointer. Falls back to the id. */
  label?: string;
  /** Literal user colour (data, not a token). Falls back to a hash of the id. */
  color?: string;
}

export interface CursorOverlayProps {
  cursors: readonly CursorOverlayEntry[];
  /**
   * `'pixels'` (default): x/y are offsets from the container's top-left.
   * `'fraction'`: 0..1 of its width/height, so collaborators with different
   * viewport sizes see the pointer over the same content.
   */
  coordinates?: CursorCoordinates;
  /** Local pointer movement, in the same units as `cursors`. */
  onMove?: (x: number, y: number) => void;
  children?: ReactNode;
  className?: string;
}

export function CursorOverlay({
  cursors,
  coordinates = 'pixels',
  onMove,
  children,
  className,
}: CursorOverlayProps) {
  const fractional = coordinates === 'fraction';

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!onMove) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (!fractional) return onMove(x, y);
    if (rect.width <= 0 || rect.height <= 0) return;
    const clamp = (n: number) => Math.min(1, Math.max(0, n));
    onMove(clamp(x / rect.width), clamp(y / rect.height));
  }

  return (
    <div
      data-testid="cursor-overlay"
      className={cn('relative', className)}
      onPointerMove={onMove ? handlePointerMove : undefined}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
        data-testid="cursor-overlay-layer"
      >
        {cursors.map((c) => {
          if (!Number.isFinite(c.x) || !Number.isFinite(c.y)) return null;
          const name = c.label ?? c.clientId;
          const color = c.color ?? identityToColor(name);
          return (
            <div
              key={c.clientId}
              data-testid="cursor-overlay-pointer"
              data-client-id={c.clientId}
              className="absolute select-none"
              style={{
                left: fractional ? `${c.x * 100}%` : c.x,
                top: fractional ? `${c.y * 100}%` : c.y,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill={color} className="drop-shadow">
                <path d="M1 1l5.5 14 2-5.5L14 7.5z" stroke="white" strokeWidth="1" strokeLinejoin="round" />
              </svg>
              <span
                data-testid="cursor-overlay-label"
                title={name}
                className="ml-3 -mt-1 inline-block max-w-[10rem] truncate rounded px-1.5 py-0.5 text-[10px] font-medium text-white shadow"
                style={{ background: color }}
              >
                {c.label ? c.label : identityToInitials(c.clientId)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
