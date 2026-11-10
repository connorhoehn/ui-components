import { render, screen, fireEvent, within } from '@testing-library/react';
import { NavRail, NavRailStack } from '../NavRail';
import type { NavRailItem } from '../NavRail';

const ITEMS: NavRailItem[] = [
  { to: '/build/work', label: 'Work', badge: 3, group: 'Build' },
  { to: '/build/changes', label: 'Changes', hint: 'Reviewed diffs', group: 'Build' },
  { to: '/operate/health', label: 'Health', group: 'Operate' },
];

describe('NavRail', () => {
  it('renders every item as a link', () => {
    render(<NavRail title="Platform" items={ITEMS} />);
    expect(screen.getByRole('link', { name: /Work/ })).toHaveAttribute('href', '/build/work');
    expect(screen.getByRole('link', { name: /Health/ })).toBeInTheDocument();
  });

  it('names the nav landmark from the title', () => {
    render(<NavRail title="Platform" items={ITEMS} />);
    expect(screen.getByRole('navigation', { name: 'Platform' })).toBeInTheDocument();
  });

  it('falls back to a generic label when the title is not a string', () => {
    render(<NavRail title={<em>Platform</em>} items={ITEMS} />);
    expect(screen.getByRole('navigation', { name: 'Navigation' })).toBeInTheDocument();
  });

  it('marks the active item with aria-current', () => {
    render(<NavRail items={ITEMS} activeHref="/build/work" />);
    expect(screen.getByRole('link', { name: /Work/ })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /Health/ })).not.toHaveAttribute('aria-current');
  });

  it('prefix match keeps an outer item lit from a descendant route', () => {
    render(<NavRail items={ITEMS} activeHref="/operate/health/runs/4f2a" />);
    expect(screen.getByRole('link', { name: /Health/ })).toHaveAttribute('aria-current', 'page');
  });

  it('prefix match respects segment boundaries', () => {
    render(
      <NavRail items={[{ to: '/iq/work', label: 'Work' }]} activeHref="/iq/workflows" />,
    );
    expect(screen.getByRole('link', { name: 'Work' })).not.toHaveAttribute('aria-current');
  });

  it('exact match does not light on a descendant route', () => {
    render(<NavRail items={ITEMS} match="exact" activeHref="/operate/health/runs" />);
    expect(screen.getByRole('link', { name: /Health/ })).not.toHaveAttribute('aria-current');
  });

  it('groups collapse and expand', () => {
    render(<NavRail items={ITEMS} />);
    const header = screen.getByRole('button', { name: /Build/ });
    expect(screen.getByRole('link', { name: /Changes/ })).toBeInTheDocument();
    fireEvent.click(header);
    expect(screen.queryByRole('link', { name: /Changes/ })).not.toBeInTheDocument();
    expect(header).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(header);
    expect(screen.getByRole('link', { name: /Changes/ })).toBeInTheDocument();
  });

  it('persists collapsed groups under storageKey', () => {
    const { unmount } = render(<NavRail items={ITEMS} storageKey="rail-test" />);
    fireEvent.click(screen.getByRole('button', { name: /Build/ }));
    unmount();
    render(<NavRail items={ITEMS} storageKey="rail-test" />);
    expect(screen.queryByRole('link', { name: /Changes/ })).not.toBeInTheDocument();
    // Leave the store clean for the next test in this file.
    fireEvent.click(screen.getByRole('button', { name: /Build/ }));
  });

  it('collapsing a group with focus inside hands focus to the group header', () => {
    render(<NavRail items={ITEMS} />);
    screen.getByRole('link', { name: /Changes/ }).focus();
    const header = screen.getByRole('button', { name: /Build/ });
    fireEvent.click(header);
    expect(header).toHaveFocus();
  });

  it('ungrouped items render above the groups', () => {
    render(
      <NavRail
        items={[{ to: '/overview', label: 'Overview' }, ...ITEMS]}
        data-testid="rail"
      />,
    );
    const links = within(screen.getByTestId('rail')).getAllByRole('link');
    expect(links[0]).toHaveAccessibleName('Overview');
  });

  it('an item with onClick renders as a button', () => {
    const onClick = vi.fn();
    render(<NavRail items={[{ id: 'halt', label: 'Halt', onClick }]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Halt' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renderLink lets a router own the anchor', () => {
    render(
      <NavRail
        items={ITEMS}
        renderLink={(item, props) => (
          <a {...props} href={`#${item.to}`} data-router="1" />
        )}
      />,
    );
    expect(screen.getByRole('link', { name: /Work/ })).toHaveAttribute('data-router', '1');
  });

  it('renders badges and hints', () => {
    render(<NavRail items={ITEMS} />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Reviewed diffs')).toBeInTheDocument();
  });

  it('renders header and footer slots', () => {
    render(<NavRail items={ITEMS} header={<span>New</span>} footer={<span>v2</span>} />);
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('v2')).toBeInTheDocument();
  });

  it('paints in the code family when tone="code"', () => {
    render(<NavRail items={ITEMS} tone="code" data-testid="rail" />);
    expect(screen.getByTestId('rail').className).toContain('bg-code-panel');
  });

  it('width maps to a static class, never an inline style', () => {
    render(<NavRail items={ITEMS} width="wide" data-testid="rail" />);
    const rail = screen.getByTestId('rail');
    expect(rail.className).toContain('w-64');
    expect(rail.getAttribute('style')).toBeNull();
  });
});

describe('NavRailStack', () => {
  const global = { id: 'global', title: 'Platform', items: ITEMS };
  const section = {
    id: 'section',
    title: 'Health',
    items: [
      { to: '/operate/health/runs', label: 'Runs' },
      { to: '/operate/health/harness', label: 'Harness' },
    ],
  };
  const sub = {
    id: 'sub',
    title: 'Harness',
    items: [{ to: '/operate/health/harness/compare', label: 'Compare' }],
  };

  it('renders one rail per spec, in order', () => {
    render(
      <NavRailStack rails={[global, section, sub]}>
        <p>content</p>
      </NavRailStack>,
    );
    const navs = screen.getAllByRole('navigation');
    expect(navs.map((n) => n.getAttribute('aria-label'))).toEqual([
      'Platform',
      'Health',
      'Harness',
    ]);
  });

  it('renders content full-bleed when there are no rails', () => {
    render(
      <NavRailStack rails={[]}>
        <p>content</p>
      </NavRailStack>,
    );
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('shares activeHref across rails so each level lights independently', () => {
    render(
      <NavRailStack rails={[global, section, sub]} activeHref="/operate/health/harness">
        <p>content</p>
      </NavRailStack>,
    );
    expect(screen.getByRole('link', { name: /Health$/ })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Harness' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Runs' })).not.toHaveAttribute('aria-current');
  });

  it('a rail can override the shared activeHref, renderLink and tone', () => {
    render(
      <NavRailStack
        rails={[global, { ...section, tone: 'code', 'data-testid': 'section-rail' }]}
        tone="surface"
        activeHref="/build/work"
      >
        <p>content</p>
      </NavRailStack>,
    );
    expect(screen.getByTestId('section-rail').className).toContain('bg-code-panel');
  });

  it('gives each rail its own group-collapse key', () => {
    render(
      <NavRailStack
        rails={[global, { ...section, items: ITEMS, title: 'Second' }]}
        storageKey="stack-test"
      >
        <p>content</p>
      </NavRailStack>,
    );
    const [firstBuild, secondBuild] = screen.getAllByRole('button', { name: /Build/ });
    fireEvent.click(firstBuild);
    expect(firstBuild).toHaveAttribute('aria-expanded', 'false');
    expect(secondBuild).toHaveAttribute('aria-expanded', 'true');
  });

  it('size md: 14px rail labels, no rule under the title, a hairline between groups (2.389.2)', () => {
    const { container } = render(<NavRail title="Workspace" size="md" items={ITEMS} />);
    const label = screen.getByText('Health');
    expect(label.className).toContain('text-[14px]');
    const titleRow = screen.getByText('Workspace').parentElement!;
    expect(titleRow.className).not.toMatch(/(^| )border-b( |$)/);
    // Two groups → one hairline, above the second.
    expect(container.querySelectorAll('section > div.border-t')).toHaveLength(1);
  });

  it('a count badge uses the readable label tone, not the tertiary hint tone', () => {
    render(<NavRail title="Platform" items={ITEMS} />);
    const badge = screen.getByTestId('nav-rail-badge');
    expect(badge.className).toContain('text-text-secondary');
    expect(badge.className).not.toContain('text-text-tertiary');
  });
});

describe('NavRail audit markers (2.515.0, nav.rail-groups)', () => {
  const items = [
    { to: '/overview', label: 'Overview', group: 'WORKSPACE' },
    { to: '/episodes', label: 'Episodes', group: 'PRODUCTION' },
    { id: 'halt', onClick: () => {}, label: 'Halt', group: 'PRODUCTION' },
    { to: '/help', label: 'Help' },
  ];
  it('marks the nav, each group section by its label and each item by its label', () => {
    render(<NavRail title="Studio" items={items} storageKey="t.markers" />);
    const nav = screen.getByRole('navigation', { name: 'Studio' });
    expect(nav).toHaveAttribute('data-nav-rail', '');
    expect(nav).toHaveAttribute('data-rail-folded', 'false');
    const groups = Array.from(nav.querySelectorAll('section[data-rail-group]')).map((g) => g.getAttribute('data-rail-group'));
    expect(groups).toEqual(['WORKSPACE', 'PRODUCTION']);
    const production = nav.querySelector('section[data-rail-group="PRODUCTION"]')!;
    expect(Array.from(production.querySelectorAll('[data-rail-item]')).map((e) => e.getAttribute('data-rail-item'))).toEqual(['Episodes', 'Halt']);
    expect(screen.getByRole('link', { name: 'Help' })).toHaveAttribute('data-rail-item', 'Help');
    expect(production).not.toHaveAttribute('data-rail-group-collapsed');
    fireEvent.click(screen.getByRole('button', { name: 'PRODUCTION' }));
    expect(production).toHaveAttribute('data-rail-group-collapsed', '');
    expect(production.querySelectorAll('[data-rail-item]')).toHaveLength(0);
  });
  it('the folded strip keeps the item and group markers', () => {
    render(<NavRail title="Studio" items={items} collapsed />);
    const nav = screen.getByRole('navigation', { name: 'Studio' });
    expect(nav).toHaveAttribute('data-rail-folded', 'true');
    expect(Array.from(nav.querySelectorAll('[data-rail-item]')).map((e) => e.getAttribute('data-rail-item'))).toEqual(['Help', 'Overview', 'Episodes', 'Halt']);
    expect(nav.querySelector('[data-rail-group="PRODUCTION"]')?.querySelectorAll('[data-rail-item]')).toHaveLength(2);
  });

  // 2.515.7
  describe('defaultCollapsedGroups', () => {
    afterEach(() => window.localStorage.clear());

    it('starts the named groups folded, unless they hold the active item', () => {
      const { container } = render(<NavRail items={ITEMS} defaultCollapsedGroups={['Build', 'Operate']} activeHref="/operate/health" />);
      expect(container.querySelector('[data-rail-group="Build"]')).toHaveAttribute('data-rail-group-collapsed');
      expect(screen.getByRole('button', { name: 'Build' })).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByRole('link', { name: /Work/ })).toBeNull();
      expect(container.querySelector('[data-rail-group="Operate"]')).not.toHaveAttribute('data-rail-group-collapsed');
    });

    it('remembers a default-folded group being opened', () => {
      const { unmount } = render(<NavRail items={ITEMS} storageKey="t.rail" defaultCollapsedGroups={['Build']} />);
      fireEvent.click(screen.getByRole('button', { name: 'Build' }));
      expect(screen.getByRole('link', { name: /Work/ })).toBeInTheDocument();
      unmount();
      render(<NavRail items={ITEMS} storageKey="t.rail" defaultCollapsedGroups={['Build']} />);
      expect(screen.getByRole('link', { name: /Work/ })).toBeInTheDocument();
    });

    it('omitted: every group starts open', () => {
      const { container } = render(<NavRail items={ITEMS} />);
      expect(container.querySelector('[data-rail-group-collapsed]')).toBeNull();
    });
  });
});
