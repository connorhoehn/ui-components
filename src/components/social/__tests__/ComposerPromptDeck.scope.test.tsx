import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ComposerPromptDeck, promptsInScope } from '../ComposerPromptDeck';
import type { ComposerPrompt } from '../composerPromptModel';

afterEach(cleanup);

const artwork: ComposerPrompt = { id: 'run-1', scope: 'assets/artwork', eyebrow: 'Create artwork', title: 'Ready for review', question: 'Review the candidate?', kind: 'choice', options: [{ id: 'watch', label: 'Watch run' }], onAnswer: () => undefined };
const global: ComposerPrompt = { id: 'help', title: 'Anything else?', question: 'Ask away', kind: 'choice', options: [{ id: 'ok', label: 'OK' }], onAnswer: () => undefined };

describe('ComposerPromptDeck scope (2.503.0)', () => {
  it('keeps unscoped prompts and prompts of the current scope only', () => {
    expect(promptsInScope([artwork, global], 'assets/catalog').map(p => p.id)).toEqual(['help']);
    expect(promptsInScope([artwork, global], 'assets/artwork').map(p => p.id)).toEqual(['run-1', 'help']);
    expect(promptsInScope([artwork, global], undefined).map(p => p.id)).toEqual(['run-1', 'help']);
  });

  it('drops another context\'s card when the scope changes, and shows it again on return', () => {
    const { rerender } = render(<ComposerPromptDeck prompts={[artwork]} scope="assets/artwork" />);
    expect(screen.getByText('Ready for review')).toBeInTheDocument();
    rerender(<ComposerPromptDeck prompts={[artwork]} scope="assets/catalog" />);
    expect(screen.queryByText('Ready for review')).not.toBeInTheDocument();
    rerender(<ComposerPromptDeck prompts={[artwork]} scope="assets/artwork" />);
    expect(screen.getByText('Ready for review')).toBeInTheDocument();
  });

  it('resets a collapsed deck on a new scope', () => {
    const { rerender } = render(<ComposerPromptDeck prompts={[global]} scope="a" />);
    const hide = screen.queryByRole('button', { name: /hide/i });
    if (hide) fireEvent.click(hide);
    rerender(<ComposerPromptDeck prompts={[global]} scope="b" />);
    expect(screen.getByText('Anything else?')).toBeVisible();
  });
});
