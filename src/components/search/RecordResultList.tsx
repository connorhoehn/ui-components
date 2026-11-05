// RecordResultList — a search workspace's Results tab: typed org records
// (people, initiatives, work, decisions, knowledge, agent-library assets)
// grouped by type, each group headed "People 3" with a trailing "See all N →"
// when the host holds more than it shows. Rows are selectable (a checkbox,
// tinted when selected) so the host can ask about, or graph, a selection.
// Since 2.400.0.
//
// Why not DocumentResultList or WorkListView: those are file-shaped and
// work-shaped. A search row is a typed record — a person has an avatar and a
// role, a work item a status dot, a knowledge item a kind mark — and the list
// is grouped by that type.
//
// Navigation: the title is a real <a href>, so a modified click (new tab,
// copy link) is native; a plain click is handed to `onOpen` for the host's
// router. Clicking elsewhere on the row also opens it; the checkbox never does.

import type { MouseEvent, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Checkbox } from '../forms/Checkbox';
import EmptyState from '../shared/EmptyState';
import ErrorState from '../shared/ErrorState';
import { Highlight } from '../shared/Highlight';
import LoadingState from '../shared/LoadingState';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { ArrowRightIcon, ChevronIcon, ExternalLinkIcon, InfoIcon } from '../ui/Icons';
import { Inline, Stack } from '../ui/Stack';
import { RecordMark, RecordStatus, recordResultKey, type RecordResultItem } from './recordMarks';
import { DensityProvider } from '../shared/Density';

export interface RecordResultGroup {
  id: string;
  /** Section heading: "People". */
  label: string;
  /** How many records of this type exist (drawn beside the label). */
  count: number;
  /** The records to draw — may be fewer than `count`. */
  records: RecordResultItem[];
  /** "See all N →" target when `count > records.length`. */
  seeAllHref?: string;
  /** Called on a plain click of "See all"; a modified click on `seeAllHref` stays native. */
  onSeeAll?: () => void;
  /** Draw only the heading, with a ›. */
  collapsed?: boolean;
}

export interface RecordResultListProps {
  groups: RecordResultGroup[];
  /** Selected record keys — `recordResultKey(record)`, i.e. `${type}:${id}`. */
  selectedKeys: readonly string[];
  onToggleSelect: (record: RecordResultItem) => void;
  /** Row click, title click, chevron or open action. */
  onOpen: (record: RecordResultItem) => void;
  /** When set, the row ends in a labelled link ("Open work item ↗") instead of a chevron. */
  openLabel?: (record: RecordResultItem) => string;
  /** Terms marked in every row's title and description (plus each record's own `highlights`). */
  highlightTerms?: readonly string[];
  /** Expand/collapse a group from its heading. Omit and a collapsed heading's › opens "See all". */
  onToggleGroup?: (group: RecordResultGroup) => void;
  loading?: boolean;
  /** A failed read: draws the error and no rows. */
  error?: string | null;
  onRetry?: () => void;
  emptyState?: { title: string; description?: ReactNode };
  /** Under the groups: "2 results in Design System API". */
  footer?: ReactNode;
  /** A quiet line at the end: "Select results to ask about them or view their connections." */
  hint?: string;
  'aria-label'?: string;
  className?: string;
  'data-testid'?: string;
}

const isPlainClick = (event: MouseEvent) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

function SeeAll({ group }: { group: RecordResultGroup }) {
  const label = `See all ${group.count}`;
  const content = (
    <>
      {label}
      <ArrowRightIcon size={14} aria-hidden />
    </>
  );
  if (group.seeAllHref) {
    return (
      <a
        href={group.seeAllHref}
        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        onClick={(event) => {
          if (group.onSeeAll && isPlainClick(event)) {
            event.preventDefault();
            group.onSeeAll();
          }
        }}
      >
        {content}
      </a>
    );
  }
  if (!group.onSeeAll) return null;
  return (
    <Button variant="link" size="sm" onClick={group.onSeeAll} className="gap-1 text-primary">
      {content}
    </Button>
  );
}

function GroupHeading({ group, onToggleGroup }: { group: RecordResultGroup; onToggleGroup?: RecordResultListProps['onToggleGroup'] }) {
  const more = group.count > group.records.length && !group.collapsed;
  const title = (
    <Inline gap="sm" align="baseline" as="span">
      <span className="text-base font-semibold text-text-primary">{group.label}</span>
      <span className="text-sm tabular-nums text-text-tertiary">{group.count}</span>
    </Inline>
  );
  let lead: ReactNode = <h2 className="m-0">{title}</h2>;
  if (onToggleGroup) {
    lead = (
      <h2 className="m-0">
        <Button
          variant="ghost"
          size="sm"
          aria-expanded={!group.collapsed}
          onClick={() => onToggleGroup(group)}
          className="-ml-2 gap-2"
        >
          {title}
          <ChevronIcon size={14} dir={group.collapsed ? 'right' : 'down'} aria-hidden />
        </Button>
      </h2>
    );
  } else if (group.collapsed && (group.onSeeAll || group.seeAllHref)) {
    lead = (
      <Inline gap="xs" align="center">
        <h2 className="m-0">{title}</h2>
        {group.seeAllHref ? (
          <a
            href={group.seeAllHref}
            aria-label={`Show ${group.label}`}
            className="inline-flex items-center text-text-secondary hover:text-text-primary"
            onClick={(event) => {
              if (group.onSeeAll && isPlainClick(event)) {
                event.preventDefault();
                group.onSeeAll();
              }
            }}
          >
            <ChevronIcon size={14} dir="right" aria-hidden />
          </a>
        ) : (
          <IconButton aria-label={`Show ${group.label}`} size="sm" icon={<ChevronIcon size={14} dir="right" />} onClick={group.onSeeAll} />
        )}
      </Inline>
    );
  } else if (group.collapsed) {
    lead = (
      <Inline gap="xs" align="center">
        <h2 className="m-0">{title}</h2>
        <ChevronIcon size={14} dir="right" aria-hidden className="text-text-tertiary" />
      </Inline>
    );
  }
  return (
    <Inline justify="between" align="center" className="min-h-9 py-1" wrap={false}>
      {lead}
      {more && <SeeAll group={group} />}
    </Inline>
  );
}

interface RowProps {
  record: RecordResultItem;
  selected: boolean;
  terms: readonly string[];
  onToggleSelect: (record: RecordResultItem) => void;
  onOpen: (record: RecordResultItem) => void;
  openLabel?: (record: RecordResultItem) => string;
}

function RecordRow({ record, selected, terms, onToggleSelect, onOpen, openLabel }: RowProps) {
  const rowTerms = record.highlights?.length ? [...terms, ...record.highlights] : terms;
  const meta = [record.subtitle, record.matchReason].filter(Boolean) as string[];
  const label = openLabel?.(record);
  const openOnPlainClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    if (isPlainClick(event)) {
      event.preventDefault();
      onOpen(record);
    }
  };
  return (
    <li
      className={cn(
        'group flex cursor-pointer items-start gap-3 border-b border-border px-2 py-3 last:border-b-0 hover:bg-surface-hover',
        selected && 'bg-primary/5 hover:bg-primary/10',
      )}
      data-record-key={recordResultKey(record)}
      data-selected={selected || undefined}
      onClick={() => onOpen(record)}
    >
      <span className="flex h-8 items-center" onClick={(event) => event.stopPropagation()}>
        <Checkbox checked={selected} onChange={() => onToggleSelect(record)} aria-label={`Select ${record.title}`} />
      </span>
      <RecordMark record={record} />
      <Stack gap="none" className="min-w-0 flex-1">
        <a
          href={record.href}
          onClick={openOnPlainClick}
          className="truncate text-sm font-medium text-text-primary hover:text-primary"
        >
          <Highlight text={record.title} terms={rowTerms} />
        </a>
        {record.description && (
          <Highlight text={record.description} terms={rowTerms} className="mt-0.5 line-clamp-2 text-sm text-text-secondary" />
        )}
        {meta.length > 0 && (
          <span className="mt-0.5 truncate text-xs text-text-tertiary">{meta.join(' · ')}</span>
        )}
      </Stack>
      {record.status && <RecordStatus status={record.status} className="flex h-8 shrink-0 items-center" />}
      {label ? (
        <a
          href={record.href}
          onClick={openOnPlainClick}
          className="flex h-8 shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {label}
          <ExternalLinkIcon size={14} aria-hidden />
        </a>
      ) : (
        <IconButton
          aria-label={`Open ${record.title}`}
          size="md"
          className="shrink-0 text-text-tertiary"
          icon={<ChevronIcon size={16} dir="right" />}
          onClick={(event) => {
            event.stopPropagation();
            onOpen(record);
          }}
        />
      )}
    </li>
  );
}

export function RecordResultList({
  groups,
  selectedKeys,
  onToggleSelect,
  onOpen,
  openLabel,
  highlightTerms = [],
  onToggleGroup,
  loading = false,
  error,
  onRetry,
  emptyState,
  footer,
  hint,
  'aria-label': ariaLabel = 'Search results',
  className,
  'data-testid': testId = 'record-result-list',
}: RecordResultListProps) {
  let body: ReactNode;
  if (error) {
    body = <ErrorState title="Search results could not be read" description={error} actionLabel={onRetry ? 'Try again' : undefined} onAction={onRetry} />;
  } else if (loading) {
    body = <LoadingState label="Searching…" />;
  } else if (!groups.some((g) => g.count > 0 || g.records.length > 0)) {
    body = <DensityProvider density="compact"><EmptyState title={emptyState?.title ?? 'No matching records'} description={emptyState?.description} /></DensityProvider>;
  } else {
    const selected = new Set(selectedKeys);
    body = groups
      .filter((g) => g.count > 0 || g.records.length > 0)
      .map((group) => (
        <section data-ui-part="" key={group.id} aria-label={group.label} data-group={group.id} className="border-b border-border last:border-b-0">
          <GroupHeading group={group} onToggleGroup={onToggleGroup} />
          {!group.collapsed && group.records.length > 0 && (
            <ul className="m-0 list-none border-t border-border p-0">
              {group.records.map((record) => (
                <RecordRow
                  key={recordResultKey(record)}
                  record={record}
                  selected={selected.has(recordResultKey(record))}
                  terms={highlightTerms}
                  onToggleSelect={onToggleSelect}
                  onOpen={onOpen}
                  openLabel={openLabel}
                />
              ))}
            </ul>
          )}
        </section>
      ));
  }
  const showChrome = !error && !loading;
  return (
    <Stack gap="sm" className={cn('min-w-0', className)} data-testid={testId} aria-label={ariaLabel} as="div" role="region" aria-busy={loading || undefined}>
      <div>{body}</div>
      {showChrome && footer && <div className="text-sm text-text-secondary">{footer}</div>}
      {showChrome && hint && (
        <Inline gap="sm" align="center" className="border-t border-border pt-3 text-sm text-text-secondary">
          <InfoIcon size={16} aria-hidden />
          <span>{hint}</span>
        </Inline>
      )}
    </Stack>
  );
}

export default RecordResultList;
