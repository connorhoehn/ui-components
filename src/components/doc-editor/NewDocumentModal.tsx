// frontend/src/components/doc-editor/NewDocumentModal.tsx
//
// Modal for creating a new document.
//
// ## Why there is a shape question here
//
// There are two authoring surfaces, and both are wanted. A `page` is one
// continuous document — the Google-Docs/Confluence shape, and the one the
// canvas editor renders. `sections` is the older shape: an ordered list of
// section forms, which is what makes the product usable as a todo creator or a
// notepad. Neither is being phased out.
//
// The question is asked at CREATION because that is the only moment it is
// cheap. Afterwards, changing shape means migrating real content, which is a
// separate, reviewable operation (see the bulk migration surface in the app).
//
// `page` is preselected: it is the norm for new work. `sections` stays one
// click away, on purpose.
//
// The word `schemaVersion` deliberately does not appear in the UI. It is the
// implementation of the choice, not the choice — a person picking here is
// choosing between a continuous page and a set of section forms.

import { useState, useEffect, useId, useRef } from 'react';
import { loadTypes, refreshTypesFromServer } from '../../hooks/useDocumentTypes';
import type { DocumentType } from '../../types/documentType';
import Modal from '../shared/Modal';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import { Textarea } from '../forms/Textarea';
import { SelectableCard } from '../ui/SelectableCard';
import Chip from '../shared/Chip';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

/**
 * Which authoring surface a new document opens in.
 *
 * `page` becomes `meta.schemaVersion = 2` on the document's CRDT — the one
 * gate the editor branches on. Doing that translation is the host's job, not
 * this modal's; the modal only reports which shape the person chose.
 */
export type DocumentShape = 'page' | 'sections' | 'diagram';

export interface NewDocumentModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (meta: {
    title: string;
    type: string;
    description?: string;
    icon: string;
    /**
     * Absent for a diagram: a whiteboard has no document type, so there is no id
     * to send. Optional rather than a sentinel — a fake id would be looked up
     * somewhere eventually and found missing.
     */
    documentTypeId?: string;
    shape: DocumentShape;
  }) => void;
}

/** The two shapes, with the words a person picking between them needs. */
const SHAPES: ReadonlyArray<{
  id: DocumentShape;
  icon: string;
  name: string;
  description: string;
}> = [
  {
    id: 'page',
    icon: '📄',
    name: 'Page',
    description:
      'One continuous document. Headings, paragraphs, lists and tables flow down a single sheet — like Google Docs or Confluence.',
  },
  {
    id: 'sections',
    icon: '🗂️',
    name: 'Sections',
    description:
      'A structured set of section forms — task lists, decisions and notes, each in its own box. Better as a todo creator or a notepad.',
  },
  {
    id: 'diagram',
    icon: '🖉',
    name: 'Diagram',
    description:
      'A whiteboard. Shapes, arrows and text on an infinite canvas, drawn with others in real time — opens full width with the sidebar out of the way.',
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NewDocumentModal({ open, onClose, onCreate }: NewDocumentModalProps) {
  const [types, setTypes] = useState<DocumentType[]>([]);
  /**
   * True until we know what the SERVER has.
   *
   * Without it a cold cache renders "No document types defined yet — create one
   * first", which is not merely unhelpful, it is WRONG: the types exist, and
   * following that advice creates duplicates of them. Any fresh browser,
   * incognito window or cleared profile hit it, and so did every client after a
   * server-side wipe, because `refreshTypesFromServer` treats a marked type the
   * server no longer lists as deleted and drops it from the cache.
   */
  const [probing, setProbing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // Canvas preselected — see the file header.
  const [shape, setShape] = useState<DocumentShape>('page');
  const titleRef = useRef<HTMLInputElement>(null);
  // Ids that tie each visible label to the control it names. Before these,
  // the association was purely visual: focusing the title field announced
  // only its placeholder.
  const uid = useId();
  const shapeGroupLabelId = `${uid}-shape-label`;
  const typeGroupLabelId = `${uid}-type-label`;
  const titleFieldId = `${uid}-title`;
  const descriptionFieldId = `${uid}-description`;

  useEffect(() => {
    if (!open) return;
    // Cache first so the form paints immediately, then reconcile with the
    // server. The cache is a speed-up, not the source of truth — it used to be
    // the only thing consulted, so a client that had never opened the Document
    // Types page believed none existed.
    const loaded = loadTypes();
    setTypes(loaded);
    setSelectedId(loaded[0]?.id ?? null);
    setTitle('');
    setDescription('');
    setShape('page');

    let cancelled = false;
    setProbing(true);
    void refreshTypesFromServer()
      .then((res) => {
        if (cancelled) return;
        // On failure keep whatever the cache had: offline with a warm cache is
        // still a usable form, and blanking it would be a worse answer than a
        // stale one.
        const next = res.ok ? res.types : res.cached;
        setTypes(next);
        setSelectedId((cur) => (cur && next.some((t) => t.id === cur) ? cur : next[0]?.id ?? null));
      })
      .finally(() => { if (!cancelled) setProbing(false); });
    // Cleared on close: an uncancelled focus lands on a hidden input and
    // steals focus back from whatever the user moved to.
    const t = setTimeout(() => titleRef.current?.focus(), 50);
    return () => { cancelled = true; clearTimeout(t); };
  }, [open]);

  if (!open) return null;

  const selected = types.find(t => t.id === selectedId);

  /**
   * Which shapes a document type is REQUIRED for.
   *
   * Only `sections`: a type is what defines the sections a document starts
   * with, so that shape cannot be made without one. A diagram is a whiteboard
   * and has no type at all; a page is one continuous document, and a type only
   * decorates it — supplying the icon and the chip the document list shows.
   *
   * This used to be `shape !== 'diagram'`, and the modal refused to open at all
   * with zero types — a whole "Create New Document" dialog whose only control
   * was Close, telling you to go define a type somewhere else first. Meanwhile
   * the conversation surface has always created untyped documents happily, so
   * the requirement was not even true of the product.
   */
  const needsType = shape === 'sections';
  const noTypesYet = types.length === 0 && !probing;

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    if (needsType && !selected) return;
    // A type decorates the row when there is one. Without it the chip still
    // has to say something TRUE — a page with no type is a document, and the
    // old code called it a "Diagram" because the only untyped shape used to be
    // a whiteboard.
    const typed = shape !== 'diagram' ? selected : undefined;
    onCreate({
      title: trimmed,
      // A stable label rather than a real type id: the document list renders
      // this as the row's chip. Nothing downstream looks it up in the types
      // table.
      type: shape === 'diagram' ? 'Diagram' : (typed ? typed.name : 'Document'),
      description: description.trim() || undefined,
      icon: shape === 'diagram' ? '🖉' : (typed ? typed.icon : '📄'),
      ...(typed ? { documentTypeId: typed.id } : {}),
      shape,
    });
    onClose();
  };

  // `selected` unconditionally would keep the button dead on exactly the
  // shapes that never needed a type.
  const canSubmit = !!title.trim() && (!needsType || !!selected);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && canSubmit) handleSubmit();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      ariaLabel="Create New Document"
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
        <h2 className={cn('m-0 px-6 pt-6 pb-4 text-lg font-bold text-text-primary shrink-0')}>
          Create New Document
        </h2>

        {/* Scrollable body */}
        <div className={cn('flex-1 overflow-y-auto px-6 min-h-0')}>

          {/* No types defined yet */}
          {/* Still asking the server. NOT the empty state: claiming no types
              exist while the request is in flight is a confident wrong answer,
              and its call to action creates duplicates of types the user
              already has. */}
          {types.length === 0 && probing ? (
            <div className={cn('text-center px-4 py-8 border border-dashed border-border-field rounded-lg mb-5 text-text-tertiary')}>
              <div className={cn('text-[13px]')}>Loading document types…</div>
            </div>
          ) : (
            <>
              {/* Shape picker — the first and biggest decision, so it comes
                  first. SelectableCard rather than a hand-rolled pressed
                  button: it carries the selected chrome, aria-pressed and the
                  focus ring that every hand-rolled picker in this repo lost. */}
              <div className={cn('mb-5')}>
                <div
                  id={shapeGroupLabelId}
                  className={cn('block text-[13px] font-semibold text-text-secondary mb-2')}
                >
                  How is this document written?
                </div>
                <div
                  role="group"
                  aria-labelledby={shapeGroupLabelId}
                  className={cn('grid grid-cols-2 gap-2')}
                >
                  {SHAPES.map((s) => (
                    <SelectableCard
                      key={s.id}
                      padding="md"
                      selected={shape === s.id}
                      onSelect={() => setShape(s.id)}
                      data-testid={`doc-shape-${s.id}`}
                    >
                      <div className={cn('flex items-center gap-2')}>
                        <span className={cn('text-xl shrink-0')} aria-hidden="true">
                          {s.icon}
                        </span>
                        <span className={cn('text-sm font-semibold text-text-primary')}>
                          {s.name}
                        </span>
                        {s.id === 'page' && (
                          <Chip tone="info" size="xs">
                            Default
                          </Chip>
                        )}
                      </div>
                      <div className={cn('mt-1 text-[11px] leading-snug text-neutral')}>
                        {s.description}
                      </div>
                    </SelectableCard>
                  ))}
                </div>
              </div>

              {/* Type picker — NOT for a diagram.

                  A document type defines the sections and structure a document
                  starts with; every card here says "Sets the icon and type". A
                  whiteboard has neither, so asking is offering a choice that
                  does not apply to what is being made — and then refusing to
                  create until one is picked. */}
              {shape !== 'diagram' && (
              <div className={cn('mb-5')}>
                <div className={cn('mb-2 flex items-baseline gap-1.5')}>
                  <span
                    id={typeGroupLabelId}
                    className={cn('block text-[13px] font-semibold text-text-secondary')}
                  >
                    Document Type
                  </span>
                  {!needsType && (
                    <span className={cn('text-[13px] font-normal text-text-tertiary')}>optional</span>
                  )}
                </div>

                {/* Scoped to the control it is about. This used to replace the
                    ENTIRE dialog, so a prerequisite for ONE shape locked out
                    the other two — and the only button was Close. */}
                {noTypesYet && (
                  <div
                    data-testid="no-document-types"
                    className={cn('px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary')}
                  >
                    {needsType
                      ? 'Sections come from a document type, and none are defined yet. Define one in ☰ → Document Types, or make a page instead — it needs no type.'
                      : 'No document types yet. A page does not need one; define types in ☰ → Document Types when you want a reusable icon and structure.'}
                  </div>
                )}
                <div
                  role="group"
                  aria-labelledby={typeGroupLabelId}
                  className={cn('grid grid-cols-2 gap-2')}
                >
                  {types.map((t) => {
                    const isSelected = selectedId === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        data-testid={`type-option-${t.id}`}
                        // Selection was signalled only by colour and a "✓"
                        // glyph; aria-pressed exposes it to screen readers.
                        aria-pressed={isSelected}
                        onClick={() => setSelectedId(t.id)}
                        className={cn(
                          'flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]',
                          isSelected ? 'bg-info-bg border-2 border-info' : 'bg-surface border-2 border-border hover:bg-surface-panel',
                        )}
                      >
                        <span className={cn('text-2xl shrink-0')}>{t.icon}</span>
                        <div className={cn('min-w-0')}>
                          <div className={cn('text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap')}>
                            {t.name}
                          </div>
                          {t.description && (
                            <div className={cn('text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2')}>
                              {t.description}
                            </div>
                          )}
                          {/* A page does not get the type's sections created
                              for it — it starts as a blank sheet — so the
                              section count would be a promise this flow does
                              not keep. The type still sets the icon, the type
                              name and anything keyed off it downstream. */}
                          <div className={cn('text-[11px] text-text-tertiary mt-0.5')}>
                            {shape === 'sections'
                              ? `${t.fields.length} section${t.fields.length !== 1 ? 's' : ''}`
                              : 'Sets the icon and type'}
                          </div>
                        </div>
                        {isSelected && (
                          <span
                            aria-hidden="true"
                            className={cn('absolute top-1.5 right-2 text-sm text-info-fg font-bold')}
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                </div>
              )}

              {/* Title */}
              <div className={cn('mb-4')}>
                <label
                  htmlFor={titleFieldId}
                  className={cn('block text-[13px] font-semibold text-text-secondary mb-1')}
                >
                  Title <span className={cn('text-danger-fg')} aria-hidden="true">*</span>
                </label>
                <Input
                  ref={titleRef}
                  id={titleFieldId}
                  required
                  aria-required="true"
                  data-testid="new-doc-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={selected ? `e.g. Q2 ${selected.name}` : 'Document title…'}
                />
              </div>

              {/* Description */}
              <div className={cn('mb-5')}>
                <label
                  htmlFor={descriptionFieldId}
                  className={cn('block text-[13px] font-semibold text-text-secondary mb-1')}
                >
                  Description <span className={cn('text-text-tertiary font-normal')}>(optional)</span>
                </label>
                <Textarea
                  id={descriptionFieldId}
                  data-testid="new-doc-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of this document…"
                  rows={3}
                  className={cn('resize-y')}
                />
              </div>
            </>
          )}
        </div>

        {/* Footer. Shown once the probe settles — the actions belong to the
            form, not to whether any document types happen to exist. Hiding
            them on zero types is what left the dialog with nothing but a
            Close button. */}
        {!(types.length === 0 && probing) && (
          <div className={cn('flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0')}>
            <button
              data-testid="new-doc-cancel"
              onClick={onClose}
              className={cn('px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]')}
            >
              Cancel
            </button>
            <button
              data-testid="new-doc-submit"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={cn(
                'px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]',
                canSubmit ? 'bg-info cursor-pointer' : 'bg-neutral cursor-not-allowed',
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
