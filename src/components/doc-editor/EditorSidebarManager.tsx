// frontend/src/components/doc-editor/EditorSidebarManager.tsx
//
// Routes between the right sidebar panels: version history, my mentions/tasks,
// video history, and the fixed-position table of contents overlay.

import type { ViewMode, Section } from '../../types/document';
import type { Doc as YDoc } from 'yjs';
import type { UseVersionHistoryReturn } from '../../hooks/useVersionHistory';
import type { MyItem } from '../../hooks/useMyMentionsAndTasks';
import type { VideoSession } from '../../hooks/useVideoSessions';
import { cn } from '../../lib/cn';
import VersionHistoryPanel from './VersionHistoryPanel';
import MyMentionsPanel from './MyMentionsPanel';
import VideoHistoryPanel from './VideoHistoryPanel';
import TableOfContents from './TableOfContents';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface EditorSidebarManagerProps {
  // Panel visibility
  showHistory: boolean;
  showMyItems: boolean;
  showVideoHistory: boolean;
  closePanel: () => void;

  // Version history
  versionHistory: UseVersionHistoryReturn;
  ydoc: YDoc | null;

  // My items
  myItems: MyItem[];
  /**
   * Jump to an item in the document.
   *
   * `commentId` is not optional decoration — it is the ONLY landmark a canvas
   * has. A page-shaped document files its comments under an empty section id
   * (they are anchored to a text range instead), so a handler that reads only
   * the section id is inert on every page document.
   */
  onNavigateToSection: (sectionId: string, commentId?: string) => void;

  // Video history
  videoSessions: {
    sessions: VideoSession[];
    loading: boolean;
    fetchSessions: () => void;
  };

  // Table of contents
  showTOC: boolean;
  /**
   * True when the document is page-shaped (`meta.schemaVersion >= 2`).
   *
   * The TOC links to `#section-<id>` anchors that only the section renderers
   * emit. On a canvas those elements do not exist — the headings carry no ids
   * at all — so the panel was a list of dead links, and on a CONVERTED document
   * it listed the frozen pre-conversion headings, which is worse than empty.
   * `DocumentOutline` + `useDocumentOutline` are the canvas equivalent.
   */
  isCanvas?: boolean;
  commentSidebarOpen: boolean;
  sections: Section[];
  focusedSectionId: string | null;
  mode: ViewMode;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function EditorSidebarManager({
  showHistory,
  showMyItems,
  showVideoHistory,
  closePanel,
  versionHistory,
  ydoc,
  myItems,
  onNavigateToSection,
  videoSessions,
  showTOC,
  isCanvas = false,
  commentSidebarOpen,
  sections,
  focusedSectionId,
  mode,
}: EditorSidebarManagerProps) {
  return (
    <>
      {/* Version history sidebar */}
      {showHistory && (
        <VersionHistoryPanel
          versions={versionHistory.versions}
          loading={versionHistory.loading}
          previewTimestamp={versionHistory.previewTimestamp}
          onFetch={versionHistory.fetchVersions}
          onPreview={versionHistory.previewVersion}
          onClearPreview={versionHistory.clearPreview}
          onClose={closePanel}
          onSaveVersion={versionHistory.saveVersion}
          onCompare={versionHistory.compareVersion}
          onClearCompare={versionHistory.clearCompare}
          compareSections={versionHistory.compareSections}
          compareTimestamp={versionHistory.compareTimestamp}
          currentSections={ydoc ? versionHistory.extractSections(ydoc) : []}
          onRestore={versionHistory.restoreVersion}
        />
      )}

      {/* My mentions & tasks sidebar */}
      {showMyItems && (
        <MyMentionsPanel
          items={myItems}
          onNavigateToSection={onNavigateToSection}
          onClose={closePanel}
        />
      )}

      {/* Past video conversations panel */}
      {showVideoHistory && (
        <VideoHistoryPanel
          sessions={videoSessions.sessions}
          loading={videoSessions.loading}
          onFetch={videoSessions.fetchSessions}
          onClose={closePanel}
        />
      )}

      {/* Table of contents — fixed bottom-right */}
      {!isCanvas && showTOC && !commentSidebarOpen && sections.length > 1 && mode === 'editor' && (
        <div className={cn(
          'fixed bottom-4 right-4 w-40 max-h-[280px] overflow-y-auto',
          'bg-surface border border-border rounded-[10px] px-3 py-2.5',
          'shadow-[0_4px_16px_rgba(0,0,0,0.08)] z-30'
        )}>
          <TableOfContents
            sections={sections.map(s => ({ id: s.id, title: s.title }))}
            focusedSectionId={focusedSectionId}
          />
        </div>
      )}
    </>
  );
}
