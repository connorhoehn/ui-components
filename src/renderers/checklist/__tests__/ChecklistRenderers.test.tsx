import { render, screen, fireEvent } from '@testing-library/react';
import type { Section, TaskItem } from '../../../types/document';
import ChecklistEditorRenderer from '../ChecklistEditorRenderer';
import ChecklistReaderRenderer from '../ChecklistReaderRenderer';

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
  id: 'c1',
  type: 'tasks',
  title: 'Checklist',
  collapsed: false,
  items,
  sectionType: 'checklist',
});

describe('ChecklistReaderRenderer', () => {
  it('renders empty state when no items', () => {
    render(<ChecklistReaderRenderer section={makeSection()} viewMode="reader" editable={false} />);
    expect(screen.getByText('No items.')).toBeInTheDocument();
  });

  it('shows progress count and percentage', () => {
    const items = [
      makeItem({ id: '1', text: 'Task A', status: 'done' }),
      makeItem({ id: '2', text: 'Task B', status: 'pending' }),
    ];
    render(<ChecklistReaderRenderer section={makeSection(items)} viewMode="reader" editable={false} />);
    expect(screen.getByText('1 / 2 done')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('shows 100% when all items are done', () => {
    const items = [
      makeItem({ id: '1', text: 'A', status: 'done' }),
      makeItem({ id: '2', text: 'B', status: 'done' }),
    ];
    render(<ChecklistReaderRenderer section={makeSection(items)} viewMode="reader" editable={false} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('renders item text', () => {
    render(
      <ChecklistReaderRenderer
        section={makeSection([makeItem({ id: '1', text: 'Write tests' })])}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.getByText('Write tests')).toBeInTheDocument();
  });

  it('checkbox is checked for done items', () => {
    const item = makeItem({ id: '1', text: 'Done item', status: 'done' });
    render(<ChecklistReaderRenderer section={makeSection([item])} viewMode="reader" editable={false} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onUpdateItem toggling status when checkbox changes', () => {
    const onUpdateItem = vi.fn();
    const item = makeItem({ id: 'i1', text: 'Pending', status: 'pending' });
    render(
      <ChecklistReaderRenderer
        section={makeSection([item])}
        viewMode="reader"
        editable={false}
        onUpdateItem={onUpdateItem}
      />,
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onUpdateItem).toHaveBeenCalledWith('i1', { status: 'done' });
  });

  it('shows navigate button when onNavigateToEditor is provided', () => {
    render(
      <ChecklistReaderRenderer
        section={makeSection([makeItem({ id: '1', text: 'x' })])}
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
      <ChecklistReaderRenderer
        section={makeSection([makeItem({ id: '1', text: 'x' })])}
        viewMode="reader"
        editable={false}
        onNavigateToEditor={onNavigateToEditor}
      />,
    );
    fireEvent.click(screen.getByText('Edit in editor →'));
    expect(onNavigateToEditor).toHaveBeenCalledWith('c1');
  });
});

describe('ChecklistEditorRenderer', () => {
  it('shows Add item button when editable', () => {
    render(<ChecklistEditorRenderer section={makeSection()} viewMode="editor" editable={true} />);
    expect(screen.getByText('+ Add item')).toBeInTheDocument();
  });

  it('hides Add item button when not editable', () => {
    render(<ChecklistEditorRenderer section={makeSection()} viewMode="editor" editable={false} />);
    expect(screen.queryByText('+ Add item')).not.toBeInTheDocument();
  });

  it('calls onAddItem when Add item is clicked', () => {
    const onAddItem = vi.fn();
    render(
      <ChecklistEditorRenderer
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

  it('shows item count when items exist', () => {
    const items = [
      makeItem({ id: '1', text: 'A', status: 'done' }),
      makeItem({ id: '2', text: 'B', status: 'pending' }),
    ];
    render(<ChecklistEditorRenderer section={makeSection(items)} viewMode="editor" editable={true} />);
    expect(screen.getByText('1 / 2 done')).toBeInTheDocument();
  });

  it('renders item text in text input', () => {
    render(
      <ChecklistEditorRenderer
        section={makeSection([makeItem({ id: '1', text: 'My item' })])}
        viewMode="editor"
        editable={true}
      />,
    );
    expect(screen.getByDisplayValue('My item')).toBeInTheDocument();
  });

  it('calls onUpdateItem toggling status when checkbox is clicked', () => {
    const onUpdateItem = vi.fn();
    const item = makeItem({ id: 'i1', text: 'Item', status: 'pending' });
    render(
      <ChecklistEditorRenderer
        section={makeSection([item])}
        viewMode="editor"
        editable={true}
        onUpdateItem={onUpdateItem}
      />,
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onUpdateItem).toHaveBeenCalledWith('i1', { status: 'done' });
  });

  it('calls onUpdateItem with updated text when text input changes', () => {
    const onUpdateItem = vi.fn();
    const item = makeItem({ id: 'i1', text: 'Old text' });
    render(
      <ChecklistEditorRenderer
        section={makeSection([item])}
        viewMode="editor"
        editable={true}
        onUpdateItem={onUpdateItem}
      />,
    );
    fireEvent.change(screen.getByDisplayValue('Old text'), { target: { value: 'New text' } });
    expect(onUpdateItem).toHaveBeenCalledWith('i1', { text: 'New text' });
  });

  it('shows Remove button per item when editable', () => {
    render(
      <ChecklistEditorRenderer
        section={makeSection([makeItem({ id: '1', text: 'Item' })])}
        viewMode="editor"
        editable={true}
      />,
    );
    expect(screen.getByText('×')).toBeInTheDocument();
  });

  it('calls onRemoveItem with item id when Remove is clicked', () => {
    const onRemoveItem = vi.fn();
    render(
      <ChecklistEditorRenderer
        section={makeSection([makeItem({ id: 'i1', text: 'Item' })])}
        viewMode="editor"
        editable={true}
        onRemoveItem={onRemoveItem}
      />,
    );
    fireEvent.click(screen.getByText('×'));
    expect(onRemoveItem).toHaveBeenCalledWith('i1');
  });

  it('text input is read-only when not editable', () => {
    render(
      <ChecklistEditorRenderer
        section={makeSection([makeItem({ id: '1', text: 'Item' })])}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.getByDisplayValue('Item')).toHaveAttribute('readOnly');
  });
});
