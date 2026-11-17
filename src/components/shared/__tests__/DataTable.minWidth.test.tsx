import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DataTable, type DataTableColumn } from '../DataTable';

interface Row { id: string; name: string; notes: string }
const rows: Row[] = [{ id: 'a', name: 'Ada', notes: 'Notes' }];

describe('DataTable column minWidth', () => {
  it('sets min-width on the header cell and marks the table', () => {
    const columns: DataTableColumn<Row>[] = [
      { key: 'name', header: 'Candidate', minWidth: '12rem', width: '20%' },
      { key: 'notes', header: 'Notes' },
    ];
    const { container } = render(<DataTable data={rows} columns={columns} keyField={(r) => r.id} stickyFirstColumn />);
    const [name, notes] = Array.from(container.querySelectorAll<HTMLElement>('thead th'));
    expect(name.style.minWidth).toBe('12rem');
    expect(name.style.width).toBe('20%');
    expect(name.getAttribute('data-min-width')).toBe('12rem');
    expect(notes.style.minWidth).toBe('');
    expect(notes.hasAttribute('data-min-width')).toBe(false);
    const table = container.querySelector('table')!;
    expect(table.hasAttribute('data-min-width-columns')).toBe(true);
    expect(table.hasAttribute('data-sticky-first-column')).toBe(true);
  });

  it('leaves the output unchanged without minWidth', () => {
    const columns: DataTableColumn<Row>[] = [{ key: 'name', header: 'Candidate', width: '10rem' }, { key: 'notes', header: 'Notes' }];
    const { container } = render(<DataTable data={rows} columns={columns} keyField={(r) => r.id} />);
    const th = container.querySelector<HTMLElement>('thead th')!;
    expect(th.getAttribute('style')).toBe('width: 10rem;');
    expect(container.querySelector('table')!.hasAttribute('data-min-width-columns')).toBe(false);
  });
});
