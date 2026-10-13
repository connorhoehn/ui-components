import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal', () => {
  it('names its kind on the dialog (default modal)', () => {
    const { rerender } = render(<Modal open onClose={() => {}}><p>x</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveAttribute('data-ui-dialog', 'modal');
    rerender(<Modal open onClose={() => {}} dialogKind="picker"><p>x</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveAttribute('data-ui-dialog', 'picker');
  });
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders children when open', () => {
    render(
      <Modal open={true} onClose={onClose}>
        <p>Modal content</p>
      </Modal>
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal open={false} onClose={onClose}>
        <p>Modal content</p>
      </Modal>
    );
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('calls onClose on backdrop click', () => {
    render(
      <Modal open={true} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    fireEvent.click(screen.getByTestId('modal-backdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the modal card', () => {
    render(
      <Modal open={true} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    fireEvent.click(screen.getByText('Content'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose on Escape key', () => {
    render(
      <Modal open={true} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('traps focus inside modal (Tab wraps from last to first)', () => {
    render(
      <Modal open={true} onClose={onClose}>
        <button>First</button>
        <button>Second</button>
      </Modal>
    );
    const firstBtn = screen.getByText('First');
    const secondBtn = screen.getByText('Second');

    // Focus the last focusable element
    secondBtn.focus();
    expect(document.activeElement).toBe(secondBtn);

    // Tab from last should wrap to first
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(document.activeElement).toBe(firstBtn);
  });

  it('traps focus inside modal (Shift+Tab wraps from first to last)', () => {
    render(
      <Modal open={true} onClose={onClose}>
        <button>First</button>
        <button>Second</button>
      </Modal>
    );
    const firstBtn = screen.getByText('First');
    const secondBtn = screen.getByText('Second');

    // Focus the first focusable element
    firstBtn.focus();
    expect(document.activeElement).toBe(firstBtn);

    // Shift+Tab from first should wrap to last
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(secondBtn);
  });

  it('renders title when provided', () => {
    render(
      <Modal open={true} onClose={onClose} title="My Title">
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <Modal open={true} onClose={onClose} footer={<button>Save</button>}>
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});
