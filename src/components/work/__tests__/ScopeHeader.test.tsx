import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ScopeHeader, formatSpend } from '../ScopeHeader';
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
  });
});
