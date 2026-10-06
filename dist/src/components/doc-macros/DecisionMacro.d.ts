import { Extension } from '@tiptap/core';
import { type MacroRenderer } from './registry';
import { type DecisionDraft } from './decisionText';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}
export interface DecisionMacroOptions {
    /**
     * Who is changing the status, for `decidedBy`. A string or a getter,
     * because the signed-in user outlives no editor and a host should not have
     * to rebuild the extension when it changes.
     *
     * Omitted writes no attribution at all, which is the honest result of not
     * knowing — inventing `decidedBy: someone` would be worse.
     */
    decidedBy?: string | (() => string | undefined);
    /** The clock, for `decidedAt`. Defaults to `Date.now`. */
    now?: () => number;
}
/**
 * The renderer.
 *
 * Exported so a host can register it into a `MacroRenderers` list directly
 * instead of adding the extension — the two are equivalent, and the options
 * are the same either way.
 */
export declare function decisionRenderer(options?: DecisionMacroOptions): MacroRenderer;
export declare const DecisionMacro: Extension<DecisionMacroOptions, any>;
export default DecisionMacro;
//# sourceMappingURL=DecisionMacro.d.ts.map