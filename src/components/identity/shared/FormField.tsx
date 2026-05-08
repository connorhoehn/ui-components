// src/components/identity/shared/FormField.tsx
//
// Universal form field component supporting text, email, password, textarea,
// select, checkbox, and number input types with validation styling.

import { useCallback, useId } from 'react';
import { cn } from '../../../lib/cn';

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

const inputClasses = 'block w-full px-3 py-2 text-sm border border-[#e2e8f0] rounded-md bg-white text-slate-800 outline-none box-border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500';
const inputErrorClasses = 'block w-full px-3 py-2 text-sm border border-red-500 rounded-md bg-white text-slate-800 outline-none box-border focus:ring-2 focus:ring-red-500/20 focus:border-red-500';

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
      if (type === 'checkbox') {
        onChange((e.target as HTMLInputElement).checked);
      } else if (type === 'number') {
        onChange(Number(e.target.value));
      } else {
        onChange(e.target.value);
      }
    },
    [onChange, type],
  );

  const classes = error ? inputErrorClasses : inputClasses;

  const renderInput = () => {
    if (type === 'checkbox') {
      return (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            id={id}
            type="checkbox"
            name={name}
            checked={Boolean(value)}
            onChange={handleChange}
            disabled={disabled}
          />
          <span className="text-sm text-slate-800">
            {label}{required && <span className="text-red-600"> *</span>}
          </span>
        </label>
      );
    }

    if (type === 'textarea') {
      return (
        <textarea
          id={id}
          name={name}
          value={String(value)}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={5}
          className={cn(classes, 'resize-y min-h-[100px]')}
        />
      );
    }

    if (type === 'select') {
      return (
        <select
          id={id}
          name={name}
          value={String(value)}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className={classes}
        >
          <option value="">{placeholder || 'Select...'}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        id={id}
        type={type}
        name={name}
        value={String(value)}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={classes}
      />
    );
  };

  if (type === 'checkbox') {
    return (
      <div className="mb-4">
        {renderInput()}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helpText && !error && <p className="mt-1 text-sm text-slate-400">{helpText}</p>}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1 text-sm font-semibold text-slate-800">
        {label}{required && <span className="text-red-600"> *</span>}
      </label>
      {renderInput()}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helpText && !error && <p className="mt-1 text-sm text-slate-400">{helpText}</p>}
    </div>
  );
}
