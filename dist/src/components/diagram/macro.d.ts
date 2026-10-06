/** The `macro:<name>` discriminator for an embedded diagram. */
export declare const DIAGRAM_MACRO_NAME = "diagram";
/**
 * The ProseMirror node name a macro occupies.
 *
 * Duplicated from realtime-modules' `MACRO_NODE_NAME` rather than imported.
 * Importing it would pull the whole Tiptap canvas adapter — and with it a
 * second `prosemirror-*` graph — into `./diagram`, which is the one thing the
 * app's `optimizeDeps.exclude` list exists to prevent. `'macro'` is a wire
 * constant on the same footing as the `data-macro` attribute, and the round
 * trip test pins it.
 */
export declare const MACRO_NODE_NAME = "macro";
/**
 * Mints a diagram id.
 *
 * A plain UUID: it is what `/diagram/:id` already uses, it is unambiguous YAML
 * (five hex groups can never be read as a date or a sexagesimal), and it is
 * short enough to stay inside the gateway's 46-character channel limit if a
 * diagram is ever promoted out of a page into its own document.
 */
export declare function newDiagramId(): string;
/** True for an id this module would have minted — hex groups and dashes only. */
export declare function isDiagramId(value: string): boolean;
/**
 * The macro body for a diagram — byte-identical to what the chassis serializer
 * writes between the fences, with no trailing newline (the closing fence
 * supplies the final break, exactly as `macroTextFromData` returns it).
 */
export declare function diagramMacroText(id: string): string;
/**
 * The id a diagram macro's body refers to, or `null`.
 *
 * `null` is a real state, not an error path: a CRDT merge of two concurrent
 * rewrites can leave text that no longer says anything, and the honest response
 * is to show the user the raw source so they can fix it — never to invent an id
 * and silently start a second, empty diagram under it.
 *
 * Deliberately strict. The quoted forms are accepted because a hand-edited or
 * foreign-tool-normalised file may quote a scalar the chassis left bare; an
 * arbitrary unquoted token is NOT accepted, because an id that is not shaped
 * like an id is far more likely to be merge damage than a diagram.
 */
export declare function readDiagramId(source: string): string | null;
//# sourceMappingURL=macro.d.ts.map