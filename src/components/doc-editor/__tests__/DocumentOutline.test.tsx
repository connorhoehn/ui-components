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
  it('moves through the actual section order and stops at either end', () => {
    const onSelect = vi.fn(), onContents = vi.fn();
    const { rerender } = render(<DocumentOutline entries={entries} presentation="controls" onSelect={onSelect} onContents={onContents} />);
    expect(screen.getByRole('button', { name: 'Previous section' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Next section' }));
    expect(onSelect).toHaveBeenLastCalledWith('1');
    rerender(<DocumentOutline entries={entries} presentation="controls" activeId="4" onSelect={onSelect} onContents={onContents} />);
    expect(screen.getByRole('button', { name: 'Next section' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Previous section' }));
    expect(onSelect).toHaveBeenLastCalledWith('3');
    fireEvent.click(screen.getByRole('button', { name: 'Back to contents' }));
    expect(onContents).toHaveBeenCalledOnce();
  });

  it('lists the headings in document order', () => {
    render(<DocumentOutline entries={entries} />);
    expect(items().map((e) => e.textContent)).toEqual([
      'Overview', 'Background', 'Deep detail', 'Conclusion',
    ]);
  });

  it('indents by level', () => {
    render(<DocumentOutline entries={entries} />);
    const pads = items().map((e) => e.style.paddingLeft);
    expect(pads).toEqual(['12px', '24px', '36px', '12px']);
  });

  // A document whose top heading is an h2 should not sit permanently indented
  // because an h1 exists in the abstract.
  it('indents relative to the shallowest heading actually present', () => {
    render(<DocumentOutline entries={[
      { id: 'a', text: 'Section', level: 2 },
      { id: 'b', text: 'Sub', level: 3 },
    ]} />);
    expect(items().map((e) => e.style.paddingLeft)).toEqual(['12px', '24px']);
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

import { readWordCount } from '../useDocumentOutline';

describe('readWordCount', () => {
  const editorWithText = (texts: string[]) => ({
    state: {
      doc: {
        descendants(fn: (n: unknown, pos: number) => void) {
          texts.forEach((t, i) => fn({ type: { name: 'text' }, text: t }, i));
        },
      },
    },
  }) as never;

  it('counts whitespace-separated words', () => {
    expect(readWordCount(editorWithText(['the quick brown fox']))).toBe(4);
  });

  // Text nodes concatenated without a separator would fuse the last word of
  // one block into the first of the next and undercount every paragraph break.
  it('does not fuse words across nodes', () => {
    expect(readWordCount(editorWithText(['first', 'second']))).toBe(2);
  });

  it('ignores stray whitespace', () => {
    expect(readWordCount(editorWithText(['  spaced   out  ']))).toBe(2);
  });

  it('counts an empty document as zero, not unknown', () => {
    expect(readWordCount(editorWithText([]))).toBe(0);
    expect(readWordCount(editorWithText([' ']))).toBe(0);
  });

  it('is unknown when there is no document', () => {
    expect(readWordCount(null)).toBeNull();
    expect(readWordCount({} as never)).toBeNull();
  });
});
