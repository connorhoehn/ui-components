// The two things a host needs from these renderers before it can stop keeping
// its own copy of them: an `extensions` passthrough, and the ability to supply
// its OWN editor component.
//
// WHY BOTH, AND WHY THEY ARE TESTED TOGETHER
//
// Every renderer here that mounts rich text used to import the library's
// `TiptapEditor` outright and pass it a fixed prop list. That made two things
// impossible from outside:
//
//   1. Suggestion / track-changes mode. The host builds a per-section
//      extension array and hands it to the editor at construction; with no
//      passthrough there was no way in at all.
//   2. Sharing the host's editor. A host that already ships a Tiptap build
//      got a SECOND one — two ProseMirror schemas, two undo stacks, two sets
//      of @tiptap/* versions drifting apart. That is not a theoretical drift:
//      the two copies had already diverged on `StarterKit.configure`, where
//      the library still passed only the v2 `history` key.
//
// Both gaps are covered for all six renderers that mount an editor, because a
// host migrating one section type at a time hits them one renderer at a time.

import { render, screen } from '@testing-library/react';
import * as Y from 'yjs';
import type { Section } from '../../types/document';
import type { SectionEditorProps } from '../types';

import RichTextEditorRenderer from '../rich-text/RichTextEditorRenderer';
import RichTextReaderRenderer from '../rich-text/RichTextReaderRenderer';
import ChecklistEditorRenderer from '../checklist/ChecklistEditorRenderer';
import ChecklistReaderRenderer from '../checklist/ChecklistReaderRenderer';
import DecisionsEditorRenderer from '../decisions/DecisionsEditorRenderer';
import DefaultRenderer from '../default/DefaultRenderer';

// The library's own editor is mocked so a test can tell the two apart: this
// one reports itself as `builtin`, the injected one below as `injected`.
vi.mock('../../components/doc-editor/TiptapEditor', () => ({
  default: ({ sectionId }: { sectionId?: string }) => (
    <div data-testid="editor" data-which="builtin" data-section={sectionId} />
  ),
}));

const seen: { extensions?: readonly unknown[] } = {};

function HostEditor({ sectionId, extensions }: SectionEditorProps) {
  seen.extensions = extensions;
  return (
    <div
      data-testid="editor"
      data-which="injected"
      data-section={sectionId}
      data-ext-count={extensions ? String(extensions.length) : 'none'}
    />
  );
}

const SUGGESTION_EXTENSIONS = [{ name: 'suggestion-mark' }, { name: 'suggestion-keymap' }];

const makeSection = (): Section => ({
  id: 's1',
  type: 'custom',
  title: 'Notes',
  collapsed: false,
  items: [],
  sectionType: 'rich-text',
});

const RENDERERS = [
  ['RichTextEditorRenderer', RichTextEditorRenderer, 'editor'],
  ['RichTextReaderRenderer', RichTextReaderRenderer, 'reader'],
  ['ChecklistEditorRenderer', ChecklistEditorRenderer, 'editor'],
  ['ChecklistReaderRenderer', ChecklistReaderRenderer, 'reader'],
  ['DecisionsEditorRenderer', DecisionsEditorRenderer, 'editor'],
  ['DefaultRenderer', DefaultRenderer, 'editor'],
] as const;

function renderWith(
  Renderer: (typeof RENDERERS)[number][1],
  viewMode: 'editor' | 'reader',
  extra: Record<string, unknown>,
) {
  const ydoc = new Y.Doc();
  const fragment = ydoc.getXmlFragment('content');
  return render(
    <Renderer
      section={makeSection()}
      viewMode={viewMode}
      editable={viewMode === 'editor'}
      fragment={fragment}
      ydoc={ydoc}
      {...extra}
    />,
  );
}

describe.each(RENDERERS)('%s', (_name, Renderer, viewMode) => {
  beforeEach(() => {
    delete seen.extensions;
  });

  it("mounts the library's own editor when none is injected", () => {
    renderWith(Renderer, viewMode, {});
    expect(screen.getByTestId('editor')).toHaveAttribute('data-which', 'builtin');
  });

  it('mounts the injected editor instead, and never the built-in one', () => {
    renderWith(Renderer, viewMode, { editorComponent: HostEditor });
    const el = screen.getByTestId('editor');
    expect(el).toHaveAttribute('data-which', 'injected');
    // Exactly one editor: the injection REPLACES the built-in rather than
    // rendering alongside it, which is the whole point — two Tiptap instances
    // over one fragment is the bug being prevented.
    expect(screen.getAllByTestId('editor')).toHaveLength(1);
  });

  it('passes `extensions` through to the editor', () => {
    renderWith(Renderer, viewMode, {
      editorComponent: HostEditor,
      extensions: SUGGESTION_EXTENSIONS,
    });
    // Identity, not just length: extensions are read at editor CONSTRUCTION,
    // so a renderer that copied the array into a new one every render would
    // rebuild the editor on every keystroke.
    expect(seen.extensions).toBe(SUGGESTION_EXTENSIONS);
    expect(screen.getByTestId('editor')).toHaveAttribute('data-ext-count', '2');
  });

  it('passes undefined when the host supplies no extensions', () => {
    renderWith(Renderer, viewMode, { editorComponent: HostEditor });
    expect(seen.extensions).toBeUndefined();
    expect(screen.getByTestId('editor')).toHaveAttribute('data-ext-count', 'none');
  });

  it('still identifies the section to the editor', () => {
    renderWith(Renderer, viewMode, { editorComponent: HostEditor });
    expect(screen.getByTestId('editor')).toHaveAttribute('data-section', 's1');
  });
});
