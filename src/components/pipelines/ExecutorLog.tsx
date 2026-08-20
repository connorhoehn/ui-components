// frontend/src/components/pipelines/ExecutorLog.tsx
//
// hub#2225 — Executor Log timeline view for a single pipeline run. Reads
// audit rows via `usePipelineRunAuditLog` (which combines REST polling with
// live WS event-stream appends) and renders them as a vertical timeline
// with:
//
//   - A sticky filter bar (action multi-select chips, actor input,
//     time-range presets).
//   - A "● Live" pulse indicator (greys out when the hook reports `error`).
//   - Per-row colored markers keyed off the action class.
//   - Expandable JSON detail (the audit row's `trace`).
//   - "Download log" button that emits NDJSON of the currently filtered set.
//   - "Load more" button when the hook reports `hasMore`.
//   - Click on a `pipeline.step.*` row → forwards the stepId to
//     `onStepClick` so the parent can highlight the node on the canvas
//     (current run-replay surface uses StepTree; canvas highlight is a
//     TODO at the call site).
//
// The empty-state copy intentionally references hub#2224 (commit 6d06b76,
// 2026-05-07) so operators looking at older runs understand why no rows
// appear.

import React, { useCallback, useMemo, useState } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import {
  usePipelineRunAuditLog,
  type UsePipelineRunAuditLogResult,
} from './hooks/usePipelineRunAuditLog';
import type { AuditRow } from '../../api/pipelineAudit';
import { Input } from '../forms/Input';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface ExecutorLogProps {
  pipelineId: string;
  runId: string;
  /**
   * Called when an operator clicks a `pipeline.step.*` row. Receives the
   * stepId pulled from the audit row's `details.stepId` / `trace.stepId`.
   * Optional — when omitted the rows are still expandable but the click
   * is a no-op.
   */
  onStepClick?: (stepId: string) => void;
}

// ---------------------------------------------------------------------------
// Marker color table — see hub#2225 task description.
// ---------------------------------------------------------------------------

const COLOR_BLUE = '#3b82f6';
const COLOR_YELLOW = '#eab308';
const COLOR_ORANGE = '#f97316';
const COLOR_GRAY = '#64748b';
const COLOR_RED = '#ef4444';
const COLOR_PURPLE = '#a855f7';

function markerColor(row: AuditRow): string {
  // Error/failure paths win regardless of action namespace.
  if (row.action === 'pipeline.step.failed' || row.outcome === 'error') {
    return COLOR_RED;
  }
  // Resume + context-patch families share the purple "manual intervention" tone.
  if (
    row.action === 'pipeline.run.resumed-from-step' ||
    row.action.startsWith('pipeline.step.context.patched')
  ) {
    return COLOR_PURPLE;
  }
  if (row.action.startsWith('pipeline.approval.')) return COLOR_YELLOW;
  if (row.action.startsWith('pipeline.breakpoint.')) return COLOR_ORANGE;
  if (row.action.startsWith('pipeline.step.')) return COLOR_BLUE;
  if (row.action.startsWith('pipeline.run.')) return COLOR_GRAY;
  return COLOR_GRAY;
}

// ---------------------------------------------------------------------------
// Filter helpers
// ---------------------------------------------------------------------------

type TimePreset = '1h' | '24h' | 'all';

const TIME_PRESET_LABEL: Record<TimePreset, string> = {
  '1h': 'Last 1h',
  '24h': 'Last 24h',
  all: 'All',
};

/** Action chip groupings — keep the chip set small and predictable. */
const ACTION_CHIPS: Array<{ label: string; matches: (action: string) => boolean }> = [
  { label: 'Steps', matches: (a) => a.startsWith('pipeline.step.') },
  { label: 'Approvals', matches: (a) => a.startsWith('pipeline.approval.') || a === 'pipeline.approve' || a === 'pipeline.reject' },
  { label: 'Breakpoints', matches: (a) => a.startsWith('pipeline.breakpoint.') || a === 'pipeline.step.breakpoint.hit' },
  { label: 'Run lifecycle', matches: (a) => a.startsWith('pipeline.run.') || a === 'pipeline.trigger' || a === 'pipeline.cancel' },
  { label: 'Errors', matches: (a) => a === 'pipeline.step.failed' || a === 'pipeline.run.failed' || a === 'pipeline.force_fail' },
];

function presetCutoffMs(preset: TimePreset): number | null {
  if (preset === 'all') return null;
  const now = Date.now();
  if (preset === '1h') return now - 60 * 60 * 1000;
  return now - 24 * 60 * 60 * 1000;
}

/** Pull a stepId out of an audit row, in priority order. */
function extractStepId(row: AuditRow): string | undefined {
  const details = row.details as Record<string, unknown> | undefined;
  const trace = row.trace as Record<string, unknown> | undefined;
  const fromDetails = details && typeof details['stepId'] === 'string' ? (details['stepId'] as string) : undefined;
  const fromTrace = trace && typeof trace['stepId'] === 'string' ? (trace['stepId'] as string) : undefined;
  // The route handler stores nodeId under various names depending on the action.
  const target = trace && typeof trace['nodeId'] === 'string' ? (trace['nodeId'] as string) : undefined;
  return fromDetails ?? fromTrace ?? target;
}

/** Compact "12s ago" / "4m ago" / "2h ago" helper — intentionally tiny. */
function formatRelative(iso: string, nowMs: number = Date.now()): string {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return iso;
  const deltaSec = Math.max(0, Math.floor((nowMs - t) / 1000));
  if (deltaSec < 5) return 'just now';
  if (deltaSec < 60) return `${deltaSec}s ago`;
  const m = Math.floor(deltaSec / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ExecutorLog({
  pipelineId,
  runId,
  onStepClick,
}: ExecutorLogProps) {
  const result: UsePipelineRunAuditLogResult = usePipelineRunAuditLog(pipelineId, runId);
  const { items, error, hasMore, loadMore, loading } = result;

  // ── Filter state ───────────────────────────────────────────────────
  const [activeChips, setActiveChips] = useState<Set<string>>(new Set());
  const [actorFilter, setActorFilter] = useState<string>('');
  const [timePreset, setTimePreset] = useState<TimePreset>('all');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleChip = useCallback((label: string) => {
    setActiveChips((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }, []);

  const toggleExpanded = useCallback((auditId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(auditId)) next.delete(auditId);
      else next.add(auditId);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    const cutoff = presetCutoffMs(timePreset);
    const actorTrim = actorFilter.trim().toLowerCase();
    const chipMatchers = ACTION_CHIPS.filter((c) => activeChips.has(c.label));
    return items.filter((row) => {
      // Action chips — empty selection means "all".
      if (chipMatchers.length > 0) {
        if (!chipMatchers.some((c) => c.matches(row.action))) return false;
      }
      // Actor — case-insensitive substring.
      if (actorTrim && !row.actorUserId.toLowerCase().includes(actorTrim)) return false;
      // Time preset.
      if (cutoff !== null) {
        const t = Date.parse(row.timestamp);
        if (!Number.isFinite(t) || t < cutoff) return false;
      }
      return true;
    });
  }, [items, activeChips, actorFilter, timePreset]);

  // ── Download as NDJSON ────────────────────────────────────────────
  const handleDownload = useCallback(() => {
    if (typeof window === 'undefined') return;
    const ndjson = filtered.map((r) => JSON.stringify(r)).join('\n') + (filtered.length > 0 ? '\n' : '');
    const blob = new Blob([ndjson], { type: 'application/x-ndjson' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `executor-log-${runId}.ndjson`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [filtered, runId]);

  const handleRowClick = useCallback(
    (row: AuditRow) => {
      toggleExpanded(row.auditId);
      if (!onStepClick) return;
      if (!row.action.startsWith('pipeline.step.')) return;
      const stepId = extractStepId(row);
      if (stepId) onStepClick(stepId);
    },
    [onStepClick, toggleExpanded],
  );

  // ── Live indicator ─────────────────────────────────────────────────

  return (
    <div
      className="flex flex-col flex-1 min-h-0 bg-surface border border-border rounded-lg overflow-hidden"
      data-testid="executor-log"
    >
      {/* ── Sticky filter bar ─────────────────────────────────────── */}
      <div className="sticky top-0 z-[2] flex flex-wrap items-center gap-2 px-3 py-2.5 bg-[#f8fafc] border-b border-border text-xs">
        <span
          className={cn(
            'inline-flex items-center text-[11px] font-semibold',
            error ? 'text-text-tertiary' : 'text-text-secondary',
          )}
          data-testid="executor-log-live-indicator"
          title={error ? `Live updates unavailable: ${error}` : 'Live updates active'}
        >
          <span
            className={cn(
              'inline-block w-2 h-2 rounded-full mr-1.5 align-middle',
              error ? 'bg-text-tertiary' : 'bg-[#22c55e] [animation:executor-log-pulse_1.6s_ease-in-out_infinite]',
            )}
            aria-hidden
          />
          Live
        </span>

        <span className="text-border">|</span>

        {ACTION_CHIPS.map((chip) => {
          const active = activeChips.has(chip.label);
          return (
            <button
              key={chip.label}
              type="button"
              className={cn(
                'font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer',
                active
                  ? 'bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]'
                  : 'bg-surface text-text-secondary border-border',
              )}
              onClick={() => toggleChip(chip.label)}
              data-testid={`executor-log-chip-${chip.label.toLowerCase().replace(/\s+/g, '-')}`}
              aria-pressed={active}
            >
              {chip.label}
            </button>
          );
        })}

        <span className="text-border">|</span>

        <Input
          size="sm"
          value={actorFilter}
          onChange={(e) => setActorFilter(e.target.value)}
          placeholder="Actor"
          className="min-w-30"
          data-testid="executor-log-actor-input"
          aria-label="Filter by actor"
        />

        <span className="text-border">|</span>

        {(['1h', '24h', 'all'] as const).map((preset) => {
          const active = timePreset === preset;
          return (
            <button
              key={preset}
              type="button"
              className={cn(
                'font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer',
                active
                  ? 'bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]'
                  : 'bg-surface text-text-secondary border-border',
              )}
              onClick={() => setTimePreset(preset)}
              data-testid={`executor-log-time-${preset}`}
              aria-pressed={active}
            >
              {TIME_PRESET_LABEL[preset]}
            </button>
          );
        })}

        <div className="flex-1" />

        <span className="text-[11px] text-text-tertiary">
          {filtered.length} of {items.length} shown
        </span>
      </div>

      {/* ── Timeline ──────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-3 relative" data-testid="executor-log-timeline">
        {loading && items.length === 0 && (
          <div className="text-xs text-text-tertiary p-3">
            Loading audit rows…
          </div>
        )}

        {!loading && items.length === 0 && (
          <div
            className="px-3 py-6 text-[13px] text-text-secondary text-center leading-relaxed"
            data-testid="executor-log-empty"
          >
            Audit log started recording on 2026-05-07 (hub#2224). This run predates that — no rows captured.
          </div>
        )}

        {filtered.length === 0 && items.length > 0 && (
          <div
            className="px-3 py-5 text-xs text-text-tertiary text-center"
            data-testid="executor-log-no-matches"
          >
            No audit rows match the current filters.
          </div>
        )}

        {filtered.map((row) => {
          const expanded = expandedIds.has(row.auditId);
          const isStepRow = row.action.startsWith('pipeline.step.');
          const stepId = isStepRow ? extractStepId(row) : undefined;
          return (
            <div
              key={row.auditId}
              className="grid grid-cols-[14px_auto_auto_1fr] items-baseline gap-2.5 py-1.5 text-xs border-b border-[#fafbfc] cursor-pointer"
              onClick={() => handleRowClick(row)}
              data-testid="executor-log-row"
              data-action={row.action}
              data-audit-id={row.auditId}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 self-center"
                style={{ background: markerColor(row) }}
                aria-hidden
                data-testid="executor-log-marker"
              />
              <span
                className="text-text-tertiary font-mono text-[11px] whitespace-nowrap"
                title={row.timestamp}
              >
                {formatRelative(row.timestamp)}
              </span>
              <span className="text-text-secondary text-[11px] whitespace-nowrap">
                {row.actorUserId}
              </span>
              <span className="text-text-primary flex items-baseline gap-1.5 flex-wrap">
                <code className="font-mono text-[11px] bg-[#fafbfc] px-1.5 py-px rounded-[3px]">
                  {row.action}
                </code>
                {stepId && (
                  <span className="text-[11px] text-text-tertiary" data-testid="executor-log-stepid">
                    · {stepId.slice(0, 14)}{stepId.length > 14 ? '…' : ''}
                  </span>
                )}
                {row.outcome && (
                  <span
                    className={cn(
                      'text-[11px]',
                      row.outcome === 'error' ? 'text-[#b91c1c]' : 'text-text-tertiary',
                    )}
                  >
                    · {row.outcome}
                  </span>
                )}
              </span>
              {expanded && row.trace && (
                <pre
                  className="col-[2/span_3] mt-1 p-2 bg-[#fafbfc] border border-border rounded text-[11px] font-mono text-text-secondary overflow-x-auto"
                  data-testid="executor-log-trace"
                  onClick={(e) => e.stopPropagation()}
                >
                  {JSON.stringify(row.trace, null, 2)}
                </pre>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <div className="flex justify-between items-center gap-2 px-3 py-2.5 border-t border-border bg-[#f8fafc]">
        {hasMore ? (
          <span data-testid="executor-log-load-more">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => loadMore()}
            >
              Load more
            </Button>
          </span>
        ) : (
          <span />
        )}
        <span data-testid="executor-log-download">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownload}
            disabled={filtered.length === 0}
          >
            Download log
          </Button>
        </span>
      </div>
    </div>
  );
}
