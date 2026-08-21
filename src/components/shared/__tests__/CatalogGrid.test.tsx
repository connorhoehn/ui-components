import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CatalogGrid } from '../CatalogGrid';

describe('CatalogGrid', () => {
  it('renders children inside a single-column-first grid', () => {
    render(
      <CatalogGrid>
        <div>tile</div>
      </CatalogGrid>,
    );
    const grid = screen.getByTestId('catalog-grid');
    expect(grid).toHaveTextContent('tile');
    expect(grid.className).toContain('grid-cols-1');
  });

  it('maps the columns prop onto breakpoint classes and data attribute', () => {
    render(<CatalogGrid columns={4}>x</CatalogGrid>);
    const grid = screen.getByTestId('catalog-grid');
    expect(grid.dataset.columns).toBe('4');
    expect(grid.className).toContain('lg:grid-cols-4');
  });

  it('dense tightens the gap', () => {
    const { rerender } = render(<CatalogGrid>x</CatalogGrid>);
    expect(screen.getByTestId('catalog-grid').className).toContain('gap-5');
    rerender(<CatalogGrid dense>x</CatalogGrid>);
    expect(screen.getByTestId('catalog-grid').className).toContain('gap-3');
  });
});
