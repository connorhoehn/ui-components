// src/components/photo-editor/PhotoEditorTopBar.tsx
//
// The editor's top bar: sidebar toggle and "‹ <set>" back on the left, the
// file name and "<n> of <N> suggested picks" centred, and on the right
// previous / next, the Pick flag menu, undo / redo, the compare-layout toggle
// and a ⋯ menu. Chrome, so it follows the app theme.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { DropdownMenu, type DropdownMenuSection } from '../shared/DropdownMenu';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon, MoreIcon, RedoIcon, UndoIcon } from '../ui/Icons';
import { CompareLayoutIcon, FlagIcon, SidebarToggleIcon } from './icons';
import type { PhotoPick } from './model';

export interface PhotoEditorTopBarProps {
  title: string;
  subtitle?: ReactNode;
  backLabel: string;
  onBack: () => void;
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  pick: PhotoPick;
  onPickChange: (pick: PhotoPick) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  compareLayout?: 'split' | 'side-by-side';
  onCompareLayoutChange?: (layout: 'split' | 'side-by-side') => void;
  /** The ⋯ menu. Omitted = no ⋯ button. */
  moreSections?: DropdownMenuSection[];
  className?: string;
  'data-testid'?: string;
}

const PICK_LABEL: Record<'pick' | 'reject' | 'none', string> = { pick: 'Pick', reject: 'Rejected', none: 'Pick' };

export function PhotoEditorTopBar({
  title,
  subtitle,
  backLabel,
  onBack,
  onToggleSidebar,
  sidebarOpen,
  onPrev,
  onNext,
  pick,
  onPickChange,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  compareLayout = 'split',
  onCompareLayoutChange,
  moreSections,
  className,
  'data-testid': testId = 'photo-editor-top-bar',
}: PhotoEditorTopBarProps) {
  return (
    <header
      data-testid={testId}
      className={cn('grid h-[52px] shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-solid border-border bg-surface px-3', className)}
    >
      <div className="flex min-w-0 items-center gap-2">
        {onToggleSidebar && (
          <IconButton
            aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
            aria-pressed={sidebarOpen}
            onClick={onToggleSidebar}
            icon={<SidebarToggleIcon size={18} />}
            className="text-text-secondary"
            data-testid={`${testId}-sidebar`}
          />
        )}
        <button
          type="button"
          onClick={onBack}
          data-testid={`${testId}-back`}
          className="inline-flex min-w-0 cursor-pointer items-center gap-1 rounded-md border-none bg-transparent px-2 py-1 text-[14px] font-medium text-text-primary hover:bg-surface-hover"
        >
          <ChevronIcon dir="left" size={14} className="shrink-0 text-text-secondary" />
          <span className="truncate">{backLabel}</span>
        </button>
      </div>

      <div className="flex min-w-0 flex-col items-center leading-tight" data-testid={`${testId}-title`}>
        <span className="max-w-[40vw] truncate text-[14px] font-semibold text-text-primary">{title}</span>
        {subtitle && <span className="text-[12px] text-text-secondary">{subtitle}</span>}
      </div>

      <div className="flex min-w-0 items-center justify-end gap-1">
        <IconButton aria-label="Previous photo" onClick={onPrev} disabled={!onPrev} icon={<ChevronIcon dir="left" size={16} />} data-testid={`${testId}-prev`} />
        <IconButton aria-label="Next photo" onClick={onNext} disabled={!onNext} icon={<ChevronIcon dir="right" size={16} />} data-testid={`${testId}-next`} />
        <span className="mx-1.5">
          <DropdownMenu
            trigger={
              <span className="inline-flex items-center gap-2">
                <FlagIcon size={15} />
                {PICK_LABEL[pick ?? 'none']}
                <ChevronIcon size={12} />
              </span>
            }
            triggerLabel="Pick flag"
            triggerTestId={`${testId}-pick`}
            triggerClassName={cn(
              'h-8 rounded-lg border border-solid px-3 text-[13px] font-medium',
              pick === 'pick' ? 'border-accent-border bg-accent-bg text-accent-fg' : pick === 'reject' ? 'border-danger-border bg-danger-bg text-danger-fg' : 'border-border bg-surface-panel text-text-primary',
            )}
            align="end"
            sections={[{ items: [
              { label: 'Pick', description: 'Keep this one in the set', checked: pick === 'pick', trailing: 'P', onSelect: () => onPickChange('pick') },
              { label: 'Reject', description: 'Leave it out of the set', checked: pick === 'reject', trailing: 'X', onSelect: () => onPickChange('reject') },
              { label: 'Unflag', checked: pick === null, trailing: 'U', onSelect: () => onPickChange(null) },
            ] }]}
          />
        </span>
        <IconButton aria-label="Undo" onClick={onUndo} disabled={!canUndo} icon={<UndoIcon size={17} />} data-testid={`${testId}-undo`} />
        <IconButton aria-label="Redo" onClick={onRedo} disabled={!canRedo} icon={<RedoIcon size={17} />} data-testid={`${testId}-redo`} />
        <span className="mx-1 h-5 w-px bg-border" aria-hidden />
        <IconButton
          aria-label={compareLayout === 'side-by-side' ? 'Compare with a split' : 'Compare side by side'}
          aria-pressed={compareLayout === 'side-by-side'}
          onClick={() => onCompareLayoutChange?.(compareLayout === 'side-by-side' ? 'split' : 'side-by-side')}
          disabled={!onCompareLayoutChange}
          icon={<CompareLayoutIcon size={18} />}
          className={compareLayout === 'side-by-side' ? 'bg-surface-hover' : undefined}
          data-testid={`${testId}-layout`}
        />
        {moreSections && (
          <DropdownMenu
            trigger={<MoreIcon size={18} />}
            triggerLabel="More"
            triggerTestId={`${testId}-more`}
            triggerClassName="inline-flex h-8 w-8 items-center justify-center rounded-md border-none bg-transparent p-0 text-text-primary hover:bg-surface-hover"
            align="end"
            sections={moreSections}
          />
        )}
      </div>
    </header>
  );
}
