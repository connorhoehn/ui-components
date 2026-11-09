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
//
// ## Narrow width (since 2.515.1)
//
// With `narrow`, the frame is its own size container and under 40rem (640px)
// of its own width the rail and the pane stop sitting side by side: one of
// them fills the width. `showing: 'list'` draws the pane header (the trail,
// the title) over the rail, which becomes the list; `showing: 'record'` hides
// the rail and draws a back control over the pane header. A container query,
// not a measurement: the first paint is already right, and a phone, a split
// window and a narrow side-pane layout all read the same width. Not with
// `railResize` (a split pane keeps its divider).

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { WorkspaceRail, WORKSPACE_RAIL_BACK_CLASS, type WorkspaceRailBack } from './WorkspaceRail';
import { ChevronIcon } from '../ui/Icons';
import { SplitPane } from './SplitPane';
import { IconButton } from '../ui/IconButton';
import { MaximizeIcon } from '../ui/Icons';
import { Tooltip } from '../shared/Tooltip';

export interface ExplorerLayoutProps {
  /** Left rail — flush to the pane's left edge, its own border, scrolls independently. */
  rail: ReactNode;
  /** The main pane. */
  children: ReactNode;
  /** Optional right-hand context bar. Stacks below the pane under `2xl`, sits beside it at `2xl` and up. */
  aside?: ReactNode;
  /**
   * Rail width. `md` is the 300px agentcore measured against; `xs` is 220px,
   * the Org rail's own width (SubNavLayout's default), for a documents rail
   * that should sit at it (since 2.407.33); `sm` is 240px for
   * a shallower tree; `lg` is 368px for a two-line work list with its toolbar
   * (the Documents Work column, measured against the redesign's 370px); `ms`
   * is 264px for a one-line title list (the Initiatives v2 rail, since 2.392.0).
   */
  railWidth?: 'xs' | 'sm' | 'ms' | 'md' | 'ml' | 'lg';
  /** Opt-in adjustable rail. Width is remembered in pixels when a storage key is supplied. */
  railResize?: { minPx?: number; maxPx?: number; storageKey?: string };
  /**
   * A band ABOVE all three columns — a scope header (breadcrumb, title, stats,
   * tabs) that names what the rail, the pane and the aside are all looking at.
   * It does not scroll; the columns below it keep their independent scrolling.
   * Since 2.385.0.
   */
  header?: ReactNode;
  /**
   * A band over the PANE only — a crumb trail with the scope's controls
   * ("Build › Distillation › Knowledge" · All repositories · Open Library).
   * Unlike `header` it spans neither the rail (so the rail's own title keeps
   * the top-left corner) nor the aside (so the aside's top row — a
   * `ContextColumn`'s tabs — keeps the top of its own column). It does not
   * scroll; the pane below it does. No border of its own: it reads as the top
   * of the pane. Since 2.389.0; spans only the pane since 2.389.4 (it spanned
   * pane + aside, and `ScopeHeader variant="crumbs"` controls, which hang
   * into the record head below the band, landed on the aside's top row).
   */
  paneHeader?: ReactNode;
  /**
   * A band UNDER the pane only — a docked composer that must stay put while
   * the pane scrolls. It does not scroll; the pane above it does. It spans
   * the pane's column, never the rail or the aside (the same rule as
   * `paneHeader`), and has no border of its own. Since 2.390.0.
   */
  paneFooter?: ReactNode;
  /** A count beside `railTitle` ("Work 11"). Since 2.385.0. */
  railCount?: number;
  /** How `railCount` reads — see `WorkspaceRail.countStyle`. Default `chip`. Since 2.390.0. */
  railCountStyle?: 'chip' | 'plain';
  /**
   * A back link over the rail's title — "‹ Initiatives" above "Work 11". See
   * `WorkspaceRail.back`. Since 2.390.0.
   */
  railBack?: WorkspaceRailBack | null;
  /** The rail's heading style — see `WorkspaceRail.heading`. Default `compact`. Since 2.385.0. */
  railHeading?: 'compact' | 'prominent' | 'label' | 'caption';
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
  /**
   * The narrow form (since 2.515.1): under 40rem of the frame's own width one
   * of rail and pane fills it. See `ExplorerNarrow`. Omitted, the rail and the
   * pane sit side by side at every width (unchanged). Ignored with `railResize`.
   */
  narrow?: ExplorerNarrow;
  className?: string;
  'data-testid'?: string;
}

/** What `ExplorerLayout` (and `ListRailLayout`, `MasterDetailPage`) show under 40rem of their own width. Since 2.515.1. */
export interface ExplorerNarrow {
  /**
   * `list`: the pane header, then the rail at the full width (the pane body,
   * its footer and the aside are hidden). `record`: the rail is hidden; the
   * pane fills the width under a back control (the aside stacks under it).
   * The host derives it from its selection: a record open → `record`.
   */
  showing: 'list' | 'record';
  /** The back control's action in `record` (open the list: clear the selection, route to the list). */
  onBack: () => void;
  /** The back control's words. Default "Back to the list". */
  backLabel?: string;
}

// The narrow form's classes are written out whole (`@max-[40rem]:…`, the
// library's narrow-pane step): a consumer's Tailwind scan reads literal class
// names in dist, never a prefix joined at run time.

export function ExplorerLayout({
  rail,
  children,
  aside,
  railWidth = 'md',
  railResize,
  header,
  paneHeader,
  paneFooter,
  railCount,
  railCountStyle,
  railBack,
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
  narrow: narrowProp,
  className,
  'data-testid': testId = 'explorer-layout',
}: ExplorerLayoutProps) {
  const narrow = railResize ? undefined : narrowProp;
  const list = narrow?.showing === 'list';
  const record = narrow?.showing === 'record';
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameWidth, setFrameWidth] = useState(0);
  const baseWidth = { xs: 220, sm: 240, ms: 264, md: 300, ml: 320, lg: 368 }[railWidth];
  const minWidth = railResize?.minPx ?? 260;
  const maxWidth = railResize?.maxPx ?? 560;
  const [preferredWidth, setPreferredWidth] = useState(() => {
    try {
      const saved = railResize?.storageKey ? Number(localStorage.getItem(railResize.storageKey)) : NaN;
      return Number.isFinite(saved) && saved > 0 ? Math.max(minWidth, Math.min(maxWidth, saved)) : baseWidth;
    } catch { return baseWidth; }
  });
  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame || !railResize) return;
    const update = () => setFrameWidth(frame.getBoundingClientRect().width);
    update();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
    observer?.observe(frame);
    return () => observer?.disconnect();
  }, [!!railResize]);
  const limit = frameWidth > 0 ? Math.min(maxWidth, Math.max(minWidth, frameWidth - 480)) : maxWidth;
  const drawnWidth = railCollapsed ? 36 : Math.min(limit, Math.max(minWidth, preferredWidth));
  const resize = (width: number) => {
    const next = Math.round(Math.min(limit, Math.max(minWidth, width)));
    setPreferredWidth(next);
    try { if (railResize?.storageKey) localStorage.setItem(railResize.storageKey, String(next)); } catch { /* Optional device memory. */ }
  };
  const wide = drawnWidth > baseWidth + 20;
  const resizeAction = railResize && <Tooltip content={wide ? `Reset ${railLabel} width` : `Widen ${railLabel}`}>
    <IconButton variant="ghost" size="sm" icon={<MaximizeIcon size={14} />}
      aria-label={wide ? `Reset ${railLabel} width` : `Widen ${railLabel}`}
      aria-pressed={wide} onClick={() => resize(wide ? baseWidth : limit)} data-testid={`${testId}-widen`} />
  </Tooltip>;
  const pane = (
    <div
      data-testid={`${testId}-pane`}
      className={cn(
        'flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto bg-surface',
        // Same page gutter token as AppShell / WorkArea / SubNavLayout.
        panePadding === 'md' && 'p-[var(--ui-page-gutter,1.5rem)]',
        list && '@max-[40rem]:hidden',
      )}
    >
      {children}
    </div>
  );

  const backRow = record ? (
    <div className={cn('flex shrink-0 items-center bg-surface px-[var(--ui-page-gutter,1.5rem)] pt-3', '@min-[40rem]:hidden')} data-testid={`${testId}-narrow-back-row`}>
      <button data-ui-part="" type="button" onClick={narrow!.onBack} className={cn(WORKSPACE_RAIL_BACK_CLASS, 'text-sm')} data-testid={`${testId}-narrow-back`}>
        <ChevronIcon dir="left" size={14} />
        {narrow!.backLabel ?? 'Back to the list'}
      </button>
    </div>
  ) : null;
  const columns = (
      <div className={cn('flex min-h-0 min-w-0 flex-1', asidePlacement === 'beside' ? 'flex-row' : 'flex-col 2xl:flex-row',
        list && '@max-[40rem]:order-first @max-[40rem]:flex-none', record && '@max-[40rem]:flex-col')}
        {...(narrow ? { 'data-narrow-part': 'pane' } : {})}>
        {paneHeader != null || paneFooter != null || backRow ? (
          // The band sits over the pane alone. Its right-hand controls may
          // hang into the top of the pane's own content (the record head's
          // top padding) — that is the pane's space, never the aside's.
          <div className="flex min-h-0 min-w-0 flex-1 flex-col" data-testid={`${testId}-pane-column`}>
            {backRow}
            {paneHeader != null && <div data-testid={`${testId}-pane-header`} className="shrink-0 bg-surface">{paneHeader}</div>}
            {pane}
            {paneFooter != null && <div data-testid={`${testId}-pane-footer`} className={cn('shrink-0 bg-surface', list && '@max-[40rem]:hidden')}>{paneFooter}</div>}
          </div>
        ) : pane}
        {aside ? (
          // The aside owns its own width and chrome (a ContextColumn, or any
          // block the host wants beside the pane); this only places it.
          <aside
            data-testid={`${testId}-aside`}
            data-placement={asidePlacement}
            className={cn(
              'flex min-h-0',
              asidePlacement === 'beside' ? 'flex-shrink-0' : 'border-t border-border 2xl:flex-shrink-0 2xl:border-t-0',
              list && '@max-[40rem]:hidden',
            )}
          >
            {aside}
          </aside>
        ) : null}
      </div>
  );

  const railNode = <WorkspaceRail title={railTitle} label="Explorer" actions={railResize ? <>{railActions}{resizeAction}</> : railActions} header={railHeader} footer={railFooter}
        width={railWidth} {...(typeof railCount === 'number' ? { count: railCount } : {})} heading={railHeading}
        className={railResize ? 'w-full' : list ? '@max-[40rem]:h-auto @max-[40rem]:w-full @max-[40rem]:flex-1 @max-[40rem]:border-r-0' : record ? '@max-[40rem]:hidden' : undefined}
        {...(railCountStyle ? { countStyle: railCountStyle } : {})} {...(railBack ? { back: railBack } : {})} collapsed={railCollapsed} onToggle={onToggleRail}
        toggleLabel={`${railCollapsed ? 'Show' : 'Hide'} ${railLabel}`} data-testid={`${testId}-rail`}>
        {rail}
      </WorkspaceRail>;
  const frame = (
    <div ref={frameRef} data-testid={testId} className={cn('flex h-full min-h-0', header ? 'min-w-0 flex-1' : className, narrow && '@max-[40rem]:flex-col')}
      {...(narrow ? { 'data-narrow': narrow.showing } : {})}>
      {railResize ? <SplitPane primary={railNode} secondary={columns} className="min-w-0 flex-1"
        ratio={frameWidth > 0 ? drawnWidth / frameWidth : 0.25} onRatioChange={ratio => resize(ratio * frameWidth)}
        minPrimaryPx={minWidth} minSecondaryPx={480} resizable={!railCollapsed}
        dividerLabel={`Resize ${railLabel}`} data-testid={`${testId}-rail-split`} /> : <>{railNode}{columns}</>}
    </div>
  );

  // The narrow form's size container: the frame's own classes query it, so it wraps the frame.
  const contain = (node: ReactNode) => narrow
    ? <div className="@container flex h-full min-h-0 min-w-0 flex-1 flex-col" data-testid={`${testId}-container`}>{node}</div>
    : node;
  if (!header) return <>{contain(frame)}</>;
  // The header spans every column; the frame below it takes what is left and
  // keeps its own height chain (`min-h-0` so its columns, not the page, scroll).
  return (
    <div data-testid={`${testId}-with-header`} className={cn('flex h-full min-h-0 flex-col', className)}>
      <div data-testid={`${testId}-header`} className="shrink-0 border-b border-border bg-surface-panel">
        {header}
      </div>
      <div className="flex min-h-0 flex-1">{contain(frame)}</div>
    </div>
  );
}

export default ExplorerLayout;
