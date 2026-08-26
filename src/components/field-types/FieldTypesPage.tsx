// frontend/src/components/field-types/FieldTypesPage.tsx
//
// Admin page for managing custom data types.
// Data types define the primitive storage type a document section holds.
// Built-in renderer wrappers (Task List, Rich Text, etc.) are NOT shown here —
// those belong to Document Types. Only user-defined data types live here.
//
// State machine: idle → create → idle  |  idle → edit → idle
// Delete flows through a confirmation modal.

import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import Modal from '../shared/Modal';
import { onActivationKey } from '../../lib/activationKey';
import { useCustomFieldTypes } from '../../hooks/useCustomFieldTypes';
import { Input } from '../forms/Input';
import { Textarea } from '../forms/Textarea';
import { Select } from '../forms/Select';
import { Checkbox } from '../forms/Checkbox';
import type { CustomFieldType, CustomFieldTypeDisplay } from '../../types/fieldType';
import type { ViewMode } from '../../types/document';

// ---------------------------------------------------------------------------
// Primitive storage types — Drupal-style field type catalogue
// ---------------------------------------------------------------------------

interface PrimitiveStorageType {
  id: string;
  label: string;
  description: string;
  /** Renderer key to delegate to. null = no renderer yet (coming soon). */
  rendererBase: string | null;
}

const PRIMITIVE_STORAGE_TYPES: PrimitiveStorageType[] = [
  { id: 'boolean',               label: 'Boolean',               description: 'A true or false value.',                                    rendererBase: null },
  { id: 'decimal',               label: 'Decimal',               description: 'A decimal (fixed-point) number.',                           rendererBase: null },
  { id: 'float',                 label: 'Float',                 description: 'A floating-point number.',                                  rendererBase: null },
  { id: 'image',                 label: 'Image',                 description: 'An image file with optional alt text and caption.',          rendererBase: null },
  { id: 'integer',               label: 'Integer',               description: 'A whole number.',                                           rendererBase: null },
  { id: 'list_float',            label: 'List (float)',          description: 'An enumerated list of floating-point values.',               rendererBase: null },
  { id: 'list_integer',          label: 'List (integer)',        description: 'An enumerated list of integer values.',                      rendererBase: null },
  { id: 'list_text',             label: 'List (text)',           description: 'An enumerated list of plain-text values.',                   rendererBase: 'checklist' },
  { id: 'long_text',             label: 'Long text',             description: 'Multi-line plain text.',                                    rendererBase: 'rich-text' },
  { id: 'long_text_and_summary', label: 'Long text and summary', description: 'Formatted text with an optional teaser/summary.',           rendererBase: 'rich-text' },
  { id: 'term_reference',        label: 'Term reference',        description: 'A reference to a controlled-vocabulary taxonomy term.',      rendererBase: null },
  { id: 'text',                  label: 'Text',                  description: 'Short plain text, single line.',                            rendererBase: 'rich-text' },
];

const AVAILABLE = PRIMITIVE_STORAGE_TYPES.filter(p => p.rendererBase !== null);
const COMING_SOON = PRIMITIVE_STORAGE_TYPES.filter(p => p.rendererBase === null);

// ---------------------------------------------------------------------------
// Delete confirmation modal
// ---------------------------------------------------------------------------

// Built on the shared `Modal` rather than a hand-rolled portal. The
// hand-rolled version had no `role="dialog"`, no accessible name, no Escape
// handler, no focus trap and never moved focus — a destructive confirmation
// that a keyboard user could neither reach nor back out of, while Tab kept
// walking the type list behind the scrim. `Modal` supplies all of it; the
// testids are preserved so callers and tests keep working.
function DeleteModal({ name, onConfirm, onCancel }: {
  name: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <Modal
      open
      onClose={onCancel}
      title="Delete data type?"
      maxWidth={400}
      backdropTestId="delete-modal"
      footer={
        <>
          <button
            data-testid="cancel-delete"
            onClick={onCancel}
            className="py-[7px] px-4 text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit bg-surface text-text-primary border border-border-field"
          >Cancel</button>
          <button
            data-testid="confirm-delete"
            onClick={onConfirm}
            className="py-[7px] px-4 text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit bg-surface text-danger-fg border border-danger-border"
          >Delete</button>
        </>
      }
    >
      <p className="text-[13px] text-neutral m-0">
        <strong>{name}</strong> will be removed. Document types that reference it will keep their existing sections, but this type won't appear in the picker for new sections.
      </p>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Step indicator
// ---------------------------------------------------------------------------

function StepIndicator({ step }: { step: 1 | 2 }) {
  return (
    <div className="flex items-center mb-7">
      {([
        [1, 'Storage type'],
        [2, 'Display'],
      ] as const).map(([n, label], i) => {
        const active = n === step;
        const done   = n < step;
        return (
          <div key={n} className="flex items-center">
            <div className={cn(
              'w-[26px] h-[26px] rounded-full shrink-0 flex items-center justify-center text-xs font-bold border-2',
              done && 'bg-primary text-white border-transparent',
              active && 'bg-accent-bg text-accent-fg border-primary',
              !done && !active && 'bg-surface-hover text-text-tertiary border-transparent',
            )}>
              {done ? '✓' : n}
            </div>
            <span className={cn(
              'ml-1.5 text-xs whitespace-nowrap',
              active ? 'font-semibold text-text-primary' : 'font-normal text-text-tertiary',
            )}>
              {label}
            </span>
            {i < 1 && (
              <div className="w-7 h-px bg-border mx-2.5 shrink-0" />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 1 — Label + Storage type
// ---------------------------------------------------------------------------

function Step1({
  name, setName,
  description, setDescription,
  primitiveType, setPrimitiveType,
  nameError,
}: {
  name: string; setName: (v: string) => void;
  description: string; setDescription: (v: string) => void;
  primitiveType: string; setPrimitiveType: (v: string) => void;
  nameError: string;
}) {
  const selected = PRIMITIVE_STORAGE_TYPES.find(p => p.id === primitiveType);

  // Every caption on this step was a <span>, so none of the three controls had
  // an accessible name — and the "Label" validation error was rendered as
  // plain text with nothing pointing at it, so a rejected name was announced
  // nowhere at all. Promoting the spans to <label htmlFor> keeps the layout
  // (they are block-styled) and makes the association real.
  const uid = useId();
  const nameErrorId = nameError ? `${uid}-name-error` : undefined;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label htmlFor={`${uid}-name`} className="block text-xs font-semibold text-text-primary mb-[5px]">
          Label <span aria-hidden="true" className="text-danger-fg">*</span>
        </label>
        <Input
          id={`${uid}-name`}
          aria-required="true"
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameErrorId}
          data-testid="name-input"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Article title, Publication date, Author bio…"
          maxLength={80}
          autoFocus
        />
        {nameError && <div id={nameErrorId} role="alert" className="text-danger-fg text-xs mt-1">{nameError}</div>}
      </div>

      <div>
        <label htmlFor={`${uid}-description`} className="block text-xs font-semibold text-text-primary mb-[5px]">Description</label>
        <Textarea
          id={`${uid}-description`}
          data-testid="description-input"
          className="min-h-16 resize-y"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Optional — describe when and how this field is used"
          maxLength={300}
        />
      </div>

      <div>
        {/* The trailing gloss is a description, not part of the name, so it is
            linked with aria-describedby rather than swallowed into the label. */}
        <span className="block text-xs font-semibold text-text-primary mb-[5px]">
          <label htmlFor={`${uid}-primitive`}>Field type</label>{' '}
          <span id={`${uid}-primitive-desc`} className="font-normal text-text-tertiary">— what kind of data this field stores</span>
        </span>

        {/* Drupal-style select */}
        <Select
          id={`${uid}-primitive`}
          aria-describedby={`${uid}-primitive-desc`}
          data-testid="primitive-type-select"
          value={primitiveType}
          onChange={e => setPrimitiveType(e.target.value)}
          options={[{ value: '', label: '— Select a field type —' }]}
          groups={[
            {
              label: 'Available now',
              options: AVAILABLE.map(p => ({ value: p.id, label: p.label })),
            },
            {
              label: 'Coming soon',
              options: COMING_SOON.map(p => ({ value: p.id, label: p.label, disabled: true })),
            },
          ]}
        />

        {/* Description of selected type */}
        {selected && (
          <div className="mt-2.5 py-2.5 px-3.5 rounded-[7px] bg-surface-panel border border-border text-[13px] text-text-secondary">
            <strong className="text-text-primary">{selected.label}</strong> — {selected.description}
            {selected.rendererBase && (
              <span className="ml-2 text-[11px] text-text-tertiary">
                · renders with: {selected.rendererBase}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 2 — Display (visibility + formatter per view mode)
// ---------------------------------------------------------------------------

const VIEW_MODES: ReadonlyArray<{ key: ViewMode; label: string }> = [
  { key: 'editor', label: 'Editor' },
  { key: 'ack',    label: 'Review' },
  { key: 'reader', label: 'Read'   },
];

// Minimal renderer key catalogue for each view mode, keyed by rendererBase
const RENDERER_KEYS: Record<string, Record<string, string[]>> = {
  'rich-text': {
    editor: ['rich-text:editor'],
    ack:    ['rich-text:ack'],
    reader: ['rich-text:reader'],
  },
  'checklist': {
    editor: ['checklist:editor'],
    ack:    ['checklist:ack'],
    reader: ['checklist:reader'],
  },
};

/**
 * The renderer actually in force for a view mode: the user's pick while it is
 * still one of the options the selected primitive type offers, otherwise the
 * first option. The clamp matters because the user can go Back from step 2,
 * change the field type, and return — a `rich-text:reader` pick must not
 * survive onto a `checklist` field.
 */
function effectiveRenderer(chosen: string | undefined, options: string[]): string | undefined {
  if (options.length === 0) return undefined;
  return chosen && options.includes(chosen) ? chosen : options[0];
}

const RENDERER_LABELS: Record<string, string> = {
  'rich-text:editor': 'Rich Text Editor',
  'rich-text:ack':    'Rich Text Review',
  'rich-text:reader': 'Rich Text Reader',
  'checklist:editor': 'Checklist Editor',
  'checklist:ack':    'Checklist Review',
  'checklist:reader': 'Checklist Reader',
};

function Step2({
  name,
  primitiveType,
  formatters, setFormatters,
  visibility, setVisibility,
}: {
  name: string;
  primitiveType: string;
  formatters: Record<string, string>; setFormatters: (v: Record<string, string>) => void;
  visibility: Record<string, boolean>; setVisibility: (v: Record<string, boolean>) => void;
}) {
  const prim = PRIMITIVE_STORAGE_TYPES.find(p => p.id === primitiveType);
  const fieldLabel = name.trim() || prim?.label || 'Field';
  const rendererKeys = prim?.rendererBase ? RENDERER_KEYS[prim.rendererBase] ?? {} : {};

  return (
    <div className="flex flex-col gap-2">
      <p className="m-0 mb-4 text-[13px] text-neutral">
        Configure which view modes this field appears in and which renderer to use.
      </p>

      <div className="border border-border rounded-[10px] overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 bg-surface-panel border-b border-border">
          <div className="py-2.5 px-4 text-[13px] font-bold text-text-primary">Field</div>
          {VIEW_MODES.map(m => (
            <div key={m.key} className="py-2.5 px-4 text-[13px] font-bold text-text-primary">{m.label}</div>
          ))}
        </div>

        {/* Data row */}
        <div className="grid grid-cols-4 items-start py-3.5">
          {/* Field cell */}
          <div className="px-4">
            <div className="text-sm font-semibold text-text-primary">{fieldLabel}</div>
            <div className="text-[11px] text-text-tertiary mt-0.5">{prim?.label ?? primitiveType}</div>
          </div>

          {/* Mode cells */}
          {VIEW_MODES.map(m => {
            const options = rendererKeys[m.key] ?? [];
            const isVisible = visibility[m.key] ?? true;
            return (
              // Three columns, three checkboxes all reading "Visible", and a
              // renderer picker with no name at all. The checkbox keeps its
              // visible label — overriding it with an aria-label would make the
              // spoken name differ from the words on screen — and the column is
              // named as a group instead, which is what disambiguates them.
              <div
                key={m.key}
                role="group"
                aria-label={m.label}
                className="px-4 flex flex-col gap-2"
              >
                <label className="flex items-center gap-[7px] cursor-pointer select-none">
                  <Checkbox
                    checked={isVisible}
                    onChange={checked => setVisibility({ ...visibility, [m.key]: checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-[13px] text-text-primary">Visible</span>
                </label>
                {isVisible && options.length > 0 && (
                  <Select
                    aria-label={`${m.label} renderer`}
                    value={effectiveRenderer(formatters[m.key], options) ?? ''}
                    onChange={e => setFormatters({ ...formatters, [m.key]: e.target.value })}
                    options={options.map(key => ({ value: key, label: RENDERER_LABELS[key] ?? key }))}
                  />
                )}
                {isVisible && options.length === 0 && (
                  <span className="text-xs text-text-tertiary italic">Default</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Data type form — 2-step
// ---------------------------------------------------------------------------

interface DataTypeFormProps {
  initial?: CustomFieldType;
  onSave: (draft: Omit<CustomFieldType, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

function DataTypeForm({ initial, onSave, onCancel }: DataTypeFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [primitiveType, setPrimitiveType] = useState(initial?.primitiveType ?? '');
  const [nameError, setNameError] = useState('');

  const prim = PRIMITIVE_STORAGE_TYPES.find(p => p.id === primitiveType);
  const rendererKeys = prim?.rendererBase ? RENDERER_KEYS[prim.rendererBase] ?? {} : {};

  // Seeded from what was SAVED, not from the primitive type's defaults.
  //
  // The old initialiser computed `rendererKeys[mode][0] ?? ''` — but a lazy
  // useState initialiser runs exactly once, on mount, and in create mode
  // `primitiveType` is still `''` at that point. So `prim` was undefined,
  // every entry was `''`, and because `''` is not nullish, step 2's
  // `formatters[m.key] ?? options[0]` fallback never fired: the renderer
  // dropdowns rendered with a value matching no option, i.e. blank.
  //
  // Store only keys we actually have. "Unset" is `undefined`, so the fallback
  // in `effectiveRenderer` works, and it is recomputed against the CURRENT
  // primitive type on every render rather than frozen at mount.
  const [formatters, setFormatters] = useState<Record<string, string>>(() => {
    const seeded: Record<string, string> = {};
    for (const m of VIEW_MODES) {
      const saved = initial?.display?.[m.key]?.renderer;
      if (saved) seeded[m.key] = saved;
    }
    return seeded;
  });
  const [visibility, setVisibility] = useState<Record<string, boolean>>(() => {
    const seeded: Record<string, boolean> = {};
    for (const m of VIEW_MODES) {
      seeded[m.key] = initial?.display?.[m.key]?.visible ?? true;
    }
    return seeded;
  });

  const canNext = !!primitiveType && !!prim?.rendererBase;

  const handleNext = () => {
    if (!name.trim()) { setNameError('Label is required'); return; }
    if (!primitiveType) { setNameError('Please select a field type'); return; }
    setNameError('');
    setStep(2);
  };

  const handleSave = () => {
    const baseType = prim?.rendererBase ?? 'rich-text';

    // Step 2 used to go nowhere: the payload carried name/icon/description/
    // primitiveType/baseType and nothing else, so the Visible checkboxes and
    // the renderer pickers were discarded on every save.
    const display: Partial<Record<ViewMode, CustomFieldTypeDisplay>> = {};
    for (const m of VIEW_MODES) {
      const visible = visibility[m.key] ?? true;
      // Resolve against the primitive type selected NOW, so what is persisted
      // is what step 2 was actually showing.
      const renderer = visible
        ? effectiveRenderer(formatters[m.key], rendererKeys[m.key] ?? [])
        : undefined;
      display[m.key] = renderer ? { visible, renderer } : { visible };
    }

    onSave({
      name: name.trim(),
      icon: '',
      description: description.trim(),
      primitiveType,
      baseType,
      display,
    });
  };

  // Advancing the wizard unmounts the button that was just activated ("Next →"
  // becomes "Save"), so focus fell back to <body>: nothing was announced and
  // the user had to Tab from the top of the page to reach the new step's
  // fields. Move focus onto the step region instead, which is labelled
  // "Step n of 2" so a screen reader says where it landed. Skipped on first
  // mount — the wizard appearing is the caller's focus event, not ours.
  const stepRegionRef = useRef<HTMLDivElement | null>(null);
  const firstStepRenderRef = useRef(true);
  useEffect(() => {
    if (firstStepRenderRef.current) {
      firstStepRenderRef.current = false;
      return;
    }
    stepRegionRef.current?.focus();
  }, [step]);

  return (
    <div>
      <StepIndicator step={step} />

      <div
        ref={stepRegionRef}
        tabIndex={-1}
        role="group"
        aria-label={`Step ${step} of 2`}
        data-testid="wizard-step-region"
        className="outline-none"
      >
      {step === 1 && (
        <Step1
          name={name} setName={v => { setName(v); if (v.trim()) setNameError(''); }}
          description={description} setDescription={setDescription}
          primitiveType={primitiveType} setPrimitiveType={setPrimitiveType}
          nameError={nameError}
        />
      )}

      {step === 2 && (
        <Step2
          name={name}
          primitiveType={primitiveType}
          formatters={formatters} setFormatters={setFormatters}
          visibility={visibility} setVisibility={setVisibility}
        />
      )}
      </div>

      <div className="flex justify-between items-center pt-5 mt-5 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          className="py-[7px] px-4 text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit bg-transparent border-none text-neutral"
        >Cancel</button>
        <div className="flex gap-2">
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="py-[7px] px-4 text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit bg-surface text-text-primary border border-border-field"
            >← Back</button>
          )}
          {step === 1 ? (
            <button
              data-testid="next-button"
              type="button"
              onClick={handleNext}
              disabled={!canNext}
              className={cn(
                'py-[7px] px-4 text-[13px] font-semibold rounded-[7px] font-inherit border-none bg-primary text-white',
                canNext ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-50',
              )}
            >
              Next →
            </button>
          ) : (
            <button
              data-testid="save-button"
              type="button"
              onClick={handleSave}
              className="py-[7px] px-4 text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit border-none bg-primary text-white"
            >
              {initial ? 'Save Changes' : 'Create Data Type'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// List item
// ---------------------------------------------------------------------------

function TypeListItem({
  label, primitiveLabel, active, onSelect, onDelete,
}: {
  label: string; primitiveLabel: string;
  active: boolean;
  onSelect: () => void; onDelete: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      onKeyDown={onActivationKey(onSelect)}
      role="button"
      tabIndex={0}
      aria-pressed={active}
      aria-label={label}
      className={cn(
        'flex items-center gap-2.5 py-2 px-3.5 cursor-pointer rounded-[7px]',
        active
          ? 'bg-primary-bg border-l-[3px] border-l-primary'
          : 'bg-transparent border-l-[3px] border-l-transparent',
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap">
          {label}
        </div>
        <div className="text-[11px] text-text-tertiary overflow-hidden text-ellipsis whitespace-nowrap">
          {primitiveLabel}
        </div>
      </div>
      <button
        type="button"
        onClick={e => { e.stopPropagation(); onDelete(); }}
        onKeyDown={e => e.stopPropagation()}
        title="Delete"
        className="px-1.5 py-0.5 text-sm bg-transparent border-none text-danger-fg cursor-pointer shrink-0 font-semibold rounded-[7px] font-inherit"
      >
        ×
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Idle panel
// ---------------------------------------------------------------------------

function IdlePanel({ onCreateNew }: { onCreateNew: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center py-10 px-6 text-center">
      <div className="text-base font-semibold text-text-primary mb-2">Data Types</div>
      <div className="text-[13px] text-text-tertiary max-w-[360px] mb-6 leading-relaxed">
        Data types define the primitive storage type a document section holds — Text, Long text, Integer, Boolean, and more.
        Create custom types to give sections distinct labels and display configuration.
      </div>
      <button
        data-testid="new-data-type-empty-btn"
        type="button"
        onClick={onCreateNew}
        className="py-[7px] px-4 text-[13px] font-semibold rounded-[7px] cursor-pointer font-inherit border-none bg-primary text-white"
      >
        + New Data Type
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

type Mode = 'idle' | 'create' | 'edit';

export default function FieldTypesPage() {
  const { types: customTypes, createType, updateType, deleteType } = useCustomFieldTypes();
  const [mode, setMode] = useState<Mode>('idle');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<{ text: string; key: number } | null>(null);

  const editingType = editingId ? customTypes.find(t => t.id === editingId) : undefined;
  const confirmDeleteType = confirmDeleteId ? customTypes.find(t => t.id === confirmDeleteId) : undefined;

  const flashSave = (text: string) => setSaveMessage({ text, key: Date.now() });

  const handleSave = (draft: Omit<CustomFieldType, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (mode === 'create') {
      createType(draft);
      flashSave('Data type created');
    } else if (mode === 'edit' && editingId) {
      updateType(editingId, draft);
      flashSave('Changes saved');
    }
    setMode('idle');
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    deleteType(id);
    setConfirmDeleteId(null);
    if (editingId === id) { setMode('idle'); setEditingId(null); }
  };

  const primLabel = (t: CustomFieldType) => {
    return PRIMITIVE_STORAGE_TYPES.find(p => p.id === t.primitiveType)?.label ?? t.baseType;
  };

  return (
    <div className="flex h-full min-h-0 relative">

      {/* Left sidebar */}
      <div className="w-[264px] shrink-0 border-r border-border flex flex-col overflow-y-auto bg-surface-inset">
        <div className="py-4 px-3.5 pb-2.5 flex items-center justify-between">
          <span className="text-[13px] font-bold text-text-primary">Data Types</span>
          <button
            data-testid="new-data-type-button"
            type="button"
            onClick={() => { setMode('create'); setEditingId(null); }}
            className="py-[5px] px-3 text-xs font-semibold rounded-[7px] cursor-pointer font-inherit border-none bg-primary text-white"
          >
            + New
          </button>
        </div>

        <div className="px-2 py-1 flex-1">
          {customTypes.length === 0 ? (
            <div className="py-5 px-3 text-center text-text-tertiary text-xs">
              No custom data types yet.
            </div>
          ) : (
            customTypes.map(t => (
              <TypeListItem
                key={t.id}
                label={t.name}
                primitiveLabel={primLabel(t)}
                active={editingId === t.id}
                onSelect={() => { setMode('edit'); setEditingId(t.id); }}
                onDelete={() => setConfirmDeleteId(t.id)}
              />
            ))
          )}
        </div>

        {/* Save feedback */}
        {saveMessage && (
          <div
            key={saveMessage.key}
            data-testid="save-banner"
            // Saving tears down the form, so this banner is the ONLY signal
            // the save landed. role="status" (polite) rather than "alert" —
            // it is a confirmation, not an interruption.
            role="status"
            className="py-2 px-3.5 border-t border-success-border bg-success-bg text-xs text-success-fg font-medium"
          >
            ✓ {saveMessage.text}
          </div>
        )}
      </div>

      {/* Right panel */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        {mode === 'idle' && (
          <IdlePanel onCreateNew={() => setMode('create')} />
        )}

        {(mode === 'create' || mode === 'edit') && (
          <div className="py-7 px-8">
            <h2 className="m-0 mb-6 text-lg font-bold text-text-primary">
              {mode === 'create' ? 'New Data Type' : `Edit: ${editingType?.name ?? ''}`}
            </h2>
            <DataTypeForm
              key={editingId ?? 'new'}
              initial={editingType}
              onSave={handleSave}
              onCancel={() => { setMode('idle'); setEditingId(null); }}
            />
          </div>
        )}
      </div>

      {confirmDeleteType && (
        <DeleteModal
          name={confirmDeleteType.name}
          onConfirm={() => handleDelete(confirmDeleteType.id)}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  );
}
