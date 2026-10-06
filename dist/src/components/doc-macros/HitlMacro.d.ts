import { Extension } from '@tiptap/core';
import { type MacroRenderer } from './registry';
import { type HitlCallout, type HitlDraft } from './hitlText';
import { type HitlPerson } from './HitlBlock';
declare module '@tiptap/core' {
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
/**
 * The renderer.
 *
 * Exported so a host can register it into a `MacroRenderers` list directly
 * instead of adding the extension — the two are equivalent, and the options
 * are the same either way.
 */
export declare function hitlRenderer(options?: HitlMacroOptions): MacroRenderer;
export declare const HitlMacro: Extension<HitlMacroOptions, any>;
export default HitlMacro;
//# sourceMappingURL=HitlMacro.d.ts.map