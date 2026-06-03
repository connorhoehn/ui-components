import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TrendSparkline } from '../TrendSparkline';

describe('TrendSparkline', () => {
  it('renders a role=img with the synthesized aria-label', () => {
    render(<TrendSparkline points={[0.1, 0.2, 0.5, 0.8]} />);
    const img = screen.getByRole('img');
    expect(img.getAttribute('aria-label')).toMatch(/4 points/);
    expect(img.getAttribute('aria-label')).toMatch(/starts/);
    expect(img.getAttribute('aria-label')).toMatch(/ends/);
  });

  it('respects an explicit ariaLabel', () => {
    render(<TrendSparkline points={[0, 1]} ariaLabel="Pass-rate sparkline" />);
    expect(screen.getByRole('img').getAttribute('aria-label')).toBe('Pass-rate sparkline');
  });

  it('renders a placeholder with em-dash for empty input', () => {
    render(<TrendSparkline points={[]} />);
    expect(screen.getByRole('img').getAttribute('aria-label')).toBe('No trend data');
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('filters non-finite values before rendering', () => {
    render(<TrendSparkline points={[1, NaN, 2, Infinity, 3]} ariaLabel="filtered" />);
    // 5 raw, 3 finite — should not crash and should render SVG path.
    const svg = document.querySelector('svg');
    expect(svg).not.toBeNull();
    const path = svg!.querySelector('path');
    expect(path).not.toBeNull();
  });

  it('handles all-equal values without div-by-zero', () => {
    // range = 0 in naive impl. Should still render without NaN coords.
    const { container } = render(<TrendSparkline points={[0.5, 0.5, 0.5]} />);
    const path = container.querySelector('svg path')!;
    expect(path.getAttribute('d')).not.toMatch(/NaN/);
  });

  it('honors showFill=false', () => {
    const { container } = render(<TrendSparkline points={[0, 1, 0]} showFill={false} />);
    const paths = container.querySelectorAll('svg path');
    // Without fill, only the line path renders (no fill polygon).
    expect(paths.length).toBe(1);
  });

  it('honors showLastPoint=false', () => {
    const { container } = render(<TrendSparkline points={[0, 1]} showLastPoint={false} />);
    expect(container.querySelector('svg circle')).toBeNull();
  });
});
