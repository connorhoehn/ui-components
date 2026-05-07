// src/components/identity/shared/EntityTable.tsx
//
// Generic sortable data table with loading skeleton, empty state,
// optional row click, and per-row action buttons.

import { useState, useCallback, useMemo } from 'react';
import { cn } from '../../../lib/cn';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

export interface EntityTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: string;
  onRowClick?: (item: T) => void;
  actions?: (item: T) => React.ReactNode;
  emptyMessage?: string;
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
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-4 py-2 border-b-2 border-border text-text-secondary font-semibold text-xs whitespace-nowrap select-none"
              >
                {col.header}
              </th>
            ))}
            {actions && (
              <th className="text-left px-4 py-2 border-b-2 border-border text-text-secondary font-semibold text-xs whitespace-nowrap select-none">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 border-b border-border text-text-primary align-middle">
                  <div className="h-5 rounded-sm bg-border opacity-50 animate-pulse" />
                </td>
              ))}
              {actions && (
                <td className="px-4 py-2 border-b border-border text-text-primary align-middle">
                  <div className="h-5 rounded-sm bg-border opacity-50 animate-pulse" />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (data.length === 0) {
    return <p className="p-6 text-center text-text-tertiary">{emptyMessage}</p>;
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className={cn(
                'text-left px-4 py-2 border-b-2 border-border text-text-secondary font-semibold text-xs whitespace-nowrap select-none',
                col.sortable ? 'cursor-pointer' : 'cursor-default'
              )}
              onClick={col.sortable ? () => handleSort(col.key) : undefined}
            >
              {col.header}
              {col.sortable && sortKey === col.key && (
                <span className="ml-1">{sortDir === 'asc' ? '▲' : '▼'}</span>
              )}
            </th>
          ))}
          {actions && (
            <th className="text-left px-4 py-2 border-b-2 border-border text-text-secondary font-semibold text-xs whitespace-nowrap select-none">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <tr
            key={String(item[keyField])}
            className={cn(onRowClick && 'cursor-pointer')}
            onClick={onRowClick ? () => onRowClick(item) : undefined}
          >
            {columns.map((col) => (
              <td key={col.key} className="px-4 py-2 border-b border-border text-text-primary align-middle">
                {col.render ? col.render(item) : String(item[col.key] ?? '')}
              </td>
            ))}
            {actions && (
              <td
                className="px-4 py-2 border-b border-border text-text-primary align-middle"
                onClick={(e) => e.stopPropagation()}
              >
                {actions(item)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
