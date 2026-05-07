import { useRef } from 'react';
import Chip from '../shared/Chip';
import { cn } from '../../lib/cn';
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
      className="w-full border-collapse text-[13px] bg-surface border border-border rounded-lg overflow-hidden"
    >
      <thead>
        <tr className="bg-[#fafbfc] text-left">
          <th
            scope="col"
            className="px-3 py-2 w-6 border-b border-border"
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
              className="px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border"
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
              className={cn(
                'border-b border-border cursor-pointer hover:bg-[#f1f5f9]',
                isSelected && 'bg-[#f1f5f9]',
              )}
              onClick={() => onNavigate(`/pipelines/${pipelineId}/runs/${r.id}`)}
            >
              <td className="px-3 py-2.5 text-xs text-text-secondary w-6" onClick={(e) => e.stopPropagation()}>
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
                <input
                  type="checkbox"
                  data-testid={`run-compare-pick-${r.id}`}
                  checked={comparePair.includes(r.id)}
                  onChange={() => onToggleComparePair(r.id)}
                  aria-label={`Pick run ${r.id.slice(0, 8)} for comparison`}
                  className="absolute w-px h-px opacity-0 pointer-events-none"
                  tabIndex={-1}
                />
              </td>
              <td className="px-3 py-2.5 text-xs text-text-primary">
                {relativeTime(r.startedAt)}
              </td>
              <td className="px-3 py-2.5 text-xs text-text-secondary">
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
              <td className="px-3 py-2.5 text-xs text-text-secondary font-mono">
                {formatDuration(r.durationMs)}
              </td>
              <td
                className={cn(
                  'px-3 py-2.5 text-xs font-mono',
                  retries > 0 ? 'text-text-primary' : 'text-text-tertiary',
                )}
                data-testid={`run-retries-${r.id}`}
                title={retries > 0 ? `${retries} retry attempts across this run` : 'No retries — every step succeeded on first attempt'}
              >
                {retries > 0 ? `×${retries}` : '—'}
              </td>
              <td
                className="px-3 py-2.5 text-xs text-text-secondary font-mono"
                data-testid={`run-cost-${r.id}`}
              >
                {costByRunId[r.id] ?? '—'}
              </td>
              <td className="px-3 py-2.5 text-xs text-text-secondary">
                {r.triggeredBy.userId ?? r.triggeredBy.triggerType}
              </td>
              <td className="px-3 py-2.5 text-[11px] font-mono text-text-tertiary">
                {r.id.slice(0, 8)}
              </td>
              <td className="px-3 py-2.5 text-xs text-text-secondary text-right" onClick={(e) => e.stopPropagation()}>
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
                    className="text-[11px] px-2 py-1 mr-2 bg-transparent text-[#b45309] border border-[#fde68a] rounded cursor-pointer font-[inherit]"
                  >
                    ⚡ Force-fail
                  </button>
                )}
                {r.status === 'failed' && r.error?.nodeId && r.error.nodeId !== 'unknown' && (
                  <button
                    type="button"
                    data-testid={`retry-from-failed-step-${r.id}`}
                    onClick={(e) => { e.stopPropagation(); onOpenRetryModal(r); }}
                    title={`Retry from "${r.error.nodeId}" with the original upstream context`}
                    className="text-[11px] px-2 py-1 mr-2 bg-transparent text-[#ea580c] border border-[#fed7aa] rounded cursor-pointer font-[inherit]"
                  >
                    ↻ Retry from failed
                  </button>
                )}
                <span className="text-xs text-primary">View →</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
