import { useState } from 'react';
import { cn } from '../../../lib/cn';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type LogFilter = 'all' | 'errors' | 'approvals' | 'llm' | 'lifecycle';

const FILTER_LABEL: Record<LogFilter, string> = {
  all: 'All',
  errors: 'Errors',
  approvals: 'Approvals',
  llm: 'LLM',
  lifecycle: 'Lifecycle',
};

export interface LogFilterBarProps {
  filter: LogFilter;
  onFilterChange: (filter: LogFilter) => void;
  statusLabel: string;
  rowCount: number;
  expanded: boolean;
  onToggleExpand: () => void;
  onExport: () => void;
  onClear: () => void;
  inFullscreen: boolean;
  onFullscreenToggle: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LogFilterBar({
  filter,
  onFilterChange,
  statusLabel,
  rowCount,
  expanded,
  onToggleExpand,
  onExport,
  onClear,
  inFullscreen,
  onFullscreenToggle,
}: LogFilterBarProps) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="h-10 px-3 flex items-center gap-2.5 border-b border-border shrink-0">
      {!inFullscreen ? (
        <button
          type="button"
          className="w-6 h-6 p-0 border-none bg-transparent text-neutral cursor-pointer text-xs leading-none font-inherit"
          onClick={onToggleExpand}
          aria-label={expanded ? 'Collapse log' : 'Expand log'}
        >
          {expanded ? '▾' : '▸'}
        </button>
      ) : null}
      <div className="flex-1 text-xs text-text-secondary">{statusLabel}</div>

      {/* Export button */}
      <button
        type="button"
        className="px-2.5 py-1 text-[11px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer font-inherit"
        onClick={onExport}
        disabled={rowCount === 0}
        title="Download event log as JSON"
      >
        Export
      </button>

      {/* Filter dropdown */}
      <div className="relative">
        <button
          type="button"
          className="px-2.5 py-1 text-[11px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer font-inherit"
          onClick={() => setFilterOpen((x) => !x)}
        >
          {FILTER_LABEL[filter]} {'▾'}
        </button>
        {filterOpen ? (
          <div className="absolute right-0 bottom-full mb-1 bg-white border border-border rounded-md shadow-lg z-[3] min-w-[140px]">
            {(Object.keys(FILTER_LABEL) as LogFilter[]).map((key) => (
              <button
                type="button"
                key={key}
                onClick={() => {
                  onFilterChange(key);
                  setFilterOpen(false);
                }}
                className={cn(
                  'block w-full text-left px-3 py-2 text-xs border-none text-text-primary cursor-pointer font-inherit',
                  filter === key ? 'bg-surface-hover' : 'bg-transparent',
                )}
              >
                {FILTER_LABEL[key]}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <button
        type="button"
        className="px-2.5 py-1 text-[11px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer font-inherit"
        onClick={onClear}
        title="Clear log"
      >
        Clear
      </button>
      {inFullscreen ? (
        <button
          type="button"
          className="px-2.5 py-1 text-[11px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer font-inherit"
          onClick={onFullscreenToggle}
          aria-label="Close fullscreen log"
          data-testid="execution-log-fullscreen-close"
          title="Close fullscreen (Esc)"
        >
          {'×'}
        </button>
      ) : (
        <button
          type="button"
          className="px-2.5 py-1 text-[11px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer font-inherit"
          onClick={onFullscreenToggle}
          aria-label="Fullscreen log"
          data-testid="execution-log-fullscreen-btn"
          title="Fullscreen log"
        >
          {'⛶'}
        </button>
      )}
    </div>
  );
}
