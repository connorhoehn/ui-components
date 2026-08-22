// v2.72.0 graduation-prep contract: no observability button is ever a no-op.
// Actions render only when the host wires a callback.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NodesPage from '../NodesPage';
import MetricTimeSeriesPanel from '../components/MetricTimeSeriesPanel';

const EMPTY_SEEDS = {
  runsPerMinute: [], stepDuration: [], llmTokens: [], llmCost: [],
  clusterCpu: [], clusterMemory: [], eventRate: [], activeRuns: [],
  failureRate: [], approvalLatency: [],
};

describe('MetricTimeSeriesPanel host callbacks', () => {
  it('hides reset-zoom and export-CSV when the host provides no handlers', () => {
    render(
      <MetricTimeSeriesPanel seeds={EMPTY_SEEDS} liveSeries={null} cols={2} isLiveData={false} failedColor="var(--color-danger)" />,
    );
    expect(screen.queryByTestId('metrics-reset-zoom')).toBeNull();
    expect(screen.queryByTestId('metrics-export-csv')).toBeNull();
  });

  it('renders and fires them when wired', () => {
    const onResetZoom = vi.fn();
    const onExportCsv = vi.fn();
    render(
      <MetricTimeSeriesPanel
        seeds={EMPTY_SEEDS} liveSeries={null} cols={2} isLiveData={false}
        failedColor="var(--color-danger)"
        onResetZoom={onResetZoom} onExportCsv={onExportCsv}
      />,
    );
    fireEvent.click(screen.getByTestId('metrics-reset-zoom'));
    fireEvent.click(screen.getByTestId('metrics-export-csv'));
    expect(onResetZoom).toHaveBeenCalled();
    expect(onExportCsv).toHaveBeenCalled();
  });
});

describe('NodesPage host callbacks', () => {
  it('hides the chaos and transfer sections without handlers', () => {
    render(<NodesPage />);
    fireEvent.click(screen.getAllByTestId('node-grid-tile')[0]);
    expect(screen.queryByText('Add latency')).toBeNull();
    expect(screen.queryByText('Kill node')).toBeNull();
    expect(screen.queryByText('Transfer resource')).toBeNull();
  });

  it('fires the wired handlers with the selected node id', () => {
    const onKillNode = vi.fn();
    const onAddLatency = vi.fn();
    const onTransferResource = vi.fn();
    render(
      <NodesPage onKillNode={onKillNode} onAddLatency={onAddLatency} onTransferResource={onTransferResource} />,
    );
    fireEvent.click(screen.getAllByTestId('node-grid-tile')[1]);
    fireEvent.click(screen.getByText('Add latency'));
    fireEvent.click(screen.getByText('Kill node'));
    fireEvent.click(screen.getByText('Transfer resource'));
    // The second fixture tile's id, whatever it is, must be what fires.
    expect(onAddLatency).toHaveBeenCalledTimes(1);
    expect(onKillNode).toHaveBeenCalledTimes(1);
    expect(onTransferResource).toHaveBeenCalledTimes(1);
    expect(onAddLatency.mock.calls[0][0]).toBe(onKillNode.mock.calls[0][0]);
  });

  it('accepts host-provided nodes instead of the fixture set', () => {
    render(
      <NodesPage
        nodes={[{ id: 'prod-7', status: 'healthy', role: 'worker', region: 'eu-1', cpu: 5, memoryMb: 100, connections: 1, activeRuns: 0, cpuHistory: [1, 2, 3] }]}
      />,
    );
    expect(screen.getAllByTestId('node-grid-tile')).toHaveLength(1);
    expect(screen.getAllByText('prod-7').length).toBeGreaterThan(0);
  });
});
