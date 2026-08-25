// frontend/src/renderers/tasks/TasksReaderRenderer.tsx
//
// Reader-mode renderer for sectionType='tasks'.
// Compact status-grouped list for individual section cards.
// Supports inline status updates when onUpdateItem is provided.

import { useState } from 'react';
import { cn } from '../../lib/cn';
import { isBeforeToday, parseIsoDateLocal } from '../../lib/dateOnly';
import type { TaskItem } from '../../types/document';
import type { SectionRendererProps } from '../types';
import { sectionItems } from '../sectionItems';

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: 'var(--color-warning-fg)', bg: 'var(--color-warning-bg)' },
  acked:   { label: 'Acked',   color: 'var(--color-info-fg)', bg: 'var(--color-info-bg)' },
  done:    { label: 'Done',    color: 'var(--color-success-fg)', bg: 'var(--color-success-bg)' },
  rejected:{ label: 'Rejected',color: 'var(--color-danger-fg)', bg: 'var(--color-danger-bg)' },
};

const PRIORITY_COLORS: Record<string, string> = {
  high:   'var(--color-danger)',
  medium: 'var(--color-caution)',
  low:    'var(--color-text-tertiary)',
};

// `TaskItem.dueDate` is a bare `YYYY-MM-DD`, which `new Date()` parses as UTC
// midnight. Rendering or comparing that against the LOCAL clock shifted an item
// due "2026-08-16" to "Aug 15" — and flagged it overdue — for every viewer west
// of Greenwich. Editor mode (`doc-editor/TaskItemRow`) had the same two helpers
// with the same defect, so switching modes showed the same wrong day and hid it.
function isOverdue(iso: string): boolean {
  return isBeforeToday(iso);
}

function formatDate(iso: string): string {
  const d = parseIsoDateLocal(iso);
  if (!d) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getInitials(name: string): string {
  return name.split(/\s+/).map(w => w[0] ?? '').join('').toUpperCase().slice(0, 2);
}

interface ItemRowProps {
  item: TaskItem;
  onUpdateItem?: (id: string, patch: Partial<TaskItem>) => void;
}

function ItemRow({ item, onUpdateItem }: ItemRowProps) {
  const [hovered, setHovered] = useState(false);
  // The quick-update dropdown below used to be gated on `hovered` alone, so
  // it was never in the DOM unless a mouse was over the row — a keyboard user
  // could never Tab to it and had no way to set a status other than
  // done/pending. Focus anywhere in the row reveals it too now.
  const [focusWithin, setFocusWithin] = useState(false);
  const showQuickUpdate = hovered || focusWithin;
  // `item.status` / `item.priority` arrive from the CRDT and from persisted
  // documents, so they can hold a value this build does not know (a newer
  // schema, a partially-synced item). Before the fallbacks, an unrecognised
  // status made `meta.color` throw and took down the whole section.
  const meta = STATUS_META[item.status] ?? STATUS_META.pending;
  const priorityColor = PRIORITY_COLORS[item.priority] ?? PRIORITY_COLORS.medium;
  const overdue = item.dueDate && item.status === 'pending' ? isOverdue(item.dueDate) : false;
  const isDone = item.status === 'done' || item.status === 'acked';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // onFocus/onBlur are focusin/focusout in React, so they fire for the
      // status toggle and for the dropdown itself. The `contains` guard keeps
      // the dropdown mounted while focus moves into it — unmounting a focused
      // <select> would drop focus to <body>.
      onFocus={() => setFocusWithin(true)}
      onBlur={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
        setFocusWithin(false);
      }}
      className="flex items-center gap-2 py-1.5 border-b border-border-subtle"
      style={{ opacity: isDone ? 0.65 : 1 }}
    >
      {/* Priority dot */}
      <span
        title={`Priority: ${item.priority}`}
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: priorityColor,
          flexShrink: 0,
        }}
      />

      {/* Status toggle */}
      <button
        type="button"
        title={`Status: ${item.status}${onUpdateItem ? ' — click to toggle done' : ''}`}
        onClick={() => {
          if (!onUpdateItem) return;
          const next: TaskItem['status'] = item.status === 'done' ? 'pending' : 'done';
          onUpdateItem(item.id, { status: next });
        }}
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          border: `2px solid ${meta.color}`,
          background: isDone ? meta.color : 'transparent',
          cursor: onUpdateItem ? 'pointer' : 'default',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        {isDone && (
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
            <polyline points="2,5 4,7.5 8,2.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Text */}
      <span className={cn('flex-1 text-[13px] leading-[1.4]', isDone ? 'text-text-tertiary line-through' : 'text-text-primary')}>
        {item.text || <span className="text-text-disabled italic">Untitled item</span>}
      </span>

      {/* Assignee */}
      {item.assignee && (
        <span
          title={item.assignee}
          className="w-[22px] h-[22px] rounded-full bg-primary-bg text-primary-fg text-[9px] font-bold flex items-center justify-center shrink-0"
        >
          {getInitials(item.assignee)}
        </span>
      )}

      {/* Due date */}
      {item.dueDate && (
        <span style={{
          fontSize: 10,
          fontWeight: 600,
          padding: '1px 6px',
          borderRadius: 10,
          background: overdue ? 'var(--color-danger-bg)' : 'var(--color-info-bg)',
          color: overdue ? 'var(--color-danger)' : 'var(--color-neutral)',
          border: overdue ? '1px solid var(--color-danger-border)' : '1px solid var(--color-info-border)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {overdue ? '⚠ ' : ''}{formatDate(item.dueDate)}
        </span>
      )}

      {/* Quick-update dropdown — revealed on hover *or* keyboard focus */}
      {onUpdateItem && showQuickUpdate && (
        <select
          aria-label={`Set status for ${item.text || 'untitled item'}`}
          value={item.status}
          onChange={(e) => onUpdateItem(item.id, { status: e.target.value as TaskItem['status'] })}
          onClick={(e) => e.stopPropagation()}
          style={{
            fontSize: 10,
            padding: '1px 4px',
            borderRadius: 6,
            border: `1px solid ${meta.color}`,
            background: meta.bg,
            color: meta.color,
            fontWeight: 600,
            cursor: 'pointer',
            outline: 'none',
            fontFamily: 'inherit',
            flexShrink: 0,
          }}
        >
          <option value="pending">pending</option>
          <option value="acked">acked</option>
          <option value="done">done</option>
          <option value="rejected">rejected</option>
        </select>
      )}
    </div>
  );
}

export default function TasksReaderRenderer({ section, onUpdateItem, onNavigateToEditor }: SectionRendererProps) {
  const items = sectionItems(section);

  if (items.length === 0) {
    return (
      <div className="text-text-tertiary italic text-[13px] py-1">
        No items.
      </div>
    );
  }

  // Exhaustive by construction: the three groups used to be three positive
  // filters, so an item whose status was none of the four known values matched
  // no group and vanished from the list without a trace. Anything not
  // explicitly done/acked/rejected is treated as outstanding.
  const done     = items.filter(i => i.status === 'done' || i.status === 'acked');
  const rejected = items.filter(i => i.status === 'rejected');
  const pending  = items.filter(i => !done.includes(i) && !rejected.includes(i));

  return (
    <div>
      {pending.length > 0 && (
        <div className="mb-1">
          {pending.map(item => (
            <ItemRow key={item.id} item={item} onUpdateItem={onUpdateItem} />
          ))}
        </div>
      )}
      {done.length > 0 && (
        <div className="mb-1">
          {done.map(item => (
            <ItemRow key={item.id} item={item} onUpdateItem={onUpdateItem} />
          ))}
        </div>
      )}
      {rejected.length > 0 && (
        <div>
          {rejected.map(item => (
            <ItemRow key={item.id} item={item} onUpdateItem={onUpdateItem} />
          ))}
        </div>
      )}

      {onNavigateToEditor && (
        <button
          type="button"
          onClick={() => onNavigateToEditor(section.id)}
          className="mt-1.5 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit"
        >
          Edit in editor →
        </button>
      )}
    </div>
  );
}
