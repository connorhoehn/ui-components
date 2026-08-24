// frontend/src/components/doc-editor/EditorModeSwitch.tsx
//
// Renders the mode-specific content area: finalized banner, empty-state demo
// loader, and routes between Editor / Review / Reader modes.

import type { RefObject } from 'react';
import type { ViewMode, Participant, Section, CommentThread, SectionReview } from '../../types/document';
import type { TaskItem } from '../../types/document';
import type { Doc as YDoc, XmlFragment } from 'yjs';
import type { CollaborationProvider } from './TiptapEditor';
import { cn } from '../../lib/cn';
import SectionList from './SectionList';
import AttachmentsPanel from './AttachmentsPanel';
import ReviewMode from './ReviewMode';
import ReaderMode from './ReaderMode';
import SectionComments from './SectionComments';
import { xmlFragmentToText } from './useDocumentEditorState';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface EditorModeSwitchProps {
  mode: ViewMode;
  isEmpty: boolean;
  isFinalized: boolean;
  sections: Section[];
  documentId: string;
  displayName: string;
  color: string;
  userId: string;

  // Editor mode
  ydoc: YDoc | null;
  provider: CollaborationProvider | null;
  getSectionFragment: (sectionId: string) => XmlFragment | null;
  updateSection: (sectionId: string, patch: Partial<Section>) => void;
  participants: Participant[];
  focusedSectionId: string | null;
  onSectionFocus: (sectionId: string) => void;
  comments: Record<string, CommentThread[]>;
  onAddComment: (sectionId: string, text: string, parentCommentId?: string | null) => void;
  onResolveThread: (sectionId: string, commentId: string) => void;
  onUnresolveThread: (sectionId: string, commentId: string) => void;
  onUpdateCursorInfo?: (name: string, color: string) => void;
  onOpenComments: (sectionId: string) => void;
  onAddItem: (sectionId: string, item: Omit<TaskItem, 'id'>) => void;
  onUpdateItem: (sectionId: string, itemId: string, patch: Partial<TaskItem>) => void;
  onRemoveItem: (sectionId: string, itemId: string) => void;
  restItems: Record<string, TaskItem[]>;
  /**
   * Per-section item-load failures from `useDocumentItems`, keyed by sectionId.
   * A section listed here failed to fetch its action items, which is NOT the
   * same as having none — without this the two render identically and the
   * reader is told "no items" for content that exists on the server.
   */
  itemErrors?: Record<string, string>;

  // Comment sidebar
  commentSidebarOpen: boolean;
  commentSectionId: string | null;
  commentSidebarTop: number;
  sectionListRef: RefObject<HTMLDivElement | null>;
  onCloseComments: () => void;

  // Video layout
  showVideoCall: boolean;
  isVideoDocked?: boolean;
  showInlineVideo: boolean;
  sidebarFixed: boolean;
  videoSpacerRef: RefObject<HTMLDivElement | null>;
  videoLeft: number;
  FIXED_TOP: number;

  // TOC
  showTOC: boolean;

  // Review mode
  sectionReviews: Record<string, SectionReview[]>;
  reviewSection: (sectionId: string, status: string, comment?: string) => void;

  // Reader mode
  headerMeta: import('../../types/document').DocumentMeta;

  // Demo loading
  onLoadDemo: () => void;

  // Activity
  activityPublish: (eventType: string, detail: Record<string, unknown>) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function EditorModeSwitch({
  mode,
  isEmpty,
  isFinalized,
  sections,
  documentId,
  displayName,
  color,
  userId,
  ydoc,
  provider,
  getSectionFragment,
  updateSection,
  participants,
  focusedSectionId,
  onSectionFocus,
  comments,
  onAddComment,
  onResolveThread,
  onUnresolveThread,
  onUpdateCursorInfo,
  onOpenComments,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  restItems,
  itemErrors,
  commentSidebarOpen,
  commentSectionId,
  commentSidebarTop,
  sectionListRef,
  onCloseComments,
  showVideoCall,
  isVideoDocked,
  showInlineVideo,
  sidebarFixed,
  videoSpacerRef,
  videoLeft,
  FIXED_TOP,
  showTOC,
  sectionReviews,
  reviewSection,
  headerMeta,
  onLoadDemo,
  activityPublish,
}: EditorModeSwitchProps) {
  const failedSectionIds = Object.keys(itemErrors ?? {});
  const failedSectionTitles = failedSectionIds.map(
    (id) => sections.find((s) => s.id === id)?.title || id,
  );

  return (
    <>
      {/* Item-load failures — distinguishes "could not load" from "none". */}
      {failedSectionTitles.length > 0 && (
        <div
          role="alert"
          data-testid="item-load-error-banner"
          className={cn(
            'rounded-lg border px-4 py-2.5 mb-3 text-[13px]',
            'bg-warning-bg border-warning-border text-warning-fg',
          )}
        >
          Action items could not be loaded for{' '}
          {failedSectionTitles.length === 1
            ? `"${failedSectionTitles[0]}"`
            : `${failedSectionTitles.length} sections: ${failedSectionTitles
                .map((t) => `"${t}"`)
                .join(', ')}`}
          . These sections may have items that are not shown.
        </div>
      )}
      {/* Read-only banner for finalized documents */}
      {isFinalized && mode === 'editor' && (
        <div className={cn(
          'rounded-lg border px-4 py-2.5 mb-3 text-center text-[13px] font-medium',
          'bg-warning-bg border-warning-border text-warning-fg'
        )}>
          This document has been finalized and is read-only
        </div>
      )}

      {/* Show demo loader when document is empty */}
      {isEmpty && (
        <div className="text-center py-12 px-4 text-text-secondary">
          <p className="text-lg mb-4">
            No document content yet.
          </p>
          <button
            onClick={onLoadDemo}
            className={cn(
              'px-6 py-2.5 text-[15px] font-semibold border-none rounded-lg',
              'bg-primary text-white cursor-pointer font-[inherit]'
            )}
          >
            Load Demo Document
          </button>
          <p className="text-[13px] mt-3 text-text-tertiary">
            Loads a sample Q2 Sprint Planning document with tasks, decisions, and notes.
          </p>
        </div>
      )}

      {/* Editor mode — centered content with inline comment sidebar */}
      {!isEmpty && mode === 'editor' && ydoc && (
        <div ref={sectionListRef} className="flex gap-4 relative min-w-0">

          {/* Left: video sidebar spacer */}
          {showVideoCall && !isVideoDocked && showInlineVideo && (
            <div ref={videoSpacerRef} className="w-[240px] shrink-0">
              <div
                id="inline-video-slot"
                className={cn(sidebarFixed && 'fixed z-30')}
                style={sidebarFixed ? { top: FIXED_TOP, left: videoLeft, width: 240 } : undefined}
              />
            </div>
          )}

          {/* Center: section content */}
          <div
            className={cn('flex-1 min-w-0', commentSidebarOpen ? 'pr-0' : showTOC && sections.length > 1 && mode === 'editor' ? 'pr-48' : 'pr-12')}
          >
            <SectionList
              sections={sections.map(s => {
                const yItems = s.items ?? [];
                const rItems = restItems[s.id] ?? [];
                const merged = [
                  ...yItems,
                  ...rItems.filter(r => !yItems.some(y => y.id === r.id)),
                ];
                return { ...s, items: merged };
              })}
              getSectionFragment={getSectionFragment}
              ydoc={ydoc}
              provider={provider}
              user={{ name: displayName, color }}
              editable={!isFinalized}
              onUpdateSection={updateSection}
              onAddItem={onAddItem}
              onUpdateItem={onUpdateItem}
              onRemoveItem={onRemoveItem}
              participants={participants}
              onSectionFocus={onSectionFocus}
              focusedSectionId={focusedSectionId}
              comments={comments}
              onAddComment={onAddComment}
              onResolveThread={onResolveThread}
              onUnresolveThread={onUnresolveThread}
              onUpdateCursorInfo={onUpdateCursorInfo}
              onOpenComments={onOpenComments}
            />

            <AttachmentsPanel documentId={documentId} editable={!isFinalized} />
          </div>

          {/* Right: inline comment sidebar */}
          {commentSidebarOpen && commentSectionId && (
            <div
              className={cn(
                'w-[420px] shrink-0 rounded-lg border border-border',
                'bg-surface-inset flex flex-col max-h-[calc(100vh-180px)] overflow-hidden'
              )}
              style={{ marginTop: commentSidebarTop }}
            >
              {/* Sidebar header */}
              <div className="flex items-center justify-between px-3.5 py-3 border-b border-border shrink-0">
                <div className="text-[13px] font-semibold text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap flex-1 mr-2">
                  {sections.find(s => s.id === commentSectionId)?.title ?? 'Comments'}
                </div>
                <button
                  type="button"
                  onClick={onCloseComments}
                  className={cn(
                    'border-none bg-transparent cursor-pointer',
                    'text-base text-neutral px-1.5 py-0.5 rounded leading-none shrink-0'
                  )}
                  title="Close comments"
                >
                  ✕
                </button>
              </div>

              {/* Sidebar body */}
              <div className="flex-1 overflow-y-auto px-3 py-3.5">
                <SectionComments
                  comments={comments[commentSectionId] ?? []}
                  onAddComment={(text, parentCommentId) => onAddComment(commentSectionId, text, parentCommentId)}
                  participants={participants}
                  onResolveThread={(commentId) => onResolveThread(commentSectionId, commentId)}
                  onUnresolveThread={(commentId) => onUnresolveThread(commentSectionId, commentId)}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Review (ack) mode */}
      {!isEmpty && mode === 'ack' && ydoc && (
        <ReviewMode
          sections={sections}
          participants={participants}
          userId={userId}
          getSectionFragment={getSectionFragment}
          ydoc={ydoc}
          provider={provider}
          sectionReviews={sectionReviews}
          reviewSection={(sectionId, status, comment) => {
            reviewSection(sectionId, status, comment);
            const section = sections.find(s => s.id === sectionId);
            activityPublish(`doc.review_${status}`, {
              sectionTitle: section?.title,
              status,
              documentId,
              documentTitle: headerMeta?.title,
            });
          }}
          comments={comments}
          onAddComment={onAddComment}
          onResolveThread={onResolveThread}
          onUnresolveThread={onUnresolveThread}
          onSectionFocus={onSectionFocus}
        />
      )}

      {/* Reader mode */}
      {!isEmpty && mode === 'reader' && ydoc && (
        <ReaderMode
          sections={sections}
          participants={participants}
          meta={headerMeta}
          commentCounts={Object.fromEntries(
            Object.entries(comments).map(([id, arr]) => [id, arr.length]),
          )}
          sectionContentTexts={Object.fromEntries(
            sections.map(s => {
              const frag = getSectionFragment(s.id);
              return [s.id, frag ? xmlFragmentToText(frag as { toString(): string }) : ''];
            }),
          )}
          comments={comments}
          getSectionFragment={getSectionFragment}
          ydoc={ydoc}
          provider={provider}
        />
      )}
    </>
  );
}
