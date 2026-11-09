// DataTable `narrow` (2.515.3): the card form is container-query classes on the
// same table, so the contract is the markers, labels and the unchanged default.
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { DataTable, type DataTableColumn } from '../DataTable';

afterEach(cleanup);

interface Row { id: string; name: string; at: number }
const rows: Row[] = [{ id: 'a', name: 'Alpha', at: 1 }, { id: 'b', name: 'Bravo', at: 2 }];
const columns: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Name' },
  { key: 'at', header: <b>When</b>, label: 'Time' },
  { key: 'extra', header: <i>Extra</i> },
];

describe('DataTable narrow', () => {
  it('labels every cell: the column label, else the string header, else the key', () => {
    render(<DataTable data={rows} columns={columns} keyField={(r) => r.id} staticRows="test" narrow />);
    const cells = screen.getAllByRole('row')[1]!.querySelectorAll('td');
    expect(Array.from(cells).map((c) => c.getAttribute('data-label'))).toEqual(['Name', 'Time', 'extra']);
  });

  it('is its own size container and stacks under 40rem', () => {
    const { container } = render(<DataTable data={rows} columns={columns} keyField={(r) => r.id} staticRows="test" narrow />);
    expect((container.firstElementChild as HTMLElement).className).toContain('@container');
    expect(container.querySelector('thead')!.className).toContain('@max-[40rem]:sr-only');
    expect(container.querySelector('tbody tr')!.className).toContain('@max-[40rem]:block');
    expect(container.querySelector('td')!.className).toContain('before:content-[attr(data-label)]');
  });

  it('changes nothing when omitted', () => {
    const { container } = render(<DataTable data={rows} columns={columns} keyField={(r) => r.id} staticRows="test" />);
    expect((container.firstElementChild as HTMLElement).className).not.toContain('@container');
    expect(container.querySelector('td')!.hasAttribute('data-label')).toBe(false);
    expect(container.innerHTML).not.toContain('@max-[40rem]');
  });
});
