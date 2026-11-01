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
