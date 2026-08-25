// ChatRoom had no test file. The gap that mattered: its four-way body
// (loading / empty / list) had no error branch, so a failed history load
// rendered "No messages yet — Be the first to say something!" over the top of
// an outage. A room full of history looked deleted.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { UsePostsReturn, PostItem } from '../../../hooks/usePosts';

const usePostsMock = vi.fn<() => UsePostsReturn>();
vi.mock('../../../hooks/usePosts', () => ({ usePosts: () => usePostsMock() }));

import { ChatRoom } from '../ChatRoom';

function tokenFor(sub: string): string {
  return `h.${btoa(JSON.stringify({ sub }))}.s`;
}

function makePost(over: Partial<PostItem> = {}): PostItem {
  return {
    postId: 'p1',
    roomId: 'r1',
    authorId: 'bob',
    content: 'hi there',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    hasMore: false,
    loadMore: vi.fn().mockResolvedValue(undefined),
    ...over,
  };
}

function renderRoom(hook: UsePostsReturn) {
  usePostsMock.mockReturnValue(hook);
  render(
    <ChatRoom
      idToken={tokenFor('alice')}
      roomId="r1"
      roomName="general"
      onMessage={() => () => {}}
    />,
  );
  return hook;
}

beforeEach(() => {
  usePostsMock.mockReset();
  // jsdom has no layout engine and no scrollIntoView.
  Element.prototype.scrollIntoView = vi.fn();
});

describe('ChatRoom body states', () => {
  it('does not claim the room is empty when the history load failed', () => {
    renderRoom(makePosts({ error: 'Failed to load posts (503)' }));

    expect(screen.queryByText('No messages yet')).toBeNull();
    expect(screen.queryByText('Be the first to say something!')).toBeNull();
    expect(screen.getByText(/Couldn’t load messages/)).toBeInTheDocument();
    expect(screen.getAllByText(/503/).length).toBeGreaterThan(0);
  });

  it('still shows the empty state for a room that genuinely has no messages', () => {
    renderRoom(makePosts());

    expect(screen.getByText('No messages yet')).toBeInTheDocument();
  });

  it('shows the spinner line, not the error, while the first page is in flight', () => {
    renderRoom(makePosts({ loading: true }));

    expect(screen.getByText('Loading messages…')).toBeInTheDocument();
    expect(screen.queryByText('No messages yet')).toBeNull();
  });

  it('keeps rendering messages when a later request errors', () => {
    renderRoom(makePosts({ posts: [makePost()], error: 'Failed to load more posts (500)' }));

    expect(screen.getByText('hi there')).toBeInTheDocument();
    expect(screen.queryByText(/Couldn’t load messages/)).toBeNull();
  });
});

describe('ChatRoom send', () => {
  it('restores the typed message when the send is rejected', async () => {
    renderRoom(makePosts({ createPost: vi.fn().mockRejectedValue(new Error('offline')) }));

    const box = screen.getByPlaceholderText('Message #general…');
    fireEvent.change(box, { target: { value: 'important thing' } });
    fireEvent.keyDown(box, { key: 'Enter' });

    await vi.waitFor(() =>
      expect((screen.getByPlaceholderText('Message #general…') as HTMLInputElement).value)
        .toBe('important thing'),
    );
    expect(screen.getByText('offline')).toBeInTheDocument();
  });
});
