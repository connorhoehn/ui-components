// The shape gate, and the fixtures the rest of the shape tests are built on.
//
// Two jobs, deliberately in one file:
//
//   1. The fixtures have to BE the shapes they claim to be, or every test built
//      on them is theatre.
//   2. The gate has to discriminate between all THREE states — legacy, a
//      document created as a page, and a document CONVERTED into one — because
//      the third is where the tempting inference gets it backwards.

import { describe, it, expect } from 'vitest';
import * as Y from 'yjs';
import {
  CANVAS_BODY_KEY,
  CANVAS_SCHEMA_VERSION,
  canvasBody,
  isCanvasDocument,
  readSchemaVersion,
} from '../canvas/documentShape';
import {
  bodyOf,
  canvasShapedDoc,
  convertedDoc,
  sectionShapedDoc,
} from './fixtures/documentShapes';

/**
 * The inference this whole exercise exists to kill.
 *
 * Reproduced here as a named function so the tests below can show it being
 * WRONG rather than describing it in a comment nobody reads.
 */
function oldShapeInference(ydoc: Y.Doc): boolean {
  return ydoc.getArray('sections').length === 0;
}

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

describe('document shape fixtures', () => {
  it('builds a section-shaped document with no schemaVersion', () => {
    const ydoc = sectionShapedDoc();
    expect(readSchemaVersion(ydoc)).toBe(0);
    expect(ydoc.getArray('sections').length).toBe(2);
    // The blind spot itself: the page root is empty on a legacy document.
    expect(bodyOf(ydoc).length).toBe(0);
  });

  it('builds a page-shaped document with content in ONE fragment', () => {
    const ydoc = canvasShapedDoc();
    expect(readSchemaVersion(ydoc)).toBe(CANVAS_SCHEMA_VERSION);
    // The exact condition that makes every `for (const s of sections)` a no-op.
    expect(ydoc.getArray('sections').length).toBe(0);
    expect(bodyOf(ydoc).toString()).toContain('Ship the canvas.');
  });

  it("keeps a section fixture's prose reachable through its own fragment", () => {
    const ydoc = sectionShapedDoc();
    const first = ydoc.getArray('sections').get(0) as Y.Map<unknown>;
    const content = first.get('content') as Y.XmlFragment;
    expect(content.toString()).toContain('Ship the canvas.');
  });

  it('a converted document has BOTH roots populated', () => {
    const ydoc = convertedDoc();
    expect(ydoc.getArray('sections').length).toBeGreaterThan(0);
    expect(bodyOf(ydoc).length).toBeGreaterThan(0);
  });

  it('carries attributes onto the body nodes, so heading levels survive', () => {
    const ydoc = canvasShapedDoc({ body: '<heading level="3">Deep</heading>' });
    expect(bodyOf(ydoc).toString()).toBe('<heading level="3">Deep</heading>');
  });
});

// ---------------------------------------------------------------------------
// The gate
// ---------------------------------------------------------------------------

describe('isCanvasDocument', () => {
  it('is false on a legacy document', () => {
    expect(isCanvasDocument(sectionShapedDoc())).toBe(false);
  });

  it('is true on a document created as a page', () => {
    expect(isCanvasDocument(canvasShapedDoc())).toBe(true);
  });

  it('is true on a CONVERTED document, whose section array is still full', () => {
    const ydoc = convertedDoc();
    expect(ydoc.getArray('sections').length).toBeGreaterThan(0);
    expect(isCanvasDocument(ydoc)).toBe(true);
  });

  // The discriminating test. Without this the two above could both pass under a
  // gate that is simply wrong — a legacy document with no sections and a page
  // with none look identical to the length check, so only the converted case
  // separates a correct gate from the broken one.
  it('disagrees with `sections.length === 0` exactly where that inference is wrong', () => {
    const converted = convertedDoc();
    // The old gate says "legacy" — which is how Export wrote out pre-conversion
    // content on every converted document.
    expect(oldShapeInference(converted)).toBe(false);
    expect(isCanvasDocument(converted)).toBe(true);

    // And it says "canvas" for an empty legacy document, which is the same bug
    // pointing the other way: a brand-new sectioned document would be treated
    // as a page and its (nonexistent) body exported instead.
    const emptyLegacy = sectionShapedDoc({ sections: [] });
    expect(oldShapeInference(emptyLegacy)).toBe(true);
    expect(isCanvasDocument(emptyLegacy)).toBe(false);
  });

  it('ignores a non-numeric schemaVersion rather than coercing it', () => {
    const ydoc = new Y.Doc();
    ydoc.getMap('meta').set('schemaVersion', '2');
    // Matches distributed-core's isCanvasDocument: `typeof v === 'number'`.
    // Coercing here would make ui-components and the chassis disagree about
    // what a document IS, which is the one thing this gate may not do.
    expect(isCanvasDocument(ydoc)).toBe(false);
  });

  it('is false for a missing document instead of throwing', () => {
    expect(isCanvasDocument(null)).toBe(false);
    expect(isCanvasDocument(undefined)).toBe(false);
    expect(readSchemaVersion(null)).toBe(0);
  });
});

describe('canvasBody', () => {
  it('returns the body fragment on a page', () => {
    const ydoc = canvasShapedDoc({ body: '<paragraph>Hello.</paragraph>' });
    expect(canvasBody(ydoc)?.toString()).toContain('Hello.');
  });

  it('returns the LIVE body on a converted document, not the frozen sections', () => {
    const ydoc = convertedDoc({ body: '<paragraph>Written after converting.</paragraph>' });
    expect(canvasBody(ydoc)?.toString()).toContain('Written after converting.');
    expect(canvasBody(ydoc)?.toString()).not.toContain('Ship the canvas.');
  });

  it('does not create the body root on a legacy document', () => {
    const ydoc = sectionShapedDoc();
    expect(canvasBody(ydoc)).toBeNull();
    // Asking for it would have materialised the root and made the document look
    // half-converted to the next reader; nothing here may write.
    expect(ydoc.share.has(CANVAS_BODY_KEY)).toBe(false);
  });
});
