import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { StackedRail, STACKED_RAIL_GROUP_ACTIONS_CLASS, STACKED_RAIL_ROW_CLASS, STACKED_RAIL_STEP_CLASS, type StackedRailGroup } from '../StackedRail';
import { RAIL_CURRENT_FILL, RAIL_GROUP_LABEL, RAIL_ITEM_COUNT, RAIL_ITEM_TEXT, RAIL_ROW_PAD_Y, RAIL_ROW_PITCH } from '../railType';
import { inactiveNavItemClassName } from '../SubNavLayout';

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
    expect(row).toHaveClass(...RAIL_ITEM_TEXT.split(' '), RAIL_ROW_PAD_Y);
    // A non-collapsible group is a heading, not a button.
    expect(screen.getByTestId('stacked-rail-group-views-header').tagName).toBe('H3');
    expect(screen.getByTestId('stacked-rail-group-confluence-header')).toHaveAttribute('aria-expanded', 'true');
  });

  it('draws the Org rail’s row (SubNavLayout): 36px pitch, 3px edge + 14px inset, no gap', () => {
    render(<StackedRail title="T" groups={[{ id: 'g', title: 'G', rows: [{ id: 'a', label: 'A', meta: 2, children: [{ id: 'b', label: 'B' }], open: true }] }]} />);
    const row = screen.getByTestId('stacked-rail-row-a');
    const child = screen.getByTestId('stacked-rail-row-b');
    // Same class list at every depth: nesting is gutter cells, not padding.
    const sorted = (cls: string) => cls.split(' ').sort().join(' ');
    expect(sorted(row.className)).toBe(sorted(STACKED_RAIL_ROW_CLASS + ' cursor-pointer'));
    expect(sorted(child.className)).toBe(sorted(row.className));
    // SubNavLayout's row inset and vertical padding.
    for (const cls of ['px-[14px]', 'border-l-[3px]', 'border-transparent', RAIL_ROW_PAD_Y]) {
      expect(inactiveNavItemClassName.split(' ')).toContain(cls);
      expect(row).toHaveClass(cls);
    }
    // 36px = 8 + a 20px line + 8, on every row, heading and the caption.
    expect(RAIL_ROW_PITCH).toBe(36);
    expect(RAIL_ROW_PAD_Y).toBe('py-2');
    const height = (el: HTMLElement) => el.className.split(' ').filter((c) => /^(py-|pt-|pb-|h-|min-h-|leading-)/.test(c)).sort();
    expect(height(row)).toEqual(['leading-5', 'py-2']);
    expect(height(child)).toEqual(height(row));
    const header = screen.getByTestId('stacked-rail-group-g-header');
    expect(header).toHaveClass('py-2', 'px-[14px]', 'border-l-[3px]');
    expect(screen.getByTestId('stacked-rail-group-g-header-caret')).toHaveClass('h-5');
    expect(screen.getByTestId('stacked-rail-title').parentElement).toHaveClass('h-9');
    // No gap between rows.
    const gapless = (el: HTMLElement | null) => el?.className.split(' ').filter((c) => /^(gap-|space-y-)/.test(c)) ?? [];
    expect(gapless(row.closest('ul'))).toEqual([]);
    expect(screen.getByTestId('stacked-rail-row-a-meta')).toHaveClass(...RAIL_ITEM_COUNT.split(' '));
  });

  it('draws `trailing` after `meta` at the right, without moving the text column or the height', () => {
    render(<StackedRail groups={[{ id: 'g', title: 'G', rows: [
      { id: 'with', label: 'With', meta: '3h', trailing: <span data-testid="avatars">AL</span> },
      { id: 'without', label: 'Without', meta: '3h' },
    ] }]} />);
    const withRow = screen.getByTestId('stacked-rail-row-with');
    const withoutRow = screen.getByTestId('stacked-rail-row-without');
    const trailing = screen.getByTestId('stacked-rail-row-with-trailing');
    expect(trailing).toContainElement(screen.getByTestId('avatars'));
    // Order: label, meta, trailing — the last thing in the row.
    const kids = [...withRow.children];
    expect(kids.indexOf(screen.getByTestId('stacked-rail-row-with-meta'))).toBe(kids.length - 2);
    expect(kids.at(-1)).toBe(trailing);
    // Right-aligned: the label is the flex-1 column before it; the slot never grows.
    expect(withRow.querySelector('span[title]')).toHaveClass('flex-1');
    expect(trailing).toHaveClass('shrink-0', 'h-5');
    expect(trailing.className).not.toMatch(/(^| )(flex-1|grow|p[xylr]?-|m[xylr]?-)/);
    // Same control classes (inset, pitch) and same content before the text.
    expect(withRow.className).toBe(withoutRow.className);
    expect(withRow.querySelector('span[title]')?.previousElementSibling ?? null).toBeNull();
    expect(withoutRow.querySelector('span[title]')?.previousElementSibling ?? null).toBeNull();
    expect(screen.queryByTestId('stacked-rail-row-without-trailing')).toBeNull();
  });

  it('nests rows 18px per level with a disclosure on rows that have children', () => {
    render(<StackedRail groups={docs()} />);
    const handbook = screen.getByTestId('stacked-rail-row-handbook');
    const onboarding = screen.getByTestId('stacked-rail-row-onboarding');
    expect(handbook).toHaveAttribute('data-depth', '0');
    expect(onboarding).toHaveAttribute('data-depth', '1');
    expect(handbook).toHaveAttribute('aria-expanded', 'true');
    expect(onboarding).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByTestId('stacked-rail-row-faq')).not.toHaveAttribute('aria-expanded');
    expect(screen.queryByTestId('stacked-rail-row-day-one')).toBeNull();
    fireEvent.click(screen.getByTestId('stacked-rail-row-onboarding-caret'));
    expect(screen.getByTestId('stacked-rail-row-day-one')).toHaveAttribute('data-depth', '2');
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
    render(<StackedRail groups={[{ id: 'g', title: 'G', rows: [
      { id: 'a', label: 'A', onSelect: select, current: true },
      { id: 'b', label: 'B', href: '/b', onSelect: select, onNavigate: (event) => event.preventDefault() },
    ] }]} />);
    const a = screen.getByTestId('stacked-rail-row-a');
    expect(a).toHaveAttribute('aria-current', 'page');
    // The Org rail's current row: the 3px primary edge over the 8% tint (default).
    expect(a).toHaveClass('border-l-primary', RAIL_CURRENT_FILL);
    expect(a).not.toHaveClass('font-semibold');
    expect(screen.getByTestId('stacked-rail-row-b')).not.toHaveClass('border-l-primary');
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

  describe('the 220px chrome budget (2.407.36)', () => {
    const action = (label: string, onClick = () => {}) => ({ label, icon: <svg aria-hidden="true" />, onClick, 'data-testid': `a-${label}` });

    it('group actions are revealed, not drawn: sr-only until hover / focus-visible / an open menu / a current group / a touch screen', () => {
      render(<StackedRail groups={docs({ trailing: <span data-testid="presence">AB</span>, actions: [action('Pull')] })} />);
      const slot = screen.getByTestId('stacked-rail-group-confluence-actions');
      const classes = slot.className.split(' ');
      expect(classes).toEqual(expect.arrayContaining(STACKED_RAIL_GROUP_ACTIONS_CLASS.split(' ')));
      expect(classes).toContain('sr-only');
      for (const reveal of [
        'group-hover/head:not-sr-only',
        'group-has-[:focus-visible]/head:not-sr-only',
        'group-data-[current]/head:not-sr-only',
        'has-[[aria-expanded=true]]:not-sr-only',
        '[@media(hover:none)]:not-sr-only',
      ]) expect(classes).toContain(reveal);
      // Visually hidden, never display:none — the action stays a tab stop after the heading.
      expect(classes).not.toContain('hidden');
      expect(screen.getByTestId('stacked-rail-group-confluence-head')).toHaveClass('group/head');
      const button = within(slot).getByRole('button', { name: 'Pull' });
      expect(button).not.toHaveAttribute('tabindex', '-1');
      // Presence and the count are not part of the reveal.
      expect(slot).not.toContainElement(screen.getByTestId('presence'));
      expect(slot).not.toContainElement(screen.getByTestId('stacked-rail-group-confluence-count'));
      expect(screen.getByTestId('stacked-rail-group-confluence-trailing').className).not.toMatch(/sr-only/);
      // The heading gives the label its right inset when chrome follows.
      expect(screen.getByTestId('stacked-rail-group-confluence-header')).toHaveClass('pr-0');
    });

    it('the coarse-pointer rule: a touch screen (hover: none) always shows the actions', () => {
      expect(STACKED_RAIL_GROUP_ACTIONS_CLASS.split(' ')).toContain('[@media(hover:none)]:not-sr-only');
    });

    it('a group is current when any row in it, at any depth, is current; `current` overrides', () => {
      const { rerender } = render(<StackedRail selectedId="day-one" groups={docs({ actions: [action('Pull')] })} />);
      expect(screen.getByTestId('stacked-rail-group-confluence-head')).toHaveAttribute('data-current');
      rerender(<StackedRail selectedId="all" groups={docs({ actions: [action('Pull')] })} />);
      expect(screen.getByTestId('stacked-rail-group-confluence-head')).not.toHaveAttribute('data-current');
      rerender(<StackedRail selectedId="all" groups={docs({ actions: [action('Pull')], current: true })} />);
      expect(screen.getByTestId('stacked-rail-group-confluence-head')).toHaveAttribute('data-current');
    });

    it('headings and the caption carry their full name in `title`; row labels always do', () => {
      render(<StackedRail title="Documents" groups={docs({ title: 'Enterprise content platform' })} />);
      expect(screen.getByTestId('stacked-rail-group-confluence-header')).toHaveAttribute('title', 'Enterprise content platform');
      expect(screen.getByTestId('stacked-rail-group-views-header')).toHaveAttribute('title', 'Views');
      expect(screen.getByTestId('stacked-rail-title')).toHaveAttribute('title', 'Documents');
      for (const id of ['all', 'recent', 'handbook', 'faq']) {
        const row = screen.getByTestId(`stacked-rail-row-${id}`);
        expect(row.querySelector('span[title]')).toHaveAttribute('title', row.textContent?.replace(/\d+[hdm]?$/, '') ?? '');
      }
    });

    it('caption: the count follows the title; two or more actions fold into one ⋯ below 240px', () => {
      const onImport = vi.fn();
      render(<StackedRail title="Documents" count={187} groups={docs()} actions={[action('New'), action('Import', onImport), action('Refresh')]} />);
      const title = screen.getByTestId('stacked-rail-title');
      expect(title.nextElementSibling).toBe(screen.getByTestId('stacked-rail-count'));
      expect(title.parentElement).toHaveClass('@container');
      expect(screen.getByTestId('stacked-rail-actions')).toHaveClass('@max-[15rem]:hidden');
      expect(screen.getByTestId('stacked-rail-actions-fold')).toHaveClass('hidden', '@max-[15rem]:flex');
      fireEvent.click(screen.getByTestId('stacked-rail-actions-menu'));
      const items = screen.getAllByRole('menuitem').map((el) => el.textContent);
      expect(items).toEqual(['New', 'Import', 'Refresh']);
      fireEvent.click(screen.getByRole('menuitem', { name: 'Import' }));
      expect(onImport).toHaveBeenCalledTimes(1);
    });

    it('caption: a single action stays inline with no fold', () => {
      render(<StackedRail title="Documents" count={3} groups={docs()} actions={[action('New')]} />);
      expect(screen.queryByTestId('stacked-rail-actions-fold')).toBeNull();
      expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
    });
  });
});
