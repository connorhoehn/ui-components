// The keyboard model the tree now carries itself. Two consuming apps read the
// rendered DOM back to bolt this on from outside; this pins what they relied on.
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TreeView, type TreeNode } from '../TreeView';

const NODES: TreeNode[] = [
  { id: 'a', title: 'Alpha', parentId: null, isDir: true },
  { id: 'a1', title: 'Alpha one', parentId: 'a' },
  { id: 'a2', title: 'Alpha two', parentId: 'a' },
  { id: 'b', title: 'Beta', parentId: null, isDir: true },
  { id: 'b1', title: 'Beta one', parentId: 'b' },
];

const row = (id: string) => screen.getByTestId(`tree-view-row-${id}`);

afterEach(cleanup);

describe('TreeView keyboard', () => {
  it('puts exactly one row in the tab order — the selected one', () => {
    render(<TreeView nodes={NODES} selectedId="a2" onSelect={() => {}} />);
    expect(row('a2').tabIndex).toBe(0);
    expect(row('a').tabIndex).toBe(-1);
    expect(row('a1').tabIndex).toBe(-1);
  });

  it('carries aria-level and, on a directory, aria-expanded', () => {
    render(<TreeView nodes={NODES} selectedId="a1" onSelect={() => {}} />);
    expect(row('a').getAttribute('aria-level')).toBe('1');
    expect(row('a1').getAttribute('aria-level')).toBe('2');
    expect(row('a').getAttribute('aria-expanded')).toBe('true');
    expect(row('b').getAttribute('aria-expanded')).toBe('false');
    expect(row('a1').hasAttribute('aria-expanded')).toBe(false);
  });

  it('walks the VISIBLE rows with the arrows, skipping a closed directory’s children', () => {
    render(<TreeView nodes={NODES} selectedId="a" onSelect={() => {}} defaultExpanded={['a']} />);
    row('a').focus();
    fireEvent.keyDown(row('a'), { key: 'ArrowDown' });
    expect(document.activeElement).toBe(row('a1'));
    fireEvent.keyDown(row('a1'), { key: 'End' });
    // `b` is closed, so `b1` is not visible and End lands on `b`.
    expect(document.activeElement).toBe(row('b'));
    fireEvent.keyDown(row('b'), { key: 'Home' });
    expect(document.activeElement).toBe(row('a'));
  });

  it('opens with ArrowRight, steps into an open directory, closes and steps up with ArrowLeft', () => {
    render(<TreeView nodes={NODES} selectedId="b" onSelect={() => {}} />);
    row('b').focus();
    fireEvent.keyDown(row('b'), { key: 'ArrowRight' });
    expect(row('b').getAttribute('aria-expanded')).toBe('true');
    fireEvent.keyDown(row('b'), { key: 'ArrowRight' });
    expect(document.activeElement).toBe(row('b1'));
    fireEvent.keyDown(row('b1'), { key: 'ArrowLeft' });
    // A leaf: up to the parent.
    expect(document.activeElement).toBe(row('b'));
    fireEvent.keyDown(row('b'), { key: 'ArrowLeft' });
    expect(row('b').getAttribute('aria-expanded')).toBe('false');
  });

  it('selects with Enter and Space', () => {
    const onSelect = vi.fn();
    render(<TreeView nodes={NODES} selectedId={null} onSelect={onSelect} defaultExpanded={['a']} />);
    fireEvent.keyDown(row('a1'), { key: 'Enter' });
    fireEvent.keyDown(row('a2'), { key: ' ' });
    expect(onSelect.mock.calls.map((c) => c[0])).toEqual(['a1', 'a2']);
  });

  it('is fully controllable: renders `expanded` verbatim and reports every change', () => {
    const onToggle = vi.fn();
    const { rerender } = render(
      <TreeView nodes={NODES} selectedId={null} onSelect={() => {}} expanded={[]} onToggle={onToggle} />,
    );
    expect(screen.queryByTestId('tree-view-row-a1')).toBeNull();
    fireEvent.click(screen.getAllByLabelText('Expand')[0]!);
    // Reported, not applied — the host owns the set.
    expect(onToggle).toHaveBeenCalledWith('a', true);
    expect(screen.queryByTestId('tree-view-row-a1')).toBeNull();
    rerender(<TreeView nodes={NODES} selectedId={null} onSelect={() => {}} expanded={['a']} onToggle={onToggle} />);
    expect(screen.getByTestId('tree-view-row-a1')).toBeTruthy();
  });

  it('asks the host to open the ancestors of a selection it cannot see', () => {
    const onToggle = vi.fn();
    render(<TreeView nodes={NODES} selectedId="b1" onSelect={() => {}} expanded={[]} onToggle={onToggle} />);
    expect(onToggle).toHaveBeenCalledWith('b', true);
  });
});

describe('TreeView row status', () => {
  it('draws a pending move translucent, inert and busy; a landed one tinted', () => {
    render(
      <TreeView
        nodes={[
          { id: 'p', title: 'Pending', parentId: null, status: 'pending' },
          { id: 'm', title: 'Moved', parentId: null, status: 'moved' },
          { id: 'n', title: 'Plain', parentId: null },
        ]}
        selectedId={null}
        onSelect={() => {}}
        onReorder={() => {}}
      />,
    );
    const pending = row('p');
    expect(pending.getAttribute('aria-busy')).toBe('true');
    expect(pending.className).toContain('opacity-50');
    expect(pending.className).toContain('pointer-events-none');
    // Not a drag source while in flight.
    expect(pending.getAttribute('draggable')).toBe('false');
    expect(row('m').getAttribute('data-status')).toBe('moved');
    expect(row('m').className).toContain('bg-success/10');
    expect(row('n').hasAttribute('aria-busy')).toBe(false);
    expect(row('n').getAttribute('draggable')).toBe('true');
  });
});
