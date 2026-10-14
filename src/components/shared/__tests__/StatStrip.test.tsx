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

  it('draws a labelled connector between neighbours and drops the dividers', () => {
    render(
      <StatStrip
        data-testid="flow"
        items={[{ label: 'L0', value: 89 }, { label: 'L1', value: 22 }, { label: 'L2', value: 11 }]}
        connectors={[{ label: 'Compact' }, { label: 'Publish', tone: 'warning' }]}
      />,
    );
    const connectors = screen.getAllByTestId('stat-strip-connector');
    expect(connectors).toHaveLength(2);
    expect(connectors.map((c) => c.textContent)).toEqual(['Compact', 'Publish']);
    expect(connectors[1]!.className).toContain('text-warning-fg');
    expect(screen.getByTestId('flow').className).not.toContain('divide-x');
    // connectors sit BETWEEN clusters: L0, arrow, L1, arrow, L2
    const kids = Array.from(screen.getByTestId('flow').querySelector('[data-stat-strip-row]')!.children);
    expect(kids.map((k) => k.getAttribute('data-testid') ?? 'cluster')).toEqual([
      'cluster', 'stat-strip-connector', 'cluster', 'stat-strip-connector', 'cluster',
    ]);
  });

  // In a 324px content column the flow's labels ran into each other and the
  // last cluster was cut to its number. A flow is a size container: under
  // 40rem of its own width it stacks, one line per cluster, with a downward
  // arrow; wider, a label that does not fit ends in an ellipsis with the full
  // label on hover.
  it('a flow stacks under a 40rem container and truncates labels with a title', () => {
    render(
      <StatStrip
        data-testid="flow"
        items={[{ label: 'L2 Guides & findings', value: 11, onSelect: () => {} }, { label: 'Agent library', value: 7, title: '7 guides linked' }]}
        connectors={[{ label: 'Publish' }]}
      />,
    );
    const root = screen.getByTestId('flow');
    expect(root.getAttribute('role')).toBe('group');
    expect(root.classList.contains('@container')).toBe(true);
    expect(root.querySelector('[data-stat-strip-row]')!.className).toContain('@max-[40rem]:flex-col');
    const labels = screen.getAllByTestId('stat-strip-label');
    expect(labels[0]!.classList.contains('truncate')).toBe(true);
    expect(labels[0]!.getAttribute('title')).toBe('L2 Guides & findings');
    // The item's own title (provenance) speaks for its cluster; no second tooltip.
    expect(labels[1]!.hasAttribute('title')).toBe(false);
    const arrows = screen.getByTestId('stat-strip-connector').querySelectorAll('svg');
    expect(arrows).toHaveLength(2);
    expect(arrows[1]!.getAttribute('class')).toContain('@max-[40rem]:block');
  });

  it('keeps dividers when there are no connectors', () => {
    render(<StatStrip data-testid="plain" items={[{ label: 'A', value: 1 }, { label: 'B', value: 2 }]} />);
    expect(screen.getByTestId('plain').className).toContain('divide-x');
    expect(screen.queryByTestId('stat-strip-connector')).toBeNull();
  });

  it('renders a status line with a tone dot, and a native title', () => {
    render(
      <StatStrip
        items={[
          { label: 'L1', value: 22, status: { label: '50m behind', tone: 'warning' }, title: 'Last compaction 50 minutes ago' },
          { label: 'L2', value: 11, status: { label: 'OK' } },
        ]}
      />,
    );
    const lines = screen.getAllByTestId('stat-strip-status');
    expect(lines[0]!.textContent).toBe('50m behind');
    expect(lines[0]!.querySelector('[aria-hidden="true"]')!.className).toContain('bg-warning');
    expect(screen.getByText('50m behind').className).toContain('text-warning-fg');
    expect(screen.getByText('OK').className).toContain('text-text-secondary');
    expect(screen.getByTitle('Last compaction 50 minutes ago')).toBeTruthy();
  });
});
