import { render, screen, fireEvent } from '@testing-library/react';
import { SelectableCard } from '../SelectableCard';

describe('SelectableCard', () => {
  it('is a button, not a div — pickers must be tabbable', () => {
    render(<SelectableCard>Sprint 42</SelectableCard>);
    expect(screen.getByRole('button', { name: 'Sprint 42' })).toBeInTheDocument();
  });

  it('reports selection through aria-pressed', () => {
    const { rerender } = render(<SelectableCard>x</SelectableCard>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
    rerender(<SelectableCard selected>x</SelectableCard>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('paints the selected chrome', () => {
    const { rerender } = render(<SelectableCard>x</SelectableCard>);
    expect(screen.getByRole('button').className).toContain('border-border');
    rerender(<SelectableCard selected>x</SelectableCard>);
    const cls = screen.getByRole('button').className;
    expect(cls).toContain('border-primary');
    expect(cls).toContain('bg-surface-hover');
  });

  it('keeps a focus ring — the thing every hand-rolled version lost', () => {
    render(<SelectableCard>x</SelectableCard>);
    expect(screen.getByRole('button').className).toContain('focus-visible:ring-2');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<SelectableCard onSelect={onSelect}>x</SelectableCard>);
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('does not fire when disabled', () => {
    const onSelect = vi.fn();
    render(<SelectableCard disabled onSelect={onSelect}>x</SelectableCard>);
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('defaults to the dense padding a grid wants', () => {
    render(<SelectableCard>x</SelectableCard>);
    expect(screen.getByRole('button').className).toContain('p-3');
  });

  it('never submits an enclosing form', () => {
    render(<SelectableCard>x</SelectableCard>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});
