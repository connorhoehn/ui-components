import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThinkingDots } from '../ThinkingDots';

// These used to assert on inline `style` — which is what they were testing,
// because the component built every dot with a style object and injected its
// own <style> block for the keyframes. The keyframes live in styles.css now,
// so the assertions are on the classes that reach them.

describe('ThinkingDots', () => {
  it('renders exactly three dots, staggered so they read as a wave', () => {
    const { container } = render(<ThinkingDots />);
    const dots = container.querySelectorAll('[data-testid="thinking-dots"] > span');
    expect(dots).toHaveLength(3);
    expect(dots[0].className).not.toContain('animation-delay');
    expect(dots[1].className).toContain('[animation-delay:200ms]');
    expect(dots[2].className).toContain('[animation-delay:400ms]');
    for (const dot of dots) expect(dot.className).toContain('ui-thinking-dot');
  });

  it('sm renders smaller dots than md', () => {
    const { container, rerender } = render(<ThinkingDots size="sm" />);
    const first = () => container.querySelector('[data-testid="thinking-dots"] > span')!;
    expect(first().className).toContain('h-1 w-1');
    rerender(<ThinkingDots size="md" />);
    expect(first().className).toContain('h-1.5 w-1.5');
  });

  it('takes its colour from the text around it', () => {
    // `bg-current` instead of a `color` prop: the caller sets a text colour the
    // way it does for every other glyph, and there is no second source of truth.
    const { container } = render(<ThinkingDots />);
    const dot = container.querySelector('[data-testid="thinking-dots"] > span')!;
    expect(dot.className).toContain('bg-current');
  });

  it('puts no <style> block in the document', () => {
    // One per instance is what it used to do, and the CSS text turned up inside
    // the element's own textContent — a typing indicator read as
    // "@keyframes thinkDot { … } Bob Martinez is typing…".
    const { container } = render(<ThinkingDots />);
    expect(container.querySelector('style')).toBeNull();
    expect(container.textContent).toBe('');
  });
});
