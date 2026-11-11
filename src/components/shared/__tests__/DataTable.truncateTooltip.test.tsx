// DataTable truncate cells (narrow batch, 2.518.0): the full text is a Tooltip
// on hover and focus — a link in the cell is reachable by keyboard, which the
// old native `title` never was — shown only when the text is actually cut, and
// `wrap="two-lines"` clamps at two lines instead of one.
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DataTable, type DataTableColumn } from '../DataTable';

afterEach(() => { cleanup(); vi.useRealTimers(); });

interface Row { id: string; title: string; owner: string }
const LONG = 'Cutover order for legacy SSO tenants, riskiest two first while the shim is warm';
const rows: Row[] = [{ id: 'd1', title: LONG, owner: 'Vera' }];
const columns = (wrap?: 'one-line' | 'two-lines'): DataTableColumn<Row>[] => [
  { key: 'title', header: 'Decision', truncate: true, ...(wrap ? { wrap } : {}), getFilterText: (r) => r.title, render: (r) => <a href={`/d/${r.id}`}>{r.title}</a> },
  { key: 'owner', header: 'Owner' },
];

/** jsdom has no layout: make the cell's text box report that it is cut (or not). */
function cut(text: HTMLElement, isCut: boolean) {
  Object.defineProperty(text, 'scrollWidth', { configurable: true, get: () => (isCut ? 600 : 100) });
  Object.defineProperty(text, 'clientWidth', { configurable: true, get: () => 200 });
  Object.defineProperty(text, 'scrollHeight', { configurable: true, get: () => 20 });
  Object.defineProperty(text, 'clientHeight', { configurable: true, get: () => 20 });
}
const textBox = () => screen.getByRole('link').parentElement as HTMLElement;

describe('DataTable truncate tooltip', () => {
  it('focusing the link in a cut cell shows the full text in a tooltip at once', () => {
    render(<DataTable data={rows} columns={columns()} keyField={(r) => r.id} />);
    cut(textBox(), true);
    act(() => { screen.getByRole('link').focus(); });
    const tip = screen.getByTestId('datatable-cell-tooltip');
    expect(tip).toHaveAttribute('role', 'tooltip');
    expect(tip).toHaveTextContent(LONG);
    act(() => { screen.getByRole('link').blur(); });
    expect(screen.queryByTestId('datatable-cell-tooltip')).toBeNull();
  });

  it('hovering a cut cell opens the tooltip after the hover delay', () => {
    vi.useFakeTimers();
    render(<DataTable data={rows} columns={columns()} keyField={(r) => r.id} />);
    cut(textBox(), true);
    fireEvent.mouseEnter(textBox().parentElement!);
    expect(screen.queryByTestId('datatable-cell-tooltip')).toBeNull();
    act(() => { vi.advanceTimersByTime(400); });
    expect(screen.getByTestId('datatable-cell-tooltip')).toHaveTextContent(LONG);
  });

  it('a value that fits shows no tooltip', () => {
    render(<DataTable data={rows} columns={columns()} keyField={(r) => r.id} />);
    cut(textBox(), false);
    act(() => { screen.getByRole('link').focus(); });
    expect(screen.queryByTestId('datatable-cell-tooltip')).toBeNull();
  });

  it('one line by default: nowrap cell, truncate text', () => {
    render(<DataTable data={rows} columns={columns()} keyField={(r) => r.id} />);
    const td = screen.getByRole('link').closest('td')!;
    expect(td).toHaveAttribute('data-truncate', '');
    expect(td.className).toContain('whitespace-nowrap');
    expect(textBox()).toHaveClass('truncate');
  });

  it('wrap="two-lines": the cell wraps and the text clamps at two lines', () => {
    render(<DataTable data={rows} columns={columns('two-lines')} keyField={(r) => r.id} />);
    const td = screen.getByRole('link').closest('td')!;
    expect(td).toHaveAttribute('data-truncate', 'two-lines');
    expect(td.className).not.toContain('whitespace-nowrap');
    expect(td.className).toContain('max-w-0');
    expect(textBox()).toHaveClass('line-clamp-2', 'whitespace-normal');
    expect(textBox()).not.toHaveClass('truncate');
  });

  it('a clamped cell that runs past two lines shows the tooltip on focus', () => {
    render(<DataTable data={rows} columns={columns('two-lines')} keyField={(r) => r.id} />);
    const box = textBox();
    Object.defineProperty(box, 'scrollHeight', { configurable: true, get: () => 60 });
    Object.defineProperty(box, 'clientHeight', { configurable: true, get: () => 40 });
    act(() => { screen.getByRole('link').focus(); });
    expect(screen.getByTestId('datatable-cell-tooltip')).toHaveTextContent(LONG);
  });
});
