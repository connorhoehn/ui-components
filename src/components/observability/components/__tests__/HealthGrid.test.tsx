import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HealthGrid, { HealthCell, type HealthGridEntry } from '../HealthGrid';

const nodes: HealthGridEntry[] = [
  { id: 'api', label: 'API Gateway', status: 'healthy' },
  { id: 'redis', label: 'Redis', status: 'degraded', reason: 'lag 220ms' },
  { id: 'pg', label: 'Postgres', status: 'down', reason: 'connection refused' },
];

describe('HealthCell', () => {
  it('renders label + reason + status data attr', () => {
    render(<HealthCell status="degraded" label="Redis" reason="lag 220ms" />);
    const cell = screen.getByTestId('health-cell-degraded');
    expect(cell.getAttribute('data-status')).toBe('degraded');
    expect(screen.getByText('Redis')).toBeInTheDocument();
    expect(screen.getByText('lag 220ms')).toBeInTheDocument();
  });

  it('falls back to the status string when no reason', () => {
    render(<HealthCell status="healthy" label="API" />);
    expect(screen.getByText('healthy')).toBeInTheDocument();
  });

  it('renders distinct testids for each status', () => {
    const statuses = ['healthy', 'degraded', 'down', 'unknown'] as const;
    for (const s of statuses) {
      const { unmount } = render(<HealthCell status={s} label="x" />);
      expect(screen.getByTestId(`health-cell-${s}`)).toBeInTheDocument();
      unmount();
    }
  });

  it('applies dense padding when dense', () => {
    render(<HealthCell status="healthy" label="x" dense />);
    const cell = screen.getByTestId('health-cell-healthy');
    expect(cell.className).toContain('py-2');
    expect(cell.className).not.toContain('py-2.5');
  });
});

describe('HealthGrid', () => {
  it('renders all nodes in a grid', () => {
    render(<HealthGrid items={nodes} />);
    expect(screen.getByText('API Gateway')).toBeInTheDocument();
    expect(screen.getByText('Redis')).toBeInTheDocument();
    expect(screen.getByText('Postgres')).toBeInTheDocument();
  });

  it('defaults to 3 columns', () => {
    render(<HealthGrid items={nodes} />);
    const grid = screen.getByRole('list');
    expect(grid.className).toContain('sm:grid-cols-3');
  });

  it('honors each column count', () => {
    const counts = [1, 2, 3, 4, 6] as const;
    for (const c of counts) {
      const { unmount } = render(<HealthGrid items={nodes} columns={c} />);
      expect(screen.getByRole('list').className).toContain(`sm:grid-cols-${c}`);
      unmount();
    }
  });

  it('wraps in a Card when title is provided', () => {
    render(<HealthGrid items={nodes} title="Cluster health" />);
    expect(screen.getByText('Cluster health')).toBeInTheDocument();
  });

  it('renders default empty state when items=[]', () => {
    render(<HealthGrid items={[]} />);
    expect(screen.getByText('No nodes reporting.')).toBeInTheDocument();
  });

  it('renders custom empty slot', () => {
    render(<HealthGrid items={[]} empty={<div>nothing</div>} />);
    expect(screen.getByText('nothing')).toBeInTheDocument();
  });

  it('renders headerSlot when title is given', () => {
    render(
      <HealthGrid
        items={nodes}
        title="Cluster"
        headerSlot={<span data-testid="meta">6 nodes</span>}
      />,
    );
    expect(screen.getByTestId('meta')).toBeInTheDocument();
  });
});
