import { describe, expect, it } from 'vitest';
import { callRefFromMetadata } from '../ChatPanel';

const base = { kind: 'call', callId: 'c1', lobbyName: 'room:design', participants: [] };

describe('callRefFromMetadata — recording decision', () => {
  // A record written before decisions were stamped must not read as either.
  it('says nothing about recording when the record does not', () => {
    const ref = callRefFromMetadata(base);
    expect(ref?.recorded).toBeUndefined();
    expect(ref?.notRecordedReason).toBeUndefined();
    expect(ref?.lobbyName).toBe('room:design');
  });

  it('carries the decision and its reason through', () => {
    const ref = callRefFromMetadata({ ...base, recorded: false, notRecordedReason: 'room-setting-off' });
    expect(ref?.recorded).toBe(false);
    expect(ref?.notRecordedReason).toBe('room-setting-off');
  });

  it('carries a positive decision without a reason', () => {
    const ref = callRefFromMetadata({ ...base, recorded: true, notRecordedReason: 'dm-both-opted-in' });
    expect(ref?.recorded).toBe(true);
  });

  it('ignores a decision that is not a boolean', () => {
    const ref = callRefFromMetadata({ ...base, recorded: 'no', notRecordedReason: 7 });
    expect(ref?.recorded).toBeUndefined();
    expect(ref?.notRecordedReason).toBeUndefined();
  });

  it('is still null for anything that is not a call', () => {
    expect(callRefFromMetadata({ kind: 'document', recorded: false })).toBeNull();
    expect(callRefFromMetadata(undefined)).toBeNull();
  });
});
