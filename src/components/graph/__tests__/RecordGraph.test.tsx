import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RecordGraph, type RecordGraphHandle, type RecordGraphProps } from '../RecordGraph';
import {
  layoutRecordGraph, recordGraphFitKeys, recordGraphViewport, RECORD_GRAPH_MIN_FIT_ZOOM,
  RECORD_GRAPH_NODE_HEIGHT, RECORD_GRAPH_NODE_WIDTH, type RecordGraphEdge, type RecordGraphRecord,
} from '../recordGraphLayout';

const flow = {
  zoomIn: vi.fn(), zoomOut: vi.fn(), fitView: vi.fn(),
  viewport: { x: 0, y: 0, zoom: 1 },
  getViewport: vi.fn(() => flow.viewport),
  setViewport: vi.fn((next: { x: number; y: number; zoom: number }) => { flow.viewport = next; return Promise.resolve(true); }),
};

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

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

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

  it('the fit floor is 80% — 13px names draw at ≥ 10.4px', async () => {
    expect(RECORD_GRAPH_MIN_FIT_ZOOM).toBe(0.8);
    flow.fitView.mockClear();
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'Fit to view' }));
    expect(flow.fitView).toHaveBeenLastCalledWith(expect.objectContaining({ minZoom: 0.8 }));
  });

  it('labels edges at rest only where they touch a selected or focused record; the rest show on hover', () => {
    const label = (id: string) => document.querySelector(`[data-edge-id="${id}"] text`)!.getAttribute('data-edge-label');
    const { rerender, props } = setup();
    // Nothing selected, a small graph: every label drawn.
    expect(['e1', 'e2', 'e3'].map(label)).toEqual(['shown', 'shown', 'shown']);
    rerender(<RecordGraph {...props} selectedKeys={['person:vera']} />);
    expect(label('e1')).toBe('shown'); // Vera owns Auth Migration
    expect(label('e2')).toBe('hover');
    expect(label('e3')).toBe('hover');
    expect(document.querySelector('[data-edge-id="e2"] text')!.getAttribute('class')).toContain('group-hover:opacity-100');
    rerender(<RecordGraph {...props} selectedKeys={[]} focusKeys={['work:cutover']} />);
    expect([label('e1'), label('e2'), label('e3')]).toEqual(['hover', 'shown', 'hover']);
  });

  it('a larger graph with nothing selected labels its edges on hover', () => {
    const many: RecordGraphRecord[] = Array.from({ length: 20 }, (_, i) => ({ id: `r${i}`, type: 'work', title: `R${i}`, href: '' }));
    const chain: RecordGraphEdge[] = many.slice(1).map((record, i) => ({ id: `c${i}`, source: `work:r${i}`, target: `work:${record.id}`, label: 'next' }));
    setup({ records: many, edges: chain });
    const states = [...document.querySelectorAll('[data-edge-label]')].map((el) => el.getAttribute('data-edge-label'));
    expect(states).toHaveLength(19);
    expect(new Set(states)).toEqual(new Set(['hover']));
  });

  it('node names sit on a surface pill so crossing edges pass under the text', () => {
    setup();
    expect(screen.getByText('Vera Green').className).toContain('bg-surface');
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

  describe('fit on resize, at the floor, and from the handle', () => {
    // Twenty-five records in the search page's canvas, the portal's journey case.
    const WORK = Array.from({ length: 13 }, (_, i): RecordGraphRecord => ({ id: `w${i}`, type: 'work', title: `Work ${i}`, href: `/w/${i}` }));
    const MANY: RecordGraphRecord[] = [
      { id: 'vera', type: 'person', title: 'Vera Green', href: '/p/vera' },
      { id: 'nora-c', type: 'person', title: 'Nora Chang', href: '/p/nora-c' },
      { id: 'nora-d', type: 'person', title: 'Nora DaSilva', href: '/p/nora-d' },
      { id: 'auth', type: 'initiative', title: 'Auth Migration', href: '/i/auth' },
      { id: 'ztn', type: 'initiative', title: 'Zero Trust Network', href: '/i/ztn' },
      ...WORK,
      { id: 'd1', type: 'decision', title: 'Policy ADR', href: '/d/1' },
      { id: 'd2', type: 'decision', title: 'Cognito over Auth0', href: '/d/2' },
      ...Array.from({ length: 5 }, (_, i): RecordGraphRecord => ({ id: `k${i}`, type: 'knowledge', title: `Guide ${i}`, href: `/k/${i}` })),
    ];
    const KEYS = MANY.map((record) => `${record.type}:${record.id}`);
    const MANY_EDGES: RecordGraphEdge[] = [
      ...KEYS.slice(5).map((key, i) => ({ id: `inc-${i}`, source: KEYS[3 + (i % 2)]!, target: key, label: 'includes' })),
      ...KEYS.slice(5).map((key, i) => ({ id: `asg-${i}`, source: KEYS[i % 3]!, target: key, label: 'assigned to' })),
      ...KEYS.slice(5, 21).map((key, i) => ({ id: `rel-${i}`, source: key, target: KEYS[9 + i]!, label: 'related to' })),
    ];
    const FOCUS = ['person:vera', 'person:nora-c', 'person:nora-d'];

    let size = { width: 1160, height: 418 };
    const observers: { cb: ResizeObserverCallback; els: Element[] }[] = [];
    const frames = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve(null))));
    function measure(width: number, height: number) {
      size = { width, height };
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
        () => ({ x: 0, y: 0, top: 0, left: 0, right: size.width, bottom: size.height, width: size.width, height: size.height, toJSON: () => ({}) }) as DOMRect,
      );
      vi.stubGlobal('ResizeObserver', class {
        entry = { cb: (() => {}) as ResizeObserverCallback, els: [] as Element[] };
        constructor(cb: ResizeObserverCallback) { this.entry.cb = cb; observers.push(this.entry); }
        observe(el: Element) { this.entry.els.push(el); }
        unobserve() {}
        disconnect() { this.entry.els = []; }
      });
    }
    function resize(width: number, height: number) {
      size = { width, height };
      act(() => {
        observers.forEach(({ cb, els }) => els.forEach((el) => cb(
          [{ target: el, contentRect: { width, height } } as unknown as ResizeObserverEntry], {} as ResizeObserver,
        )));
      });
    }
    /** Screen rect of a record under the current mocked viewport. */
    function onScreen(key: string) {
      const [x, y] = screen.getByTestId(`flow-node-${key}`).getAttribute('data-position')!.split(',').map(Number) as [number, number];
      const { x: tx, y: ty, zoom } = flow.viewport;
      return { x0: x * zoom + tx, y0: y * zoom + ty, x1: (x + RECORD_GRAPH_NODE_WIDTH) * zoom + tx, y1: (y + RECORD_GRAPH_NODE_HEIGHT) * zoom + ty };
    }
    function expectInside(keys: string[]) {
      keys.forEach((key) => {
        const box = onScreen(key);
        expect(box.x0, key).toBeGreaterThanOrEqual(-0.5);
        expect(box.y0, key).toBeGreaterThanOrEqual(-0.5);
        expect(box.x1, key).toBeLessThanOrEqual(size.width + 0.5);
        expect(box.y1, key).toBeLessThanOrEqual(size.height + 0.5);
      });
    }
    function setupMany(overrides: Partial<RecordGraphProps> = {}) {
      measure(1160, 418);
      observers.length = 0;
      flow.viewport = { x: 0, y: 0, zoom: 1 };
      flow.setViewport.mockClear();
      flow.fitView.mockClear();
      return setup({ records: MANY, edges: MANY_EDGES, selectedKeys: FOCUS, focusKeys: FOCUS, ...overrides });
    }

    it('re-fits when the canvas shrinks, keeping the focus inside it', async () => {
      setupMany();
      await frames();
      expect(flow.setViewport).toHaveBeenCalled();
      expectInside(FOCUS);
      const calls = flow.setViewport.mock.calls.length;
      resize(1160, 369); // the answer strip opens under the canvas
      await frames();
      expect(flow.setViewport.mock.calls.length).toBeGreaterThan(calls);
      expect(flow.viewport.zoom).toBeGreaterThanOrEqual(RECORD_GRAPH_MIN_FIT_ZOOM);
      expectInside(FOCUS);
      resize(1160, 256); // expanded conversation
      await frames();
      // At 256px the three people may be taller than the canvas at the floor:
      // then the focus is aligned to the top padding (the rest a pan away);
      // either way the view is never zoomed below the floor.
      expect(flow.viewport.zoom).toBeGreaterThanOrEqual(RECORD_GRAPH_MIN_FIT_ZOOM);
      const boxes = FOCUS.map(onScreen);
      const top = Math.min(...boxes.map((box) => box.y0)), bottom = Math.max(...boxes.map((box) => box.y1));
      if (bottom - top <= 256 - 48) expectInside(FOCUS);
      else expect(top).toBeCloseTo(24);
    });

    it('a resize too small to re-lay out still re-fits (the ResizeObserver, not the layout key)', async () => {
      setupMany();
      resize(1160, 418); // the first measurement (a real observer reports it on observe)
      await frames();
      const positions = screen.getByTestId('flow-node-person:vera').getAttribute('data-position');
      const calls = flow.setViewport.mock.calls.length;
      resize(1160, 410); // same 40px layout step as 418
      await frames();
      expect(screen.getByTestId('flow-node-person:vera').getAttribute('data-position')).toBe(positions);
      expect(flow.setViewport.mock.calls.length).toBe(calls + 1);
      expectInside(FOCUS);
    });

    it('Radial at the floor still keeps the focus in view', async () => {
      setupMany({ layout: 'radial' });
      await frames();
      expect(flow.viewport.zoom).toBeCloseTo(RECORD_GRAPH_MIN_FIT_ZOOM);
      expectInside(FOCUS);
    });

    it('Fit re-centres on the focus, then a second press frames the whole graph top-left', async () => {
      setupMany();
      await frames();
      const focusView = { ...flow.viewport };
      flow.viewport = { x: -900, y: -700, zoom: 0.7 }; // panned away
      fireEvent.click(screen.getByRole('button', { name: 'Fit to view' }));
      expect(flow.viewport).toEqual(focusView);
      expectInside(FOCUS);
      fireEvent.click(screen.getByRole('button', { name: 'Fit to view' }));
      expect(flow.viewport).not.toEqual(focusView);
      // Whole graph, top-left aligned where it overflows.
      const tops = KEYS.map((key) => onScreen(key));
      const minX = Math.min(...tops.map((box) => box.x0));
      const minY = Math.min(...tops.map((box) => box.y0));
      const maxX = Math.max(...tops.map((box) => box.x1));
      const maxY = Math.max(...tops.map((box) => box.y1));
      if (maxX - minX > size.width - 48) expect(minX).toBeCloseTo(24);
      if (maxY - minY > size.height - 48) expect(minY).toBeCloseTo(24);
      // Pressed again, back to the focus.
      fireEvent.click(screen.getByRole('button', { name: 'Fit to view' }));
      expect(flow.viewport).toEqual(focusView);
    });

    it('a selection click does not move the view', async () => {
      const { rerender, props } = setupMany();
      await frames();
      const calls = flow.setViewport.mock.calls.length + flow.fitView.mock.calls.length;
      fireEvent.click(screen.getByRole('button', { name: 'Work: Work 0' }));
      rerender(<RecordGraph {...props} selectedKeys={[...FOCUS, 'work:w0']} focusKeys={[...FOCUS, 'work:w0']} />);
      await frames();
      expect(flow.setViewport.mock.calls.length + flow.fitView.mock.calls.length).toBe(calls);
    });

    it('exposes fitToFocus / fitAll on a ref', async () => {
      measure(1160, 418);
      flow.setViewport.mockClear();
      const ref = createRef<RecordGraphHandle>();
      render(<RecordGraph ref={ref} records={MANY} edges={MANY_EDGES} selectedKeys={FOCUS} focusKeys={FOCUS}
        onSelectionChange={vi.fn()} onAskSelection={vi.fn()} />);
      await frames();
      const focusView = { ...flow.viewport };
      act(() => ref.current!.fitAll());
      expect(flow.viewport).not.toEqual(focusView);
      act(() => ref.current!.fitToFocus());
      expect(flow.viewport).toEqual(focusView);
      expectInside(FOCUS);
    });
  });

  it('recordGraphViewport keeps the focus box inside the canvas at the floor', () => {
    const recs: RecordGraphRecord[] = Array.from({ length: 30 }, (_, i) => ({ id: `r${i}`, type: 'work', title: `R${i}`, href: '' }));
    const keys = recs.map((record) => `work:${record.id}`);
    const chain: RecordGraphEdge[] = keys.slice(1).map((key, i) => ({ id: `e${i}`, source: keys[i]!, target: key, label: 'next' }));
    const positions = layoutRecordGraph(recs, chain, 'force', { width: 800, height: 300 });
    const focus = [keys[0]!, keys[29]!];
    const fit = recordGraphFitKeys(keys, chain, focus);
    const vp = recordGraphViewport(positions, { width: 800, height: 300 }, { mode: 'focus', focusKeys: focus, fitKeys: fit })!;
    expect(vp.zoom).toBeGreaterThanOrEqual(RECORD_GRAPH_MIN_FIT_ZOOM);
    const xs = focus.map((key) => positions.get(key)!);
    const box = {
      x0: Math.min(...xs.map((p) => p.x)), y0: Math.min(...xs.map((p) => p.y)),
      x1: Math.max(...xs.map((p) => p.x)) + RECORD_GRAPH_NODE_WIDTH, y1: Math.max(...xs.map((p) => p.y)) + RECORD_GRAPH_NODE_HEIGHT,
    };
    expect((box.x1 - box.x0) * vp.zoom).toBeLessThanOrEqual(752);
    expect((box.y1 - box.y0) * vp.zoom).toBeLessThanOrEqual(252);
    {
      expect(box.x0 * vp.zoom + vp.x).toBeGreaterThanOrEqual(0);
      expect(box.y0 * vp.zoom + vp.y).toBeGreaterThanOrEqual(0);
      expect(box.x1 * vp.zoom + vp.x).toBeLessThanOrEqual(800);
      expect(box.y1 * vp.zoom + vp.y).toBeLessThanOrEqual(300);
    }
    expect(recordGraphViewport(new Map(), { width: 800, height: 300 }, { mode: 'all' })).toBeNull();
  });
});
