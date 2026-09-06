import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DocumentOutline } from '../DocumentOutline';

afterEach(cleanup);

const entries = [
  { id: '1', text: 'Overview', level: 1 },
  { id: '2', text: 'Background', level: 2 },
  { id: '3', text: 'Deep detail', level: 3 },
  { id: '4', text: 'Conclusion', level: 1 },
];

const items = () => screen.getAllByTestId('document-outline-entry');

describe('DocumentOutline', () => {
  it('lists the headings in document order', () => {
    render(<DocumentOutline entries={entries} />);
    expect(items().map((e) => e.textContent)).toEqual([
      'Overview', 'Background', 'Deep detail', 'Conclusion',
    ]);
  });

  it('indents by level', () => {
    render(<DocumentOutline entries={entries} />);
    const pads = items().map((e) => e.style.paddingLeft);
    expect(pads).toEqual(['8px', '20px', '32px', '8px']);
  });

  // A document whose top heading is an h2 should not sit permanently indented
  // because an h1 exists in the abstract.
  it('indents relative to the shallowest heading actually present', () => {
    render(<DocumentOutline entries={[
      { id: 'a', text: 'Section', level: 2 },
      { id: 'b', text: 'Sub', level: 3 },
    ]} />);
    expect(items().map((e) => e.style.paddingLeft)).toEqual(['8px', '20px']);
  });

  it('marks where the reader is', () => {
    render(<DocumentOutline entries={entries} activeId="2" />);
    const active = items().filter((e) => e.getAttribute('data-active') === 'true');
    expect(active).toHaveLength(1);
    expect(active[0]).toHaveTextContent('Background');
    expect(active[0]).toHaveAttribute('aria-current', 'location');
  });

  it('reports the entry that was chosen', () => {
    const onSelect = vi.fn();
    render(<DocumentOutline entries={entries} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Deep detail'));
    expect(onSelect).toHaveBeenCalledWith('3');
  });

  it('says so when there are no headings', () => {
    render(<DocumentOutline entries={[]} />);
    expect(screen.getByTestId('document-outline-empty')).toBeInTheDocument();
    expect(screen.queryAllByTestId('document-outline-entry')).toHaveLength(0);
  });

  // An empty heading is still a place in the document.
  it('names an untitled heading rather than rendering a blank row', () => {
    render(<DocumentOutline entries={[{ id: 'x', text: '', level: 1 }]} />);
    expect(items()[0]).toHaveTextContent('Untitled heading');
  });

  it('is a labelled landmark', () => {
    render(<DocumentOutline entries={entries} />);
    expect(screen.getByRole('navigation', { name: 'Document outline' })).toBeInTheDocument();
  });
});

import { readOutline } from '../useDocumentOutline';

describe('readOutline', () => {
  const editorWith = (nodes: Array<[string, number, string]>) => ({
    state: {
      doc: {
        descendants(fn: (n: unknown, pos: number) => void) {
          nodes.forEach(([name, level, text], i) => {
            fn({ type: { name }, attrs: { level }, textContent: text }, i * 10);
          });
        },
      },
    },
  }) as never;

  it('collects headings in document order, keyed by position', () => {
    expect(readOutline(editorWith([
      ['heading', 1, 'Title'],
      ['paragraph', 0, 'body text'],
      ['heading', 2, 'Section'],
    ]))).toEqual([
      { id: '0', text: 'Title', level: 1 },
      { id: '20', text: 'Section', level: 2 },
    ]);
  });

  // The editor is handed over as it exists right now, which during
  // initialisation is an object with no state. An outline must never be the
  // reason a document fails to render.
  it('survives an editor that is not ready', () => {
    expect(readOutline(null)).toEqual([]);
    expect(readOutline({} as never)).toEqual([]);
    expect(readOutline({ state: {} } as never)).toEqual([]);
  });
});
