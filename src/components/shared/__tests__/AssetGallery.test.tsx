import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AssetGallery } from '../AssetGallery';
describe('AssetGallery', () => {
 it('delegates typed drags to the host without opening the item', () => {
 const open=vi.fn(),drag=vi.fn(),item={id:'one',title:'Cup',src:'/cup.png'};
 render(<AssetGallery label="Cast" items={[item]} onOpen={open} onDragStart={drag} />);
 const button=screen.getByRole('button',{name:'Inspect Cup'});expect(button).toHaveAttribute('draggable','true');
 fireEvent.dragStart(button);expect(drag).toHaveBeenCalledWith(item,expect.anything());expect(open).not.toHaveBeenCalled();
 expect(screen.getByRole('img')).toHaveAttribute('draggable','false');
 });
 it('opens the selected identity and keeps action controls outside its button', () => {
 const open=vi.fn(),action=vi.fn();const item={id:'one',title:'Cup'};
 render(<AssetGallery label="Cast" variant="avatars" items={[item]} onOpen={open} actions={()=> <button onClick={action}>Reveal</button>} />);
 fireEvent.click(screen.getByRole('button',{name:'Inspect Cup'}));expect(open).toHaveBeenCalledWith(item);
 fireEvent.click(screen.getByRole('button',{name:'Reveal'}));expect(action).toHaveBeenCalledOnce();expect(open).toHaveBeenCalledOnce();
 });
 it('shows an unavailable reference without a broken image',()=>{
 render(<AssetGallery label="References" items={[{id:'x',title:'Yard'}]} onOpen={()=>{}} />);
 expect(screen.getByText('Image unavailable')).toBeInTheDocument();
 });
});

describe('AssetGallery tile actions and status (2.503.0)', () => {
  const item = { id: 'mina', title: 'Mina' };
  const setup = (menuOnSelect = false) => {
    const open = vi.fn(), develop = vi.fn(), art = vi.fn();
    render(<AssetGallery label="Cast" variant="avatars" items={[item]} onOpen={open} menuOnSelect={menuOnSelect}
      tileActions={() => [{ id: 'develop', label: 'Develop Mina', icon: 'D', onClick: develop }, { id: 'art', label: 'Generate reference art', icon: 'A', onClick: art }]} />);
    return { open, develop, art };
  };
  it('draws the tile actions as a named roving toolbar outside the tile button', () => {
    const { develop, open } = setup();
    const bar = screen.getByRole('toolbar', { name: 'Mina actions' });
    expect(screen.getByRole('button', { name: 'Inspect Mina' })).not.toContainElement(bar);
    fireEvent.click(screen.getByRole('button', { name: 'Develop Mina' }));
    expect(develop).toHaveBeenCalledOnce();
    expect(open).not.toHaveBeenCalled();
  });
  it('opens the same actions as a context menu from the keyboard', () => {
    const { art } = setup();
    fireEvent.keyDown(screen.getByRole('button', { name: 'Inspect Mina' }), { key: 'F10', shiftKey: true });
    const menu = screen.getByRole('dialog', { name: 'Mina actions' });
    fireEvent.click(within(menu).getByRole('button', { name: 'Generate reference art' }));
    expect(art).toHaveBeenCalledOnce();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('with menuOnSelect, selecting a tile offers Open and the actions instead of opening it', () => {
    const { open } = setup(true);
    const tile = screen.getByRole('button', { name: 'Mina: actions' });
    fireEvent.click(tile);
    expect(open).not.toHaveBeenCalled();
    expect(tile).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(within(screen.getByRole('dialog', { name: 'Mina actions' })).getByRole('button', { name: 'Open' }));
    expect(open).toHaveBeenCalledWith(item);
  });
  it('draws a live status over the thumbnail', () => {
    const { container } = render(<AssetGallery label="Artwork" items={[{ id: 'r', title: 'Create artwork', status: { label: 'Running · Generate', tone: 'info' } }]} onOpen={() => {}} />);
    expect(container.querySelector('[data-gallery-status]')).toHaveTextContent('Running · Generate');
    expect(screen.getByText('No image yet')).toBeInTheDocument();
  });
});
