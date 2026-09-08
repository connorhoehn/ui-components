// ui-components/src/components/doc-macros/hitlText.ts
//
// The `macro:hitl` payload — an agent's question waiting on a person — read
// and edited AS TEXT.
//
// ```macro:hitl
// askedBy: release-agent
// assignee: dev-bob
// blocks: the 2.190.0 release
// context: Two changelog entries are still unreviewed.
// expiresAt: '2026-09-08T00:00:00.000Z'
// id: hitl-01J8Z
// options:
//   - then: the release train continues
//     value: ship it
//   - hold
// question: Ship 2.190.0 now, or hold for the changelog?
// ```
//
// Answered, the same body carries three more keys at the top — where
// `sortKeys: true` puts them, because `answer` < `answeredAt` < `answeredBy` <
// every other key this payload uses:
//
// ```macro:hitl
// answer: ship it
// answeredAt: '2026-09-07T18:02:11.000Z'
// answeredBy: dev-bob
// askedBy: release-agent
// ...
// ```
//
// ---------------------------------------------------------------------------
// Why this reads the text, and not YAML
// ---------------------------------------------------------------------------
//
// Same two reasons `actionItemsText.ts` gives, and they are not restated here:
// `./diagram` deliberately ships no YAML parser, and editing a PARSED payload
// would be a second serialiser that rewrites bytes nobody touched. Read that
// file's header; this one is built to the same rule.
//
// The rule has one extra consequence here that is worth naming, because it is
// what makes the answer control honest rather than merely tidy:
//
//   **Answering is ONE range.** The three keys an answer writes sort
//   adjacently and sort before every other key in the payload, so they go in
//   as a single contiguous insertion and come out as a single contiguous
//   delete. One `ReplaceStep`, so it merges, undoes and shows up in the
//   suggestion fork exactly as ticking an action item does — and two people
//   answering two different callouts on one page never touch the same bytes.
//
// Where the trio is NOT contiguous — a hand-written body that interleaved
// something between `answer:` and `answeredBy:` — the edit is DECLINED rather
// than reassembled. The block still renders and still shows the answer; it
// just does not offer to retract one it cannot remove in a single step. A
// half-applied retraction is worse than a missing button.
//
// ---------------------------------------------------------------------------
// What lives here and what does not
// ---------------------------------------------------------------------------
//
// This file is the DOCUMENT half, and it is complete on its own: a callout can
// be asked, read and answered with nothing but an open editor. It knows
// nothing about the section-items table, `GET /api/items/mine`, or the answer
// endpoint — see `HITL_QUERYABILITY` below for the one paragraph on how a
// callout becomes visible outside the page, and for the precise limits of
// that.

import { yamlScalar, type TextRangeEdit } from './actionItemsText';

/** The `macro:<name>` discriminator for an agent -> human hand-off. */
export const HITL_MACRO_NAME = 'hitl';

/**
 * One answer the callout offers, and what taking it does.
 *
 * `then` is the half that makes this more than a labelled button: a person
 * asked "ship it or hold?" is being asked to pick a CONSEQUENCE, and an agent
 * that knows what each branch does can say so. Empty when the asker did not.
 */
export interface HitlOption {
    /** The literal answer recorded when this option is taken. */
    value: string;
    /** What happens if it is. `''` when unstated. */
    then: string;
}

/** A `macro:hitl` callout, as the block draws it. */
export interface HitlCallout {
    /**
     * Stable id, minted by whoever asked. `''` when the body has none — which
     * is legal and renders fine, but see `HITL_QUERYABILITY`: an id is what a
     * row outside the document is keyed on, so a callout without one exists
     * only on this page.
     */
    id: string;
    /** The question. The one field this reader refuses a body without. */
    question: string;
    /** What the agent was doing. `''` when unstated. */
    context: string;
    /** Who is asking. `''` when unstated. */
    askedBy: string;
    /**
     * Who is being asked — an identity key, not a display name.
     *
     * `''` when the callout is addressed to nobody in particular. The
     * distinction is load-bearing outside the document: the cross-document
     * query is by assignee, and the answer endpoint refuses anyone who is not
     * the addressee. See `HITL_QUERYABILITY`.
     */
    assignee: string;
    /** What is stopped until this is answered. `''` when nothing is. */
    blocks: string;
    /**
     * ISO, or null. When it passes the asker has STOPPED WAITING — which is a
     * different fact from a deadline, and the block treats it as one: an
     * expired callout draws no answer control at all.
     */
    expiresAt: string | null;
    /** The choices. Empty means the answer is free prose. */
    options: HitlOption[];
    /** The recorded answer, or null while the callout is still waiting. */
    answer: string | null;
    /** `''` when the answer carries no attribution. */
    answeredBy: string;
    /** ISO, or `''`. */
    answeredAt: string;
}

/**
 * HOW A CALLOUT BECOMES VISIBLE OUTSIDE THIS PAGE — and exactly how far that
 * goes. Stated here because it is the first thing a reader of this file will
 * assume wrongly.
 *
 * Nothing outside an open editor can read a document body. There is no
 * server-side Y.Doc; the gateway relays CRDT bytes opaquely and platform-api
 * never materialises a document. So a callout that exists ONLY as these bytes
 * is invisible to every surface that is not the page it is on — an inbox built
 * on it would be empty by construction.
 *
 * The fix is the one `macro:diagram` already made: the body carries a
 * REFERENCE (`id`) and a queryable substrate carries a row. Here that
 * substrate is the section-items table, reached with a sentinel section id
 * (`_macro`) because a page-shaped document has no sections — verified: the
 * item handlers never look `sectionId` up against a real section and the
 * partition key is a plain `${documentId}:${sectionId}` concatenation, which
 * is why `_inbox` is already in use for the same trick.
 *
 * What that buys, and what it does not:
 *
 *   VISIBLE     the question (`text`), who is asked (`assignee`), whether it
 *               is still waiting (`status`), and — via
 *               `POST …/items/:itemId/answer` — an answer, with the addressee
 *               check and the already-answered guard enforced server side.
 *   NOT VISIBLE the OPTIONS and `expiresAt`. A section item has no field for
 *               either, and this work does not own the repository that would
 *               add one. So a surface reading only the row can offer free
 *               prose, and cannot know a callout has expired.
 *
 * The consequence is deliberate and must not be papered over: a remote surface
 * may present a comment box, never the declared choices, unless it has the
 * body in hand. Drawing three named buttons from a row that never carried them
 * would be inventing the ask.
 */
export const HITL_QUERYABILITY =
    'The body is the record; a section-item row keyed on `id` under the `_macro` ' +
    'sentinel section is the queryable mirror. The row can carry the question, the ' +
    'addressee and the answer; it cannot carry the options or the expiry.';

/** The sentinel section a page-shaped document files macro rows under. */
export const HITL_SENTINEL_SECTION = '_macro';

/** The `category` a section-item row carries so it is recognisably a callout. */
export const HITL_ITEM_CATEGORY = 'hitl';

// ---------------------------------------------------------------------------
// Reading
// ---------------------------------------------------------------------------

interface Scalar {
    value: string;
    from: number;
    to: number;
}

interface Entry {
    key: string;
    /** Offset one past the `:` that ends the key. */
    keyEnd: number;
    scalar: Scalar;
    lineStart: number;
    /** Offset one past the last character of the line holding this entry. */
    lineEnd: number;
}

interface RawOption {
    /** Set for the mapping form (`- value: x`). */
    entries: Entry[];
    /** Set for the scalar shorthand (`- x`). */
    scalar: string | null;
    lineStart: number;
    lineEnd: number;
}

interface ParsedBody {
    /** Every top-level `key:` entry, in the order the source writes them. */
    entries: Entry[];
    options: RawOption[];
    /** Offset one past the last character of the body. */
    end: number;
}

const KEY_RE = /^([A-Za-z][A-Za-z0-9_-]*):/;
const OPTION_MARKER = '  - ';
const OPTION_INDENT = '    ';

/** Keys an option mapping may carry. Anything else declines the whole body. */
const OPTION_KEYS = new Set(['then', 'value']);

/**
 * The three keys an answer writes.
 *
 * In alphabetical order, which is also the order `sortKeys: true` emits them
 * in, which is also — and this is the load-bearing part — CONTIGUOUS: no key
 * this payload uses sorts between `answer` and `answeredBy`, and none sorts
 * before `answer`.
 */
const ANSWER_KEYS = ['answer', 'answeredAt', 'answeredBy'] as const;
const LAST_ANSWER_KEY = 'answeredBy';

function lines(source: string): { text: string; start: number }[] {
    const out: { text: string; start: number }[] = [];
    let start = 0;
    for (;;) {
        const nl = source.indexOf('\n', start);
        if (nl === -1) {
            out.push({ text: source.slice(start), start });
            return out;
        }
        out.push({ text: source.slice(start, nl), start });
        start = nl + 1;
    }
}

/**
 * A `'…'` / `"…"` / bare scalar as its string value, or `null` when this
 * reader will not guess at it.
 *
 * Byte-for-byte the judgement `actionItemsText`'s reader makes, for the same
 * reason: a quoted form may be a foreign tool's normalisation and must be
 * accepted, while an unterminated quote or a trailing `# comment` is a body
 * we would damage by writing back to it — so the whole block declines and the
 * reader keeps their bytes.
 */
function unquote(raw: string): string | null {
    if (raw.length >= 2 && raw.startsWith("'") && raw.endsWith("'")) {
        return raw.slice(1, -1).replace(/''/g, "'");
    }
    if (raw.length >= 2 && raw.startsWith('"') && raw.endsWith('"')) {
        try {
            return JSON.parse(raw) as string;
        } catch {
            return null;
        }
    }
    if (raw.startsWith("'") || raw.startsWith('"')) return null;
    if (/(^|\s)#/.test(raw)) return null;
    return raw;
}

/** `key: value` at `indent` columns, with the value's offsets. */
function parseEntry(text: string, lineStart: number, indent: number): Entry | null {
    const m = KEY_RE.exec(text.slice(indent));
    if (!m) return null;
    let i = indent + m[0].length;
    while (i < text.length && (text[i] === ' ' || text[i] === '\t')) i += 1;
    let end = text.length;
    while (end > i && (text[end - 1] === ' ' || text[end - 1] === '\t')) end -= 1;
    const value = unquote(text.slice(i, end));
    if (value === null) return null;
    return {
        key: m[1]!,
        keyEnd: lineStart + indent + m[0].length,
        scalar: { value, from: lineStart + i, to: lineStart + end },
        lineStart,
        lineEnd: lineStart + text.length,
    };
}

/**
 * The document shape, or `null` when the body is not one this file can render
 * and edit safely.
 *
 * Accepts a flat mapping of scalars plus at most one `options:` block
 * sequence, whose members are either a scalar or a mapping of `then`/`value`.
 * Everything else — a nested mapping, a flow sequence, a block scalar, a
 * duplicate key — is refused, and refusal is the format's promise rather than
 * a failure: the reader sees their bytes.
 */
function parseBody(source: string): ParsedBody | null {
    const all = lines(source);
    const entries: Entry[] = [];
    const options: RawOption[] = [];
    const seen = new Set<string>();
    let inOptions = false;
    let end = 0;

    for (const line of all) {
        if (line.text.trim() === '') continue;

        if (line.text.startsWith(OPTION_MARKER)) {
            if (!inOptions) return null;
            const rest = line.text.slice(OPTION_MARKER.length);
            const entry = parseEntry(line.text, line.start, OPTION_MARKER.length);
            if (entry) {
                if (!OPTION_KEYS.has(entry.key)) return null;
                options.push({
                    entries: [entry],
                    scalar: null,
                    lineStart: line.start,
                    lineEnd: entry.lineEnd,
                });
            } else {
                // The scalar shorthand: `  - ship it`.
                const value = unquote(rest.trim());
                if (value === null || value === '') return null;
                options.push({
                    entries: [],
                    scalar: value,
                    lineStart: line.start,
                    lineEnd: line.start + line.text.length,
                });
            }
        } else if (line.text.startsWith(OPTION_INDENT)) {
            if (!inOptions) return null;
            const current = options[options.length - 1];
            if (!current || current.scalar !== null) return null;
            const entry = parseEntry(line.text, line.start, OPTION_INDENT.length);
            if (!entry) return null;
            if (!OPTION_KEYS.has(entry.key)) return null;
            if (current.entries.some((e) => e.key === entry.key)) return null;
            current.entries.push(entry);
            current.lineEnd = entry.lineEnd;
        } else if (line.text.startsWith(' ') || line.text.startsWith('\t')) {
            // Indented, but at neither of the two widths this reader knows.
            return null;
        } else {
            const entry = parseEntry(line.text, line.start, 0);
            if (!entry) return null;
            if (seen.has(entry.key)) return null;
            seen.add(entry.key);
            entries.push(entry);
            if (entry.key === 'options') {
                // A sequence, so the key itself carries no value. `[]` is the
                // empty form, which is legal and means the same as absent.
                if (entry.scalar.value !== '' && entry.scalar.value !== '[]') return null;
                inOptions = true;
            } else {
                inOptions = false;
            }
        }
        const last = options[options.length - 1];
        end = Math.max(
            end,
            entries[entries.length - 1]?.lineEnd ?? 0,
            last ? last.lineEnd : 0,
        );
    }

    const optionsEntry = entries.find((e) => e.key === 'options');
    // `options: []` followed by members would parse two ways; refuse rather
    // than pick one.
    if (optionsEntry?.scalar.value === '[]' && options.length > 0) return null;
    if (!optionsEntry && options.length > 0) return null;

    return { entries, options, end };
}

function valueOf(body: ParsedBody, key: string): string {
    return body.entries.find((e) => e.key === key)?.scalar.value ?? '';
}

/**
 * The callout a macro body describes, or `null` when the body is not the shape
 * this renderer edits.
 *
 * The one hard requirement is `question`. A callout with no question is not a
 * callout, and drawing an empty card with an answer box under it would invite
 * someone to answer nothing.
 */
export function readHitl(source: string): HitlCallout | null {
    const body = parseBody(source);
    if (!body) return null;
    const question = valueOf(body, 'question');
    if (!question) return null;

    const options: HitlOption[] = [];
    for (const raw of body.options) {
        if (raw.scalar !== null) {
            options.push({ value: raw.scalar, then: '' });
            continue;
        }
        const value = raw.entries.find((e) => e.key === 'value')?.scalar.value ?? '';
        // An option nobody can pick is merge damage wearing an option's
        // clothes. Show the bytes instead.
        if (!value) return null;
        options.push({
            value,
            then: raw.entries.find((e) => e.key === 'then')?.scalar.value ?? '',
        });
    }

    const answerEntry = body.entries.find((e) => e.key === 'answer');
    return {
        id: valueOf(body, 'id'),
        question,
        context: valueOf(body, 'context'),
        askedBy: valueOf(body, 'askedBy'),
        assignee: valueOf(body, 'assignee'),
        blocks: valueOf(body, 'blocks'),
        expiresAt: valueOf(body, 'expiresAt') || null,
        options,
        answer: answerEntry ? answerEntry.scalar.value : null,
        answeredBy: valueOf(body, 'answeredBy'),
        answeredAt: valueOf(body, 'answeredAt'),
    };
}

/**
 * Whether the callout's asker has stopped waiting.
 *
 * Deliberately NOT folded into `readHitl`: expiry is a fact about the clock,
 * and a reader that baked `Date.now()` into a parse result would hand the
 * renderer a value that silently went stale between paints. The caller passes
 * the clock in.
 */
export function hitlExpired(callout: HitlCallout, now: number = Date.now()): boolean {
    if (!callout.expiresAt) return false;
    const at = Date.parse(callout.expiresAt);
    return Number.isFinite(at) && at <= now;
}

// ---------------------------------------------------------------------------
// Writing — one range, never the whole body
// ---------------------------------------------------------------------------

/**
 * The range the three answer keys occupy, or `null` when they are absent or
 * are not contiguous.
 *
 * Contiguity is checked against the entry ORDER rather than assumed from the
 * key names, because a body may have been hand-written unsorted. A trio that
 * something has been interleaved into cannot be replaced or removed in one
 * step, and this file does not do two.
 */
function answerRange(body: ParsedBody): { from: number; to: number } | null {
    const indices: number[] = [];
    body.entries.forEach((entry, i) => {
        if ((ANSWER_KEYS as readonly string[]).includes(entry.key)) indices.push(i);
    });
    if (indices.length === 0) return null;
    for (let i = 1; i < indices.length; i += 1) {
        if (indices[i] !== indices[i - 1]! + 1) return null;
    }
    // Adjacency in `entries` is enough to rule out an `options:` block sitting
    // inside the run: its members follow its own top-level entry, which would
    // then have to be one of the indices skipped over.
    const first = body.entries[indices[0]!]!;
    const last = body.entries[indices[indices.length - 1]!]!;
    return { from: first.lineStart, to: last.lineEnd };
}

/**
 * Where a fresh answer goes: immediately before the first key that sorts after
 * `answeredBy`, which for the keys this payload uses is the very top of the
 * body.
 *
 * Derived rather than hard-coded to line 0, so a body carrying a key nobody
 * here has heard of still gets a sorted result instead of an answer wedged in
 * front of it.
 */
function answerInsertion(body: ParsedBody, rows: string): TextRangeEdit {
    const after = body.entries.find((e) => e.key > LAST_ANSWER_KEY);
    if (after) return { from: after.lineStart, to: after.lineStart, insert: `${rows}\n` };
    return { from: body.end, to: body.end, insert: `\n${rows}` };
}

/**
 * The edit that answers a callout — ONE range, always.
 *
 * Replaces an existing answer where one is already recorded and can be
 * replaced in a single step; inserts the trio otherwise. Returns `null` when
 * there is nothing to do, when the body is not editable, or when the existing
 * answer is not contiguous (see `answerRange`).
 *
 * `by` and `at` are optional: an answer with no attribution is still an
 * answer, and inventing `answeredBy: 'someone'` would be worse than the field
 * being absent.
 */
export function answerHitlEdit(
    source: string,
    params: { answer: string; by?: string; at?: string },
): TextRangeEdit | null {
    const body = parseBody(source);
    if (!body) return null;
    if (!valueOf(body, 'question')) return null;

    const answer = yamlScalar(params.answer);
    if (answer === null || params.answer === '') return null;

    const rows: string[] = [`answer: ${answer}`];
    if (params.at) {
        const at = yamlScalar(params.at);
        if (at === null) return null;
        rows.push(`answeredAt: ${at}`);
    }
    if (params.by) {
        const by = yamlScalar(params.by);
        if (by === null) return null;
        rows.push(`answeredBy: ${by}`);
    }
    const text = rows.join('\n');

    const existing = answerRange(body);
    if (existing) {
        if (source.slice(existing.from, existing.to) === text) return null;
        return { from: existing.from, to: existing.to, insert: text };
    }
    // A trio that exists but is not contiguous: refuse rather than write a
    // second `answer:` key beside the first.
    if (body.entries.some((e) => (ANSWER_KEYS as readonly string[]).includes(e.key))) return null;
    return answerInsertion(body, text);
}

/**
 * The edit that takes an answer back — the trio's lines and the break that
 * separated them from their neighbour, so what is left reparses identically.
 */
export function retractHitlEdit(source: string): TextRangeEdit | null {
    const body = parseBody(source);
    if (!body) return null;
    const range = answerRange(body);
    if (!range) return null;
    // Take the trailing newline when something follows, the leading one when
    // nothing does — so what is left has no blank line where the answer was.
    if (range.to < body.end) return { from: range.from, to: range.to + 1, insert: '' };
    // A body that is NOTHING but an answer has no callout left to retract into,
    // and there is no leading newline to take. `readHitl` already declines such
    // a body (no `question`), so no block can reach this — but the function is
    // exported, and returning a negative offset would corrupt the document.
    if (range.from === 0) return null;
    return { from: range.from - 1, to: range.to, insert: '' };
}

// ---------------------------------------------------------------------------
// Creating
// ---------------------------------------------------------------------------

/** What `hitlMacroText` will write. Every field but `question` is optional. */
export interface HitlDraft {
    id?: string;
    question: string;
    context?: string;
    askedBy?: string;
    assignee?: string;
    blocks?: string;
    expiresAt?: string;
    /** A scalar shorthand, or a choice with its consequence. */
    options?: readonly (string | { value: string; then?: string })[];
}

/**
 * The macro body for a callout — the bytes the chassis serializer would write
 * between the fences, keys alphabetical from `sortKeys: true`, with no
 * trailing newline (the closing fence supplies the final break).
 *
 * An empty `options` list is OMITTED rather than written as `options: []`.
 * They mean the same thing to a reader — the answer is free prose — and
 * leaving the key out keeps the two forms from having to be reconciled by an
 * edit later.
 */
export function hitlMacroText(draft: HitlDraft): string {
    const rows: string[] = [];
    const scalar = (v: string): string => yamlScalar(v) ?? "''";
    const pairs: [string, string | undefined][] = [
        ['askedBy', draft.askedBy],
        ['assignee', draft.assignee],
        ['blocks', draft.blocks],
        ['context', draft.context],
        ['expiresAt', draft.expiresAt],
        ['id', draft.id],
    ];
    for (const [key, value] of pairs) {
        if (value) rows.push(`${key}: ${scalar(value)}`);
    }

    const options = draft.options ?? [];
    if (options.length > 0) {
        rows.push('options:');
        for (const option of options) {
            if (typeof option === 'string') {
                rows.push(`${OPTION_MARKER}${scalar(option)}`);
            } else if (option.then) {
                rows.push(`${OPTION_MARKER}then: ${scalar(option.then)}`);
                rows.push(`${OPTION_INDENT}value: ${scalar(option.value)}`);
            } else {
                rows.push(`${OPTION_MARKER}${scalar(option.value)}`);
            }
        }
    }

    rows.push(`question: ${scalar(draft.question)}`);
    return rows.join('\n');
}
