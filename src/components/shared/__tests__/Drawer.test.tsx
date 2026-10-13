import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Drawer } from '../Drawer';

describe('Drawer', () => {
  it('marks a floating drawer, modal or not, so an audit can find a record popped out of its page', () => {
    const { rerender } = render(<Drawer open onClose={() => {}} title="History">body</Drawer>);
    expect(screen.getByRole('dialog', { name: 'History' })).toHaveAttribute('data-ui-dialog', 'drawer');
    rerender(<Drawer open onClose={() => {}} title="History" modal={false}>body</Drawer>);
    expect(screen.getByRole('complementary', { name: 'History' })).toHaveAttribute('data-ui-dialog', 'drawer');
  });
  it('renders nothing when closed', () => {
    render(<Drawer open={false} onClose={() => {}} title="Details">body</Drawer>);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders a modal dialog named by the title, into document.body', () => {
    render(<Drawer open onClose={() => {}} title="Run details">body</Drawer>);
    const dialog = screen.getByRole('dialog', { name: 'Run details' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText('body')).toBeInTheDocument();
  });

  it('closes on Escape and on backdrop click, not on panel click', () => {
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose} title="T" data-testid="drawer">body</Drawer>);
    fireEvent.click(screen.getByText('body'));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('drawer').firstElementChild as Element);
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('focuses the first focusable element on open', () => {
    render(
      <Drawer open onClose={() => {}} title="T">
        <button>first action</button>
      </Drawer>,
    );
    // The header close button comes before the body button in DOM order.
    expect(document.activeElement).toHaveAccessibleName('Close');
  });

  it('renders subtitle and footer slots', () => {
    render(
      <Drawer open onClose={() => {}} title="T" subtitle="sub" footer={<div>foot</div>}>
        b
      </Drawer>,
    );
    expect(screen.getByText('sub')).toBeInTheDocument();
    expect(screen.getByText('foot')).toBeInTheDocument();
  });

  it('honors the width prop', () => {
    render(<Drawer open onClose={() => {}} title="T" width={320}>b</Drawer>);
    expect(screen.getByRole('dialog').style.width).toBe('320px');
  });

  it('renders no header when the body brings its own — even floating', () => {
    // Same rule as the docked form: a body with its own header (a
    // ChannelHeader, say) should not get a second, competing close control.
    render(
      <Drawer open onClose={() => {}} aria-label="Chat">
        <div>own header + body</div>
      </Drawer>,
    );
    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
    expect(screen.getByRole('dialog', { name: 'Chat' })).toBeInTheDocument();
  });

  it('honors closeLabel for the close button and its aria-label', () => {
    render(
      <Drawer open onClose={() => {}} title="T" closeLabel="Close panel">
        b
      </Drawer>,
    );
    expect(screen.getByRole('button', { name: 'Close panel' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
  });

  it('modal={false} drops role/aria-modal and Escape no longer closes it', () => {
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} title="T" modal={false}>
        b
      </Drawer>,
    );
    expect(screen.queryByRole('dialog')).toBeNull();
    const panel = screen.getByRole('complementary', { name: 'T' });
    expect(panel).not.toHaveAttribute('aria-modal');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
    // Backdrop click still closes — `modal` only governs dialog semantics.
    fireEvent.click(panel.previousElementSibling as Element);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('trapFocus={false} does not move focus into the panel on open', () => {
    const outside = document.createElement('button');
    outside.textContent = 'outside trigger';
    document.body.appendChild(outside);
    outside.focus();
    render(
      <Drawer open onClose={() => {}} title="T" trapFocus={false}>
        <button>first action</button>
      </Drawer>,
    );
    expect(document.activeElement).toBe(outside);
    document.body.removeChild(outside);
  });

  it('backdrop={false} renders no backdrop and disables click-to-close', () => {
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} title="T" backdrop={false} data-testid="drawer">
        b
      </Drawer>,
    );
    expect(document.querySelector('.bg-black\\/30')).toBeNull();
    // The panel is now the fixed container's only child.
    const container = screen.getByTestId('drawer');
    expect(container.children).toHaveLength(1);
    expect(container.firstElementChild).toBe(screen.getByRole('dialog'));
    // ...and the wrapper must not swallow clicks meant for the page behind
    // it: with no backdrop there is nothing there that should be catching
    // them, so the layer is transparent to the pointer and only the panel
    // takes events back.
    expect(container.className).toContain('pointer-events-none');
    expect(screen.getByRole('dialog').className).toContain('pointer-events-auto');
  });

  it('keeps the wrapper clickable when the backdrop IS drawn', () => {
    render(
      <Drawer open onClose={() => {}} title="T" data-testid="drawer">
        b
      </Drawer>,
    );
    const container = screen.getByTestId('drawer');
    expect(container.className).not.toContain('pointer-events-none');
    expect(screen.getByRole('dialog').className).not.toContain('pointer-events-auto');
  });
});
