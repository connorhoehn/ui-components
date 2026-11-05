// frontend/src/components/doc-editor/SectionBlock.tsx
//
// Renders a single document section with header, rich-text editor, and task list.
// Includes presence-aware left border, avatar stack, and focus glow.

import { useState } from 'react';
import type { XmlFragment } from 'yjs';
import * as Y from 'yjs';
import type { Section, TaskItem, Participant } from '../../types/document';
import type { CollaborationProvider } from './TiptapEditor';
import { getRenderer } from '../../renderers';
import DefaultRenderer from '../../renderers/default/DefaultRenderer';
import type { CommentThread } from '../../types/document';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import { ErrorBoundary } from '../misc/ErrorBoundary';

export interface SectionBlockProps {
  section: Section;
  fragment: XmlFragment | null;
  ydoc: Y.Doc;
  provider: CollaborationProvider | null;
  user: { name: string; color: string };
  editable: boolean;
  onUpdateSection: (patch: Partial<Section>) => void;
  onAddItem: (item: Omit<TaskItem, 'id'>) => void;
  onUpdateItem: (itemId: string, patch: Partial<TaskItem>) => void;
  onRemoveItem: (itemId: string) => void;
  participants?: Participant[];
  onFocus?: () => void;
  isFocused?: boolean;
  comments?: CommentThread[];
  onAddComment?: (text: string, parentCommentId?: string | null) => void;
  onResolveThread?: (commentId: string) => void;
  onUnresolveThread?: (commentId: string) => void;
  /** Merge-safe awareness updater for Tiptap cursor info. */
  onUpdateCursorInfo?: (name: string, color: string) => void;
  /** Number of comments for this section (used for badge on comment icon). */
  commentCount?: number;
  /** Called when the user clicks the comment icon to open the sidebar. */
  onOpenComments?: (sectionId: string) => void;
  /** Participants who currently have comments open for this section. */
  commentPresence?: Participant[];
}

const typeColors: Record<Section['type'], string> = {
  summary: '#8b5cf6',
  tasks: '#3b82f6',
  decisions: '#f59e0b',
  notes: '#6b7280',
  custom: '#10b981',
};

/* ---- helpers ------------------------------------------------------------ */

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/* ---- avatar stack ------------------------------------------------------- */

const MAX_VISIBLE_AVATARS = 3;

function AvatarStack({ participants }: { participants: Participant[] }) {
  if (!participants || participants.length === 0) return null;

  const visible = participants.slice(0, MAX_VISIBLE_AVATARS);
  const overflow = participants.length - MAX_VISIBLE_AVATARS;

  return (
    <div className={cn('flex items-center ml-auto shrink-0')}>
      {visible.map((p, i) => (
        <div
          key={p.clientId}
          title={`${p.displayName} (${p.mode})`}
          className={cn('w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold border-2 border-white relative transition-transform duration-200')}
          style={{
            background: `linear-gradient(135deg, ${p.color || '#3b82f6'}, ${darkenHex(p.color || '#3b82f6', 0.2)})`,
            marginLeft: i === 0 ? 0 : -8,
            zIndex: MAX_VISIBLE_AVATARS - i,
          }}
        >
          {getInitials(p.displayName)}
          {/* Online presence dot */}
          <div className={cn('absolute bottom-0 right-0 w-2 h-2 rounded-full bg-success border-2 border-white')} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn('w-6 h-6 rounded-full bg-border text-neutral flex items-center justify-center text-[9px] font-bold border-2 border-white relative -ml-2')}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}

function darkenHex(hex: string, amount: number): string {
  const h = hex.replace('#', '');
  const num = parseInt(h, 16);
  const r = Math.max(0, ((num >> 16) & 0xff) * (1 - amount));
  const g = Math.max(0, ((num >> 8) & 0xff) * (1 - amount));
  const b = Math.max(0, (num & 0xff) * (1 - amount));
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

/* ---- component ---------------------------------------------------------- */

/**
 * @deprecated Part of the legacy SECTIONED document editor, which is deprecated
 * (2026-09-22). New documents are pages — use the page editor (`CanvasDocumentView`); decks use
 * `PresentationView`, whiteboards the diagram surface. Kept so existing
 * sectioned documents still open until they are converted to a page.
 */
export default function SectionBlock({
  section,
  fragment,
  ydoc,
  provider,
  user,
  editable,
  onUpdateSection,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  participants,
  onFocus,
  isFocused,
  comments,
  onUpdateCursorInfo,
  commentCount = 0,
  onOpenComments,
  commentPresence,
}: SectionBlockProps) {
  const [collapsed, setCollapsed] = useState(section.collapsed);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    onUpdateSection({ collapsed: next });
  };

  const Renderer = getRenderer(section.sectionType ?? section.type, 'editor') ?? DefaultRenderer;

  // Presence-aware left border: pick first participant's color or none
  const hasPresence = participants && participants.length > 0;
  const presenceBorderColor = hasPresence ? (participants![0].color || '#3b82f6') : 'transparent';

  const [commentHovered, setCommentHovered] = useState(false);

  return (
    <div
      id={`section-${section.id}`}
      data-testid={`section-block-${section.id}`}
      className={cn('border border-border rounded-lg mb-4 bg-surface relative transition-[border-left,box-shadow] duration-300 ease-in-out')}
      style={{
        borderLeft: hasPresence ? `3px solid ${presenceBorderColor}` : '1px solid #e2e8f0',
        boxShadow: isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.3)' : 'none',
      }}
      onClickCapture={onFocus}
      onFocusCapture={onFocus}
    >
      {/* Comment icon button — top-right of section card */}
      {onOpenComments && (
        <button
          data-ui-part=""
          type="button"
          onClick={(e) => { e.stopPropagation(); onOpenComments(section.id); }}
          onMouseEnter={() => setCommentHovered(true)}
          onMouseLeave={() => setCommentHovered(false)}
          className={cn(
            'absolute top-1/2 -right-[52px] -translate-y-1/2 w-10 h-10 rounded-full border border-border flex items-center justify-center text-xl leading-none p-0 z-[1] shadow-sm cursor-pointer transition-[opacity,background] duration-150 ease-in-out',
            commentHovered ? 'bg-surface-hover opacity-90' : 'bg-surface opacity-40',
          )}
          title="Open comments"
        >
          <span className={cn('pointer-events-none')}>💬</span>
          {/* Badge count */}
          {commentCount > 0 && (
            <span className={cn('absolute -top-1 -right-1 min-w-[16px] h-4 rounded-lg bg-info text-white text-[10px] font-bold flex items-center justify-center px-1 leading-none')}>
              {commentCount}
            </span>
          )}
          {/* Presence dots for users with comments open */}
          {commentPresence && commentPresence.length > 0 && (
            <span className={cn('absolute -left-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5')}>
              {commentPresence.slice(0, 3).map((p) => (
                <span
                  key={p.clientId}
                  title={p.displayName}
                  className={cn('w-2 h-2 rounded-full border border-white block')}
                  style={{ background: p.color || '#3b82f6' }}
                />
              ))}
            </span>
          )}
        </button>
      )}
      <div className={cn('flex items-center gap-2 py-2.5 px-3.5 bg-surface-panel border-b border-border rounded-t-lg')}>
        <button
          data-ui-part=""
          type="button"
          onClick={toggleCollapse}
          className={cn(
            'border-none bg-transparent cursor-pointer text-xs p-1 text-neutral leading-none rounded inline-flex items-center justify-center transition-[background,transform] duration-200 ease-in-out hover:bg-border',
            collapsed ? '-rotate-90' : 'rotate-0',
          )}
          title={collapsed ? 'Expand section' : 'Collapse section'}
        >
          {/* Chevron down SVG — rotated -90deg when collapsed */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Inline section-title editor — chrome stripped so it reads as a
            heading until focused. */}
        <Input
          value={section.title}
          onChange={(e) => onUpdateSection({ title: e.target.value })}
          readOnly={!editable}
          className={cn('flex-1 h-auto border-transparent bg-transparent text-[15px] font-semibold py-0.5 px-1.5 cursor-text')}
        />

        <span
          className={cn('py-0.5 px-2.5 text-[11px] font-semibold rounded-xl text-white capitalize whitespace-nowrap')}
          style={{ background: typeColors[section.type] }}
        >
          {section.type}
        </span>

        <AvatarStack participants={participants ?? []} />
      </div>

      {!collapsed && (
        <div className={cn('p-3.5')}>
          {/*
            Section renderers are handed data straight off the CRDT / the host
            API, so a single malformed item (an unknown status, a missing
            `items` array, a null entry) can make one renderer throw. Without a
            boundary here that throw unmounts SectionList and the *whole
            document* goes blank — every other, well-formed section is lost with
            it. Scoping the boundary to this one section keeps the damage to the
            row that actually has bad data.
          */}
          <ErrorBoundary name={`section:${section.id}`}>
            <Renderer
              section={section}
              viewMode="editor"
              editable={editable}
              fragment={fragment}
              ydoc={ydoc}
              provider={provider}
              user={user}
              onUpdateSection={onUpdateSection}
              onAddItem={onAddItem}
              onUpdateItem={onUpdateItem}
              onRemoveItem={onRemoveItem}
              participants={participants}
              onUpdateCursorInfo={onUpdateCursorInfo}
              comments={comments}
              commentCount={commentCount}
              onOpenComments={onOpenComments}
            />
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
}
