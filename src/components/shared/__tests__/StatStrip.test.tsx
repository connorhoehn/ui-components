import { render, screen, fireEvent } from '@testing-library/react';
import { StatStrip } from '../StatStrip';

describe('StatStrip', () => {
  it('renders label, value and hint per cluster', () => {
    render(<StatStrip items={[
      { label: 'Agents active', value: 8, hint: '11 in flight' },
      { label: 'Open work', value: 75, tone: 'danger' },
    ]} />);
    expect(screen.getByText('Agents active')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('11 in flight')).toBeInTheDocument();
  });

  it('a cluster with onSelect is a button', () => {
    const onSelect = vi.fn();
    render(<StatStrip items={[{ label: 'Findings', value: 3, onSelect }]} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('frames itself by default', () => {
    render(<StatStrip data-testid="s" items={[{ label: 'Spend', value: '$4' }]} />);
    expect(screen.getByTestId('s').className).toContain('border-border');
  });

  it('frameless drops the frame but keeps the dividers between clusters', () => {
    // Inside a Card the default frame reads as a card in a card. The dividers
    // separate the NUMBERS from each other, so they survive.
    render(<StatStrip frameless data-testid="s" items={[{ label: 'Spend', value: '$4' }]} />);
    const el = screen.getByTestId('s');
    expect(el.className).not.toContain('rounded-lg');
    expect(el.className).not.toContain('border-border');
    expect(el.className).toContain('divide-x');
  });
});