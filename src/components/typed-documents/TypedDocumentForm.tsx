// Phase 51 Phase A + B + C — auto-generated form for an API-shaped DocumentType.
//
// Widget mapping:
//   - text + cardinality=1       → <input type="text">
//   - long_text + cardinality=1  → <textarea>
//   - number + cardinality=1     → <input type="number">
//   - date + cardinality=1       → <input type="date">
//   - boolean + cardinality=1    → <input type="checkbox">
//   - enum + cardinality=1       → <select> populated from field.options (Phase C)
//   - reference + cardinality=1  → <select> populated from props.referenceOptions (Phase C)
//   - text/number/date + cardinality=unlimited → list of inputs with + / −
//   - boolean + unlimited is REJECTED at the backend (semantically meaningless)
//   - enum/reference + unlimited: out of scope for v1 (cardinality=1 only); a
//     follow-up task can add multi-select repeating UI.
//
// Form internal state stores text-shaped values as strings; numbers are
// coerced via Number() at submit time, dates pass through as ISO strings,
// booleans live as actual booleans tied to checkbox state.

import { useId, useState, type JSX } from 'react';
import { cn } from '../../lib/cn';
import { Input } from '../forms/Input';
import { Textarea } from '../forms/Textarea';
import { Select } from '../forms/Select';
import { Checkbox } from '../forms/Checkbox';
import { Button } from '../ui/Button';
import type { ApiDocumentType, ApiDocumentTypeField, TypedDocumentValue } from '../../hooks/useTypedDocuments';

export interface ReferenceOption {
  value: string; // documentId
  label: string; // display label (caller picks which field to show)
}

// Form state per field. Booleans are stored natively; everything else is a
// string (or string array for unlimited) for clean input wiring.
type SingleStored = string | boolean;
type FieldStored = SingleStored | string[];

interface FormState {
  [fieldId: string]: FieldStored;
}

// Phase D — observed value for showWhen comparison. Maps the form's stored
// shape to what an `equals` predicate would compare against. Numbers stored
// as strings (number widget) coerce to Number for the comparison; empty
// strings stay strings so an unset text field can't accidentally equal 0.
function observedFor(field: ApiDocumentTypeField, stored: FieldStored): string | number | boolean | undefined {
  if (Array.isArray(stored)) return undefined; // unlimited fields aren't valid showWhen sources
  if (field.fieldType === 'boolean') return typeof stored === 'boolean' ? stored : undefined;
  if (field.fieldType === 'number') {
    if (typeof stored !== 'string' || stored.trim() === '') return undefined;
    const n = Number(stored);
    return Number.isFinite(n) ? n : undefined;
  }
  return typeof stored === 'string' ? stored : undefined;
}

function isVisible(
  field: ApiDocumentTypeField,
  type: ApiDocumentType,
  values: FormState,
  seen: ReadonlySet<string> = new Set(),
): boolean {
  if (!field.showWhen) return true;
  // Cyclic `showWhen` (A shows when B, B shows when A) — treat as unconditional
  // rather than recursing forever. Same principle as the bad-reference branch
  // below: show the field, don't crash the page and don't silently hide it.
  if (seen.has(field.fieldId)) return true;
  const source = type.fields.find((f) => f.fieldId === field.showWhen!.fieldId);
  if (!source) return true; // bad reference — show the field rather than silently hiding
  // A hidden source field is not part of this document: `handleSubmit` drops
  // it from the payload entirely. So nothing may be conditioned on the value
  // it happens to still be holding in form state. With A→B→C chained, setting
  // A to hide B left C on screen and IN the payload, keyed to a condition on a
  // field that was never submitted — the user saw a field the type author had
  // said to hide, filled it in, and it was saved.
  if (!isVisible(source, type, values, new Set(seen).add(field.fieldId))) return false;
  const observed = observedFor(source, values[source.fieldId]);
  return observed === field.showWhen.equals;
}

function applyClientValidation(field: ApiDocumentTypeField, coerced: TypedDocumentValue): string | null {
  const v = field.validation;
  if (!v) return null;
  const check = (val: string | number | boolean): string | null => {
    if (typeof val === 'string') {
      if (v.min !== undefined && val.length < v.min) return `${field.name}: must be at least ${v.min} characters`;
      if (v.max !== undefined && val.length > v.max) return `${field.name}: must be at most ${v.max} characters`;
      if (v.regex !== undefined) {
        try { if (!new RegExp(v.regex).test(val)) return `${field.name}: does not match required pattern`; }
        catch { /* malformed regex from server — defer to server-side check */ }
      }
    } else if (typeof val === 'number') {
      if (v.min !== undefined && val < v.min) return `${field.name}: must be at least ${v.min}`;
      if (v.max !== undefined && val > v.max) return `${field.name}: must be at most ${v.max}`;
    } else if (typeof val === 'boolean') {
      if (v.requireTrue && !val) return `${field.name} must be checked`;
    }
    return null;
  };
  if (Array.isArray(coerced)) {
    for (const it of coerced) {
      const e = check(it as string | number);
      if (e) return e;
    }
    return null;
  }
  return check(coerced);
}

export interface TypedDocumentFormProps {
  type: ApiDocumentType;
  onSubmit: (values: Record<string, TypedDocumentValue>) => Promise<void>;
  /** Reset to defaults after a successful submit (default true). */
  resetOnSubmit?: boolean;
  /**
   * Phase C — keyed by DocumentType id. Used by reference fields to populate
   * their picker. Caller (typically TypedDocumentsPage) fetches instances of
   * each referenced type and supplies them. Missing entries render a disabled
   * picker with a "no options" hint.
   */
  referenceOptions?: Record<string, ReferenceOption[]>;
  /**
   * Keyed by DocumentType id. Set when the caller's lookup for that type
   * FAILED, which is not the same thing as the type having no instances — the
   * picker says so instead of claiming there is nothing to reference.
   */
  referenceOptionsErrors?: Record<string, string>;
  /**
   * Keyed by DocumentType id. `true` while the caller's lookup for that type
   * is still in flight. Additive.
   *
   * "No options yet" was inferred purely from an empty `referenceOptions`, and
   * an unstarted lookup is empty too — so for the whole duration of the fetch
   * the picker sat disabled under "No referenceable documents yet for this
   * type." That is the same false statement the `referenceOptionsErrors`
   * fix removed, just in a different window: it tells the user the documents
   * do not exist and to go create one.
   */
  referenceOptionsLoading?: Record<string, boolean>;
}

function defaultForField(field: ApiDocumentTypeField): FieldStored {
  if (field.cardinality === 'unlimited') return [''];
  if (field.fieldType === 'boolean') return false;
  return '';
}

function coerceSingle(field: ApiDocumentTypeField, raw: SingleStored): TypedDocumentValue | null {
  switch (field.fieldType) {
    case 'text':
    case 'long_text':
      return typeof raw === 'string' && raw !== '' ? raw : null;
    case 'date':
      return typeof raw === 'string' && raw !== '' ? raw : null;
    case 'number': {
      if (typeof raw !== 'string' || raw.trim() === '') return null;
      const n = Number(raw);
      return Number.isFinite(n) ? n : null;
    }
    case 'boolean':
      return typeof raw === 'boolean' ? raw : null;
    case 'enum':
    case 'reference':
      return typeof raw === 'string' && raw !== '' ? raw : null;
  }
}

function coerceUnlimited(field: ApiDocumentTypeField, arr: string[]): TypedDocumentValue | null {
  const out: (string | number)[] = [];
  for (const entry of arr) {
    if (entry.trim() === '') continue;
    if (field.fieldType === 'number') {
      const n = Number(entry);
      if (!Number.isFinite(n)) return null; // signal a coercion error
      out.push(n);
    } else {
      out.push(entry);
    }
  }
  return out.length > 0 ? (out as string[] | number[]) : null;
}


export function TypedDocumentForm({ type, onSubmit, resetOnSubmit = true, referenceOptions = {}, referenceOptionsErrors = {}, referenceOptionsLoading = {} }: TypedDocumentFormProps): JSX.Element {
  const [values, setValues] = useState<FormState>(() => {
    const init: FormState = {};
    for (const f of type.fields) init[f.fieldId] = defaultForField(f);
    return init;
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successKey, setSuccessKey] = useState(0);
  const uid = useId();

  const setField =(fieldId: string, v: FieldStored): void => {
    setValues((prev) => ({ ...prev, [fieldId]: v }));
  };
  const setArrayAt = (fieldId: string, idx: number, v: string): void => {
    setValues((prev) => {
      const arr = Array.isArray(prev[fieldId]) ? [...(prev[fieldId] as string[])] : [];
      arr[idx] = v;
      return { ...prev, [fieldId]: arr };
    });
  };
  const addArrayEntry = (fieldId: string): void => {
    setValues((prev) => {
      const arr = Array.isArray(prev[fieldId]) ? [...(prev[fieldId] as string[]), ''] : [''];
      return { ...prev, [fieldId]: arr };
    });
  };
  const removeArrayEntry = (fieldId: string, idx: number): void => {
    setValues((prev) => {
      const arr = Array.isArray(prev[fieldId]) ? [...(prev[fieldId] as string[])] : [];
      arr.splice(idx, 1);
      return { ...prev, [fieldId]: arr.length ? arr : [''] };
    });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);

    // Required-field check + per-type coercion in one pass. Hidden fields
    // (showWhen unmet) are skipped entirely and dropped from the payload.
    const cleaned: Record<string, TypedDocumentValue> = {};
    for (const field of type.fields) {
      if (!isVisible(field, type, values)) continue;
      const stored = values[field.fieldId];
      let coerced: TypedDocumentValue | null;
      if (field.cardinality === 'unlimited') {
        coerced = coerceUnlimited(field, Array.isArray(stored) ? stored : []);
        if (coerced === null && Array.isArray(stored) && stored.some((s) => s.trim() !== '')) {
          // Some entries present but coercion failed — number parse error.
          setError(`${field.name}: invalid value for ${field.fieldType}`);
          return;
        }
      } else {
        coerced = coerceSingle(field, stored as SingleStored);
        // `coerceSingle` answers `null` for BOTH "the user left this empty"
        // and "there is a value here but it won't coerce" (a `number` field
        // holding `12e`, reachable via `widget: 'text_field'` or the number
        // input's own invalid-input state, which reports `value === ''`).
        // Without this guard the optional case was silently dropped from the
        // payload and the form still rendered "✓ Saved", so the user believed
        // a number had been stored that was never sent; the required case
        // said "<name> is required" about a field that was visibly filled.
        // The `coerceUnlimited` branch above has always had this check.
        if (
          coerced === null &&
          typeof stored === 'string' &&
          stored.trim() !== ''
        ) {
          setError(`${field.name}: invalid value for ${field.fieldType}`);
          return;
        }
      }

      if (field.required && coerced === null) {
        setError(`${field.name} is required`);
        return;
      }
      // Boolean false IS a valid coerced value — coerceSingle returns it
      // explicitly. Skip null-coerced (i.e. truly empty) optional fields.
      if (coerced !== null) {
        const validationError = applyClientValidation(field, coerced);
        if (validationError) {
          setError(validationError);
          return;
        }
        cleaned[field.fieldId] = coerced;
      }
    }

    setSubmitting(true);
    try {
      await onSubmit(cleaned);
      if (resetOnSubmit) {
        const reset: FormState = {};
        for (const f of type.fields) reset[f.fieldId] = defaultForField(f);
        setValues(reset);
      }
      setSuccessKey((k) => k + 1);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="typed-document-form" className={cn('flex flex-col gap-3')}>
      <div className={cn('text-base font-semibold text-text-primary')}>
        New {type.name}
      </div>

      {error && (
        <div data-testid="form-error" role="alert" className={cn('text-danger-fg text-[13px]')}>
          {error}
        </div>
      )}
      {successKey > 0 && !error && (
        <div data-testid="form-success" key={successKey} className={cn('text-success-fg text-[13px]')}>
          ✓ Saved
        </div>
      )}

      {type.fields.map((field) => {
        if (!isVisible(field, type, values)) return null;
        const v = values[field.fieldId];

        // A11y wiring, same shape as pipelines' ConfigField. The <label> here
        // had no htmlFor and wrapped nothing, so EVERY generated field
        // announced as a bare "edit text" — and this is a generator, so the
        // defect multiplied by the number of fields in the document type.
        const controlId = `${uid}-${field.fieldId}`;
        const labelId = `${controlId}-label`;
        const helpId = field.helpText ? `${controlId}-help` : undefined;
        // An unlimited field renders N inputs plus add/remove buttons; there
        // is no single labelable control for htmlFor to point at, so it names
        // a role="group" from the same label instead.
        const isGroup = field.cardinality === 'unlimited';

        return (
          <div key={field.fieldId} data-testid={`field-${field.fieldId}`} className={cn('flex flex-col gap-1')}>
            <label
              id={labelId}
              htmlFor={isGroup ? undefined : controlId}
              className={cn('text-[13px] font-medium text-text-primary')}
            >
              {field.name}
              {field.required && (
                <span aria-hidden="true" className={cn('text-danger-fg ml-1')}>*</span>
              )}
            </label>

            {field.cardinality === 1 && field.widget === 'textarea' && (
              <Textarea
                id={controlId}
                aria-describedby={helpId}
                aria-required={field.required || undefined}
                data-testid={`input-${field.fieldId}`}
                value={typeof v === 'string' ? v : ''}
                onChange={(e) => setField(field.fieldId, e.target.value)}
                rows={4}
              />
            )}

            {field.cardinality === 1 && field.widget === 'text_field' && (
              <Input
                id={controlId}
                aria-describedby={helpId}
                aria-required={field.required || undefined}
                data-testid={`input-${field.fieldId}`}
                type="text"
                value={typeof v === 'string' ? v : ''}
                onChange={(e) => setField(field.fieldId, e.target.value)}
              />
            )}

            {field.cardinality === 1 && field.widget === 'number_input' && (
              <Input
                id={controlId}
                aria-describedby={helpId}
                aria-required={field.required || undefined}
                data-testid={`input-${field.fieldId}`}
                type="number"
                value={typeof v === 'string' ? v : ''}
                onChange={(e) => setField(field.fieldId, e.target.value)}
              />
            )}

            {field.cardinality === 1 && field.widget === 'date_picker' && (
              <Input
                id={controlId}
                aria-describedby={helpId}
                aria-required={field.required || undefined}
                data-testid={`input-${field.fieldId}`}
                type="date"
                value={typeof v === 'string' ? v : ''}
                onChange={(e) => setField(field.fieldId, e.target.value)}
              />
            )}

            {field.cardinality === 1 && field.widget === 'checkbox' && (
              <Checkbox
                id={controlId}
                aria-describedby={helpId}
                data-testid={`input-${field.fieldId}`}
                checked={typeof v === 'boolean' ? v : false}
                onChange={(checked) => setField(field.fieldId, checked)}
                className={cn('self-start')}
              />
            )}

            {field.cardinality === 1 && field.widget === 'select' && (
              <Select
                id={controlId}
                aria-describedby={helpId}
                aria-required={field.required || undefined}
                data-testid={`input-${field.fieldId}`}
                value={typeof v === 'string' ? v : ''}
                onChange={(e) => setField(field.fieldId, e.target.value)}
                options={[
                  { value: '', label: '— select —' },
                  ...(field.options ?? []).map((opt) => ({ value: opt, label: opt })),
                ]}
              />
            )}

            {field.cardinality === 1 && field.widget === 'reference_picker' && (() => {
              const opts = field.referenceTypeId ? (referenceOptions[field.referenceTypeId] ?? []) : [];
              const loadError = field.referenceTypeId ? referenceOptionsErrors[field.referenceTypeId] : undefined;
              const loading = field.referenceTypeId ? referenceOptionsLoading[field.referenceTypeId] === true : false;
              // "Nothing to reference" is a claim about the data, so it may
              // only be made once the lookup has actually answered — an
              // in-flight lookup is empty too, and saying so told the user to
              // go and create a document that already existed.
              const empty = opts.length === 0;
              // The "lookup failed" / "still loading" / "nothing to reference"
              // note explains why the picker is disabled. It sat next to the
              // control with no aria-describedby, so the only cue a
              // screen-reader user got was a combo box that refused to open.
              const noteId = loadError || empty ? `${controlId}-note` : undefined;
              return (
                <>
                  <Select
                    id={controlId}
                    aria-describedby={[helpId, noteId].filter(Boolean).join(' ') || undefined}
                    aria-required={field.required || undefined}
                    data-testid={`input-${field.fieldId}`}
                    value={typeof v === 'string' ? v : ''}
                    onChange={(e) => setField(field.fieldId, e.target.value)}
                    disabled={empty}
                    options={[
                      { value: '', label: '— select —' },
                      ...opts.map((opt) => ({ value: opt.value, label: opt.label })),
                    ]}
                  />
                  {loadError ? (
                    <span id={noteId} role="alert" data-testid={`reference-error-${field.fieldId}`} className={cn('text-[11px] text-danger-fg')}>
                      {loadError}
                    </span>
                  ) : loading && empty ? (
                    <span id={noteId} data-testid={`reference-loading-${field.fieldId}`} className={cn('text-[11px] text-text-tertiary')}>
                      Loading referenceable documents…
                    </span>
                  ) : empty && (
                    <span id={noteId} data-testid={`reference-empty-${field.fieldId}`} className={cn('text-[11px] text-text-tertiary')}>
                      No referenceable documents yet for this type.
                    </span>
                  )}
                </>
              );
            })()}

            {field.cardinality === 'unlimited' && (
              <div
                role="group"
                aria-labelledby={labelId}
                aria-describedby={helpId}
                className={cn('flex flex-col gap-1.5')}
              >
                {(Array.isArray(v) ? v : ['']).map((entry, idx) => (
                  <div key={idx} className={cn('flex gap-1.5 items-center')}>
                    <Input
                      // Positional name: inside the group the field name is
                      // already announced, so each box only has to say which
                      // entry it is. Built from `field.name`, not a copy of it,
                      // so renaming the field renames these too.
                      aria-label={`${field.name} ${idx + 1}`}
                      data-testid={`input-${field.fieldId}-${idx}`}
                      type={field.widget === 'number_input' ? 'number' : field.widget === 'date_picker' ? 'date' : 'text'}
                      value={entry}
                      onChange={(e) => setArrayAt(field.fieldId, idx, e.target.value)}
                      className={cn('flex-1')}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label={`Remove ${field.name} ${idx + 1}`}
                      data-testid={`remove-${field.fieldId}-${idx}`}
                      onClick={() => removeArrayEntry(field.fieldId, idx)}
                      className={cn('text-text-tertiary font-normal')}
                    >
                      −
                    </Button>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={`Add another ${field.name}`}
                  data-testid={`add-${field.fieldId}`}
                  onClick={() => addArrayEntry(field.fieldId)}
                  className={cn('self-start border-dashed text-primary font-normal')}
                >
                  + Add another
                </Button>
              </div>
            )}

            {field.helpText && (
              <span id={helpId} className={cn('text-[11px] text-text-tertiary')}>{field.helpText}</span>
            )}
          </div>
        );
      })}

      <Button
        type="submit"
        variant="primary"
        data-testid="submit-typed-document"
        disabled={submitting}
        className={cn('self-start', submitting && 'cursor-wait')}
      >
        {submitting ? 'Saving…' : 'Save'}
      </Button>
    </form>
  );
}
