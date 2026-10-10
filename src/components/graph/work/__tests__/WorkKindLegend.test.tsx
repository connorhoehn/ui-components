import type { ReactNode } from 'react';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WorkKindLegend } from '../WorkKindLegend';
import { WorkGraph } from '../WorkGraph';
import { workNodeKindCounts, WORK_NODE_KIND_LABELS } from '../workKinds';
import type { WorkGraphNodeData, WorkGraphProps } from '../types';

vi.mock('@xyflow/react', () => ({
  ReactFlow: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Handle: () => null, Background: () => null, Controls: () => null,
  EdgeLabelRenderer: ({ children }: { children: ReactNode }) => children,
  MarkerType: { ArrowClosed: 'arrow' }, Position: { Top: 'top', Bottom: 'bottom', Left: 'left', Right: 'right' },
}));

const at = '2026-10-07T12:00:00Z';
const node = (id: string, kind: WorkGraphNodeData['kind']): WorkGraphNodeData => ({ id, kind, title: id, status: 'idle', disclosure: 'details', capabilities: [], updatedAt: at });
const nodes = [node('a', 'run'), node('b', 'task'), node('c', 'run'), node('d', 'project')];
const edges = [{ id: 'e1', fromId: 'a', toId: 'b', relation: 'works-on' as const, status: 'idle' as const, disclosure: 'details' as const, capabilities: [], updatedAt: at }];

describe('WorkKindLegend', () => {
  it('lists each kind present once, in legend order, with its count', () => {
    expect(workNodeKindCounts(nodes)).toEqual([{ kind: 'project', count: 1 }, { kind: 'task', count: 1 }, { kind: 'run', count: 2 }]);
    render(<WorkKindLegend nodes={nodes} edges={edges} />);
    const items = within(screen.getByRole('list', { name: 'Kinds of work shown' })).getAllByRole('listitem');
    expect(items.map((item) => item.getAttribute('aria-label'))).toEqual(['1 Project', '1 Task', '2 Run']);
    expect(items[2]).toHaveTextContent(WORK_NODE_KIND_LABELS.run);
    expect(screen.getByTestId('work-kind-legend-counts')).toHaveTextContent('4 items · 1 link');
  });

  it('says nothing is shown honestly', () => {
    render(<WorkKindLegend nodes={[]} edges={[]} />);
    expect(within(screen.getByRole('list', { name: 'Kinds of work shown' })).queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.getByTestId('work-kind-legend-counts')).toHaveTextContent('0 items · 0 links');
  });

  it('rides the activity header with the host actions and view note', () => {
    const props: WorkGraphProps = {
      nodes, edges, selection: null, viewport: { x: 0, y: 0, zoom: 1 }, onSelectionChange: vi.fn(), onViewportChange: vi.fn(),
      activity: {
        efforts: [{ id: 'one', title: 'One', nodeIds: ['a', 'b'], edgeIds: ['e1'] }, { id: 'two', title: 'Two', nodeIds: ['c', 'd'], edgeIds: [] }],
        activeEdgeIds: [], mode: 'full', window: { start: 0, end: 60_000, following: false }, bounds: { start: 0, end: 86_400_000 },
        temporalMode: 'recent', view: { focusedEffortId: null, expandedSourceEfforts: [] }, onWindowChange: vi.fn(), onViewChange: vi.fn(),
        title: 'Auth Migration', subtitle: 'Initiative · Tuesday, October 7 · Live',
        headerActions: <button type="button">Host action</button>, viewNote: 'Newest work first', kindLegend: true,
      },
    };
    render(<WorkGraph {...props} />);
    const header = screen.getByTestId('work-activity-header');
    expect(within(header).getByRole('button', { name: 'Host action' })).toBeInTheDocument();
    expect(within(header).getByTestId('work-kind-legend-counts')).toHaveTextContent('4 items · 1 link');
    expect(screen.getByTestId('work-activity-header-subtitle')).toHaveTextContent('Tuesday, October 7');
    expect(screen.getByTestId('work-activity-header-view-note')).toHaveTextContent('Newest work first');
  });

  it('draws no legend unless asked', () => {
    const props: WorkGraphProps = {
      nodes, edges, selection: null, viewport: { x: 0, y: 0, zoom: 1 }, onSelectionChange: vi.fn(), onViewportChange: vi.fn(),
      activity: {
        efforts: [{ id: 'one', title: 'One', nodeIds: ['a'], edgeIds: [] }], activeEdgeIds: [], mode: 'full',
        window: { start: 0, end: 60_000, following: false }, bounds: { start: 0, end: 86_400_000 }, temporalMode: 'recent',
        view: { focusedEffortId: null, expandedSourceEfforts: [] }, onWindowChange: vi.fn(), onViewChange: vi.fn(), title: 'Plain',
      },
    };
    render(<WorkGraph {...props} />);
    expect(screen.queryByTestId('work-kind-legend')).not.toBeInTheDocument();
  });
});
