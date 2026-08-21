import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select } from '../Select';

const OPTS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
];

describe('Select', () => {
  it('renders options and forwards changes', () => {
    const onChange = vi.fn();
    render(<Select aria-label="Pick" options={OPTS} value="a" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Pick'), { target: { value: 'b' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('the placeholder renders as a disabled empty option', () => {
    render(<Select aria-label="Pick" options={OPTS} placeholder="Choose…" value="" onChange={() => {}} />);
    const placeholder = screen.getByRole('option', { name: 'Choose…' }) as HTMLOptionElement;
    expect(placeholder.disabled).toBe(true);
    expect(placeholder.value).toBe('');
  });

  it('renders labelled optgroups after the flat options', () => {
    render(
      <Select
        aria-label="Pick"
        options={[{ value: '', label: '— any —' }]}
        groups={[
          { label: 'Available', options: [{ value: 'x', label: 'X' }] },
          { label: 'Soon', options: [{ value: 'y', label: 'Y', disabled: true }] },
        ]}
        value=""
        onChange={() => {}}
      />,
    );
    expect(screen.getByRole('group', { name: 'Available' })).toBeInTheDocument();
    expect((screen.getByRole('option', { name: 'Y' }) as HTMLOptionElement).disabled).toBe(true);
  });

  it('per-option disabled is honored', () => {
    render(
      <Select
        aria-label="Pick"
        options={[{ value: 'a', label: 'A', disabled: true }]}
        value=""
        onChange={() => {}}
      />,
    );
    expect((screen.getByRole('option', { name: 'A' }) as HTMLOptionElement).disabled).toBe(true);
  });

  it('invalid applies the danger border', () => {
    render(<Select aria-label="Pick" options={OPTS} invalid value="a" onChange={() => {}} />);
    expect(screen.getByLabelText('Pick').className).toContain('border-danger');
  });
});
