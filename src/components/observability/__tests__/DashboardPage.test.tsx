// The dashboard's whole job is to distinguish "zero" from "we don't know".
// The pipeline bridge returns `null` for fields it doesn't support yet, and
// every one of those must reach the KPI card as an em-dash — a stale "0 ms"
// or "0 failed" is a wrong answer dressed as a real one. On top of that,
// "Active now" has a precedence rule (event-stream count wins, but only when
// it is non-zero) that is invisible from the outside, and the metrics-source
// pill deliberately renders NOTHING in the healthy case so operators only see
// chrome when the numbers are suspect.

import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ClusterDashboard, ObservabilityValue } from '../context/ObservabilityContext';
import type { PipelineMetrics, UsePipelineMetricsResult } from '../hooks/usePipelineMetrics';

const useObservabilityMock = vi.fn<() => ObservabilityValue>();
const useDashboardMock = vi.fn<() => ClusterDashboard | null>();
const usePipelineMetricsMock = vi.fn<() => UsePipelineMetricsResult>();
const navigateMock = vi.fn<(to: string) => void>();

vi.mock('../context/ObservabilityContext', async (orig) => ({
  ...(await orig<Record<string, unknown>>()),
  useObservability: () => useObservabilityMock(),
}));
vi.mock('../hooks/useDashboard', () => ({ useDashboard: () => useDashboardMock() }));
vi.mock('../hooks/usePipelineMetrics', () => ({ usePipelineMetrics: () => usePipelineMetricsMock() }));
vi.mock('react-router', () => ({ useNavigate: () => navigateMock }));

import DashboardPage, { formatMs } from '../DashboardPage';

function metrics(over: Partial<PipelineMetrics> = {}): PipelineMetrics {
  return {
    runsStarted: null, runsCompleted: null, runsFailed: null, runsActive: null,
    runsAwaitingApproval: null, avgDurationMs: null, llmTokensIn: null,
    llmTokensOut: null, estimatedCostUsd: null, avgFirstTokenLatencyMs: null,
    asOf: '2026-01-01T00:00:00.000Z', source: 'bridge',
    ...over,
  };
}

function observability(over: Partial<ObservabilityValue> = {}): ObservabilityValue {
  return {
    dashboard: null, loading: false, error: null, lastUpdatedAt: null,
    live: true, setLive: vi.fn(), refreshDashboard: vi.fn().mockResolvedValue(undefined),
    recentEvents: [], activeRunsCount: 0, isLiveData: false, unauthorized: false,
    ...over,
  };
}

function renderDashboard(opts: {
  obs?: Partial<ObservabilityValue>;
  metrics?: PipelineMetrics | null;
  source?: UsePipelineMetricsResult['source'];
  dashboard?: ClusterDashboard | null;
} = {}) {
  const obs = observability(opts.obs);
  useObservabilityMock.mockReturnValue(obs);
  useDashboardMock.mockReturnValue(opts.dashboard ?? null);
  usePipelineMetricsMock.mockReturnValue({
    metrics: opts.metrics === undefined ? metrics() : opts.metrics,
    loading: false, error: null, lastUpdatedAt: null,
    refresh: vi.fn().mockResolvedValue(undefined),
    isLiveData: true,
    source: opts.source === undefined ? 'bridge' : opts.source,
  });
  render(<DashboardPage />);
  return obs;
}

/** The rendered value of the KPI card with the given title. */
function kpi(title: string): string {
  const card = screen.getByText(title).closest('div')!.parentElement!;
  return within(card).getByText(/^(—|[\d.]+( ms|s)?)$/).textContent ?? '';
}

beforeEach(() => {
  useObservabilityMock.mockReset();
  useDashboardMock.mockReset();
  usePipelineMetricsMock.mockReset();
  navigateMock.mockReset();
});

describe('formatMs', () => {
  it.each([
    [null, '—'],
    [undefined, '—'],
    [Number.NaN, '—'],
    [Number.POSITIVE_INFINITY, '—'],
  ])('renders %s as an em-dash rather than a number', (input, expected) => {
    expect(formatMs(input as number | null | undefined)).toBe(expected);
  });

  it('keeps a real zero as a real zero', () => {
    expect(formatMs(0)).toBe('0 ms');
  });

  it('stays in milliseconds below one second and rounds', () => {
    expect(formatMs(234)).toBe('234 ms');
    expect(formatMs(234.6)).toBe('235 ms');
    expect(formatMs(999)).toBe('999 ms');
  });

  it('switches to seconds at exactly 1000ms, to one decimal', () => {
    expect(formatMs(1000)).toBe('1.0s');
    expect(formatMs(1234)).toBe('1.2s');
    expect(formatMs(12345)).toBe('12.3s');
  });

  it('rejects a non-number outright', () => {
    expect(formatMs('500' as unknown as number)).toBe('—');
  });
});

describe('DashboardPage KPI nulls', () => {
  it('renders every unsupported bridge field as an em-dash, not zero', () => {
    renderDashboard();
    expect(kpi('Runs today')).toBe('—');
    expect(kpi('Pending approvals')).toBe('—');
    expect(kpi('Failed (24h)')).toBe('—');
    expect(kpi('Avg first-token latency')).toBe('—');
  });

  it('passes a genuine zero through as a number', () => {
    renderDashboard({ metrics: metrics({ runsStarted: 0, runsFailed: 0 }) });
    expect(kpi('Runs today')).toBe('0');
    expect(kpi('Failed (24h)')).toBe('0');
  });

  it('falls back to em-dashes when the metrics poll has not resolved at all', () => {
    renderDashboard({ metrics: null, source: null });
    expect(kpi('Runs today')).toBe('—');
  });
});

describe('DashboardPage "Active now" precedence', () => {
  it('prefers the event-stream count when it is non-zero', () => {
    renderDashboard({ obs: { activeRunsCount: 7 }, metrics: metrics({ runsActive: 2 }) });
    expect(kpi('Active now')).toBe('7');
  });

  it('falls back to the bridge value when the stream count is zero', () => {
    renderDashboard({ obs: { activeRunsCount: 0 }, metrics: metrics({ runsActive: 2 }) });
    expect(kpi('Active now')).toBe('2');
  });

  it('shows an em-dash when neither source knows', () => {
    renderDashboard({ obs: { activeRunsCount: 0 }, metrics: metrics({ runsActive: null }) });
    expect(kpi('Active now')).toBe('—');
  });
});

describe('DashboardPage provenance chrome', () => {
  it('shows no metrics pill in the healthy bridge case', () => {
    renderDashboard({ source: 'bridge' });
    expect(screen.queryByTestId('pipeline-metrics-source-pill')).toBeNull();
  });

  it('shows no pill before the first poll resolves', () => {
    renderDashboard({ source: null });
    expect(screen.queryByTestId('pipeline-metrics-source-pill')).toBeNull();
  });

  it('flags synthesized numbers as demo data', () => {
    renderDashboard({ source: 'stub' });
    expect(screen.getByTestId('pipeline-metrics-source-pill')).toHaveTextContent('demo data');
  });

  it('flags a metrics failure distinctly from a stub', () => {
    renderDashboard({ source: 'error' });
    const pill = screen.getByTestId('pipeline-metrics-source-pill');
    expect(pill).toHaveTextContent('metrics error');
    expect(pill).toHaveAttribute('data-source', 'error');
  });

  it('says when the dashboard body is live backend data', () => {
    renderDashboard({ obs: { isLiveData: true } });
    expect(screen.getByTestId('dashboard-data-source')).toHaveTextContent('live data');
  });

  it('labels fixture data when the backend is unreachable', () => {
    renderDashboard({ obs: { isLiveData: false } });
    expect(screen.getByTestId('dashboard-data-source')).toHaveTextContent('fixture');
  });
});

describe('DashboardPage cluster health', () => {
  it('marks the cluster healthy only when every node is', () => {
    renderDashboard({ dashboard: { overview: { totalNodes: 3, healthyNodes: 3 } } as ClusterDashboard });
    expect(screen.getByTestId('cluster-health-chip')).toHaveTextContent('3/3 ✓');
  });

  it('flags a partial cluster', () => {
    renderDashboard({ dashboard: { overview: { totalNodes: 3, healthyNodes: 2 } } as ClusterDashboard });
    expect(screen.getByTestId('cluster-health-chip')).toHaveTextContent('2/3 !');
  });

  it('treats a dashboard with no overview as an empty cluster instead of crashing', () => {
    renderDashboard({ dashboard: {} as ClusterDashboard });
    expect(screen.getByTestId('cluster-health-chip')).toHaveTextContent('0/0');
  });
});

describe('DashboardPage live toggle and navigation', () => {
  it('the toggle reports the inverse of the current state to the host', () => {
    const obs = renderDashboard({ obs: { live: true } });
    expect(screen.getByTestId('live-toggle')).toHaveTextContent('Live');
    fireEvent.click(screen.getByTestId('live-toggle'));
    expect(obs.setLive).toHaveBeenCalledWith(false);
  });

  it('reads Paused when the stream is off', () => {
    renderDashboard({ obs: { live: false } });
    expect(screen.getByTestId('live-toggle')).toHaveTextContent('Paused');
  });

  it('Failed (24h) drills into the pre-filtered events route', () => {
    renderDashboard({ metrics: metrics({ runsFailed: 3 }) });
    fireEvent.click(screen.getByText('Failed (24h)'));
    expect(navigateMock).toHaveBeenCalledWith('/observability/events?filter=errors');
  });

  it('"view all" goes to the unfiltered events route', () => {
    renderDashboard();
    fireEvent.click(screen.getByTestId('recent-events-view-all'));
    expect(navigateMock).toHaveBeenCalledWith('/observability/events');
  });
});

describe('DashboardPage recent events', () => {
  it('says so when the stream has produced nothing', () => {
    renderDashboard({ obs: { recentEvents: [] } });
    expect(screen.getByText('No recent events')).toBeInTheDocument();
  });

  it('caps the list at twenty however many the context holds', () => {
    const recentEvents = Array.from({ length: 25 }, (_, i) => ({
      id: `e${i}`, timestamp: '2026-01-01T00:00:00.000Z', type: 'run.started',
      summary: `event ${i}`, severity: 'info' as const,
    }));
    renderDashboard({ obs: { recentEvents } });
    expect(screen.getAllByText(/^event \d+$/)).toHaveLength(20);
  });
});
