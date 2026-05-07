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
    expect(chip).toHaveClass('bg-slate-100', 'text-slate-600');
  });

  it('applies success tone styling', () => {
    render(<Chip tone="success" data-testid="chip">OK</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('bg-green-50', 'text-green-600');
  });

  it('applies danger tone styling', () => {
    render(<Chip tone="danger" data-testid="chip">Error</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('bg-red-50', 'text-red-600');
  });

  it('applies solid variant styling', () => {
    render(<Chip tone="success" solid data-testid="chip">Done</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveClass('bg-green-600', 'text-white');
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
});
