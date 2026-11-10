import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('applies translucent variant styling (surface palette)', () => {
    render(<Chip tone="warning" translucent data-testid="chip">Stale</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('bg-warning/15', 'text-warning-fg');
  });

  it('outline draws the tone border and text on a faint wash, not the soft -bg', () => {
    render(<Chip tone="danger" outline data-testid="chip">Blocked</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('border', 'border-danger-border', 'text-danger-fg', 'bg-surface/60');
    expect(chip).not.toHaveClass('bg-danger-bg');
  });

  it("outline='soft' keeps the tone border and text over the pale -bg fill (2.396.0)", () => {
    render(<Chip tone="danger" outline="soft" data-testid="chip">Blocked</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('border', 'border-danger-border', 'text-danger-fg', 'bg-danger-bg');
    expect(chip).not.toHaveClass('bg-surface/60');
  });

  it("size='lg' is 14px regular type with 12×4 padding (10×4 before 2.516.1); md 8px sides (2.396.0)", () => {
    const { rerender } = render(<Chip size="lg" data-testid="chip">Blocked</Chip>);
    expect(screen.getByTestId('chip')).toHaveClass('text-[14px]', 'font-normal', 'px-3', 'py-1', 'rounded-md', 'leading-5');
    expect(screen.getByTestId('chip')).not.toHaveClass('font-semibold');
    rerender(<Chip size="md" data-testid="chip">3</Chip>);
    expect(screen.getByTestId('chip')).toHaveClass('text-[12px]', 'font-semibold', 'px-2', 'py-0');
  });

  it('applies translucent variant styling on the code palette', () => {
    render(<Chip palette="code" tone="danger" translucent data-testid="chip">exit 1</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('bg-code-red/15', 'text-code-red');
  });

  it('translucent takes precedence over solid when both are set', () => {
    render(<Chip tone="success" translucent solid data-testid="chip">Live</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('bg-success/15', 'text-success-fg');
    expect(chip).not.toHaveClass('bg-success', 'text-white');
  });

  it('defaults translucent to false — unaffected chips keep the soft recipe', () => {
    render(<Chip tone="info" data-testid="chip">Info</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('bg-info-bg', 'text-info-fg');
    expect(chip.className).not.toContain('/15');
  });

  it('renders with sm size (default)', () => {
    render(<Chip data-testid="chip">SM</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('px-2', 'text-[11px]');
  });

  it('renders with xs size', () => {
    render(<Chip size="xs" data-testid="chip">XS</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('px-1', 'py-0', 'text-[10px]');
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

describe('Chip onRemove', () => {
  it('renders no remove control by default', () => {
    render(<Chip data-testid="chip">Alice</Chip>);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('renders an accessible remove control and calls back', () => {
    const onRemove = vi.fn();
    render(<Chip onRemove={onRemove} removeLabel="Remove Alice">Alice</Chip>);
    const button = screen.getByRole('button', { name: 'Remove Alice' });
    fireEvent.click(button);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('defaults the accessible name to "Remove"', () => {
    render(<Chip onRemove={() => {}}>Alice</Chip>);
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
  });

  it('exposes removeTestId on the control', () => {
    render(<Chip onRemove={() => {}} removeTestId="rm-alice">Alice</Chip>);
    expect(screen.getByTestId('rm-alice').tagName).toBe('BUTTON');
  });

  it('uses the borderless link button, not a boxed one', () => {
    render(<Chip onRemove={() => {}} removeTestId="rm">Alice</Chip>);
    const cls = screen.getByTestId('rm').className;
    expect(cls).toContain('border-none');
    expect(cls).toContain('bg-transparent');
    expect(cls).toContain('p-0');
  });

  it('does not fire the surrounding row/link click', () => {
    const onRemove = vi.fn();
    const onRowClick = vi.fn();
    render(
      <div onClick={onRowClick}>
        <Chip onRemove={onRemove} removeTestId="rm">Alice</Chip>
      </div>,
    );
    fireEvent.click(screen.getByTestId('rm'));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('adds the adornment gap so the glyph is not flush against the label', () => {
    render(<Chip onRemove={() => {}} data-testid="chip">Alice</Chip>);
    expect(screen.getByTestId('chip').className).toContain('gap-1');
  });

  it('accepts a custom glyph', () => {
    render(<Chip onRemove={() => {}} removeIcon="✕" removeTestId="rm">Alice</Chip>);
    expect(screen.getByTestId('rm')).toHaveTextContent('✕');
  });
});
