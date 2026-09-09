// ui-components/src/components/doc-macros/attachmentText.ts
//
// `macro:attachment` — a file that belongs to the page.
//
//     ```macro:attachment
//     name: Q3 plan.pdf
//     size: 184320
//     type: application/pdf
//     url: /api/uploads/7f3c…
//     ```
//
// ## The body carries a REFERENCE, never the bytes
//
// Same rule `macro:diagram` established, for the same arithmetic
// `useDocumentImageUpload` spells out: the body is a Y.Doc replicated to every
// participant on every keystroke and kept in the update history forever. A
// 2MB PDF base64-encoded into it is 2.7MB of CRDT payload per reader, for good.
// So the block stores where the bytes are, and the bytes live in the upload
// store the page's pictures already use.
//
// ## Why this is a citizen
//
// `file-upload` is the last SECTION type with no page representation — and
// unlike `link-block` it never had a section implementation either; it is a
// stub falling through to `DefaultRenderer`. So this is a build rather than a
// port, and it closes the last gap: after it, every kind of thing the sectioned
// world knew how to present has a form on a page.
//
// ## Nothing here is editable, and that is a decision
//
// Every field is set at upload time and describes the stored object. Renaming
// the card would not rename the file; changing `size:` would make the card
// lie. The only mutation a reader can make is to remove the block, which is
// the node view's, not this file's. There is therefore no `set*Edit` here —
// the first citizen without one.
//
// ## `url:` is trusted only as far as `linkHref` trusts it
//
// A same-origin `/api/uploads/…` path is the common case, and it is NOT a URL
// `linkHref` would accept (relative paths are refused there, correctly, because
// a page block renders in whatever app embedded it). The host resolves that
// path with the reader's own credentials — see `AttachmentMacroOptions`. An
// absolute URL falls back to the `linkHref` rule: http/https only, or text.

import { yamlScalar } from './macroListText';
import { linkHref } from './linksText';

/** The `macro:<name>` discriminator for a file. */
export const ATTACHMENT_MACRO_NAME = 'attachment';

export interface Attachment {
    /** Original filename. User content — shown, never used as a path. */
    name: string;
    /** Bytes, or `null` when the body does not say. */
    size: number | null;
    /** Declared MIME type, or `''`. Picks a layout; is never trusted. */
    type: string;
    /** Where the bytes are, VERBATIM. */
    url: string;
}

/** The prefix a host-resolved upload carries. */
export const UPLOAD_PATH_PREFIX = '/api/uploads/';

/** True for an `url:` the host must fetch with credentials rather than link. */
export function isHostedUpload(url: string): boolean {
    return url.startsWith(UPLOAD_PATH_PREFIX);
}

/** True when the card should try to show the file rather than name it. */
export function isImageAttachment(a: { type: string }): boolean {
    return a.type.startsWith('image/');
}

// ---------------------------------------------------------------------------
// Reading — a flat mapping, same subset `fieldText` reads
// ---------------------------------------------------------------------------

const KEY_RE = /^([A-Za-z][A-Za-z0-9_-]*):/;

function unquote(raw: string): string | null {
    const v = raw.trim();
    if (v === '') return '';
    if (v.startsWith('|') || v.startsWith('>')) return null;
    if (v.startsWith("'")) {
        if (v.length < 2 || !v.endsWith("'")) return null;
        return v.slice(1, -1).replace(/''/g, "'");
    }
    if (v.startsWith('"')) {
        if (v.length < 2 || !v.endsWith('"')) return null;
        return v.slice(1, -1).replace(/\\"/g, '"');
    }
    return v;
}

/**
 * Parse an attachment body, or `null` when this is not one we can draw.
 *
 * `name:` and `url:` are required — a card with no name is a mystery box and
 * one with no URL is a name lying on the floor. `size:` must be a non-negative
 * integer when present; a body that says `size: large` is declined rather than
 * shown as "NaN B".
 */
export function readAttachment(source: string): Attachment | null {
    const seen = new Map<string, string>();
    for (const line of source.split('\n')) {
        if (line.trim() === '') continue;
        const m = KEY_RE.exec(line);
        // A flat mapping and nothing else; anything else is the fence.
        if (!m) return null;
        const value = unquote(line.slice(m[0].length));
        if (value === null) return null;
        if (seen.has(m[1]!)) return null; // duplicate key — a shape we will not guess at
        seen.set(m[1]!, value);
    }
    const name = seen.get('name') ?? '';
    const url = seen.get('url') ?? '';
    if (!name || !url) return null;

    const rawSize = seen.get('size');
    let size: number | null = null;
    if (rawSize !== undefined && rawSize !== '') {
        if (!/^\d+$/.test(rawSize)) return null;
        size = Number(rawSize);
    }
    return { name, size, type: seen.get('type') ?? '', url };
}

/** True when a node's text is an attachment body we would draw. */
export function acceptsAttachment(source: string): boolean {
    return readAttachment(source) !== null;
}

/**
 * The `href` a reader may follow directly, or `null` when the host must
 * resolve it (a hosted upload) or when it is unsafe (anything `linkHref`
 * refuses). Callers check `isHostedUpload` first to tell the two apart.
 */
export function attachmentHref(a: Attachment): string | null {
    if (isHostedUpload(a.url)) return null;
    return linkHref(a.url);
}

// ---------------------------------------------------------------------------
// Creating
// ---------------------------------------------------------------------------

export interface AttachmentDraft {
    name: string;
    size?: number;
    type?: string;
    url: string;
}

/**
 * The macro body for a file — alphabetical keys, because `sortKeys: true` is
 * what the chassis dumps, and no trailing newline (the closing fence supplies
 * it). `size:` is written plain: js-yaml leaves an integer bare.
 */
export function attachmentMacroText(draft: AttachmentDraft): string {
    const rows = [`name: ${yamlScalar(draft.name) ?? "''"}`];
    if (draft.size !== undefined && Number.isFinite(draft.size) && draft.size >= 0) {
        rows.push(`size: ${Math.floor(draft.size)}`);
    }
    if (draft.type) rows.push(`type: ${yamlScalar(draft.type) ?? "''"}`);
    rows.push(`url: ${yamlScalar(draft.url) ?? "''"}`);
    return rows.join('\n');
}
