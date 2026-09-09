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
});
