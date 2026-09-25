import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownMenu, type DropdownMenuSection } from '../DropdownMenu';

function renderMenu(sections: DropdownMenuSection[]) {
  render(<DropdownMenu trigger="Workflow ▾" triggerLabel="Workflow" sections={sections} />);
  fireEvent.click(screen.getByRole('button', { name: 'Workflow' }));
}

describe('DropdownMenu disabled items', () => {
  it('marks the row aria-disabled, keeps it focusable, and shows the reason as its secondary line', () => {
    renderMenu([{ items: [
      { label: 'Unblock this item', description: 'Clears the blocker', disabled: true, disabledReason: 'Nothing is blocked', onSelect: () => {} },
    ] }]);
    const row = screen.getByRole('menuitem', { name: 'Unblock this item' });
    expect(row).toHaveAttribute('aria-disabled', 'true');
    expect(row).not.toHaveAttribute('disabled');
    expect(row).toHaveAttribute('title', 'Nothing is blocked');
    expect(row).toHaveAccessibleDescription('Nothing is blocked');
    expect(row).toHaveTextContent('Nothing is blocked');
    // The reason replaces the description rather than stacking under it.
    expect(row).not.toHaveTextContent('Clears the blocker');
    expect(row.className).toContain('text-[var(--color-text-tertiary)]');
    row.focus();
    expect(row).toHaveFocus();
  });

  it('never runs onSelect on click, Enter or Space, and the menu stays open', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderMenu([{ items: [{ label: 'Unblock this item', disabled: true, disabledReason: 'Nothing is blocked', onSelect }] }]);
    const row = screen.getByRole('menuitem', { name: 'Unblock this item' });
    await user.click(row);
    row.focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.getByRole('menu', { name: 'Workflow' })).toBeInTheDocument();
  });

  it('arrow keys land on disabled and checkbox rows without activating them', async () => {
    const user = userEvent.setup();
    const onPlan = vi.fn();
    const onUnblock = vi.fn();
    renderMenu([{ items: [
      { label: 'Plan', onSelect: onPlan },
      { label: 'Unblock', disabled: true, disabledReason: 'Nothing is blocked', onSelect: onUnblock },
      { label: 'Notify', checked: false, onSelect: () => {} },
    ] }]);
    const plan = screen.getByRole('menuitem', { name: 'Plan' });
    plan.focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Unblock' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onUnblock).not.toHaveBeenCalled();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitemcheckbox', { name: 'Notify' })).toHaveFocus();
  });

  it('applies to checkbox rows too', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    renderMenu([{ items: [{ label: 'Notify SMEs', checked: true, disabled: true, disabledReason: 'No SMEs attached', onSelect }] }]);
    const row = screen.getByRole('menuitemcheckbox', { name: 'Notify SMEs' });
    expect(row).toHaveAttribute('aria-disabled', 'true');
    expect(row).toHaveAttribute('aria-checked', 'true');
    expect(row).toHaveAccessibleDescription('No SMEs attached');
    await user.click(row);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('a disabled submenu row does not open its flyout on hover, click, Enter or ArrowRight', async () => {
    const user = userEvent.setup();
    const onAgent = vi.fn();
    renderMenu([{ items: [{
      label: 'Hand off to', disabled: true, disabledReason: 'Needs an active sprint',
      submenu: [{ items: [{ label: 'An agent', onSelect: onAgent }] }],
    }] }]);
    const row = screen.getByRole('menuitem', { name: 'Hand off to' });
    expect(row).not.toHaveAttribute('aria-haspopup');
    await user.hover(row);
    await user.click(row);
    row.focus();
    await user.keyboard('{ArrowRight}{Enter}');
    expect(screen.queryByRole('menuitem', { name: 'An agent' })).toBeNull();
    expect(onAgent).not.toHaveBeenCalled();
  });

  it('a disabled row inside a flyout is inert while its enabled sibling still works', async () => {
    const user = userEvent.setup();
    const onPdf = vi.fn();
    const onDocx = vi.fn();
    renderMenu([{ items: [{
      label: 'Download as',
      submenu: [{ items: [
        { label: 'PDF', onSelect: onPdf },
        { label: 'Word', disabled: true, disabledReason: 'Not for slides', onSelect: onDocx },
      ] }],
    }] }]);
    await user.click(screen.getByRole('menuitem', { name: 'Download as' }));
    const word = await screen.findByRole('menuitem', { name: 'Word' });
    expect(word).toHaveAttribute('aria-disabled', 'true');
    await user.click(word);
    expect(onDocx).not.toHaveBeenCalled();
    await user.click(screen.getByRole('menuitem', { name: 'PDF' }));
    expect(onPdf).toHaveBeenCalledTimes(1);
  });

  it('enabled rows carry no disabled attributes and keep their description', () => {
    renderMenu([{ items: [{ label: 'Plan', description: 'Next two weeks', onSelect: () => {} }] }]);
    const row = screen.getByRole('menuitem', { name: /Plan/ });
    expect(row).not.toHaveAttribute('aria-disabled');
    expect(row).not.toHaveAttribute('aria-describedby');
    expect(row).toHaveTextContent('Next two weeks');
  });
});
