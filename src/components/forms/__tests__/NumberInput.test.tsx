import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NumberInput } from '../NumberInput';

const field = () => screen.getByRole('spinbutton') as HTMLInputElement;

describe('NumberInput', () => {
  it('reports parsed numbers, not strings', () => {
    const onChange = vi.fn();
    render(<NumberInput value={1} onChange={onChange} />);
    fireEvent.change(field(), { target: { value: '42' } });
    expect(onChange).toHaveBeenCalledWith(42);
  });

  it('renders an empty field for an unset value', () => {
    // `undefined` has to be distinguishable from 0 — 0 is a real value for a
    // seed, a threshold or an offset.
    render(<NumberInput value={undefined} onChange={vi.fn()} />);
    expect(field().value).toBe('');
  });

  it('renders 0 as 0, not as empty', () => {
    render(<NumberInput value={0} onChange={vi.fn()} />);
    expect(field().value).toBe('0');
  });

  it('ignores input it cannot parse rather than reporting NaN', () => {
    // A half-typed "-" or "e" must not push NaN into the node definition.
    const onChange = vi.fn();
    render(<NumberInput value={1} onChange={onChange} />);
    fireEvent.change(field(), { target: { value: '-' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  describe('clearing', () => {
    it('cannot be cleared without onClear, so the value stays put', () => {
      // Documents the default: with no onClear, an emptied field is
      // unparseable and the previous value is retained.
      const onChange = vi.fn();
      render(<NumberInput value={5} onChange={onChange} />);
      fireEvent.change(field(), { target: { value: '' } });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('calls onClear when the field is emptied', () => {
      // Before this existed, an optional numeric setting could be typed into
      // but never unset again — deleting the text silently did nothing.
      const onClear = vi.fn();
      const onChange = vi.fn();
      render(<NumberInput value={5} onChange={onChange} onClear={onClear} />);
      fireEvent.change(field(), { target: { value: '' } });
      expect(onClear).toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not treat 0 as a clear', () => {
      const onClear = vi.fn();
      const onChange = vi.fn();
      render(<NumberInput value={5} onChange={onChange} onClear={onClear} />);
      fireEvent.change(field(), { target: { value: '0' } });
      expect(onClear).not.toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith(0);
    });
  });

  describe('clamping on blur', () => {
    it('pulls a value above max back to max', () => {
      const onChange = vi.fn();
      render(<NumberInput value={200} onChange={onChange} min={0} max={100} />);
      fireEvent.blur(field(), { target: { value: '200' } });
      expect(onChange).toHaveBeenCalledWith(100);
    });

    it('pushes a value below min up to min', () => {
      const onChange = vi.fn();
      render(<NumberInput value={-5} onChange={onChange} min={0} max={100} />);
      fireEvent.blur(field(), { target: { value: '-5' } });
      expect(onChange).toHaveBeenCalledWith(0);
    });

    it('leaves an in-range value alone', () => {
      const onChange = vi.fn();
      render(<NumberInput value={50} onChange={onChange} min={0} max={100} />);
      fireEvent.blur(field(), { target: { value: '50' } });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not clamp an empty field to min', () => {
      // Blurring a deliberately-cleared optional field must not resurrect it
      // as `min`.
      const onChange = vi.fn();
      render(<NumberInput value={undefined} onChange={onChange} min={1} max={10} />);
      fireEvent.blur(field(), { target: { value: '' } });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  it('renders a unit suffix', () => {
    render(<NumberInput value={5} onChange={vi.fn()} unit="px" />);
    expect(screen.getByText('px')).toBeInTheDocument();
  });

  it('passes min, max and step through to the control', () => {
    render(<NumberInput value={5} onChange={vi.fn()} min={1} max={9} step={0.5} />);
    expect(field()).toHaveAttribute('min', '1');
    expect(field()).toHaveAttribute('max', '9');
    expect(field()).toHaveAttribute('step', '0.5');
  });
});
