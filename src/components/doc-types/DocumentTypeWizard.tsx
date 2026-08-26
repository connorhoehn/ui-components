// frontend/src/components/doc-types/DocumentTypeWizard.tsx
//
// 3-step wizard for creating or editing a document type.
// Step 1: Basic info (name, description, icon)
// Step 2: Fields — Drupal-style section-type picker + reorderable field list
// Step 3: View modes — per-field visibility and renderer overrides

import { useEffect, useId, useState } from 'react';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import { Textarea } from '../forms/Textarea';
import { Select } from '../forms/Select';
import { Checkbox } from '../forms/Checkbox';
import type { ViewMode } from '../../types/document';
import type {
  DocumentType,
  DocumentTypeField,
  DocumentTypePage,
  DocumentTypePageConfig,
} from '../../types/documentType';
import { makeEmptyField, getPagesView, getPageConfig } from '../../types/documentType';
// Trigger side-effect registrations so getFieldTypes() / getFieldType() are populated
import '../../renderers';
import { getFieldTypes, getFieldType } from '../../renderers/registry';
import { StepIndicator, WizardStepNavigation } from './WizardStepNavigation';
import { FieldDefinitionEditor } from './FieldDefinitionEditor';

// ---------------------------------------------------------------------------
// Step 1 — Basic Info
// ---------------------------------------------------------------------------

interface Step1Props {
  name: string; setName: (v: string) => void;
  description: string; setDescription: (v: string) => void;
}

function Step1Info({ name, setName, description, setDescription }: Step1Props) {
  // These captions were <span>s — not even labels, so `htmlFor` was never on
  // the table and both controls announced as unnamed "edit text". They are
  // block-styled, so promoting them to real <label htmlFor> changes nothing
  // visually. The required "*" is decorative and hidden, so the accessible
  // name stays exactly "Name".
  const uid = useId();
  return (
    <div className="flex flex-col gap-5">
      <div>
        <label htmlFor={`${uid}-name`} className="block text-xs font-semibold text-text-primary mb-[5px] tracking-wide">
          Name <span aria-hidden="true" className="text-danger-fg">*</span>
        </label>
        <Input
          id={`${uid}-name`}
          aria-required="true"
          data-testid="name-input"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Sprint Planning, Retrospective, Meeting Notes…"
          maxLength={80}
          autoFocus
        />
      </div>

      <div>
        <label htmlFor={`${uid}-description`} className="block text-xs font-semibold text-text-primary mb-[5px] tracking-wide">
          Description
        </label>
        <Textarea
          id={`${uid}-description`}
          data-testid="description-input"
          className="min-h-[72px] resize-y"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Optional — describe when this document type is used"
          maxLength={300}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 2 — Fields
// ---------------------------------------------------------------------------

// Phase 51 / hub#70 — sortable wrappers for the multi-page wizard render.

interface SortablePageProps {
  page: DocumentTypePage;
  pageIdx: number;
  totalPages: number;
  isActive: boolean;
  setActivePageId: (id: string) => void;
  movePage: (pageId: string, dir: -1 | 1) => void;
  removePage: (pageId: string) => void;
  renamePage: (pageId: string, title: string) => void;
  pages: DocumentTypePage[];
  fieldsById: Map<string, DocumentTypeField>;
  renderRow: (sectionId: string, page: DocumentTypePage, idx: number) => React.ReactNode;
  moveSectionToPage: (sectionId: string, fromPageId: string, toPageId: string) => void;
}

function SortablePage({
  page, pageIdx, totalPages, isActive, setActivePageId,
  movePage, removePage, renamePage, pages, fieldsById, renderRow, moveSectionToPage,
}: SortablePageProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: page.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      data-testid={`wizard-page-${page.id}`}
    >
      <div className={cn(
        'bg-surface border rounded-[10px] p-4 mb-3',
        isActive ? 'bg-accent-bg border-accent-border' : 'border-border',
      )}>
        <div className="flex items-center gap-2 mb-2.5">
          <button
            type="button"
            data-testid={`page-drag-handle-${page.id}`}
            {...attributes}
            {...listeners}
            className="cursor-grab px-1 py-0.5 text-sm text-text-tertiary border-none bg-transparent select-none touch-none"
            title="Drag to reorder pages"
          >⋮⋮</button>
          <button
            type="button"
            data-testid={`page-up-${page.id}`}
            disabled={pageIdx === 0}
            onClick={() => movePage(page.id, -1)}
            className={cn(
              'px-1.5 py-0.5 text-[11px] font-semibold rounded-[7px] font-inherit border-none bg-transparent',
              pageIdx === 0 ? 'text-neutral opacity-50 cursor-not-allowed' : 'text-neutral cursor-pointer',
            )}
          >▲</button>
          <button
            type="button"
            data-testid={`page-down-${page.id}`}
            disabled={pageIdx === totalPages - 1}
            onClick={() => movePage(page.id, +1)}
            className={cn(
              'px-1.5 py-0.5 text-[11px] font-semibold rounded-[7px] font-inherit border-none bg-transparent',
              pageIdx === totalPages - 1 ? 'text-neutral opacity-50 cursor-not-allowed' : 'text-neutral cursor-pointer',
            )}
          >▼</button>
          <span className="text-xs font-semibold text-text-tertiary min-w-14">
            Page {pageIdx + 1}
          </span>
          {/* Placeholder-only naming: once the page is named the box has no
              accessible name at all, and every row's box is identical. */}
          <Input
            aria-label={`Page ${pageIdx + 1} title`}
            data-testid={`page-title-${page.id}`}
            size="sm"
            className="flex-1"
            value={page.title ?? ''}
            placeholder={`Page ${pageIdx + 1}`}
            onChange={(e) => renamePage(page.id, e.target.value)}
            onFocus={() => setActivePageId(page.id)}
          />
          <button
            type="button"
            data-testid={`page-remove-${page.id}`}
            disabled={totalPages <= 1}
            onClick={() => removePage(page.id)}
            className={cn(
              'px-2 py-0.5 text-[13px] font-semibold rounded-[7px] font-inherit border-none bg-transparent text-danger-fg',
              totalPages <= 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            )}
            title="Remove page (sections move to first page)"
          >✕</button>
        </div>

        {page.sectionIds.length === 0 ? (
          <div
            data-testid={`page-empty-${page.id}`}
            className="py-3 px-2 text-text-tertiary text-xs italic"
          >
            No sections on this page yet — click the page header to make it active, then pick a section type.
          </div>
        ) : (
          <SortableContext items={page.sectionIds} strategy={verticalListSortingStrategy}>
            <div data-testid={`page-sections-${page.id}`}>
              {page.sectionIds.map((sid, idx) => {
                if (!fieldsById.get(sid)) return null;
                return (
                  <SortableSection
                    key={sid}
                    sectionId={sid}
                    page={page}
                    idx={idx}
                    pages={pages}
                    renderRow={renderRow}
                    moveSectionToPage={moveSectionToPage}
                  />
                );
              })}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
}

interface SortableSectionProps {
  sectionId: string;
  page: DocumentTypePage;
  idx: number;
  pages: DocumentTypePage[];
  renderRow: (sectionId: string, page: DocumentTypePage, idx: number) => React.ReactNode;
  moveSectionToPage: (sectionId: string, fromPageId: string, toPageId: string) => void;
}

function SortableSection({ sectionId, page, idx, pages, renderRow, moveSectionToPage }: SortableSectionProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: sectionId });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-1.5">
      <button
        type="button"
        data-testid={`section-drag-handle-${sectionId}`}
        {...attributes}
        {...listeners}
        className="cursor-grab px-1 py-0.5 text-sm text-text-tertiary border-none bg-transparent select-none touch-none shrink-0"
        title="Drag to reorder sections (or drop on another page)"
      >⋮⋮</button>
      <div className="flex-1">{renderRow(sectionId, page, idx)}</div>
      {pages.length > 1 && (
        <Select
          data-testid={`section-move-page-${sectionId}`}
          size="sm"
          className="w-auto text-[11px]"
          value={page.id}
          onChange={(e) => moveSectionToPage(sectionId, page.id, e.target.value)}
          title="Move section to another page"
          options={pages.map((pp, pi) => ({
            value: pp.id,
            label: pp.title || `Page ${pi + 1}`,
          }))}
        />
      )}
    </div>
  );
}

function Step2Fields({
  fields, setFields, pages, setPages, pageConfig, setPageConfig,
}: {
  fields: DocumentTypeField[];
  setFields: (f: DocumentTypeField[]) => void;
  pages: DocumentTypePage[];
  setPages: (p: DocumentTypePage[]) => void;
  pageConfig: DocumentTypePageConfig;
  setPageConfig: (c: DocumentTypePageConfig) => void;
}) {
  const [activePageId, setActivePageId] = useState<string>(pages[0]?.id ?? 'page-default');

  useEffect(() => {
    if (pages.length > 0 && !pages.find((p) => p.id === activePageId)) {
      setActivePageId(pages[0].id);
    }
  }, [pages, activePageId]);

  const addField = (type: string) => {
    const f = makeEmptyField(type);
    setFields([...fields, f]);
    setPages(pages.map((p) =>
      p.id === activePageId ? { ...p, sectionIds: [...p.sectionIds, f.id] } : p
    ));
  };

  const update = (id: string, patch: Partial<DocumentTypeField>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...patch } : f));
  };

  const remove = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
    setPages(pages.map((p) => ({ ...p, sectionIds: p.sectionIds.filter((s) => s !== id) })));
  };

  const moveSectionInPage = (pageId: string, sectionId: string, dir: -1 | 1) => {
    setPages(pages.map((p) => {
      if (p.id !== pageId) return p;
      const idx = p.sectionIds.indexOf(sectionId);
      const target = idx + dir;
      if (idx < 0 || target < 0 || target >= p.sectionIds.length) return p;
      const next = [...p.sectionIds];
      [next[idx], next[target]] = [next[target], next[idx]];
      return { ...p, sectionIds: next };
    }));
  };

  const moveSectionToPage = (sectionId: string, fromPageId: string, toPageId: string) => {
    if (fromPageId === toPageId) return;
    setPages(pages.map((p) => {
      if (p.id === fromPageId) return { ...p, sectionIds: p.sectionIds.filter((s) => s !== sectionId) };
      if (p.id === toPageId)   return { ...p, sectionIds: [...p.sectionIds, sectionId] };
      return p;
    }));
  };

  const movePage = (pageId: string, dir: -1 | 1) => {
    const idx = pages.findIndex((p) => p.id === pageId);
    const target = idx + dir;
    if (idx < 0 || target < 0 || target >= pages.length) return;
    const next = [...pages];
    [next[idx], next[target]] = [next[target], next[idx]];
    setPages(next);
  };

  const addPage = () => {
    const id = `page-${(typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).slice(2, 10)}`;
    setPages([...pages, { id, sectionIds: [] }]);
    setActivePageId(id);
  };

  const renamePage = (pageId: string, title: string) => {
    setPages(pages.map((p) => p.id === pageId ? { ...p, title: title || undefined } : p));
  };

  const removePage = (pageId: string) => {
    if (pages.length <= 1) return;
    const removed = pages.find((p) => p.id === pageId);
    const orphaned = removed?.sectionIds ?? [];
    const remaining = pages.filter((p) => p.id !== pageId);
    if (orphaned.length > 0 && remaining.length > 0) {
      remaining[0] = { ...remaining[0], sectionIds: [...remaining[0].sectionIds, ...orphaned] };
    }
    setPages(remaining);
    if (activePageId === pageId) setActivePageId(remaining[0]?.id ?? '');
  };

  const fieldsById = new Map(fields.map((f) => [f.id, f]));
  const isSinglePage = pages.length === 1;

  const findContainer = (id: string): string | undefined => {
    if (pages.some((p) => p.id === id)) return id;
    for (const p of pages) if (p.sectionIds.includes(id)) return p.id;
    return undefined;
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) return;
    const activeId = String(active.id);
    const overId = String(over.id);
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);
    if (!activeContainer || !overContainer) return;
    if (activeContainer === overContainer) return;
    if (pages.some((p) => p.id === activeId)) return;
    setPages(pages.map((p) => {
      if (p.id === activeContainer) return { ...p, sectionIds: p.sectionIds.filter((s) => s !== activeId) };
      if (p.id === overContainer)   return { ...p, sectionIds: [...p.sectionIds, activeId] };
      return p;
    }));
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    const activeId = String(active.id);
    const overId = String(over.id);

    if (pages.some((p) => p.id === activeId) && pages.some((p) => p.id === overId)) {
      const oldIndex = pages.findIndex((p) => p.id === activeId);
      const newIndex = pages.findIndex((p) => p.id === overId);
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        setPages(arrayMove(pages, oldIndex, newIndex));
      }
      return;
    }

    const activeContainer = findContainer(activeId);
    if (!activeContainer) return;
    const page = pages.find((p) => p.id === activeContainer);
    if (!page) return;
    const oldIndex = page.sectionIds.indexOf(activeId);
    const newIndex = page.sectionIds.indexOf(overId);
    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      setPages(pages.map((p) =>
        p.id === activeContainer ? { ...p, sectionIds: arrayMove(p.sectionIds, oldIndex, newIndex) } : p,
      ));
    }
  };

  const renderRow = (sectionId: string, page: DocumentTypePage, idx: number) => {
    const f = fieldsById.get(sectionId);
    if (!f) return null;
    return (
      <FieldDefinitionEditor
        key={f.id}
        field={f}
        index={idx}
        total={page.sectionIds.length}
        onRename={(name) => update(f.id, { name })}
        onChangeType={(sectionType) => update(f.id, { sectionType, rendererOverrides: {} })}
        onRemove={() => remove(f.id)}
        onMoveUp={() => moveSectionInPage(page.id, f.id, -1)}
        onMoveDown={() => moveSectionInPage(page.id, f.id, +1)}
        onToggleRequired={() => update(f.id, { required: !f.required })}
        onToggleCollapsed={() => update(f.id, { defaultCollapsed: !f.defaultCollapsed })}
      />
    );
  };

  return (
    <div className="flex gap-5 items-start">
      {/* Left — pages of sections */}
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-text-primary mb-2.5 tracking-wide">
          SECTIONS {fields.length > 0 && <span className="text-primary">({fields.length}{!isSinglePage ? ` across ${pages.length} pages` : ''})</span>}
        </div>

        {isSinglePage ? (
          fields.length === 0 ? (
            <div className="bg-surface border border-dashed border-border rounded-[10px] text-center py-8 px-4 text-text-tertiary text-[13px]">
              <div className="text-[28px] mb-2">📋</div>
              No sections yet — pick a section type →
            </div>
          ) : (
            <div data-testid="fields-list">
              {pages[0].sectionIds.map((sid, idx) => renderRow(sid, pages[0], idx))}
            </div>
          )
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={pages.map((p) => p.id)} strategy={verticalListSortingStrategy}>
              {pages.map((p, pageIdx) => (
                <SortablePage
                  key={p.id}
                  page={p}
                  pageIdx={pageIdx}
                  totalPages={pages.length}
                  isActive={p.id === activePageId}
                  setActivePageId={setActivePageId}
                  movePage={movePage}
                  removePage={removePage}
                  renamePage={renamePage}
                  pages={pages}
                  fieldsById={fieldsById}
                  renderRow={renderRow}
                  moveSectionToPage={moveSectionToPage}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}

        {/* + Add Page */}
        <button
          type="button"
          data-testid="add-page"
          onClick={addPage}
          className="mt-2 text-xs px-3 py-1.5 font-semibold rounded-md font-inherit border border-dashed border-accent-border bg-transparent text-primary cursor-pointer"
        >
          + Add Page
        </button>

        {/* Page-level config */}
        {pages.length > 1 && (
          <div
            data-testid="page-config-toc"
            className="mt-4 p-2.5 bg-surface-panel rounded-md text-[13px]"
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={pageConfig.showTableOfContents}
                onChange={(checked) => setPageConfig({ ...pageConfig, showTableOfContents: checked })}
              />
              <span>Show table of contents (multi-page documents only)</span>
            </label>
          </div>
        )}
      </div>

      {/* Right — field type picker */}
      <div className="w-[220px] shrink-0">
        <div className="text-xs font-semibold text-text-primary mb-2.5 tracking-wide">
          SECTION TYPES
        </div>
        <div className="flex flex-col gap-1.5">
          {getFieldTypes().map(fieldDef => (
            <button
              key={fieldDef.type}
              data-testid={`add-field-${fieldDef.type}`}
              type="button"
              onClick={() => addField(fieldDef.type)}
              className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg w-full bg-surface border border-border cursor-pointer text-left font-inherit transition-colors hover:border-accent-border hover:bg-accent-bg"
            >
              <span className="text-xl shrink-0">{fieldDef.icon}</span>
              <div>
                <div className="text-[13px] font-semibold text-text-primary">{fieldDef.label}</div>
                <div className="text-[11px] text-text-tertiary mt-px">{fieldDef.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 3 — View Modes
// ---------------------------------------------------------------------------

function ViewModeCell({ field, mode, onToggleHidden, onOverrideChange }: {
  field: DocumentTypeField;
  mode: ViewMode;
  onToggleHidden: () => void;
  onOverrideChange: (key: string) => void;
}) {
  const hidden = (field.hiddenInModes ?? []).includes(mode);
  const fieldTypeDef = getFieldType(field.sectionType);
  const options = fieldTypeDef?.rendererKeys[mode] ?? [];
  const currentOverride = (field.rendererOverrides ?? {})[mode] ?? options[0] ?? '';

  return (
    <td className="p-[10px_12px] align-top">
      <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-1.5 cursor-pointer select-none">
          <Checkbox
            data-testid={`visibility-${field.id}-${mode}`}
            checked={!hidden}
            onChange={onToggleHidden}
          />
          <span className={cn('text-xs', hidden ? 'text-text-tertiary' : 'text-text-primary')}>
            {hidden ? 'Hidden' : 'Visible'}
          </span>
        </label>
        {/* One of these per field per view mode: with no name at all the whole
            grid announced as a wall of identical combo boxes. Named from the
            field's own name plus the mode, both of which are visible in the
            row and column headers. */}
        {!hidden && options.length > 0 && (
          <Select
            aria-label={`${field.name} renderer in ${mode} mode`}
            data-testid={`renderer-${field.id}-${mode}`}
            size="sm"
            className="w-auto text-[11px]"
            value={currentOverride}
            onChange={e => onOverrideChange(e.target.value)}
            options={options.map(key => ({
              value: key,
              label: fieldTypeDef?.rendererLabels[key] ?? key,
            }))}
          />
        )}
        {!hidden && options.length === 0 && (
          <span className="text-[11px] text-text-tertiary">Default renderer</span>
        )}
      </div>
    </td>
  );
}

function Step3ViewModes({ fields, setFields }: {
  fields: DocumentTypeField[];
  setFields: (f: DocumentTypeField[]) => void;
}) {
  const modes: ViewMode[] = ['editor', 'ack', 'reader'];
  const modeLabels: Record<ViewMode, string> = { editor: 'Editor', ack: 'Review', reader: 'Read' };

  const update = (id: string, patch: Partial<DocumentTypeField>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...patch } : f));
  };

  const toggleHidden = (fieldId: string, mode: ViewMode) => {
    const field = fields.find(f => f.id === fieldId)!;
    const modes = field.hiddenInModes ?? [];
    const hidden = modes.includes(mode);
    update(fieldId, {
      hiddenInModes: hidden
        ? modes.filter(m => m !== mode)
        : [...modes, mode],
    });
  };

  const setRenderer = (fieldId: string, mode: ViewMode, key: string) => {
    const field = fields.find(f => f.id === fieldId)!;
    update(fieldId, { rendererOverrides: { ...(field.rendererOverrides ?? {}), [mode]: key } });
  };

  if (fields.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-[10px] text-center py-10 px-4 text-text-tertiary">
        No fields defined — go back to Step 2 and add some fields first.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <p className="text-[13px] text-neutral mb-4">
        Configure which view modes each field appears in and which renderer to use.
      </p>
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="bg-surface-panel">
            <th className="p-[10px_12px] text-left font-semibold text-text-primary border-b-2 border-border whitespace-nowrap">
              Field
            </th>
            {modes.map(m => (
              <th key={m} className="p-[10px_12px] text-left font-semibold text-text-primary border-b-2 border-border min-w-[130px]">
                {modeLabels[m]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((f, i) => {
            const def = getFieldType(f.sectionType);
            return (
              <tr key={f.id} className={cn('border-b border-border-subtle', i % 2 === 0 ? 'bg-surface' : 'bg-surface-inset')}>
                <td className="p-[10px_12px] align-middle">
                  <div className="flex items-center gap-[7px]">
                    <span>{def?.icon}</span>
                    <span className="font-medium text-text-primary">{f.name}</span>
                    {f.required && <span className="text-[10px] bg-accent-bg text-accent-fg px-[5px] py-px rounded">required</span>}
                  </div>
                </td>
                {modes.map(m => (
                  <ViewModeCell
                    key={m}
                    field={f}
                    mode={m}
                    onToggleHidden={() => toggleHidden(f.id, m)}
                    onOverrideChange={key => setRenderer(f.id, m, key)}
                  />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Wizard shell
// ---------------------------------------------------------------------------

export interface DocumentTypeWizardProps {
  initialType?: DocumentType;
  onSave: (type: Omit<DocumentType, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function DocumentTypeWizard({ initialType, onSave, onCancel }: DocumentTypeWizardProps) {
  const TOTAL_STEPS = 3;
  // Start on step 2 (Sections) when editing so fields are immediately visible
  const [step, setStep] = useState(initialType ? 2 : 1);

  // Draft state
  const [name,        setName]        = useState(initialType?.name        ?? '');
  const [description, setDescription] = useState(initialType?.description ?? '');
  const icon = initialType?.icon ?? '📄';
  const [fields,      setFields]      = useState<DocumentTypeField[]>(initialType?.fields    ?? []);
  const [pages, setPages] = useState<DocumentTypePage[]>(() => (
    initialType
      ? getPagesView(initialType)
      : [{ id: 'page-default', sectionIds: [] }]
  ));
  const [pageConfig, setPageConfig] = useState<DocumentTypePageConfig>(() => (
    initialType ? getPageConfig(initialType) : { showTableOfContents: false }
  ));

  const [nameError, setNameError] = useState('');

  const canAdvance = (): boolean => {
    if (step === 1) return name.trim().length > 0;
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !name.trim()) {
      setNameError('Name is required');
      return;
    }
    setNameError('');
    if (step < TOTAL_STEPS) setStep(s => s + 1);
    else handleSave();
  };

  const handleSave = () => {
    onSave({ name: name.trim(), description, icon, fields, pages, pageConfig });
  };

  // Phase 51 Phase G — JSON Schema export
  const handleExportSchema = async () => {
    if (!initialType?.id) return;
    try {
      const res = await fetch(`/api/document-types/${initialType.id}/schema`);
      if (!res.ok) throw new Error(`Export failed: ${res.statusText}`);
      const schema = await res.json();
      const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name.trim().replace(/\s+/g, '-').toLowerCase()}-schema.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert(`Export failed: ${(e as Error).message}`);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Step indicator */}
      <StepIndicator step={step} total={TOTAL_STEPS} />

      {/* Step content — scrollable */}
      <div className="flex-1 overflow-y-auto pr-1">
        {step === 1 && (
          <Step1Info
            name={name} setName={v => { setName(v); if (v.trim()) setNameError(''); }}
            description={description} setDescription={setDescription}
          />
        )}
        {step === 2 && (
          <Step2Fields
            fields={fields}
            setFields={setFields}
            pages={pages}
            setPages={setPages}
            pageConfig={pageConfig}
            setPageConfig={setPageConfig}
          />
        )}
        {step === 3 && <Step3ViewModes fields={fields} setFields={setFields} />}

        {nameError && (
          <div className="text-danger-fg text-[13px] mt-2">{nameError}</div>
        )}
      </div>

      {/* Navigation */}
      <WizardStepNavigation
        step={step}
        totalSteps={TOTAL_STEPS}
        canAdvance={canAdvance()}
        isEditing={!!initialType}
        onCancel={onCancel}
        onBack={() => setStep(s => s - 1)}
        onNext={handleNext}
        onExportSchema={initialType?.id ? handleExportSchema : undefined}
      />
    </div>
  );
}
