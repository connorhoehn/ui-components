import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SelectionBar } from '../SelectionBar';

describe('SelectionBar', () => {
  it('one pick: thumbnail shown whole, "Selected: …", the description, Clear, Reject, secondary and primary', async () => {
    const onClear = vi.fn();
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <SelectionBar
        count={1}
        label="Concept 03"
        description="Toby · Main character · v1.0"
        thumbnail={{ src: 'data:image/png;base64,AA==', alt: 'Concept 03' }}
        onClear={onClear}
        reject={{ label: 'Reject', onAction: () => {}, question: 'Reject concept 03?' }}
        secondary={{ label: 'Select character', onAction: onSelect }}
        primary={{ label: 'Approve', onAction: () => {}, question: 'Approve concept 03?' }}
      />,
    );
    const bar = screen.getByRole('region', { name: 'Selection' });
    expect(bar).toHaveAttribute('data-selection-bar');
    expect(bar).toHaveAttribute('data-selection-count', '1');
    expect(screen.getByTestId('selection-bar-label')).toHaveTextContent('Selected: Concept 03');
    expect(bar).toHaveTextContent('Toby · Main character · v1.0');
    const img = screen.getByAltText('Concept 03');
    expect(img.className).toContain('object-contain');
    expect(img.parentElement).toHaveAttribute('data-image-fit', 'contain');
    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(onClear).toHaveBeenCalledOnce();
    await user.click(screen.getByRole('button', { name: 'Select character' }));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.getByRole('button', { name: 'Reject' })).toHaveAttribute('data-action-kind', 'reject');
    expect(screen.getByRole('button', { name: 'Approve' })).toHaveAttribute('data-action-kind', 'approve');
    expect(screen.getByRole('button', { name: 'Approve' })).toHaveAttribute('data-variant', 'primary');
  });

  it('Approve confirms in place and opens no dialog', async () => {
    const onApprove = vi.fn();
    const user = userEvent.setup();
    render(<SelectionBar count={1} label="Concept 03" primary={{ label: 'Approve', onAction: onApprove, question: 'Approve concept 03?' }} />);
    await user.click(screen.getByRole('button', { name: 'Approve' }));
    expect(screen.getByRole('group', { name: 'Approve concept 03?' })).toHaveAttribute('data-action-kind', 'approve');
    expect(screen.queryByRole('dialog')).toBeNull();
    await user.click(screen.getByTestId('selection-bar-primary-confirm'));
    expect(onApprove).toHaveBeenCalledOnce();
  });

  it('many picks read as a count; an action without a question acts at once', async () => {
    const onAction = vi.fn();
    const user = userEvent.setup();
    render(<SelectionBar count={3} label="ignored" primary={{ label: 'Approve all', onAction, actionKind: 'spend' }} />);
    expect(screen.getByTestId('selection-bar-label')).toHaveTextContent('3 selected');
    expect(screen.queryByRole('img')).toBeNull();
    const primary = screen.getByRole('button', { name: 'Approve all' });
    expect(primary).toHaveAttribute('data-action-kind', 'spend');
    await user.click(primary);
    expect(onAction).toHaveBeenCalledOnce();
  });

  it('nothing selected: says so, hides Clear and disables the decision', () => {
    render(<SelectionBar count={0} onClear={() => {}} primary={{ label: 'Approve', onAction: () => {} }} controls={<span>slicing</span>} />);
    expect(screen.getByTestId('selection-bar-label')).toHaveTextContent('Nothing selected');
    expect(screen.queryByRole('button', { name: 'Clear' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Approve' })).toBeDisabled();
    expect(screen.getByTestId('selection-bar-controls')).toHaveTextContent('slicing');
  });
});
