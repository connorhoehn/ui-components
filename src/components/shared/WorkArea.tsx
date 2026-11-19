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
//
// ## A floating footer (2.539.0)
//
// `footerPlacement="float"` lays the footer OVER the bottom of the body
// instead of under it: the page scrolls beneath a floating composer (a
// FloatingComposerDock with its fade) rather than stopping at a pinned row.
// The work area measures the footer with a ResizeObserver into
// `--dock-height` on the body's region and ends the body with a spacer of that
// height, so the last row can always be scrolled clear of the footer whatever
// padding the host gives the body. The footer layer is click-through
// (`pointer-events-none`, inherited); its content opts back in with
// `pointer-events-auto` (FloatingComposerDock's dock does). Inside it a
// FloatingComposerDock keeps its overlay look but sits in the layer's flow,
// so the measured height is the dock's.

import { createContext, useContext, useLayoutEffect, useRef, type ReactNode } from 'react';
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
  /**
   * `pinned` (default): the footer is a row under the body. `float`: it floats
   * over the body's bottom, the body scrolls under it and ends with a spacer of
   * the footer's measured height (`--dock-height`). The floating layer is
   * click-through; its content opts in with `pointer-events-auto`.
   */
  footerPlacement?: 'pinned' | 'float';
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

const FloatingFooterContext = createContext(false);

/** Whether this component renders inside a WorkArea's floating footer (`footerPlacement="float"`). */
export function useInFloatingFooter(): boolean {
  return useContext(FloatingFooterContext);
}

/** The CSS variable a floating footer's measured height is written to. */
export const WORKAREA_DOCK_HEIGHT_VAR = '--dock-height';

export function WorkArea({
  breadcrumbs,
  toolbar,
  children,
  status,
  footer,
  footerPlacement = 'pinned',
  padded = true,
  tone = 'surface',
  className,
  bodyClassName,
  'data-testid': testId,
}: WorkAreaProps) {
  const palette = TONE[tone];
  const floating = !!footer && footerPlacement === 'float';
  const regionRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const region = regionRef.current;
    const layer = footerRef.current;
    if (!floating || !region || !layer) return;
    const write = (h: number) => region.style.setProperty(WORKAREA_DOCK_HEIGHT_VAR, `${Math.ceil(h)}px`);
    write(layer.getBoundingClientRect().height);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(([entry]) => {
        if (entry) write(entry.target.getBoundingClientRect().height);
      });
      ro.observe(layer);
    }
    return () => {
      ro?.disconnect();
      region.style.removeProperty(WORKAREA_DOCK_HEIGHT_VAR);
    };
  }, [floating]);

  const body = (
    <div className={cn('min-h-0 flex-1 overflow-auto', padded && 'p-[var(--ui-page-gutter,1.5rem)]', bodyClassName)}>
      {children}
      {floating && <div aria-hidden className="h-[var(--dock-height,0px)] shrink-0" data-workarea-dock-spacer="" />}
    </div>
  );

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
      {floating ? (
        <div ref={regionRef} className="relative flex min-h-0 flex-1 flex-col" data-workarea-float-region="">
          {body}
          <div
            ref={footerRef}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 min-w-0"
            data-workarea-footer=""
            data-placement="float"
          >
            <FloatingFooterContext.Provider value>{footer}</FloatingFooterContext.Provider>
          </div>
        </div>
      ) : (
        body
      )}
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
      {footer && !floating && <div className="min-w-0 shrink-0" data-workarea-footer>{footer}</div>}
    </div>
  );
}

export default WorkArea;
