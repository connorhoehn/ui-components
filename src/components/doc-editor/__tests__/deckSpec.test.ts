// The spec edits, without a DOM.
//
// These are the operations the editor's buttons call. Testing them here rather
// than only through the form means a reorder bug reads as "moveSlide put it in
// the wrong place" instead of "clicking the down arrow did something odd".

import { describe, expect, it } from 'vitest';
import {
  addSlide,
  canSaveDeck,
  duplicateSlide,
  moveSlide,
  nextRevisionLabel,
  nextSlideId,
  removeSlide,
  replaceSlide,
  uncitedSlideIds,
  withLayoutDefaults,
  type DeckSpec,
} from '../presentation/deckSpec';

const source = { documentId: 'doc-1', title: 'Sprint notes' };

function spec(): DeckSpec {
  return {
    title: 'Sprint review',
    slides: [
      { id: 's1', layout: 'title', title: 'Sprint review', sources: [source] },
      { id: 's2', layout: 'bullets', title: 'Delivery', bullets: ['One'], sources: [source] },
      { id: 's3', layout: 'quote', title: 'Voice', quote: { text: 'It shipped', by: 'Ada' }, sources: [source] },
    ],
  };
}

const ids = (value: DeckSpec) => value.slides.map((slide) => slide.id);

describe('moveSlide', () => {
  it('moves forwards and backwards', () => {
    expect(ids(moveSlide(spec(), 0, 2))).toEqual(['s2', 's3', 's1']);
    expect(ids(moveSlide(spec(), 2, 0))).toEqual(['s3', 's1', 's2']);
  });

  it('is a no-op outside the deck, and returns the same object so React can skip', () => {
    const before = spec();
    expect(moveSlide(before, 0, 0)).toBe(before);
    expect(moveSlide(before, 0, 9)).toBe(before);
    expect(moveSlide(before, -1, 1)).toBe(before);
  });
});

describe('addSlide / duplicateSlide / removeSlide', () => {
  it('inserts after the slide you were on, with an id nothing else has', () => {
    const next = addSlide(spec(), 0);
    expect(ids(next)).toEqual(['s1', 's4', 's2', 's3']);
    expect(next.slides[1].sources).toEqual([]);
  });

  it('copies a slide deeply, citations included', () => {
    const next = duplicateSlide(spec(), 's2');
    const copy = next.slides[2];
    expect(copy.id).not.toBe('s2');
    expect(copy.bullets).toEqual(['One']);
    expect(copy.bullets).not.toBe(next.slides[1].bullets);
    expect(copy.sources).toEqual([source]);
    expect(copy.sources[0]).not.toBe(source);
  });

  it('refuses to empty the deck', () => {
    const one: DeckSpec = { title: 'One', slides: [spec().slides[0]] };
    expect(removeSlide(one, 's1')).toBe(one);
  });
});

describe('withLayoutDefaults', () => {
  it('supplies the sub-object the new layout needs without discarding the old one', () => {
    const bullets = spec().slides[1];
    const asChart = withLayoutDefaults(bullets, 'chart');
    expect(asChart.chart?.kind).toBe('bar');
    expect(asChart.bullets).toEqual(['One']);
    expect(withLayoutDefaults(asChart, 'bullets').bullets).toEqual(['One']);
  });
});

describe('the grounding rule', () => {
  it('names every slide that cites nothing', () => {
    const value = spec();
    value.slides[1] = { ...value.slides[1], sources: [] };
    expect(uncitedSlideIds(value)).toEqual(['s2']);
    expect(canSaveDeck(value)).toBe(false);
    expect(canSaveDeck(spec())).toBe(true);
  });

  it('will not save a deck of no slides', () => {
    expect(canSaveDeck({ title: 'Empty', slides: [] })).toBe(false);
  });
});

describe('ids and labels', () => {
  it('skips an id the deck already has', () => {
    const taken: DeckSpec = { title: 'T', slides: [{ id: 's4', layout: 'title', title: 'A', sources: [source] }] };
    expect(nextSlideId(taken)).toBe('s2');
  });

  it('reads the next revision off the labels, not off the row count', () => {
    expect(nextRevisionLabel([{ label: 'v1' }, { label: 'v2' }])).toBe('v3');
    expect(nextRevisionLabel([{ label: 'v7' }])).toBe('v8');
    expect(nextRevisionLabel([])).toBe('v1');
  });
});

describe('replaceSlide', () => {
  it('leaves a spec that has no such slide untouched', () => {
    const before = spec();
    expect(replaceSlide(before, { id: 'nope', layout: 'title', title: 'X', sources: [] })).toBe(before);
  });
});
