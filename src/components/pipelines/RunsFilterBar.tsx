import { useRef, useState } from 'react';
import { useClickOutside } from './hooks/useClickOutside';
import { colors, fieldStyle } from '../../constants/styles';
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
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        data-testid={`${testIdPrefix}-dropdown`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 10px',
          fontSize: 12,
          fontWeight: 500,
          border: `1px solid ${selected.size > 0 ? colors.primary : colors.border}`,
          background: colors.surface,
          color: colors.textSecondary,
          borderRadius: 4,
          cursor: 'pointer',
          fontFamily: 'inherit',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: colors.textTertiary, fontWeight: 600, fontSize: 11 }}>
          {label}
        </span>
        <span
          style={{
            color: selected.size > 0 ? colors.primary : colors.textSecondary,
            fontWeight: selected.size > 0 ? 600 : 500,
          }}
        >
          {summary}
        </span>
        <span style={{ fontSize: 9, marginLeft: 2, opacity: 0.6 }}>&#9662;</span>
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 4,
            background: '#fff',
            border: `1px solid ${colors.border}`,
            borderRadius: 6,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            zIndex: 50,
            minWidth: 160,
            padding: '4px 0',
          }}
        >
          {options.map((opt) => (
            <label
              key={opt}
              data-testid={`${testIdPrefix}-${opt}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 12px',
                fontSize: 12,
                cursor: 'pointer',
                color: colors.textPrimary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.surfaceHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <input
                type="checkbox"
                checked={selected.has(opt)}
                onChange={() => onToggle(opt)}
                style={{ margin: 0, accentColor: colors.primary }}
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
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        background: colors.surfaceInset,
        border: `1px solid ${colors.border}`,
        borderRadius: 6,
      }}
    >
      <input
        id="runs-search"
        type="search"
        data-testid="runs-search-input"
        placeholder="Search…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        style={{ ...fieldStyle, flex: '1 1 180px', maxWidth: 240, padding: '5px 10px', fontSize: 12 }}
        aria-label="Search runs by run id or pipeline id"
      />

      <div style={{ width: 1, height: 20, background: colors.border, flexShrink: 0 }} />

      <div role="radiogroup" aria-label="Date range" style={{ display: 'flex', gap: 2 }}>
        {DATE_RANGE_KEYS.map((r) => (
          <button
            key={r}
            type="button"
            role="radio"
            aria-checked={range === r}
            data-testid={`runs-range-${r}`}
            onClick={() => onRangeChange(r)}
            style={{
              padding: '4px 8px',
              fontSize: 11,
              fontWeight: range === r ? 600 : 500,
              border: 'none',
              background: range === r ? colors.primary : 'transparent',
              color: range === r ? '#fff' : colors.textSecondary,
              borderRadius: 3,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {RANGE_LABEL[r]}
          </button>
        ))}
      </div>

      <div style={{ width: 1, height: 20, background: colors.border, flexShrink: 0 }} />

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
          style={{
            padding: '3px 8px',
            fontSize: 11,
            background: 'none',
            border: 'none',
            color: colors.textTertiary,
            cursor: 'pointer',
            fontFamily: 'inherit',
            textDecoration: 'underline',
          }}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
