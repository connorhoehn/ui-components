import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WorkGraph } from '../WorkGraph';
import type {
  WorkGraphEdgeData,
  WorkGraphNodeData,
  WorkGraphProps,
  WorkGraphViewport,
} from '../types';

vi.mock('@xyflow/react', () => ({
  ReactFlow: ({
    nodes,
    edges,
    nodeTypes,
    edgeTypes,
    viewport,
    onViewportChange,
    onPaneClick,
    children,
  }: any) => (
    <div data-testid="react-flow" data-viewport={JSON.stringify(viewport)}>
      <button type="button" onClick={() => onViewportChange({ x: 42, y: -18, zoom: 1.4 })}>Move viewport</button>
      <button type="button" onClick={onPaneClick}>Clear canvas selection</button>
      {nodes.map((node: any) => {
        const Renderer = nodeTypes[node.type];
        return (
          <div key={node.id} data-testid={`flow-node-position-${node.id}`} data-position={`${node.position.x},${node.position.y}`}>
            <Renderer {...node} />
          </div>
        );
      })}
      {edges.map((edge: any) => {
        const Renderer = edgeTypes[edge.type];
        return (
          <Renderer
            key={edge.id}
            {...edge}
            sourceX={0}
            sourceY={0}
            targetX={100}
            targetY={100}
            sourcePosition="right"
            targetPosition="left"
          />
        );
      })}
      {children}
    </div>
  ),
  Background: () => <div data-testid="flow-background" />,
  Controls: () => <div data-testid="flow-controls" />,
  Handle: () => <span data-testid="flow-handle" />,
  BaseEdge: ({ id, className }: any) => <svg data-testid={`flow-edge-path-${id}`} className={className} />,
  EdgeLabelRenderer: ({ children }: any) => children,
  getBezierPath: () => ['M0 0 C25 0 75 100 100 100', 50, 50],
  Position: { Left: 'left', Right: 'right' },
}));

const updatedAt = '2026-09-19T15:00:00.000Z';

function node(overrides: Partial<WorkGraphNodeData> & Pick<WorkGraphNodeData, 'id' | 'kind' | 'title'>): WorkGraphNodeData {
  return {
    status: 'running',
    disclosure: 'summary',
    updatedAt,
    capabilities: [],
    ...overrides,
  };
}

const nodes: WorkGraphNodeData[] = [
  node({ id: 'project-1', kind: 'project', title: 'Launch workspace' }),
  node({ id: 'terminal-1', kind: 'terminal', title: 'Frontend terminal', capabilities: ['observe-terminal'] }),
  node({ id: 'terminal-2', kind: 'terminal', title: 'API terminal', status: 'waiting' }),
  node({ id: 'agent-1', kind: 'agent', title: 'Implementation agent' }),
  node({ id: 'document-1', kind: 'document', title: 'Launch notes', capabilities: ['view-document'] }),
  node({ id: 'meeting-1', kind: 'meeting', title: 'Launch sync', status: 'completed', capabilities: ['join-meeting'] }),
];

const edges: WorkGraphEdgeData[] = [
  { id: 'project-terminal-1', fromId: 'project-1', toId: 'terminal-1', relation: 'works-on', status: 'running', disclosure: 'summary', updatedAt, capabilities: [] },
  { id: 'project-terminal-2', fromId: 'project-1', toId: 'terminal-2', relation: 'works-on', status: 'waiting', disclosure: 'summary', updatedAt, capabilities: [] },
  { id: 'terminal-agent', fromId: 'terminal-1', toId: 'agent-1', relation: 'runs-in', status: 'running', disclosure: 'summary', updatedAt, capabilities: [] },
  { id: 'agent-document', fromId: 'agent-1', toId: 'document-1', relation: 'produced', status: 'completed', disclosure: 'details', updatedAt, capabilities: [] },
  { id: 'meeting-document', fromId: 'meeting-1', toId: 'document-1', relation: 'discussed', status: 'completed', disclosure: 'summary', updatedAt, capabilities: [] },
];

const viewport: WorkGraphViewport = { x: 8, y: 12, zoom: 0.9 };

function props(overrides: Partial<WorkGraphProps> = {}): WorkGraphProps {
  return {
    nodes,
    edges,
    selection: null,
    viewport,
    onSelectionChange: vi.fn(),
    onViewportChange: vi.fn(),
    ...overrides,
  };
}

describe('WorkGraph', () => {
  it('renders a representative multi-source graph and selects both nodes and edges', () => {
    const onSelectionChange = vi.fn();
    render(<WorkGraph {...props({ onSelectionChange })} />);

    expect(screen.getAllByRole('group')).toHaveLength(nodes.length);
    expect(screen.getAllByText('Frontend terminal').length).toBeGreaterThan(0);
    expect(screen.getAllByText('API terminal').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Implementation agent').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Launch notes').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Launch sync').length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: 'Accessible work graph' })).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('work-node-document-1'));
    fireEvent.click(screen.getByTestId('work-edge-agent-document'));

    expect(onSelectionChange).toHaveBeenNthCalledWith(1, { kind: 'node', id: 'document-1' });
    expect(onSelectionChange).toHaveBeenNthCalledWith(2, { kind: 'edge', id: 'agent-document' });
  });

  it('keeps deterministic positions and the controlled viewport through status-only updates', () => {
    const onViewportChange = vi.fn();
    const { rerender } = render(<WorkGraph {...props({ onViewportChange, className: 'w-[320px]' })} />);
    const position = screen.getByTestId('flow-node-position-terminal-1').getAttribute('data-position');
    expect(screen.getByTestId('react-flow')).toHaveAttribute('data-viewport', JSON.stringify(viewport));

    const updatedNodes = nodes.map((entry) => entry.id === 'terminal-1'
      ? { ...entry, status: 'completed' as const, updatedAt: '2026-09-19T16:00:00.000Z' }
      : entry);
    rerender(<WorkGraph {...props({ nodes: updatedNodes, onViewportChange, className: 'w-[1200px]' })} />);

    expect(screen.getByTestId('flow-node-position-terminal-1')).toHaveAttribute('data-position', position);
    expect(screen.getByTestId('react-flow')).toHaveAttribute('data-viewport', JSON.stringify(viewport));
    expect(screen.getByRole('region', { name: 'Shared work graph' })).toHaveClass('w-[1200px]');

    fireEvent.click(screen.getByRole('button', { name: 'Move viewport' }));
    expect(onViewportChange).toHaveBeenCalledWith({ x: 42, y: -18, zoom: 1.4 });
  });

  it('clears a selected entity when a live update removes it', async () => {
    const onSelectionChange = vi.fn();
    const selection = { kind: 'node' as const, id: 'document-1' };
    const { rerender } = render(<WorkGraph {...props({ selection, onSelectionChange })} />);
    expect(onSelectionChange).not.toHaveBeenCalled();

    rerender(
      <WorkGraph
        {...props({
          nodes: nodes.filter((entry) => entry.id !== 'document-1'),
          edges: edges.filter((edge) => edge.fromId !== 'document-1' && edge.toId !== 'document-1'),
          selection,
          onSelectionChange,
        })}
      />,
    );

    await waitFor(() => expect(onSelectionChange).toHaveBeenCalledWith(null));
    expect(screen.queryByText('Launch notes')).not.toBeInTheDocument();

    onSelectionChange.mockClear();
    const edgeSelection = { kind: 'edge' as const, id: 'terminal-agent' };
    rerender(<WorkGraph {...props({ selection: edgeSelection, onSelectionChange })} />);
    expect(onSelectionChange).not.toHaveBeenCalled();
    rerender(
      <WorkGraph
        {...props({
          edges: edges.filter((edge) => edge.id !== edgeSelection.id),
          selection: edgeSelection,
          onSelectionChange,
        })}
      />,
    );
    await waitFor(() => expect(onSelectionChange).toHaveBeenCalledWith(null));
  });

  it('renders loading, empty, error/retry, and partial-source states', () => {
    const onRetry = vi.fn();
    const { rerender } = render(<WorkGraph {...props({ nodes: [], edges: [], state: 'loading' })} />);
    expect(screen.getByTestId('work-graph-loading')).toHaveTextContent('Loading shared work');

    rerender(<WorkGraph {...props({ nodes: [], edges: [], state: 'empty' })} />);
    expect(screen.getByTestId('work-graph-empty')).toHaveTextContent('No shared work');

    rerender(<WorkGraph {...props({ state: 'error', errorMessage: 'Source timed out', onRetry })} />);
    expect(screen.getByTestId('work-graph-error')).toHaveTextContent('Source timed out');
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledOnce();

    rerender(
      <WorkGraph
        {...props({
          state: 'partial',
          sources: [{ source: 'meeting', health: 'delayed', checkedAt: updatedAt, message: 'Meetings are catching up.' }],
        })}
      />,
    );
    expect(screen.getByTestId('work-graph-partial')).toHaveTextContent('Meetings are catching up.');
    expect(screen.getByTestId('work-graph-canvas')).toBeInTheDocument();
  });

  it('animates only current running relationships and keeps the list as a keyboard alternative', () => {
    render(<WorkGraph {...props()} />);
    expect(screen.getByTestId('work-edge-motion-project-terminal-1')).toBeInTheDocument();
    expect(screen.queryByTestId('work-edge-motion-agent-document')).not.toBeInTheDocument();

    const relationship = screen.getByRole('button', { name: /Relationship:.*produced/i });
    relationship.focus();
    expect(relationship).toHaveFocus();
  });
});
