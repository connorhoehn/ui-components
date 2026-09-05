import { describe, expect, it } from 'vitest';
import { conversationFeaturesFor } from '../WrappedConversationSurface';

// The host's half of the two gates: what this PARTICULAR conversation is
// capable of, before the gateway is asked what it provisions.

describe('conversationFeaturesFor', () => {
  it('gives a DM everything the host ships', () => {
    const f = conversationFeaturesFor({ channel: 'chat:dm:alice:bob' });
    expect(f).toContain('chat');
    expect(f).toContain('calls');
    expect(f).toContain('documents');
    expect(f).toContain('files');
  });

  // The rule this exists for. A plain channel has no call lobby, so its Calls
  // tab could only ever say "Calls recorded in this conversation show up
  // here" — about calls that can never happen, because there is no way to
  // start one and nowhere to record it.
  it('offers no calls in a conversation that cannot have any', () => {
    expect(conversationFeaturesFor({ channel: 'general' })).not.toContain('calls');
    expect(conversationFeaturesFor({ channel: null })).not.toContain('calls');
  });

  it('keeps calls for a room, which is a place you can call into', () => {
    expect(conversationFeaturesFor({ channel: 'room:design' })).toContain('calls');
  });

  it('drops documents for a host mounted without them', () => {
    const f = conversationFeaturesFor({ channel: 'chat:dm:alice:bob', hasDocuments: false });
    expect(f).not.toContain('documents');
    expect(f).toContain('chat');
  });

  // Mentions span every conversation, so a per-channel tab claims a scope it
  // does not have. They belong on a shelf, beside the list.
  it('never offers mentions as a view of one conversation', () => {
    expect(conversationFeaturesFor({ channel: 'chat:dm:alice:bob' })).not.toContain('mentions');
    expect(conversationFeaturesFor({ channel: 'general' })).not.toContain('mentions');
  });

  it('only ever narrows what it was given', () => {
    const from = ['chat', 'calls'] as const;
    expect(conversationFeaturesFor({ channel: 'chat:dm:a:b', from })).toEqual(['chat', 'calls']);
    expect(conversationFeaturesFor({ channel: 'general', from })).toEqual(['chat']);
  });

  it('always keeps chat, which is the one thing a conversation is', () => {
    for (const channel of ['general', 'chat:dm:a:b', 'room:x', null]) {
      expect(conversationFeaturesFor({ channel })).toContain('chat');
    }
  });
});
