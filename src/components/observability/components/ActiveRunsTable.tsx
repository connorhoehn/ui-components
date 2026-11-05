// frontend/src/components/observability/components/ActiveRunsTable.tsx
//
// Compact table listing active pipeline runs on the dashboard (§18.6).
// Columns: pipeline name · step indicator · owner node · elapsed.
// Empty state: "No active runs".
//
// Rows are clickable: click / Enter / Space drills into the per-run replay
// page (`/pipelines/:pipelineId/runs/:runId`). Per-row action controls (e.g.
// the cancel button) call `e.stopPropagation()` so they don't trigger row
// navigation.

import { useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import { cn } from '../../../lib/cn';

export interface ActiveRunRow {
  pipelineId: string;
  pipelineName: string;
  runId: string;
  currentStep: string;
  ownerNode: string;
  elapsed: string;
  status: string;
}

export interface ActiveRunsTableProps {
  runs: ActiveRunRow[];
  /**
   * Invoked when a row is activated (click, Enter, or Space). Wire this to a
   * `useNavigate(...)` call to drill into the per-run detail page.
   */
  onRowClick?: (run: ActiveRunRow) => void;
  /**
   * Optional: invoked when the per-row cancel control is activated. The cancel
   * button stops event propagation so it does not also trigger `onRowClick`.
   */
  onCancelRun?: (run: ActiveRunRow) => void;
}

function Row({
  run,
  onClick,
  onCancel,
}: {
  run: ActiveRunRow;
  onClick?: (r: ActiveRunRow) => void;
  onCancel?: (r: ActiveRunRow) => void;
}) {
  const [hover, setHover] = useState(false);

  const interactive = Boolean(onClick);
  const ariaLabel = interactive
    ? `Open run ${run.runId} of pipeline ${run.pipelineName}`
    : undefined;

  // Enter / Space activate the row exactly like a click would. We swallow the
  // default Space behavior (which would otherwise scroll the page).
  const handleKeyDown = (e: KeyboardEvent<HTMLTableRowElement>) => {
    if (!onClick) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      onClick(run);
    }
  };

  const handleCancelClick = (e: MouseEvent<HTMLButtonElement>) => {
    // Critical: prevent the row's onClick from firing. Cancelling a run is
    // intentionally distinct from drilling into it.
    e.stopPropagation();
    if (onCancel) onCancel(run);
  };

  const isCancellable = Boolean(onCancel) && run.status === 'running';

  return (
    <tr
      data-testid="active-run-row"
      role={interactive ? 'button' : undefined}
      aria-label={ariaLabel}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick ? () => onClick(run) : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        'outline-none',
        onClick ? 'cursor-pointer' : 'cursor-default',
        hover ? 'bg-surface-hover' : 'bg-transparent'
      )}
    >
      <td className="px-3 py-2 text-[13px] text-text-primary font-[inherit] border-b border-border font-semibold">
        <span className="inline-flex items-center gap-1.5">
          {run.pipelineName}
          {/* Hover-only external-link affordance next to the runId. */}
          {hover && interactive && (
            <span
              data-testid="active-run-link-icon"
              aria-hidden="true"
              className="text-[11px] text-primary font-medium"
            >
              ↗
            </span>
          )}
        </span>
      </td>
      <td className="px-3 py-2 text-[11px] text-text-secondary font-mono border-b border-border">
        {run.currentStep}
      </td>
      <td className="px-3 py-2 text-[11px] text-text-secondary font-mono border-b border-border">
        {run.ownerNode}
      </td>
      <td className="px-3 py-2 text-[11px] text-text-secondary font-mono border-b border-border text-right">
        {run.elapsed}
      </td>
      {onCancel && (
        <td className="px-3 py-2 text-[13px] text-text-primary font-[inherit] border-b border-border text-right w-px whitespace-nowrap">
          {isCancellable && (
            <button
              data-ui-part=""
              data-testid="active-run-cancel"
              type="button"
              aria-label={`Cancel run ${run.runId}`}
              onClick={handleCancelClick}
              // Also block keydown bubbling so Enter/Space on the button
              // doesn't activate the row's keyboard handler.
              onKeyDown={(e) => e.stopPropagation()}
              className="px-2 py-0.5 text-[11px] font-semibold bg-transparent text-state-failed border border-border rounded-sm cursor-pointer font-[inherit]"
            >
              Cancel
            </button>
          )}
        </td>
      )}
    </tr>
  );
}

function ActiveRunsTable({ runs, onRowClick, onCancelRun }: ActiveRunsTableProps) {
  if (!runs || runs.length === 0) {
    return (
      <div
        data-testid="active-runs-empty"
        className="p-6 text-center text-text-tertiary text-[13px] border border-border rounded-lg bg-surface font-[inherit]"
      >
        No active runs
      </div>
    );
  }

  return (
    <div
      data-testid="active-runs-table"
      className="border border-border rounded-lg overflow-hidden bg-surface"
    >
      <table data-ui-part="" className="w-full border-collapse font-[inherit]">
        <thead>
          <tr>
            <th className="text-left px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border">
              Pipeline
            </th>
            <th className="text-left px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border">
              Step
            </th>
            <th className="text-left px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border">
              Owner
            </th>
            <th className="text-right px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border">
              Elapsed
            </th>
            {onCancelRun && (
              <th className="text-right px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.3px] bg-surface-inset border-b border-border" />
            )}
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => (
            <Row
              key={run.runId}
              run={run}
              onClick={onRowClick}
              onCancel={onCancelRun}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActiveRunsTable;
