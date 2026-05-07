import { useCallback, useEffect, useRef, useState } from 'react';
import type { SimulationTimeline, SimulationState, SimulationControls } from './types';

/**
 * React hook that drives a timed simulation of WebSocket-style events.
 *
 * Takes a timeline (sequence of events with delays) and a dispatch callback.
 * Each event is scheduled after `delay / speed` ms, then dispatch is called
 * with the event's message payload.
 */
export function useEventSimulator(
  timeline: SimulationTimeline,
  dispatch: (message: Record<string, unknown>) => void
): SimulationControls {
  const [state, setState] = useState<SimulationState>('idle');
  const [speed, setSpeedState] = useState(1);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dispatchRef = useRef(dispatch);
  const stateRef = useRef(state);
  const speedRef = useRef(speed);
  const indexRef = useRef(currentEventIndex);

  // Keep refs in sync with state
  dispatchRef.current = dispatch;
  stateRef.current = state;
  speedRef.current = speed;
  indexRef.current = currentEventIndex;

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleNext = useCallback((eventIndex: number) => {
    if (eventIndex >= timeline.events.length) {
      if (timeline.loop) {
        // Loop: reset index and schedule from beginning
        setCurrentEventIndex(0);
        indexRef.current = 0;
        scheduleNext(0);
      } else {
        setState('idle');
        stateRef.current = 'idle';
      }
      return;
    }

    const event = timeline.events[eventIndex];
    const adjustedDelay = event.delay / speedRef.current;

    timerRef.current = setTimeout(() => {
      if (stateRef.current !== 'playing') return;

      dispatchRef.current(event.message);
      const nextIndex = eventIndex + 1;
      setCurrentEventIndex(nextIndex);
      indexRef.current = nextIndex;
      scheduleNext(nextIndex);
    }, adjustedDelay);
  }, [timeline]);

  const play = useCallback(() => {
    if (stateRef.current === 'playing') return;
    setState('playing');
    stateRef.current = 'playing';
    scheduleNext(indexRef.current);
  }, [scheduleNext]);

  const pause = useCallback(() => {
    clearTimer();
    setState('paused');
    stateRef.current = 'paused';
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setState('idle');
    stateRef.current = 'idle';
    setCurrentEventIndex(0);
    indexRef.current = 0;
  }, [clearTimer]);

  const setSpeed = useCallback((newSpeed: number) => {
    setSpeedState(newSpeed);
    speedRef.current = newSpeed;
    // If currently playing, restart scheduling from current index with new speed
    if (stateRef.current === 'playing') {
      clearTimer();
      scheduleNext(indexRef.current);
    }
  }, [clearTimer, scheduleNext]);

  const stepForward = useCallback(() => {
    clearTimer();
    const idx = indexRef.current;
    if (idx >= timeline.events.length) {
      if (timeline.loop) {
        setCurrentEventIndex(0);
        indexRef.current = 0;
        const event = timeline.events[0];
        dispatchRef.current(event.message);
        setCurrentEventIndex(1);
        indexRef.current = 1;
      }
      return;
    }
    const event = timeline.events[idx];
    dispatchRef.current(event.message);
    const nextIndex = idx + 1;
    setCurrentEventIndex(nextIndex);
    indexRef.current = nextIndex;
    setState('paused');
    stateRef.current = 'paused';
  }, [clearTimer, timeline]);

  // Cleanup on unmount — also reset state so play() works after StrictMode remount
  useEffect(() => {
    return () => {
      clearTimer();
      setState('idle');
      stateRef.current = 'idle';
    };
  }, [clearTimer]);

  return {
    state,
    speed,
    currentEventIndex,
    totalEvents: timeline.events.length,
    play,
    pause,
    reset,
    setSpeed,
    stepForward,
  };
}
