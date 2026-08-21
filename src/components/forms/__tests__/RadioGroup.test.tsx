import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup } from '../RadioGroup';

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
