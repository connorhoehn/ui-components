import { useRef, useEffect } from 'react';
import { cn } from '../../lib/cn';
import type { SectionRendererProps } from '../types';
import type { TaskItem } from '../../types/document';
import TiptapEditor from '../../components/doc-editor/TiptapEditor';

interface RowProps {
  item: TaskItem;
  editable: boolean;
  autoFocus?: boolean;
  onDidAutoFocus?: () => void;
  onUpdate: (patch: Partial<TaskItem>) => void;
  onRemove: () => void;
}

function ChecklistRow({ item, editable, autoFocus, onDidAutoFocus, onUpdate, onRemove }: RowProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const done = item.status === 'done';

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
      onDidAutoFocus?.();
    }
  }, [autoFocus, onDidAutoFocus]);

  return (
    <div className="flex items-center gap-2 py-[5px] border-b border-slate-100">
      <input
        type="checkbox"
        checked={done}
        onChange={() => onUpdate({ status: done ? 'pending' : 'done' })}
        disabled={!editable}
        className={cn('w-[15px] h-[15px] accent-emerald-500 shrink-0', editable ? 'cursor-pointer' : 'cursor-default')}
      />
      <input
        ref={inputRef}
        type="text"
        value={item.text}
        onChange={(e) => onUpdate({ text: e.target.value })}
        readOnly={!editable}
        placeholder="Checklist item..."
        className={cn(
          'flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5',
          done ? 'text-text-tertiary line-through' : 'text-slate-800',
        )}
      />
      {editable && (
        <button
          type="button"
          onClick={onRemove}
          className="border-none bg-transparent text-red-500 cursor-pointer text-base px-1.5 py-0.5 leading-none"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default function ChecklistEditorRenderer({
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
  const focusLastRef = useRef(false);

  const handleAdd = () => {
    onAddItem?.({ text: '', status: 'pending', assignee: '', ackedBy: '', ackedAt: '', priority: 'medium', notes: '' });
    focusLastRef.current = true;
  };

  const total = section.items.length;
  const doneCount = section.items.filter(i => i.status === 'done').length;

  return (
    <div>
      {fragment && ydoc && (
        <TiptapEditor
          fragment={fragment}
          ydoc={ydoc}
          provider={provider ?? null}
          user={user ?? { name: 'Anonymous', color: '#6b7280' }}
          editable={editable}
          placeholder={section.placeholder ?? 'Add notes or context...'}
          sectionId={section.id}
          onUpdateCursorInfo={onUpdateCursorInfo}
        />
      )}

      {total > 0 && (
        <div className="text-[11px] text-slate-500 font-semibold mb-1.5">
          {doneCount} / {total} done
        </div>
      )}

      <div>
        {section.items.map((item, idx) => {
          const isLast = idx === section.items.length - 1;
          const shouldFocus = focusLastRef.current && isLast;
          return (
            <ChecklistRow
              key={item.id}
              item={item}
              editable={editable}
              autoFocus={shouldFocus}
              onDidAutoFocus={shouldFocus ? () => { focusLastRef.current = false; } : undefined}
              onUpdate={(patch) => onUpdateItem?.(item.id, patch)}
              onRemove={() => onRemoveItem?.(item.id)}
            />
          );
        })}
      </div>

      {editable && (
        <button
          type="button"
          onClick={handleAdd}
          className="mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-slate-500 cursor-pointer font-inherit"
        >
          + Add item
        </button>
      )}
    </div>
  );
}
