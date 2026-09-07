import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useClickOutside } from '../useClickOutside';

describe('useClickOutside', () => {
  it('calls handler when clicking outside referenced element', () => {
    const handler = vi.fn();
    const div = document.createElement('div');
    document.body.appendChild(div);

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(div);
      useClickOutside(ref, handler);
    });

    // Click outside the element (on document body)
    const event = new MouseEvent('mousedown', { bubbles: true });
    document.body.dispatchEvent(event);

    expect(handler).toHaveBeenCalledTimes(1);
    document.body.removeChild(div);
  });

  it('does not call handler when clicking inside referenced element', () => {
    const handler = vi.fn();
    const div = document.createElement('div');
    const child = document.createElement('span');
    div.appendChild(child);
    document.body.appendChild(div);

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(div);
      useClickOutside(ref, handler);
    });

    // Click inside the element
    const event = new MouseEvent('mousedown', { bubbles: true });
    child.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
    document.body.removeChild(div);
  });

  it('does not call handler when disabled', () => {
    const handler = vi.fn();
    const div = document.createElement('div');
    document.body.appendChild(div);

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(div);
      useClickOutside(ref, handler, false);
    });

    const event = new MouseEvent('mousedown', { bubbles: true });
    document.body.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
    document.body.removeChild(div);
  });
  // ---------------------------------------------------------------------
  // Ported from the app's copy of this suite when that fork was deleted.
  // `enabled` toggling and listener teardown had no coverage here.
  // ---------------------------------------------------------------------

  it('re-attaches the listener when enabled flips from false to true', () => {
    const handler = vi.fn();
    const div = document.createElement('div');
    document.body.appendChild(div);

    const { rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => {
        const ref = useRef<HTMLDivElement>(div);
        useClickOutside(ref, handler, enabled);
      },
      { initialProps: { enabled: false } },
    );

    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(handler).not.toHaveBeenCalled();

    rerender({ enabled: true });
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);

    document.body.removeChild(div);
  });

  it('removes the listener on unmount', () => {
    const handler = vi.fn();
    const div = document.createElement('div');
    document.body.appendChild(div);

    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(div);
      useClickOutside(ref, handler);
    });

    unmount();
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(handler).not.toHaveBeenCalled();
    document.body.removeChild(div);
  });
});
