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
