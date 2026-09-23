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
import { WorkspaceRail } from './WorkspaceRail';

export interface ExplorerLayoutProps {
  /** Left rail — flush to the pane's left edge, its own border, scrolls independently. */
  rail: ReactNode;
  /** The main pane. */
  children: ReactNode;
  /** Optional right-hand context bar. Stacks below the pane under `2xl`, sits beside it at `2xl` and up. */
  aside?: ReactNode;
  /**
   * Rail width. `md` is the 300px agentcore measured against; `sm` is 240px for
   * a shallower tree; `lg` is 368px for a two-line work list with its toolbar
   * (the Documents Work column, measured against the redesign's 370px).
   */
  railWidth?: 'sm' | 'md' | 'ml' | 'lg';
  /**
   * A band ABOVE all three columns — a scope header (breadcrumb, title, stats,
   * tabs) that names what the rail, the pane and the aside are all looking at.
   * It does not scroll; the columns below it keep their independent scrolling.
   * Since 2.385.0.
   */
  header?: ReactNode;
  /** A count beside `railTitle` ("Work 11"). Since 2.385.0. */
  railCount?: number;
  /** The rail's heading style — see `WorkspaceRail.heading`. Default `compact`. Since 2.385.0. */
  railHeading?: 'compact' | 'prominent';
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
   * The rail's name, in its header row — the same row the fold control sits
   * in, so the rail is titled the way a `ContextColumn` on the other side is
   * (its tabs live in the same h-9 row). Without it the row holds only the
   * fold control, which reads as a stray button over the first section.
   */
  railTitle?: string;
  /**
   * Controls that belong to the rail as a whole — "new item", a filter —
   * placed in the header row between the title and the fold control. The
   * rail's own actions are not page chrome; putting them in a band above the
   * frame left them at the window's inset while the rail sat flush below.
   */
  railActions?: ReactNode;
  railHeader?: ReactNode;
  railFooter?: ReactNode;
  /**
   * `stack` (default): the aside stacks below the pane under `2xl` and sits
   * beside it from `2xl`. `beside`: always beside, at every width — for a pane
   * whose bottom row must be the window's (an editor with a pinned composer);
   * the host keeps the aside narrow (a `ContextColumn` strip) when space is
   * short. Since 2.365.0.
   */
  asidePlacement?: 'stack' | 'beside';
  /** Padding inside the main pane. `none` when the pane hosts its own full-bleed surface (an editor). */
  panePadding?: 'none' | 'md';
  className?: string;
  'data-testid'?: string;
}

export function ExplorerLayout({
  rail,
  children,
  aside,
  railWidth = 'md',
  header,
  railCount,
  railHeading = 'compact',
  railCollapsed = false,
  onToggleRail,
  railLabel = 'the list',
  railTitle,
  railActions,
  railHeader,
  railFooter,
  panePadding = 'md',
  asidePlacement = 'stack',
  className,
  'data-testid': testId = 'explorer-layout',
}: ExplorerLayoutProps) {
  const frame = (
    <div data-testid={testId} className={cn('flex h-full min-h-0', header ? 'min-w-0 flex-1' : className)}>
      <WorkspaceRail title={railTitle} label="Explorer" actions={railActions} header={railHeader} footer={railFooter}
        width={railWidth} {...(typeof railCount === 'number' ? { count: railCount } : {})} heading={railHeading} collapsed={railCollapsed} onToggle={onToggleRail}
        toggleLabel={`${railCollapsed ? 'Show' : 'Hide'} ${railLabel}`} data-testid={`${testId}-rail`}>
        {rail}
      </WorkspaceRail>
      <div className={cn('flex min-h-0 min-w-0 flex-1', asidePlacement === 'beside' ? 'flex-row' : 'flex-col 2xl:flex-row')}>
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
          // The aside owns its own width and chrome (a ContextColumn, or any
          // block the host wants beside the pane); this only places it.
          <aside
            data-testid={`${testId}-aside`}
            data-placement={asidePlacement}
            className={cn(
              'flex min-h-0',
              asidePlacement === 'beside' ? 'flex-shrink-0' : 'border-t border-border 2xl:flex-shrink-0 2xl:border-t-0',
            )}
          >
            {aside}
          </aside>
        ) : null}
      </div>
    </div>
  );

  if (!header) return frame;
  // The header spans every column; the frame below it takes what is left and
  // keeps its own height chain (`min-h-0` so its columns, not the page, scroll).
  return (
    <div data-testid={`${testId}-with-header`} className={cn('flex h-full min-h-0 flex-col', className)}>
      <div data-testid={`${testId}-header`} className="shrink-0 border-b border-border bg-surface-panel">
        {header}
      </div>
      <div className="flex min-h-0 flex-1">{frame}</div>
    </div>
  );
}

export default ExplorerLayout;
