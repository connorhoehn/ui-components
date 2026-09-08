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
import { NodeSelection, TextSelection, type Selection } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';
import { MACRO_NODE_NAME, macroGroupLabel, type MacroNodeView, type MacroViewContext } from './registry';

/**
 * Elements whose own Escape handler is a CANCEL, not an exit.
 *
 * A macro's inline text fields treat Escape as "throw this edit away" — see
 * `useDraft`, which exists because the obvious implementation committed the
 * keystrokes it was supposed to discard. So Escape in one of these must not
 * also jump the caret out of the block: it would fire a cancel and a
 * navigation on one keypress, and the person who pressed it would not know
 * which of the two they got.
 */
function isTextEntry(el: EventTarget | null): boolean {
    if (!(el instanceof HTMLElement)) return false;
    if (el.isContentEditable) return true;
    const tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
}

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
        // ## What a screen reader is told this block IS
        //
        // Measured before this: every macro block on a live page-shaped
        // document rendered as a bare `<div data-macro="decision">` with no
        // role and no name. Tab reached all thirteen controls inside the three
        // blocks — the widgets were operable — but nothing said where one
        // block ended and the next began, so "Accepted / Rejected /
        // Superseded" arrived as three unlabelled buttons in the middle of the
        // prose. A named group is the smallest thing that fixes it: browse
        // mode announces the boundary and the name on entry, and the visible
        // card is unchanged.
        this.dom.setAttribute('role', 'group');
        this.dom.setAttribute('aria-label', macroGroupLabel(macroName));
        // Not in the tab order — this is where Escape PARKS focus on its way
        // out of an inline edit, so it has to be focusable and must not add a
        // stop of its own. See `onEscape`.
        this.dom.setAttribute('tabindex', '-1');
        this.dom.addEventListener('keydown', this.onEscape);
        this.host = document.createElement('div');
        this.dom.appendChild(this.host);
        this.root = createRoot(this.host);
    }

    /**
     * The way back to the prose.
     *
     * `stopEvent()` returning true is what hands keys to the widget instead of
     * to ProseMirror, and it is also what traps a keyboard user inside one.
     * Measured on a live document, with focus on the decision block's
     * "Accepted" button: Escape left `document.activeElement` exactly where it
     * was, and so did ArrowDown — the editor never saw either key, and the
     * only way back to the text was Shift-Tab past every control in the block.
     * Escape in an action item's text field was worse: the field's own handler
     * blurs to cancel, so focus landed on `body`.
     *
     * Two stages, because Escape already means "cancel this edit" inside a
     * field and must keep meaning it:
     *
     *   * from a text field — the field cancels (its own React handler has
     *     already run by the time this bubbles out of the React root), and
     *     focus parks on the block itself rather than falling to `body`
     *   * from anywhere else in the block — the caret goes to the position
     *     immediately after the node and the editor takes focus back
     *
     * So Escape from a half-typed field is one press to abandon the edit and a
     * second to leave, and Escape from a button is a single press back to the
     * text. Bubble phase on `this.dom`, which is OUTSIDE the React root
     * (`this.host`) — that ordering is what lets the field's cancel run first.
     */
    private readonly onEscape = (ev: KeyboardEvent): void => {
        if (ev.key !== 'Escape') return;
        if (isTextEntry(ev.target) && ev.target !== this.dom) {
            ev.stopPropagation();
            this.dom.focus();
            return;
        }
        ev.stopPropagation();
        ev.preventDefault();
        this.exitToText();
    };

    /**
     * Puts the caret in the nearest REAL prose and hands focus back.
     *
     * The obvious implementation is `TextSelection.near(resolve(after), 1)`,
     * and it has a hole that only shows up when two macros are adjacent.
     * Measured on a live document holding action items, then a decision, then
     * a HITL callout: Escape from the decision's "Rejected" button moved focus
     * onto the ProseMirror element — the class list said `ProseMirror-focused`
     * — and then eleven typed characters went nowhere. `near` had found the
     * next valid text position, which was inside the HITL macro's own text,
     * and a React node view has no `contentDOM`, so ProseMirror cannot render
     * a selection there and drops every keystroke. Focus that lands somewhere
     * you cannot type is worse than focus that never moved, because it looks
     * like it worked.
     *
     * So the search skips macro nodes outright and asks for a textblock that
     * is not one: forward first, backward if the block is last, and a node
     * selection on the block itself if the document is nothing but macros —
     * which at least selects it visibly and lets an arrow key walk out.
     */
    protected exitToText(): void {
        const pos = this.getPos();
        if (pos === undefined) { this.view.focus(); return; }
        const { state } = this.view;
        const after = Math.min(pos + this.node.nodeSize, state.doc.content.size);
        const sel = this.proseNear(after) ?? NodeSelection.create(state.doc, pos);
        this.view.dispatch(state.tr.setSelection(sel).scrollIntoView());
        this.view.focus();
    }

    /** The closest typable textblock at or after `from`, else the last before it. */
    private proseNear(from: number): Selection | null {
        const { doc } = this.view.state;
        let forward: number | null = null;
        let backward: number | null = null;
        doc.descendants((node, pos) => {
            if (forward !== null) return false;
            // Never descend into a macro: its text is a payload, not prose,
            // and its node view cannot render a selection at all.
            if (node.type.name === MACRO_NODE_NAME) return false;
            if (!node.isTextblock) return true;
            if (pos >= from) forward = pos + 1;
            else backward = pos + 1;
            return false;
        });
        const target = forward ?? backward;
        return target === null ? null : TextSelection.create(doc, target);
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

    /** Renames the group — for a block whose payload says more than its type. */
    protected setAccessibleName(name: string): void {
        this.dom.setAttribute('aria-label', name);
    }

    destroy(): void {
        this.dead = true;
        this.dom.removeEventListener('keydown', this.onEscape);
        const root = this.root;
        queueMicrotask(() => root.unmount());
    }
}

export default ReactMacroView;
