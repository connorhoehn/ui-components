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
const WIDTH: Record<string, number> = { name: 200, amount: 100, owner: 150, date: 150 };

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
    sum += key ? WIDTH[key] ?? 0 : 80;
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
    expect(headerTexts()).toEqual(['Name', 'Amount', 'Owner', expect.stringContaining('Hidden columns')]);
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
    resize(300);
    expect(hiddenKeys()).toBe('owner date');
    expect(headerTexts().slice(0, 2)).toEqual(['Name', 'Amount']);
    resize(1000);
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
