// Both document shapes, as real Y.Docs, from the same content.
//
// This file exists because EVERY fixture in this tree was section-shaped, and
// that is the whole reason the canvas blind spot survived: code that iterates
// `sections` iterates zero times on a page-shaped document, so it does nothing,
// reports nothing, and no assertion built on a section fixture ever notices. A
// green suite meant "the legacy path still works", never "the feature works".
//
// So a test for anything that reads document content should run against BOTH of
// these, from one table. If a helper only handles one shape, the other row goes
// red — which is the only durable defence against this class of bug coming
// back.
//
// ## The three states, not two
//
// `convertedDoc()` is the one people forget. Conversion does NOT clear the
// legacy roots — realtime-modules is explicit: "ydoc.getArray('sections') ←
// kept, frozen, never read at version >= 2". So a converted document has a full
// section array AND a canvas body, and any code that infers the shape from
// `sections.length === 0` gets it exactly backwards on it.

import * as Y from 'yjs';
import { CANVAS_BODY_KEY, CANVAS_SCHEMA_VERSION } from '../../canvas/documentShape';

export { CANVAS_BODY_KEY, CANVAS_SCHEMA_VERSION };

export interface FixtureSection {
  id: string;
  title: string;
  /** Inner XML of the section's rich-text fragment, e.g. `<paragraph>hi</paragraph>`. */
  prose?: string;
  items?: Array<{
    id: string;
    text: string;
    status?: string;
    assignee?: string;
    priority?: string;
  }>;
}

export interface FixtureMeta {
  title?: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Building blocks
// ---------------------------------------------------------------------------

/**
 * Parse a small subset of block XML into Y.Xml nodes.
 *
 * Deliberately hand-rolled rather than going through ProseMirror: a fixture
 * that needs a live editor schema to exist is a fixture nobody writes, and the
 * paths under test read `fragment.toString()`, which is exactly this.
 */
function appendXml(target: Y.XmlFragment | Y.XmlElement, xml: string): void {
  const doc = new DOMParser().parseFromString(`<root>${xml}</root>`, 'text/xml');
  if (doc.querySelector('parsererror')) throw new Error(`fixture XML did not parse: ${xml}`);
  appendChildren(target, doc.documentElement);
}

/**
 * Attach FIRST, then fill.
 *
 * A Y.XmlElement that is not yet in a document cannot take attributes — Yjs
 * logs "Invalid access: Add Yjs type to a document before reading data" and the
 * attribute is silently dropped. So each node is pushed into its (already
 * integrated) parent before anything is written onto it.
 */
function appendChildren(target: Y.XmlFragment | Y.XmlElement, source: Element): void {
  for (const child of Array.from(source.childNodes)) {
    if (child.nodeType === 3) {
      const text = child.textContent ?? '';
      if (text.length > 0) target.push([new Y.XmlText(text)]);
      continue;
    }
    if (child.nodeType !== 1) continue;

    const el = child as Element;
    const node = new Y.XmlElement(el.nodeName);
    target.push([node]);
    for (const attr of Array.from(el.attributes)) {
      node.setAttribute(attr.name, attr.value);
    }
    appendChildren(node, el);
  }
}

function writeMeta(ydoc: Y.Doc, meta: FixtureMeta): void {
  const yMeta = ydoc.getMap('meta');
  for (const [key, value] of Object.entries(meta)) {
    if (value === undefined) continue;
    yMeta.set(key, value);
  }
}

function writeSections(ydoc: Y.Doc, sections: readonly FixtureSection[]): void {
  const yArr = ydoc.getArray('sections');
  for (const section of sections) {
    const map = new Y.Map<unknown>();
    yArr.push([map]);
    map.set('id', section.id);
    map.set('type', 'notes');
    map.set('title', section.title);

    const items = new Y.Array<Y.Map<unknown>>();
    map.set('items', items);
    for (const item of section.items ?? []) {
      const yItem = new Y.Map<unknown>();
      items.push([yItem]);
      yItem.set('id', item.id);
      yItem.set('text', item.text);
      yItem.set('status', item.status ?? 'pending');
      yItem.set('assignee', item.assignee ?? '');
      yItem.set('priority', item.priority ?? 'medium');
    }

    const content = new Y.XmlFragment();
    map.set('content', content);
    if (section.prose) appendXml(content, section.prose);
  }
}

// ---------------------------------------------------------------------------
// The shapes
// ---------------------------------------------------------------------------

export interface SectionShapeOptions {
  meta?: FixtureMeta;
  sections?: readonly FixtureSection[];
}

/**
 * A legacy document: `sections` plus one XmlFragment each, and NO
 * `schemaVersion`.
 */
export function sectionShapedDoc(options: SectionShapeOptions = {}): Y.Doc {
  const ydoc = new Y.Doc();
  writeMeta(ydoc, { title: 'Q2 Sprint Planning', ...(options.meta ?? {}) });
  writeSections(ydoc, options.sections ?? DEFAULT_SECTIONS);
  return ydoc;
}

export interface CanvasShapeOptions {
  meta?: FixtureMeta;
  /** Inner XML of the one continuous body fragment. */
  body?: string;
  /**
   * Frozen legacy sections left behind by a conversion.
   *
   * Pass these to build the state the shape inference used to get WRONG: a page
   * whose section array is still full.
   */
  frozenSections?: readonly FixtureSection[];
}

/** A page-shaped document: one body fragment, `meta.schemaVersion = 2`. */
export function canvasShapedDoc(options: CanvasShapeOptions = {}): Y.Doc {
  const ydoc = new Y.Doc();
  writeMeta(ydoc, {
    title: 'Q2 Sprint Planning',
    ...(options.meta ?? {}),
    schemaVersion: CANVAS_SCHEMA_VERSION,
  });
  if (options.frozenSections) writeSections(ydoc, options.frozenSections);
  appendXml(ydoc.getXmlFragment(CANVAS_BODY_KEY), options.body ?? DEFAULT_BODY);
  return ydoc;
}

/**
 * A document that WAS legacy and has been converted.
 *
 * Both roots are populated, and only `schemaVersion` says which one is the
 * document. This is the state every `sections.length === 0` check reads
 * backwards.
 */
export function convertedDoc(options: CanvasShapeOptions = {}): Y.Doc {
  return canvasShapedDoc({
    ...options,
    frozenSections: options.frozenSections ?? DEFAULT_SECTIONS,
  });
}

/** The canvas body fragment, without the shape gate in the way. */
export function bodyOf(ydoc: Y.Doc): Y.XmlFragment {
  return ydoc.getXmlFragment(CANVAS_BODY_KEY);
}

// ---------------------------------------------------------------------------
// Default content — the SAME document, said both ways
// ---------------------------------------------------------------------------

export const DEFAULT_SECTIONS: readonly FixtureSection[] = [
  {
    id: 'sec-goals',
    title: 'Goals',
    prose: '<paragraph>Ship the canvas.</paragraph>',
    items: [
      { id: 'item-1', text: 'Write the migration', assignee: 'Ada', priority: 'high' },
    ],
  },
  {
    id: 'sec-risks',
    title: 'Risks',
    prose: '<paragraph>The section path is load-bearing.</paragraph>',
  },
];

export const DEFAULT_BODY =
  '<heading level="1">Q2 Sprint Planning</heading>' +
  '<heading level="2">Goals</heading>' +
  '<paragraph>Ship the canvas.</paragraph>' +
  '<heading level="2">Risks</heading>' +
  '<paragraph>The section path is load-bearing.</paragraph>';
