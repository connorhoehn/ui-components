import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionLabel } from '../SectionLabel';

// What this component exists to stop is DRIFT: the portal carried 128 inline
// copies of this caption across 45 files, at 10px and 11px, weight 600 and 700,
// tracking 0.05em and 0.06em. So the tests worth having are the ones that pin
// "one size, and it still composes", not that it renders its children.

describe('SectionLabel', () => {
  it('renders a span by default, so it can sit beside a count or chip', () => {
    render(<SectionLabel data-testid="sl">Variables</SectionLabel>);
    const el = screen.getByTestId('sl');
    expect(el.tagName).toBe('SPAN');
    expect(el).toHaveTextContent('Variables');
  });

  it('renders as a block element when the caption owns its line', () => {
    render(<SectionLabel as="div" data-testid="sl">Inference settings</SectionLabel>);
    expect(screen.getByTestId('sl').tagName).toBe('DIV');
  });

  it('carries one caption size, not a per-caller one', () => {
    // The absence of a `size` prop is the feature. If someone adds one, this
    // assertion is the place to argue about it rather than discovering three
    // sizes again a year later.
    render(<SectionLabel data-testid="sl">Screenshot</SectionLabel>);
    const cls = screen.getByTestId('sl').className;
    expect(cls).toContain('text-[11px]');
    expect(cls).toContain('uppercase');
    expect(cls).toContain('font-bold');
    expect(cls).toContain('tracking-[0.06em]');
  });

  it('uses a theme token for colour, never a literal', () => {
    // A hardcoded grey is invisible in dark mode and passes every test that only
    // checks the text.
    render(<SectionLabel data-testid="sl">X</SectionLabel>);
    const cls = screen.getByTestId('sl').className;
    expect(cls).toContain('text-text-tertiary');
    expect(cls).not.toMatch(/#[0-9a-f]{3,6}/i);
  });

  it('still accepts className for layout, without losing its own styling', () => {
    // Callers legitimately need margin/flex here; twMerge must not let a layout
    // class silently drop the typography.
    render(<SectionLabel className="mb-2" data-testid="sl">Baseline</SectionLabel>);
    const cls = screen.getByTestId('sl').className;
    expect(cls).toContain('mb-2');
    expect(cls).toContain('uppercase');
  });
});

describe('SectionLabel case', () => {
  it('defaults to the uppercase panel caption', () => {
    render(<SectionLabel data-testid="sl">Variables</SectionLabel>);
    expect(screen.getByTestId('sl').className).toContain('uppercase');
  });

  it('sentence case drops the uppercase and the wide tracking', () => {
    render(<SectionLabel case="sentence" data-testid="sl">If timeout</SectionLabel>);
    const cls = screen.getByTestId('sl').className;
    expect(cls).not.toContain('uppercase');
    expect(cls).toContain('normal-case');
    expect(cls).toContain('tracking-normal');
  });

  it('sentence case matches a form label: 12px, medium, primary text', () => {
    render(<SectionLabel case="sentence" data-testid="sl">If timeout</SectionLabel>);
    const cls = screen.getByTestId('sl').className;
    expect(cls).toContain('text-[12px]');
    expect(cls).toContain('font-medium');
    expect(cls).toContain('text-text-primary');
  });

  it('still composes with `as`', () => {
    render(<SectionLabel case="sentence" as="div" data-testid="sl">X</SectionLabel>);
    expect(screen.getByTestId('sl').tagName).toBe('DIV');
  });
});
