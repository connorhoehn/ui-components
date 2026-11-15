// AmbientSurface — a region that reads as its own place: a quiet surface
// (slightly grey, recessed in the dark theme) and, behind its content, a
// faint field of soft dots that drifts very slowly. For a panel that should
// have presence without competing with what is in it, such as a live
// conversation docked beside a page. Since 2.527.0.
//
// The field is decoration only: `aria-hidden`, `pointer-events: none`, painted
// under the content (an isolated stacking context, the field at z-index -1),
// and low contrast at every point so text over it keeps its contrast. The
// drift is one compositor transform on a layer clipped to the box, so it never
// widens the page and costs a few frames' work, not a repaint per frame. It
// stops under `prefers-reduced-motion`, with `paused`, and on its own when the
// surface is hidden (`display: none` runs no animation) or the tab is not
// visible (the browser renders no frames). The styles are in
// `styles/ambientSurface.css`, shipped in `styles.css`.

import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../lib/cn';

export interface AmbientSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  /** `'muted'` (default): the slightly grey surface between the panel and workspace tokens. `'plain'`: no surface of its own. */
  tone?: 'muted' | 'plain';
  /** `'drift'` (default): soft dots drifting slowly. `'dots'`: the same field, still. `'none'`: the surface alone. */
  effect?: 'drift' | 'dots' | 'none';
  /** Hold the drift where it is (an inactive panel, a host's own motion setting). */
  paused?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export function AmbientSurface({ tone = 'muted', effect = 'drift', paused = false, className, children, ref, ...rest }: AmbientSurfaceProps) {
  return (
    <div
      ref={ref}
      data-ambient-surface=""
      data-tone={tone}
      data-effect={effect}
      data-paused={paused ? 'true' : undefined}
      className={cn('uic-ambient-surface', className)}
      {...rest}
    >
      {effect !== 'none' && (
        <span aria-hidden data-testid="ambient-surface-field" className="uic-ambient-field">
          <span className="uic-ambient-dots" />
        </span>
      )}
      {children}
    </div>
  );
}

export default AmbientSurface;
