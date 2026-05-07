// frontend/src/components/pipelines/canvas/ExecutionLog.tsx
//
// Bottom collapsible strip per PIPELINES_PLAN.md §18.4.6.
//
// Collapsed (40px): status + filter + controls. Expanded (240px): scrollable
// event list. Subscribes to the EventStream wildcard channel and keeps the
// last 500 events in local state; filtering is applied client-side.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { PipelineEventMap } from '../../../types/pipeline';
import { useEventStream } from '../context/EventStreamContext';
import { cn } from '../../../lib/cn';
import LogRow from './LogRow';
import type { LogRowData } from './LogRow';
import LogFilterBar from './LogFilterBar';
import type { LogFilter } from './LogFilterBar';

// ---------------------------------------------------------------------------
// Local types
// ---------------------------------------------------------------------------

export interface ExecutionLogProps {
  /**
   * When set, the log only shows events whose payload references this node
   * (via `payload.stepId` or `payload.nodeId`). The chip above the rows
   * surfaces the current filter with a x to clear.
   */
  filterByNodeId?: string | null;
  /** Called when the user clears the node filter from the chip. */
  onClearFilter?: () => void;
  /**
   * Optional human label for the filter chip. When omitted we fall back to
   * the raw nodeId.
   */
  filterNodeLabel?: string | null;
}

const MAX_EVENTS = 500;

function matchesFilter(eventType: string, filter: LogFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'errors') {
    return (
      eventType === 'pipeline.step.failed' ||
      eventType === 'pipeline.run.failed'
    );
  }
  if (filter === 'approvals') return eventType.startsWith('pipeline.approval.');
  if (filter === 'llm') return eventType.startsWith('pipeline.llm.');
  if (filter === 'lifecycle') {
    return (
      eventType.startsWith('pipeline.run.') ||
      eventType === 'pipeline.step.started' ||
      eventType === 'pipeline.step.completed' ||
      eventType === 'pipeline.step.skipped' ||
      eventType === 'pipeline.step.cancelled'
    );
  }
  return true;
}

function matchesNode(row: LogRowData, nodeId: string): boolean {
  const p = row.payload as Record<string, unknown> | null | undefined;
  if (!p || typeof p !== 'object') return false;
  if (typeof p.stepId === 'string' && p.stepId === nodeId) return true;
  if (typeof p.nodeId === 'string' && p.nodeId === nodeId) return true;
  return false;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ExecutionLog({
  filterByNodeId = null,
  onClearFilter,
  filterNodeLabel = null,
}: ExecutionLogProps = {}) {
  const [expanded, setExpanded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [filter, setFilter] = useState<LogFilter>('all');
  const [rows, setRows] = useState<LogRowData[]>([]);
  const [openRowId, setOpenRowId] = useState<number | null>(null);
  const [pinned, setPinned] = useState(true);

  const listRef = useRef<HTMLDivElement | null>(null);
  const nextIdRef = useRef(1);

  // Wildcard subscription
  useEventStream<keyof PipelineEventMap>('*', (envelope) => {
    const env = envelope as { eventType: string; payload: unknown };
    const row: LogRowData = {
      id: nextIdRef.current++,
      at: Date.now(),
      eventType: env.eventType,
      payload: env.payload,
    };
    setRows((prev) => {
      const next = [...prev, row];
      if (next.length > MAX_EVENTS) next.splice(0, next.length - MAX_EVENTS);
      return next;
    });
  });

  // Autoscroll when pinned
  useEffect(() => {
    if (!expanded && !fullscreen) return;
    if (!pinned) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [rows.length, expanded, fullscreen, pinned]);

  // Close fullscreen on Escape
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fullscreen]);

  const onScroll = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setPinned(distanceFromBottom < 8);
  }, []);

  const jumpToLatest = () => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    setPinned(true);
  };

  const visible = useMemo(
    () =>
      rows.filter((r) => {
        if (!matchesFilter(r.eventType, filter)) return false;
        if (filterByNodeId && !matchesNode(r, filterByNodeId)) return false;
        return true;
      }),
    [rows, filter, filterByNodeId],
  );

  const statusLabel = useMemo(() => {
    if (rows.length === 0) return 'Execution log · Ready';
    const errors = rows.filter(
      (r) =>
        r.eventType === 'pipeline.step.failed' ||
        r.eventType === 'pipeline.run.failed',
    ).length;
    const running = rows.some((r) => r.eventType === 'pipeline.step.started')
      && !rows.some((r) => r.eventType === 'pipeline.run.completed' || r.eventType === 'pipeline.run.failed');
    if (running) return `Running · ${errors} errors · ${rows.length} events`;
    return `Execution log · ${rows.length} events`;
  }, [rows]);

  const clear = () => {
    setRows([]);
    setOpenRowId(null);
  };

  const exportLog = () => {
    const data = {
      events: rows,
      exportedAt: new Date().toISOString(),
      totalEvents: rows.length,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pipeline-execution-log-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRowToggle = useCallback((id: number) => {
    setOpenRowId((cur) => (cur === id ? null : id));
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Render helpers
  // ─────────────────────────────────────────────────────────────────────────

  const renderFilterChip = () => {
    if (!filterByNodeId) return null;
    const label = filterNodeLabel ?? filterByNodeId;
    return (
      <div
        className="flex items-center gap-2 px-3 py-1.5 bg-[#f8fafc] border-b border-[#e2e8f0] shrink-0"
        data-testid="execution-log-filter-chip-row"
      >
        <span
          className="inline-flex items-center gap-1.5 px-2.5 pl-2.5 py-0.5 bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] rounded-full text-[11px] font-semibold font-inherit"
          data-testid="execution-log-filter-chip"
        >
          <span aria-hidden="true">🎯</span>
          <span>Node: {label}</span>
          <button
            type="button"
            className="w-4 h-4 border-none bg-transparent text-[#1d4ed8] cursor-pointer text-sm font-inherit leading-none p-0 inline-flex items-center justify-center"
            onClick={() => onClearFilter?.()}
            aria-label="Clear node filter"
            data-testid="execution-log-filter-chip-clear"
          >
            {'×'}
          </button>
        </span>
      </div>
    );
  };

  const renderRows = () => {
    if (visible.length === 0) {
      return (
        <div className="p-4 text-xs text-[#94a3b8]">
          {filterByNodeId ? 'No events for this node yet.' : 'No events yet.'}
        </div>
      );
    }
    return visible.map((row) => (
      <LogRow
        key={row.id}
        row={row}
        isOpen={openRowId === row.id}
        onToggle={handleRowToggle}
      />
    ));
  };

  // Fullscreen overlay
  const fullscreenOverlay =
    fullscreen && typeof document !== 'undefined'
      ? createPortal(
          <div
            className="fixed inset-0 bg-black/45 flex items-center justify-center z-[999]"
            data-testid="exec-log-fullscreen"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setFullscreen(false);
            }}
          >
            <div
              className="w-[90vw] h-[90vh] bg-white rounded-[10px] shadow-2xl flex flex-col overflow-hidden font-inherit"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <LogFilterBar
                filter={filter}
                onFilterChange={setFilter}
                statusLabel={statusLabel}
                rowCount={rows.length}
                expanded={expanded}
                onToggleExpand={() => setExpanded((x) => !x)}
                onExport={exportLog}
                onClear={clear}
                inFullscreen
                onFullscreenToggle={() => setFullscreen(false)}
              />
              {renderFilterChip()}
              <div
                ref={fullscreen ? listRef : undefined}
                className="flex-1 overflow-y-auto bg-white relative"
                onScroll={onScroll}
              >
                {renderRows()}
                {!pinned ? (
                  <button
                    type="button"
                    className="absolute bottom-2.5 right-3.5 px-3 py-1.5 text-[11px] font-semibold bg-[#0f172a] text-white border-none rounded-full cursor-pointer font-inherit shadow-lg z-[2]"
                    onClick={jumpToLatest}
                  >
                    Jump to latest
                  </button>
                ) : null}
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div
        className={cn(
          'shrink-0 transition-[height] duration-[160ms] ease-[cubic-bezier(0.4,0,0.2,1)] border-t border-[#e2e8f0] bg-white flex flex-col font-inherit',
          expanded && !fullscreen ? 'h-60' : 'h-10',
        )}
        data-testid="execution-log"
      >
        <LogFilterBar
          filter={filter}
          onFilterChange={setFilter}
          statusLabel={statusLabel}
          rowCount={rows.length}
          expanded={expanded}
          onToggleExpand={() => setExpanded((x) => !x)}
          onExport={exportLog}
          onClear={clear}
          inFullscreen={false}
          onFullscreenToggle={() => setFullscreen(true)}
        />
        {!fullscreen && expanded ? renderFilterChip() : null}
        {expanded && !fullscreen ? (
          <div ref={listRef} className="flex-1 overflow-y-auto bg-white relative" onScroll={onScroll}>
            {renderRows()}
            {!pinned ? (
              <button
                type="button"
                className="absolute bottom-2.5 right-3.5 px-3 py-1.5 text-[11px] font-semibold bg-[#0f172a] text-white border-none rounded-full cursor-pointer font-inherit shadow-lg z-[2]"
                onClick={jumpToLatest}
              >
                Jump to latest
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
      {fullscreenOverlay}
    </>
  );
}
