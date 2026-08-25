// src/components/identity/shared/EntityTable.tsx
//
// Identity's table facade. The public API is unchanged, but since v2.72.0
// the implementation delegates to shared/DataTable — the audit found two
// parallel table implementations (sorting, skeleton rows, action cells)
// that could drift, and DataTable is the tested, storied superset.
//
// What this facade still owns, because it is identity's visual contract:
//   - the Card frame around the table (DataTable runs `frameless`),
//   - the emoji + message empty state (a Card, not an in-table row).

import { useMemo } from 'react';
import { Card } from '../../ui/Card';
import { DataTable, type DataTableColumn } from '../../shared/DataTable';

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
  // Memoised, and hoisted above the early return so it stays an
  // unconditional hook. Every caller (UserListPage, AuditPage, GroupListPage,
  // …) already wraps its `columns` in useMemo, and this facade was throwing
  // that stability away one level down: `columns` is a dependency of BOTH
  // DataTable's `filtered` and `sorted` memos, so a fresh array here meant
  // the whole dataset was re-filtered and re-sorted on every render —
  // including every keystroke in the table's own search box.
  const dtColumns: DataTableColumn<T>[] = useMemo(
    () =>
      columns.map((col) => ({
        key: col.key,
        header: col.header,
        render: col.render ? (row: T) => col.render!(row) : undefined,
        sortable: col.sortable,
        width: col.width,
        align: col.align,
      })),
    [columns],
  );

  // `data` is typed as a required array, but every caller feeds it a fetch
  // result — `data={resp?.users}` while the request is in flight, or an API
  // that answers `{}` instead of `{users: []}`, both hand us `undefined`. The
  // `.length` below then threw and blanked the list page, three lines away
  // from the empty state that is the correct thing to show.
  const rows: T[] = Array.isArray(data) ? data : [];

  if (!loading && rows.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center min-h-[220px] p-8">
        <span className="text-[42px] mb-3">{emptyIcon}</span>
        <p className="text-sm font-medium text-neutral text-center max-w-[280px] m-0">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <Card>
      <DataTable<T>
        data={rows}
        columns={dtColumns}
        keyField={(row) => String(row[keyField])}
        onRowClick={onRowClick}
        rowActions={actions}
        loading={loading}
        frameless
      />
    </Card>
  );
}
