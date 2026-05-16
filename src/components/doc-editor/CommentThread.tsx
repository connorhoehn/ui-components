// frontend/src/components/doc-editor/CommentThread.tsx
//
// Shared presentational layer for threaded comment rendering.

import { useState, useRef, useCallback } from 'react';
import type { CommentThread } from '../../types/document';
import { MentionDropdown } from './MentionDropdown';
import type { MentionDropdownHandle } from './MentionDropdown';
import type { MentionUser } from '../../hooks/useMentionUsers';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Small display helpers
// ---------------------------------------------------------------------------

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function relativeTime(iso: string): string {
  try {
    const diff = Date.now() - new Date(iso).getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  } catch {
    return '';
  }
}

export function countAllComments(threads: CommentThread[]): number {
  let total = 0;
  for (const t of threads) {
    total += 1 + countAllComments(t.replies);
  }
  return total;
}

/** Render comment text with styled @mention spans. */
export function renderCommentText(text: string): React.ReactNode {
  const parts = text.split(/(@[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*)/g);
  return parts.map((part, i) =>
    part.startsWith('@') && /^@[A-Z]/.test(part) ? (
      <span
        key={i}
        className={cn('text-[#3b82f6] font-semibold bg-[#eff6ff] px-0.5 rounded-sm')}
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
}

// ---------------------------------------------------------------------------
// Mention detection
// ---------------------------------------------------------------------------

export interface MentionState {
  active: boolean;
  query: string;
  position: { top: number; left: number };
  /** Character index in the textarea where the `@` was typed */
  atIndex: number;
}

export const MENTION_INITIAL: MentionState = {
  active: false,
  query: '',
  position: { top: 0, left: 0 },
  atIndex: -1,
};

export function detectMention(
  value: string,
  cursorPos: number,
  textareaEl: HTMLTextAreaElement | null,
): MentionState {
  let i = cursorPos - 1;
  while (i >= 0 && value[i] !== '@' && value[i] !== ' ' && value[i] !== '\n') {
    i--;
  }
  if (i < 0 || value[i] !== '@') {
    return MENTION_INITIAL;
  }
  if (i > 0 && value[i - 1] !== ' ' && value[i - 1] !== '\n') {
    return MENTION_INITIAL;
  }
  const query = value.slice(i + 1, cursorPos);
  const rect = textareaEl?.getBoundingClientRect();
  const position = rect
    ? { top: rect.bottom + 4, left: rect.left }
    : { top: 28, left: 0 };
  return { active: true, query, position, atIndex: i };
}

export function insertMention(
  value: string,
  mention: MentionState,
  user: MentionUser,
): { newValue: string; newCursor: number } {
  const before = value.slice(0, mention.atIndex);
  const after = value.slice(mention.atIndex + 1 + mention.query.length);
  const insert = `@${user.displayName} `;
  return {
    newValue: before + insert + after,
    newCursor: before.length + insert.length,
  };
}

// ---------------------------------------------------------------------------
// CommentThreadNode
// ---------------------------------------------------------------------------

export interface CommentThreadNodeProps {
  comment: CommentThread;
  depth: number;
  onReply: (parentId: string, text: string) => void;
  mentionUsers: MentionUser[];
  onResolveThread?: (commentId: string) => void;
  onUnresolveThread?: (commentId: string) => void;
}

function CommentThreadNode({
  comment,
  depth,
  onReply,
  mentionUsers,
  onResolveThread,
  onUnresolveThread,
}: CommentThreadNodeProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [hovered, setHovered] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mentionRef = useRef<MentionDropdownHandle>(null);
  const [mention, setMention] = useState<MentionState>(MENTION_INITIAL);
  const [resolvedExpanded, setResolvedExpanded] = useState(false);

  const isResolved = depth === 0 && !!comment.resolved;
  const cappedDepth = Math.min(depth, 5);

  const handleSubmitReply = () => {
    if (mention.active) return;
    const trimmed = replyText.trim();
    if (!trimmed) return;
    onReply(comment.id, trimmed);
    setReplyText('');
    setShowReplyForm(false);
    setMention(MENTION_INITIAL);
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setReplyText(val);
    const cursor = e.target.selectionStart ?? val.length;
    const next = detectMention(val, cursor, textareaRef.current);
    setMention(next);
  };

  const handleMentionSelect = useCallback(
    (user: MentionUser) => {
      const { newValue, newCursor } = insertMention(replyText, mention, user);
      setReplyText(newValue);
      setMention(MENTION_INITIAL);
      requestAnimationFrame(() => {
        const el = textareaRef.current;
        if (el) {
          el.focus();
          el.setSelectionRange(newCursor, newCursor);
        }
      });
    },
    [replyText, mention],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (mention.active && mentionRef.current) {
      const consumed = mentionRef.current.handleKeyDown(e);
      if (consumed) return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitReply();
    }
    if (e.key === 'Escape') {
      setShowReplyForm(false);
    }
  };

  const borderColor = hovered ? comment.color : depth === 0 ? '#e2e8f0' : '#cbd5e1';

  // Resolved banner (shown for resolved root threads)
  if (isResolved && !resolvedExpanded) {
    return (
      <div className={cn(cappedDepth > 0 ? 'ml-5' : 'ml-0')}>
        <div
          className={cn('bg-[#f0fdf4] border-l-[3px] border-l-[#22c55e] px-3 py-2 mb-1 rounded cursor-pointer flex items-center justify-between')}
          onClick={() => setResolvedExpanded(true)}
        >
          <div className={cn('flex items-center gap-1.5')}>
            <span className={cn('text-[#16a34a] text-xs')}>{'✔'}</span>
            <span className={cn('text-[#16a34a] text-xs font-semibold')}>
              Resolved by {comment.resolvedBy}
            </span>
            {comment.resolvedAt && (
              <span className={cn('text-[#86efac] text-[11px]')}>
                {relativeTime(comment.resolvedAt)}
              </span>
            )}
            <span className={cn('text-text-tertiary text-[11px] ml-1')}>
              — click to expand
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onUnresolveThread?.(comment.id);
            }}
            className={cn('bg-transparent border border-[#cbd5e1] rounded px-2 py-0.5 text-[#64748b] text-[11px] cursor-pointer font-[inherit]')}
          >
            Reopen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(cappedDepth > 0 ? 'ml-5' : 'ml-0', isResolved ? 'opacity-60' : '')}>
      {/* Resolved banner (expanded) */}
      {isResolved && resolvedExpanded && (
        <div
          className={cn('bg-[#f0fdf4] border-l-[3px] border-l-[#22c55e] px-3 py-2 mb-1 rounded cursor-pointer flex items-center justify-between')}
          onClick={() => setResolvedExpanded(false)}
        >
          <div className={cn('flex items-center gap-1.5')}>
            <span className={cn('text-[#16a34a] text-xs')}>{'✔'}</span>
            <span className={cn('text-[#16a34a] text-xs font-semibold')}>
              Resolved by {comment.resolvedBy}
            </span>
            {comment.resolvedAt && (
              <span className={cn('text-[#86efac] text-[11px]')}>
                {relativeTime(comment.resolvedAt)}
              </span>
            )}
            <span className={cn('text-text-tertiary text-[11px] ml-1')}>
              — click to collapse
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onUnresolveThread?.(comment.id);
            }}
            className={cn('bg-transparent border border-[#cbd5e1] rounded px-2 py-0.5 text-[#64748b] text-[11px] cursor-pointer font-[inherit]')}
          >
            Reopen
          </button>
        </div>
      )}

      {/* Comment card */}
      <div
        className={cn('px-3 py-2 mb-1 transition-colors duration-200')}
        style={{ borderLeft: `3px solid ${borderColor}` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Avatar + name + time */}
        <div className={cn('flex items-center gap-1.5 mb-1')}>
          <div
            className={cn('w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold shrink-0')}
            style={{ background: `linear-gradient(135deg, ${comment.color}, ${comment.color}dd)` }}
          >
            {getInitials(comment.displayName)}
          </div>
          <span className={cn('font-semibold text-[13px] text-[#1e293b]')}>
            {comment.displayName}
          </span>
          <span className={cn('text-[11px] text-text-tertiary')}>
            {relativeTime(comment.timestamp)}
          </span>
        </div>

        {/* Comment text */}
        <div className={cn('text-[13px] leading-normal text-[#334155] pl-[30px] whitespace-pre-wrap')}>
          {renderCommentText(comment.text)}
        </div>

        {/* Reply + Resolve buttons */}
        <div className={cn('pl-[30px] mt-1 flex gap-2')}>
          <button
            type="button"
            onClick={() => {
              setShowReplyForm(!showReplyForm);
              if (!showReplyForm) {
                setTimeout(() => textareaRef.current?.focus(), 50);
              }
            }}
            className={cn('bg-transparent border-none text-[#64748b] text-xs cursor-pointer py-0.5 px-0 font-[inherit]')}
          >
            Reply
          </button>
          {depth === 0 && !isResolved && onResolveThread && (
            <button
              type="button"
              onClick={() => onResolveThread(comment.id)}
              className={cn('bg-transparent border-none text-[#64748b] text-xs cursor-pointer py-0.5 px-0 font-[inherit]')}
            >
              {'✔'} Resolve
            </button>
          )}
        </div>

        {/* Inline reply form */}
        {showReplyForm && (
          <div className={cn('pl-[30px] mt-2 overflow-hidden animate-[sectionCommentsSlideDown_0.2s_ease-out]')}>
            <div className={cn('relative')}>
              <textarea
                ref={textareaRef}
                value={replyText}
                onChange={handleReplyChange}
                onKeyDown={handleKeyDown}
                placeholder="Write a reply... (type @ to mention)"
                rows={2}
                className={cn('w-full border border-border rounded-md px-2.5 py-1.5 text-[13px] font-[inherit] outline-none resize-y min-h-12 box-border text-[#1e293b] bg-white')}
              />
              {mention.active && (
                <MentionDropdown
                  ref={mentionRef}
                  query={mention.query}
                  users={mentionUsers}
                  position={mention.position}
                  onSelect={handleMentionSelect}
                  onDismiss={() => setMention(MENTION_INITIAL)}
                />
              )}
            </div>
            <div className={cn('flex gap-1.5 mt-1.5')}>
              <button
                type="button"
                onClick={handleSubmitReply}
                className={cn('px-3 py-1 text-xs font-semibold border-none rounded-md bg-[#3b82f6] text-white cursor-pointer font-[inherit]')}
              >
                Reply
              </button>
              <button
                type="button"
                onClick={() => setShowReplyForm(false)}
                className={cn('px-3 py-1 text-xs font-medium border border-border rounded-md bg-transparent text-[#64748b] cursor-pointer font-[inherit]')}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Nested replies */}
      {comment.replies.map((reply) => (
        <CommentThreadNode
          key={reply.id}
          comment={reply}
          depth={depth + 1}
          onReply={onReply}
          mentionUsers={mentionUsers}
          onResolveThread={onResolveThread}
          onUnresolveThread={onUnresolveThread}
        />
      ))}
    </div>
  );
}

export default CommentThreadNode;
