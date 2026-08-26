// frontend/src/components/doc-editor/AckMode.tsx
//
// Sequential chunk review mode. User navigates through sections one at a time.

import { useState, useEffect } from 'react';
import type { XmlFragment } from 'yjs';
import * as Y from 'yjs';
import type { Section, Participant, CommentThread } from '../../types/document';
import type { CollaborationProvider } from './TiptapEditor';
import ReviewProgress from './ReviewProgress';
import ChunkViewer from './ChunkViewer';
import { cn } from '../../lib/cn';

interface AckModeProps {
  sections: Section[];
  onAckItem: (sectionId: string, itemId: string, notes?: string) => void;
  onRejectItem: (sectionId: string, itemId: string, reason: string) => void;
  participants: Participant[];
  onSectionFocus?: (sectionId: string) => void;
  /** Jump to a specific section page (set by handleJumpToUser) */
  jumpToIndex?: number | null;
  onJumpComplete?: () => void;
  getSectionFragment: (sectionId: string) => XmlFragment | null;
  ydoc: Y.Doc;
  provider: CollaborationProvider | null;
  comments?: Record<string, CommentThread[]>;
  onAddComment?: (sectionId: string, text: string, parentCommentId?: string | null) => void;
  onResolveThread?: (sectionId: string, commentId: string) => void;
  onUnresolveThread?: (sectionId: string, commentId: string) => void;
}

const SECTIONS_PER_PAGE = 4;

export default function AckMode({ sections, onAckItem, onRejectItem, participants, onSectionFocus, jumpToIndex, onJumpComplete, getSectionFragment, ydoc, provider, comments, onAddComment, onResolveThread, onUnresolveThread }: AckModeProps) {
  const [pageIndex, setPageIndex] = useState(0);

  const totalPages = Math.max(1, Math.ceil(sections.length / SECTIONS_PER_PAGE));
  const startIdx = pageIndex * SECTIONS_PER_PAGE;
  const pageSections = sections.slice(startIdx, startIdx + SECTIONS_PER_PAGE);

  // Handle jump-to-index from handleJumpToUser
  useEffect(() => {
    if (jumpToIndex != null && jumpToIndex >= 0 && jumpToIndex < sections.length) {
      setPageIndex(Math.floor(jumpToIndex / SECTIONS_PER_PAGE));
      onJumpComplete?.();
    }
  }, [jumpToIndex, sections.length, onJumpComplete]);

  // Update awareness when the first visible section changes
  useEffect(() => {
    if (pageSections.length > 0 && onSectionFocus) {
      onSectionFocus(pageSections[0].id);
    }
  }, [startIdx, onSectionFocus]); // eslint-disable-line react-hooks/exhaustive-deps

  if (sections.length === 0) {
    return <div className={cn('text-center p-12 text-text-secondary text-[15px]')}>No sections to review.</div>;
  }

  const prev = () => setPageIndex((i) => Math.max(0, i - 1));
  const next = () => setPageIndex((i) => Math.min(totalPages - 1, i + 1));
  const reviewedCount = startIdx + pageSections.length;

  return (
    <div>
      <ReviewProgress current={reviewedCount} total={sections.length} />

      <div className={cn('flex flex-col gap-4')}>
        {pageSections.map((section) => {
          const sectionParticipants = participants?.filter(p => p.currentSectionId === section.id) ?? [];
          return (
            <div key={section.id}>
              {sectionParticipants.length > 0 && (
                <div className={cn('flex gap-1 mb-1.5 items-center')}>
                  <span className={cn('text-xs text-text-secondary mr-1')}>Viewing:</span>
                  {sectionParticipants.map(p => (
                    <div
                      key={p.clientId}
                      title={`${p.displayName} (${p.mode})`}
                      className={cn('w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold')}
                      style={{ background: p.color }}
                    >
                      {p.displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                  ))}
                </div>
              )}

              <ChunkViewer
                section={section}
                onAckItem={(itemId, notes) => onAckItem(section.id, itemId, notes)}
                onRejectItem={(itemId, reason) => onRejectItem(section.id, itemId, reason)}
                fragment={getSectionFragment(section.id)}
                ydoc={ydoc}
                provider={provider}
                comments={comments?.[section.id]}
                onAddComment={onAddComment ? (text, parentCommentId) => onAddComment(section.id, text, parentCommentId) : undefined}
                onResolveThread={onResolveThread ? (commentId) => onResolveThread(section.id, commentId) : undefined}
                onUnresolveThread={onUnresolveThread ? (commentId) => onUnresolveThread(section.id, commentId) : undefined}
                participants={sectionParticipants}
              />
            </div>
          );
        })}
      </div>

      <div className={cn('flex justify-between items-center mt-4 py-3')}>
        <button
          type="button"
          className={cn(
            'px-[18px] py-2 text-sm font-semibold border border-border-field rounded-md font-[inherit]',
            pageIndex === 0 ? 'bg-surface-inset text-text-tertiary cursor-default' : 'bg-surface text-text-primary cursor-pointer',
          )}
          onClick={prev}
          disabled={pageIndex === 0}
        >
          Previous
        </button>
        <span className={cn('text-[13px] text-text-secondary')}>
          Page {pageIndex + 1} of {totalPages} ({sections.length} sections)
        </span>
        <button
          type="button"
          className={cn(
            'px-[18px] py-2 text-sm font-semibold border border-border-field rounded-md font-[inherit]',
            pageIndex === totalPages - 1 ? 'bg-surface-inset text-text-tertiary cursor-default' : 'bg-surface text-text-primary cursor-pointer',
          )}
          onClick={next}
          disabled={pageIndex === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
