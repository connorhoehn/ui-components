// src/integrations/realtime-modules/__tests__/adapterFieldPreservation.test.ts
//
// THE DRIFT TESTS.
//
// This package contains one of two implementations of the same wiring: the
// embed path (these adapters + the Wrapped* components) and the app's own
// hand-wiring in realtime-examples. The app's tests can never catch a fault in
// this one, and every fault in this one has the same shape — a field the
// realtime-modules hook emits and the adapter quietly does not carry.
//
// That shape is invisible to a rendering test. The component renders, nothing
// throws, and the FEATURE is missing: attachments that never appear, a thread
// where none of your own messages are yours, a reaction chip that cannot say
// whether you already reacted. `metadata` and `userId` were exactly that, and
// both typechecked all the way through.
//
// So these assert the ADAPTER, field by field, on the way IN. A fixture below
// carries every optional field the realtime-modules type declares; a dropped
// one fails here rather than in somebody's browser.

import { describe, it, expect, vi } from 'vitest';
import {
  adaptChatMessage,
  adaptChatMessages,
  adaptPresenceEntry,
  adaptPresenceRoster,
  adaptReaction,
  adaptMessageReactions,
  adaptFileUploadState,
  adaptNotification,
  adaptHangoutParticipant,
  adaptHangoutParticipants,
} from '../adapters';
import type {
  RMChatMessage,
  RMPresenceEntry,
  RMReaction,
  RMFileUploadState,
  RMNotificationEntry,
  RMHangoutParticipant,
  RMUseReactionsReturn,
} from '../types';

const TS = '2026-09-06T10:00:00.000Z';

// ---------------------------------------------------------------------------
// Chat — the message must arrive WHOLE
// ---------------------------------------------------------------------------

/**
 * Everything realtime-modules can put on a chat message. Add a field to
 * RMChatMessage and it belongs here, or the next drop goes unnoticed the same
 * way the last two did.
 */
const fullChat: RMChatMessage = {
  id: 'msg-1',
  clientId: 'conn-abc',
  userId: 'user-alice',
  channel: 'chat:dm:alice:bob',
  message: 'here you go',
  timestamp: TS,
  metadata: {
    displayName: 'Alice',
    avatarUrl: 'https://example.com/alice.png',
    attachments: [
      {
        id: 'att-1',
        name: 'report.pdf',
        size: 1024,
        contentType: 'application/pdf',
        url: 'https://gw.example.com/files/att-1',
      },
    ],
    html: '<p>here you go</p>',
    mentions: ['user-bob'],
    replyTo: { messageId: 'msg-0', author: 'Bob', text: 'got that file?' },
    kind: 'document',
    documentId: 'doc-7',
    title: 'Q3 plan',
  },
};

describe('adaptChatMessage carries every field the hook emits', () => {
  const out = adaptChatMessage(fullChat);

  it('keeps the authenticated author — "is this mine" keys on it, not clientId', () => {
    expect(out.userId).toBe('user-alice');
  });

  it('keeps the connection id too', () => {
    expect(out.clientId).toBe('conn-abc');
  });

  it('renames message → content without losing it', () => {
    expect(out.content).toBe('here you go');
  });

  it('lifts displayName and avatarUrl out of metadata', () => {
    expect(out.displayName).toBe('Alice');
    expect(out.avatarUrl).toBe('https://example.com/alice.png');
  });

  it('lifts attachments to the top level, where ChatPanel reads them', () => {
    expect(out.attachments).toHaveLength(1);
    expect(out.attachments?.[0].id).toBe('att-1');
    expect(out.attachments?.[0].url).toBe('https://gw.example.com/files/att-1');
  });

  // The regression that made every embedded thread plain text. Named fields
  // are checked individually above; this is the guard against the adapter ever
  // going back to an ALLOW-LIST, where a field nobody named is a field the
  // renderer never sees.
  it('passes the whole metadata bag through, not a chosen subset', () => {
    for (const key of ['html', 'mentions', 'kind', 'documentId', 'title']) {
      expect(out.metadata, `metadata.${key} was dropped`).toHaveProperty(key);
    }
    expect(out.metadata?.html).toBe('<p>here you go</p>');
    expect(out.metadata?.mentions).toEqual(['user-bob']);
  });

  it('keeps the reply quote, so a reply still says what it answers', () => {
    expect(out.metadata?.replyTo).toEqual({
      messageId: 'msg-0',
      author: 'Bob',
      text: 'got that file?',
    });
  });

  it('preserves fields across the list adapter too', () => {
    const [listed] = adaptChatMessages([fullChat]);
    expect(listed).toEqual(out);
  });
});

describe('adaptChatMessage is defensive where the shape is consumed structurally', () => {
  it('drops an attachment with no url — it would render a dead bubble', () => {
    const msg: RMChatMessage = {
      ...fullChat,
      metadata: { attachments: [{ id: 'a', name: 'x', size: 1, contentType: 't' }] },
    };
    expect(adaptChatMessage(msg).attachments).toBeUndefined();
  });

  // The id is the correlation id shared with the sender's in-flight transfer
  // AND the row's React key. An entry without one can never be matched to the
  // transfer it completed.
  it('drops an attachment with no id', () => {
    const msg: RMChatMessage = {
      ...fullChat,
      metadata: { attachments: [{ name: 'x', size: 1, contentType: 't', url: 'u' }] },
    };
    expect(adaptChatMessage(msg).attachments).toBeUndefined();
  });

  it('rebuilds a half-formed replyTo rather than handing it to the renderer', () => {
    const msg: RMChatMessage = {
      ...fullChat,
      metadata: { replyTo: { messageId: 'msg-0', author: 42, text: null } },
    };
    expect(adaptChatMessage(msg).metadata?.replyTo).toEqual({
      messageId: 'msg-0',
      author: 'Unknown',
      text: '',
    });
  });

  it('drops a replyTo that names no message — a quote to nowhere', () => {
    const msg: RMChatMessage = { ...fullChat, metadata: { replyTo: { author: 'Bob' } } };
    expect(adaptChatMessage(msg).metadata?.replyTo).toBeUndefined();
  });

  it('ignores a non-string displayName instead of rendering an object', () => {
    const msg: RMChatMessage = { ...fullChat, metadata: { displayName: { first: 'A' } } };
    expect(adaptChatMessage(msg).displayName).toBeUndefined();
  });

  it('survives a message with no metadata at all', () => {
    const msg: RMChatMessage = { ...fullChat, metadata: undefined };
    const bare = adaptChatMessage(msg);
    expect(bare.content).toBe('here you go');
    expect(bare.metadata).toBeUndefined();
    expect(bare.attachments).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Presence
// ---------------------------------------------------------------------------

function entry(over: Partial<RMPresenceEntry> = {}): RMPresenceEntry {
  return {
    clientId: 'conn-1',
    status: 'online',
    metadata: { userId: 'user-alice', displayName: 'Alice', avatarUrl: 'a.png' },
    channels: ['room:general'],
    nodeId: 'node-1',
    timestamp: TS,
    lastSeen: TS,
    lastHeartbeat: 0,
    ...over,
  };
}

describe('adaptPresenceEntry', () => {
  it('identifies the PERSON, so a click can be acted on', () => {
    expect(adaptPresenceEntry(entry()).id).toBe('user-alice');
  });

  it('carries name and avatar', () => {
    const u = adaptPresenceEntry(entry());
    expect(u.name).toBe('Alice');
    expect(u.avatarUrl).toBe('a.png');
  });

  // Presence has four states and the avatar has three dots. Collapsing away
  // and busy into plain green is the difference between a roster and a list of
  // names: someone who stepped away reads as sitting right there.
  it('renders away as idle, not plain online', () => {
    const u = adaptPresenceEntry(entry({ status: 'away' }));
    expect(u.idle).toBe(true);
    expect(u.online).toBe(true);
  });

  // 2.515.9: busy is its own state. A working worker read as away (dimmed,
  // "Away") while it was the busiest entry on the roster.
  it('renders busy as busy, not idle', () => {
    const u = adaptPresenceEntry(entry({ status: 'busy' }));
    expect(u.busy).toBe(true);
    expect(u.idle).toBeUndefined();
    expect(u.online).toBe(true);
  });

  it('does not mark a plainly-online person idle', () => {
    expect(adaptPresenceEntry(entry()).idle).toBeUndefined();
  });

  it('is offline when the server says so', () => {
    expect(adaptPresenceEntry(entry({ status: 'offline' })).online).toBe(false);
  });
});

describe('adaptPresenceRoster merges a person across their connections', () => {
  // A tab that has not published its metadata yet is a normal thing for a
  // roster to hold. Letting it WIN showed a truncated clientId where a name
  // the other tab had already published belonged.
  it('does not let a metadata-less tab blank out the name', () => {
    const quiet = entry({ clientId: 'conn-2', metadata: { userId: 'user-alice' } });
    const roster = adaptPresenceRoster([quiet, entry()]);
    expect(roster).toHaveLength(1);
    expect(roster[0].name).toBe('Alice');
    expect(roster[0].avatarUrl).toBe('a.png');
  });

  it('is online if any of the person’s connections is', () => {
    const stale = entry({ clientId: 'conn-2', status: 'offline' });
    expect(adaptPresenceRoster([stale, entry()])[0].online).toBe(true);
  });

  it('is away only while every session says so', () => {
    const away = entry({ clientId: 'conn-2', status: 'away' });
    expect(adaptPresenceRoster([away, entry({ status: 'away' })])[0].idle).toBe(true);
    expect(adaptPresenceRoster([away, entry()])[0].idle).toBeUndefined();
  });

  it('keeps distinct people apart', () => {
    const bob = entry({ clientId: 'conn-9', metadata: { userId: 'user-bob', displayName: 'Bob' } });
    expect(adaptPresenceRoster([entry(), bob])).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// Reactions — two features, one wire type
// ---------------------------------------------------------------------------

function reaction(over: Partial<RMReaction> = {}): RMReaction {
  return {
    id: 'rxn-1',
    clientId: 'conn-abc',
    channel: 'chat:dm:alice:bob',
    emoji: '🔥',
    effect: '',
    position: null,
    metadata: {},
    timestamp: TS,
    targetId: 'msg-1',
    userId: 'user-alice',
    displayName: 'Alice',
    ...over,
  };
}

describe('adaptReaction (the floating overlay)', () => {
  it('carries emoji, id and timestamp', () => {
    const r = adaptReaction(reaction(), 0);
    expect(r).toMatchObject({ id: 'rxn-1', emoji: '🔥', timestamp: TS });
  });

  it('prefers an explicit position over the spread', () => {
    const r = adaptReaction(reaction({ position: { x: 12, y: 34 } }), 3);
    expect([r.x, r.y]).toEqual([12, 34]);
  });
});

describe('adaptMessageReactions (the chips)', () => {
  const hook = (over: Partial<RMUseReactionsReturn> = {}): RMUseReactionsReturn => ({
    reactions: [
      reaction(),
      reaction({ id: 'rxn-2', userId: 'user-bob', displayName: 'Bob', emoji: '👍' }),
      reaction({ id: 'rxn-3', targetId: 'msg-2', emoji: '🎉' }),
    ],
    react: vi.fn(),
    ...over,
  });

  // The whole point: "did I react?" is answerable only from userId, which the
  // mirror type did not declare and this adapter therefore could not carry.
  it('carries the owner id, which is what makes a chip a toggle', () => {
    const chips = adaptMessageReactions(hook(), 'msg-1');
    expect(chips.map((c) => c.userId)).toEqual(['user-alice', 'user-bob']);
  });

  it('carries the owner’s display name for the hover list', () => {
    expect(adaptMessageReactions(hook(), 'msg-1')[0].displayName).toBe('Alice');
  });

  it('filters to the target, so one message’s chips are not another’s', () => {
    expect(adaptMessageReactions(hook(), 'msg-2').map((c) => c.emoji)).toEqual(['🎉']);
  });

  it('prefers the hook’s own reactionsFor when it has one', () => {
    const reactionsFor = vi.fn(() => [reaction({ emoji: '✅' })]);
    expect(adaptMessageReactions(hook({ reactionsFor }), 'msg-1')[0].emoji).toBe('✅');
    expect(reactionsFor).toHaveBeenCalledWith('msg-1');
  });

  // Imperfect (a clientId goes stale on reconnect) but better than '', which
  // would make every anonymous reaction the same person's.
  it('falls back to the connection id when the server resolved no identity', () => {
    const anon = hook({ reactions: [reaction({ userId: undefined })] });
    expect(adaptMessageReactions(anon, 'msg-1')[0].userId).toBe('conn-abc');
  });
});

// ---------------------------------------------------------------------------
// File upload
// ---------------------------------------------------------------------------

describe('adaptFileUploadState', () => {
  const state: RMFileUploadState = {
    id: 'fu-1',
    filename: 'report.pdf',
    size: 102400,
    status: 'uploading',
    progress: 42,
    downloadUrl: 'https://cdn.example.com/report.pdf',
    transferId: 'srv-99',
    error: undefined,
  };

  it('carries every field the summary has a home for', () => {
    expect(adaptFileUploadState(state)).toEqual({
      id: 'fu-1',
      filename: 'report.pdf',
      progress: 42,
      status: 'uploading',
      downloadUrl: 'https://cdn.example.com/report.pdf',
      error: undefined,
      transferId: 'srv-99',
      size: 102400,
    });
  });

  // Channel-wide frames are keyed by the SERVER's id, not the client's — so a
  // caller reconciling its own upload against the channel needs this one.
  it('keeps the server-minted transfer id', () => {
    expect(adaptFileUploadState(state).transferId).toBe('srv-99');
  });

  it('defaults progress to 0 rather than undefined', () => {
    expect(adaptFileUploadState({ ...state, progress: undefined }).progress).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

describe('adaptNotification', () => {
  const n: RMNotificationEntry = {
    id: 'n-1',
    type: 'chat',
    title: 'Alice sent a message',
    body: 'here you go',
    timestamp: TS,
    read: false,
    channel: 'chat:dm:alice:bob',
    payload: { icon: '💬' },
    action: { label: 'Open', href: '/messages' },
  };

  it('carries every field NotificationItem declares', () => {
    expect(adaptNotification(n)).toEqual({
      id: 'n-1',
      title: 'Alice sent a message',
      body: 'here you go',
      timestamp: TS,
      read: false,
      category: 'chat',
      icon: '💬',
    });
  });

  it('treats a missing read flag as unread', () => {
    expect(adaptNotification({ ...n, read: undefined }).read).toBe(false);
  });

  // NOT a drop this layer can fix: NotificationItem has no field for `channel`,
  // `payload` or `action`, so the routing target cannot survive the adapter.
  // WrappedNotificationCenter hands the original entry to onItemClick instead.
  it('cannot carry the routing target — the item type has nowhere to put it', () => {
    const item = adaptNotification(n) as unknown as Record<string, unknown>;
    expect(item.channel).toBeUndefined();
    expect(item.action).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Hangout participants
// ---------------------------------------------------------------------------

describe('adaptHangoutParticipant', () => {
  const p: RMHangoutParticipant = {
    clientId: 'conn-abc',
    displayName: 'Alice',
    role: 'host',
    videoOn: true,
    audioOn: false,
    joinedAt: TS,
  };

  it('inverts audioOn into isMuted', () => {
    expect(adaptHangoutParticipant(p).isMuted).toBe(true);
    expect(adaptHangoutParticipant({ ...p, audioOn: true }).isMuted).toBe(false);
  });

  it('marks the local tile only when the caller says who they are', () => {
    expect(adaptHangoutParticipant(p, 'conn-abc').isLocal).toBe(true);
    expect(adaptHangoutParticipant(p, 'conn-other').isLocal).toBe(false);
    expect(adaptHangoutParticipant(p).isLocal).toBeUndefined();
  });

  it('falls back to a short clientId when there is no display name', () => {
    expect(adaptHangoutParticipant({ ...p, displayName: undefined }).displayName)
      .toBe('conn-abc');
  });

  // There is no avatarUrl on the realtime-modules type, so the host resolves
  // it from its own directory and hands it in. The adapter used to CLAIM it
  // read one from metadata; there is no metadata field to read.
  it('accepts a host-resolved avatar', () => {
    expect(adaptHangoutParticipant(p, null, 'a.png').avatarUrl).toBe('a.png');
    expect(adaptHangoutParticipants([p], null, { 'conn-abc': 'a.png' })[0].avatarUrl)
      .toBe('a.png');
  });

  it('omits avatarUrl entirely when the host resolved none', () => {
    expect(adaptHangoutParticipant(p)).not.toHaveProperty('avatarUrl');
  });
});
