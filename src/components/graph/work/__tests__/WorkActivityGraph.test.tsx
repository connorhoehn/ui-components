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
    expect(inspector.queryByRole('tab', { name: /v3/ })).not.toBeInTheDocument();
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
    fireEvent.keyDown(screen.getByRole('button', { name: 'Sprint slides, running' }), { key: 'Enter' });
    expect(initial.onSelectionChange).toHaveBeenCalledWith({ kind: 'node', id: 'deck', revisionId: 'r2' });
    rerender(<WorkGraph {...initial} nodes={initial.nodes.map((node) => ({ ...node, updatedAt: new Date(end + 5000).toISOString() }))} />);
    expect(initial.onViewportChange).not.toHaveBeenCalled();
    fireEvent.change(screen.getByRole('combobox', { name: 'Focus activity' }), { target: { value: 'deck' } });
    expect(initial.activity!.onViewChange).toHaveBeenCalledWith({ ...initial.activity!.view, focusedEffortId: 'deck', overviewViewport: initial.viewport });
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
