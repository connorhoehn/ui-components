// src/components/pipelines/context-inspector/useContextSnapshots.ts
//
// Hook that derives step-level context snapshots from a PipelineRun plus live
// event-stream data (prompts + checkpoints). Returns an enriched snapshot array
// and the currently-active snapshot.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PipelineRun, StepExecution } from '../../../types/pipeline';
import { useEventStream } from '../context/EventStreamContext';
import type { WildcardEvent } from '../context/EventStreamContext';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StepContextSnapshot {
  stepId: string;
  /** Context as it was before this step executed (input). */
  inputContext: Record<string, unknown>;
  /** What this step produced / added. */
  output: unknown;
  /** Context after this step's output was merged. */
  outputContext: Record<string, unknown>;
  /** For LLM steps: the resolved prompt template. */
  resolvedPrompt?: string;
  /** Keys that were newly added to the context by this step. */
  newKeys: string[];
  /** Full StepExecution for metadata access (LLM, error, approvals, duration). */
  stepExecution: StepExecution;
}

// ---------------------------------------------------------------------------
// Context accumulation logic (mirrors PipelineExecutor's accumulateContext)
// ---------------------------------------------------------------------------

function accumulateContext(
  context: Record<string, unknown>,
  stepId: string,
  output: unknown,
): Record<string, unknown> {
  const next = { ...context };
  const steps = { ...((next.steps as Record<string, unknown>) ?? {}) };
  steps[stepId] = output;
  next.steps = steps;

  if (output && typeof output === 'object' && !Array.isArray(output)) {
    Object.assign(next, output as Record<string, unknown>);
  }

  return next;
}

function findNewKeys(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
): string[] {
  const newKeys: string[] = [];
  for (const key of Object.keys(after)) {
    if (!(key in before)) {
      newKeys.push(key);
    }
  }
  return newKeys;
}

// ---------------------------------------------------------------------------
// Build step snapshots from a PipelineRun
// ---------------------------------------------------------------------------

function buildSnapshots(run: PipelineRun): StepContextSnapshot[] {
  // Order steps by startedAt (chronological execution order).
  const orderedSteps = Object.values(run.steps)
    .filter((s): s is StepExecution => s != null)
    .sort((a, b) => {
      const aStart = a.startedAt ? Date.parse(a.startedAt) : 0;
      const bStart = b.startedAt ? Date.parse(b.startedAt) : 0;
      return aStart - bStart;
    });

  const snapshots: StepContextSnapshot[] = [];
  let currentContext: Record<string, unknown> = {};

  // Seed from trigger payload if present.
  if (run.triggeredBy?.payload && typeof run.triggeredBy.payload === 'object') {
    currentContext = { ...run.triggeredBy.payload };
  }

  for (const step of orderedSteps) {
    const inputContext = { ...currentContext };
    const output = step.output;
    const resolvedPrompt = step.llm?.prompt;

    // Accumulate context with this step's output.
    let outputContext: Record<string, unknown>;
    if (output !== undefined) {
      outputContext = accumulateContext(currentContext, step.nodeId, output);
    } else {
      outputContext = { ...currentContext };
      // Still record in steps map even if output is undefined.
      const steps = {
        ...((outputContext.steps as Record<string, unknown>) ?? {}),
      };
      steps[step.nodeId] = output;
      outputContext.steps = steps;
    }

    const newKeys = findNewKeys(inputContext, outputContext);

    snapshots.push({
      stepId: step.nodeId,
      inputContext,
      output,
      outputContext,
      resolvedPrompt: resolvedPrompt || undefined,
      newKeys,
      stepExecution: step,
    });

    currentContext = outputContext;
  }

  return snapshots;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export interface UseContextSnapshotsResult {
  /** All enriched snapshots (with live prompt/checkpoint data merged in). */
  enrichedSnapshots: StepContextSnapshot[];
  /** The currently-active snapshot (based on activeStepId). */
  activeSnapshot: StepContextSnapshot | null;
  /** Set of keys newly added by the active step. */
  newKeysSet: Set<string>;
}

export function useContextSnapshots(
  run: PipelineRun | null,
  activeStepId: string | null,
): UseContextSnapshotsResult {
  const [livePrompts, setLivePrompts] = useState<Map<string, string>>(new Map());
  const [liveCheckpoints, setLiveCheckpoints] = useState<Map<string, Record<string, unknown>>>(
    new Map(),
  );
  const prevRunIdRef = useRef<string | null>(null);

  // Reset live state when runId changes.
  useEffect(() => {
    const runId = run?.id ?? null;
    if (runId !== prevRunIdRef.current) {
      prevRunIdRef.current = runId;
      setLivePrompts(new Map());
      setLiveCheckpoints(new Map());
    }
  }, [run?.id]);

  // Subscribe to wildcard events for live checkpoint + prompt updates.
  const handler = useCallback(
    (envelope: unknown) => {
      if (!envelope || typeof envelope !== 'object') return;
      const { eventType, payload } = envelope as WildcardEvent;
      if (!payload || typeof payload !== 'object') return;

      const p = payload as Record<string, unknown>;
      const eventRunId = p.runId as string | undefined;
      if (!run?.id || eventRunId !== run.id) return;

      // Capture resolved prompts from LLM steps.
      if (eventType === 'pipeline.llm.prompt') {
        const stepId = p.stepId as string | undefined;
        const prompt = p.prompt as string | undefined;
        if (stepId && prompt) {
          setLivePrompts((prev) => {
            const next = new Map(prev);
            next.set(stepId, prompt);
            return next;
          });
        }
      }

      // Capture checkpoint events (full context snapshots at step boundaries).
      if (
        eventType === 'pipeline.run.checkpoint' ||
        eventType === 'pipeline.run.checkpointed' ||
        eventType === 'pipeline:run:checkpoint' ||
        eventType === 'pipeline:run:checkpointed'
      ) {
        const context = p.context as Record<string, unknown> | undefined;
        const stepId = p.stepId as string | undefined;
        if (context && stepId) {
          setLiveCheckpoints((prev) => {
            const next = new Map(prev);
            next.set(stepId, context);
            return next;
          });
        }
      }
    },
    [run?.id],
  );

  useEventStream('*', handler);

  // Build snapshots from the run's step data.
  const snapshots = useMemo(() => {
    if (!run) return [];
    return buildSnapshots(run);
  }, [run]);

  // Enhance snapshots with live data.
  const enrichedSnapshots = useMemo(() => {
    return snapshots.map((snapshot) => {
      const livePrompt = livePrompts.get(snapshot.stepId);
      const liveContext = liveCheckpoints.get(snapshot.stepId);
      return {
        ...snapshot,
        resolvedPrompt: snapshot.resolvedPrompt || livePrompt,
        outputContext: liveContext ?? snapshot.outputContext,
      };
    });
  }, [snapshots, livePrompts, liveCheckpoints]);

  // Determine which snapshot to show.
  const activeSnapshot = useMemo(() => {
    if (!activeStepId) return enrichedSnapshots[enrichedSnapshots.length - 1] ?? null;
    return enrichedSnapshots.find((s) => s.stepId === activeStepId) ?? null;
  }, [enrichedSnapshots, activeStepId]);

  // Highlight keys that were added by the active step.
  const newKeysSet = useMemo(() => {
    if (!activeSnapshot) return new Set<string>();
    return new Set(activeSnapshot.newKeys);
  }, [activeSnapshot]);

  return { enrichedSnapshots, activeSnapshot, newKeysSet };
}
