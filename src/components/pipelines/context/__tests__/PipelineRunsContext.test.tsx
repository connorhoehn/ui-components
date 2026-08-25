// context/__tests__/PipelineRunsContext.test.tsx
//
// The runs store is a state machine fed by two writers — the WS event stream
// and a polling `ingestRun` — plus a one-shot history fetch. These tests drive
// the transitions and the writer interleaving, not the rendering.

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, render } from '@testing-library/react';
import type { PipelineEventMap, PipelineRun } from '../../../../types/pipeline';

// --- Seams the provider pulls in that are not under test --------------------
vi.mock('../WebSocketEventAdapter', () => ({
  usePipelineWsCommands: () => ({
    cancelRun: vi.fn(),
    resolveApproval: vi.fn(),
  }),
}));
vi.mock('../../hooks/useTriggerRun', () => ({
  useTriggerRun: () => ({ triggerRun: vi.fn(async () => 'run-new') }),
}));
const mockListPipelineRuns = vi.fn(async () => ({ runs: [] as PipelineRun[] }));
vi.mock('../../../../api/pipelineRuns', () => ({
  listPipelineRuns: (...args: unknown[]) =>
    (mockListPipelineRuns as unknown as (...a: unknown[]) => Promise<{ runs: PipelineRun[] }>)(
      ...args,
    ),
}));

import { EventStreamProvider, useEventStreamContext, type EventStreamValue } from '../EventStreamContext';
import { PipelineRunsProvider, usePipelineRuns, type PipelineRunsValue } from '../PipelineRunsContext';

// ---------------------------------------------------------------------------
// Harness
// ---------------------------------------------------------------------------

let runsCtx: PipelineRunsValue;
let stream: EventStreamValue;

function Probe() {
  runsCtx = usePipelineRuns();
  stream = useEventStreamContext();
  return null;
}

function mount() {
  return render(
    <EventStreamProvider>
      <PipelineRunsProvider>
        <Probe />
      </PipelineRunsProvider>
    </EventStreamProvider>,
  );
}

function send<K extends keyof PipelineEventMap>(type: K, payload: PipelineEventMap[K]) {
  act(() => {
    stream.dispatch(type, payload);
  });
}

function startRun(runId = 'r1', pipelineId = 'p1', at = '2026-02-01T10:00:00.000Z') {
  send('pipeline.run.started', {
    runId,
    pipelineId,
    triggeredBy: { userId: 'u', triggerType: 'manual' },
    at,
  } as PipelineEventMap['pipeline.run.started']);
}

function makeRun(over: Partial<PipelineRun> = {}): PipelineRun {
  return {
    id: 'r1',
    pipelineId: 'p1',
    pipelineVersion: 1,
    status: 'running',
    triggeredBy: { userId: 'u', triggerType: 'manual' },
    ownerNodeId: 'local',
    startedAt: '2026-02-01T10:00:00.000Z',
    currentStepIds: [],
    steps: {},
    context: {},
    ...over,
  } as PipelineRun;
}

describe('PipelineRunsContext', () => {
  beforeEach(() => {
    localStorage.clear();
    mockListPipelineRuns.mockResolvedValue({ runs: [] });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // ingestRun — the polled writer racing the event writer
  // -------------------------------------------------------------------------

  describe('ingestRun', () => {
    it('does not rewind a completed run to a stale in-flight poll', () => {
      mount();
      startRun();
      send('pipeline.run.completed', {
        runId: 'r1',
        at: '2026-02-01T10:00:05.000Z',
        durationMs: 5000,
      } as PipelineEventMap['pipeline.run.completed']);
      expect(runsCtx.runs.r1.status).toBe('completed');

      // A poll issued before the completion event finally returns. Its body
      // predates the terminal transition. Applying it wholesale used to flip
      // the run back to `running`: the live visualiser spun forever on a
      // finished run and it reappeared in activeRunIds.
      act(() => {
        runsCtx.ingestRun(makeRun({ status: 'running', steps: { a: { nodeId: 'a', status: 'running' } } }));
      });

      expect(runsCtx.runs.r1.status).toBe('completed');
      expect(runsCtx.activeRunIds).toEqual([]);
    });

    it('does not rewind a failed run either', () => {
      mount();
      startRun();
      send('pipeline.run.failed', {
        runId: 'r1',
        at: '2026-02-01T10:00:05.000Z',
        error: { nodeId: 's1', message: 'boom' },
      } as PipelineEventMap['pipeline.run.failed']);

      act(() => {
        runsCtx.ingestRun(makeRun({ status: 'awaiting_approval' }));
      });

      expect(runsCtx.runs.r1.status).toBe('failed');
      expect(runsCtx.runs.r1.error?.message).toBe('boom');
    });

    it('accepts a poll that carries the terminal state we have not seen yet', () => {
      mount();
      startRun();

      act(() => {
        runsCtx.ingestRun(makeRun({ status: 'completed', completedAt: '2026-02-01T10:00:09.000Z' }));
      });

      expect(runsCtx.runs.r1.status).toBe('completed');
    });

    it('accepts a richer poll at the same status and ignores a poorer one', () => {
      mount();
      act(() => {
        runsCtx.ingestRun(makeRun({ steps: { a: { nodeId: 'a', status: 'completed' } } }));
      });
      act(() => {
        runsCtx.ingestRun(
          makeRun({ steps: { a: { nodeId: 'a', status: 'completed' }, b: { nodeId: 'b', status: 'running' } } }),
        );
      });
      expect(Object.keys(runsCtx.runs.r1.steps)).toEqual(['a', 'b']);

      act(() => {
        runsCtx.ingestRun(makeRun({ steps: { a: { nodeId: 'a', status: 'pending' } } }));
      });
      expect(Object.keys(runsCtx.runs.r1.steps)).toEqual(['a', 'b']);
    });

    it('inserts a run it has never seen', () => {
      mount();
      act(() => {
        runsCtx.ingestRun(makeRun({ id: 'polled-only' }));
      });
      expect(runsCtx.runs['polled-only']).toBeDefined();
      expect(runsCtx.activeRunIds).toEqual(['polled-only']);
    });

    // Crash resistance: `ingestRun` takes a run straight off a host poll, and
    // a run-LIST endpoint that returns summaries omits `steps`. The very next
    // line did `Object.keys(run.steps).length`, and every runs page's render
    // memo does the same — so a single summary-shaped response threw the
    // provider away and blanked everything mounted under it, the runs the
    // provider already held included.
    it('survives a polled run with no `steps` and keeps the runs it already had', () => {
      mount();
      startRun();
      act(() => {
        runsCtx.ingestRun({
          id: 'summary-only',
          pipelineId: 'p1',
          status: 'running',
          startedAt: '2026-02-01T10:00:00.000Z',
        } as unknown as PipelineRun);
      });

      expect(runsCtx.runs.r1).toBeDefined();
      expect(() => Object.keys(runsCtx.runs['summary-only'].steps)).not.toThrow();
    });

    it('survives a polled run with no `startedAt`', () => {
      mount();
      act(() => {
        runsCtx.ingestRun({
          id: 'no-start',
          pipelineId: 'p1',
          status: 'completed',
          steps: {},
        } as unknown as PipelineRun);
      });
      expect(typeof runsCtx.runs['no-start'].startedAt).toBe('string');
    });
  });

  // -------------------------------------------------------------------------
  // Event reducer — run + step lifecycle
  // -------------------------------------------------------------------------

  describe('run lifecycle', () => {
    it('tracks currentStepIds across started / completed', () => {
      mount();
      startRun();
      send('pipeline.step.started', { runId: 'r1', stepId: 's1', at: '2026-02-01T10:00:01.000Z' } as PipelineEventMap['pipeline.step.started']);
      send('pipeline.step.started', { runId: 'r1', stepId: 's2', at: '2026-02-01T10:00:01.000Z' } as PipelineEventMap['pipeline.step.started']);
      expect(runsCtx.runs.r1.currentStepIds).toEqual(['s1', 's2']);

      send('pipeline.step.completed', {
        runId: 'r1', stepId: 's1', at: '2026-02-01T10:00:02.000Z', durationMs: 1000, output: { ok: true },
      } as PipelineEventMap['pipeline.step.completed']);
      expect(runsCtx.runs.r1.currentStepIds).toEqual(['s2']);
      expect(runsCtx.runs.r1.steps.s1.status).toBe('completed');
      expect(runsCtx.runs.r1.steps.s1.output).toEqual({ ok: true });
    });

    it('never duplicates a step id in currentStepIds on a replayed start', () => {
      mount();
      startRun();
      send('pipeline.step.started', { runId: 'r1', stepId: 's1', at: '2026-02-01T10:00:01.000Z' } as PipelineEventMap['pipeline.step.started']);
      send('pipeline.step.started', { runId: 'r1', stepId: 's1', at: '2026-02-01T10:00:01.500Z' } as PipelineEventMap['pipeline.step.started']);
      expect(runsCtx.runs.r1.currentStepIds).toEqual(['s1']);
    });

    it('clears the frontier on a terminal run event', () => {
      mount();
      startRun();
      send('pipeline.step.started', { runId: 'r1', stepId: 's1', at: '2026-02-01T10:00:01.000Z' } as PipelineEventMap['pipeline.step.started']);
      send('pipeline.run.cancelled', { runId: 'r1', at: '2026-02-01T10:00:02.000Z' } as PipelineEventMap['pipeline.run.cancelled']);
      expect(runsCtx.runs.r1.status).toBe('cancelled');
      expect(runsCtx.runs.r1.currentStepIds).toEqual([]);
    });

    it('ignores events for a run it has never seen started', () => {
      mount();
      send('pipeline.step.completed', {
        runId: 'ghost', stepId: 's1', at: '2026-02-01T10:00:02.000Z', durationMs: 1, output: {},
      } as PipelineEventMap['pipeline.step.completed']);
      expect(runsCtx.runs.ghost).toBeUndefined();
    });

    it('ignores a payload with no runId', () => {
      mount();
      startRun();
      send('pipeline.run.completed', { at: 'x' } as unknown as PipelineEventMap['pipeline.run.completed']);
      expect(runsCtx.runs.r1.status).toBe('running');
    });

    it('records a step failure without ending the run', () => {
      mount();
      startRun();
      send('pipeline.step.started', { runId: 'r1', stepId: 's1', at: '2026-02-01T10:00:01.000Z' } as PipelineEventMap['pipeline.step.started']);
      send('pipeline.step.failed', {
        runId: 'r1', stepId: 's1', at: '2026-02-01T10:00:02.000Z', error: 'nope',
      } as PipelineEventMap['pipeline.step.failed']);
      expect(runsCtx.runs.r1.steps.s1.status).toBe('failed');
      expect(runsCtx.runs.r1.steps.s1.error).toBe('nope');
      expect(runsCtx.runs.r1.status).toBe('running');
    });

    it('maps a cancelled step onto failed with a marker, preserving an existing error', () => {
      mount();
      startRun();
      send('pipeline.step.cancelled', { runId: 'r1', stepId: 's1', at: '2026-02-01T10:00:02.000Z' } as PipelineEventMap['pipeline.step.cancelled']);
      expect(runsCtx.runs.r1.steps.s1.status).toBe('failed');
      expect(runsCtx.runs.r1.steps.s1.error).toBe('cancelled');
    });
  });

  // -------------------------------------------------------------------------
  // Approval / breakpoint / resume transitions
  // -------------------------------------------------------------------------

  describe('blocking transitions', () => {
    it('moves the run to awaiting_approval and keeps it active', () => {
      mount();
      startRun();
      send('pipeline.approval.requested', {
        runId: 'r1', stepId: 'ap', approvers: [{ type: 'user', value: 'a' }], at: '2026-02-01T10:00:03.000Z',
      } as PipelineEventMap['pipeline.approval.requested']);
      expect(runsCtx.runs.r1.status).toBe('awaiting_approval');
      expect(runsCtx.runs.r1.steps.ap.status).toBe('awaiting');
      expect(runsCtx.activeRunIds).toEqual(['r1']);
    });

    it('appends approval records in arrival order', () => {
      mount();
      startRun();
      send('pipeline.approval.requested', {
        runId: 'r1', stepId: 'ap', approvers: [], at: '2026-02-01T10:00:03.000Z',
      } as PipelineEventMap['pipeline.approval.requested']);
      send('pipeline.approval.recorded', {
        runId: 'r1', stepId: 'ap', userId: 'alice', decision: 'approve', at: '2026-02-01T10:00:04.000Z',
      } as PipelineEventMap['pipeline.approval.recorded']);
      send('pipeline.approval.recorded', {
        runId: 'r1', stepId: 'ap', userId: 'bob', decision: 'reject', at: '2026-02-01T10:00:05.000Z',
      } as PipelineEventMap['pipeline.approval.recorded']);
      expect(runsCtx.runs.r1.steps.ap.approvals?.map((a) => a.userId)).toEqual(['alice', 'bob']);
    });

    it('pauses at a breakpoint and counts as active', () => {
      mount();
      startRun();
      send('pipeline.step.breakpoint', {
        runId: 'r1', stepId: 's1', at: '2026-02-01T10:00:03.000Z',
      } as PipelineEventMap['pipeline.step.breakpoint']);
      expect(runsCtx.runs.r1.status).toBe('paused_at_breakpoint');
      expect(runsCtx.activeRunIds).toEqual(['r1']);
    });

    it('resume-from-step returns the run to running and records the attempt', () => {
      mount();
      startRun();
      send('pipeline.run.failed', { runId: 'r1', at: '2026-02-01T10:00:05.000Z', error: { nodeId: 's2', message: 'x' } } as PipelineEventMap['pipeline.run.failed']);
      send('pipeline.run.resumed-from-step', {
        runId: 'r1', fromNodeId: 's2', originalFailedStepId: 's2', at: '2026-02-01T10:01:00.000Z',
      } as PipelineEventMap['pipeline.run.resumed-from-step']);

      expect(runsCtx.runs.r1.status).toBe('running');
      expect(runsCtx.runs.r1.replayAttempts).toBe(1);
      expect(runsCtx.runs.r1.resumeHistory).toEqual([
        { fromNodeId: 's2', originalFailedStepId: 's2', at: '2026-02-01T10:01:00.000Z' },
      ]);
    });
  });

  // -------------------------------------------------------------------------
  // LLM streaming fold
  // -------------------------------------------------------------------------

  describe('llm streaming', () => {
    it('accumulates tokens and computes first-token latency from the stream open', () => {
      mount();
      startRun();
      send('pipeline.llm.prompt', {
        runId: 'r1', stepId: 'llm', prompt: 'hi', at: '2026-02-01T10:00:01.000Z',
      } as PipelineEventMap['pipeline.llm.prompt']);
      send('pipeline.llm.stream.opened', {
        runId: 'r1', stepId: 'llm', openedAt: '2026-02-01T10:00:01.000Z',
      } as PipelineEventMap['pipeline.llm.stream.opened']);
      expect(runsCtx.runs.r1.steps.llm.llm?.streamOpened).toBe(true);

      send('pipeline.llm.token', {
        runId: 'r1', stepId: 'llm', token: 'He', at: '2026-02-01T10:00:01.250Z',
      } as PipelineEventMap['pipeline.llm.token']);
      send('pipeline.llm.token', {
        runId: 'r1', stepId: 'llm', token: 'llo', at: '2026-02-01T10:00:01.400Z',
      } as PipelineEventMap['pipeline.llm.token']);

      const llm = runsCtx.runs.r1.steps.llm.llm!;
      expect(llm.response).toBe('Hello');
      expect(llm.tokensOut).toBe(2);
      expect(llm.prompt).toBe('hi');
      // Latency is measured to the FIRST token only.
      expect(llm.firstTokenLatencyMs).toBe(250);
      // The open indicator clears once tokens flow.
      expect(llm.streamOpened).toBe(false);
    });

    it('the final response event replaces the streamed text and token counts', () => {
      mount();
      startRun();
      send('pipeline.llm.token', {
        runId: 'r1', stepId: 'llm', token: 'partial', at: '2026-02-01T10:00:01.250Z',
      } as PipelineEventMap['pipeline.llm.token']);
      send('pipeline.llm.response', {
        runId: 'r1', stepId: 'llm', response: 'final answer', tokensIn: 12, tokensOut: 7, at: '2026-02-01T10:00:02.000Z',
      } as PipelineEventMap['pipeline.llm.response']);

      const llm = runsCtx.runs.r1.steps.llm.llm!;
      expect(llm.response).toBe('final answer');
      expect(llm.tokensIn).toBe(12);
      expect(llm.tokensOut).toBe(7);
    });
  });

  // -------------------------------------------------------------------------
  // Edit-and-continue patches
  // -------------------------------------------------------------------------

  describe('context patches', () => {
    it('appends patches and marks the reverted one', () => {
      mount();
      startRun();
      send('pipeline.step.context.patched', {
        runId: 'r1', stepId: 's1', patchId: 'pa', mode: 'merge', at: '2026-02-01T10:00:03.000Z',
      } as PipelineEventMap['pipeline.step.context.patched']);
      send('pipeline.step.context.patched-unvalidated', {
        runId: 'r1', stepId: 's1', patchId: 'pb', mode: 'merge', at: '2026-02-01T10:00:04.000Z',
      } as PipelineEventMap['pipeline.step.context.patched']);
      send('pipeline.step.context.patch-reverted', {
        runId: 'r1', stepId: 's1', patchId: 'pa', at: '2026-02-01T10:00:05.000Z',
      } as PipelineEventMap['pipeline.step.context.patch-reverted']);

      const patches = runsCtx.runs.r1.steps.s1.patches!;
      expect(patches.map((p) => p.patchId)).toEqual(['pa', 'pb']);
      expect(patches[1].unvalidated).toBe(true);
      expect(patches[0].revertedAt).toBe('2026-02-01T10:00:05.000Z');
      expect(patches[1].revertedAt).toBeUndefined();
    });
  });

  // -------------------------------------------------------------------------
  // Terminal-run persistence
  // -------------------------------------------------------------------------

  describe('history persistence', () => {
    it('writes a terminal run to localStorage exactly once', () => {
      const setItem = vi.spyOn(Storage.prototype, 'setItem');
      mount();
      startRun();
      expect(setItem).not.toHaveBeenCalled();

      send('pipeline.run.completed', {
        runId: 'r1', at: '2026-02-01T10:00:05.000Z', durationMs: 5000,
      } as PipelineEventMap['pipeline.run.completed']);
      expect(setItem).toHaveBeenCalledTimes(1);
      expect(setItem.mock.calls[0][0]).toBe('ws_pipeline_runs_v1:p1');

      // A later unrelated fold must not re-persist the same run.
      act(() => {
        runsCtx.ingestRun(makeRun({ id: 'r2', status: 'running' }));
      });
      expect(setItem).toHaveBeenCalledTimes(1);
    });
  });
});
