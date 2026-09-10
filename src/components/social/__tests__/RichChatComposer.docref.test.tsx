import { createRef } from 'react';
import { render, screen, fireEvent, cleanup, act, waitFor } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { RichChatComposer, type RichChatComposerHandle, type DocumentCandidate } from '../RichChatComposer';
import { DocumentSuggestions, type DocumentSuggestionsHandle } from '../DocumentSuggestions';

// `#` is `@` for documents: a menu from the host's search, a pick that becomes
// an atom carrying the document id, and `documents` on the sent message. The
// menu opens only at a word start — `issue#42` is a word.

afterEach(cleanup);

// jsdom's Range lacks the two methods ProseMirror uses to place the menu; see
// composerCommands.test.tsx for why a zero box is enough here.
beforeAll(() => {
  const zero = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  if (!Range.prototype.getClientRects) {
    Range.prototype.getClientRects = () => [] as unknown as DOMRectList;
    Range.prototype.getBoundingClientRect = zero;
  }
});

const DOCS: DocumentCandidate[] = [
  { id: 'd1', label: 'Roadmap', hint: 'Product', icon: '🗺️' },
  { id: 'd2', label: 'Rollout plan', hint: 'Ops' },
  { id: 'd3', label: 'Budget', hint: 'Finance' },
];

function setup() {
  const onSend = vi.fn();
  const search = vi.fn((q: string) => DOCS.filter((d) => d.label.toLowerCase().startsWith(q.toLowerCase())));
  const ref = createRef<RichChatComposerHandle>();
  render(<RichChatComposer ref={ref} onSend={onSend} onSearchDocuments={search} onSearchPeople={() => []} data-testid="composer" />);
  const input = screen.getByTestId('composer-input');
  const type = (text: string) => act(() => { ref.current!.insertText(text); });
  const key = (k: string) => fireEvent.keyDown(input, { key: k });
  return { onSend, search, ref, type, key };
}

describe('RichChatComposer `#` menu', () => {
  it('lists the documents the search returns, with their icon and hint', async () => {
    const { type, search } = setup();
    type('see #Ro');
    await waitFor(() => expect(search).toHaveBeenCalledWith('Ro'));
    await waitFor(() => expect(screen.getAllByTestId('document-option')).toHaveLength(2));
    const [first] = screen.getAllByTestId('document-option');
    expect(first).toHaveTextContent('🗺️');
    expect(first).toHaveTextContent('Roadmap');
    expect(first).toHaveTextContent('Product');
    expect(screen.getByRole('listbox', { name: 'Documents' })).toBeInTheDocument();
  });

  it('inserts a docref atom on Enter, keeps #Label in the text and html, and sends `documents`', async () => {
    const { type, key, ref, onSend } = setup();
    type('see #Ro');
    await waitFor(() => expect(screen.getAllByTestId('document-option')).toHaveLength(2));
    key('ArrowDown');
    key('Enter');
    await waitFor(() => expect(screen.queryByTestId('document-suggestions')).toBeNull());

    const editor = ref.current!.editor!;
    const nodes: string[] = [];
    editor.state.doc.descendants((n) => { if (n.type.name === 'docref') nodes.push(String(n.attrs.id)); });
    expect(nodes).toEqual(['d2']);
    expect(editor.getText()).toBe('see #Rollout plan ');
    expect(editor.getHTML()).toContain('class="docref"');
    expect(editor.getHTML()).toContain('data-id="d2"');
    expect(editor.getHTML()).toContain('#Rollout plan');

    // The same document twice is one reference; a mention is not a document.
    type('and #Ro');
    await waitFor(() => expect(screen.getAllByTestId('document-option')).toHaveLength(2));
    key('ArrowDown');
    key('Enter');
    await waitFor(() => expect(screen.queryByTestId('document-suggestions')).toBeNull());
    expect(onSend).not.toHaveBeenCalled();

    key('Enter');
    expect(onSend).toHaveBeenCalledTimes(1);
    const sent = onSend.mock.calls[0][0];
    expect(sent.documents).toEqual([{ id: 'd2', label: 'Rollout plan' }]);
    expect(sent.mentions).toEqual([]);
    expect(sent.text).toBe('see #Rollout plan and #Rollout plan ');
    expect(sent.html).toContain('#Rollout plan');
  });

  it('does not open inside a word, and a message without references has no `documents`', async () => {
    const { type, key, search, onSend } = setup();
    type('issue#42 is fixed');
    await act(async () => { await Promise.resolve(); });
    expect(search).not.toHaveBeenCalled();
    expect(screen.queryByTestId('document-suggestions')).toBeNull();
    key('Enter');
    expect(onSend).toHaveBeenCalledTimes(1);
    expect(onSend.mock.calls[0][0].text).toBe('issue#42 is fixed');
    expect(onSend.mock.calls[0][0]).not.toHaveProperty('documents');
  });

  it('opens at the start of the draft too', async () => {
    const { type, search } = setup();
    type('#Bu');
    await waitFor(() => expect(search).toHaveBeenCalledWith('Bu'));
    await waitFor(() => expect(screen.getAllByTestId('document-option')).toHaveLength(1));
  });

  it('is absent without onSearchDocuments: `#` is a character', async () => {
    const onSend = vi.fn();
    const ref = createRef<RichChatComposerHandle>();
    render(<RichChatComposer ref={ref} onSend={onSend} data-testid="composer" />);
    act(() => { ref.current!.insertText('#Ro'); });
    await act(async () => { await Promise.resolve(); });
    expect(screen.queryByTestId('document-suggestions')).toBeNull();
    expect(ref.current!.editor!.schema.nodes.docref).toBeUndefined();
  });
});

describe('DocumentSuggestions', () => {
  it('owns the keyboard while open and commits on Enter and Tab', () => {
    const command = vi.fn();
    const ref = createRef<DocumentSuggestionsHandle>();
    render(<DocumentSuggestions ref={ref} items={DOCS} command={command} />);
    const key = (k: string) => {
      let handled = false;
      act(() => { handled = ref.current!.onKeyDown({ event: new KeyboardEvent('keydown', { key: k }) }); });
      return handled;
    };
    expect(key('ArrowDown')).toBe(true);
    expect(key('Enter')).toBe(true);
    expect(command).toHaveBeenCalledWith({ id: 'd2', label: 'Rollout plan' });
    expect(key('Tab')).toBe(true);
    expect(key('a')).toBe(false);
  });

  it('claims no keys while empty, so Enter still sends', () => {
    const ref = createRef<DocumentSuggestionsHandle>();
    const { container } = render(<DocumentSuggestions ref={ref} items={[]} command={vi.fn()} />);
    expect(container.firstChild).toBeNull();
    expect(ref.current!.onKeyDown({ event: new KeyboardEvent('keydown', { key: 'Enter' }) })).toBe(false);
  });
});
