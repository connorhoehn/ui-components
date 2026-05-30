import { fireEvent, render, screen } from '@testing-library/react';
import { StatCard } from '../StatCard';

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard label="Active users" value={1284} />);
    expect(screen.getByText('Active users')).toBeInTheDocument();
    expect(screen.getByText('1284')).toBeInTheDocument();
  });

  it('renders a hint when provided', () => {
    render(<StatCard label="Errors" value={0} hint="last 24h" />);
    expect(screen.getByText('last 24h')).toBeInTheDocument();
  });

  describe('delta', () => {
    it('renders an up arrow with positive tone by default', () => {
      render(
        <StatCard
          label="Runs today"
          value={42}
          delta={{ value: 12, direction: 'up' }}
        />,
      );
      const node = screen.getByTestId('stat-card-delta');
      expect(node).toHaveAttribute('data-direction', 'up');
      expect(node).toHaveAttribute('data-tone', 'positive');
      expect(node.textContent).toContain('▲');
      expect(node.textContent).toContain('+12%');
      expect(node.className).toContain('color-success');
    });

    it('renders a down arrow with negative tone by default', () => {
      render(
        <StatCard
          label="Throughput"
          value={87}
          delta={{ value: 4, direction: 'down' }}
        />,
      );
      const node = screen.getByTestId('stat-card-delta');
      expect(node).toHaveAttribute('data-direction', 'down');
      expect(node).toHaveAttribute('data-tone', 'negative');
      expect(node.textContent).toContain('▼');
      expect(node.textContent).toContain('-4%');
      expect(node.className).toContain('color-danger');
    });

    it('honors a tone override (down + positive for "failure trending down is good")', () => {
      render(
        <StatCard
          label="Failed (24h)"
          value={3}
          delta={{ value: 4, direction: 'down', tone: 'positive' }}
        />,
      );
      const node = screen.getByTestId('stat-card-delta');
      expect(node).toHaveAttribute('data-tone', 'positive');
      expect(node.textContent).toContain('▼');
      expect(node.textContent).toContain('-4%');
      expect(node.className).toContain('color-success');
    });

    it('renders the neutral tone when requested', () => {
      render(
        <StatCard
          label="Steady"
          value={50}
          delta={{ value: 0, direction: 'up', tone: 'neutral' }}
        />,
      );
      expect(screen.getByTestId('stat-card-delta')).toHaveAttribute('data-tone', 'neutral');
    });

    it('uses the suffix override for non-percent units', () => {
      render(
        <StatCard
          label="p95 latency"
          value="180 ms"
          delta={{ value: 12, direction: 'down', suffix: ' ms' }}
        />,
      );
      expect(screen.getByTestId('stat-card-delta').textContent).toContain('-12 ms');
    });

    it('omits the delta line when no delta is passed', () => {
      render(<StatCard label="x" value={1} />);
      expect(screen.queryByTestId('stat-card-delta')).toBeNull();
    });
  });

  describe('sparklineData', () => {
    it('renders a sparkline when data is non-empty', () => {
      render(
        <StatCard
          label="Runs today"
          value={42}
          sparklineData={[1, 2, 3, 5, 4, 6, 7]}
        />,
      );
      expect(screen.getByTestId('sparkline')).toBeInTheDocument();
    });

    it('does not render a sparkline for an empty array', () => {
      render(<StatCard label="x" value={1} sparklineData={[]} />);
      expect(screen.queryByTestId('sparkline')).toBeNull();
    });

    it('does not render a sparkline when omitted', () => {
      render(<StatCard label="x" value={1} />);
      expect(screen.queryByTestId('sparkline')).toBeNull();
    });
  });

  describe('interaction', () => {
    it('renders a <button> and fires onClick when no `to` is set', () => {
      const onClick = vi.fn();
      render(<StatCard label="x" value={1} onClick={onClick} data-testid="card" />);
      const node = screen.getByTestId('card');
      expect(node.tagName).toBe('BUTTON');
      fireEvent.click(node);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('renders an <a href> when `to` is set', () => {
      render(<StatCard label="x" value={1} to="/runs" data-testid="card" />);
      const node = screen.getByTestId('card');
      expect(node.tagName).toBe('A');
      expect(node).toHaveAttribute('href', '/runs');
    });

    it('forwards `to` to a custom `as` component (e.g. router Link)', () => {
      function FakeLink({ to, children, ...rest }: { to: string; children: React.ReactNode }) {
        return (
          <span data-link-to={to} {...rest}>
            {children}
          </span>
        );
      }
      render(
        <StatCard label="x" value={1} to="/runs" as={FakeLink} data-testid="card" />,
      );
      const node = screen.getByTestId('card');
      expect(node).toHaveAttribute('data-link-to', '/runs');
    });
  });

  it('applies the accent variant', () => {
    render(<StatCard label="x" value={1} accent data-testid="card" />);
    expect(screen.getByTestId('card').className).toContain('color-primary');
  });

  it('applies the danger variant', () => {
    render(<StatCard label="x" value={1} danger data-testid="card" />);
    expect(screen.getByTestId('card').className).toContain('color-danger');
  });

  it('renders value in monospace when mono is set', () => {
    const { container } = render(<StatCard label="id" value="abc-123" mono />);
    expect(container.querySelector('.font-mono')).not.toBeNull();
  });
});
