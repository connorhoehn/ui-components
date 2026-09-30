import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { StackedRail, STACKED_RAIL_ROW_CLASS, type StackedRailGroup } from '../StackedRail';
import { RailNavList } from '../RailNavList';
import { RAIL_GROUP_LABEL, RAIL_ITEM_COUNT, RAIL_ITEM_TEXT, RAIL_ROW_PAD_Y } from '../railType';

afterEach(cleanup);

const docs = (overrides: Partial<StackedRailGroup> = {}): StackedRailGroup[] => [
  { id: 'views', title: 'Views', collapsible: false, rows: [{ id: 'all', label: 'All documents', meta: 12 }, { id: 'recent', label: 'Recent' }] },
  {
    id: 'confluence',
    title: 'Confluence',
    count: 3,
    rows: [
      {
        id: 'handbook',
        label: 'Handbook',
        meta: '3h',
        open: true,
        children: [{ id: 'onboarding', label: 'Onboarding', meta: '2d', children: [{ id: 'day-one', label: 'Day one' }] }],
      },
      { id: 'faq', label: 'FAQ', meta: '5m' },
    ],
    ...overrides,
  },
];

describe('StackedRail', () => {
  it('draws the caption, group headings with plain counts, and rows on the rail scale', () => {
    render(<StackedRail title="Documents" count={14} groups={docs()} />);
    expect(screen.getByRole('navigation', { name: 'Navigation' })).toHaveAttribute('data-testid', 'stacked-rail');
    expect(screen.getByTestId('stacked-rail-title')).toHaveTextContent('Documents');
    expect(screen.getByTestId('stacked-rail-title')).toHaveClass(...RAIL_GROUP_LABEL.split(' '));
    expect(screen.getByTestId('stacked-rail-count')).toHaveTextContent('14');
    expect(screen.getByTestId('stacked-rail-group-confluence-count')).toHaveTextContent('3');
    const row = screen.getByTestId('stacked-rail-row-all');
    expect(row).toHaveClass(...RAIL_ITEM_TEXT.split(' '), ...RAIL_ROW_PAD_Y.split(' '));
    // A non-collapsible group is a heading, not a button.
    expect(screen.getByTestId('stacked-rail-group-views-header').tagName).toBe('H3');
    expect(screen.getByTestId('stacked-rail-group-confluence-header')).toHaveAttribute('aria-expanded', 'true');
  });

  it('draws a row with RailNavList’s row classes apart from the rail pitch', () => {
    render(<>
      <RailNavList items={[{ id: 'a', label: 'A', count: 2 }]} />
      <StackedRail groups={[{ id: 'g', title: 'G', collapsible: false, rows: [{ id: 'a', label: 'A', meta: 2 }] }]} />
    </>);
    const navRow = screen.getByTestId('rail-nav-list-item-a');
    const stackedRow = screen.getByTestId('stacked-rail-row-a');
    const strip = (cls: string) => cls.split(' ').filter((c) => !c.startsWith('py-') && !c.startsWith('pl-') && c !== 'px-2.5').sort().join(' ');
    expect(strip(stackedRow.className)).toBe(strip(navRow.className));
    expect(STACKED_RAIL_ROW_CLASS).toContain(RAIL_ROW_PAD_Y);
    expect(screen.getByTestId('stacked-rail-row-a-meta').className).toBe(screen.getByTestId('rail-nav-list-count-a').className);
  });

  it('nests rows 18px per level with a disclosure on rows that have children', () => {
    render(<StackedRail groups={docs()} />);
    const handbook = screen.getByTestId('stacked-rail-row-handbook');
    const onboarding = screen.getByTestId('stacked-rail-row-onboarding');
    expect(handbook).toHaveAttribute('data-depth', '0');
    expect(handbook).toHaveClass('pl-2.5');
    expect(onboarding).toHaveAttribute('data-depth', '1');
    expect(onboarding).toHaveClass('pl-[28px]');
    expect(handbook).toHaveAttribute('aria-expanded', 'true');
    expect(onboarding).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByTestId('stacked-rail-row-faq')).not.toHaveAttribute('aria-expanded');
    expect(screen.queryByTestId('stacked-rail-row-day-one')).toBeNull();
    fireEvent.click(screen.getByTestId('stacked-rail-row-onboarding-caret'));
    expect(screen.getByTestId('stacked-rail-row-day-one')).toHaveClass('pl-[46px]');
    // A flat group reserves no caret slot, so its rows line up with RailNavList.
    expect(screen.queryByTestId('stacked-rail-row-all-caret')).toBeNull();
  });

  it('draws meta as a count or as text', () => {
    render(<StackedRail groups={docs()} />);
    const count = screen.getByTestId('stacked-rail-row-all-meta');
    expect(count).toHaveAttribute('data-meta-kind', 'count');
    expect(count).toHaveAttribute('aria-label', '12 items');
    expect(count).toHaveClass(...RAIL_ITEM_COUNT.split(' '));
    const age = screen.getByTestId('stacked-rail-row-faq-meta');
    expect(age).toHaveAttribute('data-meta-kind', 'text');
    expect(age).not.toHaveAttribute('aria-label');
    expect(age).toHaveTextContent('5m');
    expect(screen.queryByTestId('stacked-rail-row-recent-meta')).toBeNull();
  });

  it('walks visible headings and rows with the arrow keys (roving tabindex)', () => {
    const select = vi.fn();
    const groups = docs();
    groups[1]!.rows[1]!.onSelect = select;
    render(<StackedRail groups={groups} selectedId="faq" />);
    const faq = screen.getByTestId('stacked-rail-row-faq');
    // One tab stop: the current row.
    expect(faq).toHaveAttribute('tabindex', '0');
    expect(screen.getByTestId('stacked-rail-row-all')).toHaveAttribute('tabindex', '-1');
    faq.focus();
    fireEvent.keyDown(faq, { key: 'ArrowUp' });
    const onboarding = screen.getByTestId('stacked-rail-row-onboarding');
    expect(onboarding).toHaveFocus();
    fireEvent.keyDown(onboarding, { key: 'ArrowRight' });
    expect(screen.getByTestId('stacked-rail-row-day-one')).toBeInTheDocument();
    fireEvent.keyDown(onboarding, { key: 'ArrowRight' });
    expect(screen.getByTestId('stacked-rail-row-day-one')).toHaveFocus();
    fireEvent.keyDown(screen.getByTestId('stacked-rail-row-day-one'), { key: 'ArrowLeft' });
    expect(onboarding).toHaveFocus();
    fireEvent.keyDown(onboarding, { key: 'ArrowLeft' });
    expect(screen.queryByTestId('stacked-rail-row-day-one')).toBeNull();
    fireEvent.keyDown(onboarding, { key: 'ArrowLeft' });
    expect(screen.getByTestId('stacked-rail-row-handbook')).toHaveFocus();
    fireEvent.keyDown(screen.getByTestId('stacked-rail-row-handbook'), { key: 'ArrowLeft' });
    fireEvent.keyDown(screen.getByTestId('stacked-rail-row-handbook'), { key: 'ArrowLeft' });
    const header = screen.getByTestId('stacked-rail-group-confluence-header');
    expect(header).toHaveFocus();
    fireEvent.keyDown(header, { key: 'ArrowLeft' });
    expect(header).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByTestId('stacked-rail-row-faq')).toBeNull();
    fireEvent.keyDown(header, { key: 'Home' });
    expect(screen.getByTestId('stacked-rail-row-all')).toHaveFocus();
    fireEvent.keyDown(screen.getByTestId('stacked-rail-row-all'), { key: 'End' });
    expect(header).toHaveFocus();
  });

  it('selects on Enter/Space and marks the current row', () => {
    const select = vi.fn();
    render(<StackedRail currentStyle="tint" groups={[{ id: 'g', title: 'G', rows: [
      { id: 'a', label: 'A', onSelect: select, current: true },
      { id: 'b', label: 'B', href: '/b', onSelect: select, onNavigate: (event) => event.preventDefault() },
    ] }]} />);
    const a = screen.getByTestId('stacked-rail-row-a');
    expect(a).toHaveAttribute('aria-current', 'page');
    expect(a).toHaveClass('font-semibold', 'bg-primary/10');
    fireEvent.click(a);
    expect(select).toHaveBeenCalledTimes(1);
    const b = screen.getByRole('link', { name: 'B' });
    fireEvent.keyDown(b, { key: ' ' });
    expect(select).toHaveBeenCalledTimes(2);
  });

  it('reveals the row menu slot on hover or focus and passes the row to a menu function', () => {
    const menu = vi.fn((row: { label: string }) => <button type="button">Actions for {row.label}</button>);
    render(<StackedRail groups={[{ id: 'g', title: 'G', rows: [{ id: 'a', label: 'A', menu }] }]} />);
    expect(menu).toHaveBeenCalledWith(expect.objectContaining({ id: 'a' }));
    const slot = screen.getByTestId('stacked-rail-row-a-menu');
    expect(within(slot).getByRole('button', { name: 'Actions for A' })).toBeInTheDocument();
    expect(slot).toHaveClass('hidden', 'group-hover/row:flex', 'group-focus-within/row:flex');
    // The slot sits beside the row control, not inside it (no nested buttons).
    expect(screen.getByTestId('stacked-rail-row-a')).not.toContainElement(slot);
  });

  it('draws presence and actions on a group heading, and an inline line for an empty group', () => {
    const pull = vi.fn();
    render(<StackedRail groups={[
      { id: 'src', title: 'Confluence', trailing: <span data-testid="avatars">AB</span>, actions: [{ label: 'Pull', icon: <span>↻</span>, onClick: pull }], rows: [] },
    ]} />);
    expect(within(screen.getByTestId('stacked-rail-group-src-trailing')).getByTestId('avatars')).toBeInTheDocument();
    const action = screen.getByRole('button', { name: 'Pull' });
    expect(action).toHaveClass('h-7', 'w-7');
    fireEvent.click(action);
    expect(pull).toHaveBeenCalledOnce();
    expect(screen.getByTestId('stacked-rail-group-src-empty')).toHaveTextContent('Nothing here yet.');
  });

  it('takes caller testids, drag handlers and data attributes on rows and group headings', () => {
    const onDrop = vi.fn();
    const onDragStart = vi.fn();
    const onDragEnter = vi.fn();
    render(<StackedRail data-testid="explorer-folders" groups={[
      {
        id: 'f1', title: 'Folder', testId: 'folder-f1', onDrop, onDragEnter, data: { 'data-kind': 'folder' },
        rows: [{ id: 'd1', label: 'Doc', testId: 'explorer-folders-row-d1', draggable: true, onDragStart, data: { 'data-doc-id': 'd1' } }],
      },
      { id: 'f2', title: 'Other', pending: true, rows: [{ id: 'd2', label: 'Two', pending: true }] },
    ]} />);
    expect(screen.getByTestId('folder-f1')).toHaveAttribute('data-group-id', 'f1');
    const header = screen.getByTestId('folder-f1-header');
    expect(header).toHaveAttribute('data-kind', 'folder');
    fireEvent.drop(header);
    fireEvent.dragEnter(header);
    expect(onDrop).toHaveBeenCalledOnce();
    expect(onDragEnter).toHaveBeenCalledOnce();
    const row = screen.getByTestId('explorer-folders-row-d1');
    expect(row).toHaveAttribute('draggable', 'true');
    expect(row).toHaveAttribute('data-doc-id', 'd1');
    fireEvent.dragStart(row);
    expect(onDragStart).toHaveBeenCalledOnce();
    // Fallback ids use the list testid.
    expect(screen.getByTestId('explorer-folders-group-f2')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByTestId('explorer-folders-row-d2')).toHaveAttribute('aria-busy', 'true');
  });

  it('keeps a disabled row focusable and inert, with its reason as the tooltip', () => {
    const select = vi.fn();
    render(<StackedRail groups={[{ id: 'g', title: 'G', rows: [{ id: 'a', label: 'A', disabled: true, disabledReason: 'No access', onSelect: select, href: '/a' }] }]} />);
    const a = screen.getByTestId('stacked-rail-row-a');
    expect(a.tagName).toBe('BUTTON');
    expect(a).toHaveAttribute('aria-disabled', 'true');
    expect(a).toHaveAttribute('title', 'No access');
    fireEvent.click(a);
    expect(select).not.toHaveBeenCalled();
  });

  it('honours controlled disclosure', () => {
    const onToggle = vi.fn();
    render(<StackedRail groups={[{ id: 'g', title: 'G', open: false, onToggle, rows: [{ id: 'a', label: 'A' }] }]} />);
    expect(screen.queryByTestId('stacked-rail-row-a')).toBeNull();
    fireEvent.click(screen.getByTestId('stacked-rail-group-g-header'));
    expect(onToggle).toHaveBeenCalledWith(true);
    expect(screen.queryByTestId('stacked-rail-row-a')).toBeNull();
  });
});
