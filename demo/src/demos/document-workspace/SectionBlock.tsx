import { useState } from 'react';
import { Card, Chip, IconButton } from '@connorhoehn/ui-components/shared';
import type { ChipTone } from '@connorhoehn/ui-components/shared';
import { toolbarButtons } from './MockDocuments';

interface SectionBlockProps {
  id: string;
  title: string;
  type: string;
  collapsed: boolean;
  content: string;
  onToggleCollapse: (id: string) => void;
  onCommentClick: (id: string) => void;
  remoteText?: string;
}

// Section kind -> semantic tone. Replaces the raw per-type hex map that used
// to live in MockDocuments (`typeBadgeColors`): these are UI states, not
// user-distinguishing colour data, so they belong on the tone scale.
const TYPE_TONE: Record<string, ChipTone> = {
  summary: 'accent',
  tasks: 'info',
  decisions: 'warning',
  notes: 'neutral',
  custom: 'success',
};

export function SectionBlock({
  id,
  title,
  type,
  collapsed,
  content,
  onToggleCollapse,
  onCommentClick,
  remoteText,
}: SectionBlockProps) {
  const [localContent, setLocalContent] = useState(content);

  const displayContent = remoteText !== undefined
    ? localContent + remoteText
    : localContent;

  return (
    <Card className="mb-3 border-dashed">
      <div
        className="flex cursor-pointer select-none items-center gap-2 border-b border-border bg-surface-panel px-3 py-2"
        onClick={() => onToggleCollapse(id)}
      >
        <span className="w-4 text-center text-[12px] text-neutral">
          {collapsed ? '▸' : '▾'}
        </span>
        <span className="flex-1 text-[14px] font-semibold text-text-primary">{title}</span>
        <Chip tone={TYPE_TONE[type] ?? 'neutral'} className="capitalize">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Chip>
        <IconButton
          aria-label="Comments"
          size="sm"
          className="text-text-tertiary"
          onClick={(e) => {
            e.stopPropagation();
            onCommentClick(id);
          }}
          title="Comments"
        >
          &#x1F4AC;
        </IconButton>
      </div>
      {!collapsed && (
        <div>
          <div className="flex flex-wrap items-center gap-0.5 border-b border-border-subtle px-3 py-1.5">
            {toolbarButtons.map((btn) => (
              <button
                key={btn.title}
                className="cursor-pointer rounded-sm border border-border-emphasis bg-surface px-2 py-1 font-mono text-[12px] leading-none text-text-secondary"
                title={btn.title}
              >
                {btn.label}
              </button>
            ))}
          </div>
          <div
            className="min-h-15 px-3 pt-3 pb-2 text-[14px] leading-[1.6] text-text-secondary outline-none"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setLocalContent((e.target as HTMLDivElement).textContent || '')}
          >
            {displayContent || (
              <span className="italic text-text-tertiary">Write notes content...</span>
            )}
          </div>
          <div className="px-3 pt-1 pb-2 text-[13px] italic text-text-tertiary">No tasks yet.</div>
          <button className="mx-3 mt-1 mb-3 w-[calc(100%-24px)] cursor-pointer rounded-md border border-dashed border-border-emphasis bg-transparent px-4 py-2 text-center text-[13px] text-neutral">
            + Add item
          </button>
        </div>
      )}
    </Card>
  );
}
