// ui-components/src/components/doc-macros/linksText.ts
//
// `macro:links` — the reference list, as a page block.
//
//     ```macro:links
//     links:
//       - label: Runbook
//         url: https://runbooks.local/checkout
//       - label: Dashboard
//         url: https://grafana.local/d/checkout
//     ```
//
// ## Why this is a citizen and not "just type some links"
//
// A page can already hold links in prose, so the case has to be made. It is
// the same case the SECTION world already settled: `src/renderers/link-block`
// has existed for a long time, it is fully implemented (label + url rows,
// editor and reader), and it does nothing at all on a page-shaped document.
// That is the exact shape of gap `decision` and `field` each closed — a
// presentation the sectioned world has and the canvas does not — and it is the
// last implemented section renderer left without a page representation
// (`file-upload` is the other, and it is still a stub falling through to
// `DefaultRenderer`).
//
// What a block buys over prose is that the set is STRUCTURED. "The runbook,
// the dashboard, the ticket" written into a sentence is three anchors a reader
// can follow and nothing can read; the same three as a macro body are a list a
// tool can pull off the page — which is the whole argument `MacroNode` makes
// for every citizen.
//
// ## Scheme safety is this file's job, not the block's
//
// A `url:` scalar arrives from a hand-edited markdown file, an agent's draft,
// or a paste, and it becomes an `href`. `javascript:` and `data:` in an href
// are script execution on somebody else's click, so `linkHref` below returns
// `null` for every scheme but http, https and mailto, and `LinksBlock` draws a
// row with no href as plain text.
//
// It lives here rather than in the block for the reason `readActionItems`
// lives here: the block is presentation and is handed already-safe data, so
// every consumer of the payload — the block, an export, a tool reading the
// page — gets the same answer about what is a link.
//
// Everything else about the format is `macroListText.ts`'s: one top-level key
// holding a block sequence of flat mappings, every mutation one minimal range.

import {
    addListItemEdit,
    entryOf,
    parseListBody,
    removeListItemEdit,
    setListItemKeyEdit,
    yamlScalar,
    type TextRangeEdit,
} from './macroListText';

const LIST_KEY = 'links';

/** The `macro:<name>` discriminator for a reference list. */
export const LINKS_MACRO_NAME = 'links';

/** One row of the list. */
export interface LinkRow {
    /** Position in `links`, 0-based. */
    index: number;
    /** The `label:` scalar. `''` when the row has none. */
    label: string;
    /** The `url:` scalar VERBATIM — not validated. See `linkHref`. */
    url: string;
}

/**
 * The schemes an `href` may carry, and the reason this list is short.
 *
 * `javascript:` runs script on the reader's click, and `data:` can carry an
 * HTML document that then runs script with this page's origin. Neither is a
 * hypothetical in a format whose bytes arrive from files and agents. Relative
 * URLs are excluded too: a page block is rendered in whatever app embedded it,
 * so `/admin/delete` means something different in each and nothing reliable in
 * any.
 */
const SAFE_SCHEMES = ['http:', 'https:', 'mailto:'];

/**
 * The `href` a row may be given, or `null` when it must render as text.
 *
 * A bare `example.com/x` is accepted and promoted to `https://` — a person
 * typing a link into a field means a link, and refusing it over a missing
 * scheme would be pedantry that shows them plain grey text instead.
 */
export function linkHref(url: string): string | null {
    const raw = url.trim();
    if (!raw) return null;
    // `//host/path` is protocol-relative and would inherit the page's scheme;
    // it is also how a `javascript:` payload is sometimes smuggled past a
    // naive prefix test, so it is not accepted as a bare host.
    const candidate = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(raw)
        ? raw
        : raw.startsWith('//')
          ? null
          : `https://${raw}`;
    if (candidate === null) return null;
    try {
        const parsed = new URL(candidate);
        return SAFE_SCHEMES.includes(parsed.protocol) ? parsed.href : null;
    } catch {
        return null;
    }
}

/**
 * The list a macro body describes, or `null` when the body is not the shape
 * this renderer edits — in which case the node view shows the fence.
 */
export function readLinks(source: string): LinkRow[] | null {
    const body = parseListBody(source, LIST_KEY);
    if (!body) return null;
    return body.items.map((item, index) => ({
        index,
        label: entryOf(item, 'label')?.scalar.value ?? '',
        url: entryOf(item, 'url')?.scalar.value ?? '',
    }));
}

/** Retitling one row, as an edit. */
export function setLinkLabelEdit(
    source: string,
    index: number,
    label: string,
): TextRangeEdit | null {
    return setListItemKeyEdit(source, LIST_KEY, index, 'label', label);
}

/** Repointing one row, as an edit. Stored verbatim; safety is at render. */
export function setLinkUrlEdit(source: string, index: number, url: string): TextRangeEdit | null {
    return setListItemKeyEdit(source, LIST_KEY, index, 'url', url);
}

/** The edit that removes one row. Removing the last writes `links: []`. */
export function removeLinkEdit(source: string, index: number): TextRangeEdit | null {
    return removeListItemEdit(source, LIST_KEY, index);
}

/**
 * The edit that appends a row.
 *
 * Both keys are always written, even empty, so the row has two entries from
 * the start: `removeListItemKeyEdit` declines to strip an item's only entry
 * (it would leave a bare `-` marker), and a row that began with one key would
 * therefore be uneditable in one direction.
 */
export function addLinkEdit(source: string, label = '', url = ''): TextRangeEdit | null {
    // Alphabetical, because `sortKeys: true` is what the chassis dumps.
    return addListItemEdit(source, LIST_KEY, [
        ['label', label],
        ['url', url],
    ]);
}

/**
 * The macro body for a reference list — byte-identical to what the chassis
 * serializer writes between the fences, with no trailing newline (the closing
 * fence supplies the final break).
 */
export function linksMacroText(rows: readonly { label?: string; url?: string }[]): string {
    if (rows.length === 0) return 'links: []';
    const out = rows.map((row) => {
        const pairs: [string, string][] = [
            ['label', row.label ?? ''],
            ['url', row.url ?? ''],
        ];
        return pairs
            .map(([k, v], i) => `${i === 0 ? '  - ' : '    '}${k}: ${yamlScalar(v) ?? "''"}`)
            .join('\n');
    });
    return ['links:', ...out].join('\n');
}
