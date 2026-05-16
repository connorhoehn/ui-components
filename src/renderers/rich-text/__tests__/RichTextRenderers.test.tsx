import { render, screen, fireEvent } from '@testing-library/react';
import * as Y from 'yjs';
import type { Section } from '../../../types/document';
import RichTextEditorRenderer from '../RichTextEditorRenderer';
import RichTextReaderRenderer from '../RichTextReaderRenderer';

vi.mock('../../../components/doc-editor/TiptapEditor', () => ({
  default: ({ sectionId }: { sectionId: string }) => (
    <div data-testid={`tiptap-${sectionId}`} />
  ),
}));

const makeSection = (): Section => ({
  id: 'rt1',
  type: 'custom',
  title: 'Notes',
  collapsed: false,
  items: [],
  sectionType: 'rich-text',
});

describe('RichTextEditorRenderer', () => {
  it('shows "No content yet." when fragment is null', () => {
    render(
      <RichTextEditorRenderer section={makeSection()} viewMode="editor" editable={true} />,
    );
    expect(screen.getByText('No content yet.')).toBeInTheDocument();
  });

  it('renders TiptapEditor when fragment and ydoc are provided', () => {
    const ydoc = new Y.Doc();
    const fragment = ydoc.getXmlFragment('content');
    render(
      <RichTextEditorRenderer
        section={makeSection()}
        viewMode="editor"
        editable={true}
        fragment={fragment}
        ydoc={ydoc}
      />,
    );
    expect(screen.getByTestId('tiptap-rt1')).toBeInTheDocument();
  });
});

describe('RichTextReaderRenderer', () => {
  it('shows "No content." when fragment is null', () => {
    render(
      <RichTextReaderRenderer section={makeSection()} viewMode="reader" editable={false} />,
    );
    expect(screen.getByText('No content.')).toBeInTheDocument();
  });

  it('renders TiptapEditor when fragment and ydoc are provided', () => {
    const ydoc = new Y.Doc();
    const fragment = ydoc.getXmlFragment('content');
    render(
      <RichTextReaderRenderer
        section={makeSection()}
        viewMode="reader"
        editable={false}
        fragment={fragment}
        ydoc={ydoc}
      />,
    );
    expect(screen.getByTestId('tiptap-rt1')).toBeInTheDocument();
  });

  it('shows navigate button when onNavigateToEditor is provided', () => {
    render(
      <RichTextReaderRenderer
        section={makeSection()}
        viewMode="reader"
        editable={false}
        onNavigateToEditor={vi.fn()}
      />,
    );
    expect(screen.getByText('Edit in editor →')).toBeInTheDocument();
  });

  it('calls onNavigateToEditor with section id when navigate button is clicked', () => {
    const onNavigateToEditor = vi.fn();
    render(
      <RichTextReaderRenderer
        section={makeSection()}
        viewMode="reader"
        editable={false}
        onNavigateToEditor={onNavigateToEditor}
      />,
    );
    fireEvent.click(screen.getByText('Edit in editor →'));
    expect(onNavigateToEditor).toHaveBeenCalledWith('rt1');
  });

  it('does not show navigate button when onNavigateToEditor is absent', () => {
    render(
      <RichTextReaderRenderer section={makeSection()} viewMode="reader" editable={false} />,
    );
    expect(screen.queryByText('Edit in editor →')).not.toBeInTheDocument();
  });
});
