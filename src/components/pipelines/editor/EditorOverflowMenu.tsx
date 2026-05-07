// src/components/pipelines/editor/EditorOverflowMenu.tsx
//
// The dropdown/popover menu triggered by the "..." button in the top bar.
// Actions: duplicate, export mermaid, view versions, revert, tags, run history,
// clear history, simulator (dev-only), delete.

import { cn } from '../../../lib/cn';

export interface EditorOverflowMenuProps {
  isPublished: boolean;
  showTags: boolean;
  hasPublishedVersion: boolean;
  onDuplicate: () => void;
  onCopyMermaid: () => void;
  onViewVersions: () => void;
  onRevert: () => void;
  onToggleShowTags: () => void;
  onViewRunHistory: () => void;
  onClearRunHistory: () => void;
  onSimPanelOpen: () => void;
  onDelete: () => void;
}

export default function EditorOverflowMenu({
  isPublished,
  showTags,
  hasPublishedVersion,
  onDuplicate,
  onCopyMermaid,
  onViewVersions,
  onRevert,
  onToggleShowTags,
  onViewRunHistory,
  onClearRunHistory,
  onSimPanelOpen,
  onDelete,
}: EditorOverflowMenuProps) {
  const itemClasses = cn(
    'block w-full text-left px-3.5 py-2 text-[13px]',
    'border-none bg-transparent cursor-pointer font-inherit text-text-primary',
    'hover:bg-surface-hover',
  );

  const dangerItemClasses = cn(
    'block w-full text-left px-3.5 py-2 text-[13px]',
    'border-none bg-transparent cursor-pointer font-inherit text-red-600',
    'hover:bg-surface-hover',
  );

  return (
    <div
      className={cn(
        'absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg',
        'shadow-lg p-0 min-w-[200px] max-h-[320px] overflow-y-auto z-20',
      )}
      role="menu"
    >
      <button className={itemClasses} role="menuitem" onClick={onDuplicate}>
        Duplicate
      </button>
      <button
        className={itemClasses}
        role="menuitem"
        onClick={onCopyMermaid}
        data-testid="copy-mermaid-btn"
      >
        Copy Mermaid
      </button>
      <button
        className={itemClasses}
        role="menuitem"
        onClick={onViewVersions}
        data-testid="view-versions-btn"
      >
        View changes since publish
      </button>
      <button
        className={itemClasses}
        role="menuitem"
        onClick={onRevert}
        disabled={!hasPublishedVersion}
      >
        Revert to published
      </button>
      <div className="border-t border-slate-100 my-1" />
      <button
        className={itemClasses}
        role="menuitem"
        onClick={onToggleShowTags}
        data-testid="toggle-tags-row"
      >
        {showTags ? 'Hide tags' : 'Show tags'}
      </button>
      <button
        className={itemClasses}
        role="menuitem"
        onClick={onViewRunHistory}
      >
        View run history
      </button>
      <button
        className={dangerItemClasses}
        role="menuitem"
        onClick={onClearRunHistory}
      >
        Clear run history
      </button>
      {import.meta.env.DEV && (
        <>
          <div className="border-t border-slate-100 my-1" />
          <button
            className={itemClasses}
            role="menuitem"
            data-testid="sim-panel-open"
            title="Dev-only event simulator"
            onClick={onSimPanelOpen}
          >
            🧪 Event simulator…
          </button>
        </>
      )}
      <div className="border-t border-slate-100 my-1" />
      <button
        className={dangerItemClasses}
        role="menuitem"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
}
