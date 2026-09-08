// Editor-mode renderer for sectionType='number'.
//
// NumberInput is used precisely because it already models the unset state:
// `value: number | undefined` plus an `onClear` that fires when the field is
// emptied. Without onClear, deleting the digits would leave the old number in
// place — the field would look empty and still hold 42.

import { NumberInput } from '../../components/forms/NumberInput';
import type { SectionRendererProps } from '../types';
import { readNumberValue, setScalarPatch } from '../scalarValue';
import LegacyProseNote from '../LegacyProseNote';
import NumberReaderRenderer from './NumberReaderRenderer';

export default function NumberEditorRenderer(props: SectionRendererProps) {
  const { section, editable, fragment, onUpdateSection } = props;

  // See TextEditorRenderer: 'editor' + editable=false is a FINALIZED document.
  if (!editable) return <NumberReaderRenderer {...props} />;

  const value = readNumberValue(section);

  return (
    <div data-testid={`number-field-editor-${section.id}`}>
      <div className="max-w-xs">
        <NumberInput
          data-testid={`number-field-input-${section.id}`}
          value={value}
          aria-label={section.title}
          placeholder={section.placeholder || 'Enter a number…'}
          onChange={(n) => onUpdateSection?.(setScalarPatch(section, n))}
          onClear={() => onUpdateSection?.(setScalarPatch(section, undefined))}
        />
      </div>
      {value === undefined && <LegacyProseNote sectionId={section.id} fragment={fragment} />}
    </div>
  );
}
