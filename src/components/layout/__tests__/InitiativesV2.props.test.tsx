// 2.392.0 — the Initiatives v2 props, one block per prop. Every default must
// render as before, so each block also pins the default.
import { render, screen, fireEvent, within } from '@testing-library/react';
import { ExplorerLayout } from '../ExplorerLayout';
import { WorkspaceRail } from '../WorkspaceRail';
import { GroupedList } from '../../shared/GroupedList';
import { RailNavList } from '../../shared/RailNavList';
import { StatStrip } from '../../shared/StatStrip';
import { PageSection } from '../../ui/PageSection';
import { ScopeHeader } from '../../work/ScopeHeader';
import { ActionRowList, ActionRowPerson } from '../../work/ActionRowList';

describe('WorkspaceRail / ExplorerLayout width="ms"', () => {
  it('is 264px', () => {
    render(<WorkspaceRail width="ms" title="Initiatives">x</WorkspaceRail>);
    expect(screen.getByTestId('workspace-rail').className).toContain('w-[264px]');
  });
  it('ExplorerLayout passes railWidth="ms" through; the default stays 300px', () => {
    const { rerender } = render(<ExplorerLayout rail={<p>r</p>} railWidth="ms">pane</ExplorerLayout>);
    expect(screen.getByTestId('explorer-layout-rail').className).toContain('w-[264px]');
    rerender(<ExplorerLayout rail={<p>r</p>}>pane</ExplorerLayout>);
    expect(screen.getByTestId('explorer-layout-rail').className).toContain('w-[300px]');
  });
});

describe('RailNavList', () => {
  const items = [
    { id: 'all', label: 'All initiatives', href: '?scope=all', current: true },
    { id: 'mine', label: 'My initiatives', href: '?scope=mine', count: 0 },
    { id: 'sprints', label: 'Sprints', onSelect: vi.fn() },
    { id: 'off', label: 'Archive', disabled: true, disabledReason: 'Nothing archived yet' },
  ];
  it('renders a nav of links and buttons, marks the current one', () => {
    render(<RailNavList aria-label="Initiative views" items={items} />);
    const nav = screen.getByRole('navigation', { name: 'Initiative views' });
    const all = within(nav).getByRole('link', { name: 'All initiatives' });
    expect(all).toHaveAttribute('aria-current', 'page');
    expect(all).toHaveAttribute('href', '?scope=all');
    expect(within(nav).getByRole('link', { name: /My initiatives/ })).not.toHaveAttribute('aria-current');
  });
  it('draws a zero count and calls onSelect for a button item', () => {
    render(<RailNavList items={items} />);
    expect(screen.getByTestId('rail-nav-list-count-mine')).toHaveTextContent('0');
    fireEvent.click(screen.getByRole('button', { name: 'Sprints' }));
    expect(items[2]!.onSelect).toHaveBeenCalled();
  });
  it('a disabled item is inert with its reason as the tooltip', () => {
    render(<RailNavList items={items} />);
    const off = screen.getByRole('button', { name: 'Archive' });
    expect(off).toBeDisabled();
    expect(off).toHaveAttribute('title', 'Nothing archived yet');
  });
  it('renders nothing for no items', () => {
    const { container } = render(<RailNavList items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('GroupedList groupCountAlign', () => {
  const props = {
    groups: [{ id: 'p', title: 'In progress', count: 9 }],
    rows: [{ id: 'a', groupId: 'p', title: 'Observability Platform' }],
  };
  it('end pushes the count to the right edge, for every heading style', () => {
    const { rerender } = render(<GroupedList {...props} groupHeading="label" groupCountAlign="end" />);
    const count = screen.getByTestId('grouped-list-group-count-p');
    expect(count.className).toContain('ml-auto');
    expect(count).toHaveAttribute('data-count-align', 'end');
    rerender(<GroupedList {...props} groupCountAlign="end" />);
    expect(screen.getByTestId('grouped-list-group-count-p').className).toContain('ml-auto');
  });
  it('the default keeps the count inline', () => {
    render(<GroupedList {...props} groupHeading="label" />);
    const count = screen.getByTestId('grouped-list-group-count-p');
    expect(count.className).not.toContain('ml-auto');
    expect(count).not.toHaveAttribute('data-count-align');
  });
});

describe('ScopeHeader description pre-line', () => {
  it('renders a newline as a line break', () => {
    render(<ScopeHeader title="Obs" description={'Centralize telemetry.\nFocus: actionable alerts.'} />);
    const d = screen.getByTestId('scope-header-description');
    expect(d.className).toContain('whitespace-pre-line');
    expect(d.textContent).toBe('Centralize telemetry.\nFocus: actionable alerts.');
  });
});

describe('ScopeHeader peopleStyle="inline"', () => {
  const people = [
    { label: 'Owner', people: [{ id: 'nd', name: 'Nora DaSilva' }] },
    { label: 'SMEs', people: [{ id: 'lh', name: 'Layla Hassan' }, { id: 'eg', name: 'Eli Garcia' }] },
    { label: 'Empty', people: [] },
  ];
  it('draws label, 32px avatar and name per person, groups ruled apart, empty groups dropped', () => {
    render(<ScopeHeader title="Obs" people={people} peopleStyle="inline" />);
    const row = screen.getByTestId('scope-header-people');
    expect(row).toHaveAttribute('data-people-style', 'inline');
    expect(within(row).getByRole('group', { name: 'Owner' })).toHaveTextContent('Nora DaSilva');
    const smes = within(row).getByRole('group', { name: 'SMEs' });
    expect(smes).toHaveTextContent('Layla Hassan');
    expect(smes).toHaveTextContent('Eli Garcia');
    expect(within(row).queryByRole('group', { name: 'Empty' })).toBeNull();
    expect(within(row).getAllByTestId('scope-header-people-rule')).toHaveLength(1);
    const avatar = within(screen.getByTestId('scope-header-person-nd')).getByText('ND');
    expect(avatar.closest('[style]')).toHaveStyle({ width: '32px', height: '32px' });
  });
  it('the default still puts avatar groups in the right-hand group', () => {
    render(<ScopeHeader title="Obs" people={people} />);
    expect(screen.queryByTestId('scope-header-people')).toBeNull();
    expect(screen.getByTestId('scope-header-people-owner')).toBeInTheDocument();
  });
});

describe('ScopeHeader tabSize', () => {
  const tabs = [{ id: 'o', label: 'Overview' }, { id: 'w', label: 'Work', count: 11 }];
  it('md makes 15px tabs at the default title size', () => {
    render(<ScopeHeader title="Obs" tabs={tabs} tabSize="md" />);
    const tab = screen.getByRole('tab', { name: /Overview/ });
    expect(tab.className).toContain('text-[15px]');
    // 2.396.0: the bar starts at the content edge, the label 4px in.
    expect(tab.className).toContain('pl-1');
    expect(tab.className).toContain('pr-3');
    expect(screen.getByTestId('scope-header')).toHaveAttribute('data-tab-size', 'md');
  });
  it('md marks the selected tab with a 3px bar inside the header, not a border hung below it (2.396.0)', () => {
    render(<ScopeHeader title="Obs" tabs={tabs} tabSize="md" className="border-b border-border" />);
    const tab = screen.getByRole('tab', { name: /Overview/ });
    // No hanging border: nothing reaches past the header for the pane body to paint over.
    expect(tab.className).not.toContain('border-b-2');
    expect(tab.className).not.toContain('-mb-px');
    expect(tab.className).toContain('relative');
    const bar = tab.querySelector('[data-tab-indicator]')!;
    expect(bar).not.toBeNull();
    expect(bar.className).toContain('h-[3px]');
    expect(bar.className).toContain('bottom-0');
    expect(bar.className).toContain('z-[1]');
    expect(screen.getByRole('tab', { name: /Work/ }).querySelector('[data-tab-indicator]')).toBeNull();
    // host rule (default): the row sits on it and draws none of its own.
    const list = screen.getByRole('tablist');
    expect(list.className).toContain('-mb-px');
    expect(list.className).toContain('after:hidden');
  });
  it('tabsRule="inset" has the tab row draw its own rule inside the gutter; the default leaves it to the host', () => {
    const { rerender } = render(<ScopeHeader title="Obs" tabs={tabs} tabSize="md" tabsRule="inset" />);
    const list = screen.getByRole('tablist');
    expect(list.className).not.toContain('-mb-px');
    expect(list.className).not.toContain('after:hidden');
    expect(list.className).toContain('after:h-px');
    expect(screen.getByTestId('scope-header')).toHaveAttribute('data-tabs-rule', 'inset');
    expect(screen.getByTestId('scope-header').className).toContain('px-6');
    // without tabSize the row keeps its border rule, no longer cancelled
    rerender(<ScopeHeader title="Obs" tabs={tabs} tabsRule="inset" />);
    expect(screen.getByRole('tablist').className).not.toContain('border-b-0');
    expect(screen.getByRole('tablist').className).toContain('border-b');
    rerender(<ScopeHeader title="Obs" tabs={tabs} />);
    expect(screen.getByTestId('scope-header')).not.toHaveAttribute('data-tabs-rule');
    expect(screen.getByRole('tablist').className).toContain('border-b-0');
  });
  it('absent keeps 14px at md and 15px at lg; sm forces 14px at lg', () => {
    const { rerender } = render(<ScopeHeader title="Obs" tabs={tabs} />);
    expect(screen.getByRole('tab', { name: /Overview/ }).className).not.toContain('text-[15px]');
    rerender(<ScopeHeader title="Obs" tabs={tabs} titleSize="lg" />);
    expect(screen.getByRole('tab', { name: /Overview/ }).className).toContain('text-[15px]');
    rerender(<ScopeHeader title="Obs" tabs={tabs} titleSize="lg" tabSize="sm" />);
    expect(screen.getByRole('tab', { name: /Overview/ }).className).not.toContain('text-[15px]');
  });
});

describe('StatStrip variant="line"', () => {
  it('one dot-separated line, progress drawn inline as a 150px bar', () => {
    render(
      <StatStrip
        variant="line"
        aria-label="Progress"
        items={[
          { label: '/ 52 points delivered', value: 18, progress: { value: 18, max: 52 } },
          { label: 'agents running', value: 2 },
          { label: 'of $95 spent', value: '$1.73' },
        ]}
      />,
    );
    const group = screen.getByRole('group', { name: 'Progress' });
    expect(group).toHaveAttribute('data-variant', 'line');
    expect(within(group).getAllByTestId('stat-strip-separator')).toHaveLength(2);
    const bar = within(group).getByTestId('stat-strip-progress');
    expect(bar.className).toContain('w-[150px]');
    expect(within(bar).getByRole('progressbar')).toHaveAttribute('aria-valuenow', '18');
    expect(group.className).not.toContain('border-b');
  });
  it('draws no bar without a real total', () => {
    render(<StatStrip variant="line" items={[{ label: 'points', value: 0, progress: { value: 0, max: 0 } }]} />);
    expect(screen.queryByTestId('stat-strip-progress')).toBeNull();
    expect(screen.queryByTestId('stat-strip-separator')).toBeNull();
  });
});

describe('PageSection countTone', () => {
  it('primary is a pale indigo pill with indigo numerals; the default stays the neutral chip', () => {
    const { rerender } = render(<PageSection title="Needs attention" size="md" count={1} countTone="primary" data-testid="s"><p>x</p></PageSection>);
    const pill = screen.getByTestId('s-count');
    expect(pill.className).toContain('bg-primary-bg');
    expect(pill.className).toContain('text-primary-fg');
    expect(pill.className).not.toContain('bg-neutral-bg');
    rerender(<PageSection title="Needs attention" size="md" count={1} data-testid="s"><p>x</p></PageSection>);
    expect(screen.getByTestId('s-count').className).toContain('bg-neutral-bg');
    expect(screen.getByTestId('s-count').className).not.toContain('bg-primary-bg');
  });
});

describe('PageSection count / size', () => {
  it('md is an h2 with a count chip and actions', () => {
    render(
      <PageSection title="Needs attention" size="md" count={1} actions={<a href="#all">View all 11</a>} data-testid="ps">
        <p>rows</p>
      </PageSection>,
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Needs attention');
    expect(screen.getByTestId('ps-count')).toHaveTextContent('1');
    expect(screen.getByRole('link', { name: 'View all 11' })).toBeInTheDocument();
  });
  it('a zero count shows "0"; the default stays an h1 with no count', () => {
    const { rerender } = render(<PageSection title="Up next" size="md" count={0} data-testid="ps">x</PageSection>);
    expect(screen.getByTestId('ps-count')).toHaveTextContent('0');
    rerender(<PageSection title="Page">x</PageSection>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page');
    expect(screen.queryByLabelText(/items/)).toBeNull();
  });
});

describe('ActionRowList tone / accent / leading / columns / action', () => {
  const columns = [
    { id: 'who', width: 'lg' as const, label: 'Assignee' },
    { id: 'pts', width: 'sm' as const, label: 'Points' },
  ];
  it('columns: every row gets every column at the same width, a missing cell stays blank', () => {
    render(
      <ActionRowList
        columns={columns}
        items={[
          { id: 'a', title: 'Decommission the legacy StatsD bridge', cells: { who: 'Layla Hassan', pts: '5 pts' } },
          { id: 'b', title: 'Error-budget dashboard per team', cells: { pts: '3 pts' } },
        ]}
      />,
    );
    const whoCells = screen.getAllByTestId('action-row-cell-who');
    expect(whoCells).toHaveLength(2);
    whoCells.forEach((c) => expect(c).toHaveAttribute('data-width', 'lg'));
    expect(whoCells[1]).toHaveTextContent('');
    expect(screen.getAllByTestId('action-row-divider')).toHaveLength(2);
    const first = screen.getByTestId('action-row-list-open-a');
    expect(first.textContent).toMatch(/Decommission.*Assignee: Layla Hassan.*Points: 5 pts/);
  });
  it('tone + accent tint the row and add the bar; a toned list drops the rules', () => {
    render(<ActionRowList tone="warning" accent="bar" items={[{ id: 'x', title: 'Stop duplicate alerts' }]} />);
    const row = screen.getByTestId('action-row-list-row-x');
    expect(row).toHaveAttribute('data-tone', 'warning');
    expect(row).toHaveAttribute('data-accent', 'bar');
    expect(row.className).not.toContain('border-b');
    const btn = screen.getByTestId('action-row-list-open-x');
    expect(btn.className).toContain('bg-warning-callout');
    expect(btn.className).toContain('var(--color-warning)');
  });
  it('an item tone overrides the list; the default is untinted and ruled', () => {
    render(<ActionRowList items={[{ id: 'x', title: 'A' }, { id: 'y', title: 'B', tone: 'danger' }]} />);
    expect(screen.getByTestId('action-row-list-row-x')).not.toHaveAttribute('data-tone');
    expect(screen.getByTestId('action-row-list-row-x').className).toContain('border-b');
    expect(screen.getByTestId('action-row-list-open-y').className).toContain('bg-danger-callout');
  });
  it('leading goes before the title; action replaces the chevron; the row is still one target', () => {
    const onOpen = vi.fn();
    render(
      <ActionRowList
        onOpen={onOpen}
        items={[{ id: 'x', title: 'Stop duplicate alerts', description: 'Waiting on the dependency map.', leading: <span>Blocked</span>, action: 'Open' }]}
      />,
    );
    const btn = screen.getByRole('button');
    expect(btn.textContent).toMatch(/^Blocked.*Stop duplicate alerts.*Waiting on the dependency map\..*Open$/);
    expect(within(btn).getByTestId('action-row-action')).toHaveTextContent('Open');
    expect(within(btn).queryAllByRole('button').length).toBe(0);
    fireEvent.click(btn);
    expect(onOpen).toHaveBeenCalledTimes(1);
  });
  it('the list-level action applies to every row; descriptions still render beside columns', () => {
    render(<ActionRowList action="Open" columns={columns} items={[{ id: 'a', title: 'A', description: 'why', cells: { pts: '2 pts' } }]} />);
    expect(screen.getByTestId('action-row-action')).toBeInTheDocument();
    expect(screen.getByTestId('action-row-description')).toHaveTextContent('why');
  });
});

describe('WorkspaceRail heading="caption"', () => {
  it('is a 13px uppercase label with a chip count; the default stays compact', () => {
    const { rerender } = render(<WorkspaceRail title="Initiatives" count={11} heading="caption">x</WorkspaceRail>);
    const t = screen.getByTestId('workspace-rail-title');
    expect(t.className).toContain('text-[13px]');
    expect(t.className).toContain('uppercase');
    expect(screen.getByTestId('workspace-rail-header').className).toContain('h-14');
    expect(screen.getByTestId('workspace-rail-count')).toHaveTextContent('11');
    rerender(<WorkspaceRail title="Initiatives">x</WorkspaceRail>);
    expect(screen.getByTestId('workspace-rail-title').className).toContain('text-[12px]');
  });
});

describe('GroupedList rowStyle', () => {
  const props = {
    groups: [{ id: 'p', title: 'In progress' }],
    rows: [{ id: 'a', groupId: 'p', title: 'Observability Platform' }],
  };
  it('plain drops the row rules and uses the 40px md pitch', () => {
    render(<GroupedList {...props} size="md" rowStyle="plain" />);
    const row = screen.getByTestId('grouped-list-row-a');
    expect(row.className).toContain('border-t-0');
    expect(row.className).toContain('py-[9px]');
  });
  it('the default keeps the rules', () => {
    render(<GroupedList {...props} size="md" />);
    const row = screen.getByTestId('grouped-list-row-a');
    expect(row.className).toContain('border-border');
    expect(row.className).toContain('py-[7px]');
  });
});

describe('ScopeHeader descriptionSize', () => {
  it('sm is 15px on 22px lines; the default stays 16/24', () => {
    const { rerender } = render(<ScopeHeader title="Obs" description="Summary" descriptionSize="sm" />);
    expect(screen.getByTestId('scope-header-description').className).toContain('text-[15px]');
    rerender(<ScopeHeader title="Obs" description="Summary" />);
    expect(screen.getByTestId('scope-header-description').className).toContain('text-base');
  });
});

describe('ActionRowPerson', () => {
  it('draws a 28px avatar and the name with a title for truncation', () => {
    render(<ActionRowPerson name="Layla Hassan" />);
    const p = screen.getByTestId('action-row-person');
    expect(within(p).getByText('LH').closest('[style]')).toHaveStyle({ width: '28px' });
    expect(within(p).getByText('Layla Hassan')).toHaveAttribute('title', 'Layla Hassan');
  });
});
