import { useState } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RatingInput } from '../RatingInput';

afterEach(cleanup);

const OPTS = [
  { value: 1, label: 'Does not meet' },
  { value: 2, label: 'Partly meets' },
  { value: 3, label: 'Meets' },
  { value: 4, label: 'Exceeds' },
];

function Controlled({ initial = null, onChange = () => {}, ...rest }: { initial?: number | null; onChange?: (v: number | null) => void } & Partial<React.ComponentProps<typeof RatingInput>>) {
  const [v, setV] = useState<number | null>(initial);
  return <RatingInput label="Communication" value={v} onChange={(n) => { setV(n); onChange(n); }} options={OPTS} {...rest} />;
}

describe('RatingInput', () => {
  it('is a labelled radio group with not rated chosen by default', () => {
    render(<Controlled />);
    expect(screen.getByRole('radiogroup', { name: 'Communication' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);
    expect(screen.getByRole('radio', { name: 'Not rated' })).toHaveAttribute('aria-checked', 'true');
  });

  it('chooses, changes and clears', () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    fireEvent.click(screen.getByRole('radio', { name: /Meets/ }));
    expect(onChange).toHaveBeenLastCalledWith(3);
    fireEvent.click(screen.getByRole('radio', { name: /Exceeds/ }));
    expect(onChange).toHaveBeenLastCalledWith(4);
    expect(screen.getByRole('radio', { name: /Exceeds/ })).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(screen.getByRole('radio', { name: 'Not rated' }));
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it('moves with the arrow keys and keeps one tab stop', () => {
    const onChange = vi.fn();
    render(<Controlled initial={2} onChange={onChange} />);
    const two = screen.getByRole('radio', { name: /Partly meets/ });
    expect(two).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('radio', { name: /Meets/ })).toHaveAttribute('tabindex', '-1');
    fireEvent.keyDown(two, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenLastCalledWith(3);
    fireEvent.keyDown(screen.getByRole('radio', { name: /Meets/ }), { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenLastCalledWith(2);
    fireEvent.keyDown(screen.getByRole('radio', { name: /Partly meets/ }), { key: 'Home' });
    expect(onChange).toHaveBeenLastCalledWith(null);
    fireEvent.keyDown(screen.getByRole('radio', { name: 'Not rated' }), { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenLastCalledWith(4);
  });

  it('read-only shows the chosen label and no choices', () => {
    const { rerender } = render(<RatingInput label="Communication" value={3} onChange={() => {}} options={OPTS} readOnly />);
    expect(screen.getByText('Meets')).toBeInTheDocument();
    expect(screen.queryByRole('radio')).toBeNull();
    rerender(<RatingInput label="Communication" value={null} onChange={() => {}} options={OPTS} readOnly />);
    expect(screen.getByText('Not rated')).toBeInTheDocument();
  });

  it('disabled blocks choosing; hint and error describe the group', () => {
    const onChange = vi.fn();
    render(<RatingInput label="Communication" value={null} onChange={onChange} options={OPTS} disabled error="Rate this" />);
    fireEvent.click(screen.getByRole('radio', { name: /Meets/ }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('radiogroup')).toHaveAccessibleDescription('Rate this');
  });
});
