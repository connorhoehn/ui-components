// LinkedItemsSection — a work item's "Dependencies & decisions": the other
// documents it depends on or was decided by, each with that document's own
// current status.
//
// A row is a kind mark, a link-styled title (an href, an onOpen, or plain text
// when neither), a quiet relation label, and a right-aligned StatusPill. The
// pill is the LINKED document's status as the caller read it; when there is
// none the pill is simply absent — a grey "Unknown" chip would be a
// placeholder pretending to be data. "Add link" opens the same search picker
// the meta bar's owner field uses, with a relation choice above the search.

import { useRef, useState } from 'react';
import { DetailSection } from '../shared/DetailSection';
import { FileKindMark, type FileKind } from '../shared/FileKindMark';
import { StatusPill, type StatusPillTone } from '../shared/StatusPill';
import { Link } from '../shared/Link';
import { Select } from '../forms/Select';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { CloseIcon, PlusIcon } from '../ui/Icons';
import { WorkSearchPicker } from './WorkItemMetaBar';
import VisuallyHidden from '../shared/VisuallyHidden';

export interface LinkedItem {
  id: string;
  title: string;
  kind?: FileKind;
  /** e.g. 'Depends on' | 'Decided by'. */
  relation?: string;
  status?: { label: string; tone: StatusPillTone } | null;
  onOpen?: () => void;
  href?: string;
  onRemove?: () => void;
}

export interface LinkableDocument { id: string; title: string; kind?: FileKind }

export interface LinkRelationOption { value: string; label: string }

export interface LinkedItemsSectionProps {
  title?: string;
  items: LinkedItem[];
  onSearchDocuments?: (q: string) => Promise<LinkableDocument[]> | LinkableDocument[];
  onAdd?: (doc: LinkableDocument, relation: string) => void;
  relations?: LinkRelationOption[];
  emptyLabel?: string;
  first?: boolean;
  /**
   * `heading` (default since 2.386.14): a 16px heading, 14px rows, the status
   * as a soft tag, the relation read out (and on hover) rather than printed,
   * and "Add link" quiet until the section is hovered — a work item's Brief.
   * `label`: the small caption, printed relation and dotted pill.
   */
  variant?: 'label' | 'heading';
  className?: string;
  'data-testid'?: string;
}

export const DEFAULT_LINK_RELATIONS: LinkRelationOption[] = [
  { value: 'depends-on', label: 'Depends on' },
  { value: 'decided-by', label: 'Decided by' },
];

function ItemTitle({ item, large }: { item: LinkedItem; large: boolean }) {
  const cls = large ? 'min-w-0 truncate text-left text-sm' : 'min-w-0 truncate text-left text-[13px]';
  if (item.href) return <Link href={item.href} className={cls}>{item.title}</Link>;
  if (item.onOpen) {
    return <Button variant="link" size="sm" onClick={item.onOpen} className={cls}>{item.title}</Button>;
  }
  return <span className={`${cls} text-text-primary`}>{item.title}</span>;
}

export function LinkedItemsSection({
  title = 'Dependencies & decisions', items, onSearchDocuments, onAdd,
  relations = DEFAULT_LINK_RELATIONS, emptyLabel = 'No linked documents',
  first, variant = 'heading', className, 'data-testid': testId = 'linked-items-section',
}: LinkedItemsSectionProps) {
  const heading = variant === 'heading';
  const [open, setOpen] = useState(false);
  const [relation, setRelation] = useState(relations[0]?.value ?? '');
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const canAdd = !!onAdd && !!onSearchDocuments;

  const actions = canAdd ? (
    <Button
      ref={triggerRef}
      variant="link"
      size="sm"
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={() => setOpen((o) => !o)}
      className="inline-flex items-center gap-1 text-[13px] font-medium"
    >
      <PlusIcon size={12} aria-hidden="true" />
      Add link
    </Button>
  ) : undefined;

  return (
    <DetailSection title={title} actions={actions} first={first} variant={variant} className={className} data-testid={testId}>
      {items.length === 0 ? (
        <p className={heading ? 'm-0 text-sm text-text-tertiary' : 'm-0 text-[13px] text-text-tertiary'}>{emptyLabel}</p>
      ) : (
        <ul className={heading ? 'm-0 flex list-none flex-col p-0' : 'm-0 flex list-none flex-col gap-1 p-0'} aria-label={title}>
          {items.map((item) => (
            <li
              key={item.id}
              className={heading ? 'group flex min-h-[29px] items-center gap-2.5' : 'group flex min-h-7 items-center gap-2'}
              {...(heading && item.relation ? { title: item.relation } : {})}
              data-testid={`linked-item-${item.id}`}
            >
              <FileKindMark kind={item.kind ?? 'page'} size={heading ? 'md' : 'sm'} variant="plain" />
              <ItemTitle item={item} large={heading} />
              {item.relation && (heading
                ? <VisuallyHidden>{`(${item.relation})`}</VisuallyHidden>
                : <span className="shrink-0 text-[11px] text-text-tertiary">{item.relation}</span>)}
              <span className="flex-1" />
              {item.status && <StatusPill tone={item.status.tone} label={item.status.label} size="sm" {...(heading ? { variant: 'tag' as const } : {})} />}
              {item.onRemove && (
                <IconButton
                  size="sm"
                  aria-label={`Remove link to "${item.title}"`}
                  icon={<CloseIcon size={12} />}
                  onClick={item.onRemove}
                  className="opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                />
              )}
            </li>
          ))}
        </ul>
      )}
      {canAdd && (
        <WorkSearchPicker<LinkableDocument>
          trigger={triggerRef}
          open={open}
          onClose={() => setOpen(false)}
          label="Search documents"
          placeholder="Search documents…"
          search={onSearchDocuments}
          itemKey={(d) => d.id}
          renderItem={(d) => (
            <>
              <FileKindMark kind={d.kind ?? 'page'} size="sm" variant="plain" />
              <span className="truncate">{d.title}</span>
            </>
          )}
          onPick={(d) => onAdd?.(d, relation)}
          header={relations.length > 1 ? (
            <Select
              size="sm"
              aria-label="Relation"
              value={relation}
              options={relations}
              onChange={(e) => setRelation(e.target.value)}
              className="mb-1.5"
            />
          ) : undefined}
          data-testid="linked-items-picker"
        />
      )}
    </DetailSection>
  );
}

export default LinkedItemsSection;
