// A composer in a box whose width comes from its children (an `auto` grid
// column, an inline-block). Its size class keys off its own width, and there
// that width depends on the size class: measured in the browser, the
// medium layout is 323px wide (which reads as narrow) and the narrow one-row
// layout is 413px (which reads as medium). Re-measuring after every commit
// flipped between the two until React gave up with "Maximum update depth
// exceeded". The composer must settle on one layout instead.
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer } from '../RichChatComposer';

let observers: Array<(entries: Array<{ contentRect: { width: number; height: number } }>) => void> = [];
class FakeResizeObserver {
  constructor(private cb: (entries: Array<{ contentRect: { width: number; height: number } }>) => void) {
    observers.push(cb);
  }
  observe() {}
  disconnect() { observers = observers.filter((cb) => cb !== this.cb); }
}

/** What the root measures under each size class: its width is its content's. */
let widthFor: (size: string | null) => number;
const realRect = HTMLElement.prototype.getBoundingClientRect;

beforeEach(() => {
  vi.stubGlobal('ResizeObserver', FakeResizeObserver);
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    if (!this.hasAttribute('data-composer-size')) return realRect.call(this);
    const width = widthFor(this.getAttribute('data-composer-size'));
    return { width, height: 80, x: 0, y: 0, top: 0, left: 0, right: width, bottom: 80, toJSON: () => ({}) } as DOMRect;
  });
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  observers = [];
});

const LONG = 'Describe your project or ask about this guide…';
const root = () => screen.getByTestId('composer');

describe('a content-sized container', () => {
  it('settles when no size class fits its own width (narrow ⇄ medium)', () => {
    widthFor = (size) => (size === 'narrow' ? 413 : 323);
    const errors = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<RichChatComposer onSend={vi.fn()} placeholder={LONG} data-testid="composer" />)).not.toThrow();
    expect(errors.mock.calls.flat().join(' ')).not.toMatch(/Maximum update depth/);
    const settled = root().getAttribute('data-composer-size');
    // Later commits and observer reports of the same width keep it there.
    act(() => { observers.forEach((cb) => cb([{ contentRect: { width: widthFor(settled), height: 80 } }])); });
    expect(root().getAttribute('data-composer-size')).toBe(settled);
  });

  it('settles in the agent dock (menu mode, compact toolbar) too', () => {
    widthFor = (size) => (size === 'narrow' ? 433 : 323);
    const errors = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(
      <RichChatComposer
        onSend={vi.fn()}
        modeControl="menu"
        mode="agent"
        onModeChange={vi.fn()}
        disabledModes={['chat', 'terminal']}
        toolbar="compact"
        backdropTone="none"
        modePlaceholders={{ agent: LONG }}
        data-testid="composer"
      />,
    )).not.toThrow();
    expect(errors.mock.calls.flat().join(' ')).not.toMatch(/Maximum update depth/);
  });

  it('a real resize still changes the size class after settling', () => {
    widthFor = (size) => (size === 'narrow' ? 413 : 323);
    render(<RichChatComposer onSend={vi.fn()} placeholder={LONG} data-testid="composer" />);
    // The host now gives it a fixed 700px box: every layout measures 700.
    widthFor = () => 700;
    act(() => { observers.forEach((cb) => cb([{ contentRect: { width: 700, height: 80 } }])); });
    expect(root()).toHaveAttribute('data-composer-size', 'wide');
    widthFor = () => 300;
    act(() => { observers.forEach((cb) => cb([{ contentRect: { width: 300, height: 80 } }])); });
    expect(root()).toHaveAttribute('data-composer-size', 'narrow');
    widthFor = () => 450;
    act(() => { observers.forEach((cb) => cb([{ contentRect: { width: 450, height: 80 } }])); });
    expect(root()).toHaveAttribute('data-composer-size', 'medium');
  });
});
