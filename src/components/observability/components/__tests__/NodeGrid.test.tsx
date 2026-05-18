import { render, screen, fireEvent } from '@testing-library/react';
import NodeGrid from '../NodeGrid';
import type { NodeSummary } from '../NodeGridTile';

function makeNode(overrides: Partial<NodeSummary> = {}): NodeSummary {
  return {
    id: 'node-A',
    status: 'healthy',
    cpu: 10,
    memoryMb: 256,
    connections: 1,
    activeRuns: 0,
    cpuHistory: [1, 2, 3],
    ...overrides,
  };
}

describe('NodeGrid', () => {
  it('renders the empty state when nodes is empty', () => {
    render(<NodeGrid nodes={[]} />);
    expect(screen.getByTestId('node-grid-empty')).toBeInTheDocument();
    expect(screen.getByText('No nodes connected')).toBeInTheDocument();
  });

  it('renders one NodeGridTile per node when populated', () => {
    render(
      <NodeGrid
        nodes={[
          makeNode({ id: 'n1' }),
          makeNode({ id: 'n2' }),
          makeNode({ id: 'n3' }),
        ]}
      />,
    );
    expect(screen.getAllByTestId('node-grid-tile')).toHaveLength(3);
    expect(screen.getByText('n1')).toBeInTheDocument();
    expect(screen.getByText('n2')).toBeInTheDocument();
    expect(screen.getByText('n3')).toBeInTheDocument();
  });

  it('invokes onSelect with node id when a tile is clicked', () => {
    const onSelect = vi.fn();
    render(
      <NodeGrid
        nodes={[makeNode({ id: 'node-XYZ' })]}
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByTestId('node-grid-tile'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('node-XYZ');
  });

  it('does not wire tile click when onSelect is not provided', () => {
    render(<NodeGrid nodes={[makeNode()]} />);
    const tile = screen.getByTestId('node-grid-tile');
    expect(tile.className).toContain('cursor-default');
  });

  it('applies selected styling to the tile matching selectedId', () => {
    render(
      <NodeGrid
        nodes={[makeNode({ id: 'n1' }), makeNode({ id: 'n2' })]}
        selectedId="n2"
        onSelect={() => {}}
      />,
    );
    const [tile1, tile2] = screen.getAllByTestId('node-grid-tile');
    expect(tile1.className).not.toContain('border-primary');
    expect(tile2.className).toContain('border-primary');
  });
});
