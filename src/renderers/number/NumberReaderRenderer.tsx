// Reader-mode renderer for sectionType='number'.
//
// Grouped digits, tabular figures — an Invoice total and a Sales Lead's deal
// value line up instead of drifting.

import type { SectionRendererProps } from '../types';
import { readNumberValue, formatNumberValue } from '../scalarValue';
import LegacyProseNote from '../LegacyProseNote';

export default function NumberReaderRenderer({ section, fragment }: SectionRendererProps) {
  const value = readNumberValue(section);

  // `value === undefined`, never `!value`: 0 is a real answer (0 story points
  // completed, £0 budget spent) and must not render as "no value".
  if (value === undefined) {
    return (
      <div>
        <div
          data-testid={`number-field-empty-${section.id}`}
          className="text-text-tertiary italic text-[13px]"
        >
          No value.
        </div>
        <LegacyProseNote sectionId={section.id} fragment={fragment} />
      </div>
    );
  }

  return (
    <div
      data-testid={`number-field-reader-${section.id}`}
      className="text-[13px] text-text-primary font-medium tabular-nums"
    >
      {formatNumberValue(value)}
    </div>
  );
}
