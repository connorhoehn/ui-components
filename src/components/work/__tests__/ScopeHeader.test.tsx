import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ScopeHeader, formatSpend, inlineRowDeficit, inlineRowWanted, inlineTrailMinimum } from '../ScopeHeader';
import { FilterChip } from '../../shared/FilterChip';
import { DropdownMenu } from '../../shared/DropdownMenu';
import { Inline } from '../../ui/Stack';
import { formatCompactAge } from '../compactAge';

afterEach(cleanup);

const people = [
  { id: 'nd', name: 'Nora DaSilva' },
  { id: 'lh', name: 'Layla Hassan' },
];

describe('ScopeHeader', () => {
  it('draws crumbs, title, status, stats, owners and tabs with counts', () => {
    const onTab = vi.fn();
    render(
      <ScopeHeader
        breadcrumbs={[{ label: 'Plan', onClick: () => {} }, { label: 'Initiatives', onClick: () => {} }, { label: 'Observability' }]}
        title="Observability Platform"
        status={{ label: 'In progress', tone: 'info' }}
        progress={{ done: 18, total: 52 }}
        spentUsd={1.46}
        people={[{ label: 'Owner', people }]}
        tabs={[{ id: 'work', label: 'Work' }, { id: 'decisions', label: 'Decisions', count: 2 }, { id: 'agents', label: 'Agents', count: 0 }]}
        activeTab="work"
        onTabChange={onTab}
      />,
    );
    expect(screen.getByTestId('scope-header-title').textContent).toBe('Observability Platform');
    expect(screen.getByTestId('scope-header-status').textContent).toContain('In progress');
    expect(screen.getByTestId('scope-header-progress').textContent).toBe('18 / 52 points delivered');
    expect(screen.getByTestId('scope-header-spent').textContent).toBe('$1.46 spent');
    expect(screen.getByTestId('scope-header-people-owner').textContent).toContain('Owner');
    expect(screen.getByLabelText('2 in Decisions')).toBeTruthy();
    // Zero is a fact and is shown.
    expect(screen.getByLabelText('0 in Agents')).toBeTruthy();
    fireEvent.click(screen.getByTestId('scope-header-tab-decisions'));
    expect(onTab).toHaveBeenCalledWith('decisions');
  });

  it('draws no placeholder for missing data', () => {
    render(
      <ScopeHeader
        title="Untracked scope"
        progress={{ done: 0, total: 0 }}
        spentUsd={null}
        people={[{ label: 'Owner', people: [] }]}
        stats={[null, false, undefined]}
      />,
    );
    expect(screen.queryByTestId('scope-header-stats')).toBeNull();
    expect(screen.queryByTestId('scope-header-progress')).toBeNull();
    expect(screen.queryByTestId('scope-header-spent')).toBeNull();
    expect(screen.queryByTestId('scope-header-people-owner')).toBeNull();
    expect(screen.queryByTestId('scope-header-status')).toBeNull();
    expect(screen.queryByTestId('scope-header-menu')).toBeNull();
    expect(screen.queryByRole('tablist')).toBeNull();
  });

  it('opens the ⋯ menu and renders an optional link', () => {
    const onRename = vi.fn();
    render(
      <ScopeHeader
        title="Scope"
        link={{ label: 'org/repo', href: 'https://example.com/org/repo' }}
        menu={[{ items: [{ label: 'Rename', onSelect: onRename }] }]}
      />,
    );
    expect(screen.getByTestId('scope-header-link').getAttribute('href')).toBe('https://example.com/org/repo');
    fireEvent.click(screen.getByTestId('scope-header-menu'));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Rename' }));
    expect(onRename).toHaveBeenCalled();
  });

  it('formats spend', () => {
    expect(formatSpend(1.46)).toBe('$1.46');
    expect(formatSpend(0.004)).toBe('<$0.01');
    expect(formatSpend(0)).toBe('$0.00');
    expect(formatSpend(1204.5)).toBe('$1,205');
  });
});

describe('formatCompactAge', () => {
  const now = Date.parse('2026-09-23T12:00:00Z');
  it('reads minutes, hours, days, weeks, then a date', () => {
    expect(formatCompactAge(now - 20_000, now)).toBe('now');
    expect(formatCompactAge(now - 6 * 60_000, now)).toBe('6m');
    expect(formatCompactAge(new Date(now - 6 * 3_600_000), now)).toBe('6h');
    expect(formatCompactAge(new Date(now - 26 * 3_600_000).toISOString(), now)).toBe('1d');
    expect(formatCompactAge(now - 15 * 86_400_000, now)).toBe('2w');
    expect(formatCompactAge('2026-03-02T12:00:00', now)).toBe('Mar 2');
    expect(formatCompactAge('2024-03-02T12:00:00', now)).toBe('Mar 2024');
  });
  it('is honest about bad input and clock skew', () => {
    expect(formatCompactAge(undefined, now)).toBeUndefined();
    expect(formatCompactAge('not a date', now)).toBeUndefined();
    expect(formatCompactAge(now + 60_000, now)).toBe('now');
  });

  it('draws a tab dot with an accessible name, beside or without a count', () => {
    render(
      <ScopeHeader
        title="Distillation"
        tabs={[
          { id: 'knowledge', label: 'Knowledge' },
          { id: 'review', label: 'Review', count: 7, dot: true },
          { id: 'activity', label: 'Activity', dot: 'warning' },
        ]}
      />,
    );
    expect(screen.queryByTestId('scope-header-tab-knowledge-dot')).toBeNull();
    const warn = screen.getByTestId('scope-header-tab-activity-dot');
    expect(warn.getAttribute('data-dot')).toBe('warning');
    expect(warn.className).toContain('bg-warning');
    expect(screen.getByRole('img', { name: 'Activity needs attention' })).toBe(warn);
    expect(screen.getByLabelText('7 in Review')).toBeTruthy();
    expect(screen.getByTestId('scope-header-tab-review-dot').className).toContain('bg-primary');
  });

  it('renders the controls slot before the link', () => {
    render(
      <ScopeHeader
        title="Distillation"
        controls={<button type="button">All repositories</button>}
        link={{ label: 'Open Library', href: '/library' }}
      />,
    );
    const controls = screen.getByTestId('scope-header-controls');
    expect(controls.textContent).toBe('All repositories');
    const link = screen.getByTestId('scope-header-link');
    expect(controls.compareDocumentPosition(link) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('draws no controls wrapper when none are given', () => {
    render(<ScopeHeader title="X" />);
    expect(screen.queryByTestId('scope-header-controls')).toBeNull();
  });
});

describe('ScopeHeader variant="crumbs" (2.389.0)', () => {
  it('draws crumbs and the right-hand group, no h1, title optional', () => {
    render(
      <ScopeHeader
        variant="crumbs"
        breadcrumbs={[{ label: 'Build', href: '#' }, { label: 'Distillation', href: '#' }, { label: 'Knowledge' }]}
        controls={<select aria-label="Repository"><option>All repositories</option></select>}
        link={{ label: 'Open Library', href: '#library' }}
        stats={['should not draw']}
        tabs={[{ id: 'a', label: 'Tab A' }]}
      />,
    );
    expect(screen.getByTestId('scope-header')).toHaveAttribute('data-variant', 'crumbs');
    expect(screen.queryByRole('heading', { level: 1 })).toBeNull();
    expect(screen.getByTestId('scope-header-crumbs')).toHaveTextContent('Knowledge');
    expect(screen.getByRole('combobox', { name: 'Repository' })).toBeInTheDocument();
    expect(screen.getByTestId('scope-header-link')).toHaveAttribute('href', '#library');
    expect(screen.queryByText('should not draw')).toBeNull();
    expect(screen.queryByRole('tablist')).toBeNull();
    // crumbs first, right group after
    const crumbs = screen.getByTestId('scope-header-crumbs');
    const right = screen.getByTestId('scope-header-right');
    expect(crumbs.compareDocumentPosition(right) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('hangs the controls at most 10px past the band — inside a record head\'s 12px top padding (2.389.4)', () => {
    render(<ScopeHeader variant="crumbs" breadcrumbs={[{ label: 'Knowledge' }]} controls={<select aria-label="Repository" />} />);
    const band = screen.getByTestId('scope-header');
    const right = screen.getByTestId('scope-header-right');
    // overhang = negative bottom margin − the band's bottom padding
    const mb = Number(/-mb-\[(\d+)px\]/.exec(right.className)?.[1]);
    const pb = band.className.includes('pb-1') ? 4 : NaN;
    expect(mb - pb).toBe(10);
    expect(right).toHaveAttribute('data-hang', '10');
  });

  it('default variant still draws the h1', () => {
    render(<ScopeHeader title="Distillation" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Distillation' })).toBeInTheDocument();
    expect(screen.getByTestId('scope-header')).not.toHaveAttribute('data-variant');
  });

  describe('variant="inline" (2.405.2)', () => {
    const TABS = [
      { id: 'results', label: 'Results', count: 25 },
      { id: 'answer', label: 'Answer' },
      { id: 'connections', label: 'Connections' },
    ];
    function renderInline(onTab = vi.fn()) {
      render(
        <ScopeHeader
          variant="inline"
          breadcrumbs={[{ label: 'Org' }, { label: 'Search', href: '/iq/search' }]}
          title="People & connections"
          description="should not draw"
          stats={['should not draw either']}
          people={[{ label: 'Owner', people }]}
          status={{ label: 'In progress' }}
          tabs={TABS}
          activeTab="connections"
          onTabChange={onTab}
          controls={<button type="button">Relevance ▾</button>}
        />,
      );
      return onTab;
    }

    it('lays crumbs, title, tabs and controls on one ≤48px row', () => {
      renderInline();
      const row = screen.getByTestId('scope-header');
      expect(row).toHaveAttribute('data-variant', 'inline');
      // One row: a no-wrap flex row, fixed at 48px (h-12), never a column.
      expect(row.className).toMatch(/\bflex\b/);
      expect(row.className).toMatch(/\bflex-nowrap\b/);
      expect(row.className).toMatch(/\bh-12\b/);
      expect(row.className).not.toMatch(/\bflex-col\b|\bflex-wrap\b/);
      // Every piece is a direct child of that row — they share its band.
      const trail = screen.getByTestId('scope-header-trail');
      const tabs = screen.getByTestId('scope-header-tabs');
      const right = screen.getByTestId('scope-header-right');
      expect([trail, tabs, right].map((el) => el.parentElement)).toEqual([row, row, row]);
      expect(trail).toContainElement(screen.getByTestId('scope-header-crumbs'));
      expect(trail).toContainElement(screen.getByTestId('scope-header-title'));
      // Order: trail, then tabs, then controls.
      expect(trail.compareDocumentPosition(tabs) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      expect(tabs.compareDocumentPosition(right) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it('draws the title as the emphasised last segment, marked as the current page', () => {
      renderInline();
      const title = screen.getByRole('heading', { level: 1, name: 'People & connections' });
      expect(title).toHaveAttribute('aria-current', 'page');
      expect(title.className).toMatch(/text-\[18px\]/);
      // The crumbs are all places to go; only the title is current.
      expect(screen.getByTestId('scope-header-crumbs').querySelector('[aria-current]')).toBeNull();
      expect(screen.getByRole('link', { name: 'Search' })).toHaveAttribute('href', '/iq/search');
    });

    it('caps the lg title at 20px', () => {
      render(<ScopeHeader variant="inline" titleSize="lg" title="Search" />);
      expect(screen.getByTestId('scope-header-title').className).toMatch(/text-\[20px\]/);
    });

    it('fires onTabChange and marks the active tab', () => {
      const onTab = renderInline();
      const active = screen.getByRole('tab', { name: 'Connections' });
      expect(active).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: /Results/ })).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByLabelText('25 in Results')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('scope-header-tab-answer'));
      expect(onTab).toHaveBeenCalledWith('answer');
    });

    it('renders the controls after the tabs', () => {
      renderInline();
      expect(screen.getByTestId('scope-header-controls')).toContainElement(screen.getByRole('button', { name: 'Relevance ▾' }));
    });

    it('does not draw description, stats, status or people', () => {
      renderInline();
      expect(screen.queryByText('should not draw')).toBeNull();
      expect(screen.queryByText('should not draw either')).toBeNull();
      expect(screen.queryByTestId('scope-header-status')).toBeNull();
      expect(screen.queryByTestId('scope-header-people-owner')).toBeNull();
      expect(screen.queryByTestId('scope-header-description')).toBeNull();
    });

    describe('long trail never wraps (2.406.4)', () => {
      const LONG = [
        { label: 'Org' },
        { label: 'Search', href: '/iq/search' },
        { label: 'Design System API', href: '/iq/search?scope=p-design-system-api' },
      ];
      function renderLong(width: number) {
        return render(
          <div style={{ width }}>
            <ScopeHeader
              variant="inline"
              breadcrumbs={LONG}
              title="component contracts"
              tabs={TABS}
              activeTab="results"
              controls={<>{['Type', 'Owner', 'Date', 'Status'].map((c) => <button key={c} type="button">{c}</button>)}<a href="#">Search entire workspace</a></>}
            />
          </div>,
        );
      }

      it.each([1200, 900])('keeps the %ipx row at 48px: trail min-w-0, crumbs truncate and capped, controls shrink ahead of the trail', (width) => {
        const { unmount } = renderLong(width);
        const row = screen.getByTestId('scope-header');
        expect(row.className).toMatch(/\bh-12\b/);
        expect(row.className).toMatch(/\bflex-nowrap\b/);
        const trail = screen.getByTestId('scope-header-trail');
        expect(trail.className).toMatch(/\bmin-w-0\b/);
        expect(trail.className).toMatch(/\boverflow-hidden\b/);
        // 2.407.15: the title gives up width before the crumbs (the reverse
        // of 2.406.4), so a long title truncates while the crumbs stay whole.
        expect(screen.getByTestId('scope-header-crumbs').className).not.toMatch(/shrink-\[100\]/);
        expect(screen.getByTestId('scope-header-title').className).toMatch(/\bflex-1\b/);
        const crumbs = screen.getAllByTestId('scope-header-crumb');
        expect(crumbs).toHaveLength(3);
        crumbs.forEach((c, i) => {
          expect(c.className).toMatch(/\btruncate\b/);
          expect(c.className).toMatch(/\bwhitespace-nowrap\b/);
          expect(c.className).toMatch(i === crumbs.length - 1 ? /max-w-\[15rem\]/ : /max-w-\[10rem\]/);
          expect(c).toHaveAttribute('title', LONG[i]!.label);
        });
        // Nothing in the trail may wrap.
        expect(trail.querySelector('.flex-wrap, .whitespace-normal, .break-words, .whitespace-pre-line')).toBeNull();
        expect(trail.querySelector('ol')!.className).toMatch(/\bflex-nowrap\b/);
        expect(screen.getByTestId('scope-header-title').className).toMatch(/\btruncate\b/);
        expect(screen.getByTestId('scope-header-tabs').className).toMatch(/\bshrink-0\b/);
        // 2.407.2: the right cluster gives first (shrink-[100] against the
        // trail's 1); only the controls inside it shrink, clipping.
        const right = screen.getByTestId('scope-header-right');
        expect(right.className).toMatch(/shrink-\[100\]/);
        expect(right.className).toMatch(/\bmin-w-0\b/);
        // 2.407.15: basis 0 — the trail takes the free space and its content never pushes the right cluster.
        expect(trail.className).toMatch(/\bflex-1\b/);
        const controls = screen.getByTestId('scope-header-controls');
        expect(controls.className).toMatch(/\bmin-w-0\b/);
        expect(controls.className).toMatch(/\boverflow-hidden\b/);
        // 2.407.4: nothing in the cluster shrinks or wraps — it overflows instead.
        expect(controls.className).toMatch(/\bflex-nowrap\b/);
        expect(controls.className).toMatch(/\bwhitespace-nowrap\b/);
        expect(controls.className).toMatch(/\[&_\*\]:whitespace-nowrap/);
        expect(controls.className).toMatch(/\[&>\*\]:shrink-0/);
        expect(controls.className).toMatch(/\[&>\*>\*\]:shrink-0/);
        expect(controls.className).not.toMatch(/\[&>\*\]:shrink\b(?!-)/);
        unmount();
      });

      it('collapses the middle crumbs to "…" (first and last kept) when a crumb is squeezed below its cap', () => {
        // jsdom has no layout: report every crumb as squeezed (natural 200px, given 40px).
        const sw = vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockImplementation(function (this: HTMLElement) {
          return this.hasAttribute('data-crumb') ? 200 : 0;
        });
        const cw = vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function (this: HTMLElement) {
          if (this.hasAttribute('data-crumb')) return 40;
          return this.getAttribute('data-testid') === 'scope-header-trail' ? 300 : 0;
        });
        try {
          renderLong(900);
          const nav = screen.getByTestId('scope-header-crumbs');
          expect(nav).toHaveAttribute('data-collapsed', 'true');
          expect(screen.getAllByTestId('scope-header-crumb').map((c) => c.textContent)).toEqual(['Org', 'Design System API']);
          expect(screen.getByTestId('scope-header-crumbs-more')).toHaveAttribute('title', 'Search');
          // The title keeps its place after the crumbs.
          expect(screen.getByRole('heading', { level: 1, name: 'component contracts' })).toBeInTheDocument();
        } finally {
          sw.mockRestore();
          cw.mockRestore();
        }
      });

      describe('squeeze order: controls, then crumbs, then never the title below 12rem (2.407.2)', () => {
        // The portal's scoped search header: Org › Search › Design System API ›
        // component contracts, three tabs, four chips.
        const CHIPS = ['In: Design System API ×', 'Type: Work ×', '+ Filter', 'Relevance ▾'];
        const NATURAL: Record<string, number> = { Org: 24, Search: 45, 'Design System API': 122 };
        /**
         * jsdom has no layout: report the widths a browser measured at this
         * viewport. `before` is the row with the chips in it, `after` once they
         * have left it (the row's data-controls="collapsed").
         */
        function mockWidths(w: { row: number; before: { trail: number; controls: number; controlsContent: number; crumb?: Record<string, number> }; after: { trail: number } }) {
          const collapsed = () => document.querySelector('[data-testid="scope-header"]')?.getAttribute('data-controls') === 'collapsed';
          const sw = vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockImplementation(function (this: HTMLElement) {
            if (this.hasAttribute('data-crumb')) return NATURAL[this.textContent ?? ''] ?? 0;
            if (this.tagName === 'H1') return 180;
            if (this.hasAttribute('data-scope-controls')) return w.before.controlsContent;
            return 0;
          });
          const cw = vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function (this: HTMLElement) {
            if (this.hasAttribute('data-crumb')) return w.before.crumb?.[this.textContent ?? ''] ?? NATURAL[this.textContent ?? ''] ?? 0;
            if (this.hasAttribute('data-scope-controls')) return w.before.controls;
            const id = this.getAttribute('data-testid');
            if (id === 'scope-header') return w.row;
            if (id === 'scope-header-trail') return collapsed() ? w.after.trail : w.before.trail;
            return 0;
          });
          return () => { sw.mockRestore(); cw.mockRestore(); };
        }
        function renderScoped(extra: Partial<ComponentProps<typeof ScopeHeader>> = {}, onChip = vi.fn()) {
          render(
            <ScopeHeader
              variant="inline"
              breadcrumbs={LONG}
              title="component contracts"
              tabs={TABS}
              activeTab="results"
              controls={<>{CHIPS.map((c) => <button key={c} type="button" onClick={() => onChip(c)}>{c}</button>)}</>}
              menu={[{ items: [{ label: 'Save search', onSelect: () => {} }] }]}
              {...extra}
            />,
          );
          return onChip;
        }
        const expectTitleFloor = () => {
          const title = screen.getByRole('heading', { level: 1, name: 'component contracts' });
          // 2.407.15: the 12rem floor is back, and the title gives up width
          // first (flex-1: basis 0) so it truncates before a crumb is squeezed.
          expect(title.className).toMatch(/min-w-\[12rem\]/);
          expect(title.className).toMatch(/\bflex-1\b/);
          expect(title.className).not.toMatch(/max-w-\[50%\]/);
          expect(title.className).toMatch(/\btruncate\b/);
        };
        const expectTabsWhole = () => {
          expect(screen.getByTestId('scope-header-tabs').className).toMatch(/\bshrink-0\b/);
          ['Results', 'Answer', 'Connections'].forEach((t) => expect(screen.getByRole('tab', { name: new RegExp(t) })).toBeInTheDocument());
        };

        it('1536px: the chips leave the row first; all three crumbs and the whole title stay', () => {
          // 1024px row: tabs 272 + chips 330 (in a 250px box) + ⋯ leave the
          // trail 330px, under its 328px-plus minimum once the chips overflow.
          const restore = mockWidths({ row: 1024, before: { trail: 330, controls: 250, controlsContent: 330 }, after: { trail: 580 } });
          try {
            renderScoped();
            const row = screen.getByTestId('scope-header');
            expect(row).toHaveAttribute('data-controls', 'collapsed');
            expect(screen.queryByTestId('scope-header-controls')).toBeNull();
            expect(screen.getByTestId('scope-header-controls-toggle')).toHaveTextContent('Filters');
            // The crumbs did not give: first and last readable, none folded.
            expect(screen.getByTestId('scope-header-crumbs')).not.toHaveAttribute('data-collapsed');
            expect(screen.getAllByTestId('scope-header-crumb').map((c) => c.textContent)).toEqual(['Org', 'Search', 'Design System API']);
            expect(screen.getAllByTestId('scope-header-crumb')[0]!.closest('li')!.className).toMatch(/\bshrink-0\b/);
            expectTitleFloor();
            // What is left for the trail covers its minimum (title at 12rem included).
            const trail = screen.getByTestId('scope-header-trail');
            expect(inlineTrailMinimum(trail)).toBeGreaterThanOrEqual(192);
            expect(inlineTrailMinimum(trail)).toBeLessThanOrEqual(trail.clientWidth);
            expectTabsWhole();
          } finally {
            restore();
          }
        });

        it('1280px: the chips are in the Filters popover (same callbacks), the crumbs fold to Org › … › Design System API, the title keeps 12rem', () => {
          const restore = mockWidths({
            row: 768,
            before: { trail: 200, controls: 150, controlsContent: 330, crumb: { Org: 24, Search: 10, 'Design System API': 60 } },
            after: { trail: 336 },
          });
          try {
            const onChip = renderScoped();
            expect(screen.getByTestId('scope-header')).toHaveAttribute('data-controls', 'collapsed');
            expect(screen.queryByRole('button', { name: 'Relevance ▾' })).toBeNull();
            expect(screen.getByTestId('scope-header-crumbs')).toHaveAttribute('data-collapsed', 'true');
            expect(screen.getAllByTestId('scope-header-crumb').map((c) => c.textContent)).toEqual(['Org', 'Design System API']);
            expectTitleFloor();
            const trail = screen.getByTestId('scope-header-trail');
            expect(inlineTrailMinimum(trail)).toBeLessThanOrEqual(trail.clientWidth);
            expectTabsWhole();
            // The chips, unchanged, behind one button.
            const toggle = screen.getByTestId('scope-header-controls-toggle');
            expect(toggle).toHaveAttribute('aria-expanded', 'false');
            fireEvent.click(toggle);
            const popover = screen.getByTestId('scope-header-controls-popover');
            CHIPS.forEach((c) => expect(popover).toContainElement(screen.getByRole('button', { name: c })));
            fireEvent.click(screen.getByRole('button', { name: 'Relevance ▾' }));
            expect(onChip).toHaveBeenCalledWith('Relevance ▾');
          } finally {
            restore();
          }
        });

        describe('the chips wrapped instead of overflowing (2.407.4)', () => {
          // The portal's scoped fixture: one Inline of a FilterChip and two
          // DropdownMenu triggers, and a ⋯ with Save search.
          function renderPortal() {
            const onClear = vi.fn();
            render(
              <ScopeHeader
                variant="inline"
                breadcrumbs={LONG}
                title="component contracts"
                tabs={TABS}
                activeTab="results"
                controls={
                  <Inline gap="xs" align="center" wrap={false} data-testid="search-chips">
                    <FilterChip active size="sm" aria-label="In: Design System API. Search entire workspace" onClick={onClear}>In: Design System API ×</FilterChip>
                    <DropdownMenu align="end" triggerLabel="Add a filter" trigger={<span>+ Filter</span>} sections={[{ items: [{ label: 'Any type', onSelect: () => {} }] }]} />
                    <DropdownMenu align="end" triggerLabel="Sort results" triggerTestId="search-sort" trigger={<span>Relevance ▾</span>} sections={[{ items: [{ label: 'Recent', onSelect: () => {} }] }]} />
                  </Inline>
                }
                menuLabel="Search actions"
                menu={[{ items: [{ label: 'Save search', onSelect: () => {} }] }]}
              />,
            );
            return onClear;
          }
          /**
           * What Chromium measured on the portal's scoped search (the journey
           * log): row = viewport − 464px of rail, tabs 280, ⋯ 32. `wrapped`:
           * the controls box reports no overflow (its chips wrapped inside it),
           * the only signal is the crumbs cut by a sub-pixel.
           */
          /** The crumb list at its natural width: Org 24 + Search 45 + Design System API 122 + the "›"s. */
          const NAV_W = 219;
          function mockPortal(w: { row: number; trail: number; box: number; boxContent: number; crumbGiven: Record<string, number>; afterTrail: number }) {
            const collapsed = () => document.querySelector('[data-testid="scope-header"]')?.getAttribute('data-controls') === 'collapsed';
            const sw = vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockImplementation(function (this: HTMLElement) {
              if (this.hasAttribute('data-crumb')) return NATURAL[this.textContent ?? ''] ?? 0;
              if (this.tagName === 'H1') return 180;
              if (this.hasAttribute('data-scope-controls')) return w.boxContent;
              return 0;
            });
            const cw = vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function (this: HTMLElement) {
              if (this.hasAttribute('data-crumb')) return collapsed() ? NATURAL[this.textContent ?? ''] ?? 0 : Math.round(w.crumbGiven[this.textContent ?? ''] ?? NATURAL[this.textContent ?? ''] ?? 0);
              if (this.tagName === 'H1') return 192;
              if (this.hasAttribute('data-scope-controls')) return w.box;
              const id = this.getAttribute('data-testid');
              if (id === 'scope-header') return w.row;
              if (id === 'scope-header-trail') return collapsed() ? w.afterTrail : w.trail;
              return 0;
            });
            const ow = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (this: HTMLElement) {
              const id = this.getAttribute('data-testid');
              if (id === 'scope-header-tabs') return 280;
              if (id === 'scope-header-crumbs') return NAV_W;
              if (this.tagName === 'SPAN' && this.parentElement?.getAttribute('data-testid') === 'scope-header-trail') return 14;
              if (this.getAttribute('aria-label') === 'Search actions') return 32;
              return 0;
            });
            const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
              const width = this.hasAttribute('data-crumb') && !collapsed() ? w.crumbGiven[this.textContent ?? ''] ?? NATURAL[this.textContent ?? ''] ?? 0 : 0;
              return { width, height: 0, x: 0, y: 0, top: 0, left: 0, right: width, bottom: 0, toJSON: () => ({}) } as DOMRect;
            });
            return () => { sw.mockRestore(); cw.mockRestore(); ow.mockRestore(); rect.mockRestore(); };
          }
          const expectReadable = () => {
            const row = screen.getByTestId('scope-header');
            expect(row).toHaveAttribute('data-controls', 'collapsed');
            expect(screen.queryByTestId('scope-header-controls')).toBeNull();
            expect(screen.getByTestId('scope-header-controls-toggle')).toHaveTextContent('Filters');
            // Crumbs: first and last whole (every crumb given its natural width).
            const crumbs = screen.getAllByTestId('scope-header-crumb');
            expect(crumbs[0]).toHaveTextContent('Org');
            expect(crumbs[crumbs.length - 1]).toHaveTextContent('Design System API');
            crumbs.forEach((c) => expect(c.clientWidth).toBeGreaterThanOrEqual(NATURAL[c.textContent ?? '']!));
            // The title keeps 12rem.
            const title = screen.getByRole('heading', { level: 1, name: 'component contracts' });
            expect(title.className).toMatch(/min-w-\[12rem\]/);
            expect(title.clientWidth).toBeGreaterThanOrEqual(192);
            // Collapsed, the right cluster no longer shrinks: ⋯ stays inside the padding.
            expect(screen.getByTestId('scope-header-right').className).toMatch(/\bshrink-0\b/);
            expect(screen.getByTestId('scope-header-right').className).not.toMatch(/shrink-\[100\]/);
            expect(screen.getByTestId('scope-header-right')).toContainElement(screen.getByTestId('scope-header-menu'));
          };

          it('1536px: crumbs cut by a sub-pixel alone are noise (2.407.6); the row\'s wanted width over the row collapses', () => {
            // Search 44.6 of 45, Design System API 121.4 of 122: a 1px
            // shortfall, under the 2px margin. Row 1072 holds the wanted
            // 220 + 14 + 192 + 280 + 251 + 32 = 989, so it stays inline — 2.407.4
            // collapsed on this alone, and the portal's 1.25px of it re-collapsed
            // every re-expand (2.407.5 → 2.407.6).
            const cut = { Org: 24, Search: 44.6, 'Design System API': 121.4 };
            let restore = mockPortal({ row: 1072, trail: 424, box: 251, boxContent: 251, crumbGiven: cut, afterTrail: 640 });
            try {
              renderPortal();
              expect(screen.getByTestId('scope-header')).toHaveAttribute('data-controls', 'inline');
            } finally {
              restore();
              cleanup();
            }
            // Row 980 (1536 less the rail, gaps and padding jsdom does not draw): 9px short → collapsed.
            restore = mockPortal({ row: 980, trail: 424, box: 251, boxContent: 251, crumbGiven: cut, afterTrail: 640 });
            try {
              renderPortal();
              expectReadable();
            } finally {
              restore();
            }
          });

          it('1600px: the nowrap chips overflow their box (321 in 280) → the controls collapse', () => {
            const restore = mockPortal({ row: 1136, trail: 440, box: 280, boxContent: 321, crumbGiven: {}, afterTrail: 700 });
            try {
              renderPortal();
              expectReadable();
            } finally {
              restore();
            }
          });

          it('the row content at its wanted width is measured against the row (inlineRowDeficit)', () => {
            // Nothing overflows its own box and no crumb is cut, but the trail's
            // content (219 + 14 + 192) + tabs 280 + the chips' natural 230 + ⋯ 32
            // = 967 exceed the 900 row. (2.407.6: the trail counts by its
            // content, not its box — the box carries the row's slack.)
            const restore = mockPortal({ row: 900, trail: 420, box: 200, boxContent: 200, crumbGiven: {}, afterTrail: 560 });
            const ow = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (this: HTMLElement) {
              if (this.getAttribute('data-testid') === 'scope-header-tabs') return 280;
              if (this.getAttribute('data-testid') === 'scope-header-crumbs') return NAV_W;
              if (this.tagName === 'SPAN' && this.parentElement?.getAttribute('data-testid') === 'scope-header-trail') return 14;
              if (this.getAttribute('data-testid') === 'scope-header-controls') return 230;
              if (this.getAttribute('aria-label') === 'Search actions') return 32;
              return 0;
            });
            try {
              renderPortal();
              expect(screen.getByTestId('scope-header')).toHaveAttribute('data-controls', 'collapsed');
              const row = screen.getByTestId('scope-header');
              // Collapsed: the trail's 425 + 280 + ⋯ fit the 900 row.
              expect(inlineRowDeficit(row, screen.getByTestId('scope-header-trail'))).toBeLessThanOrEqual(0);
            } finally {
              ow.mockRestore();
              restore();
            }
          });

          it('1280px: the Filters popover is a vertical Stack of one-line, full-width rows at least 16rem wide', () => {
            const restore = mockPortal({ row: 816, trail: 300, box: 120, boxContent: 321, crumbGiven: { Search: 10, 'Design System API': 60 }, afterTrail: 390 });
            try {
              const onClear = renderPortal();
              fireEvent.click(screen.getByTestId('scope-header-controls-toggle'));
              const stack = screen.getByTestId('scope-header-controls-stack');
              expect(screen.getByTestId('scope-header-controls-popover')).toContainElement(stack);
              expect(stack.className).toMatch(/\bflex-col\b/);
              expect(stack.className).toMatch(/\bitems-stretch\b/);
              expect(stack.className).toMatch(/min-w-\[16rem\]/);
              expect(stack.className).toMatch(/\bwhitespace-nowrap\b/);
              expect(stack.className).toMatch(/\[&_\*\]:whitespace-nowrap/);
              // The host's one Inline wrapper is flattened so each control is a row.
              expect(stack.className).toMatch(/\[&>div:only-child:has\(>\*\+\*\)\]:contents/);
              expect(stack).toContainElement(screen.getByTestId('search-chips'));
              ['In: Design System API. Search entire workspace', 'Add a filter', 'Sort results'].forEach((name) =>
                expect(stack).toContainElement(screen.getByRole('button', { name })));
              fireEvent.click(screen.getByRole('button', { name: 'In: Design System API. Search entire workspace' }));
              expect(onClear).toHaveBeenCalledTimes(1);
              // The last crumb's cap leaves room for "Design System API" and its ellipsis.
              const crumbs = screen.getAllByTestId('scope-header-crumb');
              expect(crumbs[crumbs.length - 1]!.className).toMatch(/max-w-\[15rem\]/);
            } finally {
              restore();
            }
          });
          describe('inline whenever the wanted width fits, both ways, on load and on every resize (2.407.5)', () => {
            // The portal's scoped header as the 1672 walk measured it: crumbs
            // 219 (Org 24 / Search 45 / Design System API 122) + "›" 14 + the
            // title's 192 = trail 425, tabs 280, chips 321, ⋯ 32, Filters ▾ 58.
            // jsdom draws no gaps or padding, so the mocked row is the portal's
            // row less them (viewport − 464 rail − 48 padding − 44 gaps): the
            // wanted width is 1058 here, 1102 + 48 in the browser, and the
            // header is inline from a 1614px viewport (+2px to come back).
            const TRAIL = 425;
            const TABS_W = 280;
            const CHIPS_W = 321;
            const MORE_W = 32;
            const TOGGLE_W = 58;
            const rowAt = (viewport: number) => viewport - 556;
            let row = 0;
            // Extra width the chips report (a first-frame transient, or a real overflow).
            let noise = 0;
            let observers: Array<() => void> = [];
            const RO = globalThis.ResizeObserver;
            function install(viewport: number) {
              row = rowAt(viewport);
              noise = 0;
              observers = [];
              (globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = class {
                cb: () => void;
                constructor(cb: () => void) { this.cb = cb; }
                observe() { observers.push(this.cb); }
                unobserve() {}
                disconnect() { observers = observers.filter((o) => o !== this.cb); }
              };
              const collapsed = () => document.querySelector('[data-testid="scope-header"]')?.getAttribute('data-controls') === 'collapsed';
              // Inline, the chips' box shrinks first (shrink-[100]); the trail
              // only once the box is gone.
              const layout = () => {
                if (collapsed()) return { trail: row - TABS_W - TOGGLE_W - MORE_W, box: 0, cut: 0 };
                const free = row - TABS_W - MORE_W;
                const box = Math.min(CHIPS_W + noise, Math.max(0, free - TRAIL));
                const trail = free - box;
                // The last crumb gives first, down to 0px (never negative).
                return { trail, box, cut: Math.min(NATURAL['Design System API']!, Math.max(0, TRAIL - trail)) };
              };
              const isMore = (el: HTMLElement) => el.getAttribute('aria-label') === 'Search actions'
                || (el.parentElement?.getAttribute('data-testid') === 'scope-header-right' && !!el.querySelector('[aria-label="Search actions"]'));
              const spies = [
                vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockImplementation(function (this: HTMLElement) {
                  if (this.hasAttribute('data-crumb')) return NATURAL[this.textContent ?? ''] ?? 0;
                  if (this.tagName === 'H1') return 180;
                  if (this.hasAttribute('data-scope-controls')) return CHIPS_W + noise;
                  return 0;
                }),
                vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function (this: HTMLElement) {
                  const l = layout();
                  if (this.hasAttribute('data-crumb')) {
                    const natural = NATURAL[this.textContent ?? ''] ?? 0;
                    return this.textContent === 'Design System API' ? natural - l.cut : natural;
                  }
                  if (this.tagName === 'H1') return 192;
                  if (this.hasAttribute('data-scope-controls')) return l.box;
                  const id = this.getAttribute('data-testid');
                  if (id === 'scope-header') return row;
                  if (id === 'scope-header-trail') return l.trail;
                  return 0;
                }),
                vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (this: HTMLElement) {
                  const id = this.getAttribute('data-testid');
                  if (id === 'scope-header-tabs') return TABS_W;
                  if (id === 'scope-header-crumbs') return 219 - layout().cut;
                  if (this.hasAttribute('data-scope-controls-toggle')) return TOGGLE_W;
                  if (this.hasAttribute('data-scope-controls')) return layout().box;
                  if (this.parentElement?.hasAttribute('data-scope-controls-ghost')) return CHIPS_W;
                  if (this.tagName === 'SPAN' && this.parentElement?.getAttribute('data-testid') === 'scope-header-trail') return 14;
                  if (isMore(this)) return MORE_W;
                  return 0;
                }),
              ];
              return () => {
                spies.forEach((s) => s.mockRestore());
                (globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = RO;
              };
            }
            const resize = (viewport: number) => {
              row = rowAt(viewport);
              act(() => { observers.slice().forEach((cb) => cb()); });
            };
            const mode = () => screen.getByTestId('scope-header').getAttribute('data-controls');

            it('1672 inline → 1500 collapsed → 1672 inline → 1500 collapsed → 1672 inline', () => {
              const restore = install(1672);
              try {
                renderPortal();
                expect(mode()).toBe('inline');
                expect(screen.getByTestId('scope-header-controls')).toBeInTheDocument();
                resize(1500);
                expect(mode()).toBe('collapsed');
                expect(screen.getByTestId('scope-header-controls-toggle')).toBeInTheDocument();
                resize(1672);
                expect(mode()).toBe('inline');
                expect(screen.getByRole('button', { name: 'Sort results' })).toBeInTheDocument();
                resize(1500);
                expect(mode()).toBe('collapsed');
                resize(1672);
                expect(mode()).toBe('inline');
                // Nothing left over: one copy of the chips, no measuring copy.
                expect(screen.getAllByRole('button', { name: 'Sort results' })).toHaveLength(1);
                expect(document.querySelector('[data-scope-controls-ghost]')).toBeNull();
              } finally {
                restore();
              }
            });

            it('down to 1280 (the crumbs fold) and back up through 1440 / 1536 / 1600 to 1672 comes back inline', () => {
              const restore = install(1672);
              try {
                renderPortal();
                [1600, 1536, 1440, 1280].forEach((w) => { resize(w); expect(mode()).toBe('collapsed'); });
                [1440, 1536, 1600].forEach((w) => { resize(w); expect(mode()).toBe('collapsed'); });
                resize(1672);
                expect(mode()).toBe('inline');
              } finally {
                restore();
              }
            });

            it('a collapse at a width that squeezes the trail under its minimum does not raise the way back (1672 → 1000 → 1672)', () => {
              // Before 2.407.5 the expand threshold added the trail's shortfall
              // below its minimum to the row's deficit (which already counts it)
              // and was never re-derived: from 1000 it asked for ~1350px of row.
              const restore = install(1672);
              try {
                renderPortal();
                resize(1000);
                expect(mode()).toBe('collapsed');
                resize(1672);
                expect(mode()).toBe('inline');
              } finally {
                restore();
              }
            });

            it('fresh loads: 1600 and 1536 collapse (wanted 1058 > the row), 1620 is inline (1058 + 2 ≤ 1064), 1500 collapses', () => {
              const cases: Array<[number, string]> = [[1600, 'collapsed'], [1536, 'collapsed'], [1620, 'inline'], [1672, 'inline'], [1500, 'collapsed']];
              for (const [viewport, expected] of cases) {
                const restore = install(viewport);
                try {
                  renderPortal();
                  expect([viewport, mode()]).toEqual([viewport, expected]);
                  // The wanted width is the parts' natural widths, each once:
                  // trail content 425 (not its slack), tabs, chips, ⋯ — no Filters ▾.
                  const header = screen.getByTestId('scope-header');
                  expect(inlineRowWanted(header, screen.getByTestId('scope-header-trail'), CHIPS_W)).toBe(TRAIL + TABS_W + CHIPS_W + MORE_W);
                } finally {
                  restore();
                  cleanup();
                }
              }
            });

            it('never alternates: collapsed below wanted + 2, inline at it, one state per width', () => {
              const restore = install(1672);
              try {
                renderPortal();
                resize(1500);
                resize(1615); // row 1059 < 1058 + 2
                expect(mode()).toBe('collapsed');
                resize(1615);
                expect(mode()).toBe('collapsed');
                resize(1616); // row 1060
                expect(mode()).toBe('inline');
                resize(1616);
                expect(mode()).toBe('inline');
              } finally {
                restore();
              }
            });

            it('a first render at 1280 that later grows to 1672 expands', () => {
              const restore = install(1280);
              try {
                renderPortal();
                expect(mode()).toBe('collapsed');
                resize(1672);
                expect(mode()).toBe('inline');
              } finally {
                restore();
              }
            });

            describe('re-expanding does not undo itself (2.407.6)', () => {
              // The portal's 1672 → 1500 → 1672 walk on 2.407.5: the header went
              // inline, its first inline frame read a 1.25px overflow on a row the
              // parts fit with 45px to spare, it re-collapsed in the same frame
              // and recorded the collapse at the current width, so every further
              // widening repeated the flip. Frames are driven by hand here.
              let frames: FrameRequestCallback[] = [];
              function fakeFrames() {
                frames = [];
                const raf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => { frames.push(cb); return frames.length; });
                const caf = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
                return () => { raf.mockRestore(); caf.mockRestore(); };
              }
              /** Run the next animation frame; `settle` is the chips' extra width from then on. */
              const nextFrame = (settle = 0) => {
                noise = settle;
                const due = frames;
                frames = [];
                act(() => { due.forEach((cb) => cb(0)); });
              };
              // At 1672 the row is 1116 and the parts want 1058: 58px to spare.
              const OVER_1_25 = 58 + 1.25;
              const OVER_5 = 58 + 5;

              it('1672 inline → 1500 collapsed → 1672 with a 1.25px first-frame overflow stays inline', () => {
                const restore = install(1672);
                const restoreFrames = fakeFrames();
                try {
                  renderPortal();
                  expect(mode()).toBe('inline');
                  resize(1500);
                  expect(mode()).toBe('collapsed');
                  noise = OVER_1_25;
                  resize(1672);
                  expect(mode()).toBe('inline');
                  // The settled frame still reads 1.25px over: under the 2px margin, noise.
                  nextFrame(OVER_1_25);
                  expect(mode()).toBe('inline');
                  expect(screen.getByRole('button', { name: 'Sort results' })).toBeInTheDocument();
                  // …and it recorded no collapse at 1672: the next measure there stays put too.
                  resize(1672);
                  expect(mode()).toBe('inline');
                } finally {
                  restoreFrames();
                  restore();
                }
              });

              it('a first frame 5px over that settles on the next frame is not judged: stays inline', () => {
                const restore = install(1672);
                const restoreFrames = fakeFrames();
                try {
                  renderPortal();
                  resize(1500);
                  expect(mode()).toBe('collapsed');
                  noise = OVER_5;
                  resize(1672);
                  expect(mode()).toBe('inline');
                  expect(frames).toHaveLength(1);
                  nextFrame(0);
                  expect(mode()).toBe('inline');
                } finally {
                  restoreFrames();
                  restore();
                }
              });

              it('1672 → 1500 → 1672 → 1800 → 2000: inline at every width on the way back up', () => {
                const restore = install(1672);
                const restoreFrames = fakeFrames();
                try {
                  renderPortal();
                  resize(1500);
                  expect(mode()).toBe('collapsed');
                  [1672, 1800, 2000].forEach((w) => {
                    noise = OVER_1_25;
                    resize(w);
                    nextFrame(0);
                    expect([w, mode()]).toEqual([w, 'inline']);
                  });
                } finally {
                  restoreFrames();
                  restore();
                }
              });

              it('a genuine 5px overflow at 1672 still collapses — on a fresh load, and on the settled frame after a re-expand', () => {
                let restore = install(1672);
                noise = OVER_5;
                try {
                  renderPortal();
                  expect(mode()).toBe('collapsed');
                } finally {
                  restore();
                  cleanup();
                }
                restore = install(1672);
                const restoreFrames = fakeFrames();
                try {
                  renderPortal();
                  resize(1500);
                  // The collapsed row still remembers the chips at 321: it re-expands at 1672…
                  noise = OVER_5;
                  resize(1672);
                  expect(mode()).toBe('inline');
                  // …and the settled frame, 5px over, collapses and stays so at that width.
                  nextFrame(OVER_5);
                  expect(mode()).toBe('collapsed');
                  resize(1672);
                  expect(mode()).toBe('collapsed');
                } finally {
                  restoreFrames();
                  restore();
                }
              });
            });

            it('first render already collapsed by controlsCollapseAt: a hidden copy gives the chips’ width, and growing to 1672 expands', () => {
              const restore = install(1280);
              try {
                cleanup();
                render(
                  <ScopeHeader
                    variant="inline"
                    breadcrumbs={LONG}
                    title="component contracts"
                    tabs={TABS}
                    activeTab="results"
                    controlsCollapseAt={1000}
                    controls={<Inline gap="xs" align="center" wrap={false}><button type="button">Sort</button></Inline>}
                    menuLabel="Search actions"
                    menu={[{ items: [{ label: 'Save search', onSelect: () => {} }] }]}
                  />,
                );
                expect(mode()).toBe('collapsed');
                resize(1500); // above the floor (row 944), but the chips need 1058
                expect(mode()).toBe('collapsed');
                // The measuring copy was drawn once and is gone.
                expect(document.querySelector('[data-scope-controls-ghost]')).toBeNull();
                // …and left no second, focusable set of the chips behind (they are in the closed popover).
                expect(screen.queryAllByRole('button', { name: 'Sort' })).toHaveLength(0);
                resize(1672);
                expect(mode()).toBe('inline');
              } finally {
                restore();
              }
            });
          });
        });

        it('with controlsMenu, collapsed controls become a "Filters" section of the ⋯ menu with the same onSelect', () => {
          const onRecent = vi.fn();
          const restore = mockWidths({ row: 1024, before: { trail: 600, controls: 330, controlsContent: 330 }, after: { trail: 700 } });
          try {
            renderScoped({
              controlsCollapseAt: 1100,
              controlsMenu: [{ items: [{ label: 'Relevance', active: true, onSelect: () => {} }, { label: 'Recent', onSelect: onRecent }] }],
            });
            expect(screen.queryByTestId('scope-header-controls')).toBeNull();
            expect(screen.queryByTestId('scope-header-controls-toggle')).toBeNull();
            fireEvent.click(screen.getByTestId('scope-header-menu'));
            expect(screen.getByText('Filters')).toBeInTheDocument();
            expect(screen.getByRole('menuitem', { name: /Save search/ })).toBeInTheDocument();
            fireEvent.click(screen.getByRole('menuitem', { name: /Recent/ }));
            expect(onRecent).toHaveBeenCalledTimes(1);
          } finally {
            restore();
          }
        });

        it('keeps the controls in the row when they fit (row at or above controlsCollapseAt, or nothing overflowing)', () => {
          const restore = mockWidths({ row: 1200, before: { trail: 600, controls: 330, controlsContent: 330 }, after: { trail: 700 } });
          try {
            renderScoped({ controlsCollapseAt: 1100 });
            expect(screen.getByTestId('scope-header')).toHaveAttribute('data-controls', 'inline');
            expect(screen.getByTestId('scope-header-controls')).toBeInTheDocument();
            cleanup();
            renderScoped();
            expect(screen.getByTestId('scope-header')).toHaveAttribute('data-controls', 'inline');
            expect(screen.queryByTestId('scope-header-controls-toggle')).toBeNull();
          } finally {
            restore();
          }
        });
      });

      it('does not collapse a trail whose crumbs fit', () => {
        renderLong(1200);
        expect(screen.getByTestId('scope-header-crumbs')).not.toHaveAttribute('data-collapsed');
        expect(screen.queryByTestId('scope-header-crumbs-more')).toBeNull();
      });
    });

    describe('one type scale across the row (2.407.10)', () => {
      it('draws crumbs and "…" at the rail item type (13px/500, secondary, hover primary), separators 13px tertiary; title and tabs unchanged', () => {
        const sw = vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockImplementation(function (this: HTMLElement) {
          return this.hasAttribute('data-crumb') ? 200 : 0;
        });
        const cw = vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function (this: HTMLElement) {
          if (this.hasAttribute('data-crumb')) return 40;
          return this.getAttribute('data-testid') === 'scope-header-trail' ? 300 : 0;
        });
        try {
          render(
            <ScopeHeader
              variant="inline"
              breadcrumbs={[{ label: 'Org' }, { label: 'Search', href: '/iq/search' }, { label: 'Design', onClick: () => {} }]}
              title="component contracts"
              tabs={TABS}
              activeTab="results"
            />,
          );
          const crumbs = screen.getAllByTestId('scope-header-crumb');
          const more = screen.getByTestId('scope-header-crumbs-more');
          [...crumbs, more].forEach((el) => {
            expect(el.className).toMatch(/text-\[14px\]/);
            expect(el.className).toMatch(/\bfont-medium\b/);
            expect(el.className).toMatch(/\btext-text-secondary\b/);
            expect(el.className).not.toMatch(/\btext-sm\b|\btext-text-tertiary\b/);
          });
          // Links and buttons brighten on hover.
          crumbs.filter((c) => c.tagName !== 'SPAN').forEach((c) => expect(c.className).toMatch(/hover:text-text-primary/));
          const seps = Array.from(screen.getByTestId('scope-header-trail').querySelectorAll('[aria-hidden="true"]')).filter((el) => el.textContent === '›');
          expect(seps.length).toBeGreaterThan(0);
          seps.forEach((el) => {
            expect(el.className).toMatch(/text-\[14px\]/);
            expect(el.className).toMatch(/\btext-text-tertiary\b/);
            expect(el.className).not.toMatch(/\btext-sm\b/);
          });
          const title = screen.getByTestId('scope-header-title');
          expect(title.className).toMatch(/text-\[18px\]/);
          expect(title.className).toMatch(/\bfont-semibold\b/);
        } finally {
          sw.mockRestore();
          cw.mockRestore();
        }
      });
    });

    describe('a paragraph-length title never draws over the crumbs (2.407.10)', () => {
      const PROMPT = ('Who on the platform team has shipped changes to the authentication service in the last quarter, '
        + 'and which of them also reviewed the SOC2 evidence collection work, owns an on-call rotation, and has written an ADR about ').padEnd(300, 'x');

      it('keeps "Org" and "›" whole ahead of a truncated 300-character title; tabs and controls keep their width', () => {
        expect(PROMPT).toHaveLength(300);
        render(
          <div style={{ width: 1280 }}>
            <ScopeHeader
              variant="inline"
              breadcrumbs={[{ label: 'Org' }]}
              title={PROMPT}
              tabs={TABS}
              activeTab="results"
              controls={<button type="button">Relevance ▾</button>}
              menu={[{ items: [{ label: 'Save search', onSelect: () => {} }] }]}
            />
          </div>,
        );
        const trail = screen.getByTestId('scope-header-trail');
        const nav = screen.getByTestId('scope-header-crumbs');
        const org = screen.getByTestId('scope-header-crumb');
        const title = screen.getByTestId('scope-header-title');
        const sep = Array.from(trail.children).find((el) => el.textContent === '›') as HTMLElement;
        expect(org).toHaveTextContent('Org');
        // DOM order (the flex order, since nothing reorders): crumb, "›",
        // title — so the crumb's right edge is at or before the title's left.
        expect(Array.from(trail.children)).toEqual([nav, sep, title]);
        expect(org.compareDocumentPosition(sep) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(sep.compareDocumentPosition(title) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        // Nothing positioned: no crumb or title is lifted out of the flow onto the other.
        [nav, org, sep, title].forEach((el) => expect(el.className).not.toMatch(/\b(absolute|fixed|relative)\b|-ml-|-mr-/));
        // The trail and the crumb list clip inside their own boxes; each crumb truncates.
        expect(trail.className).toMatch(/\bmin-w-0\b/);
        expect(trail.className).toMatch(/\boverflow-hidden\b/);
        expect(nav.className).toMatch(/\bmin-w-0\b/);
        expect(nav.className).toMatch(/\boverflow-hidden\b/);
        expect(org.className).toMatch(/\btruncate\b/);
        // The first crumb and the separator never shrink.
        expect(org.closest('li')!.className).toMatch(/\bshrink-0\b/);
        expect(sep.className).toMatch(/\bshrink-0\b/);
        // The title (2.407.15): gives up width first, truncates to its 12rem
        // floor, full text in `title`; the trail's basis is 0 so its length
        // never reaches the tabs.
        expect(title.className).toMatch(/\bflex-1\b/);
        expect(title.className).toMatch(/min-w-\[12rem\]/);
        expect(title.className).toMatch(/\btruncate\b/);
        expect(title.className).toMatch(/\bwhitespace-nowrap\b/);
        expect(title.className).not.toMatch(/max-w-\[50%\]/);
        expect(trail.className).toMatch(/\bflex-1\b/);
        expect(nav.className).not.toMatch(/shrink-\[100\]/);
        expect(title).toHaveAttribute('title', PROMPT);
        // Tabs and the right cluster are siblings of the trail, not inside it, and keep their width.
        const row = screen.getByTestId('scope-header');
        expect(screen.getByTestId('scope-header-tabs').parentElement).toBe(row);
        expect(screen.getByTestId('scope-header-tabs').className).toMatch(/\bshrink-0\b/);
        expect(screen.getByTestId('scope-header-right').parentElement).toBe(row);
        expect(screen.getByRole('button', { name: 'Relevance ▾' })).toBeInTheDocument();
      });
    });
  });
});

describe('ScopeHeader inline — 2.407.15', () => {
  it('titleHint is the h1 hover text; the title stays the visible text', () => {
    render(
      <ScopeHeader
        variant="inline"
        breadcrumbs={[{ label: 'Org' }, { label: 'Search' }]}
        title="Who can help finish Auth Migration before the cutover?"
        titleHint="Who can help finish Auth Migration before the cutover? We need someone who shipped a Cognito migration."
      />,
    );
    const h1 = screen.getByTestId('scope-header-title');
    expect(h1).toHaveTextContent('Who can help finish Auth Migration before the cutover?');
    expect(h1).toHaveAttribute('title', 'Who can help finish Auth Migration before the cutover? We need someone who shipped a Cognito migration.');
  });

  it('without titleHint the h1 hover text is the title', () => {
    render(<ScopeHeader variant="inline" breadcrumbs={[{ label: 'Org' }]} title="Search" />);
    expect(screen.getByTestId('scope-header-title')).toHaveAttribute('title', 'Search');
  });

  it('the collapsed Filters ▾ toggle is in the 28px 13px/500 control family', () => {
    // jsdom lays nothing out: give the row a width so the floor collapses it.
    const desc = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => 500 });
    try {
    render(
      <ScopeHeader
        variant="inline"
        breadcrumbs={[{ label: 'Org' }]}
        title="Search"
        controls={<button type="button">Type ▾</button>}
        controlsCollapseAt={100000}
      />,
    );
    const toggle = screen.getByTestId('scope-header-controls-toggle');
    expect(toggle.className).toMatch(/\bh-7\b/);
    expect(toggle.className).toMatch(/text-\[1[34]px\]/);
    expect(toggle.className).toMatch(/\bfont-medium\b/);
    expect(toggle.className).not.toMatch(/\btext-sm\b/);
    // 2.407.19: bordered like the DropdownMenu default triggers it replaces.
    expect(toggle.className).toMatch(/\bborder-border\b/);
    expect(toggle.className).not.toMatch(/\bborder-none\b/);
    } finally {
      if (desc) Object.defineProperty(HTMLElement.prototype, 'clientWidth', desc); else delete (HTMLElement.prototype as any).clientWidth;
    }
  });
});
