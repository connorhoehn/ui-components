// frontend/src/components/doc-editor/ChunkViewer.tsx
//
// Renders a single section chunk for ack-mode review.

import type { XmlFragment } from 'yjs';
import * as Y from 'yjs';
import type { Section, CommentThread, Participant } from '../../types/document';
import TiptapEditor from './TiptapEditor';
import type { CollaborationProvider } from './TiptapEditor';
import ReviewableItem from './ReviewableItem';
import SectionComments from './SectionComments';
import { cn } from '../../lib/cn';

interface ChunkViewerProps {
  section: Section;
  onAckItem: (itemId: string, notes?: string) => void;
  onRejectItem: (itemId: string, reason: string) => void;
  fragment: XmlFragment | null;
  ydoc: Y.Doc;
  provider: CollaborationProvider | null;
  comments?: CommentThread[];
  onAddComment?: (text: string, parentCommentId?: string | null) => void;
  onResolveThread?: (commentId: string) => void;
  onUnresolveThread?: (commentId: string) => void;
  participants?: Participant[];
}

const typeBadgeColors: Record<Section['type'], { bg: string; text: string }> = {
  summary: { bg: '#dbeafe', text: '#1e40af' },
  tasks: { bg: '#fef3c7', text: '#92400e' },
  decisions: { bg: '#ede9fe', text: '#5b21b6' },
  notes: { bg: '#f3f4f6', text: '#374151' },
  custom: { bg: '#e0e7ff', text: '#3730a3' },
};

export default function ChunkViewer({ section, onAckItem, onRejectItem, fragment, ydoc, provider, comments, onAddComment, onResolveThread, onUnresolveThread, participants }: ChunkViewerProps) {
  const tc = typeBadgeColors[section.type] ?? typeBadgeColors.custom;
  const reviewed = section.items.filter((i) => i.status !== 'pending').length;

  return (
    <div className={cn('bg-white border border-border rounded-lg p-5 mb-4')}>
      <h2 className={cn('text-xl font-bold m-0 mb-1 text-text-primary')}>{section.title}</h2>
      <span
        className={cn('inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3')}
        style={{ background: tc.bg, color: tc.text }}
      >
        {section.type}
      </span>

      {/* Rich-text content (read-only) */}
      {fragment && (
        <div className={cn(section.items.length > 0 ? 'mb-4' : '')}>
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

      {/* No content at all */}
      {!fragment && section.items.length === 0 && (
        <div className={cn('py-6 text-text-tertiary text-sm text-center')}>
          This {section.type} section has no content. Switch to Editor mode to add content.
        </div>
      )}

      {section.items.length > 0 && (
        <div>
          {section.items.map((item) => (
            <ReviewableItem
              key={item.id}
              item={item}
              onAck={(notes) => onAckItem(item.id, notes)}
              onReject={(reason) => onRejectItem(item.id, reason)}
            />
          ))}
          <div className={cn('text-xs text-text-secondary mt-3 pt-2 border-t border-border-subtle')}>
            {reviewed} of {section.items.length} items reviewed
          </div>
        </div>
      )}

      {onAddComment && (
        <SectionComments
          comments={comments ?? []}
          onAddComment={onAddComment}
          participants={participants}
          onResolveThread={onResolveThread}
          onUnresolveThread={onUnresolveThread}
        />
      )}
    </div>
  );
}
