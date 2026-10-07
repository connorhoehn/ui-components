// 2.423.0: CallTileRow `variant="grid"` and CallDock / ConversationCallDock
// `layout="grid"` — the call's media panel as a reflowing participant grid.
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CallTileRow, type CallTileParticipant } from '../CallTileRow';
import { CallDock, type CallDockParticipant, type CallDockProps } from '../CallDock';

const tile = (id: string, displayName: string, over: Partial<CallTileParticipant> = {}): CallTileParticipant => ({ id, displayName, ...over });
const remotes = (n: number) => Array.from({ length: n }, (_, i) => tile(`r${i}`, `Remote ${i}`));

describe('CallTileRow variant="grid"', () => {
  it.each([
    [1, 0, '1', 'grid-cols-1'],
    [2, 1, '2', 'grid-cols-2'],
    [4, 3, '2', 'grid-cols-2'],
    [6, 5, '3', 'grid-cols-3'],
    [10, 9, '4', 'grid-cols-4'],
  ])('%i people → %s remote(s), %s columns', (count, remoteCount, cols, cls) => {
    render(<CallTileRow variant="grid" participants={remotes(remoteCount)} localParticipant={tile('me', 'Me', { isLocal: true })} />);
    const grid = screen.getByTestId('call-tile-row');
    expect(grid).toHaveAttribute('data-variant', 'grid');
    expect(grid).toHaveAttribute('data-tile-count', String(count));
    expect(grid).toHaveAttribute('data-columns', cols);
    expect(grid.className).toContain(cls);
    expect(grid.querySelectorAll('[data-peer-id]')).toHaveLength(count);
    expect(screen.queryByTestId('call-tile-overflow')).toBeNull();
  });

  it('draws the viewer first, inline, as "You", and tiles are fluid 16:9', () => {
    render(<CallTileRow variant="grid" participants={[tile('a', 'Ada')]} localParticipant={tile('me', 'Me', { isLocal: true })} />);
    const tiles = [...screen.getByTestId('call-tile-row').querySelectorAll('[data-peer-id]')] as HTMLElement[];
    expect(tiles.map((t) => t.getAttribute('data-peer-id'))).toEqual(['me', 'a']);
    expect(tiles[0]).toHaveAttribute('data-is-local', 'true');
    expect(within(tiles[0]!).getByText('You')).toBeInTheDocument();
    expect(within(tiles[1]!).getByText('Ada')).toBeInTheDocument();
    expect(tiles[1]!.className).toContain('aspect-video');
    expect(tiles[1]!.style.width).toBe('');
    expect(screen.queryByTestId('local-tile')).toBeNull();
  });

  it('camera off keeps the media playing in a 1px sink; mute is marked', () => {
    render(
      <CallTileRow
        variant="grid"
        participants={[tile('a', 'Ada', { videoElement: <video data-testid="ada-video" />, cameraOff: true, isMuted: true })]}
      />,
    );
    const ada = screen.getByTestId('call-tile-a');
    expect(ada).toHaveAttribute('data-track-kind', 'avatar');
    expect(ada).toHaveAttribute('data-is-muted', 'true');
    expect(within(screen.getByTestId('call-tile-a-media-sink')).getByTestId('ada-video')).toBeInTheDocument();
  });
});

const person = (userId: string, name: string, over: Partial<CallDockParticipant> = {}): CallDockParticipant => ({
  id: userId, userId, displayName: name, cameraOn: true, audioOn: true, screenSharing: false, presenting: false, connection: 'connected', ...over,
});

function props(over: Partial<CallDockProps> = {}): CallDockProps {
  return {
    title: 'Huddle', participantCount: 2, elapsedMs: 0, phase: 'active',
    participants: [person('me', 'Connor'), person('alice', 'Alice', { audioOn: false })], localParticipantId: 'me',
    mic: { on: true, onToggle: () => {}, devices: [], onSelectDevice: () => {}, permission: 'granted' },
    camera: { on: true, onToggle: () => {}, devices: [], onSelectDevice: () => {}, permission: 'granted' },
    screenShare: { on: false, onToggle: () => {} },
    onOpenPeople: () => {}, onOpenSettings: () => {}, onPopOut: () => {}, onLeave: () => {},
    ...over,
  };
}

describe('CallDock layout', () => {
  it('grid: only the tile stage — no header, controls or Leave', () => {
    render(<CallDock {...props({ layout: 'grid' })} />);
    const dock = screen.getByTestId('call-dock');
    expect(dock).toHaveAttribute('data-layout', 'grid');
    expect(screen.queryByTestId('call-dock-leave')).toBeNull();
    expect(screen.queryByTestId('call-dock-mic')).toBeNull();
    expect(screen.queryByTestId('call-dock-header')).toBeNull();
    const grid = screen.getByTestId('call-dock-tile-row');
    expect(grid).toHaveAttribute('data-variant', 'grid');
    expect(grid).toHaveAttribute('data-columns', '2');
    expect(screen.getByTestId('call-tile-alice')).toHaveAttribute('data-is-muted', 'true');
  });

  it('grid: connecting draws one fluid skeleton; reconnecting keeps its badge', () => {
    const { rerender } = render(<CallDock {...props({ layout: 'grid', phase: 'connecting' })} />);
    expect(screen.getByTestId('call-dock-connecting').firstElementChild!.className).toContain('aspect-video');
    rerender(<CallDock {...props({ layout: 'grid', phase: 'reconnecting' })} />);
    expect(screen.getByTestId('call-dock-reconnecting')).toBeInTheDocument();
  });

  it('shelf (default) is unchanged: header, controls and a dock row', () => {
    render(<CallDock {...props()} />);
    expect(screen.getByTestId('call-dock')).toHaveAttribute('data-layout', 'shelf');
    expect(screen.getByTestId('call-dock-leave')).toBeInTheDocument();
    expect(screen.getByTestId('call-dock-tile-row')).toHaveAttribute('data-variant', 'dock');
  });
});
