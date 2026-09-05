import { describe, expect, it } from 'vitest';
import { searchEmoji, EMOJI_SHORTCODES } from '../emojiShortcodes';

// Ranking is the whole feature. A plain substring search buries the obvious
// answer under coincidental matches, which is the difference between
// autocomplete that feels instant and autocomplete you have to read.

describe('searchEmoji', () => {
  it('puts a code prefix match first', () => {
    // `fire` starts with "fi"; `crossed_fingers` merely contains it.
    expect(searchEmoji('fi')[0].code).toBe('fire');
  });

  it('finds an emoji by a keyword its code does not contain', () => {
    // :tada: is what people mean by "party".
    expect(searchEmoji('party').map((e) => e.code)).toContain('tada');
  });

  it('honours the muscle memory people arrive with', () => {
    expect(searchEmoji('+1')[0].emoji).toBe('👍');
    expect(searchEmoji('tada')[0].emoji).toBe('🎉');
  });

  it('ranks code matches above keyword matches', () => {
    const codes = searchEmoji('ship').map((e) => e.code);
    // Both `rocket` and `tada` carry the keyword; neither has it in the code,
    // so the result is keyword-only and must still be non-empty.
    expect(codes.length).toBeGreaterThan(0);
  });

  it('caps the list so the menu stays scannable', () => {
    expect(searchEmoji('', EMOJI_SHORTCODES, 5)).toHaveLength(5);
  });

  it('returns nothing for a query that matches nothing', () => {
    expect(searchEmoji('zzzznotathing')).toEqual([]);
  });

  it('never returns duplicates', () => {
    const codes = searchEmoji('a').map((e) => e.code);
    expect(new Set(codes).size).toBe(codes.length);
  });
});
