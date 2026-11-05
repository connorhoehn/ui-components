import { render, screen, fireEvent, within } from '@testing-library/react';
import { DataTable, type DataTableColumn } from '../DataTable';

interface Row {
  id: string;
  name: string;
  status: string;
  count: number;
}

const rows: Row[] = [
  { id: 'a', name: 'Alpha', status: 'running', count: 3 },
  { id: 'b', name: 'Bravo', status: 'failed', count: 7 },
  { id: 'c', name: 'Charlie', status: 'pending', count: 1 },
  { id: 'd', name: 'Delta', status: 'running', count: 5 },
];

const columns: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'status', header: 'Status' },
  {
    key: 'count',
    header: 'Count',
    sortable: true,
    compare: (a, b) => a.count - b.count,
    render: (row) => <span data-testid={`count-${row.id}`}>×{row.count}</span>,
    align: 'right',
  },
];

const keyField = (row: Row) => row.id;


/** The table's search is collapsed to an icon by default (2.503.0); expand it first. */
function openSearch(): HTMLElement {
  const toggle = screen.queryByTestId('datatable-search-toggle');
  if (toggle) fireEvent.click(toggle);
  return screen.getByTestId('datatable-search');
}

describe('DataTable', () => {
  it('leaves a click or key on a control inside a clickable row to that control', () => {
    const open = vi.fn();
    const tick = vi.fn();
    render(<DataTable data={rows.slice(0, 1)} keyField={keyField} onRowClick={open}
      columns={[{ key: 'pick', header: '', render: (r) => <input type="checkbox" aria-label={`Select ${r.name}`} onChange={tick} /> }, ...columns]} />);
    const box = screen.getByRole('checkbox', { name: 'Select Alpha' });
    fireEvent.click(box);
    expect(tick).toHaveBeenCalledOnce();
    expect(open).not.toHaveBeenCalled();
    fireEvent.keyDown(box, { key: ' ' });
    expect(open).not.toHaveBeenCalled();
    fireEvent.click(screen.getByText('Alpha'));
    expect(open).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(screen.getByText('Alpha').closest('tr')!, { key: 'Enter' });
    expect(open).toHaveBeenCalledTimes(2);
  });
  it('declares its rows for a rendered-UI audit: activatable with onRowClick, static only with a reason', () => {
    const { container, rerender } = render(<DataTable data={rows} columns={columns} keyField={keyField} onRowClick={() => {}} staticRows="ignored when rows open" />);
    const root = container.querySelector('[data-collection-table]')!;
    expect(root).toHaveAttribute('data-collection-rows', 'activatable');
    expect(root).not.toHaveAttribute('data-collection-rows-reason');
    rerender(<DataTable data={rows} columns={columns} keyField={keyField} staticRows="Revisions are read-only snapshots." />);
    expect(container.querySelector('[data-collection-table]')).toHaveAttribute('data-collection-rows', 'static');
    expect(container.querySelector('[data-collection-table]')).toHaveAttribute('data-collection-rows-reason', 'Revisions are read-only snapshots.');
    rerender(<DataTable data={rows} columns={columns} keyField={keyField} />);
    expect(container.querySelector('[data-collection-table]')).not.toHaveAttribute('data-collection-rows');
  });

  it('renders headers and rows', () => {
    render(<DataTable data={rows} columns={columns} keyField={keyField} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByTestId('count-b')).toHaveTextContent('×7');
  });

  it('sorts ascending then descending on header click', () => {
    render(<DataTable data={rows} columns={columns} keyField={keyField} />);
    const header = screen.getByTestId('datatable-header-name');

    fireEvent.click(header);
    let cells = screen.getAllByRole('cell');
    expect(cells[0]).toHaveTextContent('Alpha');

    fireEvent.click(header);
    cells = screen.getAllByRole('cell');
    expect(cells[0]).toHaveTextContent('Delta');
  });

  it('uses custom compare for numeric sort', () => {
    render(<DataTable data={rows} columns={columns} keyField={keyField} />);
    fireEvent.click(screen.getByTestId('datatable-header-count'));
    const firstRow = screen.getAllByRole('row')[1];
    expect(within(firstRow).getByTestId('count-c')).toBeInTheDocument();
  });

  it('filters rows by search query across all columns', () => {
    render(
      <DataTable data={rows} columns={columns} keyField={keyField} searchable />,
    );
    fireEvent.change(openSearch(), {
      target: { value: 'failed' },
    });
    expect(screen.getByText('Bravo')).toBeInTheDocument();
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
  });

  it('paginates when data exceeds pageSize', () => {
    render(
      <DataTable
        data={rows}
        columns={columns}
        keyField={keyField}
        pageSize={2}
      />,
    );
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Bravo')).toBeInTheDocument();
    expect(screen.queryByText('Charlie')).not.toBeInTheDocument();
    expect(screen.getByTestId('datatable-page-summary')).toHaveTextContent(
      'Page 1 of 2',
    );

    fireEvent.click(screen.getByTestId('datatable-next'));
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
  });

  it('renders empty message when data is empty', () => {
    render(
      <DataTable
        data={[]}
        columns={columns}
        keyField={keyField}
        emptyMessage="No records yet"
      />,
    );
    expect(screen.getByText('No records yet')).toBeInTheDocument();
  });

  it('renders loading skeleton rows', () => {
    render(
      <DataTable
        data={[]}
        columns={columns}
        keyField={keyField}
        loading
        loadingRows={3}
      />,
    );
    expect(screen.getAllByTestId('datatable-loading-row')).toHaveLength(3);
  });

  it('fires onRowClick when a body row is clicked', () => {
    const onRowClick = vi.fn();
    render(
      <DataTable
        data={rows}
        columns={columns}
        keyField={keyField}
        onRowClick={onRowClick}
      />,
    );
    fireEvent.click(screen.getByText('Charlie'));
    expect(onRowClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'c' }),
    );
  });

  it('renders rowActions and does not bubble click to row', () => {
    const onRowClick = vi.fn();
    const onDelete = vi.fn();
    render(
      <DataTable
        data={rows}
        columns={columns}
        keyField={keyField}
        onRowClick={onRowClick}
        rowActions={(row) => (
          <button onClick={() => onDelete(row.id)}>Delete {row.id}</button>
        )}
      />,
    );
    fireEvent.click(screen.getByText('Delete a'));
    expect(onDelete).toHaveBeenCalledWith('a');
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('resets to first page when the search query changes', () => {
    render(
      <DataTable
        data={rows}
        columns={columns}
        keyField={keyField}
        searchable
        pageSize={2}
      />,
    );
    fireEvent.click(screen.getByTestId('datatable-next'));
    expect(screen.getByTestId('datatable-page-summary')).toHaveTextContent(
      'Page 2 of 2',
    );
    fireEvent.change(openSearch(), {
      target: { value: 'a' },
    });
    expect(screen.getByTestId('datatable-page-summary')).toHaveTextContent(
      'Page 1 of',
    );
  });
  // Regression: the default comparator (no `compare` on the column) used to do
  // `String(a[key]).localeCompare(String(b[key]))`, which collates "10" before
  // "9". Inputs are chosen so the buggy and correct orders differ: ascending by
  // `count` must be 2, 9, 10, 100 — the old code produced 10, 100, 2, 9.
  it('default comparator sorts a numeric column numerically, not lexicographically', () => {
    interface NumRow { id: string; count: number }
    const numRows: NumRow[] = [
      { id: 'ten', count: 10 },
      { id: 'nine', count: 9 },
      { id: 'hundred', count: 100 },
      { id: 'two', count: 2 },
    ];
    const numCols: DataTableColumn<NumRow>[] = [
      { key: 'count', header: 'Count', sortable: true },
    ];
    render(
      <DataTable data={numRows} columns={numCols} keyField={(r) => r.id} />,
    );
    fireEvent.click(screen.getByTestId('datatable-header-count'));
    expect(
      screen.getAllByRole('cell').map((c) => c.textContent),
    ).toEqual(['2', '9', '10', '100']);

    fireEvent.click(screen.getByTestId('datatable-header-count'));
    expect(
      screen.getAllByRole('cell').map((c) => c.textContent),
    ).toEqual(['100', '10', '9', '2']);
  });

  // Regression: `String(new Date(...))` is "Thu Aug 13 2026 …", so stringifying
  // sorted a Date column by weekday NAME. Ascending here must be Aug 13 → Aug 14
  // → Aug 15; the old code gave Fri(14), Sat(15), Thu(13).
  it('default comparator sorts a Date column chronologically, not by weekday name', () => {
    interface DateRow { id: string; when: Date }
    const dateRows: DateRow[] = [
      { id: 'sat', when: new Date('2026-08-15T00:00:00Z') },
      { id: 'thu', when: new Date('2026-08-13T00:00:00Z') },
      { id: 'fri', when: new Date('2026-08-14T00:00:00Z') },
    ];
    const dateCols: DataTableColumn<DateRow>[] = [
      {
        key: 'when',
        header: 'When',
        sortable: true,
        render: (r) => <span data-testid={`when-${r.id}`}>{r.id}</span>,
      },
    ];
    render(
      <DataTable data={dateRows} columns={dateCols} keyField={(r) => r.id} />,
    );
    fireEvent.click(screen.getByTestId('datatable-header-when'));
    expect(
      screen.getAllByRole('cell').map((c) => c.textContent),
    ).toEqual(['thu', 'fri', 'sat']);
  });

  // Regression: `page` is raw state, `safePage` is it clamped to the current
  // page count. When `data` shrinks under a stale index the two diverge, and
  // the pager used to step the RAW value (`setPage(p => p - 1)`), so Prev moved
  // page 2→1 while safePage stayed pinned at 1 and the footer still read
  // "Page 2 of 2". The button looked dead. It must step from `safePage`.
  it('Prev advances immediately after the data shrinks under a stale page index', () => {
    const many = Array.from({ length: 6 }, (_, i) => ({
      id: `r${i}`,
      name: `Row ${i}`,
      status: 'ok',
      count: i,
    }));
    const { rerender } = render(
      <DataTable data={many} columns={columns} keyField={keyField} pageSize={2} />,
    );
    fireEvent.click(screen.getByTestId('datatable-next'));
    fireEvent.click(screen.getByTestId('datatable-next'));
    expect(screen.getByTestId('datatable-page-summary')).toHaveTextContent(
      'Page 3 of 3',
    );

    // Parent narrows the data: 3 pages -> 2. safePage clamps to 1 (page is 2).
    rerender(
      <DataTable
        data={many.slice(0, 4)}
        columns={columns}
        keyField={keyField}
        pageSize={2}
      />,
    );
    expect(screen.getByTestId('datatable-page-summary')).toHaveTextContent(
      'Page 2 of 2',
    );

    fireEvent.click(screen.getByTestId('datatable-prev'));
    expect(screen.getByTestId('datatable-page-summary')).toHaveTextContent(
      'Page 1 of 2',
    );
  });

  it('is unstriped by default', () => {
    const { container } = render(
      <DataTable
        data={[{ id: 'a' }, { id: 'b' }]}
        columns={[{ key: 'id', header: 'ID' }]}
        keyField={(r) => r.id}
      />,
    );
    for (const tr of container.querySelectorAll('tbody tr')) {
      expect(tr.className).not.toContain('bg-surface-inset');
    }
  });

  it('striped tints the ODD rows only, so the table opens on the plain surface', () => {
    const { container } = render(
      <DataTable
        striped
        data={[{ id: 'a' }, { id: 'b' }, { id: 'c' }]}
        columns={[{ key: 'id', header: 'ID' }]}
        keyField={(r) => r.id}
      />,
    );
    const rows = [...container.querySelectorAll('tbody tr')];
    expect(rows).toHaveLength(3);
    expect(rows[0]!.className).not.toContain('bg-surface-inset');
    expect(rows[1]!.className).toContain('bg-surface-inset');
    // Full strength, not a fraction of it: at 50% the tint measured ~1% off
    // the surface and could not be seen at all.
    expect(rows[1]!.className).not.toContain('bg-surface-inset/');
    expect(rows[2]!.className).not.toContain('bg-surface-inset');
  });

  it('the stripe never outranks hover on a clickable row', () => {
    // A stripe that competes with hover makes the row under the pointer
    // ambiguous, which is worse than no stripe at all.
    const { container } = render(
      <DataTable
        striped
        data={[{ id: 'a' }, { id: 'b' }]}
        columns={[{ key: 'id', header: 'ID' }]}
        keyField={(r) => r.id}
        onRowClick={() => {}}
      />,
    );
    const striped = [...container.querySelectorAll('tbody tr')][1]!;
    expect(striped.className).toContain('bg-surface-inset');
    expect(striped.className).toContain('hover:bg-surface-panel');
  });

  it('is not keyboard-reachable when onRowClick is absent', () => {
    render(<DataTable data={rows} columns={columns} keyField={keyField} />);
    const bodyRows = screen.getAllByRole('row').slice(1); // drop the header row
    for (const tr of bodyRows) {
      expect(tr).not.toHaveAttribute('tabindex');
      expect(tr).not.toHaveAttribute('aria-rowindex');
    }
  });

  it('makes rows keyboard-reachable and activates onRowClick on Enter/Space', () => {
    const onRowClick = vi.fn();
    render(
      <DataTable data={rows} columns={columns} keyField={keyField} onRowClick={onRowClick} />,
    );
    const bodyRows = screen.getAllByRole('row').slice(1);
    expect(bodyRows[0]).toHaveAttribute('tabindex', '0');
    // Header occupies ARIA row 1, so the first body row is row 2.
    expect(bodyRows[0]).toHaveAttribute('aria-rowindex', '2');

    bodyRows[0]!.focus();
    fireEvent.keyDown(bodyRows[0]!, { key: 'Enter' });
    expect(onRowClick).toHaveBeenCalledWith(expect.objectContaining({ id: 'a' }));

    fireEvent.keyDown(bodyRows[1]!, { key: ' ' });
    expect(onRowClick).toHaveBeenCalledWith(expect.objectContaining({ id: 'b' }));
  });

  it('does not activate onRowClick for a key other than Enter/Space', () => {
    const onRowClick = vi.fn();
    render(
      <DataTable data={rows} columns={columns} keyField={keyField} onRowClick={onRowClick} />,
    );
    fireEvent.keyDown(screen.getAllByRole('row')[1]!, { key: 'ArrowDown' });
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('falls back to a column render function for search when the row has no primitive value at that key', () => {
    interface NestedRow { id: string; owner: { name: string } }
    const nested: NestedRow[] = [
      { id: '1', owner: { name: 'Grace Hopper' } },
      { id: '2', owner: { name: 'Ada Lovelace' } },
    ];
    const nestedCols: DataTableColumn<NestedRow>[] = [
      { key: 'owner', header: 'Owner', render: (r) => <span>{r.owner.name}</span> },
    ];
    render(
      <DataTable data={nested} columns={nestedCols} keyField={(r) => r.id} searchable />,
    );
    fireEvent.change(openSearch(), {
      target: { value: 'hopper' },
    });
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
    expect(screen.queryByText('Ada Lovelace')).not.toBeInTheDocument();
  });

  it('warns once, in dev, for a searchable column with no primitive value, getFilterText, or render', () => {
    interface OpaqueRow { id: string; blob: { x: number } }
    const opaque: OpaqueRow[] = [{ id: '1', blob: { x: 1 } }];
    const opaqueCols: DataTableColumn<OpaqueRow>[] = [{ key: 'blob', header: 'Blob' }];
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <DataTable data={opaque} columns={opaqueCols} keyField={(r) => r.id} searchable />,
    );
    fireEvent.change(openSearch(), { target: { value: 'x' } });
    fireEvent.change(openSearch(), { target: { value: 'xy' } });
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0]![0]).toContain('blob');
    warn.mockRestore();
  });

  it('wraps the table in its own horizontal scroller so it cannot spill', () => {
    const { container } = render(
      <DataTable
        data={[{ id: 'a' }]}
        columns={[{ key: 'id', header: 'ID' }]}
        keyField={(r) => r.id}
      />,
    );
    const scroller = container.querySelector('table')!.parentElement!;
    expect(scroller.className).toContain('overflow-x-auto');
  });
});
describe('DataTable size="sm" (2.434.0)', () => {
  it('draws one-line 44px cells, a 12px caps header and right-aligned numeric columns', () => {
    const cols: DataTableColumn<Row>[] = [
      { key: 'name', header: 'Name' },
      { key: 'count', header: 'Count', numeric: true },
    ];
    const { container } = render(<DataTable data={rows} columns={cols} keyField={(r) => r.id} size="sm" />);
    expect(container.querySelector('table')?.getAttribute('data-size')).toBe('sm');
    const th = container.querySelectorAll('thead th');
    expect(th[0]!.className).toContain('text-xs');
    expect(th[1]!.className).toContain('text-right');
    const td = container.querySelector('tbody tr')!.querySelectorAll('td');
    expect(td[0]!.className).toContain('h-[var(--ui-table-row,2.75rem)]');
    expect(td[0]!.className).toContain('whitespace-nowrap');
    expect(td[1]!.className).toContain('text-right');
    expect(td[1]!.className).toContain('tabular-nums');
  });

  it('keeps the md cell by default', () => {
    const { container } = render(<DataTable data={rows} columns={columns} keyField={(r) => r.id} />);
    expect(container.querySelector('table')?.hasAttribute('data-size')).toBe(false);
    expect(container.querySelector('tbody td')!.className).toContain('py-3');
  });
});

// Empty-chrome rule (2.503.0): the pager is chrome for MORE than one page.
describe('DataTable pager visibility', () => {
  it('draws no pager with zero rows', () => {
    const { container } = render(<DataTable data={[]} columns={columns} keyField={keyField} pageSize={2} />);
    expect(container.querySelector('[data-collection-pager]')).toBeNull();
  });
  it('draws no pager when every row fits on one page', () => {
    const { container } = render(<DataTable data={rows} columns={columns} keyField={keyField} pageSize={4} />);
    expect(container.querySelector('[data-collection-pager]')).toBeNull();
  });
  it('drops the pager when a search leaves zero results', () => {
    const { container } = render(<DataTable data={rows} columns={columns} keyField={keyField} pageSize={2} searchable />);
    expect(container.querySelector('[data-collection-pager]')).not.toBeNull();
    fireEvent.change(openSearch(), { target: { value: 'zzz-no-match' } });
    expect(container.querySelector('[data-collection-pager]')).toBeNull();
  });
});
