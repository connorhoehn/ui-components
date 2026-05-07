// frontend/src/components/pipelines/hooks/usePipelineActivityRelay.ts
//
// Relays select pipeline run-lifecycle events onto the activity bus so they
// appear in the cross-cutting activity feeds (ActivityFeed / BigBrotherPanel /
// ActivityPanel) alongside existing doc.* / social.* entries.
//
// Design notes:
//   - Only run-lifecycle + approval.requested are relayed. Step-level and
//     llm.token events are intentionally dropped: a single LLM stream can fire
//     hundreds of token events, which would drown the activity feed and the
//     BigBrotherPanel event list.
//   - The relay reads from the EventStream (fed by the gateway WS bridge) and
//     re-publishes a projected detail onto the activity bus so cross-cutting
//     activity feeds (BigBrotherPanel / ActivityFeed / ActivityPanel) see the
//     same entries that the pipeline observability surfaces get.

import { useEffect, useRef } from 'react';
import {
  useEventStreamContext,
  type WildcardEvent,
} from '../context/EventStreamContext';
import type { PipelineEventMap } from '../../../types/pipeline';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Event types we mirror onto the activity bus. */
const RELAYED_EVENT_TYPES: ReadonlySet<keyof PipelineEventMap> = new Set<
  keyof PipelineEventMap
>([
  'pipeline.run.started',
  'pipeline.run.completed',
  'pipeline.run.failed',
  'pipeline.approval.requested',
]);

/**
 * Projects a typed pipeline payload down to the minimal detail shape the
 * activity bus consumers (BigBrotherPanel / ActivityFeed) care about. Keeps
 * the detail objects small + stable-shape so the feed renderers don't need
 * to know the full pipeline payload schema.
 */
function buildDetail(
  eventType: keyof PipelineEventMap,
  payload: unknown,
): Record<string, unknown> | null {
  const p = payload as Record<string, unknown> | undefined;
  if (!p) return null;

  switch (eventType) {
    case 'pipeline.run.started': {
      const typed = p as PipelineEventMap['pipeline.run.started'];
      return {
        runId: typed.runId,
        pipelineId: typed.pipelineId,
        triggeredBy: typed.triggeredBy,
      };
    }
    case 'pipeline.run.completed': {
      const typed = p as PipelineEventMap['pipeline.run.completed'];
      return {
        runId: typed.runId,
        durationMs: typed.durationMs,
      };
    }
    case 'pipeline.run.failed': {
      const typed = p as PipelineEventMap['pipeline.run.failed'];
      return {
        runId: typed.runId,
        error: typed.error?.message ?? 'unknown error',
      };
    }
    case 'pipeline.approval.requested': {
      const typed = p as PipelineEventMap['pipeline.approval.requested'];
      return {
        runId: typed.runId,
        stepId: typed.stepId,
        approverCount: Array.isArray(typed.approvers) ? typed.approvers.length : 0,
      };
    }
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Bridges pipeline run-lifecycle events onto the activity bus. Intended to be
 * mounted once near the top of the app (see AppLayoutInner) inside both the
 * EventStreamProvider and the WebSocket/activity-bus provider.
 *
 * @param activityPublish — `publish` from `useActivityBus`. Stable-reference
 *   in practice (the hook's callback uses refs internally), but we subscribe
 *   once on mount and pull via ref so changing the identity doesn't re-attach.
 */
export function usePipelineActivityRelay(
  activityPublish: (eventType: string, detail: Record<string, unknown>) => void,
): void {
  const { subscribe } = useEventStreamContext();

  // Latest-ref pattern: callers pass a potentially changing closure, but we
  // want to subscribe once — not tear down/re-attach the listener on every
  // render. Reading through the ref inside the handler keeps us current.
  const publishRef = useRef(activityPublish);
  useEffect(() => {
    publishRef.current = activityPublish;
  }, [activityPublish]);

  useEffect(() => {
    const cleanup = subscribe('*', (envelope) => {
      // Wildcard handler: the dispatcher passes `{ eventType, payload }`.
      const wild = envelope as WildcardEvent;
      const eventType = wild.eventType as keyof PipelineEventMap;
      if (!RELAYED_EVENT_TYPES.has(eventType)) return;

      const detail = buildDetail(eventType, wild.payload);
      if (!detail) return;

      publishRef.current(eventType, detail);
    });

    return cleanup;
  }, [subscribe]);
}
