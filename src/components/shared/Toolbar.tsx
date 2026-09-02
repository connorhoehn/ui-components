// Toolbar — the chrome-level action row that sits above content.
//
//   ┌──────────────────────────────────────────────────────────┐
//   │ [Run] [Stop] │ [Filter ▾] [24h ▾]            [⟳] [⋯]     │
//   └──────────────────────────────────────────────────────────┘
//
// Not a page header. `PageHeader` names the thing you are looking at and
// carries the one or two actions that create it; a toolbar carries the verbs
// you apply to it repeatedly while you stay on the page — run, filter, change
// the window, refresh. Those belong to the SHELL, not the page body, which is
// why they need a row of their own that does not scroll with the content.
//
// Everything domain-shaped already hand-rolled this row: `pipelines/canvas/
// CanvasToolbar`, `doc-editor/EditorToolbar`, and the ad-hoc
// `flex items-center gap-2 border-b` in half the observability pages. They
// disagreed on height, padding, divider colour and whether the row stuck.
//
// Roving focus: `role="toolbar"` is a promise to keyboard users that Left/
// Right walk the controls and the whole group is ONE tab stop. Declaring the
// role without honouring it is worse than a plain div — a screen reader
// announces "toolbar, 12 items" and then Arrow keys do nothing. So the
// movement is implemented here rather than left to callers.

import {
  useCallback,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import type { SurfaceTone } from './tones';

/** @see SurfaceTone — which colour family the toolbar paints in. */
export type ToolbarTone = SurfaceTone;

export interface ToolbarProps {
  /** Start-aligned content. Wrap related controls in `<ToolbarGroup>`. */
  children?: ReactNode;
  /** Right-aligned content — the low-frequency verbs (refresh, overflow ⋯). */
  end?: ReactNode;
  tone?: ToolbarTone;
  /** `sm` (default) is the shell scale; `md` is for a toolbar that owns a pane. */
  size?: 'sm' | 'md';
  /**
   * Stick to the top of the scroll container. Off by default: a toolbar
   * inside `WorkArea` is already outside the scrolling region, and stacking
   * two sticky layers is how you get a row that hovers over its own header.
   */
  sticky?: boolean;
  /** Bottom hairline separating the row from content. Default true. */
  bordered?: boolean;
  /**
   * Let the row wrap onto a second line instead of scrolling horizontally.
   *
   * The default single row is right for a handful of verbs — run, stop,
   * refresh — where an overflowing control is rare and reachable. It is wrong
   * for a FILTER bar: six controls plus a view switch do not fit a narrow
   * pane, and `overflow-x-auto` then hides real filters behind a scrollbar
   * nobody looks for, which reads as "this toolbar has no status filter"
   * rather than "scroll right". A wrapping row shows every control it holds.
   */
  wrap?: boolean;
  className?: string;
  /**
   * Names the toolbar for screen readers. Default 'Toolbar' — override it
   * whenever a page shows more than one ("Canvas actions", "Run filters").
   */
  'aria-label'?: string;
  'data-testid'?: string;
}

const SIZE = {
  sm: 'min-h-9 px-3 gap-2 text-xs',
  md: 'min-h-11 px-4 gap-2.5 text-[13px]',
} as const;

const TONE = {
  surface: 'bg-surface text-text-primary border-border',
  code: 'bg-code-panel text-code-text border-code-border',
} as const;

const SEPARATOR_TONE = {
  surface: 'bg-border',
  code: 'bg-code-border',
} as const;

/** Focusable descendants, in DOM order. Disabled controls are skipped. */
const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function Toolbar({
  children,
  end,
  tone = 'surface',
  size = 'sm',
  sticky = false,
  bordered = true,
  wrap = false,
  className,
  'aria-label': ariaLabel = 'Toolbar',
  'data-testid': testId,
}: ToolbarProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) return;
    // Movement is relative to the focused control, not to a tracked index:
    // toolbars gain and lose controls as state changes (a Stop button only
    // exists while something runs), and a stored index goes stale the moment
    // that happens.
    const from = items.indexOf(document.activeElement as HTMLElement);
    let next: number;
    if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else if (from < 0) next = 0;
    else next = (from + (e.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
    items[next]?.focus();
    e.preventDefault();
  }, []);

  return (
    <div
      ref={ref}
      role="toolbar"
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      data-testid={testId}
      onKeyDown={onKeyDown}
      className={cn(
        'flex flex-none',
        // A wrapping row grows taller, so its groups align to the top of each
        // line rather than centring the whole (now multi-line) block.
        wrap ? 'items-start py-1.5' : 'items-center',
        SIZE[size],
        TONE[tone],
        bordered && 'border-b',
        sticky && 'sticky top-0 z-20',
        className,
      )}
    >
      <div
        className={cn(
          'flex min-w-0 flex-1 items-center gap-2',
          wrap ? 'flex-wrap gap-y-1.5' : 'overflow-x-auto',
        )}
      >
        {children}
      </div>
      {end && <div className="flex flex-none items-center gap-2 pl-2">{end}</div>}
    </div>
  );
}

export interface ToolbarGroupProps {
  children: ReactNode;
  /**
   * Draw a divider before the group. Cheaper than asking every caller to
   * interleave `<ToolbarSeparator>` by hand, and it cannot end up orphaned at
   * the start of a row when the group before it renders conditionally.
   */
  divided?: boolean;
  tone?: ToolbarTone;
  className?: string;
  /** Names the group for screen readers, e.g. "Zoom". */
  'aria-label'?: string;
}

export function ToolbarGroup({
  children,
  divided = false,
  tone = 'surface',
  className,
  'aria-label': ariaLabel,
}: ToolbarGroupProps) {
  return (
    <>
      {divided && <ToolbarSeparator tone={tone} />}
      <div
        role={ariaLabel ? 'group' : undefined}
        aria-label={ariaLabel}
        className={cn('flex flex-none items-center gap-1.5', className)}
      >
        {children}
      </div>
    </>
  );
}

export interface ToolbarSeparatorProps {
  tone?: ToolbarTone;
  className?: string;
}

export function ToolbarSeparator({ tone = 'surface', className }: ToolbarSeparatorProps) {
  return (
    <span
      role="separator"
      aria-orientation="vertical"
      className={cn('h-4 w-px flex-none', SEPARATOR_TONE[tone], className)}
    />
  );
}

export interface ToolbarLabelProps {
  children: ReactNode;
  tone?: ToolbarTone;
  className?: string;
}

/** Muted, non-interactive text in the row — "12 selected", "us-east-1". */
export function ToolbarLabel({ children, tone = 'surface', className }: ToolbarLabelProps) {
  return (
    <span
      className={cn(
        'flex-none whitespace-nowrap',
        tone === 'code' ? 'text-code-subtle' : 'text-text-tertiary',
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Toolbar;
