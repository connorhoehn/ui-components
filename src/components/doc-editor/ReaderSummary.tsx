// frontend/src/components/doc-editor/ReaderSummary.tsx
//
// Header banner and executive summary card for ReaderMode.

import type { XmlFragment } from 'yjs';
import * as Y from 'yjs';
import type { DocumentMeta, Section, TaskItem } from '../../types/document';
import TiptapEditor from './TiptapEditor';
import type { CollaborationProvider } from './TiptapEditor';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Style constants (shared with ReaderMode)
// ---------------------------------------------------------------------------

const STATUS_BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  draft: { bg: 'var(--color-warning-bg)', text: 'var(--color-warning-fg)' },
  review: { bg: 'var(--color-info-bg)', text: 'var(--color-info-fg)' },
  final: { bg: 'var(--color-success-bg)', text: 'var(--color-success-fg)' },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(iso: string): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

function groupItems(items: TaskItem[]) {
  const pending: TaskItem[] = [];
  const completed: TaskItem[] = [];
  const rejected: TaskItem[] = [];
  for (const item of items) {
    if (item.status === 'rejected') rejected.push(item);
    else if (item.status === 'acked' || item.status === 'done') completed.push(item);
    else pending.push(item);
  }
  return { pending, completed, rejected };
}

export function generateSummaryBullets(
  allItems: TaskItem[],
  sections: Section[],
): string[] {
  const { pending, completed, rejected } = groupItems(allItems);
  const total = allItems.length;
  const bullets: string[] = [];

  if (total > 0) {
    const pct = Math.round((completed.length / total) * 100);
    bullets.push(
      `${total} action item${total !== 1 ? 's' : ''} identified, ${completed.length} completed (${pct}%).`,
    );
  } else {
    bullets.push('No action items recorded yet.');
  }

  const decisionSections = sections.filter((s) => s.type === 'decisions');
  const decisionItems = decisionSections.flatMap((s) => s.items);
  if (decisionItems.length > 0) {
    const decidedCount = decisionItems.filter(
      (i) => i.status === 'acked' || i.status === 'done',
    ).length;
    bullets.push(
      `${decisionItems.length} key decision${decisionItems.length !== 1 ? 's' : ''} recorded${decidedCount > 0 ? `, ${decidedCount} finalized` : ''}.`,
    );
  }

  if (pending.length > 0) {
    bullets.push(
      `${pending.length} item${pending.length !== 1 ? 's' : ''} still pending review.`,
    );
  }

  if (rejected.length > 0) {
    bullets.push(
      `${rejected.length} item${rejected.length !== 1 ? 's' : ''} rejected and need${rejected.length === 1 ? 's' : ''} revision.`,
    );
  }

  return bullets;
}

// ---------------------------------------------------------------------------
// HeaderBanner
// ---------------------------------------------------------------------------

export function HeaderBanner({
  meta,
  participantCount,
}: {
  meta: DocumentMeta;
  participantCount: number;
}) {
  const sc = STATUS_BADGE_COLORS[meta.status] ?? STATUS_BADGE_COLORS.draft;
  return (
    <div
      className={cn('border-t-[3px] border-t-[#3b82f6] rounded-t-lg pt-5 pb-4 px-6 mb-4 bg-gradient-to-b from-surface-panel to-white col-span-full')}
    >
      <div className={cn('flex items-center gap-3 mb-1.5')}>
        <h1 className={cn('text-xl font-bold m-0 text-text-primary flex-1')}>
          {meta.title || 'Untitled Document'}
        </h1>
        <span
          className={cn('inline-block text-xs font-semibold py-[3px] px-3 rounded-full capitalize')}
          style={{ background: sc.bg, color: sc.text }}
        >
          {meta.status}
        </span>
      </div>
      <div className={cn('text-xs text-neutral')}>
        {meta.createdBy && <>Created by {meta.createdByName || meta.createdBy}</>}
        {meta.createdAt && <> &middot; {formatDate(meta.createdAt)}</>}
        {participantCount > 0 && (
          <> &middot; {participantCount} participant{participantCount !== 1 ? 's' : ''}</>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ExecutiveSummaryCard
// ---------------------------------------------------------------------------

export function ExecutiveSummaryCard({
  bullets,
  contentText,
  fragment,
  ydoc,
  provider,
}: {
  bullets: string[];
  contentText?: string;
  fragment?: XmlFragment | null;
  ydoc?: Y.Doc | null;
  provider?: CollaborationProvider | null;
}) {
  const hasFragment = fragment && ydoc;
  const hasContent = contentText && contentText.trim().length > 0;
  return (
    <div className={cn('bg-white border border-border rounded-lg p-4 mb-4')}>
      <h2 className={cn('text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3')}>Executive Summary</h2>
      {hasFragment ? (
        <div className={cn(
          'py-1 px-3 bg-surface-panel rounded-md border-l-[3px] border-l-[#8b5cf6]',
          bullets.length > 0 ? 'mb-3' : '',
        )}>
          <TiptapEditor
            fragment={fragment}
            ydoc={ydoc}
            provider={provider ?? null}
            user={{ name: '', color: '' }}
            editable={false}
          />
        </div>
      ) : hasContent ? (
        <div className={cn(
          'text-sm text-text-primary leading-relaxed whitespace-pre-wrap py-2 px-3 bg-surface-panel rounded-md border-l-[3px] border-l-[#8b5cf6]',
          bullets.length > 0 ? 'mb-3' : '',
        )}>
          {contentText!.trim()}
        </div>
      ) : null}
      <ul className={cn('m-0 pl-[18px] text-[13px] text-text-primary leading-relaxed')}>
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
