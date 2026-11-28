import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup } from '../RadioGroup';
import FormField from '../../shared/FormField';

const OPTS = [
  { value: 'session', label: 'Session' },
  { value: 'long-term', label: 'Long-term' },
];

describe('RadioGroup', () => {
  it('checks the current value and reports selections', () => {
    const onChange = vi.fn();
    render(<RadioGroup name="scope" value="session" onChange={onChange} options={OPTS} />);
    expect(screen.getByRole('radio', { name: /Session/ })).toBeChecked();
    fireEvent.click(screen.getByRole('radio', { name: /Long-term/ }));
    expect(onChange).toHaveBeenCalledWith('long-term');
  });

  it('shares one radio-group name across options', () => {
    render(<RadioGroup name="scope" value="session" onChange={() => {}} options={OPTS} />);
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(new Set(radios.map((r) => r.name)).size).toBe(1);
  });

  it('disabled disables every radio', () => {
    render(<RadioGroup name="scope" value="session" onChange={() => {}} options={OPTS} disabled />);
    screen.getAllByRole('radio').forEach((r) => expect(r).toBeDisabled());
  });
});

describe('RadioGroup names (2.549.0)', () => {
  const options = [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }];

  it('takes aria-label', () => {
    render(<RadioGroup name="q1" value="yes" onChange={() => {}} options={options} aria-label="May we record the call?" />);
    expect(screen.getByRole('radiogroup', { name: 'May we record the call?' })).toBeInTheDocument();
  });

  it('takes aria-labelledby, naming the group by the question above it', () => {
    render(
      <>
        <p id="q2-text">Can we keep the recording?</p>
        <RadioGroup name="q2" value="no" onChange={() => {}} options={options} aria-labelledby="q2-text" />
      </>,
    );
    expect(screen.getByRole('radiogroup', { name: 'Can we keep the recording?' })).toBeInTheDocument();
  });

  it('inside a FormField, the field label names it, and the wiring spreads like any input', () => {
    render(
      <FormField label="Share the transcript?" hint="You can change this later" required>
        {(wiring) => <RadioGroup {...wiring} name="q3" value="yes" onChange={() => {}} options={options} />}
      </FormField>,
    );
    const group = screen.getByRole('radiogroup', { name: /Share the transcript\?/ });
    expect(group).toHaveAccessibleDescription('You can change this later');
    expect(group).toHaveAttribute('aria-required', 'true');
    // An explicit name wins over the field's label.
    render(
      <FormField label="Field label">
        {() => <RadioGroup name="q4" value="yes" onChange={() => {}} options={options} aria-label="Own name" />}
      </FormField>,
    );
    expect(screen.getByRole('radiogroup', { name: 'Own name' })).not.toHaveAttribute('aria-labelledby');
  });

  it('outside a FormField, with no name given, it renders as before (no aria-labelledby)', () => {
    render(<RadioGroup name="q5" value="yes" onChange={() => {}} options={options} />);
    expect(screen.getByRole('radiogroup')).not.toHaveAttribute('aria-labelledby');
    expect(screen.getByRole('radiogroup')).not.toHaveAttribute('aria-label');
  });
});
