// src/components/shared/FilterBand.tsx
//
// The filter band over a list page's table: one framed row of labelled
// fields (a text field, or a select that reads "Any"), Filter, Reset, any
// extra actions, and a short summary at the right ("19 runs · 4 waiting for
// you"). Every list page uses the same band, so they agree. Controlled: the
// host owns each field's value and decides what Filter and Reset do.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../forms/Input';
import { Select, type SelectOption } from '../forms/Select';
import FormField from './FormField';

export interface FilterBandField {
  /** Stable id; part test ids are `<testid>-field-<id>`. */
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  /**
   * Present: the field is a select. An "Any" option (value `''`, labelled by
   * `anyLabel`) leads the list unless one of the options already has value `''`.
   */
  options?: SelectOption[];
  /** A text field's placeholder. */
  placeholder?: string;
  /** "Any" for this select (default `'Any'`). */
  anyLabel?: string;
}

export interface FilterBandProps {
  fields: FilterBandField[];
  /** Filter pressed, or Enter in a text field. */
  onFilter: () => void;
  /** Reset pressed. */
  onReset: () => void;
  /** A short count at the right of the band. */
  summary?: ReactNode;
  /** Extra controls after Reset (a bulk action). Use small controls. */
  actions?: ReactNode;
  filterLabel?: string;
  resetLabel?: string;
  /** Names the band for assistive tech (default `'Filters'`). */
  'aria-label'?: string;
  className?: string;
  'data-testid'?: string;
}

/** A framed row of labelled filter fields with Filter, Reset and a summary. */
export function FilterBand({
  fields,
  onFilter,
  onReset,
  summary,
  actions,
  filterLabel = 'Filter',
  resetLabel = 'Reset',
  'aria-label': ariaLabel = 'Filters',
  className,
  'data-testid': testId = 'filter-band',
}: FilterBandProps) {
  return (
    <Card padding="sm" className={className} data-testid={testId}>
      <div role="search" aria-label={ariaLabel} className="flex flex-wrap items-end justify-between gap-x-3 gap-y-2">
        <div className="flex min-w-0 flex-wrap items-end gap-2">
          {fields.map((f) => (
            <FormField key={f.id} label={f.label} className={cn('gap-1', !f.options && 'w-40')} data-testid={`${testId}-field-${f.id}`}>
              {(wiring) => f.options ? (
                <Select
                  {...wiring}
                  size="sm"
                  value={f.value}
                  options={f.options.some((o) => o.value === '') ? f.options : [{ value: '', label: f.anyLabel ?? 'Any' }, ...f.options]}
                  onChange={(e) => f.onChange(e.target.value)}
                  data-testid={`${testId}-${f.id}`}
                />
              ) : (
                <Input
                  {...wiring}
                  size="sm"
                  value={f.value}
                  placeholder={f.placeholder}
                  onChange={(e) => f.onChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.nativeEvent.isComposing) { e.preventDefault(); onFilter(); }
                  }}
                  data-testid={`${testId}-${f.id}`}
                />
              )}
            </FormField>
          ))}
          <Button size="sm" variant="secondary" onClick={onFilter} data-testid={`${testId}-filter`}>{filterLabel}</Button>
          <Button size="sm" variant="ghost" onClick={onReset} data-testid={`${testId}-reset`}>{resetLabel}</Button>
          {actions}
        </div>
        {summary != null && summary !== '' && (
          <span className="ml-auto pb-1 text-xs whitespace-nowrap text-text-secondary" aria-live="polite" data-testid={`${testId}-summary`}>{summary}</span>
        )}
      </div>
    </Card>
  );
}

export default FilterBand;
