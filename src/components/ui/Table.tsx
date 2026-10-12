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
      <table className={cn('w-full text-sm', className)} data-size={size === 'sm' ? 'sm' : undefined} {...rest}>
        {children}
      </table>
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
}

export function TableBody({ children, className, ...rest }: TableBodyProps) {
  return (
    <tbody className={cn('', className)} {...rest}>
      {children}
    </tbody>
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
  return (
    <tr
      className={cn(
        'border-b border-border-subtle last:border-b-0 transition-colors',
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
          ? 'text-left px-[var(--ui-table-inset,0.75rem)] py-2 text-neutral font-semibold text-xs uppercase tracking-wide whitespace-nowrap select-none'
          : 'text-left px-4 py-2.5 text-neutral font-semibold text-[11px] uppercase tracking-wide select-none',
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
