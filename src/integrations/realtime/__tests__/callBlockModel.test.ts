import { describe, expect, it, vi } from 'vitest';
import {
  CallBlockClaims,
  callBlockLayout,
  callBlockNarrow,
  callCounts,
  callDrawn,
  callOn,
  checkDevicesInitial,
  conversationHoldsCall,
  countdownSeconds,
  DEFAULT_PRE_JOIN,
  mediaFixups,
  pageHuddleStart,
  parsePreJoin,
  preJoinCountdownMs,
  preJoinGate,
  RING_AUTO_JOIN_MS,
  shouldShowPreJoin,
} from '../callBlockModel';

describe('the one media sink', () => {
  it('one target: the last claimant within a placement, falling back on release, the footer with none', () => {
    const claims = new CallBlockClaims<string>();
    let notified = 0;
    claims.subscribe(() => { notified += 1; });
    expect(claims.current()).toBeNull();
    const releaseA = claims.claim('block-a');
    const releaseB = claims.claim('block-b');
    expect(claims.current()).toBe('block-b');
    releaseA();
    expect(claims.current()).toBe('block-b');
    releaseB();
    expect(claims.current()).toBeNull();
    releaseB();
    expect(notified).toBe(4);
  });

  it('composer > page > block > pane; layout and narrow form follow the holder', () => {
    const claims = new CallBlockClaims<string>();
    expect(claims.placement()).toBe('footer');
    expect(callBlockLayout(claims.placement())).toBe('shelf');
    const releasePane = claims.claim('pane', 'pane');
    expect(claims.placement()).toBe('pane');
    expect(callBlockLayout('pane')).toBe('grid');
    expect(claims.pageClaimed()).toBe(false);
    const releaseShell = claims.claim('shell', 'block');
    const releasePage = claims.claim('page', 'page');
    expect(claims.current()).toBe('page');
    const docs = [{ id: 'page:1', title: 'Auth architecture' }];
    const releaseComposer = claims.claim('composer', 'composer', { compact: true, documents: docs });
    expect(claims.current()).toBe('composer');
    expect(claims.compact()).toBe(true);
    expect(claims.documents()).toBe(docs);
    expect(callBlockLayout('composer', true)).toBe('stack');
    expect(callBlockLayout('composer')).toBe('shelf');
    expect(claims.pageClaimed()).toBe(true);
    releaseComposer();
    expect(claims.current()).toBe('page');
    expect(claims.documents()).toEqual([]);
    releasePage();
    expect(claims.current()).toBe('shell');
    releaseShell();
    releasePane();
    expect(claims.placement()).toBe('footer');
  });

  it('a composer below 640px takes the narrow block; unmeasured is not narrow', () => {
    expect(callBlockNarrow(0)).toBe(false);
    expect(callBlockNarrow(460)).toBe(true);
    expect(callBlockNarrow(639)).toBe(true);
    expect(callBlockNarrow(640)).toBe(false);
  });
});

describe('whose call it is', () => {
  it('a conversation holds the call from the caller\'s ring to the ended notice; an incoming ring is the toast\'s', () => {
    const dm = { lobbyName: 'social:dm:u-farah:u-sana', channel: 'social:dm:u-farah:u-sana' };
    expect(conversationHoldsCall(dm, 'calling', [dm.channel])).toBe(true);
    for (const phase of ['connecting', 'live', 'reconnecting', 'ended', 'failed']) expect(conversationHoldsCall(dm, phase, [dm.channel])).toBe(true);
    expect(conversationHoldsCall(dm, 'ringing', [dm.channel])).toBe(false);
    expect(conversationHoldsCall(dm, 'idle', [dm.channel])).toBe(false);
    expect(conversationHoldsCall(dm, 'live', ['social:dm:u-farah:u-mira'])).toBe(false);
    expect(conversationHoldsCall(null, 'live', [dm.channel])).toBe(false);
    const initiative = { lobbyName: 'orgiq:dm:u-nora:u-rachel', channel: 'initiative:p-auth-migration' };
    expect(conversationHoldsCall(initiative, 'live', [null, 'initiative:p-auth-migration'])).toBe(true);
  });

  it('drawn vs on, and the counts', () => {
    expect(callDrawn('ringing', true)).toBe(false);
    expect(callDrawn('ended', true)).toBe(true);
    expect(callOn('ended', true)).toBe(false);
    expect(callOn('live', false)).toBe(false);
    expect(callCounts(null)).toEqual({ joined: 0, ringing: 0 });
    expect(callCounts({ participantCount: 2, participants: [{ state: 'in-call' }, { state: 'reconnecting' }, { state: 'ringing' }, { state: 'declined' }] })).toEqual({ joined: 2, ringing: 1 });
    expect(callCounts({ participantCount: 1, participants: [{ state: 'in-call' }, { state: 'reconnecting' }] })).toEqual({ joined: 2, ringing: 0 });
  });

  it('a page huddle walks into the discovered call, else opens one ringing nobody', () => {
    const call = () => ({ phase: 'idle', call: { callId: 'c' } as unknown, rejoin: vi.fn(), start: vi.fn() });
    const discovered = call();
    expect(pageHuddleStart(discovered)).toBe('rejoin');
    expect(discovered.start).not.toHaveBeenCalled();
    const fresh = { ...call(), call: null };
    expect(pageHuddleStart(fresh)).toBe('start');
    expect(fresh.start).toHaveBeenCalledWith([]);
    expect(pageHuddleStart({ ...call(), phase: 'live' })).toBeNull();
  });
});

describe('the pre-join device check', () => {
  it('stored choices tolerate absence, garbage and partial records', () => {
    expect(parsePreJoin(null)).toEqual(DEFAULT_PRE_JOIN);
    expect(parsePreJoin('{nope')).toEqual(DEFAULT_PRE_JOIN);
    expect(parsePreJoin('"x"')).toEqual(DEFAULT_PRE_JOIN);
    expect(parsePreJoin('{"micOn":false,"remember":true}')).toEqual({ micOn: false, cameraOn: true, remember: true });
    expect(parsePreJoin('{"remember":"yes"}').remember).toBe(false);
  });
  it('only entering a call is gated', () => {
    expect(preJoinGate('start', 'idle', false)).toBe('start');
    expect(preJoinGate('start', 'live', true)).toBeNull();
    expect(preJoinGate('rejoin', 'idle', true)).toBe('join');
    expect(preJoinGate('rejoin', 'idle', false)).toBeNull();
    expect(preJoinGate('rejoin', 'failed', true)).toBeNull();
    expect(preJoinGate('accept', 'idle', false)).toBe('accept');
  });
  it('remember skips the screen; an explicit check always shows and clears the skip; only a ring counts down', () => {
    for (const kind of ['start', 'join', 'accept'] as const) {
      expect(shouldShowPreJoin({ ...DEFAULT_PRE_JOIN, remember: true }, kind)).toBe(false);
      expect(shouldShowPreJoin(DEFAULT_PRE_JOIN, kind)).toBe(true);
    }
    expect(shouldShowPreJoin({ ...DEFAULT_PRE_JOIN, remember: true }, 'check')).toBe(true);
    expect(checkDevicesInitial({ micOn: false, cameraOn: true, remember: true })).toEqual({ micOn: false, cameraOn: true, remember: false });
    expect(preJoinCountdownMs('accept')).toBe(RING_AUTO_JOIN_MS);
    expect(preJoinCountdownMs('start')).toBeNull();
    expect(countdownSeconds(9_100)).toBe(10);
    expect(countdownSeconds(-5)).toBe(0);
  });
  it('media fixups toggle only what is on but chosen off', () => {
    expect(mediaFixups({ micOn: false, cameraOn: false, remember: false }, { audioOn: true, cameraOn: true })).toEqual({ toggleMic: true, toggleCamera: true });
    expect(mediaFixups({ micOn: true, cameraOn: false, remember: false }, { audioOn: true, cameraOn: true })).toEqual({ toggleMic: false, toggleCamera: true });
    expect(mediaFixups({ micOn: false, cameraOn: false, remember: false }, { audioOn: false, cameraOn: false })).toEqual({ toggleMic: false, toggleCamera: false });
  });
});
