// frontend/src/components/doc-editor/SectionComments.tsx
//
// Section-scoped comment panel.

import { useState, useRef, useCallback } from 'react';
import type { CommentThread, Participant } from '../../types/document';
import { MentionDropdown } from './MentionDropdown';
import type { MentionDropdownHandle } from './MentionDropdown';
import { useMentionUsers } from '../../hooks/useMentionUsers';
import type { MentionUser } from '../../hooks/useMentionUsers';
import CommentThreadNode, {
  MENTION_INITIAL,
  countAllComments,
  detectMention,
  insertMention,
  type MentionState,
} from './CommentThread';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface SectionCommentsProps {
  comments: CommentThread[];
  onAddComment: (text: string, parentCommentId?: string | null) => void;
  participants?: Participant[];
  onResolveThread?: (commentId: string) => void;
  onUnresolveThread?: (commentId: string) => void;
}

// ---------------------------------------------------------------------------
// SectionComments
// ---------------------------------------------------------------------------

export default function SectionComments({
  comments,
  onAddComment,
  participants = [],
  onResolveThread,
  onUnresolveThread,
}: SectionCommentsProps) {
  const [expanded, setExpanded] = useState(true);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mentionRef = useRef<MentionDropdownHandle>(null);
  const [mention, setMention] = useState<MentionState>(MENTION_INITIAL);

  const mentionUsers = useMentionUsers(participants);
  const totalCount = countAllComments(comments);
  const [sortNewest, setSortNewest] = useState(true);

  const sortedComments = [...comments].sort((a, b) => {
    if (a.resolved && !b.resolved) return 1;
    if (!a.resolved && b.resolved) return -1;
    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();
    return sortNewest ? timeB - timeA : timeA - timeB;
  });

  const handlePost = () => {
    if (mention.active) return;
    const trimmed = draft.trim();
    if (!trimmed) return;
    onAddComment(trimmed, null);
    setDraft('');
    setMention(MENTION_INITIAL);
  };

  const handleDraftChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setDraft(val);
    const cursor = e.target.selectionStart ?? val.length;
    const next = detectMention(val, cursor, inputRef.current);
    setMention(next);
  };

  const handleMentionSelect = useCallback(
    (user: MentionUser) => {
      const { newValue, newCursor } = insertMention(draft, mention, user);
      setDraft(newValue);
      setMention(MENTION_INITIAL);
      requestAnimationFrame(() => {
        const el = inputRef.current;
        if (el) {
          el.focus();
          el.setSelectionRange(newCursor, newCursor);
        }
      });
    },
    [draft, mention],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (mention.active && mentionRef.current) {
      const consumed = mentionRef.current.handleKeyDown(e);
      if (consumed) return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePost();
    }
  };

  const handleReply = (parentId: string, text: string) => {
    onAddComment(text, parentId);
  };

  return (
    <div>
      {/* Inject keyframes for slide-down animation */}
      <style>{`
        @keyframes sectionCommentsSlideDown {
          from { max-height: 0; opacity: 0; }
          to { max-height: 500px; opacity: 1; }
        }
      `}</style>

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => {
          setExpanded((v) => !v);
          if (!expanded) {
            setTimeout(() => inputRef.current?.focus(), 100);
          }
        }}
        className={cn(
          'inline-flex items-center gap-1 mt-2.5 px-2.5 py-1 text-xs font-medium border border-border rounded-md cursor-pointer font-[inherit]',
          totalCount > 0 ? 'bg-[#f0f9ff] text-[#2563eb]' : 'bg-transparent text-[#64748b]',
        )}
      >
        {expanded ? '▼' : '▶'} Comments{totalCount > 0 ? ` (${totalCount})` : ''}
      </button>

      {/* Expanded thread container */}
      {expanded && (
        <div className={cn('mt-2 border border-border rounded-lg bg-[#f8fafc] overflow-hidden animate-[sectionCommentsSlideDown_0.2s_ease-out]')}>
          {/* New comment input at top */}
          <div className={cn('flex items-start gap-1.5 px-3 py-2.5 border-b border-border bg-white')}>
            <div className={cn('flex-1 relative')}>
              <textarea
                ref={inputRef}
                value={draft}
                onChange={handleDraftChange}
                onKeyDown={handleKeyDown}
                placeholder="Add a comment... (type @ to mention)"
                rows={2}
                className={cn('w-full border border-border rounded-md px-2.5 py-2 text-[13px] font-[inherit] outline-none resize-y min-h-12 box-border text-[#1e293b] bg-white')}
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
            <button
              type="button"
              onClick={handlePost}
              className={cn('px-3.5 py-1.5 text-xs font-semibold border-none rounded-md bg-[#3b82f6] text-white cursor-pointer font-[inherit] whitespace-nowrap self-end')}
            >
              Post
            </button>
          </div>

          {/* Sort control + comment threads */}
          {comments.length > 1 && (
            <div className={cn('flex justify-end px-3 pt-1 border-b border-[#f1f5f9]')}>
              <button
                type="button"
                onClick={() => setSortNewest(v => !v)}
                className={cn('bg-transparent border-none cursor-pointer text-[11px] text-[#64748b] px-1.5 py-0.5 font-[inherit]')}
              >
                {sortNewest ? '↓ Newest first' : '↑ Oldest first'}
              </button>
            </div>
          )}
          <div className={cn('max-h-[420px] overflow-y-auto px-3 py-2')}>
            {comments.length === 0 && (
              <div className={cn('p-3 text-center text-text-tertiary text-xs')}>
                No comments yet. Start the discussion!
              </div>
            )}
            {sortedComments.map((thread) => (
              <CommentThreadNode
                key={thread.id}
                comment={thread}
                depth={0}
                onReply={handleReply}
                mentionUsers={mentionUsers}
                onResolveThread={onResolveThread}
                onUnresolveThread={onUnresolveThread}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
