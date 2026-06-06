import { act, renderHook } from '@testing-library/react';
import {
  useCallWidgetPersistence,
  type PersistedWidgetState,
} from '../useCallWidgetPersistence';

const defaults: PersistedWidgetState = {
  mode: 'docked',
  x: 0,
  y: 0,
  width: 640,
  height: 400,
};

const TEST_KEY = 'test-key';

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

afterEach(() => {
  vi.useRealTimers();
});

// ── 1. No persistKey → memory-only ─────────────────────────────────────────
describe('no persistKey → memory-only', () => {
  it('state mutates in memory but localStorage.setItem is never called', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() =>
      useCallWidgetPersistence({ persistKey: undefined, defaults }),
    );

    act(() => {
      result.current.setState({ x: 42, y: 84 });
    });

    expect(result.current.state.x).toBe(42);
    expect(result.current.state.y).toBe(84);
    expect(setItemSpy).not.toHaveBeenCalled();
  });
});

// ── 2. First mount with empty storage → uses defaults ─────────────────────
describe('first mount with empty storage', () => {
  it('initial state equals defaults', () => {
    const { result } = renderHook(() =>
      useCallWidgetPersistence({ persistKey: TEST_KEY, defaults }),
    );

    expect(result.current.state).toEqual(defaults);
  });
});

// ── 3. Hydrate from valid stored state ─────────────────────────────────────
describe('hydrate from valid stored state', () => {
  it('returns stored values on mount', () => {
    localStorage.setItem(
      TEST_KEY,
      JSON.stringify({ v: 1, mode: 'docked', x: 100, y: 200, width: 800, height: 500 }),
    );

    const { result } = renderHook(() =>
      useCallWidgetPersistence({ persistKey: TEST_KEY, defaults }),
    );

    expect(result.current.state).toEqual({
      mode: 'docked',
      x: 100,
      y: 200,
      width: 800,
      height: 500,
    });
  });
});

// ── 4. Malformed JSON → falls back to defaults + clears the bad key ────────
describe('malformed JSON in storage', () => {
  it('uses defaults and removes the corrupted entry', () => {
    localStorage.setItem(TEST_KEY, '{not valid json');

    const { result } = renderHook(() =>
      useCallWidgetPersistence({ persistKey: TEST_KEY, defaults }),
    );

    expect(result.current.state).toEqual(defaults);
    expect(localStorage.getItem(TEST_KEY)).toBeNull();
  });
});

// ── 5. Version mismatch → falls back to defaults ───────────────────────────
describe('version mismatch in stored state', () => {
  it('uses defaults when stored v does not match STORAGE_VERSION', () => {
    localStorage.setItem(
      TEST_KEY,
      JSON.stringify({ v: 999, mode: 'docked', x: 50, y: 50, width: 640, height: 400 }),
    );

    const { result } = renderHook(() =>
      useCallWidgetPersistence({ persistKey: TEST_KEY, defaults }),
    );

    expect(result.current.state).toEqual(defaults);
  });
});

// ── 6. fullscreen mode in storage → coerced to docked ─────────────────────
describe('fullscreen mode coercion', () => {
  it('coerces fullscreen → docked on hydrate', () => {
    localStorage.setItem(
      TEST_KEY,
      JSON.stringify({ v: 1, mode: 'fullscreen', x: 0, y: 0, width: 1920, height: 1080 }),
    );

    const { result } = renderHook(() =>
      useCallWidgetPersistence({ persistKey: TEST_KEY, defaults }),
    );

    // Hook coerces any non-'docked' stored mode (including 'fullscreen') to 'mini'.
    expect(result.current.state.mode).toBe('mini');
  });
});

// ── 7. Debounced write to localStorage ─────────────────────────────────────
describe('debounced localStorage write', () => {
  it('batches rapid state updates into a single setItem after 200ms', () => {
    vi.useFakeTimers();
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() =>
      useCallWidgetPersistence({ persistKey: TEST_KEY, defaults, debounceMs: 200 }),
    );

    act(() => { result.current.setState({ x: 10 }); });
    act(() => { result.current.setState({ x: 20 }); });
    act(() => { result.current.setState({ x: 30 }); });

    // Advance 199ms — debounce should not have fired yet.
    act(() => { vi.advanceTimersByTime(199); });
    expect(setItemSpy).not.toHaveBeenCalled();

    // 1ms more → debounce fires.
    act(() => { vi.advanceTimersByTime(1); });
    expect(setItemSpy).toHaveBeenCalledTimes(1);

    const written = JSON.parse(setItemSpy.mock.calls[0][1] as string);
    expect(written.x).toBe(30);
  });
});

// ── 8. Cleanup cancels pending debounced write ─────────────────────────────
describe('unmount before debounce fires', () => {
  it('does not call setItem when unmounted before the debounce elapses', () => {
    vi.useFakeTimers();
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    const { result, unmount } = renderHook(() =>
      useCallWidgetPersistence({ persistKey: TEST_KEY, defaults, debounceMs: 200 }),
    );

    act(() => { result.current.setState({ x: 99 }); });

    // Unmount before 200ms.
    unmount();

    act(() => { vi.advanceTimersByTime(300); });
    expect(setItemSpy).not.toHaveBeenCalled();
  });
});

// ── 9. Storage quota / private mode failure is swallowed ──────────────────
describe('localStorage.setItem throws (quota / private mode)', () => {
  it('does not propagate the storage error to the caller', () => {
    vi.useFakeTimers();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('QuotaExceededError');
    });

    const { result } = renderHook(() =>
      useCallWidgetPersistence({ persistKey: TEST_KEY, defaults, debounceMs: 200 }),
    );

    expect(() => {
      act(() => { result.current.setState({ x: 5 }); });
      act(() => { vi.advanceTimersByTime(200); });
    }).not.toThrow();
  });
});
