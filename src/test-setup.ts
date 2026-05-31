import '@testing-library/jest-dom';

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
if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function scrollIntoView() {};
}
