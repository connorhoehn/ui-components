// 2.515.12: the row-88 audit fixes for the data-display components
// (DataTable, Table, KeyValue, Divider, MarkdownView).
import { render, screen, cleanup, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { DataTable, type DataTableColumn } from '../DataTable';
import { Table, TableHead, TableBody, TableRow, TableTh, TableTd } from '../../ui/Table';
import { KeyValue } from '../KeyValue';
import { Divider } from '../Divider';
import { MarkdownView } from '../MarkdownView';

afterEach(cleanup);

interface Row { id: string; name: string; outline: string; count: number }
const rows: Row[] = [{ id: 'a', name: 'Pilot', outline: 'A very long outline that would otherwise widen the whole table past its column', count: 3 }];
const columns: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Episode' },
  { key: 'outline', header: 'Outline / Synopsis', truncate: true },
  { key: 'count', header: 'Shots', numeric: true, truncate: true, render: (r) => <span><b>{r.count}</b> shots</span> },
];

describe('Table / DataTable md header padding (G88-E5)', () => {
  it('md header cells use 8px block padding, not 10px', () => {
    render(<Table><TableHead><tr><TableTh>Name</TableTh></tr></TableHead><TableBody><TableRow><TableTd>x</TableTd></TableRow></TableBody></Table>);
    const th = screen.getByRole('columnheader', { name: 'Name' });
    expect(th.className).toContain('py-2');
    expect(th.className).not.toContain('py-2.5');
  });
});

describe('DataTable headerCase (G88-E7)', () => {
  it('keeps uppercase headers by default', () => {
    render(<DataTable data={rows} columns={columns} keyField={(r) => r.id} />);
    const th = screen.getByRole('columnheader', { name: 'Episode' });
    expect(th.className).toContain('uppercase');
    expect(th.closest('thead')).toHaveAttribute('data-header-case', 'upper');
  });
  it('sentence: no caps, normal tracking, same 12px semibold', () => {
    render(<DataTable data={rows} columns={columns} keyField={(r) => r.id} headerCase="sentence" rowActions={() => null} />);
    for (const name of ['Episode', 'Outline / Synopsis', 'Actions']) {
      const th = screen.getByRole('columnheader', { name });
      expect(th.className).toContain('normal-case');
      expect(th.className).toContain('tracking-normal');
      expect(th.className).not.toMatch(/(^|\s)uppercase(\s|$)/);
      expect(th.className).not.toContain('tracking-wide');
      expect(th.className).toContain('text-[12px]');
      expect(th.className).toContain('font-semibold');
    }
    expect(screen.getByRole('columnheader', { name: 'Episode' }).closest('thead')).toHaveAttribute('data-header-case', 'sentence');
  });
});

describe('DataTable column truncate (G88-E6)', () => {
  it('cuts a truncating cell to one line with the full text as data-full-text (2.518.0: a Tooltip, not title)', () => {
    render(<DataTable data={rows} columns={columns} keyField={(r) => r.id} />);
    const cell = screen.getByText(/A very long outline/).closest('td')!;
    expect(cell).toHaveAttribute('data-truncate');
    expect(cell).toHaveAttribute('data-full-text', rows[0].outline);
    expect(cell).not.toHaveAttribute('title');
    expect(cell.className).toContain('max-w-0');
    expect(screen.getByText(/A very long outline/).className).toContain('truncate');
  });
  it('a rendered truncating cell takes its text as title', () => {
    render(<DataTable data={rows} columns={columns} keyField={(r) => r.id} />);
    const cell = screen.getByText('3').closest('td')!;
    expect(cell).toHaveAttribute('data-full-text', '3 shots');
  });
  it('other columns are untouched', () => {
    render(<DataTable data={rows} columns={columns} keyField={(r) => r.id} />);
    const cell = screen.getByText('Pilot').closest('td')!;
    expect(cell).not.toHaveAttribute('data-truncate');
    expect(cell).not.toHaveAttribute('title');
    expect(cell).not.toHaveAttribute('data-full-text');
    expect(cell.className).not.toContain('max-w-0');
  });
});

describe('KeyValue inline layout and on-scale gaps', () => {
  const items = [{ label: 'Input', value: '13 notes' }, { label: 'Output', value: '4 patterns' }];
  it('inline: pairs on one row, label beside value, 4px within and 16px between', () => {
    render(<KeyValue items={items} layout="inline" />);
    const dl = screen.getByTestId('key-value');
    expect(dl).toHaveAttribute('data-layout', 'inline');
    expect(dl.className).toContain('flex-wrap');
    expect(dl.className).toContain('gap-x-4');
    const pairs = screen.getAllByTestId('key-value-item');
    expect(pairs).toHaveLength(2);
    expect(pairs[0].className).toContain('gap-1');
    expect(pairs[0].className).not.toContain('flex-col');
    expect(within(pairs[0]).getByText('Input').className).toContain('text-xs');
    expect(within(pairs[0]).getByText('13 notes').className).toContain('text-sm');
  });
  it('stack / grid: label 4px over value (was 2px); row list 8px apart (was 6px)', () => {
    const { unmount } = render(<KeyValue items={items} layout="grid" />);
    expect(screen.getAllByTestId('key-value-item')[0].className).toMatch(/(^|\s)gap-1(\s|$)/);
    unmount();
    render(<KeyValue items={items} />);
    expect(screen.getByTestId('key-value').className).toMatch(/(^|\s)gap-2(\s|$)/);
  });
  it('divided rows: 12px side padding (was 10px)', () => {
    render(<KeyValue items={items} divided />);
    expect(screen.getAllByTestId('key-value-item')[0].className).toContain('px-3');
  });
});

describe('Divider vertical (inline row)', () => {
  it('draws a vertical separator between inline items', () => {
    render(<p>3 episodes<Divider orientation="vertical" data-testid="d" />12 shots</p>);
    const d = screen.getByTestId('d');
    expect(d.tagName).toBe('SPAN');
    expect(d).toHaveAttribute('role', 'separator');
    expect(d).toHaveAttribute('aria-orientation', 'vertical');
    expect(d.className).toContain('w-px');
    expect(d.className).toContain('self-stretch');
    expect(d.className).toContain('mx-3');
  });
  it('spacing sets the side margin on the 4px scale', () => {
    render(<Divider orientation="vertical" spacing="sm" data-testid="d" />);
    expect(screen.getByTestId('d').className).toContain('mx-2');
  });
  it('horizontal stays an hr; the caption is 11px (was 10px)', () => {
    const { unmount } = render(<Divider data-testid="h" />);
    expect(screen.getByTestId('h').tagName).toBe('HR');
    unmount();
    render(<Divider label="Evidence" />);
    expect(screen.getByText('Evidence').className).toContain('text-[11px]');
  });
});

describe('MarkdownView headingOffset and on-scale lg', () => {
  const md = '# One\n\n## Two\n\n### Three\n\n#### Four\n\nBody';
  it('shifts heading elements down, keeps the source look', () => {
    render(<MarkdownView markdown={md} headingOffset={1} />);
    expect(screen.queryByRole('heading', { level: 1 })).toBeNull();
    const h2 = screen.getByRole('heading', { level: 2, name: 'One' });
    expect(h2).toHaveAttribute('data-md-level', '1');
    expect(h2.className).toContain('mb-3');
    expect(screen.getByRole('heading', { level: 3, name: 'Two' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 5, name: 'Four' })).toBeInTheDocument();
    expect(screen.getByTestId('markdown-view')).toHaveAttribute('data-heading-offset', '1');
  });
  it('caps at h6 and defaults to no shift', () => {
    const { unmount } = render(<MarkdownView markdown={md} headingOffset={4} />);
    expect(screen.getByRole('heading', { level: 6, name: 'Three' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 6, name: 'Four' })).toBeInTheDocument();
    unmount();
    render(<MarkdownView markdown={md} />);
    expect(screen.getByRole('heading', { level: 1, name: 'One' })).not.toHaveAttribute('data-md-level');
    expect(screen.getByTestId('markdown-view')).not.toHaveAttribute('data-heading-offset');
  });
  it('lg is on the 11/12/14/16/20 scale', () => {
    render(<MarkdownView markdown={md} scale="lg" />);
    const cls = (level: number) => screen.getByRole('heading', { level }).className;
    expect(cls(1)).toContain('text-xl');
    expect(cls(2)).toContain('text-base');
    expect(cls(3)).toContain('text-base');
    expect(cls(4)).toContain('text-sm');
    expect(screen.getByText('Body').className).toContain('text-base');
    const all = [1, 2, 3, 4].map(cls).join(' ') + ' ' + screen.getByText('Body').className;
    expect(all).not.toMatch(/text-\[(15|17)px\]|text-2xl|mb-1\.5/);
  });
});
