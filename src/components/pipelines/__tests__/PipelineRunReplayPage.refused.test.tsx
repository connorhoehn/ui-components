// A REFUSED run is terminal. 2.379.1 taught `ErrorCategory` the word
// (`Refused`: a step looked at the request and said no — constraint not met,
// forbidden, revision conflict, invalid request) but the run page still
// offered "↻ Retry from failure" in the header, "↻ Resume from here" in the
// failure banner, and both per-step buttons in the timeline. Each of those
// re-runs the same step over the same recorded inputs and refuses the same
// way. So for a refused run the page renders NONE of them — absent, not
// disabled — and says why with the refusal verbatim under `Refused (<code>):`.
// An outage (category not Refused, retryability not terminal) keeps every
// button exactly as before.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { PipelineRun } from '../../../types/pipeline';

const navigate = vi.fn();
const triggerRun = vi.fn();
let RUN: PipelineRun;

vi.mock('react-router', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  useNavigate: () => navigate,
  useParams: () => ({ pipelineId: 'p1', runId: 'r1' }),
}));

vi.mock('../context/PipelineEditorContext', () => ({
  PipelineEditorProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  usePipelineEditor: () => ({ definition: { id: 'p1', name: 'P', nodes: [], edges: [] } }),
}));

vi.mock('../context/PipelineRunsContext', () => ({
  PipelineRunsProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  usePipelineRuns: () => ({ runs: { r1: RUN }, triggerRun }),
}));

vi.mock('../context/WebSocketEventAdapter', () => ({
  usePipelineRunChannelSubscription: () => undefined,
}));

import PipelineRunReplayPage from '../PipelineRunReplayPage';

function failedRun(error: PipelineRun['error']): PipelineRun {
  return {
    id: 'r1', pipelineId: 'p1', status: 'failed',
    startedAt: new Date().toISOString(), completedAt: new Date().toISOString(),
    triggeredBy: { triggerType: 'manual', payload: {} },
    currentStepIds: [],
    steps: {
      'deck-revise': {
        nodeId: 'deck-revise', status: 'failed',
        startedAt: new Date().toISOString(), completedAt: new Date().toISOString(),
        error: error?.message,
      },
    },
    error,
  } as unknown as PipelineRun;
}

const REFUSAL = 'deck-revise constraint-not-met: Title has 2 words; it must have exactly 0.';

beforeEach(() => {
  navigate.mockReset();
  triggerRun.mockReset();
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
  // The page lazily fetches the run detail; keep it off the network.
  vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
    ok: false, status: 404, json: () => Promise.resolve({}),
  })));
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('PipelineRunReplayPage — a refused run is terminal', () => {
  it('category Refused: no Retry, no Resume anywhere; the refusal is shown verbatim', async () => {
    RUN = failedRun({ nodeId: 'deck-revise', message: REFUSAL, errorCategory: 'Refused', retryability: 'terminal' });
    render(<PipelineRunReplayPage />);

    const banner = await screen.findByTestId('refused-banner');
    expect(banner).toHaveTextContent('Refused (constraint-not-met):');
    expect(banner).toHaveTextContent(REFUSAL);
    expect(screen.getByTestId('refused-reason')).toHaveTextContent(/retrying or resuming would refuse the same way/);
    expect(screen.getByTestId('refused-not-retryable')).toHaveTextContent('Not retryable');

    // Header and banner affordances: absent, not disabled.
    expect(screen.queryByTestId('retry-from-failed-step-button')).toBeNull();
    expect(screen.queryByTestId('resume-from-here-button')).toBeNull();
    expect(screen.queryByText(/Retry from failure/)).toBeNull();
    expect(screen.queryByText(/Resume from here/)).toBeNull();

    // The step row, once opened, offers neither either.
    fireEvent.click(screen.getByText('1. deck-revise'));
    expect(screen.queryByTestId('retry-from-step-deck-revise')).toBeNull();
    expect(screen.queryByTestId('resume-from-step-deck-revise')).toBeNull();
    expect(screen.queryByText(/Retry from here/)).toBeNull();
    // Re-run (a NEW run from the original trigger) is still the way forward.
    expect(screen.getByTestId('rerun-button')).toBeInTheDocument();
  });

  it('a refusal code in the message alone (row written before the category existed) gates the same way', async () => {
    RUN = failedRun({ nodeId: 'deck-revise', message: 'deck-revise forbidden: requester may not revise this deck.' });
    render(<PipelineRunReplayPage />);

    expect(await screen.findByTestId('refused-banner')).toHaveTextContent('Refused (forbidden):');
    expect(screen.queryByTestId('retry-from-failed-step-button')).toBeNull();
    expect(screen.queryByTestId('resume-from-here-button')).toBeNull();
  });

  it('retryability terminal without a known code reads as Refused (refused)', async () => {
    RUN = failedRun({ nodeId: 'deck-revise', message: 'the step said no', retryability: 'terminal' });
    render(<PipelineRunReplayPage />);

    expect(await screen.findByTestId('refused-banner')).toHaveTextContent('Refused (refused):');
    expect(screen.queryByTestId('retry-from-failed-step-button')).toBeNull();
    expect(screen.queryByTestId('resume-from-here-button')).toBeNull();
  });

  it('an outage keeps Retry from failure, Resume from here and the per-step buttons', async () => {
    RUN = failedRun({ nodeId: 'deck-revise', message: 'model unavailable (503)', errorCategory: 'LLMError', retryability: 'retryable' });
    render(<PipelineRunReplayPage />);

    expect(await screen.findByTestId('retry-from-failed-step-button')).toHaveTextContent('Retry from failure');
    expect(screen.getByTestId('resume-from-here-button')).toHaveTextContent('Resume from here');
    expect(screen.getByTestId('run-failed-banner')).toHaveTextContent('Run failed:');
    expect(screen.queryByTestId('refused-banner')).toBeNull();
    expect(screen.queryByTestId('refused-not-retryable')).toBeNull();

    fireEvent.click(screen.getByText('1. deck-revise'));
    expect(screen.getByTestId('retry-from-step-deck-revise')).toBeInTheDocument();
    expect(screen.getByTestId('resume-from-step-deck-revise')).toBeInTheDocument();
  });

  it('"403 Forbidden" mid-sentence is an outage, not a refusal', async () => {
    RUN = failedRun({ nodeId: 'deck-revise', message: 'upstream answered 403 Forbidden while fetching the deck', errorCategory: 'NetworkError' });
    render(<PipelineRunReplayPage />);

    expect(await screen.findByTestId('retry-from-failed-step-button')).toBeInTheDocument();
    expect(screen.queryByTestId('refused-banner')).toBeNull();
  });
});
