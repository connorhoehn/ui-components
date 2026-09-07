// Markdown INTO a page-shaped document.
//
// `parseMarkdownToSections` produces the legacy shape, and writing its output
// into a canvas puts sections into the one root a canvas never renders: the
// write succeeds, the update goes out, and nothing appears. "Load demo" — and
// every AI-generated-document path built on it — reads as a dead button.
//
// `parseMarkdownToCanvasXml` is the other half. The round trip below is the
// assertion that matters: markdown in, Y.XmlFragment, markdown out, same
// structure. It is also where the yjs casing trap bites, because the write side
// emits camelCase (ProseMirror's schema names) and the read side sees lowercase
// (`Y.XmlFragment.toString()` lowercases every node name).

import { describe, expect, it } from 'vitest';
import * as Y from 'yjs';
import { parseMarkdownToCanvasXml, parseMarkdownToSections } from '../markdownParser';
import { canvasBodyToMarkdown } from '../documentExport';
import { CANVAS_BODY_KEY, CANVAS_SCHEMA_VERSION } from '../../components/doc-editor/canvas/documentShape';

const SOURCE = [
  '# Q2 Sprint Planning',
  '',
  'Ship the canvas this quarter.',
  '',
  '## Action Items',
  '',
  '- [ ] Sweep the utils',
  '- [x] Land the gate',
  '',
  '## Notes',
  '',
  '- Frozen sections stay frozen',
  '- The version is the gate',
  '',
  '1. First',
  '2. Second',
  '',
  '> Nothing renders the old root.',
  '',
  '```',
  'npm run test',
  '```',
  '',
  '---',
].join('\n');

/** Build a real page-shaped Y.Doc from markdown, the way a loader would. */
function canvasFromMarkdown(markdown: string): Y.Doc {
  const ydoc = new Y.Doc();
  ydoc.getMap('meta').set('schemaVersion', CANVAS_SCHEMA_VERSION);
  const frag = ydoc.getXmlFragment(CANVAS_BODY_KEY);
  const parsed = new DOMParser().parseFromString(
    `<root>${parseMarkdownToCanvasXml(markdown)}</root>`,
    'text/xml',
  );
  expect(parsed.querySelector('parsererror')).toBeNull();
  append(frag, parsed.documentElement);
  return ydoc;
}

function append(target: Y.XmlFragment | Y.XmlElement, source: Element): void {
  for (const child of Array.from(source.childNodes)) {
    if (child.nodeType === 3) {
      const text = child.textContent ?? '';
      if (text.length > 0) target.push([new Y.XmlText(text)]);
      continue;
    }
    if (child.nodeType !== 1) continue;
    const el = child as Element;
    // Attach first, then fill: a detached Y.XmlElement silently drops
    // attributes ("Add Yjs type to a document before reading data").
    const node = new Y.XmlElement(el.nodeName);
    target.push([node]);
    for (const attr of Array.from(el.attributes)) node.setAttribute(attr.name, attr.value);
    append(node, el);
  }
}

describe('parseMarkdownToCanvasXml', () => {
  it('emits camelCase node names — the editor schema requires them', () => {
    const xml = parseMarkdownToCanvasXml(SOURCE);
    expect(xml).toContain('<bulletList>');
    expect(xml).toContain('<taskList>');
    expect(xml).toContain('<orderedList>');
    expect(xml).toContain('<codeBlock>');
    expect(xml).toContain('<horizontalRule>');
    expect(xml).toContain('<blockquote>');
  });

  it('checks the boxes it was given', () => {
    const xml = parseMarkdownToCanvasXml(SOURCE);
    expect(xml).toContain('<taskItem checked="false"><paragraph>Sweep the utils</paragraph></taskItem>');
    expect(xml).toContain('<taskItem checked="true"><paragraph>Land the gate</paragraph></taskItem>');
  });

  it('does not swallow a task list into a plain bullet list', () => {
    // `- [ ] x` matches the bullet pattern too. Ordering the branches wrongly
    // drops every checkbox in the document without failing anything.
    const xml = parseMarkdownToCanvasXml('- [ ] one\n- two\n');
    expect(xml).toContain('<taskList>');
    expect(xml).toContain('<bulletList>');
    expect(xml).not.toContain('<listItem><paragraph>[ ] one</paragraph></listItem>');
  });

  it('escapes XML so a document containing markup still parses', () => {
    const xml = parseMarkdownToCanvasXml('A <b> & a "quote"\n');
    const parsed = new DOMParser().parseFromString(`<root>${xml}</root>`, 'text/xml');
    expect(parsed.querySelector('parsererror')).toBeNull();
    expect(parsed.documentElement.textContent).toContain('A <b> & a "quote"');
  });

  it('terminates on input that is only block starts', () => {
    // The paragraph branch can consume nothing; without the defensive advance
    // this loops forever and the test times out rather than failing.
    expect(() => parseMarkdownToCanvasXml('---\n---\n---\n')).not.toThrow();
  });
});

describe('markdown round trip through a real canvas Y.Doc', () => {
  it('survives the yjs lowercasing with its structure intact', () => {
    const ydoc = canvasFromMarkdown(SOURCE);
    const xml = ydoc.getXmlFragment(CANVAS_BODY_KEY).toString();

    // Written camelCase, read lowercase. Both halves are load-bearing.
    expect(xml).toContain('<bulletlist>');
    expect(xml).toContain('<tasklist>');
    expect(xml).not.toContain('<bulletList>');

    const md = canvasBodyToMarkdown(ydoc.getXmlFragment(CANVAS_BODY_KEY));
    expect(md).toContain('# Q2 Sprint Planning');
    expect(md).toContain('## Action Items');
    expect(md).toContain('- [ ] Sweep the utils');
    expect(md).toContain('- [x] Land the gate');
    expect(md).toContain('- Frozen sections stay frozen');
    expect(md).toContain('1. First');
    expect(md).toContain('2. Second');
    expect(md).toContain('> Nothing renders the old root.');
    expect(md).toContain('npm run test');
    expect(md).toContain('---');
  });

  it('carries the same content the section parser does', () => {
    // The two parsers are alternate destinations for one source, so anything
    // one of them keeps the other has to keep too.
    const sections = parseMarkdownToSections(SOURCE);
    const md = canvasBodyToMarkdown(canvasFromMarkdown(SOURCE).getXmlFragment(CANVAS_BODY_KEY));

    for (const section of sections.sections) {
      expect(md).toContain(section.title);
      for (const item of section.items) expect(md).toContain(item.text);
    }
  });
});
