import { describe, expect, it } from 'vitest';
import { Schema } from '@tiptap/pm/model';
import { contentsPosition, numberedOutline } from '../canvas/readingContents';

describe('document contents', () => {
  it('numbers sections and nested headings without numbering the document title', () => {
    const entries = [1, 2, 3, 3, 2, 4, 2].map((level, i) => ({ id: String(i), text: `Heading ${i}`, level }));
    expect(numberedOutline(entries).map(e => e.number)).toEqual(['1', '1.1', '1.2', '2', '2.1', '3']);
  });
  it('places the contents after the title and introduction, before the first section', () => {
    const schema = new Schema({ nodes: { doc: { content: 'block+' }, paragraph: { content: 'text*', group: 'block' }, heading: { content: 'text*', group: 'block', attrs: { level: { default: 1 } } }, text: { group: 'inline' } } });
    const doc = schema.node('doc', null, [schema.node('heading', { level: 1 }, schema.text('Guide')), schema.node('paragraph', null, schema.text('Introduction')), schema.node('heading', { level: 2 }, schema.text('Prepare'))]);
    expect(contentsPosition(doc)).toBe(doc.child(0).nodeSize + doc.child(1).nodeSize);
  });
});
