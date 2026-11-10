// SourceCard / SourceList — the evidence behind a record: a Sources panel's
// run notes and clusters, a claim's supporting documents.
//
// A card is a kind mark, a title (a button with `onOpen`, a link with `href`,
// plain text with neither), a quiet age ("9h ago"), and a two-line excerpt.
// `current` marks the source the reader is on (the record a Back returns
// from) with an accent rail and `aria-current`.
//
// Honest by construction like the rest of the Work pieces: an unparseable or
// missing timestamp prints no age rather than "0m ago".

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { FileKindMark, type FileKind } from '../shared/FileKindMark';
import { ChevronIcon } from '../ui/Icons';
import { formatCompactAge } from './compactAge';
import { safeHref } from '../../lib/safeHref';

export interface SourceCardProps {
  id: string;
  title: string;
  /** The mark's kind. Default `page`. */
  kind?: FileKind;
  /** When the source was written. ISO string, epoch ms or Date. */
  timestamp?: string | number | Date | null;
  /** A line or two of what the source says. Clamped to two lines. */
  excerpt?: ReactNode;
  onOpen?: (id: string) => void;
  href?: string;
  /** This is the source being viewed. */
  current?: boolean;
  /**
   * A quiet line under the title that REPLACES the age — "Source pattern ·
   * auth-service". Since 2.389.0.
   */
  meta?: string;
  /**
   * `card` (default): the mark, a title that is the control, the age, the
   * excerpt. `row` (since 2.389.0): a "based on" row — the WHOLE row is one
   * control (a button with `onOpen`, a link with `href`), the mark in a 32px
   * bordered tile, a 13px medium title, a 12px tertiary meta line, and a
   * trailing chevron. No excerpt. The accessible name is the title.
   */
  layout?: 'card' | 'row';
  /** Clock for the age (tests, server-rendered snapshots). Default `Date.now()`. */
  now?: number;
  className?: string;
  'data-testid'?: string;
}

/** "9h ago", "just now", "Sep 3" — `formatCompactAge` read as a sentence. */
export function formatSourceAge(
  value: string | number | Date | null | undefined,
  now: number = Date.now(),
): string | undefined {
  const age = formatCompactAge(value, now);
  if (!age) return undefined;
  if (age === 'now') return 'just now';
  return /^\d+[mhdw]$/.test(age) ? `${age} ago` : age;
}

function SourceTitle({ id, title, onOpen, href }: Pick<SourceCardProps, 'id' | 'title' | 'onOpen' | 'href'>) {
  const cls = 'min-w-0 text-left text-sm font-medium leading-snug text-text-primary';
  if (onOpen) {
    return (
      <button
        data-ui-part=""
        type="button"
        onClick={() => onOpen(id)}
        className={cn(cls, 'cursor-pointer border-none bg-transparent p-0 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary')}
      >
        {title}
      </button>
    );
  }
  if (href) {
    return <a href={safeHref(href) ?? undefined} className={cn(cls, 'no-underline hover:text-primary hover:underline')}>{title}</a>;
  }
  return <span className={cls}>{title}</span>;
}

export function SourceCard({
  id,
  title,
  kind = 'page',
  timestamp,
  excerpt,
  onOpen,
  href,
  current = false,
  meta,
  layout = 'card',
  now,
  className,
  'data-testid': testId = `source-card-${id}`,
}: SourceCardProps) {
  const age = formatSourceAge(timestamp, now);
  const quiet = meta ?? age;
  const quietId = meta != null ? `${testId}-meta` : `${testId}-age`;

  if (layout === 'row') {
    const inner = (
      <>
        <FileKindMark kind={kind} size="xl" variant="outline" className="rounded-md border border-border" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-medium leading-5 text-text-primary" data-testid={`${testId}-title`}>{title}</span>
          {quiet && <span className="truncate text-[12px] leading-4 text-text-tertiary" data-testid={quietId}>{quiet}</span>}
        </span>
        {(onOpen || href) && <ChevronIcon dir="right" size={16} aria-hidden="true" className="shrink-0 text-text-secondary" data-testid={`${testId}-chevron`} />}
      </>
    );
    const rowCls = cn(
      'flex w-full min-w-0 items-center gap-3 px-0 py-2 text-left',
      current && 'bg-surface-hover',
      className,
    );
    const interactive = 'cursor-pointer border-none bg-transparent no-underline hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
    const common = { 'data-testid': testId, 'data-layout': 'row', 'data-ui-source-row': '', 'aria-label': title, ...(current ? { 'aria-current': 'true' as const } : {}) };
    if (onOpen) {
      return <button data-ui-part="" type="button" onClick={() => onOpen(id)} className={cn(rowCls, interactive)} {...common}>{inner}</button>;
    }
    if (href) {
      return <a href={safeHref(href) ?? undefined} className={cn(rowCls, interactive)} {...common}>{inner}</a>;
    }
    return <div className={rowCls} data-testid={testId} data-layout="row" data-ui-source-row="" {...(current ? { 'aria-current': 'true' as const } : {})}>{inner}</div>;
  }

  return (
    <div
      className={cn(
        'flex min-w-0 items-start gap-3 border-l-2 py-3 pl-2.5 pr-1',
        current ? 'border-primary bg-surface-hover' : 'border-transparent',
        className,
      )}
      data-testid={testId}
      {...(current ? { 'aria-current': 'true' as const } : {})}
    >
      <FileKindMark kind={kind} size="md" variant="plain" className="mt-px" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <SourceTitle id={id} title={title} onOpen={onOpen} href={href} />
        {quiet && <span className="text-[12px] text-text-tertiary" data-testid={quietId}>{quiet}</span>}
        {excerpt != null && excerpt !== '' && (
          <p className="m-0 mt-0.5 line-clamp-2 text-[12px] leading-relaxed text-text-secondary">{excerpt}</p>
        )}
      </div>
    </div>
  );
}

export type SourceListItem = Omit<SourceCardProps, 'now' | 'className' | 'data-testid' | 'layout'>;

export interface SourceListProps {
  items: SourceListItem[];
  /** Shown when `items` is empty. Default "No sources recorded". */
  emptyLabel?: string;
  /** Applied to every card that has no handler of its own. */
  onOpen?: (id: string) => void;
  now?: number;
  /** Forwarded to every card — `row` for a "Based on" list. Since 2.389.0. */
  layout?: 'card' | 'row';
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

export function SourceList({
  items,
  emptyLabel = 'No sources recorded',
  onOpen,
  now,
  layout = 'card',
  className,
  'aria-label': ariaLabel = 'Sources',
  'data-testid': testId = 'source-list',
}: SourceListProps) {
  if (items.length === 0) {
    return <p className={cn('m-0 py-3 text-[13px] text-text-tertiary', className)} data-testid={`${testId}-empty`}>{emptyLabel}</p>;
  }
  return (
    <ul className={cn('m-0 flex list-none flex-col divide-y divide-border p-0', layout === 'row' && 'border-y border-border', className)} aria-label={ariaLabel} data-testid={testId} data-layout={layout}>
      {items.map((item) => (
        <li key={item.id} className="min-w-0">
          <SourceCard {...item} onOpen={item.onOpen ?? (item.href ? undefined : onOpen)} now={now} layout={layout} />
        </li>
      ))}
    </ul>
  );
}

export default SourceCard;
