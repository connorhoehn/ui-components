// src/components/identity/shared/FormField.tsx
//
// Universal form field component supporting text, email, password, textarea,
// select, checkbox, and number input types with validation styling.

import { useCallback, useId } from 'react';

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

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '4px',
  fontSize: 'var(--ui-fontSizeSm)',
  fontWeight: 600,
  color: 'var(--ui-textPrimary)',
};

const baseInputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: 'var(--ui-spacingSm)',
  fontSize: 'var(--ui-fontSizeMd)',
  border: '1px solid var(--ui-border)',
  borderRadius: 'var(--ui-radiusSm)',
  backgroundColor: 'var(--ui-surface)',
  color: 'var(--ui-textPrimary)',
  outline: 'none',
  boxSizing: 'border-box',
};

const errorInputStyle: React.CSSProperties = {
  ...baseInputStyle,
  borderColor: 'var(--ui-danger)',
};

const errorTextStyle: React.CSSProperties = {
  marginTop: '4px',
  fontSize: 'var(--ui-fontSizeSm)',
  color: 'var(--ui-danger)',
};

const helpTextStyle: React.CSSProperties = {
  marginTop: '4px',
  fontSize: 'var(--ui-fontSizeSm)',
  color: 'var(--ui-textMuted)',
};

const wrapperStyle: React.CSSProperties = {
  marginBottom: 'var(--ui-spacingMd)',
};

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

  const inputStyles = error ? errorInputStyle : baseInputStyle;

  const renderInput = () => {
    if (type === 'checkbox') {
      return (
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            id={id}
            type="checkbox"
            name={name}
            checked={Boolean(value)}
            onChange={handleChange}
            disabled={disabled}
          />
          <span style={{ fontSize: 'var(--ui-fontSizeMd)', color: 'var(--ui-textPrimary)' }}>
            {label}{required && <span style={{ color: 'var(--ui-danger)' }}> *</span>}
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
          style={{ ...inputStyles, resize: 'vertical', minHeight: '100px' }}
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
          style={inputStyles}
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
        style={inputStyles}
      />
    );
  };

  if (type === 'checkbox') {
    return (
      <div style={wrapperStyle}>
        {renderInput()}
        {error && <p style={errorTextStyle}>{error}</p>}
        {helpText && !error && <p style={helpTextStyle}>{helpText}</p>}
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <label htmlFor={id} style={labelStyle}>
        {label}{required && <span style={{ color: 'var(--ui-danger)' }}> *</span>}
      </label>
      {renderInput()}
      {error && <p style={errorTextStyle}>{error}</p>}
      {helpText && !error && <p style={helpTextStyle}>{helpText}</p>}
    </div>
  );
}
