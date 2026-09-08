// The scalar storage contract — and, more importantly, what happens when two
// people answer the same field at the same time.
//
// The renderers are cheap to test in isolation; the thing that would actually
// hurt in production is a merge that produces a value nobody typed. These
// tests drive the real Y.Doc write path (`ySection.set('metadata', obj)`, what
// useSectionList.updateSection does) across two documents and sync them.

import { describe, it, expect } from 'vitest';
import * as Y from 'yjs';
import type { Section } from '../../types/document';
import {
  readTextValue, readNumberValue, readBooleanValue, readDateValue,
  setScalarPatch, formatDateValue, formatNumberValue, legacyProseText,
} from '../scalarValue';

const mk = (metadata?: Record<string, unknown>): Section => ({
  id: 's1', type: 'notes', title: 'F', collapsed: false, items: [], metadata,
});

describe('reading a scalar', () => {
  it('distinguishes unanswered from zero / epoch / false', () => {
    expect(readNumberValue(mk())).toBeUndefined();
    expect(readNumberValue(mk({ value: 0 }))).toBe(0);
    expect(readBooleanValue(mk())).toBeUndefined();
    expect(readBooleanValue(mk({ value: false }))).toBe(false);
    expect(readDateValue(mk())).toBe('');
    expect(readTextValue(mk())).toBe('');
  });

  it('refuses garbage in the slot instead of rendering it', () => {
    expect(readTextValue(mk({ value: 7 }))).toBe('');
    expect(readNumberValue(mk({ value: Number.POSITIVE_INFINITY }))).toBeUndefined();
    expect(readBooleanValue(mk({ value: 1 }))).toBeUndefined();
    expect(readDateValue(mk({ value: '04/03/2026' }))).toBe('');
  });

  it('narrows an ISO timestamp to the calendar date', () => {
    expect(readDateValue(mk({ value: '2026-03-04T17:45:00Z' }))).toBe('2026-03-04');
  });
});

describe('writing a scalar', () => {
  it('preserves sibling metadata — the whole object is one CRDT register', () => {
    expect(setScalarPatch(mk({ links: [], alt: 'x' }), 'hi')).toEqual({
      metadata: { links: [], alt: 'x', value: 'hi' },
    });
  });

  it('unsetting DELETES the key rather than storing undefined', () => {
    const patch = setScalarPatch(mk({ value: 5, alt: 'x' }), undefined);
    expect(patch.metadata).toEqual({ alt: 'x' });
    expect('value' in (patch.metadata as object)).toBe(false);
  });
});

describe('formatting', () => {
  it('formats a date in UTC so it never slips a day westward', () => {
    // '2026-03-04' is UTC midnight; a local-timezone format renders Mar 3 in
    // the Americas. Assert the day number survives.
    expect(formatDateValue('2026-03-04')).toContain('4');
    expect(formatDateValue('2026-03-04')).toContain('2026');
  });

  it('leaves an unparseable date alone rather than printing Invalid Date', () => {
    expect(formatDateValue('not-a-date')).toBe('not-a-date');
  });

  it('does not round a value away while grouping it', () => {
    expect(formatNumberValue(1234.5678)).toContain('5678');
  });
});

// ---------------------------------------------------------------------------
// Concurrency — the real Y.js path
// ---------------------------------------------------------------------------

/** What useSectionList.updateSection does for a metadata patch. */
function applyPatch(doc: Y.Doc, patch: Partial<Section>): void {
  const sections = doc.getArray<Y.Map<unknown>>('sections');
  doc.transact(() => {
    sections.get(0).set('metadata', patch.metadata);
  });
}

function readMeta(doc: Y.Doc): Record<string, unknown> {
  return (doc.getArray<Y.Map<unknown>>('sections').get(0).get('metadata') ?? {}) as Record<string, unknown>;
}

function sectionOf(doc: Y.Doc): Section {
  return mk(readMeta(doc));
}

/** Two docs sharing one section, already in sync. */
function twoPeers(seed?: Record<string, unknown>): [Y.Doc, Y.Doc] {
  const a = new Y.Doc();
  const ySection = new Y.Map<unknown>();
  ySection.set('id', 's1');
  if (seed) ySection.set('metadata', seed);
  a.getArray<Y.Map<unknown>>('sections').push([ySection]);
  const b = new Y.Doc();
  Y.applyUpdate(b, Y.encodeStateAsUpdate(a));
  return [a, b];
}

function sync(a: Y.Doc, b: Y.Doc): void {
  const ua = Y.encodeStateAsUpdate(a);
  const ub = Y.encodeStateAsUpdate(b);
  Y.applyUpdate(a, ub);
  Y.applyUpdate(b, ua);
}

describe('two people answering the same field at once', () => {
  it('converges on ONE of the two dates — never a spliced third date', () => {
    const [a, b] = twoPeers();
    applyPatch(a, setScalarPatch(sectionOf(a), '2026-03-04'));
    applyPatch(b, setScalarPatch(sectionOf(b), '2026-11-22'));
    sync(a, b);

    const settled = readDateValue(sectionOf(a));
    expect(readDateValue(sectionOf(b))).toBe(settled);
    expect(['2026-03-04', '2026-11-22']).toContain(settled);
  });

  it('converges on one number, and both peers agree which', () => {
    const [a, b] = twoPeers();
    applyPatch(a, setScalarPatch(sectionOf(a), 2500));
    applyPatch(b, setScalarPatch(sectionOf(b), 9100));
    sync(a, b);
    expect(readNumberValue(sectionOf(a))).toBe(readNumberValue(sectionOf(b)));
    expect([2500, 9100]).toContain(readNumberValue(sectionOf(a)));
  });

  it('one peer answering while the other clears settles on answered-or-not, identically', () => {
    const [a, b] = twoPeers({ value: true });
    applyPatch(a, setScalarPatch(sectionOf(a), false));
    applyPatch(b, setScalarPatch(sectionOf(b), undefined));
    sync(a, b);
    expect(readBooleanValue(sectionOf(a))).toBe(readBooleanValue(sectionOf(b)));
  });

  it('a later edit on top of a merged value wins outright on both peers', () => {
    const [a, b] = twoPeers();
    applyPatch(a, setScalarPatch(sectionOf(a), 'Critical'));
    applyPatch(b, setScalarPatch(sectionOf(b), 'High'));
    sync(a, b);
    applyPatch(a, setScalarPatch(sectionOf(a), 'Medium'));
    sync(a, b);
    expect(readTextValue(sectionOf(a))).toBe('Medium');
    expect(readTextValue(sectionOf(b))).toBe('Medium');
  });

  it('a sibling renderer\'s metadata survives a scalar write', () => {
    const [a, b] = twoPeers({ links: [{ label: 'spec', url: 'https://x' }] });
    applyPatch(a, setScalarPatch(sectionOf(a), 'Open'));
    sync(a, b);
    expect(readMeta(b).links).toEqual([{ label: 'spec', url: 'https://x' }]);
    expect(readTextValue(sectionOf(b))).toBe('Open');
  });
});

// ---------------------------------------------------------------------------
// The pre-renderer prose these fields used to collect
// ---------------------------------------------------------------------------

describe('legacy prose carried by the section fragment', () => {
  it('reads the words out of the XmlFragment DefaultRenderer used to edit', () => {
    const doc = new Y.Doc();
    const frag = doc.getXmlFragment('section');
    const para = new Y.XmlElement('paragraph');
    para.insert(0, [new Y.XmlText('Critical — payment page 500s')]);
    frag.insert(0, [para]);

    expect(legacyProseText(frag)).toBe('Critical — payment page 500s');
  });

  it('is empty for an empty or absent fragment, so nothing renders', () => {
    expect(legacyProseText(null)).toBe('');
    expect(legacyProseText(undefined)).toBe('');
    expect(legacyProseText(new Y.Doc().getXmlFragment('section'))).toBe('');
  });
});
