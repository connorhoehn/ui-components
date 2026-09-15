import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DockedAside, FloatingCard, PinnedSlot } from '../DockedAside';

describe('DockedAside, FloatingCard, PinnedSlot', () => {
  it('docks a titled, closable column at its own geometry', () => {
    const onClose = vi.fn();
    render(<DockedAside title="Comments" onClose={onClose} offsetTop={120} width={400}>body</DockedAside>);
    const aside = screen.getByTestId('docked-aside');
    expect(aside.style.width).toBe('400px');
    expect(aside.style.marginTop).toBe('120px');
    expect(screen.getByText('Comments')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('a floating card sits in its corner with a width and a height cap', () => {
    render(<FloatingCard width={160} maxHeight={280}>toc</FloatingCard>);
    const card = screen.getByTestId('floating-card');
    expect(card.getAttribute('data-corner')).toBe('bottom-right');
    expect(card.style.maxHeight).toBe('280px');
  });

  it('a pinned slot keeps its spacer width and fixes the inner slot only when pinned', () => {
    const { rerender } = render(<PinnedSlot width={240} pinned={false} slotId="slot" />);
    expect(screen.getByTestId('pinned-slot').style.width).toBe('240px');
    expect(document.getElementById('slot')!.getAttribute('data-pinned')).toBe('false');
    rerender(<PinnedSlot width={240} pinned top={146} left={80} slotId="slot" />);
    const inner = document.getElementById('slot')!;
    expect(inner.getAttribute('data-pinned')).toBe('true');
    expect(inner.style.top).toBe('146px');
    expect(inner.style.left).toBe('80px');
  });
});
