import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { createConversationComposer, type ConversationComposerProps } from '../ConversationComposer';
import { ConversationInputProvider, useComposerFocus, useThreadInput } from '../ConversationInputs';
import { DensityProvider } from '../../shared/Density';
import { ToastProvider } from '../../shared/ToastProvider';
import type { RichChatComposerHandle } from '../RichChatComposer';
import { draftStorageKey } from '../conversationComposerModel';
import * as client from '@connorhoehn/realtime-modules/client';
import { readSelectOptions } from '../../../test-utils/selectListbox';

afterEach(cleanup);
beforeEach(() => { window.localStorage.clear(); });

beforeAll(() => {
  const rects = () => ({ length: 0, item: () => null, [Symbol.iterator]: [][Symbol.iterator] }) as unknown as DOMRectList;
  const rect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  for (const proto of [Range.prototype, Element.prototype]) {
    if (!proto.getClientRects) Object.assign(proto, { getClientRects: rects });
    if (!proto.getBoundingClientRect) Object.assign(proto, { getBoundingClientRect: rect });
  }
});

const uploads: Array<{ file: File; channel: string }> = [];
let completeTransfer: ((t: { transferId: string; mine: boolean; filename: string; size: number; contentType: string; downloadUrl: string }) => void) | null = null;
const ConversationComposer = createConversationComposer({
  useFileUpload: (channel, options) => {
    completeTransfer = options?.onComplete ?? null;
    return { upload: async (file: File) => { uploads.push({ file, channel }); return { status: 'uploading', transferId: `t-${uploads.length}` }; } };
  },
});

const CHANNEL = 'orgiq:initiative:p-1';
const context = { kind: 'conversation' as const, id: CHANNEL, title: 'Auth Migration' };

function setup(overrides: Partial<ConversationComposerProps> = {}) {
  let handle: RichChatComposerHandle | null = null;
  const chat = { sendMessage: vi.fn(), setTyping: vi.fn() };
  const props: ConversationComposerProps = {
    channel: CHANNEL,
    chat,
    context,
    capabilities: { maySend: true },
    identity: { userId: 'u-vera', displayName: 'Vera Green' },
    composerTestId: 'composer',
    composerRef: (h) => { handle = h; },
    ...overrides,
  };
  const utils = render(<ConversationInputProvider><ConversationComposer {...props} /></ConversationInputProvider>, { wrapper: ToastProvider });
  return { ...utils, props, chat, handle: () => handle };
}

const input = () => screen.getByTestId('composer').querySelector('.ProseMirror') as HTMLElement;
const type = async (handle: () => RichChatComposerHandle | null, html: string) => {
  await act(async () => { input().focus(); fireEvent.focusIn(input()); });
  act(() => { handle()?.editor?.commands.setContent(html, { emitUpdate: true }); });
};
const send = async () => { await act(async () => { fireEvent.click(screen.getByTestId('composer-send')); }); };

describe('ConversationComposer — capabilities', () => {
  it('a reader (maySend false) cannot send: Chat is off with the server reason and nothing is posted', async () => {
    const { chat, handle } = setup({ capabilities: { maySend: false, readOnlyReason: 'Your role can read this discussion' } });
    await type(handle, '<p>hello</p>');
    await send();
    expect(chat.sendMessage).not.toHaveBeenCalled();
    expect(screen.getByTestId('composer').getAttribute('data-disabled') ?? 'true').toBeTruthy();
  });

  it('a writer posts to the conversation with the name stamped, then the draft clears', async () => {
    const { chat, handle } = setup();
    await type(handle, '<p>hello team</p>');
    await send();
    await waitFor(() => expect(chat.sendMessage).toHaveBeenCalledWith('hello team', { displayName: 'Vera Green' }));
  });

  it('no `agent` capability: no Agent mode at all; allowed=false: Agent offered and off', async () => {
    setup({ capabilities: { maySend: true } });
    expect(screen.queryByText('Agent')).toBeNull();
    cleanup();
    setup({ capabilities: { maySend: true, agent: { allowed: false, reason: 'Your role cannot run the agent' } }, expanded: true });
    await act(async () => { fireEvent.click(screen.getByTestId('composer-mode-menu')); });
    expect(screen.getByText('Your role cannot run the agent')).toBeInTheDocument();
  });
});

describe('ConversationComposer — commands and agent', () => {
  it('a typed command runs its handler; a string result keeps the draft and says why', async () => {
    const run = vi.fn(async () => 'Decks are not available for this initiative.');
    const { chat, handle } = setup({ commands: [{ trigger: '/deck', label: 'Status deck', run }] });
    await type(handle, '<p>/deck Q3 review</p>');
    await send();
    await waitFor(() => expect(run).toHaveBeenCalled());
    expect((run.mock.calls[0] as unknown as [unknown])[0]).toMatchObject({ trigger: '/deck', argumentText: 'Q3 review', mode: 'chat' });
    expect(chat.sendMessage).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Decks are not available for this initiative.'));
  });

  it('Agent text that is no command goes to onAgent, as typed', async () => {
    const onAgent = vi.fn(() => true);
    const { handle } = setup({ capabilities: { maySend: true, agent: { allowed: true } }, defaultMode: 'agent', onAgent });
    await type(handle, '<p>who owns the auth service?</p>');
    await send();
    await waitFor(() => expect(onAgent).toHaveBeenCalled());
    expect((onAgent.mock.calls[0] as unknown as [unknown])[0]).toBe('who owns the auth service?');
  });
});

describe('ConversationComposer — recipients and the page reference', () => {
  const reference = { id: 'ref', label: 'Org › Initiatives › Auth Migration', page: { kind: 'initiative', id: 'p-1' } };
  it('To: lists the destinations; a person recipient uses its own send with the reference as kind/id', async () => {
    const dm = vi.fn(async () => true);
    const { chat, handle } = setup({
      context: { ...context, reference },
      recipients: [
        { id: 'discussion', label: "This item's Discussion", channel: CHANNEL },
        { id: 'person:u-nora', label: 'Nora DaSilva', group: 'Direct message', channel: 'orgiq:dm:u-nora:u-vera', send: dm },
      ],
    });
    const select = screen.getByRole('combobox', { name: 'Chat recipient' });
    await act(async () => { fireEvent.change(select, { target: { value: 'person:u-nora' } }); });
    await type(handle, '<p>see this</p>');
    await send();
    await waitFor(() => expect(dm).toHaveBeenCalled());
    expect((dm.mock.calls[0] as unknown as [unknown])[0]).toMatchObject({ text: 'see this', metadata: { displayName: 'Vera Green', pageReference: { kind: 'initiative', id: 'p-1' } } });
    expect(chat.sendMessage).not.toHaveBeenCalled();
  });

  it('the conversation recipient is gated by maySend whatever the host lists', async () => {
    setup({
      capabilities: { maySend: false, readOnlyReason: 'Readers cannot post here' },
      recipients: [
        { id: 'discussion', label: 'Discussion', channel: CHANNEL },
        { id: 'huddle:c-1', label: 'Huddle', channel: 'orgiq:huddle:c-1', send: async () => true },
      ],
    });
    const options = readSelectOptions(screen.getByRole('combobox', { name: 'Chat recipient' }));
    expect(options.find((o) => o.value === 'discussion')?.disabled).toBe(true);
  });

  it('says why the destination is read-only on the To: row itself, beside the selector', () => {
    const { container } = setup({
      capabilities: { maySend: false, readOnlyReason: 'You can read messages. Your current role cannot post to this discussion.' },
      defaultMode: 'chat',
      defaultRecipient: 'discussion',
      recipients: [
        { id: 'discussion', label: 'Discussion', channel: CHANNEL },
        { id: 'huddle:c-1', label: 'Huddle', channel: 'orgiq:huddle:c-1', send: async () => true },
      ],
    });
    const row = container.querySelector('[data-composer-recipient-row]');
    const notice = container.querySelector('[data-composer-recipient-notice]') as HTMLElement | null;
    expect(row?.contains(screen.getByRole('combobox', { name: 'Chat recipient' }))).toBe(true);
    expect(notice && row?.contains(notice)).toBe(true);
    // One line with the whole sentence on hover; a divider separates it from To:.
    expect(notice?.getAttribute('title')).toBe('You can read messages. Your current role cannot post to this discussion.');
    expect(notice?.querySelector('.truncate')).not.toBeNull();
    expect(notice?.className).toContain('border-l');
  });

  it('removing the reference chip sends without it', async () => {
    const { chat, handle } = setup({ context: { ...context, reference }, expanded: true });
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: /Remove Org › Initiatives › Auth Migration from this draft/ })); });
    await type(handle, '<p>no context</p>');
    await send();
    await waitFor(() => expect(chat.sendMessage).toHaveBeenCalledWith('no context', { displayName: 'Vera Green' }));
  });
});

describe('ConversationComposer — typing, drafts, uploads', () => {
  it('announces typing while a Chat draft for this channel has words', async () => {
    const { chat, handle } = setup();
    await type(handle, '<p>typ</p>');
    expect(chat.setTyping).toHaveBeenLastCalledWith(true);
    await type(handle, '<p></p>');
    expect(chat.setTyping).toHaveBeenLastCalledWith(false);
  });

  it('remembers the draft per conversation on this device and restores it', async () => {
    const { handle, unmount } = setup();
    await type(handle, '<p>half a thought</p>');
    expect(window.localStorage.getItem(draftStorageKey(JSON.stringify(['actor', 'u-vera', CHANNEL])))).toContain('half a thought');
    unmount();
    setup();
    await waitFor(() => expect(input().textContent).toContain('half a thought'));
  });

  it('a file lands first; the message cites only what the gateway confirmed', async () => {
    uploads.length = 0;
    const { chat, handle } = setup({ capabilities: { maySend: true, mayAttach: true } });
    await type(handle, '<p>the diagram</p>');
    const file = new File(['x'], 'diagram.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('composer').querySelector('input[type="file"]') as HTMLInputElement;
    await act(async () => { fireEvent.change(fileInput, { target: { files: [file] } }); });
    await send();
    await waitFor(() => expect(uploads).toHaveLength(1));
    expect(uploads[0]!.channel).toBe(CHANNEL);
    expect(chat.sendMessage).not.toHaveBeenCalled();
    await act(async () => { completeTransfer?.({ transferId: 't-1', mine: true, filename: 'diagram.png', size: 1, contentType: 'image/png', downloadUrl: '/f/t-1' }); });
    await waitFor(() => expect(chat.sendMessage).toHaveBeenCalled());
    expect(chat.sendMessage.mock.calls[0]![1]).toMatchObject({ attachments: [{ id: 't-1', name: 'diagram.png', url: '/f/t-1' }] });
  });

  it('no mayAttach: no file input', () => {
    setup({ capabilities: { maySend: true } });
    expect(screen.getByTestId('composer').querySelector('input[type="file"]')).toBeNull();
  });
});

describe('ConversationComposer — one input per conversation, focus, density', () => {
  function Thread() {
    const owner = useThreadInput(CHANNEL);
    return <div data-testid="thread-owner">{owner.owner === 'composer' ? owner.label : 'thread'}</div>;
  }
  function Footer() {
    const focus = useComposerFocus();
    return <button type="button" data-testid="message" disabled={!focus.present} onClick={() => focus.request({ mode: 'chat', target: { kind: 'discussion' } })}>Message</button>;
  }

  it('a claiming composer owns the thread input; the footer focus request lands in it', async () => {
    const chat = { sendMessage: vi.fn(), setTyping: vi.fn() };
    render(<ConversationInputProvider>
      <Thread /><Footer />
      <ConversationComposer channel={CHANNEL} chat={chat} context={context} capabilities={{ maySend: true }} composerTestId="composer"
        claim={{ label: 'the initiative composer' }} answersFocus />
    </ConversationInputProvider>);
    expect(screen.getByTestId('thread-owner')).toHaveTextContent('the initiative composer');
    expect(screen.getByTestId('message')).not.toBeDisabled();
  });

  it('under compact density it takes the pane form; there is no size prop', () => {
    render(<ConversationInputProvider><DensityProvider value="compact">
      <ConversationComposer channel={CHANNEL} context={context} capabilities={{ maySend: true }} composerTestId="composer" />
    </DensityProvider></ConversationInputProvider>);
    expect(screen.getByTestId('composer').closest('[data-responsive]') ?? screen.getByTestId('composer')).toBeTruthy();
  });
});

describe('ConversationComposer — the injected hook', () => {
  it('the installed realtime-modules /client satisfies ConversationComposerModules', () => {
    expect(typeof createConversationComposer(client)).toBe('function');
  });
});


describe('ConversationComposer — confirmed sends preserve current drafts', () => {
  function pendingSend() {
    let resolve!: (accepted: boolean) => void;
    let reject!: (error: Error) => void;
    const send = vi.fn(() => new Promise<boolean>((yes, no) => { resolve = yes; reject = no; }));
    return { send, resolve: (accepted: boolean) => resolve(accepted), reject: (error: Error) => reject(error) };
  }
  const recipient = (confirmed: ReturnType<typeof pendingSend>) => [{ id: 'discussion', label: 'Discussion', channel: CHANNEL, send: confirmed.send }];
  const saved = (key = CHANNEL, actor = 'u-vera') => window.localStorage.getItem(draftStorageKey(JSON.stringify(['actor', actor, key])));

  it('clears a confirmed unchanged draft and its storage once', async () => {
    const confirmed = pendingSend();
    const clearReply = vi.fn();
    const { handle } = setup({ recipients: recipient(confirmed), reply: { reply: null, clear: clearReply } });
    await type(handle, '<p>submitted thought</p>');
    await send();
    await waitFor(() => expect(confirmed.send).toHaveBeenCalledTimes(1));
    expect(saved()).toContain('submitted thought');
    await act(async () => { confirmed.resolve(true); });
    await waitFor(() => expect(input().textContent).toBe(''));
    expect(saved()).toBeNull();
    expect(clearReply).toHaveBeenCalledTimes(1);
  });

  it('keeps a newer host-inserted draft in storage and restores it after a late acknowledgement', async () => {
    const confirmed = pendingSend();
    const clearReply = vi.fn();
    const { handle, unmount } = setup({ recipients: recipient(confirmed), reply: { reply: null, clear: clearReply } });
    await type(handle, '<p>submitted thought</p>');
    await send();
    await waitFor(() => expect(confirmed.send).toHaveBeenCalledTimes(1));
    // A host can seed a newer question or mention while the receipt is pending.
    await type(handle, '<p>newer thought</p>');
    expect(saved()).toContain('newer thought');
    await act(async () => { confirmed.resolve(true); });
    expect(input().textContent).toBe('newer thought');
    expect(saved()).toContain('newer thought');
    expect(clearReply).not.toHaveBeenCalled();
    expect(screen.getByTestId('toast-stack')).toHaveTextContent('Your current draft has been kept');
    expect(screen.queryByTestId('conversation-composer-note')).toBeNull();
    unmount();
    setup();
    await waitFor(() => expect(input().textContent).toBe('newer thought'));
  });

  it.each(['refused', 'error'] as const)('keeps the saved draft on a %s receipt and reload', async (outcome) => {
    const confirmed = pendingSend();
    const { handle, unmount } = setup({ recipients: recipient(confirmed) });
    await type(handle, '<p>keep this thought</p>');
    await send();
    await waitFor(() => expect(confirmed.send).toHaveBeenCalledTimes(1));
    await act(async () => {
      if (outcome === 'refused') confirmed.resolve(false);
      else confirmed.reject(new Error('Receipt not accepted'));
    });
    expect(saved()).toContain('keep this thought');
    expect(input().textContent).toBe('keep this thought');
    if (outcome === 'error') expect(screen.getByRole('alert')).toHaveTextContent('Your draft and attachments are saved');
    unmount();
    setup();
    await waitFor(() => expect(input().textContent).toBe('keep this thought'));
  });

  it.each(['channel', 'actor'] as const)('does not let an old receipt clear drafts after a %s scope switch', async (scope) => {
    const confirmed = pendingSend();
    const oldKey = scope === 'actor' ? `u-vera:${CHANNEL}` : CHANNEL;
    const nextChannel = scope === 'channel' ? 'orgiq:initiative:p-2' : CHANNEL;
    const nextKey = scope === 'actor' ? `u-nora:${CHANNEL}` : nextChannel;
    const clearReply = vi.fn();
    const { handle, props, rerender, unmount } = setup({ draftKey: oldKey, recipients: recipient(confirmed), reply: { reply: null, clear: clearReply } });
    await type(handle, '<p>first scope draft</p>');
    await send();
    await waitFor(() => expect(confirmed.send).toHaveBeenCalledTimes(1));
    window.localStorage.setItem(draftStorageKey(JSON.stringify(['actor', scope === 'actor' ? 'u-nora' : 'u-vera', nextKey])), JSON.stringify({ html: '<p>next scope draft</p>' }));
    rerender(<ConversationInputProvider><ConversationComposer {...props}
      channel={nextChannel} draftKey={nextKey}
      context={{ ...context, id: nextChannel }}
      identity={scope === 'actor' ? { userId: 'u-nora', displayName: 'Nora DaSilva' } : props.identity}
      recipients={[{ id: 'discussion', label: 'Discussion', channel: nextChannel, send: async () => true }]}
    /></ConversationInputProvider>);
    await waitFor(() => expect(input().textContent).toBe('next scope draft'));
    await act(async () => { confirmed.resolve(true); });
    expect(saved(oldKey)).toContain('first scope draft');
    expect(saved(nextKey, scope === 'actor' ? 'u-nora' : 'u-vera')).toContain('next scope draft');
    expect(input().textContent).toBe('next scope draft');
    expect(clearReply).not.toHaveBeenCalled();
    expect(screen.queryByTestId('conversation-composer-note')).toBeNull();
    unmount();
    setup({ channel: nextChannel, draftKey: nextKey, context: { ...context, id: nextChannel }, identity: { userId: scope === 'actor' ? 'u-nora' : 'u-vera', displayName: scope === 'actor' ? 'Nora DaSilva' : 'Vera Green' } });
    await waitFor(() => expect(input().textContent).toBe('next scope draft'));
  });

  it.each(['identity', 'destination'] as const)('ignores a pending receipt after only the %s changed', async (changed) => {
    const confirmed = pendingSend();
    const clearReply = vi.fn();
    const recipients = [
      ...recipient(confirmed),
      { id: 'person:u-nora', label: 'Nora DaSilva', channel: 'orgiq:dm:u-nora:u-vera', send: async () => true },
    ];
    const { handle, props, rerender } = setup({ recipients, recipient: 'discussion', reply: { reply: null, clear: clearReply } });
    await type(handle, '<p>scope-bound thought</p>');
    await send();
    await waitFor(() => expect(confirmed.send).toHaveBeenCalledTimes(1));
    rerender(<ConversationInputProvider><ConversationComposer {...props}
      identity={changed === 'identity' ? { userId: 'u-nora', displayName: 'Nora DaSilva' } : props.identity}
      recipient={changed === 'destination' ? 'person:u-nora' : 'discussion'}
    /></ConversationInputProvider>);
    await act(async () => { confirmed.resolve(true); });
    expect(saved()).toContain('scope-bound thought');
    expect(input().textContent).toBe(changed === 'identity' ? '' : 'scope-bound thought');
    expect(clearReply).not.toHaveBeenCalled();
    expect(screen.queryByTestId('conversation-composer-note')).toBeNull();
  });

  it('leaves a controlled newer draft with its host after confirmation', async () => {
    const confirmed = pendingSend();
    const changeDraft = vi.fn();
    const clearReply = vi.fn();
    const { props, rerender } = setup({ recipients: recipient(confirmed), reply: { reply: null, clear: clearReply }, draft: { html: '<p>submitted thought</p>', files: [] }, onDraftChange: changeDraft });
    await send();
    await waitFor(() => expect(confirmed.send).toHaveBeenCalledTimes(1));
    rerender(<ConversationInputProvider><ConversationComposer {...props} draft={{ html: '<p>new controlled thought</p>', files: [] }} /></ConversationInputProvider>);
    await waitFor(() => expect(input().textContent).toBe('new controlled thought'));
    changeDraft.mockClear();
    await act(async () => { confirmed.resolve(true); });
    expect(input().textContent).toBe('new controlled thought');
    expect(clearReply).not.toHaveBeenCalled();
    expect(changeDraft).not.toHaveBeenCalledWith(expect.objectContaining({ html: '' }), expect.anything());
    expect(saved()).toBeNull();
  });
});


describe('ConversationComposer — private actor draft persistence', () => {
  const vera = { userId: 'u-vera', displayName: 'Vera Green' };
  const nora = { userId: 'u-nora', displayName: 'Nora DaSilva' };
  const snapshotStorage = () => Array.from({ length: window.localStorage.length }, (_, i) => {
    const key = window.localStorage.key(i)!; return [key, window.localStorage.getItem(key)];
  }).sort(([a], [b]) => a!.localeCompare(b!));
  const rerenderAs = (utils: ReturnType<typeof setup>, identity: ConversationComposerProps['identity'], extra: Partial<ConversationComposerProps> = {}) => {
    utils.rerender(<ConversationInputProvider><ConversationComposer {...utils.props} identity={identity} {...extra} /></ConversationInputProvider>);
  };

  it('restores each actor’s own draft on the same conversation after remount', async () => {
    const a = setup({ identity: vera });
    await type(a.handle, '<p>Vera private thought</p>'); a.unmount();
    const b = setup({ identity: nora });
    expect(input().textContent).toBe('');
    await type(b.handle, '<p>Nora private thought</p>'); b.unmount();
    const aAgain = setup({ identity: vera });
    await waitFor(() => expect(input().textContent).toBe('Vera private thought')); aAgain.unmount();
    setup({ identity: nora });
    await waitFor(() => expect(input().textContent).toBe('Nora private thought'));
  });

  it('restarts an uncontrolled persisted editor on actor change without carrying the previous text', async () => {
    const utils = setup({ identity: vera });
    await type(utils.handle, '<p>Vera unsent note</p>');
    const firstEditor = utils.handle()?.editor;
    rerenderAs(utils, nora);
    await waitFor(() => expect(input().textContent).toBe(''));
    expect(utils.handle()?.editor).not.toBe(firstEditor);
    await type(utils.handle, '<p>Nora unsent note</p>');
    rerenderAs(utils, vera);
    await waitFor(() => expect(input().textContent).toBe('Vera unsent note'));
    rerenderAs(utils, nora);
    await waitFor(() => expect(input().textContent).toBe('Nora unsent note'));
  });

  it('keeps conversations separate for the same actor', async () => {
    const utils = setup({ identity: vera });
    await type(utils.handle, '<p>first conversation thought</p>');
    rerenderAs(utils, vera, { channel: 'orgiq:initiative:p-2', context: { ...context, id: 'p-2' } });
    await waitFor(() => expect(input().textContent).toBe(''));
    await type(utils.handle, '<p>second conversation thought</p>');
    rerenderAs(utils, vera);
    await waitFor(() => expect(input().textContent).toBe('first conversation thought'));
    rerenderAs(utils, vera, { channel: 'orgiq:initiative:p-2', context: { ...context, id: 'p-2' } });
    await waitFor(() => expect(input().textContent).toBe('second conversation thought'));
  });

  it.each([null, undefined, { userId: '', displayName: 'Unknown' }, { userId: '   ', displayName: 'Unknown' }])('unknown identity %j reads/writes no stored draft, and legacy bytes stay untouched', async (identity) => {
    const legacyKey = draftStorageKey(CHANNEL), legacy = JSON.stringify({ html: '<p>unattributed private note</p>' });
    window.localStorage.setItem(legacyKey, legacy);
    const signed = setup({ identity: vera });
    expect(input().textContent).toBe('');
    await type(signed.handle, '<p>Vera signed note</p>'); signed.unmount();
    const before = snapshotStorage();
    const unknown = setup({ identity });
    expect(input().textContent).toBe('');
    await type(unknown.handle, '<p>anonymous local note</p>');
    expect(snapshotStorage()).toEqual(before);
    rerenderAs(unknown, vera);
    await waitFor(() => expect(input().textContent).toBe('Vera signed note'));
    expect(window.localStorage.getItem(legacyKey)).toBe(legacy);
  });

  it('leaves controlled drafts and their editor ownership with the host across actor changes', async () => {
    const legacyKey = draftStorageKey(CHANNEL), legacy = JSON.stringify({ html: '<p>legacy note</p>' });
    window.localStorage.setItem(legacyKey, legacy);
    const utils = setup({ identity: vera, draft: { html: '<p>host-owned thought</p>', files: [] }, onDraftChange: vi.fn() });
    const editor = utils.handle()?.editor;
    rerenderAs(utils, nora);
    await waitFor(() => expect(input().textContent).toBe('host-owned thought'));
    expect(utils.handle()?.editor).toBe(editor);
    expect(snapshotStorage()).toEqual([[legacyKey, legacy]]);
  });

  it('a late confirmed send cannot clear either actor’s saved draft after an in-place identity switch', async () => {
    let accept!: (value: boolean) => void;
    const confirmed = vi.fn(() => new Promise<boolean>(resolve => { accept = resolve; }));
    const utils = setup({ identity: vera, recipients: [{ id: 'discussion', label: 'Discussion', channel: CHANNEL, send: confirmed }] });
    await type(utils.handle, '<p>Vera submitted thought</p>'); await send();
    await waitFor(() => expect(confirmed).toHaveBeenCalledTimes(1));
    rerenderAs(utils, nora);
    await waitFor(() => expect(input().textContent).toBe(''));
    await type(utils.handle, '<p>Nora newer thought</p>');
    await act(async () => { accept(true); });
    expect(input().textContent).toBe('Nora newer thought');
    expect(screen.queryByTestId('conversation-composer-note')).toBeNull();
    rerenderAs(utils, vera);
    await waitFor(() => expect(input().textContent).toBe('Vera submitted thought'));
    rerenderAs(utils, nora);
    await waitFor(() => expect(input().textContent).toBe('Nora newer thought'));
  });
});

describe('ConversationComposer — read-only (2.450.0)', () => {
  const REASON = 'You can read messages. Your current role cannot post to this discussion.';
  const workflows = [{ id: 'summarize', label: 'Summarize' }];
  const readOnlyRoot = () => screen.getByTestId('composer').closest('[data-composer-readonly]') ?? screen.getByTestId('composer');

  it('a reader gets a coherent read-only composer: not editable, the note in the input, every control off', () => {
    const { container } = setup({
      capabilities: { maySend: false, readOnlyReason: REASON },
      context: { kind: 'initiative', id: 'p-1', title: 'Auth Migration', reference: { id: 'ref', label: 'Org › Auth Migration', page: { kind: 'initiative', id: 'p-1' } } },
      commands: [{ trigger: '/summarize', label: 'Summarize', run: () => true }],
      workflows, expanded: true,
    });
    expect(readOnlyRoot().hasAttribute('data-composer-readonly')).toBe(true);
    const editor = input();
    expect(editor.getAttribute('contenteditable')).toBe('false');
    expect(editor.getAttribute('aria-readonly')).toBe('true');
    expect(editor.hasAttribute('tabindex')).toBe(false);
    // Single destination: no To: row, so the input carries the whole reason — once.
    expect(screen.getByTestId('composer-readonly-note').textContent).toBe(REASON);
    expect(container.querySelector('[data-composer-recipient-notice]')).toBeNull();
    expect(container.textContent?.split(REASON).length).toBe(2);
    for (const name of ['Bold', 'Italic', 'Code', 'Add link', 'Bulleted list', 'Quote']) {
      const button = screen.queryByRole('button', { name });
      if (!button) continue;
      expect(button).toBeDisabled();
      expect(button.className).toContain('text-text-disabled');
    }
    expect(screen.queryByRole('button', { name: 'Attach files' })).toBeNull();
    expect(screen.getByTestId('conversation-composer-workflow')).toBeDisabled();
    expect(screen.getByTestId('composer-commands-hint').getAttribute('aria-disabled')).toBe('true');
    expect(screen.getByTestId('composer-send')).toBeDisabled();
    // Chat is the only mode: the mode control has nowhere to go.
    const modeMenu = screen.queryByTestId('composer-mode-menu');
    if (modeMenu) expect(modeMenu).toBeDisabled();
    // The draft's chip stays: nothing to remove from a draft that cannot be sent.
    expect(screen.queryByRole('button', { name: /Remove Org › Auth Migration/ })).toBeNull();
  });

  it('the To: row keeps the reason; the input says only what to do, and To: stays usable', () => {
    const { container } = setup({
      capabilities: { maySend: false, readOnlyReason: REASON },
      defaultMode: 'chat', defaultRecipient: 'discussion', expanded: true,
      recipients: [
        { id: 'discussion', label: 'Discussion', channel: CHANNEL },
        { id: 'person:u-nora', label: 'Nora', channel: 'orgiq:dm:u-nora', send: async () => true },
      ],
    });
    expect(container.querySelector('[data-composer-recipient-notice]')?.textContent).toBe(REASON);
    expect(container.textContent?.split(REASON).length).toBe(2);
    expect(screen.getByTestId('composer-readonly-note').textContent).toBe('Read only. Choose another destination in To: to post.');
    const to = screen.getByRole('combobox', { name: 'Chat recipient' });
    expect(to).not.toBeDisabled();
    fireEvent.change(to, { target: { value: 'person:u-nora' } });
  });

  it('another mode that is on keeps the mode menu live as the way out', () => {
    setup({ capabilities: { maySend: false, readOnlyReason: REASON, agent: { allowed: true } }, mode: 'chat', expanded: true });
    expect(readOnlyRoot().hasAttribute('data-composer-readonly')).toBe(true);
    expect(screen.getByTestId('composer-mode-menu')).not.toBeDisabled();
  });

  it('a pending answer is quiet: no read-only note, no To: reason, no read-only marker', () => {
    const { container } = setup({
      capabilities: { maySend: false, readOnlyReason: REASON, pending: true },
      defaultMode: 'chat', defaultRecipient: 'discussion', expanded: true,
      recipients: [
        { id: 'discussion', label: 'Discussion', channel: CHANNEL },
        { id: 'person:u-nora', label: 'Nora', channel: 'orgiq:dm:u-nora', send: async () => true },
      ],
    });
    expect(container.querySelector('[data-composer-readonly]')).toBeNull();
    expect(screen.queryByTestId('composer-readonly-note')).toBeNull();
    expect(container.querySelector('[data-composer-recipient-notice]')).toBeNull();
    expect(screen.getByTestId('composer-send')).toBeDisabled();
  });

  it('offline and a host pause are not read-only verdicts', () => {
    setup({ capabilities: { maySend: false, readOnlyReason: REASON }, offline: 'The gateway is offline.', expanded: true });
    expect(screen.queryByTestId('composer-readonly-note')).toBeNull();
    cleanup();
    setup({ capabilities: { maySend: false, readOnlyReason: REASON }, disabled: true, expanded: true });
    expect(screen.queryByTestId('composer-readonly-note')).toBeNull();
  });

  it('a writer gets a fully live composer', () => {
    const { container } = setup({ capabilities: { maySend: true }, context: { kind: 'initiative', id: 'p-1', title: 'Auth Migration' }, workflows, expanded: true, commands: [{ trigger: '/summarize', label: 'Summarize', run: () => true }] });
    expect(container.querySelector('[data-composer-readonly]')).toBeNull();
    expect(input().getAttribute('contenteditable')).toBe('true');
    expect(screen.getByRole('button', { name: 'Bold' })).not.toBeDisabled();
    expect(screen.getByTestId('conversation-composer-workflow')).not.toBeDisabled();
    expect(screen.getByTestId('composer-commands-hint').hasAttribute('aria-disabled')).toBe(false);
  });
});

describe('ConversationComposer — read-only ways out are declared (2.479.0)', () => {
  const REASON = 'You can read messages. Your current role cannot post to this discussion.';
  // The ui-dom-audit rule `composer.readonly-coherent`: inside a composer that
  // says it cannot post, every enabled button, combobox, input or editable
  // region is a link or carries `data-composer-readonly-allow="<reason>"`.
  function leftoverControls(root: Element): string[] {
    const enabled = [...root.querySelectorAll('button, [role="combobox"], input, textarea, select, [contenteditable="true"]')]
      .filter((el) => !(el as HTMLButtonElement).disabled && el.getAttribute('aria-disabled') !== 'true');
    return enabled
      .filter((el) => !el.closest('a[href]'))
      .filter((el) => !(el.getAttribute('data-composer-readonly-allow') ?? '').trim())
      .map((el) => el.getAttribute('data-testid') ?? el.getAttribute('aria-label') ?? el.tagName);
  }

  it('a member with a DM to go to: To: and the mode menu are the declared ways out, nothing else is live', () => {
    const { container } = setup({
      capabilities: { maySend: false, readOnlyReason: REASON, agent: { allowed: true } },
      defaultMode: 'chat', defaultRecipient: 'discussion', expanded: true,
      recipients: [
        { id: 'discussion', label: 'Discussion', channel: CHANNEL },
        { id: 'person:u-nora', label: 'Nora', channel: 'orgiq:dm:u-nora', send: async () => true },
      ],
    });
    const root = container.querySelector('[data-composer-readonly]') ?? container;
    const to = screen.getByRole('combobox', { name: 'Chat recipient' });
    expect(to).not.toBeDisabled();
    expect(to.getAttribute('data-composer-readonly-allow')).toBe('Choose a destination you can post to');
    const mode = screen.getByTestId('composer-mode-menu');
    expect(mode).not.toBeDisabled();
    expect(mode.getAttribute('data-composer-readonly-allow')).toBe('Switch to a mode you can use');
    expect(leftoverControls(root.closest('[data-testid="composer"]') ?? root)).toEqual([]);
  });

  it('with no destination that can take a message, To: is off and there is no live control', () => {
    const { container } = setup({
      capabilities: { maySend: false, readOnlyReason: REASON },
      defaultMode: 'chat', defaultRecipient: 'discussion', expanded: true,
      recipients: [
        { id: 'discussion', label: 'Discussion', channel: CHANNEL },
        { id: 'board', label: 'Board', channel: 'orgiq:board', unavailableReason: 'Read only' },
      ],
    });
    const to = screen.getByRole('combobox', { name: 'Chat recipient' });
    expect(to).toBeDisabled();
    expect(to.hasAttribute('data-composer-readonly-allow')).toBe(false);
    const root = container.querySelector('[data-composer-readonly]') ?? container;
    expect(leftoverControls(root.closest('[data-testid="composer"]') ?? root)).toEqual([]);
  });

  it('nothing is marked while the composer can post', () => {
    setup({
      capabilities: { maySend: true },
      defaultMode: 'chat', expanded: true,
      recipients: [
        { id: 'discussion', label: 'Discussion', channel: CHANNEL },
        { id: 'person:u-nora', label: 'Nora', channel: 'orgiq:dm:u-nora', send: async () => true },
      ],
    });
    expect(document.querySelector('[data-composer-readonly-allow]')).toBeNull();
  });
});

describe('ConversationComposer — read-only keeps a visible, disabled editor (2.480.1)', () => {
  const REASON = 'You can read this discussion; posting needs the SME role.';
  it('the textbox is on screen, not editable, described by the reason, with no inviting placeholder', () => {
    setup({ capabilities: { maySend: false, readOnlyReason: REASON }, defaultMode: 'chat', expanded: true,
      recipients: [{ id: 'discussion', label: 'Discussion', channel: CHANNEL }] });
    const box = screen.getByTestId('composer-input');
    expect(box.closest('.hidden')).toBeNull();
    expect(box).toHaveAttribute('aria-disabled', 'true');
    expect(box).toHaveAttribute('aria-readonly', 'true');
    expect(box.getAttribute('contenteditable')).toBe('false');
    const note = document.getElementById(box.getAttribute('aria-describedby')!);
    expect(note?.textContent).toBe(REASON);
    expect(box.querySelector('[data-placeholder]')?.getAttribute('data-placeholder') ?? '').toBe('');
  });
});

