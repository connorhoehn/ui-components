// Export, on BOTH document shapes — and on the third state that is neither.
//
// The bug this locks down is not "the canvas branch was missing". It is that
// the branch, once added, is only as good as its gate: gated on
// `data.sections.length === 0` it is right for a document created as a page and
// WRONG for every document converted into one, because conversion freezes the
// section array rather than clearing it. Exporting a converted document then
// writes out its pre-conversion content: you get a file, it opens, and
// everything typed on the page since the conversion is not in it. No error, no
// empty file, nothing to notice.
//
// Each case runs the real hook against a real Y.Doc fixture and reads the Blob
// that would have been downloaded.

import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as Y from 'yjs';
import { useDocumentActions } from '../useDocumentActions';
import {
  CANVAS_BODY_KEY,
  canvasShapedDoc,
  convertedDoc,
  sectionShapedDoc,
  type FixtureSection,
} from './fixtures/documentShapes';
import type { DocumentMeta, Section } from '../../../types/document';
import type { UseWebSocketReturn } from '../../../hooks/useWebSocket';

// ---------------------------------------------------------------------------
// Harness
// ---------------------------------------------------------------------------

const downloaded: Array<{ name: string; text: string }> = [];
let pendingBlobText = '';

/** Read the plain-object section list back out of a fixture Y.Doc. */
function exportJSONFrom(ydoc: Y.Doc) {
  return () => {
    const meta = ydoc.getMap('meta').toJSON() as unknown as DocumentMeta;
    const sections = ydoc.getArray('sections').toArray().map((raw) => {
      const map = raw as Y.Map<unknown>;
      return {
        id: map.get('id') as string,
        type: map.get('type') as Section['type'],
        title: map.get('title') as string,
        collapsed: false,
        items: ((map.get('items') as Y.Array<Y.Map<unknown>> | undefined)?.toArray() ?? []).map(
          (item) => ({
            id: item.get('id') as string,
            text: item.get('text') as string,
            status: item.get('status') as string,
            assignee: item.get('assignee') as string,
            priority: item.get('priority') as string,
          }),
        ),
      } as unknown as Section;
    });
    return { meta, sections };
  };
}

function getSectionFragmentFrom(ydoc: Y.Doc) {
  return (sectionId: string) => {
    for (const raw of ydoc.getArray('sections').toArray()) {
      const map = raw as Y.Map<unknown>;
      if (map.get('id') === sectionId) return (map.get('content') as Y.XmlFragment) ?? null;
    }
    return null;
  };
}

function mountActions(ydoc: Y.Doc, isCanvas: boolean) {
  return renderHook(() =>
    useDocumentActions({
      documentId: 'doc-1',
      userId: 'u1',
      ws: { sendMessage: vi.fn() } as unknown as UseWebSocketReturn,
      updateMeta: vi.fn(),
      addSection: vi.fn(),
      exportJSON: exportJSONFrom(ydoc),
      getSectionFragment: getSectionFragmentFrom(ydoc),
      getCanvasFragment: () => ydoc.getXmlFragment(CANVAS_BODY_KEY),
      isCanvas,
      comments: {},
    }),
  );
}

beforeEach(() => {
  downloaded.length = 0;
  pendingBlobText = '';
  vi.stubGlobal('URL', {
    ...URL,
    createObjectURL: vi.fn(() => 'blob:fixture'),
    revokeObjectURL: vi.fn(),
  });
  // downloadBlob() builds an <a download> and clicks it. jsdom would try to
  // navigate; the Blob is what the assertion needs, so the click is captured.
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
    this: HTMLAnchorElement,
  ) {
    downloaded.push({ name: this.download, text: pendingBlobText });
  });
  vi.spyOn(globalThis, 'Blob').mockImplementation(function (parts: BlobPart[]) {
    pendingBlobText = String(parts[0] ?? '');
    return { size: pendingBlobText.length } as Blob;
  } as never);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// The three states
// ---------------------------------------------------------------------------

const FROZEN: readonly FixtureSection[] = [
  { id: 'sec-old', title: 'Before the conversion', prose: '<paragraph>Stale prose.</paragraph>' },
];

describe('markdown export', () => {
  it('writes the sections on a legacy document', () => {
    const ydoc = sectionShapedDoc();
    const { result } = mountActions(ydoc, false);
    result.current.handleExport('markdown');

    expect(downloaded).toHaveLength(1);
    expect(downloaded[0]!.text).toContain('Goals');
    expect(downloaded[0]!.text).toContain('Risks');
  });

  it('writes the page body on a document created as a page', () => {
    const ydoc = canvasShapedDoc();
    const { result } = mountActions(ydoc, true);
    result.current.handleExport('markdown');

    // The regression that started this: a title and nothing under it.
    expect(downloaded[0]!.text).toContain('Ship the canvas.');
    expect(downloaded[0]!.text).toContain('## Goals');
  });

  // The case the `sections.length === 0` inference got backwards.
  it('writes the PAGE, not the frozen sections, on a converted document', () => {
    const ydoc = convertedDoc({
      body: '<heading level="1">Live page</heading><paragraph>Written after converting.</paragraph>',
      frozenSections: FROZEN,
    });
    // The precondition that broke the old gate: sections are still there.
    expect(ydoc.getArray('sections').length).toBe(1);

    const { result } = mountActions(ydoc, true);
    result.current.handleExport('markdown');

    expect(downloaded[0]!.text).toContain('Written after converting.');
    expect(downloaded[0]!.text).not.toContain('Stale prose.');
    expect(downloaded[0]!.text).not.toContain('Before the conversion');
  });

  it('keeps list and task structure rather than flattening the page to prose', () => {
    const ydoc = canvasShapedDoc({
      body:
        '<bulletList><listItem>First</listItem><listItem>Second</listItem></bulletList>' +
        '<taskList><taskItem checked="true">Done thing</taskItem>' +
        '<taskItem checked="false">Open thing</taskItem></taskList>',
    });
    const { result } = mountActions(ydoc, true);
    result.current.handleExport('markdown');

    expect(downloaded[0]!.text).toContain('- First');
    expect(downloaded[0]!.text).toContain('- [x] Done thing');
    expect(downloaded[0]!.text).toContain('- [ ] Open thing');
  });
});

describe('json export', () => {
  it('carries the sections on a legacy document', () => {
    const ydoc = sectionShapedDoc();
    const { result } = mountActions(ydoc, false);
    result.current.handleExport('json');

    const json = JSON.parse(downloaded[0]!.text) as { sections: unknown[]; body?: string };
    expect(json.sections).toHaveLength(2);
    expect(json.body).toBeUndefined();
  });

  it('carries a body and NO frozen sections on a converted document', () => {
    const ydoc = convertedDoc({
      body: '<paragraph>Written after converting.</paragraph>',
      frozenSections: FROZEN,
    });
    const { result } = mountActions(ydoc, true);
    result.current.handleExport('json');

    const json = JSON.parse(downloaded[0]!.text) as { sections: unknown[]; body: string };
    expect(json.body).toContain('Written after converting.');
    // Presenting pre-conversion content under `sections` is the same lie in a
    // different format — a reader of the file cannot tell it is not the page.
    expect(json.sections).toHaveLength(0);
  });
});

describe('the shape gate itself', () => {
  it('does not need the section array to be empty to see a page', () => {
    const ydoc = convertedDoc({ body: '<paragraph>Page text.</paragraph>' });
    const { result } = mountActions(ydoc, true);
    result.current.handleExport('markdown');
    expect(downloaded[0]!.text).toContain('Page text.');
  });

  // Proof that the assertions above discriminate rather than passing by luck:
  // `isCanvas: false` on a converted document is EXACTLY what
  // `sections.length === 0` used to compute, and it reproduces the bug.
  it('reproduces the old inference when the gate is wrong', () => {
    const ydoc = convertedDoc({
      body: '<paragraph>Written after converting.</paragraph>',
      frozenSections: FROZEN,
    });
    const { result } = mountActions(ydoc, false);
    result.current.handleExport('markdown');

    expect(downloaded[0]!.text).toContain('Before the conversion');
    expect(downloaded[0]!.text).not.toContain('Written after converting.');
  });

  it('leaves a legacy document alone even when it happens to be empty', () => {
    const ydoc = sectionShapedDoc({ sections: [] });
    const { result } = mountActions(ydoc, false);
    result.current.handleExport('markdown');
    // No body key invented on a document that has no page.
    expect(downloaded[0]!.text).not.toContain('undefined');
  });
});
