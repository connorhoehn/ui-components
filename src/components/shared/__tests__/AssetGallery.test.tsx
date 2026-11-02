import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AssetGallery } from '../AssetGallery';
describe('AssetGallery', () => {
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
