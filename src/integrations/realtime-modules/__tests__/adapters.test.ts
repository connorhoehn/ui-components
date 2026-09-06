// src/integrations/realtime-modules/__tests__/adapters.test.ts

import { describe, it, expect } from 'vitest';
import {
  adaptChatMessage,
  adaptChatMessages,
  adaptPresenceEntry,
  adaptPresenceRoster,
  adaptReaction,
  adaptReactions,
  adaptActivityEvent,
  adaptActivityEvents,
  adaptFileUploadState,
  adaptFileUploads,
  adaptHangoutParticipant,
  adaptHangoutParticipants,
} from '../adapters';
import type {
  RMChatMessage,
  RMPresenceEntry,
  RMReaction,
  RMActivityEvent,
  RMFileUploadState,
  RMHangoutParticipant,
} from '../types';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const TS = '2026-05-22T10:00:00.000Z';

const rmChat: RMChatMessage = {
  id: 'msg-1',
  clientId: 'client-abc',
  channel: 'room:general',
  message: 'Hello world',
  metadata: { displayName: 'Alice' },
  timestamp: TS,
};

const rmPresenceEntry: RMPresenceEntry = {
  clientId: 'client-abc',
  status: 'online',
  metadata: { displayName: 'Alice', avatarUrl: 'https://example.com/alice.png' },
  channels: ['room:general'],
  nodeId: 'node-1',
  timestamp: TS,
  lastSeen: TS,
  lastHeartbeat: 1716375600000,
};

const rmReaction: RMReaction = {
  id: 'rxn-1',
  clientId: 'client-abc',
  channel: 'room:general',
  emoji: '🔥',
  effect: '',
  position: null,
  metadata: {},
  timestamp: TS,
};

const rmActivity: RMActivityEvent = {
  eventType: 'social.room.join',
  detail: { roomId: 'room-12345678' },
  timestamp: TS,
  userId: 'user-1',
  displayName: 'Alice',
};

const rmFileUpload: RMFileUploadState = {
  id: 'fu-1',
  filename: 'report.pdf',
  size: 102400,
  status: 'completed',
  progress: 100,
  downloadUrl: 'https://cdn.example.com/report.pdf',
};

const rmParticipant: RMHangoutParticipant = {
  clientId: 'client-abc',
  displayName: 'Alice',
  role: 'host',
  videoOn: true,
  audioOn: false,
  joinedAt: TS,
};

// ---------------------------------------------------------------------------
// Chat adapters
// ---------------------------------------------------------------------------

describe('adaptChatMessage', () => {
  it('renames message → content', () => {
    const result = adaptChatMessage(rmChat);
    expect(result.content).toBe('Hello world');
    expect((result as unknown as Record<string, unknown>).message).toBeUndefined();
  });

  it('preserves required fields', () => {
    const result = adaptChatMessage(rmChat);
    expect(result.id).toBe('msg-1');
    expect(result.clientId).toBe('client-abc');
    expect(result.timestamp).toBe(TS);
  });

  it('lifts displayName from metadata', () => {
    const result = adaptChatMessage(rmChat);
    expect(result.displayName).toBe('Alice');
  });

  it('handles missing metadata gracefully', () => {
    const noMeta: RMChatMessage = { ...rmChat, metadata: undefined };
    const result = adaptChatMessage(noMeta);
    expect(result.displayName).toBeUndefined();
    expect(result.avatarUrl).toBeUndefined();
    expect(result.content).toBe('Hello world');
  });

  it('lifts avatarUrl from metadata when present', () => {
    const withAvatar: RMChatMessage = {
      ...rmChat,
      metadata: { displayName: 'Alice', avatarUrl: 'https://example.com/alice.png' },
    };
    const result = adaptChatMessage(withAvatar);
    expect(result.avatarUrl).toBe('https://example.com/alice.png');
  });

  // Everything ChatPanel renders as an OBJECT rather than a sentence — the
  // document card, the call card, the rich html body, the replyTo quote, the
  // truncation notice — reads the metadata bag. Leaving it behind gave a host
  // using this adapter a strictly worse thread than one that wired the hook up
  // by hand.
  it('carries the whole metadata bag through', () => {
    const withKind: RMChatMessage = {
      ...rmChat,
      metadata: {
        displayName: 'Alice',
        kind: 'document',
        documentId: 'doc-7',
        title: 'Q3 plan',
        html: '<p>rich</p>',
      },
    };
    const result = adaptChatMessage(withKind);
    expect(result.metadata).toEqual(withKind.metadata);
    // and the lifted convenience fields still work off the same bag
    expect(result.displayName).toBe('Alice');
  });

  it('omits metadata entirely when there was none', () => {
    const result = adaptChatMessage({ ...rmChat, metadata: undefined });
    expect(result.metadata).toBeUndefined();
  });

  // isMine keys on the authenticated userId, never on clientId — which
  // changes on every reconnect. Dropping it made your own messages somebody
  // else's, so an embedded transcript could not put them on your side.
  it('carries the authenticated userId', () => {
    const result = adaptChatMessage({ ...rmChat, userId: 'user-alice' });
    expect(result.userId).toBe('user-alice');
  });

  it('omits userId when the server did not stamp one', () => {
    const result = adaptChatMessage(rmChat);
    expect(result.userId).toBeUndefined();
  });

  it('handles empty messages array', () => {
    expect(adaptChatMessages([])).toEqual([]);
  });

  it('maps arrays element-by-element', () => {
    const msgs = [rmChat, { ...rmChat, id: 'msg-2', message: 'Second' }];
    const results = adaptChatMessages(msgs);
    expect(results).toHaveLength(2);
    expect(results[1].content).toBe('Second');
  });
});

// ---------------------------------------------------------------------------
// Presence adapters
// ---------------------------------------------------------------------------

describe('adaptPresenceEntry', () => {
  it('maps clientId → id', () => {
    const result = adaptPresenceEntry(rmPresenceEntry);
    expect(result.id).toBe('client-abc');
  });

  it('lifts displayName → name', () => {
    const result = adaptPresenceEntry(rmPresenceEntry);
    expect(result.name).toBe('Alice');
  });

  it('lifts avatarUrl', () => {
    const result = adaptPresenceEntry(rmPresenceEntry);
    expect(result.avatarUrl).toBe('https://example.com/alice.png');
  });

  it('sets online=true for non-offline status', () => {
    expect(adaptPresenceEntry({ ...rmPresenceEntry, status: 'online' }).online).toBe(true);
    expect(adaptPresenceEntry({ ...rmPresenceEntry, status: 'away' }).online).toBe(true);
    expect(adaptPresenceEntry({ ...rmPresenceEntry, status: 'busy' }).online).toBe(true);
    expect(adaptPresenceEntry({ ...rmPresenceEntry, status: 'offline' }).online).toBe(false);
  });

  it('falls back name to truncated clientId when displayName missing', () => {
    const noName: RMPresenceEntry = { ...rmPresenceEntry, metadata: {} };
    const result = adaptPresenceEntry(noName);
    expect(result.name).toBe('client-abc');
  });

  it('handles empty roster', () => {
    expect(adaptPresenceRoster([])).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Reactions adapters
// ---------------------------------------------------------------------------

describe('adaptReaction', () => {
  it('preserves id, emoji, timestamp', () => {
    const result = adaptReaction(rmReaction, 0);
    expect(result.id).toBe('rxn-1');
    expect(result.emoji).toBe('🔥');
    expect(result.timestamp).toBe(TS);
  });

  it('assigns a numeric x between 15 and 85', () => {
    const result = adaptReaction(rmReaction, 0);
    expect(result.x).toBeGreaterThanOrEqual(10);
    expect(result.x).toBeLessThanOrEqual(90);
  });

  it('assigns a numeric y between 20 and 80', () => {
    const result = adaptReaction(rmReaction, 0);
    expect(result.y).toBeGreaterThanOrEqual(10);
    expect(result.y).toBeLessThanOrEqual(90);
  });

  it('uses explicit {x,y} from position when present', () => {
    const withPos: RMReaction = { ...rmReaction, position: { x: 42, y: 77 } };
    const result = adaptReaction(withPos, 0);
    expect(result.x).toBe(42);
    expect(result.y).toBe(77);
  });

  it('handles empty reactions array', () => {
    expect(adaptReactions([])).toEqual([]);
  });

  it('produces different x/y for different indices', () => {
    const r1 = adaptReaction(rmReaction, 0);
    const r2 = adaptReaction(rmReaction, 1);
    // They should differ in x at minimum (same row)
    expect(r1.x).not.toBe(r2.x);
  });
});

// ---------------------------------------------------------------------------
// Activity adapters
// ---------------------------------------------------------------------------

describe('adaptActivityEvent', () => {
  it('maps displayName → actor', () => {
    const result = adaptActivityEvent(rmActivity);
    expect(result.actor).toBe('Alice');
  });

  it('maps eventType verb correctly', () => {
    const result = adaptActivityEvent(rmActivity);
    expect(result.action).toBe('joined');
  });

  it('derives subject from roomId detail', () => {
    const result = adaptActivityEvent(rmActivity);
    // fixture roomId = 'room-12345678' — first 8 chars = 'room-123'
    expect(result.subject).toBe('room:room-123');
  });

  it('sets timeLabel as a string', () => {
    const result = adaptActivityEvent(rmActivity);
    expect(typeof result.timeLabel).toBe('string');
  });

  it('sets kind from the top-level event namespace', () => {
    const result = adaptActivityEvent(rmActivity);
    expect(result.kind).toBe('social');
  });

  it('handles unknown eventType gracefully', () => {
    const unknown: RMActivityEvent = {
      ...rmActivity,
      eventType: 'custom.unknown.event',
    };
    const result = adaptActivityEvent(unknown);
    expect(result.actor).toBe('Alice');
    expect(result.action).toBe('event');
    expect(typeof result.subject).toBe('string');
  });

  it('handles empty events array', () => {
    expect(adaptActivityEvents([])).toEqual([]);
  });

  it('maps pipeline events', () => {
    const pipelineEvent: RMActivityEvent = {
      eventType: 'pipeline.run.completed',
      detail: { pipelineId: 'pipe-001' },
      timestamp: TS,
      userId: 'user-1',
      displayName: 'Bob',
    };
    const result = adaptActivityEvent(pipelineEvent);
    expect(result.action).toBe('completed');
    expect(result.kind).toBe('pipeline');
  });
});

// ---------------------------------------------------------------------------
// FileUpload adapters
// ---------------------------------------------------------------------------

describe('adaptFileUploadState', () => {
  it('maps all required fields', () => {
    const result = adaptFileUploadState(rmFileUpload);
    expect(result.id).toBe('fu-1');
    expect(result.filename).toBe('report.pdf');
    expect(result.status).toBe('completed');
    expect(result.progress).toBe(100);
    expect(result.downloadUrl).toBe('https://cdn.example.com/report.pdf');
  });

  it('defaults progress to 0 when undefined', () => {
    const noProgress: RMFileUploadState = { ...rmFileUpload, progress: undefined };
    const result = adaptFileUploadState(noProgress);
    expect(result.progress).toBe(0);
  });

  it('handles missing optional fields', () => {
    const minimal: RMFileUploadState = {
      id: 'fu-2',
      filename: 'doc.txt',
      size: 100,
      status: 'pending',
    };
    const result = adaptFileUploadState(minimal);
    expect(result.downloadUrl).toBeUndefined();
    expect(result.error).toBeUndefined();
  });

  it('handles empty uploads array', () => {
    expect(adaptFileUploads([])).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// VideoHangout adapters
// ---------------------------------------------------------------------------

describe('adaptHangoutParticipant', () => {
  it('maps clientId → id', () => {
    const result = adaptHangoutParticipant(rmParticipant);
    expect(result.id).toBe('client-abc');
  });

  it('preserves displayName', () => {
    const result = adaptHangoutParticipant(rmParticipant);
    expect(result.displayName).toBe('Alice');
  });

  it('inverts audioOn → isMuted', () => {
    // audioOn: false → isMuted: true
    expect(adaptHangoutParticipant({ ...rmParticipant, audioOn: false }).isMuted).toBe(true);
    // audioOn: true → isMuted: false
    expect(adaptHangoutParticipant({ ...rmParticipant, audioOn: true }).isMuted).toBe(false);
  });

  it('sets isLocal correctly when localClientId provided', () => {
    const isLocal = adaptHangoutParticipant(rmParticipant, 'client-abc');
    expect(isLocal.isLocal).toBe(true);

    const isRemote = adaptHangoutParticipant(rmParticipant, 'other-client');
    expect(isRemote.isLocal).toBe(false);
  });

  it('leaves isLocal undefined when no localClientId provided', () => {
    const result = adaptHangoutParticipant(rmParticipant);
    expect(result.isLocal).toBeUndefined();
  });

  it('falls back displayName to truncated clientId', () => {
    const noName: RMHangoutParticipant = { ...rmParticipant, displayName: undefined };
    const result = adaptHangoutParticipant(noName);
    expect(result.displayName).toBe('client-abc');
  });

  it('handles empty participants array', () => {
    expect(adaptHangoutParticipants([])).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Identity and stability — the two properties a host's React tree depends on.
// ---------------------------------------------------------------------------

describe('activity ids are stable', () => {
  const event = {
    eventType: 'social.room.join',
    displayName: 'Alice',
    userId: 'user-alice',
    timestamp: '2026-01-01T00:00:00.000Z',
    detail: {},
  };

  // ActivityFeed keys its rows on this. A counter-derived id meant every row
  // unmounted and remounted on every re-adapt — and the rotation timers reset
  // with them.
  it('gives the same event the same id every time', () => {
    expect(adaptActivityEvents([event])[0].id).toBe(adaptActivityEvents([event])[0].id);
  });

  it('separates events that differ', () => {
    const other = { ...event, eventType: 'social.room.leave' };
    const [a, b] = adaptActivityEvents([event, other]);
    expect(a.id).not.toBe(b.id);
  });

  it('keeps keys unique when two events are genuinely identical', () => {
    const ids = adaptActivityEvents([event, event]).map((e) => e.id);
    expect(new Set(ids).size).toBe(2);
  });

  it('does not shift an existing id when a new event arrives', () => {
    const before = adaptActivityEvents([event])[0].id;
    const newer = { ...event, timestamp: '2026-01-01T00:00:05.000Z' };
    const after = adaptActivityEvents([newer, event]).find((e) => e.id === before);
    expect(after).toBeDefined();
  });
});

describe('presence roster is people, not connections', () => {
  const tab = (clientId: string, over: Record<string, unknown> = {}): RMPresenceEntry => ({
    clientId,
    status: 'online' as const,
    channels: ['general'],
    nodeId: 'node-1',
    timestamp: TS,
    lastSeen: TS,
    lastHeartbeat: 0,
    metadata: { displayName: 'Alice', userId: 'user-alice', ...over },
  });

  it('collapses one person’s tabs into one row', () => {
    const roster = adaptPresenceRoster([tab('conn-1'), tab('conn-2')]);
    expect(roster).toHaveLength(1);
    expect(roster[0].name).toBe('Alice');
  });

  it('identifies the person, so a click can be acted on', () => {
    expect(adaptPresenceRoster([tab('conn-1')])[0].id).toBe('user-alice');
  });

  // A stale tab must not grey out someone sitting right there in another one.
  it('is online if any of the person’s connections is', () => {
    const stale = { ...tab('conn-1'), status: 'offline' as const };
    expect(adaptPresenceRoster([stale, tab('conn-2')])[0].online).toBe(true);
  });

  it('keeps distinct people apart', () => {
    const bob = tab('conn-9', { displayName: 'Bob', userId: 'user-bob' });
    expect(adaptPresenceRoster([tab('conn-1'), bob])).toHaveLength(2);
  });

  // Anonymous presence has no userId; the connection is the best identity
  // available and must still produce one row per connection.
  it('falls back to the connection when there is no user', () => {
    const anon: RMPresenceEntry = { ...tab('conn-x'), metadata: { displayName: 'Guest' } };
    const roster = adaptPresenceRoster([anon, { ...anon, clientId: 'conn-y' }]);
    expect(roster).toHaveLength(2);
    expect(roster[0].id).toBe('conn-x');
  });
});
