import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjectCard } from '../ProjectCard';

describe('ProjectCard', () => {
  it('renders the name and optional slug', () => {
    const { rerender } = render(<ProjectCard name="Search revamp" />);
    expect(screen.getByText('Search revamp')).toBeInTheDocument();
    rerender(<ProjectCard name="Search revamp" id="proj-search" />);
    expect(screen.getByText('proj-search')).toBeInTheDocument();
  });

  it('humanizes the status key in the chip', () => {
    render(<ProjectCard name="P" status="in_progress" />);
    expect(screen.getByText('in progress')).toBeInTheDocument();
  });

  it('falls back to neutral colors for an unknown status and accepts overrides', () => {
    const { rerender } = render(<ProjectCard name="P" status="incubating" />);
    expect(screen.getByText('incubating')).toBeInTheDocument();
    rerender(
      <ProjectCard
        name="P"
        status="incubating"
        statusColors={{
          incubating: {
            bg: 'var(--color-accent-bg)',
            border: 'var(--color-accent-border)',
            text: 'var(--color-accent-fg)',
            accent: 'var(--color-accent)',
          },
        }}
      />,
    );
    const chip = screen.getByText('incubating');
    expect(chip.style.background).toBe('var(--color-accent-bg)');
  });

  it('reports clicks', () => {
    const onClick = vi.fn();
    const { container } = render(<ProjectCard name="P" onClick={onClick} />);
    fireEvent.click(container.firstElementChild as Element);
    expect(onClick).toHaveBeenCalled();
  });

  it('shows the activity label when provided', () => {
    render(<ProjectCard name="P" activityLabel="active 2m ago" />);
    expect(screen.getByText('active 2m ago')).toBeInTheDocument();
  });
});
