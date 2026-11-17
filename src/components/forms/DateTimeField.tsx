// src/components/forms/DateTimeField.tsx
//
// A labelled field for one date and time. The value in and out is an ISO 8601
// string in UTC (or null); the person sees and edits it in their own zone (or
// the `timeZone` given), and the zone is named beside the time so "9:00" is
// never ambiguous. Built on the platform's datetime-local input inside the
// library's FormField chrome, so there is no date library and the keyboard and
// native pickers work as they do everywhere else.

import { useEffect, useMemo, useState } from 'react';
import { Input } from './Input';
import FormField from '../shared/FormField';
import { T } from '../shared/Text';

export interface DateTimeFieldProps {
  label: string;
  /** ISO 8601 instant (UTC), or null for "not set". */
  value: string | null;
  /** Called with the new ISO 8601 UTC instant, or null when the field is cleared. Not called for a time before `min`. */
  onChange: (value: string | null) => void;
  /** Earliest instant allowed, as an ISO 8601 string. */
  min?: string;
  hint?: string;
  /** Error message from the caller; wins over the field's own "before min" message. */
  error?: string;
  required?: boolean;
  disabled?: boolean;
  /** IANA zone to show and edit in. Default: the viewer's own zone. */
  timeZone?: string;
  /** Sentence shown when the typed time is before `min`. */
  minMessage?: string;
  'data-testid'?: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

function wallParts(ms: number, timeZone?: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone, hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(new Date(ms));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { y: get('year'), mo: get('month'), d: get('day'), h: get('hour') % 24, mi: get('minute'), s: get('second') };
}

/** ISO instant to the `YYYY-MM-DDTHH:mm` wall time in the zone. */
export function isoToLocalInput(iso: string | null, timeZone?: string): string {
  if (!iso) return '';
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return '';
  const p = wallParts(ms, timeZone);
  return `${String(p.y).padStart(4, '0')}-${pad(p.mo)}-${pad(p.d)}T${pad(p.h)}:${pad(p.mi)}`;
}

/** `YYYY-MM-DDTHH:mm` wall time in the zone to an ISO UTC instant, or null when it is not a time. */
export function localInputToIso(local: string, timeZone?: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(local);
  if (!m) return null;
  const wall = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
  let guess = wall;
  // The zone's offset depends on the instant, so settle it in two passes (covers the DST edges).
  for (let i = 0; i < 2; i++) {
    const p = wallParts(guess, timeZone);
    guess += wall - Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi, p.s);
  }
  const date = new Date(guess);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function zoneName(iso: string | null, timeZone?: string): string {
  const at = iso && !Number.isNaN(Date.parse(iso)) ? new Date(iso) : new Date();
  const part = new Intl.DateTimeFormat(undefined, { timeZone, timeZoneName: 'short' })
    .formatToParts(at).find((p) => p.type === 'timeZoneName');
  return part?.value ?? timeZone ?? 'local time';
}

export function DateTimeField({
  label, value, onChange, min, hint, error, required, disabled, timeZone,
  minMessage = 'Choose a time that is not in the past.',
  'data-testid': testId,
}: DateTimeFieldProps) {
  const fromValue = isoToLocalInput(value, timeZone);
  const [draft, setDraft] = useState(fromValue);
  const [tooEarly, setTooEarly] = useState(false);

  // Follow the value when the owner changes it; keep a refused draft on screen otherwise.
  useEffect(() => {
    setDraft((d) => (localInputToIso(d, timeZone) === value ? d : fromValue));
    setTooEarly(false);
  }, [value, fromValue, timeZone]);

  const minLocal = useMemo(() => (min ? isoToLocalInput(min, timeZone) : undefined), [min, timeZone]);
  const minMs = min ? Date.parse(min) : NaN;

  const handle = (next: string) => {
    setDraft(next);
    if (next === '') { setTooEarly(false); onChange(null); return; }
    const iso = localInputToIso(next, timeZone);
    if (!iso) return;
    if (!Number.isNaN(minMs) && Date.parse(iso) < minMs) { setTooEarly(true); return; }
    setTooEarly(false);
    onChange(iso);
  };

  const shownError = error ?? (tooEarly ? minMessage : undefined);

  return (
    <FormField label={label} hint={hint} error={shownError} required={required} data-testid={testId}>
      {(wiring) => (
        <Input
          {...wiring}
          type="datetime-local"
          value={draft}
          min={minLocal}
          disabled={disabled}
          invalid={!!shownError}
          onChange={(e) => handle(e.target.value)}
          suffix={<T size="xs" tone="tertiary">{zoneName(value, timeZone)}</T>}
          data-testid={testId ? `${testId}-input` : undefined}
        />
      )}
    </FormField>
  );
}

export default DateTimeField;
