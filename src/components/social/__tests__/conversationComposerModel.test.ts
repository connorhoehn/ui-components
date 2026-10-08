import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  AttachmentWaiters,
  attachmentOnlyText,
  claimedChannels,
  conversationModes,
  DEFAULT_AGENT_OFF_REASON,
  DEFAULT_READ_ONLY_REASON,
  draftStorageKey,
  matchConversationCommand,
  outgoingMetadata,
  readStoredDraft,
  resolveRecipient,
  typedAgentText,
  typingFor,
  uploadFailureMessage,
  writeStoredDraft,
} from '../conversationComposerModel';

afterEach(() => { vi.useRealTimers(); });

describe('conversationModes: capabilities are the server answer', () => {
  it('maySend false: Chat is offered, off, with the server reason; no Agent without `agent`', () => {
    const state = conversationModes({ capabilities: { maySend: false, readOnlyReason: 'Readers cannot post' }, hasChat: true, choosable: 0 });
    expect(state.modes).toEqual(['chat']);
    expect(state.disabledModes).toEqual(['chat']);
    expect(state.reasons.chat).toBe('Readers cannot post');
  });

  it('a missing reason still says why; Agent off when not allowed', () => {
    const state = conversationModes({ capabilities: { maySend: false, agent: { allowed: false } }, hasChat: true, choosable: 0 });
    expect(state.reasons).toEqual({ chat: DEFAULT_READ_ONLY_REASON, agent: DEFAULT_AGENT_OFF_REASON });
    expect(state.disabledModes).toEqual(['chat', 'agent']);
  });

  it('a writer with an allowed agent has both modes on; offline turns both off', () => {
    const on = conversationModes({ capabilities: { maySend: true, agent: { allowed: true } }, hasChat: true, choosable: 1 });
    expect(on).toEqual({ modes: ['chat', 'agent'], disabledModes: [], reasons: {} });
    const off = conversationModes({ capabilities: { maySend: true, agent: { allowed: true } }, hasChat: true, choosable: 1, offline: 'Reconnect' });
    expect(off.disabledModes).toEqual(['chat', 'agent']);
    expect(off.reasons).toEqual({ chat: 'Reconnect', agent: 'Reconnect' });
  });

  it('no conversation and no recipients: agent only', () => {
    expect(conversationModes({ capabilities: { maySend: false, agent: { allowed: true } }, hasChat: false, choosable: 0 }).modes).toEqual(['agent']);
  });
});

describe('recipients and claims', () => {
  const list = [
    { id: 'discussion', label: 'Discussion', channel: 'orgiq:initiative:p-1' },
    { id: 'huddle:c-1', label: 'Huddle', channel: 'orgiq:huddle:c-1' },
    { id: 'huddle:c-0', label: 'Previous huddle', disabled: true },
  ];
  it('resolves the chosen recipient while listed, else the fallback, else the first choosable', () => {
    expect(resolveRecipient(list, 'huddle:c-1')?.id).toBe('huddle:c-1');
    expect(resolveRecipient(list, 'gone', 'huddle:c-1')?.id).toBe('huddle:c-1');
    expect(resolveRecipient(list, null)?.id).toBe('discussion');
    expect(resolveRecipient([], null)).toBeNull();
  });
  it('claims the thread and every recipient channel, once', () => {
    expect(claimedChannels('orgiq:initiative:p-1', list)).toEqual(['orgiq:initiative:p-1', 'orgiq:huddle:c-1']);
    expect(claimedChannels(null, [])).toEqual([]);
  });
});

describe('typing and metadata', () => {
  it('types only for words in Chat addressed to this channel', () => {
    const base = { html: '<p>hi</p>', mode: 'chat' as const, recipientChannel: 'c', channel: 'c' };
    expect(typingFor(base)).toBe(true);
    expect(typingFor({ ...base, html: '<p> </p>' })).toBe(false);
    expect(typingFor({ ...base, mode: 'agent' })).toBe(false);
    expect(typingFor({ ...base, recipientChannel: 'other' })).toBe(false);
  });
  it('stamps the name, the quote, the reference as kind/id only, and the uploaded files', () => {
    const meta = outgoingMetadata({
      displayName: 'Vera', reply: { messageId: 'm1', author: 'Nora', text: 'see this' },
      reference: { id: 'r', label: 'Org › Initiatives › Secret title', page: { kind: 'initiative', id: 'p-1' } },
      attachments: [{ id: 't1', name: 'a.png', size: 3, contentType: 'image/png', url: '/f/t1' }],
    });
    expect(meta).toEqual({
      displayName: 'Vera', replyTo: { messageId: 'm1', author: 'Nora', text: 'see this' },
      pageReference: { kind: 'initiative', id: 'p-1' },
      attachments: [{ id: 't1', name: 'a.png', size: 3, contentType: 'image/png', url: '/f/t1' }],
    });
    expect(JSON.stringify(meta)).not.toContain('Secret title');
    expect(outgoingMetadata({ displayName: 'Vera', reference: { id: 'r', label: 'display only' } })).toEqual({ displayName: 'Vera' });
  });
  it('agent text as typed, and commands matched at the start only', () => {
    expect(typedAgentText('/agent find the owner')).toBe('find the owner');
    expect(typedAgentText(' plain ')).toBe('plain');
    const commands = [{ trigger: '/deck' }, { trigger: '/summarize' }];
    expect(matchConversationCommand('/deck Q3 review', commands)).toEqual({ command: commands[0], argumentText: 'Q3 review' });
    expect(matchConversationCommand('/decks', commands)).toBeNull();
    expect(matchConversationCommand('make a /deck', commands)).toBeNull();
  });
});

describe('draft persistence', () => {
  it('remembers words, forgets an empty draft, tolerates garbage and no storage', () => {
    const store = new Map<string, string>();
    const storage = { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => { store.set(k, v); }, removeItem: (k: string) => { store.delete(k); } };
    writeStoredDraft(storage, 'social:ch:general', '<p>half a thought</p>');
    expect(readStoredDraft(storage, 'social:ch:general')).toBe('<p>half a thought</p>');
    expect(readStoredDraft(storage, 'social:ch:other')).toBeNull();
    writeStoredDraft(storage, 'social:ch:general', '<p></p>');
    expect(store.has(draftStorageKey('social:ch:general'))).toBe(false);
    store.set(draftStorageKey('x'), '{not json');
    expect(readStoredDraft(storage, 'x')).toBeNull();
    expect(readStoredDraft(null, 'x')).toBeNull();
    const throwing = { getItem: () => { throw new Error('denied'); }, setItem: () => { throw new Error('quota'); }, removeItem: () => {} };
    expect(readStoredDraft(throwing, 'x')).toBeNull();
    expect(() => writeStoredDraft(throwing, 'x', '<p>y</p>')).not.toThrow();
  });
});

describe('attachments', () => {
  it('settles on completion, rejects on the deadline, rejects all on a conversation change', async () => {
    vi.useFakeTimers();
    const waiters = new AttachmentWaiters();
    const landed = waiters.wait('t1', 1000, 'a.png');
    expect(waiters.complete('t1', { id: 't1', name: 'a.png', size: 1, contentType: 'image/png', url: '/u' })).toBe(true);
    await expect(landed).resolves.toMatchObject({ id: 't1' });
    const stuck = waiters.wait('t2', 1000, 'b.png');
    vi.advanceTimersByTime(1001);
    await expect(stuck).rejects.toThrow('Upload failed: timed out (b.png)');
    const changed = waiters.wait('t3', 1000, 'c.png');
    waiters.rejectAll('Conversation changed; draft retained.');
    await expect(changed).rejects.toThrow('Conversation changed');
    expect(waiters.size).toBe(0);
    expect(waiters.complete('nobody', { id: 'x', name: 'x', size: 0, contentType: '', url: '' })).toBe(false);
  });
  it('words for an empty body and for a failure', () => {
    expect(attachmentOnlyText([{ id: '1', name: 'a.pdf', size: 1, contentType: '', url: '' }, { id: '2', name: 'b.png', size: 1, contentType: '', url: '' }])).toBe('a.pdf, b.png');
    expect(uploadFailureMessage('upload failed: HTTP 500')).toBe('Upload failed: HTTP 500');
    expect(uploadFailureMessage(undefined)).toBe('Upload failed: unknown error');
  });
});
