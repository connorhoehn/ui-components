import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NewHangoutRoomDialog } from '../NewHangoutRoomDialog';
import type { RMRoom } from '../types';

describe('hangout creation form', () => {
  it('uses shared compact fields and submits the actual configuration from the modal footer', async () => {
    const create = vi.fn(async () => ({ slug: 'review' } as RMRoom));
    const close = vi.fn();
    render(<NewHangoutRoomDialog open onClose={close} onCreate={create} title="New hangout" submitLabel="Create hangout" />);
    const name = screen.getByRole('textbox', { name: /Name/ });
    expect(name).toHaveClass('h-[var(--ui-control-sm,1.75rem)]');
    fireEvent.change(name, { target: { value: 'Product review' } });
    fireEvent.click(screen.getByRole('switch', { name: 'Start with audio only' }));
    fireEvent.click(screen.getByRole('switch', { name: 'Record calls' }));
    fireEvent.click(screen.getByRole('button', { name: 'Create hangout' }));
    await waitFor(() => expect(create).toHaveBeenCalledWith(expect.objectContaining({ name: 'Product review', settings: { audioOnly: true, recordingEnabled: true } })));
    expect(close).toHaveBeenCalledOnce();
  });
  it('keeps entered settings and exposes a failed write instead of closing', async () => {
    const close = vi.fn();
    render(<NewHangoutRoomDialog open onClose={close} onCreate={async () => { throw new Error('Rooms unavailable'); }} />);
    fireEvent.change(screen.getByRole('textbox', { name: /Name/ }), { target: { value: 'Review' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create room' }));
    await screen.findByText('Rooms unavailable');
    expect(close).not.toHaveBeenCalled();
    expect(screen.getByRole('textbox', { name: /Name/ })).toHaveValue('Review');
  });
});
