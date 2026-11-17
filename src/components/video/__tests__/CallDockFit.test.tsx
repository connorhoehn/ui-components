// CallDock `fit` and the grid's connecting "You". `fit="width"` (the default)
// must not move a byte of the markup every existing host renders: the golden
// strings beside this file are what 2.535.1 rendered for the same cases.
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import golden from './CallDockFit.golden.json';
import { CallDock, type CallDockParticipant, type CallDockProps } from '../CallDock';
import { CallTileRow, type CallTileParticipant } from '../CallTileRow';
import { gridFit } from '../gridFit';
import { setCallDockRenderProbe } from '../callDockRenderProbe';

let tileRenders: string[] = [];
const resetCallDockRenderCounts = () => { tileRenders = []; };
const callDockRenderCounts = () => ({ tile: tileRenders.length, ids: new Set(tileRenders) });

const person = (userId: string, name: string, over: Partial<CallDockParticipant> = {}): CallDockParticipant => ({
  id: userId, userId, displayName: name, cameraOn: true, audioOn: true, screenSharing: false, presenting: false, connection: 'connected', ...over,
});
function props(over: Partial<CallDockProps> = {}): CallDockProps {
  return {
    title: 'Call', participantCount: 2, elapsedMs: 0, phase: 'active',
    participants: [person('me', 'Ada'), person('b', 'Ben', { audioOn: false, cameraOn: false })], localParticipantId: 'me',
    mic: { on: true, onToggle: () => {}, devices: [], onSelectDevice: () => {}, permission: 'granted' },
    camera: { on: true, onToggle: () => {}, devices: [], onSelectDevice: () => {}, permission: 'granted' },
    screenShare: { on: false, onToggle: () => {} },
    onOpenPeople: () => {}, onOpenSettings: () => {}, onPopOut: () => {}, onLeave: () => {},
    layout: 'grid',
    ...over,
  };
}
const five = ['me', 'b', 'c', 'd', 'e'].map((id) => person(id, id.toUpperCase()));
const ids = (html: string) => html.replace(/_r_[0-9a-z]+_/g, '_r_');

describe('gridFit', () => {
  it('one tile fills as much of the box as 16:9 allows', () => {
    expect(gridFit(1, 1600, 900, 12)).toEqual({ columns: 1, rows: 1, tileWidth: 1600, tileHeight: 900 });
    // A tall box: the width binds.
    expect(gridFit(1, 800, 1200, 12)).toEqual({ columns: 1, rows: 1, tileWidth: 800, tileHeight: 450 });
    // A short, wide box: the height binds, nothing overflows.
    expect(gridFit(1, 1600, 300, 12)).toMatchObject({ columns: 1, tileWidth: 533, tileHeight: 299 });
  });

  it('two sit side by side in a wide box and stacked in a tall one', () => {
    expect(gridFit(2, 1600, 500, 12)).toMatchObject({ columns: 2, rows: 1 });
    expect(gridFit(2, 800, 1000, 12)).toMatchObject({ columns: 1, rows: 2, tileWidth: 800 });
  });

  it.each([1, 2, 3, 4, 5, 7, 9, 12])('%i tiles: every tile visible inside the box', (n) => {
    for (const [w, h] of [[1200, 800], [600, 1100], [1400, 360], [320, 240]] as const) {
      const f = gridFit(n, w, h, 12);
      expect(f.columns * f.rows).toBeGreaterThanOrEqual(n);
      expect(f.columns * f.tileWidth + (f.columns - 1) * 12).toBeLessThanOrEqual(w);
      expect(f.rows * f.tileHeight + (f.rows - 1) * 12).toBeLessThanOrEqual(h);
      // No other column count gives a larger tile.
      for (let c = 1; c <= n; c += 1) {
        const r = Math.ceil(n / c);
        const other = Math.min((w - 12 * (c - 1)) / c, ((h - 12 * (r - 1)) / r) * 16 / 9);
        expect(Math.floor(other)).toBeLessThanOrEqual(f.tileWidth);
      }
    }
  });

  it('an empty box or no tiles gives a zero tile', () => {
    expect(gridFit(0, 800, 600)).toEqual({ columns: 1, rows: 0, tileWidth: 0, tileHeight: 0 });
    expect(gridFit(3, 0, 600)).toMatchObject({ tileWidth: 0, tileHeight: 0 });
  });
});

describe('CallDock fit="width" (the default)', () => {
  it('renders exactly what 2.535.1 did, named or not', () => {
    const cases = (fit?: 'width') => [
      props({ fit }),
      props({ fit, participants: five, participantCount: 5, className: 'h-full min-h-0' }),
      props({ fit, phase: 'connecting', participants: [], localParticipantId: '' }),
      props({ fit, phase: 'reconnecting' }),
      props({ fit, layout: 'stage' }),
      props({ fit, layout: 'compact', phase: 'connecting' }),
    ];
    for (const fit of [undefined, 'width'] as const) {
      cases(fit).forEach((p, i) => {
        const { container } = render(<CallDock {...p} />);
        expect(ids(container.innerHTML)).toBe(ids((golden as string[])[i]!));
        cleanup();
      });
    }
  });

  it('fit="contain" changes nothing outside layout="grid"', () => {
    for (const layout of ['stage', 'compact', 'shelf', 'stack'] as const) {
      const a = render(<CallDock {...props({ layout })} />).container.innerHTML;
      cleanup();
      const b = render(<CallDock {...props({ layout, fit: 'contain' })} />).container.innerHTML;
      cleanup();
      expect(ids(b)).toBe(ids(a));
    }
  });
});

describe('CallTileRow fitBox', () => {
  const tile = (id: string): CallTileParticipant => ({ id, displayName: id });
  it('sizes the columns to the fitted tile and centres them', () => {
    render(<CallTileRow variant="grid" participants={[tile('a'), tile('b')]} localParticipant={{ ...tile('me'), isLocal: true }} fitBox={{ width: 1200, height: 400 }} />);
    const grid = screen.getByTestId('call-tile-row');
    const f = gridFit(3, 1200, 400, 12);
    expect(grid).toHaveAttribute('data-fit', 'contain');
    expect(grid).toHaveAttribute('data-columns', String(f.columns));
    expect(grid).toHaveAttribute('data-tile-width', String(f.tileWidth));
    expect(grid.style.gridTemplateColumns).toBe(`repeat(${f.columns}, ${f.tileWidth}px)`);
    expect(grid.className).toContain('justify-center');
    expect(grid.className).not.toMatch(/grid-cols-/);
  });
  it('a zero box keeps the fluid columns', () => {
    render(<CallTileRow variant="grid" participants={[tile('a')]} fitBox={{ width: 0, height: 0 }} />);
    expect(screen.getByTestId('call-tile-row')).not.toHaveAttribute('data-fit');
  });
});

// jsdom never lays out: drive the dock's observer by hand.
type Observed = { cb: ResizeObserverCallback; el: Element };
let observers: Observed[] = [];
const Native = globalThis.ResizeObserver;
beforeEach(() => {
  setCallDockRenderProbe((part, id) => { if (part === 'tile') tileRenders.push(id ?? ''); });
  observers = [];
  globalThis.ResizeObserver = class {
    constructor(private cb: ResizeObserverCallback) {}
    observe(el: Element) { observers.push({ cb: this.cb, el }); }
    unobserve() {}
    disconnect() { observers = observers.filter((o) => o.cb !== this.cb); }
  } as unknown as typeof ResizeObserver;
});
afterEach(() => { globalThis.ResizeObserver = Native; setCallDockRenderProbe(null); });
function resize(el: Element, width: number, height: number) {
  act(() => {
    for (const o of observers.filter((x) => x.el === el)) o.cb([{ contentRect: { width, height } } as ResizeObserverEntry], {} as ResizeObserver);
  });
}

describe('CallDock fit="contain"', () => {
  it('before a measurement draws the width layout, then fits the measured box', () => {
    render(<CallDock {...props({ fit: 'contain' })} />);
    const dock = screen.getByTestId('call-dock');
    expect(dock).toHaveAttribute('data-fit', 'contain');
    expect(dock.className).toContain('flex-1');
    const grid = screen.getByTestId('call-dock-tile-row');
    expect(grid).not.toHaveAttribute('data-fit');
    expect(grid.className).toContain('grid-cols-2');
    const box = screen.getByTestId('call-dock-fit-box');
    resize(box, 800, 1000);
    expect(screen.getByTestId('call-dock-tile-row')).toHaveAttribute('data-fit', 'contain');
    // A tall stage: two tiles stack.
    expect(screen.getByTestId('call-dock-tile-row')).toHaveAttribute('data-columns', '1');
    resize(box, 1600, 500);
    expect(screen.getByTestId('call-dock-tile-row')).toHaveAttribute('data-columns', '2');
  });

  it('re-fits on resize and when someone joins without re-rendering a tile', () => {
    const { rerender } = render(<CallDock {...props({ fit: 'contain' })} />);
    const box = screen.getByTestId('call-dock-fit-box');
    resize(box, 1200, 800);
    const first = screen.getByTestId('call-tile-me');
    resetCallDockRenderCounts();
    resize(box, 700, 1100);
    expect(callDockRenderCounts().tile).toBe(0);
    const three = [...props().participants, person('c', 'Cy')];
    rerender(<CallDock {...props({ fit: 'contain', participants: three, participantCount: 3 })} />);
    expect(screen.getByTestId('call-dock-tile-row')).toHaveAttribute('data-tile-count', '3');
    expect(screen.getByTestId('call-dock-tile-row')).toHaveAttribute('data-tile-width', String(gridFit(3, 700, 1100, 12).tileWidth));
    // The viewer's tile is the same element: not remounted.
    expect(screen.getByTestId('call-tile-me')).toBe(first);
    // Only the newcomer's tile renders; the people already there do not.
    expect([...callDockRenderCounts().ids]).toEqual(['c']);
  });

  it('connecting with the viewer unknown is one fitted skeleton tile', () => {
    render(<CallDock {...props({ fit: 'contain', phase: 'connecting', participants: [], localParticipantId: '' })} />);
    resize(screen.getByTestId('call-dock-fit-box'), 1600, 400);
    const skeleton = screen.getByTestId('call-dock-connecting').firstElementChild as HTMLElement;
    expect(skeleton.style.width).toBe(`${gridFit(1, 1600, 400).tileWidth}px`);
  });
});

describe('CallDock layout="grid" while connecting', () => {
  it('draws "You" first when the viewer is known, controls stay with the host', () => {
    render(<CallDock {...props({ phase: 'connecting', participants: [person('me', 'Ada', { cameraOn: false })] })} />);
    expect(screen.queryByTestId('call-dock-connecting')).toBeNull();
    const tiles = [...screen.getByTestId('call-dock-tile-row').querySelectorAll('[data-peer-id]')];
    expect(tiles.map((t) => t.getAttribute('data-peer-id'))).toEqual(['me']);
    expect(screen.getByTestId('call-tile-me')).toHaveTextContent('You');
    expect(screen.getByTestId('call-dock')).toHaveAttribute('data-phase', 'connecting');
  });

  it('keeps the skeleton while the viewer is not known', () => {
    render(<CallDock {...props({ phase: 'connecting', participants: [person('b', 'Ben')], localParticipantId: '' })} />);
    expect(screen.getByTestId('call-dock-connecting')).toBeInTheDocument();
    expect(screen.queryByTestId('call-dock-tile-row')).toBeNull();
  });

  it('the stage still draws its skeleton while connecting', () => {
    render(<CallDock {...props({ layout: 'stage', phase: 'connecting' })} />);
    expect(screen.getByTestId('call-dock-connecting')).toBeInTheDocument();
  });
});
