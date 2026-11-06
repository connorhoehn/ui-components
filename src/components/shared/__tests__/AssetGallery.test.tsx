import { render, screen, fireEvent } from '@testing-library/react';
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
