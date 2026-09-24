import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TypedNodeCanvas, layoutTypedNodes, rankTypedNodes, type TypedCanvasEdge, type TypedCanvasNode } from '../TypedNodeCanvas';

const flow = { zoomIn: vi.fn(), zoomOut: vi.fn(), fitView: vi.fn() };
// The pane size xyflow measures — tests change it to simulate a resize.
const size = { width: 800, height: 400 };
let lastProps: any = null;

vi.mock('@xyflow/react', () => ({
  ReactFlow: (props: any) => {
    lastProps = props;
    const { nodes, edges, nodeTypes, edgeTypes, children } = props;
    return (
      <div data-testid="react-flow">
        {nodes.map((node: any) => {
          const Renderer = nodeTypes[node.type];
          return (
            <div key={node.id} data-testid={`flow-node-${node.id}`} data-position={`${node.position.x},${node.position.y}`}>
              <Renderer {...node} />
            </div>
          );
        })}
        <svg>
          {edges.map((edge: any) => {
            const Renderer = edgeTypes[edge.type];
            return (
              <Renderer
                key={edge.id}
                {...edge}
                sourceX={0}
                sourceY={0}
                targetX={100}
                targetY={0}
                sourcePosition="right"
                targetPosition="left"
              />
            );
          })}
        </svg>
        {children}
      </div>
    );
  },
  Handle: () => <span data-testid="flow-handle" />,
  getSmoothStepPath: () => ['M0 0 L100 0', 50, 0],
  useReactFlow: () => flow,
  useViewport: () => ({ x: 0, y: 0, zoom: 0.8 }),
  useStore: (select: (st: { width: number; height: number }) => number) => select(size),
  Position: { Left: 'left', Right: 'right', Top: 'top', Bottom: 'bottom' },
}));

let reduced = false;
beforeEach(() => {
  reduced = false;
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('reduce') ? reduced : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
  window.matchMedia = globalThis.matchMedia;
});
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

type Tier = TypedCanvasNode<'tier' | 'library', { count: number }>;

const NODES: Tier[] = [
  { id: 'L2', kind: 'tier', data: { count: 11 }, label: 'Guides & findings' },
  { id: 'L0', kind: 'tier', data: { count: 304 }, label: 'Run notes' },
  { id: 'L1', kind: 'tier', data: { count: 22 }, label: 'Patterns' },
  { id: 'lib', kind: 'library', data: { count: 7 }, label: 'Library', rank: 2, x: 780, y: 280 },
];

const EDGES: TypedCanvasEdge[] = [
  { id: 'c1', from: 'L0', to: 'L1', label: 'Compact', detail: '13 notes → 4 patterns', marker: { label: 'Compaction L0 to L1, completed' }, animated: true },
  { id: 'c2', from: 'L1', to: 'L2', label: 'Compact', tone: 'warning', marker: { label: 'Compaction L1 to L2, stalled', tone: 'warning' } },
  { id: 'p', from: 'L2', to: 'lib', label: 'Publish' },
  { id: 'dangling', from: 'L2', to: 'nowhere' },
];

const renderNode = (node: Tier, { selected }: { selected: boolean }) => (
  <div data-selected-render={selected ? 'yes' : 'no'}>
    {node.label} {node.data.count}
    <a href={`#${node.id}`}>Browse</a>
  </div>
);

describe('layout', () => {
  it('ranks by longest path, honouring an explicit rank', () => {
    const rank = rankTypedNodes(NODES, EDGES);
    expect(rank.get('L0')).toBe(0);
    expect(rank.get('L1')).toBe(1);
    expect(rank.get('L2')).toBe(2);
    expect(rank.get('lib')).toBe(2);
  });

  it('places ltr columns and keeps explicit coordinates; manual uses x/y only', () => {
    const ltr = layoutTypedNodes(NODES, EDGES, { nodeWidth: 200, columnGap: 100 });
    expect(ltr.get('L0')).toEqual({ x: 0, y: 0 });
    expect(ltr.get('L1')).toEqual({ x: 300, y: 0 });
    expect(ltr.get('L2')).toEqual({ x: 600, y: 0 });
    expect(ltr.get('lib')).toEqual({ x: 780, y: 280 });
    const manual = layoutTypedNodes(NODES, EDGES, { layout: 'manual' });
    expect(manual.get('L0')).toEqual({ x: 0, y: 0 });
    expect(manual.get('lib')).toEqual({ x: 780, y: 280 });
  });
});

describe('TypedNodeCanvas', () => {
  it('draws host-rendered nodes in reading order as named, focusable groups', () => {
    render(<TypedNodeCanvas nodes={NODES} edges={EDGES} renderNode={renderNode} aria-label="Tier graph" />);
    expect(screen.getByRole('region', { name: 'Tier graph' })).toBeTruthy();
    const groups = screen.getAllByRole('group');
    expect(groups.map((g) => g.getAttribute('aria-label'))).toEqual(['Run notes', 'Patterns', 'Guides & findings', 'Library']);
    for (const g of groups) expect(g.getAttribute('tabindex')).toBe('0');
    // the dangling edge is dropped
    expect(lastProps.edges.map((e: any) => e.id)).toEqual(['c1', 'c2', 'p']);
    // Library sits below L2 → the Publish edge leaves by the bottom and enters at the top
    const publish = lastProps.edges.find((e: any) => e.id === 'p');
    expect([publish.sourceHandle, publish.targetHandle]).toEqual(['b', 't']);
    const compact = lastProps.edges.find((e: any) => e.id === 'c1');
    expect([compact.sourceHandle, compact.targetHandle]).toEqual(['r', 'l']);
    expect(lastProps.elementsSelectable).toBe(false);
    expect(lastProps.nodesFocusable).toBe(false);
  });

  it('selects a node by click and by Enter/Space, but not from a link inside it', () => {
    const onSelect = vi.fn();
    render(<TypedNodeCanvas nodes={NODES} edges={EDGES} renderNode={renderNode} onSelectNode={onSelect} selectedId="L1" />);
    const l0 = screen.getByRole('group', { name: 'Run notes' });
    fireEvent.click(l0);
    expect(onSelect).toHaveBeenLastCalledWith('L0');
    fireEvent.keyDown(screen.getByRole('group', { name: 'Library' }), { key: 'Enter' });
    expect(onSelect).toHaveBeenLastCalledWith('lib');
    fireEvent.keyDown(l0, { key: ' ' });
    expect(onSelect).toHaveBeenCalledTimes(3);
    fireEvent.click(screen.getAllByRole('link', { name: 'Browse' })[0]!);
    expect(onSelect).toHaveBeenCalledTimes(3);
    const selected = screen.getByRole('group', { name: 'Patterns' });
    expect(selected.getAttribute('aria-current')).toBe('true');
    expect(selected.querySelector('[data-selected-render]')!.getAttribute('data-selected-render')).toBe('yes');
  });

  it('arrow keys move focus between nodes', () => {
    render(<TypedNodeCanvas nodes={NODES} edges={EDGES} renderNode={renderNode} />);
    const groups = screen.getAllByRole('group');
    groups[0]!.focus();
    fireEvent.keyDown(groups[0]!, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(groups[1]);
    fireEvent.keyDown(groups[1]!, { key: 'End' });
    expect(document.activeElement).toBe(groups[3]);
    fireEvent.keyDown(groups[3]!, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(groups[2]);
  });

  it('draws edge labels, details and selectable markers', () => {
    const onEdge = vi.fn();
    render(<TypedNodeCanvas nodes={NODES} edges={EDGES} renderNode={renderNode} onSelectEdge={onEdge} selectedId="c2" />);
    expect(screen.getAllByText('Compact')).toHaveLength(2);
    expect(screen.getByText('13 notes → 4 patterns')).toBeTruthy();
    const stalled = screen.getByRole('button', { name: 'Compaction L1 to L2, stalled' });
    expect(stalled.getAttribute('aria-pressed')).toBe('true');
    expect(stalled.className).toContain('bg-warning');
    fireEvent.click(screen.getByRole('button', { name: 'Compaction L0 to L1, completed' }));
    expect(onEdge).toHaveBeenCalledWith('c1');
    expect(typeof lastProps.onEdgeClick).toBe('function');
  });

  it('animates a running edge, but not under reduced motion', () => {
    const { unmount } = render(<TypedNodeCanvas nodes={NODES} edges={EDGES} renderNode={renderNode} />);
    expect(screen.getByTestId('typed-edge-motion-c1')).toBeTruthy();
    unmount();
    reduced = true;
    render(<TypedNodeCanvas nodes={NODES} edges={EDGES} renderNode={renderNode} />);
    expect(screen.getByTestId('typed-node-canvas').getAttribute('data-reduced-motion')).toBe('true');
    expect(screen.queryByTestId('typed-edge-motion-c1')).toBeNull();
  });

  it('wires the zoom controls to the flow and shows the caption', () => {
    render(<TypedNodeCanvas nodes={NODES} edges={EDGES} renderNode={renderNode} caption="Run notes → patterns → reusable guides." />);
    expect(screen.getByTestId('canvas-zoom-controls-percent').textContent).toBe('80%');
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    fireEvent.click(screen.getByRole('button', { name: 'Zoom out' }));
    fireEvent.click(screen.getByRole('button', { name: 'Fit to view' }));
    expect(flow.zoomIn).toHaveBeenCalledTimes(1);
    expect(flow.zoomOut).toHaveBeenCalledTimes(1);
    expect(flow.fitView).toHaveBeenCalledWith(expect.objectContaining({ padding: 0.15 }));
    expect(screen.getByText('Run notes → patterns → reusable guides.')).toBeTruthy();
  });

  it('controls={false} hides the zoom cluster', () => {
    render(<TypedNodeCanvas nodes={NODES} edges={EDGES} renderNode={renderNode} controls={false} />);
    expect(screen.queryByTestId('canvas-zoom-controls')).toBeNull();
  });

  it('listFallback renders the list equivalent with edges and selection', () => {
    const onNode = vi.fn();
    const onEdge = vi.fn();
    render(
      <TypedNodeCanvas nodes={NODES} edges={EDGES} renderNode={renderNode} listFallback onSelectNode={onNode} onSelectEdge={onEdge} selectedId="L2" aria-label="Tier graph" />,
    );
    expect(screen.queryByTestId('react-flow')).toBeNull();
    const list = screen.getByRole('list', { name: 'Tier graph' });
    expect(list.tagName).toBe('OL');
    const names = Array.from(list.children).map((li) => li.getAttribute('data-testid'));
    expect(names).toEqual(['typed-node-canvas-list-node-L0', 'typed-node-canvas-list-node-L1', 'typed-node-canvas-list-node-L2', 'typed-node-canvas-list-node-lib']);
    fireEvent.click(screen.getByRole('button', { name: 'Patterns' }));
    expect(onNode).toHaveBeenCalledWith('L1');
    expect(screen.getByRole('button', { name: 'Guides & findings' }).getAttribute('aria-current')).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: 'Publish → Library' }));
    expect(onEdge).toHaveBeenCalledWith('p');
    expect(screen.getByText('· Compaction L1 to L2, stalled')).toBeTruthy();
  });

  it('says so when there is nothing to draw', () => {
    render(<TypedNodeCanvas nodes={[]} edges={[]} renderNode={renderNode} emptyLabel="No lineage recorded" />);
    expect(screen.getByTestId('typed-node-canvas-empty').textContent).toBe('No lineage recorded');
  });
});

describe('TypedNodeCanvas re-fits when the canvas resizes', () => {
  const nodes: TypedCanvasNode[] = [
    { id: 'a', kind: 'tier', data: {}, label: 'A' },
    { id: 'b', kind: 'tier', data: {}, label: 'B' },
  ];
  const edges: TypedCanvasEdge[] = [{ id: 'a-b', from: 'a', to: 'b' }];
  const draw = () => <TypedNodeCanvas nodes={nodes} edges={edges} renderNode={(n) => n.label} />;

  beforeEach(() => {
    size.width = 800; size.height = 400;
    flow.fitView.mockClear();
  });
  afterEach(cleanup);

  it('fits again when a pane opening beside it narrows the canvas', () => {
    const { rerender } = render(draw());
    expect(flow.fitView).not.toHaveBeenCalled();
    size.width = 480;
    rerender(draw());
    expect(flow.fitView).toHaveBeenCalledTimes(1);
  });

  it('ignores a resize smaller than a few pixels', () => {
    const { rerender } = render(draw());
    size.width = 804;
    rerender(draw());
    expect(flow.fitView).not.toHaveBeenCalled();
  });

  it('leaves a view the reader zoomed alone, until they press Fit', () => {
    const { rerender } = render(draw());
    fireEvent.click(screen.getByRole('button', { name: /zoom in/i }));
    size.width = 480;
    rerender(draw());
    expect(flow.fitView).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /fit/i }));
    expect(flow.fitView).toHaveBeenCalledTimes(1);
    size.width = 900;
    rerender(draw());
    expect(flow.fitView).toHaveBeenCalledTimes(2);
  });
});
