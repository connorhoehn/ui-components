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

  it('frameless flushes only the OUTER edges, keeping inner padding', () => {
    // The padding BETWEEN clusters keeps the dividers off the numbers; only
    // the strip's outer edges are the host's job.
    const { container } = render(
      <StatStrip
        frameless
        data-testid="s"
        items={[{ label: 'A', value: 1 }, { label: 'B', value: 2 }, { label: 'C', value: 3 }]}
      />,
    );
    const cells = Array.from(container.querySelectorAll('[data-testid="s"] > * > div'));
    expect(cells).toHaveLength(3);
    expect(cells[0]!.className).toContain('pl-0');
    expect(cells[0]!.className).not.toContain('pr-0');
    expect(cells[1]!.className).not.toContain('pl-0');
    expect(cells[1]!.className).not.toContain('pr-0');
    expect(cells[2]!.className).toContain('pr-0');
    expect(cells[2]!.className).not.toContain('pl-0');
  });

  it('a lone frameless cluster is flush on both sides', () => {
    const { container } = render(
      <StatStrip frameless data-testid="s" items={[{ label: 'Only', value: 1 }]} />,
    );
    const cell = container.querySelector('[data-testid="s"] > * > div')!;
    expect(cell.className).toContain('pl-0');
    expect(cell.className).toContain('pr-0');
  });

  it('a framed strip pads its own edges', () => {
    const { container } = render(
      <StatStrip data-testid="s" items={[{ label: 'A', value: 1 }, { label: 'B', value: 2 }]} />,
    );
    for (const cell of container.querySelectorAll('[data-testid="s"] > * > div')) {
      expect(cell.className).not.toContain('pl-0');
      expect(cell.className).not.toContain('pr-0');
    }
  });
});