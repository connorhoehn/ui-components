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
    expect(chip).toHaveStyle({ background: '#f1f5f9', color: '#475569' });
  });

  it('applies success tone styling', () => {
    render(<Chip tone="success" data-testid="chip">OK</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveStyle({ background: '#f0fdf4', color: '#16a34a' });
  });

  it('applies danger tone styling', () => {
    render(<Chip tone="danger" data-testid="chip">Error</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveStyle({ background: '#fef2f2', color: '#dc2626' });
  });

  it('applies solid variant styling', () => {
    render(<Chip tone="success" solid data-testid="chip">Done</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveStyle({ background: '#16a34a', color: '#fff' });
  });

  it('renders with sm size (default)', () => {
    render(<Chip data-testid="chip">SM</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveStyle({ padding: '2px 8px', fontSize: '11px' });
  });

  it('renders with xs size', () => {
    render(<Chip size="xs" data-testid="chip">XS</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveStyle({ padding: '1px 6px', fontSize: '10px' });
  });

  it('applies monospace font when mono is true', () => {
    render(<Chip mono data-testid="chip">42</Chip>);
    const chip = screen.getByTestId('chip');
    expect(chip).toHaveStyle({ fontFamily: 'monospace' });
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
