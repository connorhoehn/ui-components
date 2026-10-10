// frontend/src/editor/suggestions/listSuggestions.ts
//
// Read the suggestions out of a document. Pure — takes a doc, returns data.
// The review chrome renders from this; nothing here touches the editor.

import type { Node } from '@tiptap/pm/model';

import {
  getSuggestionMarks,
  suggestionIdentityOf,
  suggestionKey,
  ZERO_WIDTH_SPACE,
  type SuggestionIdentity,
} from './vendor';

export type SuggestionKind = 'insert' | 'delete' | 'replace' | 'modify';

export interface SuggestionSummary {
  /** Who and when — the identity carried by every mark in this suggestion. */
  id: SuggestionIdentity;
  /** Stable string form of `id`, for React keys. */
  key: string;
  kind: SuggestionKind;
  /** Document range the suggestion spans, for scroll-to and range commands. */
  from: number;
  to: number;
  /** Text the author proposes adding — every block run together, for search and tests. */
  insertedText: string;
  /**
   * The same, one entry per BLOCK the insertion touches. A suggestion is one
   * key — `${user}@${date}`, bucketed to ten minutes — so an agent appending
   * a rule, a paragraph and a second paragraph is ONE suggestion, and joined
   * flat it read as "| Column 1 | Column 2 ||--------|| | |Placeholder text".
   */
  insertedBlocks: string[];
  /** Text the author proposes removing. */
  deletedText: string;
}

interface Accumulator {
  id: SuggestionIdentity;
  from: number;
  to: number;
  inserted: string[];
  /** Block-level pieces of `inserted`: a new entry opens whenever the text's parent block changes. */
  insertedBlocks: string[];
  lastBlockPos: number | null;
  deleted: string[];
  modified: boolean;
}

function stripAnchors(text: string): string {
  return text.split(ZERO_WIDTH_SPACE).join('');
}

function kindOf(acc: Accumulator): SuggestionKind {
  const hasInsert = acc.inserted.length > 0;
  const hasDelete = acc.deleted.length > 0;
  if (hasInsert && hasDelete) return 'replace';
  if (hasInsert) return 'insert';
  if (hasDelete) return 'delete';
  return 'modify';
}

/**
 * Every suggestion in `doc`, in document order.
 *
 * Marks are grouped by identity, not by position: one author's run of edits in
 * the same ten-minute bucket is one entry here even when the marks are split
 * across several text nodes, which is what makes the review list readable
 * rather than one row per keystroke.
 */
export function listSuggestions(doc: Node): SuggestionSummary[] {
  const { insertion, deletion, modification } = getSuggestionMarks(doc.type.schema);
  const byKey = new Map<string, Accumulator>();
  const order: string[] = [];

  doc.descendants((node, pos) => {
    // The block this node sits in, so insertions in different blocks stay apart.
    const blockPos = node.isText ? doc.resolve(pos).before(doc.resolve(pos).depth) : pos;
    for (const mark of node.marks) {
      if (mark.type !== insertion && mark.type !== deletion && mark.type !== modification) {
        continue;
      }
      const id = suggestionIdentityOf(mark);
      if (!id) continue;
      const key = suggestionKey(id);
      let acc = byKey.get(key);
      if (!acc) {
        acc = { id, from: pos, to: pos + node.nodeSize, inserted: [], insertedBlocks: [], lastBlockPos: null, deleted: [], modified: false };
        byKey.set(key, acc);
        order.push(key);
      }
      acc.from = Math.min(acc.from, pos);
      acc.to = Math.max(acc.to, pos + node.nodeSize);
      // Keep the freshest display name we've seen for this author.
      if (id.username) acc.id = { ...acc.id, username: id.username };

      const text = node.isText ? (node.text ?? '') : '';
      if (mark.type === insertion) {
        acc.inserted.push(text);
        if (acc.lastBlockPos === blockPos && acc.insertedBlocks.length > 0) {
          acc.insertedBlocks[acc.insertedBlocks.length - 1] += text;
        } else {
          acc.insertedBlocks.push(text);
          acc.lastBlockPos = blockPos;
        }
      }
      else if (mark.type === deletion) acc.deleted.push(text);
      else acc.modified = true;
    }
    return true;
  });

  return order.map((key) => {
    const acc = byKey.get(key)!;
    return {
      id: acc.id,
      key,
      kind: kindOf(acc),
      from: acc.from,
      to: acc.to,
      // The zero-width anchors are an implementation detail — never show them.
      insertedText: stripAnchors(acc.inserted.join('')),
      insertedBlocks: acc.insertedBlocks.map(stripAnchors).filter((t) => t.length > 0),
      deletedText: stripAnchors(acc.deleted.join('')),
    };
  });
}
