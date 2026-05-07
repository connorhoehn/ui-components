// src/components/pipelines/PipelinesFilterBar.tsx
//
// Filter bar for the pipelines list page: search input, status filter chips,
// trigger dropdown, sort dropdown, and a select-all checkbox.

import type { RefObject } from 'react';
import { cn } from '../../lib/cn';
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
  selectAllRef: RefObject<HTMLInputElement | null>;
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
  selectAllRef,
  onHeaderToggleAll,
}: PipelinesFilterBarProps) {
  return (
    <div
      className={cn(
        'min-h-[40px] shrink-0 flex items-center gap-3 px-6',
        'border-b border-border bg-white',
      )}
    >
      {/* Select-all checkbox */}
      <label
        className="flex items-center gap-1.5 cursor-pointer"
        title="Select all visible pipelines"
      >
        <input
          ref={selectAllRef}
          type="checkbox"
          data-testid="pipeline-select-all"
          aria-label="Select all visible pipelines"
          checked={allVisibleSelected}
          onChange={onHeaderToggleAll}
          className="w-3.5 h-3.5 accent-primary"
        />
        <span className="text-[11px] text-text-tertiary">All</span>
      </label>

      {/* Search */}
      <input
        data-testid="pipeline-search"
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className={cn(
          'border border-border-field rounded-md px-2.5 py-1.5 text-[13px]',
          'bg-[#f9fafb] text-text-primary outline-none',
          'flex-[0_1_260px] min-w-[180px]',
        )}
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
                  : 'border border-border bg-white text-text-secondary',
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
        <select
          data-testid="trigger-filter"
          value={triggerFilter}
          onChange={(e) => onTriggerFilterChange(e.target.value as TriggerFilter)}
          className={cn(
            'border border-border-field rounded-md px-2 py-1 text-[13px]',
            'bg-[#f9fafb] text-text-primary outline-none',
          )}
        >
          <option value="all">All</option>
          <option value="manual">Manual</option>
          <option value="document">Document event</option>
          <option value="schedule">Schedule</option>
          <option value="webhook">Webhook</option>
        </select>
      </label>

      {/* Sort */}
      <label className="text-xs text-text-secondary flex items-center gap-1.5 ml-auto">
        Sort:
        <select
          data-testid="sort-key"
          value={sortKey}
          onChange={(e) => onSortKeyChange(e.target.value as SortKey)}
          className={cn(
            'border border-border-field rounded-md px-2 py-1 text-[13px]',
            'bg-[#f9fafb] text-text-primary outline-none',
          )}
        >
          <option value="updated">Recently updated</option>
          <option value="name">Name A-Z</option>
          <option value="created">Recently created</option>
        </select>
      </label>
    </div>
  );
}
