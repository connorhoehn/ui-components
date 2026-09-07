// src/components/doc-editor/findMatches.ts
//
// Where a search term appears in a ProseMirror document.
//
// Kept apart from the UI, and free of the editor, because the interesting part
// is the position arithmetic and that is exactly what a component test cannot
// see. It walks text nodes and converts an offset inside one into a document
// position, which is the step every off-by-one in a find feature comes from.

/** A match, as a ProseMirror document range. */
export interface FindMatch {
  from: number;
  to: number;
}

/** The subset of a ProseMirror node this needs. Keeps the module editor-free. */
export interface TextWalkable {
  descendants(fn: (node: { isText?: boolean; text?: string | null }, pos: number) => void): void;
}

/**
 * Every occurrence of `query`, in document order.
 *
 * Case-insensitive by default, the way a word processor's find is. An empty or
 * whitespace-only query matches nothing rather than everything — the natural
 * reading of "I have not typed anything yet", and it keeps the bar from
 * selecting the whole document the moment it opens.
 *
 * Matches never span text nodes. A run split by a mark boundary — half a word
 * in bold — is two nodes, and joining them would produce positions that do not
 * address contiguous text. Word processors have the same limitation; it is
 * invisible in practice and honest, which is better than a position that lies.
 */
export function findMatches(
  doc: TextWalkable | null | undefined,
  query: string,
  opts: { caseSensitive?: boolean } = {},
): FindMatch[] {
  const needle = opts.caseSensitive ? query : query.toLowerCase();
  if (!doc || needle.trim().length === 0) return [];

  const out: FindMatch[] = [];
  doc.descendants((node, pos) => {
    if (!node.isText || !node.text) return;
    const haystack = opts.caseSensitive ? node.text : node.text.toLowerCase();
    let at = haystack.indexOf(needle);
    while (at !== -1) {
      out.push({ from: pos + at, to: pos + at + needle.length });
      // `at + needle.length`, not `at + 1`: overlapping hits are not what a
      // person means by "next match" — searching "aa" in "aaaa" is two.
      at = haystack.indexOf(needle, at + needle.length);
    }
  });
  return out;
}

/**
 * The match a person means by "next" from where the cursor is.
 *
 * Wraps, and treats the match the cursor is already sitting on as the current
 * one rather than skipping past it — pressing Enter in a find bar should step
 * from where you are, not from wherever the last search left off.
 */
export function nextMatchIndex(
  matches: readonly FindMatch[],
  cursorPos: number,
  direction: 1 | -1 = 1,
): number {
  if (matches.length === 0) return -1;
  if (direction === 1) {
    const found = matches.findIndex((m) => m.from >= cursorPos);
    return found === -1 ? 0 : found;
  }
  for (let i = matches.length - 1; i >= 0; i--) {
    if (matches[i].from < cursorPos) return i;
  }
  return matches.length - 1;
}
