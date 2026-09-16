import { render, screen } from '@testing-library/react';
import Chip from '../Chip';
import type { ChipTone } from '../Chip';

describe('Chip', () => {
  it('renders label text', () => {
    render(<Chip>Active</Chip>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies correct tone styling (neutral default)', () => {
    render(<Chip data-testid="chip">Label</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('bg-neutral-bg', 'text-neutral-fg');
  });

  it('applies success tone styling', () => {
    render(<Chip tone="success" data-testid="chip">OK</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('bg-success-bg', 'text-success-fg');
  });

  it('applies danger tone styling', () => {
    render(<Chip tone="danger" data-testid="chip">Error</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('bg-danger-bg', 'text-danger-fg');
  });

  it('applies solid variant styling', () => {
    render(<Chip tone="success" solid data-testid="chip">Done</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('bg-success', 'text-white');
  });

  it('renders with sm size (default)', () => {
    render(<Chip data-testid="chip">SM</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('px-2', 'text-[11px]');
  });

  it('renders with xs size', () => {
    render(<Chip size="xs" data-testid="chip">XS</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('px-1.5', 'text-[10px]');
  });

  it('applies monospace font when mono is true', () => {
    render(<Chip mono data-testid="chip">42</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('font-mono');
  });

  it('renders all tones without crashing', () => {
    const tones: ChipTone[] = ['neutral', 'success', 'warning', 'danger', 'info', 'caution', 'purple'];
    for (const tone of tones) {
      const { unmount } = render(<Chip tone={tone}>{tone}</Chip>);
      expect(screen.getByText(tone)).toBeInTheDocument();
      unmount();
    }
  });

  // v2 — dot/uppercase/icon extension for the status-pill pattern
  it('renders a static dot when dot="static"', () => {
    render(<Chip dot="static" tone="success" data-testid="chip">Live</Chip>);
    const chip = screen.getByTestId('chip');
    const dot = chip.querySelector('[aria-hidden]');
    expect(dot).toBeInTheDocument();
    // Inner ping should NOT exist for static dot
    expect(chip.querySelector('.animate-ping')).toBeNull();
  });

  it('renders a pulsing dot when dot="pulse"', () => {
    render(<Chip dot="pulse" tone="danger" data-testid="chip">Rec</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip.querySelector('.animate-ping')).toBeInTheDocument();
  });

  it('dot uses the tone color', () => {
    render(<Chip dot="static" tone="warning" data-testid="chip">Pending</Chip>);
    const chip = screen.getByTestId('chip');
    // First aria-hidden is the dot wrapper; it carries the amber swatch
    const dot = chip.querySelector('[aria-hidden]');
    expect(dot).toHaveClass('bg-warning');
  });

  it('uppercases the label when uppercase is true', () => {
    render(<Chip uppercase data-testid="chip">rec</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('uppercase', 'tracking-wide');
  });

  it('renders an icon when provided', () => {
    render(
      <Chip icon={<svg data-testid="leading-icon" />} data-testid="chip">
        Grid
      </Chip>,
    );
    expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
  });

  it('renders an anchor with the chip classes when href is set', () => {
    render(<Chip href="https://example.com" data-testid="chip" tone="success">Docs</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip.tagName).toBe('A');
    expect(chip).toHaveAttribute('href', 'https://example.com');
    expect(chip).toHaveAttribute('rel', 'noopener noreferrer');
    expect(chip).not.toHaveAttribute('target');
    expect(chip).toHaveClass('bg-success-bg', 'text-success-fg');
  });

  it('opens in a new tab when href + external are set', () => {
    render(<Chip href="https://example.com" external data-testid="chip">Docs</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveAttribute('target', '_blank');
    expect(chip).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders a <span> when href is not set', () => {
    render(<Chip data-testid="chip">Label</Chip>);
    expect(screen.getByTestId('chip').tagName).toBe('SPAN');
  });

  it('combines dot + icon + uppercase + tone consistently', () => {
    render(
      <Chip
        dot="pulse"
        icon={<svg data-testid="ico" />}
        uppercase
        tone="danger"
        size="xs"
        data-testid="chip"
      >
        Rec
      </Chip>,
    );
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('bg-danger-bg', 'text-danger-fg', 'uppercase', 'tracking-wide', 'gap-1');
    expect(chip.querySelector('.animate-ping')).toBeInTheDocument();
    expect(screen.getByTestId('ico')).toBeInTheDocument();
  });
});
