import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Tooltip } from '../Tooltip';
import { createPortal } from 'react-dom';

function setup(props = {}) {
  return render(
    <Tooltip content="Collapse the list" {...props}>
      <button type="button">Toggle</button>
    </Tooltip>,
  );
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  vi.useRealTimers();
  cleanup();
  vi.restoreAllMocks();
});

const tip = () => screen.queryByTestId('tooltip');

describe('Tooltip', () => {
  it('does not open on a pointer merely passing through', () => {
    setup();
    fireEvent.mouseEnter(screen.getByText('Toggle'));
    act(() => { vi.advanceTimersByTime(100); });
    fireEvent.mouseLeave(screen.getByText('Toggle'));
    act(() => { vi.advanceTimersByTime(1000); });
    expect(tip()).toBeNull();
  });

  it('opens after the hover delay elapses', () => {
    setup();
    fireEvent.mouseEnter(screen.getByText('Toggle'));
    act(() => { vi.advanceTimersByTime(350); });
    expect(tip()).not.toBeNull();
    expect(screen.getByText('Collapse the list')).toBeInTheDocument();
  });

  it('closes after the close delay once the pointer leaves', () => {
    setup();
    fireEvent.mouseEnter(screen.getByText('Toggle'));
    act(() => { vi.advanceTimersByTime(350); });
    fireEvent.mouseLeave(screen.getByText('Toggle'));
    act(() => { vi.advanceTimersByTime(100); });
    expect(tip()).toBeNull();
  });

  it('opens immediately on focus, no delay', () => {
    setup();
    fireEvent.focus(screen.getByText('Toggle'));
    expect(tip()).not.toBeNull();
  });

  it('closes on blur', () => {
    setup();
    fireEvent.focus(screen.getByText('Toggle'));
    expect(tip()).not.toBeNull();
    fireEvent.blur(screen.getByText('Toggle'));
    expect(tip()).toBeNull();
  });

  it('closes on Escape while focused', () => {
    setup();
    fireEvent.focus(screen.getByText('Toggle'));
    expect(tip()).not.toBeNull();
    fireEvent.keyDown(screen.getByText('Toggle'), { key: 'Escape' });
    expect(tip()).toBeNull();
  });

  it('never opens when disabled', () => {
    setup({ disabled: true });
    fireEvent.mouseEnter(screen.getByText('Toggle'));
    act(() => { vi.advanceTimersByTime(1000); });
    expect(tip()).toBeNull();
    fireEvent.focus(screen.getByText('Toggle'));
    expect(tip()).toBeNull();
  });

  it('dismisses on activation and does not reopen when a portal menu takes focus', () => {
    render(<Tooltip content="Choose scope"><span><button>Scope</button>{createPortal(<button>Menu choice</button>, document.body)}</span></Tooltip>);
    fireEvent.focus(screen.getByText('Scope'));
    expect(tip()).not.toBeNull();
    fireEvent.click(screen.getByText('Scope'));
    expect(tip()).toBeNull();
    fireEvent.focus(screen.getByText('Menu choice'));
    expect(tip()).toBeNull();
    fireEvent.focus(screen.getByText('Scope'));
    fireEvent.keyDown(screen.getByText('Scope'), { key: 'Enter' });
    expect(tip()).toBeNull();
  });

  it('renders as role="tooltip"', () => {
    setup();
    fireEvent.focus(screen.getByText('Toggle'));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Collapse the list');
  });
});


describe('Tooltip viewport containment', () => {
  function geometry(anchor: { left: number; top: number }) {
    return vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
      const box = this.getAttribute('role') === 'tooltip'
        ? { left: 0, top: 0, width: 240, height: 120 }
        : { ...anchor, width: 28, height: 28 };
      return { ...box, right: box.left + box.width, bottom: box.top + box.height, x: box.left, y: box.top, toJSON: () => box } as DOMRect;
    });
  }
  it('keeps a multiline tooltip inside the right edge and flips above the bottom edge', () => {
    geometry({ left: window.innerWidth - 32, top: window.innerHeight - 36 });
    setup({ placement: 'bottom', content: <ul><li>First production notice</li><li>Another detailed notice</li></ul> });
    fireEvent.focus(screen.getByText('Toggle'));
    const box = screen.getByRole('tooltip');
    expect(parseFloat(box.style.left) + 240).toBeLessThanOrEqual(window.innerWidth - 8);
    expect(parseFloat(box.style.top) + 120).toBeLessThan(window.innerHeight - 36);
    expect(box).toHaveTextContent('Another detailed notice');
  });
  it('repositions an open tooltip after the anchor scrolls or the viewport resizes', () => {
    const anchor = { left: 500, top: 200 }; geometry(anchor);
    setup({ placement: 'bottom' }); fireEvent.focus(screen.getByText('Toggle'));
    const before = screen.getByRole('tooltip').style.left;
    anchor.left = 4; fireEvent.scroll(window);
    expect(screen.getByRole('tooltip').style.left).toBe('8px');
    anchor.left = 600; fireEvent.resize(window);
    expect(screen.getByRole('tooltip').style.left).not.toBe(before);
  });
});
