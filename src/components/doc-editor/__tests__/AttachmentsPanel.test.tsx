// AttachmentsPanel is keyed by documentId and persists to localStorage.
//
// The attachment list was seeded with a lazy `useState(() => load(documentId))`,
// which runs ONCE per mount. EditorModeSwitch keeps the panel mounted while
// documentId changes, so switching documents left the previous document's
// attachments on screen — and `persist` writes to the CURRENT documentId's key,
// so adding a file to document B wrote A's list into B's storage.

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import AttachmentsPanel from '../AttachmentsPanel';

const key = (id: string) => `ws_attachments_${id}`;

function seed(id: string, names: string[]) {
  localStorage.setItem(
    key(id),
    JSON.stringify(
      names.map((name, i) => ({
        id: `a${i}`, kind: 'file', name, url: `https://x/${name}`,
        addedAt: new Date(0).toISOString(),
      })),
    ),
  );
}

beforeEach(() => localStorage.clear());
afterEach(cleanup);

describe('AttachmentsPanel document scoping', () => {
  it('shows the attachments belonging to the document', () => {
    seed('doc-a', ['a-spec.pdf']);
    render(<AttachmentsPanel documentId="doc-a" editable />);
    expect(screen.getByText('a-spec.pdf')).toBeInTheDocument();
  });

  it('swaps the list when documentId changes on a mounted panel', () => {
    seed('doc-a', ['a-spec.pdf']);
    seed('doc-b', ['b-notes.txt']);

    const { rerender } = render(<AttachmentsPanel documentId="doc-a" editable />);
    expect(screen.getByText('a-spec.pdf')).toBeInTheDocument();

    rerender(<AttachmentsPanel documentId="doc-b" editable />);

    expect(screen.getByText('b-notes.txt')).toBeInTheDocument();
    expect(screen.queryByText('a-spec.pdf')).toBeNull();
  });

  it('does not write one document’s attachments into another’s storage', () => {
    seed('doc-a', ['a-spec.pdf']);
    seed('doc-b', []);

    const { rerender } = render(<AttachmentsPanel documentId="doc-a" editable />);
    rerender(<AttachmentsPanel documentId="doc-b" editable />);

    // Add a file while viewing document B.
    fireEvent.click(screen.getByRole('button', { name: '+ File' }));
    fireEvent.change(screen.getByPlaceholderText('File name'), { target: { value: 'b-new.pdf' } });
    fireEvent.change(screen.getByPlaceholderText('URL or path'), { target: { value: 'https://x/b' } });
    fireEvent.click(screen.getByRole('button', { name: 'Attach' }));

    const stored = JSON.parse(localStorage.getItem(key('doc-b')) ?? '[]') as Array<{ name: string }>;
    expect(stored.map((a) => a.name)).toEqual(['b-new.pdf']);
    // doc-a must be untouched by anything done while viewing doc-b
    const aStored = JSON.parse(localStorage.getItem(key('doc-a')) ?? '[]') as Array<{ name: string }>;
    expect(aStored.map((a) => a.name)).toEqual(['a-spec.pdf']);
  });

  it('shows an empty state for a document with no attachments', () => {
    seed('doc-a', ['a-spec.pdf']);
    const { rerender } = render(<AttachmentsPanel documentId="doc-a" editable />);
    rerender(<AttachmentsPanel documentId="doc-empty" editable />);
    expect(screen.queryByText('a-spec.pdf')).toBeNull();
  });
});
