import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { MutableRefObject } from 'react';
import type { TaskItem } from '../../../types/document';
import TaskList from '../TaskList';

interface CapturedProps {
  item: TaskItem;
  editable: boolean;
  onUpdate: (patch: Partial<TaskItem>) => void;
  onRemove: () => void;
  autoFocusText?: boolean;
  onDidAutoFocus?: () => void;
}

const captures: CapturedProps[] = [];

vi.mock('../TaskItemRow', () => ({
  default: (props: CapturedProps) => {
    captures.push(props);
    return (
      <div
        data-testid="task-item-row"
        data-item-id={props.item.id}
        data-editable={String(props.editable)}
        data-auto-focus={props.autoFocusText ? 'true' : 'false'}
      />
    );
  },
}));

function mk(id: string, overrides: Partial<TaskItem> = {}): TaskItem {
  return { id, text: `task ${id}`, status: 'pending', assignee: '', ackedBy: '', ackedAt: '', priority: 'medium', notes: '', ...overrides };
}

beforeEach(() => {
  captures.length = 0;
});

describe('TaskList', () => {
  it('renders the muted-italic empty state when items is empty', () => {
    render(
      <TaskList
        items={[]}
        editable
        onUpdateItem={vi.fn()}
        onRemoveItem={vi.fn()}
      />,
    );
    const empty = screen.getByText('No tasks yet.');
    expect(empty).toBeInTheDocument();
    expect(empty.className).toMatch(/italic/);
    expect(empty.className).toMatch(/text-text-tertiary/);
    expect(screen.queryAllByTestId('task-item-row')).toHaveLength(0);
  });

  it('renders one TaskItemRow per item and passes the item + editable through unchanged', () => {
    const items = [mk('a'), mk('b'), mk('c')];
    render(
      <TaskList
        items={items}
        editable={false}
        onUpdateItem={vi.fn()}
        onRemoveItem={vi.fn()}
      />,
    );
    const rows = screen.getAllByTestId('task-item-row');
    expect(rows).toHaveLength(3);
    expect(rows.map(r => r.dataset.itemId)).toEqual(['a', 'b', 'c']);
    for (const r of rows) expect(r.dataset.editable).toBe('false');
    expect(captures.map(c => c.item.id)).toEqual(['a', 'b', 'c']);
  });

  it("routes per-row onUpdate to parent onUpdateItem with the row's item id", () => {
    const onUpdateItem = vi.fn();
    const items = [mk('a'), mk('b')];
    render(
      <TaskList
        items={items}
        editable
        onUpdateItem={onUpdateItem}
        onRemoveItem={vi.fn()}
      />,
    );
    captures[1].onUpdate({ status: 'done' });
    expect(onUpdateItem).toHaveBeenCalledTimes(1);
    expect(onUpdateItem).toHaveBeenCalledWith('b', { status: 'done' });
  });

  it("routes per-row onRemove to parent onRemoveItem with the row's item id", () => {
    const onRemoveItem = vi.fn();
    const items = [mk('a'), mk('b'), mk('c')];
    render(
      <TaskList
        items={items}
        editable
        onUpdateItem={vi.fn()}
        onRemoveItem={onRemoveItem}
      />,
    );
    captures[2].onRemove();
    expect(onRemoveItem).toHaveBeenCalledTimes(1);
    expect(onRemoveItem).toHaveBeenCalledWith('c');
  });

  it('only the last row gets autoFocusText=true when focusLastItem.current is true', () => {
    const focusLastItem = { current: true } as MutableRefObject<boolean>;
    const items = [mk('a'), mk('b'), mk('c')];
    render(
      <TaskList
        items={items}
        editable
        onUpdateItem={vi.fn()}
        onRemoveItem={vi.fn()}
        focusLastItem={focusLastItem}
      />,
    );
    const rows = screen.getAllByTestId('task-item-row');
    expect(rows[0].dataset.autoFocus).toBe('false');
    expect(rows[1].dataset.autoFocus).toBe('false');
    expect(rows[2].dataset.autoFocus).toBe('true');
  });

  it('no row gets autoFocusText=true when focusLastItem.current is false', () => {
    const focusLastItem = { current: false } as MutableRefObject<boolean>;
    const items = [mk('a'), mk('b')];
    render(
      <TaskList
        items={items}
        editable
        onUpdateItem={vi.fn()}
        onRemoveItem={vi.fn()}
        focusLastItem={focusLastItem}
      />,
    );
    const rows = screen.getAllByTestId('task-item-row');
    expect(rows[0].dataset.autoFocus).toBe('false');
    expect(rows[1].dataset.autoFocus).toBe('false');
  });

  it('no row gets autoFocusText=true when focusLastItem is omitted', () => {
    const items = [mk('a'), mk('b')];
    render(
      <TaskList
        items={items}
        editable
        onUpdateItem={vi.fn()}
        onRemoveItem={vi.fn()}
      />,
    );
    const rows = screen.getAllByTestId('task-item-row');
    for (const r of rows) expect(r.dataset.autoFocus).toBe('false');
  });

  it('only the last row receives an onDidAutoFocus callback (non-last rows get undefined)', () => {
    const focusLastItem = { current: true } as MutableRefObject<boolean>;
    const items = [mk('a'), mk('b'), mk('c')];
    render(
      <TaskList
        items={items}
        editable
        onUpdateItem={vi.fn()}
        onRemoveItem={vi.fn()}
        focusLastItem={focusLastItem}
      />,
    );
    expect(captures[0].onDidAutoFocus).toBeUndefined();
    expect(captures[1].onDidAutoFocus).toBeUndefined();
    expect(typeof captures[2].onDidAutoFocus).toBe('function');
  });

  it("calling the last row's onDidAutoFocus flips focusLastItem.current back to false", () => {
    const focusLastItem = { current: true } as MutableRefObject<boolean>;
    const items = [mk('only')];
    render(
      <TaskList
        items={items}
        editable
        onUpdateItem={vi.fn()}
        onRemoveItem={vi.fn()}
        focusLastItem={focusLastItem}
      />,
    );
    const row = screen.getByTestId('task-item-row');
    expect(row.dataset.autoFocus).toBe('true');
    expect(focusLastItem.current).toBe(true);
    captures[0].onDidAutoFocus?.();
    expect(focusLastItem.current).toBe(false);
  });

});
