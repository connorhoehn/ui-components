import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { Section, TaskItem } from '../../../types/document';
import TasksEditorRenderer from '../TasksEditorRenderer';
import TasksReaderRenderer from '../TasksReaderRenderer';

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
  id: 't1',
  type: 'tasks',
  title: 'Tasks',
  collapsed: false,
  items,
  sectionType: 'tasks',
});

describe('TasksReaderRenderer', () => {
  it('renders empty state when no items', () => {
    render(<TasksReaderRenderer section={makeSection()} viewMode="reader" editable={false} />);
    expect(screen.getByText('No items.')).toBeInTheDocument();
  });

  it('renders item text', () => {
    const items = [makeItem({ id: '1', text: 'Write documentation' })];
    render(<TasksReaderRenderer section={makeSection(items)} viewMode="reader" editable={false} />);
    expect(screen.getByText('Write documentation')).toBeInTheDocument();
  });

  it('renders "Untitled item" placeholder for items with empty text', () => {
    const items = [makeItem({ id: '1', text: '' })];
    render(<TasksReaderRenderer section={makeSection(items)} viewMode="reader" editable={false} />);
    expect(screen.getByText('Untitled item')).toBeInTheDocument();
  });

  it('calls onUpdateItem toggling status to done when status button is clicked', () => {
    const onUpdateItem = vi.fn();
    const items = [makeItem({ id: 'i1', text: 'Task', status: 'pending' })];
    render(
      <TasksReaderRenderer
        section={makeSection(items)}
        viewMode="reader"
        editable={false}
        onUpdateItem={onUpdateItem}
      />,
    );
    fireEvent.click(screen.getByTitle('Status: pending — click to toggle done'));
    expect(onUpdateItem).toHaveBeenCalledWith('i1', { status: 'done' });
  });

  it('calls onUpdateItem toggling status back to pending when done item is clicked', () => {
    const onUpdateItem = vi.fn();
    const items = [makeItem({ id: 'i1', text: 'Task', status: 'done' })];
    render(
      <TasksReaderRenderer
        section={makeSection(items)}
        viewMode="reader"
        editable={false}
        onUpdateItem={onUpdateItem}
      />,
    );
    fireEvent.click(screen.getByTitle('Status: done — click to toggle done'));
    expect(onUpdateItem).toHaveBeenCalledWith('i1', { status: 'pending' });
  });

  it('renders assignee initials when assignee is set', () => {
    const items = [makeItem({ id: '1', text: 'Task', assignee: 'Alice Bob' })];
    render(<TasksReaderRenderer section={makeSection(items)} viewMode="reader" editable={false} />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('renders formatted due date when dueDate is set', () => {
    const items = [makeItem({ id: '1', text: 'Task', dueDate: '2099-06-15' })];
    render(<TasksReaderRenderer section={makeSection(items)} viewMode="reader" editable={false} />);
    expect(screen.getByText(/Jun/)).toBeInTheDocument();
  });

  it('renders multiple items', () => {
    const items = [
      makeItem({ id: '1', text: 'First', status: 'pending' }),
      makeItem({ id: '2', text: 'Second', status: 'done' }),
      makeItem({ id: '3', text: 'Third', status: 'rejected' }),
    ];
    render(<TasksReaderRenderer section={makeSection(items)} viewMode="reader" editable={false} />);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });

  it('shows navigate button when onNavigateToEditor is provided', () => {
    const items = [makeItem({ id: '1', text: 'Task' })];
    render(
      <TasksReaderRenderer
        section={makeSection(items)}
        viewMode="reader"
        editable={false}
        onNavigateToEditor={vi.fn()}
      />,
    );
    expect(screen.getByText('Edit in editor →')).toBeInTheDocument();
  });

  it('calls onNavigateToEditor with section id when navigate button is clicked', () => {
    const onNavigateToEditor = vi.fn();
    const items = [makeItem({ id: '1', text: 'Task' })];
    render(
      <TasksReaderRenderer
        section={makeSection(items)}
        viewMode="reader"
        editable={false}
        onNavigateToEditor={onNavigateToEditor}
      />,
    );
    fireEvent.click(screen.getByText('Edit in editor →'));
    expect(onNavigateToEditor).toHaveBeenCalledWith('t1');
  });

  it('does not show navigate button when onNavigateToEditor is absent', () => {
    const items = [makeItem({ id: '1', text: 'Task' })];
    render(<TasksReaderRenderer section={makeSection(items)} viewMode="reader" editable={false} />);
    expect(screen.queryByText('Edit in editor →')).not.toBeInTheDocument();
  });
});

describe('TasksEditorRenderer', () => {
  it('shows empty state when no items and not editable', () => {
    render(<TasksEditorRenderer section={makeSection()} viewMode="reader" editable={false} />);
    expect(screen.getByText('No items yet.')).toBeInTheDocument();
  });

  it('shows "No tasks yet." from TaskList when editable and no items', () => {
    render(<TasksEditorRenderer section={makeSection()} viewMode="editor" editable={true} />);
    expect(screen.getByText('No tasks yet.')).toBeInTheDocument();
  });

  it('shows Add item button when editable', () => {
    render(<TasksEditorRenderer section={makeSection()} viewMode="editor" editable={true} />);
    expect(screen.getByText('+ Add item')).toBeInTheDocument();
  });

  it('hides Add item button when not editable', () => {
    render(<TasksEditorRenderer section={makeSection()} viewMode="reader" editable={false} />);
    expect(screen.queryByText('+ Add item')).not.toBeInTheDocument();
  });

  it('calls onAddItem when Add item is clicked', () => {
    const onAddItem = vi.fn();
    render(
      <TasksEditorRenderer
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
    const items = [makeItem({ id: 'i1', text: 'My task' })];
    render(
      <TasksEditorRenderer
        section={makeSection(items)}
        viewMode="editor"
        editable={true}
      />,
    );
    expect(screen.getByTestId('task-text-i1')).toHaveValue('My task');
  });

  it('calls onUpdateItem with updated text when text input changes', () => {
    const onUpdateItem = vi.fn();
    const items = [makeItem({ id: 'i1', text: 'Old text' })];
    render(
      <TasksEditorRenderer
        section={makeSection(items)}
        viewMode="editor"
        editable={true}
        onUpdateItem={onUpdateItem}
      />,
    );
    fireEvent.change(screen.getByTestId('task-text-i1'), { target: { value: 'New text' } });
    expect(onUpdateItem).toHaveBeenCalledWith('i1', { text: 'New text' });
  });

  it('calls onUpdateItem toggling status when checkbox is clicked', () => {
    const onUpdateItem = vi.fn();
    const items = [makeItem({ id: 'i1', text: 'Task', status: 'pending' })];
    render(
      <TasksEditorRenderer
        section={makeSection(items)}
        viewMode="editor"
        editable={true}
        onUpdateItem={onUpdateItem}
      />,
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onUpdateItem).toHaveBeenCalledWith('i1', { status: 'done' });
  });

  it('calls onUpdateItem with new status when status select changes', () => {
    const onUpdateItem = vi.fn();
    const items = [makeItem({ id: 'i1', text: 'Task', status: 'pending' })];
    render(
      <TasksEditorRenderer
        section={makeSection(items)}
        viewMode="editor"
        editable={true}
        onUpdateItem={onUpdateItem}
      />,
    );
    fireEvent.change(screen.getByTitle('Status: pending'), { target: { value: 'done' } });
    expect(onUpdateItem).toHaveBeenCalledWith('i1', { status: 'done' });
  });

  it('calls onUpdateItem with new priority when priority select changes', () => {
    const onUpdateItem = vi.fn();
    const items = [makeItem({ id: 'i1', text: 'Task', priority: 'medium' })];
    render(
      <TasksEditorRenderer
        section={makeSection(items)}
        viewMode="editor"
        editable={true}
        onUpdateItem={onUpdateItem}
      />,
    );
    const prioritySelect = screen.getAllByTitle('Priority: medium').find(el => el.tagName === 'SELECT')!;
    fireEvent.change(prioritySelect, { target: { value: 'high' } });
    expect(onUpdateItem).toHaveBeenCalledWith('i1', { priority: 'high' });
  });

  it('calls onRemoveItem with item id when Remove is clicked', () => {
    const onRemoveItem = vi.fn();
    const items = [makeItem({ id: 'i1', text: 'Task' })];
    render(
      <TasksEditorRenderer
        section={makeSection(items)}
        viewMode="editor"
        editable={true}
        onRemoveItem={onRemoveItem}
      />,
    );
    fireEvent.click(screen.getByTitle('Remove task'));
    expect(onRemoveItem).toHaveBeenCalledWith('i1');
  });

  it('text input is read-only when not editable', () => {
    const items = [makeItem({ id: 'i1', text: 'Locked task' })];
    render(
      <TasksEditorRenderer
        section={makeSection(items)}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.getByTestId('task-text-i1')).toHaveAttribute('readOnly');
  });

  it('hides Remove button when not editable', () => {
    const items = [makeItem({ id: 'i1', text: 'Task' })];
    render(
      <TasksEditorRenderer
        section={makeSection(items)}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.queryByTitle('Remove task')).not.toBeInTheDocument();
  });
});

// REGRESSION: the per-item quick-update status dropdown was rendered only
// when `hovered` was true, and `hovered` was set exclusively by onMouseEnter.
// The <select> was therefore never in the DOM for a keyboard user: there was
// no Tab stop to reach, so a keyboard user could only toggle done/pending via
// the status circle and could never set "acked" or "rejected" at all. The row
// now reveals it on focus as well as hover, and keeps it mounted while focus
// is inside it (unmounting a focused <select> would drop focus to <body>).
describe('TasksReaderRenderer — quick-update dropdown keyboard reachability', () => {
  const items = [makeItem({ id: 'i1', text: 'Ship the thing' })];

  function renderRow(onUpdateItem = vi.fn()) {
    render(
      <TasksReaderRenderer
        section={makeSection(items)}
        viewMode="reader"
        editable
        onUpdateItem={onUpdateItem}
      />,
    );
    return screen.getByRole('button', { name: /Status: pending/ });
  }

  it('is absent until the row is hovered or focused', () => {
    renderRow();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });

  it('appears when focus lands anywhere in the row', () => {
    const toggle = renderRow();
    fireEvent.focus(toggle);
    expect(
      screen.getByRole('combobox', { name: /Set status for Ship the thing/ }),
    ).toBeInTheDocument();
  });

  it('lets a keyboard user set a status the toggle cannot reach', () => {
    const onUpdateItem = vi.fn();
    const toggle = renderRow(onUpdateItem);
    fireEvent.focus(toggle);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'rejected' } });

    expect(onUpdateItem).toHaveBeenCalledWith('i1', { status: 'rejected' });
  });

  it('stays mounted while focus moves from the toggle into the dropdown', () => {
    const toggle = renderRow();
    fireEvent.focus(toggle);
    const select = screen.getByRole('combobox');

    fireEvent.blur(toggle, { relatedTarget: select });

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('hides again once focus leaves the row entirely', () => {
    const toggle = renderRow();
    fireEvent.focus(toggle);
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    fireEvent.blur(toggle, { relatedTarget: document.body });

    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });
});
