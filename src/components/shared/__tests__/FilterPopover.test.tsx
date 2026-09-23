import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
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

  it('portals the panel to document.body (out of any clipping toolbar row), traps focus in it and closes on an outside click', async () => {
    render(
      <div style={{ overflow: 'auto', height: 39 }} data-testid="row">
        <FilterPopover>
          <button type="button">Draft</button>
          <button type="button">Published</button>
        </FilterPopover>
      </div>,
    );
    const trigger = screen.getByTestId('filter-popover-trigger');
    trigger.focus();
    fireEvent.click(trigger);
    // Focus capture is deferred a microtask past the mount.
    await act(async () => {});
    const panel = screen.getByRole('dialog', { name: 'Filters' });
    expect(panel.parentElement).toBe(document.body);
    expect(screen.getByTestId('row')).not.toContainElement(panel);
    expect(screen.getByTestId('filter-popover-root')).not.toContainElement(panel);
    expect(panel.style.position).toBe('fixed');
    // Focus moved into the panel, and Tab cycles inside it.
    expect(panel).toContainElement(document.activeElement as HTMLElement);
    expect(document.activeElement).toHaveTextContent('Draft');
    fireEvent.keyDown(panel, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toHaveTextContent('Published');
    // Outside pointerdown dismisses; the trigger's own pointerdown does not.
    fireEvent.mouseDown(trigger);
    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
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
