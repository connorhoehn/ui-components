// Reader-mode renderer for sectionType='boolean'.
//
// THREE states, not two. "Equipment Issued" that nobody has touched is not the
// same claim as "Equipment Issued: No", and an onboarding checklist that
// renders unanswered as No is actively misleading.

import { cn } from '../../lib/cn';
import type { SectionRendererProps } from '../types';
import { readBooleanValue } from '../scalarValue';
import LegacyProseNote from '../LegacyProseNote';

export default function BooleanReaderRenderer({ section, fragment }: SectionRendererProps) {
  const value = readBooleanValue(section);

  if (value === undefined) {
    return (
      <div>
        <div
          data-testid={`boolean-field-empty-${section.id}`}
          className="text-text-tertiary italic text-[13px]"
        >
          Not answered.
        </div>
        <LegacyProseNote sectionId={section.id} fragment={fragment} />
      </div>
    );
  }

  return (
    <div
      data-testid={`boolean-field-reader-${section.id}`}
      className={cn(
        'text-[13px] font-medium',
        value ? 'text-success-fg' : 'text-text-secondary',
      )}
    >
      {value ? '✓ Yes' : '✗ No'}
    </div>
  );
}
