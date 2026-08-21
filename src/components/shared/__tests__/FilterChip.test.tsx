import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FilterChip } from '../FilterChip';

describe('FilterChip', () => {
  it('reports clicks and exposes active state via aria-pressed', () => {
    const onClick = vi.fn();
    render(<FilterChip active onClick={onClick}>Failed</FilterChip>);
    const chip = screen.getByRole('button', { name: 'Failed' });
    expect(chip).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(chip);
    expect(onClick).toHaveBeenCalled();
  });

  it('tints the active state from the color prop instead of the primary fill', () => {
    render(
      <FilterChip active color="#ff0080" onClick={() => {}} data-testid="chip">
        Design
      </FilterChip>,
    );
    const chip = screen.getByTestId('chip');
    // jsdom normalizes hex+alpha to rgba
    expect(chip.style.background).toContain('rgba(255, 0, 128');
    expect(chip.style.color).toBe('rgb(255, 0, 128)');
  });

  it('renders the dot only when asked', () => {
    const { rerender } = render(
      <FilterChip active={false} onClick={() => {}} data-testid="chip">x</FilterChip>,
    );
    const dotCount = () => screen.getByTestId('chip').querySelectorAll('span').length;
    const without = dotCount();
    rerender(
      <FilterChip active={false} onClick={() => {}} dot color="#ff0080" data-testid="chip">x</FilterChip>,
    );
    expect(dotCount()).toBe(without + 1);
  });

  it('disabled chips are disabled', () => {
    render(<FilterChip active={false} onClick={() => {}} disabled>x</FilterChip>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
