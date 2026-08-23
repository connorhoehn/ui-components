// Both of these are "fall back to something sane" components. MetricsGraph
// accepts either a single `data` array or a `series` list and has to pick one
// without ever rendering an empty chart frame that looks like a zero reading —
// an empty series list must fall through to the single-array form, and only
// with neither does it say "No data". HealthCell is the tile a whole grid is
// built from: its status drives the dot colour, the surface tint AND the
// default test id, and its detail line falls back to the status word so a
// tile is never blank.

import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MetricsGraph from '../MetricsGraph';
import HealthCell, { type HealthStatus } from '../HealthCell';

describe('MetricsGraph source selection', () => {
  it('says so plainly when given neither data nor series', () => {
    render(<MetricsGraph title="Throughput" />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('falls back to the single data array when series is present but empty', () => {
    render(<MetricsGraph title="Throughput" data={[1, 2, 3]} series={[]} />);
    expect(screen.queryByText('No data')).toBeNull();
    // The synthesized series borrows the graph title as its label.
    expect(screen.getAllByTitle('Throughput')).toHaveLength(1);
  });

  it('prefers an explicit series list over the single array', () => {
    render(
      <MetricsGraph
        title="Throughput"
        data={[9, 9, 9]}
        series={[{ label: 'p50', data: [1] }, { label: 'p99', data: [2] }]}
      />,
    );
    expect(screen.getByTitle('p50')).toBeInTheDocument();
    expect(screen.getByTitle('p99')).toBeInTheDocument();
    expect(screen.queryByTitle('Throughput')).toBeNull();
  });

  it('an empty data array still counts as data, not as "no data"', () => {
    render(<MetricsGraph title="Throughput" data={[]} />);
    expect(screen.queryByText('No data')).toBeNull();
  });

  it('shows the y-axis label only when one is given', () => {
    const { rerender } = render(<MetricsGraph title="Throughput" data={[1]} />);
    expect(screen.queryByText('req/s')).toBeNull();
    rerender(<MetricsGraph title="Throughput" data={[1]} yLabel="req/s" />);
    expect(screen.getByText('req/s')).toBeInTheDocument();
  });
});

describe('HealthCell', () => {
  it.each(['healthy', 'degraded', 'down', 'unknown'] as HealthStatus[])(
    'exposes %s as a data attribute so a grid can be asserted on without colours',
    (status) => {
      render(<HealthCell status={status} label="node-1" />);
      expect(screen.getByTestId(`health-cell-${status}`)).toHaveAttribute('data-status', status);
    },
  );

  it('derives its default test id from the status, and lets a caller override it', () => {
    render(<HealthCell status="down" label="node-1" data-testid="my-tile" />);
    expect(screen.getByTestId('my-tile')).toBeInTheDocument();
    expect(screen.queryByTestId('health-cell-down')).toBeNull();
  });

  it('falls back to the status word when no reason is supplied', () => {
    render(<HealthCell status="degraded" label="node-1" />);
    expect(screen.getByTestId('health-cell-degraded')).toHaveTextContent('degraded');
  });

  it('prefers an explicit reason over the status word', () => {
    render(<HealthCell status="down" label="node-1" reason="heartbeat timeout" />);
    const tile = screen.getByTestId('health-cell-down');
    expect(tile).toHaveTextContent('heartbeat timeout');
    expect(within(tile).queryByText('down')).toBeNull();
  });

  it('labels the status dot for assistive tech rather than relying on colour alone', () => {
    render(<HealthCell status="down" label="node-1" />);
    expect(screen.getByLabelText('down')).toBeInTheDocument();
  });

  it('tightens padding in dense mode without changing anything else', () => {
    const { rerender } = render(<HealthCell status="healthy" label="n" />);
    expect(screen.getByTestId('health-cell-healthy')).toHaveClass('py-2.5');
    rerender(<HealthCell status="healthy" label="n" dense />);
    expect(screen.getByTestId('health-cell-healthy')).toHaveClass('py-2');
  });

  it('accepts a node, not just a string, for both label and reason', () => {
    render(<HealthCell status="healthy" label={<b>node-1</b>} reason={<em>all good</em>} />);
    expect(screen.getByText('node-1').tagName).toBe('B');
    expect(screen.getByText('all good').tagName).toBe('EM');
  });
});
