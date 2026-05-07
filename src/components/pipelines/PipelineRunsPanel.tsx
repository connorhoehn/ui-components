// frontend/src/components/pipelines/PipelineRunsPanel.tsx
//
// Side panel showing pipeline run history. Fetches from the backend API on mount
// and subscribes to WebSocket events for live status updates. Toggled from the
// "Runs" button in the PipelineEditorPage top bar.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router';
import { listPipelineRuns } from '../../api/pipelineRuns';
import { useEventStream } from './context/EventStreamContext';
import type { WildcardEvent } from './context/EventStreamContext';
import type { PipelineRun, RunStatus } from '../../types/pipeline';
import { colors, chipStyle } from '../../constants/styles';
import { formatDuration } from './utils/formatTime';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface PipelineRunsPanelProps {
  pipelineId: string;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCost(usd?: number): string {
  if (usd == null || usd === 0) return '--';
  if (usd < 0.001) return '<$0.001';
  if (usd < 0.01) return `$${usd.toFixed(4)}`;
  if (usd < 1) return `$${usd.toFixed(3)}`;
  return `$${usd.toFixed(2)}`;
}

function costColor(usd?: number): string {
  if (usd == null || usd === 0) return colors.textTertiary;
  if (usd < 0.01) return '#16a34a'; // green
  if (usd < 0.10) return '#ca8a04'; // yellow
  if (usd < 1.00) return '#ea580c'; // orange
  return '#dc2626'; // red
}

function relativeTime(iso: string): string {
  const d = Date.now() - new Date(iso).getTime();
  if (d < 60_000) return 'just now';
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`;
  if (d < 259_200_000) return `${Math.floor(d / 86_400_000)}d ago`;
  return new Date(iso).toLocaleDateString();
}

function statusBadge(s: RunStatus): { style: CSSProperties; label: string } {
  switch (s) {
    case 'completed':
      return { style: chipStyle('success'), label: 'Completed' };
    case 'failed':
      return { style: chipStyle('danger'), label: 'Failed' };
    case 'cancelled':
      return { style: chipStyle('neutral'), label: 'Cancelled' };
    case 'running':
      return { style: chipStyle('info'), label: 'Running' };
    case 'pending':
      return { style: chipStyle('neutral'), label: 'Pending' };
    case 'awaiting_approval':
      return { style: chipStyle('warning'), label: 'Awaiting' };
    default:
      return { style: chipStyle('neutral'), label: s };
  }
}

function triggerLabel(run: PipelineRun): string {
  if (run.triggeredBy.userId) return run.triggeredBy.userId;
  return run.triggeredBy.triggerType || 'manual';
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const panelStyle: CSSProperties = {
  // Fill parent sidebar container (no longer standalone side panel).
  flex: 1,
  minHeight: 0,
  background: colors.surface,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
};

const headerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  borderBottom: `1px solid ${colors.border}`,
  flexShrink: 0,
};

const listStyle: CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  padding: 0,
  margin: 0,
  listStyle: 'none',
};

const rowStyle: CSSProperties = {
  padding: '10px 16px',
  borderBottom: `1px solid ${colors.border}`,
  cursor: 'pointer',
  transition: 'background 0.1s',
};

const detailOverlayStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  background: colors.surface,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  zIndex: 2,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PipelineRunsPanel({ pipelineId, onClose }: PipelineRunsPanelProps) {
  const navigate = useNavigate();
  const [runs, setRuns] = useState<PipelineRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [comparePair, setComparePair] = useState<string[]>([]);
  const fetchedRef = useRef<string | null>(null);

  // Fetch runs from API
  const fetchRuns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await listPipelineRuns(pipelineId, { limit: 50 });
      setRuns(response.runs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load runs');
    } finally {
      setLoading(false);
    }
  }, [pipelineId]);

  // Fetch on mount and when pipelineId changes
  useEffect(() => {
    if (fetchedRef.current !== pipelineId) {
      fetchedRef.current = pipelineId;
      void fetchRuns();
    }
  }, [pipelineId, fetchRuns]);

  // Subscribe to WebSocket events for live updates
  useEventStream('*', useCallback((env: unknown) => {
    const { eventType, payload } = env as WildcardEvent;
    if (!payload || typeof payload !== 'object') return;
    const p = payload as { runId?: string; pipelineId?: string } & Record<string, unknown>;

    // Only handle events for this pipeline
    if (p.pipelineId && p.pipelineId !== pipelineId) return;

    switch (eventType) {
      case 'pipeline.run.started': {
        const ev = payload as {
          runId: string;
          pipelineId: string;
          triggeredBy: PipelineRun['triggeredBy'];
          at: string;
        };
        if (ev.pipelineId !== pipelineId) return;
        const newRun: PipelineRun = {
          id: ev.runId,
          pipelineId: ev.pipelineId,
          pipelineVersion: 0,
          status: 'running',
          triggeredBy: ev.triggeredBy,
          ownerNodeId: 'local',
          startedAt: ev.at,
          currentStepIds: [],
          steps: {},
          context: {},
        };
        setRuns((prev) => [newRun, ...prev.filter((r) => r.id !== ev.runId)]);
        break;
      }
      case 'pipeline.run.completed': {
        const ev = payload as { runId: string; at: string; durationMs: number };
        setRuns((prev) =>
          prev.map((r) =>
            r.id === ev.runId
              ? { ...r, status: 'completed' as RunStatus, completedAt: ev.at, durationMs: ev.durationMs }
              : r,
          ),
        );
        break;
      }
      case 'pipeline.run.failed': {
        const ev = payload as { runId: string; at: string; error: PipelineRun['error'] };
        setRuns((prev) =>
          prev.map((r) =>
            r.id === ev.runId
              ? { ...r, status: 'failed' as RunStatus, completedAt: ev.at, error: ev.error }
              : r,
          ),
        );
        break;
      }
      case 'pipeline.run.cancelled': {
        const ev = payload as { runId: string; at: string };
        setRuns((prev) =>
          prev.map((r) =>
            r.id === ev.runId
              ? { ...r, status: 'cancelled' as RunStatus, completedAt: ev.at }
              : r,
          ),
        );
        break;
      }
      default:
        break;
    }
  }, [pipelineId]));

  // Detail view for a selected run
  const selectedRun = useMemo(
    () => runs.find((r) => r.id === selectedRunId) ?? null,
    [runs, selectedRunId],
  );

  // Compare selection helpers
  const toggleCompareSelection = useCallback((runId: string) => {
    setComparePair((prev) => {
      if (prev.includes(runId)) return prev.filter((id) => id !== runId);
      if (prev.length >= 2) return [prev[1], runId];
      return [...prev, runId];
    });
  }, []);

  const handleCompare = useCallback(() => {
    if (comparePair.length !== 2) return;
    const [a, b] = comparePair;
    navigate(`/pipelines/${pipelineId}/compare?a=${a}&b=${b}`);
  }, [comparePair, navigate, pipelineId]);

  // ---- Render ----

  return (
    <div style={panelStyle} data-testid="pipeline-runs-panel">
      <div style={headerStyle}>
        <span style={{ fontSize: 14, fontWeight: 700, color: colors.textPrimary }}>
          Run History
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
          <button
            type="button"
            onClick={() => {
              setCompareMode(!compareMode);
              if (compareMode) setComparePair([]);
            }}
            data-testid="runs-panel-compare-toggle"
            style={{
              padding: '3px 8px',
              fontSize: 11,
              fontWeight: 500,
              border: `1px solid ${compareMode ? colors.primary : colors.border}`,
              background: compareMode ? colors.primary : colors.surface,
              color: compareMode ? '#fff' : colors.textSecondary,
              borderRadius: 4,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Compare
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close runs panel"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              color: colors.textTertiary,
              padding: '2px 6px',
              borderRadius: 4,
            }}
          >
            x
          </button>
        </div>
      </div>

      {/* Compare action bar — visible when in compare mode */}
      {compareMode && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            borderBottom: `1px solid ${colors.border}`,
            background: colors.surfaceInset,
            flexShrink: 0,
          }}
          data-testid="runs-panel-compare-bar"
        >
          <span style={{ fontSize: 11, color: colors.textSecondary }}>
            {comparePair.length}/2 selected
          </span>
          <button
            type="button"
            disabled={comparePair.length !== 2}
            onClick={handleCompare}
            data-testid="runs-panel-compare-action"
            style={{
              padding: '3px 10px',
              fontSize: 11,
              fontWeight: 600,
              border: `1px solid ${comparePair.length === 2 ? colors.primary : colors.border}`,
              background: comparePair.length === 2 ? colors.primary : colors.surface,
              color: comparePair.length === 2 ? '#fff' : colors.textDisabled,
              borderRadius: 4,
              cursor: comparePair.length === 2 ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit',
              marginLeft: 'auto',
            }}
          >
            Compare
          </button>
        </div>
      )}

      <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        {/* Run detail overlay */}
        {selectedRun && (
          <div style={detailOverlayStyle}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 16px',
                borderBottom: `1px solid ${colors.border}`,
                flexShrink: 0,
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedRunId(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  color: colors.primary,
                  padding: 0,
                  fontFamily: 'inherit',
                }}
              >
                &larr; Back
              </button>
              <span style={{ fontSize: 12, color: colors.textTertiary, fontFamily: 'monospace' }}>
                {selectedRun.id.slice(0, 12)}
              </span>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <DetailRow label="Status">
                  <span
                    aria-label={`Status: ${statusBadge(selectedRun.status).label}`}
                    style={statusBadge(selectedRun.status).style}
                  >
                    {statusBadge(selectedRun.status).label}
                  </span>
                </DetailRow>
                <DetailRow label="Started">
                  {new Date(selectedRun.startedAt).toLocaleString()}
                </DetailRow>
                {selectedRun.completedAt && (
                  <DetailRow label="Completed">
                    {new Date(selectedRun.completedAt).toLocaleString()}
                  </DetailRow>
                )}
                <DetailRow label="Duration">
                  {formatDuration(selectedRun.durationMs)}
                </DetailRow>
                <DetailRow label="Triggered by">
                  {triggerLabel(selectedRun)}
                </DetailRow>
                <DetailRow label="Trigger type">
                  {selectedRun.triggeredBy.triggerType}
                </DetailRow>
                {selectedRun.estimatedCostUsd != null && selectedRun.estimatedCostUsd > 0 && (
                  <DetailRow label="Est. Cost">
                    <span style={{ color: costColor(selectedRun.estimatedCostUsd), fontWeight: 600 }}>
                      {formatCost(selectedRun.estimatedCostUsd)}
                    </span>
                    {selectedRun.estimatedCostUsd > 1.0 && (
                      <span
                        style={{
                          background: '#fef3c7',
                          color: '#92400e',
                          fontSize: 9,
                          fontWeight: 700,
                          padding: '1px 4px',
                          borderRadius: 3,
                          marginLeft: 6,
                          textTransform: 'uppercase',
                        }}
                      >
                        Budget Warning
                      </span>
                    )}
                  </DetailRow>
                )}
                {selectedRun.tokenUsage && Object.keys(selectedRun.tokenUsage).length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: colors.textSecondary,
                        marginBottom: 6,
                        textTransform: 'uppercase',
                      }}
                    >
                      Cost Breakdown
                    </div>
                    {Object.entries(selectedRun.tokenUsage).map(([model, usage]) => (
                      <div
                        key={model}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '3px 0',
                          fontSize: 11,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'monospace',
                            color: colors.textSecondary,
                            minWidth: 100,
                          }}
                        >
                          {model}
                        </span>
                        <span style={{ color: colors.textTertiary }}>
                          {usage.tokensIn.toLocaleString()} in / {usage.tokensOut.toLocaleString()} out
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {selectedRun.error && (
                  <div style={{ marginTop: 8 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: colors.state.failed,
                        marginBottom: 4,
                        textTransform: 'uppercase',
                      }}
                    >
                      Error
                    </div>
                    <div
                      style={{
                        padding: '8px 10px',
                        background: '#fef2f2',
                        borderRadius: 6,
                        fontSize: 12,
                        color: '#991b1b',
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      }}
                    >
                      {selectedRun.error.message}
                      {selectedRun.error.nodeId && (
                        <div style={{ marginTop: 4, fontSize: 11, color: '#b91c1c' }}>
                          at node: {selectedRun.error.nodeId}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* View full run detail page */}
                <button
                  type="button"
                  onClick={() => navigate(`/pipelines/${pipelineId}/runs/${selectedRun.id}`)}
                  data-testid="runs-panel-replay-btn"
                  style={{
                    marginTop: 12,
                    width: '100%',
                    padding: '8px 14px',
                    fontSize: 13,
                    fontWeight: 600,
                    background: colors.primary,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  View Full Run
                </button>
                {/* Steps summary */}
                {Object.keys(selectedRun.steps).length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: colors.textSecondary,
                        marginBottom: 6,
                        textTransform: 'uppercase',
                      }}
                    >
                      Steps ({Object.keys(selectedRun.steps).length})
                    </div>
                    {Object.entries(selectedRun.steps).map(([stepId, step]) => {
                      const badge = statusBadge(step.status as RunStatus);
                      const output = step.output as Record<string, unknown> | undefined;
                      const llmResponse = output?.response as string | undefined;
                      return (
                        <div key={stepId} style={{ marginBottom: 8 }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              padding: '4px 0',
                              fontSize: 12,
                            }}
                          >
                            <span aria-label={`Status: ${badge.label}`} style={badge.style}>{badge.label}</span>
                            <span
                              style={{
                                fontFamily: 'monospace',
                                color: colors.textSecondary,
                                fontSize: 11,
                              }}
                            >
                              {stepId.slice(0, 10)}
                            </span>
                            {step.durationMs != null && (
                              <span style={{ color: colors.textTertiary, fontSize: 11, marginLeft: 'auto' }}>
                                {formatDuration(step.durationMs)}
                              </span>
                            )}
                          </div>
                          {llmResponse && (
                            <div
                              style={{
                                marginTop: 4,
                                padding: '8px 10px',
                                background: colors.surfaceInset,
                                border: `1px solid ${colors.border}`,
                                borderRadius: 6,
                                fontSize: 12,
                                color: colors.textPrimary,
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                lineHeight: 1.5,
                                maxHeight: 160,
                                overflowY: 'auto',
                              }}
                            >
                              {llmResponse}
                            </div>
                          )}
                          {output && !llmResponse && Object.keys(output).length > 0 && (
                            <div
                              style={{
                                marginTop: 4,
                                padding: '6px 10px',
                                background: colors.surfaceInset,
                                border: `1px solid ${colors.border}`,
                                borderRadius: 6,
                                fontSize: 11,
                                fontFamily: 'monospace',
                                color: colors.textSecondary,
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                maxHeight: 120,
                                overflowY: 'auto',
                              }}
                            >
                              {JSON.stringify(output, null, 2)}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* Raw JSON for debugging */}
                <div style={{ marginTop: 12 }}>
                  <details>
                    <summary
                      style={{
                        fontSize: 11,
                        color: colors.textTertiary,
                        cursor: 'pointer',
                        userSelect: 'none',
                      }}
                    >
                      Raw snapshot JSON
                    </summary>
                    <pre
                      style={{
                        marginTop: 6,
                        padding: 10,
                        background: colors.surfaceInset,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 6,
                        fontSize: 10,
                        overflow: 'auto',
                        maxHeight: 300,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all',
                      }}
                    >
                      {JSON.stringify(selectedRun, null, 2)}
                    </pre>
                  </details>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Run list */}
        {loading && runs.length === 0 && (
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              color: colors.textTertiary,
              fontSize: 13,
            }}
          >
            Loading runs...
          </div>
        )}

        {error && (
          <div
            style={{
              padding: 16,
              textAlign: 'center',
              color: colors.state.failed,
              fontSize: 12,
            }}
          >
            {error}
            <button
              type="button"
              onClick={() => void fetchRuns()}
              style={{
                display: 'block',
                margin: '8px auto 0',
                fontSize: 12,
                color: colors.primary,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textDecoration: 'underline',
              }}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && runs.length === 0 && (
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              color: colors.textTertiary,
              fontSize: 13,
            }}
          >
            No runs yet. Trigger this pipeline to see history here.
          </div>
        )}

        {runs.length > 0 && (
          <ul style={listStyle}>
            {runs.map((run) => {
              const badge = statusBadge(run.status);
              const isCompareSelected = comparePair.includes(run.id);
              return (
                <li
                  key={run.id}
                  data-testid={`runs-panel-row-${run.id}`}
                  onClick={() => {
                    if (compareMode) {
                      toggleCompareSelection(run.id);
                    } else {
                      setSelectedRunId(run.id);
                    }
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = colors.surfaceHover;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = isCompareSelected
                      ? '#eff6ff'
                      : 'transparent';
                  }}
                  style={{
                    ...rowStyle,
                    background: isCompareSelected ? '#eff6ff' : undefined,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {compareMode && (
                      <input
                        type="checkbox"
                        checked={isCompareSelected}
                        onChange={() => toggleCompareSelection(run.id)}
                        onClick={(e) => e.stopPropagation()}
                        data-testid={`runs-panel-compare-check-${run.id}`}
                        style={{ margin: 0, accentColor: colors.primary, flexShrink: 0 }}
                        aria-label={`Select run ${run.id.slice(0, 8)} for comparison`}
                      />
                    )}
                    <span aria-label={`Status: ${badge.label}`} style={badge.style}>{badge.label}</span>
                    <span
                      style={{
                        fontSize: 12,
                        color: colors.textSecondary,
                        fontFamily: 'monospace',
                      }}
                    >
                      {run.id.slice(0, 8)}
                    </span>
                    <span
                      style={{
                        marginLeft: 'auto',
                        fontSize: 11,
                        color: colors.textTertiary,
                      }}
                    >
                      {relativeTime(run.startedAt)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginTop: 4,
                      fontSize: 11,
                      color: colors.textTertiary,
                    }}
                  >
                    <span>{formatDuration(run.durationMs)}</span>
                    {run.estimatedCostUsd != null && run.estimatedCostUsd > 0 && (
                      <span
                        style={{
                          color: costColor(run.estimatedCostUsd),
                          fontWeight: 600,
                          fontFamily: 'monospace',
                        }}
                        title={`Estimated cost: ${formatCost(run.estimatedCostUsd)}`}
                      >
                        {formatCost(run.estimatedCostUsd)}
                      </span>
                    )}
                    {run.estimatedCostUsd != null && run.estimatedCostUsd > 1.0 && (
                      <span
                        style={{
                          background: '#fef3c7',
                          color: '#92400e',
                          fontSize: 9,
                          fontWeight: 700,
                          padding: '1px 4px',
                          borderRadius: 3,
                          textTransform: 'uppercase',
                        }}
                      >
                        High Cost
                      </span>
                    )}
                    <span style={{ marginLeft: 'auto' }}>{triggerLabel(run)}</span>
                  </div>
                  {run.error && (
                    <div
                      style={{
                        marginTop: 4,
                        fontSize: 11,
                        color: colors.state.failed,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {run.error.message}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Detail row helper
// ---------------------------------------------------------------------------

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: colors.textTertiary,
          minWidth: 80,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 13, color: colors.textPrimary }}>{children}</span>
    </div>
  );
}
