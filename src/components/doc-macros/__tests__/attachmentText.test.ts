// `macro:attachment`, as bytes. What matters is what the reader refuses (a
// card that lies about its size, a mystery box with no name) and how an `url:`
// is classified — hosted uploads need the host's credentials, absolute URLs
// follow `linkHref`'s rule, and nothing in between is followed at all.

import { describe, it, expect } from 'vitest';
import {
    attachmentHref,
    attachmentMacroText,
    isHostedUpload,
    readAttachment,
} from '../attachmentText';

// `url:` is single-quoted: `yamlScalar` keeps plain style for values that can
// carry no other reading, and a leading `/` is not one of them. js-yaml would
// leave it bare; both parse back to the same string, which is the contract.
const BODY = ['name: Q3 plan.pdf', 'size: 184320', 'type: application/pdf', "url: '/api/uploads/7f3c'"].join('\n');

describe('reading', () => {
    it('reads the body the insert command writes', () => {
        expect(readAttachment(BODY)).toEqual({
            name: 'Q3 plan.pdf',
            size: 184320,
            type: 'application/pdf',
            url: '/api/uploads/7f3c',
        });
    });

    it('requires a name and a url, and nothing else', () => {
        expect(readAttachment('url: /api/uploads/x')).toBeNull();
        expect(readAttachment('name: x')).toBeNull();
        expect(readAttachment('name: x\nurl: /api/uploads/x')).toEqual({
            name: 'x', size: null, type: '', url: '/api/uploads/x',
        });
    });

    it('declines a size it cannot print rather than showing "NaN B"', () => {
        expect(readAttachment('name: x\nsize: large\nurl: /api/uploads/x')).toBeNull();
        expect(readAttachment('name: x\nsize: -1\nurl: /api/uploads/x')).toBeNull();
    });

    it('declines a shape it does not understand, so the reader sees the fence', () => {
        expect(readAttachment('name: x\nurl: /a\nname: y')).toBeNull(); // duplicate
        expect(readAttachment('name: x\nurl: /a\n  nested: 1')).toBeNull();
        expect(readAttachment('name: |\n  block\nurl: /a')).toBeNull();
    });
});

describe('where the bytes are', () => {
    it('tells a hosted upload from everything else', () => {
        expect(isHostedUpload('/api/uploads/7f3c')).toBe(true);
        expect(isHostedUpload('https://x.local/api/uploads/7f3c')).toBe(false);
    });

    it('gives no direct href for a hosted upload — the host must lend its credentials', () => {
        expect(attachmentHref(readAttachment(BODY)!)).toBeNull();
    });

    it('follows linkHref for an absolute URL', () => {
        const a = readAttachment('name: x\nurl: https://files.local/x.pdf')!;
        expect(attachmentHref(a)).toBe('https://files.local/x.pdf');
        const bad = readAttachment("name: x\nurl: 'javascript:alert(1)'")!;
        expect(attachmentHref(bad)).toBeNull();
    });
});

describe('creating', () => {
    it('writes alphabetical keys with a bare integer size', () => {
        expect(
            attachmentMacroText({ name: 'Q3 plan.pdf', size: 184320, type: 'application/pdf', url: '/api/uploads/7f3c' }),
        ).toBe(BODY);
    });

    it('omits what it was not told, and round-trips', () => {
        const text = attachmentMacroText({ name: "Ada's notes.txt", url: '/api/uploads/1' });
        expect(text).toBe("name: 'Ada''s notes.txt'\nurl: '/api/uploads/1'");
        expect(readAttachment(text)).toEqual({ name: "Ada's notes.txt", size: null, type: '', url: '/api/uploads/1' });
    });
});
