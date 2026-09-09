// `macro:links`, as bytes.
//
// The arithmetic itself is `macroListText`'s and is already pinned through the
// checklist. What is specific to this citizen — and what this file is for — is
// `linkHref`: the payload arrives from a hand-edited file or an agent's draft
// and becomes an `href`, so what it refuses matters more than what it renders.

import { describe, it, expect } from 'vitest';
import {
    addLinkEdit,
    linkHref,
    linksMacroText,
    readLinks,
    removeLinkEdit,
    setLinkLabelEdit,
    setLinkUrlEdit,
} from '../linksText';

const BODY = [
    'links:',
    '  - label: Runbook',
    "    url: 'https://runbooks.local/checkout'",
].join('\n');

/** Applies one edit, so a test reads as before/after rather than as offsets. */
function apply(source: string, edit: { from: number; to: number; insert: string } | null): string {
    if (!edit) throw new Error('expected an edit');
    return source.slice(0, edit.from) + edit.insert + source.slice(edit.to);
}

describe('linkHref', () => {
    it('accepts the three schemes a document link can safely carry', () => {
        expect(linkHref('https://example.com/a')).toBe('https://example.com/a');
        expect(linkHref('http://example.com/a')).toBe('http://example.com/a');
        expect(linkHref('mailto:ada@example.com')).toBe('mailto:ada@example.com');
    });

    it('refuses a scheme that would run script on the reader’s click', () => {
        // The reason this file exists. A page body is not trusted input.
        expect(linkHref('javascript:alert(1)')).toBeNull();
        expect(linkHref('JavaScript:alert(1)')).toBeNull();
        expect(linkHref('data:text/html,<script>alert(1)</script>')).toBeNull();
        expect(linkHref('vbscript:msgbox')).toBeNull();
    });

    it('promotes a bare host, because a person typing a link means a link', () => {
        expect(linkHref('example.com/docs')).toBe('https://example.com/docs');
        expect(linkHref('  example.com  ')).toBe('https://example.com/');
    });

    it('refuses a protocol-relative URL rather than inheriting the page’s scheme', () => {
        expect(linkHref('//evil.example/x')).toBeNull();
    });

    it('has nothing to say about an empty or unparseable value', () => {
        expect(linkHref('')).toBeNull();
        expect(linkHref('   ')).toBeNull();
        expect(linkHref('http://')).toBeNull();
    });
});

describe('reading', () => {
    it('reads the rows the chassis would have written', () => {
        expect(readLinks(BODY)).toEqual([
            { index: 0, label: 'Runbook', url: 'https://runbooks.local/checkout' },
        ]);
    });

    it('reads an empty list', () => {
        expect(readLinks('links: []')).toEqual([]);
    });

    it('declines a body it cannot edit safely, so the reader sees the fence', () => {
        expect(readLinks('items:\n  - text: not this macro')).toBeNull();
        expect(readLinks('links:\n  - label: x\n    nested:\n      deep: 1')).toBeNull();
        expect(readLinks("links: ['inline']")).toBeNull();
    });

    it('keeps a row that has a label and no URL', () => {
        // Half-written is a state a person is in while typing, not damage.
        expect(readLinks('links:\n  - label: Runbook')).toEqual([
            { index: 0, label: 'Runbook', url: '' },
        ]);
    });
});

describe('editing', () => {
    it('replaces the scalar alone when a label changes', () => {
        const edit = setLinkLabelEdit(BODY, 0, 'Checkout runbook');
        expect(BODY.slice(edit!.from, edit!.to)).toBe('Runbook');
        expect(readLinks(apply(BODY, edit))![0]!.label).toBe('Checkout runbook');
    });

    it('quotes a URL, and leaves it parsing back to the same string', () => {
        const next = apply(BODY, setLinkUrlEdit(BODY, 0, 'https://x.local/a?b=1&c=2'));
        expect(readLinks(next)![0]!.url).toBe('https://x.local/a?b=1&c=2');
    });

    it('appends a row with BOTH keys, even empty', () => {
        const next = apply(BODY, addLinkEdit(BODY));
        // A row that began with one key could never have that key removed —
        // `removeListItemKeyEdit` declines to strip an item's only entry, so
        // the row would be uneditable in one direction.
        expect(next).toBe([BODY, "  - label: ''", "    url: ''"].join('\n'));
        expect(readLinks(next)).toHaveLength(2);
    });

    it('comes back from an empty list in a single range', () => {
        const next = apply('links: []', addLinkEdit('links: []', 'Docs', 'https://d.local'));
        expect(next).toBe(["links:", '  - label: Docs', "    url: 'https://d.local'"].join('\n'));
    });

    it('writes `links: []` when the last row goes, not a bare key', () => {
        // A bare `links:` parses as null, so the block would come back as
        // merge damage rather than as an empty list.
        expect(apply(BODY, removeLinkEdit(BODY, 0))).toBe('links: []');
    });
});

describe('creating', () => {
    it('emits the bytes the chassis serializer would', () => {
        expect(linksMacroText([{ label: 'Runbook', url: 'https://r.local' }])).toBe(
            ['links:', '  - label: Runbook', "    url: 'https://r.local'"].join('\n'),
        );
        expect(linksMacroText([])).toBe('links: []');
    });

    it('round-trips through the reader', () => {
        const rows = [
            { label: "Ada's notes", url: 'https://n.local/ada' },
            { label: 'Ticket', url: 'https://t.local/1' },
        ];
        expect(readLinks(linksMacroText(rows))).toEqual(
            rows.map((r, index) => ({ index, ...r })),
        );
    });
});
