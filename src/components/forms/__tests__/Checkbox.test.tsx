import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../Checkbox';

const box = () => screen.getByRole('checkbox') as HTMLInputElement;

describe('Checkbox', () => {
  it('reports the new state on toggle', () => {
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange} aria-label="Row" />);
    fireEvent.click(box());
    expect(onChange).toHaveBeenCalledWith(true);
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
