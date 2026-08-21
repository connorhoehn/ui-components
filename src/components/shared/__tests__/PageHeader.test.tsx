import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PageHeader } from '../PageHeader';

describe('PageHeader', () => {
  it('renders the title as the page h1', () => {
    render(<PageHeader title="Pipelines" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Pipelines' })).toBeInTheDocument();
  });

  it('renders description, badge and actions when provided', () => {
    render(
      <PageHeader
        title="T"
        description="All pipeline definitions"
        badge={<span data-testid="badge">beta</span>}
        actions={<button>New</button>}
      />,
    );
    expect(screen.getByText('All pipeline definitions')).toBeInTheDocument();
    expect(screen.getByTestId('badge')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
  });

  it('renders the back link with href and forwards clicks', () => {
    const onClick = vi.fn((e) => e.preventDefault());
    render(<PageHeader title="T" back={{ label: 'Back to runs', to: '/runs', onClick }} />);
    const link = screen.getByRole('link', { name: /Back to runs/ });
    expect(link).toHaveAttribute('href', '/runs');
    fireEvent.click(link);
    expect(onClick).toHaveBeenCalled();
  });
});
