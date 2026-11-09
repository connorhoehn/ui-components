import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ConfirmButton } from '../ConfirmButton';

describe('ConfirmButton', () => {
  it('idle: one library Button with the label', () => {
    render(<ConfirmButton label="Cancel run" question="Cancel this run?" onConfirm={() => {}} />);
    const button = screen.getByRole('button', { name: 'Cancel run' });
    expect(button).toHaveAttribute('data-confirm-state', 'idle');
    expect(button).toHaveAttribute('data-size', 'sm');
    expect(button).toHaveAttribute('data-variant', 'secondary');
    expect(button).toHaveAttribute('data-testid', 'confirm-button');
  });

  it('press swaps to the question group in place and focuses Confirm; Enter confirms', async () => {
    const onConfirm = vi.fn();
    const user = userEvent.setup();
    render(<ConfirmButton label="Cancel run" question="Cancel this run?" confirmLabel="Yes, cancel" onConfirm={onConfirm} data-testid="cancel" />);
    await user.click(screen.getByRole('button', { name: 'Cancel run' }));
    const group = screen.getByRole('group', { name: 'Cancel this run?' });
    expect(group).toHaveAttribute('data-confirm-state', 'asking');
    expect(group).toHaveAttribute('data-testid', 'cancel');
    expect(group).toHaveTextContent('Cancel this run?');
    expect(screen.queryByRole('button', { name: 'Cancel run' })).toBeNull();
    const confirm = screen.getByTestId('cancel-confirm');
    expect(confirm).toHaveFocus();
    expect(confirm).toHaveTextContent('Yes, cancel');
    await user.keyboard('{Enter}');
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Cancel run' })).toHaveFocus();
    expect(screen.getByTestId('cancel')).toHaveAttribute('data-confirm-state', 'idle');
  });

  it('Escape or Cancel restores the button without confirming', async () => {
    const onConfirm = vi.fn();
    const user = userEvent.setup();
    render(<ConfirmButton label="Delete" question="Delete it?" onConfirm={onConfirm} />);
    await user.click(screen.getByRole('button', { name: 'Delete' }));
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Delete' }));
    await user.click(screen.getByTestId('confirm-button-cancel'));
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveAttribute('data-confirm-state', 'idle');
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('destructive tone paints the idle button danger and the confirm danger-solid', () => {
    render(<ConfirmButton label="Delete" question="Delete it?" tone="destructive" onConfirm={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByTestId('confirm-button-confirm')).toHaveAttribute('data-variant', 'danger-solid');
    expect(screen.getByTestId('confirm-button-cancel')).toHaveAttribute('data-variant', 'ghost');
  });

  it('busy: the prop or a pending promise disables the button and marks it busy', async () => {
    let resolve!: () => void;
    const onConfirm = vi.fn(() => new Promise<void>((r) => { resolve = r; }));
    const { rerender } = render(<ConfirmButton label="Run" question="Run it?" onConfirm={onConfirm} />);
    fireEvent.click(screen.getByRole('button', { name: 'Run' }));
    fireEvent.click(screen.getByTestId('confirm-button-confirm'));
    const button = screen.getByRole('button', { name: 'Run' });
    expect(button).toHaveAttribute('data-confirm-state', 'busy');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    await act(async () => { resolve(); });
    expect(screen.getByRole('button', { name: 'Run' })).toHaveAttribute('data-confirm-state', 'idle');
    rerender(<ConfirmButton label="Run" question="Run it?" busy onConfirm={onConfirm} />);
    expect(screen.getByRole('button', { name: 'Run' })).toHaveAttribute('data-confirm-state', 'busy');
  });

  it('disabled never asks', () => {
    render(<ConfirmButton label="Run" question="Run it?" disabled onConfirm={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Run' }));
    expect(screen.queryByRole('group')).toBeNull();
  });

  it('focus leaving the group puts the button back', async () => {
    const user = userEvent.setup();
    render(<><ConfirmButton label="Run" question="Run it?" onConfirm={() => {}} /><button type="button">Elsewhere</button></>);
    await user.click(screen.getByRole('button', { name: 'Run' }));
    await user.click(screen.getByRole('button', { name: 'Elsewhere' }));
    expect(screen.getByRole('button', { name: 'Run' })).toHaveAttribute('data-confirm-state', 'idle');
    expect(screen.getByRole('button', { name: 'Elsewhere' })).toHaveFocus();
  });
});

describe('ConfirmButton actionKind', () => {
  it('emits data-action-kind on the button and on the question group', async () => {
    const user = userEvent.setup();
    render(<ConfirmButton label="Approve" question="Approve it?" actionKind="approve" onConfirm={() => {}} />);
    expect(screen.getByRole('button', { name: 'Approve' })).toHaveAttribute('data-action-kind', 'approve');
    await user.click(screen.getByRole('button', { name: 'Approve' }));
    expect(screen.getByRole('group', { name: 'Approve it?' })).toHaveAttribute('data-action-kind', 'approve');
  });
});
