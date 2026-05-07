// frontend/src/components/doc-editor/TaskList.tsx
//
// Renders a list of task items within a section.

import type { MutableRefObject } from 'react';
import type { TaskItem } from '../../types/document';
import TaskItemRow from './TaskItemRow';
import { cn } from '../../lib/cn';

export interface TaskListProps {
  items: TaskItem[];
  editable: boolean;
  onUpdateItem: (itemId: string, patch: Partial<TaskItem>) => void;
  onRemoveItem: (itemId: string) => void;
  /** When true, auto-focus the text input of the last item (reset after use). */
  focusLastItem?: MutableRefObject<boolean>;
}

export default function TaskList({ items, editable, onUpdateItem, onRemoveItem, focusLastItem }: TaskListProps) {
  if (items.length === 0) {
    return <div className={cn('text-text-tertiary text-[13px] italic py-2')}>No tasks yet.</div>;
  }

  // Determine if the last item should receive auto-focus
  const shouldFocusLast = focusLastItem?.current ?? false;

  return (
    <div className={cn('py-2')}>
      {items.map((item, idx) => (
        <TaskItemRow
          key={item.id}
          item={item}
          editable={editable}
          onUpdate={(patch) => onUpdateItem(item.id, patch)}
          onRemove={() => onRemoveItem(item.id)}
          autoFocusText={shouldFocusLast && idx === items.length - 1}
          onDidAutoFocus={shouldFocusLast && idx === items.length - 1
            ? () => { if (focusLastItem) focusLastItem.current = false; }
            : undefined}
        />
      ))}
    </div>
  );
}
