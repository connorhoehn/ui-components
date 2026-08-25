// frontend/src/components/PostFeed.tsx
//
// Post feed section card for a room — all sub-components co-located as unexported internals.
// Only PostFeed is exported.

import { useState, useEffect } from 'react';
import { usePosts } from '../../hooks/usePosts';
import { useLikes } from '../../hooks/useLikes';
import type { PostItem } from '../../hooks/usePosts';
import type { GatewayMessage } from '../../types/gateway';
import { CommentThread } from './CommentThread';
import { cn } from '../../lib/cn';
import { Textarea } from '../forms/Textarea';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;

interface PostFeedProps {
  idToken: string | null;
  /**
   * Room whose posts are shown. Changing this resets the feed: the previous
   * room's posts and paging cursor are dropped and its in-flight request is
   * ignored, so a caller does NOT need `key={roomId}` to avoid a wrong-room
   * render. (It used to: the slower of two overlapping requests won, so
   * switching rooms could repaint the new room with the old room's posts.)
   */
  roomId: string | null;
  onMessage: OnMessageFn;
}

// ---------------------------------------------------------------------------
// Constants — same EMOJIS array as ReactionButtons.tsx
// ---------------------------------------------------------------------------

const EMOJIS = ['❤️', '😂', '👍', '👎', '😮', '😢', '😡', '🎉', '🔥', '⚡', '💯', '🚀'] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeTime(createdAt: string): string {
  const diff = Date.now() - new Date(createdAt).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return createdAt.slice(0, 10);
}

function decodeUserId(idToken: string | null): string | null {
  if (!idToken) return null;
  try {
    return (JSON.parse(atob(idToken.split('.')[1])) as { sub: string }).sub;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// CreatePostForm (internal)
// ---------------------------------------------------------------------------

interface CreatePostFormProps {
  onCreate: (content: string) => Promise<void>;
  loading: boolean;
}

function CreatePostForm({ onCreate, loading }: CreatePostFormProps) {
  const [content, setContent] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setFormError(null);
    try {
      await onCreate(content.trim());
      setContent('');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to create post');
    }
  };

  return (
    <form onSubmit={(e) => { void handleSubmit(e); }}>
      <Textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="What's on your mind?"
        maxLength={10000}
        rows={3}
        className="resize-y mb-2"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!content.trim() || loading}
          className={cn(
            'h-9 px-4 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]',
            !content.trim() || loading
              ? 'bg-surface-hover text-text-tertiary border border-border cursor-default'
              : 'bg-primary text-white border-none cursor-pointer',
          )}
        >
          {loading ? 'Posting…' : 'Post'}
        </button>
      </div>
      {formError && (
        <div className="text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]">
          {formError}
        </div>
      )}
    </form>
  );
}

// ---------------------------------------------------------------------------
// LikeButton (internal)
// ---------------------------------------------------------------------------

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  whoLiked: { displayName: string }[];
  toggle: () => Promise<void>;
}

function LikeButton({ isLiked, likeCount, whoLiked, toggle }: LikeButtonProps) {
  return (
    <>
      <button
        onClick={() => void toggle()}
        aria-label="Like post"
        className="bg-transparent border-none cursor-pointer flex items-center gap-1 p-0 font-[system-ui,-apple-system,sans-serif]"
      >
        <span className={cn('text-base', isLiked ? 'text-primary' : 'text-text-tertiary')}>&#10084;</span>
        <span className={cn('text-sm', isLiked ? 'text-primary' : 'text-text-tertiary')}>{likeCount}</span>
      </button>
      {whoLiked.length > 0 && (
        <span className="text-xs text-text-secondary ml-1">
          Liked by: {whoLiked.slice(0, 3).map(p => p.displayName).join(', ')}
          {whoLiked.length > 3 ? ` and ${whoLiked.length - 3} more` : ''}
        </span>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// EmojiReactionBar (internal)
// ---------------------------------------------------------------------------

interface EmojiReactionBarProps {
  reactWithEmoji: (emoji: string) => Promise<void>;
}

function EmojiReactionBar({ reactWithEmoji }: EmojiReactionBarProps) {
  return (
    <div className="flex flex-wrap gap-0">
      {EMOJIS.map(emoji => (
        <button
          key={emoji}
          onClick={() => void reactWithEmoji(emoji)}
          className="text-base bg-transparent border-none px-1 py-0.5 cursor-pointer"
          title={emoji}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PostCard (internal)
// ---------------------------------------------------------------------------

interface PostCardProps {
  post: PostItem;
  idToken: string | null;
  roomId: string | null;
  currentUserId: string | null;
  onMessage: OnMessageFn;
  onEdit: (postId: string, content: string) => Promise<void>;
  onDelete: (postId: string) => Promise<void>;
}

function PostCard({ post, idToken, roomId, currentUserId, onMessage, onEdit, onDelete }: PostCardProps) {
  // One useLikes per card, not one per child. LikeButton and EmojiReactionBar
  // each used to call it with the same postId, which meant two GET
  // /likes requests per post (2N for an N-post feed) and two independent
  // likeCount states for the same post — the socket incremented both but an
  // optimistic toggle only moved one, so the two copies drifted apart.
  // `error` was dropped. A failed like rolls the optimistic count back, so the
  // heart filled and un-filled with no explanation — indistinguishable from a
  // rendering glitch — and a failed emoji reaction did nothing at all.
  const { isLiked, likeCount, whoLiked, toggle, reactWithEmoji, error: likeError } = useLikes({
    idToken,
    roomId,
    postId: post.postId,
    onMessage,
  });
  const [opacity, setOpacity] = useState(post._fadeIn ? 0 : 1);
  const [showComments, setShowComments] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [actionError, setActionError] = useState<string | null>(null);

  // `void onEdit(...); setEditMode(false)` dismissed the editor synchronously,
  // before the request had even been sent. A rejected save therefore repainted
  // the card with the old server text and said nothing — the user's revision
  // was silently discarded. Same for delete: the post simply stayed put.
  const handleEditSave = async () => {
    setActionError(null);
    try {
      await onEdit(post.postId, editContent);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to save post');
      return;
    }
    setEditMode(false);
  };

  const handleDelete = async () => {
    setActionError(null);
    try {
      await onDelete(post.postId);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to delete post');
      return;
    }
    setShowConfirmDelete(false);
  };

  useEffect(() => {
    if (post._fadeIn) {
      const timer = setTimeout(() => setOpacity(1), 10);
      return () => clearTimeout(timer);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isOwn = post.authorId === currentUserId;
  const postInitials = post.authorId.slice(0, 2).toUpperCase();

  return (
    <div style={{ opacity }} className="border-b border-surface-hover pb-4 mb-4 transition-opacity duration-200 ease-[ease]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0">
          {postInitials}
        </div>
        <div className="flex-1">
          <span className="text-base font-semibold text-text-primary">{post.authorId}</span>
          <span className="text-sm text-text-tertiary ml-2">{relativeTime(post.createdAt)}</span>
        </div>
      </div>

      {/* Body */}
      {editMode ? (
        <div className="mb-2">
          <Textarea
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
            rows={3}
            className="resize-y mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={() => { void handleEditSave(); }}
              disabled={!editContent.trim()}
              className={cn(
                'h-9 px-3 rounded-lg text-sm font-semibold font-[system-ui,-apple-system,sans-serif]',
                !editContent.trim()
                  ? 'bg-surface-hover text-text-tertiary border border-border cursor-default'
                  : 'bg-primary text-white border-none cursor-pointer',
              )}
            >
              Save
            </button>
            <button
              onClick={() => { setEditMode(false); setEditContent(post.content); }}
              className="text-sm text-text-secondary bg-transparent border-none cursor-pointer font-[system-ui,-apple-system,sans-serif]"
            >
              Discard Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="text-base text-text-primary mt-2 mb-2">
          {post.content}
        </div>
      )}

      {/* PostActions */}
      <div className="flex gap-4 text-sm mt-1 items-center flex-wrap">
        <LikeButton isLiked={isLiked} likeCount={likeCount} whoLiked={whoLiked} toggle={toggle} />
        <EmojiReactionBar reactWithEmoji={reactWithEmoji} />
        <button
          onClick={() => setShowComments(prev => !prev)}
          className="bg-transparent border-none text-sm text-text-secondary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0"
        >
          Comment
        </button>
        {isOwn && !editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0"
          >
            Edit
          </button>
        )}
        {isOwn && !showConfirmDelete && !editMode && (
          <button
            onClick={() => setShowConfirmDelete(true)}
            className="bg-transparent border-none text-sm text-text-tertiary cursor-pointer font-[system-ui,-apple-system,sans-serif] p-0"
          >
            Delete
          </button>
        )}
        {isOwn && showConfirmDelete && (
          <div role="group" aria-label="Confirm delete post" className="flex gap-1.5 items-center">
            <span className="text-xs text-text-primary">Delete this post?</span>
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]"
            >
              Cancel
            </button>
            <button
              onClick={() => { void handleDelete(); }}
              className="text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {(actionError ?? likeError) && (
        <div role="alert" data-testid="post-action-error" className="text-danger-fg text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]">
          {actionError ?? likeError}
        </div>
      )}

      {/* Inline CommentThread */}
      {showComments && (
        <CommentThread
          idToken={idToken}
          roomId={roomId}
          postId={post.postId}
          onMessage={onMessage}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PostFeed (exported)
// ---------------------------------------------------------------------------

export function PostFeed({ idToken, roomId, onMessage }: PostFeedProps) {
  const { posts, createPost, editPost, deletePost, loading, mutating, error, loadError, hasMore, loadMore } =
    usePosts({ idToken, roomId, onMessage });

  const currentUserId = decodeUserId(idToken);

  return (
    <div className="bg-surface border border-border rounded-lg p-5">
      {/* `mutating`, not `loading` — `loading` is false while a post is being
          written, so the Post button stayed live and a double-click created
          the post twice. */}
      <CreatePostForm onCreate={createPost} loading={loading || mutating} />
      <div className="border-t border-border my-4" />
      {hasMore && (
        <button
          onClick={() => void loadMore()}
          disabled={loading}
          className={cn(
            'w-full h-9 mb-4 bg-surface text-text-primary border border-border rounded-lg text-sm font-[system-ui,-apple-system,sans-serif]',
            loading ? 'cursor-default' : 'cursor-pointer',
          )}
        >
          {loading ? 'Loading…' : 'Load more'}
        </button>
      )}
      {/* A `loadMore` (or mutation) failure with posts already on screen used to
          be invisible: `error` was only rendered in the posts.length === 0
          branch below, so "Load more" flipped back from "Loading…" with
          nothing added and nothing said — reading as "that was the last
          page". */}
      {error && posts.length > 0 && (
        <div role="alert" data-testid="post-feed-error" className="text-danger-fg text-[13px] mb-3 font-[system-ui,-apple-system,sans-serif]">
          {error}
        </div>
      )}
      {loading && posts.length === 0 ? (
        <div className="flex items-center gap-2 p-4 justify-center text-text-secondary">
          <span className="inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" />
          Loading...
        </div>
      ) : loadError && posts.length === 0 ? (
        /* A failed load used to render as the empty state — the room looked
           genuinely empty ("Be the first to post in this room") whenever the
           posts API was down, so nobody knew to retry.
           `loadError`, not `error`: `error` is also set by createPost, so a
           refused FIRST post in an empty room blamed the read for a write
           that had already reported itself in the composer. */
        <div role="alert" className="py-6 text-center">
          <div className="text-sm font-semibold text-danger-fg mb-1">
            Couldn&rsquo;t load posts
          </div>
          <div className="text-sm text-text-tertiary">{loadError}</div>
        </div>
      ) : posts.length === 0 ? (
        <div className="py-6 text-center">
          <div className="text-sm font-semibold text-text-primary mb-1">
            No posts yet
          </div>
          <div className="text-sm text-text-tertiary">
            Be the first to post in this room.
          </div>
        </div>
      ) : (
        posts.map(post => (
          <PostCard
            key={post.postId}
            post={post}
            idToken={idToken}
            roomId={roomId}
            currentUserId={currentUserId}
            onMessage={onMessage}
            onEdit={editPost}
            onDelete={deletePost}
          />
        ))
      )}
    </div>
  );
}
