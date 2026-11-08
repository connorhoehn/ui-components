// 2.510.0 — Back on a deck prompt: `ComposerPrompt.back` draws a ghost Back in
// the card header, on a one-prompt deck too (where the ‹ › pager is absent),
// and a `{ next }` follow-up without one returns to the question it followed.
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ComposerPromptDeck } from '../ComposerPromptDeck';
import { deckKeyAction, type ComposerPrompt } from '../composerPromptModel';

afterEach(cleanup);

const choice = (over: Partial<ComposerPrompt> = {}): ComposerPrompt => ({
  id: 'kind', eyebrow: 'Plan', title: 'Create artwork', question: 'Which kind of artwork?', kind: 'choice',
  options: [{ id: 'still', label: 'A still' }, { id: 'plate', label: 'A background plate' }],
  onAnswer: () => undefined,
  ...over,
});

describe('ComposerPromptDeck Back', () => {
  it('renders on a one-prompt deck, beside Hide and without a pager, and calls onBack', async () => {
    const onBack = vi.fn();
    render(<ComposerPromptDeck prompts={[choice({ back: { onBack } })]} />);
    expect(screen.queryByTestId('composer-prompt-deck-previous')).toBeNull();
    const back = screen.getByTestId('composer-prompt-deck-back');
    expect(back).toHaveTextContent('Back');
    expect(back).toHaveAttribute('data-composer-prompt-back');
    expect(back).toHaveAttribute('data-composer-readonly-allow');
    expect(back).toHaveAttribute('data-variant', 'ghost');
    await act(async () => { fireEvent.click(back); });
    expect(onBack).toHaveBeenCalledTimes(1);
    // Back answers nothing: the prompt is still on screen.
    expect(screen.getByTestId('composer-prompt-deck-card')).toHaveAttribute('data-composer-prompt', 'kind');
  });

  it('takes a label, is off with its reason, and draws nothing without `back`', () => {
    const { rerender } = render(<ComposerPromptDeck prompts={[choice({ back: { label: 'Change skill', onBack: () => {}, disabledReason: 'Saving…' } })]} />);
    const back = screen.getByTestId('composer-prompt-deck-back');
    expect(back).toHaveTextContent('Change skill');
    expect(back).toBeDisabled();
    expect(back).toHaveAttribute('title', 'Saving…');
    rerender(<ComposerPromptDeck prompts={[choice({ id: 'other' })]} />);
    expect(screen.queryByTestId('composer-prompt-deck-back')).toBeNull();
  });

  it('a rejected onBack shows on the card', async () => {
    render(<ComposerPromptDeck prompts={[choice({ back: { onBack: () => Promise.reject(new Error('The plan changed; reload it.')) } })]} />);
    await act(async () => { fireEvent.click(screen.getByTestId('composer-prompt-deck-back')); });
    await waitFor(() => expect(screen.getByTestId('composer-prompt-deck-error')).toHaveTextContent('The plan changed'));
  });

  it('a follow-up reached through { next } gets Back to the question it followed', async () => {
    const follow: ComposerPrompt = { id: 'size', title: 'Plate size', question: 'How wide?', kind: 'choice', options: [{ id: 'wide', label: 'Wide' }], onAnswer: () => undefined };
    render(<ComposerPromptDeck prompts={[choice({ onAnswer: () => ({ next: follow }) })]} />);
    expect(screen.queryByTestId('composer-prompt-deck-back')).toBeNull();
    await act(async () => { fireEvent.click(screen.getByTestId('composer-prompt-deck-option-plate')); });
    await waitFor(() => expect(screen.getByTestId('composer-prompt-deck-card')).toHaveAttribute('data-composer-prompt', 'size'));
    await act(async () => { fireEvent.click(screen.getByTestId('composer-prompt-deck-back')); });
    await waitFor(() => expect(screen.getByTestId('composer-prompt-deck-card')).toHaveAttribute('data-composer-prompt', 'kind'));
  });

  it('a follow-up with its own back uses that instead', async () => {
    const onBack = vi.fn();
    const follow: ComposerPrompt = { id: 'size', title: 'Plate size', question: 'How wide?', kind: 'choice', options: [{ id: 'wide', label: 'Wide' }], back: { label: 'Start over', onBack }, onAnswer: () => undefined };
    render(<ComposerPromptDeck prompts={[choice({ onAnswer: () => ({ next: follow }) })]} />);
    await act(async () => { fireEvent.click(screen.getByTestId('composer-prompt-deck-option-plate')); });
    await act(async () => { fireEvent.click(await screen.findByText('Start over')); });
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('composer-prompt-deck-card')).toHaveAttribute('data-composer-prompt', 'size');
  });

  it('Alt+Backspace from the deck takes Back', async () => {
    const onBack = vi.fn();
    render(<ComposerPromptDeck prompts={[choice({ back: { onBack } })]} />);
    const option = screen.getByTestId('composer-prompt-deck-option-still');
    option.focus();
    await act(async () => { fireEvent.keyDown(option, { key: 'Backspace', altKey: true }); });
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('composer-prompt-deck-keys')).toHaveTextContent('Alt+⌫ Back');
  });
});

describe('deckKeyAction back', () => {
  const state = { prompt: choice(), collapsed: false, inputEmpty: true, inDeck: false, busy: false, canBack: true };
  it('Alt+Backspace on an empty input is Back when the card has one', () => {
    expect(deckKeyAction({ key: 'Backspace', altKey: true }, state)).toEqual({ type: 'back' });
    expect(deckKeyAction({ key: 'Backspace', altKey: true }, { ...state, canBack: false })).toBeNull();
  });
  it('never while words are being typed, while busy, or on a plain Backspace', () => {
    expect(deckKeyAction({ key: 'Backspace', altKey: true }, { ...state, inputEmpty: false })).toBeNull();
    expect(deckKeyAction({ key: 'Backspace', altKey: true }, { ...state, busy: true })).toBeNull();
    expect(deckKeyAction({ key: 'Backspace' }, state)).toBeNull();
  });
});
