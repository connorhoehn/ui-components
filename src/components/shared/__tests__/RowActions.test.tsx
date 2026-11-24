import { render, screen, fireEvent } from '@testing-library/react';
import { RowActions } from '../RowActions';
import { DataTable } from '../DataTable';
import { CheckIcon } from '../../ui/Icons';

describe('RowActions', () => {
  it('names each icon button with the row and keeps a fixed order, then the menu', () => {
    render(
      <RowActions
        name="Take 2a"
        actions={[
          { icon: <CheckIcon />, label: 'Approve', onClick: () => {}, primary: true },
          false,
          { icon: <CheckIcon />, label: 'Make again', onClick: () => {}, disabled: true },
          { icon: <CheckIcon />, label: 'Pin', onClick: () => {}, pressed: true },
          { icon: <CheckIcon />, label: 'Fourth', onClick: () => {} },
        ]}
        menu={[{ label: 'Delete', onSelect: () => {} }]}
      />,
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.map((b) => b.getAttribute('aria-label'))).toEqual([
      'Approve, Take 2a', 'Make again, Take 2a', 'Pin, Take 2a', 'More actions for Take 2a',
    ]);
    expect(buttons[1]).toBeDisabled();
    expect(buttons[2]).toHaveAttribute('aria-pressed', 'true');
  });

  it('draws no menu without items', () => {
    render(<RowActions actions={[{ icon: <CheckIcon />, label: 'Open', onClick: () => {} }]} />);
    expect(screen.queryByTestId('row-actions-more')).toBeNull();
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
  });

  it('runs an action and a menu item without opening the row', () => {
    const onRowClick = vi.fn();
    const approve = vi.fn();
    const remove = vi.fn();
    render(
      <DataTable
        data={[{ id: 'a', name: 'Alpha' }]}
        columns={[{ key: 'name', header: 'Name' }]}
        keyField={(r) => r.id}
        onRowClick={onRowClick}
        rowActions={(r) => (
          <RowActions name={r.name} actions={[{ icon: <CheckIcon />, label: 'Approve', onClick: approve }]} menu={[{ label: 'Delete', onSelect: remove }]} />
        )}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Approve, Alpha' }));
    expect(approve).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: 'More actions for Alpha' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Delete' }));
    expect(remove).toHaveBeenCalledTimes(1);
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('marks its root as a part and right-aligns by justification, not an auto margin', () => {
    render(<RowActions actions={[{ icon: <CheckIcon />, label: 'Open', onClick: () => {} }]} />);
    const root = screen.getByTestId('row-actions');
    expect(root).toHaveAttribute('data-ui-part', 'row-actions');
    expect(root.className).toContain('justify-end');
    expect(root.className).not.toMatch(/\bm[lrx]-auto\b/);
  });

  it('shows a disabled item\'s reason and never runs it', () => {
    const remove = vi.fn();
    render(<RowActions name="Take 2a" menu={[{ label: 'Delete', onSelect: remove, disabled: true, disabledReason: 'It is in a cut' }]} />);
    fireEvent.click(screen.getByRole('button', { name: 'More actions for Take 2a' }));
    const item = screen.getByRole('menuitem', { name: 'Delete' });
    expect(item).toHaveAttribute('title', 'It is in a cut');
    expect(item).toHaveAccessibleDescription('It is in a cut');
    fireEvent.click(item);
    expect(remove).not.toHaveBeenCalled();
  });

  it('asks in place before a confirmed item runs, and the click never opens the row', () => {
    const onRowClick = vi.fn();
    const remove = vi.fn();
    render(
      <DataTable
        data={[{ id: 'a', name: 'Alpha' }]}
        columns={[{ key: 'name', header: 'Name' }]}
        keyField={(r) => r.id}
        onRowClick={onRowClick}
        rowActions={(r) => (
          <RowActions name={r.name} menu={[{ label: 'Delete', onSelect: remove, confirm: { question: 'Delete this take?', tone: 'destructive' } }]} />
        )}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'More actions for Alpha' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Delete' }));
    expect(remove).not.toHaveBeenCalled();
    const group = screen.getByRole('group', { name: 'Delete this take?' });
    expect(group).toHaveAttribute('data-confirm-state', 'asking');
    fireEvent.click(screen.getByTestId('row-actions-item-0-cancel'));
    expect(screen.queryByRole('group', { name: 'Delete this take?' })).toBeNull();
    fireEvent.click(screen.getByRole('menuitem', { name: 'Delete' }));
    fireEvent.click(screen.getByTestId('row-actions-item-0-confirm'));
    expect(remove).toHaveBeenCalledTimes(1);
    expect(onRowClick).not.toHaveBeenCalled();
  });
});
