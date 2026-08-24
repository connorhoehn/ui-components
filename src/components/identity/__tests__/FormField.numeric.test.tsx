// REGRESSION — a cleared numeric field reported 0, not "unset".
//
// `Number('')` is 0, not NaN, and the handler had no empty branch. Backspacing
// the 8 out of Identity Admin → Pool → Password Policy → Minimum Length emitted
// `onChange(0)` on that keystroke, so saving mid-edit persisted
// `minLength: 0` — every password length accepted, from a keystroke the admin
// was about to undo. The forms/ sibling `NumberInput` had always handled this.

import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormField } from '../shared/FormField';

function renderNumberField(onChange = vi.fn(), value: number | string = 8) {
  render(
    <FormField
      label="Minimum Length"
      name="minLength"
      type="number"
      value={value}
      onChange={onChange}
    />,
  );
  return { onChange, input: screen.getByLabelText(/Minimum Length/) };
}

describe('identity FormField, type="number"', () => {
  it('does not report 0 when the field is cleared', () => {
    const { onChange, input } = renderNumberField();
    fireEvent.change(input, { target: { value: '' } });
    expect(onChange).not.toHaveBeenCalled();
    // Specifically: never the silent zero.
    expect(onChange).not.toHaveBeenCalledWith(0);
  });

  it('does not report 0 for a whitespace-only value', () => {
    const { onChange, input } = renderNumberField();
    fireEvent.change(input, { target: { value: '   ' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('reports a real number normally', () => {
    const { onChange, input } = renderNumberField();
    fireEvent.change(input, { target: { value: '12' } });
    expect(onChange).toHaveBeenCalledWith(12);
  });

  it('reports a genuine zero the user actually typed', () => {
    const { onChange, input } = renderNumberField();
    fireEvent.change(input, { target: { value: '0' } });
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('drops an unparseable value rather than emitting NaN', () => {
    const { onChange, input } = renderNumberField();
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('leaves text fields free to report an empty string', () => {
    const onChange = vi.fn();
    render(
      <FormField label="Pool Name" name="poolName" value="x" onChange={onChange} />,
    );
    fireEvent.change(screen.getByLabelText(/Pool Name/), { target: { value: '' } });
    expect(onChange).toHaveBeenCalledWith('');
  });
});
