import { Extension } from '@tiptap/core';
import { type MacroRenderer } from './registry';
import { type ActionItemMirrorRow } from './actionItemsText';
import { type AssignablePerson } from './ActionItemsBlock';
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}
export interface ActionItemsMacroOptions {
    /**
     * Who an item can be assigned to. `id` is the AUTH SUBJECT, because that
     * is what `/api/items/mine` queries on — a display name here is what once
     * left that endpoint unable to find a single assigned item.
     *
     * Read through a getter for the same reason `HitlMacroOptions.people` is:
     * a roster arrives after the editor is built and changes while it is open,
     * and an extension configured once must not freeze the first list it saw.
     *
     * Omitted renders no picker, which is the right answer for a host with no
     * directory: a control listing nobody is worse than no control.
     */
    people?: () => readonly AssignablePerson[];
    /**
     * An item's QUERYABLE fields changed, so the host's row should be brought
     * in line with them: on insert, on a reassignment, on a tick, and whenever
     * a peer changes any of them through the CRDT.
     *
     * Fires on every client that has the page open, which is why a host's
     * write has to be idempotent — a projection maintained by one designated
     * client would stop being maintained the moment that client closed the
     * tab. `ActionItemsMacroOptions` says nothing about how the row is stored;
     * see `actionItemMirrorRow` for what is in it and why an unassigned or
     * unidentified item produces nothing at all.
     *
     * Omitted means document-only, which is honest: with no host reading the
     * rows, nothing outside the page is out of step with the body.
     */
    onItemChanged?: (row: ActionItemMirrorRow) => void;
}
/**
 * The renderer.
 *
 * Exported so a host can register it into a `MacroRenderers` list directly
 * instead of adding the extension — the two are equivalent.
 */
export declare function actionItemsRenderer(options?: ActionItemsMacroOptions): MacroRenderer;
export declare const ActionItemsMacro: Extension<ActionItemsMacroOptions, any>;
export default ActionItemsMacro;
//# sourceMappingURL=ActionItemsMacro.d.ts.map