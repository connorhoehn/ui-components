// src/components/identity/shared/EntityTable.tsx
//
// Generic sortable data table composing the base Table and Card components.
// Provides loading skeleton, empty state, sorting, and per-row actions.

import { useState, useCallback, useMemo } from 'react';
import { Card } from '../../ui/Card';
import { Table, TableHead, TableBody, TableRow, TableTh, TableTd } from '../../ui/Table';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'right' | 'center';
}

export interface EntityTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: string;
  onRowClick?: (item: T) => void;
  actions?: (item: T) => React.ReactNode;
  emptyMessage?: string;
  emptyIcon?: string;
  loading?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function EntityTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyField,
  onRowClick,
  actions,
  emptyMessage = 'No records found.',
  emptyIcon = '📋',
  loading = false,
}: EntityTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = useCallback(
    (key: string) => {
      if (sortKey === key) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortKey(key);
        setSortDir('asc');
      }
    },
    [sortKey],
  );

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = String(a[sortKey] ?? '');
      const bVal = String(b[sortKey] ?? '');
      const cmp = aVal.localeCompare(bVal);
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  if (loading) {
    return (
      <Card>
        <Table>
          <TableHead>
            <tr>
              {columns.map((col) => (
                <TableTh key={col.key} style={col.width ? { width: col.width } : undefined}>
                  {col.header}
                </TableTh>
              ))}
              {actions && <TableTh className="text-right">Actions</TableTh>}
            </tr>
          </TableHead>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableTd key={col.key}>
                    <div className="h-4 rounded bg-slate-100 animate-pulse" style={{ width: `${60 + Math.random() * 30}%` }} />
                  </TableTd>
                ))}
                {actions && (
                  <TableTd className="text-right">
                    <div className="h-4 w-20 rounded bg-slate-100 animate-pulse ml-auto" />
                  </TableTd>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center min-h-[220px] p-8">
        <span className="text-[42px] mb-3">{emptyIcon}</span>
        <p className="text-sm font-medium text-slate-500 text-center max-w-[280px] m-0">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <Card>
      <Table>
        <TableHead>
          <tr>
            {columns.map((col) => (
              <TableTh
                key={col.key}
                sortable={col.sortable}
                sortDirection={col.sortable && sortKey === col.key ? sortDir : null}
                style={col.width ? { width: col.width } : undefined}
                className={col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : undefined}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                {col.header}
              </TableTh>
            ))}
            {actions && <TableTh className="text-right">Actions</TableTh>}
          </tr>
        </TableHead>
        <TableBody>
          {sortedData.map((item) => (
            <TableRow
              key={String(item[keyField])}
              clickable={!!onRowClick}
              onClick={onRowClick ? () => onRowClick(item) : undefined}
            >
              {columns.map((col) => (
                <TableTd
                  key={col.key}
                  style={col.width ? { width: col.width } : undefined}
                  className={col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : undefined}
                >
                  {col.render ? col.render(item) : String(item[col.key] ?? '')}
                </TableTd>
              ))}
              {actions && (
                <TableTd className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-2">
                    {actions(item)}
                  </div>
                </TableTd>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
