import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from '../Textarea';

describe('Textarea', () => {
  it('forwards typed text', () => {
    const onChange = vi.fn();
    render(<Textarea aria-label="Notes" value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Notes'), { target: { value: 'hi' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('honors rows', () => {
    render(<Textarea aria-label="Notes" rows={7} onChange={() => {}} />);
    expect(screen.getByLabelText('Notes')).toHaveAttribute('rows', '7');
  });

  it('invalid applies the danger border', () => {
    render(<Textarea aria-label="Notes" invalid onChange={() => {}} />);
    expect(screen.getByLabelText('Notes').className).toContain('border-danger');
  });

  it('disabled blocks input', () => {
    render(<Textarea aria-label="Notes" disabled onChange={() => {}} />);
    expect(screen.getByLabelText('Notes')).toBeDisabled();
  });
});
