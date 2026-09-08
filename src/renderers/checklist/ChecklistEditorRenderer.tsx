import { useRef, useEffect } from 'react';
import { cn } from '../../lib/cn';
import { useEventCallback } from '../../hooks/useEventCallback';
import type { SectionRendererProps } from '../types';
import type { TaskItem } from '../../types/document';
import DefaultTiptapEditor from '../../components/doc-editor/TiptapEditor';
import { sectionItems } from '../sectionItems';

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

  // Callers pass a fresh arrow for `onDidAutoFocus` on every render; depending
  // on it directly re-ran this effect (and re-stole focus) on every render
  // while `autoFocus` was true. See src/hooks/useEventCallback.ts.
  const didAutoFocus = useEventCallback(onDidAutoFocus);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
      didAutoFocus();
    }
  }, [autoFocus, didAutoFocus]);

  return (
    <div className="flex items-center gap-2 py-[5px] border-b border-border-subtle">
      <input
        type="checkbox"
        checked={done}
        onChange={() => onUpdate({ status: done ? 'pending' : 'done' })}
        disabled={!editable}
        className={cn('w-[15px] h-[15px] accent-success shrink-0', editable ? 'cursor-pointer' : 'cursor-default')}
      />
      <input
        ref={inputRef}
        type="text"
        value={item.text}
        onChange={(e) => onUpdate({ text: e.target.value })}
        readOnly={!editable}
        placeholder="Checklist item..."
        className={cn(
          'flex-1 border-none outline-none text-sm bg-transparent px-1 py-0.5',
          done ? 'text-text-tertiary line-through' : 'text-text-primary',
        )}
      />
      {editable && (
        <button
          type="button"
          onClick={onRemove}
          className="border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 leading-none"
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
  extensions,
  editorComponent,
}: SectionRendererProps) {
  const Editor = editorComponent ?? DefaultTiptapEditor;
  const items = sectionItems(section);
  // Item count recorded when "+ Add item" was pressed, or null when no add is
  // outstanding. Focus moves to the last row only once the list has actually
  // grown past that count.
  //
  // This used to be a bare `focusLastRef = true` flag, set unconditionally and
  // cleared only from the row effect. Two consequences, both user-visible:
  // `onAddItem` is optional, so in editable mode without one the flag was set
  // and never cleared — the caret then jumped out of whatever row you were
  // typing in and into the last row on the next render. With an async
  // `onAddItem`, any unrelated re-render arriving before the new item (a
  // collaborator's edit, say) consumed the flag the same way, and the new row
  // never got focus at all.
  const pendingAddCountRef = useRef<number | null>(null);

  const handleAdd = () => {
    if (!onAddItem) return;
    pendingAddCountRef.current = items.length;
    onAddItem({ text: '', status: 'pending', assignee: '', ackedBy: '', ackedAt: '', priority: 'medium', notes: '' });
  };

  const pendingCount = pendingAddCountRef.current;
  const awaitingFocus = pendingCount !== null && items.length > pendingCount;

  const total = items.length;
  const doneCount = items.filter(i => i.status === 'done').length;

  return (
    <div>
      {fragment && ydoc && (
        <Editor
          fragment={fragment}
          ydoc={ydoc}
          provider={provider ?? null}
          user={user ?? { name: 'Anonymous', color: '#6b7280' }}
          editable={editable}
          placeholder={section.placeholder ?? 'Add notes or context...'}
          sectionId={section.id}
          onUpdateCursorInfo={onUpdateCursorInfo}
          extensions={extensions}
        />
      )}

      {total > 0 && (
        <div className="text-[11px] text-neutral font-semibold mb-1.5">
          {doneCount} / {total} done
        </div>
      )}

      <div>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const shouldFocus = awaitingFocus && isLast;
          return (
            <ChecklistRow
              key={item.id}
              item={item}
              editable={editable}
              autoFocus={shouldFocus}
              onDidAutoFocus={shouldFocus ? () => { pendingAddCountRef.current = null; } : undefined}
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
          className="mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer"
        >
          + Add item
        </button>
      )}
    </div>
  );
}
