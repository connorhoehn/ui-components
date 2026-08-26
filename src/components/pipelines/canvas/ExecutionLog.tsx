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
import { focusInitialElement, restoreFocus, trapTabKey } from '../../../lib/focusTrap';
import { useOverlayLayer } from '../../../lib/overlayStack';
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

  // Close fullscreen on Escape, and trap Tab inside it. The overlay is a
  // full-viewport scrim, but focus stayed on the "fullscreen" toggle behind
  // it and Tab kept cycling the hidden canvas underneath — the user was
  // driving controls they could no longer see.
  const fullscreenPanelRef = useRef<HTMLDivElement | null>(null);
  const preFullscreenFocusRef = useRef<HTMLElement | null>(null);
  const isTopLayer = useOverlayLayer(fullscreen);
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (!isTopLayer()) return;
      if (e.key === 'Escape') {
        setFullscreen(false);
        return;
      }
      trapTabKey(e, fullscreenPanelRef.current);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fullscreen, isTopLayer]);

  useEffect(() => {
    if (!fullscreen) return;
    preFullscreenFocusRef.current =
      (typeof document !== 'undefined' ? document.activeElement : null) as HTMLElement | null;
    focusInitialElement(fullscreenPanelRef.current);
    return () => {
      restoreFocus(preFullscreenFocusRef.current);
      preFullscreenFocusRef.current = null;
    };
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
        className="flex items-center gap-2 px-3 py-1.5 bg-surface-panel border-b border-border shrink-0"
        data-testid="execution-log-filter-chip-row"
      >
        <span
          className="inline-flex items-center gap-1.5 px-2.5 pl-2.5 py-0.5 bg-info-bg text-info-fg border border-info-border rounded-full text-[11px] font-semibold font-inherit"
          data-testid="execution-log-filter-chip"
        >
          <span aria-hidden="true">🎯</span>
          <span>Node: {label}</span>
          {/* `filterByNodeId` is caller-owned, so only the caller can clear
              it. Without `onClearFilter` the × was a live control that left
              the log filtered — the user's only reading being that the
              filter is stuck. */}
          {onClearFilter && (
            <button
              type="button"
              className="w-4 h-4 border-none bg-transparent text-info-fg cursor-pointer text-sm font-inherit leading-none p-0 inline-flex items-center justify-center"
              onClick={() => onClearFilter()}
              aria-label="Clear node filter"
              data-testid="execution-log-filter-chip-clear"
            >
              {'×'}
            </button>
          )}
        </span>
      </div>
    );
  };

  const renderRows = () => {
    if (visible.length === 0) {
      return (
        <div className="p-4 text-xs text-text-tertiary">
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
              ref={fullscreenPanelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Execution log, fullscreen"
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
                    className="absolute bottom-2.5 right-3.5 px-3 py-1.5 text-[11px] font-semibold bg-surface-inverse text-text-inverse border-none rounded-full cursor-pointer font-inherit shadow-lg z-[2]"
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
          'shrink-0 transition-[height] duration-[160ms] ease-[cubic-bezier(0.4,0,0.2,1)] border-t border-border bg-white flex flex-col font-inherit',
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
                className="absolute bottom-2.5 right-3.5 px-3 py-1.5 text-[11px] font-semibold bg-surface-inverse text-text-inverse border-none rounded-full cursor-pointer font-inherit shadow-lg z-[2]"
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
