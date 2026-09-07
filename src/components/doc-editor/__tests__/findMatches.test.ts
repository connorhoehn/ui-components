import { describe, it, expect } from 'vitest';
import { findMatches, nextMatchIndex, type TextWalkable } from '../findMatches';

/**
 * A stand-in for a ProseMirror doc: text nodes at known positions. The real
 * thing is a tree, but `descendants` is the only surface findMatches uses, and
 * position arithmetic is the whole point of testing this apart from the editor.
 */
function docOf(nodes: { text: string; pos: number }[]): TextWalkable {
  return {
    descendants(fn) {
      for (const n of nodes) fn({ isText: true, text: n.text }, n.pos);
    },
  };
}

describe('findMatches', () => {
  it('finds every occurrence, in document order', () => {
    const doc = docOf([{ text: 'the cat sat on the mat', pos: 1 }]);
    expect(findMatches(doc, 'the')).toEqual([
      { from: 1, to: 4 },
      { from: 16, to: 19 },
    ]);
  });

  it('ignores case by default, and respects it on request', () => {
    const doc = docOf([{ text: 'Cat cat CAT', pos: 1 }]);
    expect(findMatches(doc, 'cat')).toHaveLength(3);
    expect(findMatches(doc, 'cat', { caseSensitive: true })).toEqual([{ from: 5, to: 8 }]);
  });

  it('does not overlap matches — "aa" in "aaaa" is two, not three', () => {
    expect(findMatches(docOf([{ text: 'aaaa', pos: 1 }]), 'aa')).toEqual([
      { from: 1, to: 3 },
      { from: 3, to: 5 },
    ]);
  });

  it('matches nothing for an empty query rather than everything', () => {
    // The bar opens empty; selecting the whole document at that moment would
    // be the opposite of helpful.
    const doc = docOf([{ text: 'anything', pos: 1 }]);
    expect(findMatches(doc, '')).toEqual([]);
    expect(findMatches(doc, '   ')).toEqual([]);
  });

  it('converts an offset within a later text node to a document position', () => {
    // The arithmetic a component test cannot see.
    const doc = docOf([
      { text: 'first para', pos: 1 },
      { text: 'second needle here', pos: 20 },
    ]);
    expect(findMatches(doc, 'needle')).toEqual([{ from: 27, to: 33 }]);
  });

  it('survives an absent document', () => {
    expect(findMatches(null, 'x')).toEqual([]);
    expect(findMatches(undefined, 'x')).toEqual([]);
  });
});

describe('nextMatchIndex', () => {
  const matches = [
    { from: 5, to: 8 },
    { from: 20, to: 23 },
    { from: 40, to: 43 },
  ];

  it('steps from where the cursor is, not from the start', () => {
    expect(nextMatchIndex(matches, 10)).toBe(1);
  });

  it('treats the match the cursor sits on as the current one', () => {
    expect(nextMatchIndex(matches, 20)).toBe(1);
  });

  it('wraps forward past the last match', () => {
    expect(nextMatchIndex(matches, 100)).toBe(0);
  });

  it('goes backwards, and wraps', () => {
    expect(nextMatchIndex(matches, 25, -1)).toBe(1);
    expect(nextMatchIndex(matches, 0, -1)).toBe(2);
  });

  it('reports nothing to go to when there are no matches', () => {
    expect(nextMatchIndex([], 0)).toBe(-1);
  });
});
