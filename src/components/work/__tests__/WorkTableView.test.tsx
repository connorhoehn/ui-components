import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { WorkTableView, type WorkTableViewProps } from '../WorkTableView';

afterEach(cleanup);
const props: WorkTableViewProps = {
  query: '', onQueryChange: vi.fn(), onOpenItem: vi.fn(),
  groups: [{ id: 'next', title: 'Next up' }, { id: 'progress', title: 'In progress' }, { id: 'done', title: 'Done', defaultOpen: false }],
  items: [
    { id: 'a', title: 'Fix contract', groupId: 'next', kindLabel: 'Bug', points: 3, owner: { id: 'iv', name: 'Isabel Vasquez' } },
    { id: 'b', title: 'Publish contracts', groupId: 'progress', kindLabel: 'Task' },
    { id: 'c', title: 'Previous release', groupId: 'done', done: true },
  ],
};
describe('WorkTableView', () => {
  it('shows actual data in aligned columns and keeps finished work collapsed', () => {
    render(<WorkTableView {...props} />);
    for (const name of ['Work item', 'Owner', 'Points']) expect(screen.getByRole('columnheader', { name })).toBeInTheDocument();
    expect(screen.getByText('1 next up · 1 in progress · 1 done')).toBeInTheDocument();
    expect(screen.queryByText('Previous release')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Done 1' }));
    expect(screen.getByText('Previous release')).toBeInTheDocument();
    expect(screen.getAllByText('Unsized')).toHaveLength(2);
  });
  it('truncates long titles, types and owners inside their own columns', () => {
    const long = 'ORG-AUTH-8 ' + 'very long work title '.repeat(8).trim();
    render(<WorkTableView {...props} onOpenItem={undefined} items={[{ id: 'l', title: long, groupId: 'next', kindLabel: 'Extraordinarily long kind label', owner: { id: 'o', name: 'Bartholomew Featherstonehaugh-Cholmondeley' } }]} />);
    const title = screen.getByText(long);
    expect(title).toHaveClass('min-w-0', 'truncate');
    expect(title).toHaveAttribute('title', long);
    expect(screen.getByTestId('work-table-title-cell')).toHaveClass('min-w-0');
    const owner = screen.getByText('Bartholomew Featherstonehaugh-Cholmondeley');
    expect(owner).toHaveClass('min-w-0', 'truncate');
    expect(owner).toHaveAttribute('title', 'Bartholomew Featherstonehaugh-Cholmondeley');
    expect(screen.getByTestId('work-table-owner-cell')).toHaveClass('min-w-0');
    expect(screen.getByText('Extraordinarily long kind label')).toHaveClass('truncate');
  });
  it('opens a row and toggles completion independently', () => {
    const onOpenItem = vi.fn(), onToggleDone = vi.fn();
    render(<WorkTableView {...props} onOpenItem={onOpenItem} onToggleDone={onToggleDone} />);
    fireEvent.click(screen.getByLabelText('Mark Fix contract done'));
    expect(onToggleDone).toHaveBeenCalledWith(props.items[0], true);
    expect(onOpenItem).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Open Fix contract' }));
    expect(onOpenItem).toHaveBeenCalledWith(props.items[0]);
  });
  it('regroups by owner without dropping unassigned work', () => {
    render(<WorkTableView {...props} />);
    fireEvent.click(screen.getByRole('button', { name: 'Group work' }));
    fireEvent.click(screen.getByRole('menuitemcheckbox', { name: 'Owner' }));
    expect(screen.getByRole('button', { name: 'Isabel Vasquez 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Unassigned 2' })).toBeInTheDocument();
  });
  it('passes search and sort to the host without inventing writes', () => {
    const onQueryChange = vi.fn(), onSortChange = vi.fn();
    render(<WorkTableView {...props} onQueryChange={onQueryChange} sort="title" sortOptions={[{ value: 'title', label: 'Title' }, { value: 'points', label: 'Points' }]} onSortChange={onSortChange} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Search work' }), { target: { value: 'contract' } });
    expect(onQueryChange).toHaveBeenCalledWith('contract');
    fireEvent.click(screen.getByRole('button', { name: 'Sort work' }));
    fireEvent.click(screen.getByRole('menuitemcheckbox', { name: 'Points' }));
    expect(onSortChange).toHaveBeenCalledWith('points');
  });
  it('respects pending and disabled rows', () => {
    render(<WorkTableView {...props} items={[{ ...props.items[0], donePending: true, disabled: true }]} onToggleDone={() => {}} />);
    expect(screen.getByLabelText('Mark Fix contract done')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Open Fix contract' })).toBeDisabled();
  });
  it('shows read failures and retry without claiming a total or showing stale rows', () => {
    const onRetry = vi.fn();
    render(<WorkTableView {...props} error="Unavailable" onRetry={onRetry} />);
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByText('3 work items')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('places keys and state below titles, without decorative completion icons', () => {
    render(<WorkTableView {...props} items={[{ ...props.items[0], reference: 'ORG-UI-11', signal: { state: 'blocked', label: 'Blocked' } }]} />);
    expect(screen.getByText('ORG-UI-11').closest('[data-work-description]')).toContainElement(screen.getByText('Blocked'));
    expect(screen.getByText('Fix contract').closest('[data-work-description]')).toBeNull();
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });
  it('opens from an owner cell without double-opening from nested controls', () => {
    const onOpenItem = vi.fn(), onSignal = vi.fn();
    render(<WorkTableView {...props} onOpenItem={onOpenItem} items={[{ ...props.items[0], signal: { state: 'running', label: 'Agent running', onClick: onSignal } }]} />);
    fireEvent.click(screen.getByText('Isabel Vasquez'));
    expect(onOpenItem).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByText('Fix contract'));
    expect(onOpenItem).toHaveBeenCalledTimes(2);
    fireEvent.click(screen.getByRole('button', { name: 'Agent running' }));
    expect(onSignal).toHaveBeenCalledOnce();
    expect(onOpenItem).toHaveBeenCalledTimes(2);
  });
});
