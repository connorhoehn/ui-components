// useEventCallback — a callback whose identity never changes.
//
// WHY THIS EXISTS
// Five separate bugs in this library shared one root cause: a callback prop
// sitting in a `useEffect` dependency array. Callers almost always pass an
// inline arrow, so the identity changes on every parent render, and the
// effect tears itself down and sets itself up again each time. When the
// effect owns a timer or a deferred listener registration, it never gets to
// fire:
//
//   • CallStartedBanner (v2.83.0)     — 30s auto-dismiss never expired
//   • WrappedActivityPanel (v2.85.0)  — activity feed never rotated
//   • SocialPanel (v2.87.0)           — reset effect wiped what you typed
//   • DiagnosticsPage (v2.88.0)       — "Auto-refresh (10s)" never refreshed
//   • FollowModeBar / PipelinesBulkActionBar (v2.88.0)
//
// Wrapping the prop here makes it safe to depend on: the returned function is
// referentially stable for the component's lifetime, but always invokes the
// LATEST callback, so no stale closure is captured.
//
// Use it when a callback needs to go in a dependency array. Plain
// `useCallback` is still the right tool for a callback passed down to a
// memoised child — that one needs to change when its inputs change.

import { useCallback, useLayoutEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEventCallback<A extends any[], R>(
  fn: ((...args: A) => R) | undefined,
): (...args: A) => R | undefined {
  const ref = useRef(fn);

  // Layout effect, not effect: the ref must be current before any child
  // effect that might invoke the callback in the same commit runs.
  useLayoutEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args: A) => ref.current?.(...args), []);
}

export default useEventCallback;
