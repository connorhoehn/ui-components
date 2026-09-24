// WorkItemMetaBar — the one-line row under a work item's title:
// "● Open ▾ | 5 points | (LH) Layla Hassan | Priority: High ▾".
//
// Four independent fields, each optional, each editable in place, each with a
// truthful empty rendering ("No status", "— pts", "Unassigned", "No priority")
// that is still editable — an empty field is where a person starts, not a dead
// end. A field is read-only when it has no `onChange` or carries a
// `readOnlyReason`; the reason is exposed as the field's title and via
// aria-describedby, so "why can't I change this?" has an answer. `pending`
// marks a save in flight: a spinner, aria-busy, and the control held still.
//
// The owner picker (and LinkedItemsSection's "Add link") share
// `WorkSearchPicker` below: a search box and result list inside the library's
// InlinePopover, so neither hand-rolls a floating layer.

import {
  useEffect, useId, useRef, useState,
  type ReactNode, type RefObject,
} from 'react';
import { cn } from '../../lib/cn';
import { Select } from '../forms/Select';
import { NumberInput } from '../forms/NumberInput';
import { Button } from '../ui/Button';
import { Avatar } from '../shared/Avatar';
import Chip, { type ChipTone } from '../shared/Chip';
import { StatusDot } from '../shared/StatusDot';
import { Spinner } from '../shared/Spinner';
import { SearchInput } from '../shared/SearchInput';
import { InlinePopover } from '../shared/InlinePopover';
import VisuallyHidden from '../shared/VisuallyHidden';
import { toneVar } from '../shared/tones';

export interface WorkMetaOption { value: string; label: string; tone?: ChipTone }

/** A person as the meta bar and its picker see one. */
export interface WorkPerson { id: string; name: string; avatarUrl?: string }

export interface WorkItemMetaBarProps {
  status?: {
    value: string | null; options: WorkMetaOption[]; onChange?: (v: string) => void;
    readOnlyReason?: string; pending?: boolean;
  };
  points?: {
    value: number | null; onChange?: (v: number | null) => void;
    readOnlyReason?: string; pending?: boolean; max?: number;
  };
  owner?: {
    value: WorkPerson | null;
    onSearchPeople?: (q: string) => Promise<WorkPerson[]> | WorkPerson[];
    onChange?: (p: WorkPerson | null) => void;
    readOnlyReason?: string; pending?: boolean;
  };
  priority?: {
    value: string | null; options: WorkMetaOption[]; onChange?: (v: string) => void;
    readOnlyReason?: string; pending?: boolean;
  };
  'data-testid'?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// WorkSearchPicker — search box + results in an InlinePopover.
// ---------------------------------------------------------------------------

export interface WorkSearchPickerProps<T> {
  trigger: RefObject<HTMLElement | null>;
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog and the search box. */
  label: string;
  placeholder?: string;
  /** Called on open (with '') and on every query change. */
  search?: (q: string) => Promise<T[]> | T[];
  itemKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  onPick: (item: T) => void;
  /** Above the search box (e.g. a relation select). */
  header?: ReactNode;
  /** Below the results (e.g. "Unassign"). */
  footer?: ReactNode;
  'data-testid'?: string;
}

type SearchState<T> =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'done'; items: T[] }
  | { kind: 'error' };

export function WorkSearchPicker<T>({
  trigger, open, onClose, label, placeholder = 'Search…', search,
  itemKey, renderItem, onPick, header, footer, 'data-testid': testId = 'work-search-picker',
}: WorkSearchPickerProps<T>) {
  const [query, setQuery] = useState('');
  const [state, setState] = useState<SearchState<T>>({ kind: 'idle' });
  const searchRef = useRef(search);
  searchRef.current = search;
  const seq = useRef(0);

  useEffect(() => {
    if (!open) { setQuery(''); setState({ kind: 'idle' }); return; }
    const fn = searchRef.current;
    if (!fn) return;
    const mine = ++seq.current;
    let result: Promise<T[]> | T[];
    try { result = fn(query); } catch { setState({ kind: 'error' }); return; }
    if (Array.isArray(result)) { setState({ kind: 'done', items: result }); return; }
    setState({ kind: 'loading' });
    result.then(
      (items) => { if (seq.current === mine) setState({ kind: 'done', items }); },
      () => { if (seq.current === mine) setState({ kind: 'error' }); },
    );
  }, [open, query]);

  return (
    <InlinePopover trigger={trigger} open={open} onClose={onClose} aria-label={label} data-testid={testId} className="w-64 p-2">
      {header}
      {search && (
        <SearchInput value={query} onChange={setQuery} placeholder={placeholder} aria-label={label} autoFocus />
      )}
      {search && (
        <div className="mt-1.5 max-h-56 overflow-y-auto" aria-live="polite">
          {state.kind === 'loading' && <p className="m-0 px-2 py-1.5 text-[12px] text-text-tertiary">Searching…</p>}
          {state.kind === 'error' && <p className="m-0 px-2 py-1.5 text-[12px] text-danger-fg">Search failed</p>}
          {state.kind === 'done' && state.items.length === 0 && (
            <p className="m-0 px-2 py-1.5 text-[12px] text-text-tertiary">No matches</p>
          )}
          {state.kind === 'done' && state.items.length > 0 && (
            <ul className="m-0 list-none p-0">
              {state.items.map((item) => (
                <li key={itemKey(item)}>
                  <button
                    type="button"
                    onClick={() => { onPick(item); onClose(); }}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-md border-none bg-transparent px-2 py-1.5 text-left font-[inherit] text-[13px] text-text-primary hover:bg-surface-hover focus-visible:bg-surface-hover"
                  >
                    {renderItem(item)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {footer && <div className="mt-1.5 border-t border-border pt-1.5">{footer}</div>}
    </InlinePopover>
  );
}

// ---------------------------------------------------------------------------
// Field chrome: read-only reason + pending.
// ---------------------------------------------------------------------------

function Field({
  name, readOnlyReason, pending, reasonId, children,
}: { name: string; readOnlyReason?: string; pending?: boolean; reasonId: string; children: ReactNode }) {
  return (
    <div
      className="inline-flex min-w-0 items-center gap-1.5"
      title={readOnlyReason}
      aria-busy={pending || undefined}
      data-field={name}
    >
      {children}
      {readOnlyReason && <VisuallyHidden id={reasonId}>{readOnlyReason}</VisuallyHidden>}
      {pending && <Spinner size="sm" aria-label={`Saving ${name}`} />}
    </div>
  );
}

function Separator() {
  return <span aria-hidden="true" className="h-4 w-px shrink-0 bg-border" />;
}

const optionOf = (options: WorkMetaOption[], value: string | null) =>
  value == null ? undefined : options.find((o) => o.value === value);

// ---------------------------------------------------------------------------
// Fields
// ---------------------------------------------------------------------------

function StatusField({ f }: { f: NonNullable<WorkItemMetaBarProps['status']> }) {
  const reasonId = useId();
  const opt = optionOf(f.options, f.value);
  const editable = !!f.onChange && !f.readOnlyReason;
  const dot = <StatusDot color={opt?.tone ? toneVar(opt.tone) : undefined} />;
  return (
    <Field name="status" readOnlyReason={f.readOnlyReason} pending={f.pending} reasonId={reasonId}>
      {dot}
      {editable ? (
        <Select
          size="sm"
          aria-label="Status"
          value={f.value ?? ''}
          placeholder="No status"
          options={f.options.map(({ value, label }) => ({ value, label }))}
          disabled={f.pending}
          onChange={(e) => f.onChange?.(e.target.value)}
          className="w-auto"
        />
      ) : (
        <span
          className={cn('text-[13px]', opt ? 'text-text-primary' : 'text-text-tertiary')}
          aria-describedby={f.readOnlyReason ? reasonId : undefined}
        >
          {opt?.label ?? f.value ?? 'No status'}
        </span>
      )}
    </Field>
  );
}

function pointsLabel(v: number | null): string {
  if (v == null) return '— pts';
  return `${v} ${v === 1 ? 'point' : 'points'}`;
}

function PointsField({ f }: { f: NonNullable<WorkItemMetaBarProps['points']> }) {
  const reasonId = useId();
  const editable = !!f.onChange && !f.readOnlyReason;
  const [editing, setEditing] = useState(false);
  const draft = useRef<number | undefined>(undefined);
  const [draftView, setDraftView] = useState<number | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const done = useRef(false);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  const start = () => {
    draft.current = f.value ?? undefined;
    setDraftView(draft.current);
    done.current = false;
    setEditing(true);
  };
  const setDraft = (v: number | undefined) => { draft.current = v; setDraftView(v); };
  const finish = (commit: boolean) => {
    if (done.current) return;
    done.current = true;
    setEditing(false);
    if (!commit) return;
    let next: number | null = draft.current == null ? null : Math.max(0, draft.current);
    if (next != null && f.max != null) next = Math.min(f.max, next);
    if (next !== (f.value ?? null)) f.onChange?.(next);
  };

  const label = pointsLabel(f.value);
  return (
    <Field name="points" readOnlyReason={f.readOnlyReason} pending={f.pending} reasonId={reasonId}>
      {editing ? (
        <span
          className="inline-block w-24"
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); finish(true); }
            else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); finish(false); }
          }}
          onBlur={() => finish(true)}
        >
          <NumberInput
            ref={inputRef}
            size="sm"
            aria-label="Points"
            value={draftView}
            min={0}
            max={f.max}
            step={1}
            unit="pts"
            onChange={(v) => setDraft(v)}
            onClear={() => setDraft(undefined)}
          />
        </span>
      ) : editable ? (
        <Button
          variant="link"
          size="sm"
          onClick={start}
          disabled={f.pending}
          aria-label={`Points: ${f.value == null ? 'not set' : f.value}. Edit`}
          className={cn('text-[13px]', f.value == null ? 'text-text-tertiary' : 'text-text-secondary')}
        >
          {label}
        </Button>
      ) : (
        <span
          className={cn('text-[13px]', f.value == null ? 'text-text-tertiary' : 'text-text-secondary')}
          aria-describedby={f.readOnlyReason ? reasonId : undefined}
        >
          {label}
        </span>
      )}
    </Field>
  );
}

function OwnerField({ f }: { f: NonNullable<WorkItemMetaBarProps['owner']> }) {
  const reasonId = useId();
  const editable = !!f.onChange && !f.readOnlyReason;
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const face = f.value ? (
    <>
      <Avatar name={f.value.name} src={f.value.avatarUrl} size={24} />
      <span className="truncate text-[13px] text-text-primary">{f.value.name}</span>
    </>
  ) : (
    <span className="text-[13px] text-text-tertiary">Unassigned</span>
  );
  return (
    <Field name="owner" readOnlyReason={f.readOnlyReason} pending={f.pending} reasonId={reasonId}>
      {editable ? (
        <>
          <button
            ref={triggerRef}
            type="button"
            disabled={f.pending}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label={`Owner: ${f.value?.name ?? 'Unassigned'}. Change owner`}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex min-w-0 cursor-pointer items-center gap-1.5 rounded-md border-none bg-transparent px-1 py-0.5 font-[inherit] hover:bg-surface-hover disabled:cursor-default"
          >
            {face}
          </button>
          <WorkSearchPicker<WorkPerson>
            trigger={triggerRef}
            open={open}
            onClose={() => setOpen(false)}
            label="Search people"
            placeholder="Search people…"
            search={f.onSearchPeople}
            itemKey={(p) => p.id}
            renderItem={(p) => (
              <>
                <Avatar name={p.name} src={p.avatarUrl} size={20} />
                <span className="truncate">{p.name}</span>
              </>
            )}
            onPick={(p) => f.onChange?.(p)}
            footer={f.value ? (
              <Button variant="link" size="sm" onClick={() => { f.onChange?.(null); setOpen(false); }}>
                Unassign
              </Button>
            ) : undefined}
            data-testid="work-owner-picker"
          />
        </>
      ) : (
        <span className="inline-flex min-w-0 items-center gap-1.5" aria-describedby={f.readOnlyReason ? reasonId : undefined}>
          {face}
        </span>
      )}
    </Field>
  );
}

function PriorityField({ f }: { f: NonNullable<WorkItemMetaBarProps['priority']> }) {
  const reasonId = useId();
  const labelId = useId();
  const opt = optionOf(f.options, f.value);
  const editable = !!f.onChange && !f.readOnlyReason;
  return (
    <Field name="priority" readOnlyReason={f.readOnlyReason} pending={f.pending} reasonId={reasonId}>
      <span id={labelId} className="text-[13px] text-text-secondary">Priority:</span>
      {editable ? (
        // The pill Select IS the toned chip, made changeable (see SelectVariant).
        <Select
          size="sm"
          variant="pill"
          tone={opt?.tone ?? 'neutral'}
          aria-labelledby={labelId}
          value={f.value ?? ''}
          placeholder="No priority"
          options={f.options.map(({ value, label }) => ({ value, label }))}
          disabled={f.pending}
          onChange={(e) => f.onChange?.(e.target.value)}
          className="normal-case"
        />
      ) : opt ? (
        <span aria-describedby={f.readOnlyReason ? reasonId : undefined}>
          <Chip tone={opt.tone ?? 'neutral'}>{opt.label}</Chip>
        </span>
      ) : (
        <span className="text-[13px] text-text-tertiary" aria-describedby={f.readOnlyReason ? reasonId : undefined}>
          {f.value ?? 'No priority'}
        </span>
      )}
    </Field>
  );
}

export function WorkItemMetaBar({
  status, points, owner, priority, className, 'data-testid': testId = 'work-item-meta-bar',
}: WorkItemMetaBarProps) {
  const fields: ReactNode[] = [];
  if (status) fields.push(<StatusField key="status" f={status} />);
  if (points) fields.push(<PointsField key="points" f={points} />);
  if (owner) fields.push(<OwnerField key="owner" f={owner} />);
  if (priority) fields.push(<PriorityField key="priority" f={priority} />);
  if (fields.length === 0) return null;
  return (
    <div
      role="group"
      aria-label="Work item details"
      data-testid={testId}
      className={cn('flex flex-wrap items-center gap-x-3 gap-y-2', className)}
    >
      {fields.flatMap((node, i) => (i === 0 ? [node] : [<Separator key={`sep-${i}`} />, node]))}
    </div>
  );
}

export default WorkItemMetaBar;
