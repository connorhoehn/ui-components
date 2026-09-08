// Editor-mode renderer for sectionType='text'.
//
// One line, no formatting, no toolbar — the whole point of the type. The
// cookbook field's `placeholder` ("Critical / High / Medium / Low",
// "INV-0001") is the only guidance the author gets, so it is shown rather
// than dropped.

import { Input } from '../../components/forms/Input';
import type { SectionRendererProps } from '../types';
import { readTextValue, setScalarPatch } from '../scalarValue';
import LegacyProseNote from '../LegacyProseNote';
import TextReaderRenderer from './TextReaderRenderer';

export default function TextEditorRenderer(props: SectionRendererProps) {
  const { section, editable, fragment, onUpdateSection } = props;

  // A finalized document still resolves through the EDITOR registry entry —
  // EditorModeSwitch passes `editable={!isFinalized}` and keeps viewMode
  // 'editor'. A locked field must therefore read as a value, not as a greyed
  // form control, so hand off to the reader instead of disabling the input.
  if (!editable) return <TextReaderRenderer {...props} />;

  const value = readTextValue(section);

  return (
    <div data-testid={`text-field-editor-${section.id}`}>
      <Input
        data-testid={`text-field-input-${section.id}`}
        value={value}
        aria-label={section.title}
        placeholder={section.placeholder || 'Enter text…'}
        // Emptying the field must UNSET it, not store '': the two look the
        // same to this renderer but only the deletion reads as "unanswered"
        // to anything counting how much of the document is filled in.
        onChange={(e) => onUpdateSection?.(setScalarPatch(section, e.target.value || undefined))}
      />
      {value === '' && <LegacyProseNote sectionId={section.id} fragment={fragment} />}
    </div>
  );
}
