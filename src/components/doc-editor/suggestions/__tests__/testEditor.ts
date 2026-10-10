// frontend/src/editor/suggestions/__tests__/testEditor.ts
//
// A real Tiptap editor with the suggestion extensions on it, plus a controllable
// clock. Tests drive the actual dispatch path — not a hand-rolled stand-in —
// because the whole feature IS the transaction rewrite, and a fake would test
// nothing.

import { Editor } from '@tiptap/core';
// StarterKit, not a hand-picked minimal set — this is the extension list the
// real document editor uses, so schema interactions (marks excluding each
// other, list/heading node types) are the real ones.
import StarterKit from '@tiptap/starter-kit';
import type { MarkSpec } from '@tiptap/pm/model';

import { SuggestChanges, type SuggestionUser } from '../SuggestChanges';

export interface TestEditorHandle {
  editor: Editor;
  /** Move the fake clock. Suggestion identity is derived from it. */
  setNow: (epochMs: number) => void;
  destroy: () => void;
}

export const AUTHOR_A: SuggestionUser = { id: 'user-ada', name: 'Ada Lovelace' };
export const AUTHOR_B: SuggestionUser = { id: 'user-bo', name: 'Bo Chen' };

/** 2026-01-01T00:00:00Z — an exact ten-minute bucket boundary. */
export const T0 = Date.UTC(2026, 0, 1, 0, 0, 0);

export function createTestEditor(
  options: { user?: SuggestionUser; content?: string; now?: number } = {},
): TestEditorHandle {
  const { user = AUTHOR_A, content = '<p>Hello brave world</p>', now = T0 } = options;
  let clock = now;

  const element = document.createElement('div');
  document.body.appendChild(element);

  const editor = new Editor({
    element,
    content,
    extensions: [
      StarterKit,
      // No `...SuggestionMarks` here on purpose: SuggestChanges pulls the marks
      // in itself. Spreading them as well would register each mark name twice.
      SuggestChanges.configure({ user, enabled: false, now: () => clock }),
    ],
  });

  return {
    editor,
    setNow: (epochMs: number) => {
      clock = epochMs;
    },
    destroy: () => {
      editor.destroy();
      element.remove();
    },
  };
}

/** The document's plain text, paragraphs joined with a newline. */
export function textOf(editor: Editor): string {
  return editor.state.doc.textBetween(0, editor.state.doc.content.size, '\n');
}

/**
 * Every mark of `markName` in the document, with the node text it covers.
 * Used to assert on attribution without depending on positions.
 */
export function marksOf(editor: Editor, markName: string) {
  const found: { text: string; attrs: Record<string, unknown> }[] = [];
  editor.state.doc.descendants((node) => {
    for (const mark of node.marks) {
      if (mark.type.name === markName) {
        found.push({ text: node.text ?? '', attrs: mark.attrs });
      }
    }
    return true;
  });
  return found;
}

/**
 * The raw MarkSpec ProseMirror ended up with for a mark. Asserting on this is
 * how the `excludes: ''` regression test stays honest: it checks the value the
 * schema actually carries, not the value we wrote in a config object.
 */
export function markSpecOf(editor: Editor, markName: string): MarkSpec {
  const type = editor.schema.marks[markName];
  if (!type) throw new Error(`No mark named ${markName} in schema`);
  return type.spec;
}
