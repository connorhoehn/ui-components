// src/components/shared/DataTable.tsx
//
// Generic admin-grade data table: sort, filter, pagination, row actions,
// loading + empty states. Builds on the lower-level Table primitives in
// src/components/ui/Table.tsx.
//
// Designed to replace hand-rolled `<table>` patterns across admin shells
// (RunsTable, ActiveRunsTable, EntityTable, identity list pages, etc).

import { useMemo, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableTh,
  TableTd,
} from '../ui/Table';

export interface DataTableColumn<T> {
  /** Stable id for the column. When `accessor` is omitted, used as the data key on T. */
  key: string;
  /** Header label. */
  header: ReactNode;
  /** Optional cell renderer. If absent, the value at `key` is rendered as a string. */
  render?: (row: T, rowIndex: number) => ReactNode;
  /** Optional sort comparator. If absent but `sortable=true`, sorts by `String(row[key])`. */
  compare?: (a: T, b: T) => number;
  /** Optional filter accessor. If absent but `filterable=true`, filters by `String(row[key])`. */
  getFilterText?: (row: T) => string;
  sortable?: boolean;
  /** Include this column's text in the global search box. Default: true if a search box is shown. */
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'right' | 'center';
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  /** Stable id for each row. Used as React key. */
  keyField: (row: T) => string;
  onRowClick?: (row: T) => void;
  /** Per-row trailing action cell (buttons, menu, etc.). */
  rowActions?: (row: T) => ReactNode;
  /** Show a global search input. Default: false. */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Page size. Pagination is shown when data.length > pageSize. */
  pageSize?: number;
  emptyMessage?: ReactNode;
  loading?: boolean;
  loadingRows?: number;
  className?: string;
  'data-testid'?: string;
}

function alignClass(a?: 'left' | 'right' | 'center'): string | undefined {
  if (a === 'right') return 'text-right';
  if (a === 'center') return 'text-center';
  return undefined;
}

export function DataTable<T>({
  data,
  columns,
  keyField,
  onRowClick,
  rowActions,
  searchable = false,
  searchPlaceholder = 'Search…',
  pageSize,
  emptyMessage = 'No records.',
  loading = false,
  loadingRows = 5,
  className,
  'data-testid': testId,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filtered = useMemo(() => {
    if (!searchable || query.trim() === '') return data;
    const q = query.trim().toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        if (col.filterable === false) return false;
        const text = col.getFilterText
          ? col.getFilterText(row)
          : String((row as Record<string, unknown>)[col.key] ?? '');
        return text.toLowerCase().includes(q);
      }),
    );
  }, [data, columns, query, searchable]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const col = columns.find((c) => c.key === sortKey);
    if (!col || !col.sortable) return filtered;
    const cmp =
      col.compare ??
      ((a: T, b: T) => {
        const av = String((a as Record<string, unknown>)[col.key] ?? '');
        const bv = String((b as Record<string, unknown>)[col.key] ?? '');
        return av.localeCompare(bv);
      });
    const copy = [...filtered];
    copy.sort((a, b) => (sortDir === 'asc' ? cmp(a, b) : -cmp(a, b)));
    return copy;
  }, [filtered, columns, sortKey, sortDir]);

  const totalPages = pageSize && pageSize > 0 ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const safePage = Math.min(page, totalPages - 1);
  const paged = useMemo(() => {
    if (!pageSize || pageSize <= 0) return sorted;
    const start = safePage * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, pageSize, safePage]);

  return (
    <div className={cn('flex flex-col gap-3', className)} data-testid={testId}>
      {searchable && (
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(0);
          }}
          placeholder={searchPlaceholder}
          aria-label="Search"
          data-testid="datatable-search"
          className="w-full max-w-xs rounded-md border border-border-field bg-surface px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none"
        />
      )}
      <Table className="border border-border rounded-lg overflow-hidden">
        <TableHead>
          <tr>
            {columns.map((col) => {
              const isSorted = col.sortable && sortKey === col.key;
              return (
                <TableTh
                  key={col.key}
                  sortable={col.sortable}
                  sortDirection={isSorted ? sortDir : null}
                  style={col.width ? { width: col.width } : undefined}
                  className={cn(alignClass(col.align), col.className)}
                  onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                  data-testid={col.sortable ? `datatable-header-${col.key}` : undefined}
                >
                  {col.header}
                </TableTh>
              );
            })}
            {rowActions && <TableTh className="text-right">Actions</TableTh>}
          </tr>
        </TableHead>
        <TableBody>
          {loading
            ? Array.from({ length: loadingRows }).map((_, i) => (
                <TableRow key={`skeleton-${i}`} data-testid="datatable-loading-row">
                  {columns.map((col) => (
                    <TableTd key={col.key} className={alignClass(col.align)}>
                      <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                    </TableTd>
                  ))}
                  {rowActions && (
                    <TableTd className="text-right">
                      <div className="ml-auto h-4 w-16 animate-pulse rounded bg-slate-100" />
                    </TableTd>
                  )}
                </TableRow>
              ))
            : paged.length === 0
              ? (
                <TableRow>
                  <TableTd
                    colSpan={columns.length + (rowActions ? 1 : 0)}
                    className="text-center text-text-secondary py-8"
                  >
                    {emptyMessage}
                  </TableTd>
                </TableRow>
              )
              : paged.map((row, rowIndex) => (
                  <TableRow
                    key={keyField(row)}
                    clickable={!!onRowClick}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                  >
                    {columns.map((col) => (
                      <TableTd
                        key={col.key}
                        className={cn(alignClass(col.align), col.className)}
                      >
                        {col.render
                          ? col.render(row, rowIndex)
                          : String((row as Record<string, unknown>)[col.key] ?? '')}
                      </TableTd>
                    ))}
                    {rowActions && (
                      <TableTd className="text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          {rowActions(row)}
                        </div>
                      </TableTd>
                    )}
                  </TableRow>
                ))}
        </TableBody>
      </Table>
      {pageSize && pageSize > 0 && sorted.length > pageSize && (
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span data-testid="datatable-page-summary">
            Page {safePage + 1} of {totalPages} · {sorted.length} total
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={safePage === 0}
              data-testid="datatable-prev"
              className="rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={safePage >= totalPages - 1}
              data-testid="datatable-next"
              className="rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
