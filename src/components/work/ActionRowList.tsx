// ActionRowList — a short ruled list of things to open next: "Plan next" on an
// initiative's overview — a title, a one-line description, "Layla Hassan · 5
// points" at the right and a chevron, three rows, then "See all 11 work
// items →".
//
// ## Not a GroupedList, not a table
//
// `GroupedList` is a navigable directory (groups, carets, roving focus, a ⋯
// per row); `DataTable` is columns a reader compares. This is neither: a
// handful of suggestions, each one a single target. So the WHOLE row is one
// button (or one link when it has an `href`) — a reader clicks anywhere on it,
// and a screen reader reads its title, then its description and meta as the
// button's text. Nothing inside a row is separately interactive.
//
// ## Honest rows
//
// No description → no second line (never a placeholder). No meta → nothing at
// the right but the chevron. A `disabled` row stays visible and muted, with
// its `disabledReason` as the tooltip, so "why can't I open this?" has an
// answer. An empty list renders `emptyLabel` when given, else nothing at all.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ChevronIcon } from '../ui/Icons';

export interface ActionRowItem {
  id: string;
  title: string;
  /** One line under the title. Truncates; absent, no second line. */
  description?: ReactNode;
  /** Right-aligned facts, already worded — "Layla Hassan · 5 points". */
  meta?: ReactNode;
  /** A link target. Without it the row is a button calling `onOpen`. */
  href?: string;
  disabled?: boolean;
  /** Tooltip on a disabled row: why it cannot be opened. */
  disabledReason?: string;
}

export interface ActionRowListProps {
  items: ActionRowItem[];
  /** A row was activated (click, Enter, Space). Also called for `href` rows. */
  onOpen?: (item: ActionRowItem) => void;
  /** Under the list — normally a link, "See all 11 work items →". */
  footer?: ReactNode;
  /** Shown instead of the rows when `items` is empty. Absent, nothing renders. */
  emptyLabel?: ReactNode;
  'aria-label'?: string;
  className?: string;
  'data-testid'?: string;
}

const ROW_CLASS = cn(
  'group flex w-full min-w-0 items-center gap-4 border-0 bg-transparent px-2.5 py-[7px] text-left [font-family:inherit] no-underline',
  'transition-colors duration-100 hover:bg-surface-hover',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
);

function RowBody({ item }: { item: ActionRowItem }) {
  return (
    <>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[15px] font-medium leading-6 text-text-primary">{item.title}</span>
        {item.description != null && item.description !== false && (
          <span className="truncate text-sm leading-5 text-text-secondary" data-testid="action-row-description">{item.description}</span>
        )}
      </span>
      {item.meta != null && item.meta !== false && (
        <span className="shrink-0 whitespace-nowrap text-[13px] text-text-secondary" data-testid="action-row-meta">{item.meta}</span>
      )}
      <ChevronIcon dir="right" size={16} aria-hidden="true" className="ml-2 shrink-0 text-text-secondary" />
    </>
  );
}

export function ActionRowList({
  items,
  onOpen,
  footer,
  emptyLabel,
  'aria-label': ariaLabel,
  className,
  'data-testid': testId = 'action-row-list',
}: ActionRowListProps) {
  if (items.length === 0 && emptyLabel == null && footer == null) return null;
  return (
    <div className={cn('flex min-w-0 flex-col', className)} data-testid={testId}>
      {items.length === 0 ? (
        emptyLabel != null && <p className="m-0 py-2 text-sm text-text-tertiary" data-testid={`${testId}-empty`}>{emptyLabel}</p>
      ) : (
        <ul className="m-0 list-none border-t border-border p-0" {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}>
          {items.map((item) => (
            <li key={item.id} className="border-b border-border" data-testid={`${testId}-row-${item.id}`}>
              {item.href && !item.disabled ? (
                <a href={item.href} onClick={() => onOpen?.(item)} className={ROW_CLASS} data-testid={`${testId}-open-${item.id}`}>
                  <RowBody item={item} />
                </a>
              ) : (
                <button
                  type="button"
                  disabled={item.disabled}
                  title={item.disabled ? item.disabledReason : undefined}
                  onClick={() => {
                    if (!item.disabled) onOpen?.(item);
                  }}
                  className={cn(ROW_CLASS, item.disabled ? 'cursor-default opacity-60 hover:bg-transparent' : 'cursor-pointer')}
                  data-testid={`${testId}-open-${item.id}`}
                >
                  <RowBody item={item} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {footer != null && <div className="mt-2 flex items-center" data-testid={`${testId}-footer`}>{footer}</div>}
    </div>
  );
}

export default ActionRowList;
