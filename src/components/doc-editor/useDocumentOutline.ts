// The document's headings, kept in step with the document.
//
// Derived from the ProseMirror document rather than from the DOM, because a
// canvas heading carries NO id — there is nothing in the rendered page to
// address it by. A ProseMirror position is the address, and it is also what
// scrolls to it, so the outline never depends on the document being marked up
// specially for its benefit.

import { useCallback, useEffect, useState } from 'react';
import type { OutlineEntry } from './DocumentOutline';

/**
 * The slice of a Tiptap editor this needs.
 *
 * Structural on purpose: ui-components keeps the tiptap packages as optional
 * peers, and an outline is not a reason for a host to install them.
 */
export interface OutlineEditorLike {
  state: {
    doc: {
      descendants(fn: (node: OutlineNodeLike, pos: number) => void): void;
    };
  };
  view: { domAtPos(pos: number): { node: Node } };
  on(event: 'update', cb: () => void): void;
  off(event: 'update', cb: () => void): void;
}

interface OutlineNodeLike {
  type: { name: string };
  attrs?: Record<string, unknown>;
  textContent?: string;
}

/** Walk the document once and collect its headings, in order. */
export function readOutline(editor: OutlineEditorLike | null): OutlineEntry[] {
  // Defensive rather than fussy: the host hands this the editor as it exists
  // right now, which during initialisation is an object without a state yet.
  // Reaching straight for `state.doc` threw and took the whole document view
  // down with it — an outline is the last thing that should be able to do
  // that.
  const walk = editor?.state?.doc?.descendants;
  if (!editor || typeof walk !== 'function') return [];
  const out: OutlineEntry[] = [];
  editor.state.doc.descendants((node, pos) => {
    if (node.type?.name !== 'heading') return;
    const raw = node.attrs?.level;
    out.push({
      id: String(pos),
      text: (node.textContent ?? '').trim(),
      level: typeof raw === 'number' ? raw : 1,
    });
  });
  return out;
}

/** The DOM element a heading position renders as, if it is on screen. */
export function elementForPosition(
  editor: OutlineEditorLike | null,
  id: string,
): Element | null {
  if (!editor) return null;
  const pos = Number(id);
  if (!Number.isFinite(pos)) return null;
  if (typeof editor.view?.domAtPos !== 'function') return null;
  try {
    // +1 steps INTO the heading, whose child is a text node; the heading
    // element itself is that node's parent.
    const { node } = editor.view.domAtPos(pos + 1);
    const el = node.nodeType === Node.ELEMENT_NODE ? (node as Element) : node.parentElement;
    return el?.closest('h1,h2,h3,h4,h5,h6') ?? el;
  } catch {
    // A position that no longer exists is not an error: the document changed
    // under a stale entry, and the next update will replace it.
    return null;
  }
}

export interface UseDocumentOutlineResult {
  entries: OutlineEntry[];
  activeId: string | null;
  /** Scroll the document to an entry and mark it current. */
  goTo: (id: string) => void;
}

export function useDocumentOutline(
  editor: OutlineEditorLike | null,
): UseDocumentOutlineResult {
  const [entries, setEntries] = useState<OutlineEntry[]>(() => readOutline(editor));
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!editor) {
      setEntries([]);
      return;
    }
    const refresh = () => setEntries(readOutline(editor));
    refresh();
    if (typeof editor.on !== 'function' || typeof editor.off !== 'function') return;
    editor.on('update', refresh);
    return () => editor.off('update', refresh);
  }, [editor]);

  const goTo = useCallback(
    (id: string) => {
      const el = elementForPosition(editor, id);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    },
    [editor],
  );

  return { entries, activeId, goTo };
}


/**
 * How long the document is.
 *
 * Counted from the document's own text rather than by adding Tiptap's
 * CharacterCount extension. That extension lives in `@tiptap/extensions`,
 * which is not in this package's optional-peer set — the packaging test
 * rejected it, correctly: a word count is not worth making every host that
 * imports the doc editor install another package.
 *
 * Whitespace-separated runs, which is what a word processor means by "words".
 * Null only when there is no document to count.
 */
export function readWordCount(editor: OutlineEditorLike | null): number | null {
  const doc = (editor as unknown as { state?: { doc?: { textBetween?: unknown; textContent?: string } } } | null)
    ?.state?.doc;
  if (!doc) return null;
  // `textContent` concatenates without separators, so two block nodes would
  // otherwise fuse their last and first words into one.
  let text = '';
  const walk = (editor as OutlineEditorLike).state?.doc?.descendants;
  if (typeof walk === 'function') {
    (editor as OutlineEditorLike).state.doc.descendants((node) => {
      const t = (node as { text?: string; textContent?: string }).text;
      if (typeof t === 'string') text += `${t} `;
    });
  } else if (typeof doc.textContent === 'string') {
    text = doc.textContent;
  }
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

/** Live word count, kept in step with the document. */
export function useDocumentWordCount(editor: OutlineEditorLike | null): number | null {
  const [words, setWords] = useState<number | null>(() => readWordCount(editor));

  useEffect(() => {
    if (!editor) {
      setWords(null);
      return;
    }
    const refresh = () => setWords(readWordCount(editor));
    refresh();
    if (typeof editor.on !== 'function' || typeof editor.off !== 'function') return;
    editor.on('update', refresh);
    return () => editor.off('update', refresh);
  }, [editor]);

  return words;
}
