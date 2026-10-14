import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { ComposerPromptDeck } from '../ComposerPromptDeck';
import { createConversationComposer } from '../ConversationComposer';
import { ConversationInputProvider } from '../ConversationInputs';
import type { RichChatComposerHandle } from '../RichChatComposer';
import type { ComposerPrompt, ComposerPromptAnswer } from '../composerPromptModel';

afterEach(cleanup);

beforeAll(() => {
  const rects = () => ({ length: 0, item: () => null, [Symbol.iterator]: [][Symbol.iterator] }) as unknown as DOMRectList;
  const rect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  for (const proto of [Range.prototype, Element.prototype]) {
    if (!proto.getClientRects) Object.assign(proto, { getClientRects: rects });
    if (!proto.getBoundingClientRect) Object.assign(proto, { getBoundingClientRect: rect });
  }
});

function prompts(onAnswer: (id: string, a: ComposerPromptAnswer) => unknown = () => undefined): ComposerPrompt[] {
  return [
    {
      id: 'dispatch', eyebrow: 'Prepare job', title: 'Fix token refresh', question: 'Dispatch with these settings?', kind: 'choice',
      fields: [{ label: 'Model', value: 'Sonnet 4.5' }, { label: 'Envelope', value: '$4 left', tone: 'warning' }],
      options: [{ id: 'dispatch', label: 'Dispatch', emphasis: 'primary' }, { id: 'model', label: 'Change model' }],
      defaultOptionId: 'dispatch', onAnswer: (a) => onAnswer('dispatch', a) as void,
    },
    { id: 'approve', eyebrow: 'Approval', title: 'Spend $40', question: 'Approve?', kind: 'confirm', onAnswer: (a) => onAnswer('approve', a) as void },
  ];
}

const deck = () => screen.getByTestId('composer-prompt-deck');
const key = (k: string, init: KeyboardEventInit = {}) => fireEvent.keyDown(document.activeElement ?? document.body, { key: k, ...init });

describe('ComposerPromptDeck', () => {
  it('draws the header card, the question, numbered answers, position and progress, with markers', () => {
    render(<ComposerPromptDeck prompts={prompts()} />);
    expect(deck().getAttribute('data-composer-prompt-deck')).toBe('expanded');
    const card = screen.getByRole('group', { name: 'Fix token refresh' });
    expect(card.getAttribute('data-composer-prompt')).toBe('dispatch');
    expect(card.getAttribute('aria-describedby')).toBeTruthy();
    expect(screen.getByText('Sonnet 4.5')).toBeTruthy();
    expect(screen.getByTestId('composer-prompt-deck-position').textContent).toBe('1 of 2');
    expect(screen.getByTestId('composer-prompt-deck-progress')).toBeTruthy();
    expect(screen.getByTestId('composer-prompt-deck-option-dispatch').getAttribute('aria-keyshortcuts')).toBe('1');
    expect(screen.getByTestId('composer-prompt-deck-keys').textContent).toContain('Enter Dispatch');
  });

  it('a digit answers, the prompt drops off with a receipt in a live region, and the next one shows', async () => {
    const onAnswer = vi.fn();
    render(<ComposerPromptDeck prompts={prompts(onAnswer)} />);
    screen.getByTestId('composer-prompt-deck-option-dispatch').focus();
    await act(async () => { key('2'); });
    expect(onAnswer).toHaveBeenCalledWith('dispatch', { kind: 'choice', optionId: 'model' });
    expect(screen.getByRole('status').textContent).toContain('Fix token refresh: Change model');
    expect(screen.getByRole('group', { name: 'Spend $40' })).toBeTruthy();
    expect(screen.queryByTestId('composer-prompt-deck-position')).toBeNull();
  });

  it('a refused answer stays on the card with its error', async () => {
    render(<ComposerPromptDeck prompts={prompts(() => ({ error: 'Over your envelope' }))} />);
    await act(async () => { fireEvent.click(screen.getByTestId('composer-prompt-deck-option-dispatch')); });
    expect(screen.getByRole('alert').textContent).toBe('Over your envelope');
    expect(screen.getByRole('group', { name: 'Fix token refresh' })).toBeTruthy();
  });

  it('a host receipt replaces the default one', async () => {
    render(<ComposerPromptDeck prompts={prompts(() => ({ receipt: 'Dispatched to org/auth' }))} />);
    await act(async () => { fireEvent.click(screen.getByTestId('composer-prompt-deck-option-dispatch')); });
    expect(screen.getByRole('status').textContent).toBe('Answered · Dispatched to org/auth');
  });

  it('paging with J/K and ⌘↓, and Esc collapses to one line that ⌘↓ reopens', async () => {
    render(<ComposerPromptDeck prompts={prompts()} />);
    screen.getByTestId('composer-prompt-deck-option-dispatch').focus();
    act(() => { key('j'); });
    expect(screen.getByTestId('composer-prompt-deck-position').textContent).toBe('2 of 2');
    screen.getByTestId('composer-prompt-deck-option-confirm').focus();
    act(() => { key('ArrowDown', { metaKey: true }); });
    expect(screen.getByTestId('composer-prompt-deck-position').textContent).toBe('1 of 2');
    screen.getByTestId('composer-prompt-deck-option-dispatch').focus();
    act(() => { key('Escape'); });
    expect(deck().getAttribute('data-composer-prompt-deck')).toBe('collapsed');
    expect(deck().textContent).toContain('2 questions waiting');
    screen.getByTestId('composer-prompt-deck-show').focus();
    act(() => { key('ArrowDown', { ctrlKey: true }); });
    expect(deck().getAttribute('data-composer-prompt-deck')).toBe('expanded');
  });

  it('a read-only prompt shows why and offers no answers', () => {
    const p = prompts();
    render(<ComposerPromptDeck prompts={[{ ...p[0]!, readOnlyReason: 'An SME or leader authorizes jobs' }]} />);
    expect(screen.getByTestId('composer-prompt-deck-read-only').textContent).toBe('An SME or leader authorizes jobs');
    expect(screen.queryByTestId('composer-prompt-deck-option-dispatch')).toBeNull();
  });

  it('keys from outside the deck and its input are ignored', () => {
    const onAnswer = vi.fn();
    render(<><button type="button" data-testid="elsewhere">x</button><ComposerPromptDeck prompts={prompts(onAnswer)} /></>);
    screen.getByTestId('elsewhere').focus();
    act(() => { key('1'); });
    expect(onAnswer).not.toHaveBeenCalled();
  });
});

describe('ConversationComposer prompts', () => {
  const ConversationComposer = createConversationComposer({ useFileUpload: () => ({ upload: async () => ({ status: 'failed' }) }) });
  const context = { kind: 'conversation' as const, id: 'orgiq:work:w-1', title: 'Fix token refresh' };

  function Host({ onCap, chat }: { onCap: (a: ComposerPromptAnswer) => void; chat: { sendMessage: () => void } }) {
    const [answered, setAnswered] = useState(false);
    const list: ComposerPrompt[] = answered ? [] : [{
      id: 'cap', title: 'Run cap', question: 'What should this run be capped at?', kind: 'number', min: 0,
      placeholder: 'A dollar amount', options: [{ id: 'none', label: 'No cap' }],
      onAnswer: (a) => { onCap(a); setAnswered(true); },
    }];
    return (
      <ConversationInputProvider>
        <ConversationComposer channel="orgiq:work:w-1" chat={chat} context={context} capabilities={{ maySend: true }}
          identity={{ userId: 'u-eli', displayName: 'Eli' }} composerTestId="composer" composerRef={(h) => { handle = h; }} prompts={list} />
      </ConversationInputProvider>
    );
  }
  let handle: RichChatComposerHandle | null = null;

  it('shows the deck above the input, and Enter answers a number prompt with the typed words instead of posting', async () => {
    const onCap = vi.fn();
    const chat = { sendMessage: vi.fn() };
    render(<Host onCap={onCap} chat={chat} />);
    expect(screen.getByTestId('conversation-composer-prompts').getAttribute('data-composer-prompt-deck')).toBe('expanded');
    const input = screen.getByTestId('composer').querySelector('.ProseMirror') as HTMLElement;
    await act(async () => { input.focus(); fireEvent.focusIn(input); });
    act(() => { handle?.editor?.commands.setContent('<p>$5</p>', { emitUpdate: true }); });
    await act(async () => { fireEvent.click(screen.getByTestId('composer-send')); });
    await waitFor(() => expect(onCap).toHaveBeenCalledWith({ kind: 'number', value: 5 }));
    expect(chat.sendMessage).not.toHaveBeenCalled();
    expect(screen.getByRole('status').textContent).toContain('Run cap: 5');
  });

  it('a bad typed answer keeps the draft and shows why on the card', async () => {
    const onCap = vi.fn();
    render(<Host onCap={onCap} chat={{ sendMessage: vi.fn() }} />);
    const input = screen.getByTestId('composer').querySelector('.ProseMirror') as HTMLElement;
    await act(async () => { input.focus(); fireEvent.focusIn(input); });
    act(() => { handle?.editor?.commands.setContent('<p>lots</p>', { emitUpdate: true }); });
    await act(async () => { fireEvent.click(screen.getByTestId('composer-send')); });
    expect(onCap).not.toHaveBeenCalled();
    expect(screen.getByRole('alert').textContent).toBe('Type a number, or pick an option.');
    expect(handle?.editor?.getText()).toBe('lots');
  });
});
