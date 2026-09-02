// ui-components/src/components/diagram/macro.ts
//
// The persisted form of a diagram embedded in a canvas document.
//
// ```macro:diagram
// id: 6f9a8e2c-4b1d-4f0a-9c3e-7b2d5a1f8e04
// ```
//
// That is the whole payload: a REFERENCE, never the picture.
//
// ---------------------------------------------------------------------------
// Why a reference and not the elements
// ---------------------------------------------------------------------------
// A diagram's elements are a `Y.Map` under the `excalidraw:<id>` root of the
// page's own Y.Doc — that is what `ExcalidrawYjsBinding` already writes and
// what makes `/diagram/:id` sync live today. The macro body cannot hold them,
// and the reason is not size:
//
//  1. **A macro's editor content is CRDT TEXT.** `MacroNode` is a textblock
//     whose characters are the YAML body (see `macroText.ts` in
//     realtime-modules for why). Embedding the scene would mean rewriting a
//     multi-kilobyte JSON string on every stroke, as a text diff, in a
//     document two people are typing in. Two people drawing at once would
//     character-merge JSON — and a character-merged JSON is not a diagram that
//     lost a stroke, it is a document that no longer parses.
//  2. **The two substrates have different merge semantics on purpose.**
//     Excalidraw elements merge per element, by `version`/`versionNonce`,
//     through Excalidraw's own `reconcileElements`. Text merges per character.
//     Putting elements in the text substrate throws away the only merge
//     function that knows what an element is.
//  3. **Serialising the scene into the prose would make every stroke a
//     document edit.** Undo, suggestions, comment anchors and the "who changed
//     this paragraph" history all operate on the prose. A pencil stroke is not
//     a prose edit and must not look like one.
//
// So the elements stay in the CRDT, keyed by this id, and the markdown carries
// the key.
//
// ---------------------------------------------------------------------------
// What a reader with no gateway sees, and why that is the honest answer
// ---------------------------------------------------------------------------
// Export this page to a file and open it in GitHub, Obsidian or `cat`, and the
// block renders as a visible, labelled, monospace fence saying `macro:diagram`
// and an id. That is exactly the degradation MACRO-MARKDOWN.md argues for: the
// reader can SEE that a diagram belongs here and that it is structured data
// their tool cannot draw. Nothing is hidden, nothing is corrupted, and bringing
// the file back through any tool that respects CommonMark fences reattaches it
// to its elements, because the id survived literally.
//
// The alternatives were worse, not merely different:
//   - An inline PNG/SVG snapshot would be a SECOND copy of the truth that goes
//     stale the moment anyone draws, and a stale picture is a lie that looks
//     like it worked.
//   - A `title:` field would be honest only if a user could set it; inventing
//     "Untitled diagram" so the export reads nicer is decoration pretending to
//     be data. One key, and it is the key that means something.
//
// ---------------------------------------------------------------------------
// One key, and why that matters to the code below
// ---------------------------------------------------------------------------
// Because the payload is a single scalar under a fixed key, reading it needs no
// YAML parser in this package — and this package deliberately has none, so that
// `./diagram` stays importable by an app that never took a chassis dependency.
// `diagramMacroText` and `readDiagramId` are exact inverses over the ids
// `newDiagramId` mints, and `diagram-macro-roundtrip.test.ts` in
// realtime-modules asserts that `macroTextFromData('diagram', { id })` — the
// chassis serialiser, the one that actually writes the file — produces these
// same bytes. That test is the drift guard: if the chassis ever changes how it
// dumps a one-key mapping, it fails there rather than silently here.

/** The `macro:<name>` discriminator for an embedded diagram. */
export const DIAGRAM_MACRO_NAME = 'diagram';

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
export const MACRO_NODE_NAME = 'macro';

/**
 * Mints a diagram id.
 *
 * A plain UUID: it is what `/diagram/:id` already uses, it is unambiguous YAML
 * (five hex groups can never be read as a date or a sexagesimal), and it is
 * short enough to stay inside the gateway's 46-character channel limit if a
 * diagram is ever promoted out of a page into its own document.
 */
export function newDiagramId(): string {
    const c = globalThis.crypto as { randomUUID?: () => string } | undefined;
    if (typeof c?.randomUUID === 'function') return c.randomUUID();
    // Not security-sensitive — this is a block key inside one document, and the
    // fallback only runs in environments without WebCrypto (old jsdom, some
    // test runners).
    let out = '';
    for (let i = 0; i < 32; i += 1) {
        if (i === 8 || i === 12 || i === 16 || i === 20) out += '-';
        out += Math.floor(Math.random() * 16).toString(16);
    }
    return out;
}

/** True for an id this module would have minted — hex groups and dashes only. */
export function isDiagramId(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

/**
 * The macro body for a diagram — byte-identical to what the chassis serializer
 * writes between the fences, with no trailing newline (the closing fence
 * supplies the final break, exactly as `macroTextFromData` returns it).
 */
export function diagramMacroText(id: string): string {
    return `id: ${id}`;
}

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
export function readDiagramId(source: string): string | null {
    const match = /^id:[ \t]*(?:"([^"\n]*)"|'([^'\n]*)'|([^\s#]+))[ \t]*$/m.exec(source);
    if (!match) return null;
    const raw = match[1] ?? match[2] ?? match[3] ?? '';
    return isDiagramId(raw) ? raw : null;
}
