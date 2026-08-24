// Companion to host-callbacks.test.tsx. That file pins "no observability
// button is ever a no-op"; this one pins the other half of the same contract:
// no observability *number* is ever presented as measured when it was
// synthesized.
//
// Two surfaces broke it:
//   - MetricTimeSeriesPanel's toolbar pill is panel-scoped, but only four of
//     its ten charts can ever be fed by `liveSeries`. With the pill reading
//     "live", an operator was reading seeded LCG noise as measured
//     step-duration p99, cluster CPU/memory, event rate, failure mix and
//     approval latency.
//   - NodesPage invents three us-east-1 workers with plausible CPU/memory
//     numbers and a seeded history when no `nodes` prop is supplied. Its
//     sibling DashboardPage ships three source pills; this route shipped
//     none, so the only disclosure was a hover-only tooltip on the chaos rail.

import type { ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NodesPage from '../NodesPage';
import MetricTimeSeriesPanel from '../components/MetricTimeSeriesPanel';

const EMPTY_SEEDS = {
  runsPerMinute: [], stepDuration: [], llmTokens: [], llmCost: [],
  clusterCpu: [], clusterMemory: [], eventRate: [], activeRuns: [],
  failureRate: [], approvalLatency: [],
};

const LIVE_SERIES = {
  runsPerMinute: [{ label: 'runs', data: [{ x: '0', y: 1 }] }],
  llmTokens: [{ label: 'tok', data: [{ x: '0', y: 1 }] }],
  llmCost: [{ label: 'cost', data: [{ x: '0', y: 1 }] }],
  activeRuns: [{ label: 'active', data: [{ x: '0', y: 1 }] }],
} as unknown as ComponentProps<typeof MetricTimeSeriesPanel>['liveSeries'];

/** Titles of the cards currently carrying the amber "sample" chip. */
function sampleTitles(): string[] {
  return screen
    .getAllByTestId('metric-card')
    .filter((card) => card.querySelector('[data-testid="metric-card-sample-chip"]'))
    .map((card) => card.querySelector('[title]')?.getAttribute('title') ?? '');
}

describe('MetricTimeSeriesPanel per-card provenance', () => {
  it('still marks the six seed-only charts as sample while the panel says live', () => {
    render(
      <MetricTimeSeriesPanel
        seeds={EMPTY_SEEDS}
        liveSeries={LIVE_SERIES}
        cols={2}
        isLiveData
        failedColor="var(--color-danger)"
      />,
    );
    expect(screen.getByTestId('metrics-data-source')).toHaveTextContent('live');
    const marked = sampleTitles();
    for (const title of [
      'Step duration (p50/p95/p99)',
      'Cluster CPU',
      'Cluster memory',
      'Event rate',
      'Failure rate by type',
      'Approval latency',
    ]) {
      expect(marked).toContain(title);
    }
  });

  it('leaves the four live-backed charts unmarked when their series arrive', () => {
    render(
      <MetricTimeSeriesPanel
        seeds={EMPTY_SEEDS}
        liveSeries={LIVE_SERIES}
        cols={2}
        isLiveData
        failedColor="var(--color-danger)"
      />,
    );
    const marked = sampleTitles();
    for (const title of ['Runs per minute', 'LLM tokens', 'LLM cost', 'Active runs over time']) {
      expect(marked).not.toContain(title);
    }
  });

  it('marks every chart as sample when there is no live series at all', () => {
    render(
      <MetricTimeSeriesPanel
        seeds={EMPTY_SEEDS}
        liveSeries={null}
        cols={2}
        isLiveData={false}
        failedColor="var(--color-danger)"
      />,
    );
    expect(sampleTitles()).toHaveLength(screen.getAllByTestId('metric-card').length);
  });
});

describe('NodesPage sample-data disclosure', () => {
  it('says the nodes are synthesized when no host source is wired', () => {
    render(<NodesPage />);
    expect(screen.getByTestId('nodes-sample-banner')).toBeInTheDocument();
    expect(screen.getAllByTestId('node-grid-tile').length).toBeGreaterThan(0);
  });

  it('drops the banner once the host supplies real nodes', () => {
    render(
      <NodesPage
        nodes={[
          {
            id: 'prod-7', status: 'healthy', role: 'worker', region: 'eu-1',
            cpu: 5, memoryMb: 100, connections: 1, activeRuns: 0, cpuHistory: [1, 2, 3],
          },
        ]}
      />,
    );
    expect(screen.queryByTestId('nodes-sample-banner')).toBeNull();
  });
});
