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

  it('lanes: one row of fixed columns that never wraps, marked as a board', () => {
    render(<CatalogGrid columns={4} variant="lanes">x</CatalogGrid>);
    const grid = screen.getByTestId('catalog-grid');
    expect(grid).toHaveAttribute('data-ui-board');
    expect(grid.className).toContain('grid-cols-[repeat(4,minmax(13rem,1fr))]');
    expect(grid.className).toContain('overflow-x-auto');
    expect(grid.className).not.toContain('grid-cols-1');
  });

  it('tiles (the default) carry no board marker', () => {
    render(<CatalogGrid>x</CatalogGrid>);
    expect(screen.getByTestId('catalog-grid')).not.toHaveAttribute('data-ui-board');
  });
});
