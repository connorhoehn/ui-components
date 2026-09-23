// A tabbed panel's parts on the collapsed strip (2.384.1): the documents
// mockups fold the workbench to a rail of icons — task, comments, details —
// and a badge on the one that needs someone, so the page keeps the width
// until a comment or a task asks for the column.
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContextColumn } from '../ContextColumn';

const panels = [
  {
    id: 'workbench',
    label: 'Workbench',
    icon: <span>w</span>,
    entries: [
      { id: 'task', label: 'Task', icon: <span>t</span>, badge: 1 },
      { id: 'comments', label: 'Comments', icon: <span>c</span>, badge: 2 },
      { id: 'details', label: 'Details', icon: <span>d</span> },
    ],
    content: <div>the workbench</div>,
  },
  { id: 'conversation', label: '#design', icon: <span>m</span>, content: <div>the thread</div> },
];

describe('ContextColumn — a panel with entries', () => {
  it('collapsed: one strip icon per entry in place of the panel icon, each with its own badge; pressing one opens the column to the panel at that entry', () => {
    const onStateChange = vi.fn(); const onActivate = vi.fn();
    render(<ContextColumn state="collapsed" onStateChange={onStateChange} onActivate={onActivate} panels={panels} activeId="workbench" />);
    expect(screen.queryByTestId('context-column-panel-workbench')).toBeNull();
    expect(screen.getByTestId('context-column-entry-workbench-task')).toBeInTheDocument();
    expect(screen.getByTestId('context-column-badge-workbench-task').textContent).toBe('1');
    expect(screen.getByTestId('context-column-badge-workbench-comments').textContent).toBe('2');
    expect(screen.queryByTestId('context-column-badge-workbench-details')).toBeNull();
    // A panel without entries keeps its single icon.
    expect(screen.getByTestId('context-column-panel-conversation')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Comments (2 pending)' }));
    expect(onActivate).toHaveBeenCalledWith('workbench', 'comments');
    expect(onStateChange).toHaveBeenCalledWith('open');
    fireEvent.click(screen.getByRole('button', { name: '#design' }));
    expect(onActivate).toHaveBeenLastCalledWith('conversation');
  });

  it('open: the tab row is unchanged — one tab per panel, the panel owns its own tabs', () => {
    render(<ContextColumn state="open" onStateChange={vi.fn()} onActivate={vi.fn()} panels={panels} activeId="workbench" />);
    expect(screen.getAllByRole('tab')).toHaveLength(2);
    expect(screen.getByText('the workbench')).toBeInTheDocument();
    expect(screen.queryByTestId('context-column-entry-workbench-task')).toBeNull();
  });
});
