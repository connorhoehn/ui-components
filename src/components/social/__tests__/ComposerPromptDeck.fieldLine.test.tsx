import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ComposerPromptDeck } from '../ComposerPromptDeck';
import type { ComposerPrompt } from '../composerPromptModel';

afterEach(cleanup);

const LONG = 'Senior backend engineer, eight years on payments, led the ledger rewrite and mentors two juniors.';

const prompt = (fields: ComposerPrompt['fields']): ComposerPrompt => ({
  id: 'p', title: 'Start the round', question: 'Start now?', kind: 'confirm', fields,
  options: [{ id: 'yes', label: 'Start', emphasis: 'primary' }],
  onAnswer: () => undefined,
});

describe('ComposerPromptDeck field line="one-line"', () => {
  it('cuts one card fact to a single line with its full text as the tooltip', () => {
    render(<ComposerPromptDeck prompts={[prompt([{ label: 'Résumé', value: LONG, line: 'one-line' }, { label: 'Round', value: 'Technical' }])]} />);
    const facts = screen.getByTestId('composer-prompt-deck-fields');
    const one = facts.querySelector('[data-composer-prompt-field-line="one"]')!;
    const dd = one.querySelector('dd')!;
    expect(dd.className).toContain('truncate');
    expect(dd.className).not.toContain('break-words');
    expect(dd.getAttribute('title')).toBe(LONG);
    // The other fact still wraps, as before.
    const other = facts.querySelectorAll('dd')[1];
    expect(other.className).toContain('break-words');
    expect(facts.querySelectorAll('[data-composer-prompt-field-line]')).toHaveLength(1);
  });

  it('uses fullText as the tooltip when the value is not a string', () => {
    render(<ComposerPromptDeck prompts={[prompt([{ label: 'Résumé', value: <strong>{LONG}</strong>, line: 'one-line', fullText: LONG }])]} />);
    expect(screen.getByTestId('composer-prompt-deck-fields').querySelector('dd')!.getAttribute('title')).toBe(LONG);
  });
});
