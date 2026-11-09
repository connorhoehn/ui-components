import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AssetGallery } from '../AssetGallery';
import { Button } from '../../ui/Button';

const items = [{ id: 'toby', title: 'Toby' }, { id: 'mina', title: 'Mina' }];
const actions = () => <><Button size="sm" variant="primary">Approve for mesh · uses credits</Button><Button size="sm" variant="secondary">Cut it out (no credits)</Button></>;

describe('AssetGallery minTileWidth and tile actions (2.515.0)', () => {
  it('fixed columns by default', () => {
    render(<AssetGallery label="Cast" variant="avatars" items={items} onOpen={() => {}} />);
    const grid = screen.getByRole('list', { name: 'Cast' });
    expect(grid).toHaveAttribute('data-gallery-columns', 'fixed');
    expect(grid.className).toContain('lg:grid-cols-8');
  });

  it('minTileWidth: auto-fill columns of at least that width, the avatar drawn at 80% of it', () => {
    render(<AssetGallery label="Cast" variant="avatars" items={items} onOpen={() => {}} minTileWidth={160} />);
    const grid = screen.getByRole('list', { name: 'Cast' });
    expect(grid).toHaveAttribute('data-gallery-columns', 'auto-fill');
    expect(grid.style.getPropertyValue('--gallery-min-tile')).toBe('160px');
    expect(grid.className).toContain('grid-cols-[repeat(auto-fill,minmax(min(var(--gallery-min-tile),100%),1fr))]');
    expect(grid.className).not.toContain('lg:grid-cols-8');
    const tile = grid.querySelector('[data-gallery-tile="toby"] [data-gallery-thumbnail] > *') as HTMLElement;
    expect(tile.style.width).toBe('128px');
    expect(tile.className).toContain('max-w-full');
  });

  it('the action row wraps inside the tile and its buttons wrap their labels instead of spilling', () => {
    render(<AssetGallery label="Cast" variant="avatars" items={items} onOpen={() => {}} minTileWidth={120} actions={actions} actionsVisibility="always" />);
    const tile = screen.getByRole('list', { name: 'Cast' }).querySelector('[data-gallery-tile="toby"]')!;
    const row = tile.querySelector('[data-ui-part="tile-actions"]') as HTMLElement;
    expect(row).toBeTruthy();
    expect(row.className).toMatch(/\bflex-wrap\b/);
    expect(row.className).toContain('max-w-full');
    expect(row.className).toContain('[&_button]:max-w-full');
    expect(row.className).toContain('[&_button]:whitespace-normal');
    expect(row.className).not.toMatch(/(^|\s)h-8(\s|$)/);
    expect(row).toContainElement(screen.getAllByRole('button', { name: 'Approve for mesh · uses credits' })[0]);
  });
});

describe('AssetGallery fit (2.515.0)', () => {
  it('cover by default; contain letterboxes and is marked', () => {
    const items = [{ id: 'a', title: 'Toby sheet', src: 'data:image/png;base64,AA==' }];
    const { rerender } = render(<AssetGallery items={items} label="Assets" onOpen={() => {}} />);
    expect(document.querySelector('[data-gallery-fit]')).toHaveAttribute('data-gallery-fit', 'cover');
    rerender(<AssetGallery items={items} label="Assets" fit="contain" onOpen={() => {}} />);
    expect(document.querySelector('[data-gallery-fit]')).toHaveAttribute('data-gallery-fit', 'contain');
    expect(screen.getByAltText('Toby sheet').className).toContain('object-contain');
  });
});
