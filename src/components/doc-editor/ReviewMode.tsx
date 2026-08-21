// frontend/src/components/doc-editor/ReviewMode.tsx
//
// Continuous scrollable review mode (DocuSign + Git MR style).
// Shows all sections in a read-only rendered format with per-section
// review acknowledgement, progress tracking, and reviewer badges.

import { useState } from 'react';
import type { XmlFragment } from 'yjs';
import * as Y from 'yjs';
import type { Section, Participant, CommentThread, SectionReview } from '../../types/document';
import type { CollaborationProvider } from './TiptapEditor';
import TiptapEditor from './TiptapEditor';
import SectionComments from './SectionComments';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ReviewModeProps {
  sections: Section[];
  participants: Participant[];
  userId: string;
  getSectionFragment: (sectionId: string) => XmlFragment | null;
  ydoc: Y.Doc;
  provider: CollaborationProvider | null;
  sectionReviews: Record<string, SectionReview[]>;
  reviewSection: (sectionId: string, status: SectionReview['status'], comment?: string) => void;
  comments?: Record<string, CommentThread[]>;
  onAddComment?: (sectionId: string, text: string, parentCommentId?: string | null) => void;
  onResolveThread?: (sectionId: string, commentId: string) => void;
  onUnresolveThread?: (sectionId: string, commentId: string) => void;
  onSectionFocus?: (sectionId: string) => void;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const typeBadgeColors: Record<Section['type'], { bg: string; text: string }> = {
  summary: { bg: 'var(--color-info-bg)', text: 'var(--color-info-fg)' },
  tasks: { bg: 'var(--color-warning-bg)', text: 'var(--color-warning-fg)' },
  decisions: { bg: '#ede9fe', text: '#5b21b6' },
  notes: { bg: 'var(--color-surface-hover)', text: 'var(--color-text-primary)' },
  custom: { bg: 'var(--color-primary-bg)', text: '#3730a3' },
};

const statusConfig: Record<SectionReview['status'], { label: string; color: string; bg: string; icon: string }> = {
  approved: { label: 'Approved', color: 'var(--color-success-fg)', bg: '#dcfce7', icon: '✓' },
  reviewed: { label: 'Reviewed', color: 'var(--color-text-primary)', bg: 'var(--color-surface-hover)', icon: '—' },
  changes_requested: { label: 'Changes Requested', color: 'var(--color-warning-fg)', bg: 'var(--color-warning-bg)', icon: '!' },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ReviewMode({
  sections,
  participants,
  userId,
  getSectionFragment,
  ydoc,
  provider,
  sectionReviews,
  reviewSection,
  comments,
  onAddComment,
  onResolveThread,
  onUnresolveThread,
  onSectionFocus,
}: ReviewModeProps) {
  // Track which sections have the "change review" form open
  const [changingReview, setChangingReview] = useState<Record<string, boolean>>({});

  // Count how many sections the current user has reviewed
  const reviewedByMe = sections.filter((s) => {
    const reviews = sectionReviews[s.id] ?? [];
    return reviews.some((r) => r.userId === userId);
  }).length;

  // Collect all unique reviewers across the document
  const allReviewers = new Map<string, { displayName: string; statuses: SectionReview['status'][] }>();
  for (const s of sections) {
    for (const r of sectionReviews[s.id] ?? []) {
      const entry = allReviewers.get(r.userId) ?? { displayName: r.displayName, statuses: [] };
      entry.statuses.push(r.status);
      allReviewers.set(r.userId, entry);
    }
  }

  const pct = sections.length > 0 ? Math.round((reviewedByMe / sections.length) * 100) : 0;

  if (sections.length === 0) {
    return (
      <div className={cn('text-center p-12 text-text-secondary text-[15px]')}>
        No sections to review.
      </div>
    );
  }

  return (
    <div data-testid="review-mode" className={cn('max-w-[800px] mx-auto')}>
      {/* Progress bar */}
      <div data-testid="review-progress" className={cn('mb-6')}>
        <div className={cn('text-[13px] text-text-secondary mb-1 flex justify-between')}>
          <span data-testid="review-progress-text">{reviewedByMe} of {sections.length} sections reviewed by you</span>
          <span data-testid="review-progress-pct">{pct}%</span>
        </div>
        <div className={cn('h-2 bg-surface-emphasis rounded overflow-hidden')}>
          <div
            className={cn('h-full rounded transition-[width] duration-300 ease-in-out', reviewedByMe === sections.length ? 'bg-success' : 'bg-info')}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Sections */}
      <div className={cn('flex flex-col gap-6')}>
        {sections.map((section) => {
          const fragment = getSectionFragment(section.id);
          const tc = typeBadgeColors[section.type] ?? typeBadgeColors.custom;
          const reviews = sectionReviews[section.id] ?? [];
          const myReview = reviews.find((r) => r.userId === userId);
          const otherReviews = reviews.filter((r) => r.userId !== userId);
          const sectionParticipants = participants.filter((p) => p.currentSectionId === section.id);
          const isChanging = changingReview[section.id] ?? false;

          return (
            <div
              key={section.id}
              id={`section-${section.id}`}
              data-testid={`review-section-${section.id}`}
              className={cn('bg-white border border-border rounded-lg p-5')}
              style={{
                borderLeft: myReview
                  ? `3px solid ${statusConfig[myReview.status].color}`
                  : '3px solid #d1d5db',
              }}
              onMouseEnter={() => onSectionFocus?.(section.id)}
            >
              {/* Header */}
              <div className={cn('flex items-center gap-2 mb-1')}>
                <h3 className={cn('text-lg font-bold m-0 text-text-primary flex-1')}>
                  {section.title}
                </h3>
                <span
                  className={cn('inline-block text-[11px] font-semibold py-0.5 px-2.5 rounded-full')}
                  style={{ background: tc.bg, color: tc.text }}
                >
                  {section.sectionType ?? section.type}
                </span>
              </div>

              {/* Rich-text content (read-only) */}
              {fragment && (
                <div className={cn(section.items.length > 0 ? 'mb-4' : 'mb-2')}>
                  <TiptapEditor
                    fragment={fragment}
                    ydoc={ydoc}
                    provider={provider}
                    user={{ name: '', color: '' }}
                    editable={false}
                    sectionId={section.id}
                  />
                </div>
              )}

              {/* No content */}
              {!fragment && section.items.length === 0 && (
                <div className={cn('py-4 text-text-tertiary text-sm text-center')}>
                  This section has no content.
                </div>
              )}

              {/* Task items list */}
              {section.items.length > 0 && (
                <div className={cn('mb-3')}>
                  {section.items.map((item) => {
                    const itemStatusColor =
                      item.status === 'acked' ? 'var(--color-success)' :
                      item.status === 'rejected' ? 'var(--color-danger)' :
                      item.status === 'done' ? 'var(--color-neutral)' : 'var(--color-text-tertiary)';
                    return (
                      <div key={item.id} className={cn('flex items-start gap-2 py-1.5 border-b border-border-subtle text-sm')}>
                        <span
                          className={cn('inline-block w-2 h-2 rounded-full mt-[5px] shrink-0')}
                          style={{ background: itemStatusColor }}
                        />
                        <div className={cn('flex-1')}>
                          <span className={cn('text-text-primary')}>{item.text}</span>
                          {item.assignee && (
                            <span className={cn('text-text-secondary text-xs ml-2')}>
                              — {item.assignee}
                            </span>
                          )}
                          {item.priority && item.priority !== 'medium' && (
                            <span
                              className={cn('text-[10px] font-semibold ml-1.5 px-1.5 py-px rounded', item.priority === 'high' ? 'bg-danger-bg text-danger-fg' : 'bg-success-bg text-success-fg')}
                            >
                              {item.priority}
                            </span>
                          )}
                        </div>
                        <span
                          className={cn('text-[11px] font-semibold capitalize shrink-0')}
                          style={{ color: itemStatusColor }}
                        >
                          {item.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Review action bar */}
              <div className={cn('flex items-center gap-2 pt-2.5 pb-1 border-t border-border-subtle flex-wrap')}>
                {(!myReview || isChanging) ? (
                  <>
                    <ReviewButton
                      testid={`section-${section.id}-review-reviewed`}
                      label="Mark Reviewed"
                      bg="#f3f4f6"
                      color="#374151"
                      hoverBg="#e5e7eb"
                      onClick={() => {
                        reviewSection(section.id, 'reviewed');
                        setChangingReview((prev) => ({ ...prev, [section.id]: false }));
                      }}
                    />
                    <ReviewButton
                      testid={`section-${section.id}-review-approved`}
                      label="Approve"
                      bg="#dcfce7"
                      color="#166534"
                      hoverBg="#bbf7d0"
                      onClick={() => {
                        reviewSection(section.id, 'approved');
                        setChangingReview((prev) => ({ ...prev, [section.id]: false }));
                      }}
                    />
                    <ReviewButton
                      testid={`section-${section.id}-review-changes-requested`}
                      label="Request Changes"
                      bg="#fef3c7"
                      color="#92400e"
                      hoverBg="#fde68a"
                      onClick={() => {
                        reviewSection(section.id, 'changes_requested');
                        setChangingReview((prev) => ({ ...prev, [section.id]: false }));
                      }}
                    />
                    {isChanging && (
                      <button
                        data-testid={`section-${section.id}-cancel-change`}
                        onClick={() => setChangingReview((prev) => ({ ...prev, [section.id]: false }))}
                        className={cn('bg-transparent border-none text-text-secondary text-xs cursor-pointer underline')}
                      >
                        Cancel
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <span
                      data-testid={`section-${section.id}-status`}
                      data-status={myReview.status}
                      className={cn('inline-flex items-center gap-1 text-[13px] font-semibold py-1 px-2.5 rounded-md')}
                      style={{ background: statusConfig[myReview.status].bg, color: statusConfig[myReview.status].color }}
                    >
                      <span className={cn('text-sm')}>{statusConfig[myReview.status].icon}</span>
                      {statusConfig[myReview.status].label}
                    </span>
                    <span className={cn('text-xs text-text-secondary')}>
                      by you &middot; {new Date(myReview.timestamp).toLocaleString(undefined, {
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                      })}
                    </span>
                    <button
                      data-testid={`section-${section.id}-change-review`}
                      onClick={() => setChangingReview((prev) => ({ ...prev, [section.id]: true }))}
                      className={cn('bg-transparent border-none text-info-fg text-xs cursor-pointer underline p-0')}
                    >
                      Change
                    </button>
                  </>
                )}

                {/* Other reviewers as avatar badges */}
                {otherReviews.length > 0 && (
                  <div className={cn('flex gap-1 ml-auto items-center')}>
                    {otherReviews.map((r) => {
                      const cfg = statusConfig[r.status];
                      const initials = r.displayName.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
                      return (
                        <div
                          key={r.userId}
                          title={`${r.displayName}: ${cfg.label}`}
                          className={cn('w-[26px] h-[26px] rounded-full flex items-center justify-center text-[10px] font-bold')}
                          style={{ background: cfg.bg, color: cfg.color, border: `2px solid ${cfg.color}` }}
                        >
                          {initials}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Viewing participants */}
                {sectionParticipants.length > 0 && (
                  <div className={cn('flex gap-1 items-center')} style={{ marginLeft: otherReviews.length > 0 ? 0 : 'auto' }}>
                    <span className={cn('text-[11px] text-text-tertiary')}>Viewing:</span>
                    {sectionParticipants.map((p) => (
                      <div
                        key={p.clientId}
                        title={p.displayName}
                        className={cn('w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-semibold')}
                        style={{ background: p.color }}
                      >
                        {p.displayName.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Comments */}
              {onAddComment && (
                <SectionComments
                  comments={comments?.[section.id] ?? []}
                  onAddComment={(text, parentCommentId) => onAddComment(section.id, text, parentCommentId)}
                  participants={participants}
                  onResolveThread={onResolveThread ? (commentId) => onResolveThread(section.id, commentId) : undefined}
                  onUnresolveThread={onUnresolveThread ? (commentId) => onUnresolveThread(section.id, commentId) : undefined}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Document review summary */}
      {allReviewers.size > 0 && (
        <div
          data-testid="review-summary"
          className={cn('mt-8 p-4 px-5 bg-surface-panel border border-border rounded-lg')}
        >
          <h4 className={cn('m-0 mb-3 text-sm font-bold text-text-secondary')}>
            Document Review Summary
          </h4>
          <div className={cn('flex flex-col gap-2')}>
            {Array.from(allReviewers.entries()).map(([uid, entry]) => {
              const approvedCount = entry.statuses.filter((s) => s === 'approved').length;
              const changesCount = entry.statuses.filter((s) => s === 'changes_requested').length;
              const reviewedCount = entry.statuses.filter((s) => s === 'reviewed').length;
              return (
                <div key={uid} className={cn('flex items-center gap-2.5 text-[13px]')}>
                  <span className={cn('font-semibold text-text-primary min-w-[100px]')}>
                    {entry.displayName}{uid === userId ? ' (you)' : ''}
                  </span>
                  <span className={cn('text-text-secondary')}>
                    {entry.statuses.length} of {sections.length} sections
                  </span>
                  {approvedCount > 0 && (
                    <span className={cn('text-[11px] px-2 py-px rounded bg-success-bg text-success-fg font-semibold')}>
                      {approvedCount} approved
                    </span>
                  )}
                  {reviewedCount > 0 && (
                    <span className={cn('text-[11px] px-2 py-px rounded bg-surface-hover text-text-primary font-semibold')}>
                      {reviewedCount} reviewed
                    </span>
                  )}
                  {changesCount > 0 && (
                    <span className={cn('text-[11px] px-2 py-px rounded bg-warning-bg text-warning-fg font-semibold')}>
                      {changesCount} changes requested
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Review button sub-component
// ---------------------------------------------------------------------------

function ReviewButton({ label, bg, color, hoverBg, onClick, testid }: {
  label: string;
  bg: string;
  color: string;
  hoverBg: string;
  onClick: () => void;
  testid?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      data-testid={testid}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn('py-1.5 px-3.5 text-[13px] font-semibold border border-transparent rounded-md cursor-pointer transition-colors duration-150')}
      style={{ background: hovered ? hoverBg : bg, color }}
    >
      {label}
    </button>
  );
}
