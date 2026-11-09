// 2.512.0 — the deck's prompt presentation: plain answer buttons and no
// key-hint row under a composer's `presentation="prompt"` (or the deck's own
// prop), facts one per line, and the composer's text box kept under an open
// card — it answers a text card and gives a confirm card a direction.
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { ComposerPromptDeck } from '../ComposerPromptDeck';
import { createConversationComposer } from '../ConversationComposer';
import { deckKeyAction, type ComposerPrompt } from '../composerPromptModel';
import type { RichChatComposerHandle } from '../RichChatComposer';

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

const LONG = 'A small, round shopkeeper with a patched green apron, a laugh that fills the shop and a habit of humming while she counts.';

const confirm = (over: Partial<ComposerPrompt> = {}): ComposerPrompt => ({
  id: 'generate', eyebrow: 'Add a character', title: 'Generate Mina', question: 'Generate with these answers?', kind: 'confirm',
  fields: [{ label: 'Name', value: 'Mina' }, { label: 'Role', value: 'Supporting' }, { label: 'Design', value: LONG }],
  options: [{ id: 'generate', label: 'Generate', emphasis: 'primary' }, { id: 'change', label: 'Change answers' }],
  onAnswer: () => undefined,
  ...over,
});

const text = (over: Partial<ComposerPrompt> = {}): ComposerPrompt => ({
  id: 'name', title: 'Name the character', question: 'What is their name?', kind: 'text', placeholder: 'A name',
  onAnswer: () => undefined,
  ...over,
});

describe('ComposerPromptDeck presentation', () => {
  it('card (default): numbered keycaps on the answers and the key-hint row', () => {
    render(<ComposerPromptDeck prompts={[confirm()]} />);
    expect(screen.getByTestId('composer-prompt-deck')).toHaveAttribute('data-presentation', 'card');
    expect(screen.getByTestId('composer-prompt-deck-option-generate').querySelector('kbd')).not.toBeNull();
    expect(screen.getByTestId('composer-prompt-deck-keys')).toHaveTextContent('1–2 choose');
  });

  it('prompt: plain Buttons, no keycaps and no hint row; the markers stay', () => {
    render(<ComposerPromptDeck prompts={[confirm()]} presentation="prompt" />);
    const deck = screen.getByTestId('composer-prompt-deck');
    expect(deck).toHaveAttribute('data-presentation', 'prompt');
    expect(deck).toHaveAttribute('data-composer-prompt-deck', 'expanded');
    expect(deck.querySelector('kbd')).toBeNull();
    expect(screen.queryByTestId('composer-prompt-deck-keys')).toBeNull();
    expect(screen.getByTestId('composer-prompt-deck-card')).toHaveAttribute('data-composer-prompt-kind', 'confirm');
    const option = screen.getByTestId('composer-prompt-deck-option-generate');
    expect(option).toHaveAttribute('data-composer-prompt-option', 'generate');
    expect(option).toHaveTextContent(/^Generate$/);
  });

  it('prompt: the keys still work', async () => {
    const onAnswer = vi.fn(() => undefined);
    render(<ComposerPromptDeck prompts={[confirm({ onAnswer })]} presentation="prompt" />);
    await act(async () => { fireEvent.keyDown(screen.getByTestId('composer-prompt-deck-option-change'), { key: '2' }); });
    expect(onAnswer).toHaveBeenCalledWith({ kind: 'confirm', optionId: 'change', confirmed: false });
  });

  it('prompt: facts one per line, a long value clamped with its full text in title', () => {
    render(<ComposerPromptDeck prompts={[confirm()]} presentation="prompt" />);
    const rows = screen.getByTestId('composer-prompt-deck-fields').querySelectorAll('[data-composer-prompt-field]');
    expect(rows).toHaveLength(3);
    const design = within(rows[2] as HTMLElement).getByText(LONG);
    expect(design.tagName).toBe('DD');
    expect(design).toHaveClass('truncate');
    expect(design).toHaveAttribute('title', LONG);
  });

  it('a composer presentation="prompt" header reaches the deck through context', async () => {
    const ConversationComposer = createConversationComposer({ useFileUpload: () => ({ upload: async () => ({ status: 'uploading', transferId: 't' }) }) });
    render(<ConversationComposer channel={null} context={{ kind: 'initiative', id: 's', title: 'Little Shop' }} presentation="prompt" defaultMode="agent" expanded console={false}
      capabilities={{ maySend: false, agent: { allowed: true } }} identity={{ userId: 'u-1', displayName: 'Local' }}
      onAgent={() => true} submitLabel="Plan" composerTestId="composer" prompts={[confirm()]} />);
    const deck = await screen.findByTestId('conversation-composer-prompts');
    expect(deck).toHaveAttribute('data-presentation', 'prompt');
    expect(deck.querySelector('kbd')).toBeNull();
    expect(screen.queryByTestId('conversation-composer-prompts-keys')).toBeNull();
  });
});

describe('ConversationComposer presentation="prompt" with an open card', () => {
  const ConversationComposer = createConversationComposer({ useFileUpload: () => ({ upload: async () => ({ status: 'uploading', transferId: 't' }) }) });
  function mount(prompts: ComposerPrompt[], onAgent = vi.fn(() => true)) {
    let handle: RichChatComposerHandle | null = null;
    const utils = render(
      <ConversationComposer channel={null} context={{ kind: 'initiative', id: 's', title: 'Little Shop' }} presentation="prompt" defaultMode="agent" expanded console={false}
        capabilities={{ maySend: false, agent: { allowed: true } }} identity={{ userId: 'u-1', displayName: 'Local' }}
        onAgent={onAgent} submitLabel="Plan" composerTestId="composer" composerRef={(h) => { handle = h; }} prompts={prompts} />,
    );
    return { ...utils, onAgent, handle: () => handle };
  }

  it('keeps the text box mounted under the card', async () => {
    mount([confirm()]);
    await screen.findByTestId('conversation-composer-prompts-card');
    expect(screen.getByTestId('composer-input')).toBeInTheDocument();
    expect(screen.getByTestId('composer-send')).toBeInTheDocument();
  });

  it('typing under a confirm card calls onDirection, never onAgent or onAnswer', async () => {
    const onDirection = vi.fn((_text: string) => undefined);
    const onAnswer = vi.fn(() => undefined);
    const { handle, onAgent } = mount([confirm({ onDirection, onAnswer })]);
    await screen.findByTestId('conversation-composer-prompts-card');
    act(() => { handle()!.insertText('make her taller'); });
    await act(async () => { fireEvent.click(screen.getByTestId('composer-send')); });
    await waitFor(() => expect(onDirection).toHaveBeenCalledWith('make her taller'));
    expect(onAgent).not.toHaveBeenCalled();
    expect(onAnswer).not.toHaveBeenCalled();
    // The card stays until the host re-proposes; the box is cleared.
    expect(screen.getByTestId('conversation-composer-prompts-card')).toHaveAttribute('data-composer-prompt', 'generate');
    await waitFor(() => expect(handle()!.editor!.getText()).toBe(''));
  });

  it('without onDirection the placeholder says what the card takes and typed words stay', async () => {
    const { handle, onAgent } = mount([confirm()]);
    await screen.findByTestId('conversation-composer-prompts-card');
    expect(screen.getByTestId('composer').innerHTML).toContain('Press Enter to Generate, or choose an answer above');
    act(() => { handle()!.insertText('taller'); });
    await act(async () => { fireEvent.click(screen.getByTestId('composer-send')); });
    expect(onAgent).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.getByTestId('conversation-composer-prompts-error')).toHaveTextContent('Generate'));
    expect(handle()!.editor!.getText()).toBe('taller');
  });

  it('a text prompt is answered through the visible input', async () => {
    const onAnswer = vi.fn((_answer: unknown) => undefined);
    const { handle } = mount([text({ onAnswer })]);
    await screen.findByTestId('conversation-composer-prompts-card');
    expect(screen.queryByTestId('conversation-composer-prompts-answer')).toBeNull();
    act(() => { handle()!.insertText('Mina'); });
    await act(async () => { fireEvent.click(screen.getByTestId('composer-send')); });
    await waitFor(() => expect(onAnswer).toHaveBeenCalledWith({ kind: 'text', text: 'Mina' }));
  });
});

describe('deckKeyAction with a direction', () => {
  it('J / K are words in the input, not paging, when the card takes a direction', () => {
    const prompt = confirm({ onDirection: () => undefined });
    const state = { prompt, collapsed: false, inputEmpty: true, inDeck: false, busy: false };
    expect(deckKeyAction({ key: 'k' }, state)).toBeNull();
    expect(deckKeyAction({ key: 'k' }, { ...state, prompt: confirm() })).toEqual({ type: 'page', delta: -1 });
    expect(deckKeyAction({ key: '1' }, state)).toEqual({ type: 'pick', optionId: 'generate' });
  });
});

// 2.513.0 — `inputDraft` binds the composer's own text box under the prompt presentation.
describe('ConversationComposer presentation="prompt" with inputDraft', () => {
  const ConversationComposer = createConversationComposer({ useFileUpload: () => ({ upload: async () => ({ status: 'uploading', transferId: 't' }) }) });
  function mount(prompts: ComposerPrompt[], presentation: 'prompt' | 'compact' = 'prompt') {
    let handle: RichChatComposerHandle | null = null;
    const props = (p: ComposerPrompt[]) => ({
      channel: null, context: { kind: 'initiative' as const, id: 's', title: 'Little Shop' }, presentation, defaultMode: 'agent' as const, expanded: true, console: false,
      capabilities: { maySend: false, agent: { allowed: true } }, identity: { userId: 'u-1', displayName: 'Local' },
      onAgent: () => true, submitLabel: 'Plan', composerTestId: 'composer', composerRef: (h: RichChatComposerHandle | null) => { handle = h; }, prompts: p,
    });
    const utils = render(<ConversationComposer {...props(prompts)} />);
    return { ...utils, handle: () => handle, update: (p: ComposerPrompt[]) => utils.rerender(<ConversationComposer {...props(p)} />) };
  }

  it('seeds the text box from inputDraft.value when the card opens, and again when the open card changes', async () => {
    const { handle, update } = mount([confirm({ id: 'refine', inputDraft: { value: 'A little fern', onChange: () => {} } })]);
    await screen.findByTestId('conversation-composer-prompts-card');
    await waitFor(() => expect(handle()!.editor!.getText()).toBe('A little fern'));
    // Same card, new value: the box is the person's, not rewritten.
    update([confirm({ id: 'refine', inputDraft: { value: 'something else', onChange: () => {} } })]);
    await act(async () => {});
    expect(handle()!.editor!.getText()).toBe('A little fern');
    // Another card: seeded from its own draft.
    update([text({ id: 'name', inputDraft: { value: 'Pip', onChange: () => {} } })]);
    await waitFor(() => expect(screen.getByTestId('conversation-composer-prompts-card')).toHaveAttribute('data-composer-prompt', 'name'));
    await waitFor(() => expect(handle()!.editor!.getText()).toBe('Pip'));
  });

  it('forwards every keystroke to inputDraft.onChange; Enter still answers the card', async () => {
    const onChange = vi.fn((_value: string) => {});
    const onAnswer = vi.fn((_answer: unknown) => undefined);
    const { handle } = mount([text({ inputDraft: { value: '', onChange }, onAnswer })]);
    await screen.findByTestId('conversation-composer-prompts-card');
    await waitFor(() => expect(handle()!.editor).toBeTruthy());
    act(() => { handle()!.insertText('P'); });
    act(() => { handle()!.insertText('ip'); });
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith('Pip'));
    expect(onChange).toHaveBeenCalledWith('P');
    await act(async () => { fireEvent.click(screen.getByTestId('composer-send')); });
    await waitFor(() => expect(onAnswer).toHaveBeenCalledWith({ kind: 'text', text: 'Pip' }));
  });

  it('under presentation="compact" the composer text box is not bound', async () => {
    const onChange = vi.fn((_value: string) => {});
    const { handle } = mount([confirm({ inputDraft: { value: 'A little fern', onChange } })], 'compact');
    await screen.findByTestId('conversation-composer-prompts-card');
    await act(async () => {});
    expect(handle()?.editor?.getText() ?? '').not.toBe('A little fern');
    expect(onChange).not.toHaveBeenCalled();
  });
});
