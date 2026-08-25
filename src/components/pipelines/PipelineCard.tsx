import { useCallback, useRef, useState } from 'react';
import { useDismissableLayer } from '../../lib/focusTrap';
import { useClickOutside } from './hooks/useClickOutside';
import type { TriggerBinding } from '../../types/pipeline';
import Chip from '../shared/Chip';
import { cn } from '../../lib/cn';
import type { PipelineRow } from './PipelinesPage';
import { Checkbox } from '../forms/Checkbox';

function triggerSummary(binding?: TriggerBinding): { icon: string; text: string } {
  const ev = binding?.event;
  if (!ev || ev === 'manual') return { icon: '▶', text: 'Manual' };
  if (ev === 'schedule') return { icon: '⏱', text: binding?.schedule ?? 'Schedule' };
  if (ev === 'webhook') return { icon: '🔌', text: binding?.webhookPath ?? 'Webhook' };
  return { icon: '🗎', text: `On ${binding?.event}` };
}

export interface PipelineCardProps {
  row: PipelineRow;
  onOpen: () => void;
  onRun: () => void;
  onDuplicate: () => void;
  onExport: () => void;
  onDelete: () => void;
  selectionMode: boolean;
  selected: boolean;
  anySelected: boolean;
  onToggleSelect: (shiftKey: boolean) => void;
}

export default function PipelineCard({
  row, onOpen, onRun, onDuplicate, onExport, onDelete,
  selectionMode, selected, anySelected, onToggleSelect,
}: PipelineCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setMenuOpen(false), menuOpen);
  // The ⋯ menu had outside-click dismissal only: Escape did nothing, so a
  // keyboard user who opened it had no way to back out, and closing it left
  // focus stranded rather than back on the ⋯ trigger.
  useDismissableLayer(menuOpen, useCallback(() => setMenuOpen(false), []));

  const isPublished = row.status === 'published';
  const isArchived = row.status === 'archived';
  const hasPublishedVersion = typeof row.publishedVersion === 'number';
  const trigger = triggerSummary(row.triggerBinding);

  let statusLabel: string;
  let statusVariant: 'success' | 'neutral' | 'warning' | 'danger';
  if (isArchived) {
    statusLabel = `Archived · v${row.version}`;
    statusVariant = 'danger';
  } else if (isPublished) {
    statusLabel = `Published · v${row.version}`;
    statusVariant = 'success';
  } else if (hasPublishedVersion) {
    statusLabel = `Draft · v${row.version} (published v${row.publishedVersion})`;
    statusVariant = 'warning';
  } else {
    statusLabel = `Draft · v${row.version}`;
    statusVariant = 'neutral';
  }

  const runDisabled = !isPublished;

  const stop = (fn: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    fn();
  };

  const checkboxVisible = selectionMode || selected || hovered || anySelected;

  const handleCardClick = (e: React.MouseEvent) => {
    if (selectionMode) {
      onToggleSelect(e.shiftKey);
    } else {
      onOpen();
    }
  };

  return (
    <div
      data-testid={`pipeline-card-${row.id}`}
      data-selected={selected ? 'true' : 'false'}
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMenuOpen(false); }}
      className={cn(
        'flex flex-col gap-2 w-full px-3.5 py-3 bg-surface rounded-lg cursor-pointer relative transition-[border-color,box-shadow] duration-100',
        selected
          ? 'border border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]'
          : hovered
            ? 'border border-primary shadow-[0_2px_8px_rgba(15,23,42,0.06)]'
            : 'border border-border shadow-none'
      )}
    >
      {checkboxVisible && (
        <label
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 flex items-center justify-center w-[22px] h-[22px] cursor-pointer z-[1]"
        >
          <Checkbox
            data-testid={`pipeline-select-${row.id}`}
            checked={selected}
            aria-label={`Select pipeline ${row.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelect(e.shiftKey);
            }}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                onToggleSelect(e.shiftKey);
              }
            }}
            onChange={() => {}}
            className="w-4 h-4"
          />
        </label>
      )}

      <div className={cn('flex items-center gap-2 min-w-0', checkboxVisible && 'pr-7')}>
        <span className="text-lg shrink-0" aria-hidden>{row.icon}</span>
        <div
          className="flex-1 min-w-0 text-[13px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"
          title={row.name}
        >
          {row.name}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Chip aria-label={`Status: ${statusLabel}`} tone={statusVariant} size="sm">{statusLabel}</Chip>
        <span className="text-[11px] text-text-secondary">
          {trigger.icon} {trigger.text}
        </span>
        <span className="text-[11px] text-text-tertiary">
          &middot; {row.nodeCount} node{row.nodeCount === 1 ? '' : 's'}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          data-testid={`run-pipeline-${row.id}`}
          onClick={stop(onRun)}
          disabled={runDisabled}
          title={runDisabled ? 'Run requires published state' : 'Run pipeline'}
          className="px-3 py-[5px] text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Run
        </button>
        <button
          data-testid={`edit-pipeline-${row.id}`}
          onClick={stop(onOpen)}
          className="px-3 py-[5px] text-xs font-semibold bg-surface text-text-secondary border border-border-field rounded-md cursor-pointer font-[inherit]"
        >
          Edit
        </button>
        <div className="relative ml-auto" ref={menuRef}>
          <button
            data-testid={`overflow-pipeline-${row.id}`}
            onClick={stop(() => setMenuOpen(v => !v))}
            aria-label="More actions"
            // Without these the trigger gave no hint that it opens a menu,
            // and never announced whether the menu was open.
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="px-2 py-1 text-sm font-bold bg-transparent text-text-secondary border border-transparent rounded-md cursor-pointer font-[inherit] leading-none"
          >
            &#x22EF;
          </button>
          {menuOpen && (
            <div
              data-testid={`overflow-menu-${row.id}`}
              role="menu"
              aria-label="More actions"
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-full mt-1 bg-surface border border-border rounded-lg shadow-[0_8px_24px_rgba(15,23,42,0.12)] min-w-[160px] z-10 overflow-hidden"
            >
              <button className="block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]" role="menuitem" onClick={stop(() => { setMenuOpen(false); onDuplicate(); })}>
                Duplicate
              </button>
              <button className="block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]" role="menuitem" onClick={stop(() => { setMenuOpen(false); onExport(); })}>
                Export JSON
              </button>
              <button
                className="block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-danger-fg"
                role="menuitem"
                onClick={stop(() => { setMenuOpen(false); onDelete(); })}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
