// The feed's "Couldn't load posts" pane was keyed on `usePosts.error`, which
// is also set by `createPost`. So a user's FIRST post in an empty room, if it
// was refused, replaced the "No posts yet / Be the first to post in this room"
// empty state with a claim that the room had failed to load — while the
// composer directly above it was already showing the real reason. Two
// different accounts of one event, one of them wrong.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { UsePostsReturn } from '../../../hooks/usePosts';

const usePostsMock = vi.fn<() => UsePostsReturn>();
vi.mock('../../../hooks/usePosts', () => ({ usePosts: () => usePostsMock() }));
vi.mock('../../../hooks/useLikes', () => ({
  useLikes: () => ({
    isLiked: false, likeCount: 0, whoLiked: [],
    toggle: vi.fn(), reactWithEmoji: vi.fn(), loading: false, error: null,
  }),
}));

import { PostFeed } from '../PostFeed';

function makePosts(over: Partial<UsePostsReturn> = {}): UsePostsReturn {
  return {
    posts: [],
    createPost: vi.fn().mockResolvedValue(undefined),
    editPost: vi.fn().mockResolvedValue(undefined),
    deletePost: vi.fn().mockResolvedValue(undefined),
    getUserPosts: vi.fn().mockResolvedValue([]),
    loading: false,
    mutating: false,
    error: null,
    loadError: null,
    hasMore: false,
    loadMore: vi.fn().mockResolvedValue(undefined),
    ...over,
  };
}

function renderFeed(hook: UsePostsReturn) {
  usePostsMock.mockReturnValue(hook);
  render(<PostFeed idToken="tok" roomId="r1" onMessage={() => () => {}} />);
}

beforeEach(() => usePostsMock.mockReset());

describe('PostFeed — a refused post is not a failed load', () => {
  it('keeps the empty state when a create fails in an empty room', () => {
    renderFeed(makePosts({ posts: [], error: 'Failed to create post (500)', loadError: null }));

    expect(screen.getByText('No posts yet')).toBeInTheDocument();
    expect(screen.queryByText(/Couldn’t load posts/)).toBeNull();
  });

  it('still reports the create failure — on the composer, which owns the write', async () => {
    // `createPost` rethrows, so `CreatePostForm` reports it inline. Nothing is
    // swallowed; the failure is just attributed to the write, not the read.
    renderFeed(makePosts({
      posts: [],
      createPost: vi.fn().mockRejectedValue(new Error('Failed to create post (500)')),
    }));

    fireEvent.change(screen.getByPlaceholderText(/What's on your mind/), {
      target: { value: 'hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Post' }));

    expect(await screen.findByText('Failed to create post (500)')).toBeInTheDocument();
    expect(screen.getByText('No posts yet')).toBeInTheDocument();
  });

  it('shows the load-failure pane when the load itself failed', () => {
    renderFeed(makePosts({
      posts: [],
      error: 'Failed to load posts (503)',
      loadError: 'Failed to load posts (503)',
    }));

    expect(screen.getByText(/Couldn’t load posts/)).toBeInTheDocument();
    expect(screen.queryByText('No posts yet')).toBeNull();
  });
});
