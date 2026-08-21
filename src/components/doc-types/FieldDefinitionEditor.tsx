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

  return (
    <div className="flex items-center gap-2 py-2 px-2.5 rounded-lg bg-[#f8fafc] border border-border mb-1.5">
      {/* Reorder */}
      <div className="flex flex-col gap-px shrink-0">
        <button
          type="button"
          disabled={index === 0}
          onClick={onMoveUp}
          data-testid={`field-up-${field.id}`}
          className={cn(
            'px-1 py-px text-[10px] leading-none font-semibold rounded-[7px] font-inherit border-none bg-transparent',
            index === 0 ? 'text-[#64748b] opacity-50 cursor-not-allowed' : 'text-[#64748b] cursor-pointer',
          )}
        >▲</button>
        <button
          type="button"
          disabled={index === total - 1}
          onClick={onMoveDown}
          data-testid={`field-down-${field.id}`}
          className={cn(
            'px-1 py-px text-[10px] leading-none font-semibold rounded-[7px] font-inherit border-none bg-transparent',
            index === total - 1 ? 'text-[#64748b] opacity-50 cursor-not-allowed' : 'text-[#64748b] cursor-pointer',
          )}
        >▼</button>
      </div>

      {/* Icon */}
      <span className="text-base shrink-0">{def?.icon ?? '📄'}</span>

      {/* Name */}
      {/* Inline rename — reads as plain text until focused, so the Input's
          chrome is stripped via class overrides rather than hand-rolling. */}
      <Input
        data-testid={`field-name-${field.id}`}
        size="sm"
        value={field.name}
        onChange={e => onRename(e.target.value)}
        className="flex-1 min-w-0 bg-transparent border-transparent focus:border-accent-border focus:bg-white"
      />

      {/* Type select */}
      <Select
        data-testid={`field-type-${field.id}`}
        size="sm"
        value={field.sectionType}
        onChange={e => onChangeType(e.target.value)}
        className="w-auto shrink-0 text-[11px] font-semibold bg-accent-bg text-accent-fg border-accent-border"
        options={allTypes.map(t => ({ value: t.type, label: t.label }))}
      />

      {/* Toggles */}
      <button
        type="button"
        onClick={onToggleRequired}
        data-testid={`field-required-${field.id}`}
        title="Required"
        className={cn(
          'px-2 py-[3px] text-[11px] font-semibold rounded-[7px] font-inherit shrink-0 cursor-pointer',
          field.required
            ? 'bg-[#ede9fe] text-[#4c1d95] border border-[#c4b5fd]'
            : 'bg-[#f8fafc] text-[#94a3b8] border border-border',
        )}
      >
        Required
      </button>
      <button
        type="button"
        onClick={onToggleCollapsed}
        data-testid={`field-collapsed-${field.id}`}
        title="Collapsed by default"
        className={cn(
          'px-2 py-[3px] text-[11px] font-semibold rounded-[7px] font-inherit shrink-0 cursor-pointer',
          field.defaultCollapsed
            ? 'bg-[#f0fdf4] text-[#16a34a] border border-[#86efac]'
            : 'bg-[#f8fafc] text-[#94a3b8] border border-border',
        )}
      >
        Collapsed
      </button>

      {/* Delete */}
      <button
        type="button"
        onClick={onRemove}
        data-testid={`field-remove-${field.id}`}
        className="px-1.5 py-0.5 text-sm bg-transparent border-none text-[#ef4444] cursor-pointer shrink-0 font-semibold rounded-[7px] font-inherit"
      >
        ×
      </button>
    </div>
  );
}
