import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CollectionToolbar, collectionToolbarFitsHeader } from '../CollectionToolbar';
import { CollectionPage } from '../CollectionPage';
import { Button } from '../../ui/Button';

const search = { value: '', onChange: () => {}, 'aria-label': 'Search artworks' };

describe('CollectionToolbar search and empty chrome (2.503.0)', () => {
  it('collapses its search by default and opts out with collapsible: false', () => {
    const { rerender } = render(<CollectionToolbar label="Artworks" search={search} />);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Search artworks' }));
    expect(screen.getByRole('textbox', { name: 'Search artworks' })).toBeInTheDocument();
    rerender(<CollectionToolbar label="Artworks" search={{ ...search, collapsible: false }} />);
    expect(screen.getByRole('textbox', { name: 'Search artworks' })).toBeInTheDocument();
  });

  it('draws no count while the collection shows zero results', () => {
    const { container, rerender } = render(<CollectionToolbar label="Artworks" search={search} summary="0 of 0 artworks" resultCount={0} />);
    expect(screen.queryByText('0 of 0 artworks')).not.toBeInTheDocument();
    expect(container.querySelector('[data-collection-summary]')).toBeNull();
    rerender(<CollectionToolbar label="Artworks" search={search} summary="1 of 1 artworks" resultCount={1} />);
    expect(screen.getByText('1 of 1 artworks')).toBeInTheDocument();
  });

  it('draws its controls without a row of their own in header placement', () => {
    render(<CollectionToolbar label="Artworks" search={search} placement="header" />);
    const row = screen.getByRole('toolbar', { name: 'Artworks' });
    expect(row).toHaveAttribute('data-collection-placement', 'header');
    expect(row.className).not.toContain('py-1.5');
  });

  it('fits the header only when nothing in it needs a full row', () => {
    expect(collectionToolbarFitsHeader({ label: 'A', search })).toBe(true);
    expect(collectionToolbarFitsHeader({ label: 'A', search, selection: { count: 0, onClear: () => {} } })).toBe(false);
    expect(collectionToolbarFitsHeader({ label: 'A', search, children: <span>x</span> })).toBe(false);
  });
});

describe('CollectionPage hosts the toolbar in the header (2.503.0)', () => {
  it('puts search + filters in the header actions row, before the page action, with no separate band', () => {
    const { container } = render(<CollectionPage title="Artwork" headerActions={<Button>Generate artwork</Button>}
      toolbar={{ label: 'Artwork filters', search, filters: [{ id: 'kind', label: 'Kind', value: '', onChange: () => {}, options: [{ value: '', label: 'All' }] }] }}>
      <p>grid</p>
    </CollectionPage>);
    const header = screen.getByTestId('page-header');
    const toolbar = screen.getByRole('toolbar', { name: 'Artwork filters' });
    expect(header).toContainElement(toolbar);
    expect(header).toContainElement(screen.getByRole('button', { name: 'Filters' }));
    expect(toolbar.compareDocumentPosition(screen.getByRole('button', { name: 'Generate artwork' })) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.querySelectorAll('[role="toolbar"]')).toHaveLength(1);
  });

  it('keeps a band for a toolbar that needs a full row, or when asked', () => {
    const { rerender } = render(<CollectionPage title="Runs" toolbar={{ label: 'Run filters', search, selection: { count: 0, onClear: () => {} } }}><p>rows</p></CollectionPage>);
    expect(screen.getByTestId('page-header')).not.toContainElement(screen.getByRole('toolbar'));
    rerender(<CollectionPage title="Runs" toolbarPlacement="band" toolbar={{ label: 'Run filters', search }}><p>rows</p></CollectionPage>);
    expect(screen.getByTestId('page-header')).not.toContainElement(screen.getByRole('toolbar'));
  });
});
