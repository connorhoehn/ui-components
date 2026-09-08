// Reader-mode renderer for sectionType='date'.
//
// Renders the stored 'YYYY-MM-DD' as a locale date inside a <time>, so an
// Invoice's due date reads as a date and is machine-readable at the same time.

import type { SectionRendererProps } from '../types';
import { readDateValue, formatDateValue } from '../scalarValue';
import LegacyProseNote from '../LegacyProseNote';

export default function DateReaderRenderer({ section, fragment }: SectionRendererProps) {
  const value = readDateValue(section);

  if (!value) {
    return (
      <div>
        <div
          data-testid={`date-field-empty-${section.id}`}
          className="text-text-tertiary italic text-[13px]"
        >
          No date set.
        </div>
        <LegacyProseNote sectionId={section.id} fragment={fragment} />
      </div>
    );
  }

  return (
    <time
      data-testid={`date-field-reader-${section.id}`}
      dateTime={value}
      className="text-[13px] text-text-primary font-medium tabular-nums"
    >
      {formatDateValue(value)}
    </time>
  );
}
