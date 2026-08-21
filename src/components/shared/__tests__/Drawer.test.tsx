import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Drawer } from '../Drawer';

describe('Drawer', () => {
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
});
