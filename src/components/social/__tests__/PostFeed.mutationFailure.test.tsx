// Three silent failure paths in the feed:
//
//  1. Edit save. `void onEdit(...); setEditMode(false)` dismissed the editor
//     synchronously, before the request had even been sent, and `editPost`
//     resolved on failure. So a rejected save repainted the card with the OLD
//     server text and said nothing — the revision was discarded silently.
//  2. `usePosts.error` was only rendered in the `posts.length === 0` branch,
//     so a failed "Load more" flipped the button back with nothing added and
//     nothing said, which reads as "that was the last page".
//  3. `useLikes.error` was not destructured at all, so a rejected like rolled
//     the optimistic count back with no explanation.

import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { UsePostsReturn, PostItem } from '../../../hooks/usePosts';
import type { UseLikesReturn } from '../../../hooks/useLikes';
import type { UseCommentsReturn } from '../../../hooks/useComments';

const usePostsMock = vi.fn<() => UsePostsReturn>();
const useLikesMock = vi.fn<() => UseLikesReturn>();
const useCommentsMock = vi.fn<() => UseCommentsReturn>();

vi.mock('../../../hooks/usePosts', () => ({ usePosts: () => usePostsMock() }));
vi.mock('../../../hooks/useLikes', () => ({ useLikes: () => useLikesMock() }));
vi.mock('../../../hooks/useComments', () => ({ useComments: () => useCommentsMock() }));

import { PostFeed } from '../PostFeed';

function tokenFor(sub: string): string {
  return `h.${btoa(JSON.stringify({ sub }))}.s`;
}

function makePost(over: Partial<PostItem> = {}): PostItem {
  return {
    postId: 'p1',
    roomId: 'r1',
    authorId: 'alice',
    content: 'original text',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...over,
  } as PostItem;
}

function makePosts(over: Partial<UsePostsReturn> = {}): UsePostsReturn {
  return {
    posts: [makePost()],
    createPost: vi.fn().mockResolvedValue(undefined),
    editPost: vi.fn().mockResolvedValue(undefined),
    deletePost: vi.fn().mockResolvedValue(undefined),
    getUserPosts: vi.fn().mockResolvedValue([]),
    loading: false,
    mutating: false,
    error: null,
    hasMore: false,
    loadMore: vi.fn().mockResolvedValue(undefined),
    ...over,
  };
}

function makeLikes(over: Partial<UseLikesReturn> = {}): UseLikesReturn {
  return {
    isLiked: false,
    likeCount: 0,
    whoLiked: [],
    toggle: vi.fn().mockResolvedValue(undefined),
    reactWithEmoji: vi.fn().mockResolvedValue(undefined),
    loading: false,
    error: null,
    ...over,
  };
}

function renderFeed(hook: UsePostsReturn) {
  usePostsMock.mockReturnValue(hook);
  render(<PostFeed idToken={tokenFor('alice')} roomId="r1" onMessage={() => () => {}} />);
  return hook;
}

beforeEach(() => {
  usePostsMock.mockReset();
  useLikesMock.mockReset();
  useCommentsMock.mockReset();
  useLikesMock.mockReturnValue(makeLikes());
  useCommentsMock.mockReturnValue({
    comments: [],
    createComment: vi.fn().mockResolvedValue(undefined),
    deleteComment: vi.fn().mockResolvedValue(undefined),
    loading: false,
    submitting: false,
    error: null,
  });
});

describe('PostFeed — failed edit', () => {
  it('keeps the editor open with the typed revision and reports the failure', async () => {
    renderFeed(makePosts({ editPost: vi.fn().mockRejectedValue(new Error('Edit rejected (409)')) }));

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    const box = screen.getByDisplayValue('original text');
    fireEvent.change(box, { target: { value: 'my revision' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(await screen.findByTestId('post-action-error')).toHaveTextContent(/409/);
    // Still editing, and the revision is still recoverable from the box.
    expect((screen.getByDisplayValue('my revision') as HTMLTextAreaElement).value).toBe('my revision');
  });

  it('closes the editor on an accepted edit', async () => {
    const hook = renderFeed(makePosts());

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByDisplayValue('original text'), { target: { value: 'my revision' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(await screen.findByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(hook.editPost).toHaveBeenCalledWith('p1', 'my revision');
    expect(screen.queryByTestId('post-action-error')).toBeNull();
  });
});

describe('PostFeed — failed delete', () => {
  it('reports the failure rather than quietly dismissing the confirmation', async () => {
    renderFeed(makePosts({ deletePost: vi.fn().mockRejectedValue(new Error('Delete rejected (403)')) }));

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    const confirm = screen.getByRole('group', { name: 'Confirm delete post' });
    fireEvent.click(within(confirm).getByRole('button', { name: 'Delete' }));

    expect(await screen.findByTestId('post-action-error')).toHaveTextContent(/403/);
  });
});

describe('PostFeed — errors with posts already on screen', () => {
  it('shows a paging failure instead of silently looking like the last page', () => {
    renderFeed(makePosts({ hasMore: true, error: 'Failed to load more posts (500)' }));

    expect(screen.getByTestId('post-feed-error')).toHaveTextContent(/500/);
    // ...without blowing away what the user is already reading.
    expect(screen.getByText('original text')).toBeInTheDocument();
  });

  it('surfaces a failed like instead of an unexplained count flicker', () => {
    useLikesMock.mockReturnValue(makeLikes({ error: 'Failed to toggle like (503)' }));
    renderFeed(makePosts());

    expect(screen.getByTestId('post-action-error')).toHaveTextContent(/503/);
  });
});
