// frontend/src/editor/suggestions/__tests__/suggestionAuthor.test.ts
//
// The attribution contract: a suggestion an agent run produced belongs to the
// person who triggered it, and the model is the secondary fact.

import { describe, expect, it } from 'vitest';

import {
  formatSuggestionAuthor,
  parseSuggestionAuthor,
  suggestionAuthorLabel,
} from '../suggestionAuthor';

describe('suggestionAuthor', () => {
  it('attributes an agent run to the person who triggered it, not the model', () => {
    const label = formatSuggestionAuthor({ person: 'Eve', model: 'Haiku' });

    expect(label).toBe('Eve (powered by Haiku)');
    // The person leads, so a truncating card eats the model first.
    expect(label.indexOf('Eve')).toBeLessThan(label.indexOf('Haiku'));
    expect(parseSuggestionAuthor(label)).toEqual({ person: 'Eve', model: 'Haiku' });
  });

  // The whole point of encoding this in `username` rather than a new mark
  // attribute: every document written before the change still reads correctly.
  it('reads a mark that carries only the agent name as it always did', () => {
    expect(parseSuggestionAuthor('Haiku')).toEqual({ person: 'Haiku' });
    expect(suggestionAuthorLabel({ username: 'Haiku' })).toBe('Haiku');
  });

  it('leaves a person who typed their own suggestion untouched', () => {
    expect(parseSuggestionAuthor('Ada Lovelace')).toEqual({ person: 'Ada Lovelace' });
    expect(suggestionAuthorLabel({ username: 'Ada Lovelace' })).toBe('Ada Lovelace');
  });

  // Only the trailing suffix is the model. A person whose display name has
  // brackets of its own keeps them rather than being silently re-split.
  it('keeps brackets that belong to the person', () => {
    expect(parseSuggestionAuthor('Ann (Design) (powered by Haiku)')).toEqual({
      person: 'Ann (Design)',
      model: 'Haiku',
    });
    expect(parseSuggestionAuthor('Ann (Design)')).toEqual({ person: 'Ann (Design)' });
  });

  // Round-tripping is what lets the card split what the pipeline composed.
  it('round-trips through the card and back', () => {
    const cases = [
      { person: 'Eve', model: 'Haiku' },
      { person: 'Evangelina Marchetti-Okonkwo', model: 'Sonnet' },
      { person: 'Bo Chen' },
    ];
    for (const author of cases) {
      expect(parseSuggestionAuthor(formatSuggestionAuthor(author))).toEqual(author);
    }
  });

  // A blank name is a bug upstream; the card says "Unknown author" for it. This
  // must not turn into the string "undefined" on the way there.
  it('passes an empty name through rather than inventing one', () => {
    expect(suggestionAuthorLabel({ username: '' })).toBe('');
    expect(parseSuggestionAuthor(null)).toEqual({ person: '' });
    // Never the viewer, and never a model standing in for a missing person.
    expect(formatSuggestionAuthor({ person: '', model: 'Haiku' })).toBe('Haiku');
  });
});
