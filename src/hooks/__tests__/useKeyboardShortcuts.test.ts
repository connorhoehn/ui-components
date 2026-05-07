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
});
