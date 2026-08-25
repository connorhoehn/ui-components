// `ReplyForm` fired `void onSubmit(...)` and cleared its input on the next
// line, and `useComments.createComment` resolved on failure. So a rejected
// comment emptied the box exactly like an accepted one did, no comment
// appeared, and — because `error` was only rendered in the empty-thread branch
// — a thread that already had comments showed nothing at all. The user's text
// was unrecoverable.

import { render, screen, fireEvent, within } from '@testing-library/react';
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
    submitting: false,
    error: null,
    ...over,
  };
}

function renderThread(hook: UseCommentsReturn) {
  useCommentsMock.mockReturnValue(hook);
  render(
    <CommentThread
      idToken={tokenFor('alice')}
      roomId="r1"
      postId="p1"
      onMessage={() => () => {}}
    />,
  );
  return hook;
}

function composer() {
  return screen.getByPlaceholderText('Write a comment…');
}

beforeEach(() => useCommentsMock.mockReset());

describe('CommentThread — failed comment', () => {
  it('keeps the typed text in the box and says why', async () => {
    renderThread(makeHook({
      comments: [makeComment()],
      createComment: vi.fn().mockRejectedValue(new Error('Comment rejected (429)')),
    }));

    fireEvent.change(composer(), { target: { value: 'my reply' } });
    fireEvent.click(screen.getAllByRole('button', { name: 'Comment' }).at(-1)!);

    const alert = await screen.findByTestId('comment-submit-error');
    expect(alert).toHaveTextContent(/429/);
    expect((composer() as HTMLInputElement).value).toBe('my reply');
  });

  it('clears the box on a comment the server accepted', async () => {
    const hook = renderThread(makeHook({ comments: [makeComment()] }));

    fireEvent.change(composer(), { target: { value: 'my reply' } });
    fireEvent.click(screen.getAllByRole('button', { name: 'Comment' }).at(-1)!);

    await vi.waitFor(() => expect((composer() as HTMLInputElement).value).toBe(''));
    expect(hook.createComment).toHaveBeenCalledWith('my reply');
    expect(screen.queryByTestId('comment-submit-error')).toBeNull();
  });

  it('keeps the reply form open when a threaded reply is rejected', async () => {
    renderThread(makeHook({
      comments: [makeComment()],
      createComment: vi.fn().mockRejectedValue(new Error('Comment rejected (429)')),
    }));

    fireEvent.click(screen.getByRole('button', { name: 'Reply' }));
    const replyBox = screen.getByPlaceholderText('Write a reply…');
    fireEvent.change(replyBox, { target: { value: 'nested' } });
    fireEvent.click(screen.getAllByRole('button', { name: 'Comment' })[0]);

    expect(await screen.findByTestId('comment-submit-error')).toHaveTextContent(/429/);
    expect((screen.getByPlaceholderText('Write a reply…') as HTMLInputElement).value).toBe('nested');
  });
});

describe('CommentThread — errors on a non-empty thread', () => {
  it('renders a failed delete instead of leaving it invisible', () => {
    renderThread(makeHook({
      comments: [makeComment()],
      error: 'Failed to delete comment (403)',
    }));

    expect(screen.getByTestId('comment-thread-error')).toHaveTextContent(/403/);
    // The comment is still there, which is honest — but now it is explained.
    expect(screen.getByText('first!')).toBeInTheDocument();
  });

  it('keeps the confirmation open when the delete is rejected', async () => {
    renderThread(makeHook({
      comments: [makeComment()],
      deleteComment: vi.fn().mockRejectedValue(new Error('nope')),
    }));

    fireEvent.click(screen.getByRole('button', { name: 'Delete comment' }));
    const confirm = screen.getByRole('group', { name: 'Confirm delete comment' });
    fireEvent.click(within(confirm).getByRole('button', { name: 'Delete' }));

    await vi.waitFor(() =>
      expect(screen.getByRole('group', { name: 'Confirm delete comment' })).toBeInTheDocument(),
    );
  });
});
