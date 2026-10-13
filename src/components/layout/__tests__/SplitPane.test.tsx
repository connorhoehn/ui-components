import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SplitPane } from '../SplitPane';

afterEach(cleanup);

describe('SplitPane', () => {
  it('renders only the primary, with no divider, when there is no secondary', () => {
    render(<SplitPane primary={<p>chat</p>} secondary={null} />);
    expect(screen.queryByRole('separator')).toBeNull();
    expect(screen.getByTestId('split-pane-primary')).toBeTruthy();
  });

  it('exposes the split as an accessible separator and moves it from the keyboard', () => {
    const onRatioChange = vi.fn();
    render(<SplitPane primary={<p>chat</p>} secondary={<p>doc</p>} defaultRatio={0.5} onRatioChange={onRatioChange} />);
    const divider = screen.getByRole('separator');
    expect(divider.getAttribute('aria-orientation')).toBe('vertical');
    expect(divider.getAttribute('aria-valuenow')).toBe('50');
    fireEvent.keyDown(divider, { key: 'ArrowRight' });
    // jsdom has no layout (width 0), so the fraction floors 0.15/0.85 apply.
    expect(onRatioChange).toHaveBeenLastCalledWith(0.52);
    fireEvent.keyDown(divider, { key: 'ArrowLeft', shiftKey: true });
    expect(onRatioChange).toHaveBeenLastCalledWith(0.42);
    fireEvent.keyDown(divider, { key: 'End' });
    expect(onRatioChange).toHaveBeenLastCalledWith(0.85);
  });

  it('is controllable', () => {
    const onRatioChange = vi.fn();
    render(<SplitPane primary={<p>a</p>} secondary={<p>b</p>} ratio={0.3} onRatioChange={onRatioChange} />);
    expect(screen.getByRole('separator').getAttribute('aria-valuenow')).toBe('30');
    fireEvent.keyDown(screen.getByRole('separator'), { key: 'Home' });
    expect(onRatioChange).toHaveBeenLastCalledWith(0.15);
    // Not applied locally: the host owns the number.
    expect(screen.getByRole('separator').getAttribute('aria-valuenow')).toBe('30');
  });

  // 2.441.6: the divider was an 8px layout column, so the secondary pane began
  // 8px right of the primary (the layout cascade measured the trail at 32px
  // from the content edge instead of 24). It is an overlay now.
  describe('divider owns no layout width', () => {
    const setup = () => {
      const onRatioChange = vi.fn();
      render(<SplitPane primary={<p>rail</p>} secondary={<p>pane</p>} defaultRatio={0.25} onRatioChange={onRatioChange} />);
      return { onRatioChange, divider: screen.getByTestId('split-pane-divider') };
    };

    it('flagged: an 8px hit area whose negative margins give its width back (net 0), stacked over both panes', () => {
      const { divider } = setup();
      // w-2 (8px) − mx-1 on each side (4px + 4px) = 0px of row width:
      // the secondary pane's left edge is the primary pane's right edge.
      expect(divider.className).toMatch(/\bw-2\b/);
      expect(divider.className).toMatch(/(^|\s)-mx-1(\s|$)/);
      expect(divider.className).toContain('z-10');
      expect(divider.className).toContain('relative');
      // The panes are siblings with nothing else between them.
      const primary = screen.getByTestId('split-pane-primary');
      expect(primary.nextElementSibling).toBe(divider);
      expect(divider.nextElementSibling).toBe(screen.getByTestId('split-pane-secondary'));
      // The 1px line stays centred on the boundary.
      expect(divider.firstElementChild!.className).toContain('left-1/2');
      expect(divider.firstElementChild!.className).toContain('w-px');
    });

    it('valid: the whole hit area still drags, with the same name and keyboard', () => {
      const { divider, onRatioChange } = setup();
      const root = screen.getByTestId('split-pane');
      root.getBoundingClientRect = () => ({ left: 0, top: 0, width: 1000, height: 600, right: 1000, bottom: 600, x: 0, y: 0, toJSON: () => ({}) });
      divider.setPointerCapture = () => {};
      divider.releasePointerCapture = () => {};
      // A press 3px left of the boundary (inside the 8px hit area) starts a drag.
      fireEvent.pointerDown(divider, { pointerId: 1, clientX: 247 });
      fireEvent.pointerMove(divider, { pointerId: 1, clientX: 400 });
      fireEvent.pointerUp(divider, { pointerId: 1, clientX: 400 });
      expect(onRatioChange).toHaveBeenLastCalledWith(0.4);
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
      fireEvent.keyDown(divider, { key: 'ArrowRight' });
      expect(onRatioChange).toHaveBeenCalledTimes(2);
    });
  });
});
