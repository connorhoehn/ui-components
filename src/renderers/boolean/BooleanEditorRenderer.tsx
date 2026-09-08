// Editor-mode renderer for sectionType='boolean'.
//
// A checkbox has two states and this field has three, so the unanswered state
// is carried by `indeterminate` — the native dash, and aria-checked="mixed"
// for assistive tech. Ticking a mixed box answers Yes (the native select-all
// convention Checkbox already implements); ticking again answers No; "Clear"
// puts it back to unanswered. Nothing in that cycle can silently turn "nobody
// said" into "No".

import { cn } from '../../lib/cn';
import { Checkbox } from '../../components/forms/Checkbox';
import type { SectionRendererProps } from '../types';
import { readBooleanValue, setScalarPatch } from '../scalarValue';
import LegacyProseNote from '../LegacyProseNote';
import BooleanReaderRenderer from './BooleanReaderRenderer';

export default function BooleanEditorRenderer(props: SectionRendererProps) {
  const { section, editable, fragment, onUpdateSection } = props;

  // See TextEditorRenderer: 'editor' + editable=false is a FINALIZED document.
  if (!editable) return <BooleanReaderRenderer {...props} />;

  const value = readBooleanValue(section);

  return (
    <div data-testid={`boolean-field-editor-${section.id}`}>
      <div className="flex items-center gap-2">
        <Checkbox
          data-testid={`boolean-field-input-${section.id}`}
          checked={value === true}
          indeterminate={value === undefined}
          aria-label={section.title}
          onChange={(checked) => onUpdateSection?.(setScalarPatch(section, checked))}
        />
        <span
          data-testid={`boolean-field-status-${section.id}`}
          className={cn(
            'text-[13px]',
            value === undefined
              ? 'text-text-tertiary italic'
              : value
                ? 'text-success-fg font-medium'
                : 'text-text-secondary font-medium',
          )}
        >
          {value === undefined
            ? (section.placeholder || 'Not answered')
            : value ? 'Yes' : 'No'}
        </span>
        {value !== undefined && (
          <button
            type="button"
            data-testid={`boolean-field-clear-${section.id}`}
            onClick={() => onUpdateSection?.(setScalarPatch(section, undefined))}
            className="bg-transparent border-none text-[12px] text-text-tertiary cursor-pointer p-0 font-inherit"
          >
            Clear
          </button>
        )}
      </div>
      {value === undefined && <LegacyProseNote sectionId={section.id} fragment={fragment} />}
    </div>
  );
}
