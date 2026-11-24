import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable, type DataTableColumn, type DataTableProps } from './DataTable';
import Chip from './Chip';
import { useState } from 'react';
import { RowActions } from './RowActions';
import { CheckIcon, RedoIcon, PlayCircleIcon } from '../ui/Icons';

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

/** A notification can reveal a record on a later page without moving focus. */
export const RevealSelection: Story = {
  args: {
    data: RUNS,
    columns,
    keyField: (r: Run) => r.id,
    pageSize: 3,
    selectedKey: 'r-007',
    revealSelection: true,
    narrow: true,
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

/** Rows that open nothing say so, with a reason the rendered-UI audit reads (since 2.442.0). */
export const StaticRows: Story = {
  args: {
    data: RUNS.slice(0, 3),
    columns,
    keyField: (r: Run) => r.id,
    staticRows: 'Read-only history of this record; the record itself is the page.',
  },
};

interface Scorecard { id: string; candidate: string; r1a: string; r1b: string; r2a: string; r2b: string; summary: string }
const SCORECARDS: Scorecard[] = [
  { id: 's1', candidate: 'Avery Stone', r1a: 'Strong yes', r1b: 'Yes', r2a: 'Yes', r2b: 'Lean yes', summary: 'Clear communicator; walked through the trade-offs of the cache design before writing code, and tested the edge cases unprompted.' },
  { id: 's2', candidate: 'Jordan Lake', r1a: 'Yes', r1b: 'Lean no', r2a: 'No', r2b: 'Lean no', summary: 'Solid fundamentals but struggled to scope the problem.' },
  { id: 's3', candidate: 'Riley Moss', r1a: 'Lean yes', r1b: 'Yes', r2a: 'Strong yes', r2b: 'Yes', summary: 'Fast and careful; asked good questions about the data model.' },
];
const scorecardColumns: DataTableColumn<Scorecard>[] = [
  { key: 'candidate', header: 'Candidate' },
  { key: 'r1a', header: 'Interviewer A', group: 'r1' },
  { key: 'r1b', header: 'Interviewer B', group: 'r1' },
  { key: 'r2a', header: 'Interviewer C', group: 'r2' },
  { key: 'r2b', header: 'Interviewer D', group: 'r2' },
  { key: 'summary', header: 'Summary', width: '28rem' },
];

/**
 * Column groups (one per round, a column per interviewer), a sticky first
 * column for the sideways scroll, and `rowHeight="content"` so the summary
 * wraps instead of truncating (since 2.537.0).
 */
export const GroupedStickyWrapping: Story = {
  render: () => (
    <div className="max-w-2xl">
      <DataTable<Scorecard> data={SCORECARDS} columns={scorecardColumns} keyField={(r) => r.id} size="sm" rowHeight="content"
        stickyFirstColumn columnGroups={[{ key: 'r1', header: 'Round 1 · Coding' }, { key: 'r2', header: 'Round 2 · System design' }]}
        staticRows="A read-only summary of the panel's scores." />
    </div>
  ),
} as unknown as Story;

interface Take {
  id: string;
  name: string;
  revision: string;
  takes: string;
  made: string;
  state: string;
  children?: Take[];
}

const VOICES: Take[] = [
  {
    id: 'dot', name: 'Dot', revision: 'r2', takes: '3 takes', made: 'Nov 13', state: '3 to review',
    children: [
      { id: 'dot-2a', name: 'Take 2a', revision: '', takes: '4.5 s · -19.2 LUFS · peak -3.83 dBFS', made: '', state: 'Proposed' },
      { id: 'dot-2b', name: 'Take 2b', revision: '', takes: '5.8 s · -17.5 LUFS · peak -3.99 dBFS', made: '', state: 'Waiting for review' },
      { id: 'dot-2c', name: 'Take 2c', revision: '', takes: '6.4 s · -18 LUFS · peak -6.86 dBFS', made: '', state: 'Waiting for review' },
    ],
  },
  { id: 'gus', name: 'Gus', revision: 'r1', takes: '1 take', made: 'Nov 12', state: 'Approved',
    children: [{ id: 'gus-1a', name: 'Take 1a', revision: '', takes: '3.1 s · -18.4 LUFS · peak -4.1 dBFS', made: '', state: 'Approved' }] },
  { id: 'june', name: 'June', revision: '', takes: 'No takes', made: '', state: 'Not started' },
];

const voiceColumns: DataTableColumn<Take>[] = [
  { key: 'name', header: 'Character', sortable: true },
  { key: 'revision', header: 'Revision' },
  { key: 'takes', header: 'Takes' },
  { key: 'made', header: 'Made' },
  { key: 'state', header: 'State' },
];

/**
 * Expandable rows (since 2.544.0): a character opens to its takes as rows of
 * the same table, indented one step. `childColumns` lets a take's measurements
 * run across the Takes and Made columns; `RowActions` ends every row.
 */
export const ExpandableRows: Story = {
  render: function Render() {
    const [open, setOpen] = useState<string[]>(['dot']);
    return (
      <DataTable<Take> data={VOICES} columns={voiceColumns} keyField={(r) => r.id} size="sm" headerCase="sentence"
        rowChildren={(r) => r.children} expandedKeys={open} onExpandedChange={setOpen}
        childColumns={{ takes: { colSpan: 2 } }}
        rowActionsHeader="Operations"
        rowActions={(r) => (
          <RowActions name={r.name}
            actions={r.children ? [{ icon: <RedoIcon />, label: 'Make again', onClick: () => console.log('again', r.id) }] : [
              { icon: <PlayCircleIcon />, label: 'Play', onClick: () => console.log('play', r.id) },
              { icon: <CheckIcon />, label: 'Approve', onClick: () => console.log('approve', r.id), primary: r.state === 'Proposed' },
            ]}
            menu={[{ label: 'Open', onSelect: () => console.log('open', r.id) }, { label: 'Delete', onSelect: () => console.log('delete', r.id) }]} />
        )}
        onRowClick={(r) => console.log('row', r.id)} />
    );
  },
} as unknown as Story;

/**
 * The dense step (since 2.545.0): `size="xs"` draws 36px rows with the same
 * 14px body text, 12px header and side inset as `sm`; the 28px `RowActions`
 * buttons still fit. Delete asks in place; a disabled item says why.
 */
export const DenseRows: Story = {
  render: function Render() {
    const [open, setOpen] = useState<string[]>(['dot']);
    return (
      <DataTable<Take> data={VOICES} columns={voiceColumns} keyField={(r) => r.id} size="xs" headerCase="sentence"
        rowChildren={(r) => r.children} expandedKeys={open} onExpandedChange={setOpen}
        rowActions={(r) => (
          <RowActions name={r.name}
            actions={[{ icon: <PlayCircleIcon />, label: 'Play', onClick: () => console.log('play', r.id) }]}
            menu={[
              { label: 'Archive', onSelect: () => console.log('archive', r.id), disabled: r.state === 'Approved', disabledReason: 'An approved take stays in the show' },
              { label: 'Delete', danger: true, onSelect: () => console.log('delete', r.id), confirm: { question: `Delete ${r.name}?`, confirmLabel: 'Delete', tone: 'destructive' } },
            ]} />
        )}
        onRowClick={(r) => console.log('row', r.id)} />
    );
  },
} as unknown as Story;
