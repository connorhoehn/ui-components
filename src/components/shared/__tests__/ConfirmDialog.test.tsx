import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDialog from '../ConfirmDialog';

describe('ConfirmDialog', () => {
  it('marks its dialog as a confirmation for rendered-UI audits', () => {
    render(<ConfirmDialog open onConfirm={() => {}} onCancel={() => {}} title="Delete?" />);
    expect(screen.getByRole('dialog')).toHaveAttribute('data-ui-dialog', 'confirm');
  });
  const onConfirm = vi.fn();
  const onCancel = vi.fn();

  beforeEach(() => {
    onConfirm.mockClear();
    onCancel.mockClear();
  });

  it('shows title and body message when open', () => {
    render(
      <ConfirmDialog
        open={true}
        onConfirm={onConfirm}
        onCancel={onCancel}
        title="Delete Item"
        body="Are you sure you want to delete this item?"
      />
    );
    expect(screen.getByText('Delete Item')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    render(
      <ConfirmDialog
        open={true}
        onConfirm={onConfirm}
        onCancel={onCancel}
        title="Confirm"
        body="Proceed?"
      />
    );
    fireEvent.click(screen.getByTestId('confirm-dialog-confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(
      <ConfirmDialog
        open={true}
        onConfirm={onConfirm}
        onCancel={onCancel}
        title="Confirm"
        body="Proceed?"
      />
    );
    fireEvent.click(screen.getByTestId('confirm-dialog-cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when backdrop is clicked (via Modal onClose)', () => {
    render(
      <ConfirmDialog
        open={true}
        onConfirm={onConfirm}
        onCancel={onCancel}
        title="Confirm"
      />
    );
    fireEvent.click(screen.getByTestId('modal-backdrop'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('renders custom confirm and cancel labels', () => {
    render(
      <ConfirmDialog
        open={true}
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmLabel="Yes, Delete"
        cancelLabel="No, Keep"
      />
    );
    expect(screen.getByText('Yes, Delete')).toBeInTheDocument();
    expect(screen.getByText('No, Keep')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <ConfirmDialog
        open={false}
        onConfirm={onConfirm}
        onCancel={onCancel}
        title="Hidden"
        body="Should not appear"
      />
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });
});
