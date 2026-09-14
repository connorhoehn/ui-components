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

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface FloatingDockBarProps {
  /** True while the caller has portaled the live call into `children`. Nothing renders otherwise. */
  docked: boolean;
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
  label = 'Call, along the bottom of the page',
  bottomOffset = 16,
  className,
  children,
  'data-testid': testId = 'floating-dock-bar',
}: FloatingDockBarProps) {
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
      <div className="pointer-events-auto w-full max-w-5xl" data-testid={`${testId}-body`}>
        {children}
      </div>
    </div>
  );
}
