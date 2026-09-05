import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Tooltip } from '../Tooltip';

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
  });

  it('renders as role="tooltip"', () => {
    setup();
    fireEvent.focus(screen.getByText('Toggle'));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Collapse the list');
  });
});
