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
});
