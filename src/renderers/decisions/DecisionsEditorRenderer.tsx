import { useRef, useEffect } from 'react';
import { cn } from '../../lib/cn';
import type { SectionRendererProps } from '../types';
import type { TaskItem } from '../../types/document';
import TiptapEditor from '../../components/doc-editor/TiptapEditor';
import { postApproval, mapStatusToDecision } from './approvalSync';

const DECISION_META: Record<string, { label: string; icon: string; color: string; bg: string }> = {
  pending:  { label: 'Open',    icon: '○', color: '#92400e', bg: '#fef3c7' },
  acked:    { label: 'Decided', icon: '✓', color: '#065f46', bg: '#d1fae5' },
  done:     { label: 'Decided', icon: '✓', color: '#065f46', bg: '#d1fae5' },
  rejected: { label: 'Vetoed',  icon: '✕', color: '#991b1b', bg: '#fee2e2' },
};

interface RowProps {
  item: TaskItem;
  editable: boolean;
  autoFocus?: boolean;
  onDidAutoFocus?: () => void;
  onUpdate: (patch: Partial<TaskItem>) => void;
  onRemove: () => void;
}

function DecisionRow({ item, editable, autoFocus, onDidAutoFocus, onUpdate, onRemove }: RowProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const meta = DECISION_META[item.status] ?? DECISION_META.pending;

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
      onDidAutoFocus?.();
    }
  }, [autoFocus, onDidAutoFocus]);

  return (
    <div className="flex items-center gap-2 py-1.5 border-b border-border-subtle">
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 select-none"
        style={{ background: meta.bg, color: meta.color }}
      >
        {meta.icon}
      </span>

      <input
        ref={inputRef}
        type="text"
        value={item.text}
        onChange={(e) => onUpdate({ text: e.target.value })}
        readOnly={!editable}
        placeholder="Describe the decision..."
        className={cn(
          'flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5',
          item.status === 'rejected' ? 'text-text-tertiary line-through' : 'text-text-primary',
        )}
      />

      {editable && (
        <select
          value={item.status === 'done' ? 'acked' : item.status}
          onChange={(e) => onUpdate({ status: e.target.value as TaskItem['status'] })}
          className="text-[10px] px-2 py-0.5 rounded-[10px] font-semibold cursor-pointer outline-none font-inherit shrink-0 appearance-none"
          style={{
            border: `1px solid ${meta.color}`,
            background: meta.bg,
            color: meta.color,
          }}
        >
          <option value="pending">Open</option>
          <option value="acked">Decided</option>
          <option value="rejected">Vetoed</option>
        </select>
      )}

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

export default function DecisionsEditorRenderer({
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

  return (
    <div>
      {fragment && ydoc && (
        <TiptapEditor
          fragment={fragment}
          ydoc={ydoc}
          provider={provider ?? null}
          user={user ?? { name: 'Anonymous', color: '#6b7280' }}
          editable={editable}
          placeholder={section.placeholder ?? 'Add context or background...'}
          sectionId={section.id}
          onUpdateCursorInfo={onUpdateCursorInfo}
        />
      )}

      {section.items.length === 0 && !editable && (
        <div className="text-text-tertiary italic text-[13px] py-1">No decisions yet.</div>
      )}

      <div>
        {section.items.map((item, idx) => {
          const isLast = idx === section.items.length - 1;
          const shouldFocus = focusLastRef.current && isLast;
          return (
            <DecisionRow
              key={item.id}
              item={item}
              editable={editable}
              autoFocus={shouldFocus}
              onDidAutoFocus={shouldFocus ? () => { focusLastRef.current = false; } : undefined}
              onUpdate={(patch) => {
                const prevStatus = item.status;
                onUpdateItem?.(item.id, patch);
                // Phase 51 / hub#80 — mirror terminal status transitions
                // to the server-side approval log (POST /api/approvals).
                // Best-effort; CRDT update above stays source of truth.
                if (patch.status && patch.status !== prevStatus) {
                  const decision = mapStatusToDecision(patch.status);
                  if (decision) {
                    void postApproval({
                      sectionId: section.id,
                      decision,
                      reviewerName: user?.name,
                    });
                  }
                }
              }}
              onRemove={() => onRemoveItem?.(item.id)}
            />
          );
        })}
      </div>

      {editable && (
        <button
          type="button"
          onClick={handleAdd}
          className="mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit"
        >
          + Add decision
        </button>
      )}
    </div>
  );
}
