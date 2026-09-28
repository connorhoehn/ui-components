// Shared pieces of the search domain's rows: the record shape, its key, the
// leading mark (avatar for a person, a tinted kind glyph otherwise) and the
// status tone. RecordResultList and CitedRecordList both draw these, so they
// live here once and the two lists cannot drift.

import type { ReactNode } from 'react';
import { Avatar } from '../shared/Avatar';
import { StatusDot } from '../shared/StatusDot';
import { toneVar, type Tone } from '../shared/tones';
import { BranchIcon, ChecklistIcon, DocumentIcon, FolderIcon, SparkleIcon, WarningIcon } from '../ui/Icons';

export type RecordResultType = 'person' | 'initiative' | 'work' | 'decision' | 'knowledge' | 'asset';

/** One typed org record, as a search read model returns it. */
export interface RecordResultItem {
  id: string;
  type: RecordResultType;
  title: string;
  description?: string;
  /** The meta line's first half: "Owner · Auth Migration", "Guide · Published". */
  subtitle?: string;
  /** Raw status ("in_progress", "blocked"); drawn as a dot + label. */
  status?: string;
  href: string;
  /** Why the record matched: "Matched through initiative membership". */
  matchReason?: string;
  /** Terms the host wants marked in this row, merged with the list's `highlightTerms`. */
  highlights?: string[];
  avatarUrl?: string;
}

/** The key a selection holds: `${type}:${id}` (the portal's `recordKey`). */
export const recordResultKey = (record: Pick<RecordResultItem, 'type' | 'id'>): string => `${record.type}:${record.id}`;

/** Plural section labels per type — the default group headings. */
export const RECORD_TYPE_LABELS: Record<RecordResultType, string> = {
  person: 'People',
  initiative: 'Initiatives',
  work: 'Work',
  decision: 'Decisions',
  knowledge: 'Knowledge',
  asset: 'Agent library',
};

const DANGER = new Set(['blocked', 'failed', 'at_risk', 'error', 'cancelled', 'canceled']);
const SUCCESS = new Set(['open', 'in_progress', 'active', 'published', 'running', 'todo']);

/** blocked → danger, open / in_progress → success, everything else (done, draft…) → neutral. */
export function recordStatusTone(status: string | undefined | null): Tone {
  const key = (status ?? '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  if (DANGER.has(key)) return 'danger';
  if (SUCCESS.has(key)) return 'success';
  return 'neutral';
}

/** "in_progress" → "In progress". */
export function recordStatusLabel(status: string): string {
  const words = status.replace(/[_-]+/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

const KIND: Record<Exclude<RecordResultType, 'person'>, { tone: Tone; icon: (size: number) => ReactNode }> = {
  initiative: { tone: 'info', icon: (s) => <FolderIcon size={s} /> },
  work: { tone: 'info', icon: (s) => <ChecklistIcon size={s} /> },
  decision: { tone: 'warning', icon: (s) => <BranchIcon size={s} /> },
  knowledge: { tone: 'accent', icon: (s) => <DocumentIcon size={s} /> },
  asset: { tone: 'success', icon: (s) => <SparkleIcon size={s} /> },
};

/** The row's leading mark. Decorative: the title beside it is the accessible name. */
export function RecordMark({ record, size = 32 }: { record: RecordResultItem; size?: number }) {
  if (record.type === 'person') {
    return (
      <span aria-hidden className="inline-flex shrink-0">
        <Avatar name={record.title} src={record.avatarUrl} size={size} showTitle={false} />
      </span>
    );
  }
  const kind = KIND[record.type];
  const blocked = record.type === 'work' && recordStatusTone(record.status) === 'danger';
  const glyph = Math.round(size / 2);
  return (
    <span aria-hidden className="inline-flex shrink-0" data-record-mark={record.type}>
      <Avatar
        name={record.title}
        size={size}
        tone={blocked ? 'danger' : kind.tone}
        icon={blocked ? <WarningIcon size={glyph} /> : kind.icon(glyph)}
        showTitle={false}
      />
    </span>
  );
}

/** Status dot + label, toned by `recordStatusTone`. */
export function RecordStatus({ status, className }: { status: string; className?: string }) {
  const tone = recordStatusTone(status);
  return (
    <span className={className} data-testid="record-status" data-tone={tone}>
      <StatusDot color={toneVar(tone)} label={recordStatusLabel(status)} className="whitespace-nowrap" />
    </span>
  );
}
