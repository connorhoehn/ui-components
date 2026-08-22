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

import { useCallback } from 'react';
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
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      if (type === 'number') {
        onChange(Number(e.target.value));
      } else {
        onChange(e.target.value);
      }
    },
    [onChange, type],
  );

  if (type === 'checkbox') {
    return (
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            name={name}
            checked={Boolean(value)}
            onChange={onChange}
            disabled={disabled}
          />
          <span className="text-sm text-text-primary">
            {label}{required && <span className="text-danger-fg"> *</span>}
          </span>
        </label>
        {error && <p className="mt-1 text-sm text-danger-fg">{error}</p>}
        {helpText && !error && <p className="mt-1 text-sm text-text-tertiary">{helpText}</p>}
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
