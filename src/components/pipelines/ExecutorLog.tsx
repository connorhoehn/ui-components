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
import type { CSSProperties } from 'react';
import { colors } from '../../constants/styles';
import Button from './ui/Button';
import {
  usePipelineRunAuditLog,
  type UsePipelineRunAuditLogResult,
} from './hooks/usePipelineRunAuditLog';
import type { AuditRow } from '../../api/pipelineAudit';

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
// Styles
// ---------------------------------------------------------------------------

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minHeight: 0,
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: 8,
  overflow: 'hidden',
};

const filterBarStyle: CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 2,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 8,
  padding: '10px 12px',
  background: colors.surfacePanel,
  borderBottom: `1px solid ${colors.border}`,
  fontSize: 12,
};

const chipBaseStyle: CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 11,
  fontWeight: 600,
  padding: '3px 9px',
  borderRadius: 12,
  border: `1px solid ${colors.border}`,
  background: colors.surface,
  color: colors.textSecondary,
  cursor: 'pointer',
};

const chipActiveStyle: CSSProperties = {
  background: '#dbeafe',
  color: '#1d4ed8',
  border: '1px solid #93c5fd',
};

const inputStyle: CSSProperties = {
  fontFamily: 'inherit',
  fontSize: 12,
  padding: '4px 8px',
  border: `1px solid ${colors.borderField}`,
  borderRadius: 4,
  background: colors.surface,
  color: colors.textPrimary,
  minWidth: 120,
};

const timelineStyle: CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  padding: '12px 16px',
  position: 'relative',
};

const rowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '14px auto auto 1fr',
  alignItems: 'baseline',
  gap: 10,
  padding: '6px 0',
  fontSize: 12,
  borderBottom: `1px solid ${colors.surfaceInset}`,
};

const markerStyle: CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: 999,
  flexShrink: 0,
  alignSelf: 'center',
};

const footerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 8,
  padding: '10px 12px',
  borderTop: `1px solid ${colors.border}`,
  background: colors.surfacePanel,
};

const pulseDotBase: CSSProperties = {
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: 999,
  marginRight: 6,
  verticalAlign: 'middle',
};

// CSS keyframes injected once — cheaper than a separate stylesheet for a
// single feature surface.
const KEYFRAMES_ID = 'executor-log-pulse-keyframes';
function ensurePulseKeyframes(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KEYFRAMES_ID)) return;
  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = `@keyframes executor-log-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
  }`;
  document.head.appendChild(style);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ExecutorLog({
  pipelineId,
  runId,
  onStepClick,
}: ExecutorLogProps) {
  ensurePulseKeyframes();

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
  const liveDotStyle: CSSProperties = useMemo(() => {
    return {
      ...pulseDotBase,
      background: error ? colors.textTertiary : '#22c55e',
      animation: error ? 'none' : 'executor-log-pulse 1.6s ease-in-out infinite',
    };
  }, [error]);

  return (
    <div style={containerStyle} data-testid="executor-log">
      {/* ── Sticky filter bar ─────────────────────────────────────── */}
      <div style={filterBarStyle}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: 11,
            color: error ? colors.textTertiary : colors.textSecondary,
            fontWeight: 600,
          }}
          data-testid="executor-log-live-indicator"
          title={error ? `Live updates unavailable: ${error}` : 'Live updates active'}
        >
          <span style={liveDotStyle} aria-hidden />
          Live
        </span>

        <span style={{ color: colors.border }}>|</span>

        {ACTION_CHIPS.map((chip) => {
          const active = activeChips.has(chip.label);
          return (
            <button
              key={chip.label}
              type="button"
              style={{ ...chipBaseStyle, ...(active ? chipActiveStyle : null) }}
              onClick={() => toggleChip(chip.label)}
              data-testid={`executor-log-chip-${chip.label.toLowerCase().replace(/\s+/g, '-')}`}
              aria-pressed={active}
            >
              {chip.label}
            </button>
          );
        })}

        <span style={{ color: colors.border }}>|</span>

        <input
          type="text"
          value={actorFilter}
          onChange={(e) => setActorFilter(e.target.value)}
          placeholder="Actor"
          style={inputStyle}
          data-testid="executor-log-actor-input"
          aria-label="Filter by actor"
        />

        <span style={{ color: colors.border }}>|</span>

        {(['1h', '24h', 'all'] as const).map((preset) => {
          const active = timePreset === preset;
          return (
            <button
              key={preset}
              type="button"
              style={{ ...chipBaseStyle, ...(active ? chipActiveStyle : null) }}
              onClick={() => setTimePreset(preset)}
              data-testid={`executor-log-time-${preset}`}
              aria-pressed={active}
            >
              {TIME_PRESET_LABEL[preset]}
            </button>
          );
        })}

        <div style={{ flex: 1 }} />

        <span style={{ fontSize: 11, color: colors.textTertiary }}>
          {filtered.length} of {items.length} shown
        </span>
      </div>

      {/* ── Timeline ──────────────────────────────────────────────── */}
      <div style={timelineStyle} data-testid="executor-log-timeline">
        {loading && items.length === 0 && (
          <div style={{ fontSize: 12, color: colors.textTertiary, padding: 12 }}>
            Loading audit rows…
          </div>
        )}

        {!loading && items.length === 0 && (
          <div
            style={{
              padding: '24px 12px',
              fontSize: 13,
              color: colors.textSecondary,
              textAlign: 'center',
              lineHeight: 1.5,
            }}
            data-testid="executor-log-empty"
          >
            Audit log started recording on 2026-05-07 (hub#2224). This run predates that — no rows captured.
          </div>
        )}

        {filtered.length === 0 && items.length > 0 && (
          <div
            style={{ padding: '20px 12px', fontSize: 12, color: colors.textTertiary, textAlign: 'center' }}
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
              style={{
                ...rowStyle,
                cursor: 'pointer',
              }}
              onClick={() => handleRowClick(row)}
              data-testid="executor-log-row"
              data-action={row.action}
              data-audit-id={row.auditId}
            >
              <span
                style={{ ...markerStyle, background: markerColor(row) }}
                aria-hidden
                data-testid="executor-log-marker"
              />
              <span
                style={{ color: colors.textTertiary, fontFamily: 'monospace', fontSize: 11, whiteSpace: 'nowrap' }}
                title={row.timestamp}
              >
                {formatRelative(row.timestamp)}
              </span>
              <span style={{ color: colors.textSecondary, fontSize: 11, whiteSpace: 'nowrap' }}>
                {row.actorUserId}
              </span>
              <span style={{ color: colors.textPrimary, display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                <code
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 11,
                    background: colors.surfaceInset,
                    padding: '1px 6px',
                    borderRadius: 3,
                  }}
                >
                  {row.action}
                </code>
                {stepId && (
                  <span style={{ fontSize: 11, color: colors.textTertiary }} data-testid="executor-log-stepid">
                    · {stepId.slice(0, 14)}{stepId.length > 14 ? '…' : ''}
                  </span>
                )}
                {row.outcome && (
                  <span
                    style={{
                      fontSize: 11,
                      color: row.outcome === 'error' ? '#b91c1c' : colors.textTertiary,
                    }}
                  >
                    · {row.outcome}
                  </span>
                )}
              </span>
              {expanded && row.trace && (
                <pre
                  style={{
                    gridColumn: '2 / span 3',
                    margin: '4px 0 0',
                    padding: 8,
                    background: colors.surfaceInset,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 4,
                    fontSize: 11,
                    fontFamily: 'monospace',
                    color: colors.textSecondary,
                    overflowX: 'auto',
                  }}
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
      <div style={footerStyle}>
        {hasMore ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => loadMore()}
            data-testid="executor-log-load-more"
          >
            Load more
          </Button>
        ) : (
          <span />
        )}
        <Button
          variant="secondary"
          size="sm"
          onClick={handleDownload}
          disabled={filtered.length === 0}
          data-testid="executor-log-download"
        >
          Download log
        </Button>
      </div>
    </div>
  );
}
