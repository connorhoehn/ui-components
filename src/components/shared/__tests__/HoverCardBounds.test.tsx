import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HoverCard } from '../HoverCard';

let anchor = { left: 20, top: 30, bottom: 50 };
let contentWidth = 288, contentHeight = 100;
const observers: Array<{ callback: ResizeObserverCallback; disconnect: ReturnType<typeof vi.fn> }> = [];

beforeEach(() => {
  vi.useFakeTimers();
  anchor = { left: 20, top: 30, bottom: 50 };
  contentWidth = 288; contentHeight = 100; observers.length = 0;
  vi.stubGlobal('innerWidth', 1024); vi.stubGlobal('innerHeight', 768);
  vi.stubGlobal('ResizeObserver', class {
    disconnect = vi.fn();
    observe() {}
    unobserve() {}
    constructor(callback: ResizeObserverCallback) { observers.push({ callback, disconnect: this.disconnect }); }
  });
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    return { ...anchor, right: anchor.left + 80, width: 80, height: anchor.bottom - anchor.top } as DOMRect;
  });
  // jsdom has no layout. Apply the real browser's max-dimension constraint
  // here; the downstream browser cases prove actual CSS, scrolling and focus.
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (this: HTMLElement) {
    return Math.min(contentWidth, parseFloat(this.style.maxWidth) || Infinity);
  });
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function (this: HTMLElement) {
    return Math.min(contentHeight, parseFloat(this.style.maxHeight) || Infinity);
  });
});
afterEach(() => {
  cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.useRealTimers();
});

function open() {
  render(<HoverCard label="Details" openOnFocus={false} content={<a href="#last">Last detail</a>}>
    {trigger => <button {...trigger}>Show details</button>}
  </HoverCard>);
  const trigger = screen.getByRole('button', { name: 'Show details' });
  act(() => trigger.focus());
  fireEvent.keyDown(trigger, { key: 'Enter' });
  return { trigger, panel: screen.getByRole('dialog', { name: 'Details' }) };
}
function resizedContent() {
  act(() => observers.forEach(observer => observer.callback([], {} as ResizeObserver)));
}
function flushFrame() { act(() => vi.advanceTimersByTime(20)); }

describe('HoverCard viewport placement', () => {
  it('opens below the anchor without moving focus', () => {
    const { trigger, panel } = open();
    expect(panel.style.top).toBe('56px'); expect(panel.style.left).toBe('20px');
    expect(panel).toHaveAttribute('data-viewport-placement', 'below');
    expect(panel).toHaveAttribute('aria-modal', 'false');
    expect(document.activeElement).toBe(trigger);
  });

  it('opens above a lower-edge anchor and keeps its right edge in view', () => {
    anchor = { left: 980, top: 720, bottom: 740 };
    const { panel } = open();
    expect(panel.style.top).toBe('614px'); expect(panel.style.left).toBe('728px');
    expect(panel).toHaveAttribute('data-viewport-placement', 'above');
  });

  it('bounds an oversized panel to a short, narrow viewport and permits scrolling', () => {
    vi.stubGlobal('innerWidth', 240); vi.stubGlobal('innerHeight', 300);
    anchor = { left: 200, top: 140, bottom: 160 };
    contentHeight = 1000;
    const { panel } = open();
    expect(panel.style.maxWidth).toBe('224px'); expect(panel.style.maxHeight).toBe('284px');
    expect(panel.style.top).toBe('8px'); expect(panel.style.left).toBe('8px');
    expect(panel.style.overflowY).toBe('auto');
    expect(panel).toHaveAttribute('data-viewport-placement', 'bounded');
  });

  it('repositions a pinned panel when asynchronous content grows', () => {
    anchor = { left: 20, top: 500, bottom: 520 };
    const { panel } = open();
    expect(panel.style.top).toBe('526px');
    contentHeight = 300; resizedContent();
    expect(panel.style.top).toBe('194px');
    expect(panel).toHaveAttribute('data-pinned', 'true');
  });

  it('follows nested scrolling and viewport resizing while pinned', () => {
    const { panel } = open();
    anchor = { left: 980, top: 720, bottom: 740 };
    fireEvent.scroll(screen.getByRole('button', { name: 'Show details' })); flushFrame();
    expect(panel.style.top).toBe('614px'); expect(panel.style.left).toBe('728px');
    vi.stubGlobal('innerWidth', 440); vi.stubGlobal('innerHeight', 480);
    fireEvent(window, new Event('resize')); flushFrame();
    expect(panel.style.top).toBe('372px'); expect(panel.style.left).toBe('144px');
    expect(panel).toHaveAttribute('data-pinned', 'true');
  });

  it('disconnects observation and queued placement when Escape closes the card', () => {
    const { trigger, panel } = open();
    fireEvent(window, new Event('resize'));
    fireEvent.keyDown(trigger, { key: 'Escape' });
    flushFrame();
    expect(panel.isConnected).toBe(false);
    expect(observers.every(observer => observer.disconnect.mock.calls.length > 0)).toBe(true);
    expect(document.activeElement).toBe(trigger);
  });

  it('keeps a pinned card in view after its anchor scrolls above the viewport', () => {
    const { panel } = open();
    anchor = { left: -40, top: -80, bottom: -60 };
    fireEvent.scroll(document); flushFrame();
    expect(panel.style.top).toBe('8px'); expect(panel.style.left).toBe('8px');
    expect(panel).toHaveAttribute('data-viewport-placement', 'bounded');
  });
});
