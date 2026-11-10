// DataTable `responsiveColumns` (2.516.0): columns with a priority above 1 hide,
// the highest number first, while the table's scroller overflows. jsdom has no
// layout, so the scroller's widths are modelled: each shown header cell has a
// fixed width, and the observer is fired by hand.
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { DataTable, type DataTableColumn } from '../DataTable';

interface Row { id: string; name: string; amount: number; owner: string; date: string }
const rows: Row[] = [
  { id: 'a', name: 'Alpha', amount: 30, owner: 'Ada', date: '2026-01-02' },
  { id: 'b', name: 'Bravo', amount: 10, owner: 'Bo', date: '2026-03-04' },
  { id: 'c', name: 'Charlie', amount: 20, owner: 'Cy', date: '2026-05-06' },
];
const columns: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'amount', header: 'Amount', numeric: true, sortable: true },
  { key: 'owner', header: 'Owner', priority: 2 },
  { key: 'date', header: 'Date', priority: 3 },
];
// Name 200 + Amount 100 + Owner 150 + Date 150 = 600; the "+N" column adds 80.
// Name grows to 400 while any shown name is longer than ten characters.
const WIDTH: Record<string, number> = { name: 200, amount: 100, owner: 150, date: 150 };
function nameWidth(scroller: HTMLElement): number {
  const names = Array.from(scroller.querySelectorAll('tbody tr')).map((tr) => tr.querySelector('td')?.textContent ?? '');
  return names.some((n) => n.length > 10) ? 400 : WIDTH.name!;
}

let boxWidth = 1000;
const observers: Array<() => void> = [];
const original = {
  client: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth'),
  scroll: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollWidth'),
  ro: globalThis.ResizeObserver,
};

function shownWidth(scroller: HTMLElement): number {
  let sum = 0;
  scroller.querySelectorAll('thead th').forEach((th) => {
    if (th.hasAttribute('data-column-hidden')) return;
    const key = th.getAttribute('data-column');
    sum += key === 'name' ? nameWidth(scroller) : key ? WIDTH[key] ?? 0 : 80;
  });
  return sum;
}

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    get(this: HTMLElement) { return this.hasAttribute('data-table-scroller') ? boxWidth : 0; },
  });
  Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
    configurable: true,
    get(this: HTMLElement) { return this.hasAttribute('data-table-scroller') ? Math.max(boxWidth, shownWidth(this)) : 0; },
  });
  globalThis.ResizeObserver = class {
    private cb: () => void;
    constructor(cb: () => void) { this.cb = cb; observers.push(() => this.cb()); }
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});
afterAll(() => {
  if (original.client) Object.defineProperty(HTMLElement.prototype, 'clientWidth', original.client);
  if (original.scroll) Object.defineProperty(HTMLElement.prototype, 'scrollWidth', original.scroll);
  globalThis.ResizeObserver = original.ro;
});
beforeEach(() => { boxWidth = 1000; observers.length = 0; });
afterEach(cleanup);

function resize(width: number) {
  boxWidth = width;
  act(() => { observers.forEach((fire) => fire()); });
}
const hiddenKeys = () => screen.getByTestId('dt').getAttribute('data-hidden-columns');
const headerTexts = () =>
  Array.from(document.querySelectorAll('thead th:not([data-column-hidden])')).map((th) => th.textContent);

function renderTable(extra: Partial<React.ComponentProps<typeof DataTable<Row>>> = {}) {
  return render(
    <DataTable data={rows} columns={columns} keyField={(r) => r.id} staticRows="test" responsiveColumns data-testid="dt" {...extra} />,
  );
}

describe('DataTable responsiveColumns', () => {
  it('wide (1000px): every column shows and there is no "+N" control', () => {
    renderTable();
    resize(1000);
    expect(hiddenKeys()).toBe('');
    expect(headerTexts()).toEqual(['Name', 'Amount', 'Owner', 'Date']);
    expect(screen.queryByTestId('datatable-more-a')).toBeNull();
  });

  it('medium (560px): the highest priority number (Date) hides first; "+1 column" lists it', () => {
    renderTable();
    resize(560);
    expect(hiddenKeys()).toBe('date');
    expect(headerTexts()).toEqual(['Name', 'Amount', 'Owner', 'More']);
    const more = screen.getByTestId('datatable-more-a');
    expect(more).toHaveTextContent('+1 column');
    fireEvent.click(more);
    const pop = screen.getByTestId('datatable-more-a-popover');
    expect(pop).toHaveAttribute('aria-label', 'Hidden columns for Alpha');
    expect(within(pop).getByText('Date')).toBeInTheDocument();
    expect(within(pop).getByText('2026-01-02')).toBeInTheDocument();
  });

  it('narrow (380px): Owner hides next; priority-1 columns never hide; widening restores them', () => {
    renderTable();
    resize(380);
    expect(hiddenKeys()).toBe('owner date');
    expect(screen.getByTestId('datatable-more-b')).toHaveTextContent('+2 columns');
    expect(headerTexts().slice(0, 2)).toEqual(['Name', 'Amount']);
    resize(1000);
    expect(hiddenKeys()).toBe('');
  });

  it('the fit counts the "+N" column itself: 520px hides two columns although 450px of data would fit after one', () => {
    renderTable();
    // Date hidden: 200 + 100 + 150 + the 80px "+1" column = 530 > 520, so Owner goes too.
    resize(520);
    expect(hiddenKeys()).toBe('owner date');
    resize(530);
    expect(hiddenKeys()).toBe('date');
  });

  it('the "+N" column has a visible "More" header and a quiet, regular-weight control', () => {
    renderTable();
    resize(560);
    const head = screen.getByTestId('datatable-more-header');
    expect(head).toHaveTextContent(/^More$/);
    const more = screen.getByTestId('datatable-more-a');
    expect(more.className).toContain('font-normal');
    expect(more.className).not.toContain('font-semibold');
    expect(more.className).toContain('text-text-secondary');
  });

  it('switches to the stacked form instead of hiding more than half the columns', () => {
    const cols: DataTableColumn<Row>[] = [
      { key: 'name', header: 'Name' },
      { key: 'amount', header: 'Amount', numeric: true, priority: 2 },
      { key: 'owner', header: 'Owner', priority: 3 },
      { key: 'date', header: 'Date', priority: 4 },
    ];
    renderTable({ columns: cols });
    resize(380);
    // Two of four hidden is half: still a table.
    expect(hiddenKeys()).toBe('owner date');
    expect(screen.getByTestId('dt')).not.toHaveAttribute('data-stacked');
    // A third would leave Name and "+3": the cards instead, every column back.
    resize(300);
    const root = screen.getByTestId('dt');
    expect(root).toHaveAttribute('data-stacked');
    expect(hiddenKeys()).toBe('');
    expect(screen.queryByTestId('datatable-more-a')).toBeNull();
    const cell = screen.getAllByRole('row')[1]!.querySelectorAll('td')[3]!;
    expect(cell).toHaveAttribute('data-label', 'Date');
    expect(cell.className).toContain('before:content-[attr(data-label)]');
    expect(document.querySelector('thead')!.className).toContain('sr-only');
    // Widening brings the table back.
    resize(1000);
    expect(screen.getByTestId('dt')).not.toHaveAttribute('data-stacked');
    expect(hiddenKeys()).toBe('');
  });

  it('stacks when every hideable column is gone and it still overflows', () => {
    renderTable();
    resize(300);
    expect(screen.getByTestId('dt')).toHaveAttribute('data-stacked');
    expect(hiddenKeys()).toBe('');
  });

  it('re-measures when a cell\'s text changes with the same rows (a name read from the host\'s other state)', async () => {
    const cols = (long: boolean): DataTableColumn<Row>[] => columns.map((c) => (c.key === 'name' ? { ...c, render: (r: Row) => (long ? `${r.name} with a long name` : r.name) } : c));
    const { rerender } = render(<DataTable data={rows} columns={cols(true)} keyField={(r) => r.id} staticRows="test" responsiveColumns data-testid="dt" />);
    resize(700);
    expect(hiddenKeys()).toBe('owner date');
    rerender(<DataTable data={rows} columns={cols(false)} keyField={(r) => r.id} staticRows="test" responsiveColumns data-testid="dt" />);
    await act(async () => { await new Promise((r) => setTimeout(r, 50)); });
    expect(hiddenKeys()).toBe('');
  });

  it('a column hidden for wide content returns when the content narrows at the same width', () => {
    const wide = rows.map((r, i) => (i === 0 ? { ...r, name: 'Alpha with a long name' } : r));
    const { rerender } = renderTable({ data: wide });
    resize(700);
    // Name 400 + 100 + 150 + 150 = 800: Date, then Owner (730 with "+1") hide.
    expect(hiddenKeys()).toBe('owner date');
    act(() => {
      rerender(<DataTable data={rows} columns={columns} keyField={(r) => r.id} staticRows="test" responsiveColumns data-testid="dt" />);
    });
    expect(hiddenKeys()).toBe('');
  });

  it('cells of a hidden column carry the hidden class; the stacked form shows them again', () => {
    renderTable({ narrow: true });
    resize(560);
    const dateCell = screen.getAllByRole('row')[1]!.querySelectorAll('td')[3]!;
    expect(dateCell.className).toContain('hidden');
    expect(dateCell.className).toContain('@max-[40rem]:flex');
  });

  it('sorting still works with columns hidden', () => {
    renderTable();
    resize(380);
    fireEvent.click(screen.getByTestId('datatable-header-amount'));
    const firstCells = () => screen.getAllByRole('row').slice(1).map((r) => r.querySelector('td')!.textContent);
    expect(firstCells()).toEqual(['Bravo', 'Charlie', 'Alpha']);
    fireEvent.click(screen.getByTestId('datatable-header-amount'));
    expect(firstCells()).toEqual(['Alpha', 'Charlie', 'Bravo']);
  });

  it('selection and row clicks keep working; the "+N" control and its popover do not open the row', () => {
    const onRowClick = vi.fn();
    render(
      <DataTable data={rows} columns={columns} keyField={(r) => r.id} responsiveColumns selectedKey="b" onRowClick={onRowClick} data-testid="dt" />,
    );
    resize(560);
    const rowB = screen.getAllByRole('row')[2]!;
    expect(rowB).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(screen.getByTestId('datatable-more-b'));
    fireEvent.click(within(screen.getByTestId('datatable-more-b-popover')).getByText('Date'));
    expect(onRowClick).not.toHaveBeenCalled();
    fireEvent.click(rowB);
    expect(onRowClick).toHaveBeenCalledWith(rows[1]);
  });

  it('changes nothing when off', () => {
    render(<DataTable data={rows} columns={columns} keyField={(r) => r.id} staticRows="test" data-testid="dt" />);
    resize(300);
    expect(screen.getByTestId('dt')).not.toHaveAttribute('data-hidden-columns');
    expect(document.querySelectorAll('thead th')).toHaveLength(4);
  });
});

describe('DataTable hiddenColumnsControl="header" (2.519.0)', () => {
  it('one control in the "More" header lists the hidden columns; rows carry no "+N" link, only a chevron', () => {
    renderTable({ hiddenColumnsControl: 'header' });
    resize(380);
    expect(hiddenKeys()).toBe('owner date');
    const head = screen.getByTestId('datatable-more-header');
    expect(head).toHaveAttribute('data-hidden-columns-control', 'header');
    const control = within(head).getByTestId('datatable-more-header-control');
    expect(control).toHaveTextContent('+2 columns');
    expect(control).toHaveAccessibleName('2 hidden columns: choose one to show');
    // No row repeats "+2 columns".
    expect(document.querySelector('tbody')!.textContent).not.toMatch(/\+\d+ column/);
    const chevron = screen.getByTestId('datatable-more-a');
    expect(chevron).toHaveAccessibleName('2 more values for Alpha');
    fireEvent.click(chevron);
    const pop = screen.getByTestId('datatable-more-a-popover');
    expect(within(pop).getByText('Owner')).toBeInTheDocument();
    expect(within(pop).getByText('2026-01-02')).toBeInTheDocument();
  });

  it('choosing a hidden column swaps it in for the lowest-priority shown column', () => {
    renderTable({ hiddenColumnsControl: 'header' });
    resize(560);
    expect(hiddenKeys()).toBe('date');
    fireEvent.click(screen.getByTestId('datatable-more-header-control'));
    fireEvent.click(screen.getByTestId('datatable-more-header-show-date'));
    expect(hiddenKeys()).toBe('owner');
    expect(headerTexts().slice(0, 3)).toEqual(['Name', 'Amount', 'Date']);
  });

  it('with no shown column left to swap out, choosing opens the stacked form', () => {
    renderTable({ hiddenColumnsControl: 'header' });
    resize(380);
    fireEvent.click(screen.getByTestId('datatable-more-header-control'));
    expect(screen.getByTestId('datatable-more-header-stack')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('datatable-more-header-show-date'));
    expect(screen.getByTestId('dt')).toHaveAttribute('data-stacked');
    expect(hiddenKeys()).toBe('');
  });

  it('the default stays "row": a "+N columns" link per row and a plain "More" header', () => {
    renderTable();
    resize(560);
    expect(screen.getByTestId('datatable-more-header')).toHaveTextContent(/^More$/);
    expect(screen.queryByTestId('datatable-more-header-control')).toBeNull();
    expect(screen.getByTestId('datatable-more-a')).toHaveTextContent('+1 column');
  });
});
