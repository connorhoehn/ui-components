import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThinkingDots } from '../ThinkingDots';

describe('ThinkingDots', () => {
  it('renders exactly three staggered dots', () => {
    const { container } = render(<ThinkingDots />);
    const dots = container.querySelectorAll('span > span');
    expect(dots).toHaveLength(3);
    const delays = Array.from(dots).map((d) => (d as HTMLElement).style.animation);
    expect(delays[0]).toContain('0s');
    expect(delays[1]).toContain('0.2s');
    expect(delays[2]).toContain('0.4s');
  });

  it('sm renders 4px dots, md 6px', () => {
    const { container, rerender } = render(<ThinkingDots size="sm" />);
    const first = () => container.querySelector('span > span') as HTMLElement;
    expect(first().style.width).toBe('4px');
    rerender(<ThinkingDots size="md" />);
    expect(first().style.width).toBe('6px');
  });

  it('accepts a color override', () => {
    const { container } = render(<ThinkingDots color="var(--color-info)" />);
    const first = container.querySelector('span > span') as HTMLElement;
    expect(first.style.background).toBe('var(--color-info)');
  });
});
