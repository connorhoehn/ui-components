import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable, type DataTableColumn, type DataTableProps } from './DataTable';
import Chip from './Chip';

interface Run {
  id: string;
  pipeline: string;
  status: 'running' | 'succeeded' | 'failed' | 'pending';
  duration: number;
  owner: string;
  startedAt: string;
}

const RUNS: Run[] = [
  { id: 'r-001', pipeline: 'ingest.events', status: 'running', duration: 14_320, owner: 'connor', startedAt: '2026-05-30T22:01:00Z' },
  { id: 'r-002', pipeline: 'transform.users', status: 'succeeded', duration: 7_800, owner: 'aliya', startedAt: '2026-05-30T21:58:00Z' },
  { id: 'r-003', pipeline: 'export.warehouse', status: 'failed', duration: 1_200, owner: 'connor', startedAt: '2026-05-30T21:55:00Z' },
  { id: 'r-004', pipeline: 'ingest.events', status: 'pending', duration: 0, owner: 'kim', startedAt: '2026-05-30T21:53:00Z' },
  { id: 'r-005', pipeline: 'transform.events', status: 'succeeded', duration: 4_400, owner: 'connor', startedAt: '2026-05-30T21:48:00Z' },
  { id: 'r-006', pipeline: 'export.warehouse', status: 'succeeded', duration: 9_600, owner: 'aliya', startedAt: '2026-05-30T21:42:00Z' },
  { id: 'r-007', pipeline: 'enrich.geo', status: 'failed', duration: 320, owner: 'kim', startedAt: '2026-05-30T21:30:00Z' },
];

const STATUS_TONE: Record<Run['status'], 'success' | 'danger' | 'info' | 'neutral'> = {
  succeeded: 'success',
  failed: 'danger',
  running: 'info',
  pending: 'neutral',
};

const columns: DataTableColumn<Run>[] = [
  { key: 'id', header: 'Run ID', sortable: true, width: '120px' },
  { key: 'pipeline', header: 'Pipeline', sortable: true },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (row) => <Chip tone={STATUS_TONE[row.status]}>{row.status}</Chip>,
  },
  {
    key: 'duration',
    header: 'Duration',
    sortable: true,
    align: 'right',
    compare: (a, b) => a.duration - b.duration,
    render: (row) => (row.duration === 0 ? '—' : `${(row.duration / 1000).toFixed(1)}s`),
  },
  { key: 'owner', header: 'Owner', sortable: true },
];

// Storybook can't carry a generic type through `Meta<typeof DataTable>`, so we
// declare a non-generic wrapper specialized to the `Run` row type.
function RunsDataTable(props: DataTableProps<Run>) {
  return <DataTable<Run> {...props} />;
}

const meta = {
  title: 'Shared/DataTable',
  component: RunsDataTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof RunsDataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    data: RUNS,
    columns,
    keyField: (r: Run) => r.id,
  },
};

export const Searchable: Story = {
  args: {
    data: RUNS,
    columns,
    keyField: (r: Run) => r.id,
    searchable: true,
    searchPlaceholder: 'Search pipelines, owners, status…',
  },
};

export const Paginated: Story = {
  args: {
    data: RUNS,
    columns,
    keyField: (r: Run) => r.id,
    pageSize: 3,
  },
};

export const SearchableAndPaginated: Story = {
  args: {
    data: RUNS,
    columns,
    keyField: (r: Run) => r.id,
    searchable: true,
    pageSize: 3,
  },
};

export const WithRowActions: Story = {
  args: {
    data: RUNS,
    columns,
    keyField: (r: Run) => r.id,
    onRowClick: (row: Run) => console.log('open', row.id),
    rowActions: (row: Run) => (
      <>
        <button
          type="button"
          className="rounded border border-border bg-surface px-2 py-1 text-xs text-text-primary hover:bg-surface-panel"
          onClick={() => console.log('retry', row.id)}
        >
          Retry
        </button>
        <button
          type="button"
          className="rounded border border-border bg-surface px-2 py-1 text-xs text-text-secondary hover:bg-surface-panel"
          onClick={() => console.log('cancel', row.id)}
        >
          Cancel
        </button>
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    keyField: (r: Run) => r.id,
    loading: true,
    loadingRows: 4,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    keyField: (r: Run) => r.id,
    emptyMessage: 'No pipeline runs in the last 24 hours.',
  },
};
