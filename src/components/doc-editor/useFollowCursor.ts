// useFollowCursor — keep the viewport on another participant's cursor.
//
// The other half of follow mode. PresenceAvatars + FollowBanner own the
// interaction (choose someone, see the lock, escape it); this owns the
// tracking: whenever the followed client's awareness cursor moves, scroll the
// editor so it stays in view.
//
// It reads the SAME awareness state the caret overlay reads — cursor
// anchor/head as Y relative positions — and resolves them through the live
// editor's y-sync binding, exactly the way TiptapEditor draws remote carets.
// One vocabulary, so a cursor the overlay can draw is a cursor this can
// follow, and vice versa.
//
// Identity is the awareness clientID, not a user id, because that is the only
// name awareness itself speaks. Mapping people to clients is host work — a
// host builds its participant list from awareness states and already knows
// which client is which — and `clientIdForUser` below is the helper for the
// common case of matching on the user payload.

import { useEffect } from 'react';
import type { Editor } from '@tiptap/core';
import * as Y from 'yjs';
import type { Awareness } from 'y-protocols/awareness';
import { ySyncPluginKey, relativePositionToAbsolutePosition } from '@tiptap/y-tiptap';

/** Find the awareness clientID whose `user` payload matches. Null when absent. */
export function clientIdForUser(
  awareness: Awareness,
  match: (user: Record<string, unknown>) => boolean,
): number | null {
  for (const [clientId, state] of awareness.getStates()) {
    const user = (state as { user?: Record<string, unknown> })?.user;
    if (user && match(user)) return clientId;
  }
  return null;
}

export interface UseFollowCursorOptions {
  editor: Editor | null;
  /** Anything carrying the doc's awareness — the same shape TiptapEditor takes. */
  provider: { awareness: Awareness } | null | undefined;
  /** Awareness clientID to track. Null disables — the hook is always mounted. */
  followClientId: number | null;
  /**
   * Fired when the followed client disappears from awareness (closed the tab,
   * lost the connection). The host should clear its follow state — a lock on
   * a ghost scrolls nowhere and the banner would name someone who left.
   */
  onLost?: () => void;
}

export function useFollowCursor({ editor, provider, followClientId, onLost }: UseFollowCursorOptions): void {
  useEffect(() => {
    const awareness = provider?.awareness;
    if (!editor || !awareness || followClientId == null) return;

    const track = () => {
      const state = awareness.getStates().get(followClientId) as
        | { cursor?: { anchor: unknown; head: unknown } }
        | undefined;
      if (!state) { onLost?.(); return; }
      const cursor = state.cursor;
      if (!cursor) return; // present but not in the document yet — keep waiting

      try {
        const ystate = ySyncPluginKey.getState(editor.view.state);
        if (!ystate?.type || !ystate?.binding?.mapping) return;
        const head = relativePositionToAbsolutePosition(
          ystate.doc,
          ystate.type,
          Y.createRelativePositionFromJSON(cursor.head),
          ystate.binding.mapping,
        );
        if (head == null) return;

        const pos = Math.max(0, Math.min(head, editor.state.doc.content.size));
        const dom = editor.view.domAtPos(pos);
        const el = dom.node instanceof Element ? dom.node : dom.node.parentElement;
        // scrollIntoView over manual scroll math: it walks every scrollable
        // ancestor, so it works whether the editor scrolls itself or lives in
        // a page that scrolls — the two layouts CanvasDocumentView actually
        // ships in.
        el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      } catch {
        // y-sync not bound yet; the next awareness change retries.
      }
    };

    track();
    awareness.on('change', track);
    return () => awareness.off('change', track);
  }, [editor, provider, followClientId, onLost]);
}

export default useFollowCursor;
