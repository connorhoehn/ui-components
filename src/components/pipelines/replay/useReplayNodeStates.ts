// frontend/src/components/pipelines/replay/useReplayNodeStates.ts
//
// Derives per-node and per-edge visual states from the replay event array at
// the current cursor position. Used by PipelineRunReplayPage to apply animated
// highlights to canvas nodes and edges during scrubber playback.
//
// State machine per node:
//   idle -> active (on pipeline.step.started)
//   active -> completed (on pipeline.step.completed)
//   active -> failed (on pipeline.step.failed)
//   active -> skipped (on pipeline.step.skipped / pipeline.step.cancelled)
//
// Edge activation:
//   When a step starts, incoming edges to that node become 'traversed-success'.
//   When a step fails, incoming edges to that node become 'traversed-failure'.
//   Currently executing edges (source completed, target running) become 'active'.

import { useMemo } from 'react';

import type { PipelineWireEvent, PipelineEventMap } from '../../../types/pipeline';
import type { NodeExecutionState } from '../nodes/BaseNode';
import type { EdgeState } from '../canvas/edges/AnimatedEdge';
import type { ReplayDriver } from './useReplayDriver';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ReplayNodeStates {
  /** Map from node id to visual execution state at the current cursor. */
  nodeStates: Record<string, NodeExecutionState>;
  /** Map from edge id to visual edge state at the current cursor. */
  edgeStates: Record<string, EdgeState>;
  /** The step id currently active (running) at cursor position, if any. */
  activeStepId: string | null;
}

// ---------------------------------------------------------------------------
// Core derivation (pure function — no hooks)
// ---------------------------------------------------------------------------

/**
 * Walk events[0..cursor) and compute per-node states at that point in time.
 */
export function deriveNodeStatesAtCursor(
  events: PipelineWireEvent[],
  cursor: number,
  edges?: Array<{ id: string; source: string; target: string }>,
): ReplayNodeStates {
  const nodeStates: Record<string, NodeExecutionState> = {};
  const edgeStates: Record<string, EdgeState> = {};
  let activeStepId: string | null = null;

  // Walk all events up to (but not including) cursor.
  const end = Math.min(cursor, events.length);
  for (let i = 0; i < end; i++) {
    const evt = events[i];
    const { eventType, payload } = evt;

    switch (eventType) {
      case 'pipeline.step.started': {
        const p = payload as PipelineEventMap['pipeline.step.started'];
        nodeStates[p.stepId] = 'running';
        activeStepId = p.stepId;
        break;
      }
      case 'pipeline.step.completed': {
        const p = payload as PipelineEventMap['pipeline.step.completed'];
        nodeStates[p.stepId] = 'completed';
        if (activeStepId === p.stepId) activeStepId = null;
        break;
      }
      case 'pipeline.step.failed': {
        const p = payload as PipelineEventMap['pipeline.step.failed'];
        nodeStates[p.stepId] = 'failed';
        if (activeStepId === p.stepId) activeStepId = null;
        break;
      }
      case 'pipeline.step.skipped': {
        const p = payload as PipelineEventMap['pipeline.step.skipped'];
        nodeStates[p.stepId] = 'skipped';
        if (activeStepId === p.stepId) activeStepId = null;
        break;
      }
      case 'pipeline.step.cancelled': {
        const p = payload as PipelineEventMap['pipeline.step.cancelled'];
        nodeStates[p.stepId] = 'skipped';
        if (activeStepId === p.stepId) activeStepId = null;
        break;
      }
      default:
        break;
    }
  }

  // Find the last active step (any node still in 'running' state).
  // There could be multiple running (fork/join), pick the most recent.
  let lastActiveStepId: string | null = null;
  for (const [nodeId, state] of Object.entries(nodeStates)) {
    if (state === 'running') {
      lastActiveStepId = nodeId;
    }
  }
  activeStepId = lastActiveStepId;

  // Derive edge states from node states.
  if (edges) {
    for (const edge of edges) {
      const sourceState = nodeStates[edge.source];
      const targetState = nodeStates[edge.target];

      if (targetState === 'failed') {
        edgeStates[edge.id] = 'traversed-failure';
      } else if (targetState === 'running') {
        // Data is flowing along this edge right now.
        edgeStates[edge.id] = 'active';
      } else if (targetState === 'completed' || targetState === 'skipped') {
        edgeStates[edge.id] = 'traversed-success';
      } else if (sourceState === 'completed' || sourceState === 'running') {
        // Source has data ready but target hasn't started yet — show as default.
        edgeStates[edge.id] = 'default';
      } else {
        edgeStates[edge.id] = 'default';
      }
    }
  }

  return { nodeStates, edgeStates, activeStepId };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * React hook that derives node/edge animation states from the replay driver's
 * current cursor position. Recomputes when cursor or events change.
 */
export function useReplayNodeStates(
  replay: ReplayDriver,
  edges?: Array<{ id: string; source: string; target: string }>,
): ReplayNodeStates {
  const { state, events } = replay;
  const { cursor } = state;

  return useMemo(
    () => deriveNodeStatesAtCursor(events, cursor, edges),
    [events, cursor, edges],
  );
}
