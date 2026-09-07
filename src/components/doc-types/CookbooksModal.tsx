// frontend/src/components/doc-types/CookbooksModal.tsx
//
// Gallery of prebuilt document type templates ("cookbooks"). Pick one and the
// modal will call createType() to persist it, then invoke onCreated(typeId)
// so the caller can open the wizard for customization.
//
// Modeled after the pipeline TemplatesModal (src/components/pipelines/TemplatesModal.tsx).

import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import Modal from '../shared/Modal';
import {
  documentTypeCookbooks,
  COOKBOOK_CATEGORIES,
  type CookbookCategory,
  type DocumentTypeCookbook,
} from './cookbooks';
import type { DocumentType } from '../../types/documentType';
import type { SaveOutcome } from '../../hooks/useDocumentTypes';

interface CookbooksModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (typeId: string) => void;
  /**
   * Persists the picked cookbook. Async and fallible: `rejected` means the
   * server refused the payload and NOTHING was saved, so the modal must not
   * report success. `offline` did save locally, so it counts as created.
   */
  createType: (
    data: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>,
  ) => Promise<SaveOutcome>;
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

interface CookbookCardProps {
  cookbook: DocumentTypeCookbook;
  onPick: (c: DocumentTypeCookbook) => void;
}

function CookbookCard({ cookbook, onPick }: CookbookCardProps) {
  return (
    <div
      data-testid={`cookbook-card-${cookbook.id}`}
      className="flex flex-col gap-2 w-[220px] min-h-[200px] p-3.5 bg-surface border border-border rounded-[10px] font-inherit"
    >
      <div className="flex items-center gap-2.5">
        <span className="text-2xl" aria-hidden>{cookbook.icon}</span>
        <div className="text-sm font-bold text-text-primary overflow-hidden text-ellipsis">
          {cookbook.name}
        </div>
      </div>
      <div className="text-[11px] text-text-tertiary flex gap-2">
        <span>{cookbook.category}</span>
      </div>
      <div className="text-xs text-text-secondary leading-[1.4] flex-1">
        {cookbook.description}
      </div>
      {cookbook.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {cookbook.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold py-0.5 px-1.5 rounded bg-surface-hover text-text-secondary lowercase"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <button
        type="button"
        data-testid={`cookbook-use-${cookbook.id}`}
        onClick={() => onPick(cookbook)}
        className="mt-auto py-1.5 px-2.5 text-xs font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit"
      >
        Install
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------

export default function CookbooksModal({
  open, onClose, onCreated, createType,
}: CookbooksModalProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CookbookCategory | 'All'>('All');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setSearch('');
    setActiveCategory('All');
    // Cleared on close: an uncancelled focus lands on a hidden input and
    // steals focus back from whatever the user moved to. Same fix as
    // NewDocumentModal, which documents the bug.
    const t = setTimeout(() => searchRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open]);

  const filtered = useMemo(() => {
    let results = documentTypeCookbooks;
    if (activeCategory !== 'All') {
      results = results.filter((c) => c.category === activeCategory);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      results = results.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q),
      );
    }
    return results;
  }, [search, activeCategory]);

  const handlePick = async (cookbook: DocumentTypeCookbook) => {
    if (saving) return; // a second click while in flight would create a duplicate
    setSaving(true);
    setSaveError(null);
    try {
      const outcome = await createType(cookbook.build());
      if (outcome.status === 'rejected') {
        // Nothing was saved. Staying open with the reason beats closing and
        // announcing a type that does not exist.
        setSaveError(outcome.error);
        return;
      }
      // 'offline' persisted to the local cache, so the type really does exist
      // for this user and the caller should proceed to the wizard.
      onClose();
      onCreated(outcome.type.id);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filtered.length > 0) {
      e.preventDefault();
      handlePick(filtered[0]);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Document type cookbooks"
      maxWidth={800}
      backdropTestId="cookbooks-modal"
      rawChildren
    >
      <div className="text-[13px] text-text-secondary mb-3">
        Install a prebuilt document type. You can customize the fields after installing.
      </div>

      {/* Category pills. These are filter toggles: `aria-pressed` is what
          tells a screen-reader user which category is active — the colour
          swap alone said nothing. */}
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-1.5 mb-2.5">
        <button
          type="button"
          data-testid="cookbook-cat-all"
          aria-pressed={activeCategory === 'All'}
          onClick={() => setActiveCategory('All')}
          className={cn(
            'py-1 px-2.5 text-[11px] font-semibold rounded-xl border-none cursor-pointer font-inherit',
            activeCategory === 'All'
              ? 'bg-primary text-white'
              : 'bg-surface-hover text-text-secondary',
          )}
        >
          All
        </button>
        {COOKBOOK_CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat}
            data-testid={`cookbook-cat-${cat.toLowerCase().replace(/[^a-z]/g, '-')}`}
            aria-pressed={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'py-1 px-2.5 text-[11px] font-semibold rounded-xl border-none cursor-pointer font-inherit',
              activeCategory === cat
                ? 'bg-primary text-white'
                : 'bg-surface-hover text-text-secondary',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <Input
        ref={searchRef}
        type="search"
        data-testid="cookbooks-search"
        aria-label="Search cookbooks"
        placeholder="Search cookbooks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        className="mb-3.5"
      />

      {saveError && (
        <div
          data-testid="cookbooks-save-error"
          role="alert"
          className="mb-3 rounded border border-danger-border bg-danger-bg px-3 py-2 text-[13px] text-danger-fg"
        >
          Couldn’t create that type: {saveError}
        </div>
      )}

      {filtered.length === 0 ? (
        <div
          data-testid="cookbooks-empty"
          className="text-center py-8 text-[13px] text-text-tertiary"
        >
          No cookbooks match "{search}".
        </div>
      ) : (
        <div
          data-testid="cookbooks-grid"
          className="grid grid-cols-[repeat(3,220px)] gap-3 justify-center max-h-[60vh] overflow-y-auto p-1"
        >
          {filtered.map((cookbook) => (
            <CookbookCard
              key={cookbook.id}
              cookbook={cookbook}
              onPick={handlePick}
            />
          ))}
        </div>
      )}
    </Modal>
  );
}
