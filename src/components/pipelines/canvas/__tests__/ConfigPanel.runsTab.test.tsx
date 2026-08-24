// The Runs tab used to render a hardcoded "No runs yet." for every node,
// forever — even while the run data it needed was already reachable from
// this same barrel via `useLatestStepForNode`. A tab that can only ever be
// empty is worse than no tab: it tells the user there is no run history when
// there may well be one.
//
// These pin that it now reflects the node's latest step, and — just as
// important — that it still degrades to the empty state when no runs
// context is mounted, which is the bare-editor case.

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { StepExecution } from '../../../../types/pipeline';

//  is in NODE_TYPES_WITHOUT_CONFIG, so the Config tab renders no
// per-type panel — keeping this test about the Runs tab and nothing else.
const node = { id: 'n1', type: 'guardrail', position: { x: 0, y: 0 }, data: { type: 'guardrail' } };

vi.mock('../../context/PipelineEditorContext', () => ({
  usePipelineEditor: () => ({
    definition: { id: 'p1', name: 'P', nodes: [node], edges: [] },
    selectedNodeId: 'n1',
    setSelectedNodeId: vi.fn(),
    updateNodeData: vi.fn(),
    removeNode: vi.fn(),
    duplicateNodes: vi.fn(),
  }),
}));

let latestStep: StepExecution | null = null;
vi.mock('../../context/PipelineRunsContext', () => ({
  useLatestStepForNode: () => latestStep,
}));

import ConfigPanel from '../ConfigPanel';

function openRunsTab() {
  render(<ConfigPanel selectedIds={['n1']} />);
  fireEvent.click(screen.getByRole('tab', { name: 'Runs' }));
}

describe('ConfigPanel Runs tab', () => {
  it('falls back to the empty state when no run data is available', () => {
    latestStep = null;
    openRunsTab();
    expect(screen.getByText('No runs yet.')).toBeInTheDocument();
    expect(screen.queryByTestId('config-runs-latest')).toBeNull();
  });

  it('renders the latest step status, duration and output', () => {
    latestStep = {
      nodeId: 'n1',
      status: 'completed',
      startedAt: new Date().toISOString(),
      durationMs: 1234,
      output: { rows: 42 },
    } as StepExecution;
    openRunsTab();
    expect(screen.getByTestId('config-runs-latest')).toBeInTheDocument();
    expect(screen.getByTestId('config-runs-status')).toHaveTextContent('completed');
    expect(screen.getByText(/42/)).toBeInTheDocument();
    expect(screen.queryByText('No runs yet.')).toBeNull();
  });

  it('surfaces a failed step error as an alert', () => {
    latestStep = {
      nodeId: 'n1', status: 'failed', durationMs: 10, error: 'boom: schema mismatch',
    } as StepExecution;
    openRunsTab();
    expect(screen.getByRole('alert')).toHaveTextContent('boom: schema mismatch');
    expect(screen.getByTestId('config-runs-status')).toHaveTextContent('failed');
  });
});
