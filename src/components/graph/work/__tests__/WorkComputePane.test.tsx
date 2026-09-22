import { useState } from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { WorkNodePane } from '../WorkNodePane';
import type {
  WorkActivityNodeDetail, WorkComputeDetail, WorkGraphNodeData, WorkGraphSelection,
} from '../types';

afterEach(cleanup);

const at = '2026-09-21T13:15:00Z';

const node = (extra: Partial<WorkGraphNodeData> = {}): WorkGraphNodeData => ({
  id: 'run-4471',
  kind: 'run',
  title: 'auth-migration-3',
  status: 'running',
  disclosure: 'details',
  capabilities: ['view-run', 'observe-terminal'],
  updatedAt: at,
  ...extra,
});

const compute = (extra: Partial<WorkComputeDetail> = {}): WorkComputeDetail => ({
  label: 'auth-migration-3',
  runtime: 'agentcore-microvm',
  project: 'Auth Migration',
  status: 'running',
  owner: { id: 'connor', name: 'Connor Hoehn' },
  shared: true,
  task: {
    title: 'Flaky test triage',
    description: 'Find the tests that failed intermittently this week and say why.',
    startedAt: '09:15',
    elapsedMs: 30 * 60_000,
    environment: 'devbox:task',
  },
  // 40_960 / 128_000 = 32%, the figure the design calls out.
  metrics: { model: 'claude-sonnet-5', costUsd: 0.04, contextTokens: 40_960, contextBudgetTokens: 128_000 },
  terminalPreview: {
    running: true,
    lines: [
      { glyph: 'prompt', text: 'npm test -- --reporter=json' },
      { glyph: 'done', text: '212 passing' },
      { glyph: 'pending', text: '2 quarantined' },
    ],
  },
  progress: [
    { id: 's1', title: 'Collect this week’s failures', kind: 'research', status: 'done', elapsedMs: 134_000 },
    { id: 's2', title: 'Quarantine the flaky specs', kind: 'code', status: 'running', elapsedMs: 30 * 60_000 },
    { id: 's3', title: 'Write the triage note', kind: 'document', status: 'pending' },
  ],
  artifacts: [{ id: 'f1', name: 'notes.md', sizeBytes: 2048, updatedAt: '09:41', onDownload: vi.fn() }],
  workItem: { key: 'WORK-144', status: 'In review', title: 'Gateway · Flaky test triage', tags: ['gateway', 'tests'], onOpen: vi.fn() },
  events: [
    { id: 'e1', at, kind: 'command', text: 'npm test' },
    { id: 'e2', at, kind: 'tool', text: 'Read test/gateway/session-recovery.test.ts', detail: 'lines 1–80' },
    { id: 'e3', at, kind: 'result', text: '2 specs quarantined', mock: true },
  ],
  shell: { sessionId: 'sess-mock-auth-migration-0003-0000-0000-000000000003' },
  stopsInMs: 41 * 60_000,
  onOpenShell: vi.fn(),
  onOpenInNew: vi.fn(),
  onOpenLab: vi.fn(),
  moreActions: [{ id: 'stop', label: 'Stop this session', onSelect: vi.fn() }],
  ...extra,
});

function Harness({ detail, entity, onReference }: {
  detail?: WorkActivityNodeDetail;
  entity: WorkGraphNodeData;
  onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
}) {
  const [selection, setSelection] = useState<Extract<WorkGraphSelection, { kind: 'node' }>>({ kind: 'node', id: entity.id });
  return (
    <WorkNodePane
      node={entity}
      detail={detail}
      selection={selection}
      onSelectionChange={(next) => next?.kind === 'node' && setSelection(next)}
      onClose={() => {}}
      onReference={onReference}
    />
  );
}

describe('the compute-session detail pane', () => {
  it('opens with the session card, the owner, the gauges and the four labelled metrics', () => {
    const detail: WorkActivityNodeDetail = {
      subtitle: 'AgentCore microVM · Auth Migration · Shared with you',
      compute: compute(),
    };
    render(<Harness entity={node()} detail={detail} />);

    // The existing pane chrome is untouched.
    expect(screen.getByTestId('activity-inspector-title')).toHaveTextContent('auth-migration-3');
    expect(screen.getByTestId('activity-inspector-subtitle'))
      .toHaveTextContent('AgentCore microVM · Auth Migration · Shared with you');

    // The banner slot, said in this kind's own words, derived not invented.
    const card = screen.getByTestId('work-compute-pane-card');
    expect(card).toHaveTextContent('Flaky test triage');
    expect(card).toHaveTextContent('auth-migration-3 · AgentCore microVM · started 09:15 · Shared with you');
    // And no second, generic banner above it.
    expect(screen.queryByTestId('work-pane-banner')).toBeNull();

    expect(screen.getByTestId('work-compute-pane-owner')).toHaveTextContent('Connor Hoehn');
    expect(screen.getByTestId('work-compute-pane-status')).toHaveTextContent('RUNNING');
    // The real PaneStatusLine, not a redrawn one.
    expect(screen.getByTestId('work-compute-pane-gauges')).toHaveTextContent('ctx 32%');

    const metrics = screen.getByTestId('work-compute-pane-metrics');
    expect(within(metrics).getByText('claude-sonnet-5')).toBeInTheDocument();
    expect(within(metrics).getByText('$0.0400')).toBeInTheDocument();
    expect(within(metrics).getByText('32% (128k)')).toBeInTheDocument();
    expect(within(metrics).getByText('devbox:task')).toBeInTheDocument();
  });

  it('shows the live tail first, with the mock flag on the frame that carries it', () => {
    render(<Harness entity={node()} detail={{ compute: compute() }} />);
    const tail = screen.getByTestId('work-compute-pane-tail');
    expect(within(tail).getByText('tailing')).toBeInTheDocument();
    expect(within(tail).getByText('read-only')).toBeInTheDocument();
    expect(within(tail).getByText('npm test')).toBeInTheDocument();
    // A mock frame is never allowed to read as real output.
    expect(within(tail).getByText('mock')).toBeInTheDocument();
    // Long form is collapsed until asked for.
    expect(within(tail).queryByText('lines 1–80')).toBeNull();
    fireEvent.click(within(tail).getByRole('button', { name: '+ detail' }));
    expect(within(tail).getByText('lines 1–80')).toBeInTheDocument();
  });

  it('opens the shell tab on the primary action and offers the digest until a URL is minted', () => {
    const data = compute();
    render(<Harness entity={node()} detail={{ compute: data }} />);

    fireEvent.click(screen.getByTestId('work-compute-pane-open-shell'));
    expect(data.onOpenShell).toHaveBeenCalledTimes(1);

    // No presigned URL yet is the normal first state, not a failure: the tab
    // shows what the box last printed rather than an empty rectangle.
    const preview = screen.getByTestId('work-compute-pane-preview');
    expect(within(preview).getByText('npm test -- --reporter=json')).toBeInTheDocument();
    expect(within(preview).getByText('212 passing')).toBeInTheDocument();
    expect(screen.getByTestId('work-compute-pane-connect')).toBeEnabled();
  });

  it('puts the plan, the files and the work item in the workspace tab', () => {
    const data = compute();
    render(<Harness entity={node()} detail={{ compute: data }} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Workspace' }));

    const progress = screen.getByTestId('work-compute-pane-progress');
    expect(within(progress).getByText('Completed · 2m 14s')).toBeInTheDocument();
    expect(within(progress).getByText('Running · 30m elapsed')).toBeInTheDocument();
    expect(within(progress).getByText('Queued')).toBeInTheDocument();

    const artifacts = screen.getByTestId('work-compute-pane-artifacts');
    expect(within(artifacts).getByText('notes.md')).toBeInTheDocument();
    expect(within(artifacts).getByText('2.0 KB · 09:41')).toBeInTheDocument();
    fireEvent.click(within(artifacts).getByRole('button', { name: 'Download' }));
    expect(data.artifacts[0]!.onDownload).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('work-compute-pane-work-item'));
    expect(data.workItem!.onOpen).toHaveBeenCalledTimes(1);
  });

  it('says what it does not know rather than printing a confident zero', () => {
    const data = compute({
      metrics: { model: 'claude-haiku-4-5', contextTokens: 9_800 },
      artifacts: [],
      progress: [],
      events: [],
      notice: 'Mock runtime · frames are not from a real box',
      shell: undefined as unknown as WorkComputeDetail['shell'],
    });
    render(<Harness entity={node()} detail={{ compute: data }} />);

    expect(within(screen.getByTestId('work-compute-pane-metrics')).getByText('—')).toBeInTheDocument();
    expect(screen.getByTestId('work-compute-pane-notice'))
      .toHaveTextContent('Mock runtime · frames are not from a real box');
    // No box behind it means no Shell tab at all, not a dead one.
    expect(screen.queryByRole('tab', { name: 'Shell' })).toBeNull();

    fireEvent.click(screen.getByRole('tab', { name: 'Workspace' }));
    expect(screen.getByText('No plan was recorded for this session.')).toBeInTheDocument();
    expect(screen.getByText('This session has not written a file you can see.')).toBeInTheDocument();
  });

  it('puts the working backdrop under the tail while the session is mid-turn, and takes it away when it stops', () => {
    const { rerender } = render(<Harness entity={node()} detail={{ compute: compute({ status: 'running' }) }} />);
    expect(screen.getByTestId('work-compute-pane-tail-backdrop')).toBeInTheDocument();
    expect(screen.getAllByTestId('work-compute-pane-tail-layer')).toHaveLength(4);

    rerender(<Harness entity={node()} detail={{ compute: compute({ status: 'done' }) }} />);
    expect(screen.getByTestId('work-compute-pane-tail-backdrop').className).toContain('opacity-0');
  });

  it('keeps the reference footer carrying the node, and leaves every other pane alone', () => {
    const onReference = vi.fn();
    render(<Harness entity={node()} detail={{ compute: compute() }} onReference={onReference} />);
    fireEvent.click(screen.getByRole('button', { name: 'Reference in chat' }));
    expect(onReference).toHaveBeenCalledWith({ kind: 'node', id: 'run-4471' });

    cleanup();
    // Absent `compute`, the pane is exactly what it was before this file existed.
    render(<Harness entity={node({ kind: 'document', title: 'Sprint review' })} detail={{ banner: { tone: 'info', title: 'Generating v3' } }} />);
    expect(screen.getByTestId('work-pane-banner')).toHaveTextContent('Generating v3');
    expect(screen.queryByTestId('work-compute-pane')).toBeNull();
  });
});
