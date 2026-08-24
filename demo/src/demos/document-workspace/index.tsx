import { useState, useEffect, useCallback } from 'react';
import { SimulatedProvider } from '../../engine/SimulatedProvider';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';
import { documentCollaborationTimeline } from './simulation';
import { mockDocument } from './MockDocuments';
import { DocumentHeader } from './DocumentHeader';
import { SectionBlock } from './SectionBlock';
import { CommentsSidebar } from './CommentsSidebar';
import { TableOfContents } from './TableOfContents';

interface Comment {
  id: string;
  userId: string;
  displayName: string;
  text: string;
  timestamp: number;
}

interface SectionState {
  id: string;
  title: string;
  type: string;
  collapsed: boolean;
  content: string;
}

function DocumentWorkspaceInner() {
  const { onMessage } = useWebSocketContext();
  const [activeMode, setActiveMode] = useState('Editor');
  const [sections, setSections] = useState<SectionState[]>(
    mockDocument.sections.map((s) => ({
      id: s.id,
      title: s.title,
      type: s.type,
      collapsed: s.collapsed,
      content: s.content,
    }))
  );
  const [commentsSectionId, setCommentsSectionId] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [remoteTexts, setRemoteTexts] = useState<Record<string, string>>({});
  const [activeTocSection, setActiveTocSection] = useState<string | null>('s1');

  // Subscribe to simulation events
  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      if (msg.type === 'document' && msg.action === 'text.insert') {
        // Append remote text to the section that's being edited (first expanded section)
        const text = msg.text as string;
        setRemoteTexts((prev) => {
          const sectionId = 's1'; // Alice is typing in the first section
          return { ...prev, [sectionId]: (prev[sectionId] || '') + text };
        });
      }

      if (msg.type === 'document' && msg.action === 'comment.added') {
        const comment: Comment = {
          id: msg.commentId as string,
          userId: msg.userId as string,
          displayName: msg.displayName as string,
          text: msg.text as string,
          timestamp: Date.now(),
        };
        // Add comment to the first section (where the text selection is)
        setComments((prev) => ({
          ...prev,
          s1: [...(prev['s1'] || []), comment],
        }));
      }
    });

    return unsubscribe;
  }, [onMessage]);

  const handleToggleCollapse = useCallback((sectionId: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, collapsed: !s.collapsed } : s))
    );
  }, []);

  const handleCommentClick = useCallback((sectionId: string) => {
    setCommentsSectionId((prev) => (prev === sectionId ? null : sectionId));
    setActiveTocSection(sectionId);
  }, []);

  const handleCloseComments = useCallback(() => {
    setCommentsSectionId(null);
  }, []);

  const handlePostComment = useCallback(
    (text: string) => {
      if (!commentsSectionId) return;
      const newComment: Comment = {
        id: `local-${Date.now()}`,
        userId: 'demo-user',
        displayName: 'Demo User',
        text,
        timestamp: Date.now(),
      };
      setComments((prev) => ({
        ...prev,
        [commentsSectionId]: [...(prev[commentsSectionId] || []), newComment],
      }));
    },
    [commentsSectionId]
  );

  const commentsSectionTitle = commentsSectionId
    ? sections.find((s) => s.id === commentsSectionId)?.title || ''
    : '';

  return (
    <div className="flex h-full flex-col bg-surface-panel font-sans">
      <DocumentHeader
        title={mockDocument.title}
        status={mockDocument.status}
        lastEditedAgo={mockDocument.lastEditedAgo}
        activeMode={activeMode}
        onModeChange={setActiveMode}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-8 pt-6 pb-20">
          {sections.map((section) => (
            <SectionBlock
              key={section.id}
              id={section.id}
              title={section.title}
              type={section.type}
              collapsed={section.collapsed}
              content={section.content}
              onToggleCollapse={handleToggleCollapse}
              onCommentClick={handleCommentClick}
              remoteText={remoteTexts[section.id]}
            />
          ))}
        </div>
        {commentsSectionId && (
          <CommentsSidebar
            sectionTitle={commentsSectionTitle}
            comments={comments[commentsSectionId] || []}
            onClose={handleCloseComments}
            onPost={handlePostComment}
          />
        )}
      </div>
      <TableOfContents
        sections={sections.map((s) => ({ id: s.id, title: s.title }))}
        activeSectionId={activeTocSection}
      />
    </div>
  );
}

export default function DocumentWorkspaceDemo() {
  return (
    <SimulatedProvider timeline={documentCollaborationTimeline} autoPlay>
      <DocumentWorkspaceInner />
    </SimulatedProvider>
  );
}
