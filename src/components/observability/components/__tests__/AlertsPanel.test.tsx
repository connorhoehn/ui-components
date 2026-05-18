import { render, screen, fireEvent } from '@testing-library/react';
import AlertsPanel, { type Alert } from '../AlertsPanel';

function makeAlert(overrides: Partial<Alert> = {}): Alert {
  return {
    id: 'a1',
    severity: 'info',
    message: 'hello world',
    timestamp: new Date('2026-05-18T12:00:00Z').toISOString(),
    ...overrides,
  };
}

describe('AlertsPanel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-18T12:00:30Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the empty state when no alerts are provided', () => {
    render(<AlertsPanel alerts={[]} />);
    expect(screen.getByTestId('alerts-empty')).toBeInTheDocument();
    expect(screen.getByText('No active alerts')).toBeInTheDocument();
  });

  it('renders one alert-item per alert', () => {
    render(
      <AlertsPanel
        alerts={[
          makeAlert({ id: 'a1', message: 'first' }),
          makeAlert({ id: 'a2', message: 'second' }),
          makeAlert({ id: 'a3', message: 'third' }),
        ]}
      />,
    );
    expect(screen.getAllByTestId('alert-item')).toHaveLength(3);
    expect(screen.getByText('first')).toBeInTheDocument();
    expect(screen.getByText('third')).toBeInTheDocument();
  });

  it('renders the severity icon for info / warning / error / critical', () => {
    render(
      <AlertsPanel
        alerts={[
          makeAlert({ id: 'i', severity: 'info', message: 'i' }),
          makeAlert({ id: 'w', severity: 'warning', message: 'w' }),
          makeAlert({ id: 'e', severity: 'error', message: 'e' }),
          makeAlert({ id: 'c', severity: 'critical', message: 'c' }),
        ]}
      />,
    );
    expect(screen.getByText('ℹ')).toBeInTheDocument();
    expect(screen.getByText('⚠')).toBeInTheDocument();
    expect(screen.getAllByText('✕')).toHaveLength(2);
  });

  it('applies severity-specific left-border classes', () => {
    render(
      <AlertsPanel
        alerts={[
          makeAlert({ id: 'w', severity: 'warning' }),
          makeAlert({ id: 'e', severity: 'error' }),
        ]}
      />,
    );
    const items = screen.getAllByTestId('alert-item');
    expect(items[0].className).toContain('border-l-state-awaiting');
    expect(items[1].className).toContain('border-l-danger');
  });

  it('renders category prefix in the label row when provided', () => {
    render(
      <AlertsPanel
        alerts={[makeAlert({ category: 'pipeline', message: 'failed' })]}
      />,
    );
    expect(screen.getByText(/pipeline ·/)).toBeInTheDocument();
  });

  it('shows "just now" for timestamps under one minute old', () => {
    render(<AlertsPanel alerts={[makeAlert()]} />);
    expect(screen.getByText(/just now/)).toBeInTheDocument();
  });

  it('shows minutes-ago bucket between 60s and 1h', () => {
    vi.setSystemTime(new Date('2026-05-18T12:05:00Z'));
    render(
      <AlertsPanel
        alerts={[
          makeAlert({
            timestamp: new Date('2026-05-18T12:00:00Z').toISOString(),
          }),
        ]}
      />,
    );
    expect(screen.getByText(/5m ago/)).toBeInTheDocument();
  });

  it('shows hours-ago bucket between 1h and 24h', () => {
    vi.setSystemTime(new Date('2026-05-18T15:00:00Z'));
    render(
      <AlertsPanel
        alerts={[
          makeAlert({
            timestamp: new Date('2026-05-18T12:00:00Z').toISOString(),
          }),
        ]}
      />,
    );
    expect(screen.getByText(/3h ago/)).toBeInTheDocument();
  });

  it('shows days-ago bucket below 3 days', () => {
    vi.setSystemTime(new Date('2026-05-20T12:00:00Z'));
    render(
      <AlertsPanel
        alerts={[
          makeAlert({
            timestamp: new Date('2026-05-18T12:00:00Z').toISOString(),
          }),
        ]}
      />,
    );
    expect(screen.getByText(/2d ago/)).toBeInTheDocument();
  });

  it('omits the dismiss button when onDismiss is not provided', () => {
    render(<AlertsPanel alerts={[makeAlert()]} />);
    expect(screen.queryByTestId('alert-dismiss')).not.toBeInTheDocument();
  });

  it('invokes onDismiss with the alert id when the dismiss button is clicked', () => {
    const onDismiss = vi.fn();
    render(
      <AlertsPanel
        alerts={[makeAlert({ id: 'alert-XYZ' })]}
        onDismiss={onDismiss}
      />,
    );
    fireEvent.click(screen.getByTestId('alert-dismiss'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledWith('alert-XYZ');
  });
});
