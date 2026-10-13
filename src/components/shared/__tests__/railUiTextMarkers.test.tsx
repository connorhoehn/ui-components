// The DOM audit measures rail typography through semantic markers the owning
// component emits (skills/ui-dom-audit/references/contracts.md): a rail row's
// TITLE carries `data-ui-text="rail-item"` (13px/500/20px) and a rail caption
// or group heading carries `data-ui-text="rail-caption"` (11px). Until 2.441.0
// only GroupedList emitted them, so every other rail's titles were measured as
// ordinary controls and reported as 13px/11px defects.
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { StackedRail } from '../StackedRail';
import { SubNavLayout } from '../SubNavLayout';
import { NavRail } from '../NavRail';
import { RailNavList } from '../RailNavList';
import { TreeView } from '../TreeView';

afterEach(cleanup);

describe('rail typography markers', () => {
  it('StackedRail: row titles are rail items; caption, group label and counts are rail captions', () => {
    render(
      <StackedRail
        title="Documents"
        count={2}
        aria-label="Documents"
        currentStyle="tint"
        selectedId="b"
        groups={[{ id: 'rules', title: 'Rules', count: 2, rows: [{ id: 'a', label: 'Scoring', meta: 3 }, { id: 'b', label: 'Evidence' }] }]}
        data-testid="rail"
      />,
    );
    const title = screen.getByText('Scoring');
    expect(title).toHaveAttribute('data-ui-text', 'rail-item');
    // The meta beside it stays outside the marker.
    expect(screen.getByTestId('rail-row-a-meta')).not.toHaveAttribute('data-ui-text');
    expect(screen.getByTestId('rail-title')).toHaveAttribute('data-ui-text', 'rail-caption');
    expect(screen.getByTestId('rail-count')).toHaveAttribute('data-ui-text', 'rail-caption');
    expect(screen.getByTestId('rail-group-rules-header-label')).toHaveAttribute('data-ui-text', 'rail-caption');
    expect(screen.getByTestId('rail-group-rules-count')).toHaveAttribute('data-ui-text', 'rail-caption');
    // Tint marks the current row by its fill; the title keeps the 500 weight.
    expect(screen.getByTestId('rail-row-b').className).not.toContain('font-semibold');
  });

  it('SubNavLayout and NavRail label spans are rail items', () => {
    render(<SubNavLayout title="Build" items={[{ path: 'work', label: 'Work' }]}>c</SubNavLayout>);
    expect(screen.getByTestId('subnav-item-label')).toHaveAttribute('data-ui-text', 'rail-item');
    cleanup();
    render(<NavRail title="Platform" items={[{ to: '/work', label: 'Work', badge: 3 }]} />);
    const link = screen.getByRole('link', { name: /Work/ });
    expect(within(link).getByText('Work')).toHaveAttribute('data-ui-text', 'rail-item');
    expect(within(link).getByTestId('nav-rail-badge')).not.toHaveAttribute('data-ui-text');
  });

  it('RailNavList titles are rail items; tint marks current by fill, weight by semibold', () => {
    const items = [{ id: 'all', label: 'All', current: true, onSelect: () => {} }, { id: 'mine', label: 'Mine', onSelect: () => {} }];
    render(<RailNavList items={items} currentStyle="tint" data-testid="views" />);
    expect(screen.getByText('All')).toHaveAttribute('data-ui-text', 'rail-item');
    expect(screen.getByTestId('views-item-all').className).not.toContain('font-semibold');
    expect(screen.getByTestId('views-item-all').className).toContain('bg-primary/10');
    cleanup();
    render(<RailNavList items={items} data-testid="views" />);
    expect(screen.getByTestId('views-item-all').className).toContain('font-semibold');
  });

  it('TreeView marks titles only at the rail size', () => {
    const nodes = [{ id: 'a', title: 'Alpha', parentId: null }];
    render(<TreeView size="rail" nodes={nodes} selectedId={null} onSelect={() => {}} />);
    expect(screen.getByText('Alpha')).toHaveAttribute('data-ui-text', 'rail-item');
    cleanup();
    render(<TreeView nodes={nodes} selectedId={null} onSelect={() => {}} />);
    expect(screen.getByText('Alpha')).not.toHaveAttribute('data-ui-text');
  });
});
