import { render, screen, fireEvent } from '@testing-library/react';
import { Panel, PanelHeader, PanelBody } from '../Panel';

describe('Panel', () => {
  it('renders children via portal into document.body', () => {
    render(<Panel>Panel content</Panel>);
    expect(screen.getByText('Panel content')).toBeInTheDocument();
  });

  it('applies dark variant class', () => {
    render(<Panel variant="dark">Dark panel</Panel>);
    const panel = screen.getByText('Dark panel').closest('div');
    // See FloatingPanel.test.tsx: `variant="dark"` means permanently-dark
    // chrome (its header renders `text-white`), so it must take the
    // theme-INVARIANT token. `bg-surface-inverse` flipped to #f8fafc under
    // [data-theme="dark"] and took the title with it.
    expect(panel?.className).toContain('bg-call-chrome');
  });
});

describe('PanelHeader', () => {
  it('renders the title', () => {
    render(<PanelHeader title="Settings" onClose={vi.fn()} />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders actions when provided', () => {
    render(
      <PanelHeader
        title="T"
        onClose={vi.fn()}
        actions={<button>Edit</button>}
      />,
    );
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('calls onClose when × button is clicked', () => {
    const onClose = vi.fn();
    render(<PanelHeader title="T" onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close panel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('PanelBody', () => {
  it('renders children', () => {
    render(<PanelBody>Body content</PanelBody>);
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });
});
