import { render, screen } from '@testing-library/react';
import { Table, TableBody, TableHead, TableRow, TableTd, TableTh } from '../../ui/Table';
import { DataTable } from '../DataTable';
import { RowActions } from '../RowActions';
import { CheckIcon } from '../../ui/Icons';

function cells(size: 'xs' | 'sm' | 'md') {
  render(
    <Table size={size}>
      <TableHead><tr><TableTh>Name</TableTh></tr></TableHead>
      <TableBody><TableRow><TableTd>Ada</TableTd></TableRow></TableBody>
    </Table>,
  );
  return { th: screen.getByRole('columnheader'), td: screen.getByRole('cell'), table: screen.getByRole('table') };
}

describe('Table size="xs"', () => {
  it('draws 36px rows with 14px body text, the 12px header and the same side inset', () => {
    const { th, td, table } = cells('xs');
    expect(table).toHaveAttribute('data-size', 'xs');
    expect(td.className).toContain('h-[var(--ui-table-row-xs,2.25rem)]');
    expect(td.className).toContain('text-sm');
    expect(td.className).toContain('px-[var(--ui-table-inset,0.75rem)]');
    expect(th.className).toContain('text-xs');
    expect(th.className).toContain('px-[var(--ui-table-inset,0.75rem)]');
  });

  it('leaves sm and md as they were', () => {
    const sm = cells('sm');
    expect(sm.td.className).toContain('h-[var(--ui-table-row,2.75rem)]');
    expect(sm.table).toHaveAttribute('data-size', 'sm');
    sm.table.remove();
    const md = cells('md');
    expect(md.td.className).toContain('py-3');
    expect(md.table).not.toHaveAttribute('data-size');
  });

  it('DataTable passes xs through, and a row keeps its 28px icon buttons', () => {
    render(
      <DataTable
        size="xs"
        data={[{ id: 'a', name: 'Ada' }]}
        keyField={(r) => r.id}
        columns={[{ key: 'name', header: 'Name' }]}
        rowActions={(r) => <RowActions name={r.name} actions={[{ icon: <CheckIcon />, label: 'Approve', onClick: () => {} }]} />}
      />,
    );
    expect(screen.getByRole('table')).toHaveAttribute('data-size', 'xs');
    // 28px (h-7) control inside a 36px row.
    expect(screen.getByRole('button', { name: 'Approve, Ada' }).className).toMatch(/\bh-7\b|size-7|ui-control-sm/);
  });
});
