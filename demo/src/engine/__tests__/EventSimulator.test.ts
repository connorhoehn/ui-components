import { renderHook, act } from '@testing-library/react';
import { useEventSimulator } from '../EventSimulator';
import type { SimulationTimeline } from '../types';

const createTimeline = (loop = false): SimulationTimeline => ({
  id: 'test-timeline',
  name: 'Test',
  description: 'Test timeline',
  loop,
  events: [
    { delay: 100, message: { type: 'event1', data: 'first' } },
    { delay: 200, message: { type: 'event2', data: 'second' } },
    { delay: 150, message: { type: 'event3', data: 'third' } },
  ],
});

describe('useEventSimulator', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts in idle state', () => {
    const dispatch = vi.fn();
    const { result } = renderHook(() =>
      useEventSimulator(createTimeline(), dispatch)
    );

    expect(result.current.state).toBe('idle');
    expect(result.current.currentEventIndex).toBe(0);
    expect(result.current.totalEvents).toBe(3);
    expect(result.current.speed).toBe(1);
  });

  it('play() transitions to playing state', () => {
    const dispatch = vi.fn();
    const { result } = renderHook(() =>
      useEventSimulator(createTimeline(), dispatch)
    );

    act(() => {
      result.current.play();
    });

    expect(result.current.state).toBe('playing');
  });

  it('dispatches events after delays', () => {
    const dispatch = vi.fn();
    const { result } = renderHook(() =>
      useEventSimulator(createTimeline(), dispatch)
    );

    act(() => {
      result.current.play();
    });

    // First event fires after 100ms
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: 'event1', data: 'first' });

    // Second event fires after another 200ms
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({ type: 'event2', data: 'second' });

    // Third event fires after another 150ms
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith({ type: 'event3', data: 'third' });
  });

  it('pause() stops dispatching', () => {
    const dispatch = vi.fn();
    const { result } = renderHook(() =>
      useEventSimulator(createTimeline(), dispatch)
    );

    act(() => {
      result.current.play();
    });

    // First event fires
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(dispatch).toHaveBeenCalledTimes(1);

    // Pause before second event
    act(() => {
      result.current.pause();
    });
    expect(result.current.state).toBe('paused');

    // Advance time — no more events should fire
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('reset() returns to beginning', () => {
    const dispatch = vi.fn();
    const { result } = renderHook(() =>
      useEventSimulator(createTimeline(), dispatch)
    );

    act(() => {
      result.current.play();
    });

    // Fire first event
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.currentEventIndex).toBe(1);

    act(() => {
      result.current.reset();
    });

    expect(result.current.state).toBe('idle');
    expect(result.current.currentEventIndex).toBe(0);
  });

  it('setSpeed() adjusts timing', () => {
    const dispatch = vi.fn();
    const { result } = renderHook(() =>
      useEventSimulator(createTimeline(), dispatch)
    );

    // Set speed to 2x before playing
    act(() => {
      result.current.setSpeed(2);
    });
    expect(result.current.speed).toBe(2);

    act(() => {
      result.current.play();
    });

    // At 2x speed, first event (100ms delay) should fire at 50ms
    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: 'event1', data: 'first' });
  });

  it('stepForward() dispatches single event', () => {
    const dispatch = vi.fn();
    const { result } = renderHook(() =>
      useEventSimulator(createTimeline(), dispatch)
    );

    act(() => {
      result.current.stepForward();
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: 'event1', data: 'first' });
    expect(result.current.currentEventIndex).toBe(1);
    expect(result.current.state).toBe('paused');
  });

  it('stepForward() advances through events one at a time', () => {
    const dispatch = vi.fn();
    const { result } = renderHook(() =>
      useEventSimulator(createTimeline(), dispatch)
    );

    act(() => {
      result.current.stepForward();
    });
    expect(result.current.currentEventIndex).toBe(1);

    act(() => {
      result.current.stepForward();
    });
    expect(result.current.currentEventIndex).toBe(2);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenLastCalledWith({ type: 'event2', data: 'second' });
  });

  it('transitions to idle when all events are dispatched (no loop)', () => {
    const dispatch = vi.fn();
    const { result } = renderHook(() =>
      useEventSimulator(createTimeline(false), dispatch)
    );

    act(() => {
      result.current.play();
    });

    // Fire all events
    act(() => {
      vi.advanceTimersByTime(100); // event 1
    });
    act(() => {
      vi.advanceTimersByTime(200); // event 2
    });
    act(() => {
      vi.advanceTimersByTime(150); // event 3
    });

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(result.current.state).toBe('idle');
  });
});
