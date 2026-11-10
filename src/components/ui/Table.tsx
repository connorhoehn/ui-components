// src/components/ui/Table.tsx
//
// Base table primitives for consistent data tables across the app.

import { createContext, useContext, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useDensitySize } from '../shared/Density';

/**
 * Row density. `md` (default) is the original 12px-padded cell. `sm` (since
 * 2.434.0) is the app's list step: every body row exactly 44px tall on one
 * line (cells do not wrap — truncate or move detail to a tooltip), 14px body
 * text, a 12px semibold uppercase header, and 12px side padding. A row that
 * stacks a caption or a bar under its value cannot fit 44px; put the bar
 * inline beside the value and the caption in a `title`.
 */
export type TableSize = 'md' | 'sm';

const TableSizeContext = createContext<TableSize>('md');
// Whether rows in the enclosing body stripe. False outside a `TableBody`, so
// header rows (and rows rendered without a body) never pick up the band.
const TableStripedContext = createContext(false);

/**
 * The stripe fill, shared with `DataTable`: `surface-inset` at full strength,
 * lighter than `surface-panel` (the hover fill) so hover still reads as the
 * darker row. `even:` sorts before `hover:` in Tailwind's variant order, so a
 * clickable striped row still shows its hover fill.
 */
const STRIPE_ROW_CLASS = 'even:bg-surface-inset';
// A row that sets its own background (selected, blocked, highlighted) owns
// its fill; the stripe must never paint over a state colour.
const OWN_BACKGROUND = /(?:^|\s)bg-/;

// ---------------------------------------------------------------------------
// Table root
// ---------------------------------------------------------------------------

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
  /** Row density for every cell inside. Default `md`. Since 2.434.0. */
  size?: TableSize;
}

export function Table({ children, className, size: sizeProp, ...rest }: TableProps) {
  const size = useDensitySize<TableSize>('Table', sizeProp, { comfortable: 'md', compact: 'sm' });
  return (
    <TableSizeContext.Provider value={size}>
      {/* A table is the one thing on a page that legitimately outgrows its
          column — many columns, long one-line cells. Its own scroller (since
          2.446.4; DataTable used to add it) keeps that spill inside the
          table's box instead of running past the column and being cut off
          by the page's scroller. */}
      <div className="w-full min-w-0 max-w-full overflow-x-auto" data-table-scroller="">
        <table data-ui-part="" className={cn('w-full text-sm', className)} data-ui-table="" data-size={size === 'sm' ? 'sm' : undefined} {...rest}>
          {children}
        </table>
      </div>
    </TableSizeContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Table Head
// ---------------------------------------------------------------------------

export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export function TableHead({ children, className, ...rest }: TableHeadProps) {
  return (
    <thead className={cn('border-b border-border bg-surface-panel', className)} {...rest}>
      {children}
    </thead>
  );
}

// ---------------------------------------------------------------------------
// Table Body
// ---------------------------------------------------------------------------

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
  /**
   * Tint every second row (the even DOM children, so the first row stays on
   * the plain surface) with the same `surface-inset` band `DataTable` uses.
   * Default `true` since 2.504.0: zebra rows are the reading aid a wide table
   * needs, and a hand-composed table should not have to opt in to it. A row
   * that sets its own `bg-*` class keeps it. Pass `false` when the body
   * stripes itself or holds non-data rows (group headers) that would shift
   * the band.
   */
  striped?: boolean;
}

export function TableBody({ children, className, striped = true, ...rest }: TableBodyProps) {
  return (
    <TableStripedContext.Provider value={striped}>
      <tbody className={cn('', className)} data-striped={striped ? '' : undefined} data-ui-table-striped={striped ? '' : undefined} {...rest}>
        {children}
      </tbody>
    </TableStripedContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Table Row
// ---------------------------------------------------------------------------

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  clickable?: boolean;
}

export function TableRow({ children, clickable, className, ...rest }: TableRowProps) {
  const striped = useContext(TableStripedContext);
  return (
    <tr
      className={cn(
        'border-b border-border-subtle last:border-b-0 transition-colors',
        striped && !(className && OWN_BACKGROUND.test(className)) && STRIPE_ROW_CLASS,
        clickable && 'cursor-pointer hover:bg-surface-panel',
        className,
      )}
      {...rest}
    >
      {children}
    </tr>
  );
}

// ---------------------------------------------------------------------------
// Table Header Cell
// ---------------------------------------------------------------------------

export interface TableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  /** A number column: right-aligned, so header and figures share an edge. Since 2.434.0. */
  numeric?: boolean;
}

export function TableTh({ children, sortable, sortDirection, numeric, className, ...rest }: TableThProps) {
  const size = useContext(TableSizeContext);
  return (
    <th
      className={cn(
        size === 'sm'
          ? 'text-left px-[var(--ui-table-inset,0.75rem)] py-2 text-text-secondary font-semibold text-xs uppercase tracking-wide whitespace-nowrap select-none'
          // md header: 8px block padding (was py-2.5, 10px, off the 4px scale;
          // 8px rather than 12px matches the sm header so both densities
          // share one header band — since 2.515.12).
          : 'text-left px-4 py-2 text-text-secondary font-semibold text-[12px] uppercase tracking-wide select-none',
        numeric && 'text-right',
        sortable && 'cursor-pointer hover:text-text-primary transition-colors',
        className,
      )}
      {...rest}
    >
      {children}
      {sortable && sortDirection && (
        <span className="ml-1 text-text-tertiary">{sortDirection === 'asc' ? '↑' : '↓'}</span>
      )}
    </th>
  );
}

// ---------------------------------------------------------------------------
// Table Data Cell
// ---------------------------------------------------------------------------

export interface TableTdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  /** A number cell: right-aligned tabular figures. Since 2.434.0. */
  numeric?: boolean;
}

export function TableTd({ children, numeric, className, ...rest }: TableTdProps) {
  const size = useContext(TableSizeContext);
  return (
    <td
      className={cn(
        size === 'sm'
          ? 'h-[var(--ui-table-row,2.75rem)] px-[var(--ui-table-inset,0.75rem)] py-0 text-sm leading-5 text-text-primary align-middle whitespace-nowrap'
          : 'px-4 py-3 text-sm text-text-primary align-middle',
        numeric && 'text-right tabular-nums',
        className,
      )}
      {...rest}
    >
      {children}
    </td>
  );
}
