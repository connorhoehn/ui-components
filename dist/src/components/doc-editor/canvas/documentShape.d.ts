import type { Doc as YDoc, XmlFragment } from 'yjs';
/** `meta.schemaVersion` at or above this means the document is a page. */
export declare const CANVAS_SCHEMA_VERSION = 2;
/** The Y root holding a canvas body. Mirrors realtime-modules' `CANVAS_BODY_KEY`. */
export declare const CANVAS_BODY_KEY = "body";
/**
 * The raw schema version, or 0 when there is none.
 *
 * Zero rather than null: a legacy document has no version, and "no version" and
 * "version 0" mean the same thing to every caller.
 */
export declare function readSchemaVersion(ydoc: YDoc | null | undefined): number;
/**
 * True when the document is page-shaped.
 *
 * Deliberately takes a Y.Doc rather than a meta object so there is no way to
 * call it with a stale snapshot of meta taken before a conversion.
 */
export declare function isCanvasDocument(ydoc: YDoc | null | undefined): boolean;
/**
 * The canvas body fragment, or null on a legacy document.
 *
 * Null rather than an empty fragment: `ydoc.getXmlFragment('body')` CREATES the
 * root as a side effect, so handing a legacy document an empty body would write
 * a canvas root onto it and make it look half-converted to the next reader.
 */
export declare function canvasBody(ydoc: YDoc | null | undefined): XmlFragment | null;
/**
 * The shape, kept live.
 *
 * `meta` is a CRDT map: a collaborator converting the document flips this under
 * us mid-session, and the editor has to swap paths when it does. Reading the
 * value during render instead would latch whatever was true at mount.
 */
export declare function useIsCanvasDocument(ydoc: YDoc | null | undefined): boolean;
//# sourceMappingURL=documentShape.d.ts.map