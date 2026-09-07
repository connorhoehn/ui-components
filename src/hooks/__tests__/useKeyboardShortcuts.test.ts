import { renderHook } from '@testing-library/react';
import { useKeyboardShortcuts } from '../useKeyboardShortcuts';

describe('useKeyboardShortcuts', () => {
  it('calls handler when matching key is pressed', () => {
    const handler = vi.fn();
    renderHook(() =>
      useKeyboardShortcuts([{ key: 'k', handler }])
    );

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('is case-insensitive for key matching', () => {
    const handler = vi.fn();
    renderHook(() =>
      useKeyboardShortcuts([{ key: 'K', handler }])
    );

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('supports meta/ctrl modifier', () => {
    const handler = vi.fn();
    renderHook(() =>
      useKeyboardShortcuts([{ key: 's', meta: true, handler }])
    );

    // Without meta - should not fire
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 's' }));
    expect(handler).not.toHaveBeenCalled();

    // With metaKey - should fire
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 's', metaKey: true }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('supports ctrlKey as alternative to metaKey', () => {
    const handler = vi.fn();
    renderHook(() =>
      useKeyboardShortcuts([{ key: 's', meta: true, handler }])
    );

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 's', ctrlKey: true }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('supports shift modifier', () => {
    const handler = vi.fn();
    renderHook(() =>
      useKeyboardShortcuts([{ key: 'p', shift: true, handler }])
    );

    // Without shift - should not fire
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'p' }));
    expect(handler).not.toHaveBeenCalled();

    // With shift - should fire
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'p', shiftKey: true }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('supports alt modifier', () => {
    const handler = vi.fn();
    renderHook(() =>
      useKeyboardShortcuts([{ key: 'n', alt: true, handler }])
    );

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'n' }));
    expect(handler).not.toHaveBeenCalled();

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', altKey: true }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not fire when typing in an input element', () => {
    const handler = vi.fn();
    renderHook(() =>
      useKeyboardShortcuts([{ key: 'k', handler }])
    );

    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    const event = new KeyboardEvent('keydown', { key: 'k', bubbles: true });
    Object.defineProperty(event, 'target', { value: input });
    window.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
    document.body.removeChild(input);
  });

  it('prevents default by default', () => {
    const handler = vi.fn();
    renderHook(() =>
      useKeyboardShortcuts([{ key: 'k', handler }])
    );

    const event = new KeyboardEvent('keydown', { key: 'k', cancelable: true });
    window.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('does not prevent default when preventDefault is false', () => {
    const handler = vi.fn();
    renderHook(() =>
      useKeyboardShortcuts([{ key: 'Escape', handler, preventDefault: false }])
    );

    const event = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
    window.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });
  // ---------------------------------------------------------------------
  // Ported from the app's copy of this suite when that fork was deleted.
  // These five cases had no equivalent here: the textarea half of the
  // editable-target guard, the negative control that proves a plain div
  // still fires, listener teardown, and the multi-shortcut dispatch.
  // ---------------------------------------------------------------------

  it('does not fire when typing in a textarea', () => {
    const handler = vi.fn();
    renderHook(() => useKeyboardShortcuts([{ key: 'k', handler }]));

    const ta = document.createElement('textarea');
    document.body.appendChild(ta);

    const event = new KeyboardEvent('keydown', { key: 'k', bubbles: true });
    Object.defineProperty(event, 'target', { value: ta });
    window.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
    document.body.removeChild(ta);
  });

  it('still fires when the target is a plain, non-editable element', () => {
    const handler = vi.fn();
    renderHook(() => useKeyboardShortcuts([{ key: 'k', handler }]));

    const div = document.createElement('div');
    document.body.appendChild(div);

    const event = new KeyboardEvent('keydown', { key: 'k', bubbles: true });
    Object.defineProperty(event, 'target', { value: div });
    window.dispatchEvent(event);

    expect(handler).toHaveBeenCalledTimes(1);
    document.body.removeChild(div);
  });

  it('stops calling the handler after unmount', () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() =>
      useKeyboardShortcuts([{ key: 'k', handler }])
    );

    unmount();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));

    expect(handler).not.toHaveBeenCalled();
  });

  it('routes each key to its own handler', () => {
    const handlerA = vi.fn();
    const handlerB = vi.fn();
    renderHook(() =>
      useKeyboardShortcuts([
        { key: 'a', handler: handlerA },
        { key: 'b', handler: handlerB },
      ])
    );

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    expect(handlerA).toHaveBeenCalledTimes(1);
    expect(handlerB).not.toHaveBeenCalled();

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
    expect(handlerB).toHaveBeenCalledTimes(1);
  });

  it('fires only the first shortcut registered for a key', () => {
    const first = vi.fn();
    const second = vi.fn();
    renderHook(() =>
      useKeyboardShortcuts([
        { key: 'z', handler: first },
        { key: 'z', handler: second },
      ])
    );

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'z' }));
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).not.toHaveBeenCalled();
  });
});
