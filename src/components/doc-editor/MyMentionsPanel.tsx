// frontend/src/components/doc-editor/MyMentionsPanel.tsx
//
// Slide-out sidebar showing the current user's @mentions and assigned tasks.

import { useState } from 'react';
import type { MyItem, MentionItem, TaskAssignment } from '../../hooks/useMyMentionsAndTasks';
import { Panel, PanelHeader, PanelBody, Button } from '../ui/Panel';
import { cn } from '../../lib/cn';
import { onActivationKey } from '../../lib/activationKey';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface MyMentionsPanelProps {
  items: MyItem[];
  onNavigateToSection: (sectionId: string) => void;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatRelativeTime(isoOrMs: string | number): string {
  const ms = typeof isoOrMs === 'number' ? isoOrMs : Date.now() - new Date(isoOrMs).getTime();
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;

  const months = Math.floor(days / 30);
  return `${months} month${months !== 1 ? 's' : ''} ago`;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function MentionRow({
  item,
  onClick,
  onDismiss,
}: {
  item: MentionItem;
  onClick: () => void;
  onDismiss: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      className={cn('flex gap-2.5 py-2.5 px-4 cursor-pointer border-b border-border-subtle items-start hover:bg-surface-inset')}
      onClick={onClick}
      // Space must preventDefault or the panel scrolls instead of navigating.
      onKeyDown={onActivationKey(onClick)}
    >
      <div
        className={cn('w-7 h-7 rounded-full text-white text-[11px] font-semibold flex items-center justify-center shrink-0')}
        style={{ background: item.authorColor }}
      >
        {getInitials(item.authorName)}
      </div>
      <div className={cn('flex-1 min-w-0')}>
        <div className={cn('text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap')}>{item.commentText}</div>
        <div className={cn('text-[11px] text-text-tertiary mt-0.5')}>{item.sectionTitle}</div>
      </div>
      <div className={cn('text-[11px] text-text-tertiary shrink-0 mt-0.5')}>{formatRelativeTime(item.timestamp)}</div>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onDismiss(); }}
        aria-label="Dismiss mention"
        className={cn('px-1.5 py-0.5 text-[13px] text-text-tertiary bg-transparent border-none cursor-pointer leading-none shrink-0')}
      >
        x
      </button>
    </div>
  );
}

function TaskRow({
  item,
  onClick,
  onDismiss,
}: {
  item: TaskAssignment;
  onClick: () => void;
  onDismiss: () => void;
}) {
  const dotColors: Record<string, string> = {
    high: 'var(--color-danger)',
    medium: 'var(--color-warning)',
    low: 'var(--color-success)',
  };

  const badgeColors: Record<string, { bg: string; text: string }> = {
    pending: { bg: 'var(--color-warning-bg)', text: 'var(--color-warning-fg)' },
    acked: { bg: 'var(--color-info-bg)', text: 'var(--color-info-fg)' },
    done: { bg: 'var(--color-success-bg)', text: 'var(--color-success-fg)' },
    rejected: { bg: 'var(--color-danger-bg)', text: 'var(--color-danger-fg)' },
  };

  const bc = badgeColors[item.status] ?? badgeColors.pending;

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn('flex gap-2.5 py-2.5 px-4 cursor-pointer border-b border-border-subtle items-start hover:bg-surface-inset')}
      onClick={onClick}
      // Space must preventDefault or the panel scrolls instead of navigating.
      onKeyDown={onActivationKey(onClick)}
    >
      <div
        className={cn('w-2 h-2 rounded-full shrink-0 mt-1')}
        style={{ background: dotColors[item.priority] ?? 'var(--color-text-tertiary)' }}
      />
      <div className={cn('flex-1 min-w-0')}>
        <div className={cn('text-[13px] text-text-primary overflow-hidden text-ellipsis whitespace-nowrap')}>
          {item.taskText}
          <span
            className={cn('inline-block text-[10px] font-semibold px-1.5 py-px rounded-full ml-1.5')}
            style={{ background: bc.bg, color: bc.text }}
          >
            {item.status}
          </span>
        </div>
        <div className={cn('text-[11px] text-text-tertiary mt-0.5')}>{item.sectionTitle}</div>
      </div>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onDismiss(); }}
        aria-label="Dismiss task"
        className={cn('px-1.5 py-0.5 text-[13px] text-text-tertiary bg-transparent border-none cursor-pointer leading-none shrink-0')}
      >
        x
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type FilterTab = 'all' | 'mentions' | 'tasks';

export default function MyMentionsPanel({
  items,
  onNavigateToSection,
  onClose,
}: MyMentionsPanelProps) {
  const [filter, setFilter] = useState<FilterTab>('all');
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const dismissItem = (id: string) => {
    setDismissed(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const clearAll = () => {
    const allIds = filtered.map(item => item.kind === 'mention' ? item.commentId : item.itemId);
    setDismissed(prev => {
      const next = new Set(prev);
      allIds.forEach(id => next.add(id));
      return next;
    });
  };

  const filtered = items.filter((item) => {
    const id = item.kind === 'mention' ? item.commentId : item.itemId;
    if (dismissed.has(id)) return false;
    if (filter === 'all') return true;
    if (filter === 'mentions') return item.kind === 'mention';
    return item.kind === 'task';
  });

  return (
    <Panel width={340}>
      <PanelHeader
        title="My Mentions &amp; Tasks"
        onClose={onClose}
        actions={
          filtered.length > 0 ? (
            <Button variant="default" size="sm" onClick={clearAll}>
              Clear all
            </Button>
          ) : undefined
        }
      />

      {/* Filter tabs */}
      <div className={cn('flex gap-0 border-b border-border shrink-0')}>
        {(['all', 'mentions', 'tasks'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            className={cn(
              'flex-1 py-2 text-[13px] bg-transparent border-none cursor-pointer font-[inherit]',
              filter === tab
                ? 'font-semibold text-primary border-b-2 border-b-primary'
                : 'font-normal text-text-secondary border-b-2 border-b-transparent',
            )}
            onClick={() => setFilter(tab)}
          >
            {tab === 'all' ? 'All' : tab === 'mentions' ? 'Mentions' : 'Tasks'}
          </button>
        ))}
      </div>

      {/* Item list */}
      <PanelBody padding="0.5rem 0">
        {filtered.length === 0 && (
          <div className={cn('py-8 px-4 text-center text-text-tertiary text-[13px]')}>No mentions or tasks for you</div>
        )}

        {filtered.map((item) =>
          item.kind === 'mention' ? (
            <MentionRow
              key={item.commentId}
              item={item}
              onClick={() => onNavigateToSection(item.sectionId)}
              onDismiss={() => dismissItem(item.commentId)}
            />
          ) : (
            <TaskRow
              key={item.itemId}
              item={item}
              onClick={() => onNavigateToSection(item.sectionId)}
              onDismiss={() => dismissItem(item.itemId)}
            />
          ),
        )}
      </PanelBody>
    </Panel>
  );
}
