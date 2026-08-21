import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('renders a status role with the default accessible name', () => {
    render(<Spinner />);
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('honors a custom aria-label', () => {
    render(<Spinner aria-label="Fetching runs" />);
    expect(screen.getByRole('status', { name: 'Fetching runs' })).toBeInTheDocument();
  });

  it('sizes via the size prop', () => {
    render(<Spinner size="lg" data-testid="sp" />);
    expect(screen.getByTestId('sp').className).toContain('w-[28px]');
  });

  it('defaults the arc to the primary token and accepts an override', () => {
    const { rerender } = render(<Spinner data-testid="sp" />);
    expect(screen.getByTestId('sp').style.borderTopColor).toBe('var(--color-primary)');
    rerender(<Spinner data-testid="sp" color="var(--color-danger)" />);
    expect(screen.getByTestId('sp').style.borderTopColor).toBe('var(--color-danger)');
  });
});
