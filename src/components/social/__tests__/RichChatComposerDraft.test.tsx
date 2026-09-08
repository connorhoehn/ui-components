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
