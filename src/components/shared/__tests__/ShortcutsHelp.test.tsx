import { render, screen, fireEvent } from '@testing-library/react';
import ShortcutsHelp from '../ShortcutsHelp';

describe('ShortcutsHelp', () => {
  it('does not render when closed', () => {
    render(<ShortcutsHelp open={false} onClose={vi.fn()} />);
    expect(screen.queryByText('Keyboard shortcuts')).not.toBeInTheDocument();
  });

  it('renders sections when open', () => {
    render(<ShortcutsHelp open={true} onClose={vi.fn()} />);
    expect(screen.getByText('Global')).toBeInTheDocument();
    expect(screen.getByText('Editor (/pipelines/:id)')).toBeInTheDocument();
    expect(screen.getByText('Replay view')).toBeInTheDocument();
  });

  it('renders shortcut rows', () => {
    render(<ShortcutsHelp open={true} onClose={vi.fn()} />);
    expect(screen.getByText('Show shortcut help')).toBeInTheDocument();
    expect(screen.getByText('Play / pause')).toBeInTheDocument();
  });

  it('calls onClose when Close button is clicked', () => {
    const onClose = vi.fn();
    render(<ShortcutsHelp open={true} onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

// The panel used to mirror PIPELINES_PLAN.md rather than the code, so it
// taught users shortcuts that were never wired. Rows that are still only
// planned must be visibly distinguished — otherwise the help lies.
describe('ShortcutsHelp planned vs wired', () => {
  it('marks unwired shortcuts as planned and leaves real ones unmarked', () => {
    render(<ShortcutsHelp open onClose={vi.fn()} />);

    // ⌘K has no listener in this library — the palette is never mounted.
    const palette = screen.getByText('Command palette').closest('[data-planned]');
    expect(palette).not.toBeNull();

    // ⌘S in the editor IS implemented (PipelineEditorPage), so it must not
    // be dimmed — that is what stops this from becoming a blanket disclaimer.
    const save = screen.getByText('Save now').closest('div[data-planned]');
    expect(save).toBeNull();
  });

  it('lists the list-view shortcuts that are actually implemented', () => {
    render(<ShortcutsHelp open onClose={vi.fn()} />);
    // PipelinesPage implements these; they were previously absent entirely.
    expect(screen.getByText('Select all visible pipelines')).toBeInTheDocument();
    expect(screen.getByText('Delete selected pipelines')).toBeInTheDocument();
  });
});
