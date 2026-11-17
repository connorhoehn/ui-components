import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DataTable, type DataTableColumn, type DataTableColumnGroup } from '../DataTable';

interface Row { id: string; name: string; r1a: string; r1b: string; r2a: string; notes: string }

const rows: Row[] = [
  { id: 'a', name: 'Ada', r1a: 'Yes', r1b: 'No', r2a: 'Yes', notes: 'A long paragraph of interviewer notes that should wrap onto several lines.' },
  { id: 'b', name: 'Bo', r1a: 'No', r1b: 'Yes', r2a: 'No', notes: 'Short.' },
];
const columns: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Candidate' },
  { key: 'r1a', header: 'Kim', group: 'r1' },
  { key: 'r1b', header: 'Lee', group: 'r1' },
  { key: 'r2a', header: 'Max', group: 'r2' },
  { key: 'notes', header: 'Notes' },
];
const groups: DataTableColumnGroup[] = [{ key: 'r1', header: 'Round 1' }, { key: 'r2', header: 'Round 2' }];
const table = (props: Partial<Parameters<typeof DataTable<Row>>[0]> = {}) =>
  render(<DataTable data={rows} columns={columns} keyField={(r) => r.id} {...props} />);

describe('DataTable column groups', () => {
  it('draws a header row spanning each group of adjacent columns', () => {
    const { container } = table({ columnGroups: groups });
    const groupRow = container.querySelector('tr[data-column-groups]')!;
    const cells = Array.from(groupRow.querySelectorAll('th'));
    expect(cells.map((c) => [c.textContent, c.colSpan])).toEqual([['', 1], ['Round 1', 2], ['Round 2', 1], ['', 1]]);
    const r1 = groupRow.querySelector('[data-column-group="r1"]')!;
    expect(r1.getAttribute('scope')).toBe('colgroup');
    expect(r1.className).toContain('text-center');
    // The column headers stay one row below.
    expect(container.querySelectorAll('thead tr')).toHaveLength(2);
  });

  it('falls back to the key as the header and adds a trailing cell for actions', () => {
    const { container } = table({ rowActions: () => <button type="button">Open</button> });
    const cells = Array.from(container.querySelectorAll('tr[data-column-groups] th'));
    expect(cells.map((c) => c.textContent)).toEqual(['', 'r1', 'r2', '', '']);
  });

  it('draws no group row when no column has a group (unchanged output)', () => {
    const { container } = render(<DataTable data={rows} columns={columns.map(({ group: _g, ...c }) => c)} keyField={(r) => r.id} columnGroups={groups} />);
    expect(container.querySelector('tr[data-column-groups]')).toBeNull();
    expect(container.querySelectorAll('thead tr')).toHaveLength(1);
  });
});

describe('DataTable sticky first column', () => {
  it('pins the first column header and cells, keeps the row fill, and drops the clipping frame', () => {
    const { container } = table({ stickyFirstColumn: true, columnGroups: groups });
    const table$ = container.querySelector('table')!;
    expect(table$.hasAttribute('data-sticky-first-column')).toBe(true);
    expect(table$.className).not.toContain('overflow-hidden');
    const stickies = container.querySelectorAll('[data-sticky-column]');
    expect(stickies).toHaveLength(1 + rows.length);
    for (const el of Array.from(stickies)) expect(el.className).toContain('sticky');
    const firstBody = within(container.querySelector('tbody')!).getAllByRole('row')[0]!;
    expect(firstBody.className).toContain('bg-surface');
    expect(firstBody.querySelector('td')!.className).toContain('bg-inherit');
    // The group row's first cell is pinned with it.
    expect(container.querySelector('tr[data-column-groups] th')!.className).toContain('sticky');
  });

  it('is off by default', () => {
    const { container } = table();
    expect(container.querySelector('[data-sticky-column]')).toBeNull();
    expect(container.querySelector('table')!.className).toContain('overflow-hidden');
  });
});

describe('DataTable rowHeight="content"', () => {
  it('lets prose wrap in a compact table: no fixed height, no single line', () => {
    table({ rowHeight: 'content', size: 'sm' });
    const cell = screen.getByText(/long paragraph/);
    expect(cell.tagName).toBe('TD');
    expect(cell.className).toContain('whitespace-normal');
    expect(cell.className).toContain('h-auto');
    expect(cell.className).not.toContain('whitespace-nowrap');
    expect(cell.className).not.toMatch(/h-\[var\(--ui-table-row/);
  });

  it('keeps the fixed compact row by default', () => {
    table({ size: 'sm' });
    const cell = screen.getByText(/long paragraph/);
    expect(cell.className).toContain('whitespace-nowrap');
  });

  it('still truncates a truncate column', () => {
    render(<DataTable data={rows} rowHeight="content" size="sm" keyField={(r) => r.id}
      columns={[{ key: 'name', header: 'Name' }, { key: 'notes', header: 'Notes', truncate: true }]} />);
    const cell = screen.getAllByText(/long paragraph/)[0]!.closest('td')!;
    expect(cell.className).toContain('whitespace-nowrap');
  });
});
