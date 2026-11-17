import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TakeRow } from '../TakeRow';

describe('TakeRow', () => {
  it('shows the name, tags, measure, detail and actions of one take', () => {
    render(
      <TakeRow
        data-testid="take"
        play={<button type="button">Play</button>}
        title="Take 2a"
        tags={<span>Proposed</span>}
        meta="4.48 s · every word heard"
        detail="Morning, desk."
        actions={<button type="button">Keep take 2a</button>}
      />,
    );
    const row = screen.getByTestId('take');
    expect(row.textContent).toContain('Take 2a');
    expect(row.textContent).toContain('Proposed');
    expect(row.textContent).toContain('4.48 s · every word heard');
    expect(row.textContent).toContain('Morning, desk.');
    expect(screen.getByRole('button', { name: 'Keep take 2a' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Play' })).toBeTruthy();
  });

  it('marks the chosen take as selected and leaves out empty slots', () => {
    const { container, rerender } = render(<TakeRow data-testid="take" title="Take 1" selected />);
    const row = screen.getByTestId('take');
    expect(row.getAttribute('data-selected')).toBe('true');
    expect(row.className).toContain('border-primary');
    expect(container.querySelectorAll('button')).toHaveLength(0);
    rerender(<TakeRow data-testid="take" title="Take 1" />);
    expect(screen.getByTestId('take').getAttribute('data-selected')).toBeNull();
  });
});
