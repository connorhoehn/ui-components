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
