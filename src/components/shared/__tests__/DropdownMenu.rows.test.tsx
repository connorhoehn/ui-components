import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DropdownMenu } from '../DropdownMenu';

describe('DropdownMenu rows a spec can address', () => {
  it('carries test ids, a trailing hint, and a scrolling group', () => {
    const onPrint = vi.fn();
    render(
      <DropdownMenu
        trigger="⋯"
        triggerLabel="More"
        sections={[
          { 'data-testid': 'rooms', scroll: true, items: Array.from({ length: 9 }, (_, i) => ({ label: `#room-${i}`, onSelect: () => {}, 'data-testid': `room-${i}` })) },
          { items: [{ label: 'Print', trailing: '⌘P', onSelect: onPrint, 'data-testid': 'print' }] },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'More' }));
    expect(screen.getByTestId('rooms').className).toContain('uic-menu-group-scroll');
    expect(screen.getByTestId('room-3')).toBeInTheDocument();
    const print = screen.getByTestId('print');
    expect(print.textContent).toContain('⌘P');
    expect(print.closest('[role="menu"]')!.className).toContain('uic-menu-scroll');
    fireEvent.click(print);
    expect(onPrint).toHaveBeenCalledTimes(1);
  });
});
