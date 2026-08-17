// src/components/ui/Table.tsx
//
// Base table primitives for consistent data tables across the app.

import { type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Table root
// ---------------------------------------------------------------------------

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export function Table({ children, className, ...rest }: TableProps) {
  return (
    <table className={cn('w-full text-sm', className)} {...rest}>
      {children}
    </table>
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
        'border-b border-slate-100 last:border-b-0 transition-colors',
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
}

export function TableTh({ children, sortable, sortDirection, className, ...rest }: TableThProps) {
  return (
    <th
      className={cn(
        'text-left px-4 py-2.5 text-neutral font-semibold text-[11px] uppercase tracking-wide select-none',
        sortable && 'cursor-pointer hover:text-slate-700 transition-colors',
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
}

export function TableTd({ children, className, ...rest }: TableTdProps) {
  return (
    <td className={cn('px-4 py-3 text-sm text-slate-700 align-middle', className)} {...rest}>
      {children}
    </td>
  );
}
