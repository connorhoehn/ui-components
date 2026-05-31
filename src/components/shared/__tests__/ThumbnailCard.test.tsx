import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThumbnailCard from '../ThumbnailCard';
import CatalogGrid from '../CatalogGrid';

describe('ThumbnailCard', () => {
  it('renders title and description', () => {
    render(<ThumbnailCard title="Pipeline editor" description="Drag-and-drop graph." />);
    expect(screen.getByText('Pipeline editor')).toBeInTheDocument();
    expect(screen.getByText('Drag-and-drop graph.')).toBeInTheDocument();
  });

  it('renders category chip when provided', () => {
    render(<ThumbnailCard title="Card" category="Pipelines" />);
    expect(screen.getByTestId('thumbnail-card-category')).toHaveTextContent('Pipelines');
  });

  it('omits category chip when no category provided', () => {
    render(<ThumbnailCard title="Card" />);
    expect(screen.queryByTestId('thumbnail-card-category')).not.toBeInTheDocument();
  });

  it('renders an <img> when thumbnail is provided', () => {
    const { container } = render(<ThumbnailCard title="x" thumbnail="https://example.com/img.png" />);
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img!.getAttribute('src')).toBe('https://example.com/img.png');
  });

  it('renders the icon fallback when no thumbnail is provided', () => {
    render(<ThumbnailCard title="x" icon="📦" />);
    expect(screen.getByText('📦')).toBeInTheDocument();
  });

  it('renders an anchor when href is provided', () => {
    render(<ThumbnailCard title="x" href="/foo" />);
    const link = screen.getByTestId('thumbnail-card');
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/foo');
  });

  it('renders a button when only onClick is provided', () => {
    const onClick = vi.fn();
    render(<ThumbnailCard title="x" onClick={onClick} />);
    const btn = screen.getByTestId('thumbnail-card');
    expect(btn.tagName).toBe('BUTTON');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a div when neither href nor onClick is provided (static)', () => {
    render(<ThumbnailCard title="x" />);
    const el = screen.getByTestId('thumbnail-card');
    expect(el.tagName).toBe('DIV');
  });

  it('renders a badge slot when provided', () => {
    render(<ThumbnailCard title="x" badge={<span>NEW</span>} />);
    expect(screen.getByTestId('thumbnail-card-badge')).toHaveTextContent('NEW');
  });

  it('respects the thumbnailHeight prop', () => {
    render(<ThumbnailCard title="x" thumbnailHeight={200} />);
    const thumb = screen.getByTestId('thumbnail-card-thumb') as HTMLElement;
    expect(thumb.style.height).toBe('200px');
  });
});

describe('CatalogGrid', () => {
  it('renders children inside the grid', () => {
    render(
      <CatalogGrid>
        <ThumbnailCard title="A" />
        <ThumbnailCard title="B" />
      </CatalogGrid>,
    );
    expect(screen.getByTestId('catalog-grid')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('records the column count on a data attribute', () => {
    render(
      <CatalogGrid columns={4}>
        <ThumbnailCard title="A" />
      </CatalogGrid>,
    );
    expect(screen.getByTestId('catalog-grid').getAttribute('data-columns')).toBe('4');
  });

  it('uses the dense gap when dense', () => {
    render(
      <CatalogGrid dense>
        <ThumbnailCard title="A" />
      </CatalogGrid>,
    );
    expect(screen.getByTestId('catalog-grid').className).toContain('gap-3');
  });

  it('uses the default gap when not dense', () => {
    render(
      <CatalogGrid>
        <ThumbnailCard title="A" />
      </CatalogGrid>,
    );
    expect(screen.getByTestId('catalog-grid').className).toContain('gap-5');
  });

  it('passes a custom data-testid through', () => {
    render(
      <CatalogGrid data-testid="my-grid">
        <ThumbnailCard title="A" />
      </CatalogGrid>,
    );
    expect(screen.getByTestId('my-grid')).toBeInTheDocument();
  });
});
