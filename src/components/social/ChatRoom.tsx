// frontend/src/components/ChatRoom.tsx
//
// Slack/iMessage-style chat view for a room. Own messages right-aligned,
// others left-aligned with avatar bubbles. Auto-scrolls to newest message.

import { useState, useEffect, useRef } from 'react';
import { usePosts } from '../../hooks/usePosts';
import type { PostItem } from '../../hooks/usePosts';
import type { GatewayMessage } from '../../types/gateway';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';

type OnMessageFn = (handler: (msg: GatewayMessage) => void) => () => void;

interface ChatRoomProps {
  idToken: string | null;
  roomId: string;
  roomName: string;
  onMessage: OnMessageFn;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const AVATAR_COLORS = [
  '#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb',
  '#64b5f6', '#4dd0e1', '#4db6ac', '#81c784', '#ffb74d',
  '#ff8a65', '#a1887f', '#90a4ae', '#4fc3f7', '#aed581',
];

function avatarColor(userId: string): string {
  let h = 0;
  for (let i = 0; i < userId.length; i++) h = ((h * 31) + userId.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function initials(userId: string): string {
  const parts = userId.split(/[\s._@-]/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return userId.slice(0, 2).toUpperCase();
}

function relativeTime(createdAt: string): string {
  const diff = Date.now() - new Date(createdAt).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return new Date(createdAt).toLocaleDateString();
}

function decodeUserId(idToken: string | null): string | null {
  if (!idToken) return null;
  try { return (JSON.parse(atob(idToken.split('.')[1])) as { sub: string }).sub; }
  catch { return null; }
}

// ---------------------------------------------------------------------------
// MessageBubble
// ---------------------------------------------------------------------------

interface MessageBubbleProps {
  post: PostItem;
  isOwn: boolean;
  showSender: boolean;
}

function MessageBubble({ post, isOwn, showSender }: MessageBubbleProps) {
  const color = avatarColor(post.authorId);

  return (
    <div
      className={cn(
        'flex items-end gap-2',
        isOwn ? 'flex-row-reverse' : 'flex-row',
        showSender ? 'pt-2 px-4 pb-0.5' : 'py-px px-4',
      )}
    >
      {/* Avatar — left side only, shown for first in group */}
      <div className="w-8 shrink-0 self-end">
        {!isOwn && showSender && (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white select-none"
            style={{ background: color }}
          >
            {initials(post.authorId)}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          'max-w-[68%] flex flex-col gap-0.5',
          isOwn ? 'items-end' : 'items-start',
        )}
      >
        {!isOwn && showSender && (
          <span className="text-[11px] font-semibold pl-1" style={{ color }}>
            {post.authorId}
          </span>
        )}
        <div
          className={cn(
            'px-3.5 py-2 text-sm leading-relaxed break-words transition-opacity duration-200',
            isOwn
              ? 'bg-primary text-on-primary rounded-[18px_18px_4px_18px]'
              : 'bg-surface-hover text-text-primary rounded-[4px_18px_18px_18px]',
            post._fadeIn ? 'opacity-0' : 'opacity-100',
          )}
        >
          {post.content}
        </div>
        {showSender && (
          <span className="text-[10px] text-text-tertiary px-1">
            {relativeTime(post.createdAt)}
          </span>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ChatRoom (exported)
// ---------------------------------------------------------------------------

export function ChatRoom({ idToken, roomId, roomName, onMessage }: ChatRoomProps) {
  const { posts, createPost, loading, hasMore, loadMore, error, loadError } = usePosts({ idToken, roomId, onMessage });
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const currentUserId = decodeUserId(idToken);

  // Chronological order (oldest -> top, newest -> bottom)
  const chronological = [...posts].reverse();

  // Jump to the newest message when the newest message CHANGES — not whenever
  // the count changes.
  //
  // `posts` is newest-first, so `loadMore` appends older messages to the tail
  // and leaves `posts[0]` alone. Keyed on `posts.length`, "Load earlier" grew
  // the array and yanked the viewport straight back to the bottom, so the
  // history you had just asked for scrolled past before you could read a line
  // of it — the button looked like it did nothing.
  const newestId = posts[0]?.postId;
  useEffect(() => {
    if (!newestId) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [newestId]);

  const handleSend = async () => {
    if (!message.trim() || sending) return;
    const text = message.trim();
    setMessage('');
    setSendError(null);
    setSending(true);
    try {
      await createPost(text);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Failed to send message');
      setMessage(text); // restore so user can retry
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void handleSend(); }
  };

  return (
    <div className="flex flex-col h-full bg-surface rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface shrink-0">
        <span className="text-[15px] font-semibold text-text-primary">
          # {roomName}
        </span>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto flex flex-col pb-1">
        {hasMore && (
          <div className="text-center py-2">
            <button onClick={() => void loadMore()} disabled={loading}
              className={cn(
                'text-xs text-text-secondary bg-transparent border border-border rounded-full px-3.5 py-0.5 font-[inherit]',
                loading ? 'cursor-default' : 'cursor-pointer',
              )}>
              {loading ? 'Loading…' : 'Load earlier'}
            </button>
          </div>
        )}

        {loading && chronological.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-text-tertiary text-[13px]">
            Loading messages…
          </div>
        ) : loadError && chronological.length === 0 ? (
          /* A failed history load used to render the empty state — the room
             announced "No messages yet / Be the first to say something!"
             whenever the posts API was down, which is a claim about the
             room's contents that nothing had verified.
             `loadError`, not `error`: `error` is also set by `createPost`, so
             a refused FIRST message in an empty room replaced the empty state
             with "Couldn't load messages" while the banner below said the
             truth. */
          <div role="alert" className="flex-1 flex flex-col items-center justify-center gap-1.5 px-6 text-center">
            <span className="text-[28px]">⚠️</span>
            <span className="text-sm font-semibold text-danger-fg">Couldn&rsquo;t load messages</span>
            <span className="text-[13px] text-text-tertiary">{loadError}</span>
          </div>
        ) : chronological.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-text-tertiary gap-1.5">
            <span className="text-[28px]">💬</span>
            <span className="text-sm font-semibold text-text-primary">No messages yet</span>
            <span className="text-[13px]">Be the first to say something!</span>
          </div>
        ) : (
          chronological.map((post, i) => {
            const isOwn = post.authorId === currentUserId;
            const prev = chronological[i - 1];
            const showSender = !prev || prev.authorId !== post.authorId ||
              (new Date(post.createdAt).getTime() - new Date(prev.createdAt).getTime()) > 5 * 60 * 1000;
            return (
              <MessageBubble key={post.postId} post={post} isOwn={isOwn} showSender={showSender} />
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Error banners */}
      {(error || sendError) && (
        <div className="px-4 py-1.5 bg-danger-bg border-t border-danger-border text-xs text-danger-fg">
          {sendError ?? error}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-border bg-surface shrink-0">
        <Input
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message #${roomName}…`}
          disabled={sending}
          className="flex-1 rounded-[22px] px-4"
        />
        <button
          onClick={() => void handleSend()}
          disabled={!message.trim() || sending}
          className={cn(
            'w-[34px] h-[34px] rounded-full shrink-0 border-none flex items-center justify-center text-base',
            !message.trim() || sending
              ? 'bg-surface-hover text-text-tertiary cursor-default'
              : 'bg-primary text-on-primary cursor-pointer',
          )}
        >
          ↑
        </button>
      </div>
    </div>
  );
}
