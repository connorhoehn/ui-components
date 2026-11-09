// 2.515.6 — a disabled Send / Answer says why: `submitDisabledReason` on the
// composer (RichChatComposer, ContextComposer, ConversationComposer) and the
// prompt deck, `disabledReason` on a prompt. The reason is the button's
// tooltip and accessible description and one visible line, at every density.
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { RichChatComposer, type RichChatComposerHandle } from '../RichChatComposer';
import { ComposerPromptDeck } from '../ComposerPromptDeck';
import { createConversationComposer } from '../ConversationComposer';
import { ConversationInputProvider } from '../ConversationInputs';
import { DensityProvider } from '../../shared/Density';
import { ToastProvider } from '../../shared/ToastProvider';
import type { ComposerPrompt } from '../composerPromptModel';

afterEach(cleanup);

beforeAll(() => {
  const rects = () => ({ length: 0, item: () => null, [Symbol.iterator]: [][Symbol.iterator] }) as unknown as DOMRectList;
  const rect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  for (const proto of [Range.prototype, Element.prototype]) {
    if (!proto.getClientRects) Object.assign(proto, { getClientRects: rects });
    if (!proto.getBoundingClientRect) Object.assign(proto, { getBoundingClientRect: rect });
  }
});

const REASON = 'The realtime gateway is not connected.';
const describedBy = (el: HTMLElement) => (el.getAttribute('aria-describedby') ?? '').split(' ').filter(Boolean).map((id) => document.getElementById(id)?.textContent);

describe('RichChatComposer submitDisabledReason', () => {
  it('absent: Send carries no reason, no hint line', () => {
    render(<RichChatComposer onSend={() => {}} data-testid="composer" layout="wide" />);
    const send = screen.getByTestId('composer-send');
    expect(send).toBeDisabled();
    expect(send).not.toHaveAttribute('aria-describedby');
    expect(screen.queryByTestId('composer-submit-reason')).toBeNull();
  });

  it('present: Send is off even with words typed, with the reason as tooltip, description and a visible line', async () => {
    let handle: RichChatComposerHandle | null = null;
    const onSend = vi.fn();
    render(<RichChatComposer ref={(h) => { handle = h; }} onSend={onSend} data-testid="composer" layout="wide" submitDisabledReason={REASON} />);
    act(() => { handle!.editor?.commands.setContent('<p>hello</p>', { emitUpdate: true }); });
    const send = screen.getByTestId('composer-send');
    expect(send).toBeDisabled();
    expect(send).toHaveAttribute('title', REASON);
    expect(describedBy(send)).toEqual([REASON]);
    expect(screen.getByTestId('composer-submit-reason')).toHaveTextContent(REASON);
    fireEvent.click(send);
    expect(onSend).not.toHaveBeenCalled();
  });

  it('compact density and the idle single row still draw the hint line', () => {
    render(<RichChatComposer onSend={() => {}} data-testid="composer" layout="wide" density="compact" collapseWhenIdle submitDisabledReason={REASON} />);
    expect(screen.getByTestId('composer-submit-reason')).toHaveTextContent(REASON);
    expect(describedBy(screen.getByTestId('composer-send'))).toEqual([REASON]);
  });

  it('pane form (icon-only Send) takes the reason over its label tooltip', () => {
    render(<RichChatComposer onSend={() => {}} data-testid="composer" layout="medium" responsive="pane" submitDisabledReason={REASON} />);
    const send = screen.getByTestId('composer-send');
    expect(send).toHaveAttribute('title', REASON);
    expect(describedBy(send)).toEqual([REASON]);
  });
});

const ConversationComposer = createConversationComposer({
  useFileUpload: () => ({ upload: async () => ({ status: 'uploading', transferId: 't-1' }) }),
});
const context = { kind: 'document' as const, id: 'decisions', title: 'Decisions' };

describe('ConversationComposer submitDisabledReason', () => {
  it('passes the host reason to Send at compact density', () => {
    render(<ConversationInputProvider><DensityProvider value="compact">
      <ConversationComposer channel={null} context={context} capabilities={{ maySend: false, agent: { allowed: true } }} defaultMode="agent" mode="agent"
        composerTestId="composer" submitDisabledReason="This page has no commands." />
    </DensityProvider></ConversationInputProvider>, { wrapper: ToastProvider });
    expect(screen.getByTestId('composer-submit-reason')).toHaveTextContent('This page has no commands.');
    expect(describedBy(screen.getByTestId('composer-send'))).toEqual(['This page has no commands.']);
  });

  it('absent: no hint line', () => {
    render(<ConversationInputProvider><DensityProvider value="compact">
      <ConversationComposer channel={null} context={context} capabilities={{ maySend: false, agent: { allowed: true } }} defaultMode="agent" mode="agent" composerTestId="composer" />
    </DensityProvider></ConversationInputProvider>, { wrapper: ToastProvider });
    expect(screen.queryByTestId('composer-submit-reason')).toBeNull();
  });
});

const question = (over: Partial<ComposerPrompt> = {}): ComposerPrompt => ({
  id: 'q1', eyebrow: 'Agent question', title: 'orgiq-auth-service', question: 'Which tenant first?', kind: 'text',
  onAnswer: () => undefined, ...over,
});

describe('ComposerPromptDeck disabled reasons', () => {
  it('absent: Answer is off only until typed, with no reason', () => {
    render(<ComposerPromptDeck prompts={[question()]} />);
    const answer = screen.getByTestId('composer-prompt-deck-submit');
    expect(answer).toBeDisabled();
    expect(answer).not.toHaveAttribute('aria-describedby');
    expect(screen.queryByTestId('composer-prompt-deck-disabled-reason')).toBeNull();
    fireEvent.change(screen.getByTestId('composer-prompt-deck-answer'), { target: { value: 'the smallest' } });
    expect(answer).not.toBeDisabled();
  });

  it("a prompt's disabledReason: field and Answer off, reason described and shown, answering refused", async () => {
    const onAnswer = vi.fn();
    render(<ComposerPromptDeck prompts={[question({ disabledReason: 'Only the run owner can answer this.', onAnswer })]} />);
    const answer = screen.getByTestId('composer-prompt-deck-submit');
    expect(answer).toBeDisabled();
    expect(answer).toHaveAttribute('title', 'Only the run owner can answer this.');
    expect(describedBy(answer)).toEqual(['Only the run owner can answer this.']);
    expect(screen.getByTestId('composer-prompt-deck-answer')).toBeDisabled();
    expect(screen.getByTestId('composer-prompt-deck-disabled-reason')).toHaveTextContent('Only the run owner can answer this.');
    await act(async () => { fireEvent.keyDown(screen.getByTestId('composer-prompt-deck-answer'), { key: 'Enter' }); });
    expect(onAnswer).not.toHaveBeenCalled();
  });

  it("the deck's submitDisabledReason covers choice answers too", () => {
    const choice = question({ id: 'c1', kind: 'choice', options: [{ id: 'accept', label: 'Accept' }, { id: 'reject', label: 'Reject' }] });
    render(<ComposerPromptDeck prompts={[choice]} submitDisabledReason="Reconnecting to the queue." />);
    for (const id of ['accept', 'reject']) {
      const option = screen.getByTestId(`composer-prompt-deck-option-${id}`);
      expect(option).toBeDisabled();
      expect(option).toHaveAttribute('title', 'Reconnecting to the queue.');
      expect(describedBy(option)).toContain('Reconnecting to the queue.');
    }
  });
});
