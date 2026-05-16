import { render, screen, fireEvent } from '@testing-library/react';
import type { Section } from '../../../types/document';
import DiagramEditorRenderer from '../DiagramEditorRenderer';
import DiagramReaderRenderer from '../DiagramReaderRenderer';

const makeSection = (metadata?: Record<string, unknown>): Section => ({
  id: 'd1',
  type: 'custom',
  title: 'Diagram',
  collapsed: false,
  items: [],
  sectionType: 'diagram',
  metadata,
});

const DATA_URL = 'data:image/png;base64,abc123';

describe('DiagramReaderRenderer', () => {
  it('renders empty state when no imageDataUrl', () => {
    render(<DiagramReaderRenderer section={makeSection()} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('diagram-reader-empty-d1')).toHaveTextContent('No diagram uploaded.');
  });

  it('renders image when imageDataUrl is present', () => {
    render(
      <DiagramReaderRenderer
        section={makeSection({ imageDataUrl: DATA_URL })}
        viewMode="reader"
        editable={false}
      />,
    );
    const figure = screen.getByTestId('diagram-reader-d1');
    expect(figure).toBeInTheDocument();
    expect(figure.querySelector('img')).toHaveAttribute('src', DATA_URL);
  });

  it('shows figcaption when alt text is present', () => {
    render(
      <DiagramReaderRenderer
        section={makeSection({ imageDataUrl: DATA_URL, alt: 'Architecture diagram' })}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.getByText('Architecture diagram')).toBeInTheDocument();
  });

  it('does not show figcaption when alt is absent', () => {
    render(
      <DiagramReaderRenderer
        section={makeSection({ imageDataUrl: DATA_URL })}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.queryByRole('figure')?.querySelector('figcaption')).toBeNull();
  });
});

describe('DiagramEditorRenderer', () => {
  it('shows empty dropzone when no imageDataUrl', () => {
    render(<DiagramEditorRenderer section={makeSection()} viewMode="editor" editable={true} />);
    expect(screen.getByTestId('diagram-empty-d1')).toBeInTheDocument();
  });

  it('shows custom placeholder when section.placeholder is set', () => {
    render(
      <DiagramEditorRenderer
        section={{ ...makeSection(), placeholder: 'Drop your diagram here' }}
        viewMode="editor"
        editable={true}
      />,
    );
    expect(screen.getByTestId('diagram-empty-d1')).toHaveTextContent('Drop your diagram here');
  });

  it('shows image when imageDataUrl is in metadata', () => {
    render(
      <DiagramEditorRenderer
        section={makeSection({ imageDataUrl: DATA_URL, alt: 'Flow' })}
        viewMode="editor"
        editable={true}
      />,
    );
    expect(screen.getByTestId('diagram-image-d1')).toHaveAttribute('src', DATA_URL);
  });

  it('shows alt input when editable and image present', () => {
    render(
      <DiagramEditorRenderer
        section={makeSection({ imageDataUrl: DATA_URL, alt: 'Flow' })}
        viewMode="editor"
        editable={true}
      />,
    );
    expect(screen.getByTestId('diagram-alt-d1')).toHaveValue('Flow');
  });

  it('hides alt input when not editable', () => {
    render(
      <DiagramEditorRenderer
        section={makeSection({ imageDataUrl: DATA_URL, alt: 'Flow' })}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.queryByTestId('diagram-alt-d1')).not.toBeInTheDocument();
  });

  it('shows Remove button when editable and image present', () => {
    render(
      <DiagramEditorRenderer
        section={makeSection({ imageDataUrl: DATA_URL })}
        viewMode="editor"
        editable={true}
      />,
    );
    expect(screen.getByTestId('diagram-remove-d1')).toBeInTheDocument();
  });

  it('hides Remove button when not editable', () => {
    render(
      <DiagramEditorRenderer
        section={makeSection({ imageDataUrl: DATA_URL })}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.queryByTestId('diagram-remove-d1')).not.toBeInTheDocument();
  });

  it('calls onUpdateSection clearing image on Remove click', () => {
    const onUpdateSection = vi.fn();
    render(
      <DiagramEditorRenderer
        section={makeSection({ imageDataUrl: DATA_URL, alt: 'Flow' })}
        viewMode="editor"
        editable={true}
        onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.click(screen.getByTestId('diagram-remove-d1'));
    expect(onUpdateSection).toHaveBeenCalledWith({
      metadata: { imageDataUrl: undefined, alt: undefined },
    });
  });

  it('calls onUpdateSection with updated alt when alt input changes', () => {
    const onUpdateSection = vi.fn();
    render(
      <DiagramEditorRenderer
        section={makeSection({ imageDataUrl: DATA_URL, alt: 'Old' })}
        viewMode="editor"
        editable={true}
        onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.change(screen.getByTestId('diagram-alt-d1'), { target: { value: 'New alt' } });
    expect(onUpdateSection).toHaveBeenCalledWith({
      metadata: { imageDataUrl: DATA_URL, alt: 'New alt' },
    });
  });

  it('disables file input when not editable', () => {
    render(<DiagramEditorRenderer section={makeSection()} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('diagram-input-d1')).toBeDisabled();
  });
});
