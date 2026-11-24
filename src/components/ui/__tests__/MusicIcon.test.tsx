import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MusicIcon, PlayCircleIcon } from '../Icons';
import { MusicIcon as SharedMusicIcon } from '../../shared';

describe('MusicIcon', () => {
  it('draws on the same 16-unit grid and stroke as its neighbours, decorative', () => {
    const { container } = render(<><MusicIcon size={20} /><PlayCircleIcon size={20} /></>);
    const [music, play] = Array.from(container.querySelectorAll('svg'));
    for (const attr of ['viewBox', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'aria-hidden', 'width']) {
      expect(music.getAttribute(attr)).toBe(play.getAttribute(attr));
    }
    expect(music.getAttribute('width')).toBe('20');
    expect(music.querySelectorAll('circle')).toHaveLength(2);
  });

  it('is reachable from /shared', () => {
    const { container } = render(<SharedMusicIcon />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
