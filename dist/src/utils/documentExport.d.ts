import type { Doc as YDoc } from 'yjs';
import type { DocumentData, CommentThread } from '../types/document';
/**
 * What a caller can hand these functions beyond the plain JSON.
 *
 * A caller that has the live Y.Doc should pass it: that is the only source
 * that cannot be stale. `bodyMarkdown` exists for callers that have already
 * rendered the body (the editor does, to reuse it for the PDF branch) and for
 * server-side callers that never had a Y.Doc at all.
 */
export interface ExportSource {
    /** The live document. Authoritative: its `meta.schemaVersion` decides. */
    ydoc?: YDoc | null;
    /** Pre-rendered canvas body markdown, when the caller already has it. */
    bodyMarkdown?: string | null;
}
/**
 * `DocumentData` as it actually comes off a page-shaped document.
 *
 * `body` is the canvas content and `comments` are the threads anchored to text
 * ranges rather than to sections — neither has a home in the legacy
 * `DocumentData`, which predates the canvas. Declared here rather than widening
 * `types/document.ts` so nothing outside export has to care.
 */
export interface ExportableDocument extends DocumentData {
    /** Canvas body, as markdown. Present ⇒ page-shaped ⇒ `sections` is not the document. */
    body?: string;
    /** Canvas comments: anchored to text, so filed flat instead of per section. */
    comments?: CommentThread[];
}
/**
 * Is this a page, rather than a stack of sections?
 *
 * Note what is NOT consulted: `doc.sections.length`. On a converted document
 * that array is full and frozen, and reading it is how export shipped
 * pre-conversion content.
 */
export declare function isPageShapedExport(doc: Pick<DocumentData, 'meta'>, source?: ExportSource): boolean;
/**
 * A body fragment as plain text: structure removed, words kept.
 */
export declare function canvasBodyToPlainText(frag: {
    toString(): string;
} | null | undefined): string;
/**
 * A body fragment as markdown, with its structure intact.
 *
 * ## yjs LOWERCASES every node name
 *
 * `Y.XmlFragment.toString()` walks its children calling
 * `nodeName.toLocaleLowerCase()` (yjs `YXmlElement.toString`). So the fragment
 * that holds a ProseMirror `bulletList` serialises as `<bulletlist>`, `codeBlock`
 * as `<codeblock>`, `taskItem` as `<taskitem>`.
 *
 * A serializer that switches on the camelCase ProseMirror spellings therefore
 * appears to work: `heading` and `paragraph` are already lowercase and match.
 * Everything else — every list, task list, code block and horizontal rule —
 * falls through to the default branch and comes out as loose text. The export
 * is plausible, complete-looking, and has quietly lost every list in the
 * document. Both this repo and realtime-modules shipped that bug.
 *
 * Hence: names are lowercased on read, and every `case` below is written
 * lowercase. Do not "fix" them back to camelCase.
 */
export declare function canvasBodyToMarkdown(frag: {
    toString(): string;
} | null | undefined): string;
/**
 * Convert a full document to a markdown string.
 *
 * Pass `source.ydoc` whenever you have it. Without it this falls back to what
 * the JSON itself says (`body`, or `meta.schemaVersion`), which is correct but
 * only as fresh as the snapshot.
 */
export declare function exportToMarkdown(doc: DocumentData, source?: ExportSource): string;
/**
 * Convert a full document to plain text (no markdown syntax).
 *
 * Same gate as `exportToMarkdown` — see `isPageShapedExport`.
 */
export declare function exportToPlainText(doc: DocumentData, source?: ExportSource): string;
//# sourceMappingURL=documentExport.d.ts.map