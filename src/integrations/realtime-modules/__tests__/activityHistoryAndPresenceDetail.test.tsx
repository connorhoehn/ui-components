// 2.515.10: the Studio's two local adapters, moved into the library.
// - WrappedActivityPanel mode="history": newest first, no rotation, N lines;
//   an event whose line is one sentence (`detail.text`) is drawn as that
//   sentence (the Studio passed rotateMs={0} and mapped every line by hand).
// - adaptPresenceRoster keeps metadata (an avatar's detail line), reads busy
//   as its own state and drops offline entries (the Studio's presenceUsers /
//   liveRoster).
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { act } from 'react';
import { WrappedActivityPanel } from '../WrappedActivityPanel';
import { adaptActivityEvent, adaptPresenceRoster, newestActivityFirst } from '../adapters';
import type { RMActivityEvent, RMPresenceEntry } from '../types';

const ev = (at: string, text: string, extra: Record<string, unknown> = {}): RMActivityEvent => ({
  eventType: 'graph.commit',
  detail: { text, ...extra },
  timestamp: at,
  userId: 'u1',
  displayName: 'You',
});

describe('activity lines that are one sentence', () => {
  it('draws detail.text as the line, with no verb', () => {
    const item = adaptActivityEvent(ev('2026-11-09T10:00:00Z', 'Draw guide: Toby started', { kind: 'task' }));
    expect(item.subject).toBe('Draw guide: Toby started');
    expect(item.action).toBe('');
    expect(item.kind).toBe('task');
  });

  it('leaves events without detail.text as they were', () => {
    const item = adaptActivityEvent({ eventType: 'social.like', detail: { subject: 'a post' }, timestamp: '2026-11-09T10:00:00Z', userId: null, displayName: 'Ada' });
    expect(item.action).toBe('liked');
    expect(item.subject).toBe('a post');
    expect(item.kind).toBe('social');
  });
});

describe('newestActivityFirst', () => {
  it('orders by timestamp, then detail.seq, else as given', () => {
    const a = ev('2026-11-09T10:00:00Z', 'a');
    const b = ev('2026-11-09T11:00:00Z', 'b');
    const c1 = ev('2026-11-09T12:00:00Z', 'c1', { seq: 1 });
    const c2 = ev('2026-11-09T12:00:00Z', 'c2', { seq: 2 });
    expect(newestActivityFirst([b, a, c1, c2]).map((e) => e.detail.text)).toEqual(['c2', 'c1', 'b', 'a']);
  });
});

/** The subject of each drawn line (its `title` starts with "Line"). */
const lines = (feed: HTMLElement) =>
  [...feed.querySelectorAll('[title]')].map((n) => n.getAttribute('title')).filter((t) => t?.startsWith('Line'));

describe('WrappedActivityPanel mode="history"', () => {
  afterEach(() => vi.useRealTimers());

  const events = Array.from({ length: 8 }, (_, i) =>
    ev(`2026-11-09T10:0${i}:00Z`, `Line ${i}`));

  it('shows the newest N lines, newest first, and never rotates', () => {
    vi.useFakeTimers();
    render(<WrappedActivityPanel activity={{ events, loadHistory: () => {} }} mode="history" lines={5} data-testid="history" />);
    const feed = screen.getByTestId('history');
    expect(feed.getAttribute('data-activity-mode')).toBe('history');
    const read = () => lines(feed);
    expect(read()).toEqual(['Line 7', 'Line 6', 'Line 5', 'Line 4', 'Line 3']);
    act(() => { vi.advanceTimersByTime(30_000); });
    expect(read()).toEqual(['Line 7', 'Line 6', 'Line 5', 'Line 4', 'Line 3']);
  });

  it('keeps the ticker by default', () => {
    render(<WrappedActivityPanel activity={{ events, loadHistory: () => {} }} data-testid="ticker" />);
    const feed = screen.getByTestId('ticker');
    expect(feed.getAttribute('data-activity-mode')).toBe('ticker');
    // ActivityFeed's default window: three lines, in the hook's order.
    expect(lines(feed)).toEqual(['Line 0', 'Line 1', 'Line 2']);
  });
});

const entry = (over: Partial<RMPresenceEntry> = {}): RMPresenceEntry => ({
  clientId: 'conn-1',
  status: 'online',
  metadata: { userId: 'worker', displayName: 'Worker' },
  channels: [],
  nodeId: 'n',
  timestamp: '2026-11-09T10:00:00Z',
  lastSeen: '2026-11-09T10:00:00Z',
  lastHeartbeat: 1,
  ...over,
});

describe('adaptPresenceRoster: metadata, busy, offline', () => {
  it('keeps the merged metadata, freshest last, and reads detail from it', () => {
    const older = entry({ lastHeartbeat: 1, metadata: { userId: 'worker', displayName: 'Worker', job: 'Old job', detail: 'Idle' } });
    const newer = entry({ clientId: 'conn-2', lastHeartbeat: 5, metadata: { userId: 'worker', job: 'Draw guide', detail: 'Working on Draw guide' } });
    const [user] = adaptPresenceRoster([newer, older]);
    expect(user.metadata.job).toBe('Draw guide');
    expect(user.metadata.displayName).toBe('Worker');
    expect(user.detail).toBe('Working on Draw guide');
  });

  it('takes a host detail line', () => {
    const [user] = adaptPresenceRoster([entry({ metadata: { userId: 'agent', displayName: 'Agent', task: 'Reviewing cast' } })], {
      detail: (m) => (typeof m.task === 'string' ? m.task : undefined),
    });
    expect(user.detail).toBe('Reviewing cast');
  });

  it('is busy, not away, while any live session is busy', () => {
    const [user] = adaptPresenceRoster([entry({ status: 'busy' }), entry({ clientId: 'conn-2', status: 'online' })]);
    expect(user.busy).toBe(true);
    expect(user.idle).toBeUndefined();
    expect(user.status).toBe('busy');
  });

  it('is away only while every session is', () => {
    expect(adaptPresenceRoster([entry({ status: 'away' }), entry({ clientId: 'conn-2', status: 'away' })])[0].idle).toBe(true);
    expect(adaptPresenceRoster([entry({ status: 'away' }), entry({ clientId: 'conn-2' })])[0].idle).toBeUndefined();
  });

  it('drops offline entries unless asked to keep them', () => {
    const gone = entry({ clientId: 'conn-9', status: 'offline', metadata: { userId: 'left', displayName: 'Left' } });
    expect(adaptPresenceRoster([entry(), gone]).map((u) => u.id)).toEqual(['worker']);
    const kept = adaptPresenceRoster([entry(), gone], { keepOffline: true });
    expect(kept.map((u) => u.id)).toEqual(['worker', 'left']);
    expect(kept[1].online).toBe(false);
  });
});
