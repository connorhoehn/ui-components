import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { EmbeddedCallPanel } from '../EmbeddedCallPanel';
import { AudioPlayer } from '../AudioPlayer';

afterEach(cleanup);

describe('EmbeddedCallPanel', () => {
  it('is a full-width block with a title, a count, a clock and a way out', () => {
    const onPopOut = vi.fn();
    render(
      <EmbeddedCallPanel title="Alice & Bob" subtitle="2 in call" durationSeconds={125} onPopOut={onPopOut} controls={<button type="button">mute</button>}>
        <div data-testid="tiles" />
      </EmbeddedCallPanel>,
    );
    const root = screen.getByTestId('embedded-call-panel');
    // No fixed pixel box: a column decides the width, the stage keeps 16:9.
    expect(root.className).toContain('w-full');
    expect(root.getAttribute('style')).toBeNull();
    expect(screen.getByTestId('embedded-call-panel-stage').className).toContain('aspect-video');
    expect(screen.getByTestId('embedded-call-panel-title')).toHaveTextContent('Alice & Bob');
    expect(screen.getByTestId('embedded-call-panel-subtitle')).toHaveTextContent('2 in call');
    expect(screen.getByTestId('embedded-call-panel-duration')).toHaveTextContent('2:05');
    expect(screen.getByTestId('tiles')).toBeTruthy();
    expect(screen.getByText('mute')).toBeTruthy();
    fireEvent.click(screen.getByTestId('embedded-call-panel-pop-out'));
    expect(onPopOut).toHaveBeenCalledTimes(1);
  });

  it('shortens the stage for an audio call and hides pop-out when there is nowhere to go', () => {
    render(<EmbeddedCallPanel title="Standup" stage="audio"><div /></EmbeddedCallPanel>);
    expect(screen.getByTestId('embedded-call-panel-stage').className).not.toContain('aspect-video');
    expect(screen.queryByTestId('embedded-call-panel-pop-out')).toBeNull();
  });
});

describe('AudioPlayer', () => {
  it('owns the element (no native controls) and drives it from its own buttons', () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(async function (this: HTMLMediaElement) { this.dispatchEvent(new Event('play')); });
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (this: HTMLMediaElement) { this.dispatchEvent(new Event('pause')); });
    const onFirstPlay = vi.fn();
    render(<AudioPlayer src="blob:x" onFirstPlay={onFirstPlay} durationHint={12} />);
    const el = screen.getByTestId('audio-player-element') as HTMLAudioElement;
    expect(el.hasAttribute('controls')).toBe(false);
    expect(el.className).toContain('hidden');
    expect(screen.getByTestId('audio-player-duration')).toHaveTextContent('0:12');

    fireEvent.click(screen.getByTestId('audio-player-toggle'));
    expect(play).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('audio-player').dataset.playing).toBe('true');
    expect(onFirstPlay).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('audio-player-toggle'));
    expect(pause).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('audio-player').dataset.playing).toBe('false');

    fireEvent.timeUpdate(el, { target: { currentTime: 5 } });
    play.mockRestore(); pause.mockRestore();
  });
});
