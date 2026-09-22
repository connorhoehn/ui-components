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

// The built-in rows are THIS library's shortcuts. A host's keys are not those
// keys, and with no way to say so a consumer either kept a second copy of the
// whole overlay or told its users the wrong thing about their own keyboard.
describe('ShortcutsHelp sections', () => {
  const custom = [
    {
      title: 'Calls',
      shortcuts: [
        { keys: ['⌘', 'Shift', 'C'], label: 'Start a call' },
        { keys: '⌘/Ctrl + I', label: 'Transcribe' },
      ],
    },
  ];

  it('renders the host-supplied sections', () => {
    render(<ShortcutsHelp open onClose={vi.fn()} sections={custom} />);
    expect(screen.getByText('Calls')).toBeInTheDocument();
    expect(screen.getByText('Start a call')).toBeInTheDocument();
    expect(screen.getByText('Transcribe')).toBeInTheDocument();
  });

  it('renders an array of keys as separate key caps', () => {
    render(<ShortcutsHelp open onClose={vi.fn()} sections={custom} />);
    expect(screen.getByText('⌘')).toBeInTheDocument();
    expect(screen.getByText('Shift')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('renders a string of keys as one cap, unsplit', () => {
    render(<ShortcutsHelp open onClose={vi.fn()} sections={custom} />);
    expect(screen.getByText('⌘/Ctrl + I')).toBeInTheDocument();
  });

  it('replaces the built-in rows rather than adding to them', () => {
    render(<ShortcutsHelp open onClose={vi.fn()} sections={custom} />);
    expect(screen.queryByText('Global')).not.toBeInTheDocument();
    expect(screen.queryByText('Command palette')).not.toBeInTheDocument();
  });

  it('accepts the rows/action spelling as well as shortcuts/label', () => {
    render(
      <ShortcutsHelp
        open
        onClose={vi.fn()}
        sections={[{ title: 'Docs', rows: [{ keys: '⌘/Ctrl + S', action: 'Save now' }] }]}
      />,
    );
    expect(screen.getByText('Save now')).toBeInTheDocument();
  });

  it('still dims and tags a planned row', () => {
    render(
      <ShortcutsHelp
        open
        onClose={vi.fn()}
        sections={[{ title: 'Later', rows: [{ keys: 'g o', action: 'Go to Observability', planned: true }] }]}
      />,
    );
    // The modal portals, so the row is not under the render container.
    expect(document.querySelector('[data-planned="true"]')).not.toBeNull();
    expect(screen.getByText('planned')).toBeInTheDocument();
  });

  it('leaves the default list exactly as it was', () => {
    render(<ShortcutsHelp open onClose={vi.fn()} />);
    expect(screen.getByText('Global')).toBeInTheDocument();
    expect(screen.getByText('Editor (/pipelines/:id)')).toBeInTheDocument();
    expect(screen.getByText('Command palette')).toBeInTheDocument();
    expect(screen.getByText('⌘/Ctrl + S')).toBeInTheDocument();
  });
});

