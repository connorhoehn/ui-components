import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageSection } from '../PageSection';
import { DetailSection } from '../../shared/DetailSection';

describe('PageSection divided (2.501.0)', () => {
  it('draws token-coloured rules between its direct child groups', () => {
    render(
      <PageSection size="sm" title="Overview" divided data-testid="ps">
        <p>one</p>
        <p>two</p>
      </PageSection>,
    );
    const groups = screen.getByTestId('ps-groups');
    expect(groups.hasAttribute('data-section-divided')).toBe(true);
    expect(groups.className).toContain('divide-y');
    expect(groups.className).toContain('divide-border');
    expect(groups.className).toContain('var(--ui-section-gap');
    expect(groups.children).toHaveLength(2);
  });

  it('renders children unwrapped by default', () => {
    const { container } = render(<PageSection size="sm" title="Overview"><p>one</p></PageSection>);
    expect(container.querySelector('[data-section-divided]')).toBeNull();
  });

  it('draws no groups wrapper for an empty section', () => {
    const { container } = render(<PageSection size="sm" title="Overview" divided empty="Nothing"><p>one</p></PageSection>);
    expect(container.querySelector('[data-section-divided]')).toBeNull();
  });
});

describe('DetailSection heading divider (2.501.0)', () => {
  it('draws a leading hairline like the label variant', () => {
    const { container } = render(<DetailSection variant="heading" title="Plan next">x</DetailSection>);
    expect(container.querySelector('hr')).not.toBeNull();
  });

  it('first suppresses it', () => {
    const { container } = render(<DetailSection variant="heading" first title="Plan next">x</DetailSection>);
    expect(container.querySelector('hr')).toBeNull();
  });
});
