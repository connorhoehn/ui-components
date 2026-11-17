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

  // 2.534.0: the stacked orientation must not move a byte of the side-by-side
  // markup every existing host renders. These strings are what 2.533.0 rendered.
  describe('orientation', () => {
    it('horizontal (the default, and when named) renders exactly what 2.533.0 did', () => {
      const golden = [
        "<div data-testid=\"split-pane\" class=\"flex h-full min-h-0 min-w-0\"><div data-testid=\"split-pane-primary\" class=\"min-h-0 min-w-0 flex-col flex\" style=\"flex: 0 0 55%;\"><p>a</p></div><div role=\"separator\" aria-orientation=\"vertical\" aria-label=\"Resize panes\" aria-valuemin=\"0\" aria-valuemax=\"100\" aria-valuenow=\"55\" tabindex=\"0\" data-testid=\"split-pane-divider\" class=\"group relative z-10 -mx-1 w-2 shrink-0 cursor-col-resize select-none touch-none bg-transparent outline-none focus-visible:bg-primary/20\"><div class=\"absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border transition-colors group-hover:bg-primary group-focus-visible:bg-primary\"></div></div><div data-testid=\"split-pane-secondary\" class=\"flex min-h-0 min-w-0 flex-1 flex-col\"><p>b</p></div></div>",
        "<div data-testid=\"split-pane\" class=\"flex h-full min-h-0 min-w-0 x\"><div data-testid=\"split-pane-primary\" class=\"flex min-h-0 min-w-0 flex-1 flex-col\"><p>a</p></div></div>",
        "<div data-testid=\"t\" class=\"flex h-full min-h-0 min-w-0\"><div data-testid=\"t-primary\" hidden=\"\" class=\"min-h-0 min-w-0 flex-col hidden\" style=\"flex: 0 0 30%;\"><p>a</p></div><div data-testid=\"t-secondary\" class=\"flex min-h-0 min-w-0 flex-1 flex-col\"><p>b</p></div></div>",
      ];
      const cases = (orientation?: 'horizontal') => [
        <SplitPane primary={<p>a</p>} secondary={<p>b</p>} orientation={orientation} />,
        <SplitPane primary={<p>a</p>} secondary={null} className="x" orientation={orientation} />,
        <SplitPane primary={<p>a</p>} secondary={<p>b</p>} ratio={0.3} resizable={false} primaryHidden dividerLabel="L" data-testid="t" orientation={orientation} />,
      ];
      for (const orientation of [undefined, 'horizontal'] as const) {
        cases(orientation).forEach((el, i) => {
          const { container } = render(el);
          expect(container.innerHTML).toBe(golden[i]);
          cleanup();
        });
      }
    });

    function stacked(props: Partial<Parameters<typeof SplitPane>[0]> = {}) {
      const onRatioChange = vi.fn();
      render(<SplitPane primary={<p>code</p>} secondary={<p>output</p>} orientation="vertical" defaultRatio={0.5} onRatioChange={onRatioChange} {...props} />);
      return { divider: screen.getByRole('separator'), onRatioChange, root: screen.getByTestId('split-pane') };
    }

    it('vertical stacks primary over secondary with a horizontal separator', () => {
      const { divider, root } = stacked();
      expect(root.className).toContain('flex-col');
      expect(root).toHaveAttribute('data-orientation', 'vertical');
      expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
      expect(divider.className).toContain('cursor-row-resize');
      expect(divider.className).toMatch(/\bh-2\b/);
      expect(divider.className).toMatch(/(^|\s)-my-1(\s|$)/);
      expect(divider.firstElementChild!.className).toContain('h-px');
      expect(screen.getByTestId('split-pane-primary').nextElementSibling).toBe(divider);
      expect(screen.getByTestId('split-pane-primary').style.flexBasis).toBe('50%');
    });

    it('vertical moves with ArrowUp / ArrowDown, not Left / Right', () => {
      const { divider, onRatioChange } = stacked();
      fireEvent.keyDown(divider, { key: 'ArrowDown' });
      expect(onRatioChange).toHaveBeenLastCalledWith(0.52);
      fireEvent.keyDown(divider, { key: 'ArrowUp', shiftKey: true });
      expect(onRatioChange).toHaveBeenLastCalledWith(0.42);
      fireEvent.keyDown(divider, { key: 'ArrowLeft' });
      fireEvent.keyDown(divider, { key: 'ArrowRight' });
      expect(onRatioChange).toHaveBeenCalledTimes(2);
      fireEvent.keyDown(divider, { key: 'Home' });
      expect(onRatioChange).toHaveBeenLastCalledWith(0.15);
    });

    it('vertical drags by clientY and reads the pixel floors as heights', () => {
      const { divider, onRatioChange, root } = stacked({ minPrimaryPx: 100, minSecondaryPx: 200 });
      // Wide and short: were the floors read against the width, 0.9 would pass.
      root.getBoundingClientRect = () => ({ left: 0, top: 100, width: 2000, height: 1000, right: 2000, bottom: 1100, x: 0, y: 100, toJSON: () => ({}) });
      divider.setPointerCapture = () => {};
      divider.releasePointerCapture = () => {};
      fireEvent.pointerDown(divider, { pointerId: 1, clientX: 5, clientY: 600 });
      fireEvent.pointerMove(divider, { pointerId: 1, clientX: 1500, clientY: 400 });
      expect(onRatioChange).toHaveBeenLastCalledWith(0.3);
      fireEvent.pointerMove(divider, { pointerId: 1, clientX: 1500, clientY: 1050 });
      expect(onRatioChange).toHaveBeenLastCalledWith(0.8);
      fireEvent.pointerMove(divider, { pointerId: 1, clientX: 1500, clientY: 120 });
      expect(onRatioChange).toHaveBeenLastCalledWith(0.1);
      fireEvent.pointerUp(divider, { pointerId: 1 });
    });

    it('vertical without a secondary renders the primary alone, stacked', () => {
      render(<SplitPane primary={<p>code</p>} secondary={null} orientation="vertical" />);
      expect(screen.queryByRole('separator')).toBeNull();
      expect(screen.getByTestId('split-pane').className).toContain('flex-col');
    });
  });
});
