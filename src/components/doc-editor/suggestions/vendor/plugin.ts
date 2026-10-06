// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 — see ./LICENSE

import { type EditorState, Plugin, PluginKey, TextSelection } from '@tiptap/pm/state';

import { getSuggestionDecorations } from './decorations';
import { ZERO_WIDTH_SPACE } from './zeroWidthSpace';

export interface SuggestChangesState {
  enabled: boolean;
}

export const suggestChangesKey = new PluginKey<SuggestChangesState>('suggestChanges');

export function suggestChanges(initiallyEnabled = false): Plugin<SuggestChangesState> {
  return new Plugin<SuggestChangesState>({
    key: suggestChangesKey,
    state: {
      init() {
        return { enabled: initiallyEnabled };
      },
      apply(tr, value) {
        const meta = tr.getMeta(suggestChangesKey) as Partial<SuggestChangesState> | undefined;
        if (meta && 'enabled' in meta) return { enabled: !!meta.enabled };
        return value;
      },
    },
    props: {
      decorations: getSuggestionDecorations,
      // Skip over the zero-width spaces we insert as block-boundary anchors, so
      // users never feel them under the arrow keys.
      handleKeyDown(view, event) {
        if (
          event.key === 'ArrowRight' &&
          view.state.selection instanceof TextSelection &&
          view.state.selection.empty &&
          view.state.selection.$cursor?.nodeAfter?.text?.startsWith(ZERO_WIDTH_SPACE)
        ) {
          view.dispatch(
            view.state.tr.setSelection(
              TextSelection.create(view.state.doc, view.state.selection.$cursor.pos + 1),
            ),
          );
        }
        if (
          event.key === 'ArrowLeft' &&
          view.state.selection instanceof TextSelection &&
          view.state.selection.empty &&
          view.state.selection.$cursor?.nodeBefore?.text?.endsWith(ZERO_WIDTH_SPACE)
        ) {
          view.dispatch(
            view.state.tr.setSelection(
              TextSelection.create(view.state.doc, view.state.selection.$cursor.pos - 1),
            ),
          );
        }
        // Never block any other handlers from running after
        return false;
      },
    },
  });
}

export function isSuggestChangesEnabled(state: EditorState): boolean {
  return !!suggestChangesKey.getState(state)?.enabled;
}
