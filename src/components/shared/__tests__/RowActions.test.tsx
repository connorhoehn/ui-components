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
});
