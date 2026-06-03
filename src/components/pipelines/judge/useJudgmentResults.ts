import { useEffect, useMemo, useRef, useState } from 'react';
import { useEventStream } from '../context/EventStreamContext';
import type { WildcardEvent } from '../context/EventStreamContext';
import type { JudgeFailureReason, JudgmentResult } from './types';

export type JudgmentStepStatus = 'running' | 'scored' | 'failed' | 'budget-exceeded';

export interface JudgmentStepRecord {
  runId: string;
  stepId: string;
  pipelineId?: string;
  status: JudgmentStepStatus;
  result?: JudgmentResult;
  error?: string;
  failureReason?: JudgeFailureReason;
  /** Wall-clock ms since the step's `started` event. */
  elapsedMs?: number;
  /** Rubric id from the started event. */
  rubricId?: string;
  /** Model id from the started or scored event. */
  judgeModel?: string;
  startedAt?: number;
  completedAt?: number;
  costUsd?: number;
  tokensIn?: number;
  tokensOut?: number;
}

/**
 * Wire-event payload contract for the four `pipeline.judge.*` events. The
 * gateway delivers colon-form (`pipeline:judge:scored`) over the WS bus;
 * the EventStreamContext normalizes to dot-form (`pipeline.judge.scored`)
 * before delivery, matching the existing vision-hook convention.
 *
 * Permissive shapes — only the required envelope fields are typed; the
 * payload otherwise matches platform-api's JudgeStepHandler emits +
 * event-catalog's pipeline-judge schema.
 */
export interface PipelineJudgeStartedPayload {
  runId: string;
  stepId: string;
  pipelineId?: string;
  rubricId?: string;
  judgeModel?: string;
  at?: number | string;
}
export interface PipelineJudgeScoredPayload {
  runId: string;
  stepId: string;
  pipelineId?: string;
  judgmentId?: string;
  rubricId?: string;
  judgeModel?: string;
  result: JudgmentResult;
  costUsd?: number;
  latencyMs?: number;
  usage?: { inputTokens?: number; outputTokens?: number };
  at?: number | string;
}
export interface PipelineJudgeFailedPayload {
  runId: string;
  stepId: string;
  pipelineId?: string;
  reason: JudgeFailureReason;
  error: string;
  costUsd?: number;
  latencyMs?: number;
  tokensIn?: number;
  tokensOut?: number;
  at?: number | string;
}
export interface PipelineJudgeBudgetExceededPayload {
  runId: string;
  stepId: string;
  pipelineId?: string;
  at?: number | string;
}

export interface UseJudgmentResultsOptions {
  /** Limit accumulated records to the most recent N. Default 50. */
  maxRecords?: number;
  /** When set, only records for this runId are kept. */
  runId?: string;
}

function toMs(at: number | string | undefined): number {
  if (typeof at === 'number') return at;
  if (typeof at === 'string') {
    const parsed = Date.parse(at);
    if (Number.isFinite(parsed)) return parsed;
  }
  return Date.now();
}

/**
 * Hook that subscribes to the pipeline event stream and folds the four
 * `pipeline.judge.*` events into a per-step record map. Stable identity
 * per (runId, stepId) — `scored`/`failed`/`budget-exceeded` mutate the
 * existing record rather than creating a new one, so a downstream card
 * smoothly transitions running → scored without unmounting.
 *
 * Pure observer: never publishes, never owns state outside React. Designed
 * to be embedded in the existing PipelinesPage / PipelineRunsPanel without
 * disturbing their context tree. Mirrors useVisionResults' shape so
 * consumers can fold both into one activity stream component.
 */
export function useJudgmentResults(opts: UseJudgmentResultsOptions = {}): JudgmentStepRecord[] {
  const { maxRecords = 50, runId: filterRunId } = opts;
  const [records, setRecords] = useState<JudgmentStepRecord[]>([]);
  const indexRef = useRef<Map<string, number>>(new Map());

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEventStream('*', (event) => {
    if (!mountedRef.current) return;
    const env = event as WildcardEvent;
    if (!env || typeof env.eventType !== 'string') return;
    const type = env.eventType;
    if (!type.startsWith('pipeline.judge.')) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = env.payload as any;
    if (!payload || typeof payload.runId !== 'string' || typeof payload.stepId !== 'string') return;
    if (filterRunId && payload.runId !== filterRunId) return;
    const key = `${payload.runId}::${payload.stepId}`;

    setRecords((prev) => {
      const idx = indexRef.current.get(key);
      const now = toMs(payload.at);
      const updateOrInsert = (next: JudgmentStepRecord): JudgmentStepRecord[] => {
        if (typeof idx === 'number' && idx >= 0 && idx < prev.length) {
          const copy = prev.slice();
          copy[idx] = { ...prev[idx], ...next };
          return copy;
        }
        const inserted = [next, ...prev];
        if (inserted.length > maxRecords) inserted.length = maxRecords;
        const newIdx = new Map<string, number>();
        inserted.forEach((r, i) => newIdx.set(`${r.runId}::${r.stepId}`, i));
        indexRef.current = newIdx;
        return inserted;
      };

      if (type === 'pipeline.judge.started') {
        return updateOrInsert({
          runId: payload.runId,
          stepId: payload.stepId,
          pipelineId: payload.pipelineId,
          status: 'running',
          rubricId: payload.rubricId,
          judgeModel: payload.judgeModel,
          startedAt: now,
        });
      }
      if (type === 'pipeline.judge.scored') {
        const existing = typeof idx === 'number' ? prev[idx] : undefined;
        return updateOrInsert({
          runId: payload.runId,
          stepId: payload.stepId,
          pipelineId: payload.pipelineId ?? existing?.pipelineId,
          status: 'scored',
          result: payload.result,
          completedAt: now,
          elapsedMs: existing?.startedAt ? now - existing.startedAt : payload.latencyMs,
          rubricId: payload.rubricId ?? existing?.rubricId,
          judgeModel: payload.judgeModel ?? existing?.judgeModel,
          costUsd: payload.costUsd ?? payload.result?.costUsd,
          tokensIn: payload.usage?.inputTokens ?? payload.result?.tokensIn,
          tokensOut: payload.usage?.outputTokens ?? payload.result?.tokensOut,
        });
      }
      if (type === 'pipeline.judge.failed') {
        const existing = typeof idx === 'number' ? prev[idx] : undefined;
        return updateOrInsert({
          runId: payload.runId,
          stepId: payload.stepId,
          pipelineId: payload.pipelineId ?? existing?.pipelineId,
          status: 'failed',
          error: payload.error,
          failureReason: payload.reason,
          completedAt: now,
          elapsedMs: existing?.startedAt ? now - existing.startedAt : payload.latencyMs,
          costUsd: payload.costUsd,
          tokensIn: payload.tokensIn,
          tokensOut: payload.tokensOut,
        });
      }
      if (type === 'pipeline.judge.budget-exceeded') {
        const existing = typeof idx === 'number' ? prev[idx] : undefined;
        return updateOrInsert({
          runId: payload.runId,
          stepId: payload.stepId,
          pipelineId: payload.pipelineId ?? existing?.pipelineId,
          status: 'budget-exceeded',
          completedAt: now,
        });
      }
      return prev;
    });
  });

  return useMemo(() => records, [records]);
}

export default useJudgmentResults;
