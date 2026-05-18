import { render, screen, fireEvent } from '@testing-library/react';
import NodeGridTile, { type NodeSummary } from '../NodeGridTile';

function makeNode(overrides: Partial<NodeSummary> = {}): NodeSummary {
  return {
    id: 'node-A',
    status: 'healthy',
    cpu: 42,
    memoryMb: 512,
    connections: 7,
    activeRuns: 3,
    cpuHistory: [10, 20, 30],
    ...overrides,
  };
}

describe('NodeGridTile', () => {
  it('renders the node id', () => {
    render(<NodeGridTile node={makeNode({ id: 'node-XYZ' })} />);
    expect(screen.getByText('node-XYZ')).toBeInTheDocument();
  });

  it('renders the status indicator with correct aria-label', () => {
    render(<NodeGridTile node={makeNode({ status: 'degraded' })} />);
    expect(screen.getByLabelText('status degraded')).toBeInTheDocument();
  });

  it('renders role and region tags when both present', () => {
    render(
      <NodeGridTile
        node={makeNode({ role: 'worker', region: 'us-east-1' })}
      />,
    );
    expect(screen.getByText('worker · us-east-1')).toBeInTheDocument();
  });

  it('omits the role/region row when both are missing', () => {
    const { container } = render(<NodeGridTile node={makeNode()} />);
    expect(container.textContent).not.toContain('·');
  });

  it('renders CPU, MEM, CONN, RUNS labels', () => {
    render(<NodeGridTile node={makeNode()} />);
    expect(screen.getByText('CPU')).toBeInTheDocument();
    expect(screen.getByText('MEM')).toBeInTheDocument();
    expect(screen.getByText('CONN')).toBeInTheDocument();
    expect(screen.getByText('RUNS')).toBeInTheDocument();
  });

  it('rounds CPU and formats MEM under 1GB as M', () => {
    render(<NodeGridTile node={makeNode({ cpu: 42.7, memoryMb: 768 })} />);
    expect(screen.getByText('43%')).toBeInTheDocument();
    expect(screen.getByText('768M')).toBeInTheDocument();
  });

  it('formats MEM at or above 1024MB as G with one decimal', () => {
    render(<NodeGridTile node={makeNode({ memoryMb: 1536 })} />);
    expect(screen.getByText('1.5G')).toBeInTheDocument();
  });

  it('shows "— idle" when activeRuns is zero', () => {
    render(<NodeGridTile node={makeNode({ activeRuns: 0 })} />);
    expect(screen.getByText('— idle')).toBeInTheDocument();
  });

  it('shows the numeric active runs when greater than zero', () => {
    render(<NodeGridTile node={makeNode({ activeRuns: 5 })} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('omits the kill button when onKill is not provided', () => {
    render(<NodeGridTile node={makeNode()} />);
    expect(screen.queryByTestId('node-kill-btn')).not.toBeInTheDocument();
  });

  it('renders the kill button when onKill is provided and stops propagation', () => {
    const onKill = vi.fn();
    const onClick = vi.fn();
    render(<NodeGridTile node={makeNode()} onClick={onClick} onKill={onKill} />);
    fireEvent.click(screen.getByTestId('node-kill-btn'));
    expect(onKill).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('invokes onClick when the tile container is clicked', () => {
    const onClick = vi.fn();
    render(<NodeGridTile node={makeNode()} onClick={onClick} />);
    fireEvent.click(screen.getByTestId('node-grid-tile'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies the primary border when selected', () => {
    render(<NodeGridTile node={makeNode()} selected onClick={() => {}} />);
    const tile = screen.getByTestId('node-grid-tile');
    expect(tile.className).toContain('border-primary');
  });

  it('uses status-derived border when not selected', () => {
    render(<NodeGridTile node={makeNode({ status: 'dead' })} />);
    const tile = screen.getByTestId('node-grid-tile');
    expect(tile.className).toContain('border-state-failed');
  });
});
