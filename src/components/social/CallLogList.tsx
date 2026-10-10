// CallLogList — a person's call history: who, direction, outcome, when, length
// and a call-back action, with an All / Missed filter. `CallActivityCard` is a
// chat card for one call; this is the list view. Presentational: rows arrive
// already resolved to display strings.

import { useMemo, useState } from 'react';
import { Button } from '../ui/Button';
import Chip from '../shared/Chip';
import { DataTable, type DataTableColumn } from '../shared/DataTable';
import { SegmentedControl } from '../shared/SegmentedControl';

export interface CallLogEntry {
  id: string;
  who: string;
  /** "Incoming", "Outgoing", "Room" … */
  direction: string;
  /** "Answered", "Missed", "Declined" … */
  outcome: string;
  missed: boolean;
  startedAt: string;
  /** Already formatted ("4m 12s"). */
  duration: string;
}

export interface CallLogListProps {
  rows: readonly CallLogEntry[];
  onCallBack?: (row: CallLogEntry) => void;
  /** Label per row for the action ("Call back", "Open room"). */
  callBackLabel?: (row: CallLogEntry) => string;
  callBackDisabled?: boolean;
  formatWhen?: (iso: string) => string;
  /** Initial filter. */
  defaultFilter?: 'all' | 'missed';
  className?: string;
  'data-testid'?: string;
}

const defaultWhen = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

export function CallLogList({
  rows, onCallBack, callBackLabel = () => 'Call back', callBackDisabled, formatWhen = defaultWhen,
  defaultFilter = 'all', className, 'data-testid': testId = 'call-log',
}: CallLogListProps) {
  const [filter, setFilter] = useState<'all' | 'missed'>(defaultFilter);
  const missedCount = useMemo(() => rows.filter((r) => r.missed).length, [rows]);
  const shown = filter === 'missed' ? rows.filter((r) => r.missed) : rows;

  const columns: DataTableColumn<CallLogEntry>[] = [
    { key: 'who', header: 'Who', sortable: true },
    { key: 'direction', header: 'Direction', width: '120px' },
    { key: 'outcome', header: 'Outcome', width: '130px', render: (r) => <Chip tone={r.missed ? 'danger' : 'neutral'} size="xs">{r.outcome}</Chip> },
    { key: 'startedAt', header: 'When', width: '170px', sortable: true, render: (r) => formatWhen(r.startedAt) },
    { key: 'duration', header: 'Length', width: '100px', align: 'right' },
  ];

  return (
    <div className={['flex flex-col gap-2', className].filter(Boolean).join(' ')} data-testid={testId}>
      <SegmentedControl
        aria-label="Which calls"
        value={filter}
        onChange={(v) => setFilter(v as 'all' | 'missed')}
        options={[{ value: 'all', label: 'All' }, { value: 'missed', label: `Missed${missedCount ? ` (${missedCount})` : ''}` }]}
        data-testid={`${testId}-filter`}
      />
      <DataTable
        data={shown as CallLogEntry[]}
        columns={columns}
        keyField={(r) => r.id}
        emptyMessage={filter === 'missed' ? 'No missed calls.' : 'No calls yet.'}
        {...(onCallBack ? {
          rowActions: (r: CallLogEntry) => (
            <Button variant="ghost" size="sm" disabled={callBackDisabled} onClick={() => onCallBack(r)} data-testid={`${testId}-call-back`}>
              {callBackLabel(r)}
            </Button>
          ),
        } : {})}
        data-testid={`${testId}-table`}
      />
    </div>
  );
}

export default CallLogList;
