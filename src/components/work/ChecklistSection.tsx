// ChecklistSection — a work item's acceptance criteria: square checkbox rows
// with in-place edit, remove and reorder, and an "Add criterion" field at the
// foot.
//
// Every capability is opt-in by callback: no `onRemove`, no remove button; no
// `onAdd`, no add field — a caller never shows an affordance it cannot honour.
// Row actions sit in the row but only appear on hover or keyboard focus, so
// the list reads as a list. A row with `pending` is held (disabled, aria-busy)
// while its write is in flight; a `readOnlyReason` holds the whole list and
// explains why. The section hint carries the honest tally ("1 of 3").

import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { DetailSection } from '../shared/DetailSection';
import { Checkbox } from '../forms/Checkbox';
import { Input } from '../forms/Input';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon, EditIcon, PlusIcon, TrashIcon } from '../ui/Icons';
import { Button } from '../ui/Button';
import { Spinner } from '../shared/Spinner';
import VisuallyHidden from '../shared/VisuallyHidden';

export interface ChecklistItem { id: string; text: string; done: boolean; pending?: boolean }

export interface ChecklistSectionProps {
  title?: string;
  items: ChecklistItem[];
  onToggle?: (id: string, done: boolean) => void;
  onAdd?: (text: string) => void;
  onEdit?: (id: string, text: string) => void;
  onRemove?: (id: string) => void;
  onMove?: (id: string, toIndex: number) => void;
  readOnlyReason?: string;
  emptyLabel?: string;
  addPlaceholder?: string;
  first?: boolean;
  /**
   * `heading` (default since 2.386.15): a 16px sentence-case heading, 14px
   * rows, no tally, and "Add a criterion" as a quiet control that opens the
   * field only when asked — a work item's Brief. `label`: the small uppercase
   * caption with the tally and an always-open add field, for a side panel.
   */
  variant?: 'label' | 'heading';

  className?: string;
  'data-testid'?: string;
}

interface RowProps {
  item: ChecklistItem;
  index: number;
  count: number;
  locked: boolean;
  large: boolean;
  reasonId?: string;
  onToggle?: ChecklistSectionProps['onToggle'];
  onEdit?: ChecklistSectionProps['onEdit'];
  onRemove?: ChecklistSectionProps['onRemove'];
  onMove?: ChecklistSectionProps['onMove'];
}

function Row({ item, index, count, locked, large, reasonId, onToggle, onEdit, onRemove, onMove }: RowProps) {
  const textId = useId();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item.text);
  const done = useRef(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const held = locked || !!item.pending;

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  const start = () => { setDraft(item.text); done.current = false; setEditing(true); };
  const finish = (commit: boolean) => {
    if (done.current) return;
    done.current = true;
    setEditing(false);
    const next = draft.trim();
    if (commit && next && next !== item.text) onEdit?.(item.id, next);
  };

  const showActions = !locked && !editing && (onEdit || onRemove || onMove);

  return (
    <li
      className={cn('group flex items-center rounded-md', large ? 'min-h-[26px] gap-3' : 'min-h-7 gap-2.5 py-0.5')}
      aria-busy={item.pending || undefined}
      data-testid={`checklist-item-${item.id}`}
    >
      <Checkbox
        checked={item.done}
        disabled={held || !onToggle}
        onChange={(checked) => onToggle?.(item.id, checked)}
        aria-labelledby={editing ? undefined : textId}
        aria-label={editing ? item.text : undefined}
        aria-describedby={reasonId}
      />
      {editing ? (
        <Input
          ref={inputRef}
          size="sm"
          aria-label="Edit criterion"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => finish(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); finish(true); }
            else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); finish(false); }
          }}
          className="flex-1"
        />
      ) : (
        <span
          id={textId}
          className={cn(
            'min-w-0 flex-1',
            large ? 'text-sm leading-5' : 'text-[13px]',
            item.done ? 'text-text-tertiary line-through' : 'text-text-primary',
          )}
        >
          {item.text}
        </span>
      )}
      {item.pending && <Spinner size="sm" aria-label="Saving" />}
      {showActions && (
        <span className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          {onEdit && (
            <IconButton size="sm" aria-label={`Edit "${item.text}"`} icon={<EditIcon size={13} />} onClick={start} disabled={held} />
          )}
          {onMove && (
            <IconButton size="sm" aria-label={`Move "${item.text}" up`} icon={<ChevronIcon dir="up" size={13} />}
              onClick={() => onMove(item.id, index - 1)} disabled={held || index === 0} />
          )}
          {onMove && (
            <IconButton size="sm" aria-label={`Move "${item.text}" down`} icon={<ChevronIcon dir="down" size={13} />}
              onClick={() => onMove(item.id, index + 1)} disabled={held || index === count - 1} />
          )}
          {onRemove && (
            <IconButton size="sm" aria-label={`Remove "${item.text}"`} icon={<TrashIcon size={13} />}
              onClick={() => onRemove(item.id)} disabled={held} />
          )}
        </span>
      )}
    </li>
  );
}

export function ChecklistSection({
  title = 'Acceptance criteria', items, onToggle, onAdd, onEdit, onRemove, onMove,
  readOnlyReason, emptyLabel = 'No acceptance criteria yet', addPlaceholder = 'Add criterion',
  first, variant = 'heading', className, 'data-testid': testId = 'checklist-section',
}: ChecklistSectionProps) {
  const reasonId = useId();
  const [newText, setNewText] = useState('');
  const locked = !!readOnlyReason;
  const heading = variant === 'heading';
  // The label variant always shows the add field; the heading variant opens it on request.
  const [adding, setAdding] = useState(false);
  const addRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => { if (adding) addRef.current?.focus(); }, [adding]);
  const doneCount = items.filter((i) => i.done).length;
  const hint = !heading && items.length > 0 ? `${doneCount} of ${items.length}` : undefined;
  const canAdd = !!onAdd && !locked;
  const addLabel = addPlaceholder.charAt(0).toUpperCase() + addPlaceholder.slice(1);
  const addButton = (
    <Button variant="link" size="sm" onClick={() => setAdding(true)} className="inline-flex items-center gap-1 text-[13px]" data-testid={`${testId}-add`}>
      <PlusIcon size={12} aria-hidden="true" />
      {addLabel}
    </Button>
  );
  const actions = heading && canAdd && !adding && items.length > 0 ? addButton : undefined;
  const showField = canAdd && (!heading || adding);

  const add = () => {
    const t = newText.trim();
    if (!t) return;
    onAdd?.(t);
    setNewText('');
  };

  return (
    <DetailSection title={title} hint={hint} actions={actions} first={first} variant={variant} className={className} data-testid={testId}>
      <div title={readOnlyReason}>
        {items.length === 0 ? (
          <div className="flex items-center gap-2">
            <p className={cn('m-0 text-text-tertiary', heading ? 'text-sm' : 'text-[13px]')}>{emptyLabel}</p>
            {heading && canAdd && !adding && addButton}
          </div>
        ) : (
          <ul className="m-0 flex list-none flex-col p-0" aria-label={title}>
            {items.map((item, index) => (
              <Row
                key={item.id}
                item={item}
                index={index}
                count={items.length}
                locked={locked}
                large={heading}
                reasonId={readOnlyReason ? reasonId : undefined}
                onToggle={onToggle}
                onEdit={onEdit}
                onRemove={onRemove}
                onMove={onMove}
              />
            ))}
          </ul>
        )}
        {showField && (
          <Input
            ref={addRef}
            size="sm"
            aria-label={addPlaceholder}
            placeholder={`${addPlaceholder}…`}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); add(); }
              else if (e.key === 'Escape') { setNewText(''); if (heading) { e.stopPropagation(); setAdding(false); } }
            }}
            {...(heading ? { onBlur: () => { if (!newText.trim()) setAdding(false); } } : {})}
            className="mt-1.5"
          />
        )}
        {readOnlyReason && <VisuallyHidden id={reasonId}>{readOnlyReason}</VisuallyHidden>}
      </div>
    </DetailSection>
  );
}

export default ChecklistSection;
