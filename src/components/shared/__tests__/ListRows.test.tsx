import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MeterRow } from '../MeterRow';
import { SuggestionRow } from '../SuggestionRow';

afterEach(cleanup);

describe('SuggestionRow', () => {
  it('is an option whose selection follows the host cursor', () => {
    const onPick = vi.fn(), onHighlight = vi.fn();
    const { rerender } = render(<SuggestionRow active={false} onPick={onPick} onHighlight={onHighlight} primary="Nora Chang" secondary="Engineer" />);
    const row = screen.getByRole('option', { name: /Nora Chang/ });
    expect(row).toHaveAttribute('aria-selected', 'false');
    fireEvent.mouseEnter(row);
    expect(onHighlight).toHaveBeenCalled();
    fireEvent.click(row);
    expect(onPick).toHaveBeenCalled();
    rerender(<SuggestionRow active onPick={onPick} primary="Nora Chang" />);
    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');
  });
});

describe('MeterRow', () => {
  it('is a button pairing a label, note and meter', () => {
    const onClick = vi.fn();
    render(<MeterRow onClick={onClick} title="Add Nora" label="Nora" note="mentors" meter={<span data-testid="meter" />} />);
    const row = screen.getByRole('button', { name: /Nora/ });
    expect(row).toHaveTextContent('Nora · mentors');
    expect(screen.getByTestId('meter')).toBeInTheDocument();
    fireEvent.click(row);
    expect(onClick).toHaveBeenCalled();
  });
});
