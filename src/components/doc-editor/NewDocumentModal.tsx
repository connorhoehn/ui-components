// frontend/src/components/doc-editor/NewDocumentModal.tsx
//
// Modal for creating a new document.

import { useState, useEffect, useRef } from 'react';
import { loadTypes } from '../../hooks/useDocumentTypes';
import type { DocumentType } from '../../types/documentType';
import Modal from '../shared/Modal';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface NewDocumentModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (meta: { title: string; type: string; description?: string; icon: string; documentTypeId: string }) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NewDocumentModal({ open, onClose, onCreate }: NewDocumentModalProps) {
  const [types, setTypes] = useState<DocumentType[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const loaded = loadTypes();
    setTypes(loaded);
    setSelectedId(loaded[0]?.id ?? null);
    setTitle('');
    setDescription('');
    // Cleared on close: an uncancelled focus lands on a hidden input and
    // steals focus back from whatever the user moved to.
    const t = setTimeout(() => titleRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  if (!open) return null;

  const selected = types.find(t => t.id === selectedId);

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (!trimmed || !selected) return;
    onCreate({
      title: trimmed,
      type: selected.name,
      description: description.trim() || undefined,
      icon: selected.icon,
      documentTypeId: selected.id,
    });
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && title.trim() && selected) handleSubmit();
  };

  const canSubmit = !!title.trim() && !!selected;

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth={560}
      zIndex={10000}
      rawChildren
      backdropStyle={{ background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
      cardStyle={{
        border: '1px solid #e2e8f0', borderRadius: 8,
        maxHeight: '90vh', width: '90vw',
        boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        padding: 0,
      }}
    >
      <div onKeyDown={handleKeyDown} className="contents">
        {/* Header */}
        <h2 className={cn('m-0 px-6 pt-6 pb-4 text-lg font-bold text-[#1e293b] shrink-0')}>
          Create New Document
        </h2>

        {/* Scrollable body */}
        <div className={cn('flex-1 overflow-y-auto px-6 min-h-0')}>

          {/* No types defined yet */}
          {types.length === 0 ? (
            <div className={cn('text-center px-4 py-8 border border-dashed border-[#d1d5db] rounded-lg mb-5 text-[#64748b]')}>
              <div className={cn('text-[40px] mb-3')}>📋</div>
              <div className={cn('text-[15px] font-semibold mb-2 text-[#374151]')}>
                No document types defined yet
              </div>
              <div className={cn('text-[13px] text-text-tertiary max-w-xs mx-auto mb-4')}>
                Document types define the sections and structure of your documents.
                Create one first in <strong>☰ → Document Types</strong>.
              </div>
              <button
                onClick={onClose}
                className={cn('px-5 py-2 text-[13px] font-semibold bg-primary text-white border-none rounded-[7px] cursor-pointer font-[inherit]')}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Type picker */}
              <div className={cn('mb-5')}>
                <label className={cn('block text-[13px] font-semibold text-text-secondary mb-2')}>
                  Document Type
                </label>
                <div className={cn('grid grid-cols-2 gap-2')}>
                  {types.map((t) => {
                    const isSelected = selectedId === t.id;
                    return (
                      <button
                        key={t.id}
                        data-testid={`type-option-${t.id}`}
                        onClick={() => setSelectedId(t.id)}
                        className={cn(
                          'flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]',
                          isSelected ? 'bg-[#eff6ff] border-2 border-[#3b82f6]' : 'bg-white border-2 border-border hover:bg-[#f8fafc]',
                        )}
                      >
                        <span className={cn('text-2xl shrink-0')}>{t.icon}</span>
                        <div className={cn('min-w-0')}>
                          <div className={cn('text-sm font-semibold text-[#1e293b] overflow-hidden text-ellipsis whitespace-nowrap')}>
                            {t.name}
                          </div>
                          {t.description && (
                            <div className={cn('text-[11px] text-[#64748b] leading-tight mt-0.5 overflow-hidden line-clamp-2')}>
                              {t.description}
                            </div>
                          )}
                          <div className={cn('text-[11px] text-text-tertiary mt-0.5')}>
                            {t.fields.length} section{t.fields.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                        {isSelected && (
                          <span className={cn('absolute top-1.5 right-2 text-sm text-[#3b82f6] font-bold')}>
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title */}
              <div className={cn('mb-4')}>
                <label className={cn('block text-[13px] font-semibold text-text-secondary mb-1')}>
                  Title <span className={cn('text-[#ef4444]')}>*</span>
                </label>
                <input
                  ref={titleRef}
                  data-testid="new-doc-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={selected ? `e.g. Q2 ${selected.name}` : 'Document title…'}
                  className={cn('w-full px-3 py-2 text-sm border border-border rounded-lg outline-none bg-white text-[#1e293b] box-border font-[inherit] focus:border-[#3b82f6]')}
                />
              </div>

              {/* Description */}
              <div className={cn('mb-5')}>
                <label className={cn('block text-[13px] font-semibold text-text-secondary mb-1')}>
                  Description <span className={cn('text-text-tertiary font-normal')}>(optional)</span>
                </label>
                <textarea
                  data-testid="new-doc-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of this document…"
                  rows={3}
                  className={cn('w-full px-3 py-2 text-sm border border-border rounded-lg outline-none bg-white text-[#1e293b] resize-y box-border font-[inherit] focus:border-[#3b82f6]')}
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {types.length > 0 && (
          <div className={cn('flex justify-end gap-2 px-6 py-4 border-t border-border bg-white shrink-0')}>
            <button
              data-testid="new-doc-cancel"
              onClick={onClose}
              className={cn('px-4 py-2 text-sm font-medium border border-border rounded-lg bg-white text-text-secondary cursor-pointer font-[inherit]')}
            >
              Cancel
            </button>
            <button
              data-testid="new-doc-submit"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={cn(
                'px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]',
                canSubmit ? 'bg-[#3b82f6] cursor-pointer' : 'bg-[#94a3b8] cursor-not-allowed',
              )}
            >
              Create Document
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
