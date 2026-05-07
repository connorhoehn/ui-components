import { useRef, useState } from 'react';
import { useClickOutside } from './hooks/useClickOutside';
import { cn } from '../../lib/cn';
import type { DateRangeKey, StatusKey, TriggerKindKey } from './runsUtils';
import { STATUS_KEYS, TRIGGER_KIND_KEYS, DATE_RANGE_KEYS } from './runsUtils';

const STATUS_LABEL: Record<StatusKey, string> = {
  pending: 'Pending',
  running: 'Running',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
  paused_at_breakpoint: 'Paused',
};

const TRIGGER_LABEL: Record<TriggerKindKey, string> = {
  manual: 'Manual',
  scheduled: 'Scheduled',
  webhook: 'Webhook',
  document: 'Document',
};

const RANGE_LABEL: Record<DateRangeKey, string> = {
  '24h': 'Last 24h',
  '7d': 'Last 7d',
  '30d': 'Last 30d',
  all: 'All time',
};

// ---------------------------------------------------------------------------
// FilterDropdown — compact button + checkbox popover per facet
// ---------------------------------------------------------------------------

function FilterDropdown<T extends string>({
  label,
  options,
  selected,
  onToggle,
  labels,
  testIdPrefix,
}: {
  label: string;
  options: readonly T[];
  selected: ReadonlySet<T>;
  onToggle: (value: T) => void;
  labels: Record<T, string>;
  testIdPrefix: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false), open);

  const summary =
    selected.size === 0
      ? 'All'
      : selected.size <= 2
        ? Array.from(selected).map((s) => labels[s]).join(', ')
        : `${selected.size} selected`;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        data-testid={`${testIdPrefix}-dropdown`}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-[5px] text-xs font-medium rounded cursor-pointer font-[inherit] whitespace-nowrap bg-surface text-text-secondary border',
          selected.size > 0 ? 'border-primary' : 'border-border',
        )}
      >
        <span className="text-text-tertiary font-semibold text-[11px]">
          {label}
        </span>
        <span
          className={cn(
            selected.size > 0 ? 'text-primary font-semibold' : 'text-text-secondary font-medium',
          )}
        >
          {summary}
        </span>
        <span className="text-[9px] ml-0.5 opacity-60">&#9662;</span>
      </button>
      {open && (
        <div
          className="absolute top-full left-0 mt-1 bg-white border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] py-1"
        >
          {options.map((opt) => (
            <label
              key={opt}
              data-testid={`${testIdPrefix}-${opt}`}
              className="flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer text-text-primary hover:bg-[#f1f5f9]"
            >
              <input
                type="checkbox"
                checked={selected.has(opt)}
                onChange={() => onToggle(opt)}
                className="m-0 accent-primary"
              />
              {labels[opt]}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// RunsFilterBar
// ---------------------------------------------------------------------------

export interface RunsFilterBarProps {
  query: string;
  statuses: ReadonlySet<StatusKey>;
  triggerKinds: ReadonlySet<TriggerKindKey>;
  range: DateRangeKey;
  onQueryChange: (q: string) => void;
  onStatusToggle: (s: StatusKey) => void;
  onTriggerToggle: (k: TriggerKindKey) => void;
  onRangeChange: (r: DateRangeKey) => void;
  onClearFilters: () => void;
}

export default function RunsFilterBar({
  query,
  statuses,
  triggerKinds,
  range,
  onQueryChange,
  onStatusToggle,
  onTriggerToggle,
  onRangeChange,
  onClearFilters,
}: RunsFilterBarProps) {
  const hasActiveFilters = statuses.size > 0 || triggerKinds.size > 0 || query.length > 0;

  return (
    <div
      className="flex items-center gap-2 px-3 py-2 bg-[#fafbfc] border border-border rounded-md"
    >
      <input
        id="runs-search"
        type="search"
        data-testid="runs-search-input"
        placeholder="Search…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="flex-[1_1_180px] max-w-[240px] px-2.5 py-[5px] text-xs border border-border-field rounded-md font-[inherit] bg-[#f9fafb] text-text-primary outline-none"
        aria-label="Search runs by run id or pipeline id"
      />

      <div className="w-px h-5 bg-border shrink-0" />

      <div role="radiogroup" aria-label="Date range" className="flex gap-0.5">
        {DATE_RANGE_KEYS.map((r) => (
          <button
            key={r}
            type="button"
            role="radio"
            aria-checked={range === r}
            data-testid={`runs-range-${r}`}
            onClick={() => onRangeChange(r)}
            className={cn(
              'px-2 py-1 text-[11px] border-none rounded-[3px] cursor-pointer font-[inherit]',
              range === r
                ? 'font-semibold bg-primary text-white'
                : 'font-medium bg-transparent text-text-secondary',
            )}
          >
            {RANGE_LABEL[r]}
          </button>
        ))}
      </div>

      <div className="w-px h-5 bg-border shrink-0" />

      <FilterDropdown
        label="Status"
        options={STATUS_KEYS}
        selected={statuses}
        onToggle={onStatusToggle}
        labels={STATUS_LABEL}
        testIdPrefix="runs-status-chip"
      />

      <FilterDropdown
        label="Trigger"
        options={TRIGGER_KIND_KEYS}
        selected={triggerKinds}
        onToggle={onTriggerToggle}
        labels={TRIGGER_LABEL}
        testIdPrefix="runs-trigger-chip"
      />

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="px-2 py-[3px] text-[11px] bg-none border-none text-text-tertiary cursor-pointer font-[inherit] underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
