// useFollowCursor, end to end against a real collaborative editor.
//
// Built the way the story builds its simulated peer — a second Awareness on
// the same Y.Doc, relayed in the way a provider would — so this test IS the
// story's plumbing: if the peer's cursors cannot be resolved here, the story
// shows a banner that follows nothing.

import { render, act, cleanup } from '@testing-library/react';
import * as Y from 'yjs';
import { Awareness, encodeAwarenessUpdate, applyAwarenessUpdate, removeAwarenessStates } from 'y-protocols/awareness';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import { ySyncPluginKey, absolutePositionToRelativePosition } from '@tiptap/y-tiptap';
import type { Editor } from '@tiptap/core';
import { useFollowCursor, clientIdForUser } from '../useFollowCursor';

function Harness({ ydoc, provider, followClientId, onEditor, onLost }: {
  ydoc: Y.Doc;
  provider: { awareness: Awareness };
  followClientId: number | null;
  onEditor: (e: Editor | null) => void;
  onLost?: () => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ undoRedo: false }),
      Collaboration.configure({ document: ydoc, field: 'body' }),
    ],
  });
  onEditor(editor);
  useFollowCursor({ editor, provider, followClientId, ...(onLost ? { onLost } : {}) });
  return editor ? <EditorContent editor={editor} /> : null;
}

describe('useFollowCursor', () => {
  let scrolls: Element[];
  beforeEach(() => {
    scrolls = [];
    // jsdom has no layout, so scrollIntoView does not exist; recording the
    // element is the observable behaviour.
    Element.prototype.scrollIntoView = function scrollSpy(this: Element) {
      scrolls.push(this);
    };
  });
  afterEach(cleanup);

  function setup(follow: boolean) {
    const ydoc = new Y.Doc();
    const awareness = new Awareness(ydoc);
    const provider = { awareness };
    // A DISTINCT client, which `new Awareness(ydoc)` would not give: awareness
    // inherits the doc's clientID, so a peer on the shared doc is the same
    // client as the editor — the exact bug that made the story's caret never
    // render. Only the identity doc matters; cursor positions are relative to
    // the shared doc.
    const remote = new Awareness(new Y.Doc());
    remote.setLocalStateField('user', { name: 'Ada Lovelace', color: '#8b5cf6' });

    let editor: Editor | null = null;
    const onLost = vi.fn();
    const view = render(
      <Harness
        ydoc={ydoc}
        provider={provider}
        followClientId={follow ? remote.clientID : null}
        onEditor={(e) => { editor = e; }}
        onLost={onLost}
      />,
    );

    const relay = () => {
      applyAwarenessUpdate(awareness, encodeAwarenessUpdate(remote, [remote.clientID]), 'test');
    };
    const moveRemoteTo = (fraction: number) => {
      const ystate = ySyncPluginKey.getState(editor!.view.state);
      expect(ystate?.binding?.mapping, 'y-sync binding must exist — the story depends on it').toBeTruthy();
      const pos = Math.max(1, Math.floor(editor!.state.doc.content.size * fraction));
      const rel = absolutePositionToRelativePosition(pos, ystate!.type, ystate!.binding!.mapping);
      expect(rel, 'absolute→relative must resolve').toBeTruthy();
      remote.setLocalStateField('cursor', {
        anchor: Y.relativePositionToJSON(rel!),
        head: Y.relativePositionToJSON(rel!),
      });
      relay();
    };

    act(() => {
      editor!.commands.setContent('<h1>Doc</h1><p>one</p><p>two</p><p>three</p><p>four</p>');
    });

    return { ydoc, awareness, remote, relay, moveRemoteTo, onLost, view, getEditor: () => editor };
  }

  it('the simulated peer is visible in awareness with a resolvable cursor', () => {
    const s = setup(false);
    act(() => { s.moveRemoteTo(0.5); });

    const id = clientIdForUser(s.awareness, (u) => u['name'] === 'Ada Lovelace');
    expect(id).toBe(s.remote.clientID);
    const state = s.awareness.getStates().get(s.remote.clientID) as { cursor?: unknown };
    expect(state?.cursor).toBeTruthy();
  });

  it('scrolls to the followed cursor, and again when it moves', () => {
    const s = setup(true);
    act(() => { s.moveRemoteTo(0.3); });
    expect(scrolls.length).toBeGreaterThan(0);

    const before = scrolls.length;
    act(() => { s.moveRemoteTo(0.9); });
    expect(scrolls.length).toBeGreaterThan(before);
  });

  it('does not scroll when not following', () => {
    const s = setup(false);
    act(() => { s.moveRemoteTo(0.5); });
    expect(scrolls).toHaveLength(0);
  });

  it('reports a followed client that leaves, so the host can drop the lock', () => {
    const s = setup(true);
    act(() => { s.moveRemoteTo(0.5); });
    act(() => {
      // How a provider actually announces a departure.
      removeAwarenessStates(s.awareness, [s.remote.clientID], 'test');
    });
    expect(s.onLost).toHaveBeenCalled();
  });
});
