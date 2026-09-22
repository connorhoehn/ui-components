import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Node.js 25 ships a built-in (non-functional) `localStorage` global that
// shadows jsdom's proper Web Storage implementation. Redirect the global so
// tests can use localStorage / sessionStorage normally.
if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>)._localStorage) {
  Object.defineProperty(globalThis, 'localStorage', {
    get: () => (window as unknown as Record<string, unknown>)._localStorage,
    configurable: true,
  });
  Object.defineProperty(globalThis, 'sessionStorage', {
    get: () => (window as unknown as Record<string, unknown>)._sessionStorage,
    configurable: true,
  });
}

// jsdom doesn't implement window.matchMedia. Provide a no-op polyfill so
// components that call usePrefersReducedMotion (via BaseNode) can render in
// tests without crashing. Always returns `matches: false` (no preference).
if (typeof window !== 'undefined' && typeof window.matchMedia === 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (_query: string) => ({
      matches: false,
      media: _query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

// jsdom doesn't ship ResizeObserver or Element.scrollIntoView; cmdk's
// internal layout effects need both. No-op polyfills are sufficient for
// any test that doesn't assert on layout.
if (typeof globalThis.ResizeObserver === 'undefined') {
  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  (globalThis as unknown as { ResizeObserver: typeof ResizeObserverMock }).ResizeObserver =
    ResizeObserverMock;
}
// jsdom has no canvas rendering at all, and its `getContext` announces that by
// writing "Not implemented: HTMLCanvasElement's getContext()" to the virtual
// console for EVERY call — several hundred lines of it once the WebGL
// backdrops are on screen, drowning the actual test output. The components
// already handle a null context (they render their CSS fallback), so returning
// null quietly is the same answer without the shouting. A test that wants a
// real context installs its own stub over this — see
// `src/components/shared/__tests__/webglStub.ts`.
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = (() => null) as unknown as typeof HTMLCanvasElement.prototype.getContext;
}

if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function scrollIntoView() {};
}

// ---------------------------------------------------------------------------
// Global React StrictMode
// ---------------------------------------------------------------------------
// Every `render()` and `renderHook()` in the suite mounts inside
// <StrictMode>, so React double-invokes render, `useState`/`useReducer`
// updaters, and mount effects (mount -> unmount -> remount).
//
// Why this seam rather than a custom `render` re-exported from a test-utils
// module: RTL's own `renderHook` is implemented on top of `render` (see
// @testing-library/react `pure.js`), so flipping the shared config covers
// hooks as well as components with no import churn and no way to opt in by
// accident. A hand-rolled wrapper would have to be re-implemented for
// `renderHook`, and any file that forgot to import it would silently keep
// the old single-mount behaviour — which is exactly the hole this closes.
// Several of the confirmed double-invocation bugs lived in hooks
// (useBBoxAuthoring, useCanvasKeyboard, useJudgmentResults), so hook
// coverage is the point, not a bonus.
//
// A file that genuinely cannot run under StrictMode opts out explicitly with
// `configure({ reactStrictMode: false })` in a `beforeAll`, and must say why.
configure({ reactStrictMode: true });
