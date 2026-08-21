// frontend/src/components/doc-editor/ReaderSectionCard.tsx
//
// Renders section summaries in ReaderMode: expandable sections with
// rich-text content, task items, and comments preview.

import { useState } from 'react';
import type { XmlFragment } from 'yjs';
import * as Y from 'yjs';
import type { Section, TaskItem, CommentThread } from '../../types/document';
import TiptapEditor from './TiptapEditor';
import type { CollaborationProvider } from './TiptapEditor';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Style constants
// ---------------------------------------------------------------------------

const STATUS_COLORS = {
  pending: '#f59e0b',
  done: '#10b981',
  acked: '#10b981',
  rejected: '#ef4444',
} as const;

const PRIORITY_COLORS = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#6b7280',
} as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function statusIcon(status: TaskItem['status']): string {
  switch (status) {
    case 'acked':
    case 'done':
      return '✅';
    case 'rejected':
      return '❌';
    default:
      return '⬜';
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

// ---------------------------------------------------------------------------
// CollapsibleGroup (used by ActionItemsCard)
// ---------------------------------------------------------------------------

function CollapsibleGroup({
  label,
  count,
  color,
  defaultOpen,
  children,
}: {
  label: string;
  count: number;
  color: string;
  defaultOpen: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={cn('mb-2')}>
      <button
        onClick={() => setOpen(!open)}
        className={cn('bg-transparent border-none cursor-pointer flex items-center gap-1.5 py-1 px-0 text-[13px] font-semibold text-text-primary font-[inherit] w-full')}
      >
        <span
          className={cn('inline-block text-[10px] transition-transform duration-150 ease-in-out', open ? 'rotate-90' : 'rotate-0')}
        >
          {'▶'}
        </span>
        <span style={{ color }}>{label}</span>
        <span
          className={cn('text-[11px] px-2 py-px rounded-full font-semibold')}
          style={{ background: `${color}18`, color }}
        >
          {count}
        </span>
      </button>
      {open && <div className={cn('pl-4 mt-1')}>{children}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ItemRow
// ---------------------------------------------------------------------------

function ItemRow({
  item,
  variant,
}: {
  item: TaskItem;
  variant: 'pending' | 'completed' | 'rejected';
}) {
  const borderColor =
    variant === 'pending'
      ? STATUS_COLORS.pending
      : variant === 'completed'
        ? STATUS_COLORS.done
        : STATUS_COLORS.rejected;

  return (
    <div
      className={cn('flex items-center gap-2 py-[5px] px-2 mb-1 rounded-r', variant === 'pending' ? 'bg-warning-bg' : 'bg-white')}
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      <span className={cn('text-[13px] flex-1')}>
        <span
          className={cn(
            variant === 'completed' ? 'line-through text-text-tertiary' : 'text-text-primary',
          )}
        >
          {item.text}
        </span>
      </span>

      {item.priority && (
        <span
          className={cn('text-[10px] font-semibold px-1.5 py-px rounded-full uppercase shrink-0')}
          style={{ background: `${PRIORITY_COLORS[item.priority]}18`, color: PRIORITY_COLORS[item.priority] }}
        >
          {item.priority}
        </span>
      )}

      {item.ackedBy && (
        <span className={cn('text-[11px] text-text-tertiary shrink-0')}>
          {item.ackedBy}
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// KeyDecisionsCard
// ---------------------------------------------------------------------------

export function KeyDecisionsCard({ sections }: { sections: Section[] }) {
  const decisionSections = sections.filter((s) => s.type === 'decisions');
  const items = decisionSections.flatMap((s) => s.items);

  return (
    <div className={cn('bg-white border border-border rounded-lg p-4 mb-4')}>
      <h2 className={cn('text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3')}>Key Decisions</h2>
      {items.length === 0 ? (
        <div className={cn('text-[13px] text-text-tertiary italic')}>
          No decisions recorded
        </div>
      ) : (
        <div className={cn('flex flex-col gap-1.5')}>
          {items.map((item) => (
            <div
              key={item.id}
              className={cn('flex items-start gap-2 text-[13px] text-text-primary')}
            >
              <span className={cn('shrink-0')}>{statusIcon(item.status)}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ActionItemsCard
// ---------------------------------------------------------------------------

export function ActionItemsCard({ allItems }: { allItems: TaskItem[] }) {
  const { pending, completed, rejected } = groupItems(allItems);

  return (
    <div className={cn('bg-white border border-border rounded-lg p-4 mb-4')}>
      <h2 className={cn('text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3')}>Action Items</h2>

      {allItems.length === 0 ? (
        <div className={cn('text-[13px] text-text-tertiary italic')}>
          No action items yet
        </div>
      ) : (
        <>
          {pending.length > 0 && (
            <CollapsibleGroup
              label="Pending"
              count={pending.length}
              color={STATUS_COLORS.pending}
              defaultOpen={true}
            >
              {pending.map((item) => (
                <ItemRow key={item.id} item={item} variant="pending" />
              ))}
            </CollapsibleGroup>
          )}

          {completed.length > 0 && (
            <CollapsibleGroup
              label="Completed"
              count={completed.length}
              color={STATUS_COLORS.done}
              defaultOpen={false}
            >
              {completed.map((item) => (
                <ItemRow key={item.id} item={item} variant="completed" />
              ))}
            </CollapsibleGroup>
          )}

          {rejected.length > 0 && (
            <CollapsibleGroup
              label="Rejected"
              count={rejected.length}
              color={STATUS_COLORS.rejected}
              defaultOpen={false}
            >
              {rejected.map((item) => (
                <ItemRow key={item.id} item={item} variant="rejected" />
              ))}
            </CollapsibleGroup>
          )}
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SectionSummariesCard
// ---------------------------------------------------------------------------

export function SectionSummariesCard({
  sections,
  commentCounts,
  sectionContentTexts,
  comments,
  getSectionFragment,
  ydoc,
  provider,
}: {
  sections: Section[];
  commentCounts?: Record<string, number>;
  sectionContentTexts?: Record<string, string>;
  comments?: Record<string, CommentThread[]>;
  getSectionFragment?: (sectionId: string) => XmlFragment | null;
  ydoc?: Y.Doc | null;
  provider?: CollaborationProvider | null;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const TYPE_BADGE_COLORS: Record<string, { bg: string; text: string }> = {
    summary: { bg: '#e0e7ff', text: '#4338ca' },
    tasks: { bg: '#dbeafe', text: '#1e40af' },
    decisions: { bg: '#fce7f3', text: '#9d174d' },
    notes: { bg: '#f0fdf4', text: '#166534' },
    custom: { bg: '#f3f4f6', text: '#6b7280' },
  };

  return (
    <div className={cn('bg-white border border-border rounded-lg p-4 mb-4')}>
      <h2 className={cn('text-xs font-semibold uppercase tracking-wide text-neutral m-0 mb-3')}>Section Summaries</h2>
      {sections.length === 0 ? (
        <div className={cn('text-[13px] text-text-tertiary italic')}>
          No sections
        </div>
      ) : (
        <div className={cn('flex flex-col gap-0.5')}>
          {sections.map((section) => {
            const done = section.items.filter(
              (i) => i.status === 'acked' || i.status === 'done',
            ).length;
            const total = section.items.length;
            const commentCount = commentCounts?.[section.id] ?? 0;
            const sectionContent = sectionContentTexts?.[section.id] ?? '';
            const sectionComments = comments?.[section.id] ?? [];
            const isOpen = !!expanded[section.id];
            const hasContent = sectionContent.trim().length > 0;
            const tc = TYPE_BADGE_COLORS[section.type] ?? TYPE_BADGE_COLORS.custom;

            return (
              <div
                key={section.id}
                id={`section-${section.id}`}
                data-testid={`reader-section-${section.id}`}
              >
                <button
                  onClick={() => toggle(section.id)}
                  className={cn(
                    'border-none cursor-pointer flex items-center gap-2 py-2 px-1.5 rounded-md w-full font-[inherit] text-[13px] text-text-primary transition-colors duration-100',
                    isOpen ? 'bg-surface-panel' : 'bg-transparent',
                  )}
                >
                  <span
                    className={cn('text-[10px] transition-transform duration-150 ease-in-out shrink-0', isOpen ? 'rotate-90' : 'rotate-0')}
                  >
                    {'▶'}
                  </span>
                  <span className={cn('font-semibold flex-1 text-left')}>
                    {section.title}
                  </span>
                  <span
                    className={cn('text-[10px] font-semibold px-2 py-px rounded-full capitalize shrink-0')}
                    style={{ background: tc.bg, color: tc.text }}
                  >
                    {section.type}
                  </span>
                  {total > 0 && (
                    <span className={cn('text-[11px] text-neutral shrink-0')}>
                      {done}/{total} done
                    </span>
                  )}
                  {commentCount > 0 && (
                    <span className={cn('text-[11px] text-neutral shrink-0')}>
                      {commentCount} comment{commentCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </button>

                {isOpen && (
                  <div className={cn('pl-6 pb-2')}>
                    {/* Rich-text content */}
                    {(() => {
                      const frag = getSectionFragment?.(section.id);
                      if (frag && ydoc) {
                        return (
                          <div className={cn(
                            'py-1 px-2.5 bg-surface-panel rounded border-l-2 border-l-[#cbd5e1]',
                            section.items.length > 0 ? 'mb-2' : '',
                          )}>
                            <TiptapEditor
                              fragment={frag}
                              ydoc={ydoc}
                              provider={provider ?? null}
                              user={{ name: '', color: '' }}
                              editable={false}
                            />
                          </div>
                        );
                      }
                      if (hasContent) {
                        return (
                          <div className={cn(
                            'text-[13px] text-text-primary leading-relaxed whitespace-pre-wrap py-2 px-2.5 bg-surface-panel rounded border-l-2 border-l-[#cbd5e1]',
                            section.items.length > 0 ? 'mb-2' : '',
                          )}>
                            {sectionContent.trim()}
                          </div>
                        );
                      }
                      return null;
                    })()}

                    {/* Task items */}
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className={cn('flex items-center gap-1.5 py-[3px] text-xs text-neutral')}
                      >
                        <span className={cn('shrink-0')}>{statusIcon(item.status)}</span>
                        <span
                          className={cn(
                            (item.status === 'acked' || item.status === 'done') ? 'line-through' : '',
                          )}
                        >
                          {item.text}
                        </span>
                      </div>
                    ))}

                    {/* Comments summary */}
                    {sectionComments.length > 0 && (
                      <div className={cn('mt-2 pt-1.5 border-t border-border-subtle')}>
                        <div className={cn('text-[11px] font-semibold text-text-tertiary mb-1')}>
                          Comments ({commentCount})
                        </div>
                        {sectionComments.slice(0, 3).map(c => (
                          <div key={c.id} className={cn('text-xs text-neutral py-0.5 flex gap-1.5')}>
                            <span className={cn('font-semibold text-text-secondary shrink-0')}>
                              {c.displayName}:
                            </span>
                            <span className={cn('overflow-hidden text-ellipsis whitespace-nowrap')}>
                              {c.text}
                            </span>
                          </div>
                        ))}
                        {sectionComments.length > 3 && (
                          <div className={cn('text-[11px] text-text-tertiary mt-0.5')}>
                            +{sectionComments.length - 3} more
                          </div>
                        )}
                      </div>
                    )}

                    {/* Empty state */}
                    {!hasContent && section.items.length === 0 && sectionComments.length === 0 && (
                      <div className={cn('text-xs text-text-tertiary italic')}>
                        No content in this section
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
