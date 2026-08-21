// frontend/src/components/doc-editor/TaskItemRow.tsx
//
// A single task item row with checkbox, text input, and metadata badges.

import { useState, useRef, useEffect, useCallback } from 'react';
import type { TaskItem } from '../../types/document';
import { DEV_USERS, findUserByName } from '../../data/userDirectory';
import type { DirectoryUser } from '../../data/userDirectory';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import { Checkbox } from '../forms/Checkbox';

export interface TaskItemRowProps {
  item: TaskItem;
  editable: boolean;
  onUpdate: (patch: Partial<TaskItem>) => void;
  onRemove: () => void;
  /** When true, auto-focus the text input on mount. */
  autoFocusText?: boolean;
  /** Called after auto-focus completes so parent can reset the flag. */
  onDidAutoFocus?: () => void;
}

const statusColors: Record<TaskItem['status'], string> = {
  pending: 'var(--color-text-tertiary)',
  acked: 'var(--color-info)',
  done: 'var(--color-success)',
  rejected: 'var(--color-danger)',
};

const priorityColors: Record<TaskItem['priority'], string> = {
  low: 'var(--color-text-tertiary)',
  medium: 'var(--color-caution)',
  high: 'var(--color-danger)',
};

const categoryColors: Record<string, string> = {
  start: 'var(--color-success)',
  stop: 'var(--color-danger)',
  continue: 'var(--color-info)',
};

/** Format an ISO date string as a short label like "Apr 15". */
function formatDueDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/** Return true if the ISO date is in the past (ignoring time). */
function isOverdue(iso: string): boolean {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function TaskItemRow({ item, editable, onUpdate, onRemove, autoFocusText, onDidAutoFocus }: TaskItemRowProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [highlightIdx, setHighlightIdx] = useState(0);
  const pickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  const toggleStatus = () => {
    const next = item.status === 'done' ? 'pending' : 'done';
    onUpdate({ status: next });
  };

  // Resolve the current assignee to a directory user (for color)
  const assigneeUser: DirectoryUser | undefined = item.assignee
    ? DEV_USERS.find(u => u.displayName === item.assignee)
    : undefined;

  // Filtered user list based on typed text
  const filteredUsers = filterText.trim()
    ? findUserByName(filterText)
    : DEV_USERS;

  const openPicker = useCallback(() => {
    if (!editable) return;
    setFilterText('');
    setHighlightIdx(0);
    setPickerOpen(true);
  }, [editable]);

  const closePicker = useCallback(() => {
    setPickerOpen(false);
    setFilterText('');
    setHighlightIdx(0);
  }, []);

  const selectUser = useCallback((user: DirectoryUser) => {
    onUpdate({ assignee: user.displayName });
    closePicker();
  }, [onUpdate, closePicker]);

  const clearAssignee = useCallback(() => {
    onUpdate({ assignee: '' });
    closePicker();
  }, [onUpdate, closePicker]);

  // Close on outside click
  useEffect(() => {
    if (!pickerOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        closePicker();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [pickerOpen, closePicker]);

  // Focus input when picker opens
  useEffect(() => {
    if (pickerOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [pickerOpen]);

  // Reset highlight when filter changes
  useEffect(() => {
    setHighlightIdx(0);
  }, [filterText]);

  // Auto-focus the text input when this item is newly added
  useEffect(() => {
    if (autoFocusText && textInputRef.current) {
      textInputRef.current.focus();
      onDidAutoFocus?.();
    }
  }, [autoFocusText, onDidAutoFocus]);

  const handlePickerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closePicker();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIdx(i => Math.min(i + 1, filteredUsers.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredUsers[highlightIdx]) {
        selectUser(filteredUsers[highlightIdx]);
      }
    }
  };

  const overdue = item.dueDate && item.status !== 'done' ? isOverdue(item.dueDate) : false;

  return (
    <div className={cn('flex items-center gap-2 py-1.5 border-b border-border-subtle')}>
      {/* Priority dot indicator */}
      <span
        title={`Priority: ${item.priority}`}
        className={cn('w-2 h-2 rounded-full shrink-0')}
        style={{ background: priorityColors[item.priority] }}
      />

      <Checkbox
        checked={item.status === 'done'}
        onChange={toggleStatus}
        disabled={!editable}
        className={cn('w-4 h-4', editable ? 'cursor-pointer' : 'cursor-default')}
      />

      {/* Inline task-text editor — reads as plain text in the row, so the
          Input's chrome is stripped via class overrides. */}
      <Input
        ref={textInputRef}
        data-testid={`task-text-${item.id}`}
        value={item.text}
        onChange={(e) => onUpdate({ text: e.target.value })}
        readOnly={!editable}
        className={cn(
          'flex-1 h-auto border-transparent bg-transparent px-1 py-0.5',
          item.status === 'done' ? 'line-through text-text-tertiary' : 'text-text-primary',
        )}
      />

      {/* Due date badge */}
      {item.dueDate && (
        <span
          title={item.dueDate}
          className={cn(
            'inline-block px-2 py-0.5 text-[10px] font-semibold rounded-xl whitespace-nowrap leading-snug border',
            overdue
              ? 'bg-danger-bg text-danger-fg border-danger-border'
              : 'bg-info-bg text-neutral border-info-border',
          )}
        >
          {overdue ? '⚠ ' : ''}Due: {formatDueDate(item.dueDate)}
        </span>
      )}

      {/* Category badge (retro: start/stop/continue, etc.) */}
      {item.category && (
        <span
          className={cn('inline-block px-2 py-0.5 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap')}
          style={{ backgroundColor: categoryColors[item.category.toLowerCase()] ?? 'var(--color-neutral)' }}
        >
          {item.category}
        </span>
      )}

      {/* Assignee picker */}
      <div ref={pickerRef} className={cn('relative')}>
        <button
          type="button"
          onClick={openPicker}
          title={item.assignee || 'Unassigned'}
          className={cn(
            'inline-flex items-center justify-center h-6 rounded-xl font-semibold text-[11px] cursor-pointer leading-snug whitespace-nowrap',
            item.assignee
              ? 'px-2 bg-primary-bg text-primary-fg border-none min-w-0'
              : 'w-6 px-0 bg-white text-text-tertiary border border-dashed border-border-emphasis',
          )}
        >
          {item.assignee ? (
            <>
              <span
                className={cn('w-[18px] h-[18px] rounded-full text-white inline-flex items-center justify-center text-[8px] font-bold shrink-0 leading-none')}
                style={{ background: assigneeUser?.color ?? 'var(--color-text-tertiary)' }}
              >
                {getInitials(item.assignee)}
              </span>
              <span className={cn('ml-1 text-[11px]')}>{item.assignee.split(' ')[0]}</span>
            </>
          ) : (
            '+'
          )}
        </button>

        {pickerOpen && (
          <div className={cn('absolute top-full left-0 mt-1 min-w-[180px] max-h-[200px] overflow-y-auto bg-white border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] z-[1000] py-1')}>
            <div className={cn('px-2 py-1')}>
              <Input
                ref={inputRef}
                size="sm"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                onKeyDown={handlePickerKeyDown}
                placeholder="Search users..."
                className={cn('text-[11px]')}
              />
            </div>

            {/* Unassign option */}
            {item.assignee && (
              <button
                type="button"
                onClick={clearAssignee}
                className={cn('flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer bg-transparent border-none w-full text-left font-[inherit] text-text-primary')}
              >
                <span className={cn('w-[22px] h-[22px] rounded-full bg-border-emphasis text-neutral inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none')}>--</span>
                <span className={cn('text-neutral italic')}>Unassigned</span>
              </button>
            )}

            {filteredUsers.map((user, idx) => (
              <button
                key={user.userId}
                type="button"
                onClick={() => selectUser(user)}
                onMouseEnter={() => setHighlightIdx(idx)}
                className={cn(
                  'flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer border-none w-full text-left font-[inherit] text-text-primary',
                  idx === highlightIdx ? 'bg-surface-hover' : 'bg-transparent',
                )}
              >
                <span
                  className={cn('w-[22px] h-[22px] rounded-full text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none')}
                  style={{ background: user.color }}
                >
                  {getInitials(user.displayName)}
                </span>
                <span>{user.displayName}</span>
              </button>
            ))}

            {filteredUsers.length === 0 && (
              <div className={cn('px-2.5 py-2 text-[11px] text-text-tertiary')}>
                No users found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Colored pill select — background is runtime-derived per priority,
          so the Select keeps its pill chrome via class overrides. */}
      <Select
        value={item.priority}
        disabled={!editable}
        onChange={(e) => onUpdate({ priority: e.target.value as TaskItem['priority'] })}
        className={cn('w-auto h-auto inline-block px-2 py-0.5 pr-4 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none appearance-none doc-select-arrow', editable ? 'cursor-pointer' : 'cursor-default')}
        style={{ backgroundColor: priorityColors[item.priority] }}
        title={`Priority: ${item.priority}`}
        options={[
          { value: 'low', label: 'low' },
          { value: 'medium', label: 'medium' },
          { value: 'high', label: 'high' },
        ]}
      />

      <Select
        value={item.status}
        disabled={!editable}
        onChange={(e) => onUpdate({ status: e.target.value as TaskItem['status'] })}
        className={cn('w-auto h-auto inline-block px-2 py-0.5 pr-4 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none appearance-none doc-select-arrow', editable ? 'cursor-pointer' : 'cursor-default')}
        style={{ backgroundColor: statusColors[item.status] }}
        title={`Status: ${item.status}`}
        options={[
          { value: 'pending', label: 'pending' },
          { value: 'acked', label: 'acked' },
          { value: 'done', label: 'done' },
          { value: 'rejected', label: 'rejected' },
        ]}
      />

      {editable && (
        <button
          type="button"
          onClick={onRemove}
          title="Remove task"
          className={cn('border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 rounded leading-none')}
        >
          x
        </button>
      )}
    </div>
  );
}
