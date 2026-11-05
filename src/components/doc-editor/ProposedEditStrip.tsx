// ProposedEditStrip — an agent's edits to the open document, waiting on a
// human: "Proposed edit · Replace selection · Apply · Discard".
//
// An agent asked from the document's composer does not write into the page.
// Its reply comes back as a PROPOSAL the host holds — where it goes (the
// cursor, or a range it will replace) and what it says — and this strip is how
// a person sees it and decides. Apply is the host's to perform (through its
// own editor), Discard drops it; neither touches a document here. The strip
// owns only the draft of a "Revise…" instruction.
//
// It belongs to the editor frame, not to the composer: a docked composer
// collapses to one row when idle, and a pending edit must stay in view while
// the person reads the page it would change. `EditorShell` draws it in its
// `proposal` slot, between the scrolling surface and the dock; a host
// without the shell places it directly above its composer row.
//
// Statuses: `streaming` (the reply is still arriving — shown with the thinking
// affordance, not yet appliable; Discard cancels), `ready`, `applying` (the
// host is committing it — both actions off), `applied` (a success chip until
// the host clears it), `discarded` (not drawn).

import { useState, type FormEvent } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import Chip from '../shared/Chip';
import { ThinkingDots } from '../shared/ThinkingDots';
import { Input } from '../forms/Input';

export type ProposedEditStatus = 'streaming' | 'ready' | 'applying' | 'applied' | 'discarded';

export interface ProposedEdit {
  /** Stable across re-renders; what the callbacks receive. */
  id: string;
  /** `insert` adds at the anchor; `replace` swaps the anchored range for the content. */
  kind: 'insert' | 'replace';
  /** A document range (editor positions) or the live cursor. */
  anchor: { from: number; to: number } | 'cursor';
  /** What would land. `text` is previewed as-is; `html` is previewed as its text. */
  content: { html?: string; text?: string };
  /** One line saying what the edit does — "Tightens the scope paragraph". */
  summary?: string;
  status: ProposedEditStatus;
}

export interface ProposedEditStripProps {
  proposals: readonly ProposedEdit[];
  onApply: (id: string) => void;
  onDiscard: (id: string) => void;
  /** Wired, a ready proposal offers "Revise…": a one-line instruction sent back with its id. */
  onRevise?: (id: string, instruction: string) => void;
  /** Shown as "Apply all" when more than one proposal is ready. */
  onApplyAll?: () => void;
  /** Shown as "Discard all" when more than one proposal is pending. */
  onDiscardAll?: () => void;
  /** Heading. Default "Proposed edit" / "N proposed edits". */
  title?: string;
  className?: string;
  /** Default `proposed-edit-strip`. Items are `<id>-item`, actions `<id>-apply` etc. */
  'data-testid'?: string;
}

const ENTITIES: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ' };

/** The text a proposal previews: `text` when given, else `html` without its markup. */
export function proposedEditPreview(content: ProposedEdit['content']): string {
  if (content.text != null) return content.text;
  if (!content.html) return '';
  return content.html
    .replace(/<\s*(br|\/p|\/li|\/h[1-6]|\/div)\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTITIES[m] ?? m)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Where the edit lands, in words. */
export function proposedEditPlacement(edit: Pick<ProposedEdit, 'kind' | 'anchor'>): string {
  if (edit.kind === 'replace') return edit.anchor === 'cursor' ? 'Replace at cursor' : 'Replace selection';
  return edit.anchor === 'cursor' ? 'Insert at cursor' : 'Insert';
}

function ProposalRow({ edit, onApply, onDiscard, onRevise, testId }: {
  edit: ProposedEdit;
  onApply: (id: string) => void;
  onDiscard: (id: string) => void;
  onRevise?: (id: string, instruction: string) => void;
  testId: string;
}) {
  const [revising, setRevising] = useState(false);
  const [instruction, setInstruction] = useState('');
  const preview = proposedEditPreview(edit.content);
  const streaming = edit.status === 'streaming';
  const applying = edit.status === 'applying';
  const applied = edit.status === 'applied';
  const submitRevision = (event: FormEvent) => {
    event.preventDefault();
    const text = instruction.trim();
    if (!text || !onRevise) return;
    onRevise(edit.id, text);
    setInstruction('');
    setRevising(false);
  };
  return (
    <li className="flex min-w-0 flex-col gap-1.5 py-2 first:pt-0 last:pb-0" data-status={edit.status} data-proposal-id={edit.id} data-testid={`${testId}-item`}>
      <div className="flex min-w-0 items-center gap-2">
        <Chip size="xs" tone="info" data-testid={`${testId}-placement`}>{proposedEditPlacement(edit)}</Chip>
        {edit.summary && <span className="min-w-0 flex-1 truncate text-[13px] text-text-primary" data-testid={`${testId}-summary`}>{edit.summary}</span>}
        {!edit.summary && <span className="flex-1" />}
        {streaming && (
          <span className="flex shrink-0 items-center gap-1.5 text-[12px] text-text-tertiary" role="status" data-testid={`${testId}-streaming`}>
            <ThinkingDots size="sm" className="text-primary" />
            Drafting…
          </span>
        )}
        {applied && <Chip size="xs" tone="success" data-testid={`${testId}-applied`}>Applied</Chip>}
        {!applied && (
          <span className="flex shrink-0 items-center gap-1">
            {onRevise && edit.status === 'ready' && (
              <Button size="sm" variant="ghost" aria-expanded={revising} onClick={() => setRevising((v) => !v)} data-testid={`${testId}-revise`}>Revise…</Button>
            )}
            <Button size="sm" variant="ghost" disabled={applying} onClick={() => onDiscard(edit.id)} data-testid={`${testId}-discard`}>
              {streaming ? 'Cancel' : 'Discard'}
            </Button>
            <Button size="sm" variant="primary" disabled={streaming || applying || !preview} onClick={() => onApply(edit.id)} data-testid={`${testId}-apply`}>
              {applying ? 'Applying…' : 'Apply'}
            </Button>
          </span>
        )}
      </div>
      {preview && (
        <p className="m-0 line-clamp-3 whitespace-pre-wrap break-words text-[13px] leading-5 text-text-secondary" data-testid={`${testId}-preview`}>{preview}</p>
      )}
      {revising && onRevise && (
        <form className="flex min-w-0 items-center gap-2" onSubmit={submitRevision} data-testid={`${testId}-revise-form`}>
          <Input
            size="sm"
            autoFocus
            value={instruction}
            onChange={(event) => setInstruction(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Escape') { event.preventDefault(); setRevising(false); } }}
            placeholder="How should it change?"
            aria-label="Revision instruction"
            className="min-w-0 flex-1"
            data-testid={`${testId}-revise-input`}
          />
          <Button type="submit" size="sm" variant="secondary" disabled={!instruction.trim()} data-testid={`${testId}-revise-send`}>Send</Button>
        </form>
      )}
    </li>
  );
}

export function ProposedEditStrip({
  proposals,
  onApply,
  onDiscard,
  onRevise,
  onApplyAll,
  onDiscardAll,
  title,
  className,
  'data-testid': testId = 'proposed-edit-strip',
}: ProposedEditStripProps) {
  const visible = proposals.filter((p) => p.status !== 'discarded');
  if (visible.length === 0) return null;
  const ready = visible.filter((p) => p.status === 'ready').length;
  const pending = visible.filter((p) => p.status === 'ready' || p.status === 'streaming').length;
  const heading = title ?? (visible.length === 1 ? 'Proposed edit' : `${visible.length} proposed edits`);
  return (
    <section
      data-ui-part=""
      aria-label={heading}
      aria-live="polite"
      className={cn('flex min-w-0 flex-col gap-2 rounded-md border border-border border-l-[3px] border-l-primary bg-surface px-3 py-2 shadow-sm', className)}
      data-testid={testId}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-text-primary" data-testid={`${testId}-title`}>{heading}</span>
        {onDiscardAll && pending > 1 && (
          <Button size="sm" variant="ghost" onClick={onDiscardAll} data-testid={`${testId}-discard-all`}>Discard all</Button>
        )}
        {onApplyAll && ready > 1 && (
          <Button size="sm" variant="secondary" onClick={onApplyAll} data-testid={`${testId}-apply-all`}>Apply all</Button>
        )}
      </div>
      <ul className="m-0 flex min-w-0 list-none flex-col divide-y divide-border p-0">
        {visible.map((edit) => (
          <ProposalRow key={edit.id} edit={edit} onApply={onApply} onDiscard={onDiscard} {...(onRevise ? { onRevise } : {})} testId={testId} />
        ))}
      </ul>
    </section>
  );
}

export default ProposedEditStrip;
