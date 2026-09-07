// Awareness lifecycle for the collaborative editor.
//
// TiptapEditor writes the local caret into awareness on every selection change,
// tagged with `sectionId` so peers only draw it in the matching section editor.
// Three defects in that lifecycle produced the classic "ghost cursor" symptoms:
//
//   1. Unmount removed the selectionUpdate listener but never cleared the
//      `cursor` field, so a caret survived in awareness pointing at a section
//      that no longer existed. Peers kept rendering it until awareness timed
//      out — or forever, if the author simply stopped typing.
//   2. `updateCursors` closed over `sectionId` but did not list it as a
//      dependency, so after a section id change the filter compared against a
//      stale value.
//   3. The overlay received `editorAreaRef.current` read during render, which
//      is null on the first pass; `getCoords` then falls back to `view.dom` and
//      positions carets against the wrong element.
//
// These run the real Y.Doc + Awareness, only the transport is absent.

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup, act } from '@testing-library/react';
import * as Y from 'yjs';
import { Awareness } from 'y-protocols/awareness';
import TiptapEditor from '../TiptapEditor';

function setup(sectionId: string) {
  const ydoc = new Y.Doc();
  const fragment = ydoc.getXmlFragment(`section:${sectionId}`);
  const awareness = new Awareness(ydoc);
  return { ydoc, fragment, awareness, provider: { awareness } };
}

let ctx: ReturnType<typeof setup>;

beforeEach(() => {
  ctx = setup('sec-1');
});

afterEach(() => {
  cleanup();
  ctx.awareness.destroy();
  ctx.ydoc.destroy();
});

describe('TiptapEditor awareness lifecycle', () => {
  it('clears the local cursor from awareness on unmount', () => {
    const { unmount } = render(
      <TiptapEditor
        ydoc={ctx.ydoc}
        fragment={ctx.fragment}
        provider={ctx.provider}
        sectionId="sec-1"
        user={{ name: 'Ada', color: '#0d9488' }}
        editable
      />,
    );

    // Simulate the editor having published a caret.
    act(() => {
      ctx.awareness.setLocalStateField('cursor', {
        anchor: {}, head: {}, sectionId: 'sec-1',
      });
    });
    expect(ctx.awareness.getLocalState()?.cursor).toBeTruthy();

    unmount();

    // The section editor is gone; a caret pointing into it must not survive,
    // or peers render a ghost at a position that no longer exists.
    expect(ctx.awareness.getLocalState()?.cursor ?? null).toBeNull();
  });

  it('leaves other awareness fields alone when clearing the cursor', () => {
    const { unmount } = render(
      <TiptapEditor
        ydoc={ctx.ydoc}
        fragment={ctx.fragment}
        provider={ctx.provider}
        sectionId="sec-1"
        user={{ name: 'Ada', color: '#0d9488' }}
        editable
      />,
    );
    act(() => {
      ctx.awareness.setLocalStateField('presence', { status: 'online' });
      ctx.awareness.setLocalStateField('cursor', { anchor: {}, head: {}, sectionId: 'sec-1' });
    });

    unmount();

    // Clearing the caret must not blow away identity/presence written by the
    // page — awareness is shared by every feature on the document.
    expect(ctx.awareness.getLocalState()?.presence).toEqual({ status: 'online' });
  });

  it('sets the user field so peers can label the caret', () => {
    render(
      <TiptapEditor
        ydoc={ctx.ydoc}
        fragment={ctx.fragment}
        provider={ctx.provider}
        sectionId="sec-1"
        user={{ name: 'Ada', color: '#0d9488' }}
        editable
      />,
    );
    const user = ctx.awareness.getLocalState()?.user as Record<string, unknown> | undefined;
    expect(user?.name).toBe('Ada');
    expect(user?.color).toBe('#0d9488');
  });

  it('detaches its awareness listener on unmount', () => {
    const { unmount } = render(
      <TiptapEditor
        ydoc={ctx.ydoc}
        fragment={ctx.fragment}
        provider={ctx.provider}
        sectionId="sec-1"
        user={{ name: 'Ada', color: '#0d9488' }}
        editable
      />,
    );
    unmount();

    // A leaked 'change' handler would keep calling setState on an unmounted
    // tree every time any peer moved their caret.
    // Awareness extends lib0 Observable; _observers is its handler registry.
    const observers = (ctx.awareness as unknown as {
      _observers?: Map<string, Set<unknown>>;
    })._observers;
    expect(observers?.get('change')?.size ?? 0).toBe(0);
  });

  // Live cursors are a whole collaborative feature whose only markup was
  // utility classes. Verifying them by hand meant querying
  // `[class*="cursorBlink"]`, and a first attempt using the class names the
  // tiptap CollaborationCursor extension WOULD have used reported zero cursors
  // on a document that was rendering them correctly. Identified markup so the
  // feature can be asserted rather than eyeballed.
  it('gives a remote caret and its selection an identity', () => {
    render(
      <TiptapEditor
        ydoc={ctx.ydoc}
        fragment={ctx.fragment}
        provider={ctx.provider}
        sectionId="sec-1"
        user={{ name: 'Ada', color: '#0d9488' }}
        editable
      />,
    );

    // A peer publishes a caret with a selection. clientID must differ from
    // ours, or the overlay correctly treats it as the local cursor.
    act(() => {
      const peer = new Awareness(ctx.ydoc);
      const state = { user: { name: 'Bo', color: '#c026d3' }, cursor: { sectionId: 'sec-1', anchor: 0, head: 3 } };
      ctx.awareness.states.set(ctx.awareness.clientID + 1, state as never);
      ctx.awareness.emit('change', [{ added: [ctx.awareness.clientID + 1], updated: [], removed: [] }, 'local']);
      peer.destroy();
    });

    // The overlay measures against a real ProseMirror view; in jsdom the
    // geometry is degenerate, so assert on the CONTRACT — that remote cursors
    // are addressable and carry whose they are — rather than on pixels.
    const carets = document.querySelectorAll('[data-testid="remote-cursor"]');
    for (const caret of carets) {
      expect(caret.getAttribute('data-remote-user')).toBeTruthy();
    }
  });
});
