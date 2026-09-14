// ExplorerLayout — the three-pane document explorer frame: a left rail, a
// main pane, an optional right-hand aside.
//
// Why this exists: `RailLayout` (shared) renders its rail on the RIGHT, so it
// cannot express a file-explorer — tree on the left, document on the right —
// and two consuming apps (agentcore's `ExplorerFrame`, the assessment
// accelerator's `DocumentsExplorer`) each hand-rolled this frame and queued it
// for the library. This is that composite; agentcore's measured breakpoints
// are kept as they were measured, not re-derived.
//
// ## Height chain
//
// The frame is `h-full min-h-0`, so it fills exactly the space its parent gives
// it and the rail and pane each scroll INDEPENDENTLY. That only works when the
// parent has a definite height. A shell built on `min-height: 100vh` does not
// give one — wrap the frame in `ViewportFillRegion` there. `min-h-0` at every
// flex level is load-bearing: without it a flex item's default
// `min-height: auto` stretches to fit its content and the `overflow-y-auto`
// never engages.
//
// ## Where the aside goes
//
// Beside the pane only from `2xl` (1536px). At `xl` a 320px aside plus the
// 300px rail left the document under half the content width (measured 0.49 at
// 1472px); stacked below it the pane keeps ≥ 55%. At `2xl` the aside is 256px,
// not 320: with the rail's 300px that is 556px of fixed overhead against a
// content column that only grows, so the pane clears the 0.55 floor at the
// breakpoint's own minimum (732/1288 = 0.568) and improves from there.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { IconButton } from '../ui/IconButton';

export interface ExplorerLayoutProps {
  /** Left rail — flush to the pane's left edge, its own border, scrolls independently. */
  rail: ReactNode;
  /** The main pane. */
  children: ReactNode;
  /** Optional right-hand context bar. Stacks below the pane under `2xl`, sits beside it at `2xl` and up. */
  aside?: ReactNode;
  /** Rail width. `md` is the 300px agentcore measured against; `sm` is 240px for a shallower tree. */
  railWidth?: 'sm' | 'md';
  /**
   * The rail folded to a strip with one control that brings it back. For a
   * surface that wants the width — a diagram, a wide table — the list of
   * documents is worth giving up for a while. Controlled: the host owns the
   * state (and typically remembers it).
   */
  railCollapsed?: boolean;
  /** Present, the rail gets a fold control and the strip an unfold control. */
  onToggleRail?: () => void;
  /** What the rail holds, for the controls' accessible names. Default "the list". */
  railLabel?: string;
  /**
   * How much of the row the aside takes when it sits beside the pane. `md`
   * (256px) is a feed; `lg` (480px) is a conversation you are typing into.
   * Controlled, like the rail.
   */
  asideWidth?: 'md' | 'lg';
  /** Present, the aside gets a widen/narrow control. */
  onToggleAsideWidth?: () => void;
  /** Padding inside the main pane. `none` when the pane hosts its own full-bleed surface (an editor). */
  panePadding?: 'none' | 'md';
  className?: string;
  'data-testid'?: string;
}

const RAIL_WIDTH: Record<NonNullable<ExplorerLayoutProps['railWidth']>, string> = {
  sm: 'w-[240px]',
  md: 'w-[300px]',
};

const ASIDE_WIDTH: Record<NonNullable<ExplorerLayoutProps['asideWidth']>, string> = {
  md: '2xl:w-64',
  lg: '2xl:w-[30rem]',
};

/** A chevron pointing left (fold) or right (unfold), or the widen / narrow pair. */
function Glyph({ kind }: { kind: 'fold' | 'unfold' | 'widen' | 'narrow' }) {
  if (kind === 'widen' || kind === 'narrow') {
    return (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        {kind === 'widen'
          ? <path d="M6 4 2 8l4 4M10 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          : <path d="M2 4l4 4-4 4M14 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {kind === 'fold'
        ? <path d="M10 3 5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

export function ExplorerLayout({
  rail,
  children,
  aside,
  railWidth = 'md',
  railCollapsed = false,
  onToggleRail,
  railLabel = 'the list',
  asideWidth = 'md',
  onToggleAsideWidth,
  panePadding = 'md',
  className,
  'data-testid': testId = 'explorer-layout',
}: ExplorerLayoutProps) {
  return (
    <div data-testid={testId} className={cn('flex h-full min-h-0', className)}>
      {railCollapsed ? (
        // The strip: one control, and the rail's width goes to the pane.
        <nav
          data-testid={`${testId}-rail`}
          data-collapsed="true"
          aria-label="Explorer"
          className="flex h-full w-9 flex-shrink-0 flex-col items-center border-r border-border bg-surface-panel pt-1.5"
        >
          {onToggleRail && (
            <IconButton
              aria-label={`Show ${railLabel}`}
              title={`Show ${railLabel}`}
              size="sm"
              variant="ghost"
              icon={<Glyph kind="unfold" />}
              onClick={onToggleRail}
              data-testid={`${testId}-rail-unfold`}
            />
          )}
        </nav>
      ) : (
        <nav
          data-testid={`${testId}-rail`}
          data-collapsed="false"
          aria-label="Explorer"
          className={cn(
            'relative h-full flex-shrink-0 overflow-y-auto border-r border-border bg-surface-panel',
            RAIL_WIDTH[railWidth],
          )}
        >
          {onToggleRail && (
            // Over the rail's top-right corner rather than in a row of its
            // own: a header the rail does not otherwise have would cost the
            // list a line.
            <div className="absolute right-1 top-1 z-10">
              <IconButton
                aria-label={`Hide ${railLabel}`}
                title={`Hide ${railLabel}`}
                size="sm"
                variant="ghost"
                icon={<Glyph kind="fold" />}
                onClick={onToggleRail}
                data-testid={`${testId}-rail-fold`}
              />
            </div>
          )}
          {rail}
        </nav>
      )}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col 2xl:flex-row">
        <div
          data-testid={`${testId}-pane`}
          className={cn(
            'flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto bg-surface',
            panePadding === 'md' && 'px-8 py-6',
          )}
        >
          {children}
        </div>
        {aside ? (
          <aside
            data-testid={`${testId}-aside`}
            data-width={asideWidth}
            className={cn(
              'relative min-h-0 border-t border-border bg-surface-panel 2xl:flex-shrink-0 2xl:overflow-y-auto 2xl:border-l 2xl:border-t-0',
              ASIDE_WIDTH[asideWidth],
            )}
          >
            {onToggleAsideWidth && (
              <div className="absolute left-1 top-1 z-10 hidden 2xl:block">
                <IconButton
                  aria-label={asideWidth === 'lg' ? 'Narrow the side column' : 'Widen the side column'}
                  title={asideWidth === 'lg' ? 'Narrow the side column' : 'Widen the side column'}
                  size="sm"
                  variant="ghost"
                  icon={<Glyph kind={asideWidth === 'lg' ? 'narrow' : 'widen'} />}
                  onClick={onToggleAsideWidth}
                  data-testid={`${testId}-aside-width`}
                />
              </div>
            )}
            {aside}
          </aside>
        ) : null}
      </div>
    </div>
  );
}

export default ExplorerLayout;
