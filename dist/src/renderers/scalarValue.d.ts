import type { XmlFragment } from 'yjs';
import type { Section } from '../types/document';
/** The single metadata key every scalar renderer reads and writes. */
export declare const SCALAR_VALUE_KEY = "value";
/**
 * Text answer, or '' when unanswered. Anything non-string in the slot (a
 * number left by an older host, a null off the wire) reads as unanswered
 * rather than rendering "[object Object]".
 */
export declare function readTextValue(section: Section): string;
/** Numeric answer, or undefined when unanswered. NaN/Infinity never survive. */
export declare function readNumberValue(section: Section): number | undefined;
/**
 * Yes/no answer, or undefined when nobody answered. Deliberately strict:
 * only a real boolean counts, so a missing key can never read as "No".
 */
export declare function readBooleanValue(section: Section): boolean | undefined;
/**
 * Calendar date as 'YYYY-MM-DD' (what <input type="date"> speaks), or '' when
 * unset. A full ISO timestamp — which is what a server-side date field or an
 * AI-drafted document tends to store — is narrowed to its date part instead of
 * being rejected.
 */
export declare function readDateValue(section: Section): string;
/**
 * Builds the section patch that stores `value`, preserving every other
 * metadata key (the whole object is one CRDT register, so a patch that
 * forgot to spread would silently drop a sibling renderer's data).
 *
 * `undefined` DELETES the key: that is what "unanswered" is on the wire, and
 * deleting survives a JSON round-trip identically, whereas an explicit
 * `undefined` value does not.
 */
export declare function setScalarPatch(section: Section, value: string | number | boolean | undefined): Partial<Section>;
/**
 * 'YYYY-MM-DD' → 'Mar 4, 2026' in the reader's locale.
 *
 * Forced to UTC. `new Date('2026-03-04')` is UTC midnight, and formatting that
 * in any timezone west of Greenwich renders "Mar 3" — an invoice due date off
 * by one day for every user in the Americas.
 */
export declare function formatDateValue(iso: string): string;
/**
 * Thousands separators, full precision. `toLocaleString()` alone rounds to 3
 * decimals, which would quietly round an invoice total.
 */
export declare function formatNumberValue(n: number): string;
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
export declare function legacyProseText(fragment: XmlFragment | null | undefined): string;
//# sourceMappingURL=scalarValue.d.ts.map