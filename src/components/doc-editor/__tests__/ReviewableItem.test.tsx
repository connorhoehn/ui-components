import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ReviewableItem from '../ReviewableItem';
import type { TaskItem } from '../../../types/document';

function mk(overrides: Partial<TaskItem> = {}): TaskItem {
  return {
    id: 't1', text: 'review the spec', status: 'pending', assignee: '',
    ackedBy: '', ackedAt: '', priority: 'medium', notes: '',
    ...overrides,
  };
}

beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { vi.useRealTimers(); });

describe('ReviewableItem', () => {
  it('pending: renders item text, status + priority badges, and the three action buttons', () => {
    render(<ReviewableItem item={mk()} onAck={vi.fn()} onReject={vi.fn()} />);
    expect(screen.getByText('review the spec')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
    expect(screen.getByText('medium')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Acknowledge' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add note' })).toBeInTheDocument();
  });

  it('acked: shows Approved-by rail with truncated ackedBy and no action buttons', () => {
    const item = mk({ status: 'acked', ackedBy: 'alice-long-id-1234' });
    render(<ReviewableItem item={item} onAck={vi.fn()} onReject={vi.fn()} />);
    expect(screen.getByText(/Approved by/)).toBeInTheDocument();
    expect(screen.getByText('alice-lo')).toBeInTheDocument();
    expect(screen.queryByText('alice-long-id-1234')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Acknowledge' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Reject' })).toBeNull();
  });

  it('acked: renders the localized timestamp when ackedAt is set, omits it when blank', () => {
    const { rerender } = render(
      <ReviewableItem
        item={mk({ status: 'acked', ackedBy: 'alice', ackedAt: '2026-06-07T12:34:00Z' })}
        onAck={vi.fn()} onReject={vi.fn()}
      />,
    );
    const railWith = screen.getByText(/Approved by/).closest('div')!;
    expect(railWith.textContent).toMatch(/·/);
    expect(railWith.textContent).toMatch(/\d{1,2}:\d{2}/);

    rerender(
      <ReviewableItem
        item={mk({ status: 'acked', ackedBy: 'alice', ackedAt: '' })}
        onAck={vi.fn()} onReject={vi.fn()}
      />,
    );
    const railWithout = screen.getByText(/Approved by/).closest('div')!;
    expect(railWithout.textContent).not.toMatch(/·/);
  });

  it('acked: renders the notes suffix when item.notes is set, omits when empty', () => {
    const { rerender } = render(
      <ReviewableItem
        item={mk({ status: 'acked', ackedBy: 'alice', notes: 'looked good' })}
        onAck={vi.fn()} onReject={vi.fn()}
      />,
    );
    expect(screen.getByText(/looked good/)).toBeInTheDocument();

    rerender(
      <ReviewableItem
        item={mk({ status: 'acked', ackedBy: 'alice', notes: '' })}
        onAck={vi.fn()} onReject={vi.fn()}
      />,
    );
    expect(screen.queryByText(/looked good/)).toBeNull();
    const rail = screen.getByText(/Approved by/).closest('div')!;
    expect(rail.textContent).not.toMatch(/—/);
  });

  it('rejected: shows Rejected-by rail with truncated ackedBy and no action buttons', () => {
    const item = mk({ status: 'rejected', ackedBy: 'bobsmith-extra', notes: 'incomplete' });
    render(<ReviewableItem item={item} onAck={vi.fn()} onReject={vi.fn()} />);
    expect(screen.getByText(/Rejected by/)).toBeInTheDocument();
    expect(screen.getByText('bobsmith')).toBeInTheDocument();
    expect(screen.queryByText('bobsmith-extra')).toBeNull();
    expect(screen.getByText(/incomplete/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Acknowledge' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Reject' })).toBeNull();
  });

  it('done: renders only the header — no acked rail, no rejected rail, no action buttons', () => {
    render(<ReviewableItem item={mk({ status: 'done' })} onAck={vi.fn()} onReject={vi.fn()} />);
    expect(screen.getByText('review the spec')).toBeInTheDocument();
    expect(screen.getByText('done')).toBeInTheDocument();
    expect(screen.queryByText(/Approved by/)).toBeNull();
    expect(screen.queryByText(/Rejected by/)).toBeNull();
    expect(screen.queryByRole('button', { name: 'Acknowledge' })).toBeNull();
  });

  it('Acknowledge click: fires onAck(undefined) only after the 150ms transition delay', () => {
    const onAck = vi.fn();
    render(<ReviewableItem item={mk()} onAck={onAck} onReject={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Acknowledge' }));
    expect(onAck).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(149); });
    expect(onAck).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(1); });
    expect(onAck).toHaveBeenCalledTimes(1);
    expect(onAck).toHaveBeenCalledWith(undefined);
  });

  it('Reject click with no notes: does NOT call onReject; opens the textarea', () => {
    const onReject = vi.fn();
    render(<ReviewableItem item={mk()} onAck={vi.fn()} onReject={onReject} />);
    fireEvent.click(screen.getByRole('button', { name: 'Reject' }));
    act(() => { vi.advanceTimersByTime(500); });
    expect(onReject).not.toHaveBeenCalled();
    expect(screen.getByPlaceholderText(/Add notes or rejection reason/)).toBeInTheDocument();
  });

  it('Add note: opens textarea and removes Add-note button (Acknowledge/Reject remain visible)', () => {
    render(<ReviewableItem item={mk()} onAck={vi.fn()} onReject={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add note' }));
    expect(screen.getByPlaceholderText(/Add notes/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Add note' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Acknowledge' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reject' })).toBeInTheDocument();
  });

  it('textarea Enter (no shift) with non-empty text: ack-with-notes path fires after 150ms', () => {
    const onAck = vi.fn();
    render(<ReviewableItem item={mk()} onAck={onAck} onReject={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add note' }));
    const ta = screen.getByPlaceholderText(/Add notes/) as HTMLTextAreaElement;
    fireEvent.change(ta, { target: { value: 'looks good' } });
    fireEvent.keyDown(ta, { key: 'Enter' });
    expect(onAck).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(150); });
    expect(onAck).toHaveBeenCalledTimes(1);
    expect(onAck).toHaveBeenCalledWith('looks good');
  });

  it('textarea Enter with empty text: no-op — no onAck, textarea stays open', () => {
    const onAck = vi.fn();
    render(<ReviewableItem item={mk()} onAck={onAck} onReject={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add note' }));
    const ta = screen.getByPlaceholderText(/Add notes/) as HTMLTextAreaElement;
    fireEvent.keyDown(ta, { key: 'Enter' });
    act(() => { vi.advanceTimersByTime(150); });
    expect(onAck).not.toHaveBeenCalled();
    expect(screen.getByPlaceholderText(/Add notes/)).toBeInTheDocument();
  });

  it('textarea Escape: hides the textarea AND clears the in-flight text', () => {
    render(<ReviewableItem item={mk()} onAck={vi.fn()} onReject={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add note' }));
    const ta = screen.getByPlaceholderText(/Add notes/) as HTMLTextAreaElement;
    fireEvent.change(ta, { target: { value: 'wip' } });
    fireEvent.keyDown(ta, { key: 'Escape' });
    expect(screen.queryByPlaceholderText(/Add notes/)).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Add note' }));
    expect((screen.getByPlaceholderText(/Add notes/) as HTMLTextAreaElement).value).toBe('');
  });

  it('Submit & Acknowledge button: fires onAck(noteText) after 150ms', () => {
    const onAck = vi.fn();
    render(<ReviewableItem item={mk()} onAck={onAck} onReject={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add note' }));
    const ta = screen.getByPlaceholderText(/Add notes/) as HTMLTextAreaElement;
    fireEvent.change(ta, { target: { value: 'approved with notes' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit & Acknowledge' }));
    act(() => { vi.advanceTimersByTime(150); });
    expect(onAck).toHaveBeenCalledWith('approved with notes');
  });

  it('Submit & Reject button with notes: fires onReject(noteText) after 150ms', () => {
    const onReject = vi.fn();
    render(<ReviewableItem item={mk()} onAck={vi.fn()} onReject={onReject} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add note' }));
    const ta = screen.getByPlaceholderText(/Add notes/) as HTMLTextAreaElement;
    fireEvent.change(ta, { target: { value: 'needs more work' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit & Reject' }));
    act(() => { vi.advanceTimersByTime(150); });
    expect(onReject).toHaveBeenCalledWith('needs more work');
  });

  it('Cancel button: hides the textarea AND clears the in-flight text', () => {
    render(<ReviewableItem item={mk()} onAck={vi.fn()} onReject={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add note' }));
    const ta = screen.getByPlaceholderText(/Add notes/) as HTMLTextAreaElement;
    fireEvent.change(ta, { target: { value: 'wip' } });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByPlaceholderText(/Add notes/)).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Add note' }));
    expect((screen.getByPlaceholderText(/Add notes/) as HTMLTextAreaElement).value).toBe('');
  });
});
