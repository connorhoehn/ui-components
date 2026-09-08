// Reader-mode renderer for sectionType='text'.
//
// A text field is ONE LINE of plain prose — a name, a status word, an invoice
// number. It is not rich text and must not read as a paragraph box, which is
// exactly what the DefaultRenderer fallback made of all 100 of them.

import type { SectionRendererProps } from '../types';
import { readTextValue } from '../scalarValue';
import LegacyProseNote from '../LegacyProseNote';

export default function TextReaderRenderer({ section, fragment }: SectionRendererProps) {
  const value = readTextValue(section);

  if (value.trim() === '') {
    return (
      <div>
        <div
          data-testid={`text-field-empty-${section.id}`}
          className="text-text-tertiary italic text-[13px]"
        >
          Not set.
        </div>
        <LegacyProseNote sectionId={section.id} fragment={fragment} />
      </div>
    );
  }

  return (
    <div
      data-testid={`text-field-reader-${section.id}`}
      className="text-[13px] text-text-primary leading-[1.5] break-words"
    >
      {value}
    </div>
  );
}
