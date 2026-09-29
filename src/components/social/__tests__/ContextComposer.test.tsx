import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { ContextComposer, type ContextComposerProps } from '../ContextComposer';
import { ContextComposer as LazyContextComposer } from '../ContextComposerLazy';
import type { ComposedMessage, RichChatComposerHandle } from '../RichChatComposer';

afterEach(cleanup);

beforeAll(() => {
  const rects = () => ({ length: 0, item: () => null, [Symbol.iterator]: [][Symbol.iterator] }) as unknown as DOMRectList;
  const rect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  for (const proto of [Range.prototype, Element.prototype]) {
    if (!proto.getClientRects) Object.assign(proto, { getClientRects: rects });
    if (!proto.getBoundingClientRect) Object.assign(proto, { getBoundingClientRect: rect });
  }
});

const DM = { kind: 'conversation', id: 'dm-hank', title: 'Hank', dm: true } as const;
const DOC = { kind: 'document', id: 'doc-1', title: 'Roadmap' } as const;
const workflows = [{ id: 'deck', label: 'Presentation deck', description: 'Draft a deck' }];

function setup(overrides: Partial<ContextComposerProps> = {}) {
  let handle: RichChatComposerHandle | null = null;
  const props: ContextComposerProps = {
    context: DOC,
    onSend: vi.fn(() => true),
    composerTestId: 'composer',
    composerRef: (h) => { handle = h; },
    ...overrides,
  };
  const utils = render(<ContextComposer {...props} />);
  return { ...utils, props, handle: () => handle };
}

const root = () => screen.getByTestId('composer');
const input = () => root().querySelector('.ProseMirror') as HTMLElement;
const focus = async () => { await act(async () => { input().focus(); fireEvent.focusIn(input()); }); };
const blur = async () => {
  await act(async () => { fireEvent.focusOut(input(), { relatedTarget: document.body }); (document.activeElement as HTMLElement | null)?.blur(); await new Promise((r) => setTimeout(r, 0)); });
};
async function openModeMenu() {
  await act(async () => { fireEvent.click(screen.getByTestId('composer-mode-menu')); });
  return screen.getByTestId('composer-mode-menu-list');
}

describe('ContextComposer — collapse / expand', () => {
  it('arrives as one row: pill, chip, Send; focus expands to the Agent ⌄ card; empty + blurred folds back', async () => {
    setup();
    expect(root()).toHaveAttribute('data-collapsed', 'true');
    expect(screen.getByTestId('composer-mode-pill')).toHaveTextContent('Agent');
    expect(screen.getByTestId('composer-references')).toHaveTextContent('Roadmap');
    expect(screen.queryByTestId('composer-format-toolbar')).toBeNull();
    await focus();
    expect(root()).toHaveAttribute('data-collapsed', 'false');
    expect(screen.getByTestId('composer-mode-menu')).toHaveTextContent('Agent');
    expect(screen.getByTestId('composer-format-toolbar')).toBeInTheDocument();
    await blur();
    expect(root()).toHaveAttribute('data-collapsed', 'true');
  });

  it('a reply, a notice above or a strip forces the card; removing it returns to the idle row', () => {
    const { rerender, props } = setup({ context: DM });
    expect(root()).toHaveAttribute('data-collapsed', 'true');
    rerender(<ContextComposer {...props} reply={{ author: 'Hank', quote: 'Can you look at the deck?', messageId: 'm1', onDismiss: () => {} }} />);
    expect(root()).toHaveAttribute('data-collapsed', 'false');
    expect(screen.getByTestId('context-composer-reply')).toHaveTextContent('Can you look at the deck?');
    rerender(<ContextComposer {...props} />);
    expect(root()).toHaveAttribute('data-collapsed', 'true');
    rerender(<ContextComposer {...props} above={<div data-testid="err">Failed</div>} />);
    expect(root()).toHaveAttribute('data-collapsed', 'false');
    rerender(<ContextComposer {...props} task={{ label: 'Drafting', status: 'running' }} />);
    expect(root()).toHaveAttribute('data-collapsed', 'false');
    expect(screen.getByTestId('context-composer-task')).toBeInTheDocument();
    rerender(<ContextComposer {...props} expanded />);
    expect(root()).toHaveAttribute('data-collapsed', 'false');
  });

  it('a dock does not force the card, and sits above the composer', () => {
    setup({ dock: <div data-testid="shelf">Call</div> });
    expect(root()).toHaveAttribute('data-collapsed', 'true');
    const slot = screen.getByTestId('context-composer-dock-slot');
    expect(slot).toHaveClass('shrink-0');
    expect(slot.compareDocumentPosition(root()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('no dock, no slot', () => {
    setup();
    expect(screen.queryByTestId('context-composer-dock-slot')).toBeNull();
  });
});

describe('ContextComposer — console surface', () => {
  it('Agent paints the console once expanded; the idle row stays plain; Chat is plain', async () => {
    const { rerender, props } = setup({ mode: 'agent', onModeChange: () => {} });
    expect(root()).not.toHaveAttribute('data-console');
    rerender(<ContextComposer {...props} expanded />);
    expect(root()).toHaveAttribute('data-console', 'true');
    rerender(<ContextComposer {...props} mode="chat" expanded />);
    expect(root()).not.toHaveAttribute('data-console');
  });

  it('console={false} keeps the ordinary surface in Agent', () => {
    setup({ mode: 'agent', onModeChange: () => {}, expanded: true, console: false });
    expect(root()).not.toHaveAttribute('data-console');
  });
});

describe('ContextComposer — gating (context allows AND callback passed)', () => {
  it('a DM never shows make-deck, page actions, Workflow ⌄ or a context chip, even with the callbacks', async () => {
    const onMakeDeck = vi.fn();
    setup({
      context: DM,
      onMakeDeck,
      moreActions: [{ items: [{ label: 'Page thing', onSelect: () => {}, 'data-testid': 'page-thing' }] }],
      workflows,
      onWorkflow: vi.fn(),
      modelUnavailable: 'Model down',
      expanded: true,
    });
    expect(screen.queryByTestId('context-composer-workflow')).toBeNull();
    expect(screen.queryByTestId('composer-references')).toBeNull();
    expect(screen.queryByTestId('context-composer-model-unavailable')).toBeNull();
    const list = await openModeMenu();
    expect(within(list).queryByText('Make a deck from this page')).toBeNull();
    expect(within(list).queryByText('Page thing')).toBeNull();
    expect(screen.queryByTestId('context-composer-make-deck')).toBeNull();
  });

  it('a DM: Chat and Agent only, Share a document and send options when wired, offline notice', async () => {
    const onShareDocument = vi.fn();
    setup({
      context: DM,
      onShareDocument,
      sendOptions: [{ id: 'later', label: 'Send later' }],
      onSendOption: () => {},
      offline: 'Reconnecting…',
    });
    expect(screen.getByTestId('context-composer-offline')).toHaveTextContent('Reconnecting…');
    fireEvent.click(screen.getByTestId('context-composer-share-document'));
    expect(onShareDocument).toHaveBeenCalledOnce();
    const list = await openModeMenu();
    const rows = within(within(list).getAllByRole('group')[0]!).getAllByRole('menuitem').map((b) => b.textContent ?? '');
    expect(rows).toHaveLength(2);
    expect(rows.some((r) => r.includes('Terminal'))).toBe(false);
  });

  it('a document: make-deck when passed, no send options or Share a document even when passed', async () => {
    const onMakeDeck = vi.fn();
    setup({
      onMakeDeck,
      onShareDocument: vi.fn(),
      sendOptions: [{ id: 'later', label: 'Send later' }],
      onSendOption: () => {},
      offline: 'Reconnecting…',
      expanded: true,
    });
    expect(screen.queryByTestId('context-composer-share-document')).toBeNull();
    expect(screen.queryByTestId('context-composer-offline')).toBeNull();
    expect(screen.queryByText('Send later')).toBeNull();
    const list = await openModeMenu();
    await act(async () => { fireEvent.click(within(list).getByText('Make a deck from this page')); });
    expect(onMakeDeck).toHaveBeenCalledOnce();
  });

  it('a document without onMakeDeck has no deck action', async () => {
    setup({ expanded: true });
    const list = await openModeMenu();
    expect(within(list).queryByText('Make a deck from this page')).toBeNull();
  });

  it('a diagram shows Agent off with the reason, and starts in Chat', async () => {
    setup({ context: { kind: 'diagram', id: 'd1', title: 'Flow' }, expanded: true });
    expect(screen.getByTestId('composer-mode-menu')).toHaveTextContent('Chat');
    const list = await openModeMenu();
    expect(within(list).getByText(/cannot edit diagrams yet/)).toBeInTheDocument();
  });

  it('a document: Terminal is off with a reason until onShellCommand is passed', async () => {
    const { unmount } = setup({ expanded: true });
    let list = await openModeMenu();
    expect(within(list).getByText(/Attach an agent loop/)).toBeInTheDocument();
    unmount();
    setup({ expanded: true, onShellCommand: () => {} });
    list = await openModeMenu();
    expect(within(list).queryByText(/Attach an agent loop/)).toBeNull();
  });

  it('chatAvailable={false}: Chat off with a reason', async () => {
    setup({ expanded: true, chatAvailable: false });
    const list = await openModeMenu();
    expect(within(list).getByText(/no discussion thread/)).toBeInTheDocument();
  });

  it('the context chip is removable when onRemoveContext is passed, and comes back for a new context', () => {
    const onRemoveContext = vi.fn();
    const { rerender, props } = setup({ onRemoveContext });
    fireEvent.click(screen.getByRole('button', { name: 'Remove Roadmap from this draft' }));
    expect(onRemoveContext).toHaveBeenCalledOnce();
    expect(screen.queryByTestId('composer-references')).toBeNull();
    rerender(<ContextComposer {...props} context={{ kind: 'document', id: 'doc-2', title: 'Budget' }} />);
    expect(screen.getByTestId('composer-references')).toHaveTextContent('Budget');
  });
});

describe('ContextComposer — modes override', () => {
  it('modes replaces the context’s set', async () => {
    setup({ context: DM, modes: ['agent'], expanded: true });
    // One mode left: named, not switched (see "single mode" below).
    expect(screen.getByTestId('composer-mode-pill')).toHaveTextContent('Agent');
    expect(screen.queryByTestId('composer-mode-menu')).toBeNull();
    expect(screen.queryByText('Chat')).toBeNull();
  });

  it('modes on a document drops the default-off Terminal when not named', async () => {
    setup({ modes: ['chat', 'agent'], expanded: true });
    const list = await openModeMenu();
    expect(within(list).queryByText(/Attach an agent loop/)).toBeNull();
  });
});

describe('ContextComposer — workflows', () => {
  it('a document pick writes /workflow <name> with the pick as argument, and Send reads Prepare run', async () => {
    const onDraftChange = vi.fn();
    setup({ workflows, onDraftChange, expanded: true });
    await act(async () => { fireEvent.click(screen.getByTestId('context-composer-workflow')); });
    await act(async () => { fireEvent.click(screen.getByText('Presentation deck')); });
    expect(onDraftChange).toHaveBeenCalledWith(
      expect.objectContaining({ command: expect.objectContaining({ trigger: '/workflow', argument: expect.objectContaining({ id: 'deck' }) }) }),
      expect.anything(),
    );
    await waitFor(() => expect(screen.getByTestId('composer-send')).toHaveTextContent('Prepare run'));
  });

  it('offers /workflow as a slash command when workflows are given', async () => {
    const { handle } = setup({ workflows, expanded: true });
    await focus();
    act(() => { handle()?.editor?.commands.setContent('<p>/workf</p>'); });
    await waitFor(() => expect(screen.getAllByText('/workflow').length).toBeGreaterThan(0));
  });
});

describe('ContextComposer — send', () => {
  it('passes the context, the mode and the author (displayName first)', async () => {
    const { props, handle } = setup({ identity: { displayName: 'Connor H', given_name: 'Connor', family_name: 'Hoehn' } });
    await focus();
    act(() => { handle()?.editor?.commands.setContent('<p>Tighten the intro</p>'); });
    await act(async () => { fireEvent.click(screen.getByTestId('composer-send')); });
    const [message, context] = (props.onSend as ReturnType<typeof vi.fn>).mock.calls[0]! as [ComposedMessage, { mode: string; context: unknown; author?: string }];
    expect(message.text).toBe('Tighten the intro');
    expect(context).toEqual({ mode: 'agent', context: DOC, author: 'Connor H' });
  });

  it('author falls back to given_name + family_name', async () => {
    const { props, handle } = setup({ identity: { given_name: 'Hank', family_name: 'Anderson' } });
    await focus();
    act(() => { handle()?.editor?.commands.setContent('<p>hi</p>'); });
    await act(async () => { fireEvent.click(screen.getByTestId('composer-send')); });
    expect((props.onSend as ReturnType<typeof vi.fn>).mock.calls[0]![1]).toMatchObject({ author: 'Hank Anderson' });
  });
});

describe('ContextComposer — replacement', () => {
  it('renders instead of the composer and keeps above and strip', () => {
    setup({
      replacement: <div data-testid="reply-field">Reply field</div>,
      above: <div data-testid="handoff">Hand-off</div>,
      task: { label: 'Editing', status: 'running' },
    });
    expect(screen.getByTestId('reply-field')).toBeInTheDocument();
    expect(screen.queryByTestId('composer')).toBeNull();
    expect(screen.getByTestId('handoff')).toBeInTheDocument();
    expect(screen.getByTestId('context-composer-task')).toBeInTheDocument();
  });
});

it('the root (lazy) export renders the same composite', async () => {
  render(<LazyContextComposer context={DM} onSend={() => true} />);
  expect(await screen.findByRole('region', { name: 'Message composer' })).toBeInTheDocument();
});

describe('ContextComposer — single mode', () => {
  it('a call chat (conversation, modes=[chat]) reads "Chat" as a static label, idle and expanded', async () => {
    const onModeChange = vi.fn();
    setup({ context: DM, modes: ['chat'], onModeChange });
    const idle = screen.getByTestId('composer-mode-pill');
    expect(idle.tagName).toBe('SPAN');
    expect(idle).toHaveAttribute('data-single-mode', 'true');
    expect(idle).toHaveTextContent('Chat');
    await focus();
    const pill = screen.getByTestId('composer-mode-pill');
    expect(pill).toHaveAttribute('data-single-mode', 'true');
    expect(pill).toHaveTextContent('Chat');
    expect(pill.closest('button')).toBeNull();
    expect(screen.queryByTestId('composer-mode-menu')).toBeNull();
    expect(screen.queryByTestId('composer-mode-kbd')).toBeNull();
    expect(pill.querySelector('svg[data-icon="chevron"], [class*="chevron"]')).toBeNull();
    fireEvent.keyDown(input(), { key: '2', altKey: true });
    expect(onModeChange).not.toHaveBeenCalled();
  });

  it('a document chat (modes=[chat]) is a static label; its page actions move to ⋯', async () => {
    const onMakeDeck = vi.fn();
    setup({ modes: ['chat'], expanded: true, onMakeDeck });
    expect(screen.getByTestId('composer-mode-pill')).toHaveTextContent('Chat');
    expect(screen.queryByTestId('composer-mode-menu')).toBeNull();
    await act(async () => { fireEvent.click(screen.getByTestId('composer-more-actions-trigger')); });
    await act(async () => { fireEvent.click(screen.getByText('Make a deck from this page')); });
    expect(onMakeDeck).toHaveBeenCalledOnce();
  });

  it('search (Agent only by its preset) is a static label too', () => {
    setup({ context: { kind: 'search', id: 'search', title: '' }, expanded: true });
    expect(screen.getByTestId('composer-mode-pill')).toHaveAttribute('data-single-mode', 'true');
    expect(screen.getByTestId('composer-mode-pill')).toHaveTextContent('Agent');
  });

  it('two or more modes keep the menu and no data-single-mode', async () => {
    setup({ context: DM, modes: ['chat', 'agent'] });
    expect(screen.getByTestId('composer-mode-pill')).not.toHaveAttribute('data-single-mode');
    await focus();
    expect(screen.getByTestId('composer-mode-menu')).toHaveTextContent('Chat');
  });
});

describe('ContextComposer — privacy', () => {
  it('no onPrivacyChange: no toggle', () => {
    setup({ context: DM, expanded: true });
    expect(screen.queryByTestId('composer-privacy-toggle')).toBeNull();
  });

  it('passes privacy / onPrivacyChange / privacyLabels through; the sent message carries privacy', async () => {
    const onPrivacyChange = vi.fn();
    const onSend = vi.fn(() => true);
    const { handle } = setup({
      context: DM, modes: ['chat'], expanded: true, onSend,
      privacy: 'hidden', onPrivacyChange, privacyLabels: { visible: 'Everyone', hidden: 'Just me' },
    });
    const toggle = screen.getByTestId('composer-privacy-toggle');
    expect(toggle).toHaveAttribute('title', 'Just me');
    fireEvent.click(toggle);
    expect(onPrivacyChange).toHaveBeenCalledWith('visible');
    await act(async () => { handle()!.insertText('only for me'); });
    fireEvent.keyDown(input(), { key: 'Enter' });
    await waitFor(() => expect(onSend).toHaveBeenCalled());
    expect((onSend.mock.calls[0] as unknown as [ComposedMessage])[0].privacy).toBe('hidden');
  });
});

describe('ContextComposer — # documents on every context', () => {
  const contexts = [
    DM,
    { kind: 'conversation', id: 'transcript', title: 'Ask the transcript' },
    DOC,
    { kind: 'work-item', id: 'w', title: 'W' },
    { kind: 'diagram', id: 'dg', title: 'D' },
    { kind: 'initiative', id: 'p', title: 'P' },
    { kind: 'search', id: 's', title: '' },
  ] as const;
  it.each(contexts)('$kind ($id): onSearchDocuments opens the # menu', async (context) => {
    const search = vi.fn((q: string) => [{ id: 'd1', label: 'Roadmap' }].filter((d) => d.label.toLowerCase().startsWith(q.toLowerCase())));
    const { handle } = setup({ context, expanded: true, onSearchDocuments: search, ...(context.id === 'transcript' ? { modes: ['chat'] as const } : {}) });
    await act(async () => { handle()!.insertText('see #Ro'); });
    await waitFor(() => expect(search).toHaveBeenCalledWith('Ro'));
    await waitFor(() => expect(screen.getAllByTestId('document-option')).toHaveLength(1));
  });
});

describe('Send is one compact size on every context (2.407.9)', () => {
  // The sizing tokens of a Send: what sets its height, padding and type.
  const sizing = (el: Element) => el.className.split(/\s+/).filter((c) => /^(inline-flex|items-center|gap-|h-|px-|py-|text-(xs|sm|\[))/.test(c)).sort();
  const renderBoth = (expanded: boolean) => {
    render(
      <>
        <ContextComposer context={DM} expanded={expanded} sendOptions={[{ id: 'later', label: 'Send later' }]} onSendOption={vi.fn()} onSend={vi.fn(() => true)} composerTestId="conv" />
        <ContextComposer context={DOC} expanded={expanded} onSend={vi.fn(() => true)} composerTestId="doc" />
      </>,
    );
    return { conv: screen.getByTestId('conv'), doc: screen.getByTestId('doc') };
  };

  it('idle: a conversation (split Send) and a document (plain Send) give the same collapsed row and the same Send', () => {
    const { conv, doc } = renderBoth(false);
    // The conversation really does have the split (its caret), the document does not.
    expect(screen.getByTestId('conv-send-options')).toBeInTheDocument();
    expect(screen.queryByTestId('doc-send-options')).toBeNull();
    // One row, built the same way: the box that holds both the input and
    // Send is the same element with the same classes on both contexts.
    const rowOf = (root: HTMLElement) => {
      let el: HTMLElement | null = within(root).getByTestId(`${root.dataset.testid}-send`);
      const input = root.querySelector('.ProseMirror');
      while (el && !el.contains(input)) el = el.parentElement;
      return el!;
    };
    for (const root of [conv, doc]) {
      expect(root).toHaveAttribute('data-collapsed', 'true');
      expect(rowOf(root)).not.toBe(root.parentElement);
    }
    expect(rowOf(conv).tagName).toBe(rowOf(doc).tagName);
    expect(rowOf(conv).className).toBe(rowOf(doc).className);
    expect(conv.getAttribute('data-composer-size')).toBe(doc.getAttribute('data-composer-size'));
    const convSend = screen.getByTestId('conv-send');
    const docSend = screen.getByTestId('doc-send');
    expect(sizing(convSend)).toEqual(sizing(docSend));
    // The compact social size (the idle row stays 42px), not the editor's h-9.
    expect(sizing(convSend)).toEqual(['gap-1', 'inline-flex', 'items-center', 'px-2.5', 'py-1', 'text-xs']);
    // Same content: label and arrow.
    expect(convSend.textContent).toBe(docSend.textContent);
    expect(convSend.querySelectorAll('svg')).toHaveLength(docSend.querySelectorAll('svg').length);
    // The caret half is as tall as Send.
    expect(screen.getByTestId('conv-send-options').className).toContain('py-1');
    expect(screen.getByTestId('conv-send-options').className).not.toContain('h-9');
  });

  it('expanded: both cards carry the same Send', () => {
    renderBoth(true);
    expect(screen.getByTestId('conv')).toHaveAttribute('data-collapsed', 'false');
    expect(screen.getByTestId('doc')).toHaveAttribute('data-collapsed', 'false');
    expect(sizing(screen.getByTestId('conv-send'))).toEqual(sizing(screen.getByTestId('doc-send')));
    expect(sizing(screen.getByTestId('conv-send'))).toContain('text-xs');
    expect(sizing(screen.getByTestId('doc-send'))).not.toContain('h-9');
  });
});

describe('ContextComposer — host slots (2.407.11)', () => {
  it('submitLead, modeRowEnd and referencesAction show on the card, not on the idle row', async () => {
    setup({
      submitLead: <button type="button">Draft only</button>,
      modeRowEnd: <span>This slide</span>,
      referencesAction: <button type="button">Add document</button>,
    });
    expect(root()).toHaveAttribute('data-collapsed', 'true');
    expect(screen.queryByTestId('composer-submit-lead')).toBeNull();
    expect(screen.queryByTestId('composer-mode-row-end')).toBeNull();
    expect(screen.queryByTestId('composer-references-action')).toBeNull();
    await focus();
    expect(screen.getByTestId('composer-submit-lead')).toHaveTextContent('Draft only');
    expect(screen.getByTestId('composer-mode-row-end')).toHaveTextContent('This slide');
    expect(screen.getByTestId('composer-references-action')).toHaveTextContent('Add document');
  });

  it('referenceDrop makes the idle row a drop target for the host payload', () => {
    const onDrop = vi.fn();
    setup({ context: { kind: 'search', id: 'docs', title: '' }, referenceDrop: { types: ['application/x-doc'], onDrop, hint: 'Drop to use together' } });
    expect(root()).toHaveAttribute('data-collapsed', 'true');
    expect(root()).toHaveAttribute('data-reference-drop', 'ready');
    const dataTransfer = { types: ['application/x-doc'], getData: () => '', dropEffect: 'none' };
    fireEvent.drop(root(), { dataTransfer });
    expect(onDrop).toHaveBeenCalledTimes(1);
  });
});
