// OutcomeSection — the "what does done look like" paragraph of a work item,
// editable in place.
//
// Reading is the common case, so the text renders as plain prose; editing
// swaps it for a Textarea (blur or ⌘/Ctrl+Enter saves, Escape cancels). An
// empty outcome says so ("No outcome yet") instead of inventing a sentence,
// and offers "Add outcome" only when the caller can actually save one.

import { useEffect, useId, useRef, useState } from 'react';
import { DetailSection } from '../shared/DetailSection';
import { Textarea } from '../forms/Textarea';
import { Button } from '../ui/Button';
import { Spinner } from '../shared/Spinner';
import VisuallyHidden from '../shared/VisuallyHidden';

export interface OutcomeSectionProps {
  title?: string;
  /** Semantic heading level; use h2 for a section directly under the page title. */
  as?: 'h2' | 'h3' | 'h4';
  value: string | null;
  onChange?: (v: string) => void;
  placeholder?: string;
  readOnlyReason?: string;
  pending?: boolean;
  /** Suppress DetailSection's leading rule. */
  first?: boolean;
  /**
   * `heading` (default since 2.386.15): a 16px sentence-case heading, 14px
   * body, affordances quiet until hover — a work item's Brief. `label`: the
   * small uppercase caption under a hairline, for a side panel.
   */
  variant?: 'label' | 'heading';
  /**
   * `heading` only: `lg` (since 2.390.0) is `DetailSection size="lg"` — a
   * 19px heading ("Why this matters") over a 15px body.
   */
  size?: 'md' | 'lg';
  className?: string;
  'data-testid'?: string;
}

export function OutcomeSection({
  title = 'Outcome', value, onChange, placeholder = 'What is true when this is done?',
  readOnlyReason, pending = false, first, as, variant = 'heading', size = 'md', className, 'data-testid': testId = 'outcome-section',
}: OutcomeSectionProps) {
  const editable = !!onChange && !readOnlyReason;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const done = useRef(false);
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const reasonId = useId();
  const text = value?.trim() ? value : null;
  const body = variant === 'heading'
    ? (size === 'lg' ? 'text-[15px] leading-6' : 'text-sm leading-5')
    : 'text-sm leading-relaxed';

  useEffect(() => { if (editing) ref.current?.focus(); }, [editing]);

  const start = () => { setDraft(value ?? ''); done.current = false; setEditing(true); };
  const finish = (commit: boolean) => {
    if (done.current) return;
    done.current = true;
    setEditing(false);
    const next = draft.trim();
    if (commit && next !== (value ?? '').trim()) onChange?.(next);
  };

  const actions = editable && !editing && text ? (
    <Button variant="link" size="sm" className="text-sm" onClick={start} disabled={pending} aria-label={`Edit ${title.toLowerCase()}`}>
      Edit
    </Button>
  ) : undefined;

  const hint = pending ? (
    <span className="inline-flex items-center gap-1"><Spinner size="sm" decorative /> Saving…</span>
  ) : editing ? '⌘Enter to save · Esc to cancel' : undefined;

  return (
    <DetailSection as={as} title={title} hint={hint} actions={actions} first={first} variant={variant} {...(size === 'lg' ? { size } : {})} className={className} data-testid={testId}>
      {/* lg: the text starts 27px under the heading's centre, as the
          Initiatives mockup sets it — the heading row's 8px gap is too loose
          for a paragraph (it suits a ruled list). */}
      <div aria-busy={pending || undefined} title={readOnlyReason} className={size === 'lg' ? '-mt-1.5' : undefined}>
        {editing ? (
          <Textarea
            ref={ref}
            aria-label={title}
            value={draft}
            placeholder={placeholder}
            autoResize
            minRows={2}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => finish(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); finish(true); }
              else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); finish(false); }
            }}
          />
        ) : text ? (
          editable ? (
            <button
              type="button"
              onClick={start}
              disabled={pending}
              className={`m-0 w-full cursor-text whitespace-pre-wrap rounded-md border-none bg-transparent p-0 text-left font-[inherit] ${body} text-text-primary hover:bg-surface-hover disabled:cursor-default`}
            >
              {text}
            </button>
          ) : (
            <p className={`m-0 whitespace-pre-wrap ${body} text-text-primary`} aria-describedby={readOnlyReason ? reasonId : undefined}>
              {text}
            </p>
          )
        ) : (
          <div className="flex items-center gap-2">
            <p className="m-0 text-xs text-text-tertiary" aria-describedby={readOnlyReason ? reasonId : undefined}>
              No outcome yet
            </p>
            {editable && (
              <Button variant="link" size="sm" onClick={start} disabled={pending}>Add outcome</Button>
            )}
          </div>
        )}
        {readOnlyReason && <VisuallyHidden id={reasonId}>{readOnlyReason}</VisuallyHidden>}
      </div>
    </DetailSection>
  );
}

export default OutcomeSection;
