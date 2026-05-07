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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;

interface PostFeedProps {
  idToken: string | null;
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
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="What's on your mind?"
        maxLength={10000}
        rows={3}
        className="w-full box-border border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary resize-y mb-2"
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
        <div className="text-danger text-[13px] mt-1.5 font-[system-ui,-apple-system,sans-serif]">
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
  idToken: string | null;
  roomId: string | null;
  postId: string;
  onMessage: OnMessageFn;
}

function LikeButton({ idToken, roomId, postId, onMessage }: LikeButtonProps) {
  const { isLiked, likeCount, toggle, whoLiked } = useLikes({ idToken, roomId, postId, onMessage });

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
  idToken: string | null;
  roomId: string | null;
  postId: string;
  onMessage: OnMessageFn;
}

function EmojiReactionBar({ idToken, roomId, postId, onMessage }: EmojiReactionBarProps) {
  const { reactWithEmoji } = useLikes({ idToken, roomId, postId, onMessage });

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
  const [opacity, setOpacity] = useState(post._fadeIn ? 0 : 1);
  const [showComments, setShowComments] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

  useEffect(() => {
    if (post._fadeIn) {
      const timer = setTimeout(() => setOpacity(1), 10);
      return () => clearTimeout(timer);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isOwn = post.authorId === currentUserId;
  const postInitials = post.authorId.slice(0, 2).toUpperCase();

  return (
    <div style={{ opacity, transition: 'opacity 200ms ease' }} className="border-b border-surface-hover pb-4 mb-4">
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
          <textarea
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
            rows={3}
            className="w-full box-border border border-border-field rounded-md px-2.5 py-1.5 text-sm font-[system-ui,-apple-system,sans-serif] bg-surface-inset text-text-primary resize-y mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={() => { void onEdit(post.postId, editContent); setEditMode(false); }}
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
        <LikeButton idToken={idToken} roomId={roomId} postId={post.postId} onMessage={onMessage} />
        <EmojiReactionBar idToken={idToken} roomId={roomId} postId={post.postId} onMessage={onMessage} />
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
              onClick={() => { void onDelete(post.postId); setShowConfirmDelete(false); }}
              className="text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]"
            >
              Delete
            </button>
          </div>
        )}
      </div>

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
  const { posts, createPost, editPost, deletePost, loading, hasMore, loadMore } = usePosts({ idToken, roomId, onMessage });

  const currentUserId = decodeUserId(idToken);

  return (
    <div className="bg-surface border border-border rounded-lg p-5">
      <CreatePostForm onCreate={createPost} loading={loading} />
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
      {loading && posts.length === 0 ? (
        <div className="flex items-center gap-2 p-4 justify-center text-text-secondary">
          <span className="inline-block w-4 h-4 border-2 border-border border-t-primary rounded-full animate-spin" />
          Loading...
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
