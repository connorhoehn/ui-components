// context/__tests__/PipelineRunsContext.retryError.test.tsx
//
// "Retry from here" had no failure surface at all. Both ways it can fail —
// the API refusing, and no eligible failed run being found — wrote a line to
// the console and returned a resolved promise, so the node's retry button
// behaved identically whether a new run had been spawned or nothing at all
// had happened. The user's only signal was the canvas not changing, which is
// also what a slow-but-working retry looks like.
//
// `retryFromStep` is a frozen export typed `Promise<void>`, and every call
// site is a bare `onClick={() => retryFromStep(id)}`. Making it reject would
// turn each of those into an unhandled rejection, so it still resolves; the
// reason leaves through the additive `retryError` field instead.

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, render } from '@testing-library/react';
import type { PipelineRun } from '../../../../types/pipeline';

// --- Seams -----------------------------------------------------------------
vi.mock('../WebSocketEventAdapter', () => ({
  usePipelineWsCommands: () => ({
    cancelRun: vi.fn(),
    resolveApproval: vi.fn(),
  }),
}));
vi.mock('../../hooks/useTriggerRun', () => ({
  useTriggerRun: () => ({ triggerRun: vi.fn(async () => 'run-new') }),
}));
vi.mock('../../../../api/pipelineRuns', () => ({
  listPipelineRuns: vi.fn(async () => ({ runs: [] as PipelineRun[] })),
}));

const mockRetryFromNode = vi.fn<
  (pipelineId: string, runId: string, nodeId: string) => Promise<unknown>
>();
vi.mock('../../../../api/pipelineRetry', () => ({
  retryFromNode: (pipelineId: string, runId: string, nodeId: string) =>
    mockRetryFromNode(pipelineId, runId, nodeId),
}));

import { EventStreamProvider } from '../EventStreamContext';
import {
  PipelineRunsProvider,
  usePipelineRuns,
  type PipelineRunsValue,
} from '../PipelineRunsContext';

// ---------------------------------------------------------------------------
// Harness
// ---------------------------------------------------------------------------

let runsCtx: PipelineRunsValue;

function Probe() {
  runsCtx = usePipelineRuns();
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

/** A run that failed AT `nodeId`, i.e. an eligible retry target. */
function failedRunAt(nodeId: string, over: Partial<PipelineRun> = {}): PipelineRun {
  return {
    id: 'r1',
    pipelineId: 'p1',
    pipelineVersion: 1,
    status: 'failed',
    triggeredBy: { userId: 'u', triggerType: 'manual' },
    ownerNodeId: 'local',
    startedAt: '2026-02-01T10:00:00.000Z',
    currentStepIds: [],
    steps: { [nodeId]: { nodeId, status: 'failed' } },
    context: {},
    ...over,
  } as PipelineRun;
}

beforeEach(() => {
  localStorage.clear();
  mockRetryFromNode.mockReset().mockResolvedValue({ runId: 'r2' });
});
afterEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------

describe('retryFromStep failure surface', () => {
  it('starts a retry and reports no error on the success path', async () => {
    mount();
    act(() => { runsCtx.ingestRun(failedRunAt('n1')); });

    await act(async () => { await runsCtx.retryFromStep('n1'); });

    expect(mockRetryFromNode).toHaveBeenCalledWith('p1', 'r1', 'n1');
    expect(runsCtx.retryError).toBeNull();
  });

  it('surfaces the server reason when the retry request fails', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockRetryFromNode.mockRejectedValue(new Error('retryFromNode failed (409)'));
    mount();
    act(() => { runsCtx.ingestRun(failedRunAt('n1')); });

    // Still RESOLVES — the frozen `Promise<void>` contract is intact, so no
    // existing `onClick={() => retryFromStep(id)}` becomes an unhandled
    // rejection.
    await act(async () => {
      await expect(runsCtx.retryFromStep('n1')).resolves.toBeUndefined();
    });

    expect(runsCtx.retryError).toEqual({
      nodeId: 'n1',
      reason: 'request-failed',
      message: 'retryFromNode failed (409)',
    });
    spy.mockRestore();
  });

  it('distinguishes "nothing to retry" from a refused request', async () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mount();
    // No runs at all — e.g. the history was cleared since the failure.
    await act(async () => { await runsCtx.retryFromStep('n1'); });

    expect(mockRetryFromNode).not.toHaveBeenCalled();
    expect(runsCtx.retryError?.reason).toBe('no-failed-run');
    expect(runsCtx.retryError?.nodeId).toBe('n1');
    spy.mockRestore();
  });

  it('clears a stale error when the next retry is attempted', async () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mount();
    await act(async () => { await runsCtx.retryFromStep('n1'); });
    expect(runsCtx.retryError).not.toBeNull();

    act(() => { runsCtx.ingestRun(failedRunAt('n1')); });
    await act(async () => { await runsCtx.retryFromStep('n1'); });
    expect(runsCtx.retryError).toBeNull();
    spy.mockRestore();
  });

  it('clearRetryError dismisses the message', async () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mount();
    await act(async () => { await runsCtx.retryFromStep('n1'); });
    expect(runsCtx.retryError).not.toBeNull();

    act(() => { runsCtx.clearRetryError(); });
    expect(runsCtx.retryError).toBeNull();
    spy.mockRestore();
  });
});
