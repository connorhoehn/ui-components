// context/__tests__/PipelineNodeRuntimeContext.test.tsx
//
// Behavior tests for the host-injection seam (PipelineNodeRuntimeProvider):
// the seam overrides the bundled PipelineRunsProvider when both are mounted,
// works standalone (no bundled provider at all), re-reads when the host hands
// over a new getLatestStepForNode identity, prefers host retryFromStep with a
// bundled/no-op fallback, and — regression guard — leaves today's behavior
// untouched when the seam is absent. The bundled provider's network/WS seams
// are mocked at module boundaries like PipelineEditorContext.test.tsx does.

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render } from '@testing-library/react';
import type { StepExecution } from '../../../../types/pipeline';

// ---------------------------------------------------------------------------
// Module-seam mocks (everything PipelineRunsProvider touches at the edges)
// ---------------------------------------------------------------------------

type WildcardHandler = (env: { eventType: string; payload: unknown }) => void;
let wildcardHandler: WildcardHandler | null = null;

vi.mock('../EventStreamContext', () => ({
  useEventStream: (_channel: string, handler: WildcardHandler) => {
    wildcardHandler = handler;
  },
}));

vi.mock('../WebSocketEventAdapter', () => ({
  usePipelineWsCommands: () => ({
    cancelRun: vi.fn(),
    resolveApproval: vi.fn(),
  }),
}));

vi.mock('../../hooks/useTriggerRun', () => ({
  useTriggerRun: () => ({ triggerRun: vi.fn(async () => 'run-x') }),
}));

vi.mock('../../../../api/pipelineRuns', () => ({
  listPipelineRuns: vi.fn(async () => ({ runs: [] })),
}));

vi.mock('../../persistence/runHistory', () => ({
  appendRun: vi.fn(),
  listRuns: vi.fn(() => []),
}));

const mockRetryFromNode = vi.fn(async () => {});
vi.mock('../../../../api/pipelineRetry', () => ({
  retryFromNode: (...args: unknown[]) => mockRetryFromNode(...(args as [])),
}));

import {
  PipelineRunsProvider,
  useLatestStepForNode,
  useRetryFromStep,
} from '../PipelineRunsContext';
import {
  PipelineNodeRuntimeProvider,
  type PipelineNodeRuntimeValue,
} from '../PipelineNodeRuntimeContext';

// ---------------------------------------------------------------------------
// Fixtures + harness
// ---------------------------------------------------------------------------

function makeStep(over: Partial<StepExecution> = {}): StepExecution {
  return { nodeId: 'n1', status: 'completed', ...over };
}

interface Captured {
  step: StepExecution | null;
  retry: (nodeId: string) => Promise<void>;
}
let captured: Captured;

function Capture({ nodeId = 'n1' }: { nodeId?: string }) {
  const step = useLatestStepForNode(nodeId);
  const retry = useRetryFromStep();
  captured = { step, retry };
  return null;
}

/** Feed an event through the bundled provider's wildcard subscription. */
function feed(eventType: string, payload: Record<string, unknown>) {
  act(() => {
    wildcardHandler?.({ eventType, payload });
  });
}

function feedRunWithStep(opts: {
  runId: string;
  startedAt: string;
  stepId?: string;
  failed?: boolean;
}) {
  const stepId = opts.stepId ?? 'n1';
  feed('pipeline.run.started', {
    runId: opts.runId,
    pipelineId: 'pipe-1',
    triggeredBy: 'tester',
    at: opts.startedAt,
  });
  feed('pipeline.step.started', {
    runId: opts.runId,
    stepId,
    at: opts.startedAt,
  });
  if (opts.failed) {
    feed('pipeline.step.failed', {
      runId: opts.runId,
      stepId,
      at: opts.startedAt,
      error: 'boom',
    });
    feed('pipeline.run.failed', {
      runId: opts.runId,
      at: opts.startedAt,
      error: 'boom',
    });
  }
}

beforeEach(() => {
  wildcardHandler = null;
  mockRetryFromNode.mockClear();
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('PipelineNodeRuntimeProvider — host seam', () => {
  it('overrides the bundled provider when both are mounted', () => {
    const hostStep = makeStep({ status: 'completed', output: 'from-host' });
    const host: PipelineNodeRuntimeValue = {
      getLatestStepForNode: (nodeId) => (nodeId === 'n1' ? hostStep : null),
    };
    render(
      <PipelineNodeRuntimeProvider value={host}>
        <PipelineRunsProvider>
          <Capture />
        </PipelineRunsProvider>
      </PipelineNodeRuntimeProvider>,
    );
    // Bundled store also has live state for n1 — it must be ignored.
    feedRunWithStep({ runId: 'run-1', startedAt: '2026-06-10T00:00:00Z' });
    expect(captured.step).toBe(hostStep);
    expect(captured.step?.output).toBe('from-host');
  });

  it('works with NO bundled provider — a node-ish consumer sees the host step', () => {
    const hostStep = makeStep({ status: 'running' });
    const host: PipelineNodeRuntimeValue = {
      getLatestStepForNode: () => hostStep,
    };
    render(
      <PipelineNodeRuntimeProvider value={host}>
        <Capture />
      </PipelineNodeRuntimeProvider>,
    );
    expect(captured.step).toBe(hostStep);
  });

  it('returns null when the host store has nothing for the node', () => {
    const host: PipelineNodeRuntimeValue = {
      getLatestStepForNode: () => null,
    };
    render(
      <PipelineNodeRuntimeProvider value={host}>
        <Capture />
      </PipelineNodeRuntimeProvider>,
    );
    expect(captured.step).toBeNull();
  });

  it('re-reads when getLatestStepForNode identity changes (host store updated)', () => {
    const stepA = makeStep({ output: 'A' });
    const stepB = makeStep({ output: 'B', status: 'running' });
    function Harness({ value }: { value: PipelineNodeRuntimeValue }) {
      return (
        <PipelineNodeRuntimeProvider value={value}>
          <Capture />
        </PipelineNodeRuntimeProvider>
      );
    }
    const { rerender } = render(
      <Harness value={{ getLatestStepForNode: () => stepA }} />,
    );
    expect(captured.step).toBe(stepA);
    // Host re-creates the lookup (new identity) after its store changed.
    rerender(<Harness value={{ getLatestStepForNode: () => stepB }} />);
    expect(captured.step).toBe(stepB);
  });

  it('prefers host retryFromStep and normalizes sync returns to a Promise', async () => {
    const hostRetry = vi.fn((_nodeId: string): void => undefined); // sync
    const host: PipelineNodeRuntimeValue = {
      getLatestStepForNode: () => null,
      retryFromStep: hostRetry,
    };
    render(
      <PipelineNodeRuntimeProvider value={host}>
        <PipelineRunsProvider>
          <Capture />
        </PipelineRunsProvider>
      </PipelineNodeRuntimeProvider>,
    );
    // Bundled store has a failed run for n1 — host handler must still win.
    feedRunWithStep({
      runId: 'run-f',
      startedAt: '2026-06-10T00:00:00Z',
      failed: true,
    });
    const result = captured.retry('n1');
    expect(result).toBeInstanceOf(Promise);
    await result;
    expect(hostRetry).toHaveBeenCalledWith('n1');
    expect(mockRetryFromNode).not.toHaveBeenCalled();
  });

  it('falls through to the bundled retry when the seam omits retryFromStep', async () => {
    const host: PipelineNodeRuntimeValue = {
      getLatestStepForNode: () => null,
    };
    render(
      <PipelineNodeRuntimeProvider value={host}>
        <PipelineRunsProvider>
          <Capture />
        </PipelineRunsProvider>
      </PipelineNodeRuntimeProvider>,
    );
    feedRunWithStep({
      runId: 'run-f',
      startedAt: '2026-06-10T00:00:00Z',
      failed: true,
    });
    await act(async () => {
      await captured.retry('n1');
    });
    expect(mockRetryFromNode).toHaveBeenCalledWith('pipe-1', 'run-f', 'n1');
  });

  it('is a resolving no-op when the seam omits retryFromStep and no bundled provider exists', async () => {
    const host: PipelineNodeRuntimeValue = {
      getLatestStepForNode: () => null,
    };
    render(
      <PipelineNodeRuntimeProvider value={host}>
        <Capture />
      </PipelineNodeRuntimeProvider>,
    );
    await expect(captured.retry('n1')).resolves.toBeUndefined();
    expect(mockRetryFromNode).not.toHaveBeenCalled();
  });
});

describe('absent seam — regression guard (today\'s behavior)', () => {
  it('useLatestStepForNode folds over the bundled runs store, newest startedAt wins', () => {
    render(
      <PipelineRunsProvider>
        <Capture />
      </PipelineRunsProvider>,
    );
    feedRunWithStep({ runId: 'run-old', startedAt: '2026-06-09T00:00:00Z' });
    feedRunWithStep({ runId: 'run-new', startedAt: '2026-06-10T12:00:00Z' });
    expect(captured.step).not.toBeNull();
    expect(captured.step?.nodeId).toBe('n1');
    expect(captured.step?.startedAt).toBe('2026-06-10T12:00:00Z');
  });

  it('useLatestStepForNode is null with neither provider mounted', () => {
    render(<Capture />);
    expect(captured.step).toBeNull();
  });

  it('useRetryFromStep is a resolving no-op with neither provider mounted', async () => {
    render(<Capture />);
    await expect(captured.retry('n1')).resolves.toBeUndefined();
    expect(mockRetryFromNode).not.toHaveBeenCalled();
  });

  it('useRetryFromStep uses the bundled handler when only PipelineRunsProvider is mounted', async () => {
    render(
      <PipelineRunsProvider>
        <Capture />
      </PipelineRunsProvider>,
    );
    feedRunWithStep({
      runId: 'run-f',
      startedAt: '2026-06-10T00:00:00Z',
      failed: true,
    });
    await act(async () => {
      await captured.retry('n1');
    });
    expect(mockRetryFromNode).toHaveBeenCalledWith('pipe-1', 'run-f', 'n1');
  });
});
