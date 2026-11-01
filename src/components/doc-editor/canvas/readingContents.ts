import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import type { OutlineEntry } from '../DocumentOutline';

/** Display numbering follows heading depth, without rewriting the saved document. */
export function numberedOutline(entries: readonly OutlineEntry[]): Array<OutlineEntry & { number: string }> {
  const sections = entries[0]?.level === 1 ? entries.slice(1) : entries;
  const levels: number[] = [];
  const counts: number[] = [];
  return sections.map(entry => {
    while (levels.length && levels[levels.length - 1] > entry.level) { levels.pop(); counts.pop(); }
    if (levels[levels.length - 1] !== entry.level) { levels.push(entry.level); counts.push(0); }
    counts[counts.length - 1] += 1;
    return { ...entry, number: counts.join('.') };
  });
}

/** Put the contents after the title and introductory blocks, before the first section. */
export function contentsPosition(doc: ProseMirrorNode): number {
  let position = 0;
  let found = false;
  doc.forEach((node, offset, index) => {
    if (found) return;
    if (node.type.name === 'heading' && !(index === 0 && node.attrs.level === 1)) {
      position = offset; found = true;
    }
  });
  return found ? position : doc.content.size;
}

/** A view decoration: the generated contents belongs to the paper, never to saved text. */
export function readingContentsExtension(container: HTMLElement) {
  return Extension.create({
    name: 'readingContents',
    addProseMirrorPlugins() {
      return [new Plugin({
        key: new PluginKey('readingContents'),
        props: {
          decorations(state) {
            const headings: OutlineEntry[] = [];
            state.doc.descendants((node, pos) => {
              if (node.type.name === 'heading') headings.push({ id: String(pos), text: node.textContent, level: node.attrs.level });
            });
            const entries = numberedOutline(headings);
            if (!entries.length) return DecorationSet.empty;
            const decorations = entries.map(entry => {
              const pos = Number(entry.id), node = state.doc.nodeAt(pos)!;
              return Decoration.node(pos, pos + node.nodeSize, { 'data-reading-number': entry.number });
            });
            decorations.push(Decoration.widget(contentsPosition(state.doc), () => container, { side: -1, key: 'reading-contents', ignoreSelection: true }));
            return DecorationSet.create(state.doc, decorations);
          },
        },
      })];
    },
  });
}
