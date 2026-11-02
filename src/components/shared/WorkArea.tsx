// WorkArea — the content column beside the rails.
//
//   ┌──────────────────────────────────────────────┐
//   │ Operate › Health › Runs › Invocation 4f2a…   │  breadcrumbs (fixed)
//   ├──────────────────────────────────────────────┤
//   │ [Replay] [Export]              [⟳] [24h ▾]   │  toolbar     (fixed)
//   ├──────────────────────────────────────────────┤
//   │                                              │
//   │  children                                    │  body (the ONLY scroller)
//   │                                              │
//   ├──────────────────────────────────────────────┤
//   │ 1,204 spans · projected 2m ago               │  status      (fixed)
//   └──────────────────────────────────────────────┘
//
// One scroll region, and it is the body. Every app that hand-rolls this gets
// it wrong the same way: the whole column scrolls, so scrolling a long table
// takes the breadcrumb trail and the toolbar off screen — the two rows whose
// entire job is to still be there when you are lost. `min-h-0` on the flex
// child is what actually makes the body scroll instead of the page; it is easy
// to omit and the failure looks like "the toolbar drifts".
//
// `padded` exists because nested layouts double-frame. A page that renders its
// own rails or a full-bleed canvas wants `padded={false}`; a plain content
// page wants the default. Deciding it HERE, once, beats every leaf page
// negotiating with its parent's padding.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import type { SurfaceTone } from './tones';

/** @see SurfaceTone — which colour family the work area paints in. */
export type WorkAreaTone = SurfaceTone;

export interface WorkAreaProps {
  /** The trail row. Usually a `<Breadcrumbs>`; renders nothing when omitted. */
  breadcrumbs?: ReactNode;
  /** The action row. Usually a `<Toolbar>`. Sits below the trail. */
  toolbar?: ReactNode;
  /** Scrolling page content. */
  children: ReactNode;
  /** Pinned bottom row — counts, freshness, a connection pill. */
  status?: ReactNode;
  /** Pinned full-width content, such as ComposerSurface. It owns its insets/background. */
  footer?: ReactNode;
  /** Comfortable padding around `children`. Off for canvases and nested rails. */
  padded?: boolean;
  tone?: WorkAreaTone;
  className?: string;
  /** Applied to the scrolling body, not the column. */
  bodyClassName?: string;
  'data-testid'?: string;
}

const TONE = {
  surface: {
    column: 'bg-surface-panel',
    divider: 'border-border',
    status: 'bg-surface text-text-tertiary',
  },
  code: {
    column: 'bg-code-bg',
    divider: 'border-code-border',
    status: 'bg-code-panel text-code-subtle',
  },
} as const;

export function WorkArea({
  breadcrumbs,
  toolbar,
  children,
  status,
  footer,
  padded = true,
  tone = 'surface',
  className,
  bodyClassName,
  'data-testid': testId,
}: WorkAreaProps) {
  const palette = TONE[tone];

  return (
    <div
      data-testid={testId}
      className={cn('flex h-full min-h-0 min-w-0 flex-1 flex-col', palette.column, className)}
    >
      {breadcrumbs && (
        <div
          className={cn(
            'flex flex-none items-center overflow-x-auto border-b px-3 py-1.5',
            palette.divider,
          )}
        >
          {breadcrumbs}
        </div>
      )}
      {toolbar}
      <div className={cn('min-h-0 flex-1 overflow-auto', padded && 'p-[var(--ui-page-gutter,1.5rem)]', bodyClassName)}>
        {children}
      </div>
      {status && (
        <div
          className={cn(
            'flex flex-none items-center gap-3 border-t px-3 py-1 text-[11px]',
            palette.divider,
            palette.status,
          )}
        >
          {status}
        </div>
      )}
      {footer && <div className="min-w-0 shrink-0" data-workarea-footer>{footer}</div>}
    </div>
  );
}

export default WorkArea;
