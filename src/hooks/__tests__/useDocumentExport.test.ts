import { renderHook } from '@testing-library/react';
import * as Y from 'yjs';
import { useDocumentExport } from '../useDocumentExport';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildDoc() {
  const doc = new Y.Doc();
  const yMeta = doc.getMap('meta');
  yMeta.set('id', 'doc-1');
  yMeta.set('title', 'My Doc');
  yMeta.set('type', 'note');

  const ySections = doc.getArray('sections');
  const ySection = new Y.Map<unknown>();
  ySection.set('id', 's1');
  ySection.set('type', 'tasks');
  ySection.set('title', 'Tasks');

  const yItems = new Y.Array<Y.Map<unknown>>();
  const yItem = new Y.Map<unknown>();
  yItem.set('id', 'i1');
  yItem.set('text', 'Do the thing');
  yItem.set('status', 'pending');
  yItem.set('assignee', '');
  yItem.set('priority', 'high');
  yItems.push([yItem]);
  ySection.set('items', yItems);

  ySections.push([ySection]);
  return doc;
}

// ---------------------------------------------------------------------------
// exportJSON
// ---------------------------------------------------------------------------

describe('exportJSON', () => {
  it('returns null when ydoc is null', () => {
    const { result } = renderHook(() => useDocumentExport(null));
    expect(result.current.exportJSON()).toBeNull();
  });

  it('returns null when the meta map is empty (doc not yet loaded)', () => {
    const doc = new Y.Doc();
    const { result } = renderHook(() => useDocumentExport(doc));
    expect(result.current.exportJSON()).toBeNull();
    doc.destroy();
  });

  it('exports meta and sections as plain JSON', () => {
    const doc = buildDoc();
    const { result } = renderHook(() => useDocumentExport(doc));

    const exported = result.current.exportJSON();

    expect(exported).not.toBeNull();
    expect(exported!.meta.id).toBe('doc-1');
    expect(exported!.meta.title).toBe('My Doc');
    expect(exported!.sections).toHaveLength(1);
    expect(exported!.sections[0].id).toBe('s1');
    doc.destroy();
  });

  it('exports task items within sections', () => {
    const doc = buildDoc();
    const { result } = renderHook(() => useDocumentExport(doc));

    const exported = result.current.exportJSON()!;
    const items = exported.sections[0].items;
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('i1');
    expect(items[0].text).toBe('Do the thing');
    expect(items[0].priority).toBe('high');
    doc.destroy();
  });

  it('returns empty items array for a section with no Y.Array items', () => {
    const doc = new Y.Doc();
    const yMeta = doc.getMap('meta');
    yMeta.set('id', 'x');
    const ySections = doc.getArray('sections');
    const ySection = new Y.Map<unknown>();
    ySection.set('id', 's2');
    // no 'items' key set → should default to []
    ySections.push([ySection]);

    const { result } = renderHook(() => useDocumentExport(doc));
    const exported = result.current.exportJSON()!;
    expect(exported.sections[0].items).toEqual([]);
    doc.destroy();
  });
});
