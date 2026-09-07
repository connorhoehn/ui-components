// `documentExport` on all THREE document states.
//
// Two shapes, three states: section-shaped, canvas-shaped, and CONVERTED — a
// page whose legacy `sections` array is still full because conversion freezes
// it rather than clearing it. The third is the one every naive check gets
// wrong, and it is the reason the first test in this file deliberately applies
// the OLD gate and asserts the bug reproduces: without that, a suite of green
// rows proves only that the fixtures agree with the code, not that the gate
// discriminates.
//
// The fixtures are the doc-editor's, imported rather than copied. A second set
// of shape fixtures is a second thing to keep true.

import { describe, expect, it } from 'vitest';
import * as Y from 'yjs';
import {
  canvasShapedDoc,
  convertedDoc,
  sectionShapedDoc,
  bodyOf,
  DEFAULT_SECTIONS,
} from '../../components/doc-editor/__tests__/fixtures/documentShapes';
import {
  canvasBodyToMarkdown,
  canvasBodyToPlainText,
  exportToMarkdown,
  exportToPlainText,
  isPageShapedExport,
  type ExportableDocument,
} from '../documentExport';
import type { DocumentData, DocumentMeta, Section } from '../../types/document';

// ---------------------------------------------------------------------------
// Reading a fixture back out as the JSON the export functions take
// ---------------------------------------------------------------------------

/**
 * The same conversion `useDocumentExport` does: copy the whole Y meta map, and
 * turn the `sections` array into plain objects.
 *
 * Copying the WHOLE meta map matters — that is how `schemaVersion` reaches the
 * JSON, which is what makes a Y.Doc-less export self-describing.
 */
function exportJSON(ydoc: Y.Doc): DocumentData {
  const meta = ydoc.getMap('meta').toJSON() as unknown as DocumentMeta;
  const sections = ydoc.getArray('sections').toArray().map((raw) => {
    const map = raw as Y.Map<unknown>;
    const frag = map.get('content') as Y.XmlFragment | undefined;
    return {
      id: map.get('id'),
      type: map.get('type'),
      title: map.get('title'),
      collapsed: false,
      items: ((map.get('items') as Y.Array<Y.Map<unknown>> | undefined)?.toArray() ?? []).map(
        (item) => item.toJSON(),
      ),
      contentText: frag ? canvasBodyToPlainText(frag) : '',
    } as unknown as Section;
  });
  return { meta, sections };
}

const CANVAS_BODY =
  '<heading level="1">Q2 Sprint Planning</heading>' +
  '<paragraph>Ship the canvas.</paragraph>' +
  '<bulletList>' +
  '<listItem><paragraph>Write the migration</paragraph></listItem>' +
  '<listItem><paragraph>Delete the shim</paragraph></listItem>' +
  '</bulletList>' +
  '<taskList>' +
  '<taskItem checked="true"><paragraph>Land the gate</paragraph></taskItem>' +
  '<taskItem checked="false"><paragraph>Sweep the utils</paragraph></taskItem>' +
  '</taskList>' +
  '<codeBlock>npm run test</codeBlock>' +
  '<horizontalRule></horizontalRule>' +
  '<blockquote>Frozen sections are not the document.</blockquote>';

// ---------------------------------------------------------------------------
// 0. The old gate, reproduced on purpose
// ---------------------------------------------------------------------------

describe('the gate this file replaced', () => {
  /** What the code used to do: infer the shape from an empty section array. */
  const oldGateSaysCanvas = (doc: DocumentData) => doc.sections.length === 0;

  it('reads a CONVERTED document backwards — the bug, reproduced', () => {
    const ydoc = convertedDoc({ body: CANVAS_BODY });
    const data = exportJSON(ydoc);

    // Both roots are populated. That is the whole trap.
    expect(data.sections.length).toBeGreaterThan(0);
    expect(bodyOf(ydoc).toString()).toContain('Ship the canvas');

    // The old gate calls this legacy...
    expect(oldGateSaysCanvas(data)).toBe(false);
    // ...and the new one calls it a page. If these ever agree, this file has
    // stopped testing anything.
    expect(isPageShapedExport(data, { ydoc })).toBe(true);
  });

  it('would have exported pre-conversion content under the old gate', () => {
    const ydoc = convertedDoc({ body: CANVAS_BODY });
    const data = exportJSON(ydoc);

    // Reproduce where the old gate SENT this document. Stripping
    // `schemaVersion` is the only way to reach the section branch now — which
    // is itself the point: every remaining signal on a converted document says
    // "page", and the old code looked at the one that says "legacy".
    const blinded = {
      meta: { ...(data.meta as unknown as Record<string, unknown>), schemaVersion: undefined },
      sections: data.sections,
    } as unknown as DocumentData;
    const stale = exportToMarkdown(blinded);

    // Frozen section titles present, canvas body absent: a real file, that
    // opens, missing everything written since the conversion.
    expect(stale).toContain(DEFAULT_SECTIONS[0].title);
    expect(stale).not.toContain('Land the gate');
  });
});

// ---------------------------------------------------------------------------
// 1. The gate
// ---------------------------------------------------------------------------

describe('isPageShapedExport', () => {
  it('is false for a section-shaped document', () => {
    const ydoc = sectionShapedDoc();
    expect(isPageShapedExport(exportJSON(ydoc), { ydoc })).toBe(false);
  });

  it('is true for a canvas-shaped document', () => {
    const ydoc = canvasShapedDoc({ body: CANVAS_BODY });
    expect(isPageShapedExport(exportJSON(ydoc), { ydoc })).toBe(true);
  });

  it('is true for a CONVERTED document despite a full sections array', () => {
    const ydoc = convertedDoc({ body: CANVAS_BODY });
    const data = exportJSON(ydoc);
    expect(data.sections).toHaveLength(DEFAULT_SECTIONS.length);
    expect(isPageShapedExport(data, { ydoc })).toBe(true);
  });

  it('reads meta.schemaVersion when there is no Y.Doc to consult', () => {
    // A server-side or snapshot caller. `sections` is full; only the version
    // says it is a page.
    const data = exportJSON(convertedDoc({ body: CANVAS_BODY }));
    expect(isPageShapedExport(data)).toBe(true);
  });

  it('never consults sections.length: an EMPTY legacy document is still legacy', () => {
    const ydoc = sectionShapedDoc({ sections: [] });
    const data = exportJSON(ydoc);
    expect(data.sections).toHaveLength(0);
    expect(isPageShapedExport(data, { ydoc })).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 2. Markdown export, all three states
// ---------------------------------------------------------------------------

describe('exportToMarkdown', () => {
  it('renders sections on a section-shaped document', () => {
    const ydoc = sectionShapedDoc();
    const md = exportToMarkdown(exportJSON(ydoc), { ydoc });

    expect(md).toContain('# Q2 Sprint Planning');
    expect(md).toContain('## Goals');
    expect(md).toContain('## Risks');
    expect(md).toContain('- [ ] Write the migration');
  });

  it('renders the body on a canvas-shaped document', () => {
    const ydoc = canvasShapedDoc({ body: CANVAS_BODY });
    const md = exportToMarkdown(exportJSON(ydoc), { ydoc });

    expect(md).toContain('Ship the canvas.');
    expect(md).toContain('- Write the migration');
    expect(md).toContain('- [x] Land the gate');
  });

  it('renders the BODY, not the frozen sections, on a converted document', () => {
    const ydoc = convertedDoc({ body: CANVAS_BODY });
    const md = exportToMarkdown(exportJSON(ydoc), { ydoc });

    expect(md).toContain('Ship the canvas.');
    expect(md).toContain('- [x] Land the gate');
    // The frozen section headings must NOT appear. Emitting both roots would
    // present pre-conversion content as current — quieter than an empty file
    // and worse, because it looks complete.
    expect(md).not.toContain('## Risks');
    expect(md).not.toContain('The section path is load-bearing.');
  });

  it('does not lose an empty canvas: title only, no section fallback', () => {
    const ydoc = canvasShapedDoc({ body: '', frozenSections: DEFAULT_SECTIONS });
    const md = exportToMarkdown(exportJSON(ydoc), { ydoc });

    expect(md.trim()).toBe('# Q2 Sprint Planning');
  });

  it('files canvas comments flat rather than per section', () => {
    const ydoc = canvasShapedDoc({ body: CANVAS_BODY });
    const data = exportJSON(ydoc) as ExportableDocument;
    data.comments = [
      {
        id: 'c1',
        text: 'Anchored to a range, not a section.',
        userId: 'u2',
        displayName: 'Grace',
        color: '#f00',
        timestamp: '2026-09-06T00:00:00.000Z',
        parentCommentId: null,
        replies: [],
      },
    ];

    const md = exportToMarkdown(data, { ydoc });
    expect(md).toContain('## Comments (1)');
    expect(md).toContain('> **Grace**: Anchored to a range, not a section.');
  });
});

// ---------------------------------------------------------------------------
// 3. Plain text, all three states
// ---------------------------------------------------------------------------

describe('exportToPlainText', () => {
  it('renders sections on a section-shaped document', () => {
    const ydoc = sectionShapedDoc();
    const txt = exportToPlainText(exportJSON(ydoc), { ydoc });
    expect(txt).toContain('Goals');
    expect(txt).toContain('[PENDING] Write the migration');
  });

  it('renders the body on a canvas-shaped document', () => {
    const ydoc = canvasShapedDoc({ body: CANVAS_BODY });
    const txt = exportToPlainText(exportJSON(ydoc), { ydoc });
    expect(txt).toContain('Ship the canvas.');
    expect(txt).not.toContain('<paragraph>');
  });

  it('ignores frozen sections on a converted document', () => {
    const ydoc = convertedDoc({ body: CANVAS_BODY });
    const txt = exportToPlainText(exportJSON(ydoc), { ydoc });
    expect(txt).toContain('Ship the canvas.');
    expect(txt).not.toContain('The section path is load-bearing.');
  });
});

// ---------------------------------------------------------------------------
// 4. yjs lowercases node names
// ---------------------------------------------------------------------------

describe('canvasBodyToMarkdown / yjs node-name casing', () => {
  it('serialises camelCase ProseMirror nodes as lowercase — the trap itself', () => {
    const ydoc = canvasShapedDoc({ body: CANVAS_BODY });
    const xml = bodyOf(ydoc).toString();

    // If this ever reads `<bulletList>`, yjs changed and the switch in
    // canvasBodyToMarkdown has to change with it.
    expect(xml).toContain('<bulletlist>');
    expect(xml).toContain('<taskitem');
    expect(xml).toContain('<codeblock>');
    expect(xml).not.toContain('<bulletList>');
  });

  it('keeps list, task-list, code-block and rule structure', () => {
    const md = canvasBodyToMarkdown(bodyOf(canvasShapedDoc({ body: CANVAS_BODY })));

    expect(md).toContain('# Q2 Sprint Planning');
    expect(md).toContain('- Write the migration');
    expect(md).toContain('- Delete the shim');
    expect(md).toContain('- [x] Land the gate');
    expect(md).toContain('- [ ] Sweep the utils');
    expect(md).toContain('```');
    expect(md).toContain('npm run test');
    expect(md).toContain('---');
    expect(md).toContain('> Frozen sections are not the document.');
  });

  it('would flatten every list if the switch matched camelCase', () => {
    // The accidental-pass check: matching camelCase gets `heading` and
    // `paragraph` right (already lowercase) and silently loses the rest.
    const xml = bodyOf(canvasShapedDoc({ body: CANVAS_BODY })).toString();
    const camelOnly = /(<bulletList|<taskList|<codeBlock|<horizontalRule)/.test(xml);
    expect(camelOnly).toBe(false);
  });

  it('returns empty string for an empty or missing fragment', () => {
    expect(canvasBodyToMarkdown(null)).toBe('');
    expect(canvasBodyToMarkdown(undefined)).toBe('');
    expect(canvasBodyToMarkdown(new Y.Doc().getXmlFragment('body'))).toBe('');
  });
});
