import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TreeView, type TreeNode } from '../TreeView';
import { FileKindMark } from '../FileKindMark';
import type { DropdownMenuSection } from '../DropdownMenu';

afterEach(cleanup);

const NODES: TreeNode[] = [
  { id: 'sprint', title: 'Sprint planning', parentId: null, isDir: true },
  { id: 'deck', title: 'Sprint review', parentId: 'sprint', hoverMeta: 'v4', icon: <FileKindMark kind="presentation" /> },
  { id: 'plan', title: 'Release plan', parentId: 'sprint', hoverMeta: 'v2' },
];

function menuFor(calls: string[]) {
  return (node: TreeNode): DropdownMenuSection[] | null =>
    node.isDir
      ? null
      : [{
          items: [
            { label: node.hoverMeta ?? 'v1', onSelect: () => calls.push(`version:${node.id}`) },
            { label: 'Rename', onSelect: () => calls.push(`rename:${node.id}`) },
            { label: 'Move', onSelect: () => calls.push(`move:${node.id}`) },
            { label: 'View details', onSelect: () => calls.push(`details:${node.id}`) },
          ],
        }];
}

describe('TreeView — hover metadata, icons and the row menu', () => {
  it('renders hoverMeta hidden until hover/focus, but still in the row', () => {
    render(<TreeView nodes={NODES} selectedId="deck" onSelect={() => {}} />);
    const meta = screen.getByTestId('tree-view-hover-meta-deck');
    expect(meta).toHaveTextContent('v4');
    expect(meta.className).toContain('sr-only');
    // Positioned row: the absolutely positioned sr-only meta stays inside the tree's scroller.
    expect(meta.parentElement!.className).toContain('relative');
    expect(meta.className).toContain('group-hover:not-sr-only');
    expect(meta.className).toContain('group-focus-within:not-sr-only');
    expect(screen.getByTestId('tree-view-row-deck')).toHaveTextContent('Sprint reviewv4');
  });

  it('renders a leading icon when given', () => {
    render(<TreeView nodes={NODES} selectedId="deck" onSelect={() => {}} />);
    expect(within(screen.getByTestId('tree-view-icon-deck')).getByTestId('file-kind-mark')).toHaveAttribute('data-kind', 'presentation');
  });

  it('is unchanged for a tree that passes neither', () => {
    render(<TreeView nodes={[{ id: 'a', title: 'A', parentId: null, meta: '3' }]} selectedId={null} onSelect={() => {}} />);
    const row = screen.getByTestId('tree-view-row-a');
    expect(row.querySelector('[data-tree-row-menu]')).toBeNull();
    expect(screen.queryByRole('button', { name: /Actions for/ })).toBeNull();
  });

  it('puts a labelled ⋯ menu on rows that have one, and none on rows that do not', () => {
    render(<TreeView nodes={NODES} selectedId="deck" onSelect={() => {}} rowMenu={menuFor([])} />);
    expect(screen.getByRole('button', { name: 'Actions for Sprint review' })).toHaveAttribute('aria-haspopup', 'menu');
    expect(screen.queryByRole('button', { name: 'Actions for Sprint planning' })).toBeNull();
  });

  it('opens a role=menu of menuitems from the ⋯ without selecting the row', () => {
    const calls: string[] = [];
    const onSelect = vi.fn();
    render(<TreeView nodes={NODES} selectedId="plan" onSelect={onSelect} rowMenu={menuFor(calls)} />);
    fireEvent.click(screen.getByRole('button', { name: 'Actions for Sprint review' }));
    expect(onSelect).not.toHaveBeenCalled();
    const menu = screen.getByRole('menu');
    expect(within(menu).getAllByRole('menuitem').map((i) => i.textContent)).toEqual(['v4', 'Rename', 'Move', 'View details']);
    fireEvent.click(within(menu).getByRole('menuitem', { name: 'View details' }));
    expect(calls).toEqual(['details:deck']);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('opens from the keyboard with Shift+F10 on the focused row and moves focus into the menu', async () => {
    const calls: string[] = [];
    render(<TreeView nodes={NODES} selectedId="deck" onSelect={() => {}} rowMenu={menuFor(calls)} />);
    const row = screen.getByTestId('tree-view-row-deck');
    row.focus();
    fireEvent.keyDown(row, { key: 'F10', shiftKey: true });
    // The popover moves focus on a microtask, after it has mounted.
    await act(async () => {});
    const menu = screen.getByRole('menu');
    const items = within(menu).getAllByRole('menuitem');
    expect(document.activeElement).toBe(items[0]);
    // Arrow keys move within the menu and do NOT walk the tree underneath.
    fireEvent.keyDown(items[0]!, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(items[1]);
    // Escape closes it and focus goes back to the row it was opened from.
    fireEvent.keyDown(items[1]!, { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
    expect(document.activeElement).toBe(row);
    fireEvent.keyDown(row, { key: 'ContextMenu' });
    await act(async () => {});
    fireEvent.click(screen.getByRole('menuitem', { name: 'Rename' }));
    expect(calls).toEqual(['rename:deck']);
  });

  it('opens from the context-menu key and from a right-click', () => {
    render(<TreeView nodes={NODES} selectedId="deck" onSelect={() => {}} rowMenu={menuFor([])} />);
    fireEvent.keyDown(screen.getByTestId('tree-view-row-plan'), { key: 'ContextMenu' });
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
    fireEvent.contextMenu(screen.getByTestId('tree-view-row-deck'));
    expect(screen.getByRole('button', { name: 'Actions for Sprint review' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('keeps only the focused row’s menu button in the tab order', () => {
    render(<TreeView nodes={NODES} selectedId="deck" onSelect={() => {}} rowMenu={menuFor([])} />);
    expect(screen.getByRole('button', { name: 'Actions for Sprint review' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('button', { name: 'Actions for Release plan' })).toHaveAttribute('tabindex', '-1');
  });

  it('uses the host’s label for the menu button', () => {
    render(<TreeView nodes={NODES} selectedId="deck" onSelect={() => {}} rowMenu={menuFor([])} rowMenuLabel={(n) => `More for ${n.title}`} />);
    expect(screen.getByRole('button', { name: 'More for Sprint review' })).toBeInTheDocument();
  });

  it('leaves Shift+F10 alone on a row without a menu', () => {
    render(<TreeView nodes={NODES} selectedId="deck" onSelect={() => {}} rowMenu={menuFor([])} />);
    const event = fireEvent.keyDown(screen.getByTestId('tree-view-row-sprint'), { key: 'F10', shiftKey: true });
    expect(event).toBe(true); // not preventDefault-ed
    expect(screen.queryByRole('menu')).toBeNull();
  });
});
