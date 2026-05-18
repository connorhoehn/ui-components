import { render, screen, fireEvent } from '@testing-library/react';
import KPICard from '../KPICard';

describe('KPICard', () => {
  it('renders the title', () => {
    render(<KPICard title="Requests/sec" value={42} />);
    expect(screen.getByText('Requests/sec')).toBeInTheDocument();
  });

  it('formats a numeric value with toLocaleString', () => {
    render(<KPICard title="Total" value={1234567} />);
    expect(screen.getByText((1234567).toLocaleString())).toBeInTheDocument();
  });

  it('renders a string value verbatim (no formatting)', () => {
    render(<KPICard title="Status" value="OK" />);
    expect(screen.getByText('OK')).toBeInTheDocument();
  });

  it('renders an up delta with absolute value', () => {
    render(
      <KPICard
        title="Throughput"
        value={100}
        delta={{ value: -12.5, direction: 'up' }}
      />,
    );
    expect(screen.getByText(/▲ 12.5%/)).toBeInTheDocument();
  });

  it('renders a down delta with absolute value', () => {
    render(
      <KPICard
        title="Errors"
        value={5}
        delta={{ value: 8, direction: 'down' }}
      />,
    );
    expect(screen.getByText(/▼ 8%/)).toBeInTheDocument();
  });

  it('renders a sparkline svg when sparklineData is non-empty', () => {
    const { container } = render(
      <KPICard title="Trend" value={10} sparklineData={[1, 2, 3, 4, 5]} />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('does not render a sparkline when sparklineData is empty', () => {
    const { container } = render(
      <KPICard title="Trend" value={10} sparklineData={[]} />,
    );
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('invokes onClick when the card is clicked', () => {
    const onClick = vi.fn();
    render(<KPICard title="Click me" value={1} onClick={onClick} />);
    fireEvent.click(screen.getByTestId('kpi-card'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('exposes role="button" and tabIndex=0 when clickable', () => {
    render(<KPICard title="Click me" value={1} onClick={() => {}} />);
    const card = screen.getByTestId('kpi-card');
    expect(card).toHaveAttribute('role', 'button');
    expect(card).toHaveAttribute('tabindex', '0');
  });

  it('is non-interactive when onClick is omitted', () => {
    render(<KPICard title="Static" value={1} />);
    const card = screen.getByTestId('kpi-card');
    expect(card).not.toHaveAttribute('role');
    expect(card).not.toHaveAttribute('tabindex');
    expect(card.className).toContain('cursor-default');
  });

  it('activates onClick on Enter and Space keypress', () => {
    const onClick = vi.fn();
    render(<KPICard title="Key" value={1} onClick={onClick} />);
    const card = screen.getByTestId('kpi-card');
    fireEvent.keyDown(card, { key: 'Enter' });
    fireEvent.keyDown(card, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
