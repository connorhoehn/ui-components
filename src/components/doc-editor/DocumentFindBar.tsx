// src/components/doc-editor/DocumentFindBar.tsx
//
// Find and replace, the way a word processor does it.
//
// Selection rather than decorations: stepping to a match sets the editor's own
// selection, so the browser scrolls it into view and paints it with the same
// highlight the user already recognises. Highlighting EVERY match at once
// needs a ProseMirror decoration plugin and therefore a schema-level
// extension, which every page embedding this editor would have to register;
// this works against any editor, unregistered, today.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Editor } from '@tiptap/react';
import { cn } from '../../lib/cn';
import { findMatches, nextMatchIndex } from './findMatches';

export interface DocumentFindBarProps {
  editor: Editor | null;
  /** Closes the bar — Escape, or the × . */
  onClose: () => void;
  /** Hidden when the document cannot be edited; find still works. */
  canReplace?: boolean;
  'data-testid'?: string;
}

export function DocumentFindBar({
  editor,
  onClose,
  canReplace = true,
  'data-testid': testId = 'find-bar',
}: DocumentFindBarProps) {
  const [query, setQuery] = useState('');
  const [replacement, setReplacement] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Opening the bar should put the caret in it — the next thing anyone does is
  // type, and a find bar you have to click into is a find bar that cost you a
  // click every time.
  useEffect(() => { inputRef.current?.focus(); }, []);

  // Recomputed from the LIVE document, so a match list never outlives the text
  // it points into: replacing shifts every later position, and a stale list
  // would send the next step to the wrong place — or out of bounds.
  const matches = useMemo(
    () => findMatches(editor?.state.doc as never, query),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editor, query, editor?.state.doc],
  );

  const goTo = useCallback((i: number) => {
    if (!editor || matches.length === 0) return;
    const wrapped = ((i % matches.length) + matches.length) % matches.length;
    const m = matches[wrapped];
    setIndex(wrapped);
    // `scrollIntoView`, because a match below the fold that is selected but not
    // shown reads as "found nothing".
    editor.chain().focus().setTextSelection({ from: m.from, to: m.to }).scrollIntoView().run();
  }, [editor, matches]);

  const step = useCallback((direction: 1 | -1) => {
    if (!editor || matches.length === 0) return;
    const cursor = editor.state.selection.from + (direction === 1 ? 1 : 0);
    goTo(nextMatchIndex(matches, cursor, direction));
  }, [editor, matches, goTo]);

  const replaceCurrent = useCallback(() => {
    if (!editor || matches.length === 0) return;
    const m = matches[Math.min(index, matches.length - 1)];
    editor.chain().focus()
      .setTextSelection({ from: m.from, to: m.to })
      .insertContent(replacement)
      .run();
  }, [editor, matches, index, replacement]);

  const replaceAll = useCallback(() => {
    if (!editor || matches.length === 0) return;
    // Back to front: replacing shifts every position after the match, so going
    // forwards would invalidate the rest of the list on the first edit.
    const chain = editor.chain().focus();
    for (let i = matches.length - 1; i >= 0; i--) {
      chain.setTextSelection({ from: matches[i].from, to: matches[i].to }).insertContent(replacement);
    }
    chain.run();
  }, [editor, matches, replacement]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
    if (e.key === 'Enter') { e.preventDefault(); step(e.shiftKey ? -1 : 1); }
  };

  const field = 'h-7 rounded border border-border bg-surface px-2 text-xs text-text-primary';
  const btn = 'h-7 rounded px-2 text-xs cursor-pointer border-none bg-transparent text-text-secondary hover:bg-surface-hover disabled:opacity-40 disabled:cursor-default';

  return (
    <div
      data-testid={testId}
      role="search"
      aria-label="Find in document"
      className="flex items-center gap-1.5 border-b border-border bg-surface-panel px-3 py-1.5"
      onKeyDown={onKeyDown}
    >
      <input
        ref={inputRef}
        data-testid={`${testId}-query`}
        aria-label="Find"
        placeholder="Find in document"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setIndex(0); }}
        className={cn(field, 'w-[180px]')}
      />
      {/* The count is the whole feedback loop: it says "your term is in here,
          n times" before you have stepped anywhere. */}
      <span data-testid={`${testId}-count`} className="min-w-[68px] text-[11px] text-text-secondary">
        {query.trim().length === 0
          ? ''
          : matches.length === 0
            ? 'No results'
            : `${index + 1} of ${matches.length}`}
      </span>
      <button type="button" data-testid={`${testId}-prev`} className={btn} onClick={() => step(-1)} disabled={matches.length === 0} aria-label="Previous match">↑</button>
      <button type="button" data-testid={`${testId}-next`} className={btn} onClick={() => step(1)} disabled={matches.length === 0} aria-label="Next match">↓</button>

      {canReplace && (
        <>
          <span aria-hidden className="mx-1 h-4 w-px bg-border" />
          <input
            data-testid={`${testId}-replacement`}
            aria-label="Replace with"
            placeholder="Replace with"
            value={replacement}
            onChange={(e) => setReplacement(e.target.value)}
            className={cn(field, 'w-[150px]')}
          />
          <button type="button" data-testid={`${testId}-replace`} className={btn} onClick={replaceCurrent} disabled={matches.length === 0}>Replace</button>
          <button type="button" data-testid={`${testId}-replace-all`} className={btn} onClick={replaceAll} disabled={matches.length === 0}>All</button>
        </>
      )}

      <button type="button" data-testid={`${testId}-close`} className={cn(btn, 'ml-auto')} onClick={onClose} aria-label="Close find">✕</button>
    </div>
  );
}

export default DocumentFindBar;
