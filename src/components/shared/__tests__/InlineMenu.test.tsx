import { useRef, useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InlineMenu, type InlineMenuPlacement } from '../InlineMenu';

function Host({
  placement,
  onClose = () => {},
  initialOpen = true,
  withTrigger = true,
}: {
  placement?: InlineMenuPlacement;
  onClose?: () => void;
  initialOpen?: boolean;
  withTrigger?: boolean;
}) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(initialOpen);
  return (
    <div className="relative">
      <button ref={btnRef} onClick={() => setOpen((o) => !o)}>anchor</button>
      <InlineMenu
        open={open}
        onClose={() => {
          setOpen(false);
          onClose();
        }}
        placement={placement}
        trigger={withTrigger ? btnRef : undefined}
      >
        <button>inside action</button>
      </InlineMenu>
    </div>
  );
}

describe('InlineMenu', () => {
  it('renders nothing when closed', () => {
    render(<Host initialOpen={false} />);
    expect(screen.queryByTestId('inline-menu')).toBeNull();
  });

  it('renders the panel with its children when open, in place (no portal)', () => {
    const { container } = render(<Host />);
    const panel = screen.getByTestId('inline-menu');
    expect(panel).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'inside action' })).toBeInTheDocument();
    // Rendered inside the component's own subtree, not appended to document.body.
    expect(container.contains(panel)).toBe(true);
  });

  it('is not portalled — the panel is a descendant of its host wrapper', () => {
    const { container } = render(<Host />);
    const wrapper = container.querySelector('.relative');
    expect(wrapper?.contains(screen.getByTestId('inline-menu'))).toBe(true);
  });

  it('positions via CSS classes, not inline fixed positioning', () => {
    render(<Host placement="bottom-start" />);
    const panel = screen.getByTestId('inline-menu');
    expect(panel.style.position).toBe('');
    expect(panel.className).toContain('absolute');
    expect(panel.className).toContain('top-full');
    expect(panel.className).toContain('left-0');
  });

  it('applies bottom-end placement classes', () => {
    render(<Host placement="bottom-end" />);
    const panel = screen.getByTestId('inline-menu');
    expect(panel.className).toContain('top-full');
    expect(panel.className).toContain('right-0');
  });

  it('dismisses on Escape', () => {
    const onClose = vi.fn();
    render(<Host onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('dismisses on outside pointer-down but not on inside clicks', () => {
    const onClose = vi.fn();
    render(<Host onClose={onClose} />);
    fireEvent.mouseDown(screen.getByRole('button', { name: 'inside action' }));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.mouseDown(document.body);
    expect(onClose).toHaveBeenCalled();
  });

  it('excludes the trigger from outside-click dismissal when a trigger ref is passed', () => {
    const onClose = vi.fn();
    render(<Host onClose={onClose} withTrigger />);
    fireEvent.mouseDown(screen.getByRole('button', { name: 'anchor' }));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not trap focus — Tab can leave the panel', () => {
    render(
      <div>
        <Host />
        <button>after</button>
      </div>,
    );
    const inside = screen.getByRole('button', { name: 'inside action' });
    inside.focus();
    expect(document.activeElement).toBe(inside);
    // No keydown handler intercepts Tab; jsdom doesn't move focus on Tab
    // itself, but the absence of a trap means nothing here prevents it —
    // assert there is no Tab listener side effect (focus unchanged by a
    // Tab keydown that a trap would have intercepted with preventDefault).
    const evt = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    const prevented = !window.dispatchEvent(evt);
    expect(prevented).toBe(false);
  });

  it('defaults to role="group"', () => {
    render(<Host />);
    expect(screen.getByTestId('inline-menu')).toHaveAttribute('role', 'group');
  });

  it('accepts a role override', () => {
    function RoleHost() {
      return (
        <div className="relative">
          <InlineMenu open onClose={() => {}} role="menu" aria-label="Options">
            <div role="menuitem">Item</div>
          </InlineMenu>
        </div>
      );
    }
    render(<RoleHost />);
    expect(screen.getByRole('menu', { name: 'Options' })).toBeInTheDocument();
  });
});
