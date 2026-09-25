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
// tab. SubNavLayout's item is the same idea at 13px with a left border, sized
// for a settings rail; this is the lighter list a column header wears.
//
// ## Honest items
//
// A `count` is drawn only when it is a number (zero shows "0"). A `disabled`
// item stays visible and muted with its `disabledReason` as the tooltip.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface RailNavListItem {
  id: string;
  label: string;
  /** A link target. Without it the item is a button calling `onSelect`. */
  href?: string;
  /** Called on activation — also for `href` items (the host's router). */
  onSelect?: () => void;
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
  /** The nav landmark's name. Default "Views". */
  'aria-label'?: string;
  className?: string;
  'data-testid'?: string;
}

const ITEM_CLASS = cn(
  'flex w-full min-w-0 items-center gap-2.5 rounded-md border-0 bg-transparent px-2.5 py-[5px] text-left',
  'text-[15px] leading-[23px] text-text-primary no-underline [font-family:inherit]',
  'transition-colors duration-100 hover:bg-surface-hover',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
);

export function RailNavList({
  items,
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
                <span className="shrink-0 text-[13px] font-medium tabular-nums text-text-tertiary" aria-label={`${item.count} items`} data-testid={`${testId}-count-${item.id}`}>
                  {item.count}
                </span>
              )}
            </>
          );
          const cls = cn(ITEM_CLASS, item.current ? 'font-semibold' : 'font-normal', item.disabled ? 'cursor-default opacity-60 hover:bg-transparent' : 'cursor-pointer');
          const common = {
            className: cls,
            'data-testid': `${testId}-item-${item.id}`,
            'data-current': item.current || undefined,
            'aria-current': item.current ? ('page' as const) : undefined,
          };
          return (
            <li key={item.id} className="min-w-0">
              {item.href && !item.disabled ? (
                <a href={item.href} onClick={() => item.onSelect?.()} {...common}>
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
