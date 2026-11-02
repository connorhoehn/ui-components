import { render,screen,fireEvent } from '@testing-library/react';
import { describe,it,expect,vi } from 'vitest';
import { MediaCollectionCard } from '../MediaCollectionCard';
describe('MediaCollectionCard',()=>{
 it('browses previews without opening or playing until explicitly asked',()=>{
  const open=vi.fn(),play=vi.fn(),previews=[{id:'a',label:'Older',duration:'2:05'},{id:'b',label:'Partial',duration:'0:12'}];
  render(<MediaCollectionCard title="Episode 1" previews={previews} onOpen={open} onPlay={play}/>);
  expect(screen.getByRole('button',{name:'Previous preview for Episode 1'})).toBeDisabled();
  fireEvent.click(screen.getByRole('button',{name:'Next preview for Episode 1'}));expect(play).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button',{name:'Play Episode 1'}));expect(play).toHaveBeenCalledWith(previews[1]);
  fireEvent.click(screen.getByRole('button',{name:/^Episode 1$/}));expect(open).toHaveBeenCalledOnce();
 });
 it('does not invent playable media for an empty episode',()=>{
  render(<MediaCollectionCard title="Empty" previews={[]} onOpen={()=>{}} onPlay={()=>{}}/>);
  expect(screen.getByRole('button',{name:'Play Empty'})).toBeDisabled();expect(screen.getByText('Length unknown')).toBeInTheDocument();
 });
});
