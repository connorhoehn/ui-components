// src/components/pipelines/PipelinesBulkActionBar.tsx
//
// Sticky bulk-action bar shown when at least one pipeline is selected.
// Actions: clear, publish, archive, export JSON, export all, add/remove tag, delete.

import { useEffect, useRef, useState } from 'react';
import { useEventCallback } from '../../hooks/useEventCallback';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PipelinesBulkActionBarProps {
  count: number;
  onClear: () => void;
  onExport: () => void;
  onExportAsJSON: () => void;
  onPublish: () => void;
  onArchive: () => void;
  onAddTag: () => void;
  onRemoveTag: () => void;
  onDelete: () => void;
  onDeleteWithConfirm: () => void;
  addTagOpen: boolean;
  removeTagOpen: boolean;
  onSubmitAddTag: (tag: string) => void;
  onSubmitRemoveTag: (tag: string) => void;
  onCloseAddTag: () => void;
  onCloseRemoveTag: () => void;
  unionTags: string[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const pillBtn = cn(
  'px-2.5 py-[5px] text-xs font-semibold',
  'bg-surface text-text-secondary',
  'border border-border-field rounded-md',
  'cursor-pointer font-inherit',
);

export default function PipelinesBulkActionBar({
  count,
  onClear,
  onExport,
  onExportAsJSON,
  onPublish,
  onArchive,
  onAddTag,
  onRemoveTag,
  onDelete,
  onDeleteWithConfirm,
  addTagOpen,
  removeTagOpen,
  onSubmitAddTag,
  onSubmitRemoveTag,
  onCloseAddTag,
  onCloseRemoveTag,
  unionTags,
}: PipelinesBulkActionBarProps) {
  const [addTagText, setAddTagText] = useState('');
  const addTagInputRef = useRef<HTMLInputElement>(null);
  const addTagPopoverRef = useRef<HTMLDivElement>(null);
  const removeTagPopoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (addTagOpen) {
      setAddTagText('');
      setTimeout(() => addTagInputRef.current?.focus(), 30);
    }
  }, [addTagOpen]);

  // Stable identities so the deferred click-outside registrations below are
  // not restarted by a parent re-render handing us new inline arrows — the
  // handler would then never register and the popover could not be dismissed
  // by clicking away.
  const closeAddTag = useEventCallback(onCloseAddTag);
  const closeRemoveTag = useEventCallback(onCloseRemoveTag);

  // Click-outside to dismiss the add-tag popover.
  useEffect(() => {
    if (!addTagOpen) return;
    const handler = (e: MouseEvent) => {
      if (!addTagPopoverRef.current?.contains(e.target as Node)) closeAddTag();
    };
    const id = window.setTimeout(() => {
      document.addEventListener('mousedown', handler);
    }, 0);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener('mousedown', handler);
    };
  }, [addTagOpen, closeAddTag]);

  // Click-outside to dismiss the remove-tag popover.
  useEffect(() => {
    if (!removeTagOpen) return;
    const handler = (e: MouseEvent) => {
      if (!removeTagPopoverRef.current?.contains(e.target as Node)) closeRemoveTag();
    };
    const id = window.setTimeout(() => {
      document.addEventListener('mousedown', handler);
    }, 0);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener('mousedown', handler);
    };
  }, [removeTagOpen, closeRemoveTag]);

  const handleAddTagSubmit = () => {
    const v = addTagText.trim();
    if (v.length === 0) return;
    onSubmitAddTag(v);
    setAddTagText('');
  };

  return (
    <div
      data-testid="bulk-action-bar"
      className={cn(
        'min-h-[40px] shrink-0 flex items-center gap-3 px-6',
        'border-b border-border bg-primary-bg',
        'sticky top-[56px] z-[1]',
      )}
    >
      <span
        data-testid="bulk-count"
        className="text-[13px] font-semibold text-text-primary"
      >
        {count} selected
      </span>
      <span className="text-text-tertiary">·</span>

      <button data-testid="bulk-clear" className={pillBtn} onClick={onClear}>
        Clear
      </button>
      <button data-testid="bulk-publish" className={pillBtn} onClick={onPublish}>
        Publish selected
      </button>
      <button data-testid="bulk-archive" className={pillBtn} onClick={onArchive}>
        Archive selected
      </button>
      <button data-testid="bulk-export-json" className={pillBtn} onClick={onExportAsJSON}>
        Export selected as JSON
      </button>
      <button data-testid="bulk-export" className={pillBtn} onClick={onExport}>
        Export all
      </button>
      <button
        data-testid="bulk-delete-confirm-prompt"
        className={pillBtn}
        onClick={onDeleteWithConfirm}
      >
        Delete selected
      </button>

      {/* Add tag button + popover */}
      <div className="relative">
        <button data-testid="bulk-add-tag-btn" className={pillBtn} onClick={onAddTag}>
          Add tag...
        </button>
        {addTagOpen && (
          <div
            ref={addTagPopoverRef}
            data-testid="bulk-add-tag-popover"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'absolute top-full left-0 mt-1.5',
              'bg-surface border border-border rounded-lg',
              'shadow-lg min-w-[220px] p-2.5 z-10',
              'flex flex-col gap-2',
            )}
          >
            <Input
              ref={addTagInputRef}
              size="sm"
              data-testid="bulk-add-tag-input"
              placeholder="Tag name"
              value={addTagText}
              onChange={(e) => setAddTagText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTagSubmit();
                } else if (e.key === 'Escape') {
                  e.preventDefault();
                  onCloseAddTag();
                }
              }}
              className={cn(
                'border border-border-field rounded-md px-2.5 py-1.5 text-[13px]',
                'bg-surface-inset text-text-primary outline-none w-full',
              )}
              aria-label="Tag name"
            />
            <button
              data-testid="bulk-add-tag-submit"
              disabled={addTagText.trim().length === 0}
              onClick={handleAddTagSubmit}
              className={cn(
                'px-2.5 py-[5px] text-xs font-semibold',
                'bg-primary text-white border-none rounded-md',
                'disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
              )}
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Remove tag button + popover */}
      <div className="relative">
        <button
          data-testid="bulk-remove-tag-btn"
          className={cn(
            pillBtn,
            unionTags.length === 0 && 'opacity-50 cursor-not-allowed',
          )}
          onClick={onRemoveTag}
          disabled={unionTags.length === 0}
          title={
            unionTags.length === 0
              ? 'No tags on selected pipelines'
              : 'Remove tag from selected'
          }
        >
          Remove tag...
        </button>
        {removeTagOpen && (
          <div
            ref={removeTagPopoverRef}
            data-testid="bulk-remove-tag-popover"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'absolute top-full left-0 mt-1.5',
              'bg-surface border border-border rounded-lg',
              'shadow-lg min-w-[220px] max-w-[320px] p-2.5 z-10',
              'flex flex-col gap-2',
            )}
          >
            <div className="text-xs text-text-secondary">
              Click a tag to remove it from all selected:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {unionTags.length === 0 ? (
                <div className="text-xs text-text-tertiary">No tags to remove.</div>
              ) : (
                unionTags.map((tag) => (
                  <button
                    key={tag}
                    data-testid={`bulk-remove-tag-chip-${tag}`}
                    onClick={() => onSubmitRemoveTag(tag)}
                    className={cn(
                      'px-2 py-0.5 text-xs font-medium',
                      'bg-danger-bg text-danger-fg',
                      'border border-danger-border rounded-full',
                      'cursor-pointer font-inherit',
                    )}
                  >
                    {tag} ✕
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <button
        data-testid="bulk-delete"
        className={cn(
          'px-3 py-[5px] text-xs font-semibold',
          'bg-danger text-white border-none rounded-md',
          'cursor-pointer font-inherit ml-auto',
        )}
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
}
