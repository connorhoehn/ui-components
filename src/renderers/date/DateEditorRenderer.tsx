// Editor-mode renderer for sectionType='date'.
//
// A native date control (uic's Input already carries type='date'), plus the
// formatted echo — '2026-03-04' is ambiguous across locales and the browser's
// own rendering of the control differs from what the reader will show.

import { Input } from '../../components/forms/Input';
import type { SectionRendererProps } from '../types';
import { readDateValue, formatDateValue, setScalarPatch } from '../scalarValue';
import LegacyProseNote from '../LegacyProseNote';
import DateReaderRenderer from './DateReaderRenderer';

export default function DateEditorRenderer(props: SectionRendererProps) {
  const { section, editable, fragment, onUpdateSection } = props;

  // See TextEditorRenderer: 'editor' + editable=false is a FINALIZED document,
  // and it should read, not look like a disabled form.
  if (!editable) return <DateReaderRenderer {...props} />;

  const value = readDateValue(section);

  return (
    <div data-testid={`date-field-editor-${section.id}`}>
      <div className="flex items-center gap-2">
        <div className="max-w-xs">
          <Input
            type="date"
            data-testid={`date-field-input-${section.id}`}
            value={value}
            aria-label={section.title}
            // Clearing the control emits '' — that is "unanswered", not the
            // epoch. setScalarPatch(undefined) deletes the key.
            onChange={(e) => onUpdateSection?.(setScalarPatch(section, e.target.value || undefined))}
          />
        </div>
        {value ? (
          <span
            data-testid={`date-field-formatted-${section.id}`}
            className="text-[12px] text-text-tertiary tabular-nums"
          >
            {formatDateValue(value)}
          </span>
        ) : (
          <span
            data-testid={`date-field-hint-${section.id}`}
            className="text-[12px] text-text-tertiary italic"
          >
            {section.placeholder || 'No date set'}
          </span>
        )}
        {value && (
          <button
            data-ui-part=""
            type="button"
            data-testid={`date-field-clear-${section.id}`}
            onClick={() => onUpdateSection?.(setScalarPatch(section, undefined))}
            className="bg-transparent border-none text-[12px] text-text-tertiary cursor-pointer p-0"
          >
            Clear
          </button>
        )}
      </div>
      {!value && <LegacyProseNote sectionId={section.id} fragment={fragment} />}
    </div>
  );
}
