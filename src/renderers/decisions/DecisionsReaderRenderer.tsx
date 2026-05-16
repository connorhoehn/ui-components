import { cn } from '../../lib/cn';
import type { SectionRendererProps } from '../types';
import type { TaskItem } from '../../types/document';

const STATUS_META: Record<string, { label: string; icon: string; color: string; bg: string }> = {
  pending:  { label: 'Open',    icon: '○', color: '#92400e', bg: '#fef3c7' },
  acked:    { label: 'Decided', icon: '✓', color: '#065f46', bg: '#d1fae5' },
  done:     { label: 'Decided', icon: '✓', color: '#065f46', bg: '#d1fae5' },
  rejected: { label: 'Vetoed',  icon: '✕', color: '#991b1b', bg: '#fee2e2' },
};

function DecisionRow({ item }: { item: TaskItem }) {
  const meta = STATUS_META[item.status] ?? STATUS_META.pending;
  return (
    <div className="flex items-start gap-2 py-1.5 border-b border-slate-100">
      <span
        className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 select-none"
        style={{ background: meta.bg, color: meta.color }}
      >
        {meta.icon}
      </span>
      <span className={cn(
        'flex-1 text-[13px] leading-[1.4]',
        item.status === 'rejected' ? 'text-text-tertiary line-through' : 'text-slate-800',
      )}>
        {item.text || <span className="text-text-disabled italic">Untitled decision</span>}
      </span>
      <span
        className="text-[10px] font-semibold px-2 py-0.5 rounded-[10px] whitespace-nowrap shrink-0"
        style={{ background: meta.bg, color: meta.color }}
      >
        {meta.label}
      </span>
    </div>
  );
}

function StatusGroup({ label, color, items }: { label: string; color: string; items: TaskItem[] }) {
  return (
    <div className="mb-2">
      <div className="text-[10px] font-bold uppercase tracking-[0.05em] mb-0.5" style={{ color }}>
        {label}
      </div>
      {items.map(item => <DecisionRow key={item.id} item={item} />)}
    </div>
  );
}

export default function DecisionsReaderRenderer({ section, onNavigateToEditor }: SectionRendererProps) {
  const items = section.items;

  if (items.length === 0) {
    return (
      <div className="text-text-tertiary italic text-[13px] py-1">
        No decisions recorded.
      </div>
    );
  }

  const open    = items.filter(i => i.status === 'pending');
  const decided = items.filter(i => i.status === 'acked' || i.status === 'done');
  const vetoed  = items.filter(i => i.status === 'rejected');

  return (
    <div>
      {open.length > 0    && <StatusGroup label="Open"    color="#92400e" items={open} />}
      {decided.length > 0 && <StatusGroup label="Decided" color="#065f46" items={decided} />}
      {vetoed.length > 0  && <StatusGroup label="Vetoed"  color="#991b1b" items={vetoed} />}

      {onNavigateToEditor && (
        <button
          type="button"
          onClick={() => onNavigateToEditor(section.id)}
          className="mt-1.5 bg-transparent border-none text-blue-500 text-xs cursor-pointer p-0 font-inherit"
        >
          Edit in editor →
        </button>
      )}
    </div>
  );
}
