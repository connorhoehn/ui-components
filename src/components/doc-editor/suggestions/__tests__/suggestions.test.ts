// frontend/src/editor/suggestions/__tests__/suggestions.test.ts
//
// Track changes, tested through the real Tiptap dispatch path.

import { describe, it, expect, afterEach } from 'vitest';
import { DOMParser, DOMSerializer } from '@tiptap/pm/model';

// Through the public barrel — this also smoke-tests that importing the feature
// (which pulls in suggestions.css) doesn't blow up outside a browser.
import { listSuggestions, finalDoc, originalDoc, SUGGESTION_DATE_BUCKET_MS } from '..';
import { suggestChangesKey } from '../vendor';
import {
  AUTHOR_A,
  AUTHOR_B,
  T0,
  createTestEditor,
  markSpecOf,
  marksOf,
  textOf,
  type TestEditorHandle,
} from './testEditor';

const MINUTE = 60 * 1000;

// "Hello brave world" — 'brave ' is positions 7..13, the space before it is 6.
const HELLO = '<p>Hello brave world</p>';

let open: TestEditorHandle[] = [];

function editorFor(options: Parameters<typeof createTestEditor>[0] = {}) {
  const handle = createTestEditor(options);
  open.push(handle);
  return handle;
}

afterEach(() => {
  open.forEach((h) => h.destroy());
  open = [];
});

describe('suggestion mode toggle', () => {
  it('edits directly while the mode is off', () => {
    const { editor } = editorFor({ content: HELLO });

    editor.commands.deleteRange({ from: 7, to: 13 });

    expect(textOf(editor)).toBe('Hello world');
    expect(marksOf(editor, 'suggestionDelete')).toHaveLength(0);
    expect(listSuggestions(editor.state.doc)).toHaveLength(0);
  });

  it('suggests instead of editing while the mode is on', () => {
    const { editor } = editorFor({ content: HELLO });

    editor.commands.setSuggestionMode(true);
    editor.commands.deleteRange({ from: 7, to: 13 });

    // The text is still there — it is marked for deletion, not deleted.
    expect(textOf(editor)).toBe('Hello brave world');
    expect(marksOf(editor, 'suggestionDelete')).toEqual([
      { text: 'brave ', attrs: { user: AUTHOR_A.id, username: AUTHOR_A.name, date: T0 } },
    ]);
  });

  it('goes back to direct editing when switched off again', () => {
    const { editor } = editorFor({ content: HELLO });

    editor.commands.setSuggestionMode(true);
    expect(suggestChangesKey.getState(editor.state)?.enabled).toBe(true);

    editor.commands.toggleSuggestionMode();
    expect(suggestChangesKey.getState(editor.state)?.enabled).toBe(false);

    editor.commands.deleteRange({ from: 7, to: 13 });
    expect(textOf(editor)).toBe('Hello world');
    expect(marksOf(editor, 'suggestionDelete')).toHaveLength(0);
  });

  it('does NOT re-track a transaction that arrived from a remote Yjs peer', () => {
    // The single most dangerous failure mode under collaboration: a peer's edit
    // reaches dispatch as an ordinary transaction. Re-tracking it would record
    // their change as OUR suggestion, on every peer, forever.
    const { editor } = editorFor({ content: HELLO });
    editor.commands.setSuggestionMode(true);

    const tr = editor.state.tr.delete(7, 13);
    tr.setMeta('y-sync$', { isChangeOrigin: true });
    editor.view.dispatch(tr);

    expect(textOf(editor)).toBe('Hello world');
    expect(marksOf(editor, 'suggestionDelete')).toHaveLength(0);
  });
});

describe('authorship attribution', () => {
  it('survives a JSON round trip', () => {
    const { editor } = editorFor({ content: HELLO });
    editor.commands.setSuggestionMode(true);
    editor.commands.insertContentAt(6, ' very');

    const roundTripped = editor.schema.nodeFromJSON(editor.state.doc.toJSON());

    const suggestions = listSuggestions(roundTripped);
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]!.id).toEqual({
      user: AUTHOR_A.id,
      username: AUTHOR_A.name,
      date: T0,
    });
    expect(suggestions[0]!.insertedText).toBe(' very');
  });

  it('survives a DOM round trip', () => {
    // The HTML path is how a suggestion reaches the clipboard, an export, or a
    // server-rendered preview. If the identity attrs don't make the trip the
    // suggestion arrives anonymous.
    const { editor } = editorFor({ content: HELLO });
    editor.commands.setSuggestionMode(true);
    editor.commands.deleteRange({ from: 7, to: 13 });

    const serializer = DOMSerializer.fromSchema(editor.schema);
    const container = document.createElement('div');
    container.appendChild(serializer.serializeFragment(editor.state.doc.content));

    // The attribution really is in the markup, not just in memory.
    expect(container.innerHTML).toContain(`data-suggestion-user="${AUTHOR_A.id}"`);
    expect(container.innerHTML).toContain(`data-suggestion-date="${T0}"`);

    const reparsed = DOMParser.fromSchema(editor.schema).parse(container);

    const suggestions = listSuggestions(reparsed);
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]!.id).toEqual({
      user: AUTHOR_A.id,
      username: AUTHOR_A.name,
      date: T0,
    });
    expect(suggestions[0]!.deletedText).toBe('brave ');
  });

  it('ignores <del>/<ins> markup that carries no attribution', () => {
    // Pasting from elsewhere must not manufacture an anonymous suggestion.
    const { editor } = editorFor({ content: HELLO });
    const container = document.createElement('div');
    container.innerHTML = '<p>Hello <del>brave </del><ins>bold </ins>world</p>';

    const parsed = DOMParser.fromSchema(editor.schema).parse(container);

    expect(listSuggestions(parsed)).toHaveLength(0);
  });
});

describe('one suggestion, several blocks', () => {
  it('keeps the inserted text apart per block, so an appended rule, table and paragraph do not run together', () => {
    // Built as the agent writes it — marks straight onto the text of two
    // blocks under ONE identity — rather than through an editor transaction.
    const { editor } = editorFor({ content: HELLO });
    const mark = { type: 'suggestionInsert', attrs: { user: AUTHOR_A.id, username: AUTHOR_A.name, date: T0 } };
    const doc = editor.schema.nodeFromJSON({
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] },
        { type: 'paragraph', content: [{ type: 'text', text: '| Column 1 | Column 2 |', marks: [mark] }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Placeholder text', marks: [mark] }] },
      ],
    });

    const suggestions = listSuggestions(doc);
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]!.insertedBlocks).toEqual(['| Column 1 | Column 2 |', 'Placeholder text']);
    expect(suggestions[0]!.insertedText).toBe('| Column 1 | Column 2 |Placeholder text');
  });
});

describe("excludes: '' — two authors' overlapping suggestions", () => {
  // ==========================================================================
  // THE REGRESSION THIS FILE EXISTS FOR.
  //
  // Our suggestion marks declare `excludes: ''`. A ProseMirror mark excludes
  // ITSELF by default, which means `addToSet` REPLACES an existing mark of the
  // same type carrying different attrs. Restore the default (or upstream's
  // "insertion deletion modification" chain) and the second reviewer's
  // suggestion silently evicts the first reviewer's — no error, no warning,
  // just one person's review comment gone. Under Yjs, WHICH one is lost is a
  // race between peers.
  //
  // Both tests below go red the moment `excludes` is changed in marks.ts.
  // ==========================================================================

  it('declares excludes as the empty string on all three marks', () => {
    const { editor } = editorFor();

    for (const name of ['suggestionInsert', 'suggestionDelete', 'suggestionModify']) {
      expect(markSpecOf(editor, name).excludes).toBe('');
      expect(markSpecOf(editor, name).inclusive).toBe(false);
    }
  });

  it('keeps BOTH authors when they suggest deleting the same words', () => {
    // Author A suggests removing "brave ".
    const first = editorFor({ user: AUTHOR_A, content: HELLO });
    first.editor.commands.setSuggestionMode(true);
    first.editor.commands.deleteRange({ from: 7, to: 13 });

    // The document replicates to author B, who independently suggests the same
    // deletion. This is exactly the shape of two reviewers working at once.
    const second = editorFor({ user: AUTHOR_B, content: HELLO });
    second.editor.commands.setContent(first.editor.getJSON());
    second.editor.commands.setSuggestionMode(true);
    second.editor.commands.deleteRange({ from: 7, to: 13 });

    const deletions = marksOf(second.editor, 'suggestionDelete');
    const authors = deletions.map((m) => m.attrs['user']).sort();

    expect(authors).toEqual([AUTHOR_A.id, AUTHOR_B.id]);
    expect(listSuggestions(second.editor.state.doc)).toHaveLength(2);
  });

  it('lets each author be resolved independently', () => {
    const first = editorFor({ user: AUTHOR_A, content: HELLO });
    first.editor.commands.setSuggestionMode(true);
    first.editor.commands.deleteRange({ from: 7, to: 13 });

    const second = editorFor({ user: AUTHOR_B, content: HELLO });
    second.editor.commands.setContent(first.editor.getJSON());
    second.editor.commands.setSuggestionMode(true);
    second.editor.commands.deleteRange({ from: 7, to: 13 });

    const [suggestionA, suggestionB] = listSuggestions(second.editor.state.doc);
    expect(suggestionA!.id.user).toBe(AUTHOR_A.id);
    expect(suggestionB!.id.user).toBe(AUTHOR_B.id);

    // Reject A's. B's must still be standing.
    second.editor.commands.rejectSuggestion(suggestionA!.id);

    const remaining = listSuggestions(second.editor.state.doc);
    expect(remaining).toHaveLength(1);
    expect(remaining[0]!.id.user).toBe(AUTHOR_B.id);
    expect(remaining[0]!.deletedText).toBe('brave ');
    expect(textOf(second.editor)).toBe('Hello brave world');
  });
});

describe('accept and reject', () => {
  it('accepting a deletion removes the text', () => {
    const { editor } = editorFor({ content: HELLO });
    editor.commands.setSuggestionMode(true);
    editor.commands.deleteRange({ from: 7, to: 13 });

    const [suggestion] = listSuggestions(editor.state.doc);
    editor.commands.acceptSuggestion(suggestion!.id);

    expect(textOf(editor)).toBe('Hello world');
    expect(listSuggestions(editor.state.doc)).toHaveLength(0);
  });

  it('rejecting a deletion restores the text and clears the mark', () => {
    const { editor } = editorFor({ content: HELLO });
    editor.commands.setSuggestionMode(true);
    editor.commands.deleteRange({ from: 7, to: 13 });

    const [suggestion] = listSuggestions(editor.state.doc);
    editor.commands.rejectSuggestion(suggestion!.id);

    expect(textOf(editor)).toBe('Hello brave world');
    expect(marksOf(editor, 'suggestionDelete')).toHaveLength(0);
  });

  it('accepting an insertion keeps the text and clears the mark', () => {
    const { editor } = editorFor({ content: HELLO });
    editor.commands.setSuggestionMode(true);
    editor.commands.insertContentAt(6, ' very');

    const [suggestion] = listSuggestions(editor.state.doc);
    editor.commands.acceptSuggestion(suggestion!.id);

    expect(textOf(editor)).toBe('Hello very brave world');
    expect(marksOf(editor, 'suggestionInsert')).toHaveLength(0);
  });

  it('rejecting an insertion removes the text', () => {
    const { editor } = editorFor({ content: HELLO });
    editor.commands.setSuggestionMode(true);
    editor.commands.insertContentAt(6, ' very');

    const [suggestion] = listSuggestions(editor.state.doc);
    editor.commands.rejectSuggestion(suggestion!.id);

    expect(textOf(editor)).toBe('Hello brave world');
    expect(listSuggestions(editor.state.doc)).toHaveLength(0);
  });

  it('accepts every suggestion at once', () => {
    const { editor } = editorFor({ content: HELLO });
    editor.commands.setSuggestionMode(true);
    editor.commands.deleteRange({ from: 7, to: 13 });
    editor.commands.insertContentAt(6, ' bold');

    expect(listSuggestions(editor.state.doc)).toHaveLength(1);

    editor.commands.acceptAllSuggestions();

    expect(textOf(editor)).toBe('Hello bold world');
    expect(listSuggestions(editor.state.doc)).toHaveLength(0);
  });

  it('rejects every suggestion at once, returning the original text', () => {
    const { editor } = editorFor({ content: HELLO });
    editor.commands.setSuggestionMode(true);
    editor.commands.deleteRange({ from: 7, to: 13 });
    editor.commands.insertContentAt(6, ' bold');

    editor.commands.rejectAllSuggestions();

    expect(textOf(editor)).toBe('Hello brave world');
    expect(listSuggestions(editor.state.doc)).toHaveLength(0);
  });

  it('previews both outcomes without touching the live document', () => {
    const { editor } = editorFor({ content: HELLO });
    editor.commands.setSuggestionMode(true);
    editor.commands.deleteRange({ from: 7, to: 13 });

    const live = editor.state.doc;
    const asAccepted = finalDoc(live);
    const asRejected = originalDoc(live);

    expect(asAccepted.textContent).toBe('Hello world');
    expect(asRejected.textContent).toBe('Hello brave world');
    // The live doc still holds the un-resolved suggestion.
    expect(editor.state.doc).toBe(live);
    expect(listSuggestions(editor.state.doc)).toHaveLength(1);
  });
});

describe('ten-minute bucketing', () => {
  it('joins one author’s adjacent edits inside the same bucket', () => {
    const handle = editorFor({ user: AUTHOR_A, content: HELLO });
    handle.editor.commands.setSuggestionMode(true);

    handle.editor.commands.insertContentAt(6, ' v');
    handle.setNow(T0 + 5 * MINUTE);
    handle.editor.commands.insertContentAt(8, 'ery');

    const suggestions = listSuggestions(handle.editor.state.doc);
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]!.insertedText).toBe(' very');
    expect(suggestions[0]!.id.date).toBe(T0);

    // ProseMirror joined the two runs into ONE text node, because the marks are
    // Mark.eq-equal. That is what stops a paragraph of typing from becoming
    // forty separate review items.
    expect(marksOf(handle.editor, 'suggestionInsert')).toEqual([
      { text: ' very', attrs: { user: AUTHOR_A.id, username: AUTHOR_A.name, date: T0 } },
    ]);
  });

  it('splits the same author’s edits across a bucket boundary', () => {
    const handle = editorFor({ user: AUTHOR_A, content: HELLO });
    handle.editor.commands.setSuggestionMode(true);

    handle.editor.commands.insertContentAt(6, ' v');
    handle.setNow(T0 + SUGGESTION_DATE_BUCKET_MS + MINUTE);
    handle.editor.commands.insertContentAt(8, 'ery');

    const suggestions = listSuggestions(handle.editor.state.doc);
    expect(suggestions).toHaveLength(2);
    expect(suggestions.map((s) => s.id.date)).toEqual([
      T0,
      T0 + SUGGESTION_DATE_BUCKET_MS,
    ]);
    expect(suggestions.map((s) => s.insertedText)).toEqual([' v', 'ery']);
  });

  it('never joins two different authors, however close in time', () => {
    const first = editorFor({ user: AUTHOR_A, content: HELLO });
    first.editor.commands.setSuggestionMode(true);
    first.editor.commands.insertContentAt(6, ' v');

    const second = editorFor({ user: AUTHOR_B, content: HELLO });
    second.editor.commands.setContent(first.editor.getJSON());
    second.editor.commands.setSuggestionMode(true);
    // Same instant, immediately adjacent position — the hardest case for the
    // "join adjacent edits" rule to get right.
    second.editor.commands.insertContentAt(8, 'ery');

    const suggestions = listSuggestions(second.editor.state.doc);
    expect(suggestions).toHaveLength(2);
    expect(suggestions.map((s) => s.id.user)).toEqual([AUTHOR_A.id, AUTHOR_B.id]);
    expect(suggestions.every((s) => s.id.date === T0)).toBe(true);
  });
});
