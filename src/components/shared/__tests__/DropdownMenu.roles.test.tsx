import { useRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { DropdownMenu } from '../DropdownMenu';
import { InlinePopover } from '../InlinePopover';

// G150-7: a menu and its submenu flyout are menus, never dialogs. The panel
// around each `role="menu"` is a plain positioned container
// (InlinePopover `panelRole="none"`), and focus handling is unchanged.
describe('DropdownMenu panel roles (G150-7)', () => {
  const sections = [{
    items: [
      { label: 'Rename', onSelect: vi.fn() },
      { label: 'Download as…', 'data-testid': 'download', submenu: [{ items: [{ label: 'PDF', onSelect: vi.fn(), 'data-testid': 'pdf' }] }] },
    ],
  }];

  it('an open menu, and an open submenu, put no dialog in the page', async () => {
    render(<DropdownMenu trigger="⋯" triggerLabel="More" sections={sections} />);
    fireEvent.click(screen.getByRole('button', { name: 'More' }));
    expect(screen.queryAllByRole('dialog')).toHaveLength(0);
    expect(document.querySelector('[data-ui-dialog]')).toBeNull();
    const panel = screen.getByTestId('dropdown-menu');
    expect(panel).not.toHaveAttribute('role');
    expect(panel).toHaveAttribute('data-ui-popover', 'menu');
    expect(screen.getByRole('menu', { name: 'More' })).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('download'));
    expect(screen.getAllByRole('menu')).toHaveLength(2);
    expect(screen.getByTestId('dropdown-menu-submenu')).not.toHaveAttribute('role');
    expect(screen.queryAllByRole('dialog')).toHaveLength(0);
  });

  it('keeps focus handling: first item focused on open, Escape closes and returns focus to the trigger', async () => {
    render(<DropdownMenu trigger="⋯" triggerLabel="More" sections={sections} />);
    const trigger = screen.getByRole('button', { name: 'More' });
    trigger.focus();
    fireEvent.click(trigger);
    await act(async () => { await Promise.resolve(); });
    expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
    expect(screen.getByRole('menuitem', { name: 'Download as…' })).toHaveFocus();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
    expect(trigger).toHaveFocus();
  });
});

describe('InlinePopover panelRole (G150-7)', () => {
  function Host({ panelRole }: { panelRole?: 'dialog' | 'none' }) {
    const ref = useRef<HTMLButtonElement | null>(null);
    return (
      <>
        <button ref={ref}>anchor</button>
        <InlinePopover trigger={ref} open onClose={() => {}} panelRole={panelRole} aria-label="Help">
          <button>inside</button>
        </InlinePopover>
      </>
    );
  }
  it('defaults to a named dialog (unchanged), and marks every panel data-ui-popover', () => {
    render(<Host />);
    const dialog = screen.getByRole('dialog', { name: 'Help' });
    expect(dialog).toHaveAttribute('data-ui-dialog', 'popover');
    expect(dialog).toHaveAttribute('data-ui-popover', 'popover');
  });
  it('none: no role, no name, no data-ui-dialog; the panel still dismisses on Escape', () => {
    const onClose = vi.fn();
    function Closable() {
      const ref = useRef<HTMLButtonElement | null>(null);
      return (<><button ref={ref}>anchor</button><InlinePopover trigger={ref} open onClose={onClose} panelRole="none" aria-label="Help"><button>inside</button></InlinePopover></>);
    }
    render(<Closable />);
    const panel = screen.getByTestId('inline-popover');
    expect(panel).not.toHaveAttribute('role');
    expect(panel).not.toHaveAttribute('aria-label');
    expect(panel).not.toHaveAttribute('data-ui-dialog');
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
