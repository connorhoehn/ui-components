// Regression (null-conflation): "your run was trimmed from history" vs.
// "we couldn't reach the server".
//
// `getPipelineRun` used to answer `null` for a genuine 404 AND for any
// transport/5xx failure, and this page had no `.catch` at all. So a dead API
// rendered a confident claim about the user's data — "Run not available — it
// may have been trimmed from history." — with no retry and no hint that the
// run might be perfectly intact. The two outcomes must render DIFFERENTLY.
//
// Driven against a stubbed global `fetch`, deliberately NOT a mocked
// `getPipelineRun`: mocking the client would only exercise this component's
// own catch and would pass against the bug.

import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const navigate = vi.fn();

vi.mock('react-router', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  useNavigate: () => navigate,
  useParams: () => ({ pipelineId: 'p1', runId: 'r1' }),
}));

vi.mock('../context/PipelineEditorContext', () => ({
  PipelineEditorProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  usePipelineEditor: () => ({ definition: { id: 'p1', name: 'P', nodes: [], edges: [] } }),
}));

// No live run in context — the API fetch is the only source, which is the
// situation the fallback branch exists for.
vi.mock('../context/PipelineRunsContext', () => ({
  PipelineRunsProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  usePipelineRuns: () => ({ runs: {}, triggerRun: vi.fn() }),
}));

vi.mock('../context/WebSocketEventAdapter', () => ({
  usePipelineRunChannelSubscription: () => undefined,
}));

import PipelineRunReplayPage from '../PipelineRunReplayPage';

/** Let the dynamic import + the two chained promises settle. */
async function settle() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
  });
}

beforeEach(() => {
  navigate.mockReset();
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('PipelineRunReplayPage — 404 vs. failed request', () => {
  it('says the run may have been trimmed when the server answers 404', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: false, status: 404, statusText: 'Not Found', json: () => Promise.resolve({}),
    })));

    render(<PipelineRunReplayPage />);
    await settle();

    expect(screen.getByTestId('pipeline-replay-missing')).toBeInTheDocument();
    expect(screen.getByText(/trimmed from history/i)).toBeInTheDocument();
    expect(screen.queryByTestId('replay-retry')).not.toBeInTheDocument();
  });

  it('does NOT claim the run was trimmed when the request fails at the transport', async () => {
    // A fresh Error per call — `mockRejectedValue` reuses one instance.
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('Failed to fetch'))));

    render(<PipelineRunReplayPage />);
    await settle();

    expect(screen.getByTestId('pipeline-replay-error')).toBeInTheDocument();
    expect(screen.getByTestId('replay-load-error')).toHaveTextContent(/unreachable/i);
    // The load-bearing assertion: the user is NOT told their run is gone.
    expect(screen.queryByText(/trimmed from history/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('pipeline-replay-missing')).not.toBeInTheDocument();
    // ...and there is a way out other than "go back".
    expect(screen.getByTestId('replay-retry')).toBeInTheDocument();
  });

  it('does NOT claim the run was trimmed when the server answers 500', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: false, status: 500, statusText: 'Server Error', json: () => Promise.resolve({}),
    })));

    render(<PipelineRunReplayPage />);
    await settle();

    expect(screen.getByTestId('pipeline-replay-error')).toBeInTheDocument();
    expect(screen.getByTestId('replay-load-error-detail')).toHaveTextContent(/500/);
    expect(screen.queryByText(/trimmed from history/i)).not.toBeInTheDocument();
  });

  it('Retry re-issues the fetch and recovers when the server comes back', async () => {
    const run = {
      runId: 'r1', pipelineId: 'p1', status: 'completed',
      startedAt: new Date().toISOString(), completedAt: new Date().toISOString(),
      triggeredBy: { triggerType: 'manual' }, steps: {}, currentStepIds: [],
    };
    // Keyed on SERVER STATE, not on call index. `attempt === 1` fails would
    // mean "the first fetch fails" — and under StrictMode a mount issues two,
    // so the second pass would silently get the success and no error would
    // ever render. Mount count is not something this test should care about.
    let serverDown = true;
    let calls = 0;
    vi.stubGlobal('fetch', vi.fn(() => {
      calls += 1;
      // A fresh Error per call: one shared instance can mask ordering bugs.
      if (serverDown) return Promise.reject(new Error('Failed to fetch'));
      return Promise.resolve({
        ok: true, status: 200, statusText: 'OK', json: () => Promise.resolve(run),
      });
    }));

    render(<PipelineRunReplayPage />);
    await settle();
    expect(screen.getByTestId('pipeline-replay-error')).toBeInTheDocument();

    // The server comes back, THEN the user retries.
    serverDown = false;
    const before = calls;
    await act(async () => {
      screen.getByTestId('replay-retry').click();
    });
    await settle();

    expect(screen.getByTestId('pipeline-replay')).toBeInTheDocument();
    // A delta, not an absolute: Retry must actually re-issue the request.
    expect(calls).toBeGreaterThan(before);
  });
});
