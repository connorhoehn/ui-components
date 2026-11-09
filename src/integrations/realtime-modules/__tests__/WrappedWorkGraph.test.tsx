import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { WrappedWorkGraph, adaptWorkGraphState } from '../WrappedWorkGraph';
import type { RMUseWorkGraphReturn, RMWorkGraphNode } from '../types';
import type { WrappedWorkGraphCanvasProps } from '../WrappedWorkGraph';

const node = (id: string, title: string, status: RMWorkGraphNode['status'] = 'running'): RMWorkGraphNode => ({
  id, kind: 'run', title, status, disclosure: 'details', updatedAt: '2026-11-08T09:00:00Z', capabilities: ['view-run'],
});

const hook = (over: Partial<RMUseWorkGraphReturn> = {}, nodes: RMWorkGraphNode[] = [node('n1', 'Draw Toby'), node('n2', 'Mesh Mina', 'waiting')]): RMUseWorkGraphReturn => ({
  graph: {
    nodes: Object.fromEntries(nodes.map((n) => [n.id, n])),
    edges: {
      e1: { id: 'e1', fromId: 'n1', toId: 'n2', relation: 'produced', status: 'completed', disclosure: 'details', updatedAt: '2026-11-08T09:00:00Z', capabilities: [] },
      dangling: { id: 'dangling', fromId: 'n1', toId: 'gone', relation: 'produced', status: 'completed', disclosure: 'details', updatedAt: '2026-11-08T09:00:00Z', capabilities: [] },
    },
    sources: { pipeline: { source: 'pipeline', health: 'available', checkedAt: '2026-11-08T09:00:00Z' } },
    status: 'ready',
    scope: { personId: 'show:1', day: '2026-11-08', timezone: 'UTC' },
  },
  status: 'ready',
  error: null,
  retry: vi.fn(),
  ...over,
});

describe('adaptWorkGraphState', () => {
  it('maps records to arrays, drops edges to nodes outside the view, and maps status', () => {
    const a = adaptWorkGraphState(hook());
    expect(a.nodes.map((n) => n.id)).toEqual(['n1', 'n2']);
    expect(a.edges.map((e) => e.id)).toEqual(['e1']);
    expect(a.state).toBe('ready');
    expect(adaptWorkGraphState(hook({ status: 'loading' })).state).toBe('loading');
    expect(adaptWorkGraphState(hook({ status: 'idle' })).state).toBe('loading');
    expect(adaptWorkGraphState(hook({ status: 'partial' })).state).toBe('partial');
    expect(adaptWorkGraphState(hook({ status: 'error', error: 'snapshot-unavailable' })).state).toBe('error');
    expect(adaptWorkGraphState(hook({}, [])).state).toBe('empty');
    expect(adaptWorkGraphState(hook({ error: 'stream-unavailable' })).state).toBe('partial');
  });
});

describe('WrappedWorkGraph', () => {
  it('lists the work and inspects a selected item (no canvas, no React Flow)', async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();
    render(<WrappedWorkGraph workGraph={hook()} onSelectionChange={onSelectionChange} />);
    const root = screen.getByTestId('wrapped-work-graph');
    expect(root).toHaveAttribute('data-wrapped-work-graph', 'list');
    expect(root).toHaveAttribute('data-state', 'ready');
    await user.click(screen.getByRole('button', { name: 'Work item: Draw Toby' }));
    expect(onSelectionChange).toHaveBeenCalledWith({ kind: 'node', id: 'n1' });
    expect(screen.getByRole('complementary', { name: 'Work details' })).toHaveTextContent('Draw Toby');
  });

  it('error: says why and Retry calls the hook', async () => {
    const h = hook({ status: 'error', error: 'snapshot-unavailable' });
    const user = userEvent.setup();
    render(<WrappedWorkGraph workGraph={h} />);
    expect(screen.getByTestId('wrapped-work-graph-error')).toHaveTextContent('could not be loaded');
    await user.click(screen.getByRole('button', { name: 'Retry' }));
    expect(h.retry).toHaveBeenCalledOnce();
  });

  it('loading and empty states', () => {
    const { rerender } = render(<WrappedWorkGraph workGraph={hook({ status: 'loading' })} />);
    expect(screen.getByTestId('wrapped-work-graph-loading')).toBeInTheDocument();
    rerender(<WrappedWorkGraph workGraph={hook({}, [])} />);
    expect(screen.getByText('No work yet')).toBeInTheDocument();
  });

  it('an injected canvas gets the adapted props, the scope day and a working selection', async () => {
    const seen: WrappedWorkGraphCanvasProps[] = [];
    const Canvas = (props: WrappedWorkGraphCanvasProps) => {
      seen.push(props);
      return <button type="button" onClick={() => props.onSelectionChange({ kind: 'node', id: 'n2' })}>{`canvas ${props.nodes.length} ${props.selection?.id ?? 'none'}`}</button>;
    };
    const user = userEvent.setup();
    render(<WrappedWorkGraph workGraph={hook()} canvas={Canvas} />);
    expect(screen.getByTestId('wrapped-work-graph')).toHaveAttribute('data-wrapped-work-graph', 'canvas');
    expect(seen.at(-1)?.day).toBe('2026-11-08');
    expect(seen.at(-1)?.edges).toHaveLength(1);
    await user.click(screen.getByRole('button', { name: 'canvas 2 none' }));
    expect(screen.getByRole('button', { name: 'canvas 2 n2' })).toBeInTheDocument();
  });
});
