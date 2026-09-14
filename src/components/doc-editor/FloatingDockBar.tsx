// ui-components/src/components/doc-editor/FloatingDockBar.tsx
//
// A home for the call along the bottom edge of a page.
//
// VideoDockSlot is a place IN the page — a gutter column that reserves its
// width whether or not a call is in it, with a dashed prompt while empty.
// This is the other kind of place: nothing at all until the call is docked
// here, then a bar floating over the page's bottom edge, above its content
// and out of its flow. A document keeps its width; a diagram keeps its
// canvas; the people are along the bottom where the operator asked for them.
//
// Only a host. The row inside (CallTileRow) is the host's to portal in, the
// same way VideoDockSlot takes the live widget as children.
//
// How the call gets here: by being DRAGGED. While the widget is being moved
// the host passes `ghost`, and the bar draws a dashed band along the bottom
// edge that names itself; the widget's pointer-drag hit-tests
// `data-call-dock-target` on release and docks. A menu of destinations was
// the first version and the operator was right that it is the wrong shape —
// a place on the page should be found by moving the thing toward it.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface FloatingDockBarProps {
  /** True while the caller has portaled the live call into `children`. */
  docked: boolean;
  /**
   * True while the call is being DRAGGED somewhere. Not docked here, the bar
   * shows a ghost of itself — a dashed band along the bottom edge, named —
   * so the reader can see where the call would land and let go over it.
   * Nothing renders when neither `docked` nor `ghost`.
   */
  ghost?: boolean;
  /**
   * The dock id the widget's pointer-drag hit-tests for. Published on the
   * ghost as `data-call-dock-target`, which is what the widget reads on
   * release; the ghost lights up while the widget is over it.
   */
  dockId?: string;
  /** What the ghost says. */
  ghostLabel?: string;
  /** Names the region for screen readers. */
  label?: string;
  /** Distance from the bottom edge, in px. Default 16. */
  bottomOffset?: number;
  className?: string;
  children?: ReactNode;
  'data-testid'?: string;
}

export default function FloatingDockBar({
  docked,
  ghost = false,
  dockId,
  ghostLabel = 'Drop the call here',
  label = 'Call, along the bottom of the page',
  bottomOffset = 16,
  className,
  children,
  'data-testid': testId = 'floating-dock-bar',
}: FloatingDockBarProps) {
  if (!docked && ghost && dockId) {
    return (
      <div
        className={cn('pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4', className)}
        style={{ bottom: bottomOffset }}
        data-testid={`${testId}-ghost`}
      >
        {/* Wide enough that a dragged widget overlaps it without aiming; the
            hit-test picks the target with the most overlap, so a generous
            band beats a precise one. */}
        <div
          className={cn(
            'pointer-events-auto flex h-28 w-full max-w-3xl items-center justify-center rounded-2xl border-2 border-dashed',
            'border-primary/40 bg-primary/5 text-sm font-medium text-text-secondary backdrop-blur-[2px] transition-colors duration-150',
            'data-[pointer-over=true]:border-primary data-[pointer-over=true]:bg-primary/15 data-[pointer-over=true]:text-text-primary',
          )}
          data-call-dock-target={dockId}
          role="region"
          aria-label={ghostLabel}
        >
          {ghostLabel}
        </div>
      </div>
    );
  }
  if (!docked) return null;
  return (
    // The outer band spans the viewport width and lets clicks through; only
    // the bar itself takes the pointer. Fixed, not sticky: a document scrolls
    // its own pane, and the bar must stay put while it does.
    <div
      className={cn('pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4', className)}
      style={{ bottom: bottomOffset }}
      role="region"
      aria-label={label}
      data-testid={testId}
    >
      {/* Only what is IN the bar takes the pointer: the body is as wide as its
          content, so the page's own bottom edge — a canvas's zoom control,
          a scrollbar — stays clickable either side of the people. */}
      <div className="pointer-events-auto flex max-w-full justify-center" data-testid={`${testId}-body`}>
        {children}
      </div>
    </div>
  );
}
