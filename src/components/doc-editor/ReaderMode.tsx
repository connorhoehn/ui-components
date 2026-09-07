// frontend/src/components/doc-editor/ReaderMode.tsx
//
// Executive briefing dashboard -- synthesized summary view that makes a
// collaborative document useful at a glance.  Two-column layout with
// main content cards (executive summary, decisions, action items, section
// summaries) and a sidebar (progress, participants, document stats).
//
// Layout container that composes sub-components:
//   - ReaderSummary (HeaderBanner, ExecutiveSummaryCard)
//   - ReaderSectionCard (KeyDecisionsCard, ActionItemsCard, SectionSummariesCard)
//
// ## Section-shaped documents only
//
// Everything here is derived from `sections`. A page-shaped document
// (`meta.schemaVersion >= 2`) has none — its content is one `body` XmlFragment
// — so this renders an empty shell on a canvas, and on a CONVERTED document it
// renders the frozen pre-conversion sections as though they were the current
// page. Neither raises anything. The caller gates on the shape before mounting
// this; see EditorModeSwitch's `isCanvas` and ./canvas/documentShape.

import type { XmlFragment } from 'yjs';
import * as Y from 'yjs';
import type { Section, Participant, DocumentMeta, CommentThread } from '../../types/document';
import type { CollaborationProvider } from './TiptapEditor';
import { HeaderBanner, ExecutiveSummaryCard, generateSummaryBullets } from './ReaderSummary';
import { KeyDecisionsCard, ActionItemsCard, SectionSummariesCard } from './ReaderSectionCard';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ReaderModeProps {
  sections: Section[];
  participants: Participant[];
  meta: DocumentMeta;
  commentCounts?: Record<string, number>; // sectionId -> count
  /** Plain-text content extracted from each section's Y.XmlFragment */
  sectionContentTexts?: Record<string, string>;
  /** Threaded comments per section */
  comments?: Record<string, CommentThread[]>;
  /** Y.js fragment getter for rich-text rendering */
  getSectionFragment?: (sectionId: string) => XmlFragment | null;
  /** Y.Doc instance for collaboration */
  ydoc?: Y.Doc | null;
  /** Collaboration provider for awareness */
  provider?: CollaborationProvider | null;
}

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

function progressColor(pct: number): string {
  if (pct >= 75) return 'var(--color-success)';
  if (pct >= 25) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

const MODE_DOT_COLORS: Record<string, string> = {
  editor: 'var(--color-success)',
  reviewer: 'var(--color-warning)',
  reader: 'var(--color-text-tertiary)',
};

const MODE_LABELS: Record<string, string> = {
  editor: 'editing',
  reviewer: 'reviewing',
  reader: 'reading',
};

// ---------------------------------------------------------------------------
// Sidebar sub-components
// ---------------------------------------------------------------------------

// Phase 51 / hub#60 — sticky-left table of contents.
// Renders one anchor link per section that scrolls to
// `#section-${section.id}` (added in ReaderSectionCard). Sticky so it
// remains visible while the operator scrolls long documents.
function TocCard({ sections }: { sections: Section[] }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string): void => {
    // Smooth-scroll without disturbing browser history with a hash fragment.
    e.preventDefault();
    const target = document.getElementById(`section-${id}`);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside
      data-testid="reader-toc"
      className={cn('sticky top-4 self-start bg-surface border border-border rounded-lg p-4 mb-3')}
    >
      <h3 className={cn('text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3')}>Contents</h3>
      <nav>
        <ol className={cn('list-none m-0 p-0 flex flex-col gap-1')}>
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#section-${s.id}`}
                data-testid={`toc-link-${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className={cn('block py-1 px-1.5 text-[13px] text-text-secondary no-underline rounded border-l-2 border-l-transparent transition-colors duration-75 hover:bg-surface-hover hover:border-l-primary')}
              >
                <span className={cn('font-medium text-text-primary')}>{i + 1}.</span>{' '}
                {s.title || `Section ${i + 1}`}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}

function ProgressCard({
  reviewed,
  total,
}: {
  reviewed: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((reviewed / total) * 100) : 0;
  const color = progressColor(pct);

  return (
    <div className={cn('bg-surface border border-border rounded-lg p-4 mb-3')}>
      <h3 className={cn('text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3')}>Progress</h3>
      <div className={cn('flex items-baseline gap-1 mb-2')}>
        <span className={cn('text-[28px] font-bold leading-none')} style={{ color }}>
          {pct}%
        </span>
      </div>
      <div className={cn('h-2 bg-surface-emphasis rounded overflow-hidden mb-1.5')}>
        <div
          className={cn('h-full rounded transition-[width] duration-300 ease-in-out')}
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <div className={cn('text-xs text-neutral')}>
        {reviewed} of {total} items reviewed
      </div>
    </div>
  );
}

function ContributorsCard({ participants, meta }: { participants: Participant[]; meta: DocumentMeta }) {
  // Deduplicate by userId, showing unique contributors
  const seen = new Set<string>();
  const contributors: { name: string; color: string; mode?: string; isOnline: boolean }[] = [];

  for (const p of participants) {
    const key = p.userId || p.clientId;
    if (seen.has(key)) continue;
    seen.add(key);
    contributors.push({ name: p.displayName, color: p.color, mode: p.mode, isOnline: true });
  }

  // Add document creator if not already in the list
  if (meta.createdBy && !seen.has(meta.createdBy)) {
    contributors.push({ name: meta.createdByName || meta.createdBy, color: '#6b7280', isOnline: false });
  }

  return (
    <div className={cn('bg-surface border border-border rounded-lg p-4 mb-3')}>
      <h3 className={cn('text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3')}>Contributors</h3>
      {/* Bubble row */}
      <div className={cn('flex flex-wrap gap-1.5 mb-3')}>
        {contributors.map((c, i) => {
          const initials = c.name.split(' ').map(w => w[0] ?? '').join('').toUpperCase().slice(0, 2);
          return (
            <div key={`${c.name}-${i}`} title={`${c.name}${c.mode ? ` (${MODE_LABELS[c.mode] ?? c.mode})` : ''}`} className={cn('relative')}>
              <div
                className={cn('w-8 h-8 rounded-full text-white flex items-center justify-center text-[11px] font-bold')}
                style={{ background: c.color }}
              >
                {initials}
              </div>
              {c.isOnline && (
                <div
                  className={cn('absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white')}
                  style={{ background: MODE_DOT_COLORS[c.mode ?? 'reader'] ?? 'var(--color-text-tertiary)' }}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Detail list */}
      <div className={cn('flex flex-col gap-1.5')}>
        {contributors.map((c, i) => (
          <div key={`detail-${c.name}-${i}`} className={cn('flex items-center gap-2 text-[13px]')}>
            <span
              className={cn('w-2 h-2 rounded-full shrink-0')}
              style={{ background: c.isOnline ? (MODE_DOT_COLORS[c.mode ?? 'reader'] ?? 'var(--color-text-tertiary)') : 'var(--color-border-field)' }}
            />
            <span className={cn('font-medium text-text-primary flex-1')}>
              {c.name}
            </span>
            <span className={cn('text-[11px] text-text-tertiary')}>
              {c.isOnline ? (MODE_LABELS[c.mode ?? ''] ?? 'online') : 'offline'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentStatsCard({
  sections,
  allItems,
  completedCount,
  commentCounts,
  meta,
}: {
  sections: Section[];
  allItems: import('../../types/document').TaskItem[];
  completedCount: number;
  commentCounts?: Record<string, number>;
  meta: DocumentMeta;
}) {
  const totalComments = commentCounts
    ? Object.values(commentCounts).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div className={cn('bg-surface border border-border rounded-lg p-4 mb-3')}>
      <h3 className={cn('text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3')}>Document Info</h3>
      <div className={cn('flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle')}>
        <span className={cn('text-neutral')}>Sections</span>
        <span className={cn('font-semibold')}>{sections.length}</span>
      </div>
      <div className={cn('flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle')}>
        <span className={cn('text-neutral')}>Total tasks</span>
        <span className={cn('font-semibold')}>{allItems.length}</span>
      </div>
      <div className={cn('flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle')}>
        <span className={cn('text-neutral')}>Completed</span>
        <span className={cn('font-semibold text-success-fg')}>{completedCount}</span>
      </div>
      {totalComments > 0 && (
        <div className={cn('flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle')}>
          <span className={cn('text-neutral')}>Comments</span>
          <span className={cn('font-semibold')}>{totalComments}</span>
        </div>
      )}
      {meta.createdAt && (
        <div className={cn('flex justify-between py-1 text-[13px] text-text-primary border-b border-border-subtle')}>
          <span className={cn('text-neutral')}>Created</span>
          <span className={cn('font-medium text-xs')}>{formatDate(meta.createdAt)}</span>
        </div>
      )}
      {meta.updatedAt && (
        <div className={cn('flex justify-between py-1 text-[13px] text-text-primary')}>
          <span className={cn('text-neutral')}>Last changed</span>
          <span className={cn('font-medium text-xs')}>{formatDate(meta.updatedAt)}</span>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ReaderMode({
  sections,
  participants,
  meta,
  commentCounts,
  sectionContentTexts,
  comments,
  getSectionFragment,
  ydoc,
  provider,
}: ReaderModeProps) {
  const allItems = sections.flatMap((s) => s.items);
  const reviewed = allItems.filter((i) => i.status !== 'pending').length;
  const completedCount = allItems.filter(
    (i) => i.status === 'acked' || i.status === 'done',
  ).length;

  const summaryBullets = generateSummaryBullets(allItems, sections);
  const showToc = sections.length >= 2;

  return (
    <div
      className={cn('grid gap-4 mx-auto', showToc ? '[grid-template-columns:200px_1fr_280px] max-w-[1300px]' : '[grid-template-columns:1fr_280px] max-w-[1100px]')}
    >
      {/* Header spanning all columns */}
      <HeaderBanner meta={meta} participantCount={participants.length} />

      {/* Phase 51 / hub#60 — sticky-left TOC when 2+ sections exist. */}
      {showToc && <TocCard sections={sections} />}

      {/* Main content column */}
      <div>
        <ExecutiveSummaryCard
          bullets={summaryBullets}
          contentText={(() => {
            const summarySection = sections.find(s => s.type === 'summary');
            return summarySection ? sectionContentTexts?.[summarySection.id] : undefined;
          })()}
          fragment={(() => {
            const summarySection = sections.find(s => s.type === 'summary');
            return summarySection ? getSectionFragment?.(summarySection.id) : null;
          })()}
          ydoc={ydoc}
          provider={provider}
        />
        <KeyDecisionsCard sections={sections} />
        <ActionItemsCard allItems={allItems} />
        <SectionSummariesCard
          sections={sections}
          commentCounts={commentCounts}
          sectionContentTexts={sectionContentTexts}
          comments={comments}
          getSectionFragment={getSectionFragment}
          ydoc={ydoc}
          provider={provider}
        />
      </div>

      {/* Sidebar column */}
      <div>
        <ProgressCard reviewed={reviewed} total={allItems.length} />
        <ContributorsCard participants={participants} meta={meta} />
        <DocumentStatsCard
          sections={sections}
          allItems={allItems}
          completedCount={completedCount}
          commentCounts={commentCounts}
          meta={meta}
        />
      </div>
    </div>
  );
}
