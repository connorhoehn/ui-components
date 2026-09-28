import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RecordGraph, type RecordGraphProps } from '../RecordGraph';
import { RECORD_GRAPH_MIN_FIT_ZOOM, type RecordGraphEdge, type RecordGraphRecord } from '../recordGraphLayout';

const flow = { zoomIn: vi.fn(), zoomOut: vi.fn(), fitView: vi.fn() };

vi.mock('@xyflow/react', () => ({
  ReactFlow: (props: any) => {
    const { nodes, edges, nodeTypes, edgeTypes, children } = props;
    return (
      <div data-testid="react-flow" aria-label={props['aria-label']}>
        {nodes.map((node: any) => {
          const Renderer = nodeTypes[node.type];
          return <div key={node.id} data-testid={`flow-node-${node.id}`} data-position={`${node.position.x},${node.position.y}`}><Renderer {...node} /></div>;
        })}
        <svg>{edges.map((edge: any) => { const Renderer = edgeTypes[edge.type]; return <Renderer key={edge.id} {...edge} />; })}</svg>
        {children}
      </div>
    );
  },
  ReactFlowProvider: ({ children }: any) => <>{children}</>,
  Background: () => null,
  Handle: () => null,
  Position: { Left: 'left', Right: 'right', Top: 'top', Bottom: 'bottom' },
  useReactFlow: () => flow,
  useViewport: () => ({ x: 0, y: 0, zoom: 1 }),
}));

afterEach(cleanup);

const records: RecordGraphRecord[] = [
  { id: 'vera', type: 'person', title: 'Vera Green', subtitle: 'Owner', href: '/people/vera' },
  { id: 'auth', type: 'initiative', title: 'Auth Migration', status: 'in_progress', href: '/i/auth' },
  { id: 'cutover', type: 'work', title: 'Tenant-by-tenant cutover', status: 'blocked', href: '/w/cutover' },
  { id: 'saml', type: 'knowledge', title: 'SAML to Cognito guide', href: '/k/saml' },
];
const edges: RecordGraphEdge[] = [
  { id: 'e1', source: 'person:vera', target: 'initiative:auth', label: 'owns' },
  { id: 'e2', source: 'initiative:auth', target: 'work:cutover', label: 'includes' },
  { id: 'e3', source: 'knowledge:saml', target: 'initiative:auth', label: 'Related result' },
];

function setup(overrides: Partial<RecordGraphProps> = {}) {
  const props: RecordGraphProps = {
    records, edges, selectedKeys: [], onSelectionChange: vi.fn(), onAskSelection: vi.fn(), ...overrides,
  };
  return { props, ...render(<RecordGraph {...props} />) };
}

describe('RecordGraph', () => {
  it('draws every record, labelled edges with dashed related ones, counts and a legend of present types', () => {
    setup();
    expect(screen.getByTestId('record-graph-counts')).toHaveTextContent('4 records · 3 connections');
    expect(screen.getByRole('button', { name: 'Person: Vera Green' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Work: Tenant-by-tenant cutover, Blocked' })).toBeInTheDocument();
    expect(screen.getByText('owns')).toBeInTheDocument();
    expect(document.querySelector('[data-edge-id="e3"]')).toHaveAttribute('data-related', 'true');
    expect(document.querySelector('[data-edge-id="e1"]')).toHaveAttribute('data-related', 'false');
    const legend = screen.getByTestId('record-graph-legend');
    expect(legend).toHaveTextContent('People');
    expect(legend).not.toHaveTextContent('Decisions');
    expect(screen.getByRole('toolbar', { name: 'Zoom' })).toBeInTheDocument();
  });

  it('toggles a node in and out of the selection', () => {
    const onSelectionChange = vi.fn();
    const { rerender, props } = setup({ onSelectionChange });
    fireEvent.click(screen.getByRole('button', { name: 'Person: Vera Green' }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(['person:vera']);
    rerender(<RecordGraph {...props} selectedKeys={['person:vera', 'initiative:auth']} />);
    expect(screen.getByRole('button', { name: 'Person: Vera Green' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByTestId('record-graph-check')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Person: Vera Green' }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(['initiative:auth']);
  });

  it('Clear empties the selection, Ask fires, and Open record appears for exactly one', () => {
    const onSelectionChange = vi.fn(), onAskSelection = vi.fn(), onOpenRecord = vi.fn();
    const { rerender, props } = setup({ onSelectionChange, onAskSelection, onOpenRecord });
    expect(screen.getByRole('button', { name: 'Clear' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Ask about selection →' })).toBeDisabled();
    rerender(<RecordGraph {...props} selectedKeys={['work:cutover']} />);
    expect(screen.getByText('1 selected')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Open record ↗' }));
    expect(onOpenRecord).toHaveBeenCalledWith(records[2]);
    fireEvent.click(screen.getByRole('button', { name: 'Ask about selection →' }));
    expect(onAskSelection).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(onSelectionChange).toHaveBeenLastCalledWith([]);
    rerender(<RecordGraph {...props} selectedKeys={['work:cutover', 'person:vera']} />);
    expect(screen.queryByRole('button', { name: 'Open record ↗' })).not.toBeInTheDocument();
  });

  it('switches layout (uncontrolled) and reports it', () => {
    const onLayoutChange = vi.fn();
    setup({ onLayoutChange });
    const before = screen.getByTestId('flow-node-initiative:auth').getAttribute('data-position');
    fireEvent.click(screen.getByRole('radio', { name: 'Hierarchy' }));
    expect(onLayoutChange).toHaveBeenCalledWith('hierarchy');
    // Hierarchy puts the owner (a root) at rank 0 and the initiative at rank 1.
    expect(screen.getByTestId('flow-node-person:vera').getAttribute('data-position')).toMatch(/^0,/);
    expect(screen.getByTestId('flow-node-initiative:auth').getAttribute('data-position')).not.toBe(before);
  });

  it('type filter drops records of other types and their dangling edges', () => {
    const onTypeFilterChange = vi.fn();
    setup({ onTypeFilterChange, typeLabels: { knowledge: 'Guides' } });
    const select = screen.getByRole('combobox', { name: 'Connection record type' });
    expect(screen.getByRole('option', { name: 'Guides' })).toBeInTheDocument();
    fireEvent.change(select, { target: { value: 'initiative' } });
    expect(onTypeFilterChange).toHaveBeenCalledWith('initiative');
    expect(screen.getByTestId('record-graph-counts')).toHaveTextContent('1 records · 0 connections');
    expect(document.querySelectorAll('[data-edge-id]')).toHaveLength(0);
  });

  it('renders an empty state when nothing survives the filter', () => {
    setup({ typeFilter: 'decision' });
    expect(screen.getByText('No connections to show')).toBeInTheDocument();
    expect(screen.queryByTestId('react-flow')).not.toBeInTheDocument();
  });

  it('zoom controls drive the flow instance', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(flow.zoomIn).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Fit to view' }));
    expect(flow.fitView).toHaveBeenCalled();
  });

  it('Fit frames the whole graph but never below the readable floor', () => {
    flow.fitView.mockClear();
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Fit to view' }));
    expect(flow.fitView).toHaveBeenLastCalledWith(expect.objectContaining({ minZoom: RECORD_GRAPH_MIN_FIT_ZOOM, maxZoom: 1 }));
    expect(flow.fitView.mock.lastCall![0]).not.toHaveProperty('nodes');
  });

  it('focusKeys frames the selection and its neighbours first', async () => {
    flow.fitView.mockClear();
    setup({ focusKeys: ['person:vera'] });
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
    expect(flow.fitView).toHaveBeenCalledWith(expect.objectContaining({
      minZoom: RECORD_GRAPH_MIN_FIT_ZOOM,
      nodes: [{ id: 'person:vera' }, { id: 'initiative:auth' }],
    }));
  });

  it('draws the compact node box', () => {
    setup();
    const box = document.querySelector('[data-record-key="person:vera"]')!;
    expect(box.className).toContain('w-[140px]');
    expect(box.className).toContain('h-[104px]');
  });

  it('records with no connections among them draw the empty label, not a cloud of nodes', () => {
    setup({ edges: [] });
    expect(screen.queryByTestId('react-flow')).toBeNull();
    expect(screen.getByTestId('record-graph-unconnected')).toHaveTextContent('No recorded connections — search, or select related records');
    // The toolbar stays, so the type filter and selection actions still work.
    expect(screen.getByTestId('record-graph-counts')).toHaveTextContent('4 records · 0 connections');
    cleanup();
    setup({ edges: [], emptyLabel: 'Nothing links these records' });
    expect(screen.getByTestId('record-graph-unconnected')).toHaveTextContent('Nothing links these records');
  });

  it('showIsolated draws unconnected records as before', () => {
    setup({ edges: [], showIsolated: true });
    expect(screen.queryByTestId('record-graph-unconnected')).toBeNull();
    expect(screen.getByRole('button', { name: 'Person: Vera Green' })).toBeInTheDocument();
    expect(screen.getAllByTestId(/^flow-node-/)).toHaveLength(4);
  });
});
