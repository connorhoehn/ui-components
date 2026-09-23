import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FilterPopover } from '../FilterPopover';

afterEach(cleanup);

describe('FilterPopover', () => {
  it('renders a Filter button that opens a dialog holding the caller body', () => {
    render(
      <FilterPopover>
        <p>Chips go here</p>
      </FilterPopover>,
    );
    const trigger = screen.getByTestId('filter-popover-trigger');
    expect(trigger).toHaveTextContent('Filter');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Chips go here')).not.toBeInTheDocument();
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument();
    expect(screen.getByText('Chips go here')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText('Chips go here')).not.toBeInTheDocument();
  });

  it('shows the active count as a badge only when something is active', () => {
    const { rerender } = render(<FilterPopover activeCount={0}>x</FilterPopover>);
    expect(screen.queryByTestId('filter-popover-count')).not.toBeInTheDocument();
    expect(screen.getByTestId('filter-popover-trigger')).not.toHaveAttribute('data-active');
    rerender(<FilterPopover activeCount={3}>x</FilterPopover>);
    expect(screen.getByTestId('filter-popover-count')).toHaveTextContent('3');
    expect(screen.getByTestId('filter-popover-trigger')).toHaveAttribute('data-active', 'true');
  });

  it('offers a clear row when onClear is given, enabled only with active filters', () => {
    const onClear = vi.fn();
    const { rerender } = render(
      <FilterPopover open activeCount={0} onClear={onClear}>
        x
      </FilterPopover>,
    );
    expect(screen.getByTestId('filter-popover-clear')).toBeDisabled();
    rerender(
      <FilterPopover open activeCount={2} onClear={onClear}>
        x
      </FilterPopover>,
    );
    const clear = screen.getByTestId('filter-popover-clear');
    expect(clear).toBeEnabled();
    fireEvent.click(clear);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('is controllable through open / onOpenChange', () => {
    const onOpenChange = vi.fn();
    render(
      <FilterPopover open={false} onOpenChange={onOpenChange}>
        x
      </FilterPopover>,
    );
    fireEvent.click(screen.getByTestId('filter-popover-trigger'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
