// `macro:hitl` in a real editor.
//
// The text arithmetic is covered on strings in `hitlText.test.ts`. What needs
// an editor is the part that is a PROMISE rather than a calculation:
//
//   * an expired callout draws no answer control — not a disabled one, none;
//   * an answer is ONE `ReplaceStep`, so it merges, undoes and shows up in the
//     suggestion fork like any other typing;
//   * a mirror write that refuses TAKES THE ANSWER BACK out of the document
//     and says so, rather than leaving a page that claims an agent was
//     unblocked when it was not;
//   * a body the reader declines degrades to the literal YAML fence, and comes
//     back the moment someone repairs it.
//
// `LocalMacro` is the same local copy of realtime-modules' `MacroNode` that
// `macroRegistry.test.tsx` uses, for the same reason: importing the real one
// pulls the Tiptap canvas adapter and a second `prosemirror-*` graph.

import { describe, it, expect, afterEach, vi } from 'vitest';
import { act } from 'react';
import { Editor, Node } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { ReplaceStep } from '@tiptap/pm/transform';
import { HitlMacro, type HitlMacroOptions } from '../HitlMacro';
import { readHitl } from '../hitlText';

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

const WAITING = [
    'askedBy: release-agent',
    'assignee: dev-bob',
    'blocks: the 2.190.0 release',
    'id: hitl-1',
    'options:',
    '  - then: the release train continues',
    '    value: ship it',
    '  - hold',
    'question: Ship now?',
].join('\n');

const EXPIRING = ["expiresAt: '2026-09-08T00:00:00.000Z'", 'question: Ship now?'].join('\n');
const EXPIRES_AT = Date.parse('2026-09-08T00:00:00.000Z');

let editor: Editor | null = null;
let element: HTMLElement | null = null;

function mount(options: HitlMacroOptions, body: string, editable = true): Editor {
    element = document.createElement('div');
    document.body.appendChild(element);
    editor = new Editor({
        element,
        editable,
        extensions: [Document, Paragraph, Text, LocalMacro, HitlMacro.configure(options)] as never,
        content: `<pre data-macro="hitl"><code>${body}</code></pre>`,
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
const body = (e: Editor) => e.state.doc.child(0).textContent;

describe('drawing a callout', () => {
    it('draws the question, the addressee, what is blocked and each choice with its consequence', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({}, WAITING);
        });
        expect(testId(e, 'hitl')?.getAttribute('data-phase')).toBe('waiting');
        expect(testId(e, 'hitl-question')?.textContent).toBe('Ship now?');
        expect(testId(e, 'hitl-assignee')?.textContent).toContain('dev-bob');
        expect(testId(e, 'hitl-blocks')?.textContent).toContain('the 2.190.0 release');
        expect(testId(e, 'hitl-option-0')?.textContent).toBe('ship it');
        expect(testId(e, 'hitl-option-0-then')?.textContent).toContain(
            'the release train continues',
        );
        // A choice with no declared consequence says nothing rather than
        // inventing one.
        expect(testId(e, 'hitl-option-1-then')).toBeNull();
    });

    it('offers a free-prose composer when the callout declared no options', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({}, 'question: What should I do?');
        });
        expect(testId(e, 'hitl-draft')).not.toBeNull();
        expect(testId(e, 'hitl-options')).toBeNull();
    });

    it('falls back to the literal YAML fence for a body it cannot read, and comes back when repaired', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({}, 'askedBy: agent\nmeta:\n  nested: 1');
        });
        expect(testId(e, 'hitl')).toBeNull();
        expect(e.view.dom.querySelector('pre[data-macro="hitl"] code')).not.toBeNull();

        // Repairing it by hand is a text edit like any other, and `accepts` is
        // what lets the fence hand the block back.
        await run(() => {
            e.commands.setContent('<pre data-macro="hitl"><code>question: Ship now?</code></pre>');
        });
        expect(testId(e, 'hitl')).not.toBeNull();
    });
});

describe('the control that must not be drawn', () => {
    it('draws no answer control at all once the asker has stopped waiting', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({ now: () => EXPIRES_AT }, EXPIRING);
        });
        expect(testId(e, 'hitl')?.getAttribute('data-phase')).toBe('expired');
        expect(testId(e, 'hitl-draft')).toBeNull();
        expect(testId(e, 'hitl-options')).toBeNull();
        expect(testId(e, 'hitl-expired-note')).not.toBeNull();
    });

    it('still draws it one millisecond earlier', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({ now: () => EXPIRES_AT - 1 }, EXPIRING);
        });
        expect(testId(e, 'hitl')?.getAttribute('data-phase')).toBe('waiting');
        expect(testId(e, 'hitl-draft')).not.toBeNull();
    });

    it('draws none on a page nobody may edit, and says what is being waited on', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({}, WAITING, false);
        });
        expect(testId(e, 'hitl-options')).toBeNull();
        expect(testId(e, 'hitl-readonly-note')?.textContent).toContain('ship it, hold');
    });
});

describe('answering', () => {
    it('is a single ReplaceStep on the macro text', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({ answeredBy: 'dev-bob', now: () => 0 }, WAITING);
        });

        const steps: unknown[] = [];
        e.on('transaction', ({ transaction }) => steps.push(...transaction.steps));
        await run(() => {
            (testId(e, 'hitl-option-0') as HTMLButtonElement).click();
        });

        expect(steps).toHaveLength(1);
        expect(steps[0]).toBeInstanceOf(ReplaceStep);
        expect(readHitl(body(e))).toMatchObject({
            answer: 'ship it',
            answeredBy: 'dev-bob',
            answeredAt: '1970-01-01T00:00:00.000Z',
        });
        expect(testId(e, 'hitl')?.getAttribute('data-phase')).toBe('answered');
        // One step is also what makes it one undo and one suggestion mark —
        // neither is asserted here because both belong to extensions this
        // editor does not load; the step count is the thing they both read.
    });

    it('offers to retract, and retracting restores the body byte for byte', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({ answeredBy: 'dev-bob', now: () => 0 }, WAITING);
        });
        await run(() => {
            (testId(e, 'hitl-option-1') as HTMLButtonElement).click();
        });
        await run(() => {
            (testId(e, 'hitl-retract') as HTMLButtonElement).click();
        });
        expect(body(e)).toBe(WAITING);
        expect(testId(e, 'hitl')?.getAttribute('data-phase')).toBe('waiting');
    });

    it('does not offer to retract an answer it cannot remove in one edit', async () => {
        // Legal YAML, readable, but the trio is interleaved — so the button
        // that would half-remove it does not exist.
        const scattered = ['answer: hold', 'id: x', 'answeredBy: ana', 'question: Ship now?'].join(
            '\n',
        );
        let e!: Editor;
        await run(() => {
            e = mount({}, scattered);
        });
        expect(testId(e, 'hitl')?.getAttribute('data-phase')).toBe('answered');
        expect(testId(e, 'hitl-answer')?.textContent).toBe('hold');
        expect(testId(e, 'hitl-retract')).toBeNull();
    });
});

describe('the mirror', () => {
    it('is told what was answered, and where', async () => {
        const onAnswered = vi.fn();
        let e!: Editor;
        await run(() => {
            e = mount({ answeredBy: 'dev-bob', now: () => 0, onAnswered }, WAITING);
        });
        await run(() => {
            (testId(e, 'hitl-option-0') as HTMLButtonElement).click();
        });
        expect(onAnswered).toHaveBeenCalledTimes(1);
        expect(onAnswered.mock.calls[0]![0]).toMatchObject({
            id: 'hitl-1',
            answer: 'ship it',
            answeredBy: 'dev-bob',
            answeredAt: '1970-01-01T00:00:00.000Z',
        });
    });

    it('TAKES THE ANSWER BACK when the write refuses, and says why', async () => {
        // The whole point. Without this the page says the agent was unblocked
        // while the row it actually reads still says pending.
        let e!: Editor;
        await run(() => {
            e = mount(
                {
                    now: () => 0,
                    onAnswered: () =>
                        Promise.resolve({ ok: false, message: 'Only dev-bob may answer this.' }),
                },
                WAITING,
            );
        });
        await run(() => {
            (testId(e, 'hitl-option-0') as HTMLButtonElement).click();
        });
        expect(body(e)).toBe(WAITING);
        expect(testId(e, 'hitl')?.getAttribute('data-phase')).toBe('waiting');
        expect(testId(e, 'hitl-failure')?.textContent).toContain('Only dev-bob may answer this.');
        // The choices are still there — a refused answer is a retry, not a
        // dead end.
        expect(testId(e, 'hitl-option-0')).not.toBeNull();
    });

    it('takes it back on a rejection too', async () => {
        let e!: Editor;
        await run(() => {
            e = mount(
                { now: () => 0, onAnswered: () => Promise.reject(new Error('network down')) },
                WAITING,
            );
        });
        await run(() => {
            (testId(e, 'hitl-option-0') as HTMLButtonElement).click();
        });
        expect(body(e)).toBe(WAITING);
        expect(testId(e, 'hitl-failure')?.textContent).toContain('network down');
    });

    it('leaves the answer standing when the write succeeds', async () => {
        let e!: Editor;
        await run(() => {
            e = mount({ now: () => 0, onAnswered: () => Promise.resolve({ ok: true }) }, WAITING);
        });
        await run(() => {
            (testId(e, 'hitl-option-0') as HTMLButtonElement).click();
        });
        expect(readHitl(body(e))?.answer).toBe('ship it');
        expect(testId(e, 'hitl-failure')).toBeNull();
    });
});
