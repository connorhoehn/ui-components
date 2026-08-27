import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DotMeter } from '../DotMeter';

const dots = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('span[class*="rounded-full"]'));

describe('DotMeter', () => {
  it('exposes the value to assistive tech as a meter', () => {
    render(<DotMeter label="current" value={0.55} note="⟳ 2hr" />);
    const meter = screen.getByRole('meter');
    expect(meter.getAttribute('aria-valuenow')).toBe('55');
    expect(meter.getAttribute('aria-label')).toBe('current: 55%, ⟳ 2hr');
  });

  it('renders the requested number of segments', () => {
    const { container } = render(<DotMeter value={0.5} segments={8} />);
    expect(dots(container)).toHaveLength(8);
  });

  it('never shows a full row below 100%', () => {
    // Rounding alone would fill all ten dots at 96%, which reads as spent
    // when it is not — the last dot has to mean something.
    const { container } = render(<DotMeter value={0.96} segments={10} />);
    const filled = dots(container).filter((d) => !d.className.includes('bg-code-raised'));
    expect(filled).toHaveLength(9);
  });

  it('fills every segment at exactly 100%', () => {
    const { container } = render(<DotMeter value={1} segments={10} />);
    const filled = dots(container).filter((d) => !d.className.includes('bg-code-raised'));
    expect(filled).toHaveLength(10);
  });

  it('clamps values outside 0–1 instead of overflowing', () => {
    const { rerender } = render(<DotMeter value={5} />);
    expect(screen.getByRole('meter').getAttribute('aria-valuenow')).toBe('100');
    rerender(<DotMeter value={-3} />);
    expect(screen.getByRole('meter').getAttribute('aria-valuenow')).toBe('0');
  });

  it('treats a non-finite value as empty rather than rendering NaN', () => {
    render(<DotMeter value={Number.NaN} />);
    expect(screen.getByRole('meter').getAttribute('aria-valuenow')).toBe('0');
    expect(screen.getByText('0%')).toBeTruthy();
  });

  it('switches tone only above the warn threshold', () => {
    const { container, rerender } = render(<DotMeter value={0.5} warnAbove={0.85} />);
    expect(container.innerHTML).not.toContain('bg-code-peach');
    rerender(<DotMeter value={0.9} warnAbove={0.85} />);
    expect(container.innerHTML).toContain('bg-code-peach');
  });

  it('can hide the percentage for a count-shaped meter', () => {
    render(<DotMeter value={0.375} segments={8} showPercent={false} note="3 of 8 open" />);
    expect(screen.queryByText('38%')).toBeNull();
    expect(screen.getByText('3 of 8 open')).toBeTruthy();
  });
});
