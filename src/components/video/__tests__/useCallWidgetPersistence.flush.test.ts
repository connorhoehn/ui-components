// The debounced write used to be discarded on unmount, so a widget moved
// within `debounceMs` of the call closing never had its new position saved —
// defeating the entire point of a persistence hook.

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useCallWidgetPersistence } from '../useCallWidgetPersistence';

const KEY = 'test-widget-pos';
const defaults = { x: 0, y: 0, minimized: false } as never;

beforeEach(() => { vi.useFakeTimers(); window.localStorage.clear(); });
afterEach(() => vi.useRealTimers());

describe('useCallWidgetPersistence unmount flush', () => {
  it('persists a change made just before unmount', () => {
    const { result, unmount } = renderHook(() =>
      useCallWidgetPersistence({ persistKey: KEY, defaults, debounceMs: 200 }),
    );

    act(() => { result.current.setState({ x: 123, y: 456 }); });
    // Unmount BEFORE the debounce elapses — the closing-the-call case.
    act(() => { vi.advanceTimersByTime(50); });
    unmount();

    const stored = JSON.parse(window.localStorage.getItem(KEY) ?? '{}');
    expect(stored.x).toBe(123);
    expect(stored.y).toBe(456);
  });

  it('writes nothing when the widget is never touched', () => {
    // The debounce effect used to mark a write "pending" on its FIRST run,
    // before the user had changed anything — so the unmount flush persisted a
    // value the user never produced. Any mount/unmount pair inside the
    // debounce window triggered it, and a double-mount (StrictMode, an
    // <Activity>/Offscreen re-show, a Suspense retry) triggered it on every
    // mount. Where hydration had fallen back — corrupt JSON, a version
    // mismatch, fullscreen coerced to mini — that wrote the fallback straight
    // over the stored entry, including re-creating the key the corrupt-JSON
    // path had just deliberately removed.
    window.localStorage.setItem(KEY, '{not valid json');
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    const { unmount } = renderHook(() =>
      useCallWidgetPersistence({ persistKey: KEY, defaults, debounceMs: 200 }),
    );
    act(() => { vi.advanceTimersByTime(500); });
    unmount();
    act(() => { vi.advanceTimersByTime(500); });

    expect(setItemSpy).not.toHaveBeenCalled();
    // The corrupt entry stays cleared rather than being rewritten.
    expect(window.localStorage.getItem(KEY)).toBeNull();
    setItemSpy.mockRestore();
  });

  it('still writes normally when the debounce elapses while mounted', () => {
    const { result } = renderHook(() =>
      useCallWidgetPersistence({ persistKey: KEY, defaults, debounceMs: 200 }),
    );
    act(() => { result.current.setState({ x: 7 }); });
    act(() => { vi.advanceTimersByTime(250); });
    expect(JSON.parse(window.localStorage.getItem(KEY) ?? '{}').x).toBe(7);
  });
});
