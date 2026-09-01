import { render, screen } from '@testing-library/react';
import { FormRow } from '../FormRow';

describe('FormRow', () => {
  it('renders each field in an equal-share cell', () => {
    render(
      <FormRow data-testid="row">
        <label>Starts</label>
        <label>Ends</label>
      </FormRow>,
    );
    const cells = Array.from(screen.getByTestId('row').children);
    expect(cells).toHaveLength(2);
    for (const cell of cells) {
      // basis-0 is the load-bearing half: without it a long label widens its
      // own column and the row goes lopsided.
      expect(cell.className).toContain('flex-1');
      expect(cell.className).toContain('basis-0');
      expect(cell.className).toContain('min-w-0');
    }
  });

  it('stacks below the sm breakpoint by default', () => {
    render(<FormRow data-testid="row"><span>a</span></FormRow>);
    const cls = screen.getByTestId('row').className;
    expect(cls).toContain('flex-col');
    expect(cls).toContain('sm:flex-row');
  });

  it('can stack below md instead', () => {
    render(<FormRow data-testid="row" stackBelow="md"><span>a</span></FormRow>);
    expect(screen.getByTestId('row').className).toContain('md:flex-row');
  });

  it('applies the gap scale', () => {
    const { rerender } = render(<FormRow data-testid="row"><span>a</span></FormRow>);
    expect(screen.getByTestId('row').className).toContain('gap-3');
    rerender(<FormRow data-testid="row" gap="lg"><span>a</span></FormRow>);
    expect(screen.getByTestId('row').className).toContain('gap-4');
  });

  it('keeps the fields reachable', () => {
    render(<FormRow><input aria-label="Starts" /><input aria-label="Ends" /></FormRow>);
    expect(screen.getByLabelText('Starts')).toBeInTheDocument();
    expect(screen.getByLabelText('Ends')).toBeInTheDocument();
  });

  it('handles three fields', () => {
    render(
      <FormRow data-testid="row"><span>a</span><span>b</span><span>c</span></FormRow>,
    );
    expect(screen.getByTestId('row').children).toHaveLength(3);
  });
});
