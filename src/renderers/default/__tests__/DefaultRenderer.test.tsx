import { render, screen, fireEvent } from '@testing-library/react';
import * as Y from 'yjs';
import type { Section, TaskItem } from '../../../types/document';
import DefaultRenderer from '../DefaultRenderer';

vi.mock('../../../components/doc-editor/TiptapEditor', () => ({
  default: ({ sectionId }: { sectionId: string }) => (
    <div data-testid={`tiptap-${sectionId}`} />
  ),
}));

const makeItem = (overrides: Partial<TaskItem> & { id: string; text: string }): TaskItem => ({
  status: 'pending',
  assignee: '',
  ackedBy: '',
  ackedAt: '',
  priority: 'medium',
  notes: '',
  ...overrides,
});

const makeSection = (items: TaskItem[] = []): Section => ({
  id: 'def1',
  type: 'custom',
  title: 'Default',
  collapsed: false,
  items,
  sectionType: 'default',
});

describe('DefaultRenderer', () => {
  it('shows "No tasks yet." from TaskList when editable with no items', () => {
    render(<DefaultRenderer section={makeSection()} viewMode="editor" editable={true} />);
    expect(screen.getByText('No tasks yet.')).toBeInTheDocument();
  });

  it('shows Add item button when editable', () => {
    render(<DefaultRenderer section={makeSection()} viewMode="editor" editable={true} />);
    expect(screen.getByText('+ Add item')).toBeInTheDocument();
  });

  it('hides Add item button when not editable', () => {
    render(<DefaultRenderer section={makeSection()} viewMode="reader" editable={false} />);
    expect(screen.queryByText('+ Add item')).not.toBeInTheDocument();
  });

  it('calls onAddItem when Add item is clicked', () => {
    const onAddItem = vi.fn();
    render(
      <DefaultRenderer
        section={makeSection()}
        viewMode="editor"
        editable={true}
        onAddItem={onAddItem}
      />,
    );
    fireEvent.click(screen.getByText('+ Add item'));
    expect(onAddItem).toHaveBeenCalledWith(
      expect.objectContaining({ text: '', status: 'pending' }),
    );
  });

  it('renders item text in text input', () => {
    const items = [makeItem({ id: 'i1', text: 'Do a thing' })];
    render(
      <DefaultRenderer section={makeSection(items)} viewMode="editor" editable={true} />,
    );
    expect(screen.getByTestId('task-text-i1')).toHaveValue('Do a thing');
  });

  it('calls onUpdateItem with updated text when text input changes', () => {
    const onUpdateItem = vi.fn();
    const items = [makeItem({ id: 'i1', text: 'Old' })];
    render(
      <DefaultRenderer
        section={makeSection(items)}
        viewMode="editor"
        editable={true}
        onUpdateItem={onUpdateItem}
      />,
    );
    fireEvent.change(screen.getByTestId('task-text-i1'), { target: { value: 'New' } });
    expect(onUpdateItem).toHaveBeenCalledWith('i1', { text: 'New' });
  });

  it('calls onRemoveItem when Remove is clicked', () => {
    const onRemoveItem = vi.fn();
    const items = [makeItem({ id: 'i1', text: 'Item' })];
    render(
      <DefaultRenderer
        section={makeSection(items)}
        viewMode="editor"
        editable={true}
        onRemoveItem={onRemoveItem}
      />,
    );
    fireEvent.click(screen.getByTitle('Remove task'));
    expect(onRemoveItem).toHaveBeenCalledWith('i1');
  });

  it('renders TiptapEditor when fragment and ydoc are provided', () => {
    const ydoc = new Y.Doc();
    const fragment = ydoc.getXmlFragment('content');
    render(
      <DefaultRenderer
        section={makeSection()}
        viewMode="editor"
        editable={true}
        fragment={fragment}
        ydoc={ydoc}
      />,
    );
    expect(screen.getByTestId('tiptap-def1')).toBeInTheDocument();
  });

  it('does not render TiptapEditor when fragment is null', () => {
    render(<DefaultRenderer section={makeSection()} viewMode="editor" editable={true} />);
    expect(screen.queryByTestId('tiptap-def1')).not.toBeInTheDocument();
  });
});
