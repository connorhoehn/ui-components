import { useRef } from 'react';
import Chip from '../shared/Chip';
import { colors, tableCellStyle } from '../../constants/styles';
import type { ErrorCategory, PipelineRun } from '../../types/pipeline';
import { formatDuration } from './utils/formatTime';
import { statusChipVariant, errorCategoryTone } from './utils/statusColors';
import { countTotalRetries } from './runsUtils';
import { forceFail } from '../../api/pipelineRetry';

const ERROR_CATEGORY_SHORT: Record<ErrorCategory, string> = {
  LLMError: 'LLM',
  TimeoutError: 'Timeout',
  NetworkError: 'Network',
  ValidationError: 'Validation',
  RegistryConflict: 'Conflict',
  UnknownError: 'Unknown',
};

function relativeTime(iso: string): string {
  const d = Date.now() - new Date(iso).getTime();
  if (d < 60_000) return 'just now';
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`;
  if (d < 259_200_000) return `${Math.floor(d / 86_400_000)}d ago`;
  return new Date(iso).toLocaleDateString();
}

export interface RunsTableProps {
  filtered: PipelineRun[];
  selected: Set<string>;
  /** Called with the new full selection set after any selection change. */
  onSelectionChange: (next: Set<string>) => void;
  comparePair: string[];
  onToggleComparePair: (runId: string) => void;
  costByRunId: Record<string, string>;
  pipelineId: string;
  onNavigate: (path: string) => void;
  onOpenRetryModal: (run: PipelineRun) => void;
}

export default function RunsTable({
  filtered,
  selected,
  onSelectionChange,
  comparePair,
  onToggleComparePair,
  costByRunId,
  pipelineId,
  onNavigate,
  onOpenRetryModal,
}: RunsTableProps) {
  const pendingShiftRef = useRef(false);
  const lastClickedIdx = useRef<number | null>(null);

  const allSelected = filtered.length > 0 && filtered.every((r) => selected.has(r.id));
  const someSelected = !allSelected && filtered.some((r) => selected.has(r.id));

  const toggleHeaderCheckbox = () => {
    const next = new Set(selected);
    if (allSelected) {
      for (const r of filtered) next.delete(r.id);
    } else {
      for (const r of filtered) next.add(r.id);
    }
    onSelectionChange(next);
  };

  const handleRowCheckbox = (runId: string, rowIndex: number, nativeShift: boolean) => {
    const next = new Set(selected);
    const turnOn = !next.has(runId);
    if (nativeShift && lastClickedIdx.current != null) {
      const lo = Math.min(lastClickedIdx.current, rowIndex);
      const hi = Math.max(lastClickedIdx.current, rowIndex);
      for (let i = lo; i <= hi; i++) {
        const r = filtered[i];
        if (!r) continue;
        if (turnOn) next.add(r.id);
        else next.delete(r.id);
      }
    } else if (turnOn) {
      next.add(runId);
    } else {
      next.delete(runId);
    }
    lastClickedIdx.current = rowIndex;
    onSelectionChange(next);
  };

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 13,
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <thead>
        <tr style={{ background: colors.surfaceInset, textAlign: 'left' }}>
          <th
            scope="col"
            style={{ padding: '8px 12px', width: 24, borderBottom: `1px solid ${colors.border}` }}
          >
            <input
              type="checkbox"
              data-testid="runs-select-all"
              aria-label="Select all visible runs"
              checked={allSelected}
              ref={(el) => {
                if (el) el.indeterminate = someSelected;
              }}
              onChange={toggleHeaderCheckbox}
            />
          </th>
          {['Started', 'Status', 'Duration', 'Retries', 'Cost', 'Triggered by', 'Run ID', ''].map((h, i) => (
            <th
              key={`${h}-${i}`}
              scope="col"
              style={{
                padding: '8px 12px',
                fontSize: 11,
                fontWeight: 600,
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filtered.map((r, idx) => {
          const { tone: statusTone, label: statusLabel } = statusChipVariant(r.status);
          const isSelected = selected.has(r.id);
          const retries = countTotalRetries(r);
          return (
            <tr
              key={r.id}
              data-testid={`run-card-${r.id}`}
              style={{
                borderBottom: `1px solid ${colors.border}`,
                cursor: 'pointer',
                background: isSelected ? colors.surfaceHover : undefined,
              }}
              onClick={() => onNavigate(`/pipelines/${pipelineId}/runs/${r.id}`)}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.background = colors.surfaceHover;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }
              }}
            >
              <td style={{ ...tableCellStyle, width: 24 }} onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  data-testid={`run-select-${r.id}`}
                  checked={isSelected}
                  onMouseDown={(e) => {
                    pendingShiftRef.current = e.shiftKey;
                  }}
                  onKeyDown={(e) => {
                    pendingShiftRef.current = e.shiftKey;
                  }}
                  onChange={() => {
                    const shift = pendingShiftRef.current;
                    pendingShiftRef.current = false;
                    handleRowCheckbox(r.id, idx, shift);
                  }}
                  aria-label={`Select run ${r.id.slice(0, 8)}`}
                />
                {/* Hidden but keyboard-reachable Compare picker. */}
                <input
                  type="checkbox"
                  data-testid={`run-compare-pick-${r.id}`}
                  checked={comparePair.includes(r.id)}
                  onChange={() => onToggleComparePair(r.id)}
                  aria-label={`Pick run ${r.id.slice(0, 8)} for comparison`}
                  style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
                  tabIndex={-1}
                />
              </td>
              <td style={{ ...tableCellStyle, color: colors.textPrimary }}>
                {relativeTime(r.startedAt)}
              </td>
              <td style={tableCellStyle}>
                <Chip tone={statusTone} aria-label={`Status: ${statusLabel}`}>{statusLabel}</Chip>
                {r.status === 'running' && r.stuckAt && (
                  <Chip
                    tone="warning"
                    size="xs"
                    data-testid={`run-stuck-badge-${r.id}`}
                    title={`No pipeline events since ${new Date(r.stuckAt).toLocaleTimeString()}`}
                    style={{ marginLeft: 6 }}
                  >
                    Stuck
                  </Chip>
                )}
                {r.status === 'failed' && r.error?.errorCategory && (
                  <Chip
                    tone={errorCategoryTone(r.error.errorCategory)}
                    size="xs"
                    data-testid={`run-error-category-${r.id}`}
                    title={r.error.message}
                    style={{ marginLeft: 6 }}
                  >
                    {ERROR_CATEGORY_SHORT[r.error.errorCategory] ?? r.error.errorCategory}
                  </Chip>
                )}
              </td>
              <td style={{ ...tableCellStyle, fontFamily: 'monospace' }}>
                {formatDuration(r.durationMs)}
              </td>
              {/* Hub#1287: total retries across all steps. */}
              <td
                style={{ ...tableCellStyle, fontFamily: 'monospace', color: retries > 0 ? colors.textPrimary : colors.textTertiary }}
                data-testid={`run-retries-${r.id}`}
                title={retries > 0 ? `${retries} retry attempts across this run` : 'No retries — every step succeeded on first attempt'}
              >
                {retries > 0 ? `×${retries}` : '—'}
              </td>
              <td
                style={{ ...tableCellStyle, fontFamily: 'monospace' }}
                data-testid={`run-cost-${r.id}`}
              >
                {costByRunId[r.id] ?? '—'}
              </td>
              <td style={tableCellStyle}>
                {r.triggeredBy.userId ?? r.triggeredBy.triggerType}
              </td>
              <td style={{ ...tableCellStyle, fontSize: 11, fontFamily: 'monospace', color: colors.textTertiary }}>
                {r.id.slice(0, 8)}
              </td>
              <td style={{ ...tableCellStyle, textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                {/* Hub#1285: Force-fail affordance for stuck runs. */}
                {r.status === 'running' && r.stuckAt && (
                  <button
                    type="button"
                    data-testid={`force-fail-${r.id}`}
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (!confirm(`Force-fail stuck run ${r.id.slice(0, 8)}? The run will be interrupted and you can retry from the stuck step.`)) return;
                      try {
                        await forceFail(r.pipelineId, r.id);
                      } catch (err) {
                        alert(`Force-fail failed: ${err instanceof Error ? err.message : String(err)}`);
                      }
                    }}
                    title="Force-fail this stuck run so you can retry from the stuck step"
                    style={{
                      fontSize: 11,
                      padding: '4px 8px',
                      marginRight: 8,
                      background: 'transparent',
                      color: '#b45309',
                      border: '1px solid #fde68a',
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    ⚡ Force-fail
                  </button>
                )}
                {/* Hub#1288: Retry-from-failed-step affordance. */}
                {r.status === 'failed' && r.error?.nodeId && r.error.nodeId !== 'unknown' && (
                  <button
                    type="button"
                    data-testid={`retry-from-failed-step-${r.id}`}
                    onClick={(e) => { e.stopPropagation(); onOpenRetryModal(r); }}
                    title={`Retry from "${r.error.nodeId}" with the original upstream context`}
                    style={{
                      fontSize: 11,
                      padding: '4px 8px',
                      marginRight: 8,
                      background: 'transparent',
                      color: '#ea580c',
                      border: '1px solid #fed7aa',
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    ↻ Retry from failed
                  </button>
                )}
                <span style={{ fontSize: 12, color: colors.primary }}>View →</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
