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

describe('Checkbox shape="round"', () => {
  it('leaves the square default a bare input', () => {
    const { container } = render(<Checkbox checked={false} onChange={vi.fn()} aria-label="Row" />);
    expect(container.firstElementChild?.tagName).toBe('INPUT');
    expect(box().className).toContain('accent-primary');
  });

  it('is still a real checkbox, so space and form semantics survive', () => {
    const onChange = vi.fn();
    render(<Checkbox shape="round" checked={false} onChange={onChange} aria-label="Status" />);
    const input = screen.getByRole('checkbox', { name: 'Status' }) as HTMLInputElement;
    expect(input.tagName).toBe('INPUT');
    expect(input.type).toBe('checkbox');
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it('paints the ring in the requested tone', () => {
    const { container } = render(
      <Checkbox shape="round" tone="warning" checked={false} onChange={vi.fn()} aria-label="S" />,
    );
    const paint = container.querySelector('span[aria-hidden="true"]') as HTMLElement;
    expect(paint.className).toContain('border-warning');
    expect(paint.className).toContain('bg-transparent');
  });

  it('fills solid when checked', () => {
    const { container } = render(
      <Checkbox shape="round" tone="success" checked onChange={vi.fn()} aria-label="S" />,
    );
    const paint = container.querySelector('span[aria-hidden="true"]') as HTMLElement;
    expect(paint.className).toContain('bg-success');
    expect(paint.querySelector('polyline')).not.toBeNull();
  });

  it('tints on hover while unchecked so the target is findable', () => {
    const { container } = render(
      <Checkbox shape="round" tone="info" checked={false} onChange={vi.fn()} aria-label="S" />,
    );
    const paint = container.querySelector('span[aria-hidden="true"]') as HTMLElement;
    expect(paint.className).toContain('peer-hover:bg-info/20');
  });

  it('defaults to the info tone', () => {
    const { container } = render(
      <Checkbox shape="round" checked onChange={vi.fn()} aria-label="S" />,
    );
    expect((container.querySelector('span[aria-hidden="true"]') as HTMLElement).className)
      .toContain('bg-info');
  });

  it('shows a dash and reports mixed when indeterminate', () => {
    const { container } = render(
      <Checkbox shape="round" checked={false} indeterminate onChange={vi.fn()} aria-label="S" />,
    );
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
    expect(container.querySelector('line')).not.toBeNull();
  });

  it('is 18px by default and resizes through className, not an inline style', () => {
    const { container, rerender } = render(
      <Checkbox shape="round" checked onChange={vi.fn()} aria-label="S" />,
    );
    expect(container.firstElementChild?.className).toContain('h-[18px]');
    expect(container.firstElementChild).not.toHaveAttribute('style');
    rerender(
      <Checkbox shape="round" checked onChange={vi.fn()} aria-label="S" className="h-[22px] w-[22px]" />,
    );
    expect(container.firstElementChild?.className).toContain('h-[22px]');
  });

  it('keeps data-testid on the input', () => {
    render(<Checkbox shape="round" data-testid="toggle" checked onChange={vi.fn()} aria-label="S" />);
    expect(screen.getByTestId('toggle').tagName).toBe('INPUT');
  });
});
