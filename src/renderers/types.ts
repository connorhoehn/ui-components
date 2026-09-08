// frontend/src/renderers/types.ts
//
// Shared props interface for all section renderers.
// Every renderer receives this contract; it picks what it needs.

import type { XmlFragment } from 'yjs';
import type * as Y from 'yjs';
import type { Section, TaskItem, Participant, CommentThread, ViewMode } from '../types/document';
import type { CollaborationProvider } from '../components/doc-editor/TiptapEditor';

export type { CollaborationProvider };

/**
 * The contract a renderer needs from a collaborative rich-text editor — the
 * subset of `TiptapEditorProps` that the section renderers actually pass.
 *
 * It exists so `editorComponent` below can be typed without dragging in the
 * whole of the library's own editor. The library's `TiptapEditor` satisfies
 * it, and so does the editor a host already ships (realtime-modules'
 * `adapters/tiptap` export, for one).
 */
export interface SectionEditorProps {
  fragment: XmlFragment;
  ydoc: Y.Doc;
  provider: CollaborationProvider | null;
  user: { name: string; color: string };
  editable?: boolean;
  placeholder?: string;
  sectionId?: string;
  onUpdateCursorInfo?: (name: string, color: string) => void;
  /** Extra Tiptap extensions appended to the editor's built-in set. */
  extensions?: readonly unknown[];
}

export type SectionEditorComponent = React.ComponentType<SectionEditorProps>;

export interface SectionRendererProps {
  section: Section;
  viewMode: ViewMode;
  editable: boolean;

  // Y.js rich-text binding
  fragment?: XmlFragment | null;
  ydoc?: Y.Doc | null;
  provider?: CollaborationProvider | null;
  user?: { name: string; color: string };

  // Mutation callbacks (undefined in read-only contexts)
  onUpdateSection?: (patch: Partial<Section>) => void;
  onAddItem?: (item: Omit<TaskItem, 'id'>) => void;
  onUpdateItem?: (itemId: string, patch: Partial<TaskItem>) => void;
  onRemoveItem?: (itemId: string) => void;

  // Collaboration
  participants?: Participant[];
  onUpdateCursorInfo?: (name: string, color: string) => void;

  // Comments
  comments?: CommentThread[];
  commentCount?: number;
  onOpenComments?: (sectionId: string) => void;

  // Navigation: reader → editor mode at this section
  onNavigateToEditor?: (sectionId: string) => void;

  /**
   * Extra Tiptap extensions for the rich-text editor this section mounts.
   *
   * Suggestion/track-changes mode is the reason this exists: the host builds a
   * per-section extension array (`suggestions.extensionsFor(section.id)`) and
   * the renderer is the only thing between that array and the editor. Without
   * a passthrough a host had no way to reach the editor at all, which is one
   * of the two reasons a consumer had to fork this directory.
   *
   * Read only when the editor is CONSTRUCTED (extensions are schema-affecting),
   * so pass a stable array — a fresh literal every render rebuilds the editor
   * on every keystroke.
   */
  extensions?: readonly unknown[];

  /**
   * The rich-text editor component to mount, instead of the library's own.
   *
   * Hosts that already ship a Tiptap build (realtime-modules'
   * `adapters/tiptap`) must not get a SECOND one: two `@tiptap/*` instances in
   * one page means two ProseMirror schemas and two undo stacks, and the
   * versions drift independently. Injecting the host's editor removes that
   * whole class of drift rather than chasing it one config key at a time.
   *
   * Defaults to the library's `TiptapEditor` when omitted, so nothing that
   * renders today changes.
   */
  editorComponent?: SectionEditorComponent;
}

export type SectionRenderer = React.ComponentType<SectionRendererProps>;
