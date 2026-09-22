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

describe('ProgressBar completeTone and label slot', () => {
  const fillOf = (container: HTMLElement) =>
    container.querySelector('[role="progressbar"] > div') as HTMLElement;

  it('leaves the fill colour alone below 100%', () => {
    const { container } = render(
      <ProgressBar value={3} max={8} color="var(--color-info)" completeTone="success" />,
    );
    expect(fillOf(container).style.background).toBe('var(--color-info)');
  });

  it('switches the fill to the complete tone at 100%', () => {
    const { container } = render(
      <ProgressBar value={8} max={8} color="var(--color-info)" completeTone="success" />,
    );
    expect(fillOf(container).style.background).toBe('var(--color-success)');
  });

  it('does nothing at 100% without completeTone', () => {
    const { container } = render(<ProgressBar value={8} max={8} color="var(--color-info)" />);
    expect(fillOf(container).style.background).toBe('var(--color-info)');
  });

  it('tints the value readout with the complete tone too', () => {
    render(
      <ProgressBar value={5} max={5} label="5 / 5 done" showRatio={false} completeTone="success" />,
    );
    expect(screen.getByText('100%').className).toContain('text-success-fg');
  });

  it('keeps the readout neutral before completion', () => {
    render(
      <ProgressBar value={2} max={5} label="2 / 5 done" showRatio={false} completeTone="success" />,
    );
    expect(screen.getByText('40%').className).toContain('text-[var(--color-text-tertiary)]');
  });

  it('renders "n / N done" beside the percentage as the built-in label', () => {
    render(
      <ProgressBar value={3} max={5} label="3 / 5 done" showRatio={false} completeTone="success" />,
    );
    expect(screen.getByText('3 / 5 done')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
  });

  it('valueLabel replaces the computed readout', () => {
    render(<ProgressBar value={3} max={5} label="Steps" valueLabel="2 left" />);
    expect(screen.getByText('2 left')).toBeInTheDocument();
    expect(screen.queryByText('3/5')).toBeNull();
  });

  it('labelClassName lands on the label row', () => {
    render(<ProgressBar value={1} max={4} label="Steps" labelClassName="text-[11px]" />);
    expect(screen.getByText('Steps').parentElement?.className).toContain('text-[11px]');
  });
});
