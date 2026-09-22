// `docked` is the same chrome rendered INLINE — no portal, no backdrop, no
// focus trap. It exists so a host stops keeping a local `Panel.tsx` beside the
// library's Drawer: two components meant to look identical, maintained apart,
// drift.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Drawer from '../Drawer';

describe('Drawer docked', () => {
  it('renders where it is placed, not in a portal', () => {
    const { container } = render(
      <Drawer open docked onClose={() => {}} title="My Mentions" data-testid="p">
        body
      </Drawer>,
    );
    expect(container.querySelector('[data-testid="p"]')).not.toBeNull();
    expect(document.body.querySelector(':scope > [data-testid="p"]')).toBeNull();
  });

  it('draws no backdrop', () => {
    render(<Drawer open docked onClose={vi.fn()} title="Panel">body</Drawer>);
    expect(document.querySelector('.bg-black\\/30')).toBeNull();
  });

  it('is a complementary region, not a modal dialog', () => {
    render(<Drawer open docked onClose={() => {}} title="My Mentions">body</Drawer>);
    const panel = screen.getByRole('complementary', { name: 'My Mentions' });
    expect(panel).not.toHaveAttribute('aria-modal');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('does not close on Escape — it is not an overlay', () => {
    const onClose = vi.fn();
    render(<Drawer open docked onClose={onClose} title="Panel">body</Drawer>);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('still closes from the header button', () => {
    const onClose = vi.fn();
    render(<Drawer open docked onClose={onClose} title="Panel">body</Drawer>);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('takes an explicit width and fills its parent without one', () => {
    const { rerender } = render(
      <Drawer open docked width={340} onClose={() => {}} title="Panel" data-testid="p">body</Drawer>,
    );
    expect(screen.getByTestId('p')).toHaveStyle({ width: '340px' });
    rerender(<Drawer open docked onClose={() => {}} title="Panel" data-testid="p">body</Drawer>);
    expect(screen.getByTestId('p').style.width).toBe('');
    expect(screen.getByTestId('p').className).toContain('w-full');
  });

  it('scrolls the body, and bodyClassName overrides its padding', () => {
    const { container } = render(
      <Drawer open docked onClose={() => {}} title="Panel" bodyClassName="p-2">
        body
      </Drawer>,
    );
    const body = container.querySelector('.overflow-y-auto') as HTMLElement;
    expect(body.className).toContain('overflow-y-auto');
    expect(body.className).toContain('p-2');
    expect(body.className).not.toContain('p-5');
  });

  it('renders header actions beside the close button', () => {
    render(
      <Drawer open docked onClose={() => {}} title="Panel" actions={<button type="button">Open full page</button>}>
        body
      </Drawer>,
    );
    expect(screen.getByRole('button', { name: 'Open full page' })).toBeInTheDocument();
  });

  it('is a bare width shell when there is nothing to put in a header', () => {
    // DocumentChatPanel's case: the contents bring their own ChannelHeader, so
    // a lone close button above them would be a second, competing header.
    render(<Drawer open docked width={360} onClose={() => {}} aria-label="Chat">body</Drawer>);
    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
    expect(screen.getByRole('complementary', { name: 'Chat' })).toBeInTheDocument();
  });

  it('renders a footer when given one', () => {
    render(
      <Drawer open docked onClose={() => {}} title="Panel" footer={<span>3 items</span>}>
        body
      </Drawer>,
    );
    expect(screen.getByText('3 items')).toBeInTheDocument();
  });

  it('renders nothing when closed, same as the floating form', () => {
    const { container } = render(
      <Drawer open={false} docked onClose={() => {}} title="Panel">body</Drawer>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('uses the same surface and border tokens as the floating panel', () => {
    render(<Drawer open docked onClose={() => {}} title="Panel" data-testid="p">body</Drawer>);
    const cls = screen.getByTestId('p').className;
    expect(cls).toContain('bg-surface');
    expect(cls).toContain('border-[var(--color-border)]');
  });
});
