import { renderHook, act } from '@testing-library/react';
import { useEffect } from 'react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock useIdleDetector so the suite is deterministic — useIdleDetector is
// covered separately in useIdleDetector.test.ts.
vi.mock('../useIdleDetector', () => ({
  useIdleDetector: () => ({ isIdle: false }),
}));

import { useAwarenessState } from '../useAwarenessState';
import type { GatewayProvider } from '../../providers/GatewayProvider';

interface FakeAwareness {
  setLocalStateField: ReturnType<typeof vi.fn>;
}
interface FakeProvider {
  awareness: FakeAwareness;
}

function makeProvider(): FakeProvider {
  return {
    awareness: { setLocalStateField: vi.fn() },
  };
}

const INITIAL = {
  userId: 'u1',
  displayName: 'Ada',
  color: '#abc',
  mode: 'edit',
  currentSectionId: null,
};

describe('useAwarenessState', () => {
  let provider: FakeProvider;

  beforeEach(() => {
    provider = makeProvider();
  });

  it('returns the 4 documented updaters', () => {
    const { result } = renderHook(() =>
      useAwarenessState(provider as unknown as GatewayProvider, INITIAL),
    );
    expect(typeof result.current.updateSection).toBe('function');
    expect(typeof result.current.updateMode).toBe('function');
    expect(typeof result.current.updateIdle).toBe('function');
    expect(typeof result.current.updateCursorInfo).toBe('function');
  });

  it('flushes the initial state on mount when provider is available', () => {
    renderHook(() =>
      useAwarenessState(provider as unknown as GatewayProvider, INITIAL),
    );
    expect(provider.awareness.setLocalStateField).toHaveBeenCalled();
    const lastCall = provider.awareness.setLocalStateField.mock.calls.at(-1)!;
    expect(lastCall[0]).toBe('user');
    const payload = lastCall[1];
    expect(payload).toMatchObject({
      userId: 'u1',
      displayName: 'Ada',
      color: '#abc',
      mode: 'edit',
      name: 'Ada',
    });
  });

  it('does not throw when provider is null and updaters are still safe to call', () => {
    const { result } = renderHook(() => useAwarenessState(null, INITIAL));
    expect(() => {
      act(() => {
        result.current.updateSection('s1');
        result.current.updateMode('view');
        result.current.updateIdle(true);
        result.current.updateCursorInfo('Grace', '#def');
      });
    }).not.toThrow();
  });

  it('updateSection merges sectionId without clobbering other fields', () => {
    const { result } = renderHook(() =>
      useAwarenessState(provider as unknown as GatewayProvider, INITIAL),
    );
    provider.awareness.setLocalStateField.mockClear();

    act(() => {
      result.current.updateSection('section-42');
    });

    const lastCall = provider.awareness.setLocalStateField.mock.calls.at(-1)!;
    expect(lastCall[0]).toBe('user');
    const payload = lastCall[1];
    expect(payload).toMatchObject({
      userId: 'u1',
      displayName: 'Ada',
      color: '#abc',
      mode: 'edit',
      currentSectionId: 'section-42',
    });
  });

  it('updateMode preserves a prior updateSection (regression guard for the overwrite bug)', () => {
    const { result } = renderHook(() =>
      useAwarenessState(provider as unknown as GatewayProvider, INITIAL),
    );

    act(() => {
      result.current.updateSection('section-7');
    });
    act(() => {
      result.current.updateMode('view');
    });

    const lastCall = provider.awareness.setLocalStateField.mock.calls.at(-1)!;
    const payload = lastCall[1];
    expect(payload.mode).toBe('view');
    expect(payload.currentSectionId).toBe('section-7');
    expect(payload.userId).toBe('u1');
    expect(payload.color).toBe('#abc');
  });

  it('updateCursorInfo updates only name + color and preserves section/mode', () => {
    const { result } = renderHook(() =>
      useAwarenessState(provider as unknown as GatewayProvider, INITIAL),
    );

    act(() => {
      result.current.updateSection('section-9');
      result.current.updateMode('view');
    });
    act(() => {
      result.current.updateCursorInfo('Grace', '#ff00ff');
    });

    const lastCall = provider.awareness.setLocalStateField.mock.calls.at(-1)!;
    const payload = lastCall[1];
    expect(payload.name).toBe('Grace');
    expect(payload.color).toBe('#ff00ff');
    expect(payload.currentSectionId).toBe('section-9');
    expect(payload.mode).toBe('view');
    expect(payload.userId).toBe('u1');
    expect(payload.displayName).toBe('Ada');
  });

  it('updateIdle propagates the explicit idle flag in the next flush', () => {
    const { result } = renderHook(() =>
      useAwarenessState(provider as unknown as GatewayProvider, INITIAL),
    );

    act(() => {
      result.current.updateIdle(true);
    });

    const lastCall = provider.awareness.setLocalStateField.mock.calls.at(-1)!;
    expect(lastCall[1].idle).toBe(true);
  });

  it('stamps lastSeen on every flush', () => {
    const { result } = renderHook(() =>
      useAwarenessState(provider as unknown as GatewayProvider, INITIAL),
    );
    provider.awareness.setLocalStateField.mockClear();

    const before = Date.now();
    act(() => {
      result.current.updateMode('view');
    });

    const lastCall = provider.awareness.setLocalStateField.mock.calls.at(-1)!;
    const lastSeen = lastCall[1].lastSeen;
    expect(typeof lastSeen).toBe('number');
    expect(lastSeen).toBeGreaterThanOrEqual(before);
  });

  // -------------------------------------------------------------------------
  // Referential stability of the returned object.
  //
  // The four updaters were always stable useCallbacks, but the object holding
  // them was rebuilt every render — and the object is what consumers put in
  // dependency arrays. useDocumentEditorState has it in the deps of the 500ms
  // "focus the first section and publish my presence" effect, so a fresh
  // identity per render cleared and restarted that timer forever. In a live
  // session the page re-renders far more often than twice a second (every peer
  // awareness change re-renders it), so the effect never fired: this client's
  // presence was never attached to a section, no avatar appeared on any section
  // card, and a peer's follow-mode / jump-to-user had nothing to aim at.
  // -------------------------------------------------------------------------

  it('returns the same object identity across re-renders', () => {
    const { result, rerender } = renderHook(() =>
      useAwarenessState(provider as unknown as GatewayProvider, INITIAL),
    );
    const first = result.current;

    rerender();
    rerender();

    expect(result.current).toBe(first);
  });

  it('is safe in a dependency array: a deferred effect keyed on it still fires', () => {
    vi.useFakeTimers();
    try {
      const fired = vi.fn();
      const { rerender } = renderHook(() => {
        const awareness = useAwarenessState(
          provider as unknown as GatewayProvider,
          INITIAL,
        );
        useEffect(() => {
          const timer = setTimeout(fired, 500);
          return () => clearTimeout(timer);
        }, [awareness]);
      });

      // Re-render faster than the timer's own delay — exactly what a live
      // collaborative session does. A churning dependency resets the timeout
      // on every pass and it never reaches 500ms.
      for (let i = 0; i < 5; i++) {
        act(() => {
          vi.advanceTimersByTime(200);
        });
        rerender();
      }

      expect(fired).toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });
});