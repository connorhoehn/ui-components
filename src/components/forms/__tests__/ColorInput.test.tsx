import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ColorInput } from '../ColorInput';

describe('ColorInput', () => {
  it('renders a native color input with the given value', () => {
    render(<ColorInput value="#ff0000" onChange={() => {}} aria-label="Color" />);
    const input = screen.getByLabelText('Color') as HTMLInputElement;
    expect(input.type).toBe('color');
    expect(input.value).toBe('#ff0000');
  });

  it('reports the picked color as a string', () => {
    const onChange = vi.fn();
    render(<ColorInput value="#ff0000" onChange={onChange} aria-label="Color" />);
    fireEvent.change(screen.getByLabelText('Color'), { target: { value: '#00ff00' } });
    expect(onChange).toHaveBeenCalledWith('#00ff00');
  });

  it('respects disabled', () => {
    render(<ColorInput value="#ff0000" onChange={() => {}} disabled aria-label="Color" />);
    expect(screen.getByLabelText('Color')).toBeDisabled();
  });
});
