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
});
