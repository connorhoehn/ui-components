// frontend/src/components/pipelines/PendingApprovalsPage.tsx
//
// Cross-pipeline pending-approvals surface (PIPELINES_PLAN.md §18.20).
// Route: `/pipelines/approvals`.
//
// Lists every run currently blocked on an approval node (driven by the
// `pipeline.approval.requested` / `pipeline.approval.recorded` event stream;
// see `usePendingApprovalsState`). Approvers can approve / reject inline with
// an optional comment, or jump to the originating pipeline's canvas.
//
// Loading: 3 skeleton cards while the dashboard endpoint is in flight.
// Error:   red banner with retry.
// Empty:   friendly empty-state once load resolves with zero approvals.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { usePipelineRuns } from './context/PipelineRunsContext';
import {
  usePendingApprovalsState,
  type PendingApproval,
} from './hooks/usePendingApprovals';
import { loadPipeline } from './persistence/pipelineStorage';
import { getPipelineRun } from '../../api/pipelineRuns';
import EmptyState from '../shared/EmptyState';
import SkeletonCard from '../shared/SkeletonCard';
import Chip from '../shared/Chip';
import { cn } from '../../lib/cn';
import type { Approver, PipelineDefinition } from '../../types/pipeline';
import { Textarea } from '../forms/Textarea';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Human-readable elapsed time relative to now. */
function formatElapsed(iso: string): string {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then) || then <= 0) return '—';
  const sec = Math.floor((Date.now() - then) / 1000);
  if (sec < 10) return 'just now';
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  return `${Math.floor(hr / 24)}d ago`;
}

/** Last 6 chars of a runId — matches §18.20's runId tail convention. */
function runIdTail(id: string): string {
  return id.length <= 6 ? id : id.slice(-6);
}

/** Compact approver display: emoji + value. */
function ApproverChip({ approver, idx }: { approver: Approver; idx: number }) {
  const icon = approver.type === 'role' ? '🎖' : '👤';
  return (
    <span
      key={`${approver.type}:${approver.value}:${idx}`}
      className="inline-flex items-center gap-1 bg-info-bg text-info-fg px-2 py-0.5 rounded-sm text-[11px] font-semibold leading-[1.4] whitespace-nowrap"
    >
      <span aria-hidden>{icon}</span>
      <span>{approver.value}</span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

interface ApprovalCardData extends PendingApproval {
  pipelineName: string;
  runContext?: Record<string, unknown>;
  runSteps?: RunStepsData;
  /**
   * Set when the run detail fetch FAILED (as opposed to resolving with no
   * reviewable output). Without it the card fell through to the "upstream
   * steps haven't produced reviewable output yet" copy — an affirmative
   * claim about the run that is simply false when the API is down, and the
   * approver decides blind on the strength of it.
   */
  runFetchError?: string;
}

interface CardProps {
  row: ApprovalCardData;
  onSubmit: (decision: 'approve' | 'reject', comment: string) => void;
  onOpenPipeline: () => void;
}

interface RunStepsData {
  [stepId: string]: { output?: Record<string, unknown> };
}

function extractReviewContext(
  ctx: Record<string, unknown> | undefined,
  steps?: RunStepsData,
): Array<{ label: string; value: string }> {
  const items: Array<{ label: string; value: string }> = [];

  if (ctx) {
    const stepsCtx = ctx.steps as Record<string, unknown> | undefined;
    for (const [key, val] of Object.entries(ctx)) {
      if (key === 'steps' || val == null || val === '') continue;
      if (typeof val === 'string') {
        items.push({ label: key, value: val });
      } else if (typeof val === 'object') {
        items.push({ label: key, value: JSON.stringify(val, null, 2) });
      }
    }
    if (stepsCtx && typeof stepsCtx === 'object') {
      for (const [stepId, output] of Object.entries(stepsCtx)) {
        if (output == null) continue;
        const out = output as Record<string, unknown>;
        if (typeof out.response === 'string' && out.response.trim()) {
          items.push({ label: `Step ${stepId.slice(0, 8)} response`, value: out.response });
        }
      }
    }
  }

  if (items.length === 0 && steps) {
    for (const [stepId, step] of Object.entries(steps)) {
      const out = step.output;
      if (!out) continue;
      for (const [key, val] of Object.entries(out)) {
        if (val == null || val === '' || key === 'tokensIn' || key === 'tokensOut') continue;
        if (typeof val === 'string' && val.trim()) {
          items.push({ label: key, value: val });
        }
      }
    }
  }

  return items;
}

function ApprovalCard({ row, onSubmit, onOpenPipeline }: CardProps) {
  const [comment, setComment] = useState('');

  const submit = useCallback(
    (decision: 'approve' | 'reject') => {
      onSubmit(decision, comment.trim());
      setComment('');
    },
    [comment, onSubmit],
  );

  const required = row.requiredCount ?? 1;
  const recorded = row.recordedCount ?? 0;
  const reviewItems = useMemo(() => extractReviewContext(row.runContext, row.runSteps), [row.runContext, row.runSteps]);

  return (
    <div data-testid={`approval-card-${row.runId}`} className="flex flex-col gap-3 p-4 bg-surface border border-border rounded-[10px]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-lg" aria-hidden>✋</span>
          <div className="min-w-0">
            <button
              type="button"
              onClick={onOpenPipeline}
              data-testid={`open-pipeline-${row.pipelineId}`}
              className="text-sm font-semibold text-text-primary bg-transparent border-none p-0 cursor-pointer font-[inherit] text-left overflow-hidden text-ellipsis whitespace-nowrap max-w-full"
              title={row.pipelineName}
            >
              {row.pipelineName}
            </button>
            <div className="font-mono text-[11px] text-text-tertiary">run #{runIdTail(row.runId)}</div>
          </div>
        </div>
        <span className="text-xs text-text-tertiary whitespace-nowrap">{formatElapsed(row.requestedAt)}</span>
      </div>

      {row.message ? (
        <div data-testid={`approval-message-${row.runId}`} className="text-[13px] text-text-secondary bg-surface-inset px-3 py-2 rounded-md leading-normal">
          {row.message}
        </div>
      ) : null}

      <div className="flex flex-col gap-1.5 px-3 py-2.5 bg-surface-inset rounded-md border border-border">
        <div className="text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]">
          {reviewItems.length > 0
            ? 'Context'
            : row.runFetchError
              ? 'Review context unavailable'
              : 'Run details'}
        </div>
        {reviewItems.length === 0 && row.runFetchError ? (
          <div
            data-testid={`approval-context-error-${row.runId}`}
            className="flex flex-col gap-0.5 px-2.5 py-2 rounded-md bg-danger-bg border border-danger-border"
          >
            <div className="text-[11px] font-semibold text-danger-fg">
              Couldn&apos;t load this run — decide with caution
            </div>
            <div className="text-[11px] text-danger-fg leading-normal">
              The pipeline API is unreachable, so what this step produced is
              unknown. This is not the same as there being nothing to review.
            </div>
            <div className="font-mono text-[11px] text-danger-fg break-words">
              {row.runFetchError}
            </div>
          </div>
        ) : reviewItems.length > 0 ? (
          reviewItems.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <div className="text-[11px] font-medium text-text-secondary">{label}</div>
              <pre className="m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto">{value}</pre>
            </div>
          ))
        ) : (
          <>
            <div className="flex flex-col gap-0.5">
              <div className="text-[11px] font-medium text-text-secondary">Run</div>
              <pre className="m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto">{row.runId}</pre>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-[11px] font-medium text-text-secondary">Step</div>
              <pre className="m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto">{row.stepId}</pre>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-[11px] font-medium text-text-secondary">Status</div>
              <pre className="m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto">
                Awaiting your approval — upstream steps haven't produced reviewable output yet
                (or this approval node runs in parallel with them).
              </pre>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="text-[11px] text-text-tertiary mr-1">Approvers:</span>
        {row.approvers.length === 0 ? (
          <span className="text-[11px] text-text-tertiary">(anyone)</span>
        ) : (
          row.approvers.map((a, i) => <ApproverChip approver={a} idx={i} key={i} />)
        )}
        {required > 1 ? (
          <span className="text-[11px] text-text-tertiary ml-1">({recorded}/{required} approvals)</span>
        ) : null}
      </div>

      <Textarea
        data-testid={`approval-comment-${row.runId}`}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Optional comment…"
        rows={2}
        className="w-full"
        aria-label="Approval comment"
      />

      <div className="flex gap-2 justify-end">
        <button data-testid={`reject-${row.runId}`} onClick={() => submit('reject')} className="px-3.5 py-1.5 text-[13px] font-semibold bg-danger text-white border-none rounded-md font-[inherit] cursor-pointer">
          Reject
        </button>
        <button data-testid={`approve-${row.runId}`} onClick={() => submit('approve')} className="px-3.5 py-1.5 text-[13px] font-semibold bg-success text-white border-none rounded-md font-[inherit] cursor-pointer shrink-0">
          Approve
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PendingApprovalsPage() {
  const navigate = useNavigate();
  const { approvals, isLoading, error, retry } = usePendingApprovalsState();
  const { resolveApproval, runs: liveRuns } = usePipelineRuns();

  // Optimistically removed (runId, stepId) keys — entries here are filtered
  // out of the rendered list. Cleared once the matching `recorded` event
  // arrives and the hook drops them naturally.
  const [optimisticRemoved, setOptimisticRemoved] = useState<Set<string>>(
    () => new Set(),
  );

  // When the hook removes an approval (because the `recorded` event arrived),
  // drop the matching optimistic-removal key so the Set doesn't grow without
  // bound. We compare against the live approvals' keys.
  useEffect(() => {
    if (optimisticRemoved.size === 0) return;
    const liveKeys = new Set(approvals.map((a) => `${a.runId}::${a.stepId}`));
    let changed = false;
    const next = new Set(optimisticRemoved);
    for (const key of optimisticRemoved) {
      if (!liveKeys.has(key)) {
        next.delete(key);
        changed = true;
      }
    }
    if (changed) setOptimisticRemoved(next);
  }, [approvals, optimisticRemoved]);

  // Fetch run data from the API for each pending approval so the card
  // can display what's being reviewed (trigger input + LLM responses).
  const [fetchedRuns, setFetchedRuns] = useState<Record<string, { context?: Record<string, unknown>; steps?: RunStepsData }>>({});
  // Runs whose detail fetch REJECTED. Tracked separately from `fetchedRuns`
  // so the card can say "couldn't load" instead of asserting there is
  // nothing to review — see `runFetchError` on ApprovalCardData.
  const [runFetchErrors, setRunFetchErrors] = useState<Record<string, string>>({});
  const fetchedIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    for (const item of approvals) {
      if (fetchedIdsRef.current.has(item.runId)) continue;
      fetchedIdsRef.current.add(item.runId);
      const { runId } = item;
      getPipelineRun(item.pipelineId, runId).then(
        (run) => {
          if (!run) return;
          setFetchedRuns((prev) => ({
            ...prev,
            [runId]: { context: run.context, steps: run.steps as unknown as RunStepsData },
          }));
        },
        (err: unknown) => {
          setRunFetchErrors((prev) => ({
            ...prev,
            [runId]: err instanceof Error ? err.message : String(err),
          }));
        },
      );
    }
  }, [approvals]);

  const rows: ApprovalCardData[] = useMemo(() => {
    const defCache = new Map<string, PipelineDefinition | null>();
    const out: ApprovalCardData[] = [];
    for (const item of approvals) {
      const key = `${item.runId}::${item.stepId}`;
      if (optimisticRemoved.has(key)) continue;

      let def = defCache.get(item.pipelineId);
      if (def === undefined) {
        def = loadPipeline(item.pipelineId);
        defCache.set(item.pipelineId, def);
      }
      const pipelineName =
        def?.name ??
        (item.pipelineId
          ? `Pipeline ${item.pipelineId.slice(0, 8)}`
          : 'Unknown pipeline');
      const runContext = fetchedRuns[item.runId]?.context ?? liveRuns[item.runId]?.context;
      const runSteps = fetchedRuns[item.runId]?.steps;
      // Only a real failure with nothing else to show counts as an error for
      // the card — if the live run context filled the gap there is still
      // something truthful to render.
      const runFetchError = runContext ? undefined : runFetchErrors[item.runId];
      out.push({ ...item, pipelineName, runContext, runSteps, runFetchError });
    }
    return out;
  }, [approvals, optimisticRemoved, liveRuns, fetchedRuns, runFetchErrors]);

  const handleSubmit = useCallback(
    (
      pipelineId: string,
      runId: string,
      stepId: string,
      decision: 'approve' | 'reject',
      comment: string,
    ) => {
      // Optimistic local update so the card disappears immediately.
      resolveApproval(runId, stepId, decision, comment || undefined);
      setOptimisticRemoved((prev) => {
        const next = new Set(prev);
        next.add(`${runId}::${stepId}`);
        return next;
      });

      // Authoritative path: POST to /api/pipelines/:runId/approvals.
      // The pre-existing resolveApproval() above was a WebSocket command that
      // the gateway doesn't bridge through to social-api's PipelineModule —
      // approvals never actually persisted. Fire-and-forget; if it fails the
      // optimistic card snaps back via the next pendingApprovals refresh.
      void fetch(`/api/pipelines/${encodeURIComponent(runId)}/approvals`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stepId, decision, ...(comment ? { comment } : {}) }),
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error('[approvals] POST failed', err);
      });

      navigate(`/pipelines/${pipelineId}/runs/${runId}`);
    },
    [resolveApproval, navigate],
  );

  const count = rows.length;

  return (
    <div data-testid="pending-approvals-page" className="flex flex-col h-full overflow-hidden bg-surface-inset font-[inherit]">
      <div className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-surface sticky top-0 z-[2]">
        <div className="flex items-center gap-2.5">
          <div className="text-lg font-bold text-text-primary">Pending approvals</div>
          <Chip data-testid="pending-count" tone={count > 0 ? 'warning' : 'neutral'} size="sm">
            {count}
          </Chip>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {error ? (
          <div data-testid="approvals-error" role="alert" className="px-4 py-3 bg-danger-bg border border-danger text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-4">
            <span className="text-[13px] font-medium">Couldn't load pending approvals. Try again.</span>
            <button data-testid="approvals-retry" onClick={retry} className="px-3.5 py-1.5 text-[13px] font-medium bg-surface text-danger-fg border border-danger rounded-md cursor-pointer font-[inherit]">Retry</button>
          </div>
        ) : null}

        {isLoading && count === 0 ? (
          <div data-testid="approvals-loading" className="flex flex-col gap-3 max-w-[680px] mx-auto">
            <SkeletonCard height={140} />
            <SkeletonCard height={140} />
            <SkeletonCard height={140} />
          </div>
        ) : count === 0 && !error ? (
          <EmptyState
            icon="✋"
            title="No pending approvals"
            body="When a pipeline reaches an approval step, it'll show up here."
            testId="approvals-empty"
          />
        ) : (
          <div data-testid="approvals-list" className="flex flex-col gap-3 max-w-[680px] mx-auto">
            {rows.map((row) => (
              <ApprovalCard
                key={`${row.runId}:${row.stepId}`}
                row={row}
                onOpenPipeline={() => navigate(`/pipelines/${row.pipelineId}`)}
                onSubmit={(decision, comment) =>
                  handleSubmit(row.pipelineId, row.runId, row.stepId, decision, comment)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
