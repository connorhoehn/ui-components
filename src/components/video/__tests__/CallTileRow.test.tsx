import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CallTileRow } from '../CallTileRow';

const p = (id: string, displayName: string, over: Record<string, unknown> = {}) => ({ id, displayName, ...over });

describe('CallTileRow', () => {
  it('draws every participant as a tile, the viewer last, at the requested width', () => {
    render(
      <CallTileRow
        participants={[p('a', 'Ada'), p('b', 'Bob', { isMuted: true })]}
        localParticipant={p('me', 'Me', { isLocal: true })}
        activeSpeakerId="b"
        tileWidth={120}
        title="standup"
        variant="bar"
        controls={<button type="button">Leave</button>}
      />,
    );
    const row = screen.getByTestId('call-tile-row');
    expect(row.getAttribute('data-tile-count')).toBe('3');
    const tiles = [...screen.getByTestId('call-tile-row-tiles').querySelectorAll('[data-peer-id]')];
    expect(tiles.map((t) => t.getAttribute('data-peer-id'))).toEqual(['a', 'b', 'me']);
    expect((tiles[0] as HTMLElement).style.width).toBe('120px');
    expect(tiles[1].getAttribute('data-is-muted')).toBe('true');
    expect(screen.getByTestId('call-tile-row-title').textContent).toBe('standup');
    expect(screen.getByText('Leave')).toBeInTheDocument();
  });

  it('reports which tile was clicked', () => {
    const onClick = vi.fn();
    render(<CallTileRow participants={[p('a', 'Ada', { videoElement: <video /> }), p('b', 'Bob')]} onParticipantClick={onClick} />);
    fireEvent.click(screen.getByTestId('remote-tile'));
    fireEvent.click(screen.getByTestId('remote-bubble'));
    expect(onClick).toHaveBeenCalledWith('b');
    expect(onClick).toHaveBeenCalledWith('a');
  });

  it('floats by default: no bar behind the tiles, controls centred beneath', () => {
    render(
      <CallTileRow
        participants={[p('a', 'Ada', { videoElement: <video data-testid="ada-video" /> }), p('b', 'Bob', { isMuted: true })]}
        localParticipant={p('me', 'Me', { isLocal: true })}
        controls={<button type="button">Leave</button>}
      />,
    );
    const row = screen.getByTestId('call-tile-row');
    expect(row.getAttribute('data-variant')).toBe('floating');
    expect(row.className).not.toContain('bg-video-stage');
    expect(row.className).toContain('w-fit');
    // Camera on: a rounded video card. Camera off: an avatar bubble, muted mark and all.
    expect(screen.getByTestId('remote-tile').className).toContain('rounded-xl');
    expect(screen.getByTestId('remote-bubble').getAttribute('data-is-muted')).toBe('true');
    expect(screen.getByTestId('local-bubble').getAttribute('aria-label')).toBe('Me (you)');
    // Controls are there for hover/focus, not painted over the page by default.
    expect(screen.getByTestId('call-tile-row-controls').className).toContain('opacity-0');
  });
});
