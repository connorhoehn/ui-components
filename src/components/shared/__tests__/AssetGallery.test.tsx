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
 it('renders StatusPill props as a status on the card and describes the button with it', () => {
 render(<AssetGallery label="Cast" items={[{id:'a',title:'Cup',status:{state:'warning',label:'Needs review'}}]} onOpen={()=>{}} />);
 const pill=screen.getByText('Needs review');
 expect(pill.closest('[data-state]')).toHaveAttribute('data-state','warning');
 const button=screen.getByRole('button',{name:'Inspect Cup'});
 expect(button).toHaveAccessibleDescription('Needs review');
 expect(button).not.toContainElement(pill);
 // md (12px), not sm (10px): sm falls under the consumer type floor.
 expect(pill.closest('[data-state]')!.className).toContain('text-[12px]');
 });
 it('renders a node status as given', () => {
 render(<AssetGallery label="Cast" items={[{id:'a',title:'Cup',status:<em>Approved</em>}]} onOpen={()=>{}} />);
 expect(screen.getByText('Approved').tagName).toBe('EM');
 expect(screen.getByRole('button',{name:'Inspect Cup'})).toHaveAccessibleDescription('Approved');
 });
 it('omits the status slot and description when an item has none', () => {
 const {container}=render(<AssetGallery label="Cast" items={[{id:'a',title:'Cup'}]} onOpen={()=>{}} />);
 expect(container.querySelector('[data-gallery-status]')).toBeNull();
 expect(screen.getByRole('button',{name:'Inspect Cup'})).not.toHaveAttribute('aria-describedby');
 });
 it('keeps actions hover-revealed by default and visible at rest with actionsVisibility="always"', () => {
 const item={id:'a',title:'Cup'};
 const {container,rerender}=render(<AssetGallery label="Cast" items={[item]} onOpen={()=>{}} actions={()=> <button>Use</button>} />);
 const row=()=>container.querySelector('[data-gallery-actions]')!;
 expect(row()).toHaveAttribute('data-gallery-actions','hover');
 expect(row().className).toContain('opacity-0');
 rerender(<AssetGallery label="Cast" items={[item]} onOpen={()=>{}} actions={()=> <button>Use</button>} actionsVisibility="always" />);
 expect(row()).toHaveAttribute('data-gallery-actions','always');
 expect(row().className).not.toContain('opacity-0');
 });
});

describe('AssetGallery tile actions and status (2.504.0)', () => {
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
