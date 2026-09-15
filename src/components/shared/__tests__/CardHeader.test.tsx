import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CardHeader } from '../CardHeader';

describe('CardHeader', () => {
  it('renders the title as a heading', () => {
    render(<CardHeader title="Recent Runs" />);
    expect(screen.getByRole('heading', { name: 'Recent Runs' })).toBeInTheDocument();
  });

  it('renders subtitle only when provided', () => {
    const { rerender } = render(<CardHeader title="T" />);
    expect(screen.queryByText('Last 24h')).toBeNull();
    rerender(<CardHeader title="T" subtitle="Last 24h" />);
    expect(screen.getByText('Last 24h')).toBeInTheDocument();
  });

  it('renders meta next to the title and action on the right', () => {
    render(
      <CardHeader
        title="T"
        meta={<span data-testid="meta">3</span>}
        action={<button>Refresh</button>}
      />,
    );
    expect(screen.getByTestId('meta')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
  });

  it('inset gives the header its own gutter and rule for a padding="none" card', () => {
    const { container, rerender } = render(<CardHeader title="T" />);
    expect(container.firstElementChild).not.toHaveClass('border-b');
    rerender(<CardHeader title="T" inset />);
    expect(container.firstElementChild).toHaveClass('px-3.5', 'border-b');
  });
});
