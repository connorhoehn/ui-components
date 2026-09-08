// ui-components/src/components/doc-macros/HitlMacro.tsx
//
// `macro:hitl` — an agent's question, drawn as a card a person can answer
// inside the page.
//
// The second renderer registered through the macro registry, built to the
// shape `ActionItemsMacro` established. See `registry.ts` for why a renderer is
// a node view on `macro` rather than a node type of its own; none of that is
// re-litigated here.
//
// ## What answering actually is
//
// The same thing ticking an action item is: a minimal single-range text edit
// on the macro's own YAML body, dispatched as an ordinary `ReplaceStep`. It
// syncs through the page's Y.Doc, merges with a concurrent edit elsewhere in
// the block, appears in the suggestion fork as a proposal when the page is in
// suggestion mode, and undoes in one step. `answerHitlEdit` does the arithmetic
// and its header explains why the three keys an answer writes are always one
// contiguous range.
//
// ## The part that is NOT free, and the guard it needs
//
// An action item's tick has exactly one consumer: the document. A HITL answer
// has two — the document, and whatever the agent is actually polling. Those are
// not the same store and cannot be written in one transaction, because there is
// no server-side Y.Doc in this system at all.
//
// So `onAnswered` is the seam a host uses to mirror the answer to the queryable
// substrate (see `HITL_QUERYABILITY` in `hitlText.ts`), and this view treats
// the mirror as authoritative for whether the answer STUCK:
//
//   * the document edit lands first, so the page is responsive and the answer
//     is never lost to a network round trip;
//   * if the mirror rejects — the caller was not the addressee, the callout was
//     already answered, the request failed — the edit is RETRACTED with a
//     second `retractHitlEdit`, and the card says why.
//
// Without that, answering in a page whose row says otherwise is precisely the
// failure the inbox refuses to ship: a control that looks like it unblocked an
// agent and did not. A host that passes no `onAnswered` gets the document-only
// behaviour, which is honest as long as the document is the only reader — and
// that is the default, so a host has to opt IN to the two-store problem.

import { Extension } from '@tiptap/core';
import type { Plugin } from '@tiptap/pm/state';
import type { Node as PmNode } from '@tiptap/pm/model';
import { ReactMacroView } from './ReactMacroView';
import {
    MACRO_NODE_NAME,
    macroRendererPlugins,
    macroRendererStorage,
    type MacroRenderer,
    type MacroViewContext,
} from './registry';
import {
    HITL_MACRO_NAME,
    answerHitlEdit,
    hitlMacroText,
    readHitl,
    retractHitlEdit,
    setHitlAssigneeEdit,
    type HitlCallout,
    type HitlDraft,
} from './hitlText';
import type { TextRangeEdit } from './actionItemsText';
import { HitlBlock, hitlPhase, type HitlPerson } from './HitlBlock';

declare module '@tiptap/core' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Commands<ReturnType> {
        hitlMacro: {
            /** Inserts an agent -> human callout at the selection. */
            insertHitl: (draft: HitlDraft) => ReturnType;
            /**
             * Records an answer that was given SOMEWHERE ELSE — the mirror row,
             * answered from an inbox by somebody who never opened this page.
             *
             * The same one-range edit answering in the page makes, addressed by
             * the callout's `id` instead of by a node view. Returns false when
             * no callout carries that id, when the body is not one
             * `answerHitlEdit` will write to, and — deliberately — when the
             * body ALREADY carries an answer: see `HITL_CONVERGENCE`.
             */
            answerHitl: (params: {
                id: string;
                answer: string;
                answeredBy?: string;
                answeredAt?: string;
            }) => ReturnType;
        };
    }
}

/** What a host's mirror write reports back. */
export interface HitlMirrorResult {
    ok: boolean;
    /** Shown on the card when `ok` is false. */
    message?: string;
}

/** The answer, as the host's mirror needs to address it. */
export interface HitlAnsweredEvent {
    /** The callout's `id`. Empty when the body carries none. */
    id: string;
    answer: string;
    /** ISO, the same instant written into the body. */
    answeredAt: string;
    /** Empty when the host declared no identity. */
    answeredBy: string;
    /** The callout as it read immediately before the answer. */
    callout: HitlCallout;
}

export interface HitlMacroOptions {
    /**
     * Who is answering, for `answeredBy`. A string or a getter, because the
     * signed-in user outlives no editor and a host should not have to rebuild
     * the extension when it changes.
     *
     * Omitted writes no attribution at all, which is the honest result of not
     * knowing — inventing `answeredBy: someone` would be worse.
     */
    answeredBy?: string | (() => string | undefined);
    /** The clock, for `answeredAt` and for expiry. Defaults to `Date.now`. */
    now?: () => number;
    /**
     * Mirrors an answer to wherever the asker is actually reading.
     *
     * Return nothing for fire-and-forget, or a promise of `{ ok }`. A rejection
     * or `{ ok: false }` RETRACTS the document edit — see the file header.
     */
    onAnswered?: (event: HitlAnsweredEvent) => void | Promise<HitlMirrorResult | void>;
    /**
     * Who this page may address a callout to. Read through a getter for the
     * same reason `answeredBy` is: a roster arrives after the editor is built
     * and changes while it is open, and an extension configured once must not
     * freeze the first answer it got.
     *
     * Absent draws no picker — see `HitlBlock`'s `people`.
     */
    people?: () => readonly HitlPerson[];
    /**
     * The callout's QUERYABLE fields changed, so the host's row should be
     * brought in line with them: on insert, on a readdress, and whenever a peer
     * changes either through the CRDT.
     *
     * This is the body -> row half of `HITL_CONVERGENCE`, and it fires on every
     * client that has the page open rather than only on the one that made the
     * change — a projection maintained by one designated client would stop
     * being maintained the moment that client closed the tab. The host is
     * expected to make the write idempotent; `hitlMirrorRow` is what it should
     * write.
     *
     * Fired only when a MIRRORED field actually moved (id, question, addressee,
     * and whether an answer is recorded), never on ordinary typing elsewhere in
     * the block.
     */
    onCalloutChanged?: (callout: HitlCallout) => void;
}

/** The mirrored fields, as one comparable string. */
function mirrorSignature(callout: HitlCallout): string {
    return [
        callout.id,
        callout.assignee,
        callout.question,
        callout.answer === null ? '' : 'answered',
    ].join('\u0000');
}

function resolveIdentity(source: HitlMacroOptions['answeredBy']): string {
    if (typeof source === 'function') return source() ?? '';
    return source ?? '';
}

// ---------------------------------------------------------------------------
// The node view
// ---------------------------------------------------------------------------

class HitlView extends ReactMacroView {
    private callout: HitlCallout;

    private busy = false;

    private failure: string | null = null;

    /** The mirrored fields as of the last projection. See `onCalloutChanged`. */
    private signature: string;

    constructor(
        ctx: MacroViewContext,
        callout: HitlCallout,
        private readonly options: HitlMacroOptions,
    ) {
        super(ctx, HITL_MACRO_NAME);
        this.callout = callout;
        this.signature = mirrorSignature(callout);
        // On CREATION, not only on change: a view is built for a callout that
        // was just inserted here AND for one that arrived over the CRDT or was
        // already in the document when it opened. All three need the row to
        // exist, and only the first of them is an edit anybody made.
        this.options.onCalloutChanged?.(callout);
        this.schedule();
    }

    protected element() {
        const answered = this.callout.answer !== null;
        // `onRetract` is offered only when the answer can be removed in ONE
        // edit. `retractHitlEdit` returning null is the whole test, and asking
        // it here rather than inside the handler is what keeps the button from
        // existing when it would do nothing.
        const retractable =
            answered && this.editable && retractHitlEdit(this.node.textContent) !== null;
        return (
            <HitlBlock
                callout={this.callout}
                editable={this.editable}
                busy={this.busy}
                failure={this.failure}
                {...(this.options.now ? { now: this.options.now() } : {})}
                onAnswer={(answer) => this.answer(answer)}
                {...(this.options.people ? { people: this.options.people() } : {})}
                onAssign={(assignee) => this.assign(assignee)}
                {...(retractable ? { onRetract: () => this.retract() } : {})}
                {...(this.editable ? { onRemove: () => this.removeBlock() } : {})}
            />
        );
    }

    private apply(edit: TextRangeEdit | null): boolean {
        if (!edit) return false;
        return this.replaceText(edit.from, edit.to, edit.insert);
    }

    /**
     * Records an answer, then mirrors it — and takes it back if the mirror
     * refuses. See the file header.
     */
    private answer(answer: string): void {
        // Re-checked here and not only in the block: an expiry that passed
        // between the paint and the click must not be answerable, and the
        // block's `now` is a render-time value.
        if (hitlPhase(this.callout, this.options.now?.()) !== 'waiting') return;
        if (this.busy) return;

        const before = this.callout;
        const answeredAt = new Date(this.options.now?.() ?? Date.now()).toISOString();
        const answeredBy = resolveIdentity(this.options.answeredBy);
        const edit = answerHitlEdit(this.node.textContent, {
            answer,
            at: answeredAt,
            ...(answeredBy ? { by: answeredBy } : {}),
        });
        if (!this.apply(edit)) return;

        this.failure = null;
        const mirror = this.options.onAnswered?.({
            id: before.id,
            answer,
            answeredAt,
            answeredBy,
            callout: before,
        });
        if (!mirror) return;

        this.busy = true;
        this.schedule();
        const settle = (failure: string | null) => {
            this.busy = false;
            this.failure = failure;
            if (failure) this.retract();
            this.schedule();
        };
        void Promise.resolve(mirror).then(
            (result) =>
                settle(
                    result && result.ok === false
                        ? (result.message ?? 'The answer was not recorded.')
                        : null,
                ),
            (err: unknown) =>
                settle(
                    err instanceof Error
                        ? `The answer was not recorded: ${err.message}`
                        : 'The answer was not recorded.',
                ),
        );
    }

    private retract(): void {
        this.apply(retractHitlEdit(this.node.textContent));
    }

    /**
     * Readdresses the callout.
     *
     * No mirror round trip and no optimistic-then-retract dance, unlike
     * answering: the row does not own the addressee, the body does. The write
     * that follows is the ordinary projection every open client makes — it
     * lands through `update()` below, from the CRDT change this edit produces,
     * so a peer's readdress reprojects on their machine too.
     */
    private assign(assignee: string): void {
        if (this.busy) return;
        this.apply(setHitlAssigneeEdit(this.node.textContent, assignee));
    }

    update(node: PmNode): boolean {
        if (node.type !== this.node.type) return false;
        if (node.attrs.macroName !== HITL_MACRO_NAME) return false;
        // A body this view can no longer read hands the block back to
        // ProseMirror, which rebuilds it as the plain YAML fence. Drawing a
        // card from a payload we half-understood would be the one outcome
        // worse than showing the bytes.
        const callout = readHitl(node.textContent);
        if (!callout) return false;
        const changed = node.textContent !== this.node.textContent;
        this.node = node;
        this.callout = callout;
        // A remote answer clears a stale local failure: the callout is
        // answered now, and the message described an attempt that no longer
        // describes the state.
        if (changed && callout.answer !== null) this.failure = null;
        if (changed) this.schedule();
        // The projection, from whatever moved the body — this client's own
        // readdress, a peer's, or an answer arriving over the CRDT.
        const signature = mirrorSignature(callout);
        if (signature !== this.signature) {
            this.signature = signature;
            this.options.onCalloutChanged?.(callout);
        }
        return true;
    }

    /** React owns this subtree. Its DOM churn is not a document edit. */
    ignoreMutation(): boolean {
        return true;
    }

    /** The composer owns its own pointer and key events. */
    stopEvent(): boolean {
        return true;
    }
}

/**
 * The renderer.
 *
 * Exported so a host can register it into a `MacroRenderers` list directly
 * instead of adding the extension — the two are equivalent, and the options
 * are the same either way.
 */
export function hitlRenderer(options: HitlMacroOptions = {}): MacroRenderer {
    return {
        macroName: HITL_MACRO_NAME,
        // Cheap, and it is the route BACK: a body this reader declines renders
        // as the YAML fence, and `accepts` is how the card returns the moment
        // someone repairs it by hand.
        accepts: (node) => readHitl(node.textContent) !== null,
        create: (ctx: MacroViewContext) => {
            const callout = readHitl(ctx.node.textContent);
            return callout ? new HitlView(ctx, callout, options) : null;
        },
    };
}

// ---------------------------------------------------------------------------
// The extension
// ---------------------------------------------------------------------------

export const HitlMacro = Extension.create<HitlMacroOptions>({
    name: 'hitlMacro',

    addOptions() {
        return {};
    },

    addStorage: macroRendererStorage,

    addCommands() {
        return {
            insertHitl:
                (draft: HitlDraft) =>
                ({ state, commands }) => {
                    // Guard rather than assume: this extension can be
                    // registered without `MacroNode`, and inserting a node type
                    // the schema does not have throws inside the transaction.
                    if (!state.schema.nodes[MACRO_NODE_NAME]) return false;
                    if (!draft.question) return false;
                    return commands.insertContent([
                        {
                            type: MACRO_NODE_NAME,
                            attrs: { macroName: HITL_MACRO_NAME },
                            content: [{ type: 'text', text: hitlMacroText(draft) }],
                        },
                        // A landing spot for the caret: the macro node is
                        // `isolating`, so a block inserted at the end of a
                        // document would otherwise leave nowhere to keep
                        // writing. The chassis drops an empty trailing
                        // paragraph on normalise, so it never reaches the file.
                        { type: 'paragraph' },
                    ]);
                },

            /**
             * The inbox -> document half of `HITL_CONVERGENCE`.
             *
             * Scans for the callout carrying `id` and applies the same single
             * range `answerHitlEdit` computes for an in-page answer, so a
             * remote answer merges, undoes and shows up in the suggestion fork
             * exactly like one typed here — there is no second write path and
             * no second serialiser.
             *
             * Refuses an already-answered body rather than replacing it. Two
             * recorded answers means one of them was acted on, and quietly
             * overwriting the text on screen is how a document stops being
             * evidence; the host is told `false` and reports the disagreement.
             */
            answerHitl:
                (params) =>
                ({ state, tr, dispatch }) => {
                    const macro = state.schema.nodes[MACRO_NODE_NAME];
                    if (!macro) return false;
                    if (!params.id || !params.answer) return false;

                    let applied = false;
                    state.doc.descendants((node, pos) => {
                        if (applied) return false;
                        if (node.type !== macro) return undefined;
                        if (node.attrs.macroName !== HITL_MACRO_NAME) return false;
                        const callout = readHitl(node.textContent);
                        if (!callout || callout.id !== params.id) return false;
                        // Found it, so stop walking either way — a second
                        // callout with the same id is a document that is
                        // already broken and answering both would compound it.
                        if (callout.answer !== null) return false;
                        const edit = answerHitlEdit(node.textContent, {
                            answer: params.answer,
                            ...(params.answeredAt ? { at: params.answeredAt } : {}),
                            ...(params.answeredBy ? { by: params.answeredBy } : {}),
                        });
                        if (!edit) return false;
                        applied = true;
                        if (dispatch) {
                            // `pos + 1` skips the macro node's opening token,
                            // the same arithmetic `ReactMacroView.replaceText`
                            // does — offsets are into `node.textContent`.
                            const base = pos + 1;
                            if (edit.insert === '') tr.delete(base + edit.from, base + edit.to);
                            else {
                                tr.replaceWith(
                                    base + edit.from,
                                    base + edit.to,
                                    state.schema.text(edit.insert),
                                );
                            }
                        }
                        return false;
                    });
                    return applied;
                },
        };
    },

    addProseMirrorPlugins(): Plugin[] {
        return macroRendererPlugins(this.editor, this.name, hitlRenderer(this.options));
    },
});

export default HitlMacro;
