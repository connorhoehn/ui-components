// Regression: a Re-run that FAILS must say so.
//
// `handleReRun` caught the rejection from `triggerRun` and did nothing but
// `console.error`. On failure there was no navigation and no banner, so the
// button was indistinguishable from an inert one — the user clicked "↻ Re-run",
// watched nothing happen, and clicked again. The page already renders sibling
// "Retry failed:" / "Resume failed:" banners; this one was simply missing.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { PipelineRun } from '../../../types/pipeline';

const navigate = vi.fn();
const triggerRun = vi.fn();

vi.mock('react-router', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  useNavigate: () => navigate,
  useParams: () => ({ pipelineId: 'p1', runId: 'r1' }),
}));

const RUN = {
  id: 'r1', pipelineId: 'p1', status: 'completed',
  startedAt: new Date().toISOString(), completedAt: new Date().toISOString(),
  triggeredBy: { triggerType: 'manual', payload: { a: 1 } },
  steps: {}, currentStepIds: [],
} as unknown as PipelineRun;

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

describe('PipelineRunReplayPage — Re-run failure', () => {
  it('shows a Re-run failed banner and does not navigate', async () => {
    // A fresh Error per invocation: `mockRejectedValue(new Error(...))` hands
    // back one shared instance for every call, which can hide a second click
    // reusing the first failure.
    triggerRun.mockImplementation(() => Promise.reject(new Error('trigger endpoint 503')));

    render(<PipelineRunReplayPage />);
    fireEvent.click(await screen.findByTestId('rerun-button'));

    expect(await screen.findByTestId('rerun-error-banner')).toHaveTextContent(/503/);
    expect(navigate).not.toHaveBeenCalled();
  });

  it('navigates to the new run and shows no banner when the re-run succeeds', async () => {
    triggerRun.mockImplementation(() => Promise.resolve('r2'));

    render(<PipelineRunReplayPage />);
    fireEvent.click(await screen.findByTestId('rerun-button'));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/pipelines/p1/runs/r2');
    });
    expect(screen.queryByTestId('rerun-error-banner')).toBeNull();
  });
});
