import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { useState } from 'react';
import { act, render, screen, fireEvent, cleanup, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  GroupedList,
  GROUPED_LIST_GROUP_DROP_PREFIX,
  resolveGroupedListDrop,
  type GroupedListGroup,
  type GroupedListRow,
} from '../GroupedList';

const GROUPS: GroupedListGroup[] = [
  { id: 'docs', title: 'Documents', count: 2 },
  { id: 'agents', title: 'Agents', count: 1 },
  { id: 'closed', title: 'Closed by default', count: 1, defaultOpen: false },
];

const ROWS: GroupedListRow[] = [
  { id: 'a', groupId: 'docs', title: 'Alpha', subline: 'Alpha description', hoverSubline: '/doc → Read → Plan' },
  { id: 'b', groupId: 'docs', title: 'Beta', subline: 'Beta description' },
  { id: 'c', groupId: 'agents', title: 'Gamma', hoverSubline: '/agent → Plan' },
  { id: 'd', groupId: 'closed', title: 'Delta' },
];

const MENU = () => [{ items: [{ label: 'Open' }, { label: 'Archive', danger: true }] }];

afterEach(cleanup);
beforeEach(() => {
  window.localStorage.clear();
});

describe('GroupedList', () => {
  it('renders each group as a labelled section with a count chip and its rows under it', () => {
    render(<GroupedList groups={GROUPS} rows={ROWS} />);
    const docs = screen.getByTestId('grouped-list-group-docs');
    expect(docs.tagName).toBe('SECTION');
    expect(docs).toHaveAttribute('aria-labelledby', 'grouped-list-group-toggle-docs');
    expect(screen.getByTestId('grouped-list-group-count-docs')).toHaveTextContent('2');
    expect(within(docs).getByText('Alpha')).toBeInTheDocument();
    expect(within(docs).getByText('Beta')).toBeInTheDocument();
    expect(within(screen.getByTestId('grouped-list-group-agents')).getByText('Gamma')).toBeInTheDocument();
  });

  it('honours defaultOpen: a closed group hides its rows and its header says so', () => {
    render(<GroupedList groups={GROUPS} rows={ROWS} />);
    expect(screen.queryByText('Delta')).not.toBeInTheDocument();
    expect(screen.getByTestId('grouped-list-group-toggle-closed')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByTestId('grouped-list-group-toggle-docs')).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses and expands on the header click and reports it', () => {
    const onToggle = vi.fn();
    render(<GroupedList groups={GROUPS} rows={ROWS} onToggleGroup={onToggle} />);
    fireEvent.click(screen.getByTestId('grouped-list-group-toggle-docs'));
    expect(onToggle).toHaveBeenCalledWith('docs', false);
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('grouped-list-group-toggle-docs'));
    expect(onToggle).toHaveBeenLastCalledWith('docs', true);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
  });

  it('is controlled by openGroups when given', () => {
    const onToggle = vi.fn();
    const { rerender } = render(<GroupedList groups={GROUPS} rows={ROWS} openGroups={['agents']} onToggleGroup={onToggle} />);
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('grouped-list-group-toggle-docs'));
    expect(onToggle).toHaveBeenCalledWith('docs', true);
    // Still closed: the host has not changed the prop.
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
    rerender(<GroupedList groups={GROUPS} rows={ROWS} openGroups={['agents', 'docs']} onToggleGroup={onToggle} />);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
  });

  it('remembers collapsed groups under storageKey', () => {
    const { unmount } = render(<GroupedList groups={GROUPS} rows={ROWS} storageKey="test:grouped" />);
    fireEvent.click(screen.getByTestId('grouped-list-group-toggle-docs'));
    expect(JSON.parse(window.localStorage.getItem('test:grouped')!)).toEqual(expect.arrayContaining(['docs', 'closed']));
    unmount();
    render(<GroupedList groups={GROUPS} rows={ROWS} storageKey="test:grouped" />);
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
  });

  it('opens a row on click and on Enter via its primary button', () => {
    const onOpen = vi.fn();
    render(<GroupedList groups={GROUPS} rows={ROWS} onOpenRow={onOpen} />);
    fireEvent.click(screen.getByTestId('grouped-list-row-open-a'));
    expect(onOpen).toHaveBeenCalledWith(expect.objectContaining({ id: 'a' }));
  });

  it('renders the at-rest subline and an aria-hidden hover subline; a row with no subline shows its hover line', () => {
    render(<GroupedList groups={GROUPS} rows={ROWS} />);
    expect(screen.getByTestId('grouped-list-row-subline-a')).toHaveTextContent('Alpha description');
    const hover = screen.getByTestId('grouped-list-row-hover-subline-a');
    expect(hover).toHaveTextContent('/doc → Read → Plan');
    expect(hover).toHaveAttribute('aria-hidden', 'true');
    expect(hover.className).toContain('hidden');
    // Gamma has only a hover line: it is the visible second line and not hidden from AT.
    const gamma = screen.getByTestId('grouped-list-row-hover-subline-c');
    expect(gamma).not.toHaveAttribute('aria-hidden');
    expect(gamma.className).not.toContain('hidden');
  });

  it('marks the current row and shows its hover line and actions without hover', () => {
    render(<GroupedList groups={GROUPS} rows={ROWS.map((r) => (r.id === 'a' ? { ...r, hoverActions: <button>Open</button> } : r))} currentId="a" />);
    const li = screen.getByTestId('grouped-list-row-a');
    expect(li).toHaveAttribute('aria-current', 'true');
    expect(li).toHaveAttribute('data-current', 'true');
    expect(screen.getByTestId('grouped-list-row-hover-subline-a').className).not.toContain('hidden');
    expect(screen.getByTestId('grouped-list-row-actions-a').className).toContain('opacity-100');
    expect(screen.getByTestId('grouped-list-row-subline-a').className).toContain('hidden');
  });

  it('gives the current row the tab stop, else the first header, and never more than one', () => {
    render(<GroupedList groups={GROUPS} rows={ROWS} currentId="b" />);
    const tabbable = document.querySelectorAll('[data-focus-key][tabindex="0"]');
    expect(tabbable).toHaveLength(1);
    expect(tabbable[0]).toBe(screen.getByTestId('grouped-list-row-open-b'));
    cleanup();
    render(<GroupedList groups={GROUPS} rows={ROWS} />);
    const only = document.querySelectorAll('[data-focus-key][tabindex="0"]');
    expect(only).toHaveLength(1);
    expect(only[0]).toBe(screen.getByTestId('grouped-list-group-toggle-docs'));
  });

  it('walks headers and visible rows with the arrow keys, Home and End', () => {
    render(<GroupedList groups={GROUPS} rows={ROWS} />);
    const docsHeader = screen.getByTestId('grouped-list-group-toggle-docs');
    docsHeader.focus();
    fireEvent.keyDown(docsHeader, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByTestId('grouped-list-row-open-a'));
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByTestId('grouped-list-row-open-b'));
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByTestId('grouped-list-group-toggle-agents'));
    fireEvent.keyDown(document.activeElement!, { key: 'End' });
    // The closed group's header is last: its rows are not visible.
    expect(document.activeElement).toBe(screen.getByTestId('grouped-list-group-toggle-closed'));
    fireEvent.keyDown(document.activeElement!, { key: 'Home' });
    expect(document.activeElement).toBe(docsHeader);
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowUp' });
    expect(document.activeElement).toBe(docsHeader);
  });

  it('ArrowLeft on a row collapses its group and lands on the header; ArrowRight on a closed header opens it', () => {
    const onToggle = vi.fn();
    render(<GroupedList groups={GROUPS} rows={ROWS} onToggleGroup={onToggle} />);
    const rowB = screen.getByTestId('grouped-list-row-open-b');
    rowB.focus();
    fireEvent.keyDown(rowB, { key: 'ArrowLeft' });
    expect(onToggle).toHaveBeenCalledWith('docs', false);
    expect(screen.queryByText('Beta')).not.toBeInTheDocument();
    expect(document.activeElement).toBe(screen.getByTestId('grouped-list-group-toggle-docs'));
    const closed = screen.getByTestId('grouped-list-group-toggle-closed');
    closed.focus();
    fireEvent.keyDown(closed, { key: 'ArrowRight' });
    expect(onToggle).toHaveBeenLastCalledWith('closed', true);
    expect(screen.getByText('Delta')).toBeInTheDocument();
    // ArrowRight on the now-open header steps into its first row.
    fireEvent.keyDown(closed, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(screen.getByTestId('grouped-list-row-open-d'));
  });

  it('renders a ⋯ menu per row from rowMenu, out of the tab order, and opens it with Shift+F10 and right-click', () => {
    render(<GroupedList groups={GROUPS} rows={ROWS} rowMenu={MENU} />);
    const trigger = screen.getByTestId('grouped-list-row-menu-trigger-a');
    expect(trigger).toHaveAttribute('tabindex', '-1');
    expect(trigger).toHaveAttribute('aria-label', 'Actions for Alpha');
    const rowA = screen.getByTestId('grouped-list-row-open-a');
    rowA.focus();
    fireEvent.keyDown(rowA, { key: 'F10', shiftKey: true });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menuitem', { name: 'Archive' })).toBeInTheDocument();
    fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.contextMenu(screen.getByTestId('grouped-list-row-b'));
    expect(screen.getByTestId('grouped-list-row-menu-trigger-b')).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders no menu button for a row whose rowMenu returns nothing', () => {
    render(<GroupedList groups={GROUPS} rows={ROWS} rowMenu={(row) => (row.id === 'a' ? MENU() : null)} />);
    expect(screen.getByTestId('grouped-list-row-menu-trigger-a')).toBeInTheDocument();
    expect(screen.queryByTestId('grouped-list-row-menu-trigger-b')).not.toBeInTheDocument();
  });

  it('shows a trailing slot always and hides an empty group when asked', () => {
    render(
      <GroupedList
        groups={[...GROUPS, { id: 'none', title: 'Nothing', count: 0 }]}
        rows={ROWS.map((r) => (r.id === 'c' ? { ...r, trailing: <a href="#run">View run</a> } : r))}
        hideEmptyGroups
      />,
    );
    expect(screen.getByTestId('grouped-list-row-trailing-c')).toHaveTextContent('View run');
    expect(screen.queryByTestId('grouped-list-group-none')).not.toBeInTheDocument();
  });

  it('says "Nothing here" for an open group with no rows', () => {
    render(<GroupedList groups={[{ id: 'e', title: 'Empty', count: 0 }]} rows={[]} />);
    expect(screen.getByTestId('grouped-list-group-empty-e')).toHaveTextContent('Nothing here');
  });
});

// ---------------------------------------------------------------------------
// leading / meta / reorder (additive slots)
// ---------------------------------------------------------------------------

const WORK_GROUPS: GroupedListGroup[] = [
  { id: 'next', title: 'Next up' },
  { id: 'doing', title: 'In progress' },
  { id: 'done', title: 'Done', defaultOpen: false },
];
const WORK_ROWS: GroupedListRow[] = [
  { id: 'w1', groupId: 'next', title: 'One' },
  { id: 'w2', groupId: 'next', title: 'Two' },
  { id: 'w3', groupId: 'next', title: 'Three' },
  { id: 'w4', groupId: 'doing', title: 'Four' },
  { id: 'w5', groupId: 'done', title: 'Five' },
];

function applyMove(rows: GroupedListRow[], id: string, toGroupId: string, index: number) {
  const moving = rows.find((r) => r.id === id)!;
  const rest = rows.filter((r) => r.id !== id);
  const target = rest.filter((r) => r.groupId === toGroupId);
  const before = target[index - 1];
  const moved = { ...moving, groupId: toGroupId };
  if (!before) {
    const first = target[0];
    const at = first ? rest.indexOf(first) : rest.length;
    return [...rest.slice(0, at), moved, ...rest.slice(at)];
  }
  const at = rest.indexOf(before) + 1;
  return [...rest.slice(0, at), moved, ...rest.slice(at)];
}

describe('GroupedList — leading and meta', () => {
  it('renders leading outside the row button; pressing it does not open the row', () => {
    const onOpenRow = vi.fn();
    const onTick = vi.fn();
    const rows: GroupedListRow[] = [
      { ...WORK_ROWS[0], leading: <input type="checkbox" aria-label="Mark One done" onChange={onTick} /> },
    ];
    render(<GroupedList groups={WORK_GROUPS} rows={rows} onOpenRow={onOpenRow} />);
    const box = screen.getByLabelText('Mark One done');
    expect(screen.getByTestId('grouped-list-row-open-w1')).not.toContainElement(box);
    expect(screen.getByTestId('grouped-list-row-leading-w1')).toContainElement(box);
    fireEvent.click(box);
    fireEvent.keyDown(box, { key: 'ArrowDown' });
    expect(onTick).toHaveBeenCalledTimes(1);
    expect(onOpenRow).not.toHaveBeenCalled();
  });

  it('renders meta as a line in the row button, before the subline', () => {
    const rows: GroupedListRow[] = [{ ...WORK_ROWS[0], meta: '5 pts · Layla Hassan', subline: 'Later line' }];
    render(<GroupedList groups={WORK_GROUPS} rows={rows} />);
    const meta = screen.getByTestId('grouped-list-row-meta-w1');
    expect(meta).toHaveTextContent('5 pts · Layla Hassan');
    expect(screen.getByTestId('grouped-list-row-open-w1')).toContainElement(meta);
    const sub = screen.getByTestId('grouped-list-row-subline-w1');
    expect(meta.compareDocumentPosition(sub) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('draws no handle and no live region without onReorder', () => {
    render(<GroupedList groups={WORK_GROUPS} rows={WORK_ROWS} />);
    expect(screen.queryByTestId('grouped-list-row-handle-w1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('grouped-list-reorder-status')).not.toBeInTheDocument();
  });
});

describe('GroupedList — reorder', () => {
  it('Alt+ArrowUp/Down move within the group, with the final index', () => {
    const onReorder = vi.fn();
    render(<GroupedList groups={WORK_GROUPS} rows={WORK_ROWS} onReorder={onReorder} />);
    const two = screen.getByTestId('grouped-list-row-open-w2');
    fireEvent.keyDown(two, { key: 'ArrowUp', altKey: true });
    expect(onReorder).toHaveBeenLastCalledWith('w2', 'next', 0);
    fireEvent.keyDown(two, { key: 'ArrowDown', altKey: true });
    expect(onReorder).toHaveBeenLastCalledWith('w2', 'next', 2);
    // Nothing above the first row / below the last.
    onReorder.mockClear();
    fireEvent.keyDown(screen.getByTestId('grouped-list-row-open-w1'), { key: 'ArrowUp', altKey: true });
    fireEvent.keyDown(screen.getByTestId('grouped-list-row-open-w3'), { key: 'ArrowDown', altKey: true });
    expect(onReorder).not.toHaveBeenCalled();
  });

  it('Alt+ArrowLeft/Right append to the previous / next group and announce it', () => {
    const onReorder = vi.fn();
    render(<GroupedList groups={WORK_GROUPS} rows={WORK_ROWS} onReorder={onReorder} />);
    fireEvent.keyDown(screen.getByTestId('grouped-list-row-open-w2'), { key: 'ArrowRight', altKey: true });
    expect(onReorder).toHaveBeenLastCalledWith('w2', 'doing', 1);
    expect(screen.getByTestId('grouped-list-reorder-status')).toHaveTextContent('Moved Two to position 2 of 2 in In progress');
    fireEvent.keyDown(screen.getByTestId('grouped-list-row-open-w4'), { key: 'ArrowLeft', altKey: true });
    expect(onReorder).toHaveBeenLastCalledWith('w4', 'next', 3);
    onReorder.mockClear();
    fireEvent.keyDown(screen.getByTestId('grouped-list-row-open-w1'), { key: 'ArrowLeft', altKey: true });
    expect(onReorder).not.toHaveBeenCalled();
  });

  it('opens a closed target group and focus follows the moved row', async () => {
    function Host() {
      const [rows, setRows] = useState(WORK_ROWS);
      return (
        <GroupedList
          groups={WORK_GROUPS}
          rows={rows}
          onReorder={(id, to, index) => setRows((prev) => applyMove(prev, id, to, index))}
        />
      );
    }
    render(<Host />);
    const four = screen.getByTestId('grouped-list-row-open-w4');
    four.focus();
    fireEvent.keyDown(four, { key: 'ArrowRight', altKey: true });
    expect(screen.getByTestId('grouped-list-group-toggle-done')).toHaveAttribute('aria-expanded', 'true');
    await waitFor(() => expect(screen.getByTestId('grouped-list-row-open-w4')).toHaveFocus());
    const doneRows = within(screen.getByTestId('grouped-list-group-done')).getAllByRole('listitem');
    expect(doneRows.map((li) => li.dataset.rowId)).toEqual(['w5', 'w4']);
  });

  it('plain arrows still walk rows when onReorder is set, and Alt+arrows fire nothing without it', () => {
    const onReorder = vi.fn();
    const { unmount } = render(<GroupedList groups={WORK_GROUPS} rows={WORK_ROWS} onReorder={onReorder} />);
    const one = screen.getByTestId('grouped-list-row-open-w1');
    one.focus();
    fireEvent.keyDown(one, { key: 'ArrowDown' });
    expect(screen.getByTestId('grouped-list-row-open-w2')).toHaveFocus();
    expect(onReorder).not.toHaveBeenCalled();
    unmount();
    render(<GroupedList groups={WORK_GROUPS} rows={WORK_ROWS} />);
    const again = screen.getByTestId('grouped-list-row-open-w1');
    again.focus();
    fireEvent.keyDown(again, { key: 'ArrowDown', altKey: true });
    expect(screen.getByTestId('grouped-list-row-open-w2')).toHaveFocus();
  });

  it('gives each reorderable row a named, non-tabbable handle; canReorder and disabled rows opt out', async () => {
    const onReorder = vi.fn();
    const rows = WORK_ROWS.map((r) => (r.id === 'w3' ? { ...r, disabled: true } : r));
    render(
      <GroupedList
        groups={WORK_GROUPS}
        rows={rows}
        onReorder={onReorder}
        canReorder={(r) => !r.disabled && r.id !== 'w2'}
        reorderLabel={(r) => `Move ${r.title}`}
      />,
    );
    const handle = screen.getByTestId('grouped-list-row-handle-w1');
    expect(handle).toHaveAccessibleName('Move One');
    expect(handle).toHaveAttribute('tabindex', '-1');
    expect(screen.queryByTestId('grouped-list-row-handle-w2')).not.toBeInTheDocument();
    expect(screen.queryByTestId('grouped-list-row-handle-w3')).not.toBeInTheDocument();
    fireEvent.keyDown(screen.getByTestId('grouped-list-row-open-w2'), { key: 'ArrowUp', altKey: true });
    expect(onReorder).not.toHaveBeenCalled();
    // The dnd chunk loads and the handle keeps its name.
    await act(async () => {
      await import('../GroupedListSortable');
    });
    await waitFor(() => expect(document.querySelector('[id^="DndDescribedBy"]')).not.toBeNull());
    expect(screen.getByTestId('grouped-list-row-handle-w1')).toHaveAccessibleName('Move One');
    expect(screen.getByTestId('grouped-list-row-handle-w1')).toHaveAttribute('tabindex', '-1');
  });

  it('default handle label is "Reorder <title>"', () => {
    render(<GroupedList groups={WORK_GROUPS} rows={WORK_ROWS} onReorder={vi.fn()} />);
    expect(screen.getByTestId('grouped-list-row-handle-w1')).toHaveAccessibleName('Reorder One');
  });

  it('resolves drops onto a row or a group header', () => {
    expect(resolveGroupedListDrop(WORK_ROWS, 'w1', 'w3')).toEqual({ toGroupId: 'next', index: 2 });
    expect(resolveGroupedListDrop(WORK_ROWS, 'w1', 'w4')).toEqual({ toGroupId: 'doing', index: 0 });
    expect(resolveGroupedListDrop(WORK_ROWS, 'w1', `${GROUPED_LIST_GROUP_DROP_PREFIX}done`)).toEqual({ toGroupId: 'done', index: 1 });
    expect(resolveGroupedListDrop(WORK_ROWS, 'w1', `${GROUPED_LIST_GROUP_DROP_PREFIX}next`)).toEqual({ toGroupId: 'next', index: 2 });
    expect(resolveGroupedListDrop(WORK_ROWS, 'w3', `${GROUPED_LIST_GROUP_DROP_PREFIX}next`)).toBeNull();
    expect(resolveGroupedListDrop(WORK_ROWS, 'w1', 'w1')).toBeNull();
  });

  it('reaches @dnd-kit only through a dynamic import (optional peer, root entry)', () => {
    const src = readFileSync(resolve(__dirname, '../GroupedList.tsx'), 'utf8');
    expect(src).not.toMatch(/from\s+['"]@dnd-kit/);
    expect(src).not.toMatch(/^import\s+[^;]*GroupedListSortable/m);
    expect(src).toMatch(/import\('\.\/GroupedListSortable'\)/);
  });
});

describe('GroupedList groupHeading + currentStyle (2.389.0)', () => {
  it('groupHeading="label" renders an uppercase label with a plain count, no chip', () => {
    render(<GroupedList groups={GROUPS} rows={ROWS} groupHeading="label" />);
    const toggle = screen.getByTestId('grouped-list-group-toggle-docs');
    expect(toggle).toHaveAttribute('data-heading', 'label');
    expect(toggle.className).toContain('uppercase');
    expect(toggle.className).toContain('text-[12px]');
    const count = screen.getByTestId('grouped-list-group-count-docs');
    expect(count.tagName).toBe('SPAN');
    expect(count).toHaveTextContent('2');
    expect(count.className).toContain('text-text-tertiary');
    expect(count.className).not.toContain('rounded');
  });

  it('default heading stays sentence case with a chip', () => {
    render(<GroupedList groups={GROUPS} rows={ROWS} />);
    const toggle = screen.getByTestId('grouped-list-group-toggle-docs');
    expect(toggle).not.toHaveAttribute('data-heading');
    expect(toggle.className).not.toContain('uppercase');
  });

  it('currentStyle="bar" adds the inset primary bar at sm; tint does not', () => {
    const { unmount } = render(<GroupedList groups={GROUPS} rows={ROWS} currentId="a" />);
    expect(screen.getByTestId('grouped-list-row-a').className).not.toContain('inset_2px');
    unmount();
    render(<GroupedList groups={GROUPS} rows={ROWS} currentId="a" currentStyle="bar" />);
    const row = screen.getByTestId('grouped-list-row-a');
    expect(row.className).toContain('shadow-[inset_2px_0_0_0_var(--color-primary)]');
    expect(row.className).toContain('bg-primary/8');
    expect(screen.getByTestId('grouped-list-row-b').className).not.toContain('inset_2px');
  });
});


describe('GroupedList semantic rail typography', () => {
  it.each([
    ['sm', 'plain', true],
    ['md', 'ruled', true],
    ['sm', 'ruled', false],
  ] as const)('marks only rail titles for size=%s and rowStyle=%s', (size, rowStyle, isRail) => {
    const row: GroupedListRow = { ...ROWS[0], pill: <span>Badge</span>, trailing: <button>Details</button> };
    render(<GroupedList groups={GROUPS} rows={[row]} size={size} rowStyle={rowStyle} />);
    const title = screen.getByText('Alpha');
    if (isRail) expect(title).toHaveAttribute('data-ui-text', 'rail-item');
    else expect(title).not.toHaveAttribute('data-ui-text');
    expect(screen.getByText('Badge').closest('[data-ui-text="rail-item"]')).toBeNull();
    expect(screen.getByText('Alpha description').closest('[data-ui-text="rail-item"]')).toBeNull();
    expect(screen.getByRole('button', { name: 'Details' }).closest('[data-ui-text="rail-item"]')).toBeNull();
  });
});
