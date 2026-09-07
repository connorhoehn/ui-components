// Which shape is this document? The one gate, and the only one.
//
// A document in this editor is one of two things:
//
//   legacy / "section-shaped"  ydoc.getArray('sections'), one Y.XmlFragment per
//                              section, no `meta.schemaVersion`
//   canvas / "page-shaped"     ONE Y.XmlFragment at `body`, and
//                              `meta.schemaVersion >= 2`
//
// Code written against the first shape does not FAIL on the second — it
// iterates an empty array, loops zero times, renders nothing and reports
// nothing. That is the whole failure mode: a feature that silently does
// nothing on most documents while every section-shaped test stays green.
//
// ## Why `sections.length === 0` is not the gate
//
// It is the tempting inference and it is exactly backwards on the documents
// that matter most. Converting a legacy document to a canvas does NOT clear the
// legacy roots — realtime-modules says so in as many words:
//
//     ydoc.getArray('sections')   ← kept, frozen, never read at version >= 2
//
// So a CONVERTED document has a full `sections` array AND a canvas body. The
// length check reads that as "legacy" and operates on pre-conversion content.
// Export hit this in the app: it wrote out a file containing everything typed
// BEFORE the conversion and nothing since — no error, no empty file, nothing to
// notice. See `__tests__/exportBothShapes.test.tsx`, which deliberately applies
// the old gate and asserts the bug comes back.
//
// The schema version is the gate. Nothing else is.
//
// ## Why this is not just `useCanvasDocument` from realtime-modules
//
// `@connorhoehn/realtime-modules` is an OPTIONAL peer of this package, so the
// doc-editor's always-loaded state layer cannot import from it — a host that
// installed ui-components alone would fail to resolve the module. This reads
// the same Y root, with the same `typeof v === 'number' && v >= 2` test that
// distributed-core's `isCanvasDocument` uses, so the two cannot disagree.

import { useEffect, useState } from 'react';
import type { Doc as YDoc, XmlFragment } from 'yjs';

/** `meta.schemaVersion` at or above this means the document is a page. */
export const CANVAS_SCHEMA_VERSION = 2;

/** The Y root holding a canvas body. Mirrors realtime-modules' `CANVAS_BODY_KEY`. */
export const CANVAS_BODY_KEY = 'body';

/**
 * The raw schema version, or 0 when there is none.
 *
 * Zero rather than null: a legacy document has no version, and "no version" and
 * "version 0" mean the same thing to every caller.
 */
export function readSchemaVersion(ydoc: YDoc | null | undefined): number {
  if (!ydoc) return 0;
  const raw = ydoc.getMap('meta').get('schemaVersion');
  return typeof raw === 'number' ? raw : 0;
}

/**
 * True when the document is page-shaped.
 *
 * Deliberately takes a Y.Doc rather than a meta object so there is no way to
 * call it with a stale snapshot of meta taken before a conversion.
 */
export function isCanvasDocument(ydoc: YDoc | null | undefined): boolean {
  return readSchemaVersion(ydoc) >= CANVAS_SCHEMA_VERSION;
}

/**
 * The canvas body fragment, or null on a legacy document.
 *
 * Null rather than an empty fragment: `ydoc.getXmlFragment('body')` CREATES the
 * root as a side effect, so handing a legacy document an empty body would write
 * a canvas root onto it and make it look half-converted to the next reader.
 */
export function canvasBody(ydoc: YDoc | null | undefined): XmlFragment | null {
  if (!ydoc || !isCanvasDocument(ydoc)) return null;
  return ydoc.getXmlFragment(CANVAS_BODY_KEY);
}

/**
 * The shape, kept live.
 *
 * `meta` is a CRDT map: a collaborator converting the document flips this under
 * us mid-session, and the editor has to swap paths when it does. Reading the
 * value during render instead would latch whatever was true at mount.
 */
export function useIsCanvasDocument(ydoc: YDoc | null | undefined): boolean {
  const [schemaVersion, setSchemaVersion] = useState(() => readSchemaVersion(ydoc));

  useEffect(() => {
    if (!ydoc) {
      setSchemaVersion(0);
      return;
    }
    const meta = ydoc.getMap('meta');
    const read = () => setSchemaVersion(readSchemaVersion(ydoc));
    read();
    meta.observe(read);
    return () => meta.unobserve(read);
  }, [ydoc]);

  return schemaVersion >= CANVAS_SCHEMA_VERSION;
}
