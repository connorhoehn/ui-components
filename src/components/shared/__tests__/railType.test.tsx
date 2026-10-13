// One rail type scale (2.397.0). The shell rail (SubNavLayout) and the
// explorer rail beside it (RailNavList, GroupedList plain rows, WorkspaceRail
// caption, RailSectionHeader) drew two different scales — 13px items with
// 10px/9px headings and pills against 15px items with 11px labels and plain
// counts. These tests pin every rail to the SAME constants, so the next change
// to one moves the other with it.
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { SubNavLayout, activeNavItemClassName, inactiveNavItemClassName } from '../SubNavLayout';
import { RailNavList } from '../RailNavList';
import { GroupedList } from '../GroupedList';
import { WorkspaceRail } from '../../layout/WorkspaceRail';
import { RailSectionHeader } from '../../social/RailSectionHeader';
import { RailSection } from '../RailLayout';
import {
  RAIL_CAPTION,
  RAIL_CURRENT_FILL,
  RAIL_GROUP_COUNT,
  RAIL_GROUP_LABEL,
  RAIL_GROUP_PAD_Y,
  RAIL_ITEM_COUNT,
  RAIL_ITEM_TEXT,
  RAIL_ROW_PAD_Y,
  railType,
} from '../railType';
import * as shared from '../index';
import { TreeView } from '../TreeView';
import { ConversationShelf } from '../../social/ConversationShelf';
import { Breadcrumbs } from '../Breadcrumbs';

const hasAll = (el: Element, classes: string) => {
  for (const cls of classes.split(' ')) expect(el.className, `${cls} on ${el.outerHTML.slice(0, 80)}`).toContain(cls);
};

describe('rail type scale (2.397.0)', () => {
  it('is the compact scale (2.398.0): 13px/500 items on a 36px pitch, 11px caps labels', () => {
    expect(RAIL_ITEM_TEXT).toBe('text-[13px] font-medium leading-5');
    expect(RAIL_ROW_PAD_Y).toBe('py-2');
    expect(railType.rowPitch).toBe(36);
    expect(RAIL_GROUP_LABEL).toContain('text-[11px]');
    expect(RAIL_GROUP_LABEL).toContain('uppercase');
    expect(RAIL_GROUP_COUNT).toContain('text-[11px]');
    expect(RAIL_CAPTION).toContain('text-[12px]');
  });

  it('is exported from the shared barrel', () => {
    expect(shared.railType).toBe(railType);
    expect(shared.RAIL_ITEM_TEXT).toBe(RAIL_ITEM_TEXT);
    expect(typeof shared.RailCaretIcon).toBe('function');
  });

  it('SubNavLayout items, counts, group headings and group counts use it', () => {
    render(
      <SubNavLayout
        title="Org"
        items={[
          { path: '/a', label: 'Initiatives', group: 'Plan', count: 3 },
          { path: '/b', label: 'Designs', group: 'Design' },
        ]}
        storageKey="railtype-test"
      >
        body
      </SubNavLayout>,
    );
    const labels = screen.getAllByTestId('subnav-item-label');
    expect(labels).toHaveLength(2);
    for (const l of labels) {
      hasAll(l, RAIL_ITEM_TEXT);
      // Ink comes from the link, not a hard-coded secondary.
      expect(l.className).not.toContain('text-secondary');
    }
    hasAll(screen.getByTestId('subnav-item-count'), RAIL_ITEM_COUNT);
    const headers = screen.getAllByTestId('subnav-group-header');
    for (const h of headers) {
      hasAll(h, RAIL_GROUP_LABEL);
      hasAll(h, RAIL_GROUP_PAD_Y);
      expect(h.className).not.toContain('text-[10px]');
      // The caret is the GroupedList caret, not a ▾ glyph.
      expect(h.textContent).not.toMatch(/[▾▸]/);
      expect(h.querySelector('svg')).not.toBeNull();
    }
    for (const c of screen.getAllByTestId('subnav-group-count')) {
      hasAll(c, RAIL_GROUP_COUNT);
      expect(c.className).not.toContain('rounded');
    }
  });

  it('the className pair is a 40px row with the GroupedList current mark', () => {
    for (const cls of [inactiveNavItemClassName, activeNavItemClassName]) {
      expect(cls).toContain(RAIL_ROW_PAD_Y);
      expect(cls).toContain('text-text-primary');
    }
    expect(activeNavItemClassName).toContain('border-primary');
    expect(activeNavItemClassName).toContain(RAIL_CURRENT_FILL);
    // The current item no longer looks like a hovered one.
    expect(activeNavItemClassName).not.toContain('bg-surface-hover');
  });

  it('RailNavList, GroupedList plain rows and label headings share the item and label type', () => {
    render(
      <>
        <RailNavList items={[{ id: 'all', label: 'All initiatives', count: 4 }]} />
        <GroupedList
          groupHeading="label"
          groupCountAlign="end"
          rowStyle="plain"
          currentId="r1"
          groups={[{ id: 'g', title: 'In progress', count: 1 }]}
          rows={[{ id: 'r1', groupId: 'g', title: 'Observability Platform' }]}
        />
      </>,
    );
    hasAll(screen.getByTestId('rail-nav-list-item-all'), RAIL_ITEM_TEXT);
    hasAll(screen.getByTestId('rail-nav-list-count-all'), RAIL_ITEM_COUNT);
    const row = screen.getByTestId('grouped-list-row-r1');
    hasAll(row, RAIL_ROW_PAD_Y);
    hasAll(row, RAIL_CURRENT_FILL);
    // A plain row is a rail row at the default size too: the 3px edge bar.
    expect(row.className).toContain('shadow-[inset_3px_0_0_0_var(--color-primary)]');
    hasAll(within(row).getByTitle('Observability Platform'), RAIL_ITEM_TEXT);
    hasAll(screen.getByTestId('grouped-list-group-toggle-g'), RAIL_GROUP_LABEL);
    hasAll(screen.getByTestId('grouped-list-group-count-g'), RAIL_GROUP_COUNT);
  });

  it('WorkspaceRail caption and RailSectionHeader use the caption and group label', () => {
    render(
      <>
        <WorkspaceRail title="Initiatives" heading="caption">x</WorkspaceRail>
        <RailSectionHeader label="Guides" count={11} />
      </>,
    );
    hasAll(screen.getByTestId('workspace-rail-title'), RAIL_CAPTION);
    const label = screen.getByText('Guides');
    hasAll(label, RAIL_GROUP_LABEL);
    hasAll(screen.getByTestId('rail-section-header-count'), RAIL_GROUP_COUNT);
  });

  it('RailSection titles use the group label (2.397.1)', () => {
    render(<RailSection title="Views">x</RailSection>);
    const t = screen.getByTestId('rail-section-title');
    hasAll(t, RAIL_GROUP_LABEL);
    expect(t.className).not.toContain('text-[10px]');
  });
});

// 2.407.13: the Documents surface. The Documents explorer (WorkspaceRail
// heading="label", ConversationShelf, TreeView) sat at 15px beside the 13px
// Workspace NavRail; its rail forms now draw the same constants.
describe('Documents rail on the rail scale (2.407.13)', () => {
  it('WorkspaceRail heading="label" is the group label with a plain group count, never a chip', () => {
    render(<WorkspaceRail title="Documents" count={180} heading="label">body</WorkspaceRail>);
    const title = screen.getByTestId('workspace-rail-title');
    hasAll(title, RAIL_GROUP_LABEL);
    expect(title.className).not.toContain('text-[15px]');
    const count = screen.getByTestId('workspace-rail-count');
    hasAll(count, RAIL_GROUP_COUNT);
    expect(count.getAttribute('data-count-style')).toBe('plain');
    expect(count.textContent).toBe('180');
  });

  it('TreeView size="rail" rows are rail items on the 36px pitch with 12px meta', () => {
    render(
      <TreeView
        size="rail"
        nodes={[{ id: 'f', title: 'Sprint planning', parentId: null, isDir: true, meta: '10' }, { id: 'd', title: 'Sprint notes', parentId: 'f', meta: '4d' }]}
        defaultExpanded={['f']}
        selectedId="d"
        onSelect={() => {}}
        data-testid="tree"
      />,
    );
    for (const id of ['f', 'd']) {
      const row = screen.getByTestId(`tree-row-${id}`);
      hasAll(row, RAIL_ITEM_TEXT);
      hasAll(row, RAIL_ROW_PAD_Y);
      hasAll(row, 'min-h-9');
      expect(row.className).not.toContain('text-[15px]');
    }
    hasAll(within(screen.getByTestId('tree-row-f')).getByText('10'), RAIL_ITEM_COUNT);
    // md's selection survives: the brand tint and the primary edge.
    hasAll(screen.getByTestId('tree-row-d'), 'border-primary bg-primary-bg');
  });

  it('ConversationShelf size="rail" labels are rail items on the 36px pitch', () => {
    render(<ConversationShelf compact plain size="rail" items={[{ id: 'all', label: 'All documents' }, { id: 'recent', label: 'Recent' }]} activeId="all" onSelect={() => {}} data-testid="views" />);
    for (const id of ['all', 'recent']) {
      const button = screen.getByTestId(`views-${id}`);
      hasAll(button, 'min-h-9');
      hasAll(button, RAIL_ROW_PAD_Y);
      const label = within(button).getByText(id === 'all' ? 'All documents' : 'Recent');
      hasAll(label, 'text-[13px]');
      expect(label.className).not.toContain('text-[15px]');
    }
  });

  it('Breadcrumbs size="sm" puts every crumb and separator on the 12px meta step (2.441.3; was 13px)', () => {
    render(<Breadcrumbs size="sm" lastIsCurrent={false} items={[{ label: 'Sprint planning', href: '#a' }, { label: 'Meetings', href: '#b' }]} data-testid="crumbs" />);
    const nav = screen.getByTestId('crumbs');
    for (const el of [...nav.querySelectorAll('a'), ...nav.querySelectorAll('[aria-hidden="true"]')]) {
      expect(el.className).toContain('text-xs');
      expect(el.className).not.toContain('text-[13px]');
      expect(el.className).not.toContain('text-sm');
    }
  });
});
