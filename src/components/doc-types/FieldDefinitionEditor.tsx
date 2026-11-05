// frontend/src/components/doc-types/FieldDefinitionEditor.tsx
//
// Per-field schema editor row. Each row shows: reorder arrows, icon, name input,
// type selector, required/collapsed toggles, and a delete button.
// Extracted from DocumentTypeWizard.tsx Step 2.

import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import type { DocumentTypeField } from '../../types/documentType';
import { getFieldTypes, getFieldType } from '../../renderers/registry';

export interface FieldDefinitionEditorProps {
  field: DocumentTypeField;
  index: number;
  total: number;
  onRename: (name: string) => void;
  onChangeType: (type: string) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggleRequired: () => void;
  onToggleCollapsed: () => void;
}

export function FieldDefinitionEditor({
  field, index, total,
  onRename, onChangeType, onRemove, onMoveUp, onMoveDown, onToggleRequired, onToggleCollapsed,
}: FieldDefinitionEditorProps) {
  const def = getFieldType(field.sectionType);
  const allTypes = getFieldTypes();
  const rowName = field.name.trim() || `Section ${index + 1}`;

  return (
    <div className="flex items-center gap-2 py-2 px-2.5 rounded-lg bg-surface-panel border border-border mb-1.5">
      {/* Reorder */}
      <div className="flex flex-col gap-px shrink-0">
        <button
          data-ui-part=""
          type="button"
          disabled={index === 0}
          onClick={onMoveUp}
          data-testid={`field-up-${field.id}`}
          aria-label={`Move ${field.name} up`}
          className={cn(
            'px-1 py-px text-[10px] leading-none font-semibold rounded-[7px] font-inherit border-none bg-transparent',
            index === 0 ? 'text-neutral opacity-50 cursor-not-allowed' : 'text-neutral cursor-pointer',
          )}
        >▲</button>
        <button
          data-ui-part=""
          type="button"
          disabled={index === total - 1}
          onClick={onMoveDown}
          data-testid={`field-down-${field.id}`}
          aria-label={`Move ${field.name} down`}
          className={cn(
            'px-1 py-px text-[10px] leading-none font-semibold rounded-[7px] font-inherit border-none bg-transparent',
            index === total - 1 ? 'text-neutral opacity-50 cursor-not-allowed' : 'text-neutral cursor-pointer',
          )}
        >▼</button>
      </div>

      {/* Icon */}
      <span className="text-base shrink-0">{def?.icon ?? '📄'}</span>

      {/* Name */}
      {/* Inline rename — reads as plain text until focused, so the Input's
          chrome is stripped via class overrides rather than hand-rolling. */}
      {/* Neither of these had an accessible name: the rename box reads as plain
          text so there is no visible caption to associate, and the type picker
          sits beside it unlabelled. In a list of sections that is a column of
          identical "edit text" / "combo box" announcements. Named positionally,
          falling back from the section's own (visible) name while it is blank. */}
      <Input
        aria-label={`${rowName} name`}
        data-testid={`field-name-${field.id}`}
        size="sm"
        value={field.name}
        onChange={e => onRename(e.target.value)}
        className="flex-1 min-w-0 bg-transparent border-transparent focus:border-accent-border focus:bg-surface"
      />

      {/* Type select */}
      <Select
        aria-label={`${rowName} type`}
        data-testid={`field-type-${field.id}`}
        size="sm"
        value={field.sectionType}
        onChange={e => onChangeType(e.target.value)}
        className="w-auto shrink-0 text-[11px] font-semibold bg-accent-bg text-accent-fg border-accent-border"
        options={allTypes.map(t => ({ value: t.type, label: t.label }))}
      />

      {/* Toggles */}
      <button
        data-ui-part=""
        type="button"
        onClick={onToggleRequired}
        data-testid={`field-required-${field.id}`}
        title="Required"
        className={cn(
          'px-2 py-[3px] text-[11px] font-semibold rounded-[7px] font-inherit shrink-0 cursor-pointer',
          field.required
            ? 'bg-accent-bg text-accent-fg border border-accent-border'
            : 'bg-surface-panel text-text-tertiary border border-border',
        )}
      >
        Required
      </button>
      <button
        data-ui-part=""
        type="button"
        onClick={onToggleCollapsed}
        data-testid={`field-collapsed-${field.id}`}
        title="Collapsed by default"
        className={cn(
          'px-2 py-[3px] text-[11px] font-semibold rounded-[7px] font-inherit shrink-0 cursor-pointer',
          field.defaultCollapsed
            ? 'bg-success-bg text-success-fg border border-success-border'
            : 'bg-surface-panel text-text-tertiary border border-border',
        )}
      >
        Collapsed
      </button>

      {/* Delete */}
      <button
        data-ui-part=""
        type="button"
        onClick={onRemove}
        data-testid={`field-remove-${field.id}`}
        aria-label={`Remove ${field.name}`}
        className="px-1.5 py-0.5 text-sm bg-transparent border-none text-danger-fg cursor-pointer shrink-0 font-semibold rounded-[7px] font-inherit"
      >
        ×
      </button>
    </div>
  );
}
