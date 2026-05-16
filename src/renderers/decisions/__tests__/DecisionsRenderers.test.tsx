import { render, screen, fireEvent } from '@testing-library/react';
import type { Section, TaskItem } from '../../../types/document';
import DecisionsEditorRenderer from '../DecisionsEditorRenderer';
import DecisionsReaderRenderer from '../DecisionsReaderRenderer';

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
  id: 'd1',
  type: 'tasks',
  title: 'Decisions',
  collapsed: false,
  items,
  sectionType: 'decisions',
});

describe('DecisionsReaderRenderer', () => {
  it('renders empty state when no items', () => {
    render(<DecisionsReaderRenderer section={makeSection()} viewMode="reader" editable={false} />);
    expect(screen.getByText('No decisions recorded.')).toBeInTheDocument();
  });

  it('renders pending item in Open group', () => {
    const items = [makeItem({ id: '1', text: 'Use React', status: 'pending' })];
    render(<DecisionsReaderRenderer section={makeSection(items)} viewMode="reader" editable={false} />);
    expect(screen.getByText('Use React')).toBeInTheDocument();
    expect(screen.getAllByText('Open').length).toBeGreaterThanOrEqual(1);
  });

  it('renders acked item in Decided group', () => {
    const items = [makeItem({ id: '1', text: 'Deploy to AWS', status: 'acked' })];
    render(<DecisionsReaderRenderer section={makeSection(items)} viewMode="reader" editable={false} />);
    expect(screen.getByText('Deploy to AWS')).toBeInTheDocument();
    expect(screen.getAllByText('Decided').length).toBeGreaterThanOrEqual(1);
  });

  it('renders done item in Decided group', () => {
    const items = [makeItem({ id: '1', text: 'Ship v2', status: 'done' })];
    render(<DecisionsReaderRenderer section={makeSection(items)} viewMode="reader" editable={false} />);
    expect(screen.getByText('Ship v2')).toBeInTheDocument();
    expect(screen.getAllByText('Decided').length).toBeGreaterThanOrEqual(1);
  });

  it('renders rejected item in Vetoed group', () => {
    const items = [makeItem({ id: '1', text: 'Use jQuery', status: 'rejected' })];
    render(<DecisionsReaderRenderer section={makeSection(items)} viewMode="reader" editable={false} />);
    expect(screen.getByText('Use jQuery')).toBeInTheDocument();
    expect(screen.getAllByText('Vetoed').length).toBeGreaterThanOrEqual(1);
  });

  it('groups items across all three statuses', () => {
    const items = [
      makeItem({ id: '1', text: 'Pending item', status: 'pending' }),
      makeItem({ id: '2', text: 'Acked item', status: 'acked' }),
      makeItem({ id: '3', text: 'Rejected item', status: 'rejected' }),
    ];
    render(<DecisionsReaderRenderer section={makeSection(items)} viewMode="reader" editable={false} />);
    expect(screen.getByText('Pending item')).toBeInTheDocument();
    expect(screen.getByText('Acked item')).toBeInTheDocument();
    expect(screen.getByText('Rejected item')).toBeInTheDocument();
  });

  it('shows "Untitled decision" placeholder for items with empty text', () => {
    const items = [makeItem({ id: '1', text: '' })];
    render(<DecisionsReaderRenderer section={makeSection(items)} viewMode="reader" editable={false} />);
    expect(screen.getByText('Untitled decision')).toBeInTheDocument();
  });

  it('shows navigate button when onNavigateToEditor is provided', () => {
    const items = [makeItem({ id: '1', text: 'Decision' })];
    render(
      <DecisionsReaderRenderer
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
    const items = [makeItem({ id: '1', text: 'Decision' })];
    render(
      <DecisionsReaderRenderer
        section={makeSection(items)}
        viewMode="reader"
        editable={false}
        onNavigateToEditor={onNavigateToEditor}
      />,
    );
    fireEvent.click(screen.getByText('Edit in editor →'));
    expect(onNavigateToEditor).toHaveBeenCalledWith('d1');
  });

  it('does not show navigate button when onNavigateToEditor is absent', () => {
    const items = [makeItem({ id: '1', text: 'Decision' })];
    render(<DecisionsReaderRenderer section={makeSection(items)} viewMode="reader" editable={false} />);
    expect(screen.queryByText('Edit in editor →')).not.toBeInTheDocument();
  });
});

describe('DecisionsEditorRenderer', () => {
  it('shows empty state when no items and not editable', () => {
    render(<DecisionsEditorRenderer section={makeSection()} viewMode="reader" editable={false} />);
    expect(screen.getByText('No decisions yet.')).toBeInTheDocument();
  });

  it('does not show empty text when editable (add button suffices)', () => {
    render(<DecisionsEditorRenderer section={makeSection()} viewMode="editor" editable={true} />);
    expect(screen.queryByText('No decisions yet.')).not.toBeInTheDocument();
  });

  it('shows Add decision button when editable', () => {
    render(<DecisionsEditorRenderer section={makeSection()} viewMode="editor" editable={true} />);
    expect(screen.getByText('+ Add decision')).toBeInTheDocument();
  });

  it('hides Add decision button when not editable', () => {
    render(<DecisionsEditorRenderer section={makeSection()} viewMode="reader" editable={false} />);
    expect(screen.queryByText('+ Add decision')).not.toBeInTheDocument();
  });

  it('calls onAddItem when Add decision is clicked', () => {
    const onAddItem = vi.fn();
    render(
      <DecisionsEditorRenderer
        section={makeSection()}
        viewMode="editor"
        editable={true}
        onAddItem={onAddItem}
      />,
    );
    fireEvent.click(screen.getByText('+ Add decision'));
    expect(onAddItem).toHaveBeenCalledWith(
      expect.objectContaining({ text: '', status: 'pending' }),
    );
  });

  it('renders item text in text input', () => {
    const items = [makeItem({ id: '1', text: 'My decision' })];
    render(
      <DecisionsEditorRenderer
        section={makeSection(items)}
        viewMode="editor"
        editable={true}
      />,
    );
    expect(screen.getByDisplayValue('My decision')).toBeInTheDocument();
  });

  it('calls onUpdateItem with updated text when input changes', () => {
    const onUpdateItem = vi.fn();
    const items = [makeItem({ id: 'i1', text: 'Old text' })];
    render(
      <DecisionsEditorRenderer
        section={makeSection(items)}
        viewMode="editor"
        editable={true}
        onUpdateItem={onUpdateItem}
      />,
    );
    fireEvent.change(screen.getByDisplayValue('Old text'), { target: { value: 'New text' } });
    expect(onUpdateItem).toHaveBeenCalledWith('i1', { text: 'New text' });
  });

  it('calls onUpdateItem with new status when select changes', () => {
    const onUpdateItem = vi.fn();
    const items = [makeItem({ id: 'i1', text: 'Decide this', status: 'pending' })];
    render(
      <DecisionsEditorRenderer
        section={makeSection(items)}
        viewMode="editor"
        editable={true}
        onUpdateItem={onUpdateItem}
      />,
    );
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'acked' } });
    expect(onUpdateItem).toHaveBeenCalledWith('i1', { status: 'acked' });
  });

  it('shows Remove button per item when editable', () => {
    const items = [makeItem({ id: '1', text: 'Item' })];
    render(
      <DecisionsEditorRenderer
        section={makeSection(items)}
        viewMode="editor"
        editable={true}
      />,
    );
    expect(screen.getByText('×')).toBeInTheDocument();
  });

  it('calls onRemoveItem with item id when Remove is clicked', () => {
    const onRemoveItem = vi.fn();
    const items = [makeItem({ id: 'i1', text: 'Item' })];
    render(
      <DecisionsEditorRenderer
        section={makeSection(items)}
        viewMode="editor"
        editable={true}
        onRemoveItem={onRemoveItem}
      />,
    );
    fireEvent.click(screen.getByText('×'));
    expect(onRemoveItem).toHaveBeenCalledWith('i1');
  });

  it('text input is read-only when not editable', () => {
    const items = [makeItem({ id: '1', text: 'Locked' })];
    render(
      <DecisionsEditorRenderer
        section={makeSection(items)}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.getByDisplayValue('Locked')).toHaveAttribute('readOnly');
  });

  it('hides status select and remove button when not editable', () => {
    const items = [makeItem({ id: '1', text: 'Item' })];
    render(
      <DecisionsEditorRenderer
        section={makeSection(items)}
        viewMode="reader"
        editable={false}
      />,
    );
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });
});
