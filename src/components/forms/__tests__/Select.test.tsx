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

// variant="pill" — the compact tone-coloured capsule that status/priority
// pickers kept hand-rolling as a bare <select> + a background-image arrow.
describe('Select variant="pill"', () => {
  it('leaves the default variant alone', () => {
    render(<Select aria-label="Pick" options={OPTS} value="a" onChange={() => {}} />);
    const el = screen.getByLabelText('Pick');
    expect(el.className).toContain('w-full');
    expect(el.className).toContain('rounded-md');
    expect(el.className).not.toContain('rounded-full');
    // No wrapper: the default render is still the bare element.
    expect(el.parentElement?.tagName).not.toBe('SPAN');
  });

  it('is a real <select>, so keyboard and form semantics survive', () => {
    const onChange = vi.fn();
    render(<Select variant="pill" aria-label="Priority" options={OPTS} value="a" onChange={onChange} />);
    const el = screen.getByLabelText('Priority') as HTMLSelectElement;
    expect(el.tagName).toBe('SELECT');
    expect(el.options).toHaveLength(2);
    fireEvent.change(el, { target: { value: 'b' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('paints the capsule in the requested tone', () => {
    render(<Select variant="pill" tone="danger" aria-label="P" options={OPTS} value="a" onChange={() => {}} />);
    const el = screen.getByLabelText('P');
    expect(el.className).toContain('rounded-full');
    expect(el.className).toContain('bg-danger-bg');
    expect(el.className).toContain('text-danger-fg');
    expect(el.className).toContain('border-danger-border');
  });

  it('defaults to the neutral tone', () => {
    render(<Select variant="pill" aria-label="P" options={OPTS} value="a" onChange={() => {}} />);
    expect(screen.getByLabelText('P').className).toContain('bg-neutral-bg');
  });

  it('sizes sm smaller than md', () => {
    const { rerender } = render(
      <Select variant="pill" size="sm" aria-label="P" options={OPTS} value="a" onChange={() => {}} />,
    );
    expect(screen.getByLabelText('P').className).toContain('h-6');
    expect(screen.getByLabelText('P').className).toContain('text-xs');
    rerender(<Select variant="pill" size="md" aria-label="P" options={OPTS} value="a" onChange={() => {}} />);
    expect(screen.getByLabelText('P').className).toContain('h-7');
  });

  it('draws its own chevron, hidden from assistive tech', () => {
    const { container } = render(
      <Select variant="pill" aria-label="P" options={OPTS} value="a" onChange={() => {}} />,
    );
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    // appearance-none is what removes the native arrow this replaces.
    expect(screen.getByLabelText('P').className).toContain('appearance-none');
  });

  it('keeps data-testid on the select, not the wrapper', () => {
    render(
      <Select variant="pill" data-testid="prio" aria-label="P" options={OPTS} value="a" onChange={() => {}} />,
    );
    expect(screen.getByTestId('prio').tagName).toBe('SELECT');
  });
});
