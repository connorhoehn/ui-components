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

interface CookbooksModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (typeId: string) => void;
  createType: (data: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>) => DocumentType;
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
      className="flex flex-col gap-2 w-[220px] min-h-[200px] p-3.5 bg-white border border-border rounded-[10px] font-inherit"
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
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setSearch('');
      setActiveCategory('All');
      setTimeout(() => searchRef.current?.focus(), 30);
    }
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

  const handlePick = (cookbook: DocumentTypeCookbook) => {
    const data = cookbook.build();
    const created = createType(data);
    onClose();
    onCreated(created.id);
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

      {/* Category pills */}
      <div className="flex flex-wrap gap-1.5 mb-2.5">
        <button
          type="button"
          data-testid="cookbook-cat-all"
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
        placeholder="Search cookbooks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        className="mb-3.5"
      />

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
