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
  if (!loading && data.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center min-h-[220px] p-8">
        <span className="text-[42px] mb-3">{emptyIcon}</span>
        <p className="text-sm font-medium text-neutral text-center max-w-[280px] m-0">{emptyMessage}</p>
      </Card>
    );
  }

  const dtColumns: DataTableColumn<T>[] = columns.map((col) => ({
    key: col.key,
    header: col.header,
    render: col.render ? (row: T) => col.render!(row) : undefined,
    sortable: col.sortable,
    width: col.width,
    align: col.align,
  }));

  return (
    <Card>
      <DataTable<T>
        data={data}
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
