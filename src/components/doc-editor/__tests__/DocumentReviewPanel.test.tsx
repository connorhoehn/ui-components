import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DocumentReviewPanel, type DocumentReviewEntry } from '../DocumentReviewPanel';
afterEach(cleanup);
const request: DocumentReviewEntry = { requestKey: 'request-1', reviewerId: 'reviewer', reviewerName: 'Actual Reviewer', requestedBy: 'owner', state: 'pending', required: true };
describe('DocumentReviewPanel', () => {
  it('shows decisions only for the assigned reviewer and pending requests', () => {
    const props = { requests: [request], currentUserId: 'other', onRefresh: vi.fn(), onDecide: vi.fn() };
    const { rerender } = render(<DocumentReviewPanel {...props} />);
    expect(screen.queryByRole('button', { name: 'Approve review' })).toBeNull();
    rerender(<DocumentReviewPanel {...props} currentUserId="reviewer" />);
    expect(screen.getByRole('button', { name: 'Approve review' })).toBeTruthy();
    rerender(<DocumentReviewPanel {...props} currentUserId="reviewer" requests={[{ ...request, state: 'approved' }]} />);
    expect(screen.queryByRole('button', { name: 'Approve review' })).toBeNull();
  });
  it('submits authoritative reviewer IDs, note and required choice', async () => {
    const submit = vi.fn().mockResolvedValue(undefined);
    render(<DocumentReviewPanel requests={[]} currentUserId="owner" onRefresh={vi.fn()} onRequest={submit} reviewers={[{ id: 'reviewer', displayName: 'Actual Reviewer' }]} />);
    expect(screen.getByRole('button', { name: 'Request review' }).hasAttribute('disabled')).toBe(true);
    fireEvent.change(screen.getByLabelText('Reviewer'), { target: { value: 'reviewer' } });
    fireEvent.change(screen.getByLabelText('Review request note'), { target: { value: ' Check the evidence ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Request review' }));
    await waitFor(() => expect(submit).toHaveBeenCalledWith({ reviewerId: 'reviewer', note: 'Check the evidence', required: true }));
  });
  it('prevents concurrent decisions and preserves the comment when a write fails', async () => {
    let fail!: (reason: Error) => void;
    const decide = vi.fn(() => new Promise<void>((_resolve, reject) => { fail = reject; }));
    render(<DocumentReviewPanel requests={[request]} currentUserId="reviewer" onRefresh={vi.fn()} onDecide={decide} />);
    fireEvent.change(screen.getByLabelText('Review comment for Actual Reviewer'), { target: { value: 'Needs evidence' } });
    fireEvent.click(screen.getByRole('button', { name: 'Request changes' }));
    fireEvent.click(screen.getByRole('button', { name: 'Approve review' }));
    expect(decide).toHaveBeenCalledTimes(1);
    expect(decide).toHaveBeenCalledWith('request-1', 'changes_requested', 'Needs evidence');
    fail(new Error('Review was withdrawn'));
    await screen.findByText('Review was withdrawn');
    expect((screen.getByLabelText('Review comment for Actual Reviewer') as HTMLTextAreaElement).value).toBe('Needs evidence');
  });
  it('hides request creation and withdrawal without supplied authority callbacks', () => {
    render(<DocumentReviewPanel requests={[request]} currentUserId="owner" onRefresh={vi.fn()} />);
    expect(screen.queryByLabelText('Reviewer')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Withdraw review' })).toBeNull();
  });
});
