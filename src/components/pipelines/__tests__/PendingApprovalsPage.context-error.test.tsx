// Regression (null-conflation): an approval card must not claim there is
// nothing to review when it simply failed to load the run.
//
// `getPipelineRun` used to answer `null` for both a real 404 and any
// transport failure, and this page's `.then(run => { if (!run) return; })`
// dropped both on the floor. The card then fell through to its "Run details"
// branch, which states affirmatively:
//
//   "Awaiting your approval — upstream steps haven't produced reviewable
//    output yet (or this approval node runs in parallel with them)."
//
// On a downed API that sentence is false, and the approver clicks Approve
// believing there was nothing to look at. The failed case and the genuinely
// empty case must render DIFFERENTLY.
//
// Driven against a stubbed global `fetch` rather than a mocked
// `getPipelineRun` — mocking the client would test only this component's own
// handler and would pass against the bug.

import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { PendingApproval } from '../hooks/usePendingApprovals';

const navigate = vi.fn();

vi.mock('react-router', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  useNavigate: () => navigate,
}));

const APPROVAL: PendingApproval = {
  runId: 'run-abc123',
  pipelineId: 'p1',
  stepId: 'step-1',
  approvers: [],
  requestedAt: new Date().toISOString(),
};

vi.mock('../hooks/usePendingApprovals', () => ({
  usePendingApprovalsState: () => ({
    approvals: [APPROVAL],
    isLoading: false,
    error: null,
    retry: vi.fn(),
  }),
}));

vi.mock('../context/PipelineRunsContext', () => ({
  usePipelineRuns: () => ({ runs: {}, resolveApproval: vi.fn() }),
}));

vi.mock('../persistence/pipelineStorage', () => ({
  loadPipeline: () => ({ id: 'p1', name: 'My pipeline', nodes: [], edges: [] }),
}));

import PendingApprovalsPage from '../PendingApprovalsPage';

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

describe('PendingApprovalsPage — run detail failed vs. genuinely empty', () => {
  it('says "no reviewable output yet" when the run really has none (404)', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: false, status: 404, statusText: 'Not Found', json: () => Promise.resolve({}),
    })));

    render(<PendingApprovalsPage />);
    await settle();

    expect(screen.getByText(/haven't produced reviewable output yet/i)).toBeInTheDocument();
    expect(
      screen.queryByTestId('approval-context-error-run-abc123'),
    ).not.toBeInTheDocument();
  });

  it('does NOT claim there is nothing to review when the fetch fails', async () => {
    // Fresh Error per call: `mockRejectedValue` would reuse one instance.
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('Failed to fetch'))));

    render(<PendingApprovalsPage />);
    await settle();

    const banner = screen.getByTestId('approval-context-error-run-abc123');
    expect(banner).toHaveTextContent(/couldn't load this run/i);
    expect(banner).toHaveTextContent(/Failed to fetch/);
    // The load-bearing assertion: the false reassurance is gone.
    expect(
      screen.queryByText(/haven't produced reviewable output yet/i),
    ).not.toBeInTheDocument();
  });

  it('does NOT claim there is nothing to review on a 500', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: false, status: 500, statusText: 'Server Error', json: () => Promise.resolve({}),
    })));

    render(<PendingApprovalsPage />);
    await settle();

    expect(screen.getByTestId('approval-context-error-run-abc123')).toBeInTheDocument();
    expect(
      screen.queryByText(/haven't produced reviewable output yet/i),
    ).not.toBeInTheDocument();
  });

  it('renders the real context and no warning when the fetch succeeds', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve({
        runId: 'run-abc123',
        pipelineId: 'p1',
        status: 'awaiting_approval',
        context: { prompt: 'ship the thing?' },
        steps: {},
      }),
    })));

    render(<PendingApprovalsPage />);
    await settle();

    expect(screen.getByText('ship the thing?')).toBeInTheDocument();
    expect(
      screen.queryByTestId('approval-context-error-run-abc123'),
    ).not.toBeInTheDocument();
  });
});
