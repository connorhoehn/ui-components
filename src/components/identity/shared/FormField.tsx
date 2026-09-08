// src/components/identity/shared/FormField.tsx
//
// Identity's value-coercing form field. The public API is unchanged
// (label/name/type/value/onChange(value)/error/...), but since v2.72.0 the
// label / hint / error presentation AND the a11y wiring delegate to
// shared/FormField — the audit found two label/error idioms drifting, and
// identity's lacked aria-describedby / aria-invalid entirely. The controls
// themselves are the forms/ primitives (since v2.61.0).
//
// The checkbox branch keeps its own markup: a checkbox's label wraps the
// control (implicit association), so the outer-label shape of
// shared/FormField does not apply.

import { useCallback, useId } from 'react';
import SharedFormField from '../../shared/FormField';
import { Input } from '../../forms/Input';
import { Textarea } from '../../forms/Textarea';
import { Select } from '../../forms/Select';
import { Checkbox } from '../../forms/Checkbox';

export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'number';
  value: string | boolean | number;
  onChange: (value: string | boolean | number) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  helpText?: string;
  disabled?: boolean;
}

export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required,
  placeholder,
  options,
  helpText,
  disabled,
}: FormFieldProps) {
  const uid = useId();
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      if (type === 'number') {
        // `Number('')` is 0, not NaN. With no empty branch, backspacing the 8
        // out of Pool → Password Policy → Minimum Length emitted `0`, and
        // saving in that state persisted `minLength: 0` — every password
        // length accepted, from a keystroke the admin was about to undo.
        // An empty or half-typed field ("1e", "-") means "unset", which this
        // numeric API cannot express, so hold the last good value instead of
        // inventing a zero. The input is uncontrolled for that keystroke, so
        // the box still shows empty while the user retypes.
        const raw = e.target.value;
        if (raw.trim() === '') return;
        const parsed = Number(raw);
        if (Number.isNaN(parsed)) return;
        onChange(parsed);
      } else {
        onChange(e.target.value);
      }
    },
    [onChange, type],
  );

  if (type === 'checkbox') {
    // The error and help text sat outside the <label> with nothing pointing at
    // them: the checkbox was named (the label wraps it) but a rejected value
    // was announced nowhere — the message was visible text and nothing more.
    // The error also needs role="alert" to be spoken when it appears, matching
    // what shared/FormField's non-checkbox branch gets via ConfigField's idiom.
    const describedById = error || helpText ? `${uid}-desc` : undefined;
    return (
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            name={name}
            checked={Boolean(value)}
            // Adapted, not forwarded. Checkbox reports
            // `(checked, modifiers)` so a range-select can read the click's
            // shift key; FormField's own contract is `onChange(value)` and a
            // silently widened callback would hand every consumer of this
            // component an argument its type never promised.
            onChange={(checked) => onChange(checked)}
            disabled={disabled}
            aria-describedby={describedById}
          />
          <span className="text-sm text-text-primary">
            {label}{required && <span aria-hidden="true" className="text-danger-fg"> *</span>}
          </span>
        </label>
        {error && <p id={describedById} role="alert" className="mt-1 text-sm text-danger-fg">{error}</p>}
        {helpText && !error && <p id={describedById} className="mt-1 text-sm text-text-tertiary">{helpText}</p>}
      </div>
    );
  }

  return (
    <SharedFormField
      label={label}
      required={required}
      error={error}
      hint={helpText}
      className="mb-4"
    >
      {({ labelId: _labelId, ...wiring }) => {
        if (type === 'textarea') {
          return (
            <Textarea
              {...wiring}
              name={name}
              value={String(value)}
              onChange={handleChange}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              rows={5}
              invalid={Boolean(error)}
              className="resize-y min-h-[100px]"
            />
          );
        }
        if (type === 'select') {
          // The empty option stays selectable (unlike Select's built-in
          // disabled placeholder) — identity forms let users return to the
          // unset state.
          return (
            <Select
              {...wiring}
              name={name}
              value={String(value)}
              onChange={handleChange}
              disabled={disabled}
              required={required}
              invalid={Boolean(error)}
              options={[
                { value: '', label: placeholder || 'Select...' },
                ...(options ?? []),
              ]}
            />
          );
        }
        return (
          <Input
            {...wiring}
            type={type}
            name={name}
            value={String(value)}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            invalid={Boolean(error)}
          />
        );
      }}
    </SharedFormField>
  );
}
