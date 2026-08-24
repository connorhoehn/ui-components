// hooks/__tests__/usePendingApprovals.test.tsx
//
// The pending-approvals list has two writers racing each other: a one-shot
// `GET /api/pipelines/approvals` snapshot, and the live event stream. These
// tests drive the interleaving explicitly (the fetch is a deferred promise the
// test resolves by hand) because that is where the list loses data — the
// happy-path ordering is uninteresting and always worked.

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import type { PipelineEventMap } from '../../../../types/pipeline';

// PipelineRunsProvider drags in the WebSocket context, the trigger hook and the
// node-runtime seam; none of that is under test here. Stub the seed source.
vi.mock('../../context/PipelineRunsContext', () => ({
  usePipelineRuns: () => ({ runs: {} }),
}));

import {
  EventStreamProvider,
  useEventStreamContext,
  type EventStreamValue,
} from '../../context/EventStreamContext';
import { usePendingApprovalsState } from '../usePendingApprovals';
import type { PendingApprovalsState } from '../usePendingApprovals';

// ---------------------------------------------------------------------------
// Harness
// ---------------------------------------------------------------------------

let latest: PendingApprovalsState;
let stream: EventStreamValue;

function Probe() {
  latest = usePendingApprovalsState();
  stream = useEventStreamContext();
  return null;
}

function renderHook() {
  return render(
    <EventStreamProvider>
      <Probe />
    </EventStreamProvider>,
  );
}

/** A fetch stub whose response the test resolves at a chosen moment. */
function deferredFetch(body: unknown) {
  let release!: () => void;
  const gate = new Promise<void>((r) => {
    release = r;
  });
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => {
      await gate;
      return {
        ok: true,
        status: 200,
        json: async () => body,
      } as unknown as Response;
    }),
  );
  return async () => {
    release();
    // Let the fetch promise chain settle inside act().
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
  };
}

function requested(
  over: Partial<PipelineEventMap['pipeline.approval.requested']> = {},
): PipelineEventMap['pipeline.approval.requested'] {
  return {
    runId: 'run-live',
    stepId: 'step-1',
    approvers: [{ type: 'user', value: 'alice' }],
    at: '2026-02-01T10:00:00.000Z',
    ...over,
  } as PipelineEventMap['pipeline.approval.requested'];
}

const SERVER_ROW = {
  runId: 'run-server',
  pipelineId: 'pipe-1',
  stepId: 'step-server',
  approvers: [{ type: 'user' as const, value: 'bob' }],
  requestedAt: '2026-02-01T09:00:00.000Z',
  requiredCount: 1,
  recordedCount: 0,
};

describe('usePendingApprovalsState', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('keeps an approval requested while the initial fetch was still in flight', async () => {
    const settle = deferredFetch({ approvals: [SERVER_ROW] });
    renderHook();

    // The stream delivers a brand-new approval before the snapshot lands. The
    // server snapshot predates it and therefore does not contain it.
    act(() => {
      stream.dispatch('pipeline.approval.requested', requested());
    });
    expect(latest.approvals.map((a) => a.runId)).toContain('run-live');

    await settle();

    // Regression: the snapshot used to overwrite the map wholesale, so the
    // live row vanished and the run sat blocked on an invisible approval.
    await waitFor(() => expect(latest.isLoading).toBe(false));
    expect(latest.approvals.map((a) => a.runId).sort()).toEqual([
      'run-live',
      'run-server',
    ]);
  });

  it('does not resurrect an approval the stream resolved during the fetch', async () => {
    const settle = deferredFetch({ approvals: [SERVER_ROW] });
    renderHook();

    // The server row is approved before its own snapshot arrives.
    act(() => {
      stream.dispatch('pipeline.approval.requested', requested({
        runId: SERVER_ROW.runId,
        stepId: SERVER_ROW.stepId,
      }));
      stream.dispatch('pipeline.approval.recorded', {
        runId: SERVER_ROW.runId,
        stepId: SERVER_ROW.stepId,
        userId: 'bob',
        decision: 'approve',
        at: '2026-02-01T09:30:00.000Z',
      } as PipelineEventMap['pipeline.approval.recorded']);
    });
    expect(latest.approvals).toHaveLength(0);

    await settle();

    await waitFor(() => expect(latest.isLoading).toBe(false));
    expect(latest.approvals).toHaveLength(0);
  });

  it('applies the server snapshot when nothing raced it', async () => {
    const settle = deferredFetch({ approvals: [SERVER_ROW] });
    renderHook();
    await settle();

    await waitFor(() => expect(latest.isLoading).toBe(false));
    expect(latest.approvals).toHaveLength(1);
    expect(latest.approvals[0].stepId).toBe('step-server');
  });

  // -------------------------------------------------------------------------
  // n-of-m threshold + reject short-circuit
  // -------------------------------------------------------------------------

  it('holds an n-of-m approval until the threshold is met', async () => {
    // requiredCount comes from the persisted definition, not the event.
    localStorage.setItem(
      'ws_pipelines_v1:pipe-n',
      JSON.stringify({
        id: 'pipe-n',
        name: 'N of M',
        version: 1,
        status: 'draft',
        nodes: [
          {
            id: 'step-n',
            type: 'approval',
            position: { x: 0, y: 0 },
            data: {
              type: 'approval',
              approvers: [],
              requiredCount: 2,
              message: 'Two sign-offs required',
            },
          },
        ],
        edges: [],
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
        createdBy: 't',
      }),
    );
    const settle = deferredFetch({ approvals: [] });
    renderHook();
    await settle();

    act(() => {
      stream.dispatch('pipeline.run.started', {
        runId: 'run-n',
        pipelineId: 'pipe-n',
        triggeredBy: { userId: 'u', triggerType: 'manual' },
        at: '2026-02-01T10:00:00.000Z',
      } as PipelineEventMap['pipeline.run.started']);
      stream.dispatch('pipeline.approval.requested', requested({
        runId: 'run-n',
        stepId: 'step-n',
      }));
    });

    expect(latest.approvals).toHaveLength(1);
    expect(latest.approvals[0].requiredCount).toBe(2);
    expect(latest.approvals[0].message).toBe('Two sign-offs required');

    act(() => {
      stream.dispatch('pipeline.approval.recorded', {
        runId: 'run-n',
        stepId: 'step-n',
        userId: 'alice',
        decision: 'approve',
        at: '2026-02-01T10:01:00.000Z',
      } as PipelineEventMap['pipeline.approval.recorded']);
    });
    expect(latest.approvals).toHaveLength(1);
    expect(latest.approvals[0].recordedCount).toBe(1);

    act(() => {
      stream.dispatch('pipeline.approval.recorded', {
        runId: 'run-n',
        stepId: 'step-n',
        userId: 'bob',
        decision: 'approve',
        at: '2026-02-01T10:02:00.000Z',
      } as PipelineEventMap['pipeline.approval.recorded']);
    });
    expect(latest.approvals).toHaveLength(0);
  });

  it('drops an n-of-m approval on the first reject', async () => {
    const settle = deferredFetch({ approvals: [] });
    renderHook();
    await settle();

    act(() => {
      stream.dispatch('pipeline.approval.requested', requested({ runId: 'run-r' }));
      stream.dispatch('pipeline.approval.recorded', {
        runId: 'run-r',
        stepId: 'step-1',
        userId: 'alice',
        decision: 'reject',
        at: '2026-02-01T10:01:00.000Z',
      } as PipelineEventMap['pipeline.approval.recorded']);
    });

    expect(latest.approvals).toHaveLength(0);
  });

  it('ignores a recorded event for an approval it never saw requested', async () => {
    const settle = deferredFetch({ approvals: [] });
    renderHook();
    await settle();

    act(() => {
      stream.dispatch('pipeline.approval.recorded', {
        runId: 'ghost',
        stepId: 'step-1',
        userId: 'alice',
        decision: 'approve',
        at: '2026-02-01T10:01:00.000Z',
      } as PipelineEventMap['pipeline.approval.recorded']);
    });

    expect(latest.approvals).toHaveLength(0);
  });

  it('resolves pipelineId from a same-tick run.started event', async () => {
    const settle = deferredFetch({ approvals: [] });
    renderHook();
    await settle();

    act(() => {
      stream.dispatch('pipeline.run.started', {
        runId: 'run-tick',
        pipelineId: 'pipe-tick',
        triggeredBy: { userId: 'u', triggerType: 'manual' },
        at: '2026-02-01T10:00:00.000Z',
      } as PipelineEventMap['pipeline.run.started']);
      stream.dispatch('pipeline.approval.requested', requested({ runId: 'run-tick' }));
    });

    expect(latest.approvals[0].pipelineId).toBe('pipe-tick');
  });

  it('sorts newest-requested first', async () => {
    const settle = deferredFetch({ approvals: [] });
    renderHook();
    await settle();

    act(() => {
      stream.dispatch('pipeline.approval.requested', requested({
        runId: 'old',
        at: '2026-02-01T08:00:00.000Z',
      }));
      stream.dispatch('pipeline.approval.requested', requested({
        runId: 'new',
        at: '2026-02-01T12:00:00.000Z',
      }));
    });

    expect(latest.approvals.map((a) => a.runId)).toEqual(['new', 'old']);
  });

  it('surfaces a non-404 dashboard failure as an error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: false, status: 500, json: async () => ({}) }) as unknown as Response),
    );
    vi.spyOn(console, 'error').mockImplementation(() => {});
    renderHook();

    await waitFor(() => expect(latest.error).toMatch(/500/));
    expect(latest.isLoading).toBe(false);
  });
});
