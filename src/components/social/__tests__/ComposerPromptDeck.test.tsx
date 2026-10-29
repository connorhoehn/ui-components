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

  it('the card caps its height and scrolls inside itself; the inset variant drops its own border', () => {
    const { rerender } = render(<ComposerPromptDeck prompts={prompts()} />);
    const card = screen.getByTestId('composer-prompt-deck-card');
    expect(card.className).toContain('overflow-y-auto');
    expect(card.className).toMatch(/max-h-\[/);
    expect(card.className).toContain('border');
    rerender(<ComposerPromptDeck prompts={prompts()} variant="inset" />);
    expect(screen.getByTestId('composer-prompt-deck-card').className).not.toContain('rounded-lg');
    expect(deck().getAttribute('data-deck-variant')).toBe('inset');
  });

  it('a read-only prompt can disclose its facts without offering or submitting answers', () => {
    const onAnswer = vi.fn();
    const p = prompts(onAnswer);
    render(<ComposerPromptDeck prompts={[{ ...p[0]!, readOnlyReason: 'An SME or leader authorizes jobs' }]} />);
    expect(screen.getByTestId('composer-prompt-deck-read-only').textContent).toBe('An SME or leader authorizes jobs');
    expect(screen.queryByTestId('composer-prompt-deck-option-dispatch')).toBeNull();
    const hide = screen.getByTestId('composer-prompt-deck-hide');
    expect(hide).toBeEnabled();
    expect(hide.getAttribute('data-composer-readonly-allow')).toContain('without changing a record');
    fireEvent.click(hide);
    expect(screen.queryByTestId('composer-prompt-deck-card')).toBeNull();
    const show = screen.getByTestId('composer-prompt-deck-show');
    expect(show).toBeEnabled();
    expect(show.getAttribute('data-composer-readonly-allow')).toContain('without changing a record');
    fireEvent.click(show);
    expect(screen.getByTestId('composer-prompt-deck-read-only')).toBeInTheDocument();
    screen.getByTestId('composer-prompt-deck-hide').focus();
    act(() => { key('1'); key('Enter'); });
    expect(onAnswer).not.toHaveBeenCalled();
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
    const deckEl = screen.getByTestId('conversation-composer-prompts');
    expect(deckEl.getAttribute('data-composer-prompt-deck')).toBe('expanded');
    // One card: the deck is the composer card's first section, above its input.
    const card = screen.getByTestId('composer');
    expect(card.contains(deckEl)).toBe(true);
    expect(deckEl.getAttribute('data-deck-variant')).toBe('inset');
    const input = card.querySelector('.ProseMirror') as HTMLElement;
    expect(deckEl.compareDocumentPosition(input) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
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

describe('ComposerPromptDeck — routing to a compose prompt (2.482.0)', () => {
  const PATH = ['Choose', 'Draft request', 'Confirm', 'Done'];
  function funding(onConfirm: (a: ComposerPromptAnswer) => unknown, onCancel?: () => void): ComposerPrompt[] {
    const request: ComposerPrompt = {
      id: 'request', eyebrow: 'Agent dialogue · ORG-OBS-11', title: 'Request more budget', kind: 'compose',
      question: 'Recipient: Sienna Garcia. The request includes the work item and the current forecast.',
      path: { steps: PATH, current: 1 },
      compose: { initialMessage: 'Sienna, please grant Nora a sprint envelope for ORG-OBS-11.', recipient: 'To Sienna Garcia · ORG-OBS-11', reviewTitle: 'Confirm budget request', doneTitle: 'Request confirmed', doneActionLabel: 'Back to preparation', onCancel },
      onAnswer: (a) => onConfirm(a) as void,
    };
    const saved: ComposerPrompt = {
      id: 'saved', title: 'Job draft saved', kind: 'choice', question: 'The job settings are retained.', path: { steps: ['Choose', 'Saved'], current: 1 },
      options: [{ id: 'back', label: 'Back to preparation' }], onAnswer: () => undefined,
    };
    return [{
      id: 'funding', eyebrow: 'Agent dialogue · ORG-OBS-11', title: 'This job needs a sprint envelope', kind: 'choice',
      question: 'Nora needs funding before this job can run.', path: { steps: PATH, current: 0 },
      options: [{ id: 'request', label: 'Request budget', emphasis: 'primary' }, { id: 'save', label: 'Save for later' }],
      onAnswer: (a) => ({ next: a.optionId === 'request' ? request : saved }),
    }];
  }
  const card = () => screen.getByTestId('composer-prompt-deck-card');
  const editor = () => screen.getByTestId('composer-prompt-deck-compose-editor') as HTMLTextAreaElement;
  const pathCurrent = (id: string) => screen.getByTestId(id).querySelector('[aria-current="step"]')?.getAttribute('data-decision-step');

  it('1 routes to the compose flow in the same card with no receipt; the path advances; Back returns to the question', async () => {
    const onConfirm = vi.fn();
    render(<ComposerPromptDeck prompts={funding(onConfirm)} />);
    expect(pathCurrent('composer-prompt-deck-path')).toBe('Choose');
    screen.getByTestId('composer-prompt-deck-option-request').focus();
    await act(async () => { key('1'); });
    expect(card().getAttribute('data-composer-prompt')).toBe('request');
    expect(card().getAttribute('data-composer-prompt-kind')).toBe('compose');
    expect(screen.queryByTestId('composer-prompt-deck-receipt')).toBeNull();
    expect(screen.queryByTestId('composer-prompt-deck-keys')).toBeNull();
    expect(screen.getByTestId('composer-prompt-deck-compose').getAttribute('data-composer-confirm-flow')).toBe('draft');
    expect(pathCurrent('composer-prompt-deck-compose-path')).toBe('Draft request');
    expect(document.activeElement).toBe(editor());
    expect(screen.queryByRole('dialog')).toBeNull();
    // Digits type in the editor; they are not the deck's shortcuts.
    expect(fireEvent.keyDown(editor(), { key: '1' })).toBe(true);
    expect(onConfirm).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('composer-prompt-deck-compose-cancel'));
    expect(card().getAttribute('data-composer-prompt')).toBe('funding');
    expect(screen.getByTestId('composer-prompt-deck-option-request')).toBeInTheDocument();
  });

  it('Enter reviews, Enter confirms through onAnswer, Done shows after it resolves, and its action drops the prompt', async () => {
    let resolve!: (r: unknown) => void;
    const onConfirm = vi.fn(() => new Promise((r) => { resolve = r; }));
    render(<ComposerPromptDeck prompts={funding(onConfirm)} />);
    await act(async () => { fireEvent.click(screen.getByTestId('composer-prompt-deck-option-request')); });
    fireEvent.change(editor(), { target: { value: 'Sienna, please grant Nora $12.' } });
    fireEvent.keyDown(editor(), { key: 'Enter' });
    const flow = screen.getByTestId('composer-prompt-deck-compose');
    expect(flow.getAttribute('data-composer-confirm-flow')).toBe('review');
    expect(screen.getByText('Confirm budget request')).toBeInTheDocument();
    expect(screen.getByTestId('composer-prompt-deck-compose-message').textContent).toBe('Sienna, please grant Nora $12.');
    const reviewRegion = screen.getByTestId('composer-prompt-deck-compose-review');
    fireEvent.keyDown(reviewRegion, { key: 'Enter', repeat: true });
    expect(onConfirm).not.toHaveBeenCalled();
    await act(async () => { fireEvent.keyDown(reviewRegion, { key: 'Enter' }); });
    expect(onConfirm).toHaveBeenCalledWith({ kind: 'compose', message: 'Sienna, please grant Nora $12.' });
    expect(flow.getAttribute('data-composer-confirm-flow')).toBe('review');
    expect(screen.getByTestId('composer-prompt-deck-compose-busy')).toBeInTheDocument();
    expect(screen.queryByTestId('composer-prompt-deck-busy')).toBeNull();
    await act(async () => { resolve({ receipt: 'Request sent to Sienna Garcia' }); });
    await waitFor(() => expect(screen.getByTestId('composer-prompt-deck-compose').getAttribute('data-composer-confirm-flow')).toBe('done'));
    expect(screen.getByText('Request confirmed')).toBeInTheDocument();
    expect(screen.getByTestId('composer-prompt-deck-compose-done-message').textContent).toBe('Request sent to Sienna Garcia');
    expect(pathCurrent('composer-prompt-deck-compose-path')).toBe('Done');
    fireEvent.click(screen.getByTestId('composer-prompt-deck-compose-done-action'));
    expect(screen.queryByTestId('composer-prompt-deck')).toBeNull();
  });

  it('a refused confirm stays on review with the error in the flow, not on the deck', async () => {
    render(<ComposerPromptDeck prompts={funding(() => ({ error: 'No approver is available.' }))} />);
    await act(async () => { fireEvent.click(screen.getByTestId('composer-prompt-deck-option-request')); });
    fireEvent.keyDown(editor(), { key: 'Enter' });
    await act(async () => { fireEvent.click(screen.getByTestId('composer-prompt-deck-compose-confirm')); });
    expect(screen.getByTestId('composer-prompt-deck-compose').getAttribute('data-composer-confirm-flow')).toBe('review');
    expect(screen.getByTestId('composer-prompt-deck-compose-error').textContent).toBe('No approver is available.');
    expect(screen.queryByTestId('composer-prompt-deck-error')).toBeNull();
    expect(card().getAttribute('data-composer-prompt')).toBe('request');
  });

  it('2 takes the Saved branch with its own path', async () => {
    render(<ComposerPromptDeck prompts={funding(() => undefined)} />);
    screen.getByTestId('composer-prompt-deck-option-save').focus();
    await act(async () => { key('2'); });
    expect(card().getAttribute('data-composer-prompt')).toBe('saved');
    const path = screen.getByTestId('composer-prompt-deck-path');
    expect(path.textContent).toContain('Saved');
    expect(path.querySelectorAll('[data-complete]')).toHaveLength(1);
    expect(pathCurrent('composer-prompt-deck-path')).toBe('Saved');
  });

  it('a root compose prompt’s Back calls its onCancel and drops the prompt', async () => {
    const onCancel = vi.fn();
    const [, request] = [null, funding(() => undefined, onCancel)[0]!.onAnswer({ kind: 'choice', optionId: 'request' }) as { next: ComposerPrompt }];
    render(<ComposerPromptDeck prompts={[request.next]} />);
    expect(screen.getByTestId('composer-prompt-deck-compose').getAttribute('data-composer-confirm-flow')).toBe('draft');
    fireEvent.click(screen.getByTestId('composer-prompt-deck-compose-cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('composer-prompt-deck')).toBeNull();
  });
});
