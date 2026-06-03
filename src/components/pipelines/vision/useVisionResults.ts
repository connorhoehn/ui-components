import { useEffect, useMemo, useRef, useState } from 'react';
import { useEventStream } from '../context/EventStreamContext';
import type { WildcardEvent } from '../context/EventStreamContext';
import type { VisionResult } from './types';

export type VisionStepStatus = 'running' | 'completed' | 'failed';

export interface VisionStepRecord {
  runId: string;
  stepId: string;
  status: VisionStepStatus;
  result?: VisionResult;
  error?: string;
  /** Wall-clock ms since the step's `started` event. */
  elapsedMs?: number;
  /** Endpoint id reported by the started event (e.g. 'ec2-vision-qwen'). */
  endpointId?: string;
  startedAt?: number;
  completedAt?: number;
}

/**
 * Wire-event payload contract for the vision-step events the platform-api
 * `image:vision-analyze` handler emits. Mirrors the `event-catalog`
 * declarations (see platform-api/src/types/image-pipeline.ts).
 *
 * We use a permissive shape so this hook stays useful even if the catalog
 * adds optional fields. The hook only requires `runId`, `stepId`, and on
 * completed events, the `result` payload.
 */
export interface PipelineImageVisionStartedPayload {
  runId: string;
  stepId: string;
  endpointId?: string;
  at?: number;
}
export interface PipelineImageVisionCompletedPayload {
  runId: string;
  stepId: string;
  result: VisionResult;
  at?: number;
}
export interface PipelineImageVisionFailedPayload {
  runId: string;
  stepId: string;
  error: string;
  at?: number;
}

export interface UseVisionResultsOptions {
  /** Limit accumulated records to the most recent N. Default: 50. */
  maxRecords?: number;
  /** When set, only records for this runId are kept. */
  runId?: string;
}

/**
 * Hook that subscribes to the pipeline event stream (the same stream the
 * existing runs page consumes) and folds `pipeline.image.vision.*` events
 * into a per-step record map. Stable record identity per (runId, stepId)
 * — completion mutates the existing record rather than creating a new one,
 * so a downstream `<VisionRunCard>` smoothly transitions running → completed
 * without unmounting.
 *
 * Pure observer: never publishes, never owns state outside React. Designed
 * to be embedded in the existing PipelinesPage / PipelineRunsPanel without
 * disturbing their context tree.
 */
export function useVisionResults(opts: UseVisionResultsOptions = {}): VisionStepRecord[] {
  const { maxRecords = 50, runId: filterRunId } = opts;
  const [records, setRecords] = useState<VisionStepRecord[]>([]);
  // Index for O(1) update by (runId, stepId). Kept in a ref so the
  // subscription effect doesn't churn on every setRecords.
  const indexRef = useRef<Map<string, number>>(new Map());

  // Late-arriving events after unmount would otherwise trigger setState
  // on an unmounted component — fall through silently.
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Subscribe to the wildcard event stream. The WildcardEvent envelope
  // shape is `{ eventType, payload }` — the type system can't narrow on
  // string event names without further plumbing, so we accept the union
  // and pick the wildcard-shape arm.
  useEventStream('*', (event) => {
    if (!mountedRef.current) return;
    const env = event as WildcardEvent;
    if (!env || typeof env.eventType !== 'string') return;
    const type = env.eventType;
    if (!type.startsWith('pipeline.image.vision.')) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = env.payload as any;
    if (!payload || typeof payload.runId !== 'string' || typeof payload.stepId !== 'string') return;
    if (filterRunId && payload.runId !== filterRunId) return;
    const key = `${payload.runId}::${payload.stepId}`;

    setRecords((prev) => {
      const idx = indexRef.current.get(key);
      const now = typeof payload.at === 'number' ? payload.at : Date.now();
      const updateOrInsert = (next: VisionStepRecord): VisionStepRecord[] => {
        if (typeof idx === 'number' && idx >= 0 && idx < prev.length) {
          const copy = prev.slice();
          copy[idx] = { ...prev[idx], ...next };
          return copy;
        }
        const inserted = [next, ...prev];
        if (inserted.length > maxRecords) inserted.length = maxRecords;
        // Rebuild index after insertion (the head shifted)
        const newIdx = new Map<string, number>();
        inserted.forEach((r, i) => newIdx.set(`${r.runId}::${r.stepId}`, i));
        indexRef.current = newIdx;
        return inserted;
      };

      if (type === 'pipeline.image.vision.started') {
        return updateOrInsert({
          runId: payload.runId,
          stepId: payload.stepId,
          status: 'running',
          endpointId: payload.endpointId,
          startedAt: now,
        });
      }
      if (type === 'pipeline.image.vision.completed') {
        const existing = typeof idx === 'number' ? prev[idx] : undefined;
        return updateOrInsert({
          runId: payload.runId,
          stepId: payload.stepId,
          status: 'completed',
          result: payload.result,
          completedAt: now,
          elapsedMs: existing?.startedAt ? now - existing.startedAt : undefined,
          endpointId: existing?.endpointId ?? payload.result?.model?.endpointId,
        });
      }
      if (type === 'pipeline.image.vision.failed') {
        const existing = typeof idx === 'number' ? prev[idx] : undefined;
        return updateOrInsert({
          runId: payload.runId,
          stepId: payload.stepId,
          status: 'failed',
          error: payload.error,
          completedAt: now,
          elapsedMs: existing?.startedAt ? now - existing.startedAt : undefined,
        });
      }
      return prev;
    });
  });

  // Returned array is already newest-first per the insertion above.
  return useMemo(() => records, [records]);
}

export default useVisionResults;
