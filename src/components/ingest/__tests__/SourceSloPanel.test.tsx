import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import type {
  SloPoint,
  SloWindow,
  SourceSloMetrics,
  UseSourceSloMetricsResult,
} from '../../../hooks/useSourceSloMetrics';

const useSourceSloMetricsMock = vi.fn<(sourceId: string | undefined, window?: SloWindow) => UseSourceSloMetricsResult>();

vi.mock('../../../hooks/useSourceSloMetrics', () => ({
  useSourceSloMetrics: (sourceId: string | undefined, window?: SloWindow) =>
    useSourceSloMetricsMock(sourceId, window),
}));

// recharts requires a measured parent; replace with passthrough stubs.
vi.mock('recharts', () => {
  const Passthrough = ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="resp">{children}</div>
  );
  const Stub = (kind: string) => () => <div data-recharts={kind} />;
  return {
    ResponsiveContainer: Passthrough,
    LineChart: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
    Line: Stub('line'),
    YAxis: Stub('y'),
    Tooltip: Stub('tooltip'),
  };
});

import SourceSloPanel from '../SourceSloPanel';

function pt(at: string, value: number | null): SloPoint {
  return { at, value };
}

function makeMetrics(overrides: Partial<SourceSloMetrics> = {}): SourceSloMetrics {
  return {
    sourceId: 'src-1',
    window: '1h',
    bucketSizeMs: 60_000,
    latencyP95: [pt('2026-05-17T00:00:00Z', 120), pt('2026-05-17T00:01:00Z', 134.6)],
    errorRate: [pt('2026-05-17T00:00:00Z', 0.4), pt('2026-05-17T00:01:00Z', 1.25)],
    queueDepth: [pt('2026-05-17T00:00:00Z', 3), pt('2026-05-17T00:01:00Z', 7)],
    ...overrides,
  };
}

function makeResult(overrides: Partial<UseSourceSloMetricsResult> = {}): UseSourceSloMetricsResult {
  return {
    metrics: null,
    loading: false,
    error: null,
    refresh: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

beforeEach(() => {
  useSourceSloMetricsMock.mockReset();
  useSourceSloMetricsMock.mockReturnValue(makeResult());
});

describe('SourceSloPanel', () => {
  it('renders the panel chrome with the window in the header', () => {
    render(<SourceSloPanel sourceId="src-1" />);
    expect(screen.getByTestId('source-slo-panel')).toBeInTheDocument();
    expect(screen.getByText('Health (last 1h)')).toBeInTheDocument();
  });

  it('renders the error banner when error is set', () => {
    useSourceSloMetricsMock.mockReturnValue(makeResult({ error: 'boom' }));
    render(<SourceSloPanel sourceId="src-1" />);
    expect(screen.getByTestId('slo-error')).toHaveTextContent('boom');
  });

  it('does not render metric tiles when metrics is null', () => {
    render(<SourceSloPanel sourceId="src-1" />);
    expect(screen.queryByTestId('slo-latency-value')).not.toBeInTheDocument();
    expect(screen.queryByTestId('slo-latency-chart')).not.toBeInTheDocument();
  });

  it('renders the three sparkline charts and last-non-null values when metrics present', () => {
    useSourceSloMetricsMock.mockReturnValue(makeResult({ metrics: makeMetrics() }));
    render(<SourceSloPanel sourceId="src-1" />);
    expect(screen.getByTestId('slo-latency-chart')).toBeInTheDocument();
    expect(screen.getByTestId('slo-error-rate-chart')).toBeInTheDocument();
    expect(screen.getByTestId('slo-queue-depth-chart')).toBeInTheDocument();
    expect(screen.getByTestId('slo-latency-value')).toHaveTextContent('135 ms');
    expect(screen.getByTestId('slo-error-rate-value')).toHaveTextContent('1.3%');
    expect(screen.getByTestId('slo-queue-depth-value')).toHaveTextContent('7');
  });

  it('shows "—" for latency when latencyP95 is all-null', () => {
    const m = makeMetrics({
      latencyP95: [pt('2026-05-17T00:00:00Z', null), pt('2026-05-17T00:01:00Z', null)],
    });
    useSourceSloMetricsMock.mockReturnValue(makeResult({ metrics: m }));
    render(<SourceSloPanel sourceId="src-1" />);
    expect(screen.getByTestId('slo-latency-value')).toHaveTextContent('—');
  });

  it('uses the last non-null value when the tail of the series is null', () => {
    const m = makeMetrics({
      latencyP95: [pt('2026-05-17T00:00:00Z', 100), pt('2026-05-17T00:01:00Z', null)],
    });
    useSourceSloMetricsMock.mockReturnValue(makeResult({ metrics: m }));
    render(<SourceSloPanel sourceId="src-1" />);
    expect(screen.getByTestId('slo-latency-value')).toHaveTextContent('100 ms');
  });

  it('changing the window-picker re-runs the hook with the new window', () => {
    render(<SourceSloPanel sourceId="src-1" />);
    fireEvent.change(screen.getByTestId('slo-window-picker'), { target: { value: '24h' } });
    const lastCall = useSourceSloMetricsMock.mock.calls.at(-1);
    expect(lastCall?.[0]).toBe('src-1');
    expect(lastCall?.[1]).toBe('24h');
  });
});
