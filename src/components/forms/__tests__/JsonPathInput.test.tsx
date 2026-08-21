import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { JsonPathInput } from '../JsonPathInput';

describe('JsonPathInput', () => {
  it('forwards typed values', () => {
    const onChange = vi.fn();
    render(<JsonPathInput value="" onChange={onChange} data-testid="jp" />);
    fireEvent.change(screen.getByTestId('jp'), { target: { value: '$.items' } });
    expect(onChange).toHaveBeenCalledWith('$.items');
  });

  it('sample pills paste their value on click', () => {
    const onChange = vi.fn();
    render(
      <JsonPathInput
        value=""
        onChange={onChange}
        samples={[{ label: '$.trigger.imageRef', value: '$.trigger.imageRef' }]}
      />,
    );
    fireEvent.click(screen.getByText('$.trigger.imageRef'));
    expect(onChange).toHaveBeenCalledWith('$.trigger.imageRef');
  });

  it('shows the error message when invalid', () => {
    render(
      <JsonPathInput value="items" onChange={() => {}} invalid errorMessage="Must start with $." />,
    );
    expect(screen.getByText('Must start with $.')).toBeInTheDocument();
  });

  it('enforcePrefix surfaces a display-only error on blur for non-$. values', () => {
    render(<JsonPathInput value="items" onChange={() => {}} enforcePrefix data-testid="jp" />);
    fireEvent.blur(screen.getByTestId('jp'));
    expect(screen.getByText(/\$\./)).toBeInTheDocument();
  });
});
