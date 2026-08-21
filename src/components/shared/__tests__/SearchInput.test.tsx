import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchInput } from '../SearchInput';

describe('SearchInput', () => {
  it('is controlled: forwards typed text to onChange', () => {
    const onChange = vi.fn();
    render(<SearchInput value="" onChange={onChange} aria-label="Search" />);
    fireEvent.change(screen.getByLabelText('Search'), { target: { value: 'pipeline' } });
    expect(onChange).toHaveBeenCalledWith('pipeline');
  });

  it('shows the clear button only when there is a value', () => {
    const { rerender } = render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.queryByRole('button', { name: 'Clear search' })).toBeNull();
    rerender(<SearchInput value="x" onChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
  });

  it('clearing empties the value and fires onClear', () => {
    const onChange = vi.fn();
    const onClear = vi.fn();
    render(<SearchInput value="x" onChange={onChange} onClear={onClear} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(onChange).toHaveBeenCalledWith('');
    expect(onClear).toHaveBeenCalled();
  });

  it('defaults the placeholder to "Search…"', () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
  });
});
