// CitedRecordList — the records an assistant answer was built from, drawn
// under the answer: the people it names ("People in context"), the work it
// points at ("Work to coordinate"), then every numbered source as a chip.
// Since 2.400.0.
//
// Each record carries `n`, its citation number in the answer's numbered
// context ("[1]"). A row may cite more than one source (`citations`, e.g. a
// person who is the owner in [1] and the assignee in [2]); it defaults to its
// own `[n]`. Every citation and every source chip opens the record it names.
//
// Records whose type has no section appear only as sources. The host owns the
// numbering, the hrefs and navigation; plain clicks go to `onOpen`, modified
// clicks on the links stay native.

import type { MouseEvent, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Chip from '../shared/Chip';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { ArrowRightIcon, ChevronIcon } from '../ui/Icons';
import { Inline, Stack } from '../ui/Stack';
import { RecordMark, RecordStatus, recordResultKey, type RecordResultItem, type RecordResultType } from './recordMarks';

export interface CitedRecordItem extends RecordResultItem {
  /** The record's citation number in the answer. */
  n: number;
  /** Source numbers this row cites; default `[n]`. */
  citations?: number[];
}

export interface CitedRecordSection {
  type: RecordResultType;
  title: string;
}

export interface CitedRecordListProps {
  records: CitedRecordItem[];
  /** Default: person → "People in context", work → "Work to coordinate". */
  sections?: CitedRecordSection[];
  onOpen: (record: CitedRecordItem) => void;
  /** Draws "View these connections →". */
  onViewConnections?: () => void;
  viewConnectionsLabel?: string;
  /** Default "Sources". */
  sourcesLabel?: string;
  /** A quiet closing line: "Based on project roles and linked work." */
  footnote?: string;
  className?: string;
  'data-testid'?: string;
}

export const DEFAULT_CITED_SECTIONS: CitedRecordSection[] = [
  { type: 'person', title: 'People in context' },
  { type: 'work', title: 'Work to coordinate' },
];

const isPlainClick = (event: MouseEvent) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

function Citations({ numbers, byNumber, onOpen }: { numbers: number[]; byNumber: Map<number, CitedRecordItem>; onOpen: (r: CitedRecordItem) => void }) {
  return (
    <Inline gap="xs" wrap={false} className="shrink-0" data-testid="citations">
      {numbers.map((n) => {
        const source = byNumber.get(n);
        const pill = 'rounded-sm px-1 text-xs font-medium tabular-nums text-primary';
        if (!source) return <span key={n} className={pill}>[{n}]</span>;
        return (
          <a
            key={n}
            href={source.href}
            aria-label={`Source ${n}: ${source.title}`}
            className={cn(pill, 'hover:bg-primary-bg')}
            onClick={(event) => {
              event.stopPropagation();
              if (isPlainClick(event)) {
                event.preventDefault();
                onOpen(source);
              }
            }}
          >
            [{n}]
          </a>
        );
      })}
    </Inline>
  );
}

function CitedRow({ record, byNumber, onOpen }: { record: CitedRecordItem; byNumber: Map<number, CitedRecordItem>; onOpen: (r: CitedRecordItem) => void }) {
  const person = record.type === 'person';
  const line = person ? record.description : record.subtitle;
  return (
    <li
      className="flex cursor-pointer items-center gap-3 border-b border-border px-3 py-2.5 last:border-b-0 hover:bg-surface-hover"
      onClick={() => onOpen(record)}
      data-record-key={recordResultKey(record)}
    >
      <RecordMark record={record} size={person ? 36 : 32} />
      <Stack gap="none" className="min-w-0 flex-1">
        <span className="truncate text-sm">
          <a
            href={record.href}
            className="font-medium text-text-primary hover:text-primary"
            onClick={(event) => {
              event.stopPropagation();
              if (isPlainClick(event)) {
                event.preventDefault();
                onOpen(record);
              }
            }}
          >
            {record.title}
          </a>
          {person && record.subtitle && <span className="text-text-secondary"> · {record.subtitle}</span>}
        </span>
        {line && <span className="truncate text-xs text-text-tertiary">{line}</span>}
      </Stack>
      {!person && record.status && <RecordStatus status={record.status} className="shrink-0" />}
      <Citations numbers={record.citations?.length ? record.citations : [record.n]} byNumber={byNumber} onOpen={onOpen} />
      {!person && (
        <IconButton
          aria-label={`Open ${record.title}`}
          size="sm"
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

export function CitedRecordList({
  records,
  sections = DEFAULT_CITED_SECTIONS,
  onOpen,
  onViewConnections,
  viewConnectionsLabel = 'View these connections',
  sourcesLabel = 'Sources',
  footnote,
  className,
  'data-testid': testId = 'cited-record-list',
}: CitedRecordListProps) {
  if (!records.length) return null;
  const byNumber = new Map<number, CitedRecordItem>();
  for (const r of records) if (!byNumber.has(r.n)) byNumber.set(r.n, r);
  const sources = [...byNumber.values()].sort((a, b) => a.n - b.n);

  const blocks: ReactNode[] = sections.map((section) => {
    const rows = records.filter((r) => r.type === section.type);
    if (!rows.length) return null;
    return (
      <section key={section.type} aria-label={section.title}>
        <Stack gap="xs">
          <h4 className="m-0 text-sm font-semibold text-text-primary">{section.title}</h4>
          <ul className="m-0 list-none overflow-hidden rounded-md border border-border p-0">
            {rows.map((r) => <CitedRow key={recordResultKey(r)} record={r} byNumber={byNumber} onOpen={onOpen} />)}
          </ul>
        </Stack>
      </section>
    );
  });

  return (
    <Stack gap="md" className={cn('min-w-0', className)} data-testid={testId}>
      {blocks}
      <section aria-label={sourcesLabel}>
        <Stack gap="xs">
          <h4 className="m-0 text-sm font-semibold text-text-primary">{sourcesLabel}</h4>
          <Inline gap="sm" justify="between" align="center">
            <Inline gap="sm">
              {sources.map((r) => (
                <Button
                  key={r.n}
                  variant="secondary"
                  size="sm"
                  className="gap-2"
                  onClick={() => onOpen(r)}
                  aria-label={`Source ${r.n}: ${r.title}`}
                >
                  <Chip size="xs" tone="neutral">{r.n}</Chip>
                  <span className="max-w-56 truncate">{r.title}</span>
                </Button>
              ))}
            </Inline>
            {onViewConnections && (
              <Button variant="link" size="sm" className="gap-1 text-primary" onClick={onViewConnections}>
                {viewConnectionsLabel}
                <ArrowRightIcon size={14} aria-hidden />
              </Button>
            )}
          </Inline>
        </Stack>
      </section>
      {footnote && <span className="text-xs text-text-tertiary">{footnote}</span>}
    </Stack>
  );
}

export default CitedRecordList;
