// src/renderers/scalarValue.ts
//
// The storage contract shared by the four scalar section renderers — text,
// date, number and boolean.
//
// WHERE THE VALUE LIVES
//
// One cookbook field becomes one Section: useDocumentEditorState walks
// `documentType.fields` and calls addSection() per field, so a scalar section
// holds exactly ONE answer. That answer lives under `section.metadata.value`,
// the same untyped bag file-upload, diagram and link-block already write into.
//
// HOW TWO CONCURRENT EDITS MERGE
//
// useSectionList.updateSection writes each patch key straight onto the
// section's Y.Map (`ySection.set('metadata', {...})`), so the whole metadata
// object is a single CRDT register — last writer wins, and Yjs orders the two
// writes identically on every client, so everyone converges on the same answer.
//
// For a one-line answer that is the CORRECT merge. Character-level merging
// (what rich-text gets from its own Y.XmlFragment) would splice two dates into
// a third date nobody typed: "2026-03-04" and "2026-11-22" can interleave into
// "2026-13-04". A scalar has no interior for a CRDT to merge; it is replaced,
// not edited. The cost is real and bounded: two people who set the due date at
// the same moment get one of the two dates, never a blend, never a crash.
//
// EMPTY IS A STATE
//
// `undefined` means unanswered, and unanswered is stored by DELETING the key —
// never by writing 0, the epoch, or false. `readNumberValue` returning
// undefined is what lets a Sprint Retrospective's "Velocity" render as "no
// value" instead of a confident, wrong zero.

import type { XmlFragment } from 'yjs';
import type { Section } from '../types/document';

/** The single metadata key every scalar renderer reads and writes. */
export const SCALAR_VALUE_KEY = 'value';

type Meta = Record<string, unknown>;

function readMeta(section: Section): Meta {
  return (section.metadata ?? {}) as Meta;
}

function raw(section: Section): unknown {
  return readMeta(section)[SCALAR_VALUE_KEY];
}

/**
 * Text answer, or '' when unanswered. Anything non-string in the slot (a
 * number left by an older host, a null off the wire) reads as unanswered
 * rather than rendering "[object Object]".
 */
export function readTextValue(section: Section): string {
  const v = raw(section);
  return typeof v === 'string' ? v : '';
}

/** Numeric answer, or undefined when unanswered. NaN/Infinity never survive. */
export function readNumberValue(section: Section): number | undefined {
  const v = raw(section);
  if (typeof v === 'number') return Number.isFinite(v) ? v : undefined;
  // A JSON round-trip through a host that stringifies everything hands back
  // "42". Treat it as the number it plainly is rather than as unanswered.
  if (typeof v === 'string' && v.trim() !== '') {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

/**
 * Yes/no answer, or undefined when nobody answered. Deliberately strict:
 * only a real boolean counts, so a missing key can never read as "No".
 */
export function readBooleanValue(section: Section): boolean | undefined {
  const v = raw(section);
  return typeof v === 'boolean' ? v : undefined;
}

const ISO_DATE_PREFIX = /^(\d{4}-\d{2}-\d{2})/;

/**
 * Calendar date as 'YYYY-MM-DD' (what <input type="date"> speaks), or '' when
 * unset. A full ISO timestamp — which is what a server-side date field or an
 * AI-drafted document tends to store — is narrowed to its date part instead of
 * being rejected.
 */
export function readDateValue(section: Section): string {
  const v = raw(section);
  if (typeof v !== 'string') return '';
  const m = ISO_DATE_PREFIX.exec(v.trim());
  return m ? m[1] : '';
}

/**
 * Builds the section patch that stores `value`, preserving every other
 * metadata key (the whole object is one CRDT register, so a patch that
 * forgot to spread would silently drop a sibling renderer's data).
 *
 * `undefined` DELETES the key: that is what "unanswered" is on the wire, and
 * deleting survives a JSON round-trip identically, whereas an explicit
 * `undefined` value does not.
 */
export function setScalarPatch(
  section: Section,
  value: string | number | boolean | undefined,
): Partial<Section> {
  const next: Meta = { ...readMeta(section) };
  if (value === undefined) delete next[SCALAR_VALUE_KEY];
  else next[SCALAR_VALUE_KEY] = value;
  return { metadata: next };
}

/**
 * 'YYYY-MM-DD' → 'Mar 4, 2026' in the reader's locale.
 *
 * Forced to UTC. `new Date('2026-03-04')` is UTC midnight, and formatting that
 * in any timezone west of Greenwich renders "Mar 3" — an invoice due date off
 * by one day for every user in the Americas.
 */
export function formatDateValue(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
  });
}

/**
 * Thousands separators, full precision. `toLocaleString()` alone rounds to 3
 * decimals, which would quietly round an invoice total.
 */
export function formatNumberValue(n: number): string {
  return n.toLocaleString(undefined, { maximumFractionDigits: 20 });
}

/**
 * Plain text carried by a section's Y.XmlFragment.
 *
 * WHY A SCALAR RENDERER CARES ABOUT A RICH-TEXT FRAGMENT
 *
 * Until these renderers landed, every text/date/number/boolean section fell
 * through to DefaultRenderer — a Tiptap box over the section's XmlFragment.
 * Anyone who filled in a Bug Report's Severity before today typed it THERE,
 * not into metadata.value. Switching renderers without acknowledging that
 * would make their words vanish from a document that still contains them.
 *
 * So: read-only, hint-sized, shown only while the scalar is unset and only
 * when the fragment actually holds something. `toString()` is the XML
 * serialization ('<paragraph>Critical</paragraph>'), so the tags come off.
 * Deliberately types-only on yjs — no runtime import is added to the barrel.
 */
export function legacyProseText(fragment: XmlFragment | null | undefined): string {
  if (!fragment) return '';
  try {
    return fragment.toString().replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  } catch {
    // A detached or half-synced fragment is not worth blanking a section for.
    return '';
  }
}
