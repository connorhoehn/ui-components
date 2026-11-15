import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CallTileRow, wrappedDockItems } from '../CallTileRow';

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

  it('dock: the tiles past the row width wrap out of sight, stay mounted, and a +N badge names them (2.436.4)', () => {
    expect(wrappedDockItems([])).toEqual([]);
    expect(wrappedDockItems([{ offsetTop: 0 }, { offsetTop: 0 }, { offsetTop: 143 }, { offsetTop: 143 }])).toEqual([2, 3]);
    // Bob and Cy are on the clipped second line; the row is 3 tiles' worth wide.
    const top = vi.spyOn(HTMLElement.prototype, 'offsetTop', 'get').mockImplementation(function (this: HTMLElement) {
      return ['b', 'c'].includes(this.dataset.peerId ?? '') ? 143 : 0;
    });
    const left = vi.spyOn(HTMLElement.prototype, 'offsetLeft', 'get').mockImplementation(function (this: HTMLElement) {
      return this.dataset.peerId === 'a' ? 248 : 0;
    });
    const width = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(240);
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
      top.mockRestore();
      left.mockRestore();
      width.mockRestore();
    }
    const row = screen.getByTestId('call-tile-row');
    expect(row.getAttribute('data-tile-count')).toBe('4');
    expect(row.getAttribute('data-hidden-count')).toBe('2');
    expect(row.style.height).toBe('135px');
    // Everyone stays mounted (Cy's video carries Cy's voice); the badge sits at Ada's right edge.
    expect([...row.querySelectorAll('[data-peer-id]')].map((t) => t.getAttribute('data-peer-id'))).toEqual(['me', 'a', 'b', 'c']);
    expect(screen.getByTestId('cy-video')).toBeInTheDocument();
    const badge = screen.getByTestId('call-tile-wrapped');
    expect(badge).toHaveTextContent('+2');
    expect(badge.getAttribute('aria-label')).toBe('2 more: Bob, Cy');
    expect(badge.style.left).toBe('484px');
  });

  it('dock: nothing wraps in a row sized to its content — no badge', () => {
    render(<CallTileRow variant="dock" tileWidth={240} tileHeight={135} localParticipant={p('me', 'Me', { isLocal: true })} participants={[p('a', 'Ada'), p('b', 'Bob')]} />);
    expect(screen.getByTestId('call-tile-row').getAttribute('data-hidden-count')).toBe('0');
    expect(screen.queryByTestId('call-tile-wrapped')).toBeNull();
  });

  it('dock: past maxVisible the +N tile still folds the rest, keeping their media mounted', () => {
    const people = Array.from({ length: 7 }, (_, i) => p(`p${i}`, `Person ${i}`, i === 6 ? { videoElement: <video data-testid="p6-video" /> } : {}));
    render(<CallTileRow variant="dock" participants={people} maxVisible={6} />);
    expect(screen.getByTestId('call-tile-overflow').getAttribute('aria-label')).toBe('2 more');
    expect(screen.getByTestId('call-tile-p6-media-sink')).toContainElement(screen.getByTestId('p6-video'));
  });
});


it('gallery keeps every media sink mounted across participant and camera changes', () => {
  const people = [p('a', 'Ada', { videoElement: <video data-testid="gallery-media" /> })];
  const { rerender } = render(<CallTileRow variant="gallery" participants={people} />);
  const media = screen.getByTestId('gallery-media');
  expect(screen.getByTestId('call-tile-row')).toHaveAttribute('data-variant', 'gallery');
  rerender(<CallTileRow variant="gallery" participants={[{ ...people[0], cameraOff: true }, ...Array.from({ length: 11 }, (_, i) => p(`extra${i}`, `Person ${i}`))]} />);
  expect(screen.getByTestId('call-tile-row')).toHaveAttribute('data-tile-count', '12');
  expect(screen.getByTestId('gallery-media')).toBe(media);
  expect(screen.queryByTestId('call-tile-overflow')).toBeNull();
});

describe('CallTileRow dock wrap (2.529.0)', () => {
  const people = (n: number) => Array.from({ length: n }, (_, i) => p(`r${i}`, `Person ${i}`));

  it('draws every person side by side at one fixed size, the viewer first as You, with no +N and nothing clipped', () => {
    render(<CallTileRow variant="dock" wrap participants={people(2)} localParticipant={p('me', 'Me', { isLocal: true })}
      activeSpeakerId="r1" tileWidth={120} tileHeight={68} data-testid="row" />);
    const row = screen.getByTestId('row');
    expect(row).toHaveAttribute('data-wrap', 'true');
    expect(row.className).toContain('flex-wrap');
    expect(row.className).not.toContain('overflow-hidden');
    const tiles = [...row.querySelectorAll<HTMLElement>('[data-peer-id]')];
    expect(tiles.map((t) => t.getAttribute('data-peer-id'))).toEqual(['me', 'r0', 'r1']);
    expect(tiles[0]).toHaveAttribute('aria-label', 'You');
    for (const t of tiles) { expect(t.style.width).toBe('120px'); expect(t.style.height).toBe('68px'); }
    expect(screen.getByTestId('call-tile-r1-ring')).toHaveAttribute('data-ring', 'speaking');
    expect(screen.queryByTestId('call-tile-wrapped')).toBeNull();
    expect(screen.queryByTestId('call-tile-overflow')).toBeNull();
    expect(row).toHaveAttribute('data-hidden-count', '0');
  });

  it('a camera-off person is their avatar, never an empty box', () => {
    render(<CallTileRow variant="dock" wrap participants={[p('r0', 'Vera Green')]} tileWidth={120} tileHeight={68} />);
    const tile = screen.getByTestId('call-tile-r0');
    expect(tile).toHaveAttribute('data-track-kind', 'avatar');
    expect(tile.textContent).toContain('VG');
  });

  it('past maxVisible the last tile shown carries +N naming the rest, whose media stays mounted', () => {
    const rest = [...people(6), p('r6', 'Late Joiner', { audioElement: <audio data-testid="late-audio" /> })];
    render(<CallTileRow variant="dock" wrap participants={rest} localParticipant={p('me', 'Me', { isLocal: true })}
      maxVisible={6} tileWidth={120} tileHeight={68} data-testid="row" />);
    const row = screen.getByTestId('row');
    expect(row.querySelectorAll('[data-peer-id]')).toHaveLength(6);
    const badge = screen.getByTestId('call-tile-wrapped');
    expect(badge).toHaveTextContent('+2');
    expect(badge).toHaveAttribute('aria-label', '2 more: Person 5, Late Joiner');
    expect(badge.parentElement).toContainElement(screen.getByTestId('call-tile-r4'));
    expect(screen.getByTestId('late-audio')).toBeInTheDocument();
  });
});
