import { configure, render } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { CallDock, type CallDockParticipant, type CallDockProps } from '../CallDock';
import { setCallDockRenderProbe } from '../callDockRenderProbe';

const person = (userId: string, name: string, over: Partial<CallDockParticipant> = {}): CallDockParticipant => ({
  id: userId,
  userId,
  displayName: name,
  cameraOn: false,
  audioOn: true,
  screenSharing: false,
  presenting: false,
  connection: 'connected',
  ...over,
});

const PEOPLE = [person('me', 'Connor'), person('alice', 'Alice'), person('frank', 'Frank'), person('bob', 'Bob', { audioOn: false })];

// This file counts renders; StrictMode's double-invoked render would double
// every count and hide a real extra render inside the doubling.
beforeAll(() => configure({ reactStrictMode: false }));
afterAll(() => configure({ reactStrictMode: true }));

let tiles: Record<string, number>;
let meta: number;

beforeEach(() => {
  tiles = {};
  meta = 0;
  setCallDockRenderProbe((part, id) => {
    if (part === 'meta') meta++;
    else tiles[id!] = (tiles[id!] ?? 0) + 1;
  });
});
afterEach(() => setCallDockRenderProbe(null));

// What a host passes on every render: fresh objects and inline handlers, as a
// component that re-renders for its clock does.
function props(over: Partial<CallDockProps>): CallDockProps {
  return {
    title: 'Group DM',
    participantCount: 4,
    elapsedMs: 0,
    phase: 'active',
    participants: PEOPLE,
    localParticipantId: 'me',
    activeSpeakerId: 'alice',
    followingUserId: null,
    mic: { on: true, onToggle: () => {}, devices: [], onSelectDevice: () => {}, permission: 'granted' },
    camera: { on: false, onToggle: () => {}, devices: [], onSelectDevice: () => {}, permission: 'granted' },
    screenShare: { on: false, onToggle: () => {} },
    onOpenPeople: () => {},
    onOpenSettings: () => {},
    onPopOut: () => {},
    onLeave: () => {},
    onTileClick: () => {},
    ...over,
  };
}

const each = (n: number) => Object.fromEntries(PEOPLE.map((p) => [p.userId, n]));

describe('CallDock render budget', () => {
  it('five clock ticks render the meta five times and no tile', () => {
    const { rerender, getByTestId } = render(<CallDock {...props({})} />);
    expect(tiles).toEqual(each(1));
    expect(meta).toBe(1);
    for (let s = 1; s <= 5; s++) rerender(<CallDock {...props({ elapsedMs: s * 1000 })} />);
    expect(tiles).toEqual(each(1));
    expect(meta).toBe(6); // mount + 5 ticks
    expect(getByTestId('call-dock-meta').textContent).toBe('4 people · 00:05');
  });

  it('a host that rebuilds equal participant rows every tick still renders no tile', () => {
    const { rerender } = render(<CallDock {...props({})} />);
    for (let s = 1; s <= 5; s++) {
      rerender(<CallDock {...props({ elapsedMs: s * 1000, participants: PEOPLE.map((p) => ({ ...p })) })} />);
    }
    expect(tiles).toEqual(each(1));
  });

  it('a new active speaker re-renders only the two tiles whose ring changes', () => {
    const { rerender } = render(<CallDock {...props({})} />);
    rerender(<CallDock {...props({ elapsedMs: 1000, activeSpeakerId: 'frank' })} />);
    expect(tiles).toEqual({ me: 1, alice: 2, frank: 2, bob: 1 });
  });

  it('a changed participant re-renders only that tile', () => {
    const { rerender, getByTestId } = render(<CallDock {...props({})} />);
    const next = PEOPLE.map((p) => (p.userId === 'bob' ? { ...p, audioOn: true } : p));
    rerender(<CallDock {...props({ participants: next })} />);
    expect(tiles).toEqual({ me: 1, alice: 1, frank: 1, bob: 2 });
    expect(getByTestId('call-tile-bob').getAttribute('data-is-muted')).toBe('false');
  });

  it('the tile click reaches the latest inline handler', () => {
    const seen: string[] = [];
    const { rerender, getByTestId } = render(<CallDock {...props({ onTileClick: (id) => seen.push(`first:${id}`) })} />);
    rerender(<CallDock {...props({ elapsedMs: 1000, onTileClick: (id) => seen.push(`second:${id}`) })} />);
    getByTestId('call-tile-alice').click();
    expect(seen).toEqual(['second:alice']);
    expect(tiles).toEqual(each(1));
  });
});
