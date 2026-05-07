import { useRef, useState } from 'react';
import { useClickOutside } from './hooks/useClickOutside';
import type { TriggerBinding } from '../../types/pipeline';
import {
  colors,
  chipStyle,
  saveBtnStyle,
  menuBtn,
} from '../../constants/styles';
import type { PipelineRow } from './PipelinesPage';

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

  const borderColor = selected
    ? colors.primary
    : (hovered ? colors.primary : colors.border);
  const boxShadow = selected
    ? `0 0 0 4px rgba(100,108,255,0.18)`
    : (hovered ? '0 2px 8px rgba(15,23,42,0.06)' : 'none');

  return (
    <div
      data-testid={`pipeline-card-${row.id}`}
      data-selected={selected ? 'true' : 'false'}
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMenuOpen(false); }}
      style={{
        display: 'flex', flexDirection: 'column', gap: 8,
        width: '100%',
        padding: '12px 14px', background: colors.surface,
        border: `1px solid ${borderColor}`,
        borderRadius: 8, cursor: 'pointer',
        transition: 'border-color 100ms, box-shadow 100ms',
        boxShadow,
        position: 'relative',
      }}
    >
      {checkboxVisible && (
        <label
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute', top: 8, right: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 22, height: 22,
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          <input
            type="checkbox"
            data-testid={`pipeline-select-${row.id}`}
            checked={selected}
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
            style={{ cursor: 'pointer', width: 16, height: 16, accentColor: colors.primary }}
          />
        </label>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, paddingRight: checkboxVisible ? 28 : 0 }}>
        <span style={{ fontSize: 18, flexShrink: 0 }} aria-hidden>{row.icon}</span>
        <div
          style={{
            flex: 1, minWidth: 0, fontSize: 13, fontWeight: 600,
            color: colors.textPrimary,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}
          title={row.name}
        >
          {row.name}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <span aria-label={`Status: ${statusLabel}`} style={chipStyle(statusVariant)}>{statusLabel}</span>
        <span style={{ fontSize: 11, color: colors.textSecondary }}>
          {trigger.icon} {trigger.text}
        </span>
        <span style={{ fontSize: 11, color: colors.textTertiary }}>
          &middot; {row.nodeCount} node{row.nodeCount === 1 ? '' : 's'}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button
          data-testid={`run-pipeline-${row.id}`}
          onClick={stop(onRun)}
          disabled={runDisabled}
          title={runDisabled ? 'Run requires published state' : 'Run pipeline'}
          style={{
            ...saveBtnStyle(runDisabled),
            padding: '5px 12px', fontSize: 12,
          }}
        >
          Run
        </button>
        <button
          data-testid={`edit-pipeline-${row.id}`}
          onClick={stop(onOpen)}
          style={{
            padding: '5px 12px', fontSize: 12, fontWeight: 600,
            background: colors.surface, color: colors.textSecondary,
            border: `1px solid ${colors.borderField}`, borderRadius: 6,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Edit
        </button>
        <div style={{ position: 'relative', marginLeft: 'auto' }} ref={menuRef}>
          <button
            data-testid={`overflow-pipeline-${row.id}`}
            onClick={stop(() => setMenuOpen(v => !v))}
            aria-label="More actions"
            style={{
              padding: '4px 8px', fontSize: 14, fontWeight: 700,
              background: 'transparent', color: colors.textSecondary,
              border: `1px solid transparent`, borderRadius: 6,
              cursor: 'pointer', fontFamily: 'inherit', lineHeight: 1,
            }}
          >
            &#x22EF;
          </button>
          {menuOpen && (
            <div
              data-testid={`overflow-menu-${row.id}`}
              role="menu"
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute', right: 0, top: '100%', marginTop: 4,
                background: colors.surface, border: `1px solid ${colors.border}`,
                borderRadius: 8, boxShadow: '0 8px 24px rgba(15,23,42,0.12)',
                minWidth: 160, zIndex: 10, overflow: 'hidden',
              }}
            >
              <button style={menuBtn} role="menuitem" onClick={stop(() => { setMenuOpen(false); onDuplicate(); })}>
                Duplicate
              </button>
              <button style={menuBtn} role="menuitem" onClick={stop(() => { setMenuOpen(false); onExport(); })}>
                Export JSON
              </button>
              <button
                style={{ ...menuBtn, color: '#dc2626' }}
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
