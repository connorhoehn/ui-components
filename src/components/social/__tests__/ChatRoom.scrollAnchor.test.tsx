// Two bugs on the same screen, both about mistaking one event for another.
//
// 1. The auto-scroll effect was keyed on `posts.length`. `usePosts` returns
//    newest-first and `loadMore` APPENDS older messages, so pressing "Load
//    earlier" grew the array and yanked the viewport straight back to the
//    newest message — the history you had just asked for scrolled past before
//    you could read a line of it, and the button looked like it did nothing.
//    Keyed on the newest post's id instead, only a genuinely new message
//    scrolls.
//
// 2. The full-pane "Couldn't load messages" state was keyed on `error`, which
//    `usePosts` also sets from a failed `createPost`. A refused FIRST message
//    in an empty room therefore blamed the read: the pane claimed the history
//    had failed to load while the banner underneath reported the real reason.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { UsePostsReturn, PostItem } from '../../../hooks/usePosts';

const usePostsMock = vi.fn<() => UsePostsReturn>();
vi.mock('../../../hooks/usePosts', () => ({ usePosts: () => usePostsMock() }));

import { ChatRoom } from '../ChatRoom';

function tokenFor(sub: string): string {
  return `h.${btoa(JSON.stringify({ sub }))}.s`;
}

function post(over: Partial<PostItem> = {}): PostItem {
  return {
    roomId: 'r1',
    postId: 'p1',
    authorId: 'bob',
    content: 'hi there',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...over,
  } as PostItem;
}

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

function renderRoom(hook: UsePostsReturn) {
  usePostsMock.mockReturnValue(hook);
  const utils = render(
    <ChatRoom idToken={tokenFor('alice')} roomId="r1" roomName="general" onMessage={() => () => {}} />,
  );
  return {
    ...utils,
    // Re-render with a new hook return, as a state change in `usePosts` would.
    update(next: UsePostsReturn) {
      usePostsMock.mockReturnValue(next);
      utils.rerender(
        <ChatRoom idToken={tokenFor('alice')} roomId="r1" roomName="general" onMessage={() => () => {}} />,
      );
    },
  };
}

let scrollSpy: ReturnType<typeof vi.fn<(arg?: boolean | ScrollIntoViewOptions) => void>>;

beforeEach(() => {
  usePostsMock.mockReset();
  // jsdom has no layout engine and no scrollIntoView.
  scrollSpy = vi.fn<(arg?: boolean | ScrollIntoViewOptions) => void>();
  Element.prototype.scrollIntoView = scrollSpy;
});

describe('ChatRoom scroll anchoring', () => {
  it('does not jump to the newest message when older history is loaded', () => {
    // newest-first, as `usePosts` returns it
    const newest = post({ postId: 'p3', content: 'newest', createdAt: '2026-01-03T00:00:00.000Z' });
    const view = renderRoom(makePosts({ posts: [newest], hasMore: true }));

    // Deltas, not absolute counts — StrictMode runs the mount effect twice.
    const before = scrollSpy.mock.calls.length;

    // "Load earlier" appends OLDER posts to the tail. `posts[0]` is unchanged.
    view.update(makePosts({
      posts: [newest, post({ postId: 'p2', content: 'older', createdAt: '2026-01-02T00:00:00.000Z' })],
      hasMore: true,
    }));

    expect(screen.getByText('older')).toBeInTheDocument();
    expect(scrollSpy.mock.calls.length).toBe(before);
  });

  it('still jumps to the bottom when a genuinely new message arrives', () => {
    const first = post({ postId: 'p1', content: 'first' });
    const view = renderRoom(makePosts({ posts: [first] }));
    const before = scrollSpy.mock.calls.length;

    // A new message PREPENDS — `posts[0]` changes.
    view.update(makePosts({
      posts: [post({ postId: 'p2', content: 'brand new', createdAt: '2026-01-04T00:00:00.000Z' }), first],
    }));

    expect(scrollSpy.mock.calls.length).toBeGreaterThan(before);
  });
});

describe('ChatRoom — a refused send is not a failed load', () => {
  it('keeps the empty state when the first message is rejected', async () => {
    // `usePosts` sets `error` (not `loadError`) when createPost is refused.
    const view = renderRoom(makePosts({
      createPost: vi.fn().mockRejectedValue(new Error('offline')),
    }));

    fireEvent.change(screen.getByPlaceholderText(/Message #general/), { target: { value: 'hello' } });
    fireEvent.click(screen.getByRole('button', { name: '↑' }));

    view.update(makePosts({ posts: [], error: 'Failed to create post (500)', loadError: null }));

    await waitFor(() => {
      expect(screen.getByText('No messages yet')).toBeInTheDocument();
    });
    expect(screen.queryByText(/Couldn’t load messages/)).toBeNull();
    // ...and the failure is still reported, in the banner that owns writes.
    expect(screen.getByText(/Failed to create post \(500\)|offline/)).toBeInTheDocument();
  });

  it('still shows the load-failure pane when the history load itself failed', () => {
    renderRoom(makePosts({ error: 'Failed to load posts (503)', loadError: 'Failed to load posts (503)' }));

    expect(screen.getByText(/Couldn’t load messages/)).toBeInTheDocument();
    expect(screen.queryByText('No messages yet')).toBeNull();
  });
});
