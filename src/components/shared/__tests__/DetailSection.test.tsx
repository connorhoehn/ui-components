import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DetailSection } from '../DetailSection';

describe('DetailSection heading hierarchy', () => {
  it('preserves the default nested heading level', () => {
    render(<DetailSection title="Nested details">Content</DetailSection>);
    expect(screen.getByRole('heading', { level: 3, name: 'Nested details' })).toBeInTheDocument();
  });

  it.each(['label', 'heading'] as const)('can follow a page title in the %s variant without skipping h2', (variant) => {
    render(<><h1>Run</h1><DetailSection as="h2" variant={variant} title="Events">Content</DetailSection></>);
    expect(screen.getByRole('heading', { level: 2, name: 'Events' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3 })).toBeNull();
  });
});

describe('DetailSection heading title row (G129-1)', () => {
  it.each(['sm', 'md'] as const)('sits 4px over the body at %s (was 2px)', (size) => {
    const { container } = render(<DetailSection variant="heading" size={size} title="Voices">body</DetailSection>);
    const row = container.querySelector('[data-detail-section-title-row]') as HTMLElement;
    expect(row.className).toContain('mb-1');
    expect(row.className).not.toContain('mb-0.5');
  });
  it('keeps lg at 8px', () => {
    const { container } = render(<DetailSection variant="heading" size="lg" title="Voices">body</DetailSection>);
    expect((container.querySelector('[data-detail-section-title-row]') as HTMLElement).className).toContain('mb-2');
  });
});
