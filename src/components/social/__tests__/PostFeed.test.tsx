// PostFeed owns three things a host can't see from the outside: the
// loading/empty/loaded state machine, the two-step delete confirmation, and
// the "is this my post?" check that decides whether Edit/Delete render at all.
// That last one is derived by base64-decoding the JWT payload — if it ever
// silently returns null, every post looks like someone else's and the owner
// loses their controls with no error anywhere.

import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
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

/** A structurally valid id token whose payload decodes to `{ sub }`. */
function tokenFor(sub: string): string {
  return `h.${btoa(JSON.stringify({ sub }))}.s`;
}

function makePost(over: Partial<PostItem> = {}): PostItem {
  return {
    postId: 'p1',
    roomId: 'r1',
    authorId: 'alice',
    content: 'hello world',
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
    loadError: null,
    hasMore: false,
    loadMore: vi.fn().mockResolvedValue(undefined),
    ...over,
  };
}

const NOOP_ON_MESSAGE = () => () => {};

function renderFeed(hook: UsePostsReturn, idToken: string | null = tokenFor('alice')) {
  usePostsMock.mockReturnValue(hook);
  render(<PostFeed idToken={idToken} roomId="r1" onMessage={NOOP_ON_MESSAGE} />);
  return hook;
}

beforeEach(() => {
  usePostsMock.mockReset();
  useLikesMock.mockReset();
  useCommentsMock.mockReset();
  useLikesMock.mockReturnValue({
    isLiked: false,
    likeCount: 0,
    whoLiked: [],
    toggle: vi.fn().mockResolvedValue(undefined),
    reactWithEmoji: vi.fn().mockResolvedValue(undefined),
    loading: false,
    error: null,
  });
  useCommentsMock.mockReturnValue({
    comments: [],
    createComment: vi.fn().mockResolvedValue(undefined),
    deleteComment: vi.fn().mockResolvedValue(undefined),
    loading: false,
    submitting: false,
    error: null,
  });
});

// The composer's busy guard used to read `loading`, which usePosts sets only
// for the initial fetch and loadMore. The mutation flag existed but was held
// in an unread `_mutating` state and never returned, so the Post button stayed
// enabled and labelled "Post" for the whole POST and a second click created a
// duplicate post.
describe('PostFeed composer busy state', () => {
  it('disables the Post button while a create is in flight', () => {
    renderFeed(makePosts({ posts: [makePost()], mutating: true }));
    const button = screen.getByRole('button', { name: 'Posting…' });
    expect(button).toBeDisabled();
  });

  it('leaves the Post button live when nothing is in flight', () => {
    renderFeed(makePosts({ posts: [makePost()], mutating: false }));
    const textarea = screen.getByPlaceholderText("What's on your mind?");
    fireEvent.change(textarea, { target: { value: 'hello' } });
    expect(screen.getByRole('button', { name: 'Post' })).toBeEnabled();
  });
});

describe('PostFeed state machine', () => {
  it('shows the spinner only while loading with nothing cached', () => {
    renderFeed(makePosts({ loading: true }));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('No posts yet')).toBeNull();
  });

  it('prefers cached posts over the spinner when a refresh is in flight', () => {
    renderFeed(makePosts({ loading: true, posts: [makePost({ content: 'cached' })] }));
    expect(screen.queryByText('Loading...')).toBeNull();
    expect(screen.getByText('cached')).toBeInTheDocument();
  });

  it('falls back to the empty state when the feed resolves to zero posts', () => {
    renderFeed(makePosts());
    expect(screen.getByText('No posts yet')).toBeInTheDocument();
  });

  it('renders the Load more control only when the hook reports more pages', () => {
    renderFeed(makePosts({ posts: [makePost()], hasMore: false }));
    expect(screen.queryByRole('button', { name: 'Load more' })).toBeNull();
  });

  it('Load more delegates to the hook rather than refetching itself', () => {
    const hook = renderFeed(makePosts({ posts: [makePost()], hasMore: true }));
    fireEvent.click(screen.getByRole('button', { name: 'Load more' }));
    expect(hook.loadMore).toHaveBeenCalledTimes(1);
  });
});

describe('PostFeed compose form', () => {
  it('refuses to submit whitespace-only content', () => {
    const hook = renderFeed(makePosts());
    const box = screen.getByPlaceholderText("What's on your mind?");
    fireEvent.change(box, { target: { value: '   ' } });
    expect(screen.getByRole('button', { name: 'Post' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Post' }));
    expect(hook.createPost).not.toHaveBeenCalled();
  });

  it('trims the content it hands to createPost and clears the box on success', async () => {
    const hook = renderFeed(makePosts());
    const box = screen.getByPlaceholderText("What's on your mind?");
    fireEvent.change(box, { target: { value: '  spaced out  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Post' }));
    await waitFor(() => expect(hook.createPost).toHaveBeenCalledWith('spaced out'));
    await waitFor(() => expect(box).toHaveValue(''));
  });

  it('surfaces a rejected createPost as inline text and keeps the draft', async () => {
    const hook = renderFeed(makePosts({ createPost: vi.fn().mockRejectedValue(new Error('rate limited')) }));
    const box = screen.getByPlaceholderText("What's on your mind?");
    fireEvent.change(box, { target: { value: 'draft' } });
    fireEvent.click(screen.getByRole('button', { name: 'Post' }));
    await waitFor(() => expect(screen.getByText('rate limited')).toBeInTheDocument());
    expect(box).toHaveValue('draft');
    expect(hook.createPost).toHaveBeenCalledTimes(1);
  });
});

describe('PostFeed ownership controls', () => {
  it('offers Edit/Delete on posts authored by the decoded token subject', () => {
    renderFeed(makePosts({ posts: [makePost({ authorId: 'alice' })] }), tokenFor('alice'));
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('hides Edit/Delete on someone else’s post', () => {
    renderFeed(makePosts({ posts: [makePost({ authorId: 'bob' })] }), tokenFor('alice'));
    expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Delete' })).toBeNull();
  });

  it('hides Edit/Delete entirely when there is no token', () => {
    renderFeed(makePosts({ posts: [makePost({ authorId: 'alice' })] }), null);
    expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull();
  });

  it('treats an unparseable token as "not the author" instead of throwing', () => {
    renderFeed(makePosts({ posts: [makePost({ authorId: 'alice' })] }), 'not-a-jwt');
    expect(screen.getByText('hello world')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull();
  });
});

describe('PostFeed destructive actions', () => {
  it('the first Delete click only arms the confirmation — nothing is deleted', () => {
    const hook = renderFeed(makePosts({ posts: [makePost({ authorId: 'alice' })] }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(hook.deletePost).not.toHaveBeenCalled();
    expect(screen.getByRole('group', { name: 'Confirm delete post' })).toBeInTheDocument();
  });

  it('confirming deletes exactly that postId', () => {
    const hook = renderFeed(makePosts({ posts: [makePost({ postId: 'p-42', authorId: 'alice' })] }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    const group = screen.getByRole('group', { name: 'Confirm delete post' });
    fireEvent.click(within(group).getByRole('button', { name: 'Delete' }));
    expect(hook.deletePost).toHaveBeenCalledWith('p-42');
  });

  it('cancelling disarms the confirmation without calling deletePost', () => {
    const hook = renderFeed(makePosts({ posts: [makePost({ authorId: 'alice' })] }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(hook.deletePost).not.toHaveBeenCalled();
    expect(screen.queryByRole('group', { name: 'Confirm delete post' })).toBeNull();
  });

  it('saving an edit hands back (postId, newContent)', () => {
    const hook = renderFeed(makePosts({ posts: [makePost({ postId: 'p-7', authorId: 'alice', content: 'original' })] }));
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByDisplayValue('original'), { target: { value: 'revised' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(hook.editPost).toHaveBeenCalledWith('p-7', 'revised');
  });

  it('Discard Changes restores the stored content and saves nothing', () => {
    const hook = renderFeed(makePosts({ posts: [makePost({ authorId: 'alice', content: 'original' })] }));
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByDisplayValue('original'), { target: { value: 'scrapped' } });
    fireEvent.click(screen.getByRole('button', { name: 'Discard Changes' }));
    expect(hook.editPost).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.getByDisplayValue('original')).toBeInTheDocument();
  });

  it('an emptied edit box cannot be saved', () => {
    const hook = renderFeed(makePosts({ posts: [makePost({ authorId: 'alice', content: 'original' })] }));
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.change(screen.getByDisplayValue('original'), { target: { value: '  ' } });
    const save = screen.getByRole('button', { name: 'Save' });
    expect(save).toBeDisabled();
    fireEvent.click(save);
    expect(hook.editPost).not.toHaveBeenCalled();
  });
});

describe('PostFeed failure vs emptiness', () => {
  it('shows the load error instead of the "be the first to post" empty state', () => {
    // `loadError`, not `error` — see the sibling case below: `error` is also
    // set by a failed createPost, and a refused post must not make the feed
    // claim the room failed to load.
    renderFeed(makePosts({ posts: [], error: 'Failed to load posts (503)', loadError: 'Failed to load posts (503)' }));

    // A room whose posts API is down used to be indistinguishable from a
    // room nobody has posted in — so nobody knew there was anything to retry.
    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load posts (503)');
    expect(screen.queryByText('No posts yet')).toBeNull();
  });

  it('still shows the empty state when the room is genuinely empty', () => {
    renderFeed(makePosts({ posts: [], error: null }));
    expect(screen.getByText('No posts yet')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('keeps cached posts visible when a later request fails', () => {
    renderFeed(makePosts({ posts: [makePost({ content: 'cached' })], error: 'Failed to edit post (500)' }));
    expect(screen.getByText('cached')).toBeInTheDocument();
  });

  it('disables the Post button while a post is being written', () => {
    renderFeed(makePosts({ mutating: true }));
    // `loading` is false during a mutation, so this button used to stay live
    // and a double-click created the post twice.
    expect(screen.getByRole('button', { name: /Post/ })).toBeDisabled();
  });
});

describe('PostFeed comment disclosure', () => {
  it('mounts the comment thread only after Comment is toggled on', () => {
    renderFeed(makePosts({ posts: [makePost()] }));
    // The disclosure toggle is the only "Comment" button before the thread
    // opens; once open, the thread's own submit button shares the label.
    const toggle = screen.getByRole('button', { name: 'Comment' });
    expect(screen.queryByPlaceholderText('Write a comment…')).toBeNull();
    fireEvent.click(toggle);
    expect(screen.getByPlaceholderText('Write a comment…')).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(screen.queryByPlaceholderText('Write a comment…')).toBeNull();
  });
});
