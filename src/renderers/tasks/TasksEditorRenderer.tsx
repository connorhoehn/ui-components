// frontend/src/renderers/tasks/TasksEditorRenderer.tsx
//
// Editor-mode renderer for sectionType='tasks'.
// Pure TODO list — no rich-text editor; items are added and edited inline.

import { useRef } from 'react';
import type { SectionRendererProps } from '../types';
import TaskList from '../../components/doc-editor/TaskList';

export default function TasksEditorRenderer({
  section,
  editable,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
}: SectionRendererProps) {
  const focusLastItemRef = useRef(false);

  const handleAddItem = () => {
    onAddItem?.({
      text: '',
      status: 'pending',
      assignee: '',
      ackedBy: '',
      ackedAt: '',
      priority: 'medium',
      notes: '',
    });
    focusLastItemRef.current = true;
  };

  return (
    <div className="py-1">
      {section.items.length > 0 || editable ? (
        <TaskList
          items={section.items}
          editable={editable}
          onUpdateItem={(id, patch) => onUpdateItem?.(id, patch)}
          onRemoveItem={(id) => onRemoveItem?.(id)}
          focusLastItem={focusLastItemRef}
        />
      ) : null}

      {section.items.length === 0 && !editable && (
        <p className="text-text-tertiary text-[13px] italic my-2">
          No items yet.
        </p>
      )}

      {editable && (
        <button
          type="button"
          onClick={handleAddItem}
          className="mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-slate-500 cursor-pointer font-inherit"
        >
          + Add item
        </button>
      )}
    </div>
  );
}
