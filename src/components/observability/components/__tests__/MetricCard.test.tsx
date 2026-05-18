import { render, screen, fireEvent } from '@testing-library/react';
import MetricCard from '../MetricCard';

describe('MetricCard', () => {
  it('renders the title', () => {
    render(
      <MetricCard title="Latency">
        <div>chart</div>
      </MetricCard>,
    );
    expect(screen.getByText('Latency')).toBeInTheDocument();
  });

  it('renders children inside the card body', () => {
    render(
      <MetricCard title="Latency">
        <div data-testid="chart-slot">chart-body</div>
      </MetricCard>,
    );
    expect(screen.getByTestId('chart-slot')).toBeInTheDocument();
  });

  it('renders a time-range chip when provided', () => {
    render(
      <MetricCard title="Latency" timeRange="last 1h">
        <div />
      </MetricCard>,
    );
    expect(screen.getByText('last 1h')).toBeInTheDocument();
  });

  it('omits the time-range chip when not provided', () => {
    render(
      <MetricCard title="Latency">
        <div />
      </MetricCard>,
    );
    expect(screen.queryByText('last 1h')).not.toBeInTheDocument();
  });

  it('renders the maximize button when onMaximize is provided', () => {
    render(
      <MetricCard title="Latency" onMaximize={() => {}}>
        <div />
      </MetricCard>,
    );
    const btn = screen.getByTestId('metric-card-maximize');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('aria-label', 'Maximize Latency');
  });

  it('invokes onMaximize when the maximize button is clicked', () => {
    const onMaximize = vi.fn();
    render(
      <MetricCard title="Latency" onMaximize={onMaximize}>
        <div />
      </MetricCard>,
    );
    fireEvent.click(screen.getByTestId('metric-card-maximize'));
    expect(onMaximize).toHaveBeenCalledTimes(1);
  });

  it('omits the maximize button when onMaximize is absent', () => {
    render(
      <MetricCard title="Latency">
        <div />
      </MetricCard>,
    );
    expect(screen.queryByTestId('metric-card-maximize')).not.toBeInTheDocument();
  });
});
