// Vendored fork of @handlewithcare/prosemirror-suggest-changes 0.1.8 — see ./LICENSE
//
// Fork change: suggestions are compared by identity, and decoration keys are
// derived from `suggestionKey` rather than a numeric id.

import type { Mark, Node } from '@tiptap/pm/model';
import type { EditorState } from '@tiptap/pm/state';
import { Decoration, DecorationSet, type DecorationSource } from '@tiptap/pm/view';

import { sameSuggestion, suggestionIdentityOf, suggestionKey } from './identity';
import { findSuggestionMark, getSuggestionMarks } from './utils';

function pilcrow() {
  const span = document.createElement('span');
  span.className = 'suggestion-pilcrow';
  span.appendChild(document.createTextNode('¶'));
  return span;
}

function widgetKey(mark: Mark): string {
  const id = suggestionIdentityOf(mark);
  return id ? suggestionKey(id) : mark.type.name;
}

export function getSuggestionDecorations(state: EditorState): DecorationSource {
  const { deletion, insertion } = getSuggestionMarks(state.schema);
  const changeDecorations: Decoration[] = [];
  let lastParentNode: Node | null = null;
  let lastTextNode: Node | null = null;
  let lastTextNodeEndPos = 0;

  state.doc.descendants((node, pos, parent) => {
    if (node.isTextblock && node.childCount) {
      if (node.children.every((child) => !!findSuggestionMark(child.marks, deletion))) {
        changeDecorations.push(
          Decoration.node(pos, pos + node.nodeSize, { 'data-node-deletion': 'true' }),
        );
      }
      if (node.children.every((child) => !!findSuggestionMark(child.marks, insertion))) {
        changeDecorations.push(
          Decoration.node(pos, pos + node.nodeSize, { 'data-node-insertion': 'true' }),
        );
      }
    }
    if (node.type.name !== 'text') return true;

    const currentDeletionMark = findSuggestionMark(node.marks, deletion);
    const currentInsertionMark = findSuggestionMark(node.marks, insertion);
    const lastDeletionMark = lastTextNode
      ? findSuggestionMark(lastTextNode.marks, deletion)
      : undefined;
    const lastInsertionMark = lastTextNode
      ? findSuggestionMark(lastTextNode.marks, insertion)
      : undefined;

    const widgetPos = lastTextNodeEndPos;
    lastTextNode = node;
    lastTextNodeEndPos = pos + node.nodeSize;

    if (parent === lastParentNode) {
      lastParentNode = parent;
      return true;
    }
    lastParentNode = parent;

    if (
      (!currentDeletionMark || !lastDeletionMark) &&
      (!currentInsertionMark || !lastInsertionMark)
    ) {
      return true;
    }
    if (
      !sameSuggestion(
        suggestionIdentityOf(currentDeletionMark),
        suggestionIdentityOf(lastDeletionMark),
      ) &&
      !sameSuggestion(
        suggestionIdentityOf(currentInsertionMark),
        suggestionIdentityOf(lastInsertionMark),
      )
    ) {
      return true;
    }
    if (currentDeletionMark) {
      changeDecorations.push(
        Decoration.widget(widgetPos, pilcrow, {
          key: widgetKey(currentDeletionMark),
          marks: [currentDeletionMark],
        }),
      );
    }
    if (currentInsertionMark) {
      changeDecorations.push(
        Decoration.widget(widgetPos, pilcrow, {
          key: widgetKey(currentInsertionMark),
          marks: [currentInsertionMark],
        }),
      );
    }
    return true;
  });

  return DecorationSet.create(state.doc, changeDecorations);
}
