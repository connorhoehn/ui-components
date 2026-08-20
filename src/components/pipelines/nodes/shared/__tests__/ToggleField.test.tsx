import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleField from '../ToggleField';

describe('ToggleField', () => {
  it('reports the new state when toggled', () => {
    const onChange = vi.fn();
    render(<ToggleField label="Streaming" checked={false} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Streaming'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('reflects the checked state', () => {
    render(<ToggleField label="Streaming" checked onChange={vi.fn()} />);
    expect(screen.getByLabelText('Streaming')).toBeChecked();
  });

  it('renders help text beneath', () => {
    render(
      <ToggleField
        label="Idempotent"
        checked={false}
        onChange={vi.fn()}
        help="This action is safe to retry."
      />,
    );
    expect(screen.getByText('This action is safe to retry.')).toBeInTheDocument();
  });

  it('does not fire when disabled', () => {
    const onChange = vi.fn();
    render(<ToggleField label="X" checked={false} onChange={onChange} disabled />);
    fireEvent.click(screen.getByLabelText('X'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
