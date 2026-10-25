// 2.432.0: CallDock `layout="stack"` (the narrow call bar above a side-pane
// composer), `tileSize`, CallTileRow `maxColumns`, and ConversationCallDock's
// documents pass-through.
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CallTileRow } from '../CallTileRow';
import { CallDock, type CallDockParticipant, type CallDockProps } from '../CallDock';

const person = (userId: string, name: string): CallDockParticipant => ({
  id: userId, userId, displayName: name, cameraOn: true, audioOn: true, screenSharing: false, presenting: false, connection: 'connected',
});

function props(over: Partial<CallDockProps> = {}): CallDockProps {
  return {
    title: 'Auth architecture review', participantCount: 4, elapsedMs: 581_000, phase: 'active',
    participants: [person('me', 'Connor'), person('vera', 'Vera Green'), person('nora', 'Nora Chang'), person('nd', 'Nora DaSilva')],
    localParticipantId: 'me',
    mic: { on: true, onToggle: () => {}, devices: [], onSelectDevice: () => {}, permission: 'granted' },
    camera: { on: true, onToggle: () => {}, devices: [], onSelectDevice: () => {}, permission: 'granted' },
    screenShare: { on: false, onToggle: () => {} },
    onOpenPeople: () => {}, onOpenSettings: () => {}, onPopOut: () => {}, onLeave: () => {},
    ...over,
  };
}

describe('CallDock layout="stack"', () => {
  it('keeps mic, camera and Leave on the bar and folds the rest into ⋯', () => {
    const onOpenPeople = vi.fn();
    const onOpenDocuments = vi.fn();
    render(<CallDock {...props({ layout: 'stack', onOpenPeople, onOpenDocuments, documents: [{ id: 'd1', title: 'Auth architecture' }] })} />);
    const dock = screen.getByTestId('call-dock');
    expect(dock).toHaveAttribute('data-layout', 'stack');
    expect(within(dock).getByTestId('call-dock-title')).toHaveTextContent('Auth architecture review');
    expect(within(dock).getByText('4 people · 09:41')).toBeInTheDocument();
    for (const id of ['call-dock-mic', 'call-dock-camera', 'call-dock-leave', 'call-dock-more']) expect(within(dock).getByTestId(id)).toBeInTheDocument();
    for (const id of ['call-dock-share', 'call-dock-people', 'call-dock-documents', 'call-dock-settings', 'call-dock-popout']) expect(within(dock).queryByTestId(id)).toBeNull();
    fireEvent.click(screen.getByTestId('call-dock-more'));
    expect(screen.getByTestId('call-dock-share')).toBeInTheDocument();
    expect(screen.getByTestId('call-dock-settings')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('call-dock-people'));
    expect(onOpenPeople).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByTestId('call-dock-more'));
    fireEvent.click(screen.getByTestId('call-dock-documents'));
    expect(onOpenDocuments).toHaveBeenCalledOnce();
  });

  it('draws the tiles as a grid of at most two columns, the viewer first', () => {
    render(<CallDock {...props({ layout: 'stack' })} />);
    const grid = screen.getByTestId('call-dock-tile-row');
    expect(grid).toHaveAttribute('data-variant', 'grid');
    expect(grid).toHaveAttribute('data-tile-count', '4');
    expect(grid).toHaveAttribute('data-columns', '2');
    const first = grid.querySelector('[data-peer-id]')!;
    expect(first).toHaveAttribute('data-is-local', 'true');
  });

  it('calling: Leave reads Cancel and Share is disabled with its reason', () => {
    render(<CallDock {...props({ layout: 'stack', phase: 'calling', callingTo: 'Farah Osei', participants: [person('me', 'Connor')], participantCount: 1 })} />);
    expect(screen.getByText('Calling Farah Osei…')).toBeInTheDocument();
    expect(screen.getByTestId('call-dock-leave')).toHaveTextContent('Cancel');
    fireEvent.click(screen.getByTestId('call-dock-more'));
    expect(screen.getByTestId('call-dock-share')).toHaveAttribute('aria-disabled', 'true');
  });
});

describe('CallDock tileSize', () => {
  it.each([false, true])('dedicated stage keeps media and working controls together (compact=%s)', compact => {
    const onLeave = vi.fn();
    const onMute = vi.fn();
    const p = props({ layout: 'stage', compact, onLeave });
    render(<CallDock {...p} mic={{ ...p.mic, onToggle: onMute }} />);
    expect(screen.getByTestId('call-dock')).toHaveAttribute('data-layout', 'stage');
    expect(screen.getByTestId('call-dock-tile-row')).toHaveAttribute('data-variant', 'grid');
    fireEvent.click(screen.getByTestId('call-dock-mic'));
    expect(onMute).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByTestId('call-dock-leave'));
    expect(onLeave).toHaveBeenCalledOnce();
    expect(screen.queryByTestId('call-dock-more') !== null).toBe(compact);
  });

  it.each([
    ['sm', '132px', '74px'],
    ['md', '176px', '88px'],
    ['lg', '240px', '135px'],
  ] as const)('%s → %s × %s shelf tiles', (size, w, h) => {
    render(<CallDock {...props({ tileSize: size })} />);
    expect(screen.getByTestId('call-dock')).toHaveAttribute('data-tile-size', size);
    const tile = screen.getByTestId('call-dock-tile-row').querySelector('[data-peer-id]') as HTMLElement;
    expect(tile.style.width).toBe(w);
    expect(tile.style.height).toBe(h);
  });

  it('compact still means sm; tileSize wins over it', () => {
    const { unmount } = render(<CallDock {...props({ compact: true })} />);
    expect(screen.getByTestId('call-dock')).toHaveAttribute('data-tile-size', 'sm');
    unmount();
    render(<CallDock {...props({ compact: true, tileSize: 'lg' })} />);
    expect(screen.getByTestId('call-dock')).toHaveAttribute('data-tile-size', 'lg');
  });
});

describe('CallTileRow maxColumns', () => {
  it('caps the grid columns', () => {
    const remotes = Array.from({ length: 6 }, (_, i) => ({ id: `r${i}`, displayName: `R${i}` }));
    render(<CallTileRow variant="grid" maxColumns={2} participants={remotes} localParticipant={{ id: 'me', displayName: 'Me', isLocal: true }} />);
    expect(screen.getByTestId('call-tile-row')).toHaveAttribute('data-columns', '2');
    expect(screen.getByTestId('call-tile-row').className).toContain('grid-cols-2');
  });
});
