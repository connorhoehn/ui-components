import { describe, expect, it, vi } from 'vitest';
import { ConversationInputRegistry, threadInputOwner, type ConversationInputClaim } from '../conversationInputRegistry';

const DOC = 'assessment:doc:page:A100003';
const TEAM = 'assessment:team:TEAM-001';
const HUDDLE = 'orgiq:huddle:call-1';
const claim = (id: number, channels: string[], label = `composer ${id}`, replies = false): ConversationInputClaim => ({ id, channels, label, replies });

describe('threadInputOwner', () => {
  it('a thread keeps its own input when no composer claims its conversation', () => {
    expect(threadInputOwner(HUDDLE, [])).toEqual({ owner: 'thread' });
    expect(threadInputOwner(HUDDLE, [claim(1, [DOC])])).toEqual({ owner: 'thread' });
    expect(threadInputOwner(null, [claim(1, [DOC])])).toEqual({ owner: 'thread' });
  });

  it('a composer that addresses the thread owns its input', () => {
    expect(threadInputOwner(DOC, [claim(1, [DOC], 'the document composer', true)]))
      .toEqual({ owner: 'composer', claimId: 1, label: 'the document composer', replies: true });
    const both = [claim(2, [TEAM, HUDDLE], 'the dimension composer')];
    expect(threadInputOwner(HUDDLE, both).owner).toBe('composer');
    expect(threadInputOwner(TEAM, both).owner).toBe('composer');
  });

  it('the newest claim wins', () => {
    const owner = threadInputOwner(HUDDLE, [claim(1, [HUDDLE], 'older'), claim(2, [DOC]), claim(3, [HUDDLE], 'newer')]);
    expect(owner.owner === 'composer' && owner.label).toBe('newer');
  });
});

describe('ConversationInputRegistry', () => {
  it('publishes claims, releases them and routes a thread intent to the owner only', () => {
    const registry = new ConversationInputRegistry();
    const focused: string[] = [];
    const release = registry.claim({ channels: [DOC, DOC], label: 'the document composer', replies: true,
      focus: (intent) => { focused.push(`${intent.channel}:${intent.reply ? 'reply' : 'write'}`); return true; } });
    const first = registry.claims();
    expect(first).toHaveLength(1);
    expect(first[0]!.channels).toEqual([DOC]);
    expect(registry.claims()).toBe(first);
    expect(registry.focusThread({ channel: DOC, reply: true })).toBe(true);
    expect(registry.focusThread({ channel: HUDDLE })).toBe(false);
    expect(focused).toEqual([`${DOC}:reply`]);
    release();
    expect(registry.claims()).toHaveLength(0);
    release();
  });

  it('focus requests: revealers run first, the first mounted composer that answers takes it, presence tracks composers', () => {
    const registry = new ConversationInputRegistry();
    const order: string[] = [];
    registry.onReveal(() => order.push('reveal'));
    expect(registry.composerPresent()).toBe(false);
    expect(registry.requestFocus({ mode: 'chat' })).toBe(false);
    const offA = registry.onFocusRequest(() => { order.push('a'); return false; });
    registry.onFocusRequest(() => { order.push('b'); return true; });
    registry.onFocusRequest(() => { order.push('c'); return true; });
    expect(registry.composerPresent()).toBe(true);
    order.length = 0;
    expect(registry.requestFocus({ mode: 'chat', target: { kind: 'discussion' } })).toBe(true);
    expect(order).toEqual(['reveal', 'a', 'b']);
    offA();
    const listener = vi.fn();
    registry.subscribe(listener);
    registry.onFocusRequest(() => false)();
    expect(listener).toHaveBeenCalled();
  });

  it('every surface pairing: one input per conversation', () => {
    const cases: Array<[string, string[] | null, string, 'composer' | 'thread']> = [
      ['document Editor tab: dock + Chat panel', [DOC], DOC, 'composer'],
      ['document Comments tab: no dock', null, DOC, 'thread'],
      ['scorecard drill-down, live huddle beside the block', [TEAM, HUDDLE], HUDDLE, 'composer'],
      ['pipelines run discussion + huddle pane', ['pipelines:run:r-1'], HUDDLE, 'thread'],
      ['settings page, huddle pane', null, HUDDLE, 'thread'],
    ];
    for (const [name, channels, thread, expected] of cases) {
      const registry = new ConversationInputRegistry();
      if (channels) registry.claim({ channels, label: 'page', focus: () => true });
      expect(threadInputOwner(thread, registry.claims()).owner, name).toBe(expected);
    }
  });
});
