// frontend/src/components/CommentThread.tsx
//
// Inline comment thread — rendered below an expanded PostCard in PostFeed.
// All sub-components co-located as unexported internals.
// Only CommentThread is exported.

import { useState, useEffect } from 'react';
import { useComments } from '../../hooks/useComments';
import type { CommentItem } from '../../hooks/useComments';
import type { GatewayMessage } from '../../types/gateway';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;

interface CommentThreadProps {
  idToken: string | null;
  roomId: string | null;
  postId: string | null;
  onMessage: OnMessageFn;
}

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
// ReplyForm (internal)
// ---------------------------------------------------------------------------

interface ReplyFormProps {
  onSubmit: (content: string) => Promise<void>;
  placeholder?: string;
  loading: boolean;
}

function ReplyForm({ onSubmit, placeholder = 'Write a reply…', loading }: ReplyFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    void onSubmit(content.trim());
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
      <Input
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder={placeholder}
        className="flex-1"
      />
      <button
        type="submit"
        disabled={!content.trim() || loading}
        className={cn(
          'h-7 px-2.5 rounded-md text-sm font-semibold font-[system-ui,-apple-system,sans-serif]',
          !content.trim() || loading
            ? 'bg-surface-hover text-text-tertiary border border-border cursor-default'
            : 'bg-primary text-white border-none cursor-pointer',
        )}
      >
        Comment
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// CommentItemView (internal)
// ---------------------------------------------------------------------------

interface CommentItemViewProps {
  comment: CommentItem;
  currentUserId: string | null;
  loading: boolean;
  onDelete: (commentId: string) => Promise<void>;
  onReply: (parentCommentId: string, content: string) => Promise<void>;
}

function CommentItemView({ comment, currentUserId, loading, onDelete, onReply }: CommentItemViewProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [opacity, setOpacity] = useState(comment._fadeIn ? 0 : 1);

  useEffect(() => {
    if (comment._fadeIn) {
      const timer = setTimeout(() => setOpacity(1), 10);
      return () => clearTimeout(timer);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isOwn = comment.authorId === currentUserId;
  const isReply = !!comment.parentCommentId;
  const commentInitials = comment.authorId.slice(0, 2).toUpperCase();

  const inner = (
    <div style={{ opacity }} className="transition-opacity duration-200 ease-[ease]">
      <div className="flex items-start gap-2">
        <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0">
          {commentInitials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-text-primary">
              {comment.authorId}
            </span>
            <span className="text-xs text-text-tertiary">
              {relativeTime(comment.createdAt)}
            </span>
          </div>
          <div className="text-sm text-text-primary mb-1">
            {comment.content}
          </div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setShowReplyForm(prev => !prev)}
              className="text-sm text-text-secondary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]"
            >
              Reply
            </button>
            {isOwn && !showConfirmDelete && (
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="text-sm text-text-tertiary bg-transparent border-none cursor-pointer p-0 font-[system-ui,-apple-system,sans-serif]"
                aria-label="Delete comment"
              >
                Delete
              </button>
            )}
            {isOwn && showConfirmDelete && (
              <div role="group" aria-label="Confirm delete comment" className="flex gap-1.5 items-center">
                <span className="text-xs text-text-primary">Delete this comment?</span>
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="text-xs text-text-secondary bg-transparent border border-border rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { void onDelete(comment.commentId); setShowConfirmDelete(false); }}
                  className="text-xs text-white bg-danger border-none rounded-md px-2 py-0.5 cursor-pointer font-[system-ui,-apple-system,sans-serif]"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          {showReplyForm && (
            <ReplyForm
              onSubmit={async (content) => {
                await onReply(comment.commentId, content);
                setShowReplyForm(false);
              }}
              placeholder="Write a reply…"
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );

  if (isReply) {
    return (
      <div className="pl-8 py-2">
        {inner}
      </div>
    );
  }

  return (
    <div className="py-2 border-b border-surface-hover">
      {inner}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CommentThread (exported)
// ---------------------------------------------------------------------------

export function CommentThread({ idToken, roomId, postId, onMessage }: CommentThreadProps) {
  const { comments, createComment, deleteComment, loading } = useComments({ idToken, roomId, postId, onMessage });

  const currentUserId = decodeUserId(idToken);

  const handleReply = async (parentCommentId: string, content: string) => {
    await createComment(content, parentCommentId);
  };

  return (
    <div className="pt-2 pl-2 border-t border-surface-hover">
      {loading ? (
        <div className="text-sm text-text-tertiary py-2">
          Loading comments…
        </div>
      ) : comments.length === 0 ? (
        <div className="text-sm text-text-tertiary text-center py-4">
          No comments yet
        </div>
      ) : (
        comments.map(comment => (
          <CommentItemView
            key={comment.commentId}
            comment={comment}
            currentUserId={currentUserId}
            loading={loading}
            onDelete={deleteComment}
            onReply={handleReply}
          />
        ))
      )}
      <ReplyForm
        onSubmit={(content) => createComment(content)}
        placeholder="Write a comment…"
        loading={loading}
      />
    </div>
  );
}
