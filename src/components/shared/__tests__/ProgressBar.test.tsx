import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressBar } from '../ProgressBar';

describe('ProgressBar', () => {
  it('exposes a progressbar with clamped value and max', () => {
    render(<ProgressBar value={150} max={100} aria-label="Upload" />);
    const bar = screen.getByRole('progressbar', { name: 'Upload' });
    expect(bar).toHaveAttribute('aria-valuenow', '100');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('clamps negative values to zero', () => {
    render(<ProgressBar value={-5} aria-label="p" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('shows ratio by default and percentage with showRatio=false', () => {
    const { rerender } = render(<ProgressBar value={3} max={8} label="Steps" />);
    expect(screen.getByText('3/8')).toBeInTheDocument();
    rerender(<ProgressBar value={3} max={8} label="Steps" showRatio={false} />);
    expect(screen.getByText('38%')).toBeInTheDocument();
  });

  it('widths the fill to the percentage and honors a color override', () => {
    const { container } = render(<ProgressBar value={25} color="var(--color-success)" />);
    const fill = container.querySelector('[role="progressbar"] > div') as HTMLElement;
    expect(fill.style.width).toBe('25%');
    expect(fill.style.background).toBe('var(--color-success)');
  });

  it('treats a non-positive max as 100 instead of dividing by zero', () => {
    render(<ProgressBar value={50} max={0} aria-label="p" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100');
  });
});
