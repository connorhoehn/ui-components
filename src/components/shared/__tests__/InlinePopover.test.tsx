import { useRef, useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InlinePopover, type InlinePopoverPlacement } from '../InlinePopover';

function Host({
  placement,
  onClose = () => {},
  initialOpen = true,
}: {
  placement?: InlinePopoverPlacement;
  onClose?: () => void;
  initialOpen?: boolean;
}) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(initialOpen);
  return (
    <div>
      <button ref={btnRef} onClick={() => setOpen(true)}>anchor</button>
      <InlinePopover
        trigger={btnRef}
        open={open}
        onClose={() => {
          setOpen(false);
          onClose();
        }}
        placement={placement}
      >
        <button>inside action</button>
      </InlinePopover>
    </div>
  );
}

describe('InlinePopover', () => {
  it('renders nothing when closed', () => {
    render(<Host initialOpen={false} />);
    expect(screen.queryByTestId('inline-popover')).toBeNull();
  });

  it('renders the panel with its children when open', () => {
    render(<Host />);
    expect(screen.getByTestId('inline-popover')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'inside action' })).toBeInTheDocument();
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
    fireEvent.pointerDown(screen.getByRole('button', { name: 'inside action' }));
    fireEvent.mouseDown(screen.getByRole('button', { name: 'inside action' }));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.pointerDown(document.body);
    fireEvent.mouseDown(document.body);
    expect(onClose).toHaveBeenCalled();
  });

  it('positions fixed relative to the trigger', () => {
    render(<Host placement="bottom-start" />);
    const panel = screen.getByTestId('inline-popover');
    expect(panel.style.position).toBe('fixed');
  });
});
