import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EntityCell } from '../EntityCell';

describe('EntityCell', () => {
  it('renders the label, and the ID subline only when given', () => {
    const { rerender } = render(<EntityCell label="Orders pipeline" />);
    expect(screen.getByText('Orders pipeline')).toBeInTheDocument();
    expect(screen.queryByText('pipe_123')).toBeNull();
    rerender(<EntityCell label="Orders pipeline" id="pipe_123" />);
    expect(screen.getByText('pipe_123')).toBeInTheDocument();
  });

  it('wraps the label in a link when href is provided', () => {
    render(<EntityCell label="Orders" href="/pipelines/1" />);
    expect(screen.getByRole('link', { name: 'Orders' })).toHaveAttribute('href', '/pipelines/1');
  });

  it('renders no link without href', () => {
    render(<EntityCell label="Orders" />);
    expect(screen.queryByRole('link')).toBeNull();
  });
});
