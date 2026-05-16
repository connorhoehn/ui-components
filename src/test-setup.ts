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
