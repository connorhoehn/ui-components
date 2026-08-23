// CommentThread's contract with its host is entirely in the argument list of
// `createComment`: a top-level comment must arrive with ONE argument, a reply
// with (content, parentCommentId). Get that wrong and replies silently become
// top-level comments — the UI still looks fine, the thread structure is gone.
// The delete confirmation is the other thing worth pinning: it is hand-rolled
// state, not a <ConfirmDialog>, so nothing else enforces the two-step.

import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { UseCommentsReturn, CommentItem } from '../../../hooks/useComments';

const useCommentsMock = vi.fn<() => UseCommentsReturn>();
vi.mock('../../../hooks/useComments', () => ({ useComments: () => useCommentsMock() }));

import { CommentThread } from '../CommentThread';

function tokenFor(sub: string): string {
  return `h.${btoa(JSON.stringify({ sub }))}.s`;
}

function makeComment(over: Partial<CommentItem> = {}): CommentItem {
  return {
    commentId: 'c1',
    postId: 'p1',
    roomId: 'r1',
    authorId: 'alice',
    content: 'first!',
    createdAt: new Date().toISOString(),
    ...over,
  } as CommentItem;
}

function makeHook(over: Partial<UseCommentsReturn> = {}): UseCommentsReturn {
  return {
    comments: [],
    createComment: vi.fn().mockResolvedValue(undefined),
    deleteComment: vi.fn().mockResolvedValue(undefined),
    loading: false,
    error: null,
    ...over,
  };
}

function renderThread(hook: UseCommentsReturn, idToken: string | null = tokenFor('alice')) {
  useCommentsMock.mockReturnValue(hook);
  render(<CommentThread idToken={idToken} roomId="r1" postId="p1" onMessage={() => () => {}} />);
  return hook;
}

beforeEach(() => useCommentsMock.mockReset());

describe('CommentThread states', () => {
  it('shows the loading line instead of the empty state while fetching', () => {
    renderThread(makeHook({ loading: true }));
    expect(screen.getByText('Loading comments…')).toBeInTheDocument();
    expect(screen.queryByText('No comments yet')).toBeNull();
  });

  it('keeps the composer mounted in every state, including empty', () => {
    renderThread(makeHook());
    expect(screen.getByText('No comments yet')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write a comment…')).toBeInTheDocument();
  });
});

describe('CommentThread submission payloads', () => {
  it('a top-level comment is created with no parent id', async () => {
    const hook = renderThread(makeHook());
    fireEvent.change(screen.getByPlaceholderText('Write a comment…'), { target: { value: '  hi  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Comment' }));
    await waitFor(() => expect(hook.createComment).toHaveBeenCalledWith('hi'));
    expect((hook.createComment as ReturnType<typeof vi.fn>).mock.calls[0]).toHaveLength(1);
  });

  it('a reply carries the parent comment id as the second argument', async () => {
    const hook = renderThread(makeHook({ comments: [makeComment({ commentId: 'c-99' })] }));
    fireEvent.click(screen.getByRole('button', { name: 'Reply' }));
    fireEvent.change(screen.getByPlaceholderText('Write a reply…'), { target: { value: 'me too' } });
    fireEvent.click(screen.getAllByRole('button', { name: 'Comment' })[0]);
    await waitFor(() => expect(hook.createComment).toHaveBeenCalledWith('me too', 'c-99'));
  });

  it('the reply form closes itself once the reply resolves', async () => {
    renderThread(makeHook({ comments: [makeComment()] }));
    fireEvent.click(screen.getByRole('button', { name: 'Reply' }));
    fireEvent.change(screen.getByPlaceholderText('Write a reply…'), { target: { value: 'x' } });
    fireEvent.click(screen.getAllByRole('button', { name: 'Comment' })[0]);
    await waitFor(() => expect(screen.queryByPlaceholderText('Write a reply…')).toBeNull());
  });

  it('an empty composer cannot submit', () => {
    const hook = renderThread(makeHook());
    const submit = screen.getByRole('button', { name: 'Comment' });
    expect(submit).toBeDisabled();
    fireEvent.click(submit);
    expect(hook.createComment).not.toHaveBeenCalled();
  });
});

describe('CommentThread ownership and deletion', () => {
  it('only the author sees a Delete control', () => {
    renderThread(makeHook({ comments: [makeComment({ authorId: 'bob' })] }), tokenFor('alice'));
    expect(screen.queryByRole('button', { name: 'Delete comment' })).toBeNull();
  });

  it('the first Delete click arms a confirmation and deletes nothing', () => {
    const hook = renderThread(makeHook({ comments: [makeComment({ authorId: 'alice' })] }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete comment' }));
    expect(hook.deleteComment).not.toHaveBeenCalled();
    expect(screen.getByRole('group', { name: 'Confirm delete comment' })).toBeInTheDocument();
  });

  it('confirming deletes that commentId and cancelling deletes nothing', () => {
    const hook = renderThread(makeHook({ comments: [makeComment({ commentId: 'c-5', authorId: 'alice' })] }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete comment' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(hook.deleteComment).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Delete comment' }));
    const group = screen.getByRole('group', { name: 'Confirm delete comment' });
    fireEvent.click(within(group).getByRole('button', { name: 'Delete' }));
    expect(hook.deleteComment).toHaveBeenCalledWith('c-5');
  });
});
