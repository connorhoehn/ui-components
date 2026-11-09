import { useState, type ReactNode } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WorkGraph } from '../WorkGraph';
import { WorkArtifactInspector } from '../WorkArtifactInspector';
import { WorkTimeWindow } from '../WorkTimeWindow';
import type { WorkActivityPresentation, WorkGraphProps, WorkGraphSelection } from '../types';

vi.mock('@xyflow/react', () => ({
  ReactFlow: ({ nodes, edges, nodeTypes, edgeTypes, children }: {
    nodes: Array<{ id: string; type: string; data: unknown; selected?: boolean }>;
    edges: Array<{ id: string; type: string; data: unknown }>;
    nodeTypes: Record<string, React.ComponentType<Record<string, unknown>>>;
    edgeTypes: Record<string, React.ComponentType<Record<string, unknown>>>;
    children: ReactNode;
  }) => <div>{nodes.map((node) => { const Component = nodeTypes[node.type]; return <Component key={node.id} {...node} />; })}{edges.map((edge) => { const Component = edgeTypes[edge.type]; return <Component key={edge.id} {...edge} />; })}{children}</div>,
  Handle: () => null, Background: () => null, Controls: () => null,
  EdgeLabelRenderer: ({ children }: { children: ReactNode }) => children,
  MarkerType: { ArrowClosed: 'arrow' }, Position: { Top: 'top', Bottom: 'bottom', Left: 'left', Right: 'right' },
}));
vi.mock('../../../pipelines/canvas/edges/AnimatedEdge', () => ({ default: ({ data }: { data: { state: string } }) => <span data-testid="operation-edge" data-state={data.state} /> }));

const start = Date.parse('2026-09-20T12:00:00Z');
const end = start + 105 * 60_000;
const artifact = { revisions: [{ id: 'r1', label: 'v1', createdAt: new Date(start).toISOString(), preview: <span>First deck</span>, anchorId: 'slide-2', anchorLabel: 'Slide 2' }, { id: 'r2', label: 'v2', createdAt: new Date(end - 60_000).toISOString(), preview: <span>Second deck</span> }], pending: { id: 'r3', label: 'v3', status: 'generating' as const } };
const activity = (): WorkActivityPresentation => ({ efforts: [{ id: 'deck', title: 'Sprint review', nodeIds: ['run', 'deck'], edgeIds: ['output'] }, { id: 'coverage', title: 'Coverage', nodeIds: ['terminal'], edgeIds: [] }], details: { deck: { artifact, feedbackCount: 2, fresh: true }, run: { fresh: true, tools: ['Slides', 'Charts'] }, terminal: { fresh: false } }, activeEdgeIds: ['output'], mode: 'split', window: { start: end - 15 * 60_000, end, following: true }, bounds: { start, end }, temporalMode: 'recent', view: { focusedEffortId: null, expandedSourceEfforts: [], canvasInitialized: true }, onWindowChange: vi.fn(), onViewChange: vi.fn(), onFeedback: vi.fn() });
const props = (): WorkGraphProps => ({ nodes: [
  { id: 'run', kind: 'run', title: 'Generate presentation', status: 'running', disclosure: 'details', capabilities: ['view-run'], updatedAt: new Date(end).toISOString() },
  { id: 'deck', kind: 'document', title: 'Sprint slides', status: 'running', disclosure: 'details', capabilities: ['view-document'], updatedAt: new Date(end).toISOString() },
  { id: 'terminal', kind: 'terminal', title: 'Coverage tests', status: 'running', disclosure: 'summary', capabilities: ['observe-terminal'], updatedAt: new Date(end).toISOString() },
], edges: [{ id: 'output', fromId: 'run', toId: 'deck', relation: 'produced', status: 'running', disclosure: 'details', capabilities: [], updatedAt: new Date(end).toISOString() }], selection: null, viewport: { x: 20, y: 30, zoom: 1 }, timezone: 'America/New_York', onSelectionChange: vi.fn(), onViewportChange: vi.fn(), onReference: vi.fn(), activity: activity() });

describe('Active Now composition', () => {
  it('opens with separate efforts and no inspector, duplicate list, or chat', () => {
    render(<WorkGraph {...props()} />);
    expect(screen.getAllByTestId('work-effort')).toHaveLength(2);
    expect(screen.queryByTestId('activity-inspector')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Accessible work graph' })).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Interval start' })).toHaveValue(String(end - 15 * 60_000));
    fireEvent.click(screen.getByRole('button', { name: 'View as accessible list' }));
    expect(screen.getByRole('heading', { name: 'Accessible work graph' })).toBeInTheDocument();
  });

  it('reviews an earlier version while generation continues and references its exact anchor', () => {
    const initial = props();
    function Harness() {
      const [selection, onSelectionChange] = useState<WorkGraphSelection>({ kind: 'node', id: 'deck', revisionId: 'r2' });
      return <WorkGraph {...initial} selection={selection} onSelectionChange={onSelectionChange} />;
    }
    render(<Harness />);
    const inspector = within(screen.getByTestId('activity-inspector'));
    fireEvent.click(inspector.getByRole('tab', { name: 'v1' }));
    expect(inspector.getByText('First deck')).toBeInTheDocument();
    expect(inspector.queryByText('Second deck')).not.toBeInTheDocument();
    expect(inspector.getByRole('status')).toHaveTextContent('v3 is generating');
    const pendingTab = inspector.getByRole('tab', { name: /v3/ });
    expect(pendingTab).toBeDisabled();
    fireEvent.click(pendingTab);
    expect(inspector.getByText('First deck')).toBeInTheDocument();
    fireEvent.click(inspector.getByRole('button', { name: 'Reference in chat' }));
    expect(initial.onReference).toHaveBeenCalledWith({ kind: 'node', id: 'deck', revisionId: 'r1', anchorId: 'slide-2' });
    fireEvent.click(screen.getByRole('button', { name: '2 comments on Sprint slides' }));
    expect(initial.activity?.onFeedback).toHaveBeenCalledWith({ kind: 'node', id: 'deck', revisionId: 'r1' });
  });

  it('does not substitute a new revision when the selected revision loses access', () => {
    const initial = props();
    render(<WorkArtifactInspector node={initial.nodes[1]} artifact={artifact} selection={{ kind: 'node', id: 'deck', revisionId: 'revoked' }} onSelectionChange={vi.fn()} onReference={initial.onReference} onOpen={vi.fn()} />);
    expect(screen.getByText('The selected revision is unavailable.')).toBeInTheDocument();
    expect(screen.queryByText('Second deck')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Reference in chat' })).not.toBeInTheDocument();
  });

  it('clears revoked selection and all attached previews immediately', () => {
    const initial = props();
    initial.selection = { kind: 'node', id: 'deck', revisionId: 'r2' };
    const { rerender } = render(<WorkGraph {...initial} />);
    rerender(<WorkGraph {...initial} nodes={initial.nodes.filter((node) => node.id !== 'deck')} />);
    expect(initial.onSelectionChange).toHaveBeenCalledWith(null);
    expect(screen.queryByText('Second deck')).not.toBeInTheDocument();
    expect(screen.queryByTestId('activity-inspector')).not.toBeInTheDocument();
    expect(screen.queryByTestId('operation-edge')).not.toBeInTheDocument();
  });

  it('stops edge animation away from now and keeps a delayed terminal distinct from completion', () => {
    const initial = props();
    const { rerender } = render(<WorkGraph {...initial} />);
    expect(screen.getByTestId('operation-edge')).toHaveAttribute('data-state', 'active');
    expect(screen.getByText('Running · updates delayed')).toBeInTheDocument();
    rerender(<WorkGraph {...initial} activity={{ ...initial.activity!, window: { ...initial.activity!.window, following: false } }} />);
    expect(screen.getByTestId('operation-edge')).toHaveAttribute('data-state', 'default');
    expect(screen.getByText('Recent work · statuses reflect the latest available state')).toBeInTheDocument();
  });

  it('preserves the viewport on heartbeats, supports keyboard node selection, and restores overview after focus', () => {
    const initial = props();
    const { rerender } = render(<WorkGraph {...initial} />);
    fireEvent.keyDown(screen.getByRole('button', { name: 'Sprint slides, v3 generating' }), { key: 'Enter' });
    expect(initial.onSelectionChange).toHaveBeenCalledWith({ kind: 'node', id: 'deck', revisionId: 'r2' });
    rerender(<WorkGraph {...initial} nodes={initial.nodes.map((node) => ({ ...node, updatedAt: new Date(end + 5000).toISOString() }))} />);
    expect(initial.onViewportChange).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Focus on Sprint review' }));
    expect(initial.activity!.onViewChange).toHaveBeenCalledWith({ ...initial.activity!.view, focusedEffortId: 'deck', overviewViewport: initial.viewport });
  });

  it('exposes panel chrome, the graph footer and an earlier-work step to the host', () => {
    const initial = props();
    const onExpand = vi.fn(); const onPopOut = vi.fn(); const onClose = vi.fn(); const onEarlier = vi.fn();
    render(<WorkGraph {...initial} activity={{ ...initial.activity!, title: 'Connor’s activity', subtitle: 'Working now · Sharing with you', onExpand, onPopOut, onClose, onEarlier }} />);
    expect(screen.getByTestId('work-activity-header-subtitle')).toHaveTextContent('Working now · Sharing with you');
    fireEvent.click(screen.getByRole('button', { name: 'Expand activity' }));
    fireEvent.click(screen.getByRole('button', { name: 'Open activity in its own page' }));
    fireEvent.click(screen.getByRole('button', { name: 'Close activity' }));
    expect(onExpand).toHaveBeenCalled(); expect(onPopOut).toHaveBeenCalled(); expect(onClose).toHaveBeenCalled();
    expect(screen.getByTestId('work-activity-footer')).toHaveTextContent('2 parallel activities · Newest work first');
    fireEvent.click(screen.getByRole('button', { name: '← Earlier work' }));
    expect(onEarlier).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: '← Earlier work' })).not.toHaveAttribute('aria-describedby');
  });

  it('"Earlier work" at the start of its window is off and says why (2.515.6)', () => {
    const initial = props();
    render(<WorkGraph {...initial} activity={{ ...initial.activity!, window: { start, end, following: true } }} />);
    const earlier = screen.getByRole('button', { name: '← Earlier work' });
    expect(earlier).toBeDisabled();
    expect(earlier).toHaveAttribute('title', 'No earlier work in this window');
    expect(document.getElementById(earlier.getAttribute('aria-describedby')!)).toHaveTextContent('No earlier work in this window');
  });

  it('labels only the operations the host named, and marks a failed one', () => {
    const initial = props();
    const { rerender } = render(<WorkGraph {...initial} activity={{ ...initial.activity!, edgeLabels: { output: 'generating' } }} />);
    expect(screen.getByRole('button', { name: 'produced, active' })).toHaveTextContent('generating');
    rerender(<WorkGraph {...initial} activity={{ ...initial.activity!, activeEdgeIds: [], failedEdgeIds: ['output'] }} />);
    expect(screen.getByTestId('operation-edge')).toHaveAttribute('data-state', 'traversed-failure');
    expect(screen.getByRole('button', { name: 'produced, failed' })).toHaveTextContent('failed');
  });

  it('opens the node pane as a column, and none at all when the host places it itself', () => {
    const initial = props();
    initial.selection = { kind: 'node', id: 'deck', revisionId: 'r2' };
    initial.activity!.details!.deck!.banner = { tone: 'info', title: 'Generating v3', description: 'v2 is available' };
    const { rerender } = render(<WorkGraph {...initial} />);
    const pane = screen.getByTestId('activity-inspector');
    expect(pane.className).not.toContain('absolute');
    expect(within(pane).getByTestId('work-pane-banner')).toHaveTextContent('Generating v3');
    rerender(<WorkGraph {...initial} activity={{ ...initial.activity!, detailsPlacement: 'none' }} />);
    expect(screen.queryByTestId('activity-inspector')).not.toBeInTheDocument();
  });

  it('shows the accessible list in the canvas region when a pane is open and the graph is too small to read', () => {
    const initial = props();
    initial.selection = { kind: 'node', id: 'deck', revisionId: 'r2' };
    initial.viewport = { x: 0, y: 0, zoom: 0.2 };
    const { rerender } = render(<WorkGraph {...initial} />);
    const region = screen.getByTestId('work-activity-list-region');
    expect(within(region).getAllByRole('button').length).toBeGreaterThan(0);
    expect(screen.getByTestId('work-activity-region')).toHaveAttribute('data-list', 'region');
    // The canvas stays mounted (same fit) but out of reach under the list.
    expect(screen.getByTestId('work-activity-canvas').parentElement).toHaveAttribute('aria-hidden', 'true');
    // Footer and toggle are rows of their own, never under the list.
    expect(region.contains(screen.getByTestId('work-activity-footer'))).toBe(false);
    expect(screen.queryByTestId('work-activity-list-below')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('work-activity-list-toggle'));
    expect(screen.queryByTestId('work-activity-list-region')).not.toBeInTheDocument();
    expect(screen.getByTestId('work-activity-list-toggle')).toHaveTextContent('View as accessible list');
    // Readable zoom, or no pane: the canvas keeps the region.
    rerender(<WorkGraph {...initial} selection={null} />);
    expect(screen.queryByTestId('work-activity-list-region')).not.toBeInTheDocument();
    // A host that draws the pane itself (placement 'none') gets the same.
    rerender(<WorkGraph {...initial} selection={{ kind: 'node', id: 'run' }} activity={{ ...initial.activity!, detailsPlacement: 'none' }} />);
    expect(screen.getByTestId('work-activity-list-region')).toBeInTheDocument();
    rerender(<WorkGraph {...initial} selection={{ kind: 'node', id: 'run' }} viewport={{ x: 0, y: 0, zoom: 1 }} />);
    expect(screen.queryByTestId('work-activity-list-region')).not.toBeInTheDocument();
  });

  it('lists only the activities the canvas shows, marks and scrolls to the selection, and can show all', () => {
    const scroll = vi.fn();
    const original = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = scroll;
    try {
      const initial = props();
      initial.nodes = [...initial.nodes, { id: 'old', kind: 'terminal', title: 'Old lint run', status: 'completed', disclosure: 'summary', capabilities: [], updatedAt: new Date(start).toISOString() }];
      initial.activity = { ...initial.activity!, efforts: [...initial.activity!.efforts, { id: 'lint', title: 'Lint', nodeIds: ['old'], edgeIds: [] }] };
      const { rerender } = render(<WorkGraph {...initial} />);
      fireEvent.click(screen.getByTestId('work-activity-list-toggle'));
      const list = () => within(screen.getByTestId('work-activity-list-below'));
      // Default cap 2: the older third activity is not listed, like the canvas.
      expect(list().getAllByTestId('work-entity-list-group').map((group) => group.getAttribute('aria-label'))).toEqual(['Sprint review', 'Coverage']);
      expect(list().queryByRole('button', { name: 'Work item: Old lint run' })).not.toBeInTheDocument();
      expect(list().getByTestId('work-activity-list-more')).toHaveTextContent('Showing 2 of 3 activities');
      // Selecting an item outside the cap keeps its activity, marks it, scrolls to it.
      rerender(<WorkGraph {...initial} selection={{ kind: 'node', id: 'old' }} />);
      const selected = list().getByRole('button', { name: 'Work item: Old lint run' });
      expect(selected).toHaveAttribute('aria-current', 'true');
      expect(selected.className).toContain('ring-primary');
      expect(list().getAllByRole('button', { name: /^Work item/ }).filter((button) => button.hasAttribute('aria-current'))).toHaveLength(1);
      expect(scroll).toHaveBeenCalledWith({ block: 'nearest' });
      expect(list().getAllByTestId('work-entity-list-group')).toHaveLength(2);
      // "Show all" is the header's "All N activities": both move together.
      rerender(<WorkGraph {...initial} />);
      fireEvent.click(list().getByRole('button', { name: 'Show all 3 activities' }));
      expect(list().getAllByTestId('work-entity-list-group')).toHaveLength(3);
      expect(list().queryByTestId('work-activity-list-more')).not.toBeInTheDocument();
      expect(screen.getAllByTestId('work-effort')).toHaveLength(3);
    } finally {
      Element.prototype.scrollIntoView = original;
    }
  });

  it('keeps an opened list below the canvas in its own scrolling row', () => {
    render(<WorkGraph {...props()} />);
    fireEvent.click(screen.getByTestId('work-activity-list-toggle'));
    const below = screen.getByTestId('work-activity-list-below');
    expect(below.className).toContain('overflow-auto');
    expect(screen.getByTestId('work-activity-list-toggle')).toHaveTextContent('Hide accessible list');
  });

  it('keeps effort frames out of the way of the cards inside them', () => {
    render(<WorkGraph {...props()} />);
    const frame = screen.getAllByTestId('work-effort')[0];
    // The frame is scenery: it must not swallow a click meant for a card, but
    // its own controls have to stay reachable.
    expect(frame.className).toContain('pointer-events-none');
    const actions = screen.getByRole('button', { name: 'Focus on Sprint review' }).closest('span')!;
    expect(actions.className).toContain('pointer-events-auto');
    // Link buttons intentionally inherit: compact graph metadata must not shrink their labels.
    expect(actions.className).toContain('text-xs');
    expect(actions.parentElement!.className).toContain('text-[12px]');
  });

  it('stops the ruler at the real clock, not at the end of the day', () => {
    const value = activity();
    // A real America/New_York day: 00:00-24:00 local is 04:00Z to 04:00Z.
    const dayStart = Date.parse('2026-09-21T04:00:00Z');
    const rightNow = Date.parse('2026-09-21T20:28:00Z');
    value.bounds = { start: dayStart, end: dayStart + 24 * 60 * 60_000 };
    value.window = { start: rightNow - 15 * 60_000, end: rightNow, following: true };
    value.now = rightNow;
    value.events = [Date.parse('2026-09-21T12:00:00Z'), Date.parse('2026-09-21T23:00:00Z')].map((at) => ({ at, count: 2 }));
    const { container } = render(<WorkTimeWindow activity={value} timezone="America/New_York" />);
    // 16h28m of extent takes three-hour marks, printed as a plain clock face.
    expect([...screen.getByTestId('work-time-ruler').querySelectorAll('span')].map((span) => span.textContent)).toEqual(['2:00', '5:00', '8:00', '11:00', 'Now 16:28']);
    expect(container.querySelector('strong')).toHaveTextContent('16:13 – Now');
    // The window and the slider stop at now; tomorrow is not scrubbable.
    expect(screen.getByRole('slider', { name: 'Interval end' })).toHaveAttribute('max', String(rightNow));
    expect(screen.getByRole('slider', { name: 'Interval end' })).toHaveValue(String(rightNow));
    // An event past the extent is not plotted at all.
    expect(screen.getAllByRole('button', { name: /events at/ })).toHaveLength(1);
  });

  it('on a narrow ruler drops marks that would touch "Now" or each other (Loop 32 (activity))', () => {
    const original = globalThis.ResizeObserver;
    globalThis.ResizeObserver = class {
      constructor(private readonly callback: ResizeObserverCallback) {}
      observe() { this.callback([{ contentRect: { width: 200 } } as ResizeObserverEntry], this as unknown as ResizeObserver); }
      disconnect() {}
      unobserve() {}
    } as unknown as typeof ResizeObserver;
    try {
      const value = activity();
      const dayStart = Date.parse('2026-09-21T04:00:00Z');
      const rightNow = Date.parse('2026-09-21T20:28:00Z');
      value.bounds = { start: dayStart, end: dayStart + 24 * 60 * 60_000 };
      value.window = { start: rightNow - 15 * 60_000, end: rightNow, following: true };
      value.now = rightNow;
      render(<WorkTimeWindow activity={value} timezone="America/New_York" />);
      expect([...screen.getByTestId('work-time-ruler').querySelectorAll('span')].map((span) => span.textContent)).toEqual(['2:00', '8:00', 'Now 16:28']);
    } finally {
      globalThis.ResizeObserver = original;
    }
  });

  it('labels a scrubbed window with both ends and keeps hour marks proportional', () => {
    const value = activity();
    const dayStart = Date.parse('2026-09-21T04:00:00Z');
    const rightNow = Date.parse('2026-09-21T20:28:00Z');
    value.bounds = { start: dayStart, end: dayStart + 24 * 60 * 60_000 };
    value.window = { start: Date.parse('2026-09-21T17:12:00Z'), end: Date.parse('2026-09-21T17:27:00Z'), following: false };
    value.now = rightNow;
    const { container } = render(<WorkTimeWindow activity={value} timezone="America/New_York" />);
    expect(container.querySelector('strong')).toHaveTextContent('13:12 – 13:27');
    const marks = [...screen.getByTestId('work-time-ruler').querySelectorAll('span')];
    // Proportional to the extent that ends at now, not to the whole day.
    expect(marks.at(-2)).toHaveStyle({ left: `${(Date.parse('2026-09-21T15:00:00Z') - dayStart) / (rightNow - dayStart) * 100}%` });
  });

  it('spaces hour marks by the extent it has to cover', () => {
    const value = activity();
    const base = Date.parse('2026-09-21T12:00:00Z');
    const render90 = (hours: number) => {
      value.bounds = { start: base, end: base + hours * 60 * 60_000 };
      value.window = { start: base, end: base + hours * 60 * 60_000, following: true };
      value.now = base + hours * 60 * 60_000;
      const view = render(<WorkTimeWindow activity={value} timezone="UTC" />);
      const marks = [...view.getByTestId('work-time-ruler').querySelectorAll('span')].slice(0, -1).map((span) => span.textContent!);
      view.unmount();
      return marks;
    };
    expect(render90(2)).toEqual(['12:00', '12:30', '13:00', '13:30']);
    expect(render90(6)).toEqual(['12:00', '13:00', '14:00', '15:00', '16:00']);
    expect(render90(12)).toEqual(['12:00', '14:00', '16:00', '18:00', '20:00']);
    expect(render90(20)).toEqual(['12:00', '15:00', '18:00', '21:00', '0:00', '3:00']);
  });

  it('steps and scrubs actual bounds, including a 25-hour day, without claiming replay', () => {
    const value = activity();
    value.bounds = { start, end: start + 25 * 60 * 60_000 };
    value.window = { start: value.bounds.end - 15 * 60_000, end: value.bounds.end, following: true };
    render(<WorkTimeWindow activity={value} timezone="America/New_York" />);
    fireEvent.click(screen.getByRole('button', { name: 'Previous interval' }));
    expect(value.onWindowChange).toHaveBeenLastCalledWith({ start: value.bounds.end - 30 * 60_000, end: value.bounds.end - 15 * 60_000, following: false });
    fireEvent.change(screen.getByRole('combobox', { name: 'Interval duration' }), { target: { value: 'day' } });
    expect(value.onWindowChange).toHaveBeenLastCalledWith({ start, end: value.bounds.end, following: true });
    fireEvent.change(screen.getByRole('slider', { name: 'Interval start' }), { target: { value: start + 60_000 } });
    expect(value.onWindowChange).toHaveBeenLastCalledWith({ start: start + 60_000, end: value.bounds.end, following: false });
  });
});

describe('activity canvas background', () => {
  it('wears the ripple grid by default, in place of React Flow\'s dots', () => {
    render(<WorkGraph {...props()} />);
    expect(screen.getByTestId('work-activity-canvas')).toHaveAttribute('data-background', 'ripple-grid');
    expect(screen.getByTestId('work-activity-ripple')).toBeInTheDocument();
  });

  it('drops to a plain canvas — and creates no GL context — on request', () => {
    render(<WorkGraph {...props()} background="plain" />);
    expect(screen.getByTestId('work-activity-canvas')).toHaveAttribute('data-background', 'plain');
    expect(screen.queryByTestId('work-activity-ripple')).not.toBeInTheDocument();
    expect(screen.getByTestId('work-activity-canvas')).not.toHaveAttribute('data-backdrop-ink');
  });

  it('inks the grid for the theme it is inside — light paints a white ground, dark must not', () => {
    const { unmount } = render(<div data-theme="light"><WorkGraph {...props()} /></div>);
    expect(screen.getByTestId('work-activity-canvas')).toHaveAttribute('data-backdrop-ink', 'light');
    unmount();

    render(<div data-theme="dark"><WorkGraph {...props()} /></div>);
    expect(screen.getByTestId('work-activity-canvas')).toHaveAttribute('data-backdrop-ink', 'dark');
  });
});
