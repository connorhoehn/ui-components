// ui-components/src/components/doc-macros/ReactMacroView.ts
//
// The part of a macro node view that every React-drawn macro needs, and that
// is easy to get subtly wrong.
//
// Extracted from `DiagramMacroView`, unchanged in behaviour, because the two
// hazards it handles are not diagram-specific and the next renderer would
// otherwise rediscover both:
//
//  1. **Never paint synchronously.** ProseMirror builds node views from inside
//     `EditorView`'s construction, and `@tiptap/react` constructs the view from
//     inside React's own work — so a synchronous `root.render()` is a nested
//     update during a render phase, which React reports as *"Render methods
//     should be a pure function of props and state"*. Verified in the browser:
//     the warning appears on every page holding such a block, and disappears
//     when the paint is deferred by one microtask. Coalesced, because a single
//     transaction can call `update()` more than once.
//
//  2. **Never unmount synchronously.** React refuses to unmount a root from
//     inside a render or a commit, and ProseMirror destroys node views from
//     inside its own update cycle. Unmounting inline logs a warning and can
//     leave the subtree's listeners attached.
//
// Subclasses implement `element()` and get `dom`, scheduling, `refresh()` and
// teardown for free.

import type { ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import type { Node as PmNode } from '@tiptap/pm/model';
import type { EditorView } from '@tiptap/pm/view';
import type { MacroNodeView, MacroViewContext } from './registry';

export abstract class ReactMacroView implements MacroNodeView {
    /** The node view's outer element. `data-macro` is set for the caller. */
    readonly dom: HTMLElement;

    protected node: PmNode;

    protected readonly view: EditorView;

    protected readonly getPos: () => number | undefined;

    private readonly host: HTMLElement;

    private readonly root: Root;

    private dead = false;

    private queued = false;

    constructor(ctx: MacroViewContext, macroName: string) {
        this.node = ctx.node;
        this.view = ctx.view;
        this.getPos = ctx.getPos;
        this.dom = document.createElement('div');
        this.dom.setAttribute('data-macro', macroName);
        this.host = document.createElement('div');
        this.dom.appendChild(this.host);
        this.root = createRoot(this.host);
    }

    /** What to draw for the node this view currently holds. */
    protected abstract element(): ReactElement;

    /** Queues a repaint. Safe to call from a constructor or a transaction. */
    protected schedule(): void {
        if (this.queued || this.dead) return;
        this.queued = true;
        queueMicrotask(() => {
            this.queued = false;
            if (!this.dead) this.root.render(this.element());
        });
    }

    /** Called by the host plugin when `EditorView.editable` flips. */
    refresh(): void {
        this.schedule();
    }

    /** True when the document allows edits. Read LIVE, never cached. */
    protected get editable(): boolean {
        return this.view.editable;
    }

    /**
     * Replaces a range of the macro's TEXT.
     *
     * `from`/`to` are offsets into `node.textContent`; `+1` skips the macro
     * node's opening token, exactly as `setMacroData` does in realtime-modules.
     *
     * This is the only way a renderer should change its payload, and it is what
     * makes an in-block interaction a first-class document edit: it is an
     * ordinary `ReplaceStep` on a textblock, so Y.js merges it, undo reverses
     * it, and the suggestion fork wraps it in `suggestionDelete` /
     * `suggestionInsert` marks like any other typing.
     */
    protected replaceText(from: number, to: number, insert: string): boolean {
        if (!this.editable) return false;
        const pos = this.getPos();
        if (pos === undefined) return false;
        const base = pos + 1;
        const tr = this.view.state.tr;
        if (insert === '') tr.delete(base + from, base + to);
        else tr.replaceWith(base + from, base + to, this.view.state.schema.text(insert));
        this.view.dispatch(tr);
        return true;
    }

    /** Takes the whole block off the page. */
    protected removeBlock(): boolean {
        const pos = this.getPos();
        if (pos === undefined) return false;
        this.view.dispatch(this.view.state.tr.delete(pos, pos + this.node.nodeSize));
        return true;
    }

    destroy(): void {
        this.dead = true;
        const root = this.root;
        queueMicrotask(() => root.unmount());
    }
}

export default ReactMacroView;
