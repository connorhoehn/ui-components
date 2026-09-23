import { render, screen, act } from '@testing-library/react';
import { ViewportFillRegion, fillHeight } from '../ViewportFillRegion';

describe('fillHeight', () => {
  it('takes everything from its own top edge to the bottom of the window', () => {
    expect(fillHeight(160, 1080, 0, 240)).toBe(920);
  });

  it('leaves the requested gap below', () => {
    expect(fillHeight(160, 1080, 24, 240)).toBe(896);
  });

  it('never collapses below the floor, however deep on the page it sits', () => {
    expect(fillHeight(1000, 600, 0, 240)).toBe(240);
  });

  it('is unaffected by how far the document is scrolled (offset is document-relative)', () => {
    expect(fillHeight(160, 1080, 0, 240)).toBe(fillHeight(160, 1080, 0, 240));
  });
});

describe('ViewportFillRegion', () => {
  it('gives its box a definite height instead of letting content grow the page', () => {
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
    // jsdom lays nothing out; pin the region's top edge.
    const proto = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function () {
      return { top: 200, bottom: 0, left: 0, right: 0, width: 0, height: 0, x: 0, y: 0, toJSON() {} } as DOMRect;
    };
    try {
      render(
        <ViewportFillRegion data-testid="region" bottomGap={24}>
          <div>thread</div>
        </ViewportFillRegion>,
      );
      const el = screen.getByTestId('region');
      expect(el.style.height).toBe('576px'); // 800 - 200 - 24
      expect(el.style.maxHeight).toBe('576px');
    } finally {
      Element.prototype.getBoundingClientRect = proto;
    }
  });

  it('re-measures when the window resizes', () => {
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
    const proto = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function () {
      return { top: 100, bottom: 0, left: 0, right: 0, width: 0, height: 0, x: 0, y: 0, toJSON() {} } as DOMRect;
    };
    try {
      render(<ViewportFillRegion data-testid="region"><div>thread</div></ViewportFillRegion>);
      expect(screen.getByTestId('region').style.height).toBe('700px');

      Object.defineProperty(window, 'innerHeight', { value: 500, configurable: true });
      act(() => { window.dispatchEvent(new Event('resize')); });
      expect(screen.getByTestId('region').style.height).toBe('400px');
    } finally {
      Element.prototype.getBoundingClientRect = proto;
    }
  });

  it('re-measures when something above it pushes it down without a window resize (a late banner)', () => {
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
    const callbacks: Array<() => void> = [];
    const observed: Element[] = [];
    const RO = globalThis.ResizeObserver;
    globalThis.ResizeObserver = class {
      constructor(cb: () => void) { callbacks.push(cb); }
      observe(target: Element) { observed.push(target); }
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
    let top = 100;
    const proto = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function () {
      return { top, bottom: 0, left: 0, right: 0, width: 0, height: 0, x: 0, y: 0, toJSON() {} } as DOMRect;
    };
    try {
      render(<div data-testid="parent"><ViewportFillRegion data-testid="region"><div>thread</div></ViewportFillRegion></div>);
      expect(screen.getByTestId('region').style.height).toBe('700px');
      expect(observed).toContain(screen.getByTestId('parent'));

      top = 142; // a 42px banner mounted above
      act(() => { callbacks.forEach((cb) => cb()); });
      expect(screen.getByTestId('region').style.height).toBe('658px');
    } finally {
      Element.prototype.getBoundingClientRect = proto;
      globalThis.ResizeObserver = RO;
    }
  });
});
