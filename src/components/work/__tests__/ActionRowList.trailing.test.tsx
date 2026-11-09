// 2.509.0 — `ActionRowItem.trailing`: a row's own controls beside its button,
// never inside it.
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ActionRowList, type ActionRowItem } from '../ActionRowList';

afterEach(cleanup);

const controls = (id: string, onApprove = () => {}) => (
  <>
    <button type="button" data-testid={`approve-${id}`} onClick={onApprove}>Approve</button>
    <button type="button" data-testid={`reject-${id}`}>Request changes</button>
  </>
);

const items = (onApprove = () => {}): ActionRowItem[] => [
  { id: 'a', title: 'Storyboard approval', description: 'Episode 2', trailing: controls('a', onApprove) },
  { id: 'b', title: 'Voice take', description: 'Dialogue' },
];

describe('ActionRowList trailing (2.509.0)', () => {
  it('renders trailing as a sibling of the row button: no button inside a button', () => {
    const { container } = render(<ActionRowList items={items()} />);
    expect(container.querySelector('button button, a button, button a')).toBeNull();
    const row = screen.getByTestId('action-row-list-open-a');
    const trailing = screen.getByTestId('action-row-list-trailing-a');
    expect(row.contains(trailing)).toBe(false);
    expect(row.parentElement).toBe(trailing.parentElement);
    expect(row.nextElementSibling).toBe(trailing);
    // The row's own text is still title, description; the controls are not part of its name.
    expect(row).not.toHaveTextContent('Approve');
    expect(trailing).toHaveTextContent('ApproveRequest changes');
  });

  it('a link row keeps its controls outside the link', () => {
    render(<ActionRowList items={[{ id: 'l', title: 'Open run', href: '#/runs/1', trailing: controls('l') }]} />);
    const link = screen.getByTestId('action-row-list-open-l');
    expect(link.tagName).toBe('A');
    expect(link.contains(screen.getByTestId('approve-l'))).toBe(false);
  });

  it('keyboard order: the row, then its trailing controls, then the next row', async () => {
    const user = userEvent.setup();
    render(<ActionRowList items={items()} />);
    await user.tab();
    expect(screen.getByTestId('action-row-list-open-a')).toHaveFocus();
    await user.tab();
    expect(screen.getByTestId('approve-a')).toHaveFocus();
    await user.tab();
    expect(screen.getByTestId('reject-a')).toHaveFocus();
    await user.tab();
    expect(screen.getByTestId('action-row-list-open-b')).toHaveFocus();
  });

  it('a press on a trailing control never opens the row; the row still opens', async () => {
    const open = vi.fn();
    const approve = vi.fn();
    const user = userEvent.setup();
    render(<ActionRowList items={items(approve)} onOpen={open} />);
    fireEvent.click(screen.getByTestId('approve-a'));
    fireEvent.click(screen.getByTestId('action-row-list-trailing-a'));
    screen.getByTestId('approve-a').focus();
    await user.keyboard('{Enter}');
    expect(approve).toHaveBeenCalledTimes(2);
    expect(open).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('action-row-list-open-a'));
    expect(open).toHaveBeenCalledTimes(1);
    expect(open.mock.calls[0][0].id).toBe('a');
  });

  it('keeps the row metrics: 14px title, 12px description with columns (the house 14/12 scale since 2.515.0), 7px row padding', () => {
    render(
      <ActionRowList
        tone="warning"
        accent="bar"
        columns={[{ id: 'state', width: 'md' }]}
        items={[{ id: 'a', title: 'Storyboard approval', description: 'Episode 2', cells: { state: 'Review' }, trailing: controls('a') }]}
      />,
    );
    const row = screen.getByTestId('action-row-list-open-a');
    const title = row.querySelector('span.truncate') as HTMLElement;
    expect(title).toHaveClass('text-sm', 'font-semibold');
    expect(title).not.toHaveClass('text-[15px]');
    expect(screen.getByTestId('action-row-description')).toHaveClass('text-xs');
    expect(row).toHaveClass('px-2.5', 'py-[3px]', 'min-h-[45px]');
    // The tint and the tone bar move to the item so they span the controls.
    const li = screen.getByTestId('action-row-list-row-a');
    expect(li).toHaveClass('bg-warning-callout', 'shadow-[inset_3px_0_0_0_var(--color-warning)]');
    expect(row).not.toHaveClass('bg-warning-callout');
  });

  it('a list with controls is a row | controls grid of subgrid items; it wraps below a 35rem list', () => {
    render(<ActionRowList items={items()} />);
    expect(screen.getByTestId('action-row-list')).toHaveClass('@container');
    const ul = screen.getByTestId('action-row-list').querySelector('ul')!;
    expect(ul).toHaveClass('grid', 'grid-cols-[minmax(0,1fr)_auto]', '@max-[35rem]:flex');
    // Both items are subgrid lines, the one without controls too, so columns line up.
    for (const id of ['a', 'b']) {
      expect(screen.getByTestId(`action-row-list-row-${id}`)).toHaveClass('col-span-full', 'grid-cols-subgrid', '@max-[35rem]:flex-wrap');
      expect(screen.getByTestId(`action-row-list-open-${id}`)).toHaveClass('col-start-1', 'flex-1', 'basis-0', 'min-w-0');
    }
    expect(screen.getByTestId('action-row-list-trailing-a')).toHaveClass('col-start-2', '@max-[35rem]:basis-full', 'shrink-0');
  });

  it('a list without trailing renders exactly as before', () => {
    render(<ActionRowList tone="warning" items={items().map(({ trailing: _t, ...item }) => item)} />);
    expect(screen.getByTestId('action-row-list')).not.toHaveClass('@container');
    expect(screen.getByTestId('action-row-list-row-b')).not.toHaveClass('grid');
    expect(screen.getByTestId('action-row-list-open-b')).toHaveClass('bg-warning-callout');
    expect(screen.queryByTestId('action-row-list-trailing-b')).toBeNull();
  });
});

describe('ActionRowList type scale (2.515.0)', () => {
  it('without columns keeps the 15px md rows; with columns every cell is 14px and meta 12px', () => {
    const { rerender } = render(<ActionRowList items={[{ id: 'a', title: 'T', meta: 'm' }]} />);
    expect(screen.getByTestId('action-row-meta')).toHaveClass('text-[13px]');
    rerender(<ActionRowList columns={[{ id: 'c', width: 'md' }]} items={[{ id: 'a', title: 'T', meta: 'm', cells: { c: 'Cell' } }]} />);
    expect(screen.getByTestId('action-row-meta')).toHaveClass('text-xs');
    expect(screen.getByText('Cell').className).toMatch(/\btext-sm\b/);
    expect(screen.getByText('Cell').className).not.toContain('text-[15px]');
  });
});
