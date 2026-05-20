import { render, screen, fireEvent } from '@testing-library/react';
import Switch from '../Switch';

describe('Switch', () => {
  it('renders with role="switch" and aria-checked reflecting the state', () => {
    render(<Switch checked={false} onChange={() => {}} aria-label="enabled" />);
    const sw = screen.getByRole('switch', { name: 'enabled' });
    expect(sw).toHaveAttribute('aria-checked', 'false');
  });

  it('renders aria-checked=true when checked', () => {
    render(<Switch checked onChange={() => {}} aria-label="enabled" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange with the opposite value when clicked', () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} aria-label="enabled" />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('toggles back to false when clicked while checked', () => {
    const onChange = vi.fn();
    render(<Switch checked onChange={onChange} aria-label="enabled" />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} disabled aria-label="enabled" />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies disabled attribute', () => {
    render(<Switch checked={false} onChange={() => {}} disabled aria-label="enabled" />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('renders sm size with narrower track', () => {
    render(<Switch checked={false} onChange={() => {}} size="sm" aria-label="enabled" />);
    expect(screen.getByRole('switch').className).toMatch(/w-7/);
  });

  it('renders md size by default', () => {
    render(<Switch checked={false} onChange={() => {}} aria-label="enabled" />);
    expect(screen.getByRole('switch').className).toMatch(/w-9/);
  });

  it('supports aria-labelledby for use inside FormField', () => {
    render(<Switch checked={false} onChange={() => {}} aria-labelledby="lbl-1" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-labelledby', 'lbl-1');
  });

  it('exposes data-testid', () => {
    render(<Switch checked={false} onChange={() => {}} aria-label="x" data-testid="my-switch" />);
    expect(screen.getByTestId('my-switch')).toBeInTheDocument();
  });

  it('renders the knob in the off position when unchecked', () => {
    const { container } = render(
      <Switch checked={false} onChange={() => {}} aria-label="x" />,
    );
    const knob = container.querySelector('button > span');
    expect(knob?.className).toMatch(/translate-x-0\.5/);
  });

  it('renders the knob in the on position when checked', () => {
    const { container } = render(
      <Switch checked onChange={() => {}} aria-label="x" />,
    );
    const knob = container.querySelector('button > span');
    expect(knob?.className).toMatch(/translate-x-4/);
  });
});
