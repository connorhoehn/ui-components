// RailNavList — a short list of scopes at the top of a rail: "All initiatives
// / My initiatives / Sprints". 15px words, no chrome — no tabs underline, no
// segmented track, no rules — each one a link (or a button) to a view of the
// list below it.
//
// ## Why not Tabs or SegmentedControl
//
// Those switch a panel in place and carry tab/radio semantics. These items are
// navigation: each one is a URL (`?scope=mine`, `?lens=sprints`), the current
// one is marked with `aria-current="page"`, and a reader can open one in a new
// tab. SubNavLayout's item is the same idea with a left border; this is the
// lighter list a column header wears.
//
// Type scale (2.397.0): the item text and count come from ./railType, the
// same constants as SubNavLayout and GroupedList's rail rows, so the words
// match every other rail. Only the height differs: a row is 32px (6px + a
// 20px line + 6px) with no gap between rows, not the 36px rail pitch, because
// the mockup draws these as a tight list of views above the rows. (StackedRail
// drew this row until 2.407.33; it now draws the Org rail's 36px SubNavLayout
// row, `RAIL_ROW_PITCH`.)
//
// ## Honest items
//
// A `count` is drawn only when it is a number (zero shows "0"). A `disabled`
// item stays visible and muted with its `disabledReason` as the tooltip.

import type { MouseEvent, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { RAIL_ITEM_COUNT, RAIL_ITEM_TEXT } from './railType';

export interface RailNavListItem {
  id: string;
  label: string;
  /** A link target. Without it the item is a button calling `onSelect`. */
  href?: string;
  /** Called on activation — also for `href` items (the host's router). */
  onSelect?: () => void;
  /** Router interception; keep modified clicks native by checking the event. */
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
  /** The view on screen. Marked `aria-current="page"` and drawn semibold. */
  current?: boolean;
  /** Muted number at the item's right edge. Absent draws none; 0 shows "0". */
  count?: number;
  /** A glyph before the label. */
  icon?: ReactNode;
  disabled?: boolean;
  /** Tooltip on a disabled item: why it cannot be opened. */
  disabledReason?: string;
}

export interface RailNavListProps {
  items: RailNavListItem[];
  /** A tinted current view for a rail that also contains selected records. */
  currentStyle?: 'weight' | 'tint';
  /** The nav landmark's name. Default "Views". */
  'aria-label'?: string;
  className?: string;
  'data-testid'?: string;
}

/** The row control's classes. Not in the barrel. */
export const RAIL_NAV_ITEM_CLASS = cn(
  'flex w-full min-w-0 items-center gap-2.5 rounded-md border-0 bg-transparent px-2.5 py-[6px] text-left',
  RAIL_ITEM_TEXT,
  'text-text-primary no-underline [font-family:inherit]',
  'transition-colors duration-100 hover:bg-surface-hover',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
);

export function RailNavList({
  items,
  currentStyle = 'weight',
  'aria-label': ariaLabel = 'Views',
  className,
  'data-testid': testId = 'rail-nav-list',
}: RailNavListProps) {
  if (items.length === 0) return null;
  return (
    <nav aria-label={ariaLabel} className={cn('min-w-0', className)} data-testid={testId}>
      <ul className="m-0 flex list-none flex-col p-0">
        {items.map((item) => {
          const body = (
            <>
              {item.icon != null && <span className="flex shrink-0 items-center text-text-secondary">{item.icon}</span>}
              <span className="min-w-0 flex-1 truncate" title={item.label}>{item.label}</span>
              {typeof item.count === 'number' && (
                <span className={cn('shrink-0', RAIL_ITEM_COUNT)} aria-label={`${item.count} items`} data-testid={`${testId}-count-${item.id}`}>
                  {item.count}
                </span>
              )}
            </>
          );
          const cls = cn(RAIL_NAV_ITEM_CLASS, item.current ? 'font-semibold' : undefined, item.current && currentStyle === 'tint' && 'bg-primary/10', item.disabled ? 'cursor-default opacity-60 hover:bg-transparent' : 'cursor-pointer');
          const common = {
            className: cls,
            'data-testid': `${testId}-item-${item.id}`,
            'data-current': item.current || undefined,
            'aria-current': item.current ? ('page' as const) : undefined,
          };
          return (
            <li key={item.id} className="min-w-0">
              {item.href && !item.disabled ? (
                <a href={item.href} onClick={(event) => { item.onNavigate?.(event); item.onSelect?.(); }} {...common}>
                  {body}
                </a>
              ) : (
                <button
                  type="button"
                  disabled={item.disabled}
                  title={item.disabled ? item.disabledReason : undefined}
                  onClick={() => {
                    if (!item.disabled) item.onSelect?.();
                  }}
                  {...common}
                >
                  {body}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default RailNavList;
