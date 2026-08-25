// frontend/src/renderers/default/DefaultRenderer.tsx
//
// Fallback renderer — used when no specific renderer is registered.
// Shows rich text (if fragment) + task list (if items exist).

import { useRef } from 'react';
import type { SectionRendererProps } from '../types';
import TiptapEditor from '../../components/doc-editor/TiptapEditor';
import TaskList from '../../components/doc-editor/TaskList';
import { sectionItems } from '../sectionItems';

export default function DefaultRenderer({
  section,
  fragment,
  ydoc,
  provider,
  user,
  editable,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  onUpdateCursorInfo,
}: SectionRendererProps) {
  const items = sectionItems(section);
  const focusLastItemRef = useRef(false);

  const handleAddItem = () => {
    onAddItem?.({ text: '', status: 'pending', assignee: '', ackedBy: '', ackedAt: '', priority: 'medium', notes: '' });
    focusLastItemRef.current = true;
  };

  return (
    <div>
      {fragment && ydoc && (
        <TiptapEditor
          fragment={fragment}
          ydoc={ydoc}
          provider={provider ?? null}
          user={user ?? { name: 'Anonymous', color: '#6b7280' }}
          editable={editable}
          placeholder={section.placeholder ?? `Write ${section.type} content...`}
          sectionId={section.id}
          onUpdateCursorInfo={onUpdateCursorInfo}
        />
      )}
      {(items.length > 0 || editable) && (
        <TaskList
          items={items}
          editable={editable}
          onUpdateItem={(id, patch) => onUpdateItem?.(id, patch)}
          onRemoveItem={(id) => onRemoveItem?.(id)}
          focusLastItem={focusLastItemRef}
        />
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
