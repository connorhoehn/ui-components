import { renderHook } from '@testing-library/react';
import { useMentionUsers } from '../useMentionUsers';
import type { Participant } from '../../types/document';
import { DEV_USERS, DEV_GROUPS } from '../../data/userDirectory';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeParticipant(overrides: Partial<Participant> = {}): Participant {
  return {
    clientId: 'c1',
    userId: 'u-online',
    displayName: 'Online User',
    color: '#aabbcc',
    mode: 'editor',
    currentSectionId: null,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Ordering
// ---------------------------------------------------------------------------

describe('result ordering', () => {
  it('returns online participants first, then offline directory users, then groups', () => {
    const participants = [makeParticipant({ displayName: 'Online User', userId: 'u-x' })];
    const { result } = renderHook(() => useMentionUsers(participants));

    const users = result.current;
    const onlineIdx = users.findIndex(u => u.online);
    const offlineIdx = users.findIndex(u => !u.online && u.type === 'user');
    const groupIdx = users.findIndex(u => u.type === 'group');

    expect(onlineIdx).toBeLessThan(offlineIdx);
    expect(offlineIdx).toBeLessThan(groupIdx);
  });

  it('total count = participants + offline directory users (not duplicated) + groups', () => {
    const { result } = renderHook(() => useMentionUsers([]));
    const total = result.current.length;
    // No participants → all DEV_USERS offline + all DEV_GROUPS
    expect(total).toBe(DEV_USERS.length + DEV_GROUPS.length);
  });
});

// ---------------------------------------------------------------------------
// Online participants
// ---------------------------------------------------------------------------

describe('online participants', () => {
  it('marks known participants as online: true', () => {
    const p = makeParticipant({ userId: 'u-a', displayName: 'Stranger' });
    const { result } = renderHook(() => useMentionUsers([p]));

    const found = result.current.find(u => u.userId === 'u-a');
    expect(found?.online).toBe(true);
  });

  it('matches a participant to the directory by display name and uses directory color', () => {
    // Alice Chen is in DEV_USERS
    const alice = makeParticipant({ userId: 'alice', displayName: 'Alice Chen' });
    const { result } = renderHook(() => useMentionUsers([alice]));

    const found = result.current.find(u => u.userId === 'alice');
    expect(found?.color).toBe('#3b82f6'); // Alice's directory color
  });

  it('deduplicates participants with the same userId', () => {
    const p1 = makeParticipant({ clientId: 'c1', userId: 'u-same', displayName: 'Same User' });
    const p2 = makeParticipant({ clientId: 'c2', userId: 'u-same', displayName: 'Same User' });
    const { result } = renderHook(() => useMentionUsers([p1, p2]));

    const found = result.current.filter(u => u.userId === 'u-same');
    expect(found).toHaveLength(1);
  });

  it('does not list an online participant again in the offline section', () => {
    // Bob Martinez is in DEV_USERS; make him online
    const bob = makeParticipant({ userId: 'bob', displayName: 'Bob Martinez' });
    const { result } = renderHook(() => useMentionUsers([bob]));

    const bobs = result.current.filter(u => u.displayName === 'Bob Martinez');
    expect(bobs).toHaveLength(1); // only once
    expect(bobs[0].online).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Offline directory users
// ---------------------------------------------------------------------------

describe('offline directory users', () => {
  it('includes all DEV_USERS when no participants are online', () => {
    const { result } = renderHook(() => useMentionUsers([]));
    const userNames = result.current.filter(u => u.type === 'user').map(u => u.displayName);
    for (const du of DEV_USERS) {
      expect(userNames).toContain(du.displayName);
    }
  });

  it('marks directory users as online: false', () => {
    const { result } = renderHook(() => useMentionUsers([]));
    const offlineUsers = result.current.filter(u => u.type === 'user');
    for (const u of offlineUsers) {
      expect(u.online).toBe(false);
    }
  });
});

// ---------------------------------------------------------------------------
// Groups
// ---------------------------------------------------------------------------

describe('groups', () => {
  it('includes all DEV_GROUPS', () => {
    const { result } = renderHook(() => useMentionUsers([]));
    const groupNames = result.current.filter(u => u.type === 'group').map(u => u.displayName);
    for (const g of DEV_GROUPS) {
      expect(groupNames).toContain(g.name);
    }
  });

  it('includes memberCount on group entries', () => {
    const { result } = renderHook(() => useMentionUsers([]));
    const groups = result.current.filter(u => u.type === 'group');
    for (const g of groups) {
      expect(typeof g.memberCount).toBe('number');
    }
  });
});

// ---------------------------------------------------------------------------
// Memoization
// ---------------------------------------------------------------------------

describe('memoization', () => {
  it('returns a stable reference when participants array is the same', () => {
    const participants: Participant[] = [];
    const { result, rerender } = renderHook(() => useMentionUsers(participants));
    const first = result.current;
    rerender();
    expect(result.current).toBe(first);
  });
});
