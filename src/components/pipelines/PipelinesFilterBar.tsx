// src/components/pipelines/PipelinesFilterBar.tsx
//
// Filter bar for the pipelines list page: search input, status filter chips,
// trigger dropdown, sort dropdown, and a select-all checkbox.

import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import { Checkbox } from '../forms/Checkbox';
import type { StatusKey } from './PipelinesPage';
import { STATUS_KEYS } from './PipelinesPage';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

const STATUS_LABEL: Record<StatusKey, string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
};

export type TriggerFilter = 'all' | 'manual' | 'document' | 'schedule' | 'webhook';
export type SortKey = 'updated' | 'name' | 'created';

export interface PipelinesFilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter: Set<StatusKey>;
  statusExplicit: boolean;
  onToggleStatusKey: (k: StatusKey) => void;
  triggerFilter: TriggerFilter;
  onTriggerFilterChange: (v: TriggerFilter) => void;
  sortKey: SortKey;
  onSortKeyChange: (v: SortKey) => void;
  // Select-all checkbox
  allVisibleSelected: boolean;
  /** "Some but not all visible selected" — drives the mixed checkbox state. */
  someVisibleSelected: boolean;
  onHeaderToggleAll: () => void;
}

// Default status keys (used to determine "active" state when URL is implicit).
const DEFAULT_STATUS_KEYS: readonly StatusKey[] = ['draft', 'published'] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PipelinesFilterBar({
  search,
  onSearchChange,
  statusFilter,
  statusExplicit,
  onToggleStatusKey,
  triggerFilter,
  onTriggerFilterChange,
  sortKey,
  onSortKeyChange,
  allVisibleSelected,
  someVisibleSelected,
  onHeaderToggleAll,
}: PipelinesFilterBarProps) {
  return (
    <div
      className={cn(
        'min-h-[40px] shrink-0 flex items-center gap-3 px-6',
        'border-b border-border bg-surface',
      )}
    >
      {/* Select-all checkbox */}
      <label
        className="flex items-center gap-1.5 cursor-pointer"
        title="Select all visible pipelines"
      >
        <Checkbox
          data-testid="pipeline-select-all"
          aria-label="Select all visible pipelines"
          checked={allVisibleSelected}
          indeterminate={someVisibleSelected && !allVisibleSelected}
          onChange={onHeaderToggleAll}
        />
        <span className="text-[11px] text-text-tertiary">All</span>
      </label>

      {/* Search */}
      <Input
        data-testid="pipeline-search"
        type="search"
        size="sm"
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-[0_1_260px] min-w-45"
        aria-label="Search pipelines"
      />

      {/* Status filter chips */}
      <span
        id="pipelines-status-label"
        className="text-xs text-text-secondary font-medium"
      >
        Status:
      </span>
      <div
        role="group"
        aria-labelledby="pipelines-status-label"
        className="flex gap-1.5 flex-nowrap shrink-0"
      >
        {STATUS_KEYS.map((s) => {
          const active = statusExplicit
            ? statusFilter.has(s)
            : (DEFAULT_STATUS_KEYS as readonly StatusKey[]).includes(s);
          return (
            <button
              key={s}
              type="button"
              role="checkbox"
              aria-checked={active}
              data-testid={`status-chip-${s}`}
              onClick={() => onToggleStatusKey(s)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggleStatusKey(s);
                }
              }}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded cursor-pointer font-inherit',
                active
                  ? 'border border-primary bg-primary text-white'
                  : 'border border-border bg-surface text-text-secondary',
              )}
            >
              {STATUS_LABEL[s]}
            </button>
          );
        })}
      </div>

      {/* Trigger filter */}
      <label className="text-xs text-text-secondary flex items-center gap-1.5">
        Trigger:
        <Select
          data-testid="trigger-filter"
          size="sm"
          value={triggerFilter}
          onChange={(e) => onTriggerFilterChange(e.target.value as TriggerFilter)}
          aria-label="Trigger filter"
          options={[
            { value: 'all', label: 'All' },
            { value: 'manual', label: 'Manual' },
            { value: 'document', label: 'Document event' },
            { value: 'schedule', label: 'Schedule' },
            { value: 'webhook', label: 'Webhook' },
          ]}
        />
      </label>

      {/* Sort */}
      <label className="text-xs text-text-secondary flex items-center gap-1.5 ml-auto">
        Sort:
        <Select
          data-testid="sort-key"
          size="sm"
          value={sortKey}
          onChange={(e) => onSortKeyChange(e.target.value as SortKey)}
          aria-label="Sort pipelines"
          options={[
            { value: 'updated', label: 'Recently updated' },
            { value: 'name', label: 'Name A-Z' },
            { value: 'created', label: 'Recently created' },
          ]}
        />
      </label>
    </div>
  );
}
