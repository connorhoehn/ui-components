// The condensed run beside a chat: its states, its refresh, and the two ways
// out of it. The pieces it reuses from AgentRunCard (step dots, op sentences)
// are pinned there; here it is the panel's own contract.

import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ChatSidePanel, ChatSidePanelProvider } from '../ChatSidePanelRegistry';
import {
  RunSummaryPanel,
  createRunPanelRenderer,
  isRunPanelLive,
  parseRunPanelId,
  runPanelId,
  type RunPanelData,
} from '../RunSummaryPanel';

afterEach(() => { cleanup(); vi.useRealTimers(); });

const completed: RunPanelData = {
  pipelineId: 'document-agent-edit',
  runId: 'r-1',
  pipelineName: 'Document agent edit',
  command: '/doc',
  instruction: 'tighten the scope',
  status: 'completed',
  startedAt: '2026-09-10T21:44:00.000Z',
  completedAt: '2026-09-10T21:45:20.000Z',
  steps: [
    { id: 'read', label: 'Read the document', status: 'completed' },
    { id: 'plan', label: 'Plan the edit', status: 'completed' },
    { id: 'approve', label: 'Approval', status: 'skipped' },
    { id: 'apply', label: 'Apply as Haiku', status: 'completed' },
  ],
  ops: [
    { op: 'setTitle', text: 'Q3 audit plan' },
    { op: 'replaceBlock', index: 1 },
  ],
  document: { id: 'd-1', title: 'Q3 audit plan', snippet: 'The audit covers three offices.' },
  channel: 'room:design',
  messageId: 'm-9',
};

describe('run panel ids', () => {
  it('are <pipelineId>:<runId>, split at the first colon', () => {
    expect(runPanelId('call-transcription', 'run:with:colons')).toBe('call-transcription:run:with:colons');
    expect(parseRunPanelId('call-transcription:run:with:colons')).toEqual({ pipelineId: 'call-transcription', runId: 'run:with:colons' });
    expect(parseRunPanelId('nocolon')).toBeNull();
    expect(parseRunPanelId(':r')).toBeNull();
    expect(parseRunPanelId('p:')).toBeNull();
  });

  it('know which statuses are still moving', () => {
    expect(isRunPanelLive('received')).toBe(true);
    expect(isRunPanelLive('running')).toBe(true);
    expect(isRunPanelLive('awaiting_approval')).toBe(true);
    expect(isRunPanelLive('completed')).toBe(false);
    expect(isRunPanelLive('failed')).toBe(false);
    expect(isRunPanelLive('rejected')).toBe(false);
  });
});

describe('RunSummaryPanel', () => {
  it('names the pipeline, its status and timings, the command, the steps, what changed and the document', () => {
    const onOpenDocument = vi.fn();
    render(<RunSummaryPanel data={completed} onOpenFull={() => {}} onOpenDocument={onOpenDocument} />);
    expect(screen.getByTestId('run-summary-panel-name')).toHaveTextContent('Document agent edit');
    expect(screen.getByTestId('run-summary-panel-status')).toHaveTextContent('Completed');
    expect(screen.getByTestId('run-summary-panel-timings')).toHaveTextContent(/started .* · 80s/);
    expect(screen.getByTestId('run-summary-panel-instruction')).toHaveTextContent('/doc tighten the scope');
    const steps = screen.getByTestId('run-summary-panel-steps').querySelectorAll('li');
    expect(steps).toHaveLength(4);
    expect(steps[2].dataset.status).toBe('skipped');
    expect(steps[2]).toHaveTextContent('Approval');
    const ops = screen.getByTestId('run-summary-panel-ops').querySelectorAll('li');
    expect(ops[0]).toHaveTextContent('Renamed to “Q3 audit plan”');
    expect(ops[1]).toHaveTextContent('Rewrote block 2');
    expect(screen.getByTestId('run-summary-panel-document')).toHaveTextContent('Q3 audit plan');
    fireEvent.click(screen.getByTestId('run-summary-panel-open-document'));
    expect(onOpenDocument).toHaveBeenCalledWith('d-1');
    expect(screen.queryByTestId('run-summary-panel-error')).toBeNull();
  });

  it('pulses while running, and says why when it failed', () => {
    const { rerender } = render(<RunSummaryPanel data={{ ...completed, status: 'running', completedAt: undefined, steps: [{ id: 'apply', label: 'Apply as Haiku', status: 'running' }] }} onOpenFull={() => {}} />);
    const status = screen.getByTestId('run-summary-panel-status');
    expect(status).toHaveTextContent('Running');
    expect(status.querySelector('.animate-ping, [class*="ping"]')).not.toBeNull();
    expect(screen.getByTestId('run-summary-panel')).toHaveAttribute('data-status', 'running');
    expect(screen.queryByTestId('run-summary-panel-error')).toBeNull();

    rerender(<RunSummaryPanel data={{ ...completed, status: 'failed', error: 'The model timed out' }} onOpenFull={() => {}} />);
    expect(screen.getByTestId('run-summary-panel-status')).toHaveTextContent('Failed');
    expect(screen.getByTestId('run-summary-panel-error')).toHaveTextContent('The model timed out');

    rerender(<RunSummaryPanel data={{ ...completed, status: 'awaiting_approval' }} onOpenFull={() => {}} />);
    expect(screen.getByTestId('run-summary-panel-status')).toHaveTextContent('Needs approval');
    rerender(<RunSummaryPanel data={{ ...completed, status: 'rejected' }} onOpenFull={() => {}} />);
    expect(screen.getByTestId('run-summary-panel-status')).toHaveTextContent('Rejected');
  });

  it('offers the result once, and a document result as the document row rather than twice', () => {
    const onOpenResult = vi.fn();
    const { rerender } = render(
      <RunSummaryPanel data={{ ...completed, result: { kind: 'panel', panel: { kind: 'graph', id: 'g-1', title: 'Experts' } } }} onOpenFull={() => {}} onOpenResult={onOpenResult} />,
    );
    fireEvent.click(screen.getByTestId('run-summary-panel-open-result'));
    expect(onOpenResult).toHaveBeenCalledWith({ kind: 'panel', panel: { kind: 'graph', id: 'g-1', title: 'Experts' } });
    expect(screen.getByTestId('run-summary-panel-open-result')).toHaveTextContent('Open Experts');

    rerender(<RunSummaryPanel data={{ ...completed, result: { kind: 'document', documentId: 'd-1' } }} onOpenFull={() => {}} onOpenResult={onOpenResult} onOpenDocument={() => {}} />);
    expect(screen.queryByTestId('run-summary-panel-open-result')).toBeNull();
    expect(screen.getByTestId('run-summary-panel-open-document')).toBeInTheDocument();
  });

  it('has Open full run always, and Open chat only when the run knows its conversation', () => {
    const onOpenFull = vi.fn();
    const onOpenChat = vi.fn();
    const { rerender } = render(<RunSummaryPanel data={completed} onOpenFull={onOpenFull} onOpenChat={onOpenChat} />);
    fireEvent.click(screen.getByTestId('run-summary-panel-open-full'));
    expect(onOpenFull).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('run-summary-panel-open-chat'));
    expect(onOpenChat).toHaveBeenCalledTimes(1);

    rerender(<RunSummaryPanel data={{ ...completed, channel: undefined }} onOpenFull={onOpenFull} onOpenChat={onOpenChat} />);
    expect(screen.queryByTestId('run-summary-panel-open-chat')).toBeNull();
    expect(screen.getByTestId('run-summary-panel-open-full')).toBeInTheDocument();
  });
});

describe('createRunPanelRenderer', () => {
  const ref = { kind: 'run', id: 'document-agent-edit:r-1' };
  const mount = (renderer: ReturnType<typeof createRunPanelRenderer>) =>
    render(
      <ChatSidePanelProvider renderers={{ run: renderer }}>
        <ChatSidePanel panel={ref} onClose={() => {}} />
      </ChatSidePanelProvider>,
    );

  it('loads by panel ref, shows a skeleton meanwhile, then the run — and names the frame after the pipeline', async () => {
    let resolve!: (d: RunPanelData) => void;
    const load = vi.fn(() => new Promise<RunPanelData>((r) => { resolve = r; }));
    mount(createRunPanelRenderer({ load, onOpenFull: () => {} }));
    expect(screen.getByTestId('run-panel-loading')).toBeInTheDocument();
    expect(load).toHaveBeenCalledWith(ref);
    // Before the data arrives the frame falls back to the kind.
    expect(screen.getByTestId('chat-side-panel-title')).toHaveTextContent('Run');
    await act(async () => { resolve(completed); });
    await waitFor(() => expect(screen.getByTestId('run-panel')).toBeInTheDocument());
    expect(screen.getByTestId('chat-side-panel-title')).toHaveTextContent('Document agent edit');
    expect(screen.queryByTestId('run-panel-loading')).toBeNull();
  });

  // The tests run under StrictMode, which mounts the body twice, so `load`
  // is driven by state rather than by a once-queue and counts are deltas.
  it('shows a failed load as an alert with a retry', async () => {
    let failing = true;
    const load = vi.fn(async () => { if (failing) throw new Error('404'); return completed; });
    mount(createRunPanelRenderer({ load, onOpenFull: () => {} }));
    await waitFor(() => expect(screen.getByTestId('run-panel-error')).toHaveTextContent('Could not load this run: 404'));
    const before = load.mock.calls.length;
    failing = false;
    fireEvent.click(screen.getByTestId('run-panel-retry'));
    await waitFor(() => expect(screen.getByTestId('run-panel')).toBeInTheDocument());
    expect(load.mock.calls.length).toBe(before + 1);
  });

  it('hands the footer actions the panel ref and the loaded data', async () => {
    const onOpenFull = vi.fn();
    const onOpenChat = vi.fn();
    mount(createRunPanelRenderer({ load: async () => completed, onOpenFull, onOpenChat }));
    await waitFor(() => expect(screen.getByTestId('run-panel-open-full')).toBeInTheDocument());
    fireEvent.click(screen.getByTestId('run-panel-open-full'));
    expect(onOpenFull).toHaveBeenCalledWith(ref, completed);
    fireEvent.click(screen.getByTestId('run-panel-open-chat'));
    expect(onOpenChat).toHaveBeenCalledWith(ref, completed);
  });

  it('re-loads every refreshMs while the run is moving and stops once it is terminal', async () => {
    vi.useFakeTimers();
    const running: RunPanelData = { ...completed, status: 'running', completedAt: undefined };
    let current: RunPanelData = running;
    const load = vi.fn(async () => current);
    mount(createRunPanelRenderer({ load, onOpenFull: () => {}, refreshMs: 2000 }));
    await act(async () => { await Promise.resolve(); });
    expect(screen.getByTestId('run-panel')).toHaveAttribute('data-status', 'running');
    const mounted = load.mock.calls.length;

    await act(async () => { await vi.advanceTimersByTimeAsync(2000); });
    expect(load.mock.calls.length).toBe(mounted + 1);
    expect(screen.getByTestId('run-panel')).toHaveAttribute('data-status', 'running');

    current = completed;
    await act(async () => { await vi.advanceTimersByTimeAsync(2000); });
    expect(load.mock.calls.length).toBe(mounted + 2);
    expect(screen.getByTestId('run-panel')).toHaveAttribute('data-status', 'completed');

    // Terminal: the clock is off.
    await act(async () => { await vi.advanceTimersByTimeAsync(6000); });
    expect(load.mock.calls.length).toBe(mounted + 2);
  });

  it('keeps the last good read when a refresh fails', async () => {
    vi.useFakeTimers();
    const running: RunPanelData = { ...completed, status: 'running', completedAt: undefined };
    let failing = false;
    const load = vi.fn(async () => { if (failing) throw new Error('blip'); return running; });
    mount(createRunPanelRenderer({ load, onOpenFull: () => {}, refreshMs: 1000 }));
    await act(async () => { await Promise.resolve(); });
    expect(screen.getByTestId('run-panel')).toHaveAttribute('data-status', 'running');
    const mounted = load.mock.calls.length;
    failing = true;
    await act(async () => { await vi.advanceTimersByTimeAsync(1000); });
    expect(load.mock.calls.length).toBe(mounted + 1);
    expect(screen.getByTestId('run-panel')).toHaveAttribute('data-status', 'running');
    expect(screen.queryByTestId('run-panel-error')).toBeNull();
  });
});
