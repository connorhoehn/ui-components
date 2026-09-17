// The bar is ONE tab stop, not eight.
//
// Every control used to sit in the sequential tab order. Measured on a seeded
// #general: 7 messages, 8 controls each, 56 presses to reach the composer —
// and a hundred-message channel would be eight hundred. Reachable, but the
// transcript was not traversable. It is a WAI-ARIA toolbar now: one stop,
// arrow keys within.
import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MessageActionBar } from '../MessageActionBar';

afterEach(cleanup);

const full = () => render(
  <MessageActionBar
    quickReactions={['👍', '🎉']}
    onReact={vi.fn()}
    onReply={vi.fn()}
    onTogglePin={vi.fn()}
    onCopyLink={vi.fn()}
  />,
);

const buttons = () => within(screen.getByRole('toolbar')).getAllByRole('button');

describe('MessageActionBar — one tab stop', () => {
  it('announces itself as a toolbar', () => {
    full();
    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-label', 'Message actions');
    expect(screen.getByRole('toolbar')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('puts exactly one control in the tab order however many there are', () => {
    full();
    const inOrder = buttons().filter((b) => b.getAttribute('tabindex') === '0');
    expect(buttons().length).toBe(5);
    expect(inOrder).toHaveLength(1);
    expect(inOrder[0]).toBe(buttons()[0]);
  });

  it('moves along the bar with the arrow keys', () => {
    full();
    const bar = screen.getByRole('toolbar');
    buttons()[0]!.focus();
    fireEvent.keyDown(bar, { key: 'ArrowRight' });
    expect(buttons()[1]).toHaveFocus();
    expect(buttons()[1]).toHaveAttribute('tabindex', '0');
    expect(buttons()[0]).toHaveAttribute('tabindex', '-1');
    fireEvent.keyDown(bar, { key: 'ArrowLeft' });
    expect(buttons()[0]).toHaveFocus();
  });

  it('wraps at both ends, so the bar has no dead edge', () => {
    full();
    const bar = screen.getByRole('toolbar');
    buttons()[0]!.focus();
    fireEvent.keyDown(bar, { key: 'ArrowLeft' });
    expect(buttons()[buttons().length - 1]).toHaveFocus();
    fireEvent.keyDown(bar, { key: 'ArrowRight' });
    expect(buttons()[0]).toHaveFocus();
  });

  it('jumps to the ends with Home and End', () => {
    full();
    const bar = screen.getByRole('toolbar');
    buttons()[0]!.focus();
    fireEvent.keyDown(bar, { key: 'End' });
    expect(buttons()[buttons().length - 1]).toHaveFocus();
    fireEvent.keyDown(bar, { key: 'Home' });
    expect(buttons()[0]).toHaveFocus();
  });

  it('leaves up and down alone, so the page still scrolls', () => {
    full();
    const bar = screen.getByRole('toolbar');
    buttons()[0]!.focus();
    const down = fireEvent.keyDown(bar, { key: 'ArrowDown' });
    // fireEvent returns false when preventDefault was called.
    expect(down).toBe(true);
    expect(buttons()[0]).toHaveFocus();
  });

  it('remembers where you were, so tabbing back in does not restart', () => {
    full();
    fireEvent.focus(buttons()[3]!);
    expect(buttons()[3]).toHaveAttribute('tabindex', '0');
    expect(buttons()[0]).toHaveAttribute('tabindex', '-1');
  });

  it('keeps a tab stop when controls disappear', () => {
    // The stop had been on Copy link; a re-render without it must not leave
    // the index pointing past the end, which would drop the whole bar out of
    // the tab order.
    const { rerender } = full();
    fireEvent.focus(buttons()[4]!);
    rerender(
      <MessageActionBar quickReactions={['👍', '🎉']} onReact={vi.fn()} onReply={vi.fn()} />,
    );
    expect(buttons().filter((b) => b.getAttribute('tabindex') === '0')).toHaveLength(1);
  });

  it('still clicks through to the action it names', () => {
    const onReply = vi.fn();
    render(<MessageActionBar onReact={vi.fn()} onReply={onReply} />);
    fireEvent.click(screen.getByLabelText('Reply'));
    expect(onReply).toHaveBeenCalled();
  });
});
