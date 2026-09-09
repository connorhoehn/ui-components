// `macro:attachment` in a real editor: the two host seams, and the degradation
// order when a host lends nothing.

import { describe, it, expect, afterEach, vi } from 'vitest';
import { act } from 'react';
import { Editor, Node } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { AttachmentMacro, type AttachmentMacroOptions } from '../AttachmentMacro';

const LocalMacro = Node.create({
    name: 'macro',
    group: 'block',
    content: 'text*',
    code: true,
    marks: '_',
    defining: true,
    isolating: true,
    addAttributes() {
        return {
            macroName: {
                default: 'unknown',
                parseHTML: (el: HTMLElement) => el.getAttribute('data-macro') ?? 'unknown',
                renderHTML: (attrs: Record<string, unknown>) => ({ 'data-macro': attrs.macroName }),
            },
        };
    },
    parseHTML() {
        return [{ tag: 'pre[data-macro]', preserveWhitespace: 'full' as const }];
    },
    renderHTML() {
        return ['pre', {}, ['code', 0]] as never;
    },
});

const HOSTED = 'name: Q3 plan.pdf\nsize: 184320\ntype: application/pdf\nurl: /api/uploads/7f3c';
const IMAGE = 'name: shot.png\ntype: image/png\nurl: /api/uploads/img1';
const ABSOLUTE = "name: spec.pdf\nurl: 'https://files.local/spec.pdf'";

let editor: Editor | null = null;
let element: HTMLElement | null = null;

function mount(options: AttachmentMacroOptions, body: string, editable = true): Editor {
    element = document.createElement('div');
    document.body.appendChild(element);
    editor = new Editor({
        element,
        editable,
        extensions: [Document, Paragraph, Text, LocalMacro, AttachmentMacro.configure(options)] as never,
        content: `<pre data-macro="attachment"><code>${body}</code></pre>`,
    });
    return editor;
}

afterEach(() => {
    editor?.destroy();
    editor = null;
    element?.remove();
    element = null;
});

async function run(fn: () => void): Promise<void> {
    await act(async () => {
        fn();
        await new Promise((r) => setTimeout(r, 0));
    });
}

const testId = (e: Editor, id: string) => e.view.dom.querySelector(`[data-testid="${id}"]`);

describe('opening', () => {
    it('opens a hosted upload through the host, never through an anchor', async () => {
        const open = vi.fn();
        let e!: Editor;
        await run(() => { e = mount({ open }, HOSTED); });
        // An anonymous `<a href="/api/uploads/…">` is a 403 waiting to happen.
        expect(testId(e, 'attachment-anchor')).toBeNull();
        await run(() => (testId(e, 'attachment-open') as HTMLElement).click());
        expect(open).toHaveBeenCalledWith(expect.objectContaining({ url: '/api/uploads/7f3c', name: 'Q3 plan.pdf' }));
        expect(testId(e, 'attachment-meta')?.textContent).toBe('180.0 KB · application/pdf');
    });

    it('is text, not a broken link, when the host lends nothing', async () => {
        let e!: Editor;
        await run(() => { e = mount({}, HOSTED); });
        expect(testId(e, 'attachment-open')).toBeNull();
        expect(testId(e, 'attachment-anchor')).toBeNull();
        // The reader still learns a file was here and what it was called.
        expect(testId(e, 'attachment-name')?.textContent).toBe('Q3 plan.pdf');
        expect(testId(e, 'attachment')?.getAttribute('data-openable')).toBe('false');
    });

    it('is an ordinary anchor for an absolute URL', async () => {
        let e!: Editor;
        await run(() => { e = mount({}, ABSOLUTE); });
        const a = testId(e, 'attachment-anchor') as HTMLAnchorElement;
        expect(a.getAttribute('href')).toBe('https://files.local/spec.pdf');
        expect(a.getAttribute('rel')).toContain('noopener');
    });
});

describe('previewing', () => {
    it('asks the host once for an image and paints what comes back', async () => {
        const resolve = vi.fn(async () => 'blob:preview-1');
        let e!: Editor;
        await run(() => { e = mount({ resolve }, IMAGE); });
        await run(() => {});
        expect(resolve).toHaveBeenCalledTimes(1);
        expect((testId(e, 'attachment-preview') as HTMLImageElement).getAttribute('src')).toBe('blob:preview-1');
    });

    it('does not ask for a file that is not an image', async () => {
        const resolve = vi.fn(async () => 'blob:never');
        let e!: Editor;
        await run(() => { e = mount({ resolve }, HOSTED); });
        await run(() => {});
        expect(resolve).not.toHaveBeenCalled();
        expect(testId(e, 'attachment-preview')).toBeNull();
    });
});

describe('editing', () => {
    it('offers Remove to an editor and nothing to a reader', async () => {
        let e!: Editor;
        await run(() => { e = mount({}, HOSTED, false); });
        expect(testId(e, 'attachment-remove')).toBeNull();
        e.destroy();
        await run(() => { e = mount({}, HOSTED, true); });
        expect(testId(e, 'attachment-remove')).not.toBeNull();
    });

    it('inserts through the command and refuses a draft with no url', async () => {
        let e!: Editor;
        await run(() => { e = mount({}, HOSTED); });
        expect(e.commands.insertAttachment({ name: 'x', url: '' })).toBe(false);
        await run(() => {
            e.commands.insertAttachment({ name: 'notes.txt', size: 12, type: 'text/plain', url: '/api/uploads/n1' });
        });
        expect(e.view.dom.querySelectorAll('[data-testid="attachment"]')).toHaveLength(2);
    });
});

describe('degradation', () => {
    it('falls back to the fence for a body it cannot draw', async () => {
        let e!: Editor;
        await run(() => { e = mount({}, 'name: x\nsize: large\nurl: /api/uploads/x'); });
        expect(testId(e, 'attachment')).toBeNull();
        expect(e.view.dom.textContent).toContain('size: large');
    });
});
