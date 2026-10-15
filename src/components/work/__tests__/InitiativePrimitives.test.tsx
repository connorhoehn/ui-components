// 2.390.0 — the Initiatives redesign's additions to the work/ components. Each
// new prop is additive: every test that sets one also pins that leaving it out
// renders exactly what it did before.
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ScopeHeader } from '../ScopeHeader';
import { WorkListView, toWorkListRows, type WorkListItem } from '../WorkListView';
import { WorkItemMetaBar } from '../WorkItemMetaBar';
import { ActionRowList } from '../ActionRowList';
import { OutcomeSection } from '../OutcomeSection';

afterEach(cleanup);

const people = [
  { label: 'Owner', people: [{ id: 'nd', name: 'Nora DaSilva' }] },
  { label: 'SMEs', people: [{ id: 'lh', name: 'Layla Hassan' }, { id: 'eg', name: 'Eli Garcia' }] },
];

describe('ScopeHeader (2.390.0)', () => {
  it('titleSize="lg" draws the 28px bold title; the default is the 20px page title', () => {
    const { rerender } = render(<ScopeHeader title="Observability Platform" titleSize="lg" />);
    expect(screen.getByTestId('scope-header-title').className).toContain('text-[28px]');
    expect(screen.getByTestId('scope-header-title').className).toContain('font-bold');
    rerender(<ScopeHeader title="Observability Platform" />);
    expect(screen.getByTestId('scope-header-title').className).toContain('text-[20px]');
  });

  it('description draws a line under the title; absent draws none', () => {
    const { rerender } = render(<ScopeHeader title="Obs" description="Collect telemetry, reduce alert noise." />);
    expect(screen.getByTestId('scope-header-description').textContent).toBe('Collect telemetry, reduce alert noise.');
    rerender(<ScopeHeader title="Obs" />);
    expect(screen.queryByTestId('scope-header-description')).toBeNull();
  });

  it('peopleStyle="names" writes names then the label, and draws no avatars', () => {
    render(<ScopeHeader title="Obs" people={people} peopleStyle="names" />);
    const line = screen.getByTestId('scope-header-people');
    expect(within(line).getByTestId('scope-header-people-owner').textContent).toBe('Nora DaSilva · Owner');
    expect(within(line).getByTestId('scope-header-people-smes').textContent).toBe('Layla Hassan, Eli Garcia · SMEs');
    expect(screen.queryByRole('img', { name: /Nora/ })).toBeNull();
  });

  it('peopleStyle defaults to avatars (no names line)', () => {
    render(<ScopeHeader title="Obs" people={people} />);
    expect(screen.queryByTestId('scope-header-people')).toBeNull();
    expect(screen.getByTestId('scope-header-people-owner')).toBeInTheDocument();
  });

  it('linkStyle="button" is an outlined link, label then the ↗ glyph', () => {
    render(<ScopeHeader title="Obs" link={{ label: 'Repository', href: 'https://example.com/r' }} linkStyle="button" />);
    const a = screen.getByTestId('scope-header-link');
    expect(a.tagName).toBe('A');
    expect(a.getAttribute('href')).toBe('https://example.com/r');
    expect(a.getAttribute('data-link-style')).toBe('button');
    expect(a.className).toContain('border');
    expect(a.firstElementChild?.textContent).toBe('Repository');
    expect(a.querySelector('svg')).not.toBeNull();
  });

  it('linkStyle defaults to the inline text link', () => {
    render(<ScopeHeader title="Obs" link={{ label: 'repo', href: '#r' }} />);
    expect(screen.getByTestId('scope-header-link').getAttribute('data-link-style')).toBeNull();
  });

  it('statsPlacement="below" moves the stats line under the title row', () => {
    render(<ScopeHeader title="Obs" progress={{ done: 18, total: 52 }} spentUsd={1.73} statsPlacement="below" />);
    const stats = screen.getByTestId('scope-header-stats');
    // Below: a direct child of the header, not inside the title row.
    expect(stats.parentElement).toBe(screen.getByTestId('scope-header'));
    expect(stats.textContent).toContain('18 / 52 points delivered');
    expect(stats.className).toContain('text-[15px]');
  });

  it('statsPlacement defaults to inline, beside the title', () => {
    render(<ScopeHeader title="Obs" progress={{ done: 1, total: 2 }} />);
    expect(screen.getByTestId('scope-header-stats').parentElement).not.toBe(screen.getByTestId('scope-header'));
  });
});

const items: WorkListItem[] = [
  { id: 'b4', groupId: 'next', title: 'Stop duplicate alerts', kindLabel: 'Bug', owner: { id: 'eg', name: 'Eli Garcia' }, points: 2, tag: { label: 'Blocked', tone: 'danger' } },
  { id: 's1', groupId: 'next', title: 'Decommission StatsD', owner: { id: 'lh', name: 'Layla Hassan' }, points: 1 },
  { id: 'r1', groupId: 'review', title: 'Burn-rate alerts', owner: { id: 'lh', name: 'Layla Hassan' }, signal: { state: 'review', label: 'Awaiting review' } },
];
const groups = [{ id: 'next', title: 'Next up' }, { id: 'review', title: 'In review' }];

describe('WorkListView (2.390.0)', () => {
  const base = { query: '', onQueryChange: () => {}, groups, items };

  it('metaStyle="text" writes "Kind · Owner · N points" with no avatar', () => {
    render(<WorkListView {...base} metaStyle="text" pointsLabel="points" />);
    expect(screen.getByTestId('work-list-meta-b4').textContent).toBe('Bug · Eli Garcia · 2 points');
    expect(screen.getByTestId('work-list-meta-s1').textContent).toBe('Layla Hassan · 1 point');
    expect(screen.getByTestId('work-list-meta-b4').getAttribute('data-meta-style')).toBe('text');
  });

  it('the default meta line is unchanged ("2 pts · Eli Garcia")', () => {
    render(<WorkListView {...base} />);
    expect(screen.getByTestId('work-list-meta-b4').textContent).toBe('2 pts · Eli Garcia');
  });

  it('pointsLabel="points" also applies to the default meta line', () => {
    render(<WorkListView {...base} pointsLabel="points" />);
    expect(screen.getByTestId('work-list-meta-b4').textContent).toBe('2 points · Eli Garcia');
  });

  it('item.tag draws a toned chip at the row end', () => {
    render(<WorkListView {...base} />);
    expect(screen.getByTestId('work-list-tag-b4').textContent).toBe('Blocked');
    expect(screen.queryByTestId('work-list-tag-s1')).toBeNull();
  });

  it('signalDisplay="meta" keeps the label, drops the leading dot', () => {
    render(<WorkListView {...base} metaStyle="text" signalDisplay="meta" />);
    expect(screen.queryByTestId('work-list-signal-r1')).toBeNull();
    expect(screen.getByTestId('work-list-meta-r1').textContent).toBe('Awaiting review · Layla Hassan');
  });

  it('signalDisplay defaults to the dot', () => {
    render(<WorkListView {...base} />);
    expect(screen.getByTestId('work-list-signal-r1')).toBeInTheDocument();
  });

  it('signalDisplay="meta" lets a signalled row keep its checkbox', () => {
    const rows = toWorkListRows(items, { onToggleDone: () => {}, signalDisplay: 'meta' });
    render(<>{rows.find((r) => r.id === 'r1')!.leading}</>);
    expect(screen.getByRole('checkbox', { name: 'Mark Burn-rate alerts done' })).toBeInTheDocument();
  });

  it('toolbarLayout="inline" puts search and filter on one row, sort below', () => {
    render(
      <WorkListView
        {...base}
        toolbarLayout="inline"
        sort="priority"
        sortOptions={[{ value: 'priority', label: 'By priority' }]}
        onSortChange={() => {}}
        filters={<span>f</span>}
      />,
    );
    const toolbar = screen.getByTestId('work-list-toolbar');
    expect(toolbar.getAttribute('data-layout')).toBe('inline');
    const search = screen.getByTestId('work-list-toolbar-search');
    const filter = screen.getByTestId('work-list-toolbar-filter-root');
    expect(search.closest('div.flex.items-center')).toBe(filter.closest('div.flex.items-center'));
  });

  it('sortStyle="menu" is a text menu that reports the choice', () => {
    const onSort = vi.fn();
    render(
      <WorkListView
        {...base}
        sortStyle="menu"
        sort="priority"
        sortOptions={[{ value: 'priority', label: 'By priority' }, { value: 'points', label: 'By points' }]}
        onSortChange={onSort}
      />,
    );
    const trigger = screen.getByTestId('work-list-toolbar-sort');
    expect(trigger.tagName).toBe('BUTTON');
    expect(trigger.textContent).toContain('By priority');
    fireEvent.click(trigger);
    fireEvent.click(screen.getByText('By points'));
    expect(onSort).toHaveBeenCalledWith('points');
  });

  it('sortStyle defaults to a select', () => {
    render(<WorkListView {...base} sort="priority" sortOptions={[{ value: 'priority', label: 'By priority' }]} onSortChange={() => {}} />);
    expect(screen.getByTestId('work-list-toolbar-sort')).toHaveAttribute('data-ui-control', 'select');
  });

  it('passes currentStyle and groupCountStyle to the list', () => {
    render(<WorkListView {...base} groupCountStyle="plain" currentStyle="bar" currentId="b4" />);
    expect(screen.getByTestId('work-list-groups-group-count-next').getAttribute('data-count-style')).toBe('plain');
  });
});

describe('WorkItemMetaBar (2.390.0)', () => {
  const status = { value: 'open', options: [{ value: 'open', label: 'Open' }] };
  const priority = { value: 'high', options: [{ value: 'high', label: 'High', tone: 'danger' as const }] };

  it('flags draw toned tags after the status', () => {
    render(<WorkItemMetaBar status={status} flags={[{ label: 'Blocked', tone: 'danger' }]} />);
    const group = screen.getByRole('group', { name: 'Work item details' });
    const fields = Array.from(group.querySelectorAll('[data-field]')).map((el) => el.getAttribute('data-field'));
    expect(fields).toEqual(['status', 'flag']);
    expect(screen.getByTestId('work-item-meta-bar-flag').textContent).toBe('Blocked');
  });

  it('layout="divided" orders status · flags · owner · points · priority, ruled', () => {
    render(
      <WorkItemMetaBar
        layout="divided"
        status={status}
        flags={[{ label: 'Blocked', tone: 'danger' }]}
        owner={{ value: { id: 'eg', name: 'Eli Garcia' } }}
        points={{ value: 2 }}
        priority={priority}
      />,
    );
    const group = screen.getByRole('group', { name: 'Work item details' });
    expect(group.getAttribute('data-layout')).toBe('divided');
    const fields = Array.from(group.querySelectorAll('[data-field]')).map((el) => el.getAttribute('data-field'));
    expect(fields).toEqual(['status', 'flag', 'owner', 'points', 'priority']);
    expect(group.querySelectorAll('span[aria-hidden="true"].w-px')).toHaveLength(4);
  });

  it('the default order is unchanged (status, points, owner, priority)', () => {
    render(<WorkItemMetaBar status={status} owner={{ value: { id: 'eg', name: 'Eli Garcia' } }} points={{ value: 2 }} priority={priority} />);
    const group = screen.getByRole('group', { name: 'Work item details' });
    const fields = Array.from(group.querySelectorAll('[data-field]')).map((el) => el.getAttribute('data-field'));
    expect(fields).toEqual(['status', 'points', 'owner', 'priority']);
    expect(group.getAttribute('data-layout')).toBeNull();
  });

  it('priorityStyle="tag" reads "High priority" with no "Priority:" word', () => {
    render(<WorkItemMetaBar priority={priority} priorityStyle="tag" />);
    expect(screen.getByTestId('work-meta-priority-tag').textContent).toBe('High priority');
    expect(screen.queryByText('Priority:')).toBeNull();
  });

  it('priorityStyle defaults to the "Priority:" label', () => {
    render(<WorkItemMetaBar priority={priority} />);
    expect(screen.getByText('Priority:')).toBeInTheDocument();
  });
});

describe('ActionRowList', () => {
  it('tints a toned row with the callout surface, never the generic -bg (2.393.1)', () => {
    const tones = ['success', 'warning', 'danger', 'info', 'caution', 'accent'] as const;
    for (const tone of tones) {
      const { getByTestId, unmount } = render(<ActionRowList tone={tone} items={[{ id: 'a', title: 'A' }]} />);
      const cls = getByTestId('action-row-list-open-a').className;
      expect(cls).toContain(`bg-${tone}-callout`);
      expect(cls).not.toContain(`bg-${tone}-bg`);
      unmount();
    }
  });

  const rows = [
    { id: 's1', title: 'Decommission the legacy StatsD bridge', description: 'Move remaining service metrics to OpenTelemetry.', meta: 'Layla Hassan · 5 points' },
    { id: 's2', title: 'Error-budget dashboard per team' },
  ];

  it('each row is one button with title, description and meta', () => {
    const onOpen = vi.fn();
    render(<ActionRowList items={rows} onOpen={onOpen} aria-label="Plan next" />);
    const row = screen.getByTestId('action-row-list-open-s1');
    expect(row.tagName).toBe('BUTTON');
    expect(row.textContent).toContain('Move remaining service metrics');
    expect(row.textContent).toContain('Layla Hassan · 5 points');
    fireEvent.click(row);
    expect(onOpen).toHaveBeenCalledWith(rows[0]);
    expect(screen.getByRole('list', { name: 'Plan next' })).toBeInTheDocument();
  });

  it('draws no second line or meta when absent', () => {
    render(<ActionRowList items={rows} />);
    const row = screen.getByTestId('action-row-list-open-s2');
    expect(within(row).queryByTestId('action-row-description')).toBeNull();
    expect(within(row).queryByTestId('action-row-meta')).toBeNull();
  });

  it('an href row is a link', () => {
    render(<ActionRowList items={[{ id: 'a', title: 'A', href: '#a' }]} />);
    expect(screen.getByTestId('action-row-list-open-a').tagName).toBe('A');
  });

  it('a disabled row is inert and says why', () => {
    const onOpen = vi.fn();
    render(<ActionRowList items={[{ id: 'a', title: 'A', disabled: true, disabledReason: 'No access' }]} onOpen={onOpen} />);
    const row = screen.getByTestId('action-row-list-open-a');
    expect(row).toBeDisabled();
    expect(row.getAttribute('title')).toBe('No access');
    fireEvent.click(row);
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('renders the footer, the empty label, or nothing', () => {
    const { rerender, container } = render(<ActionRowList items={rows} footer={<a href="#all">See all</a>} />);
    expect(screen.getByTestId('action-row-list-footer').textContent).toBe('See all');
    rerender(<ActionRowList items={[]} emptyLabel="Nothing planned" />);
    expect(screen.getByTestId('action-row-list-empty').textContent).toBe('Nothing planned');
    rerender(<ActionRowList items={[]} />);
    expect(container.innerHTML).toBe('');
  });
});

describe('OutcomeSection size (2.390.0)', () => {
  it('size="lg" renders the lg heading and a 15px body', () => {
    render(<OutcomeSection title="Why this matters" value="Forty pages." size="lg" />);
    const section = screen.getByTestId('outcome-section');
    expect(section.getAttribute('data-size')).toBe('lg');
    expect(screen.getByText('Forty pages.').className).toContain('text-[15px]');
  });

  it('defaults to md', () => {
    render(<OutcomeSection title="Outcome" value="Done." />);
    expect(screen.getByTestId('outcome-section').getAttribute('data-size')).toBe('md');
  });
});
