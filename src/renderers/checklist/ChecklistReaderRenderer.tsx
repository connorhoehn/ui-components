import { cn } from '../../lib/cn';
import type { SectionRendererProps } from '../types';
import type { TaskItem } from '../../types/document';
import TiptapEditor from '../../components/doc-editor/TiptapEditor';

export default function ChecklistReaderRenderer({
  section,
  fragment,
  ydoc,
  provider,
  onUpdateItem,
  onNavigateToEditor,
}: SectionRendererProps) {
  const items = section.items;
  const total = items.length;
  const doneCount = items.filter(i => i.status === 'done').length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div>
      {fragment && ydoc && (
        <div className="mb-2.5">
          <TiptapEditor
            fragment={fragment}
            ydoc={ydoc}
            provider={provider ?? null}
            user={{ name: '', color: '#6b7280' }}
            editable={false}
            sectionId={section.id}
          />
        </div>
      )}

      {total > 0 && (
        <div className="mb-2.5">
          <div className="flex justify-between mb-1">
            <span className="text-[11px] text-neutral font-semibold">{doneCount} / {total} done</span>
            <span className={cn('text-[11px] font-semibold', pct === 100 ? 'text-success-fg' : 'text-neutral')}>{pct}%</span>
          </div>
          <div className="h-1 bg-border rounded-sm overflow-hidden">
            <div
              className={cn('h-full rounded-sm transition-[width] duration-300', pct === 100 ? 'bg-success' : 'bg-info')}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      {total === 0 ? (
        <div className="text-text-tertiary italic text-[13px]">No items.</div>
      ) : (
        <div>
          {items.map((item: TaskItem) => {
            const done = item.status === 'done';
            return (
              <div
                key={item.id}
                className="flex items-center gap-2 py-[5px] border-b border-border-subtle"
              >
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => onUpdateItem?.(item.id, { status: done ? 'pending' : 'done' })}
                  className={cn('w-3.5 h-3.5 accent-success shrink-0', onUpdateItem ? 'cursor-pointer' : 'cursor-default')}
                  readOnly={!onUpdateItem}
                />
                <span className={cn('text-[13px] flex-1 leading-[1.4]', done ? 'text-text-tertiary line-through' : 'text-text-primary')}>
                  {item.text || <span className="text-text-disabled italic">Untitled</span>}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {onNavigateToEditor && (
        <button
          type="button"
          onClick={() => onNavigateToEditor(section.id)}
          className="mt-2 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit"
        >
          Edit in editor →
        </button>
      )}
    </div>
  );
}
