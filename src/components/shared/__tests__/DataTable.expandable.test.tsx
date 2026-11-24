import { render, screen, fireEvent, within } from '@testing-library/react';
import { useState } from 'react';
import { DataTable, type DataTableColumn } from '../DataTable';

interface Item {
  id: string;
  name: string;
  takes: string;
  made: string;
  children?: Item[];
}

const data: Item[] = [
  {
    id: 'dot', name: 'Dot', takes: '3 takes', made: 'Nov 13',
    children: [
      { id: 'dot-a', name: 'Take 2a', takes: '4.5 s', made: 'x' },
      { id: 'dot-b', name: 'Take 2b', takes: '5.8 s', made: 'y' },
    ],
  },
  { id: 'gus', name: 'Gus', takes: '1 take', made: 'Nov 12', children: [{ id: 'gus-a', name: 'Take 1a', takes: '3.1 s', made: 'z' }] },
  { id: 'amy', name: 'Amy', takes: '0 takes', made: 'Nov 10' },
];

const columns: DataTableColumn<Item>[] = [
  { key: 'name', header: 'Character', sortable: true },
  { key: 'takes', header: 'Takes' },
  { key: 'made', header: 'Made' },
];

const bodyRows = () => within(screen.getAllByRole('rowgroup')[1]).getAllByRole('row');
const names = () => bodyRows().map((r) => within(r).getAllByRole('cell')[1].textContent);

describe('DataTable expandable rows (rowChildren)', () => {
  it('draws a chevron only for rows with children and no child rows while closed', () => {
    render(<DataTable data={data} columns={columns} keyField={(r) => r.id} rowChildren={(r) => r.children} />);
    expect(names()).toEqual(['Dot', 'Gus', 'Amy']);
    expect(screen.getByTestId('datatable-expand-dot')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId('datatable-expand-amy')).toBeNull();
    expect(bodyRows()[0]).toHaveAttribute('aria-level', '1');
    expect(bodyRows()[0]).toHaveAttribute('aria-expanded', 'false');
    expect(bodyRows()[2]).not.toHaveAttribute('aria-expanded');
  });

  it('opens a row to its children under the same headers, indented, at level 2', () => {
    render(<DataTable data={data} columns={columns} keyField={(r) => r.id} rowChildren={(r) => r.children} />);
    fireEvent.click(screen.getByTestId('datatable-expand-dot'));
    expect(names()).toEqual(['Dot', 'Take 2a', 'Take 2b', 'Gus', 'Amy']);
    const child = bodyRows()[1];
    expect(child).toHaveAttribute('aria-level', '2');
    expect(within(child).getAllByRole('cell')).toHaveLength(4);
    expect(child.querySelector('[data-row-indent]')?.textContent).toBe('Take 2a');
    expect(bodyRows()[0]).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('datatable-expand-dot')).toHaveAccessibleName('Hide the rows under Dot');
  });

  it('stripes every drawn row, children included', () => {
    render(<DataTable data={data} columns={columns} keyField={(r) => r.id} rowChildren={(r) => r.children} defaultExpanded={['dot']} />);
    const banded = bodyRows().map((r) => r.className.includes('bg-surface-inset'));
    expect(banded).toEqual([false, true, false, true, false]);
  });

  it('a chevron press never opens the row, and the native button toggles from the keyboard', () => {
    const onRowClick = vi.fn();
    render(<DataTable data={data} columns={columns} keyField={(r) => r.id} rowChildren={(r) => r.children} onRowClick={onRowClick} />);
    const chevron = screen.getByTestId('datatable-expand-gus');
    fireEvent.click(chevron);
    expect(onRowClick).not.toHaveBeenCalled();
    expect(names()).toContain('Take 1a');
    fireEvent.keyDown(chevron, { key: 'Enter' });
    expect(onRowClick).not.toHaveBeenCalled();
    expect(chevron.tagName).toBe('BUTTON');
  });

  it('controlled: reports the next keys and draws what it is given', () => {
    const seen: string[][] = [];
    function Host() {
      const [keys, setKeys] = useState<string[]>(['gus']);
      return <DataTable data={data} columns={columns} keyField={(r) => r.id} rowChildren={(r) => r.children}
        expandedKeys={keys} onExpandedChange={(k) => { seen.push(k); setKeys(k); }} />;
    }
    render(<Host />);
    expect(names()).toEqual(['Dot', 'Gus', 'Take 1a', 'Amy']);
    fireEvent.click(screen.getByTestId('datatable-expand-dot'));
    expect(seen).toEqual([['gus', 'dot']]);
    expect(names()).toEqual(['Dot', 'Take 2a', 'Take 2b', 'Gus', 'Take 1a', 'Amy']);
  });

  it('sorts the top-level rows and keeps children under their parent', () => {
    render(<DataTable data={data} columns={columns} keyField={(r) => r.id} rowChildren={(r) => r.children} defaultExpanded={['dot', 'gus']} />);
    fireEvent.click(screen.getByTestId('datatable-header-name'));
    expect(names()).toEqual(['Amy', 'Dot', 'Take 2a', 'Take 2b', 'Gus', 'Take 1a']);
    fireEvent.click(screen.getByTestId('datatable-header-name'));
    expect(names()).toEqual(['Gus', 'Take 1a', 'Dot', 'Take 2a', 'Take 2b', 'Amy']);
  });

  it('childColumns gives a child its own content and a cell spanning the next column', () => {
    render(<DataTable data={data} columns={columns} keyField={(r) => r.id} rowChildren={(r) => r.children} defaultExpanded={['dot']}
      childColumns={{ takes: { colSpan: 2, render: (c, p, i) => `${p.name} #${i + 1}: ${c.takes}` } }} />);
    const child = bodyRows()[1];
    const cells = within(child).getAllByRole('cell');
    expect(cells).toHaveLength(3);
    expect(cells[2]).toHaveAttribute('colspan', '2');
    expect(cells[2].textContent).toBe('Dot #1: 4.5 s');
    // The parent row keeps the column's own content.
    expect(within(bodyRows()[0]).getAllByRole('cell')).toHaveLength(4);
  });

  it('adds nothing when rowChildren is absent', () => {
    render(<DataTable data={data} columns={columns} keyField={(r) => r.id} />);
    expect(screen.getAllByRole('columnheader')).toHaveLength(3);
    expect(bodyRows()[0]).not.toHaveAttribute('aria-level');
    expect(bodyRows()[0]).not.toHaveAttribute('aria-expanded');
  });
});
