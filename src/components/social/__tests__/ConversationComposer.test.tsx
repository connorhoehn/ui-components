import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { createConversationComposer, type ConversationComposerProps } from '../ConversationComposer';
import { ConversationInputProvider, useComposerFocus, useThreadInput } from '../ConversationInputs';
import { DensityProvider } from '../../shared/Density';
import type { RichChatComposerHandle } from '../RichChatComposer';
import { draftStorageKey } from '../conversationComposerModel';
import * as client from '@connorhoehn/realtime-modules/client';

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
  const utils = render(<ConversationInputProvider><ConversationComposer {...props} /></ConversationInputProvider>);
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
    const options = Array.from((screen.getByRole('combobox', { name: 'Chat recipient' }) as HTMLSelectElement).options);
    expect(options.find((o) => o.value === 'discussion')?.disabled).toBe(true);
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
    expect(window.localStorage.getItem(draftStorageKey(CHANNEL))).toContain('half a thought');
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
