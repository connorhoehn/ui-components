import { renderHook, act } from '@testing-library/react';
import * as Y from 'yjs';
import { useDocumentMetadata } from '../useDocumentMetadata';
import type { DocumentMeta } from '../../types/document';

function seedMeta(ydoc: Y.Doc, data: Partial<DocumentMeta>) {
  const yMeta = ydoc.getMap('meta');
  ydoc.transact(() => {
    for (const [k, v] of Object.entries(data)) yMeta.set(k, v);
  });
}

describe('useDocumentMetadata', () => {
  it('returns null meta when ydoc is null', () => {
    const { result } = renderHook(() => useDocumentMetadata(null));
    expect(result.current.meta).toBeNull();
  });

  it('returns null when the meta map is empty', () => {
    const ydoc = new Y.Doc();
    const { result } = renderHook(() => useDocumentMetadata(ydoc));
    expect(result.current.meta).toBeNull();
  });

  it('reads existing meta from the Y.Doc immediately', () => {
    const ydoc = new Y.Doc();
    seedMeta(ydoc, { title: 'Hello', status: 'active' });
    const { result } = renderHook(() => useDocumentMetadata(ydoc));
    expect(result.current.meta?.title).toBe('Hello');
    expect(result.current.meta?.status).toBe('active');
  });

  it('updates state when meta changes via updateMeta', () => {
    const ydoc = new Y.Doc();
    seedMeta(ydoc, { title: 'Original' });
    const { result } = renderHook(() => useDocumentMetadata(ydoc));

    act(() => { result.current.updateMeta({ title: 'Updated' }); });

    expect(result.current.meta?.title).toBe('Updated');
  });

  it('updateMeta merges fields without clearing others', () => {
    const ydoc = new Y.Doc();
    seedMeta(ydoc, { title: 'Doc', status: 'active' });
    const { result } = renderHook(() => useDocumentMetadata(ydoc));

    act(() => { result.current.updateMeta({ status: 'archived' }); });

    expect(result.current.meta?.title).toBe('Doc');
    expect(result.current.meta?.status).toBe('archived');
  });

  it('updateMeta is a no-op when ydoc is null', () => {
    const { result } = renderHook(() => useDocumentMetadata(null));
    expect(() => { result.current.updateMeta({ title: 'x' }); }).not.toThrow();
    expect(result.current.meta).toBeNull();
  });

  it('clears meta when ydoc switches to null', () => {
    let ydoc: Y.Doc | null = new Y.Doc();
    seedMeta(ydoc, { title: 'Live' });
    const { result, rerender } = renderHook(() => useDocumentMetadata(ydoc));
    expect(result.current.meta?.title).toBe('Live');

    ydoc = null;
    rerender();
    expect(result.current.meta).toBeNull();
  });
});
