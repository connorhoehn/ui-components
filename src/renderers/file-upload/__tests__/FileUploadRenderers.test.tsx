import { render, screen, fireEvent } from '@testing-library/react';
import type { Section } from '../../../types/document';
import FileUploadEditorRenderer from '../FileUploadEditorRenderer';
import FileUploadReaderRenderer from '../FileUploadReaderRenderer';

const makeSection = (metadata?: Record<string, unknown>): Section => ({
  id: 'f1',
  type: 'custom',
  title: 'Upload',
  collapsed: false,
  items: [],
  sectionType: 'file-upload',
  metadata,
});

const DATA_URL = 'data:application/pdf;base64,abc123';

describe('FileUploadReaderRenderer', () => {
  it('renders empty state when no fileName', () => {
    render(<FileUploadReaderRenderer section={makeSection()} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('file-upload-reader-empty-f1')).toHaveTextContent('No file uploaded.');
  });

  it('renders file row when fileName is present', () => {
    render(
      <FileUploadReaderRenderer
        section={makeSection({ fileName: 'report.pdf', fileDataUrl: DATA_URL })}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.getByTestId('file-upload-reader-f1')).toBeInTheDocument();
    expect(screen.getByText('Download report.pdf')).toBeInTheDocument();
  });

  it('download link has correct href and download attribute', () => {
    render(
      <FileUploadReaderRenderer
        section={makeSection({ fileName: 'doc.pdf', fileDataUrl: DATA_URL })}
        viewMode="reader"
        editable={false}
      />,
    );
    const link = screen.getByTestId('file-upload-link-f1');
    expect(link).toHaveAttribute('href', DATA_URL);
    expect(link).toHaveAttribute('download', 'doc.pdf');
  });

  it('shows formatted file size when fileSize is provided', () => {
    render(
      <FileUploadReaderRenderer
        section={makeSection({ fileName: 'img.png', fileSize: 2048 })}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.getByText('(2.0 kB)')).toBeInTheDocument();
  });

  it('omits file size display when fileSize is absent', () => {
    render(
      <FileUploadReaderRenderer
        section={makeSection({ fileName: 'img.png' })}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.queryByText(/kB/)).not.toBeInTheDocument();
  });
});

describe('FileUploadEditorRenderer', () => {
  it('shows empty dropzone when no fileName', () => {
    render(<FileUploadEditorRenderer section={makeSection()} viewMode="editor" editable={true} />);
    expect(screen.getByTestId('file-upload-empty-f1')).toBeInTheDocument();
  });

  it('shows custom placeholder when section.placeholder is set', () => {
    render(
      <FileUploadEditorRenderer
        section={{ ...makeSection(), placeholder: 'Drop CSV here' }}
        viewMode="editor"
        editable={true}
      />,
    );
    expect(screen.getByTestId('file-upload-empty-f1')).toHaveTextContent('Drop CSV here');
  });

  it('shows fileName when metadata has a file', () => {
    render(
      <FileUploadEditorRenderer
        section={makeSection({ fileName: 'report.pdf', fileDataUrl: DATA_URL })}
        viewMode="editor"
        editable={true}
      />,
    );
    expect(screen.getByText('report.pdf')).toBeInTheDocument();
  });

  it('shows file size in kB when fileSize is provided', () => {
    render(
      <FileUploadEditorRenderer
        section={makeSection({ fileName: 'doc.pdf', fileSize: 5120 })}
        viewMode="editor"
        editable={true}
      />,
    );
    expect(screen.getByText('5.0 kB')).toBeInTheDocument();
  });

  it('shows Remove button when editable and file present', () => {
    render(
      <FileUploadEditorRenderer
        section={makeSection({ fileName: 'x.pdf' })}
        viewMode="editor"
        editable={true}
      />,
    );
    expect(screen.getByTestId('file-upload-remove-f1')).toBeInTheDocument();
  });

  it('hides Remove button when not editable', () => {
    render(
      <FileUploadEditorRenderer
        section={makeSection({ fileName: 'x.pdf' })}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.queryByTestId('file-upload-remove-f1')).not.toBeInTheDocument();
  });

  it('calls onUpdateSection clearing file on Remove click', () => {
    const onUpdateSection = vi.fn();
    render(
      <FileUploadEditorRenderer
        section={makeSection({ fileName: 'x.pdf', fileDataUrl: DATA_URL, fileSize: 1024 })}
        viewMode="editor"
        editable={true}
        onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.click(screen.getByTestId('file-upload-remove-f1'));
    expect(onUpdateSection).toHaveBeenCalledWith({
      metadata: { fileName: undefined, fileDataUrl: undefined, fileSize: undefined },
    });
  });

  it('disables file input when not editable', () => {
    render(<FileUploadEditorRenderer section={makeSection()} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('file-upload-input-f1')).toBeDisabled();
  });
});
