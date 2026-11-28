// The six layouts and two chart kinds of the engine's 0.152.0 format, through
// the local mirror: the validator accepts what the engine accepts and refuses
// what it refuses, and the edit helpers move a slide between layouts the way
// they move the older ones.

import { describe, expect, it } from 'vitest';
import {
  SLIDE_LAYOUTS,
  SLIDE_LAYOUT_DESCRIPTIONS,
  SLIDE_LAYOUT_LABELS,
  addSlide,
  deckForEngine,
  duplicateSlide,
  isDeckThemeRef,
  makeSlide,
  slideForEngine,
  validateDeckSpec,
  withLayoutDefaults,
  type DeckSlide,
  type DeckSpec,
} from '../presentation/deckSpec';

const sources = [{ documentId: 'doc-1', title: 'Quarterly notes' }];

function deck(slide: Partial<DeckSlide> & Pick<DeckSlide, 'layout'>, extra: Partial<DeckSpec> = {}): unknown {
  return { title: 'Review', ...extra, slides: [{ id: 's1', title: 'A slide', sources, ...slide }] };
}

function errorsOf(input: unknown): string[] {
  const result = validateDeckSpec(input);
  return result.ok ? [] : result.errors;
}

function refuses(input: unknown, fragment: string) {
  const errors = errorsOf(input);
  expect(errors.length, `expected a refusal mentioning "${fragment}"`).toBeGreaterThan(0);
  expect(errors.join(' | ')).toContain(fragment);
}

const valid: Record<string, Partial<DeckSlide> & Pick<DeckSlide, 'layout'>> = {
  'key-figures': { layout: 'key-figures', figures: [{ value: '42%', label: 'Adoption', delta: '+8 pts' }, { value: '$1.2M', label: 'Saved' }] },
  table: { layout: 'table', table: { header: ['Team', 'Owner'], rows: [['Search', 'Ada'], ['Billing', '']] } },
  comparison: {
    layout: 'comparison',
    comparison: { left: { title: 'Build', points: ['Control'] }, right: { title: 'Buy', points: ['Speed'] }, verdict: 'Buy now, build later.' },
  },
  timeline: { layout: 'timeline', timeline: [{ date: 'Jan', label: 'Plan' }, { date: 'Mar', label: 'Build', detail: 'Two teams' }, { date: 'Jun', label: 'Ship' }] },
  agenda: { layout: 'agenda', agenda: { items: ['Where we are', 'What changed', 'Asks'], current: 1 } },
  closing: { layout: 'closing', closing: { line: 'Thank you', nextSteps: ['Approve the budget'], contact: 'The platform team' } },
};

describe('the layout list', () => {
  it('names and describes every layout, the six new ones included', () => {
    expect(SLIDE_LAYOUTS).toEqual([
      'title', 'section', 'bullets', 'two-column', 'chart', 'quote', 'image',
      'key-figures', 'table', 'comparison', 'timeline', 'agenda', 'closing',
      'big-quote', 'process', 'cards', 'matrix', 'big-number', 'image-text', 'image-full', 'people', 'funnel', 'kpi',
    ]);
    for (const layout of SLIDE_LAYOUTS) {
      expect(SLIDE_LAYOUT_LABELS[layout]).toBeTruthy();
      expect(SLIDE_LAYOUT_DESCRIPTIONS[layout]).toBeTruthy();
    }
  });
});

describe('validateDeckSpec: accepts the new layouts', () => {
  for (const [layout, slide] of Object.entries(valid)) {
    it(`accepts a valid ${layout} slide`, () => {
      expect(errorsOf(deck(slide))).toEqual([]);
    });
  }

  it('accepts the stacked-bar and pie kinds', () => {
    expect(errorsOf(deck({ layout: 'chart', chart: { kind: 'stacked-bar', labels: ['Q1', 'Q2'], series: [{ name: 'A', values: [1, 2] }, { name: 'B', values: [3, 4] }] } }))).toEqual([]);
    expect(errorsOf(deck({ layout: 'chart', chart: { kind: 'pie', labels: ['A', 'B', 'C'], series: [{ name: 'Share', values: [5, 0, 3] }] } }))).toEqual([]);
  });

  it('accepts a built-in theme or { ref }', () => {
    expect(errorsOf(deck(valid.agenda, { theme: 'plain' }))).toEqual([]);
    const result = validateDeckSpec(deck(valid.agenda, { theme: { ref: 'acme-brand' } }));
    expect(result.ok && result.spec.theme).toEqual({ ref: 'acme-brand' });
    expect(isDeckThemeRef({ ref: 'acme-brand' })).toBe(true);
    expect(isDeckThemeRef('plain')).toBe(false);
    expect(isDeckThemeRef(undefined)).toBe(false);
  });
});

describe('validateDeckSpec: refuses what the engine refuses', () => {
  it('key-figures: two to four figures, short values, a label each', () => {
    refuses(deck({ layout: 'key-figures', figures: [{ value: '1', label: 'One' }] }), 'expected 2 to 4');
    refuses(deck({ layout: 'key-figures', figures: Array.from({ length: 5 }, (_, i) => ({ value: `${i}`, label: 'x' })) }), 'expected 2 to 4');
    refuses(deck({ layout: 'key-figures', figures: [{ value: '1234567890123', label: 'Long' }, { value: '1', label: 'x' }] }), 'longer than 12');
    refuses(deck({ layout: 'key-figures', figures: [{ value: '1', label: '' }, { value: '1', label: 'x' }] }), 'label: required');
  });

  it('table: header of one to five, rows of the same width, at most eight, short cells', () => {
    refuses(deck({ layout: 'table', table: { header: ['A', 'B'], rows: [['only one']] } }), '1 cells for 2 columns');
    refuses(deck({ layout: 'table', table: { header: ['A'], rows: Array.from({ length: 9 }, () => ['x']) } }), 'the cap is 8');
    refuses(deck({ layout: 'table', table: { header: ['A', 'B', 'C', 'D', 'E', 'F'], rows: [['1', '2', '3', '4', '5', '6']] } }), 'the cap is 5');
    refuses(deck({ layout: 'table', table: { header: ['A'], rows: [['x'.repeat(41)]] } }), 'longer than 40');
    refuses(deck({ layout: 'table', table: { header: ['A'], rows: [] } }), 'at least one row');
  });

  it('comparison: two titled sides with points, a short verdict', () => {
    refuses(deck({ layout: 'comparison', comparison: { left: { title: 'A', points: ['x'] } } as never }), 'right: expected');
    refuses(deck({ layout: 'comparison', comparison: { left: { title: 'A', points: [] }, right: { title: 'B', points: ['y'] } } }), 'at least 1 needed');
    refuses(deck({ ...valid.comparison, comparison: { ...valid.comparison.comparison!, verdict: 'v'.repeat(141) } }), 'longer than 140');
  });

  it('timeline: three to six steps of date and label', () => {
    refuses(deck({ layout: 'timeline', timeline: valid.timeline.timeline!.slice(0, 2) }), 'expected 3 to 6');
    refuses(deck({ layout: 'timeline', timeline: Array.from({ length: 7 }, () => ({ date: 'Jan', label: 'x' })) }), 'expected 3 to 6');
    refuses(deck({ layout: 'timeline', timeline: [...valid.timeline.timeline!.slice(0, 2), { date: '', label: 'x' }] }), 'date: required');
  });

  it('agenda: up to six items, current is one of them', () => {
    refuses(deck({ layout: 'agenda', agenda: { items: Array.from({ length: 7 }, () => 'x') } }), 'the cap is 6');
    refuses(deck({ layout: 'agenda', agenda: { items: ['a', 'b'], current: 2 } }), 'current: must be');
  });

  it('closing: a line, up to three next steps, a short contact', () => {
    refuses(deck({ layout: 'closing', closing: { line: '' } }), 'line: required');
    refuses(deck({ layout: 'closing', closing: { line: 'Bye', nextSteps: ['a', 'b', 'c', 'd'] } }), 'the cap is 3');
    refuses(deck({ layout: 'closing', closing: { line: 'Bye', contact: 'c'.repeat(101) } }), 'longer than 100');
  });

  it('a layout needs its payload, and no other layout may carry it', () => {
    refuses(deck({ layout: 'timeline' }), "a 'timeline' slide needs timeline");
    refuses(deck({ layout: 'bullets', bullets: ['x'], table: valid.table.table }), "only a 'table' slide may carry table");
    refuses(deck({ ...valid.agenda, chart: { kind: 'bar', labels: ['a'], series: [{ name: 's', values: [1] }] } }), "only 'chart', 'kpi' slides may carry a chart");
  });

  it('pie: one series, at most six slices, no negative values, something above zero', () => {
    const pie = (labels: string[], series: { name: string; values: number[] }[]) => deck({ layout: 'chart', chart: { kind: 'pie', labels, series } });
    refuses(pie(['a', 'b'], [{ name: 'x', values: [1, 2] }, { name: 'y', values: [1, 2] }]), 'exactly one series');
    refuses(pie(['a', 'b', 'c', 'd', 'e', 'f', 'g'], [{ name: 'x', values: [1, 1, 1, 1, 1, 1, 1] }]), 'at most 6 slices');
    refuses(pie(['a', 'b'], [{ name: 'x', values: [1, -1] }]), '0 or more');
    refuses(pie(['a', 'b'], [{ name: 'x', values: [0, 0] }]), 'at least one value above 0');
    refuses(deck({ layout: 'chart', chart: { kind: 'area' as never, labels: ['a'], series: [{ name: 'x', values: [1] }] } }), "'stacked-bar' or 'pie'");
  });

  it('a theme names, never describes', () => {
    refuses(deck(valid.agenda, { theme: { ref: 'acme', colors: { accent: 'red' } } as never }), 'never describes it');
    refuses(deck(valid.agenda, { theme: { ref: 'not ok!' } }), 'deck.theme.ref');
    refuses(deck(valid.agenda, { theme: 'neon' as never }), 'deck.theme');
  });
});

describe('edit helpers on the new layouts', () => {
  const NEW = ['key-figures', 'table', 'comparison', 'timeline', 'agenda', 'closing'] as const;

  it('a new slide of each layout carries the payload the engine expects, in its smallest shape', () => {
    expect(makeSlide('s9', 'key-figures').figures).toHaveLength(2);
    expect(makeSlide('s9', 'table').table).toEqual({ header: ['', ''], rows: [['', '']] });
    expect(makeSlide('s9', 'comparison').comparison?.left.points).toEqual(['']);
    expect(makeSlide('s9', 'timeline').timeline).toHaveLength(3);
    expect(makeSlide('s9', 'agenda').agenda).toEqual({ items: [''] });
    expect(makeSlide('s9', 'closing').closing).toEqual({ line: '' });
  });

  it('a new slide, filled in, is one the engine accepts', () => {
    for (const layout of NEW) {
      const spec = addSlide({ title: 'Deck', slides: [{ id: 's1', layout: 'title', title: 'Deck', sources }] }, 0, layout);
      const added = spec.slides[1];
      expect(added.layout).toBe(layout);
      const filled: DeckSlide = { ...valid[layout], id: added.id, title: 'Filled', sources };
      expect(errorsOf({ ...spec, slides: [spec.slides[0], filled] })).toEqual([]);
    }
  });

  it('changing layout keeps the title, bullets, notes and sources, and the payload is dropped only from what is saved', () => {
    const start: DeckSlide = { id: 's1', layout: 'bullets', title: 'Plan', eyebrow: 'Q3', bullets: ['One'], notes: 'Say it slowly', sources };
    for (const layout of NEW) {
      const moved = withLayoutDefaults(start, layout);
      expect(moved).toMatchObject({ layout, title: 'Plan', eyebrow: 'Q3', bullets: ['One'], notes: 'Say it slowly', sources });
      const back = withLayoutDefaults(moved, 'bullets');
      // Kept while editing, so switching back and forth loses nothing …
      expect(back.bullets).toEqual(['One']);
      // … and dropped on the way to the engine, which refuses it on a bullets slide.
      const saved = slideForEngine(back);
      expect(Object.keys(saved).sort()).toEqual(['bullets', 'eyebrow', 'id', 'layout', 'notes', 'sources', 'title']);
    }
  });

  it('two columns become the two sides of a comparison', () => {
    const cols: DeckSlide = { id: 's1', layout: 'two-column', title: 'Options', columns: [['Fast'], ['Cheap', 'Slow']], sources };
    expect(withLayoutDefaults(cols, 'comparison').comparison).toEqual({
      left: { title: '', points: ['Fast'] },
      right: { title: '', points: ['Cheap', 'Slow'] },
    });
  });

  it('deckForEngine leaves a clean deck as the same object and cleans a stale one', () => {
    const clean = deck(valid.table) as DeckSpec;
    expect(deckForEngine(clean)).toBe(clean);
    const stale: DeckSpec = { title: 'x', slides: [{ ...(valid.table as DeckSlide), id: 's1', title: 'T', sources, figures: valid['key-figures'].figures }] };
    const out = deckForEngine(stale);
    expect(out.slides[0].figures).toBeUndefined();
    expect(out.slides[0].table).toEqual(valid.table.table);
    expect(errorsOf(out)).toEqual([]);
  });

  it('duplicates each new payload deeply', () => {
    for (const layout of NEW) {
      const original: DeckSlide = { ...valid[layout], id: 's1', title: 'T', sources };
      const spec: DeckSpec = { title: 'x', slides: [original] };
      const copy = duplicateSlide(spec, 's1').slides[1];
      expect(copy.id).toBe('s2');
      expect({ ...copy, id: 's1' }).toEqual(original);
      const field = Object.keys(valid[layout]).find((key) => key !== 'layout') as keyof DeckSlide;
      expect(copy[field]).not.toBe(original[field]);
      expect(Object.keys(copy)).not.toContain('chart');
    }
  });
});
