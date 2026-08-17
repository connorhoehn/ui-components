// Concurrent template application on a brand-new document.
//
// useDocumentEditorState auto-populates a new document from its document-type
// template, guarded by `meta.templateApplied` and `sections.length === 0`.
// Neither guard is safe across clients: `templateApplied` is a Y.Map key, so
// it is last-write-wins rather than a lock, and both clients read
// `sections.length === 0` before either has written.
//
// Two people opening the same new document at once therefore BOTH apply the
// template, and `addSection` pushes onto the shared Y.Array with no dedupe —
// so the document ends up with every section twice.
//
// These tests use two Y.Docs wired to each other, which is exactly the
// situation: local mutations first, merge afterwards.

import { describe, it, expect } from 'vitest';
import * as Y from 'yjs';
import { dedupeSectionsById, templateSectionId } from '../templateSections';

/** Apply updates from a to b and vice versa until both converge. */
function sync(a: Y.Doc, b: Y.Doc) {
  Y.applyUpdate(b, Y.encodeStateAsUpdate(a, Y.encodeStateVector(b)));
  Y.applyUpdate(a, Y.encodeStateAsUpdate(b, Y.encodeStateVector(a)));
}

function pushSection(doc: Y.Doc, id: string, title: string) {
  const sections = doc.getArray<Y.Map<unknown>>('sections');
  doc.transact(() => {
    const s = new Y.Map<unknown>();
    s.set('id', id);
    s.set('title', title);
    sections.push([s]);
  });
}

function ids(doc: Y.Doc) {
  return doc.getArray<Y.Map<unknown>>('sections').toArray().map((s) => s.get('id'));
}

describe('templateSectionId', () => {
  it('is deterministic for the same document and field', () => {
    expect(templateSectionId('doc-1', 'Summary'))
      .toBe(templateSectionId('doc-1', 'Summary'));
  });

  it('differs across fields and across documents', () => {
    expect(templateSectionId('doc-1', 'Summary'))
      .not.toBe(templateSectionId('doc-1', 'Tasks'));
    expect(templateSectionId('doc-1', 'Summary'))
      .not.toBe(templateSectionId('doc-2', 'Summary'));
  });

  it('produces ids that survive a round trip as a plain string key', () => {
    const id = templateSectionId('doc-1', 'A Field / With Punctuation!');
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });
});

describe('concurrent template application', () => {
  it('duplicates every section when both clients apply with random ids', () => {
    const a = new Y.Doc();
    const b = new Y.Doc();

    // Both clients see an empty doc and apply the two-field template.
    for (const title of ['Summary', 'Tasks']) pushSection(a, crypto.randomUUID(), title);
    for (const title of ['Summary', 'Tasks']) pushSection(b, crypto.randomUUID(), title);

    sync(a, b);

    // This is the bug: four sections, and the ids differ so nothing downstream
    // can tell which pair is the duplicate.
    expect(ids(a)).toHaveLength(4);
    expect(new Set(ids(a)).size).toBe(4);
  });

  it('deterministic ids make the duplicates identifiable', () => {
    const a = new Y.Doc();
    const b = new Y.Doc();

    for (const title of ['Summary', 'Tasks']) pushSection(a, templateSectionId('d', title), title);
    for (const title of ['Summary', 'Tasks']) pushSection(b, templateSectionId('d', title), title);

    sync(a, b);

    expect(ids(a)).toHaveLength(4);
    // ...but only two distinct ids, so a repair pass has something to work with.
    expect(new Set(ids(a)).size).toBe(2);
  });

  it('dedupe converges both clients on one copy of each section', () => {
    const a = new Y.Doc();
    const b = new Y.Doc();

    for (const title of ['Summary', 'Tasks']) pushSection(a, templateSectionId('d', title), title);
    for (const title of ['Summary', 'Tasks']) pushSection(b, templateSectionId('d', title), title);
    sync(a, b);

    // Both clients run the repair independently, with no coordination.
    dedupeSectionsById(a);
    dedupeSectionsById(b);
    sync(a, b);

    expect(ids(a)).toEqual([templateSectionId('d', 'Summary'), templateSectionId('d', 'Tasks')]);
    expect(ids(b)).toEqual(ids(a));
  });

  it('keeps the FIRST occurrence, which is the same index on every client', () => {
    // Y.Array order converges identically after merge, so "keep the first" is a
    // convergent rule — both clients delete the same entries and no section is
    // lost to a double-delete.
    const a = new Y.Doc();
    const b = new Y.Doc();
    pushSection(a, 's1', 'from-a');
    pushSection(b, 's1', 'from-b');
    sync(a, b);

    const firstTitle = a.getArray<Y.Map<unknown>>('sections').get(0).get('title');
    dedupeSectionsById(a);
    dedupeSectionsById(b);
    sync(a, b);

    const remaining = a.getArray<Y.Map<unknown>>('sections').toArray();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].get('title')).toBe(firstTitle);
    expect(b.getArray<Y.Map<unknown>>('sections')).toHaveLength(1);
  });

  it('is a no-op when there is nothing to dedupe', () => {
    const doc = new Y.Doc();
    pushSection(doc, 's1', 'one');
    pushSection(doc, 's2', 'two');
    dedupeSectionsById(doc);
    expect(ids(doc)).toEqual(['s1', 's2']);
  });

  it('leaves sections without an id alone rather than dropping them', () => {
    const doc = new Y.Doc();
    const sections = doc.getArray<Y.Map<unknown>>('sections');
    doc.transact(() => {
      const s = new Y.Map<unknown>();
      s.set('title', 'no id');
      sections.push([s]);
    });
    dedupeSectionsById(doc);
    expect(sections).toHaveLength(1);
  });
});
