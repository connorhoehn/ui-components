import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CallTileRow, dockTilesThatFit } from '../CallTileRow';

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

  it('dock: collapses to the tiles that fit the measured row width, folded people keep their media mounted (2.436.0)', () => {
    expect(dockTilesThatFit(0, 240)).toBe(Number.POSITIVE_INFINITY);
    expect(dockTilesThatFit(952, 240)).toBe(3);
    expect(dockTilesThatFit(984, 240)).toBe(4);
    expect(dockTilesThatFit(100, 240)).toBe(1);
    // A row held to 952px whose four tiles need 984px.
    const width = vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(952);
    const scroll = vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(984);
    try {
      render(
        <CallTileRow
          variant="dock"
          tileWidth={240}
          tileHeight={135}
          localParticipant={p('me', 'Me', { isLocal: true })}
          participants={[p('a', 'Ada'), p('b', 'Bob'), p('c', 'Cy', { videoElement: <video data-testid="cy-video" /> })]}
        />,
      );
    } finally {
      width.mockRestore();
      scroll.mockRestore();
    }
    const row = screen.getByTestId('call-tile-row');
    expect(row.getAttribute('data-tile-count')).toBe('4');
    expect(row.getAttribute('data-visible-count')).toBe('2');
    expect([...row.querySelectorAll('[data-peer-id]')].map((t) => t.getAttribute('data-peer-id'))).toEqual(['me', 'a']);
    const overflow = screen.getByTestId('call-tile-overflow');
    expect(overflow.getAttribute('aria-label')).toBe('2 more');
    expect(overflow.getAttribute('title')).toBe('Bob, Cy');
    // Cy's video (which carries Cy's voice) stays mounted, invisibly, in the +N tile.
    expect(screen.getByTestId('call-tile-c-media-sink')).toContainElement(screen.getByTestId('cy-video'));
  });

  it('dock: a row sized to its content (no overflow) is never capped by its own width', () => {
    const width = vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(240);
    const scroll = vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(240);
    try {
      const people = [p('a', 'Ada'), p('b', 'Bob')];
      const { rerender } = render(<CallTileRow variant="dock" tileWidth={240} tileHeight={135} localParticipant={p('me', 'Me', { isLocal: true })} participants={[]} />);
      rerender(<CallTileRow variant="dock" tileWidth={240} tileHeight={135} localParticipant={p('me', 'Me', { isLocal: true })} participants={people} />);
    } finally {
      width.mockRestore();
      scroll.mockRestore();
    }
    expect(screen.getByTestId('call-tile-row').getAttribute('data-visible-count')).toBe('3');
    expect(screen.queryByTestId('call-tile-overflow')).toBeNull();
  });
});
