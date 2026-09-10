import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NodeGraph } from '../NodeGraph';
import type { GraphEdge, GraphNode } from '../types';

afterEach(cleanup);

const nodes: GraphNode[] = [
  { id: 'q', label: 'kubernetes', sublabel: '3 people', group: 'center' },
  { id: 'a', label: 'Grace Hopper', sublabel: 'Staff engineer', group: 'k8s', weight: 0.9 },
  { id: 'b', label: 'Bob Martinez', group: 'k8s', weight: 0.5, avatarUrl: 'https://example.test/bob.png' },
  { id: 'c', label: 'Nora DaSilva', group: 'helm', color: 'rebeccapurple' },
];
const edges: GraphEdge[] = [
  { from: 'q', to: 'a', label: 'k8s', weight: 0.9 },
  { from: 'q', to: 'b', label: 'k8s' },
  { from: 'q', to: 'c', label: 'helm' },
  { from: 'q', to: 'ghost' },
];

const transformOf = (id: string) => screen.getByTestId(`node-graph-node-${id}`).getAttribute('transform');

describe('NodeGraph', () => {
  it('draws every node and edge with stable positions across renders', () => {
    const { unmount } = render(<NodeGraph nodes={nodes} edges={edges} layout="force" />);
    const first = nodes.map((n) => transformOf(n.id));
    expect(screen.getAllByRole('button', { name: /Grace|Bob|Nora|kubernetes/ })).toHaveLength(4);
    expect(screen.getByTestId('node-graph-edge-q-a')).toBeInTheDocument();
    expect(screen.queryByTestId('node-graph-edge-q-ghost')).toBeNull(); // an edge to nothing draws nothing
    unmount();
    render(<NodeGraph nodes={nodes.map((n) => ({ ...n }))} edges={edges} layout="force" />);
    expect(nodes.map((n) => transformOf(n.id))).toEqual(first);
  });

  it('labels edges and exposes the sublabel as a hover title and in the accessible name', () => {
    render(<NodeGraph nodes={nodes} edges={edges} />);
    expect(screen.getByTestId('node-graph-edge-label-q-a')).toHaveTextContent('k8s');
    const grace = screen.getByRole('button', { name: 'Grace Hopper, Staff engineer' });
    expect(grace.querySelector('title')).toHaveTextContent('Staff engineer');
    expect(screen.getByRole('button', { name: 'Nora DaSilva' }).querySelector('title')).toHaveTextContent('Nora DaSilva');
  });

  it('selects on click and on Enter / Space from the keyboard, and marks the selection', () => {
    const onSelect = vi.fn();
    const { rerender } = render(<NodeGraph nodes={nodes} edges={edges} onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId('node-graph-node-a'));
    expect(onSelect).toHaveBeenLastCalledWith(expect.objectContaining({ id: 'a' }));
    const bob = screen.getByTestId('node-graph-node-b');
    expect(bob).toHaveAttribute('tabindex', '0');
    fireEvent.keyDown(bob, { key: 'Enter' });
    expect(onSelect).toHaveBeenLastCalledWith(expect.objectContaining({ id: 'b' }));
    fireEvent.keyDown(screen.getByTestId('node-graph-node-c'), { key: ' ' });
    expect(onSelect).toHaveBeenLastCalledWith(expect.objectContaining({ id: 'c' }));
    fireEvent.keyDown(bob, { key: 'Tab' });
    expect(onSelect).toHaveBeenCalledTimes(3);

    rerender(<NodeGraph nodes={nodes} edges={edges} onSelect={onSelect} selectedId="b" />);
    expect(bob).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('node-graph-node-a')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Selected Bob Martinez')).toBeInTheDocument();
  });

  it('renders an avatar image when given, initials otherwise, and honours a per-node colour', () => {
    render(<NodeGraph nodes={nodes} edges={edges} />);
    expect(screen.getByTestId('node-graph-node-b').querySelector('image')).toHaveAttribute('href', 'https://example.test/bob.png');
    expect(screen.getByTestId('node-graph-node-a')).toHaveTextContent('GH');
    expect(screen.getByTestId('node-graph-node-c').querySelector('circle[fill]')).toHaveAttribute('fill', 'rebeccapurple');
  });

  it('lists the groups in a legend, the centre bucket excluded', () => {
    render(<NodeGraph nodes={nodes} edges={edges} />);
    const legend = screen.getByRole('list', { name: 'Legend' });
    expect(legend).toHaveTextContent('k8s');
    expect(legend).toHaveTextContent('helm');
    expect(legend).not.toHaveTextContent('center');
  });

  it('has no legend when nothing is grouped', () => {
    render(<NodeGraph nodes={[{ id: 'x', label: 'x' }, { id: 'y', label: 'y' }]} edges={[]} />);
    expect(screen.queryByRole('list', { name: 'Legend' })).toBeNull();
  });

  it('pans by drag, zooms by wheel, and the reset button puts the view back', () => {
    render(<NodeGraph nodes={nodes} edges={edges} />);
    const svg = screen.getByTestId('node-graph-svg');
    const viewport = screen.getByTestId('node-graph-viewport');
    const reset = screen.getByRole('button', { name: 'Reset view' });
    expect(viewport).toHaveAttribute('transform', 'translate(0 0) scale(1)');
    expect(reset).toBeDisabled();

    fireEvent.mouseDown(svg, { button: 0, clientX: 10, clientY: 10 });
    fireEvent.mouseMove(window, { clientX: 40, clientY: 25 });
    fireEvent.mouseUp(window);
    expect(viewport).toHaveAttribute('transform', 'translate(30 15) scale(1)');

    fireEvent.wheel(svg, { deltaY: -100, clientX: 0, clientY: 0 });
    expect(viewport.getAttribute('transform')).toMatch(/scale\(1\.1/);

    expect(reset).toBeEnabled();
    fireEvent.click(reset);
    expect(viewport).toHaveAttribute('transform', 'translate(0 0) scale(1)');
  });

  it('does not start a pan when the press lands on a node', () => {
    render(<NodeGraph nodes={nodes} edges={edges} />);
    fireEvent.mouseDown(screen.getByTestId('node-graph-node-a'), { button: 0, clientX: 0, clientY: 0 });
    fireEvent.mouseMove(window, { clientX: 50, clientY: 50 });
    fireEvent.mouseUp(window);
    expect(screen.getByTestId('node-graph-viewport')).toHaveAttribute('transform', 'translate(0 0) scale(1)');
  });
});
