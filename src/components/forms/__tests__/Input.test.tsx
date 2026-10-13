import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '../Input';

describe('Input', () => {
  it('forwards typed text via the standard event onChange', () => {
    const onChange = vi.fn();
    render(<Input value="" onChange={onChange} aria-label="Name" />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'abc' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('supports the widened type union including date kinds', () => {
    const { rerender } = render(<Input type="datetime-local" aria-label="From" onChange={() => {}} />);
    expect((screen.getByLabelText('From') as HTMLInputElement).type).toBe('datetime-local');
    rerender(<Input type="date" aria-label="From" onChange={() => {}} />);
    expect((screen.getByLabelText('From') as HTMLInputElement).type).toBe('date');
  });

  it('invalid applies the danger border class', () => {
    render(<Input invalid aria-label="Bad" onChange={() => {}} />);
    expect(screen.getByLabelText('Bad').className).toContain('border-danger');
  });

  it('mono renders a monospace value', () => {
    render(<Input mono aria-label="Cron" onChange={() => {}} />);
    expect(screen.getByLabelText('Cron').className).toContain('font-mono');
    expect(screen.getByLabelText('Cron')).toHaveAttribute('data-ui-text', 'code');
  });

  it('renders prefix and suffix slots', () => {
    render(
      <Input aria-label="Amt" onChange={() => {}} prefix={<span>$</span>} suffix={<span>USD</span>} />,
    );
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
  });

  it('disabled blocks input', () => {
    render(<Input disabled aria-label="D" onChange={() => {}} />);
    expect(screen.getByLabelText('D')).toBeDisabled();
  });
  it('an ordinary input carries no code marker, with or without a prefix', () => {
    render(<><Input aria-label="Name" onChange={() => {}} /><Input aria-label="Price" prefix="$" onChange={() => {}} /><Input aria-label="Path" prefix="/" mono onChange={() => {}} /></>);
    expect(screen.getByLabelText('Name')).not.toHaveAttribute('data-ui-text');
    expect(screen.getByLabelText('Price')).not.toHaveAttribute('data-ui-text');
    expect(screen.getByLabelText('Path')).toHaveAttribute('data-ui-text', 'code');
  });
});
