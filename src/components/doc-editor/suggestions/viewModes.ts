// frontend/src/editor/suggestions/viewModes.ts
//
// Word's four review views, done cheaply.
//
// The key property: NONE of these mutate the live document. Each derives a
// throwaway doc (and, where a caller needs one, a throwaway EditorState) by
// running the accept/reject transforms over a detached copy. Previewing "Final"
// must never dispatch a transaction — under Yjs that would replicate the
// preview to every other participant as a real accept-all.

import type { Node } from '@tiptap/pm/model';
import { EditorState } from '@tiptap/pm/state';

import {
  applySuggestionsToNode,
  revertSuggestionsToNode,
} from './vendor';

export type SuggestionViewMode =
  /** Word's "All Markup" — the live doc, every suggestion visible. */
  | 'all-markup'
  /** Word's "Simple Markup" — the accepted result, with change bars. */
  | 'simple-markup'
  /** Word's "No Markup" — as the document would read if all were accepted. */
  | 'final'
  /** Word's "Original" — as it read before any suggestion. */
  | 'original';

export const SUGGESTION_VIEW_MODES: { value: SuggestionViewMode; label: string }[] = [
  { value: 'all-markup', label: 'All markup' },
  { value: 'simple-markup', label: 'Simple markup' },
  { value: 'final', label: 'Final' },
  { value: 'original', label: 'Original' },
];

/** The document as it would read with every suggestion accepted. */
export function finalDoc(doc: Node): Node {
  return applySuggestionsToNode(doc);
}

/** The document as it read before any suggestion was made. */
export function originalDoc(doc: Node): Node {
  return revertSuggestionsToNode(doc);
}

/**
 * The doc to render for a given view mode.
 *
 * 'all-markup' and 'simple-markup' both render the live doc — they differ only
 * in CSS (simple markup hides the inline strike/underline and shows a change
 * bar in the margin), which is why they share a document here.
 */
export function docForViewMode(doc: Node, mode: SuggestionViewMode): Node {
  switch (mode) {
    case 'final':
      return finalDoc(doc);
    case 'original':
      return originalDoc(doc);
    case 'all-markup':
    case 'simple-markup':
      return doc;
  }
}

/**
 * A throwaway, non-editable EditorState for previewing `mode`.
 *
 * Feed this to a read-only EditorView. It shares the schema with the live state
 * but nothing else — no plugins, no history, no y-sync — so nothing it does can
 * leak back into the collaborative document.
 */
export function previewStateForViewMode(state: EditorState, mode: SuggestionViewMode): EditorState {
  return EditorState.create({
    schema: state.schema,
    doc: docForViewMode(state.doc, mode),
  });
}

/** CSS class the editor container carries for a given view mode. */
export function viewModeClassName(mode: SuggestionViewMode): string {
  return `suggestion-view-${mode}`;
}
