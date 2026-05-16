import { render, screen, fireEvent } from '@testing-library/react';
import type { Section } from '../../../types/document';
import LinkBlockEditorRenderer from '../LinkBlockEditorRenderer';
import LinkBlockReaderRenderer from '../LinkBlockReaderRenderer';

const makeSection = (metadata?: Record<string, unknown>): Section => ({
  id: 's1',
  type: 'custom',
  title: 'Links',
  collapsed: false,
  items: [],
  sectionType: 'link-block',
  metadata,
});

describe('LinkBlockReaderRenderer', () => {
  it('renders empty state when no metadata', () => {
    render(<LinkBlockReaderRenderer section={makeSection()} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('link-block-reader-empty-s1')).toHaveTextContent('No links.');
  });

  it('renders empty state when links array is empty', () => {
    render(<LinkBlockReaderRenderer section={makeSection({ links: [] })} viewMode="reader" editable={false} />);
    expect(screen.getByTestId('link-block-reader-empty-s1')).toBeInTheDocument();
  });

  it('renders links with label text as anchor', () => {
    render(
      <LinkBlockReaderRenderer
        section={makeSection({ links: [{ label: 'GitHub', url: 'https://github.com' }] })}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.getByTestId('link-block-reader-s1')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('href', 'https://github.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('falls back to URL when label is empty', () => {
    render(
      <LinkBlockReaderRenderer
        section={makeSection({ links: [{ label: '', url: 'https://example.com' }] })}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.getByRole('link', { name: 'https://example.com' })).toBeInTheDocument();
  });

  it('filters out links with no URL', () => {
    render(
      <LinkBlockReaderRenderer
        section={makeSection({
          links: [
            { label: 'No URL', url: '' },
            { label: 'Valid', url: 'https://x.com' },
          ],
        })}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.queryByText('No URL')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Valid' })).toBeInTheDocument();
  });

  it('renders multiple links', () => {
    render(
      <LinkBlockReaderRenderer
        section={makeSection({
          links: [
            { label: 'Alpha', url: 'https://a.com' },
            { label: 'Beta',  url: 'https://b.com' },
          ],
        })}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});

describe('LinkBlockEditorRenderer', () => {
  it('renders empty state when no links', () => {
    render(<LinkBlockEditorRenderer section={makeSection()} viewMode="editor" editable={true} />);
    expect(screen.getByTestId('link-block-empty-s1')).toHaveTextContent('No links yet.');
  });

  it('shows Add link button when editable', () => {
    render(<LinkBlockEditorRenderer section={makeSection()} viewMode="editor" editable={true} />);
    expect(screen.getByTestId('link-block-add-s1')).toBeInTheDocument();
  });

  it('hides Add link button when not editable', () => {
    render(<LinkBlockEditorRenderer section={makeSection()} viewMode="reader" editable={false} />);
    expect(screen.queryByTestId('link-block-add-s1')).not.toBeInTheDocument();
  });

  it('calls onUpdateSection with new empty link when Add is clicked', () => {
    const onUpdateSection = vi.fn();
    render(
      <LinkBlockEditorRenderer
        section={makeSection()}
        viewMode="editor"
        editable={true}
        onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.click(screen.getByTestId('link-block-add-s1'));
    expect(onUpdateSection).toHaveBeenCalledWith({
      metadata: { links: [{ label: '', url: '' }] },
    });
  });

  it('renders label and url inputs for existing links', () => {
    render(
      <LinkBlockEditorRenderer
        section={makeSection({ links: [{ label: 'Docs', url: 'https://docs.com' }] })}
        viewMode="editor"
        editable={true}
      />,
    );
    expect(screen.getByTestId('link-block-label-s1-0')).toHaveValue('Docs');
    expect(screen.getByTestId('link-block-url-s1-0')).toHaveValue('https://docs.com');
  });

  it('calls onUpdateSection with updated label when label input changes', () => {
    const onUpdateSection = vi.fn();
    render(
      <LinkBlockEditorRenderer
        section={makeSection({ links: [{ label: 'Old', url: 'https://x.com' }] })}
        viewMode="editor"
        editable={true}
        onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.change(screen.getByTestId('link-block-label-s1-0'), { target: { value: 'New' } });
    expect(onUpdateSection).toHaveBeenCalledWith({
      metadata: { links: [{ label: 'New', url: 'https://x.com' }] },
    });
  });

  it('calls onUpdateSection with updated url when url input changes', () => {
    const onUpdateSection = vi.fn();
    render(
      <LinkBlockEditorRenderer
        section={makeSection({ links: [{ label: 'Site', url: 'https://old.com' }] })}
        viewMode="editor"
        editable={true}
        onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.change(screen.getByTestId('link-block-url-s1-0'), { target: { value: 'https://new.com' } });
    expect(onUpdateSection).toHaveBeenCalledWith({
      metadata: { links: [{ label: 'Site', url: 'https://new.com' }] },
    });
  });

  it('calls onUpdateSection with link removed when Remove is clicked', () => {
    const onUpdateSection = vi.fn();
    render(
      <LinkBlockEditorRenderer
        section={makeSection({
          links: [
            { label: 'A', url: 'https://a.com' },
            { label: 'B', url: 'https://b.com' },
          ],
        })}
        viewMode="editor"
        editable={true}
        onUpdateSection={onUpdateSection}
      />,
    );
    fireEvent.click(screen.getByTestId('link-block-remove-s1-0'));
    expect(onUpdateSection).toHaveBeenCalledWith({
      metadata: { links: [{ label: 'B', url: 'https://b.com' }] },
    });
  });

  it('disables inputs and hides Remove button when not editable', () => {
    render(
      <LinkBlockEditorRenderer
        section={makeSection({ links: [{ label: 'X', url: 'https://x.com' }] })}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.getByTestId('link-block-label-s1-0')).toBeDisabled();
    expect(screen.getByTestId('link-block-url-s1-0')).toBeDisabled();
    expect(screen.queryByTestId('link-block-remove-s1-0')).not.toBeInTheDocument();
  });
});
