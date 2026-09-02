// frontend/src/components/doc-editor/TiptapEditor.tsx
//
// Reusable Tiptap editor with Y.js collaboration and custom cursor overlay.
// Uses awareness protocol for cursor positions, rendered as a React overlay
// instead of the broken yCursorPlugin/CollaborationCursor extension.

import { useMemo, useEffect, useRef, useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Placeholder from '@tiptap/extension-placeholder';
import Collaboration from '@tiptap/extension-collaboration';
import type { XmlFragment } from 'yjs';
import * as Y from 'yjs';
import type { Awareness } from 'y-protocols/awareness';
// Must import from @tiptap/y-tiptap (not y-prosemirror) because Tiptap's
// Collaboration extension uses its own PluginKey instance from this package.
// Using y-prosemirror's key would never match the actual sync plugin state.
import { ySyncPluginKey, absolutePositionToRelativePosition, relativePositionToAbsolutePosition } from '@tiptap/y-tiptap';
// NOTE: this module used to reassign the GLOBAL `console.warn` at import
// time, permanently and without restoring it, to swallow a Tiptap
// "extension-collaboration" compat warning. That patched the console of any
// app that merely imported this file. It was also unnecessary:
// `StarterKit.configure({ history: false })` below is the documented fix for
// that warning, and with the patch removed the editor mounts with a real
// Y.Doc + Collaboration extension in tests and emits nothing. Removed in
// v2.81.0 — if the warning ever returns, configure the extension, don't
// patch the host's console.
import EditorToolbar from './EditorToolbar';
import { cn } from '../../lib/cn';

/** Minimal provider shape needed by awareness. */
export interface CollaborationProvider {
  awareness: Awareness;
}

export interface TiptapEditorProps {
  fragment: XmlFragment;
  ydoc: Y.Doc;
  provider: CollaborationProvider | null;
  user: { name: string; color: string };
  editable?: boolean;
  placeholder?: string;
  /** Section ID — used to filter cursor overlay to only show cursors in this section */
  sectionId?: string;
  /** Merge-safe awareness updater for cursor display info (name + color).
   *  When provided, replaces the direct setLocalStateField write. */
  onUpdateCursorInfo?: (name: string, color: string) => void;
  /**
   * Extra Tiptap extensions appended to the built-in set.
   *
   * The canvas needs this: its macros (`action-item`, `decision`, `field`) are
   * real ProseMirror nodes with node views, so without registering them the
   * schema has no `macro` node and every macro in the document degrades to
   * plain text — silently, and on the next save that lossy text is what gets
   * written back. Appended rather than replacing, so a caller cannot
   * accidentally drop Collaboration and turn a shared document into a local
   * one.
   *
   * Pass a STABLE array (module const or useMemo). The editor is rebuilt when
   * this identity changes, and a fresh array literal every render remounts the
   * editor on every keystroke.
   */
  extensions?: readonly unknown[];
  /**
   * `'card'` (default) keeps the bordered widget with its own padding and
   * themed ink — every existing caller. `'none'` strips both so the editor
   * can sit directly on a document page the caller owns.
   */
  chrome?: 'card' | 'none';
  /** Suppresses the built-in toolbar, for a page that renders its own. */
  hideToolbar?: boolean;
  /**
   * Hands the live editor out so a caller can render toolbars or menus
   * OUTSIDE the editor's own box. Called with null while the editor is
   * initialising, so a consumer must handle that rather than assume.
   *
   * A document page needs this: its toolbar belongs in the chrome above the
   * sheet, not inside the page margins, and the editor instance is the only
   * way to drive it.
   */
  onEditorReady?: (editor: ReturnType<typeof useEditor>) => void;
}

// ---------------------------------------------------------------------------
// Remote cursor data from awareness
// ---------------------------------------------------------------------------

interface RemoteCursorInfo {
  clientId: number;
  name: string;
  color: string;
  // Absolute positions in the ProseMirror doc
  anchor: number | null;
  head: number | null;
}

// ---------------------------------------------------------------------------
// Helper: get pixel coordinates for a ProseMirror position
// ---------------------------------------------------------------------------

function getCoords(view: any, pos: number, containerEl?: HTMLDivElement | null): { top: number; left: number; height: number } | null {
  try {
    if (pos < 0 || pos > view.state.doc.content.size) return null;
    const coords = view.coordsAtPos(pos);
    // Use the container element (editorArea) as reference, not view.dom,
    // because the overlay is positioned relative to the container which has padding.
    const refEl = containerEl || view.dom;
    const refRect = refEl.getBoundingClientRect();
    return {
      top: coords.top - refRect.top,
      left: coords.left - refRect.left,
      height: coords.bottom - coords.top,
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Cursor Overlay Component
// ---------------------------------------------------------------------------

function CursorOverlay({ cursors, editorView, containerEl }: {
  cursors: RemoteCursorInfo[];
  editorView: any;
  containerEl: HTMLDivElement | null;
}) {
  if (!editorView) return null;

  return (
    <>
      {cursors.map((c) => {
        if (c.head == null) return null;
        const coords = getCoords(editorView, c.head, containerEl);
        if (!coords) return null;

        const initials = c.name
          .split(' ').map(w => w[0] ?? '').join('').toUpperCase().slice(0, 2)
          || c.name.slice(0, 2).toUpperCase();

        // Multi-line selection highlight — render per-line rectangles
        const selectionEls: React.ReactNode[] = [];
        if (c.anchor != null && c.anchor !== c.head) {
          const startPos = Math.min(c.anchor, c.head);
          const endPos = Math.max(c.anchor, c.head);
          try {
            const editorDom = editorView.dom as HTMLElement;
            const editorWidth = editorDom.offsetWidth;
            let pos = startPos;
            while (pos <= endPos) {
              const lineStart = getCoords(editorView, pos, containerEl);
              if (!lineStart) break;
              let lineEndPos = pos;
              const lineY = lineStart.top;
              for (let p = pos + 1; p <= endPos; p++) {
                const pc = getCoords(editorView, p, containerEl);
                if (!pc || Math.abs(pc.top - lineY) > 2) break;
                lineEndPos = p;
              }
              const lineEnd = getCoords(editorView, lineEndPos, containerEl);
              if (lineEnd) {
                const left = pos === startPos ? lineStart.left : 0;
                const right = lineEndPos === endPos ? lineEnd.left + 4 : editorWidth;
                selectionEls.push(
                  <div
                    key={`sel-${c.clientId}-${pos}`}
                    className="absolute rounded-sm pointer-events-none opacity-[0.12] z-[5]"
                    style={{
                      top: lineY,
                      left,
                      width: Math.max(right - left, 4),
                      height: lineStart.height || 18,
                      background: c.color,
                    }}
                  />
                );
              }
              pos = lineEndPos + 1;
            }
          } catch {
            // fallback: skip selection rendering
          }
        }

        return (
          <div key={c.clientId} className="pointer-events-none">
            {selectionEls}
            {/* Cursor caret */}
            <div
              className="absolute w-0.5 opacity-40 rounded-[1px] pointer-events-none z-10 [animation:cursorBlink_1.2s_ease-in-out_infinite]"
              style={{
                top: coords.top,
                left: coords.left - 1,
                height: coords.height || 18,
                background: c.color,
              }}
            />
            {/* Ghost glow */}
            <div
              className="absolute w-2 opacity-[0.06] rounded pointer-events-none z-[9]"
              style={{
                top: coords.top,
                left: coords.left - 4,
                height: coords.height || 18,
                background: c.color,
              }}
            />
            {/* Name badge */}
            <div
              className="absolute text-white text-[10px] font-bold py-px px-[5px] rounded-[4px_4px_4px_0] whitespace-nowrap pointer-events-none z-[11] opacity-[0.55] shadow-[0_1px_4px_rgba(0,0,0,0.1)]"
              style={{
                top: coords.top - 18,
                left: coords.left - 2,
                background: c.color,
              }}
              title={c.name}
            >
              {initials}
            </div>
          </div>
        );
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function TiptapEditor({
  fragment,
  ydoc,
  provider,
  user,
  editable = true,
  placeholder: placeholderText = 'Start typing...',
  sectionId,
  onUpdateCursorInfo,
  extensions: extraExtensions,
  chrome = 'card',
  hideToolbar = false,
  onEditorReady,
}: TiptapEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extensions = useMemo(() => [
    StarterKit.configure({ history: false } as any),
    TaskList,
    TaskItem.configure({ nested: true }),
    Placeholder.configure({ placeholder: placeholderText }),
    Collaboration.configure({ document: ydoc, fragment }),
    // Appended last so a caller's extension can override a built-in's keymap
    // without being able to remove Collaboration.
    ...((extraExtensions ?? []) as any[]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [ydoc, fragment, extraExtensions]);

  const editor = useEditor({
    extensions,
    editable,
  }, [extensions]);

  /**
   * Re-apply `editable` when it changes.
   *
   * `useEditor`'s options object is only read at CREATION, and the dep array
   * here is `[extensions]`, so a later `editable={false}` never reached the
   * editor. Switching a document to Read mode hid the toolbar (that is plain
   * conditional rendering) while the ProseMirror view kept its mount-time
   * editability: measured live, `contenteditable` stayed "true" at 300ms, 1s and
   * 2.5s after the switch, and only corrected once an unrelated re-render
   * happened to rebuild the view.
   *
   * That is the "read-only that only hides the buttons" this component is
   * supposed to rule out. The same fix already exists in realtime-modules'
   * TiptapEditor — this is its fork, and it never received it.
   *
   * Guarded on `isEditable` so it is a no-op on every unrelated render, and on
   * `isDestroyed` because an unmount can land between the render and the effect.
   */
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    if (editor.isEditable !== editable) editor.setEditable(editable);
  }, [editor, editable]);

  // ---- Custom cursor overlay using awareness directly ----
  const [remoteCursors, setRemoteCursors] = useState<RemoteCursorInfo[]>([]);
  // State, not a ref: the overlay positions carets relative to this element, and
  // a ref read during render is null on the first pass. getCoords then falls
  // back to view.dom and every caret is offset until some unrelated re-render
  // happens to pick the node up.
  const [editorArea, setEditorArea] = useState<HTMLDivElement | null>(null);

  // Merge local awareness user info via the centralized updater (if provided)
  // or fall back to a merge-safe direct write.
  useEffect(() => {
    if (onUpdateCursorInfo) {
      onUpdateCursorInfo(user.name, user.color);
    } else if (provider?.awareness) {
      // Fallback for standalone usage (e.g. ReaderMode) — merge, don't overwrite.
      const currentState = provider.awareness.getLocalState();
      const existingUser = (currentState?.user as Record<string, unknown>) || {};
      provider.awareness.setLocalStateField('user', {
        ...existingUser,
        name: user.name,
        color: user.color,
      });
    }
  }, [provider, user, onUpdateCursorInfo]);

  // Listen for awareness changes and extract cursor positions
  const updateCursors = useCallback(() => {
    if (!provider?.awareness || !editor?.view) return;

    const states = provider.awareness.getStates();
    const localClientId = provider.awareness.clientID;
    const cursors: RemoteCursorInfo[] = [];

    states.forEach((state: any, clientId: number) => {
      if (clientId === localClientId) return;
      const u = state.user;
      if (!u || !state.cursor) return;
      // Only show cursors in this section's editor
      if (sectionId && state.cursor.sectionId !== sectionId) return;

      try {
        const ystate = ySyncPluginKey.getState(editor.view.state);
        if (!ystate?.type || !ystate?.binding?.mapping) return;

        const anchor = relativePositionToAbsolutePosition(
          ystate.doc, ystate.type,
          Y.createRelativePositionFromJSON(state.cursor.anchor),
          ystate.binding.mapping
        );
        const head = relativePositionToAbsolutePosition(
          ystate.doc, ystate.type,
          Y.createRelativePositionFromJSON(state.cursor.head),
          ystate.binding.mapping
        );

        cursors.push({
          clientId,
          name: u.name || `User ${clientId}`,
          color: u.color || 'var(--color-info)',
          anchor,
          head,
        });
      } catch {
        // ySyncPlugin not ready yet
      }
    });

    setRemoteCursors(cursors);
    // sectionId is read above to filter peers to this section's editor; without
    // it here the filter compares against the id this callback was created
    // with, so carets vanish (or leak in) after a section id change.
  }, [provider, editor, sectionId]);

  // Update local cursor position in awareness when selection changes
  useEffect(() => {
    if (!editor?.view || !provider?.awareness) return;

    const handleTransaction = () => {
      try {
        const ystate = ySyncPluginKey.getState(editor.view.state);
        if (!ystate?.type || !ystate?.binding?.mapping) return;

        const { anchor, head } = editor.view.state.selection;
        const yAnchor = absolutePositionToRelativePosition(anchor, ystate.type, ystate.binding.mapping);
        const yHead = absolutePositionToRelativePosition(head, ystate.type, ystate.binding.mapping);

        provider.awareness.setLocalStateField('cursor', { anchor: yAnchor, head: yHead, sectionId });
      } catch {
        // ySyncPlugin not ready
      }
    };

    editor.on('selectionUpdate', handleTransaction);
    handleTransaction();

    return () => {
      editor.off('selectionUpdate', handleTransaction);
      // Clear the caret we published. Without this it survives in awareness
      // pointing into a section that no longer exists — peers keep drawing a
      // ghost until awareness times out, or indefinitely if this client simply
      // stops moving. setLocalStateField touches only `cursor`, so identity and
      // presence written by the page are untouched.
      provider.awareness.setLocalStateField('cursor', null);
    };
  }, [editor, provider, sectionId]);

  // Listen for remote awareness changes
  useEffect(() => {
    if (!provider?.awareness) return;
    const handler = () => updateCursors();
    provider.awareness.on('change', handler);
    return () => {
      provider.awareness.off('change', handler);
    };
  }, [provider, updateCursors]);

  // `chrome: 'none'` is what makes a document page possible. The default card
  // wraps the editor in a border and paints `text-text-primary` — a THEMED
  // ink. On a document that is wrong twice over: it draws a widget outline in
  // the middle of a page, and on invariant white paper the themed ink goes
  // near-white in dark mode. The caller owns the surface in document mode, so
  // colour is inherited rather than imposed.
  const bare = chrome === 'none';

  // Depends on the editor identity, not on onEditorReady's: a caller passing
  // an inline arrow would otherwise re-fire this on every render.
  useEffect(() => {
    onEditorReady?.(editor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  return (
    <div className={cn(!bare && editable ? 'border border-border rounded-lg overflow-hidden relative' : 'relative')}>
      {editable && !hideToolbar && <EditorToolbar editor={editor} />}
      <div
        ref={setEditorArea}
        className={cn(
          'relative',
          bare ? 'leading-relaxed' : 'px-4 py-3 text-sm leading-relaxed text-text-primary',
        )}
      >
        <EditorContent editor={editor} />
        {/* Custom cursor overlay */}
        <CursorOverlay cursors={remoteCursors} editorView={editor?.view} containerEl={editorArea} />
      </div>
    </div>
  );
}
