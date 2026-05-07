// src/components/identity/shared/EntityTable.tsx
//
// Generic sortable data table with loading skeleton, empty state,
// optional row click, and per-row action buttons.

import { useState, useCallback, useMemo } from 'react';

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
// Styles
// ---------------------------------------------------------------------------

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 'var(--ui-fontSizeMd)',
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: 'var(--ui-spacingSm) var(--ui-spacingMd)',
  borderBottom: '2px solid var(--ui-border)',
  color: 'var(--ui-textSecondary)',
  fontWeight: 600,
  fontSize: 'var(--ui-fontSizeSm)',
  whiteSpace: 'nowrap',
  userSelect: 'none',
};

const tdStyle: React.CSSProperties = {
  padding: 'var(--ui-spacingSm) var(--ui-spacingMd)',
  borderBottom: '1px solid var(--ui-border)',
  color: 'var(--ui-textPrimary)',
  verticalAlign: 'middle',
};

const rowHoverStyle: React.CSSProperties = {
  cursor: 'pointer',
};

const emptyStyle: React.CSSProperties = {
  padding: 'var(--ui-spacingLg)',
  textAlign: 'center',
  color: 'var(--ui-textMuted)',
};

const skeletonRowStyle: React.CSSProperties = {
  height: '20px',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-border)',
  opacity: 0.5,
  animation: 'pulse 1.5s ease-in-out infinite',
};

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
      <table style={tableStyle}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={thStyle}>
                {col.header}
              </th>
            ))}
            {actions && <th style={thStyle}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key} style={tdStyle}>
                  <div style={skeletonRowStyle} />
                </td>
              ))}
              {actions && (
                <td style={tdStyle}>
                  <div style={skeletonRowStyle} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (data.length === 0) {
    return <p style={emptyStyle}>{emptyMessage}</p>;
  }

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              style={{
                ...thStyle,
                cursor: col.sortable ? 'pointer' : 'default',
              }}
              onClick={col.sortable ? () => handleSort(col.key) : undefined}
            >
              {col.header}
              {col.sortable && sortKey === col.key && (
                <span style={{ marginLeft: '4px' }}>{sortDir === 'asc' ? '▲' : '▼'}</span>
              )}
            </th>
          ))}
          {actions && <th style={thStyle}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <tr
            key={String(item[keyField])}
            style={onRowClick ? rowHoverStyle : undefined}
            onClick={onRowClick ? () => onRowClick(item) : undefined}
          >
            {columns.map((col) => (
              <td key={col.key} style={tdStyle}>
                {col.render ? col.render(item) : String(item[col.key] ?? '')}
              </td>
            ))}
            {actions && (
              <td style={tdStyle} onClick={(e) => e.stopPropagation()}>
                {actions(item)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
