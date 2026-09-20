import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { TreeView, type TreeNode } from '../TreeView';

const NODES: TreeNode[] = [
  { id: 'root', title: 'Root', parentId: null, isDir: true },
  { id: 'child-1', title: 'Child One', parentId: 'root' },
  { id: 'child-2', title: 'Child Two', parentId: 'root' },
  { id: 'leaf', title: 'Standalone leaf', parentId: null },
];

afterEach(cleanup);

describe('TreeView', () => {
  it('keeps synthetic rows selectable without making them drag sources', () => {
    let selected = '';
    render(<TreeView nodes={NODES} selectedId={null} onSelect={id => { selected = id; }} onReorder={() => {}}
      canDragNode={node => node.id !== 'leaf'} />);
    const row = screen.getByTestId('tree-view-row-leaf');
    expect(row).toHaveAttribute('draggable', 'false');
    fireEvent.click(row);
    expect(selected).toBe('leaf');
  });
  it('rejects a host-disallowed drop even when a drop event bypasses dragover', () => {
    let calls = 0;
    render(<TreeView nodes={NODES} selectedId={null} onSelect={() => {}} onReorder={() => { calls++; }} canDropNode={() => false} />);
    const dataTransfer = { setData: () => {}, dropEffect: '', effectAllowed: '' };
    fireEvent.dragStart(screen.getByTestId('tree-view-row-leaf'), { dataTransfer });
    fireEvent.drop(screen.getByTestId('tree-view-row-root'), { dataTransfer, clientY: 0 });
    expect(calls).toBe(0);
  });
  it('renders root rows and hides children until expanded', () => {
    render(<TreeView nodes={NODES} selectedId={null} onSelect={() => {}} />);
    expect(screen.getByText('Root')).toBeInTheDocument();
    expect(screen.getByText('Standalone leaf')).toBeInTheDocument();
    expect(screen.queryByText('Child One')).not.toBeInTheDocument();
  });

  it('expands a directory on caret click to reveal its children', () => {
    render(<TreeView nodes={NODES} selectedId={null} onSelect={() => {}} />);
    fireEvent.click(screen.getByLabelText('Expand'));
    expect(screen.getByText('Child One')).toBeInTheDocument();
    expect(screen.getByText('Child Two')).toBeInTheDocument();
  });

  it('collapses an expanded directory on a second caret click', () => {
    render(<TreeView nodes={NODES} selectedId={null} onSelect={() => {}} />);
    fireEvent.click(screen.getByLabelText('Expand'));
    expect(screen.getByText('Child One')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Collapse'));
    expect(screen.queryByText('Child One')).not.toBeInTheDocument();
  });

  it('auto-expands ancestors of the selected node', () => {
    render(<TreeView nodes={NODES} selectedId="child-2" onSelect={() => {}} />);
    expect(screen.getByText('Child Two')).toBeInTheDocument();
  });

  it('calls onSelect with the clicked node id and marks it selected', () => {
    let selected: string | null = null;
    render(<TreeView nodes={NODES} selectedId="leaf" onSelect={(id) => (selected = id)} />);
    fireEvent.click(screen.getByText('Root'));
    expect(selected).toBe('root');
    expect(screen.getByTestId('tree-view-row-leaf')).toHaveAttribute('aria-selected', 'true');
  });

  it('respects defaultExpanded', () => {
    render(<TreeView nodes={NODES} selectedId={null} onSelect={() => {}} defaultExpanded={['root']} />);
    expect(screen.getByText('Child One')).toBeInTheDocument();
  });

  it('renders trailing content per node', () => {
    render(
      <TreeView
        nodes={NODES}
        selectedId={null}
        onSelect={() => {}}
        renderTrailing={(n) => (n.id === 'root' ? <span data-testid="trailing-root">3</span> : null)}
      />,
    );
    expect(screen.getByTestId('trailing-root')).toHaveTextContent('3');
  });

  it('calls onReorder with the target parent and position on drop', () => {
    let call: [string, string | null, number] | null = null;
    render(
      <TreeView
        nodes={NODES}
        selectedId={null}
        onSelect={() => {}}
        defaultExpanded={['root']}
        onReorder={(id, targetParentId, position) => {
          call = [id, targetParentId, position];
        }}
      />,
    );
    const dataTransfer = { setData: () => {}, dropEffect: '', effectAllowed: '' };
    const leafRow = screen.getByTestId('tree-view-row-leaf');
    const rootRow = screen.getByTestId('tree-view-row-root');
    fireEvent.dragStart(leafRow, { dataTransfer });
    fireEvent.dragOver(rootRow, { dataTransfer, clientY: 0 });
    fireEvent.drop(rootRow, { dataTransfer, clientY: 0 });
    expect(call).not.toBeNull();
    expect(call![0]).toBe('leaf');
  });
});
