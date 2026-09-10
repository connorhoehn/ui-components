import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer } from '../RichChatComposer';

// A DRAFT SURVIVES ITS PROPS.
//
// `useEditor`'s second argument behaves like a key: anything in it tears the
// editor down and builds a new, EMPTY one. `disabled` was in there and
// `placeholder` was in there by proxy (it is baked into the extension list),
// so two ordinary prop changes silently destroyed whatever was being typed:
//
//   - a host that renamed the placeholder to "Reply to Alice…" when the user
//     clicked Reply erased the message the reply was about to be;
//   - a host that disabled the composer while its socket was down — the
//     obvious way to stop sends vanishing into a shut socket — erased the
//     draft at the exact moment the connection dropped.
//
// Neither failed loudly. Nothing threw, no test went red, the words were just
// gone. These pin the editor across each change, because the only visible
// symptom is absence — see the note on `editorNode` below.

afterEach(cleanup);

// The assertion is the IDENTITY of the ProseMirror node, not typed text.
//
// jsdom has no DataTransfer and no real selection, so there is no honest way
// to type into ProseMirror here — but the draft is lost for exactly one
// reason, and it is observable: a rebuilt editor mounts a NEW contenteditable
// element and the old document goes with the old one. If the same node is
// still there, the document it holds is still there too. A survives-the-prop
// test that could not type would otherwise have to assert nothing at all.
function editorNode() {
  return screen.getByTestId('composer-input');
}

describe('RichChatComposer keeps its editor (and so its draft)', () => {
  it('through a placeholder change', () => {
    const { rerender } = render(
      <RichChatComposer onSend={vi.fn()} placeholder="Write a message…" data-testid="composer" />,
    );
    const before = editorNode();

    rerender(
      <RichChatComposer onSend={vi.fn()} placeholder="Reply to Alice…" data-testid="composer" />,
    );
    expect(editorNode()).toBe(before);
  });

  it('through a new people-search function, a new document-search function and a new commands list', () => {
    // Hosts derive `onSearchPeople` from a presence-driven directory, so it is a
    // NEW function every few seconds; `onSearchDocuments` closes over the
    // latest document index the same way; `commands` is a memo that re-derives
    // when a document opens beside the chat. Any of them used to rebuild the
    // editor — the words being typed vanished on a timer. Verified in the
    // browser before this test existed.
    const { rerender } = render(
      <RichChatComposer onSend={vi.fn()} onSearchPeople={() => []} onSearchDocuments={() => []} commands={[{ trigger: '/doc', label: 'Edit' }]} data-testid="composer" />,
    );
    const before = editorNode();
    rerender(
      <RichChatComposer
        onSend={vi.fn()}
        onSearchPeople={() => [{ id: 'u', label: 'U' }]}
        onSearchDocuments={() => [{ id: 'd', label: 'D' }]}
        commands={[{ trigger: '/doc', label: 'Edit' }, { trigger: '/open', label: 'Open' }]}
        data-testid="composer"
      />,
    );
    expect(editorNode()).toBe(before);
  });

  it('through a new onCommand handler and a commands list whose argument search changed', () => {
    // Both are read through refs by the `/` and argument menus; a host that
    // recreates them per render (an inline arrow, a search closed over the
    // latest document index) must not lose the draft.
    const { rerender } = render(
      <RichChatComposer
        onSend={vi.fn()}
        onCommand={() => {}}
        commands={[{ trigger: '/doc', label: 'Edit', argument: { search: () => [] } }]}
        data-testid="composer"
      />,
    );
    const before = editorNode();
    rerender(
      <RichChatComposer
        onSend={vi.fn()}
        onCommand={() => {}}
        commands={[{ trigger: '/doc', label: 'Edit', argument: { search: () => [{ id: 'd', label: 'D' }] } }]}
        data-testid="composer"
      />,
    );
    expect(editorNode()).toBe(before);
  });

  it('through being disabled and re-enabled', () => {
    const { rerender } = render(<RichChatComposer onSend={vi.fn()} data-testid="composer" />);
    const before = editorNode();

    rerender(<RichChatComposer onSend={vi.fn()} disabled data-testid="composer" />);
    expect(editorNode()).toBe(before);
    // …and it really is disabled, not merely still mounted.
    expect(editorNode().getAttribute('contenteditable')).toBe('false');

    rerender(<RichChatComposer onSend={vi.fn()} data-testid="composer" />);
    expect(editorNode()).toBe(before);
    expect(editorNode().getAttribute('contenteditable')).toBe('true');
  });
});
