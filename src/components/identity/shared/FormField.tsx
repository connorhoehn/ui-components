// src/components/identity/shared/FormField.tsx
//
// Universal form field component supporting text, email, password, textarea,
// select, checkbox, and number input types with validation styling.
//
// The controls themselves are the shared forms primitives (Input, Textarea,
// Select, Checkbox) — this component only adds the label / error / help-text
// arrangement and the value-coercing onChange that identity forms rely on.

import { useCallback, useId } from 'react';
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
  const id = useId();

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

  const renderInput = () => {
    if (type === 'checkbox') {
      return (
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            id={id}
            name={name}
            checked={Boolean(value)}
            onChange={onChange}
            disabled={disabled}
          />
          <span className="text-sm text-text-primary">
            {label}{required && <span className="text-danger-fg"> *</span>}
          </span>
        </label>
      );
    }

    if (type === 'textarea') {
      return (
        <Textarea
          id={id}
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
      // The empty option stays selectable (unlike Select's built-in disabled
      // placeholder) — identity forms let users return to the unset state.
      return (
        <Select
          id={id}
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
        id={id}
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
  };

  if (type === 'checkbox') {
    return (
      <div className="mb-4">
        {renderInput()}
        {error && <p className="mt-1 text-sm text-danger-fg">{error}</p>}
        {helpText && !error && <p className="mt-1 text-sm text-text-tertiary">{helpText}</p>}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1 text-sm font-semibold text-text-primary">
        {label}{required && <span className="text-danger-fg"> *</span>}
      </label>
      {renderInput()}
      {error && <p className="mt-1 text-sm text-danger-fg">{error}</p>}
      {helpText && !error && <p className="mt-1 text-sm text-text-tertiary">{helpText}</p>}
    </div>
  );
}
