import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GroupedList, type GroupedListGroup, type GroupedListRow } from '../GroupedList';

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
