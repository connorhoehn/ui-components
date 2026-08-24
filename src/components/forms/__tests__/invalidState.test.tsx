// src/components/forms/__tests__/invalidState.test.tsx
//
// `invalid` used to be styling only — a red border and nothing in the
// accessibility tree. A screen-reader user filling in a rejected field heard
// the label and the value, but never that the field was in an error state.

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from '../Input';
import { NumberInput } from '../NumberInput';
import { Select } from '../Select';
import { Textarea } from '../Textarea';

describe('forms — invalid is exposed programmatically', () => {
  it('Input sets aria-invalid when invalid', () => {
    render(<Input invalid aria-label="Email" defaultValue="nope" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('Input omits aria-invalid when valid', () => {
    render(<Input aria-label="Email" defaultValue="a@b.c" />);
    expect(screen.getByLabelText('Email')).not.toHaveAttribute('aria-invalid');
  });

  it('Input with prefix/suffix slots still sets aria-invalid on the control', () => {
    render(<Input invalid prefix="$" aria-label="Amount" defaultValue="x" />);
    expect(screen.getByLabelText('Amount')).toHaveAttribute('aria-invalid', 'true');
  });

  it('lets an explicit aria-invalid from the caller win', () => {
    render(<Input invalid aria-invalid={false} aria-label="Email" defaultValue="x" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'false');
  });

  it('Textarea sets aria-invalid when invalid', () => {
    render(<Textarea invalid aria-label="Notes" defaultValue="x" />);
    expect(screen.getByLabelText('Notes')).toHaveAttribute('aria-invalid', 'true');
  });

  it('Select sets aria-invalid when invalid', () => {
    render(
      <Select
        invalid
        aria-label="Mode"
        value="a"
        onChange={() => {}}
        options={[{ value: 'a', label: 'A' }]}
      />,
    );
    expect(screen.getByLabelText('Mode')).toHaveAttribute('aria-invalid', 'true');
  });

  it('NumberInput inherits the fix through Input', () => {
    render(<NumberInput invalid aria-label="Retries" value={3} onChange={() => {}} />);
    expect(screen.getByLabelText('Retries')).toHaveAttribute('aria-invalid', 'true');
  });

  // NumberInput's props were a closed interface: id / name / aria-* were
  // silently dropped, so `<label htmlFor>` pointed at nothing and the control
  // had no accessible name at all.
  it('NumberInput forwards id and aria-* to the rendered input', () => {
    render(
      <>
        <label htmlFor="retries">Retries</label>
        <NumberInput
          id="retries"
          aria-describedby="retries-help"
          aria-required
          value={3}
          onChange={() => {}}
        />
        <span id="retries-help">How many times to retry.</span>
      </>,
    );
    const input = screen.getByLabelText('Retries');
    expect(input).toHaveAttribute('id', 'retries');
    expect(input).toHaveAttribute('aria-describedby', 'retries-help');
    expect(input).toHaveAttribute('aria-required', 'true');
  });
});
