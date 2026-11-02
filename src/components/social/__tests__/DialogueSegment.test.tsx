import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DialogueSegment } from '../DialogueSegment';
describe('DialogueSegment', () => {
  it('keeps the full line accessible and gives host actions their actual trigger', () => {
    const play = vi.fn(), queue = vi.fn();
    render(<DialogueSegment author="Peb" text="I like this spot." metadata="Scene 2" actions={[
      { id:'play', label:'Play line', icon:'P', onClick:play },
      { id:'queue', label:'Queue for rework', icon:'Q', onClick:queue },
    ]} />);
    expect(screen.getByText('I like this spot.')).toHaveAttribute('title','I like this spot.');
    const p=screen.getByRole('button',{name:'Play line'}),q=screen.getByRole('button',{name:'Queue for rework'});
    expect(p.tabIndex).toBe(0);expect(q.tabIndex).toBe(-1);
    p.focus(); fireEvent.keyDown(p,{key:'ArrowRight'});expect(q).toHaveFocus();
    fireEvent.click(q);expect(queue).toHaveBeenCalledWith(q);expect(play).not.toHaveBeenCalled();
  });
  it('disabled play is not reachable; an image failure falls back to character initials', () => {
    render(<DialogueSegment author="Map" avatarUrl="/missing.png" text="Hello" actions={[
      {id:'play',label:'No take',icon:'P',disabled:true,onClick:vi.fn()},
      {id:'queue',label:'Queue',icon:'Q',onClick:vi.fn()},
    ]} />);
    expect(screen.getByRole('button',{name:'No take'})).toBeDisabled();
    expect(screen.getByRole('button',{name:'Queue'}).tabIndex).toBe(0);
    fireEvent.error(screen.getByRole('img',{name:'Map'}));expect(screen.queryByRole('img')).toBeNull();
  });
});
