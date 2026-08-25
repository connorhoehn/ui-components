// frontend/src/renderers/tasks/TasksEditorRenderer.tsx
//
// Editor-mode renderer for sectionType='tasks'.
// Pure TODO list — no rich-text editor; items are added and edited inline.

import { useRef } from 'react';
import type { SectionRendererProps } from '../types';
import TaskList from '../../components/doc-editor/TaskList';
import { sectionItems } from '../sectionItems';

export default function TasksEditorRenderer({
  section,
  editable,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
}: SectionRendererProps) {
  const items = sectionItems(section);
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
      {items.length > 0 || editable ? (
        <TaskList
          items={items}
          editable={editable}
          onUpdateItem={(id, patch) => onUpdateItem?.(id, patch)}
          onRemoveItem={(id) => onRemoveItem?.(id)}
          focusLastItem={focusLastItemRef}
        />
      ) : null}

      {items.length === 0 && !editable && (
        <p className="text-text-tertiary text-[13px] italic my-2">
          No items yet.
        </p>
      )}

      {editable && (
        <button
          type="button"
          onClick={handleAddItem}
          className="mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit"
        >
          + Add item
        </button>
      )}
    </div>
  );
}
