// Editing a DeckText — a title or bullet that is a plain string or runs
// (`{ text, emphasis? }[]`, the engine's 0.153.0 format).
//
// Two operations, both pure:
//
// - `applyEmphasis` marks the characters [start, end) of the field's text with
//   one emphasis (or clears them with `null`). A run carries one emphasis, so
//   applying one replaces whatever the range had. A string becomes runs only
//   here, and runs with no emphasis left collapse back to a string, so a plain
//   title stays a plain string in the saved spec until someone emphasises it.
// - `editDeckText` takes the field's new plain value after a keystroke and
//   keeps the runs: the changed span is found by common prefix and suffix and
//   takes the emphasis of the character before it (or after it, at the start).
//
// "The field's text" is the runs joined with no separator — the raw value the
// input shows — not `plainText`, which also collapses whitespace.

import type { DeckEmphasis, DeckRun, DeckText } from './deckSpec';

/** The runs joined as the field shows them (no whitespace collapsing). */
export function deckTextValue(text: DeckText | undefined): string {
  if (text === undefined) return '';
  return typeof text === 'string' ? text : text.map((run) => run.text).join('');
}

/** One emphasis (or none) per character. */
function marks(text: DeckText): (DeckEmphasis | undefined)[] {
  if (typeof text === 'string') return Array.from({ length: text.length }, () => undefined);
  const out: (DeckEmphasis | undefined)[] = [];
  for (const run of text) for (let i = 0; i < run.text.length; i += 1) out.push(run.emphasis);
  return out;
}

/** Rebuild runs from a value and its per-character marks; a string when nothing is marked. */
function fromMarks(value: string, perChar: readonly (DeckEmphasis | undefined)[]): DeckText {
  if (!perChar.some(Boolean)) return value;
  const runs: DeckRun[] = [];
  for (let i = 0; i < value.length; i += 1) {
    const emphasis = perChar[i];
    const last = runs[runs.length - 1];
    if (last && last.emphasis === emphasis) last.text += value[i];
    else runs.push(emphasis ? { text: value[i]!, emphasis } : { text: value[i]! });
  }
  return runs;
}

/**
 * Mark [start, end) of the field's text with `emphasis`, or clear it with
 * `null`. An empty or out-of-range selection returns the text unchanged.
 */
export function applyEmphasis(text: DeckText, start: number, end: number, emphasis: DeckEmphasis | null): DeckText {
  const value = deckTextValue(text);
  const from = Math.max(0, Math.min(start, end));
  const to = Math.min(value.length, Math.max(start, end));
  if (to <= from) return text;
  const perChar = marks(text);
  for (let i = from; i < to; i += 1) perChar[i] = emphasis ?? undefined;
  return fromMarks(value, perChar);
}

/** The emphasis every character of [start, end) shares, `'mixed'` when they differ, undefined when none or no range. */
export function emphasisAt(text: DeckText, start: number, end: number): DeckEmphasis | 'mixed' | undefined {
  const perChar = marks(text).slice(Math.max(0, Math.min(start, end)), Math.max(start, end));
  if (!perChar.length) return undefined;
  const first = perChar[0];
  return perChar.every((mark) => mark === first) ? first : 'mixed';
}

/**
 * The text after the field's value became `next`. A plain string stays a
 * string; runs keep their emphasis around the edit, and the inserted
 * characters take the emphasis of the character before them.
 */
export function editDeckText(text: DeckText, next: string): DeckText {
  if (typeof text === 'string') return next;
  const prev = deckTextValue(text);
  if (prev === next) return text;
  let prefix = 0;
  while (prefix < prev.length && prefix < next.length && prev[prefix] === next[prefix]) prefix += 1;
  let suffix = 0;
  while (
    suffix < prev.length - prefix
    && suffix < next.length - prefix
    && prev[prev.length - 1 - suffix] === next[next.length - 1 - suffix]
  ) suffix += 1;
  const perChar = marks(text);
  const inserted = next.length - prefix - suffix;
  const inherit = prefix > 0 ? perChar[prefix - 1] : perChar[prev.length - suffix];
  const merged = [
    ...perChar.slice(0, prefix),
    ...Array.from({ length: inserted }, () => inherit),
    ...perChar.slice(prev.length - suffix),
  ];
  return fromMarks(next, merged);
}
