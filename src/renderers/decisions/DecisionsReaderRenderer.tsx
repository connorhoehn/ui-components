import { cn } from '../../lib/cn';
import type { SectionRendererProps } from '../types';
import type { TaskItem } from '../../types/document';
import { sectionItems } from '../sectionItems';

const STATUS_META: Record<string, { label: string; icon: string; color: string; bg: string }> = {
  pending:  { label: 'Open',    icon: '○', color: 'var(--color-warning-fg)', bg: 'var(--color-warning-bg)' },
  acked:    { label: 'Decided', icon: '✓', color: 'var(--color-success-fg)', bg: 'var(--color-success-bg)' },
  done:     { label: 'Decided', icon: '✓', color: 'var(--color-success-fg)', bg: 'var(--color-success-bg)' },
  rejected: { label: 'Vetoed',  icon: '✕', color: 'var(--color-danger-fg)', bg: 'var(--color-danger-bg)' },
};

function DecisionRow({ item }: { item: TaskItem }) {
  const meta = STATUS_META[item.status] ?? STATUS_META.pending;
  return (
    <div className="flex items-start gap-2 py-1.5 border-b border-border-subtle">
      <span
        className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 select-none"
        style={{ background: meta.bg, color: meta.color }}
      >
        {meta.icon}
      </span>
      <span className={cn(
        'flex-1 text-[13px] leading-[1.4]',
        item.status === 'rejected' ? 'text-text-tertiary line-through' : 'text-text-primary',
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
  const items = sectionItems(section);

  if (items.length === 0) {
    return (
      <div className="text-text-tertiary italic text-[13px] py-1">
        No decisions recorded.
      </div>
    );
  }

  // Exhaustive by construction. These used to be three positive filters, so a
  // decision whose status was none of the four known values matched no group
  // and vanished from the list with nothing to say it had been dropped — and
  // if EVERY decision had an unrecognised status the reader rendered an empty
  // <div> that looked like a styling glitch rather than missing data. This is
  // the same defect that was already fixed in the sibling TasksReaderRenderer;
  // anything not explicitly decided/vetoed is treated as open.
  const decided = items.filter(i => i.status === 'acked' || i.status === 'done');
  const vetoed  = items.filter(i => i.status === 'rejected');
  const open    = items.filter(i => !decided.includes(i) && !vetoed.includes(i));

  return (
    <div>
      {/* Group headers take the same tone token as the per-row badge for that
          status (STATUS_META above). They used to be literal palette hexes,
          so overriding --color-warning-fg / -success-fg / -danger-fg re-toned
          the badges but left the headers on the stock amber/green/red. */}
      {open.length > 0    && <StatusGroup label="Open"    color={STATUS_META.pending.color}  items={open} />}
      {decided.length > 0 && <StatusGroup label="Decided" color={STATUS_META.acked.color}    items={decided} />}
      {vetoed.length > 0  && <StatusGroup label="Vetoed"  color={STATUS_META.rejected.color} items={vetoed} />}

      {onNavigateToEditor && (
        <button
          data-ui-part=""
          type="button"
          onClick={() => onNavigateToEditor(section.id)}
          className="mt-1.5 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0"
        >
          Edit in editor →
        </button>
      )}
    </div>
  );
}
