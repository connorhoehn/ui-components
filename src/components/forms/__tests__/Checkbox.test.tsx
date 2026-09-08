import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../Checkbox';

const box = () => screen.getByRole('checkbox') as HTMLInputElement;

describe('Checkbox', () => {
  it('reports the new state on toggle', () => {
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange} aria-label="Row" />);
    fireEvent.click(box());
    expect(onChange.mock.calls[0][0]).toBe(true);
  });

  it('hands over the modifiers too, so a range-select can read them', () => {
    // "tick this one" and "tick everything from the last one to this one" are
    // the same control with shift held. A callback carrying only the boolean
    // cannot express the second, which is why callers with a shift-select list
    // used to hand-roll a native <input type="checkbox"> instead.
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange} aria-label="Row" />);
    fireEvent.click(box(), { shiftKey: true });

    const [checked, modifiers] = onChange.mock.calls[0];
    expect(checked).toBe(true);
    expect(modifiers.shiftKey).toBe(true);
  });

  it('sets the indeterminate DOM property', () => {
    // `indeterminate` is a property, not an attribute — the reason every
    // hand-rolled select-all header carried its own ref plumbing.
    render(<Checkbox checked={false} indeterminate onChange={vi.fn()} aria-label="All" />);
    expect(box().indeterminate).toBe(true);
  });

  it('clears indeterminate when the prop drops', () => {
    const { rerender } = render(
      <Checkbox checked={false} indeterminate onChange={vi.fn()} aria-label="All" />,
    );
    rerender(<Checkbox checked indeterminate={false} onChange={vi.fn()} aria-label="All" />);
    expect(box().indeterminate).toBe(false);
  });

  it('exposes mixed state to assistive tech', () => {
    render(<Checkbox checked={false} indeterminate onChange={vi.fn()} aria-label="All" />);
    expect(box()).toHaveAttribute('aria-checked', 'mixed');
  });

  it('renders disabled', () => {
    // jsdom dispatches synthetic clicks even on disabled inputs, so assert the
    // attribute the browser actually honours rather than simulating the click.
    render(<Checkbox checked={false} disabled onChange={vi.fn()} aria-label="Row" />);
    expect(box()).toBeDisabled();
  });
});
