import { render, screen, fireEvent } from '@testing-library/react';
import DashboardKPIStrip, { type DashboardKPIStripProps } from '../DashboardKPIStrip';

function makeProps(
  overrides: Partial<DashboardKPIStripProps> = {},
): DashboardKPIStripProps {
  return {
    runsToday: 1234,
    runsSparkline: [1, 2, 3, 4, 5],
    activeNow: 7,
    pendingApprovals: 3,
    failed24h: 2,
    avgFirstTokenLatency: '420ms',
    onScrollToActive: () => {},
    onGoToPipelines: () => {},
    onGoToFailedEvents: () => {},
    ...overrides,
  };
}

describe('DashboardKPIStrip', () => {
  it('renders all 5 KPICards with provided values', () => {
    render(<DashboardKPIStrip {...makeProps()} />);
    expect(screen.getAllByTestId('kpi-card')).toHaveLength(5);
    expect(screen.getByText('Runs today')).toBeInTheDocument();
    expect(screen.getByText('Active now')).toBeInTheDocument();
    expect(screen.getByText('Pending approvals')).toBeInTheDocument();
    expect(screen.getByText('Failed (24h)')).toBeInTheDocument();
    expect(screen.getByText('Avg first-token latency')).toBeInTheDocument();
    expect(screen.getByText((1234).toLocaleString())).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('420ms')).toBeInTheDocument();
  });

  it('suppresses the runsToday delta when value is a string (em-dash)', () => {
    const { container } = render(
      <DashboardKPIStrip {...makeProps({ runsToday: '—', failed24h: '—' })} />,
    );
    expect(container.textContent).not.toContain('▲');
  });

  it('suppresses the failed24h delta when value is a string (em-dash)', () => {
    const { container } = render(
      <DashboardKPIStrip {...makeProps({ runsToday: '—', failed24h: '—' })} />,
    );
    expect(container.textContent).not.toContain('▼');
  });

  it('shows both deltas when runsToday and failed24h are numbers', () => {
    render(<DashboardKPIStrip {...makeProps()} />);
    expect(screen.getByText(/▲ 12%/)).toBeInTheDocument();
    expect(screen.getByText(/▼ 4%/)).toBeInTheDocument();
  });

  it('invokes onScrollToActive when the Active now card is clicked', () => {
    const onScrollToActive = vi.fn();
    render(<DashboardKPIStrip {...makeProps({ onScrollToActive })} />);
    const card = screen.getByText('Active now').closest('[data-testid="kpi-card"]');
    expect(card).not.toBeNull();
    fireEvent.click(card!);
    expect(onScrollToActive).toHaveBeenCalledTimes(1);
  });

  it('invokes onGoToPipelines when the Pending approvals card is clicked', () => {
    const onGoToPipelines = vi.fn();
    render(<DashboardKPIStrip {...makeProps({ onGoToPipelines })} />);
    const card = screen
      .getByText('Pending approvals')
      .closest('[data-testid="kpi-card"]');
    expect(card).not.toBeNull();
    fireEvent.click(card!);
    expect(onGoToPipelines).toHaveBeenCalledTimes(1);
  });

  it('invokes onGoToFailedEvents when the Failed (24h) card is clicked', () => {
    const onGoToFailedEvents = vi.fn();
    render(<DashboardKPIStrip {...makeProps({ onGoToFailedEvents })} />);
    const card = screen
      .getByText('Failed (24h)')
      .closest('[data-testid="kpi-card"]');
    expect(card).not.toBeNull();
    fireEvent.click(card!);
    expect(onGoToFailedEvents).toHaveBeenCalledTimes(1);
  });
});
